import { Metadata } from 'next';

import { PageRegister } from './_components/page-register';

export const metadata: Metadata = {
  title: 'Register | Wedwise',
  description: 'Secure Register to access your account and manage your preferences',
  keywords: 'Register, sign up, authentication, secure access',
};

export const permissions = [];

export default function Page() {
  return <PageRegister />;
}
