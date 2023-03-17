// deno-lint-ignore-file no-explicit-any
import {
  assertSpyCall,
  assertSpyCalls,
  returnsNext,
  stub,
} from 'std/testing/mock.ts'
import { assertEquals } from 'std/testing/asserts.ts'

import { _internals, createCompletion } from '../src/openai/api.ts'
import { apiResponse, messages, model } from './test_data.ts'

const response = {
  data: apiResponse,
}

Deno.test('createCompletion handles data correctly', async () => {
  const createChatCompletionStub = stub(
    _internals.openai,
    'createChatCompletion',
    returnsNext([new Promise((resolve) => resolve(response as any))]),
  )

  try {
    const data = await createCompletion(messages, model)
    assertEquals(data, apiResponse)
  } finally {
    createChatCompletionStub.restore()
  }

  assertSpyCall(createChatCompletionStub, 0, {
    args: [{ model, messages }],
    returned: new Promise((resolve) => resolve(response as any)),
  })

  assertSpyCalls(createChatCompletionStub, 1)
})

Deno.test('createCompletion handles API failure correctly', async () => {
  const data = await createCompletion(messages, model)

  assertEquals(data, null)
})
