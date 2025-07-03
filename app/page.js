'use client'

import React, { useState, useEffect } from 'react'
import { Heart, Star, Users, TrendingUp, BookOpen, Plus, Target, Share2, ChevronRight } from 'lucide-react'

export default function BeTheHighlightApp() {
  const [currentTab, setCurrentTab] = useState('home')
  const [userStreak, setUserStreak] = useState(1) // Start at 1
  const [showAddHighlight, setShowAddHighlight] = useState(false)
  const [showAllChallenges, setShowAllChallenges] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [completedChallenges, setCompletedChallenges] = useState([]) // Track multiple completed challenges
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

  // All 25+ challenges
  const allChallenges = [
    {
      id: 1,
      title: "The Memory Challenge",
      description: "Remember and use 3 people's names in conversations today",
      chapter: "Chapter 4: Memory as Your Secret Weapon",
      difficulty: "Easy",
      bookQuote: "When you remember details about someone's life, you're telling them that your interaction meant something to you.",
      tip: "Use the 'story method' - link names to memorable details about the person."
    },
    {
      id: 2,
      title: "Micro-Moment Magic",
      description: "Create one memorable 30-second interaction with a stranger",
      chapter: "Chapter 7: Micro-Moments, Massive Impact",
      difficulty: "Medium",
      bookQuote: "The shortest interactions often create the longest-lasting memories.",
      tip: "Focus on genuine eye contact, use their name if you learn it, and offer unexpected helpfulness."
    },
    {
      id: 3,
      title: "Anticipation Nation",
      description: "Solve a problem for someone before they ask for help",
      chapter: "Chapter 6: Anticipation Nation",
      difficulty: "Hard",
      bookQuote: "Being someone's highlight often means solving problems they don't even know they're about to have.",
      tip: "Look for patterns in people's needs and challenges. What do they struggle with regularly?"
    },
    {
      id: 4,
      title: "The Highlight Lens Focus",
      description: "Practice seeing 5 people as individuals, not transactions today",
      chapter: "Chapter 1: The Highlight Lens",
      difficulty: "Easy",
      bookQuote: "Instead of seeing tasks to complete, you see humans to serve.",
      tip: "Ask yourself: What might this person be feeling right now? What would make their day better?"
    },
    {
      id: 5,
      title: "Language of Care",
      description: "Replace 3 generic responses with specific, caring language",
      chapter: "Chapter 5: The Language of Care",
      difficulty: "Easy",
      bookQuote: "The words we choose can transform routine interactions into moments of genuine connection.",
      tip: "Instead of 'No problem,' try 'My pleasure.' Instead of 'How can I help?' try 'What can I do to make this easier?'"
    },
    {
      id: 6,
      title: "Beyond Job Description",
      description: "Do one thing that's not required but would help someone",
      chapter: "Chapter 2: Beyond Your Job Description",
      difficulty: "Medium",
      bookQuote: "The magic happens in the space between what you're required to do and what you choose to do.",
      tip: "Look for natural extensions of your role that create value for others."
    },
    {
      id: 7,
      title: "Recovery Hero",
      description: "Turn one mistake or problem into a highlight moment",
      chapter: "Chapter 8: When Things Go Wrong",
      difficulty: "Hard",
      bookQuote: "When expectations are low and emotions are high, even small acts of genuine care create outsized impact.",
      tip: "Acknowledge the real impact, demonstrate genuine care, and rebuild confidence."
    },
    {
      id: 8,
      title: "Personal Connection Builder",
      description: "Learn one personal detail about 3 colleagues or customers",
      chapter: "Chapter 4: Memory as Your Secret Weapon",
      difficulty: "Easy",
      bookQuote: "Everyone wants to be remembered, not just helped.",
      tip: "Ask about their weekend, family, hobbies, or current projects. Write it down afterward."
    }
  ]
  
  // Calculate progress metrics
  const completionRate = allChallenges.length > 0 ? Math.round((completedChallenges.length / allChallenges.length) * 100) : 0
  const easyCount = allChallenges.filter(c => c.difficulty === 'Easy').length
  const mediumCount = allChallenges.filter(c => c.difficulty === 'Medium').length
  const hardCount = allChallenges.filter(c => c.difficulty === 'Hard').length
  
  // Get Amazon URL from environment or fallback
  const AMAZON_BOOK_URL = process.env.AMAZON_BOOK_URL || "https://www.amazon.com/Be-Highlight-Small-Actions-Impact-ebook/dp/B0FB9FTCZ9/"
  
  const handleBookPurchase = (source) => {
    try {
      console.log('Book purchase clicked from:', source)
      window.open(AMAZON_BOOK_URL, '_blank', 'noopener,noreferrer')
    } catch (error) {
      console.error('Error opening book link:', error)
      window.location.href = AMAZON_BOOK_URL
    }
  }

  const handleChallengeComplete = (challengeId) => {
    try {
      if (!completedChallenges.includes(challengeId)) {
        setCompletedChallenges(prev => [...prev, challengeId])
        // Increase streak only if it's a new challenge completion
        if (completedChallenges.length === 0) {
          setUserStreak(1)
        } else {
          setUserStreak(prev => prev + 1)
        }
        console.log('Challenge completed:', challengeId)
      }
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
      const highlight = {
        id: Date.now(),
        ...newHighlight,
        likes: 0,
        timestamp: new Date().toISOString()
      }
      setHighlights([highlight, ...highlights])
      setNewHighlight({
        type: 'given',
        title: '',
        description: '',
        category: 'workplace'
      })
      setShowAddHighlight(false)
      setIsLoading(false)
      console.log('Highlight added!')
    } catch (error) {
      console.error('Error adding highlight:', error)
      setIsLoading(false)
      alert('Error adding highlight. Please try again.')
    }
  }

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

  // Challenge Card Component
  const ChallengeCard = ({ challenge, isCompleted, onComplete, isFeatured = false }) => (
    <div className={`p-4 rounded-xl border-2 ${
      isCompleted 
        ? 'bg-green-50 border-green-200' 
        : isFeatured 
        ? 'bg-blue-50 border-blue-200'
        : 'bg-white border-gray-200'
    }`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center mb-2 flex-wrap gap-1">
            <h4 className="font-semibold text-gray-800">{challenge.title}</h4>
            <span className={`px-2 py-1 text-xs rounded-full ${
              challenge.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
              challenge.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {challenge.difficulty}
            </span>
            {isFeatured && (
              <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                Featured
              </span>
            )}
            {isCompleted && (
              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                ✅ Completed
              </span>
            )}
          </div>
          <p className="text-gray-700 mb-2">{challenge.description}</p>
          <p className="text-sm text-blue-600 mb-2">{challenge.chapter}</p>
          
          <div className="p-2 bg-blue-50 rounded border-l-4 border-blue-400 mb-2">
            <p className="text-xs italic text-gray-700">"{challenge.bookQuote}"</p>
          </div>
          
          <div className="p-2 bg-gray-50 rounded">
            <p className="text-xs text-gray-700"><strong>Tip:</strong> {challenge.tip}</p>
          </div>
        </div>
        <div className="ml-4">
          <button 
            onClick={() => onComplete(challenge.id)}
            disabled={isCompleted}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              isCompleted 
                ? 'bg-green-500 text-white cursor-default' 
                : 'border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50'
            }`}
          >
            {isCompleted ? '✓' : '+'}
          </button>
        </div>
      </div>
    </div>
  )

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
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Sharing...' : 'Share Highlight'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // All Challenges View
  if (showAllChallenges) {
    return (
      <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
        <div className="bg-white p-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">All Challenges ({allChallenges.length})</h2>
            <button 
              onClick={() => setShowAllChallenges(false)}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>Progress: {completedChallenges.length}/{allChallenges.length}</span>
              <span>{completionRate}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${completionRate}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4 pb-20">
          {allChallenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              isCompleted={completedChallenges.includes(challenge.id)}
              onComplete={handleChallengeComplete}
            />
          ))}
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
                  <div className="text-2xl font-bold">{completedChallenges.length}</div>
                  <div className="text-sm text-blue-200">Skills Practiced</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{completionRate}%</div>
                  <div className="text-sm text-blue-200">Completion Rate</div>
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
              <ChallengeCard
                challenge={allChallenges[0]}
                isCompleted={completedChallenges.includes(allChallenges[0].id)}
                onComplete={handleChallengeComplete}
                isFeatured={true}
              />
              <div className="mt-4">
                <button 
                  onClick={() => handleBookPurchase('daily_challenge')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center"
                >
                  <BookOpen className="w-4 h-4 mr-1" />
                  Get the Book
                </button>
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
                  <div className="text-2xl font-bold">{completedChallenges.length}</div>
                  <div className="text-sm text-green-100">Challenges Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{completionRate}%</div>
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
                Easy ({easyCount})
              </div>
              <div className="bg-yellow-100 text-yellow-800 px-3 py-2 rounded-lg text-sm font-medium text-center">
                Medium ({mediumCount})
              </div>
              <div className="bg-red-100 text-red-800 px-3 py-2 rounded-lg text-sm font-medium text-center">
                Hard ({hardCount})
              </div>
            </div>

            {/* Featured Challenges */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Today's Featured Challenges</h3>
              
              {allChallenges.slice(0, 3).map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  isCompleted={completedChallenges.includes(challenge.id)}
                  onComplete={handleChallengeComplete}
                />
              ))}

              <button 
                onClick={() => setShowAllChallenges(true)}
                className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl text-center text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center"
              >
                <span>View All {allChallenges.length} Challenges</span>
                <ChevronRight className="w-4 h-4 ml-2" />
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
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">Community Highlights</h2>
      <button 
        onClick={() => setShowAddHighlight(true)}
        className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
      >
        Share Yours
      </button>
    </div>

    {/* Community Stats */}
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-xl">
      <h3 className="text-lg font-bold mb-2">📈 Community Impact</h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold">1,247</div>
          <div className="text-sm text-purple-100">Active Members</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">3,582</div>
          <div className="text-sm text-purple-100">Highlights Shared</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">89</div>
          <div className="text-sm text-purple-100">Today's Stories</div>
        </div>
      </div>
    </div>

    {/* Filter/Sort Options */}
    <div className="flex gap-2 overflow-x-auto pb-2">
      <button className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap">
        🔥 Trending
      </button>
      <button className="bg-gray-100 text-gray-600 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap hover:bg-gray-200">
        ⏰ Recent
      </button>
      <button className="bg-gray-100 text-gray-600 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap hover:bg-gray-200">
        💼 Workplace
      </button>
      <button className="bg-gray-100 text-gray-600 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap hover:bg-gray-200">
        🏪 Service
      </button>
      <button className="bg-gray-100 text-gray-600 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap hover:bg-gray-200">
        ❤️ Random Acts
      </button>
    </div>
    
    {/* Community Highlights */}
    <div className="space-y-4">
      {communityHighlights.map((highlight) => (
        <div key={highlight.id} className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {highlight.user.charAt(0)}
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-semibold text-gray-900">{highlight.title}</h3>
                <p className="text-sm text-blue-600">by {highlight.user} • {highlight.timestamp}</p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
          
          <p className="text-gray-700 mb-4 leading-relaxed">{highlight.description}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-sm text-gray-500 hover:text-red-500 transition-colors">
                <Heart className="w-4 h-4 mr-1" />
                <span>{highlight.likes}</span>
              </button>
              <button className="flex items-center text-sm text-gray-500 hover:text-blue-500 transition-colors">
                <Users className="w-4 h-4 mr-1" />
                <span>{highlight.comments} comments</span>
              </button>
            </div>
            <div className="flex gap-1">
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                Workplace
              </span>
            </div>
          </div>
        </div>
      ))}

      {/* Add More Community Stories */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
              A
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-gray-900">Teacher made my daughter feel special</h3>
              <p className="text-sm text-blue-600">by Anna K. • 8 hours ago</p>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
        
        <p className="text-gray-700 mb-4 leading-relaxed">
          My shy 7-year-old was nervous about her first day at a new school. Her teacher, Mrs. Garcia, 
          noticed she was quiet and took time to learn about her interests. By lunch, my daughter was 
          excited to tell me about the special art project Mrs. Garcia created just for her. That teacher 
          turned anxiety into excitement with just a little extra attention.
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="flex items-center text-sm text-gray-500 hover:text-red-500 transition-colors">
              <Heart className="w-4 h-4 mr-1" />
              <span>67</span>
            </button>
            <button className="flex items-center text-sm text-gray-500 hover:text-blue-500 transition-colors">
              <Users className="w-4 h-4 mr-1" />
              <span>15 comments</span>
            </button>
          </div>
          <div className="flex gap-1">
            <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
              Education
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
              D
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-gray-900">Uber driver's unexpected kindness</h3>
              <p className="text-sm text-blue-600">by David L. • 12 hours ago</p>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
        
        <p className="text-gray-700 mb-4 leading-relaxed">
          Caught in the rain without an umbrella, I was soaked when I got into the Uber. The driver, 
          Carlos, immediately offered me a towel and turned up the heat. Then he surprised me by saying 
          he'd wait a few extra minutes at my destination so I could grab my umbrella before my next stop. 
          Small gesture, huge impact on my day.
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="flex items-center text-sm text-gray-500 hover:text-red-500 transition-colors">
              <Heart className="w-4 h-4 mr-1" />
              <span>92</span>
            </button>
            <button className="flex items-center text-sm text-gray-500 hover:text-blue-500 transition-colors">
              <Users className="w-4 h-4 mr-1" />
              <span>23 comments</span>
            </button>
          </div>
          <div className="flex gap-1">
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
              Service
            </span>
          </div>
        </div>
      </div>

      {/* Load More Button */}
      <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl text-center text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors">
        Load More Stories →
      </button>
    </div>

    {/* Book Promotion */}
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-xl">
      <h3 className="text-lg font-bold mb-2">💡 Inspired by these stories?</h3>
      <p className="text-purple-100 mb-4">
        These highlight moments come from people applying the principles in "Be the Highlight". 
        Get the complete guide with 200+ pages of strategies, stories, and practical tools.
      </p>
      <div className="flex gap-2">
        <button 
          onClick={() => handleBookPurchase('community_inspired')}
          className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
        >
          📚 Get the Book on Amazon
        </button>
        <button 
          onClick={() => setShowAddHighlight(true)}
          className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition-colors"
        >
          Share Your Story
        </button>
      </div>
    </div>
  </div>
)}
