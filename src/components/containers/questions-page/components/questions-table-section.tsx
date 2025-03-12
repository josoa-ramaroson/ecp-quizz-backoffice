"use client"
import { ColumnDef, ColumnFiltersState, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable, VisibilityState } from '@tanstack/react-table'
import React, { useMemo, useState } from 'react'
import { IQuestion } from '@/interfaces'
import SearchInput from '@/components/ui/search-input'
import FilterButton from './filter-button'
import PaginationButton from './pagination-buttons'

import EditQuestionDialog from './edit-questions-dialog'
import ConfirmDeleteQuestionDialog from './confirm-delete-question-dialog'
import { useQuestionStore } from '@/store'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { QuestionList } from './question-list'

export default function QuestionsTableSection() {
    const { questions, isLoading, deleteQuestions } = useQuestionStore();
    const [typeFilter, setTypeFilter] = useState<string>("all")

    const [selectedQuestion, setSelectedQuestion] = useState<IQuestion>();
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const typeFilteredQuestions = useMemo(() => {
        return typeFilter === "all" ? questions : questions.filter((q) => q.type === typeFilter);
      }, [typeFilter, questions]);
      
   
    const filteredQuestions = typeFilteredQuestions.filter(
        (question) =>
          question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (question.description && question.description.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    
    return (
    <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <SearchInput
                value={searchQuery}
                onChange={(event) =>setSearchQuery(event.target.value)}

            />
            <FilterButton
                typeFilter={typeFilter}
                setTypeFilter={setTypeFilter}
            />
        </div>
        { isLoading ? (
            <LoadingSpinner />
        ) :
          <QuestionList questions={filteredQuestions} onEdit={(question) => {setSelectedQuestion(question); setIsEditDialogOpen(true)}}/>
        }
        {/* <PaginationButton table={table} /> */}
        {
            (selectedQuestion && isEditDialogOpen) && (
                <EditQuestionDialog 
                    isOpen={isEditDialogOpen}
                    setIsOpen={setIsEditDialogOpen}
                    question={selectedQuestion}
                />
            )
        }
        {
            (selectedQuestion && isDeleteDialogOpen) && (
                <ConfirmDeleteQuestionDialog 
                    isOpen={isDeleteDialogOpen}
                    setIsOpen={setIsDeleteDialogOpen}
                    title={selectedQuestion.title}
                    type={selectedQuestion.type}
                    score={selectedQuestion.score}
                    onConfirm={() => deleteQuestions(selectedQuestion._id)}
                  
                />
            )
        }
    </div>
    )
}
