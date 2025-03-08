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
    // 创建一个包含所有回复内容的数组
    const replies = [
        '撒花！Ｏ(≧▽≦)Ｏ ，在一起！在一起！',
        segment.image('https://shanhe.kim/api/qq/ju2.php?msg=喜欢你'),
        '有情人终成眷属！！！',
        segment.image('https://www.hhlqilongzhu.cn/api/tu_aijbkc.php?name=答应我')
    ];

    // 生成一个0到回复数组长度之间的随机索引
    const randomIndex = Math.floor(Math.random() * replies.length);

    // 根据随机索引发送一个随机的回复
    e.reply(replies[randomIndex]);

    return true;
}


}
