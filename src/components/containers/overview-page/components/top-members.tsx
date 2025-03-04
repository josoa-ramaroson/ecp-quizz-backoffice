import { Card, Heading } from '@/components/ui'
import { EHeading } from '@/enums'
import React from 'react'
import TopMemberItem from './top-member-item';


const topMembers = [
    { id: 1, rank: 1, name: "Sarah Johnson", score: 1250, avatar: "/placeholder.svg?height=40&width=40", initials: "SJ" },
    { id: 4, rank: 2, name: "David Kim", score: 980, avatar: "/placeholder.svg?height=40&width=40", initials: "DK" },
    { id: 5, rank: 3, name: "Olivia Martinez", score: 920, avatar: "/placeholder.svg?height=40&width=40", initials: "OM" },
  ];

export default function TopMembers() {
  return (
    <Card 
        className='rounded-lg border bg-card text-card-foreground shadow-sm'
        header={<Heading as={EHeading.HEADING_5} className='font-bold' >Top Performing Members</Heading>}
    >
        <div className="space-y-4">
            { topMembers.map((member) => ( <TopMemberItem  key={member.id + member.name}{...member} /> )) }
        </div>
    </Card>
  )
}
