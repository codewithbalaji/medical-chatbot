
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const ChatPreview = () => {
  const [inputValue, setInputValue] = useState("");
  const [chatStarted, setChatStarted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setChatStarted(true);
      setInputValue("");
    }
  };

  const handleExampleClick = (question: string) => {
    setInputValue(question);
  };

  const exampleQuestions = [
    "What are early signs of pregnancy?",
    "How can I increase my chances of getting pregnant?",
    "What causes irregular periods?"
  ];

  return (
    <section className="py-16 bg-white">
      <div className="section-container">
        <h2 className="section-title">Try Our AI Assistant</h2>
        <p className="section-subtitle">
          Ask a question and experience how our AI can help with your women's health concerns
        </p>

        <div className="max-w-3xl mx-auto card-shadow p-6 rounded-2xl bg-gray-50">
          <div className="bg-white rounded-xl p-4 mb-4 h-72 flex flex-col overflow-y-auto">
            {!chatStarted ? (
              <div className="flex-grow flex flex-col justify-center items-center text-center px-4">
                <div className="w-16 h-16 bg-medical-light/30 rounded-full flex items-center justify-center mb-4">
                  <div className="w-10 h-10 bg-medical text-white rounded-full flex items-center justify-center animate-pulse-gentle">
                    <span className="font-bold">AI</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Women's Health Assistant</h3>
                <p className="text-gray-600 mb-4">
                  Ask me anything about women's reproductive health, pregnancy, or infertility.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 w-full">
                  {exampleQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleExampleClick(question)}
                      className="text-left text-sm bg-white border border-gray-200 rounded-lg p-2 hover:border-medical transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className="chat-bubble-user mb-4">
                  What are early signs of pregnancy?
                </div>
                <div className="chat-bubble-bot">
                  <p className="mb-2">Early signs of pregnancy may include:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Missed period</li>
                    <li>Tender, swollen breasts</li>
                    <li>Nausea/morning sickness</li>
                    <li>Increased urination</li>
                    <li>Fatigue</li>
                    <li>Food aversions or cravings</li>
                  </ul>
                  <p className="mt-2">
                    These symptoms can vary widely between individuals. A home pregnancy test can confirm pregnancy after a missed period.
                  </p>
                </div>
              </>
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Type your question here..."
              className="flex-grow rounded-full border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-medical/50"
            />
            <Button type="submit" className="btn-primary rounded-full h-12 w-12 flex items-center justify-center p-0">
              <Send size={18} />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ChatPreview;
