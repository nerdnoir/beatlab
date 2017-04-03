[![Build Status](https://travis-ci.org/nerdnoir/beatlab.svg?branch=master)](https://travis-ci.org/nerdnoir/beatlab) [![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Beatlab
=======

Beatlab is a simple content manager built on top of [reveal.js](https://github.com/hakimel/reveal.js/). It is useful for speakers who have a lot of content that they'd like to reuse and mix into new or customized talks or workshops.

Install
-------

```bash
npm install -g beatlab
```

Usage
-----

First you can define a module in the module path (see below).

Here's an example module manifest to get you started:

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
defined in the module.yml manifest. In `<buildDir>` you will find a complete
[reveal.js](https://github.com/hakimel/reveal.js/) slide deck. The `index.html`
file was rendered by Beatlab and contains your show.


If you have cloned this repo, this command will build an
example module we use to test Beatlab:

```bash
$ rm -rf build && beatlab mix example-module ./build && open ./build/index.html
```

Configure Your Module Path
-------------------------

Modules contain sections which are slides or references to
other modules. This allows you to keep your library of slides and
modules private, if that's your thing.

Beatlab will automatically attempt to resolves modules based
on `$PWD/modules/`.

Optionally, you can set a global module path using an
enviroment variable `$BEATLAB_HOME`. Use this to point to
another git repo containing reusable slides and modules.

```bash
# Put this in your .bashrc or .zshrc
export BEATLAB_HOME=/absoute/path/to/my/modules

# Or set the variable when running beatlab
BEATLAB_HOME=$HOME/my-modules beatlab mix my-talk ./talks/my-talk
```

Contributing
------------

Pull requests are welcome. Please read ["How to Contribute"](./CONTRIBUTING.md) before submitting a pull request.

License
-------

Beatlab is licensed under [the MIT license](./LICENSE.md)
&copy; 2017 Nerd/Noir, LLC.
