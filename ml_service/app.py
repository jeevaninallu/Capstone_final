from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

app = Flask(__name__)
CORS(app)

# Load trained model
model = pickle.load(open("model.pkl", "rb"))


# ===============================
# HOME ROUTE
# ===============================
@app.route("/")
def home():
    return "ML Service Running"


# ===============================
# HEALTH CHECK ROUTE
# ===============================
@app.route("/health")
def health():
    return jsonify({
        "status": "running",
        "service": "Loan Prediction ML Service",
        "port": 8000
    })


# ===============================
# MODEL INFO ROUTE
# ===============================
@app.route("/model-info")
def model_info():
    return jsonify({
        "algorithm": "Random Forest Classifier",
        "version": "v1.0",
        "status": "Production Ready",
        "features_used": 11
    })


# ===============================
# PREDICTION ROUTE
# ===============================
@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json

        # Convert input values
        features = np.array([[
            int(data["no_of_dependents"]),
            int(data["education"]),
            int(data["self_employed"]),
            float(data["income_annum"]),
            float(data["loan_amount"]),
            int(data["loan_term"]),
            int(data["cibil_score"]),
            float(data["residential_assets_value"]),
            float(data["commercial_assets_value"]),
            float(data["luxury_assets_value"]),
            float(data["bank_asset_value"])
        ]])

        # Prediction
        pred = model.predict(features)[0]

        # Probability
        probs = model.predict_proba(features)[0]

        approval_prob = float(probs[0])
        risk_prob = float(probs[1])

        # Confidence score
        confidence = float(max(probs))

        # Risk level
        if risk_prob < 0.35:
            risk_level = "Low"
        elif risk_prob < 0.65:
            risk_level = "Medium"
        else:
            risk_level = "High"

        return jsonify({
            "success": True,
            "prediction": "Approved" if pred == 0 else "Rejected",
            "approval_probability": approval_prob,
            "risk_probability": risk_prob,
            "confidence_score": confidence,
            "risk_level": risk_level
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "message": "Prediction Failed",
            "error": str(e)
        }), 400


# ===============================
# RUN APP
# ===============================
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)