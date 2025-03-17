
import { Badge } from 'lucide-react'
import React from 'react'
interface ITopMemberItem {
    name: string
    score: number
    rank: number
}
export default function TopMemberItem({
    
    name,
    score,
    rank
}: ITopMemberItem) 
 {
  return (
    <div className='flex items-center space-x-4 px-4 py-1  rounded-lg border-b-2 bg-card text-card-foreground'>
        <div  className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-primary-50 text-sm font-medium text-primary-600">
                    {rank}
                </div>
            
                <div>
                    <p className="text-sm font-medium">{name}</p>
                    <p className="text-xs text-secondary-500">Score: {score}</p>
                </div>
            </div>
            <div >
                {rank === 1 && <Badge className="text-success-600">Top</Badge>}
            </div>
        </div>
    </div>
  )
}
