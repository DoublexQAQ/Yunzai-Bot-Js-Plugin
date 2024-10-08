//作者:Double,github:https://github.com/DoublexQAQ
//本JS插件仅作交流学习。
import plugin from '../../lib/plugins/plugin.js';

export default class ExamplePlugin extends plugin {
  constructor () {
    super({
      name: 'Double视频插件',
      dsc: '发送个人插件视频',
      event: 'message',
      priority: -5000,
      rule: [
       { reg: '^#视频列表',fnc: 'sp1'},
       { reg: "^#黑丝视频", fnc: "sp2" },
       { reg: "^#白丝视频", fnc: "sp3" },
       { reg: "^#甩裙视频", fnc: "sp4" },
       { reg: "^#纯欲视频", fnc: "sp5" },
       { reg: "^#卡点变装视频", fnc: "sp6" },
       { reg: "^#感觉至上视频", fnc: "sp7" },
       { reg: "^#少萝视频", fnc: "sp8" },
       { reg: "^#吊带视频", fnc: "sp9" },
       { reg: "^#萝莉视频", fnc: "sp10" },
       { reg: "^#甜妹视频", fnc: "sp11" },
       { reg: "^#漫画欲系视频", fnc: "sp12" },
       { reg: "^#黑白双煞视频", fnc: "sp13" },
       { reg: "^#热舞视频", fnc: "sp14"},
       { reg: "^#漫展视频", fnc: "sp15"},
       { reg: "^#玉足视频", fnc: "sp16" },
       { reg: "^#清纯视频", fnc: "sp17" },
       { reg: "^#小姐姐视频", fnc: "sp18" },
       { reg: "^#慢摇视频", fnc: "sp19" },
       { reg: "^#cosplay视频", fnc: "sp20" },
       { reg: "^#原神cos视频", fnc: "sp21" },
       { reg: "^#(群主视频|管理视频)", fnc: "sp22" },
       { reg: "^#大雷视频", fnc: "sp23" },
      ]
    })
  }

  async sp1(e) {
    let msg = ["视频列表： \n #黑丝视频 \n #白丝视频 \n #甩裙视频 \n #纯欲视频 \n #卡点变装视频 \n #感觉至上视频 \n #少萝视频 \n #吊带视频 \n #萝莉视频 \n #甜妹视频 \n #漫画欲系视频 \n #黑白双煞视频 \n #热舞视频 \n #漫展视频 \n #玉足视频 \n #清纯视频 \n #小姐姐视频 \n #慢摇视频 \n #cosplay视频 \n #原神cos视频 \n #大雷视频"]
    e.reply(msg,msg);
    return;
}
  async sp2(e) {
    if (e.message_type === 'group') {
        let msg = ["黑丝视频正在发送，请等待。"];
        // 发送随机消息内容
        e.reply(msg,msg);
        // 构建 fakeMsgArr 数组
        let fakeMsgArr = ["http://api.ovoe.top/API/hssp.php?type=mp4"];
        fakeMsgArr.push({
            user_id: e.member.user_id,
            nickname: e.member.nickname,
            message: segment.video(fakeMsgArr[0]) // 传入数组中的第一个元素
        });
        // 创建转发消息
        let makeForwardMsg = e.group.makeForwardMsg([fakeMsgArr[fakeMsgArr.length - 1]]);
        // 发送转发消息
        e.reply(makeForwardMsg);
    } else if (e.message_type === 'private') {
        // 直接发出api的返回内容
        e.reply(segment.video("http://api.ovoe.top/API/hssp.php?type=mp4"))
    }
    return;
}
async sp3(e) {
     if (e.message_type === 'group') {
    let msg = ["白丝视频正在发送，请等待。"];
    e.reply(msg,msg);
    await new Promise(resolve => setTimeout(resolve, 10));
     let fakeMsgArr = ["http://api.ovoe.top/API/bssp.php"]
    fakeMsgArr.push({
        user_id: e.member.user_id,
        nickname: e.member.nickname,
        message: segment.video(fakeMsgArr[0]) // 传入数组中的第一个元素
    });
    // 创建转发消息
    let makeForwardMsg = e.group.makeForwardMsg([fakeMsgArr[fakeMsgArr.length - 1]]);
    // 发送转发消息
    e.reply(makeForwardMsg);
     } else if (e.message_type === 'private') {
        // 直接发出api的返回内容
        e.reply(segment.video("http://api.ovoe.top/API/bssp.php"))
    }
    return;
}
async sp4(e) {
    if (e.message_type === 'group') {
    let msg = ["甩裙视频正在发送，请等待。"];
    e.reply(msg,msg);
    await new Promise(resolve => setTimeout(resolve, 10));
    let fakeMsgArr = ["http://api.ovoe.top/API/sqxl.php"]
    fakeMsgArr.push({
        user_id: e.member.user_id,
        nickname: e.member.nickname,
        message: segment.video(fakeMsgArr[0]) // 传入数组中的第一个元素
    });
    // 创建转发消息
    let makeForwardMsg = e.group.makeForwardMsg([fakeMsgArr[fakeMsgArr.length - 1]]);
    // 发送转发消息
    e.reply(makeForwardMsg);
    } else if (e.message_type === 'private') {
        // 直接发出api的返回内容
        e.reply(segment.video("http://api.ovoe.top/API/sqxl.php"))
    }
    return;
}
  async sp5(e) {
      if (e.message_type === 'group') {
    let msg = ["纯欲视频正在发送，请等待。"];
    e.reply(msg,msg);
    await new Promise(resolve => setTimeout(resolve, 10));
    let fakeMsgArr = ["http://api.ovoe.top/API/ycyy.php"]
   fakeMsgArr.push({
        user_id: e.member.user_id,
        nickname: e.member.nickname,
        message: segment.video(fakeMsgArr[0]) // 传入数组中的第一个元素
    });
    // 创建转发消息
    let makeForwardMsg = e.group.makeForwardMsg([fakeMsgArr[fakeMsgArr.length - 1]]);
    // 发送转发消息
    e.reply(makeForwardMsg);
      } else if (e.message_type === 'private') {
        // 直接发出api的返回内容
        e.reply(segment.video("http://api.ovoe.top/API/ycyy.php"))
    }
    return;
}
async sp6(e) {
    if (e.message_type === 'group') {
    let msg = ["卡点变装视频正在发送，请等待。"];
    e.reply(msg,msg);
    await new Promise(resolve => setTimeout(resolve, 10));
    let fakeMsgArr = ["http://api.ovoe.top/API/kdbz.php"]
    fakeMsgArr.push({
        user_id: e.member.user_id,
        nickname: e.member.nickname,
        message: segment.video(fakeMsgArr[0]) // 传入数组中的第一个元素
    });
    // 创建转发消息
    let makeForwardMsg = e.group.makeForwardMsg([fakeMsgArr[fakeMsgArr.length - 1]]);
    // 发送转发消息
    e.reply(makeForwardMsg);
    } else if (e.message_type === 'private') {
        // 直接发出api的返回内容
        e.reply(segment.video("http://api.ovoe.top/API/kdbz.php"))
    }
    return;
}
async sp7(e) {
    if (e.message_type === 'group') {
    let msg = ["感觉至上视频正在发送，请等待。"];
    e.reply(msg,msg);
    await new Promise(resolve => setTimeout(resolve, 10));
    let fakeMsgArr = ["http://api.ovoe.top/API/gjzs.php"]
    fakeMsgArr.push({
        user_id: e.member.user_id,
        nickname: e.member.nickname,
        message: segment.video(fakeMsgArr[0]) // 传入数组中的第一个元素
    });
    // 创建转发消息
    let makeForwardMsg = e.group.makeForwardMsg([fakeMsgArr[fakeMsgArr.length - 1]]);
    // 发送转发消息
    e.reply(makeForwardMsg);
    } else if (e.message_type === 'private') {
        // 直接发出api的返回内容
        e.reply(segment.video("http://api.ovoe.top/API/gjzs.php"))
    }
    return;
}
async sp8(e) {
    if (e.message_type === 'group') {
    let msg = ["少萝视频正在发送，请等待。"];
    e.reply(msg,msg);
    await new Promise(resolve => setTimeout(resolve, 10));
    let fakeMsgArr = ["http://api.ovoe.top/API/slxl.php"]
    fakeMsgArr.push({
        user_id: e.member.user_id,
        nickname: e.member.nickname,
        message: segment.video(fakeMsgArr[0]) // 传入数组中的第一个元素
    });
    // 创建转发消息
    let makeForwardMsg = e.group.makeForwardMsg([fakeMsgArr[fakeMsgArr.length - 1]]);
    // 发送转发消息
    e.reply(makeForwardMsg);
    } else if (e.message_type === 'private') {
        // 直接发出api的返回内容
        e.reply(segment.video("http://api.ovoe.top/API/slxl.php"))
    }
    return;
}
async sp9(e) {
    if (e.message_type === 'group') {
    let msg = ["吊带视频正在发送，请等待。"];
    e.reply(msg,msg);
    await new Promise(resolve => setTimeout(resolve, 10));
    let fakeMsgArr = ["http://api.ovoe.top/API/ddxl.php"]
    fakeMsgArr.push({
        user_id: e.member.user_id,
        nickname: e.member.nickname,
        message: segment.video(fakeMsgArr[0]) // 传入数组中的第一个元素
    });
    // 创建转发消息
    let makeForwardMsg = e.group.makeForwardMsg([fakeMsgArr[fakeMsgArr.length - 1]]);
    // 发送转发消息
    e.reply(makeForwardMsg);
    } else if (e.message_type === 'private') {
        // 直接发出api的返回内容
        e.reply(segment.video("http://api.ovoe.top/API/ddxl.php"))
    }
    return;
}

async sp10(e) {
     if (e.message_type === 'group') {
    let msg = ["萝莉视频正在发送，请等待。"];
    e.reply(msg,msg);
    await new Promise(resolve => setTimeout(resolve, 10));
    let fakeMsgArr = ["http://api.ovoe.top/API/llxl.php"]
    fakeMsgArr.push({
        user_id: e.member.user_id,
        nickname: e.member.nickname,
        message: segment.video(fakeMsgArr[0]) // 传入数组中的第一个元素
    });
    // 创建转发消息
    let makeForwardMsg = e.group.makeForwardMsg([fakeMsgArr[fakeMsgArr.length - 1]]);
    // 发送转发消息
    e.reply(makeForwardMsg);
     } else if (e.message_type === 'private') {
        // 直接发出api的返回内容
        e.reply(segment.video("http://api.ovoe.top/API/llxl.php"))
    }
    return;
}
async sp11(e) {
     if (e.message_type === 'group') {
    let msg = ["甜妹视频正在发送，请等待。"];
    e.reply(msg,msg);
    await new Promise(resolve => setTimeout(resolve, 10));
    let fakeMsgArr = ["http://api.yujn.cn/api/tianmei.php?type=video"]
    fakeMsgArr.push({
        user_id: e.member.user_id,
        nickname: e.member.nickname,
        message: segment.video(fakeMsgArr[0]) // 传入数组中的第一个元素
    });
    // 创建转发消息
    let makeForwardMsg = e.group.makeForwardMsg([fakeMsgArr[fakeMsgArr.length - 1]]);
    // 发送转发消息
    e.reply(makeForwardMsg);
     } else if (e.message_type === 'private') {
        // 直接发出api的返回内容
        e.reply(segment.video("http://api.yujn.cn/api/tianmei.php?type=video"))
    }
    return;
}
 async sp12(e) {
     if (e.message_type === 'group') {
    let msg = ["漫画欲系视频正在发送，请等待。"];
    e.reply(msg,msg);
    await new Promise(resolve => setTimeout(resolve, 10));
    let fakeMsgArr = ["http://api.ovoe.top/API/mhyx.php"]
   fakeMsgArr.push({
        user_id: e.member.user_id,
        nickname: e.member.nickname,
        message: segment.video(fakeMsgArr[0]) // 传入数组中的第一个元素
    });
    // 创建转发消息
    let makeForwardMsg = e.group.makeForwardMsg([fakeMsgArr[fakeMsgArr.length - 1]]);
    // 发送转发消息
    e.reply(makeForwardMsg);
     } else if (e.message_type === 'private') {
        // 直接发出api的返回内容
        e.reply(segment.video("http://api.ovoe.top/API/mhyx.php"))
    }
    return;
}
async sp13(e) {
     if (e.message_type === 'group') {
    let msg = ["黑白双煞视频正在发送，请等待。"];
    e.reply(msg,msg);
    await new Promise(resolve => setTimeout(resolve, 10));
    let fakeMsgArr = ["http://api.ovoe.top/API/hbss.php"]
    fakeMsgArr.push({
        user_id: e.member.user_id,
        nickname: e.member.nickname,
        message: segment.video(fakeMsgArr[0]) // 传入数组中的第一个元素
    });
    // 创建转发消息
    let makeForwardMsg = e.group.makeForwardMsg([fakeMsgArr[fakeMsgArr.length - 1]]);
    // 发送转发消息
    e.reply(makeForwardMsg);
     } else if (e.message_type === 'private') {
        // 直接发出api的返回内容
        e.reply(segment.video("http://api.ovoe.top/API/hbss.php"))
    }
    return;
}
 async sp14(e) {
     if (e.message_type === 'group') {
    let msg = ["热舞视频正在发送，请等待。"];
    e.reply(msg,msg);
    await new Promise(resolve => setTimeout(resolve, 10));
    let fakeMsgArr = ["http://api.yujn.cn/api/rewu.php?type=video"]
    fakeMsgArr.push({
        user_id: e.member.user_id,
        nickname: e.member.nickname,
        message: segment.video(fakeMsgArr[0]) // 传入数组中的第一个元素
    });
    // 创建转发消息
    let makeForwardMsg = e.group.makeForwardMsg([fakeMsgArr[fakeMsgArr.length - 1]]);
    // 发送转发消息
    e.reply(makeForwardMsg);
     } else if (e.message_type === 'private') {
        // 直接发出api的返回内容
        e.reply(segment.video("http://api.yujn.cn/api/rewu.php?type=video"))
    }
    return;
}
async sp15(e) {
     if (e.message_type === 'group') {
    let msg = ["漫展视频正在发送，请等待。"];
    e.reply(msg,msg);
    await new Promise(resolve => setTimeout(resolve, 10));
    let fakeMsgArr = ["https://api.yujn.cn/api/manzhan.php?type=video"]
    fakeMsgArr.push({
        user_id: e.member.user_id,
        nickname: e.member.nickname,
        message: segment.video(fakeMsgArr[0]) // 传入数组中的第一个元素
    });
    // 创建转发消息
    let makeForwardMsg = e.group.makeForwardMsg([fakeMsgArr[fakeMsgArr.length - 1]]);
    // 发送转发消息
    e.reply(makeForwardMsg);
     } else if (e.message_type === 'private') {
        // 直接发出api的返回内容
        e.reply(segment.video("https://api.yujn.cn/api/manzhan.php?type=video"))
    }
    return;
}
 async sp16(e) {
     if (e.message_type === 'group') {
    let msg = ["玉足视频正在发送，请等待。"];
    e.reply(msg,msg);
    await new Promise(resolve => setTimeout(resolve, 20));
    let fakeMsgArr = ["http://api.yujn.cn/api/yuzu.php?type=video"]
   fakeMsgArr.push({
        user_id: e.member.user_id,
        nickname: e.member.nickname,
        message: segment.video(fakeMsgArr[0]) // 传入数组中的第一个元素
    });
    // 创建转发消息
    let makeForwardMsg = e.group.makeForwardMsg([fakeMsgArr[fakeMsgArr.length - 1]]);
    // 发送转发消息
    e.reply(makeForwardMsg);
     } else if (e.message_type === 'private') {
        // 直接发出api的返回内容
        e.reply(segment.video("http://api.yujn.cn/api/yuzu.php?type=video"))
    }
    return;
}
  async sp17(e) {
     if (e.message_type === 'group') {
    let msg = ["清纯视频正在发送，请等待。"];
    e.reply(msg,msg);
    await new Promise(resolve => setTimeout(resolve, 20));
    let fakeMsgArr = ["http://api.yujn.cn/api/qingchun.php?type=video"]
    fakeMsgArr.push({
        user_id: e.member.user_id,
        nickname: e.member.nickname,
        message: segment.video(fakeMsgArr[0]) // 传入数组中的第一个元素
    });
    // 创建转发消息
    let makeForwardMsg = e.group.makeForwardMsg([fakeMsgArr[fakeMsgArr.length - 1]]);
    // 发送转发消息
    e.reply(makeForwardMsg);
     } else if (e.message_type === 'private') {
        // 直接发出api的返回内容
        e.reply(segment.video("http://api.yujn.cn/api/qingchun.php?type=video"))
    }
    return;
}
  async sp18(e) {
     if (e.message_type === 'group') {
    let msg = ["小姐姐视频正在发送，请等待。"];
    e.reply(msg,msg);
    await new Promise(resolve => setTimeout(resolve, 20));
    let fakeMsgArr = ["http://api.yujn.cn/api/zzxjj.php?type=video"]
    fakeMsgArr.push({
        user_id: e.member.user_id,
        nickname: e.member.nickname,
        message: segment.video(fakeMsgArr[0]) // 传入数组中的第一个元素
    });
    // 创建转发消息
    let makeForwardMsg = e.group.makeForwardMsg([fakeMsgArr[fakeMsgArr.length - 1]]);
    // 发送转发消息
    e.reply(makeForwardMsg);
     } else if (e.message_type === 'private') {
        // 直接发出api的返回内容
        e.reply(segment.video("http://api.yujn.cn/api/zzxjj.php?type=video"))
    }
    return;
}
  async sp19(e) {
     if (e.message_type === 'group') {
    let msg = ["慢摇视频正在发送，请等待。"];
    e.reply(msg,msg);
    await new Promise(resolve => setTimeout(resolve, 10));
    let fakeMsgArr = ["http://api.yujn.cn/api/manyao.php?type=video"]
    fakeMsgArr.push({
        user_id: e.member.user_id,
        nickname: e.member.nickname,
        message: segment.video(fakeMsgArr[0]) // 传入数组中的第一个元素
    });
    // 创建转发消息
    let makeForwardMsg = e.group.makeForwardMsg([fakeMsgArr[fakeMsgArr.length - 1]]);
    // 发送转发消息
    e.reply(makeForwardMsg);
     } else if (e.message_type === 'private') {
        // 直接发出api的返回内容
        e.reply(segment.video("http://api.yujn.cn/api/manyao.php?type=video"))
    }
    return;
}
  async sp20(e) {
     if (e.message_type === 'group') {
    let msg = ["cosplay视频正在发送，请等待。"]; 
    e.reply(msg,msg);
    await new Promise(resolve => setTimeout(resolve, 10));
    let fakeMsgArr = ["http://abc.gykj.asia/API/ntCOS.php"]
    fakeMsgArr.push({
        user_id: e.member.user_id,
        nickname: e.member.nickname,
        message: segment.video(fakeMsgArr[0]) // 传入数组中的第一个元素
    });
    // 创建转发消息
    let makeForwardMsg = e.group.makeForwardMsg([fakeMsgArr[fakeMsgArr.length - 1]]);
    // 发送转发消息
    e.reply(makeForwardMsg);
     } else if (e.message_type === 'private') {
        // 直接发出api的返回内容
        e.reply(segment.video("http://abc.gykj.asia/API/ntCOS.php"))
    }
    return;
}
  async sp21(e) {
     if (e.message_type === 'group') {
    let msg = ["原神cos视频正在发送，请等待。"];
    e.reply(msg,msg);
    await new Promise(resolve => setTimeout(resolve, 10));
    let fakeMsgArr = ["http://abc.gykj.asia/API/ysxl.php"]
    fakeMsgArr.push({
        user_id: e.member.user_id,
        nickname: e.member.nickname,
        message: segment.video(fakeMsgArr[0]) // 传入数组中的第一个元素
    });
    // 创建转发消息
    let makeForwardMsg = e.group.makeForwardMsg([fakeMsgArr[fakeMsgArr.length - 1]]);
    // 发送转发消息
    e.reply(makeForwardMsg);
     } else if (e.message_type === 'private') {
        // 直接发出api的返回内容
        e.reply(segment.video("http://abc.gykj.asia/API/ysxl.php"))
    }
    return;
}
  async sp22(e) {
     if (e.message_type === 'group') {
    let msg = ["视频正在发送，请等待。"];
    e.reply(msg,msg);
    await new Promise(resolve => setTimeout(resolve, 10));
    let fakeMsgArr = ["http://api.yujn.cn/api/jksp.php?type=video"]
    fakeMsgArr.push({
        user_id: e.member.user_id,
        nickname: e.member.nickname,
        message: segment.video(fakeMsgArr[0]) // 传入数组中的第一个元素
    });
    // 创建转发消息
    let makeForwardMsg = e.group.makeForwardMsg([fakeMsgArr[fakeMsgArr.length - 1]]);
    // 发送转发消息
    e.reply(makeForwardMsg);
     } else if (e.message_type === 'private') {
        // 直接发出api的返回内容
        e.reply(segment.video("http://api.yujn.cn/api/jksp.php?type=video"))
    }
    return;
}
 async sp23(e) {
     if (e.message_type === 'group') {
    let msg = ["大雷视频正在发送，请等待。"];
    e.reply(msg,msg);
    await new Promise(resolve => setTimeout(resolve, 10));
    let fakeMsgArr = ["http://x4f5rt.site/API/dl/sp.api.php"]
    fakeMsgArr.push({
        user_id: e.member.user_id,
        nickname: e.member.nickname,
        message: segment.video(fakeMsgArr[0]) // 传入数组中的第一个元素
    });
    // 创建转发消息
    let makeForwardMsg = e.group.makeForwardMsg([fakeMsgArr[fakeMsgArr.length - 1]]);
    // 发送转发消息
    e.reply(makeForwardMsg);
     } else if (e.message_type === 'private') {
        // 直接发出api的返回内容
        e.reply(segment.video("http://x4f5rt.site/API/dl/sp.api.php"))
    }
    return;
}
}
  

