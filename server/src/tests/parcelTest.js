import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import parcels from '../models/parcels';


chai.use(chaiHttp);
describe('/GET/:parcelId', () => {
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
        deliveryAddress:{
            firstName: 'Success',
            lastName:'Shaw',
            streetAddress:'9 izomo street',
            addressCity:'Warri',
            addressState:'Delta'
        },
        expectedArrival:{
          from:'2011-11-11 14:48',
          to:'2011-11-18 14:48',
        },
        itemShipped:{
            name:'Dell Inspiron n411z',
            description:'Dell mini 4gb ram black',
          },
          email:"hrtiuo@yahoo.com",
          phoneNumber:"09070911674",
        status:"in transit"
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
      .put('/api/v1/parcels/0/cancel')
      .send({
        deliveryAddress:{
            firstName: 'Success',
            lastName:'Shaw',
            streetAddress:'9 izomo street',
            addressCity:'Warri',
            addressState:'Delta'
        },
        expectedArrival:{
          from:'2011-10-10 14:48',
          to:'2011-10-20 14:48',
        },
        itemShipped:{
            name:'Dell Inspiron n411z',
            description:'Dell mini 4gb ram black',
            
        },
         email:"hrtiuo@yahoo.com",
        phoneNumber:"09070911674",
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