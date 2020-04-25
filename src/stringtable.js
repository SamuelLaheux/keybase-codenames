const stringWidthFn = require('string-width')
const stringRepeatFn = require('repeat-string')
const { trimVert, windowed } = require('./utils')

module.exports = exports = function (source, numcol) {
  let maxWidth = 1
  const stringValues = []
  for (let i = 0; i < source.length; i++) {
    const value = source[i]
    const stringValue = value === null || value === undefined ? '' : String(value)
    const stringWidth = stringWidthFn(stringValue)
    stringValues[i] = stringValue
    if (stringWidth > maxWidth) {
        maxWidth = stringWidth
    }
  }

  const lineWidth = (numcol * (maxWidth + 3)) + 1

  const rowReducer = (row, cell) => row + `| ` + cell + stringRepeatFn(' ', maxWidth - stringWidthFn(cell) + 1)
  const tableReducer = (table, currRow, i) => trimVert(table + `\n` + currRow.reduce(rowReducer, '') + '|') + `\n` + stringRepeatFn('-', lineWidth)

  return windowed(stringValues, numcol).reduce(tableReducer, stringRepeatFn('-', lineWidth))
}
