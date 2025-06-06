import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transporter = nodemailer.createTransport({
  // service: "gmail",
  host:'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
  logger: true, 
  debug: true,
});

export const sender = `"ASN" <no-reply@yourapp.com>`;
