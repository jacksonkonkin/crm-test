import { z } from 'zod'

// Password requirements
const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(72, 'Password must be less than 72 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')

// Auth schemas
export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required')
})

export const signupSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),
  email: z.string().email('Please enter a valid email address'),
  password: passwordSchema,
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword']
})

// Contact/Employee schema
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  role: z
    .string()
    .max(100, 'Role must be less than 100 characters')
    .optional(),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .min(7, 'Phone number must be at least 7 digits')
    .max(20, 'Phone number must be less than 20 characters')
    .regex(/^[\d\s\-\+\(\)]+$/, 'Please enter a valid phone number'),
  gender: z.enum(['Male', 'Female', 'Other'], {
    errorMap: () => ({ message: 'Please select a valid gender' })
  }),
  location: z
    .string()
    .min(2, 'Location must be at least 2 characters')
    .max(100, 'Location must be less than 100 characters'),
  status: z.enum(['active', 'pending']).default('pending'),
  category: z.enum(['Employee', 'Customers', 'Partners']).optional()
})

// Search query validation
export const searchSchema = z
  .string()
  .max(255, 'Search query is too long')
  .transform((val) => val.trim())

/**
 * Validate data against a schema and return formatted errors
 * @param {z.ZodSchema} schema - Zod schema to validate against
 * @param {any} data - Data to validate
 * @returns {{ success: boolean, data?: any, errors?: Record<string, string> }}
 */
export function validate(schema, data) {
  const result = schema.safeParse(data)

  if (result.success) {
    return { success: true, data: result.data }
  }

  // Format errors as { fieldName: errorMessage }
  const errors = {}
  result.error.issues.forEach((issue) => {
    const path = issue.path.join('.')
    if (!errors[path]) {
      errors[path] = issue.message
    }
  })

  return { success: false, errors }
}

/**
 * Get the first error message from validation result
 * @param {Record<string, string>} errors - Error object from validate()
 * @returns {string | null}
 */
export function getFirstError(errors) {
  if (!errors) return null
  const keys = Object.keys(errors)
  return keys.length > 0 ? errors[keys[0]] : null
}

/**
 * Check password strength and return feedback
 * @param {string} password
 * @returns {{ score: number, feedback: string[] }}
 */
export function checkPasswordStrength(password) {
  const feedback = []
  let score = 0

  if (password.length >= 8) score++
  else feedback.push('Use at least 8 characters')

  if (password.length >= 12) score++

  if (/[A-Z]/.test(password)) score++
  else feedback.push('Add an uppercase letter')

  if (/[a-z]/.test(password)) score++
  else feedback.push('Add a lowercase letter')

  if (/[0-9]/.test(password)) score++
  else feedback.push('Add a number')

  if (/[^A-Za-z0-9]/.test(password)) score++
  else feedback.push('Add a special character')

  return { score, feedback }
}
