import plugin from '../../lib/plugins/plugin.js';
import { segment } from "icqq";

export class couple extends plugin {
    constructor() {
        super({
            name: '老婆男友随机系统',
            dsc: '今日老婆和男友随机系统',
            event: 'message',
            priority: 10,
        rule: [
    {
        reg: "^#?今日老婆$",
        fnc: 'chooseWife',
    },
    {
        reg: "^#?今日男友$",
        fnc: 'chooseHusband',
    },
    {
        reg: "^#?重新娶老婆$",
        fnc: 'reChooseWife',
    },
    {
        reg: "^#?重新娶男友$",
        fnc: 'reChooseHusband',
    },
    {
        reg: "^#?分手老婆$",
        fnc: 'breakUpWife',  // 修改为分手老婆
    },
    {
        reg: "^#?分手男友$",
        fnc: 'breakUpHusband',  // 修改为分手男友
    }
]

        });
    }
// 选择今日老婆
async chooseWife(e) {
    const currentDate = new Date();
    const date_time = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

    // 检查是否已有老婆
    let data_cpname = await redis.get(`Yunzai:choulpcpname1:${e.user_id}_clp`);
    let data_cpqq = await redis.get(`Yunzai:choulpcpqq1:${e.user_id}_clp`);
    let data_cptime = await redis.get(`Yunzai:dateriqi1:${e.user_id}_clp`);
    data_cpname = JSON.parse(data_cpname);
    data_cpqq = JSON.parse(data_cpqq);
    data_cptime = JSON.parse(data_cptime);

    if (data_cptime === date_time && data_cpname && data_cpqq) {
        let msg = [
            segment.at(e.user_id),
            `\n你今天已经被她娶走了哦~`,
            segment.image(`https://q1.qlogo.cn/g?b=qq&s=0&nk=${data_cpqq}`),
            `【${data_cpname}】(${data_cpqq})\n乖乖的待在她身边不要乱跑哦~`
        ];
        e.reply(msg);
        return;
    }

    // 随机选择老婆
    let mmap = await e.group.getMemberMap();
    let arrMember = Array.from(mmap.values());
    let randomWife = arrMember[Math.floor(Math.random() * arrMember.length)];

    // 禁止抽取特定QQ号为老婆
    while (randomWife.user_id === ) {
        randomWife = arrMember[Math.floor(Math.random() * arrMember.length)];
    }

    // 发送老婆信息
    let msg = [
        segment.at(e.user_id),
        "\n你今天的群老婆是",
        segment.image(`https://q1.qlogo.cn/g?b=qq&s=0&nk=${randomWife.user_id}`),
        `【${randomWife.nickname}】(${randomWife.user_id})\n看好她哦，别让她乱跑~`
    ];
    e.reply(msg);

    // 更新Redis记录
    redis.set(`Yunzai:choulpriqi1:${e.user_id}_clp`, JSON.stringify(date_time));
    redis.set(`Yunzai:choulpcpname1:${e.user_id}_clp`, JSON.stringify(randomWife.nickname));
    redis.set(`Yunzai:choulpcpqq1:${e.user_id}_clp`, JSON.stringify(randomWife.user_id));
    redis.set(`Yunzai:dateriqi1:${randomWife.user_id}_clp`, JSON.stringify(date_time));
    redis.set(`Yunzai:choulpname1${randomWife.user_id}_clp`, JSON.stringify(e.user_id));
    redis.set(`Yunzai:choulpqq1:${randomWife.user_id}_clp`, JSON.stringify(e.nickname));
}
// 选择今日男友
async chooseHusband(e) {
    const currentDate = new Date();
    const date_time = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

    // 检查是否已有男友
    let data_cpname = await redis.get(`Yunzai:choulpcpname:${e.user_id}_clp`);
    let data_cpqq = await redis.get(`Yunzai:choulpcpqq:${e.user_id}_clp`);
    let data_cptime = await redis.get(`Yunzai:dateriqi:${e.user_id}_clp`);
    data_cpname = JSON.parse(data_cpname);
    data_cpqq = JSON.parse(data_cpqq);
    data_cptime = JSON.parse(data_cptime);

    if (data_cptime === date_time && data_cpname && data_cpqq) {
        let msg = [
            segment.at(e.user_id),
            `\n你今天已经被他娶走了哦~`,
            segment.image(`https://q1.qlogo.cn/g?b=qq&s=0&nk=${data_cpqq}`),
            `【${data_cpname}】(${data_cpqq})\n乖乖的待在他身边不要乱跑哦~`
        ];
        e.reply(msg);
        return;
    }

    // 随机选择男友
    let mmap = await e.group.getMemberMap();
    let arrMember = Array.from(mmap.values());
    let randomHusband = arrMember[Math.floor(Math.random() * arrMember.length)];

    // 禁止抽取特定QQ号为男友
    while (randomHusband.user_id === ) {
        randomHusband = arrMember[Math.floor(Math.random() * arrMember.length)];
    }

    // 发送男友信息
    let msg = [
        segment.at(e.user_id),
        "\n你今天的群男友是",
        segment.image(`https://q1.qlogo.cn/g?b=qq&s=0&nk=${randomHusband.user_id}`),
        `【${randomHusband.nickname}】(${randomHusband.user_id})\n看好他哦，别让他乱跑~`
    ];
    e.reply(msg);

    // 更新Redis记录
    redis.set(`Yunzai:choulpriqi:${e.user_id}_clp`, JSON.stringify(date_time));
    redis.set(`Yunzai:choulpcpname:${e.user_id}_clp`, JSON.stringify(randomHusband.nickname));
    redis.set(`Yunzai:choulpcpqq:${e.user_id}_clp`, JSON.stringify(randomHusband.user_id));
    redis.set(`Yunzai:dateriqi:${randomHusband.user_id}_clp`, JSON.stringify(date_time));
    redis.set(`Yunzai:choulpname${randomHusband.user_id}_clp`, JSON.stringify(e.user_id));
    redis.set(`Yunzai:choulpqq:${randomHusband.user_id}_clp`, JSON.stringify(e.nickname));
}
// 重新娶老婆
async reChooseWife(e) {
    await this.chooseWife(e);  // 调用选择老婆的函数
    redis.del(`Yunzai:choulpcpname1:${e.user_id}_clp`);
    redis.del(`Yunzai:choulpcpqq1:${e.user_id}_clp`);
}

// 重新娶男友
async reChooseHusband(e) {
    await this.chooseHusband(e);  // 调用选择男友的函数
    redis.del(`Yunzai:choulpcpname:${e.user_id}_clp`);
    redis.del(`Yunzai:choulpcpqq:${e.user_id}_clp`);
}
// 分手
// 分手男友
async breakUpHusband(e) {
    // 获取当前男友信息
    let data_cpname = await redis.get(`Yunzai:choulpcpname:${e.user_id}_clp`);
    let data_cpqq = await redis.get(`Yunzai:choulpcpqq:${e.user_id}_clp`);

    if (!data_cpname || !data_cpqq) {
        e.reply("你没有男友，无法分手啊！");
        return;
    }

    const breakUpReplies = [
        `分手快乐！希望你能找到更好的！`,
        `分手了？好吧，祝你好运！`,
        `感觉好像我们不能继续了。`
    ];

    let randomReply = breakUpReplies[Math.floor(Math.random() * breakUpReplies.length)];

    let msg = [
        segment.at(e.user_id),
        `\n${randomReply}`,
        `\n与【${data_cpname}】(${data_cpqq})的关系已结束。`
    ];
    e.reply(msg);

    // 删除Redis记录
    redis.del(`Yunzai:choulpcpname:${e.user_id}_clp`);
    redis.del(`Yunzai:choulpcpqq:${e.user_id}_clp`);
}
// 分手老婆
async breakUpWife(e) {
    // 获取当前老婆信息
    let data_cpname = await redis.get(`Yunzai:choulpcpname1:${e.user_id}_clp`);
    let data_cpqq = await redis.get(`Yunzai:choulpcpqq1:${e.user_id}_clp`);

    if (!data_cpname || !data_cpqq) {
        e.reply("你没有老婆，无法分手啊！");
        return;
    }

    const breakUpReplies = [
        `分手快乐！希望你能找到更好的！`,
        `分手了？好吧，祝你好运！`,
        `感觉好像我们不能继续了。`
    ];

    let randomReply = breakUpReplies[Math.floor(Math.random() * breakUpReplies.length)];

    let msg = [
        segment.at(e.user_id),
        `\n${randomReply}`,
        `\n与【${data_cpname}】(${data_cpqq})的关系已结束。`
    ];
    e.reply(msg);

    // 删除Redis记录
    redis.del(`Yunzai:choulpcpname1:${e.user_id}_clp`);
    redis.del(`Yunzai:choulpcpqq1:${e.user_id}_clp`);
}

}