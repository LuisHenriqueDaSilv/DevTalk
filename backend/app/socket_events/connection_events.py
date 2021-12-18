import json

from app import socket, socket_clients

# Services
from ..services import AuthenticationJwt


@socket.on('connect')
@AuthenticationJwt.verify_in_socket_event
def handle_new_connection(user):
    socket_clients.append(user.id)


@socket.on('disconnect')
@AuthenticationJwt.verify_in_socket_event
def handle_disconnect_uset(user):
    socket_clients.remove(user.id)
