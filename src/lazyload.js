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
    elem.removeAttribute('data-src')
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

// addToLazyload exported for internal use only
export const addToLazyload = (elem, rootMargin, fallbackMargin) => {
  const lazyloadObserver = (typeof document !== 'undefined' && 'IntersectionObserver' in window)
    ? new IntersectionObserver(onIntersection, { rootMargin })
    : null

  if (lazyloadObserver !== null) {
    lazyloadObserver.observe(elem)
  } else {
    lazyloadIter(elem)
  }
}

// Legacy browsers support
const lazyloadIter = elem =>
  (elem.getBoundingClientRect().top - window.innerHeight <= fallbackMargin) &&
  setImageSrc(elem)

// Legacy browsers support
const lazyload = () => (
  Reflect.apply(
    Array.prototype.forEach,
    document.querySelectorAll('img[data-lazy]'),
    lazyloadIter
  )
)

// initLazyload required to support browsers which does not support IntersectionObserver
export const initLazyLoadImages = () => {
  if (typeof document !== 'undefined' && !('IntersectionObserver' in window)) {
    window.addEventListener('scroll', lazyload)
    setTimeout(lazyload, 0)
  }
}
