
import React from 'react';
import Layout from '../components/Layout';
import PredictionForm from '../components/PredictionForm';
import { Card } from '@/components/ui/card';

const Prediction = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Autism Detection Tool</h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Upload a brain MRI scan to analyze for patterns associated with autism spectrum disorder.
          </p>
        </div>
        
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-8">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M8.485 3.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 3.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">Important Note</h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      This tool is intended to assist healthcare professionals and is not a substitute for clinical diagnosis. 
                      Results should be interpreted by qualified medical personnel.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <Card className="p-6 bg-gray-50">
              <PredictionForm />
            </Card>
          </div>
        </div>
        
        <div className="mt-12 max-w-3xl mx-auto bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">How to Use This Tool</h2>
            <ol className="list-decimal pl-5 space-y-2 text-gray-600">
              <li>Enter the patient's basic information (name, age, sex)</li>
              <li>Upload a high-quality MRI brain scan image</li>
              <li>Click "Analyze MRI Scan" to process the image</li>
              <li>Review the results and confidence score</li>
              <li>Consult with healthcare professionals about the findings</li>
            </ol>
            
            <div className="mt-6 text-sm text-gray-500">
              <p>
                <strong>Privacy Note:</strong> Patient information entered on this page is not stored or saved. 
                Data is used only for the current analysis session.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Prediction;
