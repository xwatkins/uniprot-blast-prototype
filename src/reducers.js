import {combineReducers} from 'redux';
import {ADD_JOB, SET_SELECTED_JOB} from './actions'

const initialState = {
    jobs: [
        {
            jobid: 'ncbiblast-R20171102-144303-0480-72549934-pg',
            date: '2017-05-07'
        }
    ],
    selectedJob: 'ncbiblast-R20171102-144303-0480-72549934-pg'
}

function blastJobs(state = initialState, action) {
    switch (action.type) {
        case ADD_JOB:
            return [
                ...state.jobs, {
                    jobid: action.payload.jobid,
                    date: action.payload.date
                }
            ];
        default:
            return state;
    }
}

function jobSelect(state = initialState, action) {
    switch (action.type) {
        case SET_SELECTED_JOB:
            return {
                ...state,
                selectedJob: action.payload.jobid
            }
        case ADD_JOB:
            return {
                ...state,
                selectedJob: action.payload.jobid
            }
        default:
            return state;
    }
}

const blastApp = combineReducers({blastJobs, jobSelect})

export default blastApp;