import { renderToReadableStream } from 'octane/server';

async function readStreamToString(stream: ReadableStream<Uint8Array>): Promise<string> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();

  let result = '';
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) result += decoder.decode(value, { stream: true });
  }

  return result;
}

/** Insert hoisted metadata into a real `<head>` so stylesheets load on every route. */
export function assembleHtmlDocument(head: string, body: string): string {
  if (!head) return body;

  const htmlTag = /<html(?:\s[^>]*)?>/i;
  const match = body.match(htmlTag);
  if (!match || match.index === undefined) {
    return `<!DOCTYPE html><html><head>${head}</head><body>${body}</body></html>`;
  }

  const insertAt = match.index + match[0].length;
  return `${body.slice(0, insertAt)}<head>${head}</head>${body.slice(insertAt)}`;
}

export async function renderOctaneToHtml(
  component: unknown,
  props?: unknown,
): Promise<string> {
  let head = '';

  const stream = await renderToReadableStream(component as any, props, {
    headChannel: 'separate',
    onHeadReady: (headHtml) => {
      head = headHtml;
    },
  });

  const body = await readStreamToString(stream);
  return assembleHtmlDocument(head, body);
}
