nodejs-api-template
===================

A boilerplate for building a NodeJS API server.
Use it as a template project when you want to start a new project.

#### Dependencies

 - [restify](https://github.com/mcavage/node-restify) is a smallish framework, similar to express for building REST APIs.
 - [mongoose](https://github.com/LearnBoost/mongoose) is a MongoDB object modeling tool designed to work in an asynchronous environment.
 - [config](https://github.com/lorenwest/node-config) organizes hierarchical configurations for your app deployments.
 - [bunyan](https://github.com/trentm/node-bunyan) is a JSON logging library for node.js services
 - [pm2](https://github.com/Unitech/PM2/blob/development/ADVANCED_README.md) is a production process manager for Node.js applications with a built-in load balancer

#### Dev. dependencies
 - [supertest](https://github.com/tj/supertest) is a library for testing node.js HTTP servers using a fluent API
 - [gulp](http://gulpjs.com/) Automate and enhance your workflow
 - [gulp-jshint](https://github.com/spenceralger/gulp-jshint) is a tool that helps to detect errors and potential problems in your JavaScript code
 - [gulp-jscs](https://github.com/jscs-dev/gulp-jscs) is a code style linter for programmatically enforcing your style guide
 - [gulp-cucumber](https://github.com/vgamula/gulp-cucumber) gulp task for running cucumber.js features
 - [gulp-bump](https://github.com/stevelacy/gulp-bump) bump npm versions with Gulp
 - [gulp-git](https://github.com/stevelacy/gulp-git) is a git plugin for gulp
 - [gulp-tag-version](https://github.com/ikari-pl/gulp-tag-version) tag git repository with current package version
 - [pre-commit](https://github.com/observing/pre-commit) A better pre-commit hook for git

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

## Development

The `pre-commit` doesn't allow you to commit files with invalid format.
We use the [airbnb](https://github.com/airbnb/javascript) style guide.


#### Run the application

```sh
$ node src/server.js | node_modules/bunyan/bin/bunyan
```
*The bunyan pipe is only for read better the logs*

#### Run tests

```sh
$ npm test
```

#### Versioning

Versioning Used: [Semantic](http://semver.org/)

  - __major__: version when you make incompatible API changes, e.g. 1.0.0
  - __minor__: version when you add functionality in a backwards-compatible manner, e.g. 0.1.0
  - __patch__: version when you make backwards-compatible bug fixes, e.g. 0.0.1

##### Increase patch version

This command increases the package version, commits changes and create a tag for the new version.

```sh
$ npm run patch
```

##### Increase minor version

This command increases the package version, commits changes and create a tag for the new version.

```sh
$ npm run minor
```

##### Increase major version

This command increases the package version, commits changes and create a tag for the new version.

```sh
$ npm run major
```
