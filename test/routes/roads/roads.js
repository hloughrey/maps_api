process.env.NODE_ENV = 'test';

let Routes = require('../../../routes/roads/');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../../app');
let should = chai.should();

chai.use(chaiHttp);

  describe('/GET roads/:id', () => {
    it('should GET a road by a given id', (done) => {
      const roadID = 1;
      chai.request(server)
          .get('/roads/' + roadID)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql('Success');
            res.body.should.have.property('message').eql('Resource found')
            res.body.should.have.property('data');
            res.body.data.should.be.a('object');
            res.body.data.should.have.property('id');
            res.body.data.should.have.property('roadname');
            res.body.data.should.have.property('town');
            res.body.data.should.have.property('open');
            res.body.data.should.have.property('notes');
            res.body.data.should.have.property('geom');
            done();
          });
    })
  })

  describe('/POST /roads/:bbox', () => {
    it('should GET all roads within a given bounding box', (done) => {
      const bbox = '321924.053508022,214349.102462895,376943.40395109,277839.588500316';
      chai.request(server)
          .post('/roads/' + bbox)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql('Success');
            res.body.should.have.property('message').eql('Resource found')
            res.body.should.have.property('data');
            res.body.data.should.be.a('array');
            res.body.data[0].should.be.a('object')
            res.body.data[0].should.have.property('id');
            res.body.data[0].should.have.property('roadname');
            res.body.data[0].should.have.property('town');
            res.body.data[0].should.have.property('open');
            res.body.data[0].should.have.property('notes');
            res.body.data[0].should.have.property('geom');
            done();
          });
    })
  })

  describe('/POST /roads/:bbox', () => {
    it('should not GET any roads if bounding box contains strings', (done) => {
      const bbox = '321924.053508022,214349.102462895,abc,277839.588500316';
      chai.request(server)
          .post('/roads/' + bbox)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql('Error');
            res.body.should.have.property('message').eql('Format of parameters is incorrect');
            done();
          });
    })
  })

  describe('/POST /roads/:bbox', () => {
    it('should not GET any roads if bounding box contains less than 4 coordinates', (done) => {
      const bbox = '321924.053508022,214349.102462895,376943.40395109';
      chai.request(server)
          .post('/roads/' + bbox)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql('Error');
            res.body.should.have.property('message').eql('Format of parameters is incorrect');
            done();
          });
    })
  })

  describe('/PUT roads/:id', () => {
    it('should update a roads open & notes fields given an id', (done) => {
      const testCase = {
        roadID: 1,
        roadStatus: true,
        roadNotes: 'Testing'
      };
      chai.request(server)
          .put('/roads/' + testCase.roadID + '?open=' + testCase.roadStatus + '&notes=' + testCase.roadNotes)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql('Success');
            res.body.should.have.property('message').eql('Resource found')
            done();
          })
    })
  })

  describe('/PUT roads/:id', () => {
    it('should not update a roads open & notes fields if the given an id doesnt exist', (done) => {
      const testCase = {
        roadID: 0,
        roadStatus: true,
        roadNotes: 'Testing'
      };
      chai.request(server)
          .put('/roads/' + testCase.roadID + '?open=' + testCase.roadStatus + '&notes=' + testCase.roadNotes)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql('Error');
            res.body.should.have.property('message').eql('Resource not found')
            done();
          })
    })
  })
