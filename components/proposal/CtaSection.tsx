import type { PaymentLinks } from "@/lib/types";

const CAL_URL = "https://cal.com/umar-d1uf39/15min";

export function CtaSection({
  clientName,
  paymentLinks,
}: {
  clientName: string;
  paymentLinks?: PaymentLinks;
}) {
  const hasPayment = Boolean(paymentLinks?.payoneer || paymentLinks?.wise);
  const mailBody = encodeURIComponent(
    `I'd like to accept the proposal you sent for ${clientName}. Let's set up a time to talk.`
  );

  return (
    <div
      id="decision"
      className="bg-surface border-y border-border-outline"
    >
      <div className="max-w-[700px] mx-auto px-6 py-24 text-center">
        <h2 className="text-2xl font-semibold text-balance mb-4">
          You&apos;ve Seen What We Do. Now Let&apos;s Do It For You.
        </h2>
        <p className="text-text-muted max-w-[520px] mx-auto mb-9">
          No Pitch, No Pressure. Just An Honest Conversation About Your
          Website And Your Mobile Experience, If That&apos;s Where The Real
          Problem Is.
        </p>

        <div className="flex gap-3 justify-center flex-wrap mb-4">
          {paymentLinks?.payoneer && (
            <a
              href={paymentLinks.payoneer}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-7 bg-fill-button text-surface font-medium text-sm px-5 h-11"
            >
              Accept &amp; Pay Via Payoneer
            </a>
          )}
          {paymentLinks?.wise && (
            <a
              href={paymentLinks.wise}
              target="_blank"
              rel="noopener noreferrer"
              className={
                hasPayment && paymentLinks?.payoneer
                  ? "inline-flex items-center justify-center rounded-7 border border-border-outline text-text-primary font-medium text-sm px-5 h-11"
                  : "inline-flex items-center justify-center rounded-7 bg-fill-button text-surface font-medium text-sm px-5 h-11"
              }
            >
              Accept &amp; Pay Via Wise
            </a>
          )}
          {!hasPayment && (
            <a
              href={CAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-7 bg-fill-button text-surface font-medium text-sm px-5 h-11"
            >
              Accept &amp; Book A 15-Min Call
            </a>
          )}
        </div>

        <div className="text-sm text-text-muted">
          Prefer email?{" "}
          <a
            href={`mailto:hello@biflux.design?subject=${encodeURIComponent(
              "Accepting the proposal"
            )}&body=${mailBody}`}
            className="text-text-primary underline underline-offset-2"
          >
            hello@biflux.design
          </a>
        </div>
      </div>
    </div>
  );
}
