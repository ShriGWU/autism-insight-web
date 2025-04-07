
import React from 'react';
import { Brain, Search, Clock, Zap } from 'lucide-react';

interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const Feature: React.FC<FeatureProps> = ({ title, description, icon }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-100 animate-fade-in">
      <div className="inline-flex items-center justify-center p-2 bg-accent rounded-md mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const FeatureSection = () => {
  const features = [
    {
      title: "AI-Powered Analysis",
      description: "Our advanced CNN model analyzes brain MRI images to detect patterns associated with autism.",
      icon: <Brain className="h-6 w-6 text-primary" />
    },
    {
      title: "High Accuracy",
      description: "Trained on extensive datasets to provide reliable detection with minimal false positives.",
      icon: <Search className="h-6 w-6 text-primary" />
    },
    {
      title: "Real-Time Results",
      description: "Get instant predictions to support clinical decisions and early intervention planning.",
      icon: <Clock className="h-6 w-6 text-primary" />
    },
    {
      title: "Easy to Use",
      description: "Simple interface that requires minimal training for healthcare professionals to operate.",
      icon: <Zap className="h-6 w-6 text-primary" />
    }
  ];

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Key Features</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Our system combines cutting-edge neural network technology with a user-friendly interface
            to provide reliable autism detection.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Feature
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
