import core

import datetime

class User(core.db.Model):
    __tablename__ = 'Users'
    ID = core.db.Column(core.db.Integer, primary_key=True)
    Email = core.db.Column(core.db.String(128), unique=True, nullable=False)
    Username = core.db.Column(core.db.String(128), unique=True, nullable=False)
    Password = core.db.Column(core.db.String(128), unique=False, nullable=False)
    Image = core.db.Column(core.db.Text(10000000), unique=False, nullable=True)
    Date = core.db.Column(core.db.DateTime, default=datetime.datetime.utcnow)

    def __init__(self, Email, Username, Password):
        self.Email = Email
        self.Username = Username
        self.Password = Password

    def __repr__(self):
        return '<User %r>' % self.Username

class Post(core.db.Model):
    __tablename__ = 'Posts'
    ID = core.db.Column(core.db.Integer, primary_key=True)
    User_ID = core.db.Column(core.db.Integer, core.db.ForeignKey('Users.ID'))
    Image = core.db.Column(core.db.Text(10000000), unique=False, nullable=False)
    Description = core.db.Column(core.db.String(256), unique=False, nullable=False)
    Hashtags = core.db.Column(core.db.String(256), unique=False, nullable=False)
    Date = core.db.Column(core.db.DateTime, default=datetime.datetime.utcnow)

    def __init__(self, User_ID, Image, Description, Hashtags):
        self.User_ID = User_ID
        self.Image = Image
        self.Description = Description
        self.Hashtags = Hashtags

    def __repr__(self):
        return '<Post %r>' % self.Description

class Comment(core.db.Model):
    __tablename__ = 'Comments'
    ID = core.db.Column(core.db.Integer, primary_key=True)
    User_ID = core.db.Column(core.db.Integer, core.db.ForeignKey('Users.ID'))
    Post_ID = core.db.Column(core.db.Integer, core.db.ForeignKey('Posts.ID'))
    Text = core.db.Column(core.db.String(512), unique=False, nullable=False)
    Date = core.db.Column(core.db.DateTime, default=datetime.datetime.utcnow)

    def __init__(self, User_ID, Post_ID, Text):
        self.User_ID = User_ID
        self.Post_ID = Post_ID
        self.Text = Text

    def __repr__(self):
        return '<Comment %r>' % self.Text


class Like(core.db.Model):
    __tablename__ = 'Likes'
    ID = core.db.Column(core.db.Integer, primary_key=True)
    User_ID = core.db.Column(core.db.Integer, core.db.ForeignKey('Users.ID'))
    Post_ID = core.db.Column(core.db.Integer, core.db.ForeignKey('Posts.ID'))
    Date = core.db.Column(core.db.DateTime, default=datetime.datetime.utcnow)

    def __init__(self, User_ID, Post_ID):
        self.User_ID = User_ID
        self.Post_ID = Post_ID

    def __repr__(self):
        return '<Like %r>' % self.ID

class Followers(core.db.Model):
    __tablename__ = 'Followers'
    ID = core.db.Column(core.db.Integer, primary_key=True)
    User_ID = core.db.Column(core.db.Integer, core.db.ForeignKey('Users.ID'))
    Follower_ID = core.db.Column(core.db.Integer, core.db.ForeignKey('Users.ID'))
    Date = core.db.Column(core.db.DateTime, default=datetime.datetime.utcnow)

    def __init__(self, User_ID, Follower_ID):
        self.User_ID = User_ID
        self.Follower_ID = Follower_ID

    def __repr__(self):
        return '<Follower %r>' % self.ID