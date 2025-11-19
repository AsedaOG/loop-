'use client'

import { useEffect, useState } from 'react'
import { UserCircle, CheckCircle, Mail } from 'lucide-react'

export default function ProfilePage() {
  const tallyFormUrl = process.env.NEXT_PUBLIC_TALLY_FORM_URL || ''
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    // Load Tally widget script
    const script = document.createElement('script')
    script.src = 'https://tally.so/widgets/embed.js'
    script.async = true
    document.body.appendChild(script)

    // Listen for Tally form submission
    const handleTallySubmit = () => {
      setSubmitted(true)
      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    window.addEventListener('Tally.FormSubmitted', handleTallySubmit)

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
      window.removeEventListener('Tally.FormSubmitted', handleTallySubmit)
    }
  }, [])

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Success Message */}
        {submitted && (
          <div className="mb-8 bg-green-50 border-2 border-green-500 rounded-xl p-8 text-center animate-fade-in">
            <CheckCircle size={80} className="mx-auto text-green-500 mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Profile Created Successfully!</h2>
            <div className="bg-white rounded-lg p-6 max-w-md mx-auto mb-4">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Mail size={32} className="text-primary-600" />
                <p className="text-lg font-semibold text-gray-800">Check Your Email</p>
              </div>
              <p className="text-gray-600 mb-2">
                You will receive a confirmation email shortly with your <strong>Customer ID</strong>.
              </p>
              <p className="text-sm text-gray-500">
                Please check your inbox (and spam folder) for an email from us.
              </p>
            </div>
            <div className="space-y-2 text-gray-700">
              <p className="font-semibold">What's Next?</p>
              <p className="text-sm">Use your Customer ID to place orders and track your purchases.</p>
            </div>
            <div className="mt-6">
              <a
                href="/"
                className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
              >
                Start Shopping
              </a>
            </div>
          </div>
        )}

        <div className="text-center mb-8">
          <UserCircle size={64} className="mx-auto text-primary-600 mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Create Your Profile
          </h1>
          <p className="text-gray-600">
            Fill out the form below to create your customer profile and enjoy a personalized shopping experience.
          </p>
        </div>

        {/* Email Notice - Always Visible */}
        <div className="mb-6 bg-primary-50 border-2 border-primary-500 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="bg-primary-600 rounded-full p-3 flex-shrink-0">
              <Mail className="text-white" size={32} />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                📧 Check Your Email After Submitting
              </h3>
              <p className="text-gray-700 mb-2">
                After you submit this form, you will receive a <strong>confirmation email</strong> with your <strong className="text-primary-700">Customer ID</strong>.
              </p>
              <p className="text-sm text-gray-600">
                ⚠️ Please check your inbox (and spam folder) for this important email. You will need your Customer ID to place orders and track your purchases.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          {tallyFormUrl ? (
            <iframe
              data-tally-src={tallyFormUrl}
              loading="lazy"
              width="100%"
              height="600"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              title="Customer Profile Form"
              className="rounded-lg"
            ></iframe>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">
                The customer profile form is not configured yet.
              </p>
              <p className="text-gray-500 text-sm">
                Please add your Tally form URL to the <code className="bg-gray-100 px-2 py-1 rounded">.env.local</code> file:
              </p>
              <pre className="bg-gray-100 p-4 rounded-lg mt-4 text-left text-sm overflow-x-auto">
                NEXT_PUBLIC_TALLY_FORM_URL=your_tally_form_url_here
              </pre>
              <p className="text-gray-500 text-sm mt-4">
                Note: Make sure your Tally form is connected to your Airtable Customers table.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

