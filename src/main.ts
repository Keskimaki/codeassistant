import { Command, EnumType } from 'cliffy/command/mod.ts'
import { colors } from 'cliffy/ansi/colors.ts'
import { renderMarkdown } from 'charmd/mod.ts'

import { Options } from './types.ts'
import { getCompletion, getMessage } from './input.ts'
import { systemPrompt, getStartMessages, newMessage } from './openai/prompt.ts'
import logger from './util/logger.ts'

const modelType = new EnumType(['gpt-3.5-turbo', 'gpt-4'])

const start = async (options: Options) => {
  const { model, system } = options

  let messages = getStartMessages(system)

  while (true) {
    const message = await getMessage()

    if (['q', 'quit'].includes(message)) Deno.exit(0)
    if (['r', 'reset'].includes(message)) {
      messages = getStartMessages(system)
      continue
    }

    messages.push(newMessage(message))

    const response = await getCompletion(messages, model)
    const formattedResponse = colors.white(renderMarkdown(response))

    logger.info(formattedResponse)
  }
}

const main = async () => {
  await new Command()
    .name('codeassistant')
    .version('0.0.1')
    .description('OpenAI API powered coding assistant')
    .type('model', modelType)
    .option('-m, --model <model:string>', 'OpenAI API model to use', {
      default: 'gpt-4',
    })
    .option('-s, --system <system:string>', 'System prompt to use', {
      default: systemPrompt,
    })
    .action((options) => start(options as Options))
    .parse(Deno.args)
}

main()
