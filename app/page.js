'use client'

import React, { useState } from 'react'
import { Heart, Star, Users, TrendingUp, BookOpen, Plus, Target } from 'lucide-react'

export default function BeTheHighlightApp() {
  const [currentTab, setCurrentTab] = useState('home')
  
  const AMAZON_BOOK_URL = "https://www.amazon.com/Be-Highlight-Small-Actions-Impact-ebook/dp/B0FB9FTCZ9/"
  
  const handleBookPurchase = (source) => {
    console.log('Book purchase clicked from:', source)
    window.open(AMAZON_BOOK_URL, '_blank')
  }

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm">
        <h1 className="text-2xl font-bold text-center text-gray-900">Be the Highlight</h1>
        <p className="text-center text-gray-600 text-sm mt-1">Transform everyday moments</p>
      </div>

      {/* Content */}
      <div className="p-4 pb-20">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-xl mb-6">
          <h2 className="text-2xl font-bold mb-2">Welcome to Be the Highlight!</h2>
          <p className="text-blue-100">Start creating highlight moments today 🔥</p>
        </div>

        {/* Book Promotion Banner */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-6 rounded-xl mb-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-1">📚 Get the Complete Book!</h3>
              <p className="text-amber-100 text-sm">200+ pages with detailed strategies and real stories.</p>
            </div>
            <button 
              onClick={() => handleBookPurchase('home_banner')}
              className="bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold hover:bg-amber-50 transition-colors ml-4"
            >
              Buy on Amazon
            </button>
          </div>
        </div>

        {/* Today's Challenge */}
        <div className="bg-white p-6 rounded-xl shadow-sm border mb-6">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <Target className="w-5 h-5 mr-2 text-green-600" />
            Today's Challenge
          </h3>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-medium text-green-800">The Memory Challenge</h4>
            <p className="text-green-700 mt-1">Remember and use 3 people's names in conversations today</p>
            <p className="text-sm text-green-600 mt-2">From: Chapter 4: Memory as Your Secret Weapon</p>
            
            <div className="mt-3 p-3 bg-white rounded border-l-4 border-green-500">
              <p className="text-sm italic text-gray-700">"When you remember details about someone's life, you're telling them that your interaction meant something to you."</p>
            </div>
            
            <div className="flex gap-2 mt-3">
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors">
                Mark Complete
              </button>
              <button 
                onClick={() => handleBookPurchase('daily_challenge')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center"
              >
                <BookOpen className="w-4 h-4 mr-1" />
                Get the Book
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200">
        <div className="grid grid-cols-4 py-2">
          <button className="flex flex-col items-center py-2 px-3 text-blue-600">
            <Star className="w-5 h-5" />
            <span className="text-xs mt-1">Home</span>
          </button>
          <button className="flex flex-col items-center py-2 px-3 text-gray-400">
            <Heart className="w-5 h-5" />
            <span className="text-xs mt-1">Highlights</span>
          </button>
          <button className="flex flex-col items-center py-2 px-3 text-gray-400">
            <TrendingUp className="w-5 h-5" />
            <span className="text-xs mt-1">Skills</span>
          </button>
          <button className="flex flex-col items-center py-2 px-3 text-gray-400">
            <Users className="w-5 h-5" />
            <span className="text-xs mt-1">Community</span>
          </button>
        </div>
      </div>
    </div>
  )
}
