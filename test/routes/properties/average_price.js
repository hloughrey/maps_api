process.env.NODE_ENV = 'test';
const Routes = require('../../../routes/properties/average_price');

/* Initiate Chai */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../app');
const shoud = chai.should();

chai.use(chaiHttp);

  describe('/GET property/averageprice', () => {
    it('should GET the average Rent price for a given Postcode', (done) => {
      const testCase = {
        postcode: 'B30',
        listing_status: 'rent'
      };
      chai.request(server)
          .get(`/property/averageprice?postcode=${testCase.postcode}&listing_status=${testCase.listing_status}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql('Success');
            res.body.should.have.property('message').eql('Resource found');
            res.body.should.have.property('data');
            done();
          });
    });
  });

  describe('/GET property/averageprice', () => {
    it('should GET the average Rent price for a given Postcode and min Bedrooms', (done) => {
      const testCase = {
        postcode: 'B30',
        listing_status: 'rent',
        minimum_beds: 2
      };
      chai.request(server)
          .get(`/property/averageprice?postcode=${testCase.postcode}&
                listing_status=${testCase.listing_status}&
                minimum_beds=${testCase.minimum_beds}`.replace(/(\n                )/g, ''))
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql('Success');
            res.body.should.have.property('message').eql('Resource found');
            res.body.should.have.property('data');
            done();
          });
    });
  });

  describe('/GET property/averageprice', () => {
    it('should not GET the average Rent price if a Postcode is not given', (done) => {
      const testCase = {
        listing_status: 'rent',
        minimum_beds: 2
      };
      chai.request(server)
          .get(`/property/averageprice?listing_status=${testCase.listing_status}&
                minimum_beds=${testCase.minimum_beds}`.replace(/(\n                )/g, ''))
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql('Error');
            res.body.should.have.property('message').eql('Resource not found');
            done();
          });
    });
  });

  describe('/GET property/averageprice', () => {
    it('should GET the average Sale price for a given Postcode', (done) => {
      const testCase = {
        postcode: 'B30',
        listing_status: 'sale'
      };
      chai.request(server)
          .get(`/property/averageprice?postcode=${testCase.postcode}&listing_status=${testCase.listing_status}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql('Success');
            res.body.should.have.property('message').eql('Resource found');
            res.body.should.have.property('data');
            done();
          });
    });
  });

  describe('/GET property/averageprice', () => {
    it('should GET the average Sale price for a given Postcode and min Bedrooms', (done) => {
      const testCase = {
        postcode: 'B30',
        listing_status: 'sale',
        minimum_beds: 2
      };
      chai.request(server)
          .get(`/property/averageprice?postcode=${testCase.postcode}&
                listing_status=${testCase.listing_status}&
                minimum_beds=${testCase.minimum_beds}`.replace(/(\n                )/g, ''))
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql('Success');
            res.body.should.have.property('message').eql('Resource found');
            res.body.should.have.property('data');
            done();
          });
    });
  });

  describe('/GET property/averageprice', () => {
    it('should not GET the average Sale price if a Postcode is not given', (done) => {
      const testCase = {
        listing_status: 'sale',
        minimum_beds: 2
      };
      chai.request(server)
          .get(`/property/averageprice?listing_status=${testCase.listing_status}&
                minimum_beds=${testCase.minimum_beds}`.replace(/(\n                )/g, ''))
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql('Error');
            res.body.should.have.property('message').eql('Resource not found');
            done();
          });
    });
  });
