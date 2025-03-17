"use client"

import { useState } from "react"
import { IQuiz } from "@/interfaces"
import { QuizCard } from "./quiz-card"
import { DeleteConfirmDialog } from "@/components/ui/delete-confirm-dialog"
import { QuizFormDialog } from "./quiz-form-dialog"
import { useQuizStore } from "@/store"


export function QuizGrid() {
  const { quizzes, deleteQuiz } = useQuizStore()
  const [editingQuiz, setEditingQuiz] = useState<IQuiz | null>(null)
  const [quizToDelete, setQuizToDelete] = useState<string | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  

  const handleEdit = (quiz: IQuiz) => {
    setEditingQuiz(quiz)
    setIsFormOpen(true)
  }

  const handleDelete = (id: string) => {
    setQuizToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (quizToDelete) {
      await deleteQuiz(quizToDelete)
      setIsDeleteDialogOpen(false)
      setQuizToDelete(null)
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <QuizCard key={quiz._id} quiz={quiz} onEdit={() => handleEdit(quiz)} onDelete={() => handleDelete(quiz._id)} />
        ))}
      </div>

      <QuizFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        quiz={editingQuiz}
        onClose={() => setEditingQuiz(null)}
      />

      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Delete Quiz"
        description="Are you sure you want to delete this quiz? This action cannot be undone."
        onConfirm={confirmDelete}
      />
    </>
  )
}

