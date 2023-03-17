import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai'

import { Model } from '../types.ts'
import { OPENAI_API_KEY } from '../util/config.ts'
import logger from '../util/logger.ts'

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

export const createCompletion = async (
  messages: ChatCompletionRequestMessage[],
  model: Model,
) => {
  try {
    const { data } = await openai.createChatCompletion({
      model,
      messages,
    })

    logger.debug('OpenAI API response', { data })

    return data
  } catch (err) {
    if (err.response) {
      logger.error('OpenAI API error', {
        status: err.response.status,
        error: err.response.data,
      })
    } else {
      logger.error('OpenAI API error', { error: err.message })
    }

    return null
  }
}

export const _internals = {
  openai,
}
