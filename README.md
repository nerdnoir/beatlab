# Beatlab

A simple content manager built on top of reveal.js.

## Install

```bash
npm install -g @nerdnoir/beatlab
```

## Usage

Define a module in the module path (see below). Here's an example
module:

```yaml
title: My Workshop
author: Dave Laribee
classes: [dark]
tags: ['exercise', 'practice', 'beginner']
description: Let's learn all about something new.
sections:
  - slide: title.md
  - slide: setup.html
  - slide: image1.png
  - slide: image1.gif
  - slide: image1.jpg
  - slide: image1.jpeg
  - module: /example-module/sub/sub/
  - slide: feedback.md
  - slide: P6yV9qY9g0I.youtube
  - module: /about/

```

From there, follow the help: `beatlab --help`

The main command, `beatlab mix <module> <buildDir>`, will read the
named module and stitch together a slideshow from slides and referenced modules
defined in the module.yml manifest.

## Configure the Module Path

Modules contain sections which are slides or references to
other modules. Beatlab will attempt to resolves modules based
on `$PWD/modules/`.

Optionally, you can set a global module path using an
enviroment variable `$BEATLAB_HOME'.

```bash
export BEATLAB_HOME=/absoute/path/to/my/modules
```

## License

[MIT](../blob/master/LICENSE)