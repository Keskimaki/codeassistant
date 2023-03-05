import {
  assertSpyCall,
  assertSpyCalls,
  returnsNext,
  stub,
} from 'std/testing/mock.ts'
import { assertEquals } from 'std/testing/asserts.ts'

import { _internals, getCompletion } from '../src/input.ts'
import { apiResponse, messages } from './data.ts'

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
