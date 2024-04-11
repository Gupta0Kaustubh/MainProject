from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS extension
import pickle
import pandas as pd

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes in the app

# Load the trained KNeighborsRegressor models
model = pickle.load(open('knn_regressor_model.pkl', 'rb'))
model1 = pickle.load(open('knn_regressor_model1.pkl', 'rb'))

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get input data from the request
        input_data = request.json
        input_df = pd.DataFrame([input_data])

        # Make predictions using the loaded model
        prediction = model.predict(input_df)

        return jsonify({'prediction': prediction[0]})
    except Exception as e:
        return jsonify({'error': str(e)})
    
@app.route('/predict1', methods=['POST'])
def predict1():
    try:
        # Get input data from the request
        input_data = request.json
        input_df = pd.DataFrame([input_data])

        # Make predictions using the loaded model
        prediction = model1.predict(input_df)

        return jsonify({'prediction': prediction[0]})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
