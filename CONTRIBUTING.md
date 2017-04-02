# Contributing

1.  Fork the project and clone your fork.

1.  Install dependencies

        $ cd CLONED_REPO && npm install .

1.  Create a local feature branch:

        $ git checkout -b <branch>

1.  Make one or more atomic commits. Each commit should have a descriptive
    commit message, wrapped at 72 characters. Do not commit changes to
    __dist/ramda.js__.

5.  Run `npm test` (or `make test lint`) and address any errors. It will install
    needed dependencies locally.  Preferably, fix commits in place using `git
    rebase` or `git commit --amend` to make the changes easier to review and to
    keep the history tidy.

6.  Push to your fork:

        $ git push origin <branch>

7.  Open a pull request.
