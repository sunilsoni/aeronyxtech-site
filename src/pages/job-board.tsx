import Layout from "@/components/Layout"
import JobCard from "@/components/JobCard"
import jobs from "@/data/jobs.json"
import { useMemo, useState } from "react"
import Button from "@/components/ui/Button"

const PAGE_SIZE = 6

export default function JobBoard() {
    const [q, setQ] = useState("")
    const [visa, setVisa] = useState<string>("")
    const [loc, setLoc] = useState<string>("")
    const [tag, setTag] = useState<string>("")
    const [page, setPage] = useState(1)

    const filtered = useMemo(() => {
        return jobs.filter((j: any) => {
            const inQ = q
                ? (j.title + j.company + j.location + j.description + (j.tags || []).join(" "))
                    .toLowerCase()
                    .includes(q.toLowerCase())
                : true
            const inVisa = visa ? j.visa === visa : true
            const inLoc = loc ? j.location.toLowerCase().includes(loc.toLowerCase()) : true
            const inTag = tag
                ? (j.tags || []).map((t: string) => t.toLowerCase()).includes(tag.toLowerCase())
                : true
            return inQ && inVisa && inLoc && inTag
        })
    }, [q, visa, loc, tag])

    const visible = filtered.slice(0, page * PAGE_SIZE)

    return (
        <Layout>
            <div className="flex flex-col gap-4">
                <h1 className="section-title">Latest Jobs</h1>

                {/* Sticky Filter Bar */}
                <div className="card p-4 grid md:grid-cols-4 gap-3 sticky top-20 bg-white/90 dark:bg-gray-900/90 backdrop-blur z-10">
                    <input
                        className="rounded-xl border-gray-300 focus:ring-brand-500 dark:bg-gray-800 dark:text-white"
                        placeholder="Search title, company, tech..."
                        value={q}
                        onChange={(e) => {
                            setQ(e.target.value)
                            setPage(1)
                        }}
                    />
                    <select
                        className="rounded-xl border-gray-300 focus:ring-brand-500 dark:bg-gray-800 dark:text-white"
                        value={visa}
                        onChange={(e) => {
                            setVisa(e.target.value)
                            setPage(1)
                        }}
                    >
                        <option value="">All Visa Types</option>
                        <option>H1B</option>
                        <option>GC</option>
                        <option>OPT</option>
                        <option>CPT</option>
                        <option>C2C</option>
                    </select>
                    <input
                        className="rounded-xl border-gray-300 focus:ring-brand-500 dark:bg-gray-800 dark:text-white"
                        placeholder="Filter by location"
                        value={loc}
                        onChange={(e) => {
                            setLoc(e.target.value)
                            setPage(1)
                        }}
                    />
                    {tag && (
                        <button
                            onClick={() => setTag("")}
                            className="rounded-xl bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 px-3 py-2"
                        >
                            Clear tag: {tag}
                        </button>
                    )}
                </div>

                {/* Job Grid */}
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {visible.map((job: any, i: number) => (
                        <JobCard key={i} job={job} onTagClick={(t: string) => setTag(t)} />
                    ))}
                    {filtered.length === 0 && (
                        <div className="text-gray-500 dark:text-gray-400">No jobs match your filters.</div>
                    )}
                </div>

                {/* Pagination */}
                {visible.length < filtered.length && (
                    <div className="flex justify-center mt-6">
                        <Button onClick={() => setPage((p) => p + 1)}>Load More</Button>
                    </div>
                )}
            </div>
        </Layout>
    )
}