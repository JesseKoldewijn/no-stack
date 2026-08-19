export function DocumentApp({ message }: { message: string }) {
  return (
    <html>
      <title>Document Test</title>
      <meta charSet="utf-8" />
      <link rel="stylesheet" href="/assets/test.css" />
      <body>
        <div id="app">{message}</div>
      </body>
    </html>
  );
}
