import { createCompletion } from './util/openai.ts'

if (import.meta.main) await createCompletion('Say this is a test')
