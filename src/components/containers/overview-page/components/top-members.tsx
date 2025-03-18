"use client"

import { Card, Heading } from '@/components/ui'
import { EHeading } from '@/enums'
import React from 'react'
import TopMemberItem from './top-member-item';
import { useTopPerformer } from '@/hooks';
import { TTopPerformerData } from '@/types';
import { LoadingSpinner } from '@/components/ui/loading-spinner';



export default function TopMembers() {
  const { isLoading,  error, topPerformer } = useTopPerformer()
  if (isLoading) return <LoadingSpinner size={4} />
  return (
    <Card 
        className='rounded-lg border bg-card text-card-foreground sm:w-full'
        header={<Heading as={EHeading.HEADING_5} className='font-bold' >Top Performing Members</Heading>}
    >
        <div className="space-y-4">
            { topPerformer?.map((member: TTopPerformerData) => ( <TopMemberItem  key={member.memberId + member.firstName} score={member.score} name={member.firstName} rank={member.rank}/> )) }
        </div>
        {error && <p className='text-red-600 text-sm'>{error.message}</p>}

    </Card>
  )
}
