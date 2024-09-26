// 作者: Double, Github: https://github.com/DoublexQAQ
// 本 JS 插件仅用于交流学习。
import plugin from "../../lib/plugins/plugin.js";
import { segment } from "oicq";

const bmd_GroupQQ = []; //需要使用的群的白名单 ,隔开，没有则全局
//！！！！！！！！！！！！！！！！！！！！！！！！
let alllist = Bot.gl;
var bmd = bmd_GroupQQ;
bmd = [];
// 匹配列表
// 可以使用|分割关键词
//判断白名单列表为空，已开启全局模式
if (bmd_GroupQQ.length == 0)
  for (var key of alllist) {
    bmd.push(key[0]);
  }
// 正则
export class aireply extends plugin {
  constructor() {
    super({
      name: "柒叶关键词回复",
      dsc: "自动回复工具",
      /** https://oicqjs.github.io/oicq/#events */
      event: "message",
      priority: -114514, //10005
      /** 命令正则匹配 */
      /** 执行方法 */
      rule: [
        { reg: "(.*)bot指令表|BOT指令表(.*)",fnc: "reply1",},//个人指令表可自行修改
        { reg: "^#?(小柒|小柒柒|小叶叶|小叶|小qq|小QQ)$", fnc: "reply2" },

        { reg: "(.*)狱卒(.*)", fnc: "reply3" },
        { reg: "(.*)亲亲(.*)", fnc: "reply4" },
        //{ reg: "(.*)bot主人|主人qq(.*)", fnc: "reply5" },

        { reg: "(.*)爽(.*)", fnc: "reply8" },
        { reg: "(.*)变态|bt|BT(.*)", fnc: "reply9" },
        { reg: "(.*)人机|人坤|是机器人(.*)", fnc: "reply10" },
        { reg: "(.*)我靠(.*)", fnc: "reply11" },
        { reg: "(.*)宝宝|宝儿|宝贝(.*)", fnc: "reply12" },
        { reg: "(.*)撸管|炉管|🦌|录关|卢管|卢关|鹿|lg(.*)", fnc: "reply13" },
      ],
    });
  }
  async reply1(e) {
    let msg = [
      "《柒叶指令表》 \n #视频列表 \n #文案帮助 \n #R帮助 \n #ql帮助 \n #喵喵帮助 \n #gpti帮助 \n #土块帮助  \n \n 小插件指令： \n #青年大学习 \n 诱惑图片\n 我喜欢你(表白) \n 猫猫(图) \n xx天气 \n #喜报 xxx内容 \n #悲报 xxx内容  \n woc/卧槽(正在维修) \n 心碎@某人(合成图) ",
    ];
    e.reply(msg[Math.floor(Math.random() * msg.length)]);
    return;
  }
  async reply2(e) {
    let msg = ["我叫柒叶(〃＞目＜)", "给你脸了，小黑子", "好过分呐，我叫柒叶！！！","你难道不会叫我的名字吗？哼😕","小心我用小刀带走你！\n o(*^▽^*)┛"];
    e.reply(msg[Math.floor(Math.random() * msg.length)]);
    await new Promise(resolve => setTimeout(resolve, 200));
    let reply
        
         e.reply(segment.record("https://api.lolimi.cn/API/yyhc/./data/326da4e78e.mp3"))
         await new Promise(resolve => setTimeout(resolve, 200));
         return;
  }
  async reply3(e) {
    let msg = ["玉足？！哪里有玉足？想屁吃呢？","什么都玉足只会害了你！"];
    e.reply(msg[Math.floor(Math.random() * msg.length)]);
     await new Promise(resolve => setTimeout(resolve, 20))

    return;
  }
  async reply4(e) {
    let msg = ["亲亲～😘", "只……只能亲一下哦～","变态，谁要和你亲亲啊！\n (ノ｀Д)ノ"];
    let reply
    e.reply(msg[Math.floor(Math.random() * msg.length)]);
    await new Promise(resolve => setTimeout(resolve, 2000));
    return;
  }
 // async reply5(e) {
 //   let msg = ["主人QQ："];
  //  e.reply(segment.at());
 //   return;
 // }
 
async reply8(e) {
    let msg = ["有多爽?","我也感觉好爽啊！","嘿嘿🤤🤤🤤"];
    await new Promise(resolve => setTimeout(resolve, 10));
    e.reply(msg[Math.floor(Math.random() * msg.length)]);
     let reply
        await new Promise(resolve => setTimeout(resolve, 10));
         e.reply(segment.record("https://api.lolimi.cn/API/yyhc/./data/dd6583519e.mp3"));
    return;
  }  
async reply9(e) {
    let msg = ["有多变态呢？","柒叶害怕变态","我要叫我的主人打你！打你！哼！"];
    await new Promise(resolve => setTimeout(resolve, 10));
    e.reply(msg[Math.floor(Math.random() * msg.length)]);
    let reply
        await new Promise(resolve => setTimeout(resolve, 10));
         e.reply(segment.record("https://api.lolimi.cn/API/yyhc/./data/55a315a7f8.mp3"));
    return;

  }  
  async reply10(e) {
    let msg = ["什么机器人？我可是可爱的柒叶宝宝！","你才是人机，你全家都是人机！可恶😢"];
    
    e.reply(msg[Math.floor(Math.random() * msg.length)]);
    await new Promise(resolve => setTimeout(resolve, 10));
    let reply
        await new Promise(resolve => setTimeout(resolve, 10));
         e.reply(segment.record("https://api.lolimi.cn/API/yyhc/./data/d2f42845bc.mp3"));
    return;
  }  
   async reply11(e) {
    let msg = ["宝宝，我们要文明哟！","靠什么啊！(〃＞目＜)"];
  
    e.reply(msg[Math.floor(Math.random() * msg.length)]);
    await new Promise(resolve => setTimeout(resolve, 10));
    let reply
        await new Promise(resolve => setTimeout(resolve, 200));
         e.reply(segment.record("https://api.lolimi.cn/API/yyhc/./data/b0c9c79c9b.mp3"));
    return;
  }  
   async reply12(e) {
    let msg = ["宝宝，怎么了？","宝儿！与你在一起的每一天我都好开心啊！"];
    
    e.reply(msg[Math.floor(Math.random() * msg.length)]);
    await new Promise(resolve => setTimeout(resolve, 10));
    let reply
        await new Promise(resolve => setTimeout(resolve, 200));
         e.reply(segment.record("https://api.lolimi.cn/API/yyhc/./data/97e6946ed9.mp3"));
    return;
  }  
   async reply13(e) {
    let msg = ["好恶心，你居然喜欢撸管！","有变态啊！当众撸管。","哇，真恶心！","咦！我居然看到你说这个。"];//消息内容
    let img_path = [
        "plugins/example/image/嫌弃.jpg",
        "plugins/example/image/嫌弃1.jpg",
        "plugins/example/image/嫌弃2.jpg",
        "plugins/example/image/嫌弃3.jpg",
        "plugins/example/image/嫌弃4.jpg",
        "plugins/example/image/嫌弃5.jpg",//需要调用的图片
         ]
     let msg1 = msg[Math.floor(Math.random() * msg.length)]
    //将图片随机化
    let randomimgpath = img_path[Math.floor(Math.random() * img_path.length)]
    //将内容随机化
    const message =[
        msg1,
        segment.image(randomimgpath)
        ]
        //整合随机的图片和随机内容
    e.reply(message);//回复整合内容
    await new Promise(resolve => setTimeout(resolve, 1000));
    let replyRecord = [
    "https://api.lolimi.cn/API/yyhc/./data/18bc83743c.mp3",
    "https://api.lolimi.cn/API/yyhc/./data/d85b7b06a2.mp3",
    "https://api.lolimi.cn/API/yyhc/./data/e4b32cc246.mp3",
    "https://api.lolimi.cn/API/yyhc/./data/e354450e0c.mp3"
   ];//语言内容
   e.reply(segment.record(replyRecord[Math.floor(Math.random() * replyRecord.length)]));//随机输出语音
     await new Promise(resolve => setTimeout(resolve, 10));
    return;
  }  
}
