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


        try:

            file = request.files['image']
            filename = file.filename

            # post = core.models.Post(1, 'test.jpg', description, hashtags)
            # core.db.session.add(post)
            # core.db.session.commit()

            return jsonify({'msg': 'Post added'}), 200

        except Exception as e:
            print("Error: ", e)
            return jsonify({'error': 'Error while adding post to database - ' + str(e)}), 500

        return jsonify({"msg": "Post added successfully"}), 201