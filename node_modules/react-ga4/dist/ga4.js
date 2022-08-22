"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.GA4 = void 0;

var _gtag = _interopRequireDefault(require("./gtag"));

var _format = _interopRequireDefault(require("./format"));

var _excluded = ["eventCategory", "eventAction", "eventLabel", "eventValue", "hitType"],
    _excluded2 = ["title", "location"],
    _excluded3 = ["page", "hitType"],
    _excluded4 = ["action", "category", "label", "value", "nonInteraction", "transport"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
Links
https://developers.google.com/gtagjs/reference/api
https://developers.google.com/tag-platform/gtagjs/reference
*/

/**
 * @typedef GaOptions
 * @type {Object}
 * @property {boolean} [cookieUpdate=true]
 * @property {number} [cookieExpires=63072000] Default two years
 * @property {string} [cookieDomain="auto"]
 * @property {string} [cookieFlags]
 * @property {string} [userId]
 * @property {string} [clientId]
 * @property {boolean} [anonymizeIp]
 * @property {string} [contentGroup1]
 * @property {string} [contentGroup2]
 * @property {string} [contentGroup3]
 * @property {string} [contentGroup4]
 * @property {string} [contentGroup5]
 * @property {boolean} [allowAdFeatures=true]
 * @property {boolean} [allowAdPersonalizationSignals]
 * @property {boolean} [nonInteraction]
 * @property {string} [page]
 */

/**
 * @typedef UaEventOptions
 * @type {Object}
 * @property {string} action
 * @property {string} category
 * @property {string} [label]
 * @property {number} [value]
 * @property {boolean} [nonInteraction]
 * @property {('beacon'|'xhr'|'image')} [transport]
 */

/**
 * @typedef InitOptions
 * @type {Object}
 * @property {string} trackingId
 * @property {GaOptions|any} [gaOptions]
 * @property {Object} [gtagOptions] New parameter
 */
var GA4 = /*#__PURE__*/function () {
  function GA4() {
    var _this = this;

    _classCallCheck(this, GA4);

    _defineProperty(this, "reset", function () {
      _this.isInitialized = false;
      _this._testMode = false;
      _this._currentMeasurementId;
      _this._hasLoadedGA = false;
      _this._isQueuing = false;
      _this._queueGtag = [];
    });

    _defineProperty(this, "_gtag", function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (!_this._testMode) {
        if (_this._isQueuing) {
          _this._queueGtag.push(args);
        } else {
          _gtag["default"].apply(void 0, args);
        }
      } else {
        _this._queueGtag.push(args);
      }
    });

    _defineProperty(this, "_loadGA", function (GA_MEASUREMENT_ID, nonce) {
      if (typeof window === "undefined" || typeof document === "undefined") {
        return;
      }

      if (!_this._hasLoadedGA) {
        // Global Site Tag (gtag.js) - Google Analytics
        var script = document.createElement("script");
        script.async = true;
        script.src = "https://www.googletagmanager.com/gtag/js?id=".concat(GA_MEASUREMENT_ID);

        if (nonce) {
          script.setAttribute("nonce", nonce);
        }

        document.body.appendChild(script);
        window.dataLayer = window.dataLayer || [];

        window.gtag = function gtag() {
          window.dataLayer.push(arguments);
        };

        _this._hasLoadedGA = true;
      }
    });

    _defineProperty(this, "_toGtagOptions", function (gaOptions) {
      if (!gaOptions) {
        return;
      }

      var mapFields = {
        // Old https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#cookieUpdate
        // New https://developers.google.com/analytics/devguides/collection/gtagjs/cookies-user-id#cookie_update
        cookieUpdate: "cookie_update",
        cookieExpires: "cookie_expires",
        cookieDomain: "cookie_domain",
        cookieFlags: "cookie_flags",
        // must be in set method?
        userId: "user_id",
        clientId: "client_id",
        anonymizeIp: "anonymize_ip",
        // https://support.google.com/analytics/answer/2853546?hl=en#zippy=%2Cin-this-article
        contentGroup1: "content_group1",
        contentGroup2: "content_group2",
        contentGroup3: "content_group3",
        contentGroup4: "content_group4",
        contentGroup5: "content_group5",
        // https://support.google.com/analytics/answer/9050852?hl=en
        allowAdFeatures: "allow_google_signals",
        allowAdPersonalizationSignals: "allow_ad_personalization_signals",
        nonInteraction: "non_interaction",
        page: "page_path",
        hitCallback: "event_callback"
      };
      var gtagOptions = Object.entries(gaOptions).reduce(function (prev, _ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];

        if (mapFields[key]) {
          prev[mapFields[key]] = value;
        } else {
          prev[key] = value;
        }

        return prev;
      }, {});
      return gtagOptions;
    });

    _defineProperty(this, "initialize", function (GA_MEASUREMENT_ID) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!GA_MEASUREMENT_ID) {
        throw new Error("Require GA_MEASUREMENT_ID");
      }

      var initConfigs = typeof GA_MEASUREMENT_ID === "string" ? [{
        trackingId: GA_MEASUREMENT_ID
      }] : GA_MEASUREMENT_ID;
      _this._currentMeasurementId = initConfigs[0].trackingId;
      var gaOptions = options.gaOptions,
          gtagOptions = options.gtagOptions,
          _options$legacyDimens = options.legacyDimensionMetric,
          legacyDimensionMetric = _options$legacyDimens === void 0 ? true : _options$legacyDimens,
          nonce = options.nonce,
          _options$testMode = options.testMode,
          testMode = _options$testMode === void 0 ? false : _options$testMode;
      _this._testMode = testMode;

      if (!testMode) {
        _this._loadGA(_this._currentMeasurementId, nonce);
      }

      if (!_this.isInitialized) {
        _this._gtag("js", new Date());

        initConfigs.forEach(function (config) {
          var mergedGtagOptions = _this._appendCustomMap(_objectSpread(_objectSpread(_objectSpread({
            // https://developers.google.com/analytics/devguides/collection/gtagjs/pages#disable_pageview_measurement
            send_page_view: false
          }, _this._toGtagOptions(_objectSpread(_objectSpread({}, gaOptions), config.gaOptions))), gtagOptions), config.gtagOptions), legacyDimensionMetric);

          _this._gtag("config", config.trackingId, mergedGtagOptions);
        });
      }

      _this.isInitialized = true;

      if (!testMode) {
        var queues = _toConsumableArray(_this._queueGtag);

        _this._queueGtag = [];
        _this._isQueuing = false;

        while (queues.length) {
          var queue = queues.shift();

          _this._gtag.apply(_this, _toConsumableArray(queue));

          if (queue[0] === "get") {
            _this._isQueuing = true;
          }
        }
      }
    });

    _defineProperty(this, "set", function (fieldsObject) {
      if (!fieldsObject) {
        console.warn("`fieldsObject` is required in .set()");
        return;
      }

      if (_typeof(fieldsObject) !== "object") {
        console.warn("Expected `fieldsObject` arg to be an Object");
        return;
      }

      if (Object.keys(fieldsObject).length === 0) {
        console.warn("empty `fieldsObject` given to .set()");
      }

      _this._gaCommand("set", fieldsObject);
    });

    _defineProperty(this, "_gaCommandSendEvent", function (eventCategory, eventAction, eventLabel, eventValue, fieldsObject) {
      _this._gtag("event", eventAction, _objectSpread(_objectSpread({
        event_category: eventCategory,
        event_label: eventLabel,
        value: eventValue
      }, fieldsObject && {
        non_interaction: fieldsObject.nonInteraction
      }), _this._toGtagOptions(fieldsObject)));
    });

    _defineProperty(this, "_gaCommandSendEventParameters", function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      if (typeof args[0] === "string") {
        _this._gaCommandSendEvent.apply(_this, _toConsumableArray(args.slice(1)));
      } else {
        var _args$ = args[0],
            eventCategory = _args$.eventCategory,
            eventAction = _args$.eventAction,
            eventLabel = _args$.eventLabel,
            eventValue = _args$.eventValue,
            hitType = _args$.hitType,
            rest = _objectWithoutProperties(_args$, _excluded);

        _this._gaCommandSendEvent(eventCategory, eventAction, eventLabel, eventValue, rest);
      }
    });

    _defineProperty(this, "_gaCommandSendTiming", function (timingCategory, timingVar, timingValue, timingLabel) {
      _this._gtag("event", "timing_complete", {
        name: timingVar,
        value: timingValue,
        event_category: timingCategory,
        event_label: timingLabel
      });
    });

    _defineProperty(this, "_gaCommandSendPageview", function (page, fieldsObject) {
      if (fieldsObject && Object.keys(fieldsObject).length) {
        var _this$_toGtagOptions = _this._toGtagOptions(fieldsObject),
            title = _this$_toGtagOptions.title,
            location = _this$_toGtagOptions.location,
            rest = _objectWithoutProperties(_this$_toGtagOptions, _excluded2);

        _this._gtag("event", "page_view", _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, page && {
          page_path: page
        }), title && {
          page_title: title
        }), location && {
          page_location: location
        }), rest));
      } else if (page) {
        _this._gtag("event", "page_view", {
          page_path: page
        });
      } else {
        _this._gtag("event", "page_view");
      }
    });

    _defineProperty(this, "_gaCommandSendPageviewParameters", function () {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      if (typeof args[0] === "string") {
        _this._gaCommandSendPageview.apply(_this, _toConsumableArray(args.slice(1)));
      } else {
        var _args$2 = args[0],
            page = _args$2.page,
            hitType = _args$2.hitType,
            rest = _objectWithoutProperties(_args$2, _excluded3);

        _this._gaCommandSendPageview(page, rest);
      }
    });

    _defineProperty(this, "_gaCommandSend", function () {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      var hitType = typeof args[0] === "string" ? args[0] : args[0].hitType;

      switch (hitType) {
        case "event":
          _this._gaCommandSendEventParameters.apply(_this, args);

          break;

        case "pageview":
          _this._gaCommandSendPageviewParameters.apply(_this, args);

          break;

        case "timing":
          _this._gaCommandSendTiming.apply(_this, _toConsumableArray(args.slice(1)));

          break;

        case "screenview":
        case "transaction":
        case "item":
        case "social":
        case "exception":
          console.warn("Unsupported send command: ".concat(hitType));
          break;

        default:
          console.warn("Send command doesn't exist: ".concat(hitType));
      }
    });

    _defineProperty(this, "_gaCommandSet", function () {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      if (typeof args[0] === "string") {
        args[0] = _defineProperty({}, args[0], args[1]);
      }

      _this._gtag("set", _this._toGtagOptions(args[0]));
    });

    _defineProperty(this, "_gaCommand", function (command) {
      for (var _len6 = arguments.length, args = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
        args[_key6 - 1] = arguments[_key6];
      }

      switch (command) {
        case "send":
          _this._gaCommandSend.apply(_this, args);

          break;

        case "set":
          _this._gaCommandSet.apply(_this, args);

          break;

        default:
          console.warn("Command doesn't exist: ".concat(command));
      }
    });

    _defineProperty(this, "ga", function () {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }

      if (typeof args[0] === "string") {
        _this._gaCommand.apply(_this, args);
      } else {
        var readyCallback = args[0];

        _this._gtag("get", _this._currentMeasurementId, "client_id", function (clientId) {
          _this._isQueuing = false;
          var queues = _this._queueGtag;
          readyCallback({
            get: function get(property) {
              return property === "clientId" ? clientId : property === "trackingId" ? _this._currentMeasurementId : property === "apiVersion" ? "1" : undefined;
            }
          });

          while (queues.length) {
            var queue = queues.shift();

            _this._gtag.apply(_this, _toConsumableArray(queue));
          }
        });

        _this._isQueuing = true;
      }

      return _this.ga;
    });

    _defineProperty(this, "event", function (optionsOrName, params) {
      if (typeof optionsOrName === "string") {
        _this._gtag("event", optionsOrName, _this._toGtagOptions(params));
      } else {
        var action = optionsOrName.action,
            category = optionsOrName.category,
            label = optionsOrName.label,
            value = optionsOrName.value,
            nonInteraction = optionsOrName.nonInteraction,
            transport = optionsOrName.transport,
            rest = _objectWithoutProperties(optionsOrName, _excluded4);

        if (!category || !action) {
          console.warn("args.category AND args.action are required in event()");
          return;
        } // Required Fields


        var fieldObject = {
          hitType: "event",
          eventCategory: (0, _format["default"])(category),
          eventAction: (0, _format["default"])(action)
        }; // Optional Fields

        if (label) {
          fieldObject.eventLabel = (0, _format["default"])(label);
        }

        if (typeof value !== "undefined") {
          if (typeof value !== "number") {
            console.warn("Expected `args.value` arg to be a Number.");
          } else {
            fieldObject.eventValue = value;
          }
        }

        if (typeof nonInteraction !== "undefined") {
          if (typeof nonInteraction !== "boolean") {
            console.warn("`args.nonInteraction` must be a boolean.");
          } else {
            fieldObject.nonInteraction = nonInteraction;
          }
        }

        if (typeof transport !== "undefined") {
          if (typeof transport !== "string") {
            console.warn("`args.transport` must be a string.");
          } else {
            if (["beacon", "xhr", "image"].indexOf(transport) === -1) {
              console.warn("`args.transport` must be either one of these values: `beacon`, `xhr` or `image`");
            }

            fieldObject.transport = transport;
          }
        }

        Object.keys(rest).filter(function (key) {
          return key.substr(0, "dimension".length) === "dimension";
        }).forEach(function (key) {
          fieldObject[key] = rest[key];
        });
        Object.keys(rest).filter(function (key) {
          return key.substr(0, "metric".length) === "metric";
        }).forEach(function (key) {
          fieldObject[key] = rest[key];
        });

        _this._gaCommand("send", fieldObject);
      }
    });

    _defineProperty(this, "send", function (fieldObject) {
      _this._gaCommand("send", fieldObject);
    });

    _defineProperty(this, "pageview", function (path, _, title) {
      var pathTrim = path === null || path === void 0 ? void 0 : path.trim();

      if (pathTrim === "") {
        console.warn("path cannot be an empty string in .pageview()");
        return;
      }

      _this._gaCommand("send", "pageview", pathTrim, {
        title: title
      });
    });

    this.reset();
  }

  _createClass(GA4, [{
    key: "gtag",
    value: function gtag() {
      this._gtag.apply(this, arguments);
    }
  }, {
    key: "_appendCustomMap",
    value: function _appendCustomMap(options) {
      var legacyDimensionMetric = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (!legacyDimensionMetric) {
        return options;
      }

      if (!options.custom_map) {
        options.custom_map = {};
      }

      for (var i = 1; i <= 200; i++) {
        if (!options.custom_map["dimension".concat(i)]) {
          options.custom_map["dimension".concat(i)] = "dimension".concat(i);
        }

        if (!options.custom_map["metric".concat(i)]) {
          options.custom_map["metric".concat(i)] = "metric".concat(i);
        }
      }

      return options;
    }
    /**
     * @since v1.0.2
     * @param {string} [path="location.href"]
     * @param {string[]} [_] unsupported
     * @param {string} [title="location.pathname"]
     * @deprecated Use `.send("pageview")` instead
     */

  }, {
    key: "outboundLink",
    value:
    /**
     * @since v1.0.6
     * @param {Object} options
     * @param {string} options.label
     * @param {function} hitCallback
     * @deprecated Use `enhanced measurement` feature in Google Analytics.
     */
    function outboundLink(_ref3, hitCallback) {
      var label = _ref3.label;

      if (typeof hitCallback !== "function") {
        console.warn("hitCallback function is required");
        return;
      }

      if (!label) {
        console.warn("args.label is required in outboundLink()");
        return;
      } // Required Fields


      var fieldObject = {
        hitType: "event",
        eventCategory: "Outbound",
        eventAction: "Click",
        eventLabel: (0, _format["default"])(label)
      };
      var safetyCallbackCalled = false;

      var safetyCallback = function safetyCallback() {
        // This prevents a delayed response from GA
        // causing hitCallback from being fired twice
        safetyCallbackCalled = true;
        hitCallback();
      }; // Using a timeout to ensure the execution of critical application code
      // in the case when the GA server might be down
      // or an ad blocker prevents sending the data
      // register safety net timeout:


      var t = setTimeout(safetyCallback, 250);

      var clearableCallbackForGA = function clearableCallbackForGA() {
        clearTimeout(t);

        if (!safetyCallbackCalled) {
          hitCallback();
        }
      };

      fieldObject.hitCallback = clearableCallbackForGA;

      this._gaCommand("send", fieldObject);
    }
  }]);

  return GA4;
}();

exports.GA4 = GA4;

var _default = new GA4();

exports["default"] = _default;