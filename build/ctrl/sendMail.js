"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mail = _interopRequireDefault(require("@sendgrid/mail"));

var _dotenv = _interopRequireDefault(require("dotenv"));

require("regenerator-runtime/runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_dotenv["default"].config();

_mail["default"].setApiKey(process.env.SENDGRID_API_KEY);
/**
 * Creates an instance of sendMail.
 *
 * @constructor
 * @param {string} req.name The name of the requester.
 * @param {string} req.email The email of the requester.
 * @param {string} req.subject The subject of the requester.
 * @param {string} req.message The message of the requester.
*/


var sendEmail = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, name, email, subject, message, msg, result;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, name = _req$body.name, email = _req$body.email, subject = _req$body.subject, message = _req$body.message;
            msg = {
              to: 'codefoodie101@gmail.com',
              from: 'ask@codefoodie.com',
              subject: subject,
              html: "".concat(email, " ").concat(name, " ").concat(message)
            };
            _context.next = 5;
            return _mail["default"].send(msg);

          case 5:
            result = _context.sent;

            if (!(result[0] && result[0].request)) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", res.status(201).send({
              status: 201,
              suceess: true,
              message: 'Email sent successfully'
            }));

          case 8:
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(401).send({
              status: 401,
              suceess: false,
              error: _context.t0
            }));

          case 13:
            return _context.abrupt("return", res.status(500).send({
              status: 500,
              suceess: false,
              error: 'Incomplete task, please try again'
            }));

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 10]]);
  }));

  return function sendEmail(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = sendEmail;
exports["default"] = _default;