export default function GlobalLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="animate-pulse space-y-6">
        <div className="h-8 w-64 rounded bg-slate-200 dark:bg-slate-800" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="h-32 rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-32 rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-32 rounded-xl bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>
    </div>
  );
}