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
 * @param {string} data.receiver The email of the receiver.
 * @param {string} data.subject The subject of the sender's message.
 * @param {string} data.message The message from sender.
*/


var sendEmail = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data) {
    var receiver, subject, message, msg, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            receiver = data.receiver, subject = data.subject, message = data.message;
            msg = {
              to: receiver,
              from: 'noreply@codefoodie.com',
              subject: subject,
              html: "".concat(message)
            };
            _context.next = 5;
            return _mail["default"].send(msg);

          case 5:
            result = _context.sent;

            if (!(result[0] && result[0].request)) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", {
              success: true,
              message: 'Email sent successfully'
            });

          case 8:
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", {
              success: false,
              message: 'incomplete Task'
            });

          case 13:
            return _context.abrupt("return", false);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 10]]);
  }));

  return function sendEmail(_x) {
    return _ref.apply(this, arguments);
  };
}();

var sendmailCallBack = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return sendEmail(req.body);

          case 2:
            result = _context2.sent;

            if (!result.success) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", res.status(201).send({
              status: 201,
              suceess: true,
              message: 'Email sent successfully'
            }));

          case 5:
            return _context2.abrupt("return", res.status(500).send({
              status: 500,
              suceess: false,
              error: 'Incomplete task, please try again'
            }));

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function sendmailCallBack(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = {
  sendEmail: sendEmail,
  sendmailCallBack: sendmailCallBack
};
exports["default"] = _default;
//# sourceMappingURL=sendMail.js.map