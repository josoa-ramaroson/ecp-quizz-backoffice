"use client"
import {  Heading } from '@/components'
import { 
    EHeading,
 } from '@/enums'
import { ImportIcon, } from 'lucide-react'
import { IModifyMemberFormSchema, IAddMemberFormSchema } from './constants'
import { AddMemberDialog, MembersSection } from './components'
import { useEffect, useState } from 'react'
import { IMember } from '@/interfaces'
import { TAddMemberFormData, TModifyMemberFormData } from '@/types'
import { handleApiExceptions } from '@/lib/utils'
import { MembersService } from '@/lib/services'
import { Button } from '@/components/ui/button'

export default function MembersPage() {
    const [members, setMembers] = useState<IMember[]>([]);
        
    useEffect(()=>{
        handleApiExceptions(fetchMembers);
    }, []);

    const fetchMembers = async () => {
        const data: IMember[] = await MembersService.findAll();
        setMembers(data);
    }

    const handleAddMember = async (values: IAddMemberFormSchema) => {
        const member: TAddMemberFormData = {
          firstName: values.firstName,
          facebookName: values.facebookName,
          pseudo: values.pseudo,
          password: values.newPassword ? values.newPassword : "123456789",
          role: values.role,
        };
        
        const newMember = await MembersService.create(member);
        setMembers((curr) => [...curr, newMember]);
        
    };

    const handleModifyMember = async (id: string, values: IModifyMemberFormSchema) => {
        const member: TModifyMemberFormData = {
            _id: id,
            firstName: values.firstName,
            facebookName: values.facebookName,
            pseudo: values.pseudo,
            password: (values.newPassword?.trim().length == 0) ? values.newPassword : undefined,
            role: values.role,
          };
          handleApiExceptions(async ()=>{
              const updatedMember = await MembersService.update(member);
              setMembers((curr) => curr.map((member) => member._id === updatedMember._id ? updatedMember : member));
          })
    }
    const handleDelete = async (id: string) => {
        handleApiExceptions(async ()=>{
            await MembersService.delete(id);
            setMembers((curr) => curr.filter((member) => member._id !== id));
        })
    }
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <Heading  
                    as={EHeading.HEADING_5}
                >
                    Members Management
                </Heading>
                <div className="flex gap-2">
                    <AddMemberDialog  submitHandler={handleAddMember}/>
                    {/* <Button
                        variant={EButtonVariant.SECONDARY}
                        size={EButtonSize.MEDIUM}
                        label='Import '
                        icon={<ImportIcon  /> }
                        className='bg-secondary-600'
                    /> */}
                    <Button  variant="secondary">
                        <ImportIcon />
                        <span>Import from csv</span>
                    </Button>

                </div>
            </div>
            <MembersSection 
                members={members} 
                handleDelete={handleDelete}
                handleModify={handleModifyMember}
            />
        </div>
    )
    }
