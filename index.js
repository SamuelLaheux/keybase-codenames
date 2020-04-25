#!/usr/bin/env node
const rules = require('./data/rules')
const stringTable = require('./src/stringtable')
const Gameplay = require('./src/gameplay')
const Bot = require('keybase-bot')

const bot = new Bot()

let game = null
let size = 5

async function main() {
  try {
    const username = process.env.KB_USERNAME
    const paperkey = process.env.KB_PAPERKEY
    await bot.init(username, paperkey)
    console.log(`Echo bot initialized with username ${bot.myInfo().username}.`)

    const onMessage = async message => {
      if (message.content.type !== 'text') {
        return
      }

      if (message.content.text.body === '!codenames' || message.content.text.body === '!codenames ') {
        game = new Gameplay()

        await bot.chat.send(message.conversationId, {
          body: rules,
        })

        let gameBoardTable = stringTable(game.gameBoard, size)
        await bot.chat.send(message.conversationId, {
          body: '```\n' + gameBoardTable + '\n```',
        })

        let colorTable = `||\n` + stringTable(game.wordColor, size) + `\n||`
        await bot.chat.send(message.conversationId, {
          body: colorTable,
        })
        return
      }

      if (game === null) {
        return
      }

      if (message.content.text.body.startsWith('!!') && game.discloseWord(message.content.text.body.replace('!!', ''))) {
        let gameBoardTable = stringTable(game.gameBoard, size)
        await bot.chat.send(message.conversationId, {
          body: '```\n' + gameBoardTable + '\n```',
        })
        return
      }
    }

    const onError = e => console.error(e)
    console.log(`Listening for messages...`)
    await bot.chat.watchAllChannelsForNewMessages(onMessage, onError)
  } catch (error) {
    console.error(error)
  }
}

async function shutDown() {
  await bot.deinit()
  process.exit()
}

process.on('SIGINT', shutDown)
process.on('SIGTERM', shutDown)

main()
