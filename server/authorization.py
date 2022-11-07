import core
import models

from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, set_access_cookies, jwt_required

import hashlib

auth_blueprint = Blueprint('auth', __name__, )


@auth_blueprint.route('/sign-up', methods=['POST'])
def sign_up():
    # Get the request data
    email = request.json.get("email", None)
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    password_confirm = request.json.get("password_confirm", None)

    # Check if all fields are filled
    if not email:
        return jsonify({"msg": "Email is required"}), 400
    if not username:
        return jsonify({"msg": "Username is required"}), 400
    if not password:
        return jsonify({"msg": "Password is required"}), 400

    if password != password_confirm:
        return jsonify({"msg": "Passwords are not equal"}), 400

    # Check if user already exists
    user = models.User.query.filter_by(email=email).first()
    if user:
        return jsonify({"msg": "User already exists"}), 400

    # Hash password
    password = hashlib.sha256(password.encode()).hexdigest()

    # Create new user
    user = models.User(email=email, username=username, password=password)
    core.db.session.add(user)
    core.db.session.commit()
    return jsonify({"msg": "User created successfully"}), 201


@auth_blueprint.route('/sign-in', methods=['POST'])
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
    user = models.User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"msg": "User does not exist"}), 400

    # Check if password is correct
    password = hashlib.sha256(password.encode()).hexdigest()
    if password != user.password:
        return jsonify({"msg": "Wrong password"}), 400

    # Generate token
    token = create_access_token(identity=user.username)
    response = jsonify({
        "access_token": token,
    })
    set_access_cookies(response, token)
    return response, 200


@auth_blueprint.route("/who_am_i", methods=["GET"])
@jwt_required()
def protected():
    # We can now access our sqlalchemy User object via `current_user`.
    return jsonify(
        "TEST"
    )
