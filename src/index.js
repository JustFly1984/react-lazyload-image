import React, {
  Component
} from 'react'

import PropTypes from 'prop-types'

import {
  addToLazyload
} from './lazyload'

class LazyImage extends Component {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    alt: PropTypes.string.isRequired,
    onLoad: PropTypes.func,
    config: PropTypes.shape({
      mobile: PropTypes.shape({
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        src: PropTypes.string.isRequired,
        placeholder: PropTypes.string.isRequired
      }).isRequired,
      portrait: PropTypes.shape({
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        src: PropTypes.string.isRequired,
        placeholder: PropTypes.string.isRequired
      }).isRequired,
      landscape: PropTypes.shape({
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        src: PropTypes.string.isRequired,
        placeholder: PropTypes.string.isRequired
      }).isRequired,
      desktop: PropTypes.shape({
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        src: PropTypes.string.isRequired,
        placeholder: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    rootMargin: PropTypes.string
  }

  static defaultProps = {
    className: '',
    title: '',
    rootMargin: '300px 0px',
    onLoad: () => {}
  }

  state = {
    width: 56,
    height: 56,
    src: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyIDIiPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9InRyYW5zcGFyZW50Ii8+PC9zdmc+Cg==',
    placeholder: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyIDIiPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9InRyYW5zcGFyZW50Ii8+PC9zdmc+Cg=='
  }

  componentDidMount = () => {
    if (typeof document !== 'undefined') {
      addToLazyload(this.img, this.props.rootMargin)

      this.setSizes()

      window.addEventListener('resize', this.onResize)
    }
  }

  componentDidUpdate = prevProps => {
    if (prevProps.config.mobile.src !== this.props.config.mobile.src) {
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
      this.setSizes()
    }
  }

  setSizes = () => {
    this.resolution = window.screen.width

    let width
    let height
    let src
    let placeholder
    if (
      this.resolution > 0 && this.resolution < 768
    ) {
      width = this.props.config.mobile.width
      height = this.props.config.mobile.height
      src = this.props.config.mobile.src
      placeholder = this.props.config.mobile.placeholder
    } else if (
      this.resolution >= 768 && this.resolution < 1024
    ) {
      width = this.props.config.portrait.width
      height = this.props.config.portrait.height
      src = this.props.config.portrait.src
      placeholder = this.props.config.portrait.placeholder
    } else if (
      this.resolution >= 1024 && this.resolution < 1280
    ) {
      width = this.props.config.landscape.width
      height = this.props.config.landscape.height
      src = this.props.config.landscape.src
      placeholder = this.props.config.landscape.placeholder
    } else if (
      this.resolution >= 1280
    ) {
      width = this.props.config.desktop.width
      height = this.props.config.desktop.height
      src = this.props.config.desktop.src
      placeholder = this.props.config.desktop.placeholder
    }

    this.setState(
      () => ({
        width,
        height,
        src,
        placeholder
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
      src={this.state.placeholder}
      data-lazy
      data-src={this.state.src}
      alt={this.props.alt}
      ref={this.getRef}
    />
  )
}

export default LazyImage
