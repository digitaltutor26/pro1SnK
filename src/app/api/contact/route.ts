import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();
    const errors: string[] = [];

    // Server-side validation
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

    // Logging the submission
    console.log(`[Contact Form Submission] Name: ${name}, Email: ${email}, Message: ${message}`);

    // NOTE: To send actual emails in production, integrate a service like Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({ ... });

    return NextResponse.json({ success: true, message: 'Thank you for contacting us!' }, { status: 200 });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json({ errors: ['Internal server error. Please try again later.'] }, { status: 500 });
  }
}
