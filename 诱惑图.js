//作者:Double,github:https://github.com/DoublexQAQ
//本JS插件仅作交流学习。
import plugin from '../../lib/plugins/plugin.js'

export class example extends plugin {
  constructor () {
    super({
      name: '诱惑图片JS插件',
      dsc: '发送诱惑图片',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: '^#?(诱惑|诱惑图片|yh)',
          fnc: 'start'
        }
      ]
    })
  }

  async start(e) {
    e.reply('正在发送诱惑图片')//此处可删除，删除后不会发送此段消息
    e.reply(segment.image('http://api.yujn.cn/api/yht.php?type=image'))
    //api地址可自行更改
    return true
}
}
