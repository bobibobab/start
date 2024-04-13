const Paied = {
    System: 'system',
};

class EventMessage{
    constructor(from, value){
        this.from = from;
        this.value = value;
    }
}

class GameEventNotifier{
    events = [];
    handlers = [];
    constructor(){
        let port = window.location.port;
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);

        this.socket.onopen = (event) => {
            this.receiveEvent(new EventMessage('user', 'connected'));
        };
        this.socket.onclose = (event) => {
            this.receiveEvent(new EventMessage('user', 'disconnected'));
        };
        this.socket.onmessage = async (event) => {
            const msg = JSON.parse(await event.data.text());
            this.receiveEvent(msg);
        };
    }

    broadcastEvent(from, value) {
        const event = new EventMessage(from, value)
        this.socket.send(JSON.stringify(event));
    }
    addHandler(handler) {
        this.handlers.push(handler);
    }

    removeHandler(handler) {
        this.handlers.filter((h) => h !== handler);
    }
    receiveEvent(event) {
        this.events.push(event);
        console.log("event");
        this.events.forEach((e) => {
            this.handlers.forEach((handler) => {
                handler(e);
            });
        });
    }
}

const GameNotifier = new GameEventNotifier();
export { Paied, GameNotifier };