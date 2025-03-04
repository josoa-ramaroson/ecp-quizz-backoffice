import { LucideIcon } from 'lucide-react';


type TFeatureCardProps  = {
    title: string;
    paragraph?: string;
    icon: LucideIcon;
}

export default function FeatureCard(props: TFeatureCardProps) {
    const { title, paragraph, icon: Icon } = props;
    return (
        <div className="bg-surface p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-secondary-900 mb-2">{title}</h3>
            <p className="text-secondary-600">{paragraph}</p>
        </div>
    )
}
