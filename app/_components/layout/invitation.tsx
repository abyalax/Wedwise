import Head from 'next/head';
import Script from 'next/script';
import { FC, PropsWithChildren } from 'react';
import { P } from '~/components/ui/typography';

export const metadata = {
  title: 'Invitation',
};

export const InvitationLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Head>
        <P>Invitation Layout</P>
        <Script src="/scripts/invitation.js" strategy="afterInteractive" />
        {/* maybe script assets */}
      </Head>
      <body>{children}</body>
    </>
  );
};
