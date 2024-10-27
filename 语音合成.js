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
          reg: `^#合成(?:\\s+)?(.+?)\\s+(.+)$`,
          fnc: 'synthesizeVoice'
        },
        {
          reg: '^语音角色$',
          fnc: 'renwu'
        },
        {
          reg: '^#合成米家(?:\\s+)?(.+?)\\s+(.+)$',
          fnc: 'synthesizeVoice2'
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

    // miHome 角色名
    this.validCharactersMiHome = [
     "七七", "三月七", "丹恒", "丽塔", "丽莎", "久岐忍", "九条裟罗", "云堇", "五郎", "伊甸",
     "伏特加女孩_狂热蓝调", "伏特加女孩_莉莉娅", "伏特加女孩_萝莎莉娅", "优菈", "佩拉", "停云", 
     "克拉拉", "克洛琳德", "八重樱", "八重神子", "凝光", "凯亚", "凯瑟琳", "刃", "刻晴", 
     "加拉赫", "北斗", "千织", "卡卡瓦夏", "卡维", "卡芙卡", "卡莲", "卡萝尔", "卢卡", 
     "原神刻晴", "原神菲谢尔", "可可利亚", "可莉", "史瓦罗", "叽米", "嘉明", "坎蒂丝", 
     "埃洛伊", "夏沃蕾", "夏洛蒂", "多莉", "夜兰", "奥兹", "妮露", "姬子", "娜塔莎", 
     "娜维娅", "安柏", "宵宫", "寒鸦", "寻梦者(女)", "寻梦者(男)", "尾巴", "崩铁姬子", 
     "崩铁布洛妮娅", "崩铁希儿", "布洛妮娅", "布洛妮娅_次生银翼", "希儿", "希儿_魇夜星渊", 
     "希娜狄雅", "希格雯", "希露瓦", "帕姆", "帕朵菲莉丝", "幽兰黛尔", "开拓者(女)", 
     "开拓者(男)", "彦卿", "德丽莎", "德丽莎_月下初拥", "德丽莎_月下誓约", "德丽莎_朔夜观星", 
     "戴因斯雷布", "托帕&账账", "托马", "提纳里", "早柚", "时雨绮罗", "星期日", "普罗米修斯", 
     "景元", "李素裳", "杰帕德", "松雀", "林尼", "枫原万叶", "柯莱", "格蕾修", 
     "格雷修_绘星之卷", "桂乃芬", "桑博", "梅比乌斯", "波提欧", "派蒙-30h", "派蒙-兴奋说话", 
     "派蒙-吞吞吐吐", "派蒙-平静", "派蒙-很激动", "派蒙-疑惑", "流浪者", "流萤", "浮烟", 
     "渡鸦", "温迪", "灯", "烟绯", "爱莉希雅", "爱衣", "玲可", "珊瑚宫心海", "珐露珊", 
     "班尼特", "琪亚娜", "琪亚娜_空之律者", "琪亚娜天穹游侠薪炎之律者终焉之律者", 
     "琳妮特", "琴", "瑟莉姆", "瑶瑶", "瓦尔特", "甘雨", "申鹤", "白术", "白露", 
     "真理医生", "知更鸟", "砂糖", "砂金", "神里绫人", "神里绫华", "科拉莉", "空", 
     "符华", "符华_文墨丹心", "符华_识之律者", "符玄", "米卡", "米沙", "素裳", 
     "纳西妲", "绮良良", "维尔薇", "罗刹", "罗莎莉亚", "羽兔", "翡翠", "胡桃", 
     "艾丝妲", "艾尔海森", "芙卡洛斯", "芙宁娜", "芭芭拉", "花火", "芽衣", 
     "芽衣断罪影舞雷之律者始源之律者", "苏莎娜", "荒泷一斗", "荧", "莫娜", "莱依拉", 
     "莱欧斯利", "菲米尼", "菲谢尔", "萍姥姥", "萨姆", "藿藿", "虎克", 
     "螺丝咕姆", "行秋", "西琳", "诺艾尔", "赛诺", "赫丽娅", "辛焱", "达达利亚", 
     "迪卢克", "迪奥娜", "迪娜泽黛", "迪希雅", "那维莱特", "重云", "钟离", 
     "钟表小子", "银枝", "银狼", "镜流", "闲云", "阮-梅", "阿兰", "阿波尼亚", 
     "阿蕾奇诺", "阿贝多", "雪衣", "雷泽", "雷电将军", "青雀", "香菱", "驭空", 
     "魈", "鹿野院平藏", "黄泉", "黑塔", "黑天鹅", "黑希儿"
    ];
  }

  async synthesizeVoice(e) {
    await this.handleSynthesize(e, this.validCharacters, 'http://api.lolimi.cn/API/yyhc/api.php');
  }

  async synthesizeVoice2(e) {
    await this.handleSynthesize(e, this.validCharactersMiHome, 'https://api.lolimi.cn/API/yyhc/y.php');
  }

  async handleSynthesize(e, apiUrl) {
    const match = e.msg.match(/^#合成(?:米家)?(?:\s+)?(.+?)\s+(.+)$/);
    if (!match) return;
  
    const [_, character, message] = match.map(str => str.trim());
  
    logger.info(`收到的角色名: ${character}`);
    logger.info(`收到的合成内容: ${message}`);
  
    // 合并有效角色名数组
    const validChars = [...this.validCharacters, ...this.validCharactersMiHome];
  
    if (!validChars.includes(character)) {
      return await e.reply(`角色名无效，请使用有效角色名：${validChars.join(", ")}`);
    }
  
    const url = `${apiUrl}?msg=${encodeURIComponent(message)}&${apiUrl.includes('y.php') ? 'name' : 'sp'}=${character}`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`请求失败，状态码：${response.status}`);
  
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
}
