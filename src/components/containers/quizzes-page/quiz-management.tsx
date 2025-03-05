// "use client"

// import { useState } from "react"
// import { Plus } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { QuizList } from "@/components/quizzes/quiz-list"
// import { QuizCreator } from "@/components/quizzes/quiz-creator"
// import { QuizDetails } from "@/components/quizzes/quiz-details"

// // Mock quiz data
// export type Quiz = {
//   id: string
//   title: string
//   description: string
//   duration: number // in minutes
//   totalQuestions: number
//   difficulty: "Easy" | "Medium" | "Hard"
//   status: "Draft" | "Published" | "Archived"
//   createdAt: string
//   scheduledFor?: string
//   questions: string[] // question IDs
// }

// export const mockQuizzes: Quiz[] = [
//   {
//     id: "quiz1",
//     title: "Basic English Grammar",
//     description: "Test your knowledge of basic English grammar rules and concepts.",
//     duration: 30,
//     totalQuestions: 20,
//     difficulty: "Easy",
//     status: "Published",
//     createdAt: "2023-10-15T10:30:00Z",
//     scheduledFor: "2023-11-01T14:00:00Z",
//     questions: ["q1", "q2"],
//   },
//   {
//     id: "quiz2",
//     title: "Advanced Vocabulary",
//     description: "Challenge yourself with advanced English vocabulary words and their usage.",
//     duration: 45,
//     totalQuestions: 25,
//     difficulty: "Hard",
//     status: "Draft",
//     createdAt: "2023-10-20T15:45:00Z",
//     questions: ["q3"],
//   },
//   {
//     id: "quiz3",
//     title: "Reading Comprehension",
//     description: "Improve your reading comprehension skills with various passages and questions.",
//     duration: 60,
//     totalQuestions: 15,
//     difficulty: "Medium",
//     status: "Published",
//     createdAt: "2023-10-10T09:15:00Z",
//     scheduledFor: "2023-11-15T10:00:00Z",
//     questions: ["q4"],
//   },
//   {
//     id: "quiz4",
//     title: "Listening Practice",
//     description: "Practice your listening skills with audio clips and comprehension questions.",
//     duration: 40,
//     totalQuestions: 10,
//     difficulty: "Medium",
//     status: "Archived",
//     createdAt: "2023-09-05T11:20:00Z",
//     questions: ["q5"],
//   },
// ]

// export function QuizManagement() {
//   const [quizzes, setQuizzes] = useState<Quiz[]>(mockQuizzes)
//   const [activeTab, setActiveTab] = useState("all-quizzes")
//   const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null)
//   const [isCreating, setIsCreating] = useState(false)
//   const [isEditing, setIsEditing] = useState(false)

//   const handleCreateQuiz = (newQuiz: Quiz) => {
//     setQuizzes([newQuiz, ...quizzes])
//     setIsCreating(false)
//     setActiveTab("all-quizzes")
//   }

//   const handleUpdateQuiz = (updatedQuiz: Quiz) => {
//     setQuizzes(quizzes.map((quiz) => (quiz.id === updatedQuiz.id ? updatedQuiz : quiz)))
//     setIsEditing(false)
//     setSelectedQuizId(null)
//     setActiveTab("all-quizzes")
//   }

//   const handleDeleteQuiz = (id: string) => {
//     setQuizzes(quizzes.filter((quiz) => quiz.id !== id))
//     if (selectedQuizId === id) {
//       setSelectedQuizId(null)
//     }
//   }

//   const handleEditQuiz = (id: string) => {
//     setSelectedQuizId(id)
//     setIsEditing(true)
//     setActiveTab("edit-quiz")
//   }

//   const handleViewQuiz = (id: string) => {
//     setSelectedQuizId(id)
//     setActiveTab("quiz-details")
//   }

//   const selectedQuiz = quizzes.find((quiz) => quiz.id === selectedQuizId)

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold tracking-tight">Quiz Management</h1>
//           <p className="text-muted-foreground">Create, edit, and manage your English quizzes.</p>
//         </div>
//         <Button
//           onClick={() => {
//             setIsCreating(true)
//             setActiveTab("create-quiz")
//           }}
//         >
//           <Plus className="mr-2 h-4 w-4" /> Create Quiz
//         </Button>
//       </div>

//       <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
//         <TabsList>
//           <TabsTrigger value="all-quizzes">All Quizzes</TabsTrigger>
//           <TabsTrigger value="create-quiz" disabled={!isCreating}>
//             {isCreating ? "Create Quiz" : ""}
//           </TabsTrigger>
//           <TabsTrigger value="edit-quiz" disabled={!isEditing}>
//             {isEditing ? "Edit Quiz" : ""}
//           </TabsTrigger>
//           <TabsTrigger value="quiz-details" disabled={!selectedQuizId || isEditing || isCreating}>
//             {selectedQuizId && !isEditing && !isCreating ? "Quiz Details" : ""}
//           </TabsTrigger>
//         </TabsList>

//         <TabsContent value="all-quizzes" className="space-y-4">
//           <QuizList quizzes={quizzes} onDelete={handleDeleteQuiz} onEdit={handleEditQuiz} onView={handleViewQuiz} />
//         </TabsContent>

//         <TabsContent value="create-quiz">
//           {isCreating && (
//             <QuizCreator
//               onSubmit={handleCreateQuiz}
//               onCancel={() => {
//                 setIsCreating(false)
//                 setActiveTab("all-quizzes")
//               }}
//             />
//           )}
//         </TabsContent>

//         <TabsContent value="edit-quiz">
//           {isEditing && selectedQuiz && (
//             <QuizCreator
//               quiz={selectedQuiz}
//               onSubmit={handleUpdateQuiz}
//               onCancel={() => {
//                 setIsEditing(false)
//                 setSelectedQuizId(null)
//                 setActiveTab("all-quizzes")
//               }}
//             />
//           )}
//         </TabsContent>

//         <TabsContent value="quiz-details">
//           {selectedQuiz && !isEditing && !isCreating && (
//             <QuizDetails
//               quiz={selectedQuiz}
//               onEdit={() => handleEditQuiz(selectedQuiz.id)}
//               onBack={() => {
//                 setSelectedQuizId(null)
//                 setActiveTab("all-quizzes")
//               }}
//             />
//           )}
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }

