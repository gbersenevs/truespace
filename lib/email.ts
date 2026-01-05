// TEMPORARY: Email functionality disabled for initial deployment
// We'll enable it later once the basic site is working

export async function sendPasswordResetEmail(
  email: string,
  resetToken: string,
  resetUrl: string
) {
  // For now, just log to console instead of sending email
  console.log('📧 [EMAIL DISABLED] Password reset email would be sent to:', email);
  console.log('🔗 Reset URL:', resetUrl);
  
  // Return success so the app doesn't break
  return { success: true };
}

export async function sendWelcomeEmail(email: string, name: string) {
  // For now, just log to console instead of sending email
  console.log('📧 [EMAIL DISABLED] Welcome email would be sent to:', email);
  console.log('👤 Name:', name);
  
  // Return success so the app doesn't break
  return { success: true };
}

