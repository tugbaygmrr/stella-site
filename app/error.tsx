"use client";

import { useEffect } from "react";

/**
 * Global error boundary. Without this, any unhandled client-side exception
 * (e.g. a WebGL/Three.js failure on a low-memory phone) blanks the entire
 * page with Next.js's bare "Application error" fallback. Here we log it and
 * offer a recovery action instead of a white screen.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-warm text-charcoal px-6">
      <div className="max-w-md text-center">
        <p className="text-[11px] tracking-[0.3em] uppercase text-charcoal/50 mb-4">
          Stella Istanbul
        </p>
        <h1 className="font-serif font-light text-3xl mb-4">
          Something went wrong loading this view.
        </h1>
        <p className="text-sm text-charcoal/70 mb-8 leading-relaxed">
          Please try again. If the problem persists, reload the page.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center justify-center px-6 py-3 text-[12px] tracking-[0.2em] uppercase border border-charcoal/30 hover:bg-charcoal hover:text-warm transition-colors"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
