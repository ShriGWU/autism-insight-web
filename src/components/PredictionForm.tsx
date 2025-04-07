
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import ImageUpload from './ImageUpload';
import { Brain, Loader2 } from 'lucide-react';

interface PatientData {
  name: string;
  age: string;
  sex: string;
  dob: string;
  image: File | null;
}

const PredictionForm = () => {
  const [patientData, setPatientData] = useState<PatientData>({
    name: '',
    age: '',
    sex: '',
    dob: '',
    image: null,
  });
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [predictionResult, setPredictionResult] = useState<string | null>(null);
  const [confidenceScore, setConfidenceScore] = useState<number | null>(null);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPatientData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setPatientData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageSelect = (file: File) => {
    setPatientData(prev => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!patientData.name || !patientData.age || !patientData.sex || !patientData.image) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields and upload an MRI scan.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    setPredictionResult(null);
    setConfidenceScore(null);

    try {
      // Simulate API call to prediction model
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock result (in a real app, this would come from your backend)
      // Random result for demo purposes
      const isAutism = Math.random() > 0.5;
      const confidence = Math.floor(Math.random() * 15) + 85; // 85-99% confidence
      
      setPredictionResult(isAutism ? 'Autism Detected' : 'No Autism Detected');
      setConfidenceScore(confidence);
      
      toast({
        title: "Analysis complete",
        description: "Prediction results are ready.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error processing your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="name">Patient Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Full name"
              value={patientData.name}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              name="age"
              type="number"
              min="0"
              max="120"
              placeholder="Patient age"
              value={patientData.age}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="sex">Sex</Label>
            <div className="mt-1">
              <RadioGroup
                defaultValue={patientData.sex}
                onValueChange={(value) => handleSelectChange('sex', value)}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          
          <div>
            <Label htmlFor="dob">Date of Birth</Label>
            <Input
              id="dob"
              name="dob"
              type="date"
              value={patientData.dob}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>
        </div>
        
        <div className="w-full">
          <ImageUpload onImageSelect={handleImageSelect} />
        </div>
        
        <div className="flex justify-center">
          <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing
              </>
            ) : (
              'Analyze MRI Scan'
            )}
          </Button>
        </div>
      </form>
      
      {predictionResult && (
        <Card className={`mt-8 p-6 border-2 ${
          predictionResult === 'Autism Detected' 
            ? 'border-destructive/30 bg-destructive/5' 
            : 'border-green-500/30 bg-green-500/5'
        } animate-fade-in`}>
          <div className="flex flex-col items-center">
            <div className={`p-3 rounded-full ${
              predictionResult === 'Autism Detected' 
                ? 'bg-destructive/20 text-destructive' 
                : 'bg-green-500/20 text-green-600'
            }`}>
              <Brain className="h-8 w-8" />
            </div>
            
            <h3 className="mt-4 text-2xl font-bold text-gray-900">
              {predictionResult}
            </h3>
            
            <div className="mt-2 text-sm text-gray-600">
              Confidence: {confidenceScore}%
            </div>
            
            <div className="mt-6 w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${
                  predictionResult === 'Autism Detected' 
                    ? 'bg-destructive' 
                    : 'bg-green-500'
                }`}
                style={{ width: `${confidenceScore}%` }}
              ></div>
            </div>
            
            <p className="mt-6 text-gray-600 text-center">
              {predictionResult === 'Autism Detected' 
                ? 'The model has detected patterns consistent with autism spectrum disorder in the provided MRI scan. Please consult with a healthcare professional for a complete diagnosis.'
                : 'The model did not detect patterns associated with autism spectrum disorder in the provided MRI scan. However, this does not rule out the possibility. Always consult with healthcare professionals for a complete diagnosis.'
              }
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default PredictionForm;
