//作者:Double,github:https://github.com/DoublexQAQ
//本JS插件仅作交流学习。
import plugin from '../../lib/plugins/plugin.js'

export class example extends plugin {
  constructor () {
    super({
      name: '猫猫图片JS插件',
      dsc: '发送猫猫图片',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: '^#?(猫猫|猫猫图片)',
          fnc: 'start'
        }
      ]
    })
  }

  async start(e) {
    e.reply('正在发送猫猫图片')
    e.reply(segment.image('http://www.yujn.cn/api/maomi.php?type=image'))
    //api地址可自行更改
    return true
}
}
