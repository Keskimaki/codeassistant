import { Command } from 'cliffy/command/mod.ts'
import { Input } from "cliffy/prompt/mod.ts"

import { createCompletion } from './util/openai.ts'

const start = async () => {
  const prompt = await Input.prompt({
    message: 'Enter your prompt',
    minLength: 3,
  })

  createCompletion(prompt)
}

await new Command()
  .name('codeassistant')
  .version('0.0.1')
  .description('OpenAI API powered coding assistant')
  .action(start)
  .parse(Deno.args)
