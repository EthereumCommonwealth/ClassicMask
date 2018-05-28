var watchify = require('watchify')
var browserify = require('browserify')
var disc = require('disc')
var gulp = require('gulp')
var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var gutil = require('gulp-util')
var watch = require('gulp-watch')
var sourcemaps = require('gulp-sourcemaps')
var jsoneditor = require('gulp-json-editor')
var zip = require('gulp-zip')
var assign = require('lodash.assign')
var livereload = require('gulp-livereload')
var del = require('del')
var eslint = require('gulp-eslint')
var fs = require('fs')
var path = require('path')
var manifest = require('./app/manifest.json')
var gulpif = require('gulp-if')
var replace = require('gulp-replace')
var mkdirp = require('mkdirp')
var asyncEach = require('async/each')
var exec = require('child_process').exec

var disableDebugTools = gutil.env.disableDebugTools
var debug = gutil.env.debug

// browser reload

gulp.task('dev:reload', function() {
  livereload.listen({
    port: 35729,
  })
})


// copy static

gulp.task('copy:locales', copyTask({
  source: './app/_locales/',
  destinations: [
    './dist/firefox/_locales',
    './dist/chrome/_locales',
    './dist/edge/_locales',
    './dist/opera/_locales',
  ]
}))
gulp.task('copy:images', copyTask({
  source: './app/images/',
  destinations: [
    './dist/firefox/images',
    './dist/chrome/images',
    './dist/edge/images',
    './dist/opera/images',
  ],
}))
gulp.task('copy:contractImages', copyTask({
  source: './node_modules/eth-contract-metadata/images/',
  destinations: [
    './dist/firefox/images/contract',
    './dist/chrome/images/contract',
    './dist/edge/images/contract',
    './dist/opera/images/contract',
  ],
}))
gulp.task('copy:fonts', copyTask({
  source: './app/fonts/',
  destinations: [
    './dist/firefox/fonts',
    './dist/chrome/fonts',
    './dist/edge/fonts',
    './dist/opera/fonts',
  ],
}))
gulp.task('copy:reload', copyTask({
  source: './app/scripts/',
  destinations: [
    './dist/firefox/scripts',
    './dist/chrome/scripts',
    './dist/edge/scripts',
    './dist/opera/scripts',
  ],
  pattern: '/chromereload.js',
}))
gulp.task('copy:root', copyTask({
  source: './app/',
  destinations: [
    './dist/firefox',
    './dist/chrome',
    './dist/edge',
    './dist/opera',
  ],
  pattern: '/*',
}))

gulp.task('manifest:chrome', function() {
  return gulp.src('./dist/chrome/manifest.json')
  .pipe(jsoneditor(function(json) {
    delete json.applications
    return json
  }))
  .pipe(gulp.dest('./dist/chrome', { overwrite: true }))
})

gulp.task('manifest:opera', function() {
  return gulp.src('./dist/opera/manifest.json')
  .pipe(jsoneditor(function(json) {
    json.permissions = [
      "storage",
      "tabs",
      "clipboardWrite",
      "clipboardRead",
      "http://localhost:8545/"
    ]
    return json
  }))
  .pipe(gulp.dest('./dist/opera', { overwrite: true }))
})

gulp.task('manifest:production', function() {
  return gulp.src([
    './dist/firefox/manifest.json',
    './dist/chrome/manifest.json',
    './dist/edge/manifest.json',
    './dist/opera/manifest.json',
  ],{base: './dist/'})

  // Exclude chromereload script in production:
  .pipe(gulpif(!debug,jsoneditor(function(json) {
    json.background.scripts = json.background.scripts.filter((script) => {
      return !script.includes('chromereload')
    })
    return json
  })))

  .pipe(gulp.dest('./dist/', { overwrite: true }))
})

const staticFiles = [
  'locales',
  'images',
  'fonts',
  'root'
]

var copyStrings = staticFiles.map(staticFile => `copy:${staticFile}`)
copyStrings.push('copy:contractImages')

if (debug) {
  copyStrings.push('copy:reload')
}

gulp.task('copy', gulp.series(gulp.parallel(...copyStrings), 'manifest:production', 'manifest:chrome', 'manifest:opera'))
gulp.task('copy:watch', function(){
  gulp.watch(['./app/{_locales,images}/*', './app/scripts/chromereload.js', './app/*.{html,json}'], gulp.series('copy'))
})

// record deps

gulp.task('deps', function (cb) {
  exec('npm ls', (err, stdoutOutput, stderrOutput) => {
    if (err) return cb(err)
    const browsers = ['firefox','chrome','edge','opera']
    asyncEach(browsers, (target, done) => {
      fs.writeFile(`./dist/${target}/deps.txt`, stdoutOutput, done)
    }, cb)
  })
})

// lint js

gulp.task('lint', function () {
  // Ignoring node_modules, dist/firefox, and docs folders:
  return gulp.src(['app/**/*.js', 'ui/**/*.js', 'mascara/src/*.js', 'mascara/server/*.js', '!node_modules/**', '!dist/firefox/**', '!docs/**', '!app/scripts/chromereload.js', '!mascara/test/jquery-3.1.0.min.js'])
    .pipe(eslint(fs.readFileSync(path.join(__dirname, '.eslintrc'))))
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError())
});

gulp.task('lint:fix', function () {
  return gulp.src(['app/**/*.js', 'ui/**/*.js', 'mascara/src/*.js', 'mascara/server/*.js', '!node_modules/**', '!dist/firefox/**', '!docs/**', '!app/scripts/chromereload.js', '!mascara/test/jquery-3.1.0.min.js'])
    .pipe(eslint(Object.assign(fs.readFileSync(path.join(__dirname, '.eslintrc')), {fix: true})))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
});

/*
gulp.task('default', ['lint'], function () {
    // This will only run if the lint task is successful...
});
*/

// build js

const jsFiles = [
  'inpage',
  'contentscript',
  'background',
  'popup',
]

// bundle tasks

var jsDevStrings = jsFiles.map(jsFile => `dev:js:${jsFile}`)
var jsBuildStrings = jsFiles.map(jsFile => `build:js:${jsFile}`)

jsFiles.forEach((jsFile) => {
  gulp.task(`dev:js:${jsFile}`,   bundleTask({ watch: true,  label: jsFile, filename: `${jsFile}.js` }))
  gulp.task(`build:js:${jsFile}`, bundleTask({ watch: false, label: jsFile, filename: `${jsFile}.js` }))
})

// inpage must be built before all other scripts:
const firstDevString = jsDevStrings.shift()
gulp.task('dev:js', gulp.series(firstDevString, gulp.parallel(...jsDevStrings)))

// inpage must be built before all other scripts:
const firstBuildString = jsBuildStrings.shift()
gulp.task('build:js',  gulp.series(firstBuildString, gulp.parallel(...jsBuildStrings)))

// disc bundle analyzer tasks

jsFiles.forEach((jsFile) => {
  gulp.task(`disc:${jsFile}`,   discTask({ label: jsFile, filename: `${jsFile}.js` }))
})

gulp.task('disc', gulp.parallel(jsFiles.map(jsFile => `disc:${jsFile}`)))


// clean dist


gulp.task('clean', function clean() {
  return del(['./dist/*'])
})

// zip tasks for distribution
gulp.task('zip:chrome', zipTask('chrome'))
gulp.task('zip:firefox', zipTask('firefox'))
gulp.task('zip:edge', zipTask('edge'))
gulp.task('zip:opera', zipTask('opera'))
gulp.task('zip', gulp.parallel('zip:chrome', 'zip:firefox', 'zip:edge', 'zip:opera'))

// high level tasks

gulp.task('dev', gulp.series('dev:js', 'copy', gulp.parallel('copy:watch', 'dev:reload')))

gulp.task('build', gulp.series('clean', gulp.parallel('build:js', 'copy', 'deps')))
gulp.task('dist', gulp.series('build', 'zip'))

// task generators

function copyTask(opts){
  var source = opts.source
  var destination = opts.destination
  var destinations = opts.destinations || [ destination ]
  var pattern = opts.pattern || '/**/*'

  return performCopy

  function performCopy(){
    let stream = gulp.src(source + pattern, { base: source })
    destinations.forEach(function(destination) {
      stream = stream.pipe(gulp.dest(destination))
    })
    stream.pipe(gulpif(debug,livereload()))

    return stream
  }
}

function zipTask(target) {
  return () => {
    return gulp.src(`dist/${target}/**`)
    .pipe(zip(`metamask-${target}-${manifest.version}.zip`))
    .pipe(gulp.dest('builds'));
  }
}

function generateBundler(opts, performBundle) {
  const browserifyOpts = assign({}, watchify.args, {
    entries: ['./app/scripts/'+opts.filename],
    plugin: 'browserify-derequire',
    debug: debug,
    fullPaths: debug,
  })

  let bundler = browserify(browserifyOpts)

  if (opts.watch) {
    bundler = watchify(bundler)
    // on any file update, re-runs the bundler
    bundler.on('update', performBundle)
  }

  return bundler
}

function discTask(opts) {
  const bundler = generateBundler(opts, performBundle)
  // output build logs to terminal
  bundler.on('log', gutil.log)

  return performBundle

  function performBundle(){
    // start "disc" build
    let discDir = path.join(__dirname, 'disc')
    mkdirp.sync(discDir)
    let discPath = path.join(discDir, `${opts.label}.html`)

    return (
      bundler.bundle()
      .pipe(disc())
      .pipe(fs.createWriteStream(discPath))
    )
  }
}


function bundleTask(opts) {
  const bundler = generateBundler(opts, performBundle)
  // output build logs to terminal
  bundler.on('log', gutil.log)

  return performBundle

  function performBundle(){
    return (

      bundler.bundle()

      // handle errors
      .on('error', (err) => {
        beep()
        if (opts.watch) {
          console.warn(err.stack)
        } else {
          throw err
        }
      })

      // convert bundle stream to gulp vinyl stream
      .pipe(source(opts.filename))
      // inject variables into bundle
      .pipe(replace('\'GULP_METAMASK_DEBUG\'', debug))
      // buffer file contents (?)
      .pipe(buffer())
      // sourcemaps
      // loads map from browserify file
      .pipe(gulpif(debug, sourcemaps.init({ loadMaps: true })))
      // writes .map file
      .pipe(gulpif(debug, sourcemaps.write('./')))
      // write completed bundles
      .pipe(gulp.dest('./dist/firefox/scripts'))
      .pipe(gulp.dest('./dist/chrome/scripts'))
      .pipe(gulp.dest('./dist/edge/scripts'))
      .pipe(gulp.dest('./dist/opera/scripts'))
      // finally, trigger live reload
      .pipe(gulpif(debug, livereload()))

    )
  }
}

function beep () {
  process.stdout.write('\x07')
}
