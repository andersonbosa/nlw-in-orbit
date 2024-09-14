import { after, before, describe, test } from 'node:test'
import assert from 'node:assert'
import supertest from 'supertest'
import type { Server } from 'node:http'

import { app } from './server'

describe('HTTP Server tests', () => {
  let httpServer: Server

  before(async () => {
    httpServer = app.server
  })

  after(async () => {
    httpServer.close()
  })

  test('POST /api/goals/create - should create a goal successfully', async () => {
    const response = await supertest(httpServer)
      .post('/api/goals/create')
      .send({
        title: 'Study TypeScript',
        desiredWeeklyFrequency: 3,
      })

    assert.strictEqual(response.statusCode, 200)
    assert.ok(response.body.data)
    assert.strictEqual(response.body.data.title, 'Study TypeScript')
  })

  test('GET /api/goals/get-pendings - should return pending goals', async () => {
    const response = await supertest(httpServer).get('/api/goals/get-pendings')

    assert.strictEqual(response.statusCode, 200)
    assert.ok(response.body.data)
    assert.ok(Array.isArray(response.body.data))
  })

  test('POST /api/goals/get-completions - should complete a goal', async () => {
    const response = await supertest(httpServer)
      .post('/api/goals/get-completions')
      .send({ goalId: 'valid-goal-id' })

    assert.strictEqual(response.statusCode, 200)
    assert.ok(response.body.data)
  })
})
