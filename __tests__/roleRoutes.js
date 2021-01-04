const request = require('supertest')
const app = require('../app')

describe('Reject unauthorized role creation', () => {
  it('should not create a new role without authorization', async () => {
    const res = await request(app.callback())
      .post('/api/v1/roles')
      .send({
        name: 'tester',
        description: 'Test user with full QA access to the site'
      })
    expect(res.statusCode).toEqual(401)
  })
});
