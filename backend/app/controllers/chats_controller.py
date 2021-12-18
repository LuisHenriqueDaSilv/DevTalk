import json
from flask import request
import sqlalchemy
from uuid import uuid4
from datetime import date

import app

# Database Models
from ..database.models import Message

# Utils
from ..utils import get_message_data


class ChatsController():


    def __init__(self):
        chats_json = open('app/database/chats/chats.json')

        self.chats = json.load(chats_json)


    def get_chat_list(self):

        for language in self.chats:
            language['image_url'] = f'{request.root_url}/chats/icons/{language["aliase"]}.svg'
            language['messages'] = []

        return json.dumps(self.chats), 200


    def get_messages(self, chat_id):

        args = dict(request.args)
        start = args.get('start') or 0

        try:
            start = int(start)
        except Exception:
            return {
                'error': 'Start param is not a number'
            }, 400

        try:
            chat_id = int(chat_id)
        except:
            return {
                'error': 'Invalid chat_id'
            }, 400

        messages = Message.query.order_by(
            sqlalchemy.desc(Message.id)
        ).filter_by(
            chat_id=chat_id
        ).offset(
            start
        ).limit(
            50
        ).all()

        messages_data = []

        for message in messages:
            
            replying_message = False

            try:
                replying_message_id = int(message.replying)
            except:
                replying_message_id = False

            if type(replying_message_id) == int:

                replying_message_db = Message.query.filter_by(
                    id=message.replying
                ).first()

                if replying_message_db:
                    replying_message = get_message_data(replying_message_db)

            message_data = get_message_data(message)
            data = {
                'replying': replying_message
            }
            data.update(message_data)
            messages_data.append(data)

        if len(messages_data) == 0:
            return {
                'error': "I didn't find any message"
            }, 404

        return json.dumps(messages_data)


    def create_message(self, user, chat_id):

        if user.id not in app.socket_clients:

            return {
                'error': 'You need stay connected in websocket to create messages'
            }, 400

        message_content = request.form.get('content')
        replying = request.form.get('replying')

        if not message_content:
            return {
                'error': 'You need send a message content.'
            }, 400

        try:
            chat_id = int(chat_id)
        except:
            return {
                'error': 'Invalid chat_id'
            }, 400

        chat = [chat for chat in self.chats if chat['id'] == chat_id]
        if not chat:
            return {
                'error': 'Chat not found'
            }, 404

        if len(message_content) > 4000:

            return {
                'error': 'Message content no be most longer at 4000 characters'
            }, 400
        allowed_image_mimetypes = [
            "image/jpg"
        ]
        files_names = []
        for file_camp_name in request.files:

            file = request.files.get(file_camp_name)

            if file.mimetype in allowed_image_mimetypes:
                file_name = f'{uuid4().hex}-{date.today()}.png'
                files_names.append(file_name)
                file.save(f'./app/database/uploads/{file_name}')

        if not replying:
            replying = False

        message = Message(
            chat_id=chat_id,
            author_id=user.id,
            content=message_content,
            replying=replying,
            files=files_names
        )
        app.db.session.add(message)
        app.db.session.commit()

        replying_message = False
        if replying:

            replying_message_db = Message.query.filter_by(
                id=replying
            ).first()

            replying_message = get_message_data(replying_message_db)


        message_data = {
            'replying': replying_message,
        }

        message_data.update(get_message_data(message))

        app.socket.emit(
            'chat_message',
            message_data,
            broadcast=True
        )

        return {
            'ok': 'Message created with success'
        }
