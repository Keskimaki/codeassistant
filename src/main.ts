import { Command } from 'cliffy/command/mod.ts'
import { colors } from 'cliffy/ansi/colors.ts'
import { renderMarkdown } from 'charmd/mod.ts'

import { getCompletion, getMessage } from './input.ts'
import { getStartMessages, newMessage } from './openai/prompt.ts'
import logger from './util/logger.ts'

const start = async () => {
  let messages = getStartMessages()

  while (true) {
    const message = await getMessage()

    if (['q', 'quit'].includes(message)) Deno.exit(0)
    if (['r', 'reset'].includes(message)) {
      messages = getStartMessages()
      continue
    }

    messages.push(newMessage(message))

    const response = await getCompletion(messages)
    const formattedResponse = colors.white(renderMarkdown(response))

    logger.info(formattedResponse)
  }
}

const main = async () => {
  await new Command()
    .name('codeassistant')
    .version('0.0.1')
    .description('OpenAI API powered coding assistant')
    .action(start)
    .parse(Deno.args)
}

main()
