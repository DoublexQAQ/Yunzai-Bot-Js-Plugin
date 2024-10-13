import plugin from '../../lib/plugins/plugin.js';
import fetch from 'node-fetch';
import { segment } from 'oicq';

export class ExamplePlugin extends plugin {
  constructor() {
    super({
      name: '语音合成',
      description: '将文本转换为语音',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: `^#合成(?:\\s+)?(.+?)\\s+(.+)$`, // 处理空格
          fnc: 'synthesizeVoice'
        },
        {
          reg: '^语音角色$', // 新增指令
          fnc: 'renwu'
        }
      ]
    });

    // 定义有效角色名
    this.validCharacters = [
      "雷军", "丁真", "AD学姐", "赛马娘", "黑手", "蔡徐坤", "孙笑川", "邓紫棋", "东雪莲",
      "塔菲", "央视配音", "流萤", "郭德纲", "周杰伦", "懒洋洋", "女大学生", "烧姐姐",
      "麦克阿瑟", "马老师", "孙悟空", "海绵宝宝", "光头强", "陈泽", "村民", "猪猪侠",
      "猪八戒", "薛之谦", "大司马", "刘华强", "特朗普", "满穗", "桑帛", "李云龙",
      "卢本伟", "pdd", "tvb", "王者语音播报", "爱莉希雅", "岳山", "妖刀姬", "少萝宝宝",
      "天海", "王者耀", "蜡笔小新", "琪", "茉莉", "蔚蓝档案桃井", "胡桃", "磊哥游戏",
      "洛天依", "派大星", "章鱼哥", "蔚蓝档案爱丽丝", "阿梓", "科比", "于谦老师", 
      "嘉然", "乃琳", "向晚", "优优", "茶总", "小然", "泽北", "夯大力", "奶龙"
    ];
  }

  async synthesizeVoice(e) {
    const match = e.msg.match(/^#合成(?:\s+)?(.+?)\s+(.+)$/);
    if (!match) return;

    const character = match[1].trim(); // 提取角色名
    const message = match[2].trim(); // 提取合成内容

    logger.info(`收到的角色名: ${character}`);
    logger.info(`收到的合成内容: ${message}`);

    if (!this.validCharacters.includes(character)) {
      return await e.reply(`角色名无效，请使用有效角色名：${this.validCharacters.join(", ")}`);
    }

    let apiUrl = `http://api.lolimi.cn/API/yyhc/api.php?msg=${encodeURIComponent(message)}&sp=${character}`;

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`请求失败，状态码：${response.status}`);
      }

      const data = await response.text();
      const urlMatch = data.match(/https:\/\/api\.lolimi\.cn\/API\/yyhc\/data\/\S+\.mp3/);
      const mp3Url = urlMatch ? urlMatch[0] : null;

      if (mp3Url) {
        await e.reply(segment.record(mp3Url, true));
      } else {
        await e.reply("未找到有效的音频链接。");
      }
      logger.info(`语音消息发送成功`);
    } catch (error) {
      logger.error(`获取语音时出错：${error.message}`);
      await e.reply("获取语音失败，请稍后重试。");
    }
  }

  async renwu(e) {
    const charactersList = this.validCharacters.join(", ");
    await e.reply(`有效的语音合成角色有：${charactersList} \n  \n \n合成指令：#合成角色名空格内容`);
  }
}
