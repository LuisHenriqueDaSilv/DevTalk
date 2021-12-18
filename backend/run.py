from app import socket, app

if __name__ == "__main__":
    socket.run(
        app=app,
        port=5000,
        host='0.0.0.0',
        debug=True,
    )