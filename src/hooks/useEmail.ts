import { useState } from 'react';
import { sendEmail } from '../lib/email';

export function useEmail() {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const send = async (to: string, subject: string, message: string, additionalParams = {}) => {
    try {
      setSending(true);
      setError(null);
      await sendEmail({
        to_email: to,
        subject,
        message,
        ...additionalParams
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send email');
      throw err;
    } finally {
      setSending(false);
    }
  };

  return {
    send,
    sending,
    error
  };
}