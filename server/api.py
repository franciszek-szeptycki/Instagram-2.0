import os

from flask_jwt_extended import jwt_required

import core
import base64

from io import BytesIO
from PIL import Image

from flask import Blueprint, request, jsonify

api_blueprint = Blueprint('api', __name__, )


@api_blueprint.route('/db/create')
def create_db():
    with core.app.app_context():
        core.db.create_all()

@api_blueprint.route('/post/add', methods=['POST'])
@jwt_required()
def add_post():
    with core.app.app_context():
        try:

            # Get the request data
            image = request.json["data"].get("img", None)
            description = request.json["data"].get("description", None)
            hashtags = request.json["data"].get("hashtag", None)

            # Check if all fields are filled
            if not image:
                return jsonify({"msg": "Image is required"}), 400
            if not description:
                return jsonify({"msg": "Description is required"}), 400
            if not hashtags:
                return jsonify({"msg": "Hashtags are required"}), 400

            # Pack hashtags into a string
            hashtags = " ".join(hashtags)

            # Create new post
            post = core.models.Post(user_id=1, description=description, hashtags=hashtags)
            core.db.session.add(post)
            core.db.session.commit()

            # If folder does not exist, create it
            if not os.path.exists(core.app.config["UPLOAD_FOLDER"]):
                os.makedirs(core.app.config["UPLOAD_FOLDER"])

            # Save file
            starter = image.find(',')
            image_data = image[starter + 1:]
            image_data = bytes(image_data, encoding="ascii")
            im = Image.open(BytesIO(base64.b64decode(image_data)))
            im.save(core.app.config["UPLOAD_FOLDER"] + '/' + str(post.id) + '.png')

            # Set Image Path in MySQL
            post.file = str(post.id) + '.png'
            core.db.session.commit()

            return jsonify({"msg": "Post created successfully"}), 201

        except Exception as e:
            print("Error: ", e)
            return jsonify({'error': 'Error while adding post to database - ' + str(e)}), 500

        return jsonify({"msg": "Post added successfully"}), 201