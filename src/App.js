import React, {
    Component
} from 'react';
import {
    Button
} from 'react-bootstrap';
class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };
    }
    doClick() {
        if (this.connection.readyState === WebSocket.OPEN) {
            console.log('connected, sending data');
            this.connection.send(JSON.stringify({
                action: "broadcast",
                data: "hello from browser"
            }));
        } else {
            console.log('not connected' + this.connection.readyState);
        }
    }
    componentDidMount() {
        this.connection = new WebSocket('wss://nno8ermtec.execute-api.us-east-1.amazonaws.com/dev');
        this.connection.onmessage = evt => {
            this.setState({
                message: evt.data
            })
        };
    }
render() {
        return (
            <div>
                <p>{this.state.message}</p>
                <Button variant="primary" onClick={e=>this.doClick()}>Click</Button>
            </div>
        )
    }
}
export default Message;