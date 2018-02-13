# react-lazyloading-images
Lazy loading image component for React

The main goal of this component is providing reliable, performance optimized, cross-browser, responsive and SEO friendly lazyloading images. It supports both - WebP and PNG image formats. It means you need to provide both image formats, accessible from your public directory. This component allows you to implement `low quality image placeholder` technic, which Medium.com uses.

WebP is widely supported by Chrome and Android browsers according to (https://caniuse.com/#feat=webp)[https://caniuse.com/#feat=webp] and it is much lighter format than PNG. Firefox and Safari are working on their implementation.

PNG is supported by all other browser vendors, and is known for smaller sizes and transparency, so it used as fallback.

Important! No other extensions like JPEG or GIF is supported, so please convert your images only to PNG and WEBP.

## Install

```
npm i -S react-lazyload-image
```
or
```
yarn add react-lazyload-image
```

## Example

```
import LazyImage from 'react-lazyloading-images'

const config = {
	mobile: { // screen width < 768px
		width: 50, // px value. type: number
		height: 50, // px value. type: number
    src: '/img/logo-50', // file name without extension. type: string
    placeholder: '/img/logo-50-placeholder' // file name without extension. type: string
	},
	portrait: { // screen width 768px > 1024px
		width: 75, // px value. type: number
		height: 75, // px value. type: number
    src: '/img/logo-75', // file name without extension. type: string
    placeholder: '/img/logo-75-placeholder' // file name without extension. type: string
	},
	landscape: { // screen width 1024px > 1280px
		width: 100, // px value. type: number
		height: 100, // px value. type: number
    src: '/img/logo-100', // file name without extension. type: string
    placeholder: '/img/logo-100-placeholder' // file name without extension. type: string
	},
	desktop: {  // screen width > 1280px
		width: 150, // px value. type: number
		height: 150, // px value. type: number
    src: '/img/logo-150', // file name without extension. type: string
    placeholder: '/img/logo-150-placeholder' // file name without extension. type: string
	}
}

const MyComponent = () => (
  <div>
		<LazyImage
			className='lazyImage' // type: string, optional, default value === ''
			alt='logo' // type: string, required.
			config={config} // required.
			rootMargin='500px 0px' // type: string, optional, default value === '300px 0px'.
			fallbackMargin={500} // type: number, optional, default value === 300
		/>
	</div>
)

export default MyComponent
```

## Important information:

Under the hood Lazy loading made with `IntersectionObserver` API, and fallback to standard scroll events only for legacy browsers.

If your images located in the view immediately, IntersectionObserver automatically replaces placeholder with src, but legacy browsers does not, so for this case we need to initiate lazyloading for those images.


Please follow the example above to initiate lazyloading support for legacy browsers. In your main file where you render React app you need to import initLazyLoadImages function and execute it after ReactDOM.render() you app.

```
import React from 'react'
import ReactDOM from 'react-dom'
import { initLazyLoadImages } from 'react-lazyloading-images'

import App from './app'

ReactDOM.render(
  <App />
  , document.getElementById('root')
)

initLazyLoadImages()

```

## Additional information:

You can use Gulp and gulp plugins to generate highly optimized PNG and WEBP assets.

I highly recommend you to use code below in separate directory from your main project, and copy results to your public directory, or if you want to use it in your own projrct, modify src and dist

First thing you need to do is install gulp and several plugins:

```
// npm i -D gulp gulp-webp gulp-imagemin gulp-rename gulp-image-resize
// Mac OS
// brew install imagemagick
// brew install graphicsmagick
// or
// Linux
// apt-get install imagemagick
// apt-get install graphicsmagick
// or
// Windows
// http://www.imagemagick.org/script/binary-releases.php
```
after that you need to create a `gulpfile.js` in the root directory, and create src and dest directories

```
const gulp = require('gulp')
const rename = require('gulp-rename')
const imagemin = require('gulp-imagemin')
const imageResize = require('gulp-image-resize')
const webp = require('gulp-webp')

const config = {
  placeholderSize: 48,
  src: 'src/*.png',
  dest: 'dest/',
  outputFormat: 'png',
  webp: false,
}

gulp.task('minify', () =>
  gulp
    .src(config.src)
    .pipe(imagemin({ progressive: true, verbose: true, optimizationLevel: 5 }))
    .pipe(gulp.dest(config.dest))
)

gulp.task('placeholder', () =>
  gulp
    .src(config.src)
    .pipe(imageResize({ width : config.placeholderSize, format: config.outputFormat }))
    .pipe(rename({ suffix: '-placeholder', dirname: '' }))
    .pipe(gulp.dest(config.dest))
)

gulp.task('webp', () =>
  gulp
    .src(config.src)
    .pipe(imagemin({ progressive: true, verbose: true, optimizationLevel: 5 }))
    .pipe(webp())
    .pipe(gulp.dest(config.dest))
)

gulp.task('default', ['minify', 'placeholder', 'webp'])
```

Paste your png files to src directory and run:

```
gulp
```

You can copy resulted png and webp and placeholder files from dest directory to your public directory and provide relative path as `src` and `placeholder` props for `<LazyImage>`
