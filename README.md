nodejs-api-template
===================

A boilerplate for building a NodeJS API server.
Use it as a template project when you want to start a new project.

#### Dependencies

 - [restify](https://github.com/mcavage/node-restify) is a smallish framework, similar to express for building REST APIs.
 - [mongoose](https://github.com/LearnBoost/mongoose) is a MongoDB object modeling tool designed to work in an asynchronous environment.
 - [config](https://github.com/lorenwest/node-config) organizes hierarchical configurations for your app deployments.
 - [bunyan](https://github.com/trentm/node-bunyan) is a JSON logging library for node.js services
 - [forever](https://github.com/foreverjs/forever) is a simple CLI tool for ensuring that a given script runs continuously

#### Dev. dependencies
 - [cucumber](https://github.com/cucumber/cucumber-js) the popular Behaviour-Driven Development tool, brought to your JavaScript stack.
 - [supertest](https://github.com/tj/supertest) is a library for testing node.js HTTP servers using a fluent API
 - [jshint](https://github.com/jshint/jshint) is a tool that helps to detect errors and potential problems in your JavaScript code
 - [jscs](https://github.com/jscs-dev/node-jscs) is a code style linter for programmatically enforcing your style guide

## Development

#### Run the application

```sh
$ node bin/server.js | node_modules/bunyan/bin/bunyan -o short
```
*The bunyan pipe is only for read better the logs*

#### Code lint

```sh
$ npm run-script lint
```

#### Check code style

```sh
$ npm run-script code-style
```

## Run the application as a service

#### Start the service

```sh
$ npm start
```

#### Show the service status

```sh
$  npm status
```
#### Stop the service

```sh
$  npm stop
```

## Logs

All application logs (requests, responses, traces and mongodb accesses) are stored in a file. The log file path is set in the config file (`log.path`).

#### Read error logs

Show errors in http requests:

```sh
$ tail -f <config.log.path> | node_modules/bunyan/bin/bunyan -c 'this.res && this.res.statusCode >= 500'
```
