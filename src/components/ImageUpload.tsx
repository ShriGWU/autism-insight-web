
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Image, Loader2, UploadCloud } from 'lucide-react';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      validateAndProcessFile(file);
    }
  };

  const validateAndProcessFile = (file: File) => {
    // Check if file is a valid MRI file type
    const validTypes = ['image/jpeg', 'image/png', 'image/dicom'];
    const fileName = file.name.toLowerCase();
    
    // Allow NIfTI files based on extension since they might not have a standard MIME type
    const isNifti = fileName.endsWith('.nii') || fileName.endsWith('.nii.gz');
    
    if (!validTypes.includes(file.type) && !isNifti) {
      toast({
        title: "Invalid file type",
        description: "Please upload a valid MRI file (DICOM, NIfTI, JPEG, PNG)",
        variant: "destructive"
      });
      return;
    }

    // Check file size (limit to 50MB since MRI files can be large)
    if (file.size > 50 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 50MB",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // For NIfTI files, we can't generate a preview directly
    // So we'll use a placeholder for the preview
    if (isNifti) {
      setTimeout(() => {
        setSelectedFile(file);
        // Use a brain scan placeholder for NIfTI files
        setPreview('/brain-scan-placeholder.png');
        onImageSelect(file);
        setIsLoading(false);
        
        toast({
          title: "NIfTI file selected",
          description: "3D brain scan file ready for analysis",
        });
      }, 800);
    } else {
      // For image files, create preview as before
      setTimeout(() => {
        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
        onImageSelect(file);
        setIsLoading(false);
      }, 800);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="w-full">
      <Label htmlFor="image-upload" className="text-base font-medium mb-2 block">
        MRI Brain Scan
      </Label>
      
      {!preview ? (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            isDragging ? 'border-primary bg-primary/5' : 'border-gray-300'
          } transition-all cursor-pointer`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById('image-upload')?.click()}
        >
          {isLoading ? (
            <div className="py-8 flex flex-col items-center">
              <Loader2 className="h-10 w-10 text-primary animate-spin" />
              <p className="mt-2 text-sm text-gray-600">Processing image...</p>
            </div>
          ) : (
            <>
              <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4 flex flex-col items-center text-sm text-gray-600">
                <p className="font-semibold">Click to upload or drag and drop</p>
                <p className="text-xs mt-1">3D NIfTI (.nii, .nii.gz), DICOM, JPG or PNG (max. 50MB)</p>
              </div>
            </>
          )}
          <Input
            id="image-upload"
            type="file"
            onChange={handleFileChange}
            className="hidden"
            accept=".nii,.nii.gz,image/*,.dcm"
            disabled={isLoading}
          />
        </div>
      ) : (
        <Card className="overflow-hidden">
          <div className="relative">
            <img
              src={preview}
              alt="MRI Preview"
              className="w-full object-cover"
              style={{ maxHeight: "300px" }}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm flex items-center">
              <Image className="h-4 w-4 mr-1" />
              {selectedFile?.name} {selectedFile?.name.endsWith('.nii') || selectedFile?.name.endsWith('.nii.gz') ? '(3D NIfTI File)' : ''}
            </div>
          </div>
          <div className="p-4 flex justify-end">
            <Button 
              variant="outline" 
              onClick={() => {
                setSelectedFile(null);
                setPreview(null);
              }}
            >
              Replace Image
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ImageUpload;
