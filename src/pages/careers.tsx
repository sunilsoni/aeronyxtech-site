import LayoutBasic from "@/components/LayoutBasic"
import { useState } from "react"

export default function WorkWithUs() {
    // State for forms
    const [resumeForm, setResumeForm] = useState({
        name: "",
        email: "",
        phone: "",
        visa: "",
        tech: "",
        resume: null,
    })

    const [partnerForm, setPartnerForm] = useState({
        name: "",
        email: "",
        company: "",
        needs: "",
    })

    const handleResumeChange = (e) => {
        const { name, value, files } = e.target
        setResumeForm((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }))
    }

    const handlePartnerChange = (e) => {
        const { name, value } = e.target
        setPartnerForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleResumeSubmit = (e) => {
        e.preventDefault()
        alert("Resume submitted successfully! (To be connected to backend)")
        console.log(resumeForm)
    }

    const handlePartnerSubmit = (e) => {
        e.preventDefault()
        alert("Partner inquiry submitted! (To be connected to backend)")
        console.log(partnerForm)
    }

    return (
        <LayoutBasic>
            {/* Hero Section */}
            <section className="text-center py-12">
                <h1 className="text-4xl font-bold mb-4">Work with AeronyxTech</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                    Join us as a consultant, employee, or partner — grow your career in
                    IT staffing and consulting.
                </p>
                <a
                    href="#resume-form"
                    className="px-6 py-3 bg-brand-600 text-white rounded-lg"
                >
                    Submit Your Resume
                </a>
            </section>

            {/* Benefits Section */}
            <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 py-12">
                {[
                    {
                        icon: "🌎",
                        title: "US Job Market Focus",
                        desc: "C2C, H1B, GC, OPT, CPT supported.",
                    },
                    {
                        icon: "🤝",
                        title: "Direct Client Connections",
                        desc: "Work with top-tier US companies.",
                    },
                    {
                        icon: "🚀",
                        title: "Career Growth",
                        desc: "Training in Java, AWS, React, and more.",
                    },
                    {
                        icon: "📈",
                        title: "Transparent Support",
                        desc: "Clear payment and compliance process.",
                    },
                ].map((b) => (
                    <div
                        key={b.title}
                        className="card p-6 text-center flex flex-col items-center"
                    >
                        <div className="text-4xl mb-3">{b.icon}</div>
                        <h3 className="text-lg font-semibold">{b.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{b.desc}</p>
                    </div>
                ))}
            </section>

            {/* Resume Submission Form */}
            <section id="resume-form" className="py-12">
                <h2 className="text-2xl font-bold mb-6">Submit Your Resume</h2>
                <form
                    onSubmit={handleResumeSubmit}
                    className="card p-6 grid gap-4 max-w-xl"
                >
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={resumeForm.name}
                        onChange={handleResumeChange}
                        className="input"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={resumeForm.email}
                        onChange={handleResumeChange}
                        className="input"
                        required
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={resumeForm.phone}
                        onChange={handleResumeChange}
                        className="input"
                    />
                    <select
                        name="visa"
                        value={resumeForm.visa}
                        onChange={handleResumeChange}
                        className="input"
                    >
                        <option value="">Visa Type</option>
                        <option value="C2C">C2C</option>
                        <option value="H1B">H1B</option>
                        <option value="GC">GC</option>
                        <option value="OPT">OPT</option>
                        <option value="CPT">CPT</option>
                        <option value="Other">Other</option>
                    </select>
                    <input
                        type="text"
                        name="tech"
                        placeholder="Technology/Skill (Java, AWS, React)"
                        value={resumeForm.tech}
                        onChange={handleResumeChange}
                        className="input"
                    />
                    <input
                        type="file"
                        name="resume"
                        accept=".pdf,.doc,.docx"
                        onChange={handleResumeChange}
                        className="input"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-brand-600 text-white rounded-lg"
                    >
                        Submit Resume
                    </button>
                </form>
            </section>

            {/* Client Partnership Form */}
            <section className="py-12">
                <h2 className="text-2xl font-bold mb-6">
                    Client Partnership Inquiry
                </h2>
                <form
                    onSubmit={handlePartnerSubmit}
                    className="card p-6 grid gap-4 max-w-xl"
                >
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={partnerForm.name}
                        onChange={handlePartnerChange}
                        className="input"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={partnerForm.email}
                        onChange={handlePartnerChange}
                        className="input"
                        required
                    />
                    <input
                        type="text"
                        name="company"
                        placeholder="Company Name"
                        value={partnerForm.company}
                        onChange={handlePartnerChange}
                        className="input"
                    />
                    <textarea
                        name="needs"
                        placeholder="Hiring Needs"
                        value={partnerForm.needs}
                        onChange={handlePartnerChange}
                        className="input"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-brand-600 text-white rounded-lg"
                    >
                        Submit Inquiry
                    </button>
                </form>
            </section>
        </LayoutBasic>
    )
}