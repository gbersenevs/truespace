import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransporter({
  host: process.env.EMAIL_SERVER?.split('://')[1]?.split(':')[0],
  port: parseInt(process.env.EMAIL_SERVER?.split(':')[2] || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_SERVER?.split('://')[1]?.split(':')[0],
    pass: process.env.EMAIL_SERVER?.split(':')[1]?.split('@')[0],
  },
});

export async function sendPasswordResetEmail(
  email: string,
  resetToken: string,
  resetUrl: string
) {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'TrueSpace - Password Reset Request',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0a0a0a; color: #ffffff; padding: 40px; border-radius: 10px;">
        <h1 style="color: #ffffff; text-align: center; margin-bottom: 30px;">TrueSpace</h1>
        <h2 style="color: #e0e0e0;">Password Reset Request</h2>
        <p style="color: #a0a0a0; line-height: 1.6;">
          You have requested to reset your password. Click the button below to proceed:
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" 
             style="background-color: #ffffff; color: #0a0a0a; padding: 15px 40px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
            Reset Password
          </a>
        </div>
        <p style="color: #a0a0a0; font-size: 14px;">
          If you didn't request this, please ignore this email. This link will expire in 1 hour.
        </p>
        <p style="color: #a0a0a0; font-size: 12px; margin-top: 30px; border-top: 1px solid #2a2a2a; padding-top: 20px;">
          Or copy and paste this URL into your browser:<br/>
          <span style="color: #ffffff; word-break: break-all;">${resetUrl}</span>
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error };
  }
}

export async function sendWelcomeEmail(email: string, name: string) {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Welcome to TrueSpace!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0a0a0a; color: #ffffff; padding: 40px; border-radius: 10px;">
        <h1 style="color: #ffffff; text-align: center; margin-bottom: 30px;">Welcome to TrueSpace!</h1>
        <p style="color: #e0e0e0; font-size: 18px;">Hi ${name},</p>
        <p style="color: #a0a0a0; line-height: 1.6;">
          Thank you for joining TrueSpace! We're excited to have you on our educational platform.
        </p>
        <p style="color: #a0a0a0; line-height: 1.6;">
          To access our video courses, you'll need a promo code. Contact us to get your access code.
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXTAUTH_URL}" 
             style="background-color: #ffffff; color: #0a0a0a; padding: 15px 40px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
            Go to Platform
          </a>
        </div>
        <p style="color: #a0a0a0; font-size: 14px; margin-top: 30px;">
          Best regards,<br/>
          The TrueSpace Team
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error };
  }
}

