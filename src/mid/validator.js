import { body, validationResult } from 'express-validator';


const sendmail = [
  body('receiver', 'Please provide a valid receiver email')
    .isEmail(),
  body('subject', 'Please provide a reasonable subject')
    .isLength({ min: 5 }),
  body('message', 'Please provide comprehensive message')
    .isLength({ min: 10 }),
];

export default () => {
  const rules = sendmail;
  return [
    ...rules,
    (req, res, next) => {
      const errors = validationResult(req);
      const resErrorMsg = {};
      errors.array().forEach((error) => {
        resErrorMsg[error.param] = error.msg;
      });
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: resErrorMsg });
      }
      return next();
    },
  ];
};
