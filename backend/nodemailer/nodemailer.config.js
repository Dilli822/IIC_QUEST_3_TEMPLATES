import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// export const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.USER,
//     pass: process.env.PASS,
//   },
// });


export const transporter = nodemailer.createTransport({
  // service: "gmail",
  host:'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
  logger: true,  // add this
  debug: true,
});

export const sender = `"ASN" <no-reply@yourapp.com>`; // Displayed sender name/email
