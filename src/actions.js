export const ADD_JOB = 'ADD_JOB';
export const SET_SELECTED_JOB = 'SET_SELECTED_JOB';

export function addJob(jobid, date) {
    console.log('got here');
    return {
        type: ADD_JOB,
        payload: {
            jobid: jobid,
            date: date
        }
    }
}

export function setSelectedJob(jobid) {
    return {type: SET_SELECTED_JOB, jobid}
}