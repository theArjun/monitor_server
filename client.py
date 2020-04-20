import socketio

# Creating a Client Instance
clientsio = socketio.Client()
start_timer = True


# Defining Event Handlers
@clientsio.event
def message(data):
    print('I received a message !')

@clientsio.event
def connect():
    print("I'm connected!")

@clientsio.event
def connect_error():
    print("The connection failed!")

@clientsio.event
def disconnect():
    print("I'm disconnected!")

@clientsio.on('send_command_to_client')
def receive_command(json):
    print(f'Received commands : {str(json)}')

if __name__ == "__main__":
    clientsio.connect('http://localhost:5000')
    print(f'Client Session ID : {clientsio.sid}')
    clientsio.emit('receive_command', {'Client Session ID ': clientsio.sid})
    clientsio.wait()


    
