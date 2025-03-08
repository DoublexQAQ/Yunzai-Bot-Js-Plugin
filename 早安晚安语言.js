//作者:Double,github:https://github.com/DoublexQAQ
//本JS插件仅作交流学习。
import plugin from '../../lib/plugins/plugin.js';

export default class ExamplePlugin extends plugin {
    constructor() {
        super({
            name: '早安午安晚安语音',
            dsc: '发送语音',
            event: 'message',
            priority: 5000,
            rule: [
                {
                    reg: '^#?(早啊|早安)',
                    fnc: 'zao'
                },
                {
                    reg: '^#?(睡觉|晚安)',
                    fnc: 'wan'
                }
            ]
        });
    }

    async zao(e) {
        e.reply('早安！');
        // 发送音频消息
        e.reply(segment.record('https://api.lolimi.cn/API/yyhc/./data/fad5e0ecd3.mp3'));

        return true;
    }
    async wan(e) {
        e.reply('晚安！');
        // 发送音频消息
        e.reply(segment.record('https://api.lolimi.cn/API/yyhc/./data/80657e9502.mp3'));
        
        return true;
    }
}