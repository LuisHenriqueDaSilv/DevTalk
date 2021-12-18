from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_socketio import SocketIO
from flask_cors import CORS
from dotenv import load_dotenv


app = Flask(
    __name__
)


# App config
app.config.from_object('config') # Get config from configs.py in project root
CORS(app)
load_dotenv()

# Database config
db = SQLAlchemy(app)
migrate = Migrate(
    app,
    db,
    directory='app/database/migrations'
)

# Routes
from .routes import account_router, chats_router
app.register_blueprint(account_router)
app.register_blueprint(chats_router)

# SocketIo config
socket = SocketIO(
    app,
    cors_allowed_origins="*",
    logger=False
)
socket_clients = []

    
# Database Models (Used in migrations)
from .database.models import User, Message

# Socket events handlers
from .socket_events import *
