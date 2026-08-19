import { describe, expect, it } from 'vitest';

import { assembleHtmlDocument } from './octane-renderer';

describe('assembleHtmlDocument', () => {
  it('returns body unchanged when head is empty', () => {
    const body = '<!DOCTYPE html><html><body>content</body></html>';
    expect(assembleHtmlDocument('', body)).toBe(body);
  });

  it('inserts head after the html tag', () => {
    const head = '<title>Test</title><link rel="stylesheet" href="/app.css">';
    const body = '<!DOCTYPE html><html><body>content</body></html>';

    expect(assembleHtmlDocument(head, body)).toBe(
      '<!DOCTYPE html><html><head><title>Test</title><link rel="stylesheet" href="/app.css"></head><body>content</body></html>',
    );
  });

  it('handles html tags with attributes', () => {
    const head = '<title>Test</title>';
    const body = '<html lang="en"><body>content</body></html>';

    expect(assembleHtmlDocument(head, body)).toBe(
      '<html lang="en"><head><title>Test</title></head><body>content</body></html>',
    );
  });

  it('wraps fragments without an html tag', () => {
    const head = '<title>Test</title>';
    const body = '<div>fragment</div>';

    expect(assembleHtmlDocument(head, body)).toBe(
      '<!DOCTYPE html><html><head><title>Test</title></head><body><div>fragment</div></body></html>',
    );
  });
});
