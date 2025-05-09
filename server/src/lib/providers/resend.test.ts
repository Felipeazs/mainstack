import { HTTPException } from "hono/http-exception"
import { Resend } from "resend"
import { beforeEach, describe, expect, it, type Mock, vi } from "vitest"

import { enviarEmail } from "./resend" // Adjust the path

// Mock the Resend SDK
vi.mock("resend")

// Define the mocked Resend instance and its methods
const mockEmailsSend = vi.fn()
const mockResend = {
	emails: {
		send: mockEmailsSend,
	},
}

// Cast the mocked Resend constructor to a spy
const ResendMock = Resend as unknown as Mock

// Before each test, reset the mocks and simulate a new Resend instance
beforeEach(() => {
	vi.clearAllMocks()
	ResendMock.mockImplementation(() => mockResend)
})

describe("email service", () => {
	it("should call resend.emails.send with correct arguments", async () => {
		const options = {
			to: "test@test.com",
			from: "Acme <onboarding@resend.dev>",
			subject: "Welcome!",
			html: "<p>Welcome aboard!</p>",
		}

		// Simulate a successful response from the Resend SDK
		mockEmailsSend.mockResolvedValue({
			data: { id: "test-email-id", created_at: new Date() },
			error: null,
		})

		// Act
		await enviarEmail({ options })

		// Assert
		expect(ResendMock).toHaveBeenCalledTimes(1)
		expect(ResendMock).toHaveBeenCalledWith("xxx")
		expect(mockEmailsSend).toHaveBeenCalledTimes(1)
		expect(mockEmailsSend).toHaveBeenCalledWith({
			to: options.to,
			from: options.from,
			subject: options.subject,
			html: options.html,
		})
	})

	it("should throw an error if Resend returns an error", async () => {
		const options = {
			to: "test@test.com",
			from: "Acme <onboarding@resend.dev>",
			subject: "Welcome!",
			html: "<p>Welcome aboard!</p>",
		}

		const mockError = {
			name: "ResendError",
			message: "Failed to send",
			statusCode: 400,
		}
		mockEmailsSend.mockResolvedValue({ data: null, error: mockError })

		await expect(enviarEmail({ options })).rejects.toThrow(HTTPException) // Or the specific error message if you prefer
	})
})
