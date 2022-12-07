from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_mail import Mail, Message

app = Flask(__name__)
app.config.from_pyfile('config.py')

db = SQLAlchemy(app)
jwt = JWTManager(app)
mail = Mail(app)

import models
import api
import authorization
import others

app.register_blueprint(api.api_blueprint, url_prefix='/api')
app.register_blueprint(authorization.auth_blueprint, url_prefix='/auth')

if __name__ == "__main__":
    app.run(debug=True)
