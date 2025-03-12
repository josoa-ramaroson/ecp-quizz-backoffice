import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { EQuestionType } from "@/enums"
import { IQuestion } from "@/interfaces"
import { useSortable } from "@dnd-kit/sortable"
import { GripVertical, Trash2 } from "lucide-react"
import { CSS } from "@dnd-kit/utilities"
import { cn } from "@/lib/utils"

interface SortableQuestionItemProps {
    id: string
    question?: IQuestion
    onRemove: (id: string) => void
    getQuestionTypeBadge: (type: EQuestionType) => React.ReactNode
    isLoading: boolean
  }
  
export function SortableQuestionItem({ id, question, onRemove, getQuestionTypeBadge, isLoading }: SortableQuestionItemProps) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })
  
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      zIndex: isDragging ? 10 : 1,
      opacity: isDragging ? 0.8 : 1,
    }
  
    return (
      <div
        ref={setNodeRef}
        style={style}
        className={cn("flex items-center justify-between p-2 bg-background border rounded-md", isDragging && "shadow-md")}
        {...attributes}
      >
        <div className="flex items-center gap-2">
          <button className="cursor-grab touch-none" {...listeners} aria-label="Drag to reorder">
            <GripVertical className="h-5 w-5 text-muted-foreground" />
          </button>
          {isLoading || !question ? (
            <div className="space-y-1">
              <Skeleton className="h-5 w-40" />
              <div className="flex gap-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          ) : (
            <div>
              <p className="text-sm font-medium">{question.title}</p>
              <div className="flex items-center gap-2 mt-1">
                {getQuestionTypeBadge(question.type)}
                <Badge variant="secondary">{question.score} pts</Badge>
              </div>
            </div>
          )}
        </div>
        <Button variant="ghost" size="icon" onClick={() => onRemove(id)} aria-label="Remove question">
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </div>
    )
  }
  
  