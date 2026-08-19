import type { JSX } from 'octane';

export type LayoutProps = {
  title: string;
  productId?: string;
  children: JSX.Element;
};

export function Layout({ title, productId, children }: LayoutProps) {
  return (
    <html>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" href="/assets/hydrate.css" />
      <body>
        <div
          id="app"
          data-page={productId ? 'product' : 'home'}
          data-product-id={productId ?? undefined}
        >
          {children}
        </div>
        <script type="module" src="/assets/hydrate.js"></script>
      </body>
    </html>
  );
}

