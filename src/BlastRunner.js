import React, {Component} from "react";
import spinner from './spinner.svg';
import './BlastRunner.css';

const waitingMessages = ["Running BLAST", "Fetching data", "Computing subatomic particles", "Launching rocket", "Looking for the meaning of life"];

class BlastRunner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            waitingMessage: waitingMessages[0]
        };
    }

    componentDidMount() {
        this.updateWaitingMessage();
    }

    updateWaitingMessage() {
        setInterval(() => {
            const msg = waitingMessages[Math.floor(Math.random() * waitingMessages.length)];
            this.setState({waitingMessage: msg});
        }, 5000);
    }

    render() {
        return (
            <div className="callout text-center">
                <p>{this.state.waitingMessage}...</p>
                <img src={spinner} className="spinner" alt="loading"/> {this.props.jobid.length > 0 && <p>
                    <strong>Job ID:</strong>
                    {this.props.jobid}
                </p>
}
            </div>
        );
    }
}

export default BlastRunner;