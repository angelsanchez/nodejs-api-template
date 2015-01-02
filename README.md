nodejs-api-template
===================

An archetype of a Node JS API server. Use it as a template project when you want to start a new project.


## Read logs

Show app stdout logs:

```sh
$ node server.js  | bunyan -o short
```

Show errors in http requests:

```sh
$ tail -f <config.log.path> | bunyan -c 'this.res && this.res.statusCode >= 500'
```
