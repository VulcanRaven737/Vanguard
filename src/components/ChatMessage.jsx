// components/ChatMessage.jsx
'use client'
import { useState, useEffect, useRef } from 'react'
import { faker } from '@faker-js/faker';


export default function ChatMessage({ account, myaccount, contract, index }) {
  const [names, setNames] = useState([]);
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const generateNames = () => {
    const randomNames = Array.from({ length: 10 }, () => faker.name.firstName());
    setNames(randomNames);
  };
  useEffect(()=>{generateNames()},[messages]);

  const loadMessages = async () => {
    setIsLoading(true)
    try {
      const events = await contract.getPastEvents('message', {
        fromBlock: 0,
        toBlock: 'latest'
      })

      const relevantMessages = events
        .map(event => event.returnValues)
        .filter(msg => 
          (msg.from === account && msg.to === myaccount) ||
          (msg.from === myaccount && msg.to === account)
        )

      setMessages(relevantMessages)
    } catch (error) {
      console.error('Error loading messages:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isExpanded) {
      loadMessages()
    }
  }, [isExpanded])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!newMessage.trim()) return
    
    const time = new Date().toLocaleString("en-IN")
    try {
      await contract.methods.sendMessage(account, newMessage, time)
        .send({ from: myaccount })
      
      setMessages(prev => [...prev, {
        from: myaccount,
        to: account,
        message: newMessage,
        timestamp: time
      }])
      setNewMessage('')
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="rounded-lg bg-[#373A40] shadow-sm">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 text-left font-medium flex items-center justify-between hover:bg-[#686D76] hover:rounded-lg"
      >
        <span className="text-sm font-mono">{names[index]} ({account.slice(0,5)})</span>
        <span className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      
      {isExpanded && (
        <div className="p-4 space-y-4">
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="text-center py-4">
                <div className="animate-spin h-6 w-6 border-2 border-blue-500 rounded-full border-t-transparent mx-auto"></div>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.from === myaccount ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.from === myaccount 
                      ? 'bg-[#1F4287] text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="break-words">{msg.message}</p>
                    <p className="text-xs mt-1 opacity-75">
                      {msg.from === myaccount ? 'sent ' : 'received '}
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
            <button
              onClick={handleSend}
              className="px-4 py-2 bg-[#1F4287] hover:bg-blue-500 rounded-lg font-medium transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
