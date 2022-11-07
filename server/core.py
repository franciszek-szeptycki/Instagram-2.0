from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.from_pyfile('config.py')

db = SQLAlchemy(app)

import models
import api

app.register_blueprint(api.api_blueprint, url_prefix='/api')


if __name__ == "__main__":
    app.run(debug=True)