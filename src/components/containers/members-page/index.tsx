"use client"
import { Button, Heading } from '@/components'
import { 
    EButtonSize,
    EButtonVariant,
    EHeading,
 } from '@/enums'
import { ImportIcon, } from 'lucide-react'
import { IModifyMemberFormSchema, IAddMemberFormSchema } from './constants'
import { AddMemberDialog, MembersSection } from './components'
import { useEffect, useState } from 'react'
import { IMember } from '@/interfaces'
import { membersServices } from '@/services';
import toast from 'react-hot-toast'
import { TAddMemberFormData, TModifyMemberFormData } from '@/types'
import { handleApiExceptions } from '@/lib'

export default function MembersPage() {
    const [members, setMembers] = useState<IMember[]>([]);
        
    useEffect(()=>{
        handleApiExceptions(fetchMembers);
    }, []);

    const fetchMembers = async () => {
        const data: IMember[] = await membersServices.findAllMembers();
        setMembers(data);
    }

    const handleAddMember = async (values: IAddMemberFormSchema) => {
        const member: TAddMemberFormData = {
          firstName: values.firstName,
          facebookName: values.facebookName,
          email: values.email,
          password: values.newPassword ? values.newPassword : "123456789",
          role: values.role,
        };
        
        const newMember = await membersServices.createMember(member);
        setMembers((curr) => [...curr, newMember]);
        
    };

    const handleModifyMember = async (id: string, values: IModifyMemberFormSchema) => {
        const member: TModifyMemberFormData = {
            _id: id,
            firstName: values.firstName,
            facebookName: values.facebookName,
            email: values.email,
            password: (values.newPassword?.trim().length == 0) ? values.newPassword : undefined,
            role: values.role,
          };
          handleApiExceptions(async ()=>{
              const updatedMember = await membersServices.updateMember(member);
              setMembers((curr) => curr.map((member) => member._id === updatedMember._id ? updatedMember : member));
          })
    }
    const handleDelete = async (id: string) => {
        handleApiExceptions(async ()=>{
            await membersServices.delete(id);
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
                    <Button
                        variant={EButtonVariant.SECONDARY}
                        size={EButtonSize.MEDIUM}
                        label='Import'
                        icon={<ImportIcon  /> }
                        className='bg-secondary-600'
                    />
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
