import chai, {assert} from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';


chai.use(chaiHttp);
let token;

describe('/POST', () => {
  it('User Should get an email notification when wanting to recover password', (done) => {
    chai.request(app)
      .post('/api/v1/users/auth/resetpassword')
      .send({email:'email@email.com'})
       .end((err, res) => {
        token = res.body.token;
        assert.equal(res.status, 200);
        assert.typeOf(res.body, 'object');
        done();
      });
  });

  it('User Should get email does not exist if not registered  ', (done) => {
    chai.request(app)
      .post('/api/v1/users/auth/resetpassword')
      .send({email:'emailert@email.com'})
       .end((err, res) => {
        assert.equal(res.status, 404);
        assert.typeOf(res.body, 'object');
        done();
      });
  });

  it('User Should get email not valid if not in right format  ', (done) => {
    chai.request(app)
      .post('/api/v1/users/auth/resetpassword')
      .send({email:'emailert'})
       .end((err, res) => {
        assert.equal(res.status, 400);
        assert.typeOf(res.body, 'object');
        done();
      });
  });
});

describe('/PUT', () => {
    it('User Should get an email notification after recovering password', (done) => {
      chai.request(app)
        .put('/api/v1/users/auth/resetpassword')
        .send({
            password:'345efe', 
            confirmPassword:'345efe'})
        .set('x-access-token',token)
         .end((err, res) => {
          assert.equal(res.status, 200);
          assert.typeOf(res.body, 'object');
          done();
        });
    });

    it('User Should not get an email notification when password don\'t match', (done) => {
        chai.request(app)
          .put('/api/v1/users/auth/resetpassword')
          .send({
              password:'345efe', 
              confirmPassword:'345efer'})
          .set('x-access-token',token)
           .end((err, res) => {
            assert.equal(res.status, 422);
            assert.typeOf(res.body, 'object');
            done();
          });
      });

      
    it('User Should not get an email notification when password is not in the required format', (done) => {
        chai.request(app)
          .put('/api/v1/users/auth/resetpassword')
          .send({
              password:'abcd', 
              confirm:'abcd'})
          .set('x-access-token',token)
           .end((err, res) => {
            assert.equal(res.status, 400);
            assert.typeOf(res.body, 'object');
            done();
          });
      });
  });