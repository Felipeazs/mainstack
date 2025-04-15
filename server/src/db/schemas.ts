import { createId } from "@paralleldrive/cuid2"
import { pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"

export const usuario = pgTable(
	"usuarios",
	{
		id: text("id")
			.primaryKey()
			.$defaultFn(() => createId())
			.notNull(),
		nombre: text("nombre"),
		apellido: text("apellido"),
		email: text("email").notNull(),
		organizacion: text("organizacion"),
		password: text("password").notNull(),
		roles: text({ enum: ["super_admin", "admin", "user"] })
			.array()
			.default(["user"]),
		image: text("image"),
		passwordResetToken: text("password_reset_token").default(""),
		passwordResetExpires: timestamp("password_reset_expires"),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at")
			.$onUpdateFn(() => new Date())
			.notNull(),
	},
	(table) => {
		return [uniqueIndex("email_idx").on(table.email)]
	},
)

const email_specs = z.string().email({ message: "ingrese un mail válido" })

const password_specs = z
	.string()
	.min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
	.max(100, { message: "La contraseña debe tene como máximo 100 caracteres" })
	.refine((password) => /[A-Z]/.test(password), {
		message: "La contraseña debe tener al menos una letra mayúscula",
	})
	.refine((password) => /[a-z]/.test(password), {
		message: "La contraseña debe tener al menos una letra minúscula",
	})
	.refine((password) => /\d/.test(password), {
		message: "La contraseña debe tener al menos un número",
	})
	.refine((password) => /[^a-z0-9\s]/i.test(password), {
		message: "La contraseña debe tener al menos un símbolo",
	})

export const signupSchema = z.object({
	email: email_specs,
	password: password_specs,
	repeat_password: password_specs,
})

export const loginSchema = signupSchema.omit({
	repeat_password: true,
})

export const forgotPassSchema = signupSchema.omit({
	password: true,
	repeat_password: true,
})

export const resetPassSchema = signupSchema.omit({
	email: true,
})

export const resetPassTokenSchema = z.object({
	token: z.string(),
})

export const changePassSchema = z.object({
	password: password_specs,
	new_password: password_specs,
	repeat_new_password: password_specs,
})

export const editUsuarioSchema = createInsertSchema(usuario, {
	nombre: z.string(),
	apellido: z.string(),
	organizacion: z.string(),
	email: email_specs,
	image: z
		.union([
			z.instanceof(File),
			z.string().transform((value) => (value === "" ? undefined : value)),
		])
		.optional(),
	roles: z.union([
		z
			.array(z.enum(["super_admin", "admin", "user"]))
			.default(["user"])
			.optional(),
		z.string(),
	]),
}).omit({
	id: true,
	password: true,
	passwordResetToken: true,
	passwordResetExpires: true,
	createdAt: true,
	updatedAt: true,
})

export const usuarioSchema = createSelectSchema(usuario).omit({
	password: true,
	passwordResetToken: true,
	passwordResetExpires: true,
})

// usuario
export type Usuario = z.infer<typeof usuarioSchema>
export type LoginUsuario = z.infer<typeof loginSchema>
export type SignupUsuario = z.infer<typeof signupSchema>
export type EditUsuario = z.infer<typeof editUsuarioSchema>
