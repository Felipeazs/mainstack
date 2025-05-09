import { defineConfig } from "vitest/config"

export default defineConfig({
	test: {
		environment: "node",
		include: ["**/*.test.ts"],
		exclude: ["node_modules", "dist", ".idea", ".git"],
		coverage: {
			provider: "v8", // or 'istanbul'
			reporter: ["text", "html", "lcov"],
			include: ["src/**/*.ts"], // Specify files to include in coverage
			exclude: ["src/**/*.test.ts"], // Exclude test files from coverage
		},
		env: {
			NODE_ENV: "test",
			DATABASE_URI: "xxx",
			ORIGIN_URL: "xxx",
			SENTRY_DNS: "xxx",
			JWT_ACCESS_SECRET: "xxx",
			JWT_REFRESH_SECRET: "xxx",
			COOKIE_SECRET: "xxx",
			REDIS_URL: "xxx",
			POSTHOG_APIKEY: "xxx",
			POSTHOG_HOST: "xxx",
			CLOUDINARY_API_KEY: "xxx",
			CLOUDINARY_API_SECRET: "xxx",
			CLOUDINARY_NAME: "xxx",
			APP_NAME: "xxx",
			RESEND_API_KEY: "xxx",
			DISCORD_BOT_TOKEN: "xxx",
			DISCORD_ID: "xxx",
		},
	},
})
