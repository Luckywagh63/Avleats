from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import speech_recognition as sr
import os

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Allow frontend to communicate with backend

# Set up Gemini API
API_KEY = os.getenv("GEMINI_API_KEY")  # Set this in your environment
if not API_KEY:
    API_KEY = "AIzaSyDTRqC8B1DIsVePWDN068eGcPcBGc-bUkg"  # Replace this with your actual API key

genai.configure(api_key=API_KEY)
model = genai.GenerativeModel("gemini-1.5-pro")

# Chat history storage
chat_history = []

@app.route("/api/chatbot", methods=["POST"])
def chatbot():
    global chat_history  # Keep track of conversation

    data = request.get_json()
    user_message = data.get("message")

    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    # Add user message to history
    chat_history.append({"role": "user", "content": user_message})

    try:
        response = model.generate_content(user_message)
        bot_reply = response.text

        # Add bot response to history
        chat_history.append({"role": "bot", "content": bot_reply})

        return jsonify({"reply": bot_reply})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run Flask app
if __name__ == "__main__":
    app.run(debug=True)
