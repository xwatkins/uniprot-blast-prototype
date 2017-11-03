import {combineReducers} from 'redux';
import {ADD_JOB, SET_SELECTED_JOB} from './actions'

function blastJobs(state = [], action) {
    switch (action.type) {
        case ADD_JOB:
            return [
                ...state, {
                    jobid: action.jobid,
                    date: action.date
                }
            ];
        default:
            return state;
    }
}

function jobSelect(state = '', action) {
    switch (action.type) {
        case SET_SELECTED_JOB:
            return {
                ...state,
                selectedJob: action.jobid
            }
        case ADD_JOB:
            return {
                ...state,
                selectedJob: action.jobid
            }
        default:
            return state;
    }
}

const blastApp = combineReducers({blastJobs, jobSelect})

export default blastApp;