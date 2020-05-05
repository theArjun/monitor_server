import json

from flask import Flask, request
from flask_socketio import SocketIO, send, emit, disconnect

app = Flask(__name__, template_folder='templates/')
app.config['SECRET_KEY'] = 'secret'
socketio = SocketIO(app, cors_allowed_origins="*")

# GLOBAL SESSION AND EFFICIENCY CARETAKERS
CONNECTED_USERS = {}
ACTIVE_USERS = []
COMMAND_EXECUTION_EFFICIENCY = {}


@app.route('/', methods=['GET', 'POST'])
def index():
    return "Monitor Server"

# Handle First Handshake
@socketio.on('first_handshake')
def handle_first_handshake(payload):

    CONNECTED_USERS[payload['client_ID']] = payload['client_Session_ID']
    socketio.emit('client_please_report', 'Dummy', broadcast=True)
    ACTIVE_USERS.clear()

# Handling command from the frontend and sending to client for execution
@socketio.on('command_from_web', namespace='/command')
def command_to_client(payload):

    COMMAND_EXECUTION_EFFICIENCY.clear()
    recipient_session_ID = payload['client_ID']
    command = payload['command']
    emit('server_commands', command, room=recipient_session_ID)

# Command Execution from Client to Server
@socketio.on('output_from_client')
def handle_output_from_client(message):
    print(f'The execution in Client was : {message}')
    COMMAND_EXECUTION_EFFICIENCY[json.loads(
        message)['session_ID']] = json.loads(message)['return_code']
    job_done_successfully = sum(
        value == 0 for value in COMMAND_EXECUTION_EFFICIENCY.values())
    server_response = {
        'response': json.loads(message),
        'efficiency': job_done_successfully/len(COMMAND_EXECUTION_EFFICIENCY) * 100
    }
    socketio.emit('output_from_client_to_web', json.dumps(server_response))

# Taking attendance of realtime clients and updating frontend.
@socketio.on('realtime_attendance')
def collect_realtime_attendance(payload):
    payload['client_IP'] = request.access_route
    ACTIVE_USERS.append(payload)
    socketio.emit('update_connections_list', ACTIVE_USERS)

# Populating the frontend when reloading.
@socketio.on('populate_me')
def populate_frontend(message):
    socketio.emit('client_please_report', 'Dummy', broadcast=True)
    ACTIVE_USERS.clear()


debug = False

if __name__ == "__main__":
    # app.run(debug=debug)
    socketio.run(app, debug=debug, port=5000)
