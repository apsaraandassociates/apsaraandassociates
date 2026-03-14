// Follow this guide to deploy: https://supabase.com/docs/guides/functions/deploy

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ContactFormData {
  name: string
  email: string
  phone: string
  service?: string
  message: string
  adminEmail: string
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { name, email, phone, service, message, adminEmail }: ContactFormData = await req.json()

    // Validate required fields
    if (!name || !email || !phone || !message || !adminEmail) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Check if Resend API key is configured
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured in Supabase Edge Function')
      return new Response(
        JSON.stringify({ error: 'Email service not configured' }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Send email using Resend API
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'Apsara & Associates <noreply@apsaraassociates.com>',
        to: [adminEmail],
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #0A70A1;">New Contact Form Submission</h2>
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
              <p><strong>Service Interest:</strong> ${service || 'Not specified'}</p>
              <p><strong>Message:</strong></p>
              <p style="background-color: white; padding: 15px; border-left: 4px solid #F3782C; white-space: pre-wrap;">${message}</p>
            </div>
            <p style="color: #666; font-size: 12px;">This email was sent from the contact form on Apsara & Associates website.</p>
          </div>
        `
      })
    })

    const resendData = await resendResponse.json()

    if (!resendResponse.ok) {
      console.error('Resend API error:', resendData)
      return new Response(
        JSON.stringify({ 
          error: 'Failed to send email',
          details: resendData 
        }),
        { 
          status: resendResponse.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    console.log('Email sent successfully:', resendData)

    return new Response(
      JSON.stringify({ 
        success: true,
        messageId: resendData.id 
      }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Error in send-contact-email function:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})