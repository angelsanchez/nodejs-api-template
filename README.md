nodejs-api-template
===================

A boilerplate for building a NodeJS API server.
Use it as a template project when you want to start a new project.

## Dependencies

 - [restify](https://github.com/mcavage/node-restify) is a smallish framework, similar to express for building REST APIs.
 - [mongoose](https://github.com/LearnBoost/mongoose) is a MongoDB object modeling tool designed to work in an asynchronous environment.
 - [config](https://github.com/lorenwest/node-config) organizes hierarchical configurations for your app deployments.
 - [bunyan](https://github.com/trentm/node-bunyan) is a JSON logging library for node.js services
 - [forever](https://github.com/foreverjs/forever) is a simple CLI tool for ensuring that a given script runs continuously

## Dev. dependencies
 - [cucumber](https://github.com/cucumber/cucumber-js) the popular Behaviour-Driven Development tool, brought to your JavaScript stack.
 - [supertest](https://github.com/tj/supertest) is a library for testing node.js HTTP servers using a fluent API

## Run the application in development mode

```sh
$ node bin/server.js | node_modules/bunyan/bin/bunyan -o short
```
*The bunyan pipe is only for read better the logs*

## Run the application as a service

```sh
$ npm start
```

## Show the running application status

```sh
$  npm status
```
## Stop the application as a service

```sh
$  npm stop
```

## Read error logs

Show errors in http requests:

```sh
$ tail -f <config.log.path> | node_modules/bunyan/bin/bunyan -c 'this.res && this.res.statusCode >= 500'
```
