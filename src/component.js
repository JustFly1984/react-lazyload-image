import {
  React,
  Component,
  PropTypes
} from '../../vendor.js'

import {
  addToLazyload
} from './lazyload'

class LazyImage extends Component {
  static propTypes = {
    className: PropTypes.string,
    alt: PropTypes.string.isRequired,
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
    rootMargin: PropTypes.string,
    fallbackMargin: PropTypes.number
  }

  static defaultProps = {
    className: '',
    rootMargin: '300px 0px',
    fallbackMargin: 300
  }

  state = {
    width: 56,
    height: 56
  }

  componentWillMount = () => {
    if (typeof document !== 'undefined') {
      this.resolution = window.screen.width
      this.setSizes()
    }
  }

  componentDidMount = () => {
    addToLazyload(this.img, this.props.rootMargin, this.props.fallbackMargin)

    this.resolution = window.screen.width

    this.setSizes()

    window.addEventListener('resize', this.onResize)
  }

  componentDidUpdate = prevProps => {
    prevProps.config.mobile.src !== this.props.config.mobile.src &&
    addToLazyload(this.img, this.props.rootMargin, this.props.fallbackMargin)
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
    }
  }

  setSizes = () => {
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
        height
      })
    )
  }

  getRef = img => {
    this.img = img
  }

  render = () => (
    <img
      width={this.state.width}
      height={this.state.height}
      className={this.props.className}
      src={this.props.placeholder}
      data-lazy
      data-src={this.props.src}
      alt={this.props.alt}
      ref={this.getRef}
    />
  )
}

export default LazyImage
