import chai, {assert} from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';


chai.use(chaiHttp);
let token;



let login = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASS,
}


describe('/POST/auth/login', () => {
  it('Should login a user', (done) => {
  chai.request(app)
  .post('/api/v1/auth/login')
  .send(login)
      .end((err, res) => {
        token = res.body.data.token
        assert.equal(res.status, 200);
        assert.typeOf(res.body.data, 'object');
        done();
      });
  });
});


describe('/GET /parcels', () => {
  it('Admin Should Fetch all parcel delivery orders by all users', (done) => {
    chai.request(app)
      .get('/api/v1/parcels')
      .set('x-access-token',token)
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.typeOf(res.body, 'object');
        done();
      });
  });
});

describe('/GET', () => {
  it('Admin Should get a parcel by any user', (done) => {
    chai.request(app)
      .get('/api/v1/parcels/1')
      .set('x-access-token',token)
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.typeOf(res.body, 'object');
        done();
      });
  });
});

describe('/PUT/ :parcelId/status', () => {
  it('Admin Should change the status of a parcel', (done) => {
    chai.request(app)
      .put('/api/v1/parcels/2/status')
      .set('x-access-token',token)
      .send({status:'tansit'})
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.typeOf(res.body, 'object');
        done();
      });
  });
});


describe('/PUT/ parcels/:parcelId/presentLocation' , () => {
  it('Admin Should change the present Location of parcels', (done) => {
    chai.request(app)
      .put('/api/v1/parcels/2/presentLocation')
      .set('x-access-token',token)
      .send({currentLocation:'Enugu'})
       .end((err, res) => {
        assert.equal(res.status, 200);
        assert.typeOf(res.body, 'object');
        done();
      });
  });
});


