// components/Header.jsx
import { useState } from 'react'
import { FiSearch, FiBell, FiSettings, FiLogOut } from 'react-icons/fi'

export default function Header({ myaccount }) {
  const [showDropdown, setShowDropdown] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("myaddress")
    window.location.href = '/'  // Redirect to homepage after logout
  }

  return (
    <header className="flex justify-between items-center bg-[#1F4287] text-white py-4 px-6 shadow-md">
      {/* Left Side - Logo */}
      <div className="flex items-center space-x-3">
        <div className="bg-white rounded-full p-2">
          <img
            src="stealth-link.ico"  // Replace with your logo path
            alt="Chat Logo"
            className="h-8 w-8"
            onClick={() => window.location.href = '/chat'}
          />
        </div>
        <h1 className="text-2xl font-semibold">Vanguard</h1>
      </div>
      
      {/* Right Side - Account Info and Actions */}
      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-blue-700 rounded-full">
          <FiBell size={20} />
        </button>
        <button className="p-2 hover:bg-blue-700 rounded-full">
          <FiSettings size={20} />
        </button>

        {/* Profile and Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center space-x-2 p-2 bg-[#FFFFFF] transition-transform duration-300 hover:scale-110 rounded-full focus:outline-none"
          >
            <img
              src="/profile.png"  // Replace with your profile image path
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <span className="hidden md:inline-block text-black">{myaccount.slice(0,5)}</span>
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-black rounded-lg shadow-lg py-2 text-white">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-[#414141] hover:rounded flex items-center space-x-2">
                <FiLogOut />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
