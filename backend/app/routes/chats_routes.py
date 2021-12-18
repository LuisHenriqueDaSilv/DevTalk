from flask import Blueprint,  send_from_directory
import os

from ..services import AuthenticationJwt

# Controller
from ..controllers import ChatsController

# Middlewares
from ..middlewares import error_handler

chats_router = Blueprint(
    name="chats_router",
    import_name=__name__,
)

chats_controller = ChatsController()


@chats_router.route('/chats/list', methods=['GET'])
@error_handler
@AuthenticationJwt.verify_in_request
def get_chat_list(user):
    return chats_controller.get_chat_list()


@chats_router.route('/chat/<path:chat_id>/messages', methods=['GET'])
@error_handler
@AuthenticationJwt.verify_in_request
def get_message_in_chat(chat_id, user):
    return chats_controller.get_messages(chat_id)


@chats_router.route('/chat/<path:chat_id>/create_message', methods=['POST'])
@error_handler
@AuthenticationJwt.verify_in_request
def create_message(chat_id, user):
    return chats_controller.create_message(user, chat_id)


@chats_router.route('/chats/icons/<path:icon_name>', methods=['GET'])
@error_handler
def get_language_icon(icon_name):
    project_path = os.path.dirname(os.path.abspath('run.py'))
    return send_from_directory(f'{project_path}/app/database/chats/icons', icon_name)


@chats_router.route('/message/image/<path:image_name>', methods=['GET'])
@error_handler
def get_message_image(image_name):
    project_path = os.path.dirname(os.path.abspath('run.py'))
    return send_from_directory(f'{project_path}/app/database/uploads/', image_name)
