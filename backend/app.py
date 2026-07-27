from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from services.gemini_service import generate_story

from models import db, User ,Story
from routes.auth import auth, bcrypt
from routes.story import story
import os

load_dotenv()

app = Flask(__name__)
CORS(app)
app.register_blueprint(auth)
app.register_blueprint(story)
bcrypt.init_app(app)

#SQLAlchemy configuration
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///users.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

#Initialize Database
db.init_app(app)

with app.app_context():
    print("Database path:",
          os.path.abspath("instance/users.db"))

@app.route("/")
def home():
    return jsonify({
        "message": "StoryLearn AI Backend is running successfully!"
    })

@app.route("/generate-story", methods=["POST"])
def generate_story_route():
    data = request.get_json()
    
    print("Received data:", data)

    concept = data.get("concept")
    level = data.get("level")
    language = data.get("language")

    story = generate_story(concept, level, language)

    print("Generated story:", story)
    return jsonify({
        "result": story
    })
if __name__ == "__main__":
    port = int(os.environ.get("PORT",
    5000))
    app.run(host="0.0.0.0", port=port)