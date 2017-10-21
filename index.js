'use strict'

const del = require('del')
const gulp = require('gulp')

const gulpFilter = require('gulp-filter')
const gulpRename = require('gulp-rename')
const gulpReplace = require('gulp-replace')
const gulpVinylZip = require('gulp-vinyl-zip')

const binaryDefault = [
  'eot',
  'gif',
  'jpg',
  'png',
  'psd',
  'swf',
  'ttf',
  'woff',
  'woff2',
  'xap',
  'xcf'
]

const tasks = ({
  root = 'core',
  src = 'src',
  binary = [],
  version =  null,
  archive = null
}) => {
  if (!version) throw new Error('Missing version config')
  if (!archive) throw new Error('Missing archive config')

  const nonBinary = [...binaryDefault, ...binary].map(str => `!**/*.${str}`)

  const cleanTask = () => del(src)

  const extractTask = () => (
    gulpVinylZip.src(`${archive}${version}.zip`)
      .pipe(gulpFilter(['**/*', '!**/*/Thumbs.db']))
      .pipe(gulpRename(path => {
        path.dirname = path.dirname.replace(new RegExp(`^${root}`), '')
        return path
      }))
      .pipe(gulp.dest(src))
  )

  const processTask = () => {
    const phpFilter = gulpFilter('**/*.php', {restore: true})

    return gulp.src(['src/**/*'].concat(nonBinary))
      .pipe(gulpReplace('\r\n', '\n'))
      .pipe(gulpReplace('\r', '\n'))
      .pipe(phpFilter)
      .pipe(gulpReplace('\t', '    '))
      .pipe(phpFilter.restore)
      .pipe(gulpReplace('\t', '  '))
      .pipe(gulpReplace(/ +$/gm, ''))
      .pipe(gulpReplace(/([^\n])$/, '$1\n'))
      .pipe(gulp.dest(src))
  }

  return [
    {name: 'clean', task: cleanTask},
    {name: 'extract', task: extractTask},
    {name: 'process', task: processTask}
  ]
}

module.exports = {
  default: tasks
}
