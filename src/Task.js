import React, { useState, useEffect } from 'react';
import TaskDetails from "./TaskDetails";

const Task = (props) => {
    const task = props.task;
    const clusterUrl = props.clusterUrl;
    const doAutoRefresh = props.doAutoRefresh;
    const taskUrl = props.clusterUrl + "/_tasks/" + task.node+":"+task.id;

    const [taskJson, setTaskJson] = useState();

    const areTaskDetailsInteresting = (task) => task.action.startsWith("cluster:monitor") === false;

    const fetchTaskData = () => {
        fetch(taskUrl).then((response) => {
            return response.json();
        }).then(
            (json) => {
                setTaskJson(json);
            }
        );
    };

    useEffect(() => {
        if(areTaskDetailsInteresting(task)){
            fetchTaskData()
        }
    }, []);

    const autoRefresh = () => {
        if(!doAutoRefresh)
            return;
        fetchTaskData();
        setTimeout(()=> autoRefresh(), 10000);
    }

    useEffect(()=>autoRefresh(), 
        [doAutoRefresh]);

    return <div>
        <table border="1" style={{display:"inline-table"}}>
            <thead>
                <tr>
                    <th>id</th>
                    <th>action</th>
                    <th>type</th>
                    <th>started</th>
                    <th>running time</th>
                    <th>cancellable</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{task.id}</td>
                    <td>{task.action}</td>
                    <td>{task.type}</td>
                    <td>{new Date(task.start_time_in_millis).toLocaleTimeString()}</td>
                    <td>{new Date(task.running_time_in_nanos / 1e6).toISOString().substr(11, 8)}</td>
                    <td>{task.cancellable.toString()}</td>
                </tr>
            </tbody>
        </table>
        <br/>
        {taskJson ? <TaskDetails task={taskJson}/> : null}
    </div>;
};

export default Task;