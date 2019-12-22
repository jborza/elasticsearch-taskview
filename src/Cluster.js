import React, { useState, useEffect } from 'react';
import Node from './Node';

const Cluster = () => {
    const [clusterUrl, setClusterUrl] = useState('http://192.168.0.114:9200');
    const [clusterJson, setClusterJson] = useState();

    const fetchClusterData = () => {
        const url = clusterUrl + '/_tasks';
        console.log(url);
        fetch(url).then((response) => {
            return response.json();
        }).then(
            (json) => {
                setClusterJson(json);
            }
        );
    }

    // TODO ignore warning in linter
    useEffect(() => {
        fetchClusterData();
    }, []); 

    const nodes = clusterJson ? Object.keys(clusterJson.nodes)
        .map(key => <Node node={clusterJson.nodes[key]} key={key} clusterUrl={clusterUrl} />)
        : null;

    return <div>
        <h1>Elasticsearch cluster @ {clusterUrl}</h1>
        <span>Cluster URL: <input value={clusterUrl} onChange={(e) => setClusterUrl(e.target.value)}></input>
        </span>
        <button onClick={fetchClusterData}>Refresh </button>

        <pre>{JSON.stringify(clusterJson)}</pre>

        {nodes}

    </div>
}


export default Cluster;