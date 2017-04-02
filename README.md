Beatlab
=======

Beatlab is a simple content manager built on top of [reveal.js](https://github.com/hakimel/reveal.js/). It is useful for speakers who have a lot of content that they'd like to reuse and mix into new or customized talks or workshops.

Install
-------

```bash
npm install -g @nerdnoir/beatlab
```

Usage
-----

Define a module in the module path (see below).

Here's an example to get you started:

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

Configure the Module Path
-------------------------

Modules contain sections which are slides or references to
other modules. Beatlab will attempt to resolves modules based
on `$PWD/modules/`.

Optionally, you can set a global module path using an
enviroment variable `$BEATLAB_HOME`.

```bash
# Put this in your .bashrc or .zshrc
export BEATLAB_HOME=/absoute/path/to/my/modules

# Or set the variable when running beatlab
BEATLAB_HOME=$HOME/my-modules beatlab mix my-talk ./talks/my-talk
```

Contributing
------------

Please read the [contributing guide](./CONTRIBUTING.md) before submitting a pull request.

License
-------

Beatlab is licensed under [the MIT license](./LICENSE.md)
&copy; 2017 Nerd/Noir, LLC.
