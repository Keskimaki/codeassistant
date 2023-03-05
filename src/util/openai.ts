import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai'

import { OPENAI_API_KEY } from './config.ts'

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

const model = 'gpt-3.5-turbo'

const systemPrompt = 'System prompt will go here.'

export const createCompletion = async (prompt: string) => {
  const messages: ChatCompletionRequestMessage[] = [
    {
      role: 'system',
      content: systemPrompt,
    },
    {
      role: 'user',
      content: prompt,
    },
  ]

  try {
    const { data } = await openai.createChatCompletion({
      model,
      messages,
    })

    console.info('OpenAI API response', { data })

    return data
  } catch (err) {
    if (err.response) {
      console.error('OpenAI API error', {
        status: err.response.status,
        error: err.response.data,
      })
    } else {
      console.error('OpenAI API error', { error: err.message })
    }

    return null
  }
}
