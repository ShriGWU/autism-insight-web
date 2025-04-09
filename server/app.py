
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import tensorflow as tf  # or your model framework
import cv2
import os
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
        # Preprocess the image
        # Replace this with your actual preprocessing code
        img = cv2.imread(filepath)
        img = cv2.resize(img, (224, 224))  # Resize to your model's input size
        img = np.expand_dims(img, axis=0)  # Add batch dimension
        img = img / 255.0  # Normalize
        
        # Make prediction
        prediction = model.predict(img)
        
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
