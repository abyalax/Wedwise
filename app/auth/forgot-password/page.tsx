import { Metadata } from 'next';

import { PageForgotPassword } from './_components/page-forgot-password';

export const metadata: Metadata = {
  title: 'Forgot Password | Wedwise',
  description: 'Secure Forgot Password to reset password account',
  keywords: 'Forgot Password, sign in, authentication, secure access',
};

export const permissions = [];

export default function Page() {
  return <PageForgotPassword />;
}
