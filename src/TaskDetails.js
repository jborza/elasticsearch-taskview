import React from 'react';

const TaskDetails = (props) => {
    const task = props.task.task;
    const status = task.status;
    const completed = status ? status.updated + status.created + status.deleted
        : null;
    const remaining = status.total - completed;
    const millis_per_document = task.running_time_in_nanos / completed / 1e6;
    const seconds_per_1k_doc = task.running_time_in_nanos / 1e9 / completed * 1e3;
    const docs_per_second = completed / task.running_time_in_nanos * 1e9;
    const hhmmss = millis => new Date(millis).toISOString().substr(11, 8);

    return status ? <div>
        <progress value={completed} max={status.total} style={{width:"500px"}}/>
        <br/>
        Velocity: {docs_per_second.toFixed(1)} docs/s
        <br/>
        Updated: {status.updated} Created: {status.created} Deleted: {status.deleted} Total: {status.total}
        <br/>
        Remaining: {remaining} ETA: {hhmmss(millis_per_document * remaining)}
        <br/>
        Description: <code> {task.description} </code>
    </div> : null;
};

export default TaskDetails;