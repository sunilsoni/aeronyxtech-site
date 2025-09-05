import LayoutBasic from "@/components/LayoutBasic"
import { useState, useEffect, useMemo } from "react"
import companies from "@/data/companies.json"
import { Menu, ChevronRight, ChevronDown } from "lucide-react"

export default function InterviewQs() {
    const [selectedCompany, setSelectedCompany] = useState("amazon")
    const [questions, setQuestions] = useState<any[]>([])
    const [category, setCategory] = useState("")
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [companySearch, setCompanySearch] = useState("")
    const [expandedCompany, setExpandedCompany] = useState("amazon")

    // Load questions dynamically
    useEffect(() => {
        import(`@/data/questions/${selectedCompany}.json`).then((mod) => {
            setQuestions(mod.default)
            setCategory("")
        })
    }, [selectedCompany])

    // Extract categories dynamically
    const categories = useMemo(() => {
        return Array.from(new Set(questions.map((q) => q.category))).sort()
    }, [questions])

    // Filter Qs by category
    const filtered = useMemo(() => {
        return questions.filter((q) => category === "" || q.category === category)
    }, [questions, category])

    return (
        <LayoutBasic>
            <div className="flex gap-6">
                {/* Sidebar (desktop) */}
                {/* Sidebar (desktop) */}
                <aside
                    className="
    hidden lg:flex flex-col
    min-w-[260px] lg:w-80
    bg-white dark:bg-gray-900
    border-r dark:border-gray-800
    lg:sticky lg:self-start
    lg:top-[calc(var(--nav-height)+16px)]
    lg:max-h-[calc(100vh-var(--nav-height)-32px)]
    overflow-y-auto rounded-xl lg:rounded-none
  "
                >
                    <SidebarNav
                        selectedCompany={selectedCompany}
                        setSelectedCompany={setSelectedCompany}
                        categories={categories}
                        category={category}
                        setCategory={setCategory}
                        companySearch={companySearch}
                        setCompanySearch={setCompanySearch}
                        expandedCompany={expandedCompany}
                        setExpandedCompany={setExpandedCompany}
                    />
                </aside>

                {/* Drawer Toggle (mobile) */}
                <button
                    className="lg:hidden mb-4 flex items-center gap-2 px-3 py-2 rounded-lg border dark:border-gray-700"
                    onClick={() => setDrawerOpen(true)}
                >
                    <Menu className="h-5 w-5" /> Filters
                </button>

                {/* Drawer overlay (mobile) */}
                {drawerOpen && (
                    <div className="fixed inset-0 z-50 flex">
                        <div className="bg-white dark:bg-gray-900 w-72 p-4 overflow-y-auto shadow-lg">
                            <SidebarNav
                                selectedCompany={selectedCompany}
                                setSelectedCompany={(c) => {
                                    setSelectedCompany(c)
                                    setDrawerOpen(false)
                                }}
                                categories={categories}
                                category={category}
                                setCategory={(cat) => {
                                    setCategory(cat)
                                    setDrawerOpen(false)
                                }}
                                companySearch={companySearch}
                                setCompanySearch={setCompanySearch}
                                expandedCompany={expandedCompany}
                                setExpandedCompany={setExpandedCompany}
                            />
                        </div>
                        <div
                            className="flex-1 bg-black/40"
                            onClick={() => setDrawerOpen(false)}
                        />
                    </div>
                )}

                {/* Main Content */}

                <main className="flex-1">
                    <h1 className="section-title mb-6 flex items-center gap-2">
                        <img
                            src={`/logos/${selectedCompany}.svg`}
                            alt={companies.find(c => c.id === selectedCompany)?.name || "Logo"}
                            className="h-8 w-auto object-contain"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = "/logos/company.svg";
                            }}
                        />
                        Interview Questions
                        {selectedCompany && (
                            <span className="text-brand-600 dark:text-brand-400 font-semibold">
      — {companies.find(c => c.id === selectedCompany)?.name}
    </span>
                        )}
                    </h1>

                    <div className="space-y-4">
                        {filtered.map((q, i) => (
                            <details
                                key={i}
                                className="card p-4 cursor-pointer open:border-brand-500"
                            >
                                <summary className="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                                    {q.category} – {q.question}
                                </summary>
                                <p className="mt-2 text-gray-700 dark:text-gray-300">
                                    {q.answer}
                                </p>
                            </details>
                        ))}
                        {filtered.length === 0 && (
                            <p className="text-gray-500 dark:text-gray-400">
                                No questions available.
                            </p>
                        )}
                    </div>
                </main>
            </div>
        </LayoutBasic>
    )
}
function SidebarNav({
                        selectedCompany,
                        setSelectedCompany,
                        categories,
                        category,
                        setCategory,
                        companySearch,
                        setCompanySearch,
                        expandedCompany,
                        setExpandedCompany,
                    }: {
    selectedCompany: string
    setSelectedCompany: (id: string) => void
    categories: string[]
    category: string
    setCategory: (c: string) => void
    companySearch: string
    setCompanySearch: (s: string) => void
    expandedCompany: string
    setExpandedCompany: (id: string) => void
}) {
    const filteredCompanies = companies.filter((c) =>
        c.name.toLowerCase().includes(companySearch.toLowerCase())
    )

    return (
        <nav className="space-y-6">
            {/* Company Search */}
            <div>
                <input
                    className="w-full rounded-xl border-gray-300 focus:ring-brand-500 dark:bg-gray-800 dark:text-white mb-3"
                    placeholder="Search companies..."
                    value={companySearch}
                    onChange={(e) => setCompanySearch(e.target.value)}
                />
                <ul className="space-y-1 p-2">
                    {filteredCompanies.map((c) => {
                        const isExpanded = expandedCompany === c.id
                        return (
                            <li key={c.id}>
                                {/* Custom button, no <select> */}
                                <button
                                    onClick={() => {
                                        setExpandedCompany(isExpanded ? "" : c.id)
                                        setSelectedCompany(c.id)
                                    }}
                                    className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition ${
                                        selectedCompany === c.id
                                            ? "bg-brand-600 text-white"
                                            : "hover:bg-gray-100 dark:hover:bg-gray-800"
                                    }`}
                                >
                                    {c.name}
                                    {isExpanded ? (
                                        <ChevronDown className="h-4 w-4" />
                                    ) : (
                                        <ChevronRight className="h-4 w-4" />
                                    )}
                                </button>

                                {/* Categories only if expanded */}
                                {isExpanded && categories.length > 0 && (
                                    <ul className="ml-4 mt-1 space-y-1">
                                        <li>
                                            <button
                                                onClick={() => setCategory("")}
                                                className={`w-full text-left px-3 py-1.5 rounded-lg transition text-sm ${
                                                    category === ""
                                                        ? "bg-brand-500 text-white"
                                                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                                                }`}
                                            >
                                                All
                                            </button>
                                        </li>
                                        {categories.map((cat) => (
                                            <li key={cat}>
                                                <button
                                                    onClick={() => setCategory(cat)}
                                                    className={`w-full text-left px-3 py-1.5 rounded-lg transition text-sm ${
                                                        category === cat
                                                            ? "bg-brand-500 text-white"
                                                            : "hover:bg-gray-100 dark:hover:bg-gray-800"
                                                    }`}
                                                >
                                                    {cat}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        )
                    })}
                </ul>
            </div>
        </nav>
    )
}