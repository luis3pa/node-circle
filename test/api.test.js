const request = require('supertest');
const app = require('../index');


describe('/person/:id',()=>{
    it('respond json person', done => {
        request(app)
            .get('/person/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200, done);
    });
})

describe('/father/:id_father',()=>{
    it('respond json father', done => {
        request(app)
            .get('/father/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200, done);
    });
})

describe('/mother/:id_mother',()=>{
    it('respond json  mother', done => {
        request(app)
            .get('/mother/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200, done);
    });
})

describe('/child/:id_child',()=>{
    it('respond json child', done => {
        request(app)
            .get('/child/#')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200, done);
    });
})