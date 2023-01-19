import stubber from 'async-repl/stubber';
import repl from 'repl';
import logger from './log.js';

class Repl {
  constructor(props) {
    if (props.initializeContext) {
      this._initializeContext = props.initializeContext
    }
  }

  initialize() {
    // contextを設定. callbackで渡す
    if (this.server && this._initializeContext) {
      this._initializeContext(this.server.context)
    }
  }

  start() {
    this.server = repl.start({
      prompt: '>> ',
    })
    // await可能にする。
    stubber(this.server)
    this.initialize()

    logger.log('Start sequelize-tinker! \nType ^C to exit.\n')
    logger.log('ex: User.findOne()')

    this.server.on('exit', this.exit)
    this.server.on('line', this.line)
  }

  exit() {
    logger.log('Bye!')
  }

  line() {

  }
}

module.exports = Repl
