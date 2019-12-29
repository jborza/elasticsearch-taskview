[![Build Status](https://travis-ci.org/jborza/elasticsearch-taskview.svg?branch=master)](https://travis-ci.org/jborza/elasticsearch-taskview)

# Elasticsearch-taskview

A tool to view the status and the progress of the tasks (mostly reindex) of your elasticsearch cluster.

1. (optional) Enable CORS for the host you're running this at in elasticsearch.yml
2. start elasticsearch-taskview with `yarn start`
3. Point the URL at the elasticsearch management node (e.g. `http://localhost:9200`)

## Release URL

The current version is deployed to http://jborza.github.io/elasticsearch-taskview

## Build instructions:

### `yarn build` 

Builds the app for production to the `build` folder.<br />

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
