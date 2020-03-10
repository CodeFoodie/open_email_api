import express from 'express';
import bodyParser from 'body-parser';
import sendmail from './ctrl/sendMail';
import validate from './mid/validator';

const PORT = process.env.PORT || 5000;
const app = express();

const { sendmailCallBack } = sendmail;

const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(express.static('./ui'));


app.get('/', (req, res) => {
  res.sendFile(path.resolve('./ui/index.html'));
});


app.post('/api/v1/sendmail', validate(), sendmailCallBack);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

module.exports = app;
