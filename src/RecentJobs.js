import React, {Component} from "react";
import {connect} from 'react-redux';

class RecentJobs extends Component {

    render() {
        return (
            <div>
                <h4>Recent jobs</h4>
                <em>{this.props.selectedJob}</em>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {selectedJob: state.jobSelect.selectedJob}
}

export default connect(mapStateToProps)(RecentJobs);