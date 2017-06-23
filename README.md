Wpromote StarWars App
======================
Production Site: https://wpromote.herokuapp.com/#/

## Contents
  1. [Dependencies](#dependencies)
  1. [Deploy DataBase Locally](#deploy-database-locally)
  1. [Run Site](#run-site)
  1. [Build Scripts](#build-Scripts)

## Dependencies
#### Web Server
* Node v7.9.0

#### NPM Packages
* express 4.15.3
* mongodb 2.2.29
* body-parser 1.17.2
* q 1.5.0

* react 15.6.1
* react-dom 15.6.1
* react-router-dom 4.1.1
  
* gulp 3.9.1
* gulp-babel 6.1.2
* babel-preset-react 6.24.1
* babel-preset-es2015 6.24.1

* browserify 14.4.0
* babelify 7.3.0
* watchify 3.9.0
* vinyl-source-stream 1.1.0
* vinyl-buffer 1.0.0
* gulp-uglify 3.0.0
* gulp-sourcemaps 2.6.0

**Install Dependencies**
```bash
$ npm i
```

## Deploy DataBase Locally
- Requires MongoDB version v3.4.4

- **Install MongoDB**
_MacOS X_
```bash
$ brew update
$ brew install mongodb --with-openssl
```

- **Create data Directory**
```bash
$ mkdir -p /data/db
```
requires _Super User_ rights

- *Start MongoDB daemon*
```bash
$ mongod --dbpath /data/db
```

## Run Site
Run Development Site
**Requires MongoDB to be installed, see Deploy DataBase Locally**
```bash
$ node wpromote_starwars_devel.js
```

wpromote_starwars_prod.js can be deployed too, but it's meant to be run
on the heroku server, so contains enviromental configurations meant to
be used with heroku.

## Build Scripts
- *Install Gulp*
_MaxOS X_
```bash
$ npm install gulp-cli -g
$ npm install gulp -D
```

## Tasks
* Build
```bash
$ gulp build
```
Builds and Bundles the javascript and jsx files

* Watch
```bash
$ gulp watch
```
Watches for changes in the javascript and jsx files and automatically
transpiles






