import emailjs from '@emailjs/browser';

const EMAIL_SERVICE_ID = 'service_t9atbc5';
const EMAIL_TEMPLATE_ID = 'template_pq0lsc2';
const PUBLIC_KEY = 'RsebYPrOW0W5xX_4Z';

interface EmailParams {
  content: string;
  [key: string]: string;
}

export async function sendEmail(params: EmailParams) {
  try {
    await emailjs.send(
      EMAIL_SERVICE_ID,
      EMAIL_TEMPLATE_ID,
      params,
      PUBLIC_KEY
    );
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

export async function sendOrderNotification(orderItems: string[], submittedBy: string) {
  const itemsList = orderItems.join('\n');
  return sendEmail({
    content: `Eine neue Bestellung wurde von ${submittedBy} aufgegeben:\n\n${itemsList}`
  });
}