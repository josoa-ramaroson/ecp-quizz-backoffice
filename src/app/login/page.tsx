"use client"
import dynamic from 'next/dynamic';
// Dynamically import LoginPage with SSR disabled
const LoginPage = dynamic(
  () => import('@/components/containers/login-page'),
  { ssr: false }
)
export default function LoginPageRoute() {


  return (
    <LoginPage 
    />
  )
}
