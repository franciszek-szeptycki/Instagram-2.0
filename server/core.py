import json
from datetime import datetime, timezone, timedelta

import models
import api
import authorization

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, get_jwt, create_access_token, get_jwt_identity
from flask_cors import CORS

app = Flask(__name__)
app.config.from_pyfile('config.py')

db = SQLAlchemy(app)
jwt = JWTManager(app)
CORS(app)

app.register_blueprint(api.api_blueprint, url_prefix='/api')
app.register_blueprint(authorization.auth_blueprint, url_prefix='/auth')


# Define a function that will be called whenever access to a protected endpoint is attempted
@app.after_request
def refresh_expiring_tokens(response):
    try:
        exp_timestamp = get_jwt()['exp']
        print(exp_timestamp)
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token
                response.data = json.dumps(data)
            return response
    except (RuntimeError, KeyError):
        return


if __name__ == "__main__":
    app.run(debug=True)