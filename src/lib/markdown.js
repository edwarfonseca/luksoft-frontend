import { marked } from 'marked';
import DOMPurify from 'dompurify';

/** Markdown -> HTML sanitizado. Usado tanto en el render público del post como en la preview del admin. */
export function renderMarkdown(markdown) {
  const html = marked.parse(markdown || '', { breaks: true });
  return DOMPurify.sanitize(html);
}
