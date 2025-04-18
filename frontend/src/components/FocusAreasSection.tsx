
import React from "react";
import { Baby, Heart, Calendar, Hospital, Stethoscope, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface FocusAreaCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  className?: string;
  animationDelay?: string; // Add animation delay property to the interface
}

const FocusAreaCard = ({ icon: Icon, title, description, className, animationDelay }: FocusAreaCardProps) => {
  return (
    <div 
      className={cn(
        "card-shadow p-6 flex flex-col items-center text-center animate-hover",
        className
      )}
      style={{ animationDelay }} // Use the animationDelay property here
    >
      <div className="w-16 h-16 rounded-full bg-medical-light flex items-center justify-center mb-4">
        <Icon className="text-medical w-8 h-8" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const FocusAreasSection = () => {
  const focusAreas = [
    {
      icon: Heart,
      title: "Infertility Support",
      description: "Guidance on fertility treatments, causes of infertility, and emotional support.",
    },
    {
      icon: Baby,
      title: "Pregnancy & Prenatal Care",
      description: "Information on pregnancy symptoms, fetal development, and prenatal health.",
    },
    {
      icon: Calendar,
      title: "Menstrual Health & Hormones",
      description: "Understanding cycle irregularities, hormonal imbalances, and related conditions.",
    },
    {
      icon: Hospital,
      title: "Labour & Delivery",
      description: "Preparing for childbirth, understanding stages of labour, and recovery.",
    },
    {
      icon: Stethoscope,
      title: "Medical Tests & Diagnosis",
      description: "Explaining common tests, results, and diagnostic procedures in women's health.",
    },
    {
      icon: User,
      title: "Medications & Treatments",
      description: "Information about common medications, treatments, and reproductive procedures.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="section-container">
        <h2 className="section-title">Focus Areas</h2>
        <p className="section-subtitle">
          Our AI assistant provides reliable information across all aspects of women's reproductive health
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {focusAreas.map((area, index) => (
            <FocusAreaCard
              key={index}
              icon={area.icon}
              title={area.title}
              description={area.description}
              className="transform transition-all duration-300"
              animationDelay={`${index * 0.1}s`} // Pass animation delay as a prop
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FocusAreasSection;
