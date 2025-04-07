
import React from 'react';

const StatsSection = () => {
  return (
    <div className="bg-primary py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white">Making an Impact</h2>
          <p className="mt-4 text-xl text-white/90 max-w-2xl mx-auto">
            Our technology is helping healthcare professionals diagnose autism earlier and with greater confidence.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {[
            { value: '95%', label: 'Accuracy' },
            { value: '3x', label: 'Faster Detection' },
            { value: '1000+', label: 'MRI Scans Analyzed' },
            { value: '60%', label: 'Earlier Diagnosis' },
          ].map((stat, index) => (
            <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <p className="text-4xl font-bold text-white">{stat.value}</p>
              <p className="mt-2 text-xl text-white/80">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
