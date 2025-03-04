"use client"
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from '@/components/ui/form'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { BUTTON_VARIANT_CLASSNAME } from '@/constants'
import { formSchema, IFormSchema } from '../constants'
import { EMemberRole } from '@/enums'
import { 
    SelectItem, 
    SelectTrigger, 
    Select, 
    SelectContent, 
    SelectValue,
 } from '@/components/ui/select'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { cn } from '@/lib'
import toast from 'react-hot-toast'



interface IAddMemberForm {
    submitHandler: (values: IFormSchema) => Promise<void>
}
export default function AddMemberForm({ submitHandler }: IAddMemberForm) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const reactHookForm  = useForm<IFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstname: "",
            facebookName: "",
            email: "",
            newPassword: "123456789",
            confirmPassword: "",
            role: EMemberRole.MEMBER,
        },
    });

    const onSubmit = async (values: IFormSchema) => {
        setIsSubmitting(true);
        try {
            await submitHandler(values);
            toast.success("Member added successfully!");
            reactHookForm.reset({
                firstname: "",
                facebookName: "",
                email: "",
                newPassword: "123456789",
                confirmPassword: "",
                role: EMemberRole.MEMBER,
            });
        } catch (error) {
            console.error("Error submitting form:", error);

            toast.error("Failed to create question. Please try again."); 
        } finally {
            setIsSubmitting(false);
        }
    }
    return (
            <Form {...reactHookForm}>
                <form onSubmit={reactHookForm.handleSubmit(onSubmit)}>
                    <FormField
                        control={reactHookForm.control}
                        name='firstname'
                        render={({ field }) => (
                            <FormItem className='mb-4'>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Member's first name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={reactHookForm.control}
                        name='facebookName'
                        render={({ field }) => (
                            <FormItem className='mb-4'>
                                <FormLabel>Facebook Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Member's facebook name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={reactHookForm.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem className='mb-4'>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email"  placeholder="Member's email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={reactHookForm.control}
                        name='role'
                        render={({ field }) => (
                            <FormItem className='mb-4'>
                                <FormLabel>Role</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select member's role" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value={EMemberRole.ADMIN} >{EMemberRole.ADMIN}</SelectItem>
                                        <SelectItem value={EMemberRole.MODERATOR} >{EMemberRole.MODERATOR}</SelectItem>
                                        <SelectItem value={EMemberRole.MEMBER} >{EMemberRole.MEMBER}</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={reactHookForm.control}
                        name='newPassword'
                        render={({ field }) => (
                            <FormItem className='mb-4'>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                    <div className='flex items-center relative'>
                                        <Input type="password"  placeholder="Member's password" {...field} />
                                        <button
                                            type="button"
                                            className="absolute right-3 text-gray-500"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                    
                        control={reactHookForm.control}
                        name='confirmPassword'
                        render={({ field }) => (
                            <FormItem className='mb-4'>
                                <FormLabel>Confirm password</FormLabel>
                                <FormControl>
                                    <Input type="password"  placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button 
                        type="submit" 
                        className={cn(BUTTON_VARIANT_CLASSNAME.primary.enabled, "w-full text-center")} 
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating...
                        </>
                    ) : (
                        "Add Member"
                    )}
                    </Button>
                </form>
            </Form>
    )
}


