// =====================================================
// Send OTP - Supabase Edge Function
// =====================================================
// This function handles sending OTP codes via email
// for registration and password reset
// =====================================================

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Generate random 6-digit OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not set')
    }

    const { email, phone, purpose } = await req.json()

    if (!email && !phone) {
      return new Response(
        JSON.stringify({ error: 'Email or phone is required' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    if (!purpose || !['registration', 'password_reset'].includes(purpose)) {
      return new Response(
        JSON.stringify({ error: 'Invalid purpose' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Generate OTP
    const otpCode = generateOTP()

    // Store OTP in database
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
    
    const { error: dbError } = await supabase
      .from('otp_verifications')
      .insert({
        email,
        phone,
        otp_code: otpCode,
        purpose,
        verified: false,
      })

    if (dbError) {
      console.error('Database error:', dbError)
      throw dbError
    }

    // Send OTP via email
    if (email) {
      const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'Apsara & Associates <noreply@yourdomain.com>', // TODO: Update with your verified domain from Resend
          to: [email],
          subject: `Your OTP Code - Apsara & Associates`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: linear-gradient(135deg, #0A70A1 0%, #F3782C 100%); padding: 20px; text-align: center;">
                <h1 style="color: white; margin: 0;">Apsara & Associates</h1>
                <p style="color: white; margin: 5px 0;">Chartered Accountants</p>
              </div>
              
              <div style="padding: 30px; background-color: #f9fafb;">
                <h2 style="color: #0A70A1; margin-top: 0;">Your Verification Code</h2>
                
                <p style="color: #374151; font-size: 16px; line-height: 1.6;">
                  ${purpose === 'registration' ? 'Thank you for registering with Apsara & Associates.' : 'You requested to reset your password.'}
                  Please use the following OTP code to complete the process:
                </p>
                
                <div style="background: linear-gradient(135deg, #0A70A1 0%, #F3782C 100%); padding: 20px; border-radius: 8px; text-align: center; margin: 30px 0;">
                  <div style="font-size: 36px; font-weight: bold; color: white; letter-spacing: 8px; font-family: monospace;">
                    ${otpCode}
                  </div>
                </div>
                
                <p style="color: #6b7280; font-size: 14px;">
                  This code will expire in <strong>10 minutes</strong>.
                </p>
                
                <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
                  If you didn't request this code, please ignore this email.
                </p>
              </div>
              
              <div style="background-color: #0A70A1; padding: 15px; text-align: center;">
                <p style="color: white; margin: 0; font-size: 14px;">
                  © ${new Date().getFullYear()} Apsara & Associates - Chartered Accountants
                </p>
              </div>
            </div>
          `,
        }),
      })

      if (!emailResponse.ok) {
        const errorData = await emailResponse.json()
        console.error('Resend API error:', errorData)
        throw new Error(`Failed to send email: ${JSON.stringify(errorData)}`)
      }
    }

    // TODO: For phone OTP, integrate with SMS service (Twilio, etc.)
    // Currently only email OTP is supported

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'OTP sent successfully'
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An error occurred',
        success: false
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})