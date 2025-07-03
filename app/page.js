'use client'

import React, { useState, useEffect } from 'react'
import { Heart, Star, Users, TrendingUp, BookOpen, Plus, Target, Share2, MessageCircle, ThumbsUp, Clock, Award } from 'lucide-react'

export default function BeTheHighlightApp() {
  const [currentTab, setCurrentTab] = useState('home')
  const [userStreak, setUserStreak] = useState(7)
  const [userStats, setUserStats] = useState({
    dailyActiveUsers: 1247,
    challengeCompletionRate: 73,
    highlightPostsShared: 156,
    bookLinkClicks: 89,
    userRetentionRate: 68
  })
  const [todaysChallengeIndex, setTodaysChallengeIndex] = useState(0)
  const [showAddHighlight, setShowAddHighlight] = useState(false)
  const [newHighlight, setNewHighlight] = useState({
    type: 'given',
    title: '',
    description: '',
    category: 'workplace'
  })

  const [highlights, setHighlights] = useState([
    {
      id: 1,
      type: 'given',
      title: 'Helped a colleague with presentation',
      description: 'Noticed Sarah seemed stressed about her presentation and offered to review it with her. She said it made all the difference!',
      category: 'workplace',
      timestamp: new Date().toISOString(),
      likes: 12
    },
    {
      id: 2,
      type: 'received',
      title: 'Barista remembered my order',
      description: 'The coffee shop was packed, but Maria remembered my usual order and had it ready. Such a small thing that made my whole morning better.',
      category: 'community',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      likes: 8
    }
  ])

  // Book purchase link
  const AMAZON_BOOK_URL = process.env.AMAZON_BOOK_URL || "https://www.amazon.com/Be-Highlight-Small-Actions-Impact-ebook/dp/B0FB9FTCZ9/"

  // Analytics tracking functions
  const trackEvent = (eventName, properties = {}) => {
    console.log('Analytics:', eventName, properties)
    
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, {
        event_category: 'user_interaction',
        event_label: properties.source || 'unknown',
        value: 1
      })
    }
    
    if (eventName === 'challenge_completed') {
      setUserStats(prev => ({
        ...prev,
        challengeCompletionRate: Math.min(100, prev.challengeCompletionRate + 1)
      }))
    } else if (eventName === 'highlight_shared') {
      setUserStats(prev => ({
        ...prev,
        highlightPostsShared: prev.highlightPostsShared + 1
      }))
    } else if (eventName === 'book_link_clicked') {
      setUserStats(prev => ({
        ...prev,
        bookLinkClicks: prev.bookLinkClicks + 1
      }))
    }
  }

  const handleBookPurchase = (source) => {
    trackEvent('book_link_clicked', { source })
    window.open(AMAZON_BOOK_URL, '_blank')
  }

  const [dailyChallenges, setDailyChallenges] = useState([
    {
      id: 1,
      title: "The Memory Challenge",
      description: "Remember and use 3 people's names in conversations today",
      chapter: "Chapter 4: Memory as Your Secret Weapon",
      difficulty: "Easy",
      completed: false,
      bookQuote: "When you remember details about someone's life, you're telling them that your interaction meant something to you.",
      tip: "Use the 'story method' - link names to memorable details about the person."
    },
    {
      id: 2,
      title: "Micro-Moment Magic",
      description: "Create one memorable 30-second interaction with a stranger",
      chapter: "Chapter 7: Micro-Moments, Massive Impact",
      difficulty: "Medium",
      completed: true,
      bookQuote: "The shortest interactions often create the longest-lasting memories.",
      tip: "Focus on genuine eye contact, use their name if you learn it, and offer unexpected helpfulness."
    },
    {
      id: 3,
      title: "Anticipation Nation",
      description: "Solve a problem for someone before they ask for help",
      chapter: "Chapter 6: Anticipation Nation",
      difficulty: "Hard",
      completed: false,
      bookQuote: "Being someone's highlight often means solving problems they don't even know they're about to have.",
      tip: "Look for patterns in people's needs and challenges. What do they struggle with regularly?"
    }
  ])

  const handleChallengeComplete = (challengeId) => {
    trackEvent('challenge_completed', { challengeId })
    setDailyChallenges(prev => 
      prev.map(challenge => 
        challenge.id === challengeId 
          ? { ...challenge, completed: true }
          : challenge
      )
    )
  }

  const getCurrentChallenge = () => {
    return dailyChallenges[todaysChallengeIndex]
  }

  const handleAddHighlight = () => {
    if (newHighlight.title && newHighlight.description) {
      const highlight = {
        id: highlights.length + 1,
        ...newHighlight,
        timestamp: new Date().toISOString(),
        likes: 0
      }
      setHighlights([highlight, ...highlights])
      setNewHighlight({
        type: 'given',
        title: '',
        description: '',
        category: 'workplace'
      })
      setShowAddHighlight(false)
      trackEvent('highlight_shared', { type: newHighlight.type, category: newHighlight.category })
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
      timestamp: "2 hours ago",
      category: "community",
      userLevel: "Highlight Hero"
    },
    {
      id: 2,
      user: "Marcus R.",
      title: "Coworker surprised me with encouragement",
      description: "During a tough project deadline, David brought me coffee and a note saying 'You've got this!' It was exactly what I needed to push through.",
      likes: 28,
      comments: 5,
      timestamp: "4 hours ago",
      category: "workplace",
      userLevel: "Rising Star"
    },
    {
      id: 3,
      user: "Sarah K.",
      title: "Unexpected kindness from a stranger",
      description: "My car broke down in the rain. A woman stopped, offered me her umbrella, and waited with me until help arrived. We ended up having an amazing conversation!",
      likes: 45,
      comments: 12,
      timestamp: "6 hours ago",
      category: "community",
      userLevel: "Highlight Champion"
    },
    {
      id: 4,
      user: "Alex T.",
      title: "Turned a complaint into a celebration",
      description: "Customer was upset about a delayed order. I not only expedited it but included a handwritten note and small gift. They became our biggest advocate!",
      likes: 52,
      comments: 15,
      timestamp: "8 hours ago",
      category: "customer_service",
      userLevel: "Highlight Legend"
    }
  ]

  const HomeTab = () => (
    <div className="space-y-6">
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

      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-6 rounded-xl">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-1">📚 Get the Complete Book!</h3>
            <p className="text-amber-100 text-sm">200+ pages with detailed strategies, real stories, and practical tools.</p>
          </div>
          <button 
            onClick={() => handleBookPurchase('home_banner')}
            className="bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold hover:bg-amber-50 transition-colors ml-4"
          >
            Buy on Amazon
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-lg font-semibold mb-3 flex items-center">
          <Target className="w-5 h-5 mr-2 text-green-600" />
          Today's Challenge
        </h3>
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-medium text-green-800">{getCurrentChallenge().title}</h4>
          <p className="text-green-700 mt-1">{getCurrentChallenge().description}</p>
          <p className="text-sm text-green-600 mt-2">From: {getCurrentChallenge().chapter}</p>
          
          <div className="mt-3 p-3 bg-white rounded border-l-4 border-green-500">
            <p className="text-sm italic text-gray-700">"{getCurrentChallenge().bookQuote}"</p>
          </div>
          
          <div className="mt-2 p-2 bg-green-100 rounded">
            <p className="text-sm text-green-800"><strong>Tip:</strong> {getCurrentChallenge().tip}</p>
          </div>
          
          <div className="flex gap-2 mt-3">
            <button 
              onClick={() => handleChallengeComplete(getCurrentChallenge().id)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Mark Complete
            </button>
            <button 
              onClick={() => handleBookPurchase('daily_challenge')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <BookOpen className="w-4 h-4 mr-1" />
              Get the Book
            </button>
          </div>
        </div>
      </div>

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
  )

  const SkillsTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Highlight Skills Practice</h2>
      
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 rounded-xl">
        <h3 className="text-xl font-bold mb-2">Your Progress</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{dailyChallenges.filter(c => c.completed).length}</div>
            <div className="text-sm text-green-100">Challenges Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{userStats.challengeCompletionRate}%</div>
            <div className="text-sm text-green-100">Completion Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{userStreak}</div>
            <div className="text-sm text-green-100">Day Streak</div>
          </div>
        </div>
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
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Practice Areas</h3>
        {dailyChallenges.map((challenge) => (
          <div key={challenge.id} className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">{challenge.title}</h4>
              <span className={`px-2 py-1 rounded text-xs ${
                challenge.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                challenge.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {challenge.difficulty}
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-3">{challenge.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">{challenge.chapter}</span>
              <button 
                onClick={() => handleChallengeComplete(challenge.id)}
                className={`px-3 py-1 rounded text-sm ${
                  challenge.completed 
                    ? 'bg-green-100 text-green-800 cursor-default' 
                    : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                }`}
                disabled={challenge.completed}
              >
                {challenge.completed ? 'Completed ✓' : 'Try This'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const HighlightsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Highlights</h2>
        <button 
          onClick={() => setShowAddHighlight(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Highlight
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border text-center">
          <div className="text-2xl font-bold text-blue-600">{highlights.length}</div>
          <div className="text-sm text-gray-600">Total Highlights</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border text-center">
          <div className="text-2xl font-bold text-green-600">{highlights.reduce((sum, h) => sum + h.likes, 0)}</div>
          <div className="text-sm text-gray-600">Total Likes</div>
        </div>
      </div>

      <div className="space-y-4">
        {highlights.map((highlight) => (
          <div key={highlight.id} className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-2">
              <span className={`px-2 py-1 rounded text-xs ${
                highlight.type === 'given' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
              }`}>
                {highlight.type === 'given' ? 'I gave' : 'I received'}
              </span>
              <span className="text-xs text-gray-500">{highlight.category}</span>
            </div>
            <h3 className="font-medium mb-2">{highlight.title}</h3>
            <p className="text-gray-600 text-sm mb-3">{highlight.description}</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{new Date(highlight.timestamp).toLocaleDateString()}</span>
              <div className="flex items-center">
                <Heart className="w-4 h-4 mr-1" />
                {highlight.likes}
              </div>
            </div>
          </div>
        ))}
      </div>

      {highlights.length === 0 && (
        <div className="bg-white p-6 rounded-xl shadow-sm border text-center py-8">
          <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">No highlights yet</h3>
          <p className="text-gray-500 mb-4">Start sharing your highlight moments!</p>
          <button 
            onClick={() => setShowAddHighlight(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Your First Highlight
          </button>
        </div>
      )}
    </div>
  )

  const CommunityTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Community Highlights</h2>
      
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-xl">
        <h3 className="text-xl font-bold mb-2">Community Impact</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{userStats.dailyActiveUsers}</div>
            <div className="text-sm text-purple-100">Active Members</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{userStats.highlightPostsShared}</div>
            <div className="text-sm text-purple-100">Highlights Shared</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">47</div>
            <div className="text-sm text-purple-100">Countries</div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
          Trending Highlights
        </h3>
        
        {communityHighlights.map((highlight) => (
          <div key={highlight.id} className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold mr-3">
                  {highlight.user.charAt(0)}
                </div>
                <div>
                  <div className="font-medium">{highlight.user}</div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Award className="w-3 h-3 mr-1" />
                    {highlight.userLevel}
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-500 flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {highlight.timestamp}
              </div>
            </div>
            
            <h4 className="font-medium mb-2">{highlight.title}</h4>
            <p className="text-gray-600 text-sm mb-3">{highlight.description}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="flex items-center text-sm text-gray-500 hover:text-red-500 transition-colors">
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  {highlight.likes}
                </button>
                <button className="flex items-center text-sm text-gray-500 hover:text-blue-500 transition-colors">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  {highlight.comments}
                </button>
                <button className="flex items-center text-sm text-gray-500 hover:text-green-500 transition-colors">
                  <Share2 className="w-4 h-4 mr-1" />
                  Share
                </button>
              </div>
              <span className={`px-2 py-1 rounded text-xs ${
                highlight.category === 'workplace' ? 'bg-blue-100 text-blue-800' :
                highlight.category === 'community' ? 'bg-green-100 text-green-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                {highlight.category.replace('_', ' ')}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6 rounded-xl">
        <h3 className="text-lg font-bold mb-2">Join the Movement</h3>
        <p className="text-indigo-100 text-sm mb-4">
          Get the complete strategies and join thousands creating highlight moments worldwide.
        </p>
        <button 
          onClick={() => handleBookPurchase('community_tab')}
          className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
        >
          Get "Be the Highlight" Book
        </button>
      </div>
    </div>
  )

  const AddHighlightModal = () => (
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
            <div className="flex gap-2">
              <button
                onClick={() => setNewHighlight({...newHighlight, type: 'given'})}
                className={`flex-1 py-2 px-3 rounded-lg text-sm ${
                  newHighlight.type === 'given' 
                    ? 'bg-blue-100 text-blue-800 border-2 border-blue-300' 
                    : 'bg-gray-100 text-gray-600 border-2 border-transparent'
                }`}
              >
                I gave a highlight
              </button>
              <button
                onClick={() => setNewHighlight({...newHighlight, type: 'received'})}
                className={`flex-1 py-2 px-3 rounded-lg text-sm ${
                  newHighlight.type === 'received' 
                    ? 'bg-green-100 text-green-800 border-2 border-green-300' 
                    : 'bg-gray-100 text-gray-600 border-2 border-transparent'
                }`}
              >
                I received a highlight
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select 
              value={newHighlight.category}
              onChange={(e) => setNewHighlight({...newHighlight, category: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="workplace">Workplace</option>
              <option value="community">Community</option>
              <option value="family">Family</option>
              <option value="customer_service">Customer Service</option>
              <option value="friendship">Friendship</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={newHighlight.title}
              onChange={(e) => setNewHighlight({...newHighlight, title: e.target.value})}
              placeholder="Brief, memorable title..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={newHighlight.description}
              onChange={(e) => setNewHighlight({...newHighlight, description: e.target.value})}
              placeholder="What happened? How did it make you or someone else feel?"
              rows={4}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <button 
              onClick={() => setShowAddHighlight(false)}
              className="flex-1 py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleAddHighlight}
              disabled={!newHighlight.title || !newHighlight.description}
              className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Share Highlight
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  if (showAddHighlight) {
    return <AddHighlightModal />
  }

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      <div className="bg-white p-4 shadow-sm">
        <h1 className="text-2xl font-bold text-center text-gray-900">Be the Highlight</h1>
        <p className="text-center text-gray-600 text-sm mt-1">Transform everyday moments</p>
      </div>

      <div className="p-4 pb-20">
        {currentTab === 'home' && <HomeTab />}
        {currentTab === 'highlights' && <HighlightsTab />}
        {currentTab === 'skills' && <SkillsTab />}
        {currentTab === 'community' && <CommunityTab />}
      </div>

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
            <span className="text-xs mt-1">My Highlights</span>
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
