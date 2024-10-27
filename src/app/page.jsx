
// app/page.jsx
'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import LoginForm from '@/components/LoginForm'

export default function Home() {
  const router = useRouter()
  
  useEffect(() => {
    const myaccount = localStorage.getItem("myaddress")
    if (myaccount) {
      router.push('/chat')
    }
  }, [router])

  return <LoginForm />
}