// WebP support detection
export const isBrowser = typeof document !== 'undefined'

const canvas = isBrowser
  ? document.createElement('canvas')
  : {}

// WebP support detection
export const isWebPSupported = canvas.getContext && canvas.getContext('2d')
  ? canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0
  : false

const replaceExtensionToWebP = fullpath =>
  fullpath.substr(0, fullpath.lastIndexOf('.')) + '.webp'

const setImageSrc = elem => {
  if (elem.getAttribute('data-src')) {
    const image = new Image()

    image.onload = () => {
      elem.src = image.src
      elem.width = image.naturalWidth
      elem.height = image.naturalHeight
    }

    image.src = isWebPSupported
      ? replaceExtensionToWebP(elem.getAttribute('data-src'))
      : elem.getAttribute('data-src')
  }
}

const onIntersection = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0) {
      observer.unobserve(entry.target)

      setImageSrc(entry.target)
    }
  })
}

export const addToLazyload = (elem, rootMargin) => {
  if (isBrowser) {
    if (!('IntersectionObserver' in window)) {
      require('intersection-observer')
    }

    const lazyloadObserver = new IntersectionObserver(onIntersection, { rootMargin })

    lazyloadObserver.observe(elem)
  }
}
