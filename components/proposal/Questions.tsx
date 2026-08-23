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
    <div className="max-w-[560px] mx-auto px-6 py-14 text-center">
      <div className="text-xs tracking-wide uppercase text-text-muted mb-3">
        Not Ready Yet
      </div>
      <h2 className="text-lg font-semibold mb-4">
        Have A Question Before Deciding?
      </h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ask anything, pricing, timeline, scope..."
        className="w-full min-h-[80px] bg-fill-input border border-border-outline rounded-4 p-3 text-sm text-text-primary mb-3 resize-y"
      />
      <button
        type="button"
        onClick={send}
        className="inline-flex items-center justify-center rounded-7 border border-border-outline text-text-primary font-medium text-sm px-5 h-11"
      >
        Send Question
      </button>
    </div>
  );
}
