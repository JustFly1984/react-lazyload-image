import React, {
  Component
} from 'react'

import PropTypes from 'prop-types'

import {
  addToLazyload
} from './lazyload'

export {
  isWebPSupported
} from './lazyload'

const placeholder = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyIDIiPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9InRyYW5zcGFyZW50Ii8+PC9zdmc+Cg=='

class LazyImage extends Component {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    alt: PropTypes.string.isRequired,
    path: PropTypes.string,
    blur: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    breakpoints: PropTypes.arrayOf(
      PropTypes.shape({
        media: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
        blur: PropTypes.string.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired
      }).isRequired
    ),
    style: PropTypes.object,
    rootMargin: PropTypes.string
  }

  static defaultProps = {
    className: '',
    title: '',
    rootMargin: '300px 0px',
    style: {},
    path: '',
    blur: '',
    width: 48,
    height: 48
  }

  state = {
    path: '',
    blur: '',
    width: 48,
    height: 48
  }

  componentDidMount = () => {
    if (typeof document !== 'undefined') {
      this.resolution = window.screen.width

      addToLazyload(this.img, this.props.rootMargin)

      this.setSizes()

      window.addEventListener('resize', this.onResize)
    }
  }

  componentDidUpdate = prevProps => {
    if (prevProps.path !== this.props.path || prevProps.breakpoints !== this.props.breakpoints) {
      this.setSizes()

      addToLazyload(this.img, this.props.rootMargin)
    }
  }

  componentWillUnmount = () => {
    if (typeof document !== 'undefined') {
      window.removeEventListener('resize', this.onResize)
    }
  }

  onResize = () => {
    if (typeof document !== 'undefined') {
      this.resolution = window.screen.width

      this.setSizes()

      addToLazyload(this.img, this.props.rootMargin)
    }
  }

  setSizes = () => {
    if (typeof document !== 'undefined' && this.props.breakpoints !== 'undefined') {
      this.props.breakpoints.forEach(({ media, path, blur, width, height }) => {
        if (window.matchMedia(media).matches && path !== this.state.path) {
          this.setState(
            () => ({
              path,
              blur,
              width,
              height
            })
          )
        }
      })
    } else {
      const {
        path,
        blur,
        width,
        height
      } = this.props

      this.setState(
        () => ({
          path,
          blur,
          width,
          height
        })
      )
    }
  }

  getRef = img => {
    this.img = img
  }

  render = () => (
    <img
      width={this.props.width}
      height={this.props.height}
      className={this.props.className}
      title={this.props.title}
      src={this.state.blur === '' ? placeholder : this.state.blur}
      style={this.props.style}
      data-lazy
      data-src={this.state.path}
      alt={this.props.alt}
      ref={this.getRef}
    />
  )
}

export default LazyImage
