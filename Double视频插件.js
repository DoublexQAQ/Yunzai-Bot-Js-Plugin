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
        { reg: '^#(黑丝|白丝|甩裙|纯欲|卡点变装|纯情女高|少萝|吊带|萝莉|甜妹|漫画欲系|黑白双煞|热舞|漫展|玉足|清纯|小姐姐|慢摇|cosplay|原神cos|大雷|美女|JK|女仆|御姐|猫系女友|腹肌|帅哥)视频(,|，|和|与| )*', fnc: 'multiVideoHandler' },
        { reg: '^#来(\\d+)个(黑丝|白丝|甩裙|纯欲|卡点变装|纯情女高|少萝|吊带|萝莉|甜妹|漫画欲系|黑白双煞|热舞|漫展|玉足|清纯|小姐姐|慢摇|cosplay|原神cos|大雷|美女|JK|女仆|御姐|猫系女友|腹肌|帅哥)视频$', fnc: 'multipleSameVideos' }
      ]
    });

    // 视频类型与API地址的映射
    this.videoMapping = {
      "黑丝": "https://api.317ak.com/API/sp/hssp.php",//
      "白丝": "https://api.317ak.com/API/sp/bssp.php",//
      "甩裙": "https://api.317ak.com/API/sp/sqxl.php",//
      "纯欲": "https://api.317ak.com/API/sp/ycyy.php",//
      "卡点变装": "http://x4f5rt.site/API/dxbz/lj.api.php",//
      "纯情女高": "https://api.317ak.com/API/sp/cqng.php",//
      "少萝": "http://x4f5rt.site/API/sl/lj.api.php",//
      "吊带": "https://api.317ak.com/API/sp/ddxl.php",//
      "萝莉": "https://api.317ak.com/API/sp/llxl.php",//
      "甜妹": "http://api.yujn.cn/api/tianmei.php?type=video",
      "漫画欲系": "https://api.317ak.com/API/sp/mhyx.php",//
      "黑白双煞": "https://api.317ak.com/API/sp/hbss.php",//
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
      "猫系女友": "https://api.317ak.com/API/sp/mxny.php ",
      "腹肌":"https://api.317ak.com/API/sp/fjbz.php",
      "帅哥":"https://api.317ak.com/API/sp/sgxl.php",
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
      "纯情女高", "少萝", "吊带", "萝莉", "甜妹", 
      "漫画欲系", "黑白双煞", "热舞", "漫展", "玉足", 
      "清纯", "小姐姐", "慢摇", "cosplay", "原神cos", 
      "大雷", "美女", "JK", "女仆", "御姐" ,"猫系女友",
      "腹肌","帅哥",
    ];

    const messages = videoTypes.map(type => `#${type}视频`); // 生成伪造消息内容

    const title = "视频列表";
    const hint = "好看的视频";
    const summary = `视频数量: ${videoTypes.length}`;

    try {
      const forwardMsg = await this.buildForwardMsg(e, messages, e.friend);
      // 优化 msg.data 结构
      if (forwardMsg.data && typeof forwardMsg.data === 'object') {
        const detail = forwardMsg.data.meta.detail;
        if (detail) {
          detail.news = [{ text: hint }];
          detail.source = title;
          detail.summary = summary;
        }
        forwardMsg.data.prompt = hint; // 设置 prompt
      }

      await e.reply(forwardMsg);
    } catch (error) {
      e.reply('视频列表发送失败，请稍后再试。');
      console.error(`视频列表发送失败: ${error.message}`, error);
    }
  }

  // 将多个视频伪造成一个转发消息发送的方法
  async sendMultiVideo(e, videoList) {
    e.reply('视频发送可能会需要一段时间，请耐心等待。');
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
    const title = `${videoList[0].videoName}视频`; // 使用第一个视频名称作为标题，并添加 "视频"
    const hint = `${videoList[0].videoName}的诱惑`;
    const summary = `老色批你要的视频: ${title}，数量: ${videoList.length}`;

    try {
      // 群聊中伪造消息
      if (e.message_type === 'group') {
        const forwardMsg = await e.group.makeForwardMsg(fakeMsgArr);
        
        // 优化 msg.data 结构
        if (forwardMsg.data && typeof forwardMsg.data === 'object') {
          const detail = forwardMsg.data.meta.detail;
          if (detail) {
            detail.news = [{ text: hint }];
            detail.source = title;
            detail.summary = summary;
          }
          forwardMsg.data.prompt = hint; // 设置 prompt
        }

        await e.reply(forwardMsg); // 发送伪造消息
      } else if (e.message_type === 'private') {
        // 私聊中直接发送视频
        for (const video of videoList) {
          await e.reply(segment.video(video.apiUrl));
        }
      }
    } catch (error) {
      // 处理 API 错误
      const errorTitle = "发送错误";
      const errorHint = "API 问题";
      const errorSummary = "天天看，现在看不了吧";

      const fakeErrorMsg = {
        message: errorTitle,
      };

      // 在这里添加伪造错误消息
      const fakeMsgArr = [{
        message: JSON.stringify(fakeErrorMsg),
        user_id: e.user_id,
      }];

      try {
        const forwardMsg = await e.group.makeForwardMsg(fakeMsgArr);
        
        // 优化 msg.data 结构
        if (forwardMsg.data && typeof forwardMsg.data === 'object') {
          const detail = forwardMsg.data.meta.detail;
          if (detail) {
            detail.news = [{ text: errorHint }];
            detail.source = errorTitle;
            detail.summary = errorSummary;
          }
          forwardMsg.data.prompt = errorHint; // 设置 prompt
        }

        await e.reply(forwardMsg); // 发送错误伪造消息
      } catch (msgError) {
        // 处理转发消息失败的情况
        console.error(`伪造错误消息发送失败: ${msgError.message}`, msgError);
      }

      console.error(`视频转发消息发送失败: ${error.message}`, error);
    }
  }

  // 处理多个视频的发送
  async multiVideoHandler(e) {
    const input = e.msg.replace(/^#/, '').replace(/视频/g, ''); // 去掉命令中的 "#", "视频"
    const videoRequests = input.split(/,|，|和|与| /); // 根据多个分隔符分割

    const videoList = [];
    for (const video of videoRequests) {
      if (this.videoMapping[video]) {
        videoList.push({
          videoName: video,
          apiUrl: this.videoMapping[video]
        });
      }
    }

    if (videoList.length > 0) {
      await this.sendMultiVideo(e, videoList);
    } else {
      e.reply('未找到对应的视频类型，请确认输入的内容。');
    }
  }

  // 处理相同类型视频的请求
  async multipleSameVideos(e) {
    let num = parseInt(e.msg.match(/(\d+)/)[1], 10); // 获取数量并转换为整数

    // 如果数量超过 6，发送调侃提示并返回
    if (num > 6) {
        await e.reply("老色批你看到了这么多吗？");
        return;
    }

    const videoType = e.msg.match(/(黑丝|白丝|甩裙|纯欲|卡点变装|纯情女高|少萝|吊带|萝莉|甜妹|漫画欲系|黑白双煞|热舞|漫展|玉足|清纯|小姐姐|慢摇|cosplay|原神cos|大雷|美女|JK|女仆|御姐|猫系女友|腹肌|帅哥)/)[1]; // 获取视频类型

    const videoRequests = Array.from({ length: num }, () => videoType); // 生成相同类型请求的数组
    const videoList = videoRequests.map(video => ({
        videoName: video,
        apiUrl: this.videoMapping[video]
    }));

    await this.sendMultiVideo(e, videoList);
    }
}
