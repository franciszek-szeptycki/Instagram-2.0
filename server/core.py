import models
import api
import authorization

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager

app = Flask(__name__)
app.config.from_pyfile('config.py')

db = SQLAlchemy(app)
jwt = JWTManager(app)

app.register_blueprint(api.api_blueprint, url_prefix='/api')
app.register_blueprint(authorization.auth_blueprint, url_prefix='/auth')

if __name__ == "__main__":
    app.run(debug=True)
