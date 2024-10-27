'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const [address, setAddress] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!address.trim()) return

    setIsLoading(true)
    try {
      localStorage.setItem("myaddress", address.trim())
      router.push('/chat')
    } catch (error) {
      console.error('Error during login:', error)
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#000000] flex items-center justify-center">
      <div className="bg-[#1F4287] p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl text-[#ffff] font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter Ethereum Address"
              className="w-full p-2 border bg-[#ffff] text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-[#222831] text-white p-2 rounded-lg transition-colors ${
              isLoading 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'hover:bg-blue-600'
            }`}
          >
            {isLoading ? 'Connecting...' : 'Connect'}
          </button>
        </form>
      </div>
    </div>
  )
}