import { ProductPage } from './ProductPage.tsrx';
import { useLoaderData, useParams } from '../router/Matches.tsrx';
import { productRoute } from '../router/route-tree';

export function ProductRoutePage() {
  const { id } = useParams({ from: productRoute.id });
  const product = useLoaderData<{
    id: string;
    name: string;
    price: number;
  }>({ from: productRoute.id });

  return <ProductPage productId={id} productPromise={Promise.resolve(product)} />;
}
