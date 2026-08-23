import { FAQS } from "@/lib/faq";
import { SectionHeading } from "./SectionHeading";

export function Faq() {
  return (
    <div id="sec-faq" className="max-w-[760px] mx-auto px-6 py-14">
      <SectionHeading eyebrow="Before You Decide" title="Just Read This First" />
      <div className="flex flex-col">
        {FAQS.map((item, i) => (
          <details
            key={item.q}
            className={i === 0 ? "py-5 group" : "py-5 border-t border-border-outline group"}
          >
            <summary className="cursor-pointer font-semibold list-none flex justify-between items-center gap-3 [&::-webkit-details-marker]:hidden">
              {item.q}
              <span className="shrink-0 text-lg leading-none">
                <span className="group-open:hidden">+</span>
                <span className="hidden group-open:inline">&minus;</span>
              </span>
            </summary>
            <p className="pt-3 text-sm text-text-muted max-w-[640px]">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
