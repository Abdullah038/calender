// lib/sendEmail.ts
import emailjs from "emailjs-com";

type EmailData = {
  to_name: string;
  to_email: string;
  service: string;
  date: string;
  time: string;
};

export const sendConfirmationEmail = async (data: EmailData) => {
  return emailjs.send(
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!, // confirmed template
    data,
    process.env.NEXT_PUBLIC_EMAILJS_USER_ID!
  );
};

export const sendRejectionEmail = async (data: EmailData) => {
  return emailjs.send(
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
    process.env.NEXT_PUBLIC_EMAILJS_REJECTION_TEMPLATE_ID!, // rejected template
    data,
    process.env.NEXT_PUBLIC_EMAILJS_USER_ID!
  );
};
