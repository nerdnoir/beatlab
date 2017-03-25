#!/usr/local/bin/node

const fs = require('fs')
const path = require('path')
const process = require('process')
const handlebars = require('handlebars')

const workshopPath = process.argv[2]
const buildDir = process.argv[3]

const isSlide = (module) => {
  if (module.endsWith('.slide')) return true;
  if (module.endsWith('.md')) return true;
  return false;
}

const readFile = (file) => fs.readFileSync(file).toString()
const writeFile = (filePath, data) => fs.writeFileSync(filePath, data)

const getTemplate = (name = 'index') => {
  const templateSource = readFile(path.join(__dirname, 'templates', `${name}.html`))
  return handlebars.compile(templateSource)
}

const slides = []
const copyDirs = []

const readManifest = (moduleDir, basePath = process.env.NN_WORKSHOP_MODULES) => {
  const manifestPath = path.join(moduleDir, '.module')
  const entries = readFile(manifestPath).split('\n').filter((element) => element !== '')

  for (let entry of entries) {
    if (isSlide(entry)) {
      console.log(`SLIDE -> ${entry}`)
      const filePath = path.join(basePath, entry)
      const raw = readFile(filePath)
      const slide = raw.replace('$module_dir', './') // FIGURE OUT
      // if (entry.match(/\.md/))
      slides.push(slide)
    } else {
      const modulePath = path.join(process.env.NN_WORKSHOP_MODULES, entry)
      const copyDir = path.relative(process.env.NN_WORKSHOP_MODULES, modulePath)
      console.log(`MODULE -> ${copyDir}`)

      copyDirs.push({source: modulePath, target: path.join(buildDir, copyDir)})
      slides.push("<section>")
      readManifest(modulePath, modulePath)
      slides.push("</section>")
    }
  }
}

readManifest(workshopPath, workshopPath)

const renderedSlides = slides.join('\n')


const viewer = getTemplate('index')
const presenter = getTemplate('master')

writeFile(path.join(buildDir, 'index.html'), viewer({ slides: renderedSlides }))
writeFile(path.join(buildDir, 'master.html'), presenter({ slides: renderedSlides }))

console.log(copyDirs)
