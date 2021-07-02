import test from 'japa'
import supertest from 'supertest'
import HttpStatus from 'http-status-codes'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/properties`

test.group('Check List Property Validator', () => {
  test('check validator fot year', async (assert) => {
    /**
     * Make request
     */
    const response = await supertest(BASE_URL).get('/').query({ year: 'test' }).expect(422)

    assert.equal(response.status, HttpStatus.UNPROCESSABLE_ENTITY)
  })

  test('check validator fot price', async (assert) => {
    /**
     * Make request
     */
    const response = await supertest(BASE_URL).get('/').query({ price: 'test' }).expect(422)

    assert.equal(response.status, HttpStatus.UNPROCESSABLE_ENTITY)
  })

  test('check validator fot page', async (assert) => {
    /**
     * Make request
     */
    const response = await supertest(BASE_URL).get('/').query({ page: 'test' }).expect(422)

    assert.equal(response.status, HttpStatus.UNPROCESSABLE_ENTITY)
  })

  test('check validator fot limit', async (assert) => {
    /**
     * Make request
     */
    const response = await supertest(BASE_URL).get('/').query({ limit: 'test' }).expect(422)

    assert.equal(response.status, HttpStatus.UNPROCESSABLE_ENTITY)
  })
})
