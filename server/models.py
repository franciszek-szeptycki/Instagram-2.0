import core


class User(core.db.Model):
    __tablename__ = 'Users'
    id = core.db.Column(core.db.Integer, primary_key=True)
    email = core.db.Column(core.db.String(128), unique=True, nullable=False)
    username = core.db.Column(core.db.String(128), unique=True, nullable=False)
    password = core.db.Column(core.db.String(128), unique=False, nullable=False)

    def __init__(self, email, username, password):
        self.email = email
        self.username = username
        self.password = password

    def __repr__(self):
        return '<User %r>' % self.username
