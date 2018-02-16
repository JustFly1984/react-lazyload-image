# react-lazyloading-images
Lazy loading image component for React

The main goal of this component is providing reliable, performance optimized, cross-browser, responsive and SEO friendly lazyloading images.
It supports WebP image format for Google Chrome and Android and JPEG or PNG for other browsers. It means you need to provide both image formats, accessible from your public directory. This component allows you to implement blurry `low quality image placeholder` technic, which Medium.com uses.

WebP is widely supported by Chrome and Android browsers according to [https://caniuse.com/#feat=webp](https://caniuse.com/#feat=webp) and it is much lighter format than any other image standard. Firefox and Safari are working on their implementation.

You can provide breakpoints array with objects, to serve smaller images for mobile users and bigger images for desktop users. You can orchestrate unique user experience by providing variable images, depending on user device.

## 1. Install

```
npm i -S react-lazyloading-images
```
or
```
yarn add react-lazyloading-images
```

## 2. Examples

You can use `LazyImage` component in two ways, Basic and Advanced

```
import LazyImage from 'react-lazyloading-images'

const BasicLazyImage = () => (
	<LazyImage
    path='/images/logo.{png|jpe?g}' // type: String, if breakpoints array provided - optional
    blur='/images/logo-blur.{png|jpe?g}' // type: String, if breakpoints array provided - optional,
    width=100 // type: number, if breakpoints array provided - optional. default value 48,
    height=100 // type: number, if breakpoints array provided - optional. default value 48,
		className='lazyImage' // type: String, optional, default value === ''
    title='logo' // type: String, optional, default value === ''
		alt='logo' // type: String, required.
	/>
)

const AdvancedLazyImage = () => (
	<LazyImage
		className='lazyImage' // type: String, optional, default value === ''
    title='logo' // type: String, optional, default value === ''
		alt='logo' // type: String, required.
		breakpoints={[
      {
        media: '(max-width: 767px)', // type: String
        path: '/img/logo-mobile.jpeg', // type: String
        blur: '/img/logo-mobile-blur.jpeg', // type: String
        width: 50, // type: Number,
        height: 50 // type: Number
      },
      {
        media: '(min-width: 768px) and (max-width: 1279px)',  // type: String
        path: '/img/logo-tablet.jpeg',  // type: String
        blur: '/img/logo-tablet-blur.jpeg',  // type: String
        width: 75, // type: Number,
        height: 75 // type: Number
      },
      {
        media: '(min-width: 1280px)',
        path: '/img/logo-desktop.jpeg',
        blur: '/img/logo-desktop-blur.jpeg',
        width: 100, // type: Number,
        height: 100 // type: Number
      }
    ]} // optional.
    style={{ width: '100%', height: 'auto' }} // type: object, optional
		rootMargin='500px 0px' // type: String, optional, default value === '300px 0px'
	/>
)
```

## 3. Important information:

Under the hood Lazy loading made with `IntersectionObserver` API and uses npm `intersection-observer` polyfill as fallback.

media prop should be compatible with Window.matchMedia API [https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia)


## 4. Additional information:

You can use Gulp and gulp plugins to generate highly optimized PNG and WEBP assets.

I highly recommend you to use code below in separate directory from your main project, and copy results to your public directory, or if you want to use it in your own project, modify src and dist.

First thing you need to do is install gulp and several plugins:

```
npm i -D gulp gulp-webp gulp-imagemin gulp-rename gulp-image-resize

Mac OS
brew install imagemagick
brew install graphicsmagick

Linux
apt-get install imagemagick
apt-get install graphicsmagick

Windows
http://www.imagemagick.org/script/binary-releases.php
```

Next step is `gulpfile.js` in the root directory, and make src and dest directories:

```
mkdir src && mkdir dest
```

gulpfile.js content:
```
const gulp = require('gulp')
const rename = require('gulp-rename')
const imagemin = require('gulp-imagemin')
const imageResize = require('gulp-image-resize')
const webp = require('gulp-webp')

const config = {
  placeholderSize: 48,
  src: 'src/*.{png|jpe?g}',
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

For each source image you will get 3 asset images. For example if you provide `logo.png` in `/src/`, you will get production optimized `logo.png`, `logo.webp` and `logo-placeholder.png`.

You need to copy all 3 files to your `./public/` directory, and specify relative `path` prop for `<LazyImage />` without suffix and extension.
Suffix will be generated for free.

If your images path is `/public/images/logo.png`, you need to set `path` prop as in example below:

```
<LazyImage
  path='/images/logo.jpg'
  blur='/images/logo-blur.jpg'
  width=100
  height=100
  alt='logo'
/>
```

You can provide any other attributes as props, and it will be set to `<img />` tag.

For WebP suport detection, you can import boolean value `isWebPSupported` from the package.

```
import { isWebPSupported } from 'react-lazyloading-images'
```

If you have any questions or ideas how to improve the package, please make an issue in github repository.
[https://github.com/JustFly1984/react-lazyload-image/issues](https://github.com/JustFly1984/react-lazyload-image/issues)
