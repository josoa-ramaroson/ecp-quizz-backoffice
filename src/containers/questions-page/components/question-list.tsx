"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Edit, Trash2, Copy, Eye } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formatDistanceToNow } from "date-fns"
import { DeleteConfirmDialog } from "@/components/ui/delete-confirm-dialog"
import { IQuestion } from "@/interfaces"
import { useQuestionStore } from "@/store"
import { EQuestionType } from "@/enums"
import { QuestionPreviewDialog } from "./question-preview-dialog"

interface QuestionListProps {
  questions: IQuestion[]
  onEdit: (question: IQuestion) => void
}

export function QuestionList({ questions, onEdit }: QuestionListProps) {
  const [questionToDelete, setQuestionToDelete] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [previewQuestion, setPreviewQuestion] = useState<IQuestion | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const { deleteQuestions, createQuestions } = useQuestionStore()

  const handleDelete = (id: string) => {
    setQuestionToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (questionToDelete) {
      await deleteQuestions(questionToDelete)
      setIsDeleteDialogOpen(false)
      setQuestionToDelete(null)
    }
  }

  const handleDuplicate = async (question: IQuestion) => {
    const { _id, creationDate, ...rest } = question;
    console.info(_id, creationDate);
    await createQuestions({
      ...rest,
      title: `${question.title} (Copy)`,
    })
  }

  const handlePreview = (question: IQuestion) => {
    setPreviewQuestion(question)
    setIsPreviewOpen(true)
  }

  const getQuestionTypeBadge = (type: EQuestionType) => {
    switch (type) {
      case EQuestionType.MULTIPLE_CHOICE:
        return <Badge variant="outline">Multiple Choice</Badge>
      case EQuestionType.SINGLE_CHOICE:
        return <Badge variant="outline">Single Choice</Badge>
      case EQuestionType.SHORT_ANSWER :
        return <Badge variant="outline">Short Answer</Badge>
      default:
        return <Badge variant="outline">True/flase</Badge>
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {questions.map((question) => (
          <Card key={question._id} className="h-full flex flex-col">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{question.title}</CardTitle>
                  {question.description && (
                    <CardDescription className="mt-1 line-clamp-2">{question.description}</CardDescription>
                  )}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" aria-label="Open menu">
                      <MoreHorizontal className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(question)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handlePreview(question)}>
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDuplicate(question)}>
                      <Copy className="mr-2 h-4 w-4" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleDelete(question._id)} className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex items-center mt-2 gap-2">
                {getQuestionTypeBadge(question.type)}
                <Badge variant="secondary">{question.score} pts</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              {question.type !== EQuestionType.SHORT_ANSWER && (
                <div className="space-y-2 mt-2">
                  <p className="text-sm font-medium">Answer Options:</p>
                  <ul className="space-y-1">
                    {question.answersOptions.slice(0, 3).map((answer, index) => (
                      <li
                        key={answer.text + index}
                        className={`text-sm px-2 py-1 rounded ${
                          answer.isCorrect
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
                        }`}
                      >
                        {answer.text}
                      </li>
                    ))}
                    {question.answersOptions.length > 3 && (
                      <li className="text-sm text-muted-foreground">
                        +{question.answersOptions.length - 3} more options
                      </li>
                    )}
                  </ul>
                </div>
              )}
              {question.type === EQuestionType.SHORT_ANSWER && question.comment && (
                <div className="mt-2">
                  <p className="text-sm font-medium">Grading Notes:</p>
                  <p className="text-sm text-muted-foreground line-clamp-3">{question.comment}</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="pt-2 text-xs text-muted-foreground">
              Created {formatDistanceToNow(new Date(question.creationDate), { addSuffix: true })}
            </CardFooter>
          </Card>
        ))}
      </div>

      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Delete Question"
        description="Are you sure you want to delete this question? This action cannot be undone and may affect quizzes that use this question."
        onConfirm={confirmDelete}
      />

      <QuestionPreviewDialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen} question={previewQuestion} />
    </>
  )
}

