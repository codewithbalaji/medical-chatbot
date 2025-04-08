
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  
  // Function to handle button click
  const handleChatNowClick = () => {
    // Navigate to the chat page
    navigate("/chat");
  };
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-medical-light/30 to-white">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-800">
              Your Trusted AI Assistant for Women's Health
            </h1>
            <p className="text-xl text-gray-600 max-w-lg">
              Ask about infertility, pregnancy, and gynaecology — anytime, privately, and accurately.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button onClick={handleChatNowClick} className="btn-primary">Chat Now</Button>
              <Button variant="outline" className="btn-secondary">
                Learn More
              </Button>
            </div>
          </div>
          <div className="flex justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative">
              <div className="absolute -z-10 w-72 h-72 bg-medical-light rounded-full opacity-50 blur-3xl"></div>
              <img
                src="https://res.cloudinary.com/dyj3rywju/image/upload/v1744120554/doctorimg-removebg-preview_dpaajn.png"
                alt="Female doctor illustration"
                className="relative z-10 w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
