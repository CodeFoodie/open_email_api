"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _sendMail = _interopRequireDefault(require("./ctrl/sendMail"));

var _validator = _interopRequireDefault(require("./mid/validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PORT = process.env.PORT || 5000;
var app = (0, _express["default"])();
var sendmailCallBack = _sendMail["default"].sendmailCallBack;

var allowCrossDomain = function allowCrossDomain(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

app.use(allowCrossDomain);
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use(_bodyParser["default"].text());
app.use(_bodyParser["default"].json({
  type: 'application/json'
}));
app.use(_express["default"]["static"]('./ui'));
app.get('/', function (req, res) {
  res.sendFile(path.resolve('./ui/index.html'));
});
app.post('/api/v1/sendmail', (0, _validator["default"])(), sendmailCallBack);
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({
    errors: {
      message: err.message,
      error: {}
    }
  });
});
app.listen(PORT, function () {
  console.log("server running on port ".concat(PORT));
});
module.exports = app;
//# sourceMappingURL=index.js.map