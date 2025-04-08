import { GoogleGenerativeAI } from '@google/generative-ai'
import chatData from '../utils/chatData.js'

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

// Store conversation history
const conversationHistory = new Map()

// Function to find matching response from chatData
const findResponse = (message) => {
  const lowercaseMessage = message.toLowerCase()
  
  for (const [category, data] of Object.entries(chatData)) {
    if (data.keywords && data.keywords.some(keyword => 
      lowercaseMessage.includes(keyword.toLowerCase())
    )) {
      return data.response
    }
  }
  
  return chatData.default.response
}

// Function to get conversation context
const getConversationContext = (sessionId) => {
  return conversationHistory.get(sessionId) || []
}

// Function to update conversation context
const updateConversationContext = (sessionId, message, response) => {
  const history = getConversationContext(sessionId)
  history.push({ role: 'user', content: message })
  history.push({ role: 'assistant', content: response })
  conversationHistory.set(sessionId, history)
  
  // Limit history to last 10 messages to prevent memory issues
  if (history.length > 10) {
    conversationHistory.set(sessionId, history.slice(-10))
  }
}

// Chat response controller
const getChatResponse = async (req, res) => {
  try {
    const { message, sessionId } = req.body

    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Message is required'
      })
    }

    // First check predefined responses
    const predefinedResponse = findResponse(message)

    // If no predefined response matches, use Gemini
    if (predefinedResponse === chatData.default.response) {
      try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
        
        // Get conversation history
        const history = getConversationContext(sessionId)
        
        // Create context from history
        const context = history.map(msg => 
          `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
        ).join('\n')

        const prompt = `
          You are a medical assistant chatbot specialized in infertility, gynecology, and obstetrics.
          Your role is to provide detailed medical information and support.

          Previous conversation context:
          ${context}

          Current user message: ${message}

          GUIDELINES:
          1. Scope of Practice:
             - Focus on women's health, infertility, gynecology, and obstetrics
             - Provide comprehensive information about conditions and treatments
             - Include relevant statistics and success rates
             - Explain medical procedures and processes in detail

          2. Information to Include:
             - Detailed explanations of medical conditions
             - Available treatment options and their processes
             - Success rates and statistics where applicable
             - Common symptoms and their management
             - Lifestyle factors and their impact
             - Recent medical advancements and research

          3. Response Structure:
             - Start with a clear explanation of the topic
             - Include relevant medical details and statistics
             - Explain treatment options and their processes
             - Provide context about success rates and outcomes
             - End with additional resources or next steps

          4. Common Topics:
             a) Infertility and Fertility Treatments:
                - Detailed explanation of IVF, IUI, and other ART procedures
                - Success rates and factors affecting outcomes
                - Pre-treatment evaluations and preparations
                - Post-treatment care and follow-up

             b) Pregnancy and Prenatal Care:
                - Detailed stages of pregnancy and fetal development
                - Common symptoms and their management
                - Prenatal testing and screening options
                - High-risk pregnancy factors and management
                - Delivery options and preparation

             c) Gynecological Conditions:
                - Detailed explanation of common conditions
                - Diagnostic procedures and their purposes
                - Treatment options and their effectiveness
                - Long-term management strategies
                - Impact on fertility and pregnancy

             d) Menstrual Health:
                - Normal cycle variations and patterns
                - Common disorders and their management
                - Impact on fertility and overall health
                - Treatment options and their effectiveness

          5. Emergency Information:
             - Explain when to seek immediate medical attention
             - Describe emergency conditions and their symptoms
             - Provide guidance on emergency response
             - Include information about emergency procedures

          Please provide a detailed response that takes into account the previous conversation context and addresses the user's current question.
        `

        const result = await model.generateContent(prompt)
        const response = result.response.text()

        // Update conversation history
        updateConversationContext(sessionId, message, response)

        return res.status(200).json({
          success: true,
          data: response
        })
      } catch (error) {
        console.error('Gemini API Error:', error)
        // Fallback to default response if Gemini fails
        return res.status(200).json({
          success: true,
          data: predefinedResponse
        })
      }
    }

    // Return predefined response
    res.status(200).json({
      success: true,
      data: predefinedResponse
    })

  } catch (error) {
    console.error('Chat Controller Error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    })
  }
}

export { getChatResponse }