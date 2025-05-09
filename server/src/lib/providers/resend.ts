import { HTTPException } from "hono/http-exception"
import { type CreateEmailOptions, type CreateEmailResponseSuccess, Resend } from "resend"

import { env } from "../../t3-env"
import { ERROR_CODE, ERROR_MESSAGE } from "../constants"

let resend: Resend | null = null

function getResendInstance(): Resend {
	if (!resend) {
		resend = new Resend(env.RESEND_API_KEY)
	}

	return resend
}

export async function enviarEmail({
	options,
}: {
	options: CreateEmailOptions
}): Promise<CreateEmailResponseSuccess | null> {
	const resend = getResendInstance()

	const { data, error } = await resend.emails.send(options)

	if (error) {
		throw new HTTPException(ERROR_CODE.BAD_REQUEST, { message: ERROR_MESSAGE.BAD_REQUEST })
	}

	return data
}
