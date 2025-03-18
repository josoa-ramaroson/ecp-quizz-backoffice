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
import { UseFormReturn } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { BUTTON_VARIANT_CLASSNAME } from '@/constants'
import { IMemberFormSchema } from '../constants'
import { EMemberRole } from '@/enums'
import { 
    SelectItem, 
    SelectTrigger, 
    Select, 
    SelectContent, 
    SelectValue,
 } from '@/components/ui/select'
import { Eye, EyeOff, Loader2, RefreshCcw } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useGeneratePseudo } from '@/hooks'
import { Switch } from '@/components/ui/switch'

interface IAddMemberForm {
    reactHookForm: UseFormReturn<IMemberFormSchema,  undefined>,
    onSubmit: (values: IMemberFormSchema ) => Promise<void>,
    isSubmitting: boolean,
    submitLabel: string,
}

export default function MemberForm({ 
    reactHookForm,
    onSubmit,
    isSubmitting,
    submitLabel,
}: IAddMemberForm) {
    
    const [showPassword, setShowPassword] = useState(false);
    const { generatePseudo } = useGeneratePseudo();

    const handleGeneratePseudo = () => {
        const pseudo = generatePseudo()
        reactHookForm.setValue('pseudo', pseudo);
    }

    return (
            <Form {...reactHookForm}>
                <form onSubmit={reactHookForm.handleSubmit(onSubmit)}>
                    <FormField
                        control={reactHookForm.control}
                        name='firstName'
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
                        name='pseudo'
                        render={({ field }) => (
                            <FormItem className='mb-4'>
                                <FormLabel>Pseudo</FormLabel>
                                <FormControl>
                                    <div className='flex items-center relative'>
                                        <Input type="text"  placeholder="ex: SillyPoney..." {...field} />
                                        <button
                                            type="button"
                                            className="absolute right-3 text-gray-500 hover:bg-secondary-100 active:bg-secondary-300 p-2 rounded-full"
                                            title='Generate a pseudo'
                                            onClick={handleGeneratePseudo}
                                        >
                                            <RefreshCcw size={18} /> 
                                        </button>
                                    </div>
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
                                        <Input type={showPassword? "text": "password"}  placeholder="Member's password" {...field} />
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

                <FormField
                control={reactHookForm.control}
                name="isActiveAccount"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <FormLabel className="text-base">Active account</FormLabel>
                        <p className="text-sm text-muted-foreground">This account will be able to practice quizzes</p>
                    </div>
                    <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
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
                        submitLabel
                    )}
                    </Button>
                </form>
            </Form>
    )
}


