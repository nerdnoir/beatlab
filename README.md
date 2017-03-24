# How to

NN_WORKSHOP_MODULES=$HOME/projects/workshops/modules/content/ ./build.js

# NN Workshop Lab

"Lab" stores workshop content in reusuable chunks called "modules" and "elements."

A module is a cohesive flow of elements. Modules are the fundamental unit of reuse in
our workshops. A module is:

1. A folder using a slug-like, dash-delited format. For example: double-loop-tdd,
  versionone-tdd-story, git-team-practices-exercise
2. A JSON manifest that contains: name, description, tags, and template reference.

Modules cannot be nested, but they can be grouped in directories.

Modules have a template that produces a DOM fragment and script bundle for inclusion
in a workshop's slide deck.

There are several types of elements:

1. Slide (ext: .slide) - a free-form, anything goes reveal.js slide.
1. Section (ext: .section) - a section of reveal.js slides
1. Code snippit (ext: .js|.cs|.java|.py|.ruby) - a piece of code that will automatically be pulled into a reveal.js slide
1. Working directory - (directory) a self-contained project directory with artifacts pre-populated.
1. Handout - (.handout) A handout (a slide with a link that opens in a new tab).
1. References - (.references) citations, credits, recommendations, resources.
1. Module Links (.link) - a link to another module.

Every module directory must have a .elements file that lists files (one line-per-element).
The order of elements determins the order of slides in a reveal.js section.

Workshops are composed of modules in a sequence. A workshop may contain modules as sub-directories
within it's own directory. This is a good way to customize a workshop with title slides, feedback
form links, etc. and it's useful in evolving early modules into more general purpose ones.

To create a workshop:

1. export NN_WORKSHOP_LAB="~/path/to/this/repo"
1. Create a new git repo for your workshop
1. `$ cd your-new-workshop-repo && touch .modules && vim .modules`
1. Specify module name in slug-like format, e.g. versionone-tdd-story
1. $ `NN_WORKSHOP_LAB/build #(from within the workshop directory)`
