import plugin from '../../lib/plugins/plugin.js';
import { segment } from 'oicq'; 

export default class ExamplePlugin extends plugin {
  constructor () {
    super({
      name: 'Double视频插件',
      dsc: '发送个人插件视频',
      event: 'message',
      priority: -5000,
      rule: [
        { reg: '^#视频列表', fnc: 'sp1' },
        { reg: '^#(黑丝|白丝|甩裙|纯欲|卡点变装|纯情女高|少萝|吊带|萝莉|甜妹|漫画欲系|黑白双煞|热舞|漫展|玉足|清纯|小姐姐|慢摇|cosplay|原神cos|大雷|美女|JK|女仆|御姐|猫系女友|腹肌|帅哥|完美身材)视频$', fnc: 'videoHandler' },
      ]
    });

    // 视频类型与API地址的映射
    this.videoMapping = {
      "黑丝": "https://api.317ak.com/API/sp/hssp.php",
      "白丝": "https://api.317ak.com/API/sp/bssp.php",
      "甩裙": "https://api.317ak.com/API/sp/sqxl.php",
      "纯欲": "https://api.317ak.com/API/sp/ycyy.php",
      "卡点变装": "http://x4f5rt.site/API/dxbz/lj.api.php",
      "纯情女高": "https://api.317ak.com/API/sp/cqng.php",
      "少萝": "http://x4f5rt.site/API/sl/lj.api.php",
      "吊带": "https://api.317ak.com/API/sp/ddxl.php",
      "萝莉": "https://api.317ak.com/API/sp/llxl.php",
      "甜妹": "http://api.yujn.cn/api/tianmei.php?type=video",
      "漫画欲系": "https://api.317ak.com/API/sp/mhyx.php",
      "黑白双煞": "https://api.317ak.com/API/sp/hbss.php",
      "热舞": "http://api.yujn.cn/api/rewu.php?type=video",
      "漫展": "https://api.yujn.cn/api/manzhan.php?type=video",
      "玉足": "http://api.yujn.cn/api/yuzu.php?type=video",
      "清纯": "http://api.yujn.cn/api/qingchun.php?type=video",
      "小姐姐": "http://api.yujn.cn/api/zzxjj.php?type=video",
      "慢摇": "http://api.yujn.cn/api/manyao.php?type=video",
      "cosplay": "http://abc.gykj.asia/API/ntCOS.php",
      "原神cos": "http://abc.gykj.asia/API/ysxl.php",
      "大雷": "http://x4f5rt.site/API/dl/sp.api.php",
      "美女": "https://api.s01s.cn/API/lsp_meinv/",
      "JK": "https://api.s01s.cn/API/jk_shipin/",
      "女仆": "https://api.317ak.com/API/sp/npxl.php",
      "御姐": "https://api.317ak.com/API/sp/yjxl.php",
      "猫系女友": "https://api.317ak.com/API/sp/mxny.php",
      "腹肌":"https://api.317ak.com/API/sp/fjbz.php",
      "帅哥":"https://api.317ak.com/API/sp/sgxl.php",
      "完美身材":"http://api.yujn.cn/api/wmsc.php?type=video",
    };
  }
async buildForwardMsg(e, rankings) {
  try {
    let MsgList = rankings.map(item => ({
       // 使用发送者的ID
      nickname: e.nickname, // 使用发送者的昵称
      message: item // 使用排名内容中的消息
    }));

    // 无论是群聊还是私聊，都使用群聊的方法发送消息
    const makeForwardMsg = await e.group.makeForwardMsg(MsgList);
    await e.reply(makeForwardMsg); // 回复构建的消息

  } catch (error) {
    console.error('构造转发消息失败:', error.message, error);
    await e.reply('构建转发消息时出错，请稍后重试。');
  }
}

// 发送视频列表或其他类型内容
async sp1(e) {
  const contentTypes = [
    "黑丝", "白丝", "甩裙", "纯欲", "卡点变装", 
    "纯情女高", "少萝", "吊带", "萝莉", "甜妹", 
    "漫画欲系", "黑白双煞", "热舞", "漫展", "玉足", 
    "清纯", "小姐姐", "慢摇", "cosplay", "原神cos", 
    "大雷", "美女", "JK", "女仆", "御姐", "猫系女友",
    "腹肌", "帅哥", "完美身材",
  ];

  // 构造内容消息
  const messages = contentTypes.map(type => `#${type}视频`); // 生成伪造的内容

  try {
    // 调用构造转发消息的方法
    await this.buildForwardMsg(e, messages);
  } catch (error) {
    e.reply('内容发送失败，请稍后再试。');
    console.error(`内容发送失败: ${error.message}`, error);
  }
}



  // 处理视频请求并发送视频
  async videoHandler(e) {
    const videoType = e.raw_message.match(/^#(黑丝|白丝|甩裙|纯欲|卡点变装|纯情女高|少萝|吊带|萝莉|甜妹|漫画欲系|黑白双煞|热舞|漫展|玉足|清纯|小姐姐|慢摇|cosplay|原神cos|大雷|美女|JK|女仆|御姐|猫系女友|腹肌|帅哥|完美身材)视频$/);
    
    if (!videoType || !videoType[1]) {
      e.reply('无法识别该视频类型，请检查输入的指令。');
      return;
    }

    const apiUrl = this.videoMapping[videoType[1]];

    if (!apiUrl) {
      e.reply('视频类型映射出错，请稍后再试。');
      return;
    }

    try {
      if (e.message_type === 'group') {

        // 延时一下
        await new Promise(resolve => setTimeout(resolve, 10));

        // 发送视频
        const videoUrl = apiUrl;
        const fakeMsgArr = [{
          user_id: e.user_id,
          nickname: e.nickname,
          message: segment.video(videoUrl) // 传入视频URL
        }];

        // 创建并发送转发消息
        const makeForwardMsg = await e.group.makeForwardMsg(fakeMsgArr);
        await e.reply(makeForwardMsg);
      } else if (e.message_type === 'private') {
        // 直接发出API的返回内容
        e.reply(segment.video(apiUrl));
      }
    } catch (error) {
      e.reply('请求视频失败，请稍后再试。');
      console.error(`视频请求失败: ${error.message}`, error);
    }
  }
}
