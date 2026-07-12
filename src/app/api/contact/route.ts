import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();
    const errors: string[] = [];

    // Validation
    if (!name || !name.trim()) {
      errors.push('Name is required.');
    }

    if (!email || !email.trim()) {
      errors.push('Email is required.');
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        errors.push('Invalid email format.');
      }
    }

    if (!message || !message.trim()) {
      errors.push('Message is required.');
    }

    if (errors.length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    // Determine target recipient email (Default: seungwonseo@example.com or user-configured Vercel Env Var)
    const toEmail = process.env.CONTACT_RECEIVER_EMAIL || 'seungwonseo@example.com';
    const resendApiKey = process.env.RESEND_API_KEY;

    console.log(`[Contact Submission] Recipient: ${toEmail}`);
    console.log(`[Contact Content] Name: ${name}, Email: ${email}, Message: ${message}`);

    // If Resend API Key is set in Vercel environment variables, send a real email!
    if (resendApiKey) {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: 'SnK Systems Contact <onboarding@resend.dev>', // Resend verified domain or default onboarding domain
          to: toEmail,
          subject: `[SnK Systems 문의] ${name}님으로부터 새로운 문의가 접수되었습니다.`,
          html: `
            <h3>새로운 고객 문의 접수</h3>
            <p><strong>이름:</strong> ${name}</p>
            <p><strong>이메일:</strong> ${email}</p>
            <p><strong>문의 내용:</strong></p>
            <p style="white-space: pre-wrap; background: #f4f4f5; padding: 15px; border-radius: 8px;">${message}</p>
          `,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to send email via Resend:', errorData);
        // Fallback or throw
      } else {
        console.log('Email sent successfully via Resend API.');
      }
    } else {
      console.log('RESEND_API_KEY environment variable is not set. Email logging fallback used.');
    }

    return NextResponse.json({ success: true, message: 'Thank you for contacting us!' }, { status: 200 });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json({ errors: ['Internal server error. Please try again later.'] }, { status: 500 });
  }
}
