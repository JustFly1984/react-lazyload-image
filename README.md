# react-lazyloading-images
Lazy loading image component for React

The main goal of this component is providing reliable, performance optimized, cross-browser, responsive and SEO friendly lazyloading images. It supports both - WebP and PNG image formats. It means you need to provide both image formats, accessible from your public directory. This component allows you to implement blurry `low quality image placeholder` technic, which Medium.com uses.

WebP is widely supported by Chrome and Android browsers according to [https://caniuse.com/#feat=webp](https://caniuse.com/#feat=webp) and it is much lighter format than PNG. Firefox and Safari are working on their implementation.

PNG is supported by all other browser vendors, and is known for smaller sizes and transparency, so it used as fallback.

Important! No other extensions like JPEG or GIF is supported, so please convert your images only to PNG and WEBP.

## 1. Install

```
npm i -S react-lazyloading-images
```
or
```
yarn add react-lazyloading-images
```

## 2. Example

```
import LazyImage from 'react-lazyloading-images'

const MyComponent = () => (
  <div>
		<LazyImage
      path='/img/logo' // type: string, required
			className='lazyImage' // type: string, optional, default value === ''
      title='logo' // type: string, optional, default value === ''
			alt='logo' // type: string, required.
      onLoad={this.onLoad} // type: function, optional, default value === e => {}
			config={{
      	mobile: { // screen width < 768px breakpoint
      		width: 50, // px value. type: number
      		height: 50 // px value. type: number
      	},
      	portrait: { // screen width 768px > 1024px breakpoint
      		width: 75, // px value. type: number
      		height: 75 // px value. type: number
      	},
      	landscape: { // screen width 1024px > 1280px breakpoint
      		width: 100, // px value. type: number
      		height: 100 // px value. type: number
      	},
      	desktop: {  // screen width > 1280px breakpoint
      		width: 150, // px value. type: number
      		height: 150 // px value. type: number
      	}
      }} // required.
      style={{ width: '100%', height: 'auto' }} // type: object, optional.
			rootMargin='500px 0px' // type: string, optional, default value === '300px 0px'
		/>
	</div>
)

export default MyComponent
```

## 3. Important information:

Under the hood Lazy loading made with `IntersectionObserver` API and uses npm `intersection-observer` polyfill as fallback.


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
For each source image you will get 3 asset images. For example if you provide `logo-50.png` in `/src/`, you will get production optimized `logo-50.png`, `logo-50.webp` and `logo-50-placeholder.png`. You need to provide 4 sets of images, for each breakpoint: mobile, portrait, landscape and desktop. So in total it should be 3 x 4 = 12 images per LazyImage instance.

You need to copy all 3 files to your `./public/` directory, and specify relative `path` prop for `<LazyImage />` without suffix and extension.
Suffix will be generated for free.

If your images path is `/public/images/logo-50.png`, you need to set `path` prop as in example below:

```
<LazyImage
  path={'/images/logo'}
  alt='logo'
  config={{
    mobile: { // screen width < 768px breakpoint
      width: 50, // px value. type: number
      height: 50 // px value. type: number
    },
    portrait: { // screen width 768px > 1024px breakpoint
      width: 75, // px value. type: number
      height: 75 // px value. type: number
    },
    landscape: { // screen width 1024px > 1280px breakpoint
      width: 100, // px value. type: number
      height: 100 // px value. type: number
    },
    desktop: {  // screen width > 1280px breakpoint
      width: 150, // px value. type: number
      height: 150 // px value. type: number
    }
  }}
/>
```

You can provide any other attributes as props, and it will be set to `<img />` tag.

For WebP suport detection, you can import boolean value `isWebPSupported` from the package.

```
import { isWebPSupported } from 'react-lazyloading-images'
```

If you have any questions or ideas how to improve the package, please make an issue in github repository.
[https://github.com/JustFly1984/react-lazyload-image/issues](https://github.com/JustFly1984/react-lazyload-image/issues)
