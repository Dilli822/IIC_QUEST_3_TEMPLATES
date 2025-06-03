import {
  CONTACT_FORM_SUBMISSION_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from "./emailTemplates.js";
import { transporter, sender } from "./nodemailer.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    await transporter.sendMail({
      from: sender,
      to: email,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
    });
    console.log("Verification email sent");
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Failed to send verification email");
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const html = WELCOME_EMAIL_TEMPLATE.replace("{name}", name);

  try {
    await transporter.sendMail({
      from: sender,
      to: email,
      subject: "Welcome to Auth Company!",
      html,
    });
    console.log("Welcome email sent");
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw new Error("Failed to send welcome email");
  }
};
export const sendPasswordResetEmail = async (email, resetURL) => {
  try {
    await transporter.sendMail({
      from: sender,
      to: email,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
    });
    console.log("Password reset email sent");
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error("Failed to send password reset email");
  }
};

export const sendResetSuccessEmail = async (email) => {
  try {
    await transporter.sendMail({
      from: sender,
      to: email,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    });
    console.log("Password reset success email sent");
  } catch (error) {
    console.error("Error sending reset success email:", error);
    throw new Error("Failed to send password reset success email");
  }
};

export const submitMessage = async (name, email, phone, message) => {
  try {
    await transporter.sendMail({
      from: email,
      to: "lastsoulff01@gmail.com",
      subject: `New contact form message from ${name}`,
      html: CONTACT_FORM_SUBMISSION_TEMPLATE.replace("{name}", name)
        .replace("{email}", email)
        .replace("{phone}", phone || "N/A")
        .replace("{message}", message),
    });
    console.log("Contact message email sent successfully");
  } catch (error) {
    console.error("Error sending contact form message:", error);
    throw new Error("Failed to send contact form message");
  }
};
