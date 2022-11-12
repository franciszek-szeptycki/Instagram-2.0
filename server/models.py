import core


class User(core.db.Model):
    __tablename__ = 'Users'
    id = core.db.Column(core.db.Integer, primary_key=True)
    email = core.db.Column(core.db.String(128), unique=True, nullable=False)
    username = core.db.Column(core.db.String(128), unique=True, nullable=False)
    password = core.db.Column(core.db.String(128), unique=False, nullable=False)
    created_at = core.db.Column(core.db.DateTime, default=core.db.func.now())

    def __init__(self, email, username, password):
        self.email = email
        self.username = username
        self.password = password

    def __repr__(self):
        return '<User %r>' % self.username

class Post(core.db.Model):
    __tablename__ = 'Posts'
    id = core.db.Column(core.db.Integer, primary_key=True)
    user_id = core.db.Column(core.db.Integer, core.db.ForeignKey('Users.id'))
    file = core.db.Column(core.db.String(128), unique=False, nullable=False)
    description = core.db.Column(core.db.String(128), unique=False, nullable=False)
    hash_tags = core.db.Column(core.db.String(128), unique=False, nullable=False)
    created_at = core.db.Column(core.db.DateTime, default=core.db.func.now())

    def __init__(self, user_id, file, description, hash_tags):
        self.user_id = user_id
        self.file = file
        self.description = description
        self.hash_tags = hash_tags

    def __repr__(self):
        return '<Post %r>' % self.title