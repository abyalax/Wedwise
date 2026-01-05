import { Metadata } from 'next';
import { PageOrder } from '../_components/page-order';

export const metadata: Metadata = {
  title: 'Order | Wedwise',
};

type Props = PageProps<'/order/[slugTheme]'>;

export default async function Page({ params }: Props) {
  const { slugTheme } = await params;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return <PageOrder slug={slugTheme} />;
}
