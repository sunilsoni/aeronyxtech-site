import LayoutBasic from "@/components/LayoutBasic"
import { useState } from "react"
import companies from "@/data/companies.json"

export default function CompanyProfiles() {
    const [search, setSearch] = useState("")
    const [visaFilter, setVisaFilter] = useState("")
    const [visibleCount, setVisibleCount] = useState(20) // show first 20

    // Default enriched profiles
    const companyProfiles = companies.map((c) => ({
        ...c,
        logo: `/logos/${c.id}.svg`,
        industry: c.industry || "To be updated",
        visaSupport: c.visaSupport || ["H1B", "OPT"], // defaults
        jobsUrl: c.jobsUrl || "#",
        description: c.description || "Profile coming soon...",
        interviewPage: `/interview-questions?company=${c.id}`,
    }))

    // Apply search + filter
    const filtered = companyProfiles.filter((c) => {
        const matchSearch =
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.industry.toLowerCase().includes(search.toLowerCase())
        const matchVisa =
            visaFilter === "" || c.visaSupport.includes(visaFilter)
        return matchSearch && matchVisa
    })

    // Show only first N
    const visibleCompanies = filtered.slice(0, visibleCount)

    const visaTypes = Array.from(
        new Set(companyProfiles.flatMap((c) => c.visaSupport))
    )

    return (
        <LayoutBasic>
            <h1 className="section-title mb-6">Company Profiles</h1>

            {/* Search + Filters */}
            <div className="card p-4 mb-6 flex flex-col md:flex-row gap-3">
                <input
                    className="rounded-xl border-gray-300 focus:ring-brand-500 dark:bg-gray-800 dark:text-white flex-1"
                    placeholder="Search by name or industry..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value)
                        setVisibleCount(20) // reset pagination on search
                    }}
                />

                <select
                    className="rounded-xl border-gray-300 focus:ring-brand-500 dark:bg-gray-800 dark:text-white"
                    value={visaFilter}
                    onChange={(e) => {
                        setVisaFilter(e.target.value)
                        setVisibleCount(20) // reset pagination on filter
                    }}
                >
                    <option value="">All Visa Types</option>
                    {visaTypes.map((v) => (
                        <option key={v} value={v}>
                            {v}
                        </option>
                    ))}
                </select>
            </div>

            {/* Company Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleCompanies.map((c) => (
                    <div key={c.id} className="card p-4 flex flex-col">
                        <img
                            src={c.logo}
                            alt={c.name}
                            className="h-12 w-auto object-contain mb-3"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = "/logos/company.svg"
                            }}
                        />
                        <h2 className="text-xl font-semibold">{c.name}</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                            {c.industry}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-3">
                            {c.visaSupport.map((v) => (
                                <span
                                    key={v}
                                    className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-lg text-xs"
                                >
                  {v}
                </span>
                            ))}
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 flex-1">
                            {c.description}
                        </p>

                        <div className="mt-4 flex gap-3">
                            {c.jobsUrl !== "#" && (
                                <a
                                    href={c.jobsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-3 py-2 bg-brand-600 text-white rounded-lg text-sm"
                                >
                                    Apply Now
                                </a>
                            )}
                            <a
                                href={c.interviewPage}
                                className="px-3 py-2 border rounded-lg text-sm"
                            >
                                View Questions
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            {/* Load More Button */}
            {visibleCount < filtered.length && (
                <div className="flex justify-center mt-6">
                    <button
                        className="px-4 py-2 bg-brand-600 text-white rounded-lg"
                        onClick={() => setVisibleCount((prev) => prev + 20)}
                    >
                        Load More
                    </button>
                </div>
            )}
        </LayoutBasic>
    )
}