'use client'

import React, { useState, useEffect } from 'react'
import { Heart, Star, Users, TrendingUp, BookOpen, Plus, Target, Share2 } from 'lucide-react'

export default function BeTheHighlightApp() {
  const [currentTab, setCurrentTab] = useState('home')
  const [userStreak, setUserStreak] = useState(7)
  const [showAddHighlight, setShowAddHighlight] = useState(false)
  const [challengeCompleted, setChallengeCompleted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [highlights, setHighlights] = useState([
    {
      id: 1,
      type: 'given',
      title: 'Helped a colleague with presentation',
      description: 'Noticed Sarah seemed stressed about her presentation and offered to review it with her. She said it made all the difference!',
      category: 'workplace',
      likes: 12
    },
    {
      id: 2,
      type: 'received', 
      title: 'Barista remembered my order',
      description: 'The coffee shop was packed, but Maria remembered my usual order and had it ready. Such a small thing that made my whole morning better.',
      category: 'community',
      likes: 8
    }
  ])
  const [newHighlight, setNewHighlight] = useState({
    type: 'given',
    title: '',
    description: '',
    category: 'workplace'
  })
  
  // Get Amazon URL from environment or fallback
  const AMAZON_BOOK_URL = process.env.AMAZON_BOOK_URL || "https://www.amazon.com/Be-Highlight-Small-Actions-Impact-ebook/dp/B0FB9FTCZ9/"
  
  const handleBookPurchase = (source) => {
    try {
      console.log('Book purchase clicked from:', source)
      window.open(AMAZON_BOOK_URL, '_blank', 'noopener,noreferrer')
    } catch (error) {
      console.error('Error opening book link:', error)
      // Fallback: try direct navigation
      window.location.href = AMAZON_BOOK_URL
    }
  }

  const handleChallengeComplete = () => {
    try {
      setChallengeCompleted(true)
      setUserStreak(prev => prev + 1)
      console.log('Challenge completed!')
    } catch (error) {
      console.error('Error completing challenge:', error)
    }
  }

  const handleAddHighlight = () => {
    try {
      if (!newHighlight.title.trim() || !newHighlight.description.trim()) {
        alert('Please fill in both title and description')
        return
      }
      
      setIsLoading(true)

  const communityHighlights = [
    {
      id: 1,
      user: "Jennifer M.",
      title: "Made a customer's day at the grocery store",
      description: "An elderly gentleman was struggling with the self-checkout. Instead of just calling for help, I walked him through it step by step and chatted about his weekend plans. He lit up!",
      likes: 34,
      comments: 8,
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      user: "Marcus R.",
      title: "Coworker surprised me with encouragement", 
      description: "During a tough project deadline, David brought me coffee and a note saying 'You've got this!' It was exactly what I needed to push through.",
      likes: 28,
      comments: 5,
      timestamp: "4 hours ago"
    }
  ]

  // Add Highlight Form
  if (showAddHighlight) {
    return (
      <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
        <div className="bg-white p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Share a Highlight</h2>
            <button 
              onClick={() => setShowAddHighlight(false)}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select 
                value={newHighlight.type}
                onChange={(e) => setNewHighlight({...newHighlight, type: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="given">I was someone's highlight</option>
                <option value="received">Someone was my highlight</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={newHighlight.title}
                onChange={(e) => setNewHighlight({...newHighlight, title: e.target.value})}
                placeholder="Brief description of the moment"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">What happened?</label>
              <textarea
                value={newHighlight.description}
                onChange={(e) => setNewHighlight({...newHighlight, description: e.target.value})}
                placeholder="Tell the story of this highlight moment..."
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select 
                value={newHighlight.category}
                onChange={(e) => setNewHighlight({...newHighlight, category: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="workplace">Workplace</option>
                <option value="community">Community</option>
                <option value="family">Family</option>
                <option value="service">Customer Service</option>
                <option value="random">Random Kindness</option>
              </select>
            </div>

            <button 
              onClick={handleAddHighlight}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Share Highlight
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Main App
  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm">
        <h1 className="text-2xl font-bold text-center text-gray-900">Be the Highlight</h1>
        <p className="text-center text-gray-600 text-sm mt-1">Transform everyday moments</p>
      </div>

      {/* Content */}
      <div className="p-4 pb-20">
        {/* HOME TAB */}
        {currentTab === 'home' && (
          <div className="space-y-6">
            {/* Welcome Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-xl">
              <h2 className="text-2xl font-bold mb-2">Welcome to Be the Highlight!</h2>
              <p className="text-blue-100">You're on a {userStreak}-day highlight streak! 🔥</p>
              <div className="mt-4 flex space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{highlights.length}</div>
                  <div className="text-sm text-blue-200">Highlights Shared</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">5</div>
                  <div className="text-sm text-blue-200">Skills Practiced</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">23</div>
                  <div className="text-sm text-blue-200">Community Likes</div>
                </div>
              </div>
            </div>

            {/* Book Promotion Banner */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-6 rounded-xl">
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
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <Target className="w-5 h-5 mr-2 text-green-600" />
                Today's Challenge
              </h3>
              <div className={`p-4 rounded-lg ${challengeCompleted ? 'bg-green-100' : 'bg-green-50'}`}>
                <h4 className="font-medium text-green-800">
                  {challengeCompleted ? '✅ The Memory Challenge (Completed!)' : 'The Memory Challenge'}
                </h4>
                <p className="text-green-700 mt-1">Remember and use 3 people's names in conversations today</p>
                <p className="text-sm text-green-600 mt-2">From: Chapter 4: Memory as Your Secret Weapon</p>
                
                <div className="mt-3 p-3 bg-white rounded border-l-4 border-green-500">
                  <p className="text-sm italic text-gray-700">"When you remember details about someone's life, you're telling them that your interaction meant something to you."</p>
                </div>
                
                <div className="flex gap-2 mt-3">
                  <button 
                    onClick={handleChallengeComplete}
                    disabled={challengeCompleted}
                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                      challengeCompleted 
                        ? 'bg-gray-400 text-white cursor-not-allowed' 
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    {challengeCompleted ? 'Completed!' : 'Mark Complete'}
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

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setShowAddHighlight(true)}
                className="bg-blue-50 border-2 border-dashed border-blue-300 p-6 rounded-xl text-center hover:bg-blue-100 transition-colors"
              >
                <Plus className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-blue-800 font-medium">Share a Highlight</div>
              </button>
              <button 
                onClick={() => setCurrentTab('skills')}
                className="bg-purple-50 border-2 border-dashed border-purple-300 p-6 rounded-xl text-center hover:bg-purple-100 transition-colors"
              >
                <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-purple-800 font-medium">Practice Skills</div>
              </button>
            </div>
          </div>
        )}

        {/* MY HIGHLIGHTS TAB */}
        {currentTab === 'highlights' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Highlights</h2>
              <button 
                onClick={() => setShowAddHighlight(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Highlight
              </button>
            </div>

            <div className="space-y-4">
              {highlights.map((highlight) => (
                <div key={highlight.id} className="bg-white p-6 rounded-xl shadow-sm border">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                      {highlight.type === 'given' ? (
                        <Star className="w-5 h-5 text-yellow-500 mr-2" />
                      ) : (
                        <Heart className="w-5 h-5 text-red-500 mr-2" />
                      )}
                      <span className="text-sm font-medium capitalize text-gray-600">
                        {highlight.type === 'given' ? 'I was the highlight' : 'Someone was my highlight'}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 capitalize">{highlight.category}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{highlight.title}</h3>
                  <p className="text-gray-700 mb-4">{highlight.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Heart className="w-4 h-4 mr-1" />
                      {highlight.likes} likes
                    </div>
                    <button className="text-blue-600 text-sm hover:text-blue-700">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

{/* SKILLS TAB */}
{currentTab === 'skills' && (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Highlight Skills Practice</h2>
    
    <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 rounded-xl">
      <h3 className="text-xl font-bold mb-2">Your Progress</h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold">{challengeCompleted ? 1 : 0}</div>
          <div className="text-sm text-green-100">Challenges Completed</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">73%</div>
          <div className="text-sm text-green-100">Completion Rate</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">{userStreak}</div>
          <div className="text-sm text-green-100">Day Streak</div>
        </div>
      </div>
    </div>

    {/* Challenge Categories */}
    <div className="grid grid-cols-3 gap-2">
      <div className="bg-green-100 text-green-800 px-3 py-2 rounded-lg text-sm font-medium text-center">
        Easy (8)
      </div>
      <div className="bg-yellow-100 text-yellow-800 px-3 py-2 rounded-lg text-sm font-medium text-center">
        Medium (6)
      </div>
      <div className="bg-red-100 text-red-800 px-3 py-2 rounded-lg text-sm font-medium text-center">
        Hard (4)
      </div>
    </div>

    {/* Daily Challenges List */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Available Challenges</h3>
      
      {/* Today's Challenge - Featured */}
      <div className="bg-green-50 border-2 border-green-200 p-4 rounded-xl">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <h4 className="font-semibold text-green-800">The Memory Challenge</h4>
              <span className="ml-2 px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                Easy
              </span>
              <span className="ml-2 px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                Today's Featured
              </span>
            </div>
            <p className="text-gray-700 mb-2">Remember and use 3 people's names in conversations today</p>
            <p className="text-sm text-blue-600 mb-2">From: Chapter 4: Memory as Your Secret Weapon</p>
            
            <div className="p-2 bg-white rounded border-l-4 border-green-400 mb-2">
              <p className="text-xs italic text-gray-700">"When you remember details about someone's life, you're telling them that your interaction meant something to you."</p>
            </div>
            
            <div className="p-2 bg-green-100 rounded">
              <p className="text-xs text-green-800"><strong>Tip:</strong> Use the 'story method' - link names to memorable details about the person.</p>
            </div>
          </div>
          <div className="ml-4">
            <button 
              onClick={handleChallengeComplete}
              disabled={challengeCompleted}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                challengeCompleted 
                  ? 'bg-green-500 text-white' 
                  : 'border-2 border-gray-300 hover:border-green-500'
              }`}
            >
              {challengeCompleted && '✓'}
            </button>
          </div>
        </div>
      </div>

      {/* Other Challenges */}
      <div className="bg-white p-4 rounded-xl border">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <h4 className="font-semibold">Micro-Moment Magic</h4>
              <span className="ml-2 px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                Medium
              </span>
            </div>
            <p className="text-gray-700 mb-2">Create one memorable 30-second interaction with a stranger</p>
            <p className="text-sm text-blue-600 mb-2">From: Chapter 7: Micro-Moments, Massive Impact</p>
            
            <div className="p-2 bg-blue-50 rounded border-l-4 border-blue-400 mb-2">
              <p className="text-xs italic text-gray-700">"The shortest interactions often create the longest-lasting memories."</p>
            </div>
            
            <div className="p-2 bg-gray-50 rounded">
              <p className="text-xs text-gray-700"><strong>Tip:</strong> Focus on genuine eye contact, use their name if you learn it, and offer unexpected helpfulness.</p>
            </div>
          </div>
          <div className="ml-4">
            <button className="w-8 h-8 border-2 border-gray-300 rounded-full hover:border-blue-500 transition-colors"></button>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <h4 className="font-semibold">Anticipation Nation</h4>
              <span className="ml-2 px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
                Hard
              </span>
            </div>
            <p className="text-gray-700 mb-2">Solve a problem for someone before they ask for help</p>
            <p className="text-sm text-blue-600 mb-2">From: Chapter 6: Anticipation Nation</p>
            
            <div className="p-2 bg-blue-50 rounded border-l-4 border-blue-400 mb-2">
              <p className="text-xs italic text-gray-700">"Being someone's highlight often means solving problems they don't even know they're about to have."</p>
            </div>
            
            <div className="p-2 bg-gray-50 rounded">
              <p className="text-xs text-gray-700"><strong>Tip:</strong> Look for patterns in people's needs and challenges. What do they struggle with regularly?</p>
            </div>
          </div>
          <div className="ml-4">
            <button className="w-8 h-8 border-2 border-gray-300 rounded-full hover:border-blue-500 transition-colors"></button>
          </div>
        </div>
      </div>

      <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl text-center text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors">
        View All 25+ Challenges →
      </button>
    </div>

    <div className="bg-blue-50 p-6 rounded-xl">
      <h3 className="text-lg font-semibold mb-3 flex items-center">
        <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
        From the Book: "Be the Highlight"
      </h3>
      <p className="text-gray-700 mb-4">
        "The most powerful highlight moments often begin with a single decision: to pay attention differently. 
        Starting tomorrow morning, approach your first interaction of the day with complete presence."
      </p>
      <div className="flex gap-2">
        <button 
          onClick={() => handleBookPurchase('skills_tab')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <BookOpen className="w-4 h-4 mr-2" />
          Get the Book on Amazon
        </button>
        <button 
          onClick={() => handleBookPurchase('free_preview')}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Free Preview
        </button>
      </div>
    </div>
  </div>
)}

        {/* COMMUNITY TAB */}
        {currentTab === 'community' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Community Highlights</h2>
            
            <div className="space-y-4">
              {communityHighlights.map((highlight) => (
                <div key={highlight.id} className="bg-white p-6 rounded-xl shadow-sm border">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{highlight.title}</h3>
                    <span className="text-sm text-gray-500">{highlight.timestamp}</span>
                  </div>
                  <p className="text-sm text-blue-600 mb-2">by {highlight.user}</p>
                  <p className="text-gray-700 mb-4">{highlight.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <button className="flex items-center hover:text-red-500">
                        <Heart className="w-4 h-4 mr-1" />
                        {highlight.likes}
                      </button>
                      <button className="hover:text-blue-500">
                        {highlight.comments} comments
                      </button>
                    </div>
                    <button className="text-blue-600 text-sm hover:text-blue-700">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-xl">
              <h3 className="text-lg font-bold mb-2">💡 Inspired by these stories?</h3>
              <p className="text-purple-100 mb-4">
                These highlight moments come from people applying the principles in "Be the Highlight". 
                Get the complete guide with 200+ pages of strategies, stories, and practical tools.
              </p>
              <button 
                onClick={() => handleBookPurchase('community_inspired')}
                className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
              >
                📚 Get the Book on Amazon
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200">
        <div className="grid grid-cols-4 py-2">
          <button 
            onClick={() => setCurrentTab('home')}
            className={`flex flex-col items-center py-2 px-3 ${
              currentTab === 'home' ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            <Star className="w-5 h-5" />
            <span className="text-xs mt-1">Home</span>
          </button>
          <button 
            onClick={() => setCurrentTab('highlights')}
            className={`flex flex-col items-center py-2 px-3 ${
              currentTab === 'highlights' ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            <Heart className="w-5 h-5" />
            <span className="text-xs mt-1">Highlights</span>
          </button>
          <button 
            onClick={() => setCurrentTab('skills')}
            className={`flex flex-col items-center py-2 px-3 ${
              currentTab === 'skills' ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            <TrendingUp className="w-5 h-5" />
            <span className="text-xs mt-1">Skills</span>
          </button>
          <button 
            onClick={() => setCurrentTab('community')}
            className={`flex flex-col items-center py-2 px-3 ${
              currentTab === 'community' ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            <Users className="w-5 h-5" />
            <span className="text-xs mt-1">Community</span>
          </button>
        </div>
      </div>
    </div>
  )
}
