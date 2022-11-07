from flask import Blueprint, jsonify

from core import app, db

api_blueprint = Blueprint('api', __name__, )

@api_blueprint.route('/db/create')
def create_db():
    db.init_app(app)
    with app.app_context():
        db.create_all()
    return jsonify({'msg': 'Database created'})


@api_blueprint.route('/sign-up', methods=['POST'])
def sign_up():
    pass

@api_blueprint.route('/sign-in', methods=['POST'])
def sign_in():
    pass