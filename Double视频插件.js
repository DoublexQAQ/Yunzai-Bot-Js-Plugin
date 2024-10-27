// 作者: Double, Github: https://github.com/DoublexQAQ
// 本 JS 插件仅用于交流学习。
import plugin from '../../lib/plugins/plugin.js';

export default class ExamplePlugin extends plugin {
  constructor () {
    super({
      name: 'Double视频插件',
      dsc: '发送个人插件视频',
      event: 'message',
      priority: -5000,
      rule: [
        { reg: '^#视频列表', fnc: 'sp1' },
        { reg: '^#(黑丝|白丝|甩裙|纯欲|卡点变装|感觉至上|少萝|吊带|萝莉|甜妹|漫画欲系|黑白双煞|热舞|漫展|玉足|清纯|小姐姐|慢摇|cosplay|原神cos|大雷|美女|JK|女仆)视频(,|，|和|与| )*', fnc: 'multiVideoHandler' },
        { reg: '^#来(\\d+)个(黑丝|白丝|甩裙|纯欲|卡点变装|感觉至上|少萝|吊带|萝莉|甜妹|漫画欲系|黑白双煞|热舞|漫展|玉足|清纯|小姐姐|慢摇|cosplay|原神cos|大雷|美女|JK|女仆)视频$', fnc: 'multipleSameVideos' }
      ]
    });

    // 视频类型与API地址的映射
    this.videoMapping = {
      "黑丝": "http://api.ovoe.top/API/hssp.php?type=mp4",
      "白丝": "http://api.ovoe.top/API/bssp.php",
      "甩裙": "http://api.ovoe.top/API/sqxl.php",
      "纯欲": "http://api.ovoe.top/API/ycyy.php",
      "卡点变装": "http://api.ovoe.top/API/kdbz.php",
      "感觉至上": "http://api.ovoe.top/API/gjzs.php",
      "少萝": "http://api.ovoe.top/API/slxl.php",
      "吊带": "http://api.ovoe.top/API/ddxl.php",
      "萝莉": "http://api.ovoe.top/API/llxl.php",
      "甜妹": "http://api.yujn.cn/api/tianmei.php?type=video",
      "漫画欲系": "http://api.ovoe.top/API/mhyx.php",
      "黑白双煞": "http://api.ovoe.top/API/hbss.php",
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
      "女仆": "https://api.317ak.com/API/sp/npxl.php ",
    };
  }

  // 发送伪造消息的工具方法
  async buildForwardMsg(e, messages, friend) {
    let bot = {
      nickname: e.sender.nickname,
      user_id: e.user_id
    };
    let MsgList = messages.map(msg => ({
      message: msg,
      ...bot,
    }));

    let msg;
    if (e.message_type === 'group') {
      msg = await e.group.makeForwardMsg(MsgList);
    } else {
      msg = await friend.makeForwardMsg(MsgList);
    }

    return msg;
  }

  // 发送视频列表
  async sp1(e) {
    const videoTypes = [
      "黑丝", "白丝", "甩裙", "纯欲", "卡点变装", 
      "感觉至上", "少萝", "吊带", "萝莉", "甜妹", 
      "漫画欲系", "黑白双煞", "热舞", "漫展", "玉足", 
      "清纯", "小姐姐", "慢摇", "cosplay", "原神cos", 
      "大雷", "美女", "JK", "女仆"
    ];

    const messages = videoTypes.map(type => `#${type}视频`); // 生成伪造消息内容

    // 设置标题、提示和总结
    const title = "视频列表";
    const hint = "好看的视频";
    const summary = `视频数量: ${videoTypes.length}`;

    // 构造伪造消息
    const fakeMsgArr = messages.map(msg => ({
      message: msg,
      user_id: e.user_id,
    }));

    try {
      // 优化 msg.data 结构
      const forwardMsg = await e.group.makeForwardMsg(fakeMsgArr);
      if (forwardMsg.data && typeof forwardMsg.data === 'object') {
        const detail = forwardMsg.data.meta.detail;
        if (detail) {
          detail.news = [{ text: hint }]; // 用提示信息替代原来的内容
          detail.source = title; // 设置来源为标题
          detail.summary = summary; // 设置总结信息
        }
        forwardMsg.data.prompt = hint; // 设置 prompt
      }

      await e.reply(forwardMsg);
    } catch (error) {
      e.reply('视频列表发送失败，请稍后再试。');
      console.error(`视频列表发送失败: ${error.message}`, error);
    }
  }

  // 发送伪造消息的工具方法
  async sendMultiVideo(e, videoList) {
    const fakeMsgArr = [];

    // 添加伪造内容
    for (const video of videoList) {
      const { apiUrl } = video;
      fakeMsgArr.push({
        message: segment.video(apiUrl),
        user_id: e.user_id,
      });
    }

    // 添加到 msg.data 的结构
    const title = videoList[0].videoName; // 使用第一个视频名称作为标题
    const hint = `请求的视频数量: ${videoList.length}`;
    const summary = `老色批你要的视频: ${title}，数量: ${videoList.length}`;

    try {
      // 群聊中伪造消息
      if (e.message_type === 'group') {
        const forwardMsg = await e.group.makeForwardMsg(fakeMsgArr);
        
        // 优化 msg.data 结构
        if (forwardMsg.data && typeof forwardMsg.data === 'object') {
          const detail = forwardMsg.data.meta.detail;
          if (detail) {
            detail.news = [{ text: hint }]; // 用提示信息替代原来的内容
            detail.source = title; // 设置来源为标题
            detail.summary = summary; // 设置总结信息
          }
          forwardMsg.data.prompt = hint; // 设置 prompt
        }

        await e.reply(forwardMsg);
      } else if (e.message_type === 'private') {
        // 私聊中直接发送视频
        for (const video of videoList) {
          await e.reply(segment.video(video.apiUrl));
        }
      }
    } catch (error) {
      e.reply('视频发送失败，请稍后再试。');
      console.error(`视频转发消息发送失败: ${error.message}`, error);
    }
  }

  // 处理多个视频的发送
  async multiVideoHandler(e) {
    const input = e.msg.replace(/^#/, '').replace(/视频/g, ''); // 去掉命令中的 "#", "视频"
    const videoRequests = input.split(/,|，|和|与| /); // 根据多个分隔符分割

    const videoList = [];
    for (const video of videoRequests) {
      const trimmedVideo = video.trim();
      const apiUrl = this.videoMapping[trimmedVideo];
      if (apiUrl) {
        videoList.push({ videoName: trimmedVideo, apiUrl });
      } else {
        e.reply(`无法找到视频: ${trimmedVideo}`);
      }
    }

    if (videoList.length > 0) {
      // 在这里添加提示消息
      e.reply('视频发送可能会需要一段时间，请耐心等待。');
      await this.sendMultiVideo(e, videoList); // 一次性发送所有视频
    }
  }

  // 处理“来N个相同的视频”指令
  async multipleSameVideos(e) {
    const result = e.msg.match(/^#来(\d+)个(黑丝|白丝|甩裙|纯欲|卡点变装|感觉至上|少萝|吊带|萝莉|甜妹|漫画欲系|黑白双煞|热舞|漫展|玉足|清纯|小姐姐|慢摇|cosplay|原神cos|大雷|美女|JK|女仆)视频$/);
    if (result) {
      const count = parseInt(result[1], 10); // 获取视频数量
      const videoType = result[2]; // 获取视频类型
      
      // 限制请求的最大数量为5
      if (count < 1) {
        e.reply('请求的数量必须大于0。');
        return;
      } else if (count > 5) {
        e.reply('你个老色批，喜欢看这么多吗？');
        return;
      }

      const apiUrl = this.videoMapping[videoType];

      if (!apiUrl) {
        e.reply('无法找到视频，请重新输入。');
        return;
      }

      // 提示用户发送可能需要一些时间
      e.reply('视频发送可能会需要一段时间，请耐心等待。');

      // 构造视频列表
      const videoList = [];
      for (let i = 0; i < count; i++) {
        videoList.push({ videoName: videoType, apiUrl });
      }

      // 发送多个相同视频
      await this.sendMultiVideo(e, videoList);
    }
  }
}
