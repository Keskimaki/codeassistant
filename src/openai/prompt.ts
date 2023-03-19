import { ChatCompletionRequestMessage } from 'openai'

export const systemPrompt = 'You are a helpful and very capable coding assistant.'

export const getStartMessages = (prompt: string): ChatCompletionRequestMessage[] => {
  const systemMessage: ChatCompletionRequestMessage = {
    role: 'system',
    content: prompt,
  }

  return [
    systemMessage,
  ]
}

export const newMessage = (message: string): ChatCompletionRequestMessage => ({
  role: 'user',
  content: message,
})
