import { notFound } from 'next/navigation';

// Always 404s, so there is no instant UI to validate.
export const instant = false;

/** Any URL under /{lang}/ without its own route renders [lang]/not-found.tsx inside the site layout. */
export default function CatchAll() {
  notFound();
}
