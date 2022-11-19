import core

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt, get_jwt_identity, create_access_token, verify_jwt_in_request

import json

from datetime import datetime, timezone, timedelta

api_blueprint = Blueprint('api', __name__, )


@api_blueprint.route('/db/create')
def create_db():
    with core.app.app_context():
        core.db.create_all()


### POSTS ###


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

            # Pack hashtags into a string and add a # to the beginning of each one
            hashtags = " ".join(hashtags)
            hashtags = hashtags.split()
            hashtags = " ".join(["#" + hashtag for hashtag in hashtags])


            verify_jwt_in_request()
            JWT = get_jwt()
            ID = JWT['sub']

            # Create new post
            post = core.models.Post(User_ID=ID, Image=image, Description=description, Hashtags=hashtags)
            core.db.session.add(post)
            core.db.session.commit()

            print("[INFO] Post created successfully")
            return jsonify({"msg": "Post created successfully"}), 201

        except Exception as error:
            print("[ERROR] add_post : ", error)
            return jsonify({"msg": "[ERROR] add_post : " + str(error)}), 500


@api_blueprint.route('/posts/get/page=<int:page>', methods=['GET'])
@jwt_required()
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
                    "owner_id": post.User_ID,
                    "owner_image": core.models.User.query.filter_by(ID=post.User_ID).first().Image,
                    "description": post.Description,
                    "hashtags": post.Hashtags,
                    "file": post.Image,
                    "date": post.Date
                })

            # Return posts
            return jsonify({"data": posts_list}), 200

        except Exception as error:
            print("[ERROR] get_posts : ", error)
            return jsonify({'msg': '[ERROR] get_posts : ' + str(error)}), 500


@api_blueprint.route('/posts/get/<int:ID>', methods=['GET'])
@jwt_required()
def get_post(ID):
    with core.app.app_context():
        try:

            # Get post from database
            post = core.models.Post.query.filter_by(ID=ID).first()

            # Get user from database
            user = core.models.User.query.filter_by(ID=post.User_ID).first()

            # Check if posts exist
            if not post:
                return jsonify({"msg": "No post found"}), 404

            data = {
                "user_id": user.ID,
                "user_name": user.Username,
                "email": user.Email,
                "image": user.Image,
                "id": post.ID,
                "description": post.Description,
                "hashtags": post.Hashtags,
                "file": post.Image,
                "date": post.Date
            }

            # Return post
            return jsonify({"data": data}), 200

        except Exception as error:
            print("[ERROR] get_posts : ", error)
            return jsonify({'msg': '[ERROR] get_posts : ' + str(error)}), 500


### USER ###


@api_blueprint.route('/user/image/add', methods=['POST'])
@jwt_required()
def add_user_image():
    with core.app.app_context():
        try:

            # Get the request data
            image = request.json.get("img", None)

            # Check if all fields are filled
            if not image:
                return jsonify({"msg": "Image is required"}), 400

            verify_jwt_in_request()
            JWT = get_jwt()
            ID = JWT['sub']

            # Change image
            user = core.models.User.query.filter_by(ID=ID).first()
            user.Image = image
            core.db.session.commit()

            print("[INFO] User image added successfully")
            return jsonify({"msg": "User image added successfully"}), 201

        except Exception as error:
            print("[ERROR] add_user_image : ", error)
            return jsonify({"msg": "[ERROR] add_user_image : " + str(error)}), 500


@api_blueprint.route('/user/<int:ID>', methods=['GET'])
@jwt_required()
def get_user(ID):
    with core.app.app_context():
        try:

            # Get user from database
            user = core.models.User.query.filter_by(ID=ID).first()

            # Get user posts from database
            posts = core.models.Post.query.filter_by(User_ID=ID).all()

            # Check if user exists
            if not user:
                return jsonify({"msg": "No user found"}), 404

            # Create a list of posts
            posts_list = []
            for post in posts:
                posts_list.append({
                    "user_id": user.ID,
                    "user_name": user.Username,
                    "email": user.Email,
                    "image": user.Image,
                    "id": post.ID,
                    "description": post.Description,
                    "hashtags": post.Hashtags,
                    "file": post.Image,
                    "date": post.Date
                })

            # Return user
            return jsonify({"data": posts_list}), 200

        except Exception as error:
            print("[ERROR] get_user : ", error)
            return jsonify({'msg': '[ERROR] get_user : ' + str(error)}), 500

### OTHER ###

# Define a function that will be called whenever access to a protected endpoint is attempted
@api_blueprint.after_request
@jwt_required()
def refresh_expiring_tokens(response):
    try:
        verify_jwt_in_request()
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
