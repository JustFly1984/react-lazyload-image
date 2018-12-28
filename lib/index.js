"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "isWebPSupported", {
  enumerable: true,
  get: function get() {
    return _lazyload.isWebPSupported;
  }
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lazyload = require("./lazyload");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var placeholder = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyIDIiPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9InRyYW5zcGFyZW50Ii8+PC9zdmc+Cg==';

var LazyImage =
/*#__PURE__*/
function (_Component) {
  _inherits(LazyImage, _Component);

  function LazyImage() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, LazyImage);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(LazyImage)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      path: '',
      blur: '',
      width: 48,
      height: 48
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "componentDidMount", function () {
      if (_lazyload.isBrowser) {
        _this.resolution = window.screen.width;
        (0, _lazyload.addToLazyload)(_this.img, _this.props.rootMargin);

        _this.setSizes();

        window.addEventListener('resize', _this.onResize);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "componentDidUpdate", function (prevProps) {
      if (prevProps.path !== _this.props.path || prevProps.breakpoints !== _this.props.breakpoints) {
        _this.setSizes();

        (0, _lazyload.addToLazyload)(_this.img, _this.props.rootMargin);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "componentWillUnmount", function () {
      if (_lazyload.isBrowser) {
        window.removeEventListener('resize', _this.onResize);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onResize", function () {
      if (_lazyload.isBrowser) {
        _this.resolution = window.screen.width;

        _this.setSizes();

        (0, _lazyload.addToLazyload)(_this.img, _this.props.rootMargin);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setSizes", function () {
      if (_lazyload.isBrowser && _this.props.breakpoints !== 'undefined') {
        _this.props.breakpoints.forEach(function (_ref) {
          var media = _ref.media,
              path = _ref.path,
              blur = _ref.blur,
              width = _ref.width,
              height = _ref.height;

          if (window.matchMedia(media).matches && path !== _this.state.path) {
            _this.setState(function () {
              return {
                path: path,
                blur: blur,
                width: width,
                height: height
              };
            });
          }
        });
      } else {
        var _this$props = _this.props,
            path = _this$props.path,
            blur = _this$props.blur,
            width = _this$props.width,
            height = _this$props.height;

        _this.setState(function () {
          return {
            path: path,
            blur: blur,
            width: width,
            height: height
          };
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getRef", function (img) {
      _this.img = img;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "render", function () {
      return _react.default.createElement("img", {
        width: _this.props.width,
        height: _this.props.height,
        className: _this.props.className,
        title: _this.props.title,
        src: _this.state.blur === '' ? placeholder : _this.state.blur,
        style: _this.props.style,
        "data-lazy": true,
        "data-src": _this.state.path,
        alt: _this.props.alt,
        ref: _this.getRef
      });
    });

    return _this;
  }

  return LazyImage;
}(_react.Component);

_defineProperty(LazyImage, "defaultProps", {
  className: '',
  title: '',
  rootMargin: '300px 0px',
  style: {},
  path: '',
  blur: '',
  width: 48,
  height: 48
});

var _default = LazyImage;
exports.default = _default;