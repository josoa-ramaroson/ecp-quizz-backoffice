export interface IQuiz {
    _id: string
    title: string
    description: string
    startDate: Date
    deadline: Date
    questions: string[]
    creationDate: Date
  }