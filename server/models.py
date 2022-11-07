from core import db


class User(db.Model):
    __tablename__ = 'Users'
    ID = db.Column(db.Integer, primary_key=True)
    Email = db.Column(db.String(128), unique=True, nullable=False)
    Username = db.Column(db.String(128), unique=True, nullable=False)
    Password = db.Column(db.String(128), unique=False, nullable=False)

    def __init__(self, Email, Username, Password):
        self.Email = Email
        self.Username = Username
        self.Password = Password

    def __repr__(self):
        return '<User %r>' % self.username
