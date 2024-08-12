// 插件作者 xiaotian2333
// 开源地址 https://github.com/xiaotian2333/yunzai-plugins-Single-file


import plugin from '../../lib/plugins/plugin.js'

export class example extends plugin {
  constructor () {
    super({
      name: '小姐姐视频',
      dsc: '发送随机小姐姐视频',
      // 匹配的消息类型，参考https://oicqjs.github.io/oicq/#events
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: '^#?xjj',
          fnc: 'start'
        }
      ]
    })
  }

  async start(e) {
    e.reply('正在发送随机小姐姐视频')//此处可删除，删除后不会发送此段消息
    e.reply(segment.video('https://api.kuleu.com/api/xjj?type=JSON'))
    return true
}
}
