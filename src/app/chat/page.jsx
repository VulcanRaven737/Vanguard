// app/chat/page.jsx
'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import ChatInterface from '@/components/ChatInterface.jsx'
import Header from '@/components/Header.jsx'

export default function ChatPage() {
  const router = useRouter()
  const [myaccount, setMyaccount] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const account = localStorage.getItem("myaddress")
      if (!account) {
        router.push('/')
      } else {
        setMyaccount(account)
      }
    }
  }, [])

  if (!myaccount) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-[#000000]">
      <Header myaccount={myaccount} />
      <ChatInterface myaccount={myaccount} />
    </div>
  )
}
