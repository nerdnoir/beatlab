A simple content manager built on top of reveal.js.

# Install

```bash
npm install
```

# Configure

```bash
export BEATLAB_HOME=/absoute/path/to/my/modules
export BEATLAB_PORT= 7777
```

# Building a Docker Image

```bash
docker build -t username/presentation-name .
docker run -it --rm -p 7777:7777 --name my-container username/presentation-name
```
