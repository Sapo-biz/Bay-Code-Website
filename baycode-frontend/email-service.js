// Email Service for Bay Code
// This simulates email sending functionality

class EmailService {
    constructor() {
        this.sentEmails = [];
    }

    // Send password reset email
    async sendPasswordResetEmail(email, resetToken) {
        const resetLink = `https://baycode.org/reset-password.html?token=${resetToken}`;
        
        const emailContent = {
            to: email,
            from: 'noreply@baycode.org',
            subject: 'Bay Code - Password Reset Request',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 2rem; text-align: center;">
                        <h1 style="margin: 0;">Bay Code</h1>
                        <p style="margin: 0.5rem 0 0 0; opacity: 0.9;">Password Reset Request</p>
                    </div>
                    
                    <div style="padding: 2rem; background: white;">
                        <h2 style="color: #1e293b;">Hello!</h2>
                        <p style="color: #64748b; line-height: 1.6;">
                            We received a request to reset your password for your Bay Code account. 
                            If you didn't make this request, you can safely ignore this email.
                        </p>
                        
                        <div style="text-align: center; margin: 2rem 0;">
                            <a href="${resetLink}" 
                               style="background: #2563eb; color: white; padding: 1rem 2rem; 
                                      text-decoration: none; border-radius: 8px; font-weight: 600;
                                      display: inline-block;">
                                Reset Your Password
                            </a>
                        </div>
                        
                        <p style="color: #64748b; font-size: 0.9rem;">
                            This link will expire in 1 hour for security reasons.
                        </p>
                        
                        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 2rem 0;">
                        
                        <p style="color: #94a3b8; font-size: 0.8rem;">
                            If the button doesn't work, copy and paste this link into your browser:<br>
                            <a href="${resetLink}" style="color: #2563eb;">${resetLink}</a>
                        </p>
                    </div>
                    
                    <div style="background: #f8fafc; padding: 1rem; text-align: center; color: #64748b; font-size: 0.8rem;">
                        <p>This email was sent from noreply@baycode.org</p>
                        <p>© 2024 Bay Code. All rights reserved.</p>
                    </div>
                </div>
            `
        };

        // Simulate email sending (in real app, this would use a service like SendGrid, Mailgun, etc.)
        // console.log('📧 Email sent to:', email);
        // console.log('📧 Reset link:', resetLink);
        
        // Store sent email for demo purposes
        this.sentEmails.push({
            to: email,
            token: resetToken,
            timestamp: new Date().toISOString(),
            link: resetLink
        });

        // In a real application, you would use an email service like:
        // - SendGrid
        // - Mailgun
        // - AWS SES
        // - Nodemailer with SMTP
        
        return {
            success: true,
            message: 'Password reset email sent successfully'
        };
    }

    // Get sent emails (for demo purposes)
    getSentEmails() {
        return this.sentEmails;
    }

    // Clear sent emails (for demo purposes)
    clearSentEmails() {
        this.sentEmails = [];
    }
}

// Initialize global email service
const emailService = new EmailService(); 