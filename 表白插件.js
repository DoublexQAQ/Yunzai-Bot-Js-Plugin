//作者:Double,github:https://github.com/DoublexQAQ
//本JS插件仅作交流学习。
import plugin from '../../lib/plugins/plugin.js'
import fetch from 'node-fetch'

export class biaobai extends plugin {
    constructor() {
        super({
            name: '表白',
            dsc: '表白',
            event: 'message',
            priority: -9999999999999999999999,
            rule: [
                {
                    reg: '^#?(喜欢你|我喜欢你)',
                    fnc: 'biaobai'
                },
              
            ]
        })
    }
    async biaobai(e) {
         e.reply('撒花！Ｏ(≧▽≦)Ｏ ，在一起！在一起！')
         e.reply(segment.image('https://api.qtkj.love/api/shouxie/tu_shouxie_lyyai.php?type=image&text=你'))
         e.reply('有情人终成眷属！！！')
         e.reply(segment.image('https://api.qtkj.love/api/shouxie/tu_shouxie_ai.php?type=image&text=你的'))
         return true
}
}
