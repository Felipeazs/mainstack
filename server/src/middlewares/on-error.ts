import type { Context, ErrorHandler } from "hono"
import type { HTTPException } from "hono/http-exception"
import type { ContentfulStatusCode } from "hono/utils/http-status"

import * as Sentry from "@sentry/node"

import { env } from "@/server/t3-env"

import { sendDiscordMessage } from "../lib/providers/discord"
import { tryCatch } from "../utils/try-catch"

const onError: ErrorHandler = async (err: Error | HTTPException, c: Context) => {
	const currentStatus = "status" in err ? err.status : c.newResponse(null).status
	const statusCode = currentStatus !== 200 ? (currentStatus as ContentfulStatusCode) : 500

	if (statusCode >= 500 && env.NODE_ENV === "production") {
		Sentry.captureException(err)

		const embed = {
			title: "Alerta - Revisar ERROR!",
			description: `https://felipeazs.sentry.io/projects/${env.APP_NAME}`,
			timestamp: new Date().toISOString(),
		}
		const { data: _, error } = await tryCatch(sendDiscordMessage(embed))
		if (error) {
			console.error(error.message)
		}
	} else {
		console.error(err.message)
	}

	return c.json(
		{
			message:
				statusCode !== 500
					? err.message
					: "Error interno del servidor, por favor inténtalo más tarde",
			status: statusCode,
		},
		statusCode,
	)
}

export default onError
