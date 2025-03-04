import { Calendar, Trophy, Users } from 'lucide-react'
import React, { useState } from 'react'
import FeatureCard from './feature-card'

export default function FeaturesGrid() {
  const [ features ] = useState([
    {
      title: "Daily Challenges",
      paragraph: "New quiz every day to keep you engaged and learning consistently.",
      icon: Calendar,
    },
    {
      title: "Bi-weekly Rewards",
      paragraph: "Top performers get rewarded every two weeks with exciting prizes.",
      icon: Trophy,
    },
    {
      title: "Community Learning",
      paragraph: "Practice and improve your English skills with fellow learners.",
      icon: Users,
    },
  ])
  return (
  <div className="grid md:grid-cols-3 gap-8 max-w-4xl w-full mt-16">
    {
      features.map((feature) => <FeatureCard key={feature.title} title={feature.title} paragraph={feature.paragraph} icon={feature.icon} />)
    }  
  </div>
  )
}
