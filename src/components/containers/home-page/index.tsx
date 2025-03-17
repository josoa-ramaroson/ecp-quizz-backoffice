"use client"
import { Button, Footer, Heading } from '@/components'
import { EButtonSize, EButtonVariant, EHeading } from '@/enums'
import { ArrowRight } from 'lucide-react'
import { FeaturesGrid } from './components'
import { useRouter } from 'next/navigation'
import { useState } from 'react'


export default function HomePage() {

  const router = useRouter()
  
  const onStartQuizClicked = () => {
    setIsChangingPage(true);
    router.push("/login");
    setIsChangingPage(false);
  };

  const [isChangingPage, setIsChangingPage] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b pt-32 from-background-light via-background to-background-dark">
    {/* Hero Section */}
    <div className="container mx-auto px-4 py-16 flex flex-col items-center">
      <div className="max-w-4xl w-full text-center space-y-6 flex flex-col items-center">
        <Heading 
          as={EHeading.HEADING_1}
          className="text-secondary-900">
          Welcome to{' '}
          <span className="text-primary-600 relative inline-block">
            ECP Quiz Backoffice
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-primary-200 rounded-full"></div>
          </span>
        </Heading> 
   
        <Heading
          as={EHeading.HEADING_6}
          >
          Create, manage and analyze quizzes in one centralized dashboard
        </Heading>

        <Button 
          label="Go to Dashboard" 
          icon={<ArrowRight />} 
          className="rounded-xl"
          size={EButtonSize.LARGE}
          variant={EButtonVariant.PRIMARY}
          isLoading={isChangingPage}
          onClick={onStartQuizClicked}
          />
      </div>

      <FeaturesGrid />
    </div>
 
    <Footer text='Streamline quiz administration and get valuable insights into participant performance' />
  </div>
  )
}
