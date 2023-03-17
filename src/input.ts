import { Input } from 'cliffy/prompt/mod.ts'
import { ChatCompletionRequestMessage } from 'openai'

import { Model } from './types.ts'
import { createCompletion } from './openai/api.ts'

export const getMessage = async () => {
  const message = await Input.prompt({
    message: 'Enter your message',
    minLength: 1,
  })

  return message
}

export const getCompletion = async (
  messages: ChatCompletionRequestMessage[],
  model: Model,
) => {
  const data = await _internals.createCompletion(messages, model)

  const response = data?.choices[0].message?.content

  if (!response) throw new Error('No response from OpenAI API')

  return response
}

export const _internals = {
  createCompletion,
}
