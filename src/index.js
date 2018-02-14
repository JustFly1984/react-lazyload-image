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
    onLoad: PropTypes.func,
    path: PropTypes.string.isRequired,
    config: PropTypes.shape({
      mobile: PropTypes.shape({
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired
      }).isRequired,
      portrait: PropTypes.shape({
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired
      }).isRequired,
      landscape: PropTypes.shape({
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired
      }).isRequired,
      desktop: PropTypes.shape({
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired
      }).isRequired
    }).isRequired,
    style: PropTypes.object,
    rootMargin: PropTypes.string
  }

  static defaultProps = {
    className: '',
    title: '',
    rootMargin: '300px 0px',
    onLoad: () => {}
  }

  state = {
    width: 48,
    height: 48,
    path: ''
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
    if (prevProps.path !== this.props.path) {
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
    let width
    let height
    let path
    if (
      this.resolution > 0 && this.resolution < 768
    ) {
      width = this.props.config.mobile.width
      height = this.props.config.mobile.height
      path = this.props.path
    } else if (
      this.resolution >= 768 && this.resolution < 1024
    ) {
      width = this.props.config.portrait.width
      height = this.props.config.portrait.height
      path = this.props.path
    } else if (
      this.resolution >= 1024 && this.resolution < 1280
    ) {
      width = this.props.config.landscape.width
      height = this.props.config.landscape.height
      path = this.props.path
    } else if (
      this.resolution >= 1280
    ) {
      width = this.props.config.desktop.width
      height = this.props.config.desktop.height
      path = this.props.path
    }

    this.setState(
      () => ({
        width,
        height,
        path
      })
    )
  }

  getRef = img => {
    this.img = img
  }

  render = () => (
    <img
      onLoad={this.props.onLoad}
      width={this.state.width}
      height={this.state.height}
      className={this.props.className}
      title={this.props.title}
      src={`${this.state.path}-${this.state.width}-placeholder.png`}
      style={this.props.style}
      data-lazy
      data-src={this.state.path !== '' ? `${this.state.path}-${this.state.width}` : placeholder}
      alt={this.props.alt}
      ref={this.getRef}
      {...this.props}
    />
  )
}

export default LazyImage
