#!/usr/local/bin/node

const fs = require('fs')
const path = require('path')
const process = require('process')

const workshopPath = './workshops/example' // TODO: Make an argument

const isSlide = (module) => module.endsWith('.slide')

const readFile = (file) => fs.readFileSync(file).toString()

const readManifest = (moduleDir, basePath = process.env.NN_WORKSHOP_MODULES) => {
  const manifestPath = path.join(moduleDir, '.module')
  const entries = readFile(manifestPath).split('\n').filter((element) => element !== '');

  for (entry of entries) {
    if (isSlide(entry)) {
      console.log(`SLIDE -> ${entry}`)
      console.log(readFile(path.join(basePath, entry)))
    } else {
      console.log(`MODULE -> ${entry}`)
      const modulePath = path.join(process.env.NN_WORKSHOP_MODULES, entry)
      console.log(`PATH -> ${modulePath}`)
      readManifest(modulePath, modulePath)
    }
  }
}


readManifest(workshopPath, workshopPath)
