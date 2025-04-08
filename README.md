# Women's Health AI Assistant

A comprehensive AI-powered medical chatbot focused on women's health, providing personalized information and answers to health-related questions. The application features context-aware responses, personalized conversation history, and a user-friendly interface.

## Project Overview

This project consists of two main components:

- **Frontend**: React-based user interface with Tailwind CSS, Shadcn UI, and modern React features
- **Backend**: Node.js server with AI integration for medical knowledge processing

## Key Features

- **AI-Powered Chat Interface**: Get detailed answers to women's health inquiries
- **Context-Aware Responses**: Chatbot remembers previous conversations
- **Medical Knowledge Base**: Specialized in women's health topics
- **Responsive Design**: Works on all devices with mobile-first approach
- **Session Management**: Maintains conversation history by user session
- **Rich Text Responses**: Supports markdown formatting for better readability
- **Secure Authentication**: User account management with Clerk

## Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Shadcn UI (Radix UI)
- React Router
- Axios
- Clerk Authentication
- React Markdown
- Lucide React Icons

### Backend
- Node.js
- Express
- GEMINI API Integration


## Getting Started

### Prerequisites
- Node.js (v18 or later)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/codewithbalaji/medical-chatbot.git
cd medical-chatbot
```

2. Install dependencies for both frontend and backend:
```bash
# Frontend dependencies
cd frontend
npm install

# Backend dependencies
cd ../backend
npm install
```

3. Create environment files:

**Frontend (.env in frontend directory)**
```
VITE_API_URL=http://localhost:4000
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

**Backend (.env in backend directory)**
```
PORT=4000
GEMINI_API_KEY=your_gemini_api_key  
```

4. Start both servers:

**Backend**
```bash
cd backend
npm start
```

**Frontend**
```bash
cd frontend
npm run dev
```

5. Access the application at [http://localhost:5173](http://localhost:5173)

## Project Structure

```
medical-chatbot/
├── frontend/           # React frontend
│   ├── src/
│   │   ├── components/ # UI components
│   │   ├── pages/      # Page components
│   │   └── ...
│   └── ...
├── backend/            # Node.js backend
│   ├── controller/     # Request handlers
│   ├── routes/         # API routes
│   ├── utils/          # Utility functions
│   └── ...
└── README.md           # This file
```

## Development Workflow

1. Start both frontend and backend servers in development mode
2. Make changes to the code
3. Test changes locally
4. Commit changes with descriptive messages
5. Push to remote repository
6. Create pull requests for review

## API Endpoints

- **POST /api/chat**: Send a message to the AI assistant
  - Request body: `{ message: string, sessionId: string }`
  - Response: `{ success: boolean, data: string }`


## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Project Link: [https://github.com/codewithbalaji/medical-chatbot](https://github.com/codewithbalaji/medical-chatbot)


