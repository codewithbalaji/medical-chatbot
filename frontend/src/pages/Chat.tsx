import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

const Chat = () => {
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string>('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Generate or load session ID
  useEffect(() => {
    const savedSessionId = localStorage.getItem('chatSessionId')
    if (savedSessionId) {
      setSessionId(savedSessionId)
    } else {
      const newSessionId = Math.random().toString(36).substring(2, 15)
      setSessionId(newSessionId)
      localStorage.setItem('chatSessionId', newSessionId)
    }
  }, [])

  // Load chat history from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatHistory')
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages))
    }
  }, [])

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(messages))
  }, [messages])

  // Scroll to bottom of messages
  useEffect(() => {
    const messagesContainer = document.querySelector('.messages-container')
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight
    }
  }, [messages])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return

    const userMessage = inputValue.trim()
    setInputValue('')
    
    // Add user message with timestamp
    const newUserMessage: Message = {
      role: 'user',
      content: userMessage,
      timestamp: Date.now()
    }
    
    setMessages(prev => [...prev, newUserMessage])
    setIsLoading(true)

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/chat`, {
        message: userMessage,
        sessionId: sessionId
      })

      if (response.data.success) {
        // Add assistant message with timestamp
        const newAssistantMessage: Message = {
          role: 'assistant',
          content: response.data.data,
          timestamp: Date.now()
        }
        setMessages(prev => [...prev, newAssistantMessage])
      }
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: Date.now()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const clearChat = () => {
    setMessages([])
    localStorage.removeItem('chatHistory')
    // Generate new session ID
    const newSessionId = Math.random().toString(36).substring(2, 15)
    setSessionId(newSessionId)
    localStorage.setItem('chatSessionId', newSessionId)
  }

  const exampleQuestions = [
    'What causes irregular periods?',
    'How can I increase my chances of getting pregnant?',
    'What are the symptoms of PCOS?'
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-4 sm:py-8 bg-white">
          <div className="section-container px-4 sm:px-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="section-title text-2xl sm:text-3xl">Chat with Our AI Assistant</h1>
              {messages.length > 0 && (
                <Button
                  onClick={clearChat}
                  variant="outline"
                  className="text-sm"
                >
                  Clear Chat
                </Button>
              )}
            </div>
            <p className="section-subtitle text-sm sm:text-base mb-6">
              Get personalized answers to your women's health questions
            </p>

            <div className="max-w-4xl mx-auto card-shadow p-4 sm:p-6 rounded-2xl bg-gray-50">
              <div className="bg-white rounded-xl p-3 sm:p-4 mb-4 h-[calc(100vh-280px)] sm:h-[600px] flex flex-col">
                <div className="messages-container flex-grow overflow-y-auto space-y-3 sm:space-y-4 px-2">
                  {messages.length === 0 ? (
                    <div className="flex-grow flex flex-col justify-center items-center text-center px-2 sm:px-4">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-medical-light/30 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-medical text-white rounded-full flex items-center justify-center animate-pulse-gentle">
                          <span className="font-bold text-sm sm:text-base">AI</span>
                        </div>
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold mb-2">Women's Health Assistant</h3>
                      <p className="text-gray-600 text-sm sm:text-base mb-4">
                        Ask me anything about women's reproductive health, pregnancy, or infertility.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 w-full">
                        {exampleQuestions.map((question, index) => (
                          <button
                            key={index}
                            onClick={() => setInputValue(question)}
                            className="text-left text-xs sm:text-sm bg-white border border-gray-200 rounded-lg p-2 hover:border-medical transition-colors"
                          >
                            {question}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[85%] sm:max-w-[80%] rounded-2xl p-3 sm:p-4 text-sm sm:text-base ${
                            message.role === 'user'
                              ? 'bg-medical text-white'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              code({ node, className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || '')
                                return match ? (
                                  <SyntaxHighlighter
                                    style={vscDarkPlus}
                                    language={match[1]}
                                    PreTag="div"
                                    {...props}
                                  >
                                    {String(children).replace(/\n$/, '')}
                                  </SyntaxHighlighter>
                                ) : (
                                  <code className={className} {...props}>
                                    {children}
                                  </code>
                                )
                              }
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                          <div className="text-xs opacity-70 mt-1">
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="max-w-[85%] sm:max-w-[80%] rounded-2xl p-3 sm:p-4 text-sm sm:text-base bg-gray-100 text-gray-800">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <form 
                  onSubmit={handleSubmit} 
                  className="flex gap-2 mt-4"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSubmit(e)
                    }
                  }}
                >
                  <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Type your question here..."
                    className="flex-grow rounded-full border border-gray-300 p-2 sm:p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-medical/50"
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    className="btn-primary rounded-full h-10 sm:h-12 w-10 sm:w-12 flex items-center justify-center p-0"
                    disabled={isLoading || !inputValue.trim()}
                  >
                    <Send size={16} className="sm:w-5 sm:h-5" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Chat