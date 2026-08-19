import { Layout } from './Layout.tsrx';
import { ProductPage } from './ProductPage.tsrx';

export type ProductAppProps = {
  productId: string;
  productPromise: Promise<{ name: string; price: number }>;
};

export function ProductApp({ productId, productPromise }: ProductAppProps) {
  return (
    <Layout title={`Product ${productId}`} productId={productId}>
      <ProductPage productId={productId} productPromise={productPromise} />
    </Layout>
  );
}
