import { describe, expect, it } from 'vitest';

import { DocumentApp } from '../test/fixtures/DocumentApp.tsrx';
import { renderOctaneToHtml } from './octane-renderer';

describe('renderOctaneToHtml', () => {
  it('renders a valid document with head metadata and body content', async () => {
    const html = await renderOctaneToHtml(DocumentApp, { message: 'Hello NOST' });

    expect(html).toContain('<html><head>');
    expect(html).toContain('<title>Document Test</title>');
    expect(html).toContain('<link rel="stylesheet" href="/assets/test.css">');
    expect(html).toContain('Hello NOST');
    expect(html).toContain('<div id="app">');
  });

  it('passes props to the entry component', async () => {
    const html = await renderOctaneToHtml(DocumentApp, { message: 'Props work' });
    expect(html).toContain('Props work');
  });
});
