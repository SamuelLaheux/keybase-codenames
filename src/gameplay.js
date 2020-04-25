const { shuffle } = require('./utils')
const WORDLIST = require('../data/wordlist.json')

const RED = '🔴'
const BLUE = '🔵'
const BLACK = '⚫'
const WHITE = '⚪'

module.exports = exports = class Gameplay {

  #wordList = shuffle(WORDLIST).slice(0, 25)
  #wordColor = shuffle([
    BLACK,
    WHITE, WHITE, WHITE, WHITE, WHITE, WHITE, WHITE,
    BLUE, BLUE, BLUE, BLUE, BLUE, BLUE, BLUE, BLUE,
    RED, RED, RED, RED, RED, RED, RED, RED, RED
  ])
  #disclosed = (new Array(25)).fill(false)

  constructor() {
  }

  get wordList() {
    return [...this.#wordList]
  }

  get wordColor() {
    return [...this.#wordColor]
  }

  get gameBoard() {
    return this.#wordList.map((w, i) => (this.#disclosed[i] ? this.#wordColor[i] + ' ' : '') + w)
  }

  discloseWord(word) {

    const i = this.#wordList.indexOf(word)
    if (i === -1) {
      return false
    }

    this.#disclosed[i] = true

    return true
  }
}
