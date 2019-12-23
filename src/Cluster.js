import React, { useState, useEffect } from 'react';
import Node from './Node';
import truncate from './truncate';

const Cluster = () => {
    const [clusterUrl, setClusterUrl] = useState('http://localhost:9200');
    const [clusterJson, setClusterJson] = useState();
    const [doAutoRefresh, setDoAutoRefresh] = useState(true);

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

    const autoRefresh = () => {
        if(!doAutoRefresh)
            return;
        fetchClusterData();
        setTimeout(()=> autoRefresh(), 10000);
    }

    // TODO ignore warning in linter
    useEffect(() => {
        fetchClusterData();
    }, []); 

    useEffect(()=>{
        if(!doAutoRefresh)
            return;
        autoRefresh();
    }, [doAutoRefresh])

    const nodes = clusterJson ? Object.keys(clusterJson.nodes)
        .map(key => <Node node={clusterJson.nodes[key]} key={key} clusterUrl={clusterUrl} doAutoRefresh={doAutoRefresh} />)
        : null;

    return <div>
        <h1>Elasticsearch cluster @ {clusterUrl}</h1>
        <span>Cluster URL: <input value={clusterUrl} onChange={(e) => setClusterUrl(e.target.value)}></input>
        </span>
        <button onClick={fetchClusterData}>&#x21bb; Refresh</button>
        <label><input type="checkbox" checked={doAutoRefresh} onChange={e=>setDoAutoRefresh(e.target.checked)}/>Auto-refresh</label>         
        {clusterJson ? 
           <pre title={clusterJson}>Status: {truncate(JSON.stringify(clusterJson), 100)}</pre>
           : null
        }
        {nodes}
    </div>
}


export default Cluster;