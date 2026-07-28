from flask import Blueprint, request, jsonify
from models import db, Story

story = Blueprint('story', __name__)

@story.route("/save-story", methods=["POST"])
def save_story():
    data = request.get_json()
    
    new_story = Story(
        user_id=data.get("user_id"),
        concept=data.get("concept"),
        level=data.get("level"),
        language=data.get("language"),
        story=data.get("story")
        )
    
    db.session.add(new_story)
    db.session.commit()
    
    return jsonify({"message": "Story saved successfully."})