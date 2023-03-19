import { assertEquals } from 'std/testing/asserts.ts'

import { getStartMessages, newMessage } from '../src/openai/prompt.ts'
import { systemPrompt, testMessage } from './test_data.ts'

Deno.test('getStartMessages returns correct data', () => {
  const messages = getStartMessages(systemPrompt)

  assertEquals(messages[0], { role: 'system', content: systemPrompt })
})

Deno.test('getMessages returns correct data', () => {
  const message = newMessage(testMessage)

  assertEquals(message, { role: 'user', content: testMessage })
})
