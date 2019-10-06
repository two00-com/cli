# @two00/cli

[![npm](https://img.shields.io/npm/v/@two00/cli.svg?style=flat-square)](https://www.npmjs.com/package/@two00/cli)
[![Travis branch](https://img.shields.io/travis/two00-com/cli/master.svg?style=flat-square)](https://travis-ci.org/two00-com/cli)
[![Codecov branch](https://img.shields.io/codecov/c/github/two00-com/cli/master.svg?style=flat-square)](https://codecov.io/gh/two00-com/cli)

> The public cli tool for [two00](https://two00.com)

## Table of Contents

- [Installation](#installation)
- [Use without two00](#use-without-two00)
- [Commands](#commands)
  - [two00 server-monitor](#two00-server-monitor)
  - [two00 version](#two00-version)
  - [two00 --help](#two00---help)

## Installation

```sh
$ npm i -g @two00/cli
```

## Commands

`@two00/cli` was build to be as simple as possible, so there are just a few commands you need to know:

- [two00 server-monitor < id > [ options ]](#two00-server-monitor)
- [two00 version](#twoo00-version)

### two00 server-monitor

With `two00 server-monitor < id > [ options ]` you will ping the two00 api and report the servers health-check status.

- **command**: `two00 server-monitor < id > [ options ]`
- **alias**: `two00 sm < id > [ options ]`

**Usage**

```sh
# collects information about cpu, memory and disc space and `POST` it to the two00 api
$ two00 server-monitor < id > [ options ]
```

**Usage with a cron job**:

Open your crontab with the default editor:

```sh
$ crontab -e
```

Add the following line to the crontab:

```sh
* * * * * two00 server-monitor UUID > /dev/null 2>&1
```

> make sure to replace UUID with the UUID of your server monitor of two00

#### < id >

The `< id >` represents the id of your two00 server monitor.

- **type**: `UUID`
- **required**: `true`
- **default**: `undefined`

#### [ options ]

The `[ options ]` represents optional flags that can be passed to this command.

##### --url

The `--url` represents the `baseUrl (https://example.com)` which is used to `POST` the systeminformation.

- **type**: `URL`
- **required**: `false`
- **default**: `https://two00-api.systemlab.info`

##### --route

The `--route` represents the `path (/my-path/path)` which is used to `POST` the systeminformation.

- **type**: `String`
- **required**: `false`
- **default**: `/rest/health-check`

###### Tasks

There are a few tasks `two00 server-monitor < id > [ options ]` will do for you:

- runs the functions `currentLoad`, `mem`, and `fsSize` of the [systeminformation package (to see what information gets collected click here)](https://github.com/sebhildebrandt/systeminformation)
- `POST` the collected information to the two00 api

### two00 version

With `two00 version` you can output the version of the currently installed `@two00/cli`.

- **command**: `two00 version`

**Usage**

```sh
# current installed version of `@two00/cli`
$ two00 version
```

### two00 --help

With `two00 --help` you can output the usage of the currently installed `@two00/cli`.

- **command**: `two00 --help`

**Usage**

```sh
# usage of `@two0/cli`
$ two00 --help
```

## Use without two00

This software was built with the intend to be used with [two00](#https://two00.com), however you are not bound to any limitations whatsoever, except to the terms under the [MIT © Lukas Aichbauer](LISENCE).

If you wish to report to another server make use of [--url](#--url) to change the `baseUrl` of the request and [--route](#--route) (make sure to handle the request on the server correctly), or simply fork this repo and build your own solution.

## LICENSE

MIT © Lukas Aichbauer
