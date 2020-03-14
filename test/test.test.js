/* eslint-disable camelcase */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/index';
import sendMail from '../src/ctrl/sendMail';

chai.should();
chai.use(chaiHttp);

const { sendEmail } = sendMail;

const sendmailRoute = '/api/v1/sendmail';

describe('Send Email Test', () => {
  it('Should validate payload', (done) => {
    chai.request(server).post(sendmailRoute).end((error, response) => {
      response.should.have.status(422);
      response.body.should.have.property('errors');
      const listed_errors = response.body.errors;
      listed_errors.should.have.property('receiver').eql('Please provide a valid receiver email');
      listed_errors.should.have.property('subject').eql('Please provide a reasonable subject');
      listed_errors.should.have.property('message').eql('Please provide comprehensive message');
      done();
    });
  });

  it('Should send email successfully', async function callBack() {
    this.timeout(20000);
    const assumedUser = {
      receiver: 'codefoodie101@gmail.com',
      subject: 'Mocha Test',
      message: 'torsami77@gmail.com, Samo Samo, Test is passing',
    };

    const result = await sendEmail(assumedUser);
    result.should.have.property('success').eql(true);
    result.should.have.property('message').eql('Email sent successfully');
  });
});
