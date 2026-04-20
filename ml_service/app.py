from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

app = Flask(__name__)
CORS(app)

model = pickle.load(open("model.pkl", "rb"))

@app.route("/")
def home():
    return "ML Service Running"

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    features = np.array([[
        data["no_of_dependents"],
        data["education"],
        data["self_employed"],
        data["income_annum"],
        data["loan_amount"],
        data["loan_term"],
        data["cibil_score"],
        data["residential_assets_value"],
        data["commercial_assets_value"],
        data["luxury_assets_value"],
        data["bank_asset_value"]
    ]])

    pred = model.predict(features)[0]

    probs = model.predict_proba(features)[0]

    approval_prob = probs[0]
    risk_prob = probs[1]

    return jsonify({
        "prediction": "Approved" if pred == 0 else "Rejected",
        "risk_probability": float(risk_prob)
    })

if __name__ == "__main__":
    app.run(port=5001, debug=True)