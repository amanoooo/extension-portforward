var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Root = function (_React$Component) {
    _inherits(Root, _React$Component);

    function Root() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Root);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Root.__proto__ || Object.getPrototypeOf(Root)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            localPort: 3001
        }, _this._updateValue = function (e) {
            _this.setState({
                localPort: e.target.value
            });
        }, _this._open = function () {}, _this._close = function () {}, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Root, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            return React.createElement(
                "div",
                null,
                React.createElement("button", { id: "changeColor" }),
                "localPort: ",
                React.createElement("input", { onChange: function onChange(e) {
                        _this2._updateValue('localPort', e);
                    }, type: "text" }),
                React.createElement(
                    "button",
                    { onClick: this._open },
                    "open"
                ),
                React.createElement(
                    "button",
                    { onClick: this._close },
                    "close"
                )
            );
        }
    }]);

    return Root;
}(React.Component);

var domContainer = document.querySelector('#root');
ReactDOM.render(React.createElement(Root, null), domContainer);
