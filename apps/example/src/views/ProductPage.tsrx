import { Suspense, use, useState } from 'octane';

import { Link } from '../router/Link.tsrx';

export type ProductPageProps = {
  productId: string;
  productPromise: Promise<{ name: string; price: number }>;
};

export function ProductDetails({ productId, productPromise }: ProductPageProps) {
  const product = use(productPromise);
  const [likes, setLikes, getLikes] = useState(0);

  return (
    <div
      class="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50"
      data-product-id={productId}
    >
      <header class="border-b border-slate-200 bg-white/60 backdrop-blur dark:border-slate-800 dark:bg-slate-950/60">
        <div class="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link
            class="text-sm font-semibold text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            to="/"
          >
            ← Back to home
          </Link>
          <span class="text-sm font-medium text-slate-500 dark:text-slate-400">
            Product #{productId}
          </span>
        </div>
      </header>

      <main class="mx-auto max-w-3xl px-6 py-10">
        <div class="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900/20">
          <h1 class="text-3xl font-extrabold tracking-tight">{product.name}</h1>
          <p class="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Price:{' '}
            <span class="font-semibold text-slate-900 dark:text-white">${product.price}</span>
          </p>
          <button
            class="mt-6 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
            onClick={() => setLikes(getLikes() + 1)}
          >
            Likes: {likes}
          </button>
        </div>
      </main>
    </div>
  );
}

export function ProductPage({ productId, productPromise }: ProductPageProps) {
  return (
    <Suspense
      fallback={
        <div class="min-h-screen bg-white px-6 py-10 text-slate-600 dark:bg-slate-950 dark:text-slate-300">
          Loading product...
        </div>
      }
    >
      <ProductDetails productId={productId} productPromise={productPromise} />
    </Suspense>
  );
}
