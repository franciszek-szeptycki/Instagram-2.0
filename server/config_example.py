###
# Change name of config file to config.py
###

from datetime import timedelta

# Flask
TESTING = True
DEBUG = True
FLASK_ENV = 'development'
SECRET_KEY = ''
JSON_SORT_KEYS = False


# SQLALCHEMY
SQLALCHEMY_DATABASE_URI = ''
SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_POOL_SIZE = 50000
SQLALCHEMY_MAX_OVERFLOW = 50000


# JWT
JWT_SECRET_KEY = ''
JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=30)