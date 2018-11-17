import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
describe('/GET/:userId/parcels', () => {
    it('Should Fetch all parcel delivery orders by a specific user', (done) => {
      chai.request(app)
        .get('/api/v1/users/0/parcels')
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.typeOf(res.body, 'object', 'we have an object');
          done();
        });
    });
});
describe('/GET/:userId/:parcelId', () => {
  it('Should Fetch all parcel delivery orders by a specific user', (done) => {
    chai.request(app)
      .get('/api/v1/users/0/1')
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.typeOf(res.body, 'object', 'we have an object');
        done();
      });
  });
});
  