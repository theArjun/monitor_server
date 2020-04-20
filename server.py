from flask import Flask, render_template, request
from flask_socketio import SocketIO, send, emit

app = Flask(__name__, template_folder='templates/')
app.config['SECRET_KEY'] = 'secret'
socketio = SocketIO(app)

command_list = []
command_list.append({'foo': 'bar'})


@app.route('/', methods=['GET', 'POST'])
def command():

    global command_list

    try:
        if request.method == 'POST':

            client_ID = request.form['client_ID']
            command = request.form['command']

            command_info = {}

            command_info['client_ID'] = client_ID
            command_info['command'] = command
            command_info['is_processed'] = False

            socketio.emit('send_command_to_client', command_info)

            command_list.append(command_info)

        return render_template('index.html')

    except Exception:
        return render_template('index.html')


@socketio.on('connect')
def test_connect():
    # emit('Message from server : ', {'data': 'Connected'})
    print('Client got connected !')


@socketio.on('message')
def handle_message(message):
    print('\n\nReceived Message: ' + message)
    # send(message, broadcast=True)


@socketio.on('receive_command')
def handle_command(json):
    print(f'Received Command : {str(json)}')
    # emit('Command to Client : ', json, broadcast=True)

debug = False

if __name__ == "__main__":
    socketio.run(app, debug=debug, port=5000)
    print(str(command_list))
    emit('send_command_to_client', {'foo': 'bar'}, broadcast=True)
