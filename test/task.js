import chai from 'chai'
import chaihttp from 'chai-http'
import Mocha, { it } from 'mocha'
import server from '../index.js'

//assertion style
chai.should()
chai.use(chaihttp)

describe('testing movie route', () => {
  //get route
  describe('GET /api/movies/', () => {
    it('it shooudd get all the movies', (done) => {
      chai
        .request(server)
        .get('/api/movies')
        .end((err, res) => {
          res.should.have.status(200)
        })
      done()
    })
  })

  describe('GET /api/movies/ with location and moviename and genre', () => {
    it('it shooudd get all the movies based on location and moviename and genere', (done) => {
      chai
        .request(server)
        .get(
          '/api/movies?location=Goregaon&movieName=abc&genre=action&isShowRunning=1&ticketavialable=5'
        )
        .end((err, res) => {
          res.should.have.status(200)
        })
      done()
    })
  })

  describe('GET movie location', () => {
    it('it shooudd get all the movies location', (done) => {
      chai
        .request(server)
        .get('/api/movies/getlocation')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
        })
      done()
    })
  })
})

describe('testing User route', () => {
  //get route
  describe('Testing /api/user/signup/', () => {
    it('it should return token', (done) => {
      const testingObj = {
        data: 'U2FsdGVkX19x7caMVSPZHXd5al/mKmimW/AAOZmKF06+DG6NHz/IzERwTi3uk+kkP/zhgev7aK4UEVkUkkJR0+tOV/gjTbKWwp9yl+XEL+8=',
      }

      chai
        .request(server)
        .post('/api/users/signin')
        .send(testingObj)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('token')
        })
      done()
    })
  })
})
