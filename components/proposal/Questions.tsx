"use client";

import { useState } from "react";

export function Questions({ clientName }: { clientName: string }) {
  const [text, setText] = useState("");

  function send() {
    if (!text.trim()) return;
    const subject = encodeURIComponent(`Question about my proposal from ${clientName}`);
    const body = encodeURIComponent(text.trim());
    window.location.href = `mailto:hello@biflux.design?subject=${subject}&body=${body}`;
  }

  return (
    <div className="max-w-[560px] mx-auto px-6 py-16 text-center">
      <div className="text-xs tracking-wide uppercase text-ink-muted mb-4">
        Not Ready Yet
      </div>
      <h2 className="font-display font-normal text-2xl mb-5">
        Have A Question Before Deciding?
      </h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ask anything, pricing, timeline, scope..."
        className="w-full min-h-[90px] bg-surface-muted border border-border rounded-2 p-4 text-ink mb-4 resize-y"
      />
      <button
        type="button"
        onClick={send}
        className="inline-flex items-center justify-center rounded-2 border border-border text-ink font-medium text-sm px-6 h-12"
      >
        Send Question
      </button>
    </div>
  );
}
