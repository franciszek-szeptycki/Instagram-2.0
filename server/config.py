###
# Change name of config file to config.py
###

from datetime import timedelta

# Flask
TESTING = True
DEBUG = True
FLASK_ENV = 'development'
SECRET_KEY = 'GHD@edSG#ytvbt#dxzsFGSY4E '
JSON_SORT_KEYS = False


# SQLALCHEMY
SQLALCHEMY_DATABASE_URI = 'mysql://Instagram2.0:qz23hidO6f_L7G-C@kamyrdol32.duckdns.org:3306/Instagram2.0'
SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_POOL_SIZE = 50000
SQLALCHEMY_MAX_OVERFLOW = 50000


# JWT
JWT_SECRET_KEY = 'GHD@edSG#ytgdfgfdAR@#TYDV#dxzsFGSY4E'
JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=30)