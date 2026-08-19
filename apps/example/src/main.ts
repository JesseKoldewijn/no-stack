import type { IncomingMessage, ServerResponse } from 'http';

import { createExpressApp } from './create-app';

type ServerlessHandler = (req: IncomingMessage, res: ServerResponse) => Promise<void>;

async function bootstrapLocal() {
  const app = await createExpressApp();
  const port = process.env.PORT ? Number(process.env.PORT) : 3000;
  await app.listen(port);
}

const handler: ServerlessHandler = async (req, res) => {
  const app = await createExpressApp();
  app(req, res);
};

module.exports = handler;

if (require.main === module) {
  bootstrapLocal().catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(1);
  });
}
