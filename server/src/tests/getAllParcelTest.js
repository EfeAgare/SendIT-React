import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';


chai.use(chaiHttp);
describe('/GET', () => {
  it('Should Fetch all parcel delivery orders', (done) => {
    chai.request(app)
      .get('/api/v1/parcels')
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.typeOf(res.body, 'object');
        done();
      });
  });
});