import {
  ChatCompletionRequestMessage,
  CreateChatCompletionResponse,
} from 'openai'

export const messages: ChatCompletionRequestMessage[] = [
  {
    role: 'system',
    content: 'This is a test',
  },
  {
    role: 'user',
    content: 'Say this is a test',
  },
]

export const apiResponse: CreateChatCompletionResponse = {
  id: 'chatcmpl-6qk3Eq0Q3uI3bfrJGng7W1G6jK1RQ',
  object: 'chat.completion',
  created: 1678028096,
  model: 'gpt-3.5-turbo-0301',
  usage: {
    prompt_tokens: 21,
    completion_tokens: 7,
    total_tokens: 28,
  },
  choices: [{
    message: { 'role': 'assistant', 'content': 'This is a test.' },
    finish_reason: 'stop',
    index: 0,
  }],
}

export const model = 'gpt-3.5-turbo'
