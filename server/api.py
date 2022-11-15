import core

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt, get_jwt_identity, create_access_token

import json

from datetime import datetime, timezone, timedelta

api_blueprint = Blueprint('api', __name__, )


@api_blueprint.route('/db/create')
def create_db():
    with core.app.app_context():
        core.db.create_all()


@api_blueprint.route('/posts/add', methods=['POST'])
@jwt_required()
def add_post():
    with core.app.app_context():
        try:

            # Get the request data
            image = request.json.get("img", None)
            description = request.json.get("description", None)
            hashtags = request.json.get("hashtag", None)

            # Check if all fields are filled
            if not image:
                return jsonify({"msg": "Image is required"}), 400
            if not description:
                return jsonify({"msg": "Description is required"}), 400
            if not hashtags:
                return jsonify({"msg": "Hashtags are required"}), 400

            # Pack hashtags into a string
            hashtags = " ".join(hashtags)

            # Convert file
            starter = image.find(',')
            image_data = image[starter + 1:]
            image_data = bytes(image_data, encoding="ascii")

            # Create new post
            post = core.models.Post(User_ID=1, Image=image_data, Description=description, Hashtags=hashtags)
            core.db.session.add(post)
            core.db.session.commit()

            print("Post added successfully")
            return jsonify({"msg": "Post created successfully"}), 201

        except Exception as error:
            print("[ERROR] add_post : ", error)
            return jsonify({'msg': 'Error while adding post to database - ' + str(error)}), 500


@api_blueprint.route('/posts/get/page=<int:page>', methods=['GET'])
# @jwt_required()
def get_posts(page):
    with core.app.app_context():
        try:

            # Get posts from database
            posts = core.models.Post.query.order_by(core.models.Post.ID).paginate(page=page, per_page=10)

            # Check if posts exist
            if not posts:
                return jsonify({"msg": "No posts found"}), 404

            # Create a list of posts
            posts_list = []
            for post in posts.items:
                posts_list.append({
                    "id": post.ID,
                    "user_name": core.models.User.query.filter_by(ID=post.User_ID).first().Username,
                    "description": post.Description,
                    "hashtags": post.Hashtags,
                    "file": post.Image,
                    "date": post.Date
                })

            print(posts_list)

            # Return posts
            return jsonify({"data": posts_list}), 200

        except Exception as error:
            print("[ERROR] get_posts : ", error)
            return jsonify({'msg': 'Error while getting posts from database - ' + str(error)}), 500


# Define a function that will be called whenever access to a protected endpoint is attempted
@api_blueprint.after_request
@jwt_required()
def refresh_expiring_tokens(response):
    try:
        jwt = get_jwt()
        if not jwt:
            return response
        exp_timestamp = jwt['exp']
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token
                response.data = json.dumps(data)
            return response
    except (RuntimeError, KeyError) as error:
        print("[ERROR] refresh_expiring_tokens: ", error)
        return response
