import LayoutBasic from "@/components/LayoutBasic"
import { useState, useEffect } from "react"
import guides from "@/data/guides.json"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

export default function GuidesPage() {
    const [selectedGuide, setSelectedGuide] = useState(null)
    const [content, setContent] = useState("")
    const [bookmarks, setBookmarks] = useState<string[]>([])

    useEffect(() => {
        const saved = localStorage.getItem("guideBookmarks")
        if (saved) setBookmarks(JSON.parse(saved))
    }, [])

    useEffect(() => {
        localStorage.setItem("guideBookmarks", JSON.stringify(bookmarks))
    }, [bookmarks])

    useEffect(() => {
        if (selectedGuide?.contentFile) {
            fetch(selectedGuide.contentFile)
                .then((res) => res.text())
                .then((text) => setContent(text))
        }
    }, [selectedGuide])

    const categories = Array.from(new Set(guides.map((g) => g.category)))

    const toggleBookmark = (id: string) => {
        setBookmarks((prev) =>
            prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
        )
    }

    return (
        <LayoutBasic>
            <h1 className="section-title mb-6">Preparation Guides</h1>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Sidebar */}
                <aside className="lg:w-64 bg-white dark:bg-gray-900 border rounded-xl p-4 space-y-4">
                    {categories.map((cat) => (
                        <div key={cat}>
                            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase text-sm tracking-wide">
                                {cat}
                            </h3>
                            <ul className="space-y-1">
                                {guides
                                    .filter((g) => g.category === cat)
                                    .map((g) => (
                                        <li key={g.id}>
                                            <button
                                                onClick={() => setSelectedGuide(g)}
                                                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                                                    selectedGuide?.id === g.id
                                                        ? "bg-brand-600 text-white"
                                                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                                                }`}
                                            >
                                                {g.title}
                                            </button>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    ))}
                </aside>

                {/* Main Content */}
                <main className="flex-1">
                    {!selectedGuide && (
                        <div className="text-gray-500 dark:text-gray-400">
                            Select a guide from the left panel.
                        </div>
                    )}

                    {selectedGuide && (
                        <div className="card p-6 max-w-3xl mx-auto">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold">{selectedGuide.title}</h2>
                                <button
                                    onClick={() => toggleBookmark(selectedGuide.id)}
                                    className="px-3 py-1 border rounded-lg text-sm"
                                >
                                    {bookmarks.includes(selectedGuide.id)
                                        ? "★ Bookmarked"
                                        : "☆ Bookmark"}
                                </button>
                            </div>

                            <article className="prose dark:prose-invert max-w-none">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {content}
                                </ReactMarkdown>
                            </article>
                        </div>
                    )}
                </main>
            </div>
        </LayoutBasic>
    )
}