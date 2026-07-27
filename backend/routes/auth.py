from flask import Blueprint, request, jsonify
from flask_bcrypt import Bcrypt
from models import db, User

auth = Blueprint('auth', __name__)
bcrypt = Bcrypt()

@auth.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    
    if User.query.filter_by(email=email).first():
        return jsonify({"message": "Email already exists."}), 400
    
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    
    user = User(name=name, email=email, password=hashed_password)
    
    db.session.add(user)
    db.session.commit()
    
    return jsonify({"message": "User registered successfully."}), 201

@auth.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"message": "User not found."}), 404

    if bcrypt.check_password_hash(user.password, password):
        return jsonify({
            "message": "Login successful!",
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email
            }
        }), 200

    return jsonify({"message": "Invalid password."}), 401