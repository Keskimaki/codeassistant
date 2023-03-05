import { Input } from 'cliffy/prompt/mod.ts'
import { ChatCompletionRequestMessage } from 'openai'

import { createCompletion } from './openai/api.ts'

export const getMessage = async () => {
  const message = await Input.prompt({
    message: 'Enter your message',
    minLength: 3,
  })

  return message
}

export const getCompletion = async (
  messages: ChatCompletionRequestMessage[],
) => {
  const data = await _internals.createCompletion(messages)

  const response = data?.choices[0].message?.content

  if (!response) throw new Error('No response from OpenAI API')

  return response
}

export const _internals = {
  createCompletion,
}
