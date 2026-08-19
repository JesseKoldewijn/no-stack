import { Layout } from './Layout.tsrx';
import { RouterProvider } from '../router/RouterProvider.tsrx';
import type { AppRouter } from '../router/create-app-router';

export type AppDocumentProps = {
  router: AppRouter;
  title?: string;
};

export function AppDocument({ router, title = 'NOST Stack' }: AppDocumentProps) {
  return (
    <Layout title={title}>
      <RouterProvider router={router} />
    </Layout>
  );
}
