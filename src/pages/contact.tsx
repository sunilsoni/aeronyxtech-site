import LayoutBasic from "@/components/LayoutBasic"
import { useState } from "react"

export default function ContactPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        alert("Message sent successfully! (To be connected to backend/email)")
        console.log("Contact Form Submitted:", form)
        setForm({ name: "", email: "", subject: "", message: "" })
    }

    return (
        <LayoutBasic>
            {/* Hero Section */}
            <section className="text-center py-12">
                <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    We’d love to hear from you. Whether you’re a consultant, client, or
                    partner — let’s connect.
                </p>
            </section>

            <div className="grid lg:grid-cols-2 gap-8 py-12">
                {/* Contact Form */}
                <form
                    onSubmit={handleSubmit}
                    className="card p-6 grid gap-4 shadow-soft"
                >
                    <h2 className="text-2xl font-bold mb-4">Send us a message</h2>
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={handleChange}
                        className="input"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="input"
                        required
                    />
                    <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        value={form.subject}
                        onChange={handleChange}
                        className="input"
                    />
                    <textarea
                        name="message"
                        placeholder="Your Message"
                        value={form.message}
                        onChange={handleChange}
                        rows={5}
                        className="input"
                        required
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-brand-600 text-white rounded-lg"
                    >
                        Send Message
                    </button>
                </form>

                {/* Contact Info */}
                <div className="card p-6 shadow-soft space-y-4">
                    <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        📧 Email:{" "}
                        <a
                            href="mailto:info@aeronyxtech.com"
                            className="text-brand-600 hover:underline"
                        >
                            info@aeronyxtech.com
                        </a>
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                        📞 Phone:{" "}
                        <a
                            href="tel:+11234567890"
                            className="text-brand-600 hover:underline"
                        >
                            +1 (123) 456-7890
                        </a>
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                        💼 LinkedIn:{" "}
                        <a
                            href="https://linkedin.com/company/aeronyxtech"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-brand-600 hover:underline"
                        >
                            AeronyxTech LinkedIn
                        </a>
                    </p>
                </div>
            </div>
        </LayoutBasic>
    )
}