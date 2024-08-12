import plugin from '../../lib/plugins/plugin.js';

export class example extends plugin {
    constructor() {
        super({
            name: '撒娇JS插件',
            dsc: '发送撒娇语音',
            event: 'message',
            priority: 5000,
            rule: [
                {
                    reg: '^#?撒娇',
                    fnc: 'start'
                }
            ]
        });
    }

    async start(e) {
        e.reply('你个坏蛋！(ノ｀⊿´)ノ');
        // 发送音频消息
        e.reply(segment.record('http://api.yujn.cn/api/yujie.php?type=audio'));

        return true;
    }
}