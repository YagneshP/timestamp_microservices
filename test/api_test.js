const { assert } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

describe('/GET/:date? timestamp', function(){
	it('it should return json with unix and utc', (done)=>{
		let date = '1451001600000';
		chai.request(server)
				.get('/api/timestamp/' + date)
				.send({unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT"})
				.end((err,res)=>{
					assert.equal(res.status, 200, 'response status should be 200');
					assert.equal(res.type,'application/json');
					assert.equal(res.body.unix,1451001600000);
					assert.equal(res.body.utc,'Fri, 25 Dec 2015 00:00:00 GMT');
				});
				done();
	})
});
describe('/GET/api/timestamp', function(){
	it('it should return json with unix and utc value with current date/time', (done)=>{
		let unixDate = Date.now();
		let utcDate = Date()
		chai.request(server)
				.get('/api/timestamp/')
				.send({unix: unixDate, utc: utcDate})
				.end((err,res)=>{
					assert.equal(res.status, 200, 'response status should be 200');
					assert.equal(res.type,'application/json');
					assert.equal(res.body.unix,unixDate);
					assert.equal(res.body.utc,utcDate);
				});
				done();
	})
})