// components/ChatInterface.jsx
'use client'
import { useEffect, useState } from 'react'
import Web3 from 'web3'
import ChatMessage from './ChatMessage'
import { contractABI } from '@/lib/contractABI'
import { contractAddr } from '@/lib/contractAddr'
import { rcpAddr } from '@/lib/rpcAddr'

export default function ChatInterface({ myaccount }) {
  const [accounts, setAccounts] = useState([])
  const [web3, setWeb3] = useState(null)
  const [contract, setContract] = useState(null)
  const contractAddress = contractAddr

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        const web3Instance = new Web3(new Web3.providers.HttpProvider(rcpAddr))
        setWeb3(web3Instance)
        
        const contractInstance = new web3Instance.eth.Contract(contractABI, contractAddress)
        setContract(contractInstance)
        
        const accountsList = await web3Instance.eth.getAccounts()
        setAccounts(accountsList.filter(account => account !== myaccount))
      } catch (error) {
        console.error('Error initializing Web3:', error)
      }
    }

    if (myaccount) {
      initWeb3()
    }
  }, [myaccount])

  if (!web3 || !contract) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 bg-[#000000] mt-7">
      <h1 className='text-6xl mb-6 font-bold'>Chats</h1>
      <div className="space-y-4">
        {accounts.map((account, index) => (
          <ChatMessage 
            key={account}
            account={account}
            myaccount={myaccount}
            contract={contract}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}
