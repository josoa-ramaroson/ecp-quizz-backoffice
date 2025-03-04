"use client"
import { Button, Heading } from '@/components'
import { 
    EButtonSize,
    EButtonVariant,
    EHeading,
 } from '@/enums'
import { ImportIcon, Plus } from 'lucide-react'
import { IFormSchema, mockMembers } from './constants'
import { AddMemberDialog, MembersSection } from './components'

export default function MembersPage() {
    
    const handleAddMemberButton = (value: IFormSchema) => {

    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <Heading  
                    as={EHeading.HEADING_5}
                >
                    Members Management
                </Heading>
                <div className="flex gap-2">
                    <AddMemberDialog  />
                    <Button
                        variant={EButtonVariant.SECONDARY}
                        size={EButtonSize.MEDIUM}
                        label='Import'
                        icon={<ImportIcon  /> }
                        className='bg-secondary-600'
                    />
                </div>
            </div>
            <MembersSection members={mockMembers} />
        </div>
    )
    }
