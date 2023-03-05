import * as log from 'std/log/mod.ts'

import { inDevelopment } from './config.ts'

const logLevel = inDevelopment ? 'DEBUG' : 'INFO'

const getFormat = (logRecord: log.LogRecord) => {
  const prodFormat = logRecord.msg
  const devFormat = `${logRecord.msg} ${
    logRecord.args ? JSON.stringify(logRecord.args) : ''
  }`

  return inDevelopment ? devFormat : prodFormat
}

log.setup({
  handlers: {
    console: new log.handlers.ConsoleHandler(logLevel, {
      formatter: getFormat,
    }),
  },
  loggers: {
    default: {
      level: logLevel,
      handlers: ['console'],
    },
  },
})

const logger = log.getLogger()

export default logger
