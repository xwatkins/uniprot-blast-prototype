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
            currentJobId: '',
            status: ''
        };
        if (this.props.sequence && this.props.sequence.length > 0) {
            this.submitBlastJob();
        } else if (this.props.selectedJob && this.props.selectedJob.length > 0) {
            console.log(this.props.selectedJob);
        }
    }

    submitBlastJob() {
        fetch("https://www.ebi.ac.uk/Tools/services/rest/ncbiblast/run/", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `email=info@uniprot.org&database=uniprotkb&program=blastp&stype=protein&sequence=${this.props.sequence}`
        }).then(d => d.text().then(d => this.trackJob(d).then(d => this.retrieveResults(d))));
    }

    trackJob(jobid) {
        return new Promise((resolve, reject) => {
            this.setState({currentJobId: jobid});
            const intervalId = setInterval(() => fetch(`http://www.ebi.ac.uk/Tools/services/rest/ncbiblast/status/${jobid}`).then(d => d.text().then(d => {
                if (d === "FINISHED") {
                    resolve(jobid);
                    clearInterval(intervalId);
                } else {
                    console.log(d);
                }
            })), 1000);
        });
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
                <BlastRunner jobid={this.state.currentJobId}/> {this.state.selectedJob}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {selectedJob: state.jobSelect.selectedJob}
}

export default connect(mapStateToProps)(BlastLoadingContainer);