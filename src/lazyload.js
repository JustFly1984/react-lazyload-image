// WebP support detection
const canvas = typeof document === 'object'
  ? document.createElement('canvas')
  : {}

// WebP support detection
export const isWebPSupported = canvas.getContext && canvas.getContext('2d')
  ? canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0
  : false

const setImageSrc = elem => {
  if (elem.getAttribute('data-src')) {
    elem.src = `${elem.getAttribute('data-src')}${isWebPSupported ? '.webp' : '.png'}`
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
  if (typeof window !== 'undefined') {
    if (!('IntersectionObserver' in window)) {
      require('intersection-observer')
    }

    const lazyloadObserver = new IntersectionObserver(onIntersection, { rootMargin })

    lazyloadObserver.observe(elem)
  }
}
