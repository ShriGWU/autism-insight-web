
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import tensorflow as tf  # or your model framework
import cv2
import os
import nibabel as nib  # For NIfTI file handling
from werkzeug.utils import secure_filename
from scipy.ndimage import zoom

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure where uploaded files will be stored
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Load your trained model
# Replace this with your actual model loading code
print("Loading model...")
try:
    model = tf.keras.models.load_model('your_model_path.h5')  # Replace with your model path
    print("Model loaded successfully")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

def resize_image(image, target_shape):
    """
    Resize a 3D image to the target shape using scipy's zoom function
    
    Args:
        image: 3D numpy array
        target_shape: tuple of (depth, height, width)
    
    Returns:
        Resized image as a numpy array
    """
    # Calculate zoom factors
    factors = [t / s for t, s in zip(target_shape, image.shape)]
    
    # Apply zoom
    resized = zoom(image, factors, order=1)
    
    return resized

def preprocess_nifti(filepath):
    """
    Preprocess NIfTI file for model prediction based on the provided training code.
    """
    try:
        # Load NIfTI file
        nifti_img = nib.load(filepath)
        
        # Get data as numpy array
        img = nifti_img.get_fdata()
        
        # Normalize (0 to 1 range)
        img = (img - np.min(img)) / (np.max(img) - np.min(img))
        
        # Resize to match the dimensions used during training (80, 128, 128)
        img = resize_image(img, (80, 128, 128))
        
        # Add batch dimension
        img = np.expand_dims(img, axis=0)
        
        # Add channel dimension if needed by the model (depends on model architecture)
        # If your model expects input shape [batch, height, width, depth, channels]
        # then uncomment the following line:
        # img = np.expand_dims(img, axis=-1)
        
        return img
        
    except Exception as e:
        print(f"Error preprocessing NIfTI file: {e}")
        raise

@app.route('/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({"error": "Model not loaded"}), 500
        
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400
        
    file = request.files['image']
    
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
        
    # Save the uploaded file
    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)
    
    try:
        # Check file type and preprocess accordingly
        if filename.lower().endswith(('.nii', '.nii.gz')):
            # Process NIfTI file with the preprocessing steps matching your training
            processed_img = preprocess_nifti(filepath)
        else:
            # Process regular image file (jpg, png, etc.)
            img = cv2.imread(filepath)
            img = cv2.resize(img, (128, 128))  # Resize to match your model's input size
            img = np.expand_dims(img, axis=0)  # Add batch dimension
            processed_img = img / 255.0  # Normalize
        
        # Make prediction
        prediction = model.predict(processed_img)
        
        # Process prediction result
        # Adapt this based on your model's output format
        if prediction[0][0] > 0.5:  # Assuming binary classification
            result = "Autism Detected"
            confidence = float(prediction[0][0]) * 100
        else:
            result = "No Autism Detected"
            confidence = (1 - float(prediction[0][0])) * 100
            
        return jsonify({
            "prediction": result,
            "confidence": round(confidence, 2)
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        # Clean up - remove the uploaded file
        if os.path.exists(filepath):
            os.remove(filepath)

if __name__ == '__main__':
    # Run the server on all interfaces (0.0.0.0) so it can be accessed externally
    app.run(host='0.0.0.0', port=5000, debug=False)
