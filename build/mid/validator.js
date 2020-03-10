"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var nameRegex = /^[A-Za-z\-']{2,20}$/;
var sendmail = [(0, _expressValidator.body)('first_name', 'Name should be alphabets between 2 and 20 characters').matches(nameRegex), (0, _expressValidator.body)('email', 'Please provide a valid email').isEmail(), (0, _expressValidator.body)('subject', 'Please provide a reasonable subject').isLength({
  min: 5
}), (0, _expressValidator.body)('message', 'Please provide comprehensive message').isLength({
  min: 10
})];

var _default = function _default() {
  var rules = sendmail;
  return [].concat(_toConsumableArray(rules), [function (req, res, next) {
    var errors = (0, _expressValidator.validationResult)(req);
    var resErrorMsg = {};
    errors.array().forEach(function (error) {
      resErrorMsg[error.param] = error.msg;
    });

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: resErrorMsg
      });
    }

    return next();
  }]);
};

exports["default"] = _default;