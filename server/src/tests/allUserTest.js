import chai, {assert} from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
let token;

const parcelsOrder = {
    name:'AGare Efe',
    deliveryAddress:'abuja', 
    deliveryPNumber: '08066633344',
    pickUpAddress: 'lagos',
    itemDescription: 'head of code',
    itemWeight: 3,
    itemQuantity: 3,
    status:'awaiting'
}

const parcelsOrder1 = {
  name:'succes Efe',
  deliveryAddress:'ikaka', 
  deliveryPNumber: '08054630967',
  pickUpAddress: 'l345',
  itemDescription: 'phine',
  itemWeight: 34,
  itemQuantity: 45,
  status:'awaiting'
}
let login = {
  email: 'email@email.com',
  password: '123agare'
}
let register = {
  username: 'username',
  lastname:'lastname',
  email: 'email@email.com',
  password: '123agare',
};

describe('/GET WELCOME PAGE', () => {
  it('it should display the welcome page', (done) => {
    chai.request(app)
      .get('/api/v1/')
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body, 'Welcome to SendIt \n SendIT is a courier service that helps users deliver parcels to different destinations.');
        done();
      })
  });
});

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
  });

  it('it should not Register if email already exist', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(register) 
      .end((err, res) => {
        assert.equal(res.status, 409);
        assert.equal(res.body.message, 'Email Address Already exists');
        done();
      })
  });
  
  it('it should not Register if password is not in right format', (done) => {
    register.password = '1111';
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(register) 
      .end((err, res) => {
        assert.equal(res.status, 409);
        assert.typeOf(res.body, 'object');
        done();
      })
  });
  it('it should not Register if username field is empty', (done) => {
    register.username = ' ';
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(register) 
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.equal(res.body.errors,'username must be specified.');
        assert.typeOf(res.body, 'object');
        done();
      })
    });
    
    it('it should not Register if lastname field is empty', (done) => {
        register.lastname = ' ';
        chai.request(app)
          .post('/api/v1/auth/signup')
          .send(register) 
          .end((err, res) => {
            assert.equal(res.status, 400);
            assert.typeOf(res.body, 'object');
            done();
          })
  });

  it('it should not Register if email is not in right format', (done) => {
    register.email = 'rubbish.com';
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(register) 
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.typeOf(res.body, 'object');
        done();
      })
  });
})


describe('/POST/auth/login', () => {
  it('it should not login user with an unexisting email ', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'yu@email.com',
        password: '1agare'
      }) 
      .end((err, res) => {
        assert.equal(res.status, 404);
        assert.equal(res.body.message, 'No account with this email address');
        done();
      });
  });

   it('it should not login user if register password is different from inputed password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'email@email.com',
        password: '1agare'
      }) 
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.equal(res.body.message, 'Invalid password');
        done();
      });
  });

  it('it should not login user if register password is different from inputed password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: ' ',
        password: '2010agare'
      }) 
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.equal(res.body.errors, 'Enter a valid email address');
        done();
      });
  });

  it('Should login a user', (done) => {
    chai.request(app)
    .post('/api/v1/auth/login')
    .send(login)
        .end((err, res) => {
          token = res.body.data.token;
          assert.equal(res.status, 200);
          assert.typeOf(res.body.data, 'object');
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
        assert.equal(res.body.message, 'Parcels created successfully');
        assert.typeOf(res.body, 'object');
        assert.typeOf(res.body.data, 'object');
        done();
      });
  });
});


describe('/POST', () => {
  it('Should not Create a parcel delivery order if name is empty', (done) => {
    parcelsOrder1.name = '';
    chai.request(app)
      .post('/api/v1/parcels/')
      .set('x-access-token',token)
      .send(parcelsOrder1)
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.typeOf(res.body, 'object');
        done();
      });
  });
  it('Should not Create a parcel delivery order if no token', (done) => {
    chai.request(app)
      .post('/api/v1/parcels/')
      .send(parcelsOrder1)
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.typeOf(res.body, 'object');
        done();
      });
  });

  it('Should not Create a parcel delivery order if wrong token', (done) => {
    chai.request(app)
      .post('/api/v1/parcels/')
      .set('x-access-token','token')
      .send(parcelsOrder1)
      .end((err, res) => {
        assert.equal(res.status, 401);
        assert.typeOf(res.body, 'object');
        done();
      });
  });

  it('Should Create a parcel delivery order', (done) => {
    parcelsOrder1.name = 'knowledge';
    chai.request(app)
      .post('/api/v1/parcels/')
      .set('x-access-token',token)
      .send(parcelsOrder1)
      .end((err, res) => {
        assert.equal(res.status, 201);
        assert.typeOf(res.body, 'object');
        done();
      });
  });
});


describe('/GET/users/:userId/parcels', () => {
  it('Should not Fetch all parcel delivery orders if user id is not integer', (done) => {
    chai.request(app)
      .get('/api/v1/users/1.5/parcels')
      .set('x-access-token',token)
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.equal(res.body.errors, ' User Id not correctly specifed');
        assert.typeOf(res.body, 'object');
        done();
      });
  });

  it('Should Fetch all parcel delivery orders by a specific user', (done) => {
    chai.request(app)
      .get('/api/v1/users/2/parcels')
      .set('x-access-token',token)
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.message,'Parcels retrieved successfully');
        assert.typeOf(res.body, 'object');
        done();
      });
  });
});


describe('/GET/users/:userId/:parcelId', () => {
  it('Should Fetch a parcel delivery orders by a specific user', (done) => {
    chai.request(app)
      .get('/api/v1/users/2/1')
      .set('x-access-token',token)
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.typeOf(res.body, 'object');
        done();
      });
  });
  it('Should not Fetch a parcel delivery orders by a specific user if resource not found', (done) => {
    chai.request(app)
      .get('/api/v1/users/1/1')
      .set('x-access-token',token)
      .end((err, res) => {
        assert.equal(res.status,404);
        assert.typeOf(res.body, 'object');
        done();
      });
  });

  it('Should not Fetch a parcel delivery order if userId is Wrong ', (done) => {
    chai.request(app)
      .get('/api/v1/users/1.6/1')
      .set('x-access-token',token)
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.equal(res.body.errors, ' User Id not correctly specifed');
        done();
      });
  });

  it('Should not Fetch a parcel delivery order if ParcelId is Wrong ', (done) => {
    chai.request(app)
      .get('/api/v1/users/1/1.5')
      .set('x-access-token',token)
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.equal(res.body.errors,  'Parcel Id is Invalid');
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
        assert.equal(res.status, 200);
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

describe('/GET catch all errors', () => {
  it('it should catch all errors', (done) => {
    chai.request(app)
      .get('/api/v1/dfthhyree')
      .end((err, res) => {
        assert.equal(res.status, 404);
        assert.typeOf(res.body, 'object');
        done();
      })
  });
});