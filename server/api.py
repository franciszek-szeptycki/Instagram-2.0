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


#############
# POSTS #
#############

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

            verify_jwt_in_request()
            JWT = get_jwt()
            ID = JWT['sub']

            # Create new post
            post = core.models.Post(User_ID=ID, Image=image, Description=description)
            core.db.session.add(post)
            core.db.session.commit()

            # Create new hashtags
            for hashtag in hashtags:
                if hashtag != "":
                    if hashtag[0] != "#":
                        hashtag = "#" + hashtag
                    hashtag = core.models.Hashtags(Hashtag=hashtag, Post_ID=post.ID)
                    core.db.session.add(hashtag)
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

            # Get the current user
            verify_jwt_in_request()
            JWT = get_jwt()
            User_ID = JWT['sub']

            # Create a list of posts
            posts_list = []
            for post in posts.items:
                posts_list.append({
                    "id": post.ID,
                    "user_name": core.models.User.query.filter_by(ID=post.User_ID).first().Username,
                    "owner_id": post.User_ID,
                    "owner_image": core.models.User.query.filter_by(ID=post.User_ID).first().Image,
                    "description": post.Description,
                    "hashtags": [hashtag.Hashtag for hashtag in core.models.Hashtags.query.filter_by(Post_ID=post.ID).all()],
                    "file": post.Image,
                    "date": post.Date,
                    "likes": core.models.Like.query.filter_by(Post_ID=post.ID).count(),
                    "comments": core.models.Comment.query.filter_by(Post_ID=post.ID).count(),
                    "liked": True if core.models.Like.query.filter_by(User_ID=User_ID, Post_ID=post.ID).first() else False,
                    "commented": True if core.models.Comment.query.filter_by(User_ID=User_ID, Post_ID=post.ID).first() else False,
                    "followed": True if core.models.Followers.query.filter_by(User_ID=User_ID, Follower_ID=post.User_ID).first() else False
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
                "hashtags": [hashtag.Hashtag for hashtag in core.models.Hashtags.query.filter_by(Post_ID=post.ID).all()],
                "file": post.Image,
                "date": post.Date,
            }

            # Return post
            return jsonify({"data": data}), 200

        except Exception as error:
            print("[ERROR] get_posts : ", error)
            return jsonify({'msg': '[ERROR] get_posts : ' + str(error)}), 500


@api_blueprint.route('/posts/delete/<int:ID>', methods=['DELETE'])
@jwt_required()
def delete_post(ID):
    with core.app.app_context():
        try:

            # Get post from database
            post = core.models.Post.query.filter_by(ID=ID).first()

            # Get post comments from database
            comments = core.models.Comment.query.filter_by(Post_ID=ID).all()

            # Check if post exists
            if not post:
                return jsonify({"msg": "No post found"}), 404

            # Check if the user is the owner of the post
            verify_jwt_in_request()
            JWT = get_jwt()
            User_ID = JWT['sub']
            if User_ID != post.User_ID:
                return jsonify({"msg": "You are not allowed to delete this post"}), 403

            # Delete comments
            for comment in comments:
                core.db.session.delete(comment)
                core.db.session.commit()

            # Delete post
            core.db.session.delete(post)
            core.db.session.commit()

            print("[INFO] Post deleted successfully")
            return jsonify({"msg": "Post deleted successfully"}), 200

        except Exception as error:
            print("[ERROR] delete_post : ", error)
            return jsonify({'msg': '[ERROR] delete_post : ' + str(error)}), 500


#############
# USER #
#############

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

            # Check if user exists
            if not user:
                return jsonify({"msg": "No user found"}), 404

            data = {
                "id": user.ID,
                "username": user.Username,
                "email": user.Email,
                "image": user.Image
            }

            # Return user
            return jsonify({"data": data}), 200

        except Exception as error:
            print("[ERROR] get_user : ", error)
            return jsonify({'msg': '[ERROR] get_user : ' + str(error)}), 500


@api_blueprint.route('/user/<int:ID>/posts', methods=['GET'])
@jwt_required()
def get_user_posts(ID):
    with core.app.app_context():
        try:

            # Get posts from database
            posts = core.models.Post.query.filter_by(User_ID=ID).order_by(core.models.Post.ID).all()

            # Check if posts exist
            if not posts:
                return jsonify({"msg": "No posts found"}), 404

            # Create a list of posts
            posts_list = []
            for post in posts:
                posts_list.append({
                    "id": post.ID,
                    "user_name": core.models.User.query.filter_by(ID=post.User_ID).first().Username,
                    "owner_id": post.User_ID,
                    "owner_image": core.models.User.query.filter_by(ID=post.User_ID).first().Image,
                    "description": post.Description,
                    "hashtags": [hashtag.Hashtag for hashtag in core.models.Hashtags.query.filter_by(Post_ID=post.ID).all()],
                    "file": post.Image,
                    "date": post.Date
                })

            # Return posts
            return jsonify({"data": posts_list}), 200

        except Exception as error:
            print("[ERROR] get_user_posts : ", error)
            return jsonify({'msg': '[ERROR] get_user_posts : ' + str(error)}), 500


#############
# LIKE #
#############

@api_blueprint.route('/likes/add/<int:ID>', methods=['GET'])
@jwt_required()
def add_like(ID):
    with core.app.app_context():
        try:

            # Get the current user
            verify_jwt_in_request()
            JWT = get_jwt()
            User_ID = JWT['sub']

            # Check if the user already liked the post
            if core.models.Like.query.filter_by(User_ID=User_ID, Post_ID=ID).first():
                core.models.Like.query.filter_by(User_ID=User_ID, Post_ID=ID).delete()
                core.db.session.commit()
                print("[INFO] Like removed successfully")
                return jsonify({"msg": "Like removed successfully"}), 201

            # Add like to database
            like = core.models.Like(User_ID=User_ID, Post_ID=ID)
            core.db.session.add(like)
            core.db.session.commit()

            print("[INFO] Like added successfully")
            return jsonify({"msg": "Like added successfully"}), 201

        except Exception as error:
            print("[ERROR] add_like : ", error)
            return jsonify({"msg": "[ERROR] add_like : " + str(error)}), 500


@api_blueprint.route('/likes/get', methods=['GET'])
@jwt_required()
def get_likes():
    with core.app.app_context():
        try:

            # Get the current user
            verify_jwt_in_request()
            JWT = get_jwt()
            User_ID = JWT['sub']

            # Get likes from database
            likes = core.models.Like.query.filter_by(User_ID=User_ID).all()

            # Check if likes exist
            if not likes:
                return jsonify({"msg": "No likes found"}), 404

            # Create a list of likes
            likes_list = []
            for like in likes:
                likes_list.append({
                    "id": like.Post_ID,
                    "user_name": core.models.User.query.filter_by(ID=core.models.Post.query.filter_by(ID=like.Post_ID).first().User_ID).first().Username,
                    "owner_id": core.models.Post.query.filter_by(ID=like.Post_ID).first().User_ID,
                    "owner_image": core.models.User.query.filter_by(ID=core.models.Post.query.filter_by(ID=like.Post_ID).first().User_ID).first().Image,
                    "description": core.models.Post.query.filter_by(ID=like.Post_ID).first().Description,
                    "hashtags": [hashtag.Hashtag for hashtag in core.models.Hashtags.query.filter_by(Post_ID=like.Post_ID).all()],
                    "file": core.models.Post.query.filter_by(ID=like.Post_ID).first().Image,
                    "date": core.models.Post.query.filter_by(ID=like.Post_ID).first().Date,
                    "likes": core.models.Like.query.filter_by(Post_ID=like.Post_ID).count(),
                    "comments": core.models.Comment.query.filter_by(Post_ID=like.Post_ID).count(),
                    "liked": True if core.models.Like.query.filter_by(User_ID=User_ID, Post_ID=like.Post_ID).first() else False,
                    "commented": True if core.models.Comment.query.filter_by(User_ID=User_ID, Post_ID=like.Post_ID).first() else False,
                    "followed": True if core.models.Follow.query.filter_by(User_ID=User_ID, Followed_ID=core.models.Post.query.filter_by(ID=like.Post_ID).first().User_ID).first() else False
                })

            # Return likes
            return jsonify({"data": likes_list}), 200

        except Exception as error:
            print("[ERROR] get_likes : ", error)
            return jsonify({'msg': '[ERROR] get_likes : ' + str(error)}), 500

#############
# COMMENTS #
#############


@api_blueprint.route('/comments/add/<int:ID>', methods=['POST'])
@jwt_required()
def add_comment(ID):
    with core.app.app_context():
        try:

            # Get the request data
            comment = request.json.get("comment", None)

            # Check if all fields are filled
            if not comment:
                return jsonify({"msg": "Comment is required"}), 400

            # Get the current user
            verify_jwt_in_request()
            JWT = get_jwt()
            User_ID = JWT['sub']

            # Add comment to database
            comment = core.models.Comment(User_ID=User_ID, Post_ID=ID, Comments=comment)
            core.db.session.add(comment)
            core.db.session.commit()

            print("[INFO] Comment added successfully")
            return jsonify({"msg": "Comment added successfully"}), 201

        except Exception as error:
            print("[ERROR] add_comment : ", error)
            return jsonify({"msg": "[ERROR] add_comment : " + str(error)}), 500


@api_blueprint.route('/comments/get/<int:ID>', methods=['GET'])
@jwt_required()
def get_comments(ID):
    with core.app.app_context():
        try:

            # Get comments from database
            comments = core.models.Comment.query.filter_by(Post_ID=ID).order_by(core.models.Comment.ID).all()

            # Check if comments exist
            if not comments:
                return jsonify({"msg": "No comments found"}), 404

            # Create a list of comments
            comments_list = []
            for comment in comments:
                comments_list.append({
                    "id": comment.ID,
                    "user_name": core.models.User.query.filter_by(ID=comment.User_ID).first().Username,
                    "owner_id": comment.User_ID,
                    "owner_image": core.models.User.query.filter_by(ID=comment.User_ID).first().Image,
                    "comment": comment.Comment,
                    "date": comment.Date
                })

            # Return comments
            return jsonify({"data": comments_list}), 200

        except Exception as error:
            print("[ERROR] get_comments : ", error)
            return jsonify({'msg': '[ERROR] get_comments : ' + str(error)}), 500

#############
# FOLLOWERS #
#############


@api_blueprint.route('/followers/add/<int:ID>', methods=['POST'])
@jwt_required()
def add_follower(ID):
    with core.app.app_context():
        try:

            # Get the current user
            verify_jwt_in_request()
            JWT = get_jwt()
            User_ID = JWT['sub']

            # Check if the user already follow the user
            if core.models.Followers.query.filter_by(User_ID=User_ID, Follower_ID=ID).first():
                core.models.Followers.query.filter_by(User_ID=User_ID, Follower_ID=ID).delete()
                core.db.session.commit()
                print("[INFO] Follower removed successfully")
                return jsonify({"msg": "Follower removed successfully"}), 200

            # Add follower to database
            follower = core.models.Followers(User_ID=User_ID, Follower_ID=ID)
            core.db.session.add(follower)
            core.db.session.commit()

            print("[INFO] Follower added successfully")
            return jsonify({"msg": "Follower added successfully"}), 201

        except Exception as error:
            print("[ERROR] add_follower : ", error)
            return jsonify({"msg": "[ERROR] add_follower : " + str(error)}), 500


@api_blueprint.route('/followers/get', methods=['GET'])
@jwt_required()
def get_followers():
    with core.app.app_context():
        try:

            # Get the current user
            verify_jwt_in_request()
            JWT = get_jwt()
            User_ID = JWT['sub']

            # Get followers from database
            followers = core.models.Followers.query.filter_by(User_ID=User_ID).order_by(core.models.Followers.ID).all()

            # Check if followers exist
            if not followers:
                return jsonify({"msg": "No followers found"}), 404

            # Create a list of followers
            followers_list = []
            for follower in followers:
                followers_list.append({
                    "id": follower.Follower_ID,
                })

            # Get followers posts
            for follower in followers_list:
                follower["posts"] = core.models.Post.query.filter_by(User_ID=follower["id"]).order_by(core.models.Post.ID).all()

            # Create a list of posts
            posts_list = []
            for follower in followers_list:
                for post in follower["posts"]:
                    posts_list.append({
                        "id": post.ID,
                        "user_name": core.models.User.query.filter_by(ID=post.User_ID).first().Username,
                        "owner_id": post.User_ID,
                        "owner_image": core.models.User.query.filter_by(ID=post.User_ID).first().Image,
                        "description": post.Description,
                        "hashtags": [hashtag.Hashtag for hashtag in core.models.Hashtags.query.filter_by(Post_ID=post.ID).all()],
                        "file": post.Image,
                        "date": post.Date,
                        "likes": core.models.Like.query.filter_by(Post_ID=post.ID).count(),
                        "comments": core.models.Comment.query.filter_by(Post_ID=post.ID).count(),
                        "liked": True if core.models.Like.query.filter_by(User_ID=User_ID, Post_ID=post.ID).first() else False,
                        "commented": True if core.models.Comment.query.filter_by(User_ID=User_ID, Post_ID=post.ID).first() else False,
                        "followed": True if core.models.Followers.query.filter_by(User_ID=User_ID, Follower_ID=post.User_ID).first() else False
                    })

            # Sort posts by date
            posts_list.sort(key=lambda x: x["date"], reverse=True)

            # Return posts
            return jsonify({"data": posts_list}), 200

        except Exception as error:
            print("[ERROR] get_followers : ", error)
            return jsonify({'msg': '[ERROR] get_followers : ' + str(error)}), 500

#############
# SEARCHING #
#############


@api_blueprint.route('/search/user/<string:username>', methods=['GET'])
@jwt_required()
def search_user(username):
    with core.app.app_context():
        try:

            # Get users from database
            users = core.models.User.query.filter(core.models.User.Username.like("%" + username + "%")).order_by(core.models.User.ID).all()

            # Check if users exist
            if not users:
                return jsonify({"msg": "No users found"}), 404

            # Create a list of users
            users_list = []
            for user in users:
                users_list.append({
                    "id": user.ID,
                    "user_name": user.Username,
                })

            # Return users
            return jsonify({"data": users_list}), 200

        except Exception as error:
            print("[ERROR] search_user : ", error)
            return jsonify({'msg': '[ERROR] search_user : ' + str(error)}), 500


@api_blueprint.route('/search/hashtag/<string:hashtag>', methods=['GET'])
@jwt_required()
def search_hashtag(hashtag):
    with core.app.app_context():
        try:

            # Get hashtags from database and distinct them
            hashtags = core.models.Hashtags.query.filter(core.models.Hashtags.Hashtag.like("%" + hashtag + "%")).order_by(core.models.Hashtags.ID).distinct().all()

            # Check if hashtags exist
            if not hashtags:
                return jsonify({"msg": "No hashtags found"}), 404

            # Create a list of hashtags
            hashtags_list = []
            for hashtag in hashtags:
                hashtags_list.append({
                    "id": hashtag.ID,
                    "hashtag_name": hashtag.Hashtag,
                })

            # Return posts
            return jsonify({"data": hashtags_list}), 200

        except Exception as error:
            print("[ERROR] search_hashtag : ", error)
            return jsonify({'msg': '[ERROR] search_hashtag : ' + str(error)}), 500

#############
# OTHER #
#############


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
