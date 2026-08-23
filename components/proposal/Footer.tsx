export function Footer() {
  const month = new Date().toLocaleString("en-US", { month: "long" });

  return (
    <div className="max-w-[760px] mx-auto px-6 pt-16 pb-16">
      <h2 className="text-xl font-semibold text-balance mb-6">
        Broken Website. Broken Mobile Experience. Bring Both To Us.
      </h2>
      <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-text-muted">
        <span>Based In Pakistan, Jhelum. Serving Clients Worldwide.</span>
        <a href="mailto:hello@biflux.design" className="text-text-primary">
          hello@biflux.design
        </a>
        <span>Now Accepting Projects {month}</span>
      </div>
    </div>
  );
}
