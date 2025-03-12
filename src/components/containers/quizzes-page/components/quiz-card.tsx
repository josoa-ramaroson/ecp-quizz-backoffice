"use client"

import { formatDistanceToNow } from "date-fns"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Edit, Trash2, Users, Calendar, Eye } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useQuizStatus } from "@/hooks/use-quiz-status.hook"
import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { IQuiz } from "@/interfaces"
import { EQuizStatus } from "@/enums"

interface QuizCardProps {
  quiz: IQuiz
  onEdit: () => void
  onDelete: () => void
}

export function QuizCard({ quiz, onEdit, onDelete }: QuizCardProps) {
  const [stats, setStats] = useState<{ participants: number; completionRate: number } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const status = useQuizStatus(quiz)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true)
        // const data = await QuizService.getQuizStats(quiz.id)
        setStats({ participants: 10, completionRate: 50 })
      } catch (error) {
        console.error("Failed to fetch quiz stats:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [quiz._id])

  const getStatusBadge = () => {
    switch (status) {
      case EQuizStatus.ACTIVE:
        return <Badge className="bg-green-500">Active</Badge>
      case EQuizStatus.UPCOMING:
        return <Badge className="bg-blue-500">Upcoming</Badge>
      case EQuizStatus.EXPIRED:
        return <Badge className="bg-gray-500">Expired</Badge>
    }
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{quiz.title}</CardTitle>
            <CardDescription className="mt-1">{quiz.description}</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onEdit}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onDelete} className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center mt-2">
          {getStatusBadge()}
          <Badge variant="outline" className="ml-2">
            {quiz.questionsIds.length} Questions
          </Badge>
          {!quiz.isPublished && (
            <Badge variant="outline" className="ml-2 bg-yellow-100 text-yellow-800 border-yellow-200">
              Draft
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-2 h-4 w-4" />
            <span>
              {new Date(quiz.startDate).toLocaleDateString()} - {new Date(quiz.deadline).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center text-sm">
            <Users className="mr-2 h-4 w-4" />
            {isLoading ? <Skeleton className="h-4 w-24" /> : <span>{stats?.participants || 0} participants</span>}
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Completion Rate</span>
              {isLoading ? <Skeleton className="h-4 w-8" /> : <span>{stats?.completionRate || 0}%</span>}
            </div>
            {isLoading ? (
              <Skeleton className="h-2 w-full" />
            ) : (
              <Progress value={stats?.completionRate || 0} className="h-2" />
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 text-xs text-muted-foreground">
        Created {formatDistanceToNow(new Date(quiz.creationDate), { addSuffix: true })}
      </CardFooter>
    </Card>
  )
}

