import plugin from '../../lib/plugins/plugin.js'

export class example extends plugin {
  constructor () {
    super({
      name: '女高学生视频',
      dsc: '发送快手视频',
      // 匹配的消息类型，参考https://oicqjs.github.io/oicq/#events
      event: 'message',
      priority: -500000000,
      rule: [
        {
          reg: '^#?女大',
          fnc: 'start'
        }
      ]
    })
  }

   async start(e) {
    e.reply('等等马上来')
    e.reply(segment.video('https://api.kuleu.com/api/xjj?type=json'))
    return true
}
}
