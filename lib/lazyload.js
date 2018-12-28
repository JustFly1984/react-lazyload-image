"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addToLazyload = exports.isWebPSupported = exports.isBrowser = void 0;
// WebP support detection
var isBrowser = typeof document !== 'undefined';
exports.isBrowser = isBrowser;
var canvas = isBrowser ? document.createElement('canvas') : {}; // WebP support detection

var isWebPSupported = canvas.getContext && canvas.getContext('2d') ? canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0 : false;
exports.isWebPSupported = isWebPSupported;

var replaceExtensionToWebP = function replaceExtensionToWebP(fullpath) {
  return fullpath.substr(0, fullpath.lastIndexOf('.')) + '.webp';
};

var setImageSrc = function setImageSrc(elem) {
  if (elem.getAttribute('data-src')) {
    var image = new Image();

    image.onload = function () {
      elem.src = image.src;
      elem.width = image.naturalWidth;
      elem.height = image.naturalHeight;
    };

    image.src = isWebPSupported ? replaceExtensionToWebP(elem.getAttribute('data-src')) : elem.getAttribute('data-src');
  }
};

var onIntersection = function onIntersection(entries, observer) {
  entries.forEach(function (entry) {
    if (entry.intersectionRatio > 0) {
      observer.unobserve(entry.target);
      setImageSrc(entry.target);
    }
  });
};

var addToLazyload = function addToLazyload(elem, rootMargin) {
  if (isBrowser) {
    if (!('IntersectionObserver' in window)) {
      require('intersection-observer');
    }

    var lazyloadObserver = new IntersectionObserver(onIntersection, {
      rootMargin: rootMargin
    });
    lazyloadObserver.observe(elem);
  }
};

exports.addToLazyload = addToLazyload;