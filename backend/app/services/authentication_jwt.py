import jwt
import os
from datetime import datetime, timedelta
from flask import request
from functools import wraps
from flask_socketio import disconnect

# Database Models
from ..database.models import User

# Dotenv variables
JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')


class AuthenticationJwt():


    def __init__(self, user_id):

        payload = {
            "id": user_id,
            "exp": datetime.utcnow() + timedelta(days=3)  # 72 hours
        }
        self.code = jwt.encode(
            payload=payload,
            key=JWT_SECRET_KEY,
            algorithm="HS256"
        )

    @staticmethod
    def verify_in_request(function):

        @wraps(function)
        def wrapper(*args, **kwargs):

            token = request.headers.get('authorization')

            if not token or 'Bearer ' not in token:
                return {
                    'error': 'You must be logged to use this app'
                }, 401

            try:
                token = token.replace("Bearer ", "")
                decoded = jwt.decode(
                    token,
                    JWT_SECRET_KEY,
                    algorithms=["HS256"]
                )
                user_id = decoded['id']

                # Check if the account that owns this token
                # exists in database
                user = User.query.filter_by(id=user_id).first()
                if not user:
                    raise

            except:
                return {
                    'error': 'You must be logged to use this app'
                }, 401
            else:
                return function(user=user, *args, **kwargs)

        return wrapper

    @staticmethod
    def verify_in_socket_event(function):

        @wraps(function)
        def wrapper(*args, **kargs):

            token = request.args.get('authorization')

            if not token or 'Bearer ' not in token:
                disconnect()

            try:
                token = token.replace("Bearer ", "")
                decoded = jwt.decode(
                    token, 
                    JWT_SECRET_KEY,
                    algorithms=["HS256"]
                )
                user_id = decoded['id']

                # Check if the account that owns this token
                # exists in database
                user = User.query.filter_by(id=user_id).first()
                if not user:
                    raise

            except:
                disconnect()
            else:
                return function(user=user, *args, **kargs)

        return wrapper
