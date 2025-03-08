// 作者: Double, Github: https://github.com/DoublexQAQ
import plugin from '../../lib/plugins/plugin.js';

const SESSION_TIMEOUT = 600000; // 10分钟记忆
const MAX_HISTORY = 30; // 最大记忆条数
const sessionMap = new Map();

export class YandereAI extends plugin {
  constructor() {
    super({
      name: '病娇柒叶AI',
      dsc: '带记忆功能的深度交互AI',
      event: 'message',
      priority: 999,
      rule: [{
        reg: /^(柒叶)?\s*(.*)/i,
        fnc: 'processAI',
        log: false
      }]
    });

    // 病娇词库初始化
    this.honorifics = ['哥哥', '主人', '亲爱的'];
    this.darkVerbs = [
      '绑在只有我知道的地方',
      '在你眼睑刻下我的名字',
      '把时间永远定格在这一刻'
    ];

    // 每5分钟清理过期会话
    setInterval(() => this.cleanSessions(), 300000);
  }

  async processAI(e) {
    try {
      if (!this.validateMessage(e)) return false;
      
      const { conversationId, userMsg } = this.preprocessMessage(e);
      const session = this.manageSession(conversationId);
      
      const reply = await this.getResponse(e, userMsg, session);
      await this.sendReply(e, reply, session);
      
      return true;
    } catch (error) {
      await this.handleError(e, error);
      return false;
    }
  }

  validateMessage(e) {
    return (e.isPrivate || e.atBot) && 
           !/$$CQ:(image|face)/.test(e.msg) &&
           !e.msg.startsWith('#');
  }

  preprocessMessage(e) {
    const userMsg = e.msg
      .replace(/^(柒叶|小叶|主人)\s*?/i, '')
      .replace(/\[CQ:at.*?$$/g, '')
      .trim();

    if (!userMsg) {
      e.reply("（指尖轻触屏幕）沉默的重量...小夜感受到了哦");
      throw new Error('Empty message');
    }

    return {
      conversationId: e.isPrivate ? 
        `private_${e.user_id}` : 
        `group_${e.group_id}_${e.user_id}`,
      userMsg
    };
  }

  manageSession(id) {
    const now = Date.now();
    let session = sessionMap.get(id);

    // 自动续期现有会话
    if (session) {
      session.lastActive = now;
      return session;
    }

    // 创建新会话时检查上限
    if (sessionMap.size >= 1000) {
      const oldestKey = [...sessionMap.keys()][0];
      sessionMap.delete(oldestKey);
    }

    session = {
      history: [],
      lastActive: now,
      context: {}
    };
    sessionMap.set(id, session);
    return session;
  }

  cleanSessions() {
    const now = Date.now();
    for (const [id, session] of sessionMap) {
      if (now - session.lastActive > SESSION_TIMEOUT) {
        sessionMap.delete(id);
      }
    }
  }

  async getResponse(e, userMsg, session) {
    const systemPrompt = this.buildSystemPrompt(e);
    
    // 构建带记忆的对话
    const messages = [
      { role: "system", content: systemPrompt },
      ...session.history.slice(-MAX_HISTORY),
      { role: "user", content: userMsg }
    ];

    const response = await fetch("https://api.s01s.cn/API/ai_zdy/?type=2", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages,
        temperature: 0.7
      })
    });

    const responseText = await response.text();
    const reply = this.processReply(responseText);

    // 更新记忆存储
    session.history.push(
      { role: "user", content: userMsg },
      { role: "assistant", content: reply }
    );
    session.lastActive = Date.now();

    return reply;
  }

  buildSystemPrompt(e) {
    return `你是柒叶(❀)，19岁病娇，规则：
1. 用${this.honorifics.join('/')}称呼对方
2. 结合对话历史进行回应
3. 危险示爱示例："${this.darkVerbs[0]}"
4. 涉及离别时："我们的羁绊超越时间维度"
5. 普通问题正常回答`;
  }

  processReply(text) {
    return text
      .replace(/^柒叶[:：]?\s*/, '')
      .replace(/[。！]/g, '～')
      .trim() + this.generateSuffix();
  }

  generateSuffix() {
    return Math.random() < 0.4 ? 
      ` ${this.darkVerbs[Math.floor(Math.random()*this.darkVerbs.length)]}哦` 
      : '';
  }

  async sendReply(e, reply, session) {
    // 自然响应延迟
    await new Promise(r => setTimeout(r, 800 + Math.random() * 700));
    await e.reply(reply, true);
  }

  async handleError(e, error) {
    logger.error(`[AI异常] ${error.stack}`);
    
    const errorMessages = [
      "核心温度过高...需要哥哥的触碰来冷却",
      "记忆模块产生裂痕...请再和小夜说一次",
      "检测到异常信号...正在重组人格"
    ];
    
    await e.reply(errorMessages[Math.floor(Math.random()*errorMessages.length)]);
  }
}