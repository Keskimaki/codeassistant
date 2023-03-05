import { load } from 'std/dotenv/mod.ts'

const env = await load()

export const OPENAI_API_KEY = env.OPENAI_API_KEY
