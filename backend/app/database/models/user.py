from app import db


class User(db.Model):


    __tablename__ = 'users'

    id = db.Column(
        db.Integer,
        primary_key=True,
        autoincrement=True,
        unique=True
    )
    github_id = db.Column(db.Integer, unique=True)

    username = db.Column(db.Text, unique=True)
    avatar_url = db.Column(db.Text)
    followers = db.Column(db.Integer)
    repos = db.Column(db.Integer)

    messages = db.relationship('Message', backref='author')

    def __init__(self, username, avatar_url, github_followers, github_repos, github_id):
        self.username = username
        self.avatar_url = avatar_url
        self.followers = github_followers
        self.repos = github_repos
        self.github_id = github_id
