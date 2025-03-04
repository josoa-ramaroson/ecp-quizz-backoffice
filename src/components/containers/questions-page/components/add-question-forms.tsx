"use client"
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { BUTTON_VARIANT_CLASSNAME } from '@/constants'
import { EQuestionType } from '@/enums'
import { 
    SelectItem, 
    SelectTrigger, 
    Select, 
    SelectContent, 
    SelectValue,
 } from '@/components/ui/select'
import { TQuestionFormSchema, questionFormSchema } from '../constants'
import { cn } from '@/lib'
import { v4 as uuidv4 } from "uuid";
import AddAnswersOptionsSections from './add-answers-options-section'
import toast from 'react-hot-toast'
import { TQuestionFormData } from '@/types'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'



interface IAddQuestionFormProps {
    submitHandler: (values: TQuestionFormData) => Promise<void>;
}
export default function AddQuestionForm({ submitHandler }: IAddQuestionFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const reactHookForm  = useForm<TQuestionFormSchema>({
        resolver: zodResolver(questionFormSchema),
        defaultValues: {
            title: "",
            description: "",
            type: EQuestionType.MULTIPLE_CHOICE,
            score: 0,
            comment: "",
            answersOptions: [
                { text: "", isCorrect: false },
                { text: "", isCorrect: false },
            ],
        },
    });

    const questionTypeField = reactHookForm.watch("type");
    const answerOptionsField = reactHookForm.watch("answersOptions");

    const handleQuestionTypeChange = (value: EQuestionType) => {
        reactHookForm.setValue("type", value);
        switch (value) {
            case EQuestionType.TRUE_FALSE:
                reactHookForm.setValue("answersOptions",[
                    { id: uuidv4(), text: "True", isCorrect: true },
                    { id: uuidv4(), text: "False", isCorrect: false },
                ]);
                break;
            case EQuestionType.SHORT_ANSWER:
                reactHookForm.setValue("answersOptions",[
                    { id: uuidv4(), text: "", isCorrect: true },
                ]);
                break;
            default:
                if (reactHookForm.getValues("answersOptions").length < 2) {
                    reactHookForm.setValue("answersOptions",[
                        { id: uuidv4(), text: "", isCorrect: false },
                        { id:uuidv4(), text: "", isCorrect: false },
                    ]);
                }
                break;
        }
    };


    const addAnswer = (questionType: EQuestionType) => {
        const currentAnswers = reactHookForm.getValues("answersOptions");
        reactHookForm.setValue("answersOptions", [
          ...currentAnswers,
          { id: uuidv4(), text: "", isCorrect: questionType === EQuestionType.SHORT_ANSWER },
        ]);
    };

    const removeAnswer = (id: string, questionType: EQuestionType) => {
        const currentAnswers = reactHookForm.getValues("answersOptions");
        if (currentAnswers.length <= 2 && questionType !== EQuestionType.SHORT_ANSWER) {
          toast.error("At least 2 answer options are required");
          return;
        }
        
        reactHookForm.setValue(
          "answersOptions",
          currentAnswers.filter(answer => answer.id !== id)
        );
    };

    const handleAnswerChange = (id: string, value: string, questionType: EQuestionType) => {
        const currentAnswers = reactHookForm.getValues("answersOptions");
        const updatedAnswers = currentAnswers.map(answer => 
          answer.id === id ? { ...answer, text: value } : answer
        );
        
        reactHookForm.setValue("answersOptions", updatedAnswers);
        
        // If typing in the last field and it's not empty, add a new empty field
        const isLastAnswer = id === currentAnswers[currentAnswers.length - 1].id;
        if (isLastAnswer && value.trim() !== "" && questionType !== EQuestionType.TRUE_FALSE) {
          addAnswer(questionType);
        }
    };

    const onSubmit = async (data: TQuestionFormData) => {
        setIsSubmitting(true);
        
        try {
          // Simulate API call
            await submitHandler(data);
            console.log("Form submitted:", data);
            toast.success("Question created successfully!");
            
            // Reset form
            reactHookForm.reset({
                title: "",
                description: "",
                type: EQuestionType.MULTIPLE_CHOICE,
                score: 0,
                comment: "",
                answersOptions: [
                    { text: "", isCorrect: false },
                    { text: "", isCorrect: false },
                ],
            });
        } catch (error) {
          console.error("Error submitting form:", error);
          toast.error("Failed to create question. Please try again.");
        } finally {
          setIsSubmitting(false);
        }
      };

    // Toggle correct answer for MULTIPLE_CHOICE
    const toggleCorrectMultiple = (id: string) => {
        const currentAnswers = reactHookForm.getValues("answersOptions");
        const updatedAnswers = currentAnswers.map(answer => 
        answer.id === id ? { ...answer, isCorrect: !answer.isCorrect } : answer
        );
        
        reactHookForm.setValue("answersOptions", updatedAnswers);
    };

    // Set correct answer for SINGLE_CHOICE and TRUE_FALSE
    const setCorrectSingle = (id: string) => {
        const currentAnswers = reactHookForm.getValues("answersOptions");
        const updatedAnswers = currentAnswers.map(answer => ({
        ...answer,
        isCorrect: answer.id === id,
        }));
        
        reactHookForm.setValue("answersOptions", updatedAnswers);
    };
    return (
        <Form {...reactHookForm}>
            <form onSubmit={reactHookForm.handleSubmit(onSubmit)}>
                <FormField
                    control={reactHookForm.control}
                    name='title'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="ex: WORD OF DAY QUESTION..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={reactHookForm.control}
                    name='description'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input placeholder="ex: Find the mean of ..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={reactHookForm.control}
                    name='score'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Score</FormLabel>
                            <FormControl>
                                <Input type='number' placeholder="ex:  0, 1, 5" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={reactHookForm.control}
                    name='type'
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel>Role</FormLabel>
                            <Select 
                                onValueChange={(value) => handleQuestionTypeChange(value as EQuestionType)} 
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select the type of questions" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value={EQuestionType.MULTIPLE_CHOICE} >Multiple Choice</SelectItem>
                                    <SelectItem value={EQuestionType.SINGLE_CHOICE} >Single Choice</SelectItem>
                                    <SelectItem value={EQuestionType.TRUE_FALSE} >True/False</SelectItem>
                                    <SelectItem value={EQuestionType.SHORT_ANSWER} >Short Answer</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <AddAnswersOptionsSections
                    answerOptionsField={answerOptionsField}
                    questionType={questionTypeField}
                    setCorrectSingle={setCorrectSingle}
                    toggleCorrectMultiple={toggleCorrectMultiple}
                    handleAnswerChange={handleAnswerChange}
                    removeAnswer={removeAnswer}
                    addAnswer={addAnswer}
                    formError={reactHookForm.formState.errors.answersOptions?.message}
                />
                <FormField
                    control={reactHookForm.control}
                    name='comment'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Comments</FormLabel>
                            <FormControl>
                                <Input placeholder="ex: The right answer is ... because ..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button 
                    type="submit" 
                    disabled={isSubmitting} 
                    className={cn(BUTTON_VARIANT_CLASSNAME.primary.enabled, "w-full mt-4")}
                >
                    {isSubmitting ? (
                        <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                        </>
                    ) : (
                        "Create Question"
                    )}
                </Button>
            </form>
        </Form>
)
}


