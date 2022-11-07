from flask import Blueprint

import core

api_blueprint = Blueprint('api', __name__, )

@api_blueprint.route('/db/create')
def create_db():
    with core.app.app_context():
        core.db.create_all()
