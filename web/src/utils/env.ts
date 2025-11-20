import { z } from 'zod'

// Client-side environment schema
const clientEnvSchema = z.object({
  // Firebase Configuration
  NEXT_PUBLIC_FIREBASE_API_KEY: z.string().min(1, 'Firebase API key is required'),
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z.string().min(1, 'Firebase auth domain is required'),
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string().min(1, 'Firebase project ID is required'),
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: z.string().optional(),
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: z.string().optional(),
  NEXT_PUBLIC_FIREBASE_APP_ID: z.string().optional(),

  // reCAPTCHA
  NEXT_PUBLIC_RECAPTCHA_SITE_KEY: z.string().optional(),

  // Google Analytics
  NEXT_PUBLIC_GA_ID: z.string().optional(),

  // Site Configuration
  NEXT_PUBLIC_SITE_URL: z.string().optional(),

  // Google Site Verification
  GOOGLE_SITE_VERIFICATION: z.string().optional(),
})

// Server-side environment schema (for API routes)
const serverEnvSchema = z.object({
  // Add server-only environment variables here
  // RECAPTCHA_SECRET_KEY: z.string().min(1, 'reCAPTCHA secret key is required'),
  // SENDGRID_API_KEY: z.string().optional(),
}).partial()

// Validate client environment variables
function validateClientEnv() {
  try {
    return clientEnvSchema.parse(process.env)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = `❌ Invalid environment variables:\n${error.errors
        .map((err) => `  ${err.path.join('.')}: ${err.message}`)
        .join('\n')}`
      throw new Error(errorMessage)
    }
    throw error
  }
}

// Validate server environment variables
function validateServerEnv() {
  try {
    return serverEnvSchema.parse(process.env)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = `❌ Invalid server environment variables:\n${error.errors
        .map((err) => `  ${err.path.join('.')}: ${err.message}`)
        .join('\n')}`
      throw new Error(errorMessage)
    }
    throw error
  }
}

// Export validated environments
export const clientEnv = validateClientEnv()
export const serverEnv = validateServerEnv()

// Export the schemas for use in tests
export { clientEnvSchema, serverEnvSchema }

// Type definitions
export type ClientEnv = z.infer<typeof clientEnvSchema>
export type ServerEnv = z.infer<typeof serverEnvSchema>
