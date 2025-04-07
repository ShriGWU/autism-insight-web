
import React from 'react';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <Layout>
      <div className="relative py-16 bg-white overflow-hidden">
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="text-lg max-w-prose mx-auto">
            <h1>
              <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">About</span>
              <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Understanding Autism Detection
              </span>
            </h1>
            <p className="mt-8 text-xl text-gray-500 leading-8">
              Autism spectrum disorder (ASD) is a complex developmental condition that affects communication, behavior, and social interaction. Early detection and intervention can significantly improve outcomes for individuals with autism.
            </p>
          </div>
          
          <div className="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mt-12">What is Autism?</h2>
            <p>
              Autism spectrum disorder (ASD) is a neurological and developmental disorder that affects how people interact with others, communicate, learn, and behave. Although autism can be diagnosed at any age, it is described as a "developmental disorder" because symptoms generally appear in the first two years of life.
            </p>
            
            <div className="my-8">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070"
                alt="Brain scan visualization"
                className="rounded-xl shadow-lg"
              />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-12">The Importance of Early Detection</h2>
            <p>
              Research shows that early intervention services can greatly improve a child's development. Early intervention services help children from birth to 3 years old learn important skills. Services include therapy to help the child talk, walk, and interact with others.
            </p>
            <p>
              The earlier a child receives help, the more opportunity there is for learning. Early diagnosis is crucial because:
            </p>
            <ul className="list-disc pl-6">
              <li>It allows for earlier access to interventions that can improve outcomes</li>
              <li>It helps families understand their child's behavior and needs</li>
              <li>It enables schools to provide appropriate educational support</li>
              <li>It may prevent the development of secondary problems</li>
              <li>It gives families time to adjust and plan for the future</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-12">How AI is Transforming Autism Detection</h2>
            <p>
              Traditional autism diagnosis relies on behavioral observations and developmental screenings, which can be subjective and time-consuming. Our AI model analyzes brain MRI scans to detect patterns associated with autism, offering several advantages:
            </p>
            <ul className="list-disc pl-6">
              <li>Objective assessment based on neurological patterns</li>
              <li>Potential for earlier detection than behavioral signs allow</li>
              <li>Consistency in evaluation across different healthcare settings</li>
              <li>Ability to detect subtle patterns that might not be clinically apparent</li>
              <li>Support for healthcare providers in making more informed diagnoses</li>
            </ul>
            
            <div className="my-8">
              <img
                src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=2070"
                alt="AI processing visualization"
                className="rounded-xl shadow-lg"
              />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-12">How Our System Works</h2>
            <p>
              Our autism detection system uses a Convolutional Neural Network (CNN) trained on thousands of brain MRI scans from both individuals with autism and neurotypical controls. The model has learned to identify specific structural and functional differences in the brain that are associated with autism.
            </p>
            <p>
              The system analyzes new MRI scans for these learned patterns and provides a probability score indicating the likelihood of autism. This score, along with the confidence level, can help healthcare professionals in their diagnostic process.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-12">Important Considerations</h2>
            <p>
              While our AI model provides valuable insights, it's crucial to understand that:
            </p>
            <ul className="list-disc pl-6">
              <li>The system is a diagnostic aid, not a replacement for clinical judgment</li>
              <li>A comprehensive diagnosis should include behavioral assessments and developmental history</li>
              <li>The technology continues to improve as we train it on more diverse datasets</li>
              <li>Results should always be interpreted by qualified healthcare professionals</li>
            </ul>
            
            <div className="mt-10 flex justify-center">
              <Link to="/prediction">
                <Button size="lg" className="px-8">
                  Try Our Prediction Tool
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
