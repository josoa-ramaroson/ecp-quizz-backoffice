import { Button, Heading } from '@/components/ui'
import { EButtonSize, EButtonVariant, EHeading, EQuestionType } from '@/enums'
import { ImportIcon, Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { AddQuestionDialog, QuestionsTableSection } from './components'
import { mockQuestions, TQuestionFormSchema } from './constants'
import { IQuestion } from '@/interfaces'
import { questionsService } from '@/services/questions.service'
import { cn, handleApiExceptions } from '@/lib'
import { TQuestionFormData } from '@/types'
import { DialogTrigger } from '@/components/ui/dialog'
import { BUTTON_VARIANT_CLASSNAME } from '@/constants'
import toast from 'react-hot-toast'

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<IQuestion[]>([]);

  const fetchQuestions = async () => {
    const data = await questionsService.findAll()
    setQuestions(data);
  }

  useEffect(()=>{
    handleApiExceptions(fetchQuestions);
  }, []);

  const handleAddQuestions = async (values: TQuestionFormSchema) => {
    const newQuestions: TQuestionFormData = {
      title: values.title,
      description: values.description,
      type: values.type,
      score: values.score,
      answersOptions: values.answersOptions.map((option) => ({text: option.text, isCorrect: option.isCorrect})),
      comment: values.comment ? values.comment: ""
    };

    handleApiExceptions( async ()=>{
      const newAddedQuestions = await questionsService.create(newQuestions);
      setQuestions((current) => [...current, newAddedQuestions]);
      toast.success(`Question added successfully`);

    });
  };

  const handleEditQuestions = async (id: string, values:TQuestionFormSchema) => {
    const updatedQuestions: TQuestionFormData = {
      title: values.title,
      description: values.description,
      type: values.type,
      score: values.score,
      answersOptions: values.answersOptions.map(ans =>( {text: ans.text, isCorrect: ans.isCorrect})),
      comment: values.comment ? values.comment: ""
    };

    handleApiExceptions( async ()=>{
      const updatedQuestion = await questionsService.update(id, updatedQuestions);
      console.log("updated question: ", updatedQuestion);
      setQuestions((current) => current.map((question) => question._id === updatedQuestion._id ? updatedQuestion : question));
      toast.success(`Question updated successfully`);

    });
  };

  const handleDeleteQuestions = async (id: string) => {
      handleApiExceptions( async () => {
        const deletedQuestion = await questionsService.delete(id);
        setQuestions((current) => current.filter((question) => question._id != id));
        toast.success(`Question ${deletedQuestion.title} deleted successfully`);
      });
  }

  return (
    <div className='space-y-6'>
        <div className="flex items-center justify-between">
            <Heading as={EHeading.HEADING_5}>Questions </Heading>
            <div className="flex gap-2">
                <AddQuestionDialog 
                  submitHandler={handleAddQuestions} 
                  />
                <Button
                    variant={EButtonVariant.SECONDARY}
                    size={EButtonSize.MEDIUM}
                    icon={<ImportIcon />}
                    label='Import'
                />
            </div>
        </div>

        <QuestionsTableSection 
          handleEditQuestions={handleEditQuestions}
          questions={questions}
          handleDeleteQuestions={handleDeleteQuestions}
        />
    </div>
  )
}
