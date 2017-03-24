#!/usr/local/bin/node

const fs = require('fs')
const path = require('path')
const process = require('process')

console.log(process.argv1)
const workshopPath = './workshops/example' // TODO: Make an argument

const isSlide = (module) => module.endsWith('.slide')

const readFile = (file) => fs.readFileSync(file).toString()

const slides = []

const readManifest = (moduleDir, basePath = process.env.NN_WORKSHOP_MODULES) => {
  const manifestPath = path.join(moduleDir, '.module')
  const entries = readFile(manifestPath).split('\n').filter((element) => element !== '')

  for (entry of entries) {
    if (isSlide(entry)) {
      console.log(`SLIDE -> ${entry}`)
      const slide = readFile(path.join(basePath, entry)).replace('$module_dir', path.relative(workshopPath, basePath))
      slides.push(slide)
    } else {
      const modulePath = path.join(process.env.NN_WORKSHOP_MODULES, entry)
      console.log(`MODULE -> ${modulePath}`)
      readManifest(modulePath, modulePath)
    }
  }
}


readManifest(workshopPath, workshopPath)

console.log(slides.join('\n'))
