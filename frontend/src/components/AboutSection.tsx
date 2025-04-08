
import React from "react";

const AboutSection = () => {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="section-container">
        <h2 className="section-title">Smart, Caring, Always Available</h2>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-gray-700 mb-8">
            Our AI assistant specializes in women's reproductive health, focusing on infertility, 
            pregnancy, and gynaecological concerns. Designed to provide compassionate, 
            evidence-based information when you need it most, whether it's 3 AM or during a busy day.
          </p>
          <p className="text-lg text-gray-700">
            Your conversations remain private and secure. No judgment, no waiting rooms, 
            just reliable information to help you understand your body and make informed decisions 
            about your healthcare journey.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
