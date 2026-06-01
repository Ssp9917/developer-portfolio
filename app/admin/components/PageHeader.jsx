export default function PageHeader({ title, description, action }) {
  return (
    <header className="flex flex-wrap items-start justify-between gap-4 mb-8">
      <section>
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        {description && <p className="text-slate-400 mt-1 text-sm">{description}</p>}
      </section>
      {action}
    </header>
  );
}
