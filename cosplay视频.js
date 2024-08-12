//作者:Double,github:https://github.com/DoublexQAQ
//本JS插件仅作交流学习。
import plugin from '../../lib/plugins/plugin.js'

export class example extends plugin {
  constructor () {
    super({
      name: 'cos视频',
      dsc: '发送cosplay视频',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: '^#?cosplay视频',//可自行更改指令
          fnc: 'start'
        }
      ]
    })
  }

  async start(e) {
    e.reply('正在发送cosplay视频')
    e.reply(segment.video('http://api.yujn.cn/api/COS.php?type=video'))
    //api地址可自行更改
    return true
}
}
