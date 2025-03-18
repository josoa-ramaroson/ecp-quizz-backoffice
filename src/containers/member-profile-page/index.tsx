"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, AtSign, Facebook, Trophy, Medal,  } from "lucide-react"

import { useMemberInfo } from "@/hooks/use-member-data.hook"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import Heading from "@/components/ui/heading"
import { EHeading } from "@/enums"



export default function MemberProfilePage() {
  const { id } = useParams()
  const { memberInfo, isLoading, error } = useMemberInfo(id as string)

  return (
    <div className="container mx-auto py-6 space-y-6 ">
      <div>
        <Button variant="ghost" size="sm" asChild className="gap-2 mb-4 text-muted-foreground hover:text-primary hover:bg-transparent">
          <Link href="/dashboard/members">
            <ArrowLeft className="w-4 h-4" /> Back to Members
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <ProfileSkeleton />
      ) : error ? (
        <Card className="border-destructive">
          <CardHeader >
            <CardTitle className="text-destructive">Error Loading Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error.message}</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild>
              <Link href="/dashboard/members">Return to Members List</Link>
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <>
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between gap-6">
                {/* Member Info Section */}
                <div className="flex gap-4 items-start">
                  <Avatar className="w-20 h-20 border-2 border-primary">
                    <AvatarFallback className="text-xl bg-primary text-primary-foreground">
                      {memberInfo?.firstName?.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Heading as={EHeading.HEADING_3} className="text-2xl font-bold">
                      {memberInfo?.firstName} 
                    </Heading>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Facebook className="w-4 h-4" />
                      <span>{memberInfo?.facebookName || "Not connected"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <AtSign className="w-4 h-4" />
                      <span>{memberInfo?.pseudo}</span>
                    </div>
                  </div>
                </div>

                {/* Stats Section */}
                <div className="flex flex-row gap-4 md:text-right">
                  <div className="bg-muted min-w-32 rounded-lg p-4 flex-1 flex flex-col items-center justify-center">
                    <div className="flex items-center gap-2 mb-1">
                      <Trophy className="w-5 h-5 text-yellow-500" />
                      <span className="text-sm font-medium">Rank</span>
                    </div>
                    <Badge variant="outline" className="text-xl font-bold px-3 py-1">
                      #{memberInfo?.rank || "N/A"}
                    </Badge>
                  </div>
                  <div className="bg-muted min-w-32 rounded-lg p-4 flex-1 flex flex-col items-center justify-center">
                    <div className="flex items-center gap-2 mb-1">
                      <Medal className="w-5 h-5 text-blue-500" />
                      <span className="text-sm font-medium">Score</span>
                    </div>
                    <span className="text-2xl font-bold">{memberInfo?.totalScore || 0}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Quizzes History</CardTitle>
              <CardDescription>Follow every activities of the current member</CardDescription>
            </CardHeader>
          </Card>
          {/* Quizzes Section */}
          {/* <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>Completed Quizzes</span>
                <Badge variant="secondary">{memberInfo?.quizzes?.length || 0}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!memberInfo?.quizzes || memberInfo.quizzes.length === 0 ? (
                <p className="text-center py-6 text-muted-foreground">No quizzes completed yet</p>
              ) : (
                <div className="space-y-4">
                  {memberInfo.quizzes.map((quiz, index) => (
                    <div key={quiz.id}>
                      {index > 0 && <Separator className="my-4" />}
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">{quiz.title}</h4>
                          <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>{quiz.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{quiz.duration}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Score:</span>
                          <Badge variant={getScoreBadgeVariant(quiz.score)}>{quiz.score}%</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card> */}
        </>
      )}
    </div>
  )
}


// Loading skeleton
function ProfileSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-4 w-[300px] mt-2" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="flex gap-4">
            <Skeleton className="w-20 h-20 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-8 w-[150px]" />
              <Skeleton className="h-4 w-[180px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
          <div className="flex flex-row md:flex-col gap-4">
            <Skeleton className="h-24 w-28" />
            <Skeleton className="h-24 w-28" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

