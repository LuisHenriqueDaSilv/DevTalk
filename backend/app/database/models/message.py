from datetime import datetime
import json

from app import db


class Message(db.Model):


    __tablename__ = 'messages'

    id = db.Column(
        db.Integer,
        primary_key=True,
        autoincrement=True,
        unique=True
    )
    chat_id = db.Column(db.Integer)
    content = db.Column(db.Text)
    date = db.Column(db.Text)
    replying = db.Column(db.Text)
    files = db.Column(db.Text)

    author_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    def __init__(self, chat_id, content, author_id, replying, files):
        self.author_id = author_id
        self.content = content
        self.chat_id = chat_id
        self.date = str(datetime.now().strftime("%d/%m/%Y at %H:%M:%S"))
        self.replying = str(replying)
        self.files = json.dumps(files)
