var fs = require('fs-extra')
var path = require('path')
var spawn = require('child_process').spawn
var processRoot = process.cwd()
var testFolder = path.join(processRoot, '/test')

function installSample (type) {
  return new Promise(function (resolve, reject) {
    console.log('installing sample')
    var install = spawn('vue-build', ['init', `-s=${type}`], { stdio: 'inherit' })

    install.on('close', (code) => {
      console.log(`finished installing sample`)
      resolve()
    })
  })
}

function installPackages () {
  return new Promise(function (resolve, reject) {
    console.log('package installation')
    var install = spawn('yarn', ['install'], { stdio: 'inherit' })

    install.on('close', (code) => {
      console.log(`finished installing packages`)
      resolve()
    })
  })
}

function production () {
  return new Promise(function (resolve, reject) {
    console.log('building dist')
    var prod = spawn('vue-build', ['prod'], { stdio: 'inherit' })

    prod.on('close', (code) => {
      console.log(`finished building dist`)
      resolve()
    })
  })
}

function test (type) {
  return new Promise(function (resolve, reject) {
    console.log('testing app')
    var prod = spawn('vue-build', [type], { stdio: 'inherit' })

    prod.on('close', (code) => {
      console.log(`finished testing app`)
      resolve()
    })
  })
}

function simple () {
  return new Promise(function (resolve, reject) {
    process.chdir(processRoot)
    fs.emptyDir(testFolder, function (err) {
      if (err) { console.error(err) }

      process.chdir(testFolder)

      installSample('simple')
      .then(function () {
        return installPackages()
      })
      .then(function () {
        return production()
      })
      .then(function () {
        resolve()
      })
    })
  })
}

function full () {
  return new Promise(function (resolve, reject) {
    process.chdir(processRoot)
    fs.emptyDir(testFolder, function (err) {
      if (err) { console.error(err) }

      process.chdir(testFolder)

      installSample('full')
      .then(function () {
        return installPackages()
      })
      .then(function () {
        return production()
      })
      .then(function () {
        return test('unit')
      })
      .then(function () {
        return test('e2e')
      })
      .then(function () {
        resolve()
      })
    })
  })
}

// Run samples one at a time
simple()
.then(function () {
  return full()
})