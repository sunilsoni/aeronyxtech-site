import LayoutBasic from "@/components/LayoutBasic"
import { useState } from "react"
import hotlistData from "@/data/hotlist.json"
import archiveData from "@/data/hotlist-archive.json"

export default function Hotlist() {
    const [search, setSearch] = useState("")
    const [visaFilter, setVisaFilter] = useState("")
    const [visibleCount, setVisibleCount] = useState(10)
    const [showArchived, setShowArchived] = useState(false)

    // Combine active + archived if toggle is on
    const jobs = showArchived
        ? [...hotlistData, ...archiveData]
        : [...hotlistData]

    // Sort latest first
    const sortedJobs = jobs.sort(
        (a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
    )

    // Apply search + filters
    const filtered = sortedJobs.filter((job) => {
        const matchSearch =
            job.title.toLowerCase().includes(search.toLowerCase()) ||
            job.company.toLowerCase().includes(search.toLowerCase()) ||
            job.location.toLowerCase().includes(search.toLowerCase()) ||
            job.description.toLowerCase().includes(search.toLowerCase())
        const matchVisa = visaFilter === "" || job.visa === visaFilter
        return matchSearch && matchVisa
    })

    // Pagination
    const visibleJobs = filtered.slice(0, visibleCount)

    const visaTypes = Array.from(new Set(jobs.map((j) => j.visa)))

    return (
        <LayoutBasic>
            <h1 className="section-title mb-6">Hotlist 2025 – USA Staffing C2C Jobs</h1>

            {/* Search + Filter + Archive Toggle */}
            <div className="card p-4 mb-6 flex flex-col md:flex-row gap-3">
                <input
                    className="rounded-xl border-gray-300 focus:ring-brand-500 dark:bg-gray-800 dark:text-white flex-1"
                    placeholder="Search jobs by title, company, location..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value)
                        setVisibleCount(10)
                    }}
                />

                <select
                    className="rounded-xl border-gray-300 focus:ring-brand-500 dark:bg-gray-800 dark:text-white"
                    value={visaFilter}
                    onChange={(e) => {
                        setVisaFilter(e.target.value)
                        setVisibleCount(10)
                    }}
                >
                    <option value="">All Visa Types</option>
                    {visaTypes.map((v) => (
                        <option key={v} value={v}>
                            {v}
                        </option>
                    ))}
                </select>

                <label className="flex items-center gap-2 text-sm">
                    <input
                        type="checkbox"
                        checked={showArchived}
                        onChange={() => {
                            setShowArchived((prev) => !prev)
                            setVisibleCount(10)
                        }}
                    />
                    Show Archived
                </label>
            </div>

            {/* Jobs List */}
            <div className="space-y-4">
                {visibleJobs.map((job) => (
                    <div key={job.id} className="card p-4 flex flex-col">
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-lg font-semibold">{job.title}</h2>
                            <span className="px-2 py-1 text-xs rounded-lg bg-brand-100 text-brand-700">
                {job.visa}
              </span>
                        </div>

                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                            {job.company} • {job.location}
                        </p>

                        <p className="text-gray-600 dark:text-gray-300 flex-1 mb-3">
                            {job.description}
                        </p>

                        <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">
                Posted: {new Date(job.postedAt).toLocaleDateString()}
              </span>
                            <a
                                href={job.applyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-2 bg-brand-600 text-white rounded-lg text-sm"
                            >
                                Apply Now
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            {/* Load More */}
            {visibleCount < filtered.length && (
                <div className="flex justify-center mt-6">
                    <button
                        className="px-4 py-2 bg-brand-600 text-white rounded-lg"
                        onClick={() => setVisibleCount((prev) => prev + 10)}
                    >
                        Load More
                    </button>
                </div>
            )}
        </LayoutBasic>
    )
}