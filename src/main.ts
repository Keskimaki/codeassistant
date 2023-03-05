import { Command } from 'cliffy/command/mod.ts'
import { Input } from 'cliffy/prompt/mod.ts'
import { colors } from 'cliffy/ansi/colors.ts'
import { renderMarkdown } from 'charmd/mod.ts'

import { createCompletion } from './openai/api.ts'
import { getStartMessages, newMessage } from './openai/prompt.ts'
import logger from './util/logger.ts'

const start = async () => {
  const messages = getStartMessages()

  while (true) {
    const message = await Input.prompt({
      message: 'Enter your message',
      minLength: 3,
    })

    messages.push(newMessage(message))

    const data = await createCompletion(messages)

    const response = data?.choices[0].message?.content

    if (!response) throw new Error('No response from OpenAI API')

    logger.info(colors.white(renderMarkdown(response)))
  }
}

await new Command()
  .name('codeassistant')
  .version('0.0.1')
  .description('OpenAI API powered coding assistant')
  .action(start)
  .parse(Deno.args)
