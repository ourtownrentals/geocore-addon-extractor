# GeoCore Addon Extractor

## Description

Extracts source files from a zip archive into a local source folder
and normalized the code formatting.

Designed to be used for official [GeoCore] software and addons.

[GeoCore]: https://geodesicsolutions.com/

## Installation

Add this and [gulp] as a development dependency to your project using [npm] with

```
$ npm install --save-dev gulp gulp-cli @ourtownrentals/geocore-addon-exractor
```

or using [Yarn] with

```
$ yarn add --dev gulp gulp-cli @ourtownrentals/geocore-addon-exractor
```

[gulp]: https://gulpjs.com/
[npm]: https://www.npmjs.com/
[Yarn]: https://yarnpkg.com/

## Usage

In `package.json` add

```
{
  "scripts": {
    "presrc": "gulp clean",
    "src": "gulp extract",
    "postsrc": "gulp process"
  },
  "geocore": {
    "version": "1.0.0",
    "archive": "Geodesic_core_full_install_zipped_v",
    "root": "core",
    "src": "src",
    "binary": [
      "zend.php"
    ]
  }
}
```

Then create `gulpfile.js` with

```js
'use strict'

const fs = require('fs')
const path = require('path')

const gulp = require('gulp')

const addonExtractor = require('@ourtownrentals/geocore-addon-extractor').default

const pkg = JSON.parse(fs.readFileSync(
  path.resolve(__dirname, 'package.json')
))

addonExtractor(pkg.geocore).map(({name, task}) => gulp.task(name, task))
```

## Source Code

The [geocore-addon-exractor source] is hosted on GitHub.
Clone the project with

```
$ git clone https://github.com/ourtownrentals/geocore-addon-exractor.git
```

[geocore-addon-exractor source]: https://github.com/ourtownrentals/geocore-addon-exractor

## Contributing

Please submit and comment on bug reports and feature requests.

To submit a patch:

1. Fork it (https://github.com/ourtownrentals/geocore-addon-exractor/fork).
2. Create your feature branch (`git checkout -b my-new-feature`).
3. Make changes.
4. Commit your changes (`git commit -am 'Add some feature'`).
5. Push to the branch (`git push origin my-new-feature`).
6. Create a new Pull Request.

## License

This npm package is licensed under the MIT license.

## Warranty

This software is provided by the copyright holders and contributors "as is" and
any express or implied warranties, including, but not limited to, the implied
warranties of merchantability and fitness for a particular purpose are
disclaimed. In no event shall the copyright holder or contributors be liable for
any direct, indirect, incidental, special, exemplary, or consequential damages
(including, but not limited to, procurement of substitute goods or services;
loss of use, data, or profits; or business interruption) however caused and on
any theory of liability, whether in contract, strict liability, or tort
(including negligence or otherwise) arising in any way out of the use of this
software, even if advised of the possibility of such damage.
