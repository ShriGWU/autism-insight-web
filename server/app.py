
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import tensorflow as tf  # or your model framework
import cv2
import os
import nibabel as nib  # For NIfTI file handling
from werkzeug.utils import secure_filename

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

def preprocess_nifti(filepath):
    """
    Preprocess NIfTI file for model prediction.
    
    This function should be customized based on your specific model requirements.
    """
    # Load NIfTI file
    nifti_img = nib.load(filepath)
    
    # Get data as numpy array
    data = nifti_img.get_fdata()
    
    # Example preprocessing (customize according to your model's requirements):
    # 1. Normalize intensity values to 0-1 range
    data_normalized = (data - data.min()) / (data.max() - data.min())
    
    # 2. Extract middle slices from each axis as an example
    # (You may need a different approach based on your model)
    slice_x = data_normalized[data_normalized.shape[0]//2, :, :]
    slice_y = data_normalized[:, data_normalized.shape[1]//2, :]
    slice_z = data_normalized[:, :, data_normalized.shape[2]//2]
    
    # Resize slices to model input dimensions (example: 224x224)
    slice_x = cv2.resize(slice_x, (224, 224))
    slice_y = cv2.resize(slice_y, (224, 224))
    slice_z = cv2.resize(slice_z, (224, 224))
    
    # Stack the slices to create a 3-channel image (like RGB)
    # Another option is to use them separately or use volumetric data
    combined_img = np.stack([slice_x, slice_y, slice_z], axis=2)
    
    # Add batch dimension
    combined_img = np.expand_dims(combined_img, axis=0)
    
    return combined_img

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
            # Process NIfTI file
            processed_img = preprocess_nifti(filepath)
        else:
            # Process regular image file (jpg, png, etc.)
            img = cv2.imread(filepath)
            img = cv2.resize(img, (224, 224))  # Resize to your model's input size
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
