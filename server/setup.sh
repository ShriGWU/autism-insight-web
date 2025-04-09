
#!/bin/bash

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create uploads directory if it doesn't exist
mkdir -p uploads

echo "Setup complete. To start the server, run:"
echo "source venv/bin/activate"
echo "python app.py"
