import { REST } from "@discordjs/rest"
import {
	type APIEmbed,
	type RESTPostAPIChannelMessageResult,
	type RESTPostAPICurrentUserCreateDMChannelResult,
	Routes,
} from "discord-api-types/v10"

import { env } from "@/server/t3-env"

export class DiscordClient {
	private rest: REST

	constructor(token: string | undefined) {
		this.rest = new REST({ version: "10" }).setToken(token ?? "")
	}

	// create DM channel
	async createDM(userId: string): Promise<RESTPostAPICurrentUserCreateDMChannelResult> {
		return this.rest.post(Routes.userChannels(), {
			body: {
				recipient_id: userId,
			},
		}) as Promise<RESTPostAPICurrentUserCreateDMChannelResult>
	}

	async sendEmbed(channelId: string, embed: APIEmbed): Promise<RESTPostAPIChannelMessageResult> {
		return this.rest.post(Routes.channelMessages(channelId), {
			body: {
				embeds: [embed],
			},
		}) as Promise<RESTPostAPIChannelMessageResult>
	}
}

export async function sendDiscordMessage(embed: APIEmbed) {
	const discord = new DiscordClient(env.DISCORD_BOT_TOKEN)
	const dmChannel = await discord.createDM(env.DISCORD_ID)

	await discord.sendEmbed(dmChannel.id, embed)
}
