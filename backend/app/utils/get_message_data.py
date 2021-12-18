import json
from flask import request

# Utils
from . import transform_message_content

def get_message_data(message):

    message_content_transformed = transform_message_content(message.content)

    message_files_data = []
    if message.files:
        message_files = json.loads(message.files)
        message_files_data = [{'uri': f'{request.root_url}/message/image/{file}'} for file in message_files]

    return({
        'message': {
            'content': message_content_transformed,
            'chat_id': message.chat_id,
            'id': message.id,
            'files': message_files_data
        },
        'author': {
            'username': message.author.username,
            'avatar_url': message.author.avatar_url,
            'id': message.author.id,
            'github_id': message.author.github_id,
            'followers': message.author.followers,
            'repos': message.author.repos
        },
        "date": message.date,
    })
