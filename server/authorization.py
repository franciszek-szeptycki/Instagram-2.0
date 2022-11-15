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
    user = models.User.query.filter_by(Email=email).first()
    if user:
        return jsonify({"msg": "User already exists"}), 401

    # Hash password
    password = hashlib.sha256(password.encode()).hexdigest()

    # Create new user
    user = models.User(Email=email, Username=username, Password=password)
    core.db.session.add(user)
    core.db.session.commit()
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
    genereted_token = create_access_token(identity=user.Username)
    response = jsonify({
        "access_token": genereted_token,
    })
    return response, 200


@auth_blueprint.route("/access_token", methods=["POST"])
@jwt_required()
def token():
    fresh_token = create_access_token(identity=get_jwt_identity(), fresh=True)
    return jsonify({"access_token": fresh_token}), 200
