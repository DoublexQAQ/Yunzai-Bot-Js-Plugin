//作者:Double,github:https://github.com/DoublexQAQ
//本JS插件仅作交流学习。
import plugin from '../../lib/plugins/plugin.js'

export class example extends plugin {
  constructor () {
    super({
      name: '纯欲视频',
      dsc: '发送纯欲视频',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: '^#?(纯欲|纯欲视频)',
          fnc: 'start'
        }
      ]
    })
  }

  async start(e) {
    e.reply('正在发送又纯又欲视频')
    e.reply(segment.video('https://api.qtkj.love/api/ycyy.php?type=mp4'))
    //api地址可自行更改
    return true
}
}
