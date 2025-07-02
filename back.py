from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import openai
from dotenv import load_dotenv
import os
load_dotenv()
client = openai.OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("API_KEY")
)

app = Flask(__name__)
CORS(app)
@app.route("/")
def home():
    return send_from_directory('.', 'chat.html')
@app.route("/<path:path>")
def serve_static(path):
    return send_from_directory('.', path)

@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()
        user_input = data.get("message", "")

        if not user_input:
            return jsonify({"reply": "Please enter a message."})

        response = client.chat.completions.create(
            model="mistralai/mistral-7b-instruct", 
            messages=[{"role": "user", "content": user_input}]
        )

        reply = response.choices[0].message.content.strip()
        return jsonify({"reply": reply})
    
    except Exception as e:
        return jsonify({"reply": f"Error: {str(e)}"})
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
