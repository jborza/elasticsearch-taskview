import React from 'react';
import Task from './Task';


const Node = (props) => {
    const node = props.node;
    const clusterUrl = props.clusterUrl;

    const tasks = node.tasks ? Object.keys(node.tasks).sort()
        .map(key=>node.tasks[key])
            .filter(t=>t.action.indexOf("reindex") != -1)
        .map(t=><Task key={t.id} task={t} clusterUrl={clusterUrl}/>) 
        : null;

    return <div>
        <h3>{node.name}</h3>
        clusterUrl: {clusterUrl}
        <ul>
            <li>ip: {node.ip}</li>
            <li>roles: {JSON.stringify(node.roles)}</li>
        </ul>
        Tasks:
        {tasks}
    </div>
}

export default Node;