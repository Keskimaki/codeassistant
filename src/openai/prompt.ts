import { ChatCompletionRequestMessage } from 'openai'

const systemPrompt = 'You are a helpful and very capable coding assistant.'

const systemMessage: ChatCompletionRequestMessage = {
  role: 'system',
  content: systemPrompt,
}

export const getStartMessages = (): ChatCompletionRequestMessage[] => [
  systemMessage,
]

export const newMessage = (message: string): ChatCompletionRequestMessage => ({
  role: 'user',
  content: message,
})
