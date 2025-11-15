'use client'

import { useEffect } from 'react'
import { UserCircle } from 'lucide-react'

export default function ProfilePage() {
  const tallyFormUrl = process.env.NEXT_PUBLIC_TALLY_FORM_URL || ''

  useEffect(() => {
    // Load Tally widget script
    const script = document.createElement('script')
    script.src = 'https://tally.so/widgets/embed.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <UserCircle size={64} className="mx-auto text-primary-600 mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Create Your Profile
          </h1>
          <p className="text-gray-600">
            Fill out the form below to create your customer profile and enjoy a personalized shopping experience.
          </p>
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

