import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';


chai.use(chaiHttp);
describe('/GET/parcels', () => {
  it('Should Fetch a specific parcel delivery order', (done) => {
    chai.request(app)
      .get('/api/v1/parcels/0/')
      .send(parcels)
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.typeOf(res.body, 'object', 'we have an object');
        done();
      });
  });
});

describe('/POST', () => {
  it('Should Create a parcel delivery order', (done) => {
    chai.request(app)
      .post('/api/v1/parcels/')
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
            "itemQuantity":"4"
      })
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
            status:"cancelled"        
      })
      .end((err, res) => {
        console.log(res.body)
        assert.equal(res.status, 200);
        assert.typeOf(res.body, 'object', 'we have an object');
        done();
      });
  });
});