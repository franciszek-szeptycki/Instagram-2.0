import core

from flask import Blueprint, request, jsonify

api_blueprint = Blueprint('api', __name__, )


@api_blueprint.route('/db/create')
def create_db():
    with core.app.app_context():
        core.db.create_all()

@api_blueprint.route('/post/add', methods=['POST'])
def add_post():
    with core.app.app_context():

        print(request.json)

        file = request.json.get("file", None)
        description = request.json.get("description", None)
        hashtags = request.json.get("hashtags", None)

        # post = core.models.Post(1, 'test.jpg', description, hashtags)
        # core.db.session.add(post)
        # core.db.session.commit()

        return jsonify({"msg": "Post added successfully"}), 201