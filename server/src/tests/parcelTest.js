import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';



chai.use(chaiHttp);
describe('/POST/auth/login', () => {
  it('Should login a user', (done) => {
  chai.request(app)
  .post('/api/v1/auth/login')
  .send(login)
      .end((err, res) => {
        token = res.body.token
        assert.equal(res.status, 201);
        assert.typeOf(res.body.data, 'array');
        done();
      });
  });
});
  

describe('/POST', () => {
  it('Should Create a parcel delivery order', (done) => {
    chai.request(app)
      .set('x-access-token',token)
      .post('/api/v1/parcels/')
      .send(parcelsOrder)
      .end((err, res) => {
        console.log(res.body)
        assert.equal(res.status, 200);
        assert.typeOf(res.body, 'object', 'we have an object');
        done();
      });
  });
});

describe('/PUT', () => {
  it('Should Cancel a parcel delivery order', (done) => {
    chai.request(app)
      .set('x-access-token',token)
      .put('/api/v1/parcels/1/cancel')
      .send({

            "firstName" : "knowledge",
            "lastName":"kyky" , 
            "deliveryAddress":"thkjkhvbnjmjhjckvb",
            "deliveryLGA" :"xcfvujhbkn" ,
            "deliveryState" :"fffdxcvjb",
            "deliveryStreet":"ezxctvbnkjmk", 
            "deliveryEmail" :"ert@gmail.com",
            "deliveryPNumber":"08053456789",
            "deliveryTime":"2011-10-10 18:40",
            "pickUpState":"hfvjbynkm",
            "pickUpLGA":"htcfjvbn",
            "pickUpStreet":"gzrgxcfgvjb",
            "pickUpPhoneNumber":"09070911675",
            "currentLocation":"Lagos",
            "itemDescription":"fdd hgjb",
            "itemName":"dell",
            "itemWeight":"56",
            "itemQuantity":"4",
            status:"cancel"        
      })
      .end((err, res) => {
        console.log(res.body)
        assert.equal(res.status, 200);
        assert.typeOf(res.body, 'object', 'we have an object');
        done();
      });
  });
});
