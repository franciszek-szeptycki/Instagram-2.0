import base64

import core
import models

from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

import hashlib

auth_blueprint = Blueprint('auth', __name__, )


@auth_blueprint.route('/sign-up', methods=['POST'])
def sign_up():
    # Get the request data
    email = request.json.get("email", None)
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    # Check if all fields are filled
    if not email:
        return jsonify({"msg": "Email is required"}), 400
    if not username:
        return jsonify({"msg": "Username is required"}), 400
    if not password:
        return jsonify({"msg": "Password is required"}), 400


    # Check if user already exists
    username_check = models.User.query.filter_by(Username=username).first()
    if username_check:
        return jsonify({
            "msg": "user already exists",
            "data": "username",
        }), 401

    email_check = models.User.query.filter_by(Email=email).first()
    if email_check:
        return jsonify({
            "msg": "email already exists",
            "data": "email",
        }), 401

    print(email, username)

    # Hash password
    password = hashlib.sha256(password.encode()).hexdigest()

    # Create new user
    user = models.User(Email=email, Username=username, Password=password)
    core.db.session.add(user)
    core.db.session.commit()

    print("[INFO] User created successfully")
    return jsonify({"msg": "User created successfully"}), 201


@auth_blueprint.route('/log-in', methods=['POST'])
def sign_in():
    # Get the request data
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    # Check if all fields are filled
    if not email:
        return jsonify({"msg": "Email is required"}), 400
    if not password:
        return jsonify({"msg": "Password is required"}), 400

    # Check if user exists
    user = models.User.query.filter_by(Email=email).first()
    if not user:
        return jsonify({"msg": "User does not exist"}), 401

    # Check if password is correct
    password = hashlib.sha256(password.encode()).hexdigest()
    if password != user.Password:
        return jsonify({"msg": "Wrong password"}), 401

    # Generate token
    additional_claims = {"ID": user.ID, "Username": user.Username}
    access_token = create_access_token(user.ID, additional_claims=additional_claims)
    response = jsonify({
        "data": {
            "user_name": user.Username,
            "image": user.Image,
        },
        "access_token": access_token,
    })

    print("[INFO] User logged in successfully")
    return response, 200


@auth_blueprint.route("/access_token", methods=["POST"])
@jwt_required()
def token():
    fresh_token = create_access_token(identity=get_jwt_identity(), fresh=True)

    return jsonify({"access_token": fresh_token}), 200
