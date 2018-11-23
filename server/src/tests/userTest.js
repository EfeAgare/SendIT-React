import chai, {assert} from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';


chai.use(chaiHttp);
let token;


const parcelsOrder = {
    name:'AGare',
    deliveryAddress:'abuja', 
    deliveryPNumber: '08066633344',
    pickUpAddress: 'lagos',
    itemDescription: 'head of code',
    itemWeight: 3,
    itemQuantity: 3,
    status:'awaiting'
}
let login = {
  email: 'email@email.com',
  password: '123@abc'
}
let register = {
  username: 'username',
  email: 'email@email.com',
  password: '123@abc',
};


describe('/POST Register', () => {
  it('it should Register', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(register) 
      .end((err, res) => {
        assert.equal(res.status, 201);
        assert.typeOf(res.body, 'object');
        done();
      })
  })
})


describe('/POST/auth/login', () => {
  it('Should login a user', (done) => {
  chai.request(app)
  .post('/api/v1/auth/login')
  .send(login)
      .end((err, res) => {
        token = res.body.token
        assert.equal(res.status, 200);
        assert.typeOf(res.body.data, 'array');
        done();
      });
  });
});


describe('/GET/users/:userId/parcels', () => {
  it('Should Fetch all parcel delivery orders by a specific user', (done) => {
    chai.request(app)
      .get('/api/v1/users/1/parcels')
      .set('x-access-token',token)
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.typeOf(res.body, 'object');
        done();
      });
  });
});

describe('/POST', () => {
  it('Should Create a parcel delivery order', (done) => {
    chai.request(app)
      .post('/api/v1/parcels/')
      .set('x-access-token',token)
      .send(parcelsOrder)
      .end((err, res) => {
        assert.equal(res.status, 201);
        assert.typeOf(res.body, 'object');
        done();
      });
  });
});

describe('/GET/users/:userId/:parcelId', () => {
  it('Should Fetch a parcel delivery orders by a specific user', (done) => {
    chai.request(app)
      .get('/api/v1/users/1/1')
      .set('x-access-token',token)
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.typeOf(res.body, 'object');
        done();
      });
  });
});


describe('/PUT', () => {
  it('Should change the destination of a parcels', (done) => {
    chai.request(app)
      .put('/api/v1/parcels/1/destination')
      .set('x-access-token',token)
      .send({deliveryAddress:'Kano'})
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
        assert.equal(res.status, 200);
        assert.typeOf(res.body, 'object');
        done();
      });
  });
});