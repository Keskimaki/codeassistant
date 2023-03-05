import {
  assertSpyCall,
  assertSpyCalls,
  returnsNext,
  stub,
} from 'std/testing/mock.ts'
import { assertEquals, assertRejects } from 'std/testing/asserts.ts'

import { _internals, getCompletion } from '../src/input.ts'
import { apiResponse, messages } from './test_data.ts'

Deno.test('getCompletion returns correct data', async () => {
  const createCompletionStub = stub(
    _internals,
    'createCompletion',
    returnsNext([new Promise((resolve) => resolve(apiResponse))]),
  )

  try {
    const response = await getCompletion(messages)
    assertEquals(response, 'This is a test.')
  } finally {
    createCompletionStub.restore()
  }

  assertSpyCall(createCompletionStub, 0, {
    args: [messages],
    returned: new Promise((resolve) => resolve(apiResponse)),
  })

  assertSpyCalls(createCompletionStub, 1)
})

Deno.test('getCompletion fails correctly', () => {
  assertRejects(
    async () => await getCompletion(messages),
    Error,
    'No response from OpenAI API',
  )
})
