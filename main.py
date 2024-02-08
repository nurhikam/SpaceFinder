from flask import Flask, request, jsonify, render_template
import pickle
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db




app = Flask(__name__)

@app.route('/fetch_firebase_data')
def fetch_firebase_data():
    firebase_path = 'KondisiParkir'
    ref = db.reference(firebase_path)
    data = ref.get()
    return jsonify(data)

# Path ke serviceAccountKey.json
cred = credentials.Certificate(r'C:\Users\danys\Downloads\dir\serviceAccountKey.json')
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://tesfb-e0dc8-default-rtdb.firebaseio.com'
})


# Load the dataset
dataset_path = r'C:\Users\danys\Downloads\dir\parking_dataset_7days_1min_fin - parking_dataset_7days_1min_fin.csv'
data = pd.read_csv(dataset_path)

# Convert 'waktu' to seconds
data['waktu'] = pd.to_datetime(data['waktu'], format='%H:%M:%S').dt.hour * 3600 + \
                pd.to_datetime(data['waktu'], format='%H:%M:%S').dt.minute * 60 + \
                pd.to_datetime(data['waktu'], format='%H:%M:%S').dt.second

# Encode 'hari' numerically
label_encoder = LabelEncoder()
data['hari'] = label_encoder.fit_transform(data['hari']) + 2

# Split data into features and targets
X = data[['waktu', 'hari']]
Y = data.drop(['waktu', 'hari'], axis=1)

# Split data into training and test sets
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.3, random_state=42)

# Update with your actual model path
pickle_file_path = r'C:\Users\danys\Downloads\dir\gb-parkingpredictor.pkl'
with open(pickle_file_path, 'rb') as file:
    loaded_model = pickle.load(file)

# Function to convert time to seconds
def time_to_seconds(time_str):
    h, m = map(int, time_str.split(':'))
    return h * 3600 + m * 60

# Function to decode day
def decode_day(day_code):
    days = {1: "Senin", 2: "Selasa", 3: "Rabu", 4: "Kamis",
            5: "Jum'at", 6: "Sabtu", 7: "Minggu"}
    return days.get(day_code, "Unknown")

@app.route('/')
def index():
    return render_template('predict.html')

@app.route('/predict', methods=['GET', 'POST'])
def predict():
    if request.method == 'POST':
        # Extract and process manual input data
        time_in_seconds = time_to_seconds(request.form['time'])
        day_input = int(request.form['day'])

        # Function for data normalization
        def normalize_data(day, time):

            normalized_value = (day + time) % 7
            return normalized_value + 2

        normalized_day_for_model = normalize_data(day_input, time_in_seconds)
        model_input = np.array([[time_in_seconds, normalized_day_for_model]])

        # Make a prediction for each slot
        predictions = {}
        for slot in Y_train.columns:
            loaded_model.fit(X_train, Y_train[slot])  # Fit the model for each slot
            prediction = loaded_model.predict(model_input)[0]
            predictions[slot] = int(prediction)  # Convert to native Python int

        # Decode the original day for display
        decoded_day = decode_day(day_input)

        return render_template('predicted.html', day=decoded_day, predictions=predictions)

    return render_template('predict.html')

@app.route('/api/predict', methods=['POST'])
def api_predict():
    data = request.json  # Receive JSON data from app.js
    
    # Extract time and day from the received data
    time_in_seconds = time_to_seconds(data['time'])
    day_input = int(data['day'])

    # Normalize data
    def normalize_data(day, time):
        normalized_value = (day + time) % 7
        return normalized_value + 2

    normalized_day_for_model = normalize_data(day_input, time_in_seconds)
    model_input = np.array([[time_in_seconds, normalized_day_for_model]])

    # Make a prediction for each slot
    predictions = {}
    for slot in Y_train.columns:
        loaded_model.fit(X_train, Y_train[slot])  # Fit the model for each slot
        prediction = loaded_model.predict(model_input)[0]
        predictions[slot] = int(prediction)  # Convert to native Python int

    return jsonify(predictions)


import logging

# Setup logging
logging.basicConfig(level=logging.DEBUG)


if __name__ == '__main__':
    try:
        app.run(debug=True, port=5000)  # Using a different port for example
    except Exception as e:
        logging.exception("An error occurred while running the Flask app.")
