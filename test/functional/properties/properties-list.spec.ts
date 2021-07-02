import test from 'japa'
import supertest from 'supertest'
import HttpStatus from 'http-status-codes'
import Logger from '@ioc:Adonis/Core/Logger'

import _ from 'lodash'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/properties`

test.group('Check Properties Controller', () => {
  test('check list', async (assert) => {
    /**
     * Make request
     */
    const response = await supertest(BASE_URL).get('/').expect(200)

    assert.equal(response.status, HttpStatus.OK)
  })

  test('check list with year filter', async (assert) => {
    /**
     * Make request
     */

    const response = await supertest(BASE_URL).get('/').query({ year: 2015 }).expect(200)
    assert.equal(response.status, HttpStatus.OK)

    const first = _.head(response.body.data)
    if (first) {
      Logger.info('year, first founded')
      assert.equal(first.year, 2015)
    }
  })

  test('check list with city filter', async (assert) => {
    /**
     * Make request
     */

    const response = await supertest(BASE_URL).get('/').query({ city: 'bogota' }).expect(200)
    assert.equal(response.status, HttpStatus.OK)

    const first = _.head(response.body.data)
    if (first) {
      Logger.info('city, first founded')
      assert.equal(first.city, 'bogota')
    }
  })

  test('check list with address filter', async (assert) => {
    /**
     * Make request
     */

    const response = await supertest(BASE_URL).get('/').query({ address: 'carrera' }).expect(200)
    assert.equal(response.status, HttpStatus.OK)
  })

  test('check list with price filter', async (assert) => {
    /**
     * Make request
     */

    const response = await supertest(BASE_URL).get('/').query({ price: 325000000 }).expect(200)
    assert.equal(response.status, HttpStatus.OK)

    const first = _.head(response.body.data)
    if (first) {
      Logger.info('price, first founded')
      assert.equal(first.price, 325000000)
    }
  })

  test('check list with description filter', async (assert) => {
    /**
     * Make request
     */

    const response = await supertest(BASE_URL)
      .get('/')
      .query({ description: 'carrera' })
      .expect(200)
    assert.equal(response.status, HttpStatus.OK)
  })

  test('check page and limit in list', async (assert) => {
    /**
     * Make request
     */

    const response = await supertest(BASE_URL).get('/').query({ page: 2, limit: 35 }).expect(200)
    assert.equal(response.status, HttpStatus.OK)

    assert.equal(response.body.meta.current_page, 2)
    assert.equal(response.body.meta.per_page, 35)
  })
})
