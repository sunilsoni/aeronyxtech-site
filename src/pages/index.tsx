import LayoutBasic from "@/components/LayoutBasic";
import Image from "next/image";
import { BriefcaseBusiness, GraduationCap, Flame, Building, BookOpen } from "lucide-react";
import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <LayoutBasic>
      <section className="card overflow-hidden">
        <div className="relative h-72 w-full">
          <Image src="/banner.svg" alt="Banner" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/10" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-white text-4xl font-bold drop-shadow-sm">Aeronyx Technologies</h1>
            <p className="text-gray-200 mt-2 max-w-xl">Jobs, Interviews & Visa Resources for Tech Professionals in the USA</p>
            <Button className="mt-4"><a href="/job-board">Explore Jobs</a></Button>
          </div>
        </div>
      </section>
      <section className="mt-10 grid md:grid-cols-5 gap-6">
        <FeatureCard title="Job Board" icon={<BriefcaseBusiness className="h-6 w-6" />} gradient="from-blue-500 to-indigo-600" desc="Latest C2C, H1B, OPT, CPT, GC job openings daily." href="/job-board"/>
        <FeatureCard title="Interview Prep" icon={<GraduationCap className="h-6 w-6" />} gradient="from-emerald-500 to-green-600" desc="Daily technical questions & guides." href="/interview-questions"/>
        <FeatureCard title="Hotlist 2025" icon={<Flame className="h-6 w-6" />} gradient="from-rose-500 to-pink-600" desc="Curated staffing C2C jobs & clients." href="/hotlist"/>
        <FeatureCard title="Companies" icon={<Building className="h-6 w-6" />} gradient="from-purple-500 to-violet-600" desc="Profiles of US companies hiring with visa support." href="/companies"/>
        <FeatureCard title="Guides" icon={<BookOpen className="h-6 w-6" />} gradient="from-cyan-500 to-sky-600" desc="Resume, visa, and interview preparation guides." href="/guides"/>
      </section>
    </LayoutBasic>
  );
}

function FeatureCard({ title, desc, icon, href, gradient }:{ title: string; desc: string; icon: any; href: string; gradient: string }) {
  return (
    <a href={href} className={`block rounded-2xl shadow-soft p-6 text-white bg-gradient-to-r hover:opacity-95 transition ${gradient}`}>
      <div className="flex items-center gap-3">
        <div className="bg-white/20 rounded-xl p-2">{icon}</div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="mt-2">{desc}</p>
    </a>
  );
}
