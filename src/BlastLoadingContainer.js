import React, {Component} from "react";
import {connect} from 'react-redux';
import {addJob} from './actions';
import BlastRunner from './BlastRunner';

const convert = require("xml-js");
//ncbiblast-R20171102-144303-0480-72549934-pg

class BlastLoadingContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: '',
            jobid: ''
        };
        console.log(this.state.selectedJob);
        fetch("https://www.ebi.ac.uk/Tools/services/rest/ncbiblast/run/", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `email=info@uniprot.org&database=uniprotkb&program=blastp&stype=protein&sequence=${props.sequence}`
        }).then(d => d.text().then(d => this.trackJob(d)));
    }

    trackJob(jobid) {
        this.setState({jobid: jobid});
        const intervalId = setInterval(() => this.getJobStatus(jobid), 5000);
        this.setState({intervalId: intervalId});
    }

    getJobStatus(jobid) {
        fetch(`http://www.ebi.ac.uk/Tools/services/rest/ncbiblast/status/${jobid}`).then(d => d.text().then(d => {
            this.setState({status: d});
            if (d === "FINISHED") {
                this.retrieveResults(jobid);
                clearInterval(this.state.intervalId);
            } else {
                console.log(d);
            }
        }));
    }

    retrieveResults(jobid) {
        fetch(`http://www.ebi.ac.uk/Tools/services/rest/ncbiblast/result/${jobid}/xml`).then(d => d.text().then(d => {
            const jsonObject = convert.xml2js(d, {compact: true});
            this
                .props
                .dispatch(addJob(jobid, jsonObject.EBIApplicationResult.Header.timeInfo.end));
        }));
    }

    render() {
        return (
            <div>
                <BlastRunner jobid={this.state.jobid}/> {this.state.selectedJob}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {selectedJob: state.selectedJob}
}

export default connect(mapStateToProps)(BlastLoadingContainer);