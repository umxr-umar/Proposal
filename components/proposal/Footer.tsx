export function Footer() {
  const month = new Date().toLocaleString("en-US", { month: "long" });

  return (
    <div className="max-w-[820px] mx-auto px-6 pt-16 pb-20">
      <h2 className="font-display font-normal text-3xl text-balance mb-8">
        Broken Website. Broken Mobile Experience. Bring Both To Us.
      </h2>
      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-muted">
        <span>Based In Pakistan, Jhelum. Serving Clients Worldwide.</span>
        <a href="mailto:hello@biflux.design" className="text-ink">
          hello@biflux.design
        </a>
        <span>Now Accepting Projects {month}</span>
      </div>
    </div>
  );
}
