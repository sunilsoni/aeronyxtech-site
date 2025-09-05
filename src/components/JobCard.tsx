import { Card, CardBody } from "./ui/Card"
import Badge from "./ui/Badge"
import Button from "./ui/Button"
import { Building2, MapPin } from "lucide-react"

export default function JobCard({
                                    job,
                                    onTagClick,
                                }: {
    job: any
    onTagClick?: (tag: string) => void
}) {
    return (
        <Card className="hover:shadow-lg transition dark:bg-gray-800 dark:border-gray-700">
            <CardBody>
                <div className="flex flex-col gap-3">
                    <div>
                        <h3 className="text-lg font-semibold dark:text-white">{job.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2 mt-1">
                            <Building2 className="h-4 w-4" /> {job.company}
                            <span className="mx-2">•</span>
                            <MapPin className="h-4 w-4" /> {job.location}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <Badge>Visa: {job.visa}</Badge>
                        {job.tags?.map((t: string) => (
                            <Badge
                                key={t}
                                className="cursor-pointer hover:bg-brand-100 dark:hover:bg-brand-800"
                                onClick={() => onTagClick?.(t)}
                            >
                                {t}
                            </Badge>
                        ))}
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 line-clamp-3">{job.description}</p>

                    <a href={job.apply_link} target="_blank" rel="noreferrer">
                        <Button>Apply</Button>
                    </a>
                </div>
            </CardBody>
        </Card>
    )
}