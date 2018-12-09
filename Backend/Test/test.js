var chai = require('chai')
  , chaiHttp = require('chai-http');

chai.use(chaiHttp);

var should = chai.should();


describe('Fetch property details', function() { 
    this.timeout(10000);
    it("Should fetch property and return status code", function(done){
        chai.request('http://localhost:3001')
        .get('/propertyDetails?id=39')
        .end(function (err, res) {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.a.property('property_id');
            res.body.property_id.should.equal(39);
            done();
        });
    });
});

describe('Fetch non-existent property details', function() { 
    this.timeout(10000);
    it("Should fetch property and return status code", function(done){
        chai.request('http://localhost:3001')
        .get('/propertyDetails?id=444')
        .end(function (err, res) {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.be.empty;
            done();
        });
    });
});
