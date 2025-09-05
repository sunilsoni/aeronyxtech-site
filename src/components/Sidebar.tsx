import Link from "next/link";

const items = [
  { label: "Visa Types", href: "/job-board?filter=visa" },
  { label: "Tech Stack", href: "/job-board?filter=tech" },
  { label: "Location", href: "/job-board?filter=loc" }
];

export default function Sidebar() {
  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <div className="sticky top-20">
        <nav className="card p-4">
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">Filters</h3>
          <ul className="grid gap-2">
            {items.map((it) => (
              <li key={it.label}>
                <Link href={it.href} className="block rounded-xl border px-3 py-2 hover:border-brand-500 hover:bg-brand-50 transition">
                  {it.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
