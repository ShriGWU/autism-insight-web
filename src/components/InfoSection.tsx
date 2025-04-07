
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const InfoSection = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Understanding Autism Detection</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Our AI model analyzes brain MRI images to identify patterns associated with autism spectrum disorder.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold text-primary mb-4">How It Works</h3>
              <p className="text-gray-600 mb-4">
                Our model has been trained on thousands of brain MRI scans, learning to recognize subtle differences in brain structure and connectivity that may indicate autism.
              </p>
              <p className="text-gray-600">
                Using convolutional neural networks (CNN), the system analyzes multiple features in the MRI image and provides a probability score indicating the likelihood of autism.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold text-primary mb-4">Interpretation of Results</h3>
              <p className="text-gray-600 mb-4">
                A positive result means the AI has detected patterns consistent with autism spectrum disorder in the provided MRI scan.
              </p>
              <p className="text-gray-600">
                However, this tool is designed to assist healthcare professionals, not replace them. The final diagnosis should always be made by qualified medical professionals considering a broader range of factors.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
