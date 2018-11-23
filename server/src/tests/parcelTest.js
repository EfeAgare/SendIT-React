import chai, {assert} from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';


chai.use(chaiHttp);
let token;



let login = {
  email: 'knowledgeagare157@gmail.com',
  password: '2010agare',
}


describe('/POST/auth/login', () => {
  it('Should login a user', (done) => {
  chai.request(app)
  .post('/api/v1/auth/login')
  .send(login)
      .end((err, res) => {
        console.log(res.error);
        token = res.body.token
        assert.equal(res.status, 200);
        assert.typeOf(res.body.data, 'array');
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
        console.log(res.body)
        assert.equal(res.status, 200);
        assert.typeOf(res.body, 'object');
        done();
      });
  });
});

describe('/GET/ :parcelId/status', () => {
  it('Admin Should change the status of a parcel', (done) => {
    chai.request(app)
      .put('/api/v1/parcels/1/status')
      .set('x-access-token',token)
      .send({status:'tansit'})
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.typeOf(res.body, 'object');
        done();
      });
  });
});


describe('/PUT', () => {
  it('Should change the present Location of parcels', (done) => {
    chai.request(app)
      .put('/api/v1/parcels/1/destination')
      .set('x-access-token',token)
      .send({presentLocation:'Enugu'})
       .end((err, res) => {
        assert.equal(res.status, 201);
        assert.typeOf(res.body, 'object');
        done();
      });
  });
});



describe('/PUT', () => {
  it('Should cancel a parcel delivery order', (done) => {
    chai.request(app)
      .put('/api/v1/parcels/1/cancel')
      .set('x-access-token',token)
       .end((err, res) => {
        console.log(res.body)
        assert.equal(res.status, 200);
        assert.typeOf(res.body, 'object');
        done();
      });
  });
});