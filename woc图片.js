import plugin from '../../lib/plugins/plugin.js';
import fetch from 'node-fetch';

export class Example extends plugin {
    constructor() {
        super({
            name: 'woc',
            dsc: 'woc',
            event: 'message',
            priority: 5000,
            rule: [
                {
                    reg: '^#?(woc|wc|卧槽|我操|我艹|我擦|握草|窝草)',
                    fnc: 'woc'
                }
            ]
        });
    }

    async woc(e) {
        await this.delayedReply(e, '让我来帮你找一些有趣的图片...');
        const redisPicArr = await this.fetchImages();

        if (redisPicArr.length > 0) {
            await this.sendImageUrls(e, redisPicArr);
        } else {
            await this.delayedReply(e, '抱歉，我遇到了一些问题，无法获取图片。请稍后再试！');
        }
    }

    async fetchImages() {
        try {
            const randomPicGroup = Math.floor(Math.random() * 200) + 1;
            const response = await fetch(`https://yingtall.com/wp-json/wp/v2/posts?page=${randomPicGroup}`);

            if (!response.ok) throw new Error(`HTTP错误: ${response.status}`);

            const posts = await response.json();
            return posts.flatMap(item => {
                const regex = /(http[a-zA-Z0-9:/._-]+\.jpg)/g;
                return item.content.rendered.match(regex) || [];
            });
        } catch (error) {
            Bot.logger.error('获取图片链接失败:', error);
            return [];
        }
    }

    async sendImageUrls(e, urls) {
        if (urls.length === 0) {
            return this.delayedReply(e, '抱歉，当前没有可用的图片链接。请稍后再试！');
        }

        // 限制图片数量，按顺序取3到7张
        const numberOfImages = Math.floor(Math.random() * 5) + 3; // 生成3到7的随机数
        const limitedUrls = urls.slice(0, numberOfImages); // 选择顺序的图片

        // 伪造消息的标题、提示和总结
        const title = "好看的图片";
        const hint = "极致的诱惑";
        const summary = `图片数量: ${limitedUrls.length}`; // 使用 limitedUrls.length

        try {
            const forwardMsg = e.group.makeForwardMsg(limitedUrls.map(url => ({
                user_id: e.user_id, // 修改为 e.user_id
                nickname: e.member.nickname,
                message: segment.image(url)
            })));

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

            await this.delayedReply(e, forwardMsg);
        } catch (error) {
            if (error.code === -70) { // 风控错误
                await this.sendImagesIndividually(e, limitedUrls);
            } else {
                Bot.logger.error('发送图片时发生错误:', error);
            }
        }
    }

    async sendImagesIndividually(e, urls) {
        const limitedUrls = urls.slice(0, 5); 
        for (const url of limitedUrls) {
            try {
                await this.delayedReply(e, segment.image(url));
                await new Promise(resolve => setTimeout(resolve, 500)); // 每张间隔500毫秒
            } catch (error) {
                Bot.logger.error('发送单张图片时发生错误:', error);
                break; // 如果发送失败，退出循环
            }
        }
    }

    async delayedReply(e, message) {
        await e.reply(message);
        await new Promise(resolve => setTimeout(resolve, 3000));
    }
}
