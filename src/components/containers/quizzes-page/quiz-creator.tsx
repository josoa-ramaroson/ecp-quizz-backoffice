// "use client"

// import { useState } from "react"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { z } from "zod"
// import { ArrowLeft, Clock, Save } from "lucide-react"

// import type { Quiz } from "@/components/quizzes/quiz-management"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { DateTimePicker } from "@/components/ui/date-time-picker"
// import { QuestionSelector } from "@/components/quizzes/question-selector"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// const quizFormSchema = z.object({
//   title: z.string().min(3, {
//     message: "Title must be at least 3 characters.",
//   }),
//   description: z.string().min(10, {
//     message: "Description must be at least 10 characters.",
//   }),
//   duration: z.coerce
//     .number()
//     .min(5, {
//       message: "Duration must be at least 5 minutes.",
//     })
//     .max(180, {
//       message: "Duration must be at most 180 minutes.",
//     }),
//   difficulty: z.enum(["Easy", "Medium", "Hard"]),
//   status: z.enum(["Draft", "Published", "Archived"]),
// })

// type QuizFormValues = z.infer<typeof quizFormSchema>

// type QuizCreatorProps = {
//   quiz?: Quiz
//   onSubmit: (quiz: Quiz) => void
//   onCancel: () => void
// }

// export function QuizCreator({ quiz, onSubmit, onCancel }: QuizCreatorProps) {
//   const [activeTab, setActiveTab] = useState("basic-info")
//   const [selectedQuestions, setSelectedQuestions] = useState<string[]>(quiz?.questions || [])
//   const [scheduledDate, setScheduledDate] = useState<Date | undefined>(
//     quiz?.scheduledFor ? new Date(quiz.scheduledFor) : undefined,
//   )

//   const form = useForm<QuizFormValues>({
//     resolver: zodResolver(quizFormSchema),
//     defaultValues: {
//       title: quiz?.title || "",
//       description: quiz?.description || "",
//       duration: quiz?.duration || 30,
//       difficulty: quiz?.difficulty || "Medium",
//       status: quiz?.status || "Draft",
//     },
//   })

//   function handleSubmit(data: QuizFormValues) {
//     const newQuiz: Quiz = {
//       id: quiz?.id || `quiz${Date.now()}`,
//       title: data.title,
//       description: data.description,
//       duration: data.duration,
//       totalQuestions: selectedQuestions.length,
//       difficulty: data.difficulty,
//       status: data.status,
//       createdAt: quiz?.createdAt || new Date().toISOString(),
//       scheduledFor: scheduledDate?.toISOString(),
//       questions: selectedQuestions,
//     }

//     onSubmit(newQuiz)
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center">
//         <Button variant="ghost" size="sm" className="mr-2" onClick={onCancel}>
//           <ArrowLeft className="mr-2 h-4 w-4" />
//           Back
//         </Button>
//         <h2 className="text-xl font-semibold">{quiz ? "Edit Quiz" : "Create New Quiz"}</h2>
//       </div>

//       <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
//         <TabsList>
//           <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
//           <TabsTrigger value="questions">Questions</TabsTrigger>
//           <TabsTrigger value="scheduling">Scheduling</TabsTrigger>
//         </TabsList>

//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
//             <TabsContent value="basic-info">
//               <Card>
//                 <CardContent className="pt-6 space-y-4">
//                   <FormField
//                     control={form.control}
//                     name="title"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Quiz Title</FormLabel>
//                         <FormControl>
//                           <Input placeholder="Enter quiz title" {...field} />
//                         </FormControl>
//                         <FormDescription>A clear and descriptive title for your quiz.</FormDescription>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={form.control}
//                     name="description"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Description</FormLabel>
//                         <FormControl>
//                           <Textarea
//                             placeholder="Enter quiz description"
//                             className="resize-none min-h-[100px]"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormDescription>Provide details about what this quiz covers.</FormDescription>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     <FormField
//                       control={form.control}
//                       name="duration"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Duration (minutes)</FormLabel>
//                           <FormControl>
//                             <div className="flex items-center">
//                               <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
//                               <Input type="number" min={5} max={180} {...field} />
//                             </div>
//                           </FormControl>
//                           <FormDescription>Time allowed to complete the quiz.</FormDescription>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />

//                     <FormField
//                       control={form.control}
//                       name="difficulty"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Difficulty</FormLabel>
//                           <Select onValueChange={field.onChange} defaultValue={field.value}>
//                             <FormControl>
//                               <SelectTrigger>
//                                 <SelectValue placeholder="Select difficulty" />
//                               </SelectTrigger>
//                             </FormControl>
//                             <SelectContent>
//                               <SelectItem value="Easy">Easy</SelectItem>
//                               <SelectItem value="Medium">Medium</SelectItem>
//                               <SelectItem value="Hard">Hard</SelectItem>
//                             </SelectContent>
//                           </Select>
//                           <FormDescription>The difficulty level of this quiz.</FormDescription>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />

//                     <FormField
//                       control={form.control}
//                       name="status"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Status</FormLabel>
//                           <Select onValueChange={field.onChange} defaultValue={field.value}>
//                             <FormControl>
//                               <SelectTrigger>
//                                 <SelectValue placeholder="Select status" />
//                               </SelectTrigger>
//                             </FormControl>
//                             <SelectContent>
//                               <SelectItem value="Draft">Draft</SelectItem>
//                               <SelectItem value="Published">Published</SelectItem>
//                               <SelectItem value="Archived">Archived</SelectItem>
//                             </SelectContent>
//                           </Select>
//                           <FormDescription>Current status of the quiz.</FormDescription>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             <TabsContent value="questions">
//               <Card>
//                 <CardContent className="pt-6">
//                   <QuestionSelector selectedQuestions={selectedQuestions} setSelectedQuestions={setSelectedQuestions} />
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             <TabsContent value="scheduling">
//               <Card>
//                 <CardContent className="pt-6 space-y-4">
//                   <div>
//                     <FormLabel>Schedule Quiz</FormLabel>
//                     <div className="mt-2">
//                       <DateTimePicker date={scheduledDate} setDate={setScheduledDate} />
//                     </div>
//                     <p className="text-sm text-muted-foreground mt-2">
//                       Set a date and time when this quiz will be available to members. Leave empty for immediate
//                       availability (if published).
//                     </p>
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             <div className="flex justify-end gap-2">
//               <Button type="button" variant="outline" onClick={onCancel}>
//                 Cancel
//               </Button>
//               <Button type="submit">
//                 <Save className="mr-2 h-4 w-4" />
//                 {quiz ? "Update Quiz" : "Create Quiz"}
//               </Button>
//             </div>
//           </form>
//         </Form>
//       </Tabs>
//     </div>
//   )
// }

