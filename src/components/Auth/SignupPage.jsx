import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { signupSchema, validate, checkPasswordStrength } from '../../lib/validation'

export default function SignupPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const passwordStrength = checkPasswordStrength(password)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})

    // Validate with Zod
    const result = validate(signupSchema, { fullName, email, password, confirmPassword })

    if (!result.success) {
      setErrors(result.errors)
      return
    }

    setLoading(true)

    try {
      await signUp(email, password, { full_name: fullName })
      setSuccess(true)
    } catch (err) {
      setErrors({ form: err.message || 'Failed to create account' })
    } finally {
      setLoading(false)
    }
  }

  const getStrengthColor = (score) => {
    if (score <= 2) return 'bg-red-500'
    if (score <= 4) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const getStrengthText = (score) => {
    if (score <= 2) return 'Weak'
    if (score <= 4) return 'Medium'
    return 'Strong'
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-medium mb-2">Check your email</h2>
            <p className="text-gray-600 text-sm mb-6">
              We've sent a confirmation link to <strong>{email}</strong>.
              Please click the link to verify your account.
            </p>
            <Link
              to="/login"
              className="inline-block bg-black text-white text-sm font-medium px-6 py-2.5 rounded hover:bg-gray-800 transition-colors"
            >
              Back to Sign in
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-8 h-7 bg-black rounded"></div>
            <span className="text-2xl font-medium">Venture</span>
          </div>

          <h2 className="text-xl font-medium text-center mb-6">Create your account</h2>

          {errors.form && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4 text-sm">
              {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Full name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={`w-full bg-white border rounded px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:ring-1 ${
                  errors.fullName ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-black focus:ring-black'
                }`}
                placeholder="John Doe"
              />
              {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full bg-white border rounded px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:ring-1 ${
                  errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-black focus:ring-black'
                }`}
                placeholder="you@example.com"
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full bg-white border rounded px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:ring-1 ${
                  errors.password ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-black focus:ring-black'
                }`}
                placeholder="Min 8 chars, uppercase, lowercase, number"
              />
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}

              {/* Password strength indicator */}
              {password && (
                <div className="mt-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-gray-200 rounded overflow-hidden">
                      <div
                        className={`h-full transition-all ${getStrengthColor(passwordStrength.score)}`}
                        style={{ width: `${(passwordStrength.score / 6) * 100}%` }}
                      />
                    </div>
                    <span className={`text-xs font-medium ${
                      passwordStrength.score <= 2 ? 'text-red-500' :
                      passwordStrength.score <= 4 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {getStrengthText(passwordStrength.score)}
                    </span>
                  </div>
                  {passwordStrength.feedback.length > 0 && (
                    <ul className="mt-1 text-xs text-gray-500">
                      {passwordStrength.feedback.slice(0, 2).map((tip, i) => (
                        <li key={i}>{tip}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Confirm password
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full bg-white border rounded px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:ring-1 ${
                  errors.confirmPassword ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-black focus:ring-black'
                }`}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white text-sm font-medium px-4 py-2.5 rounded hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-black hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
