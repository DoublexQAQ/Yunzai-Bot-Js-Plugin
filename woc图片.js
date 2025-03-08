import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import plugin from '../../lib/plugins/plugin.js';

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

    // 获取当前模块的路径
    getCacheFolderPath() {
        const moduleUrl = import.meta.url;
        const modulePath = new URL(moduleUrl).pathname;
        const directoryPath = path.dirname(modulePath);
        return path.join(directoryPath, 'images');
    }

    // 获取调用次数记录的路径
    getCallCountFilePath() {
        return path.join(this.getCacheFolderPath(), 'callCounts.json');
    }

    // 获取图片文件夹的调用次数
    getCallCounts() {
        const filePath = this.getCallCountFilePath();
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf-8');
            return JSON.parse(data);
        }
        return {};
    }

    // 更新图片文件夹的调用次数
    updateCallCounts(callCounts) {
        const filePath = this.getCallCountFilePath();
        fs.writeFileSync(filePath, JSON.stringify(callCounts, null, 2), 'utf-8');
    }

    // 根据图片名称的前缀分类
    getImageCategory(filename) {
        let baseName = path.basename(filename, path.extname(filename));
        
        // 如果文件名是 40801 到 40809，统一分类为 40801
        if (/^4080[1-9]$/.test(baseName.substring(0, 5))) {
            return '40801';  // 统一放在 40801 文件夹
        }

        return baseName.substring(0, 12);  // 默认使用前12位作为分类标识（例如：202216561601）
    }

    // 下载图片并缓存到本地
    async downloadImage(url, folderPath) {
        try {
            const fileName = path.basename(url);
            const category = this.getImageCategory(fileName);
            const categoryFolderPath = path.join(folderPath, category);

            // 如果文件夹不存在，创建它
            if (!fs.existsSync(categoryFolderPath)) {
                fs.mkdirSync(categoryFolderPath, { recursive: true });
            }

            const filePath = path.join(categoryFolderPath, fileName);

            // 如果文件已存在，不下载
            if (fs.existsSync(filePath)) {
                return filePath;
            }

            // 下载图片并保存
            const response = await fetch(url);
            if (!response.ok) {
                console.error(`下载失败：${url}`);
                return null;
            }

            // 获取图片数据
            const buffer = await response.arrayBuffer();

            // 保存文件
            fs.writeFileSync(filePath, Buffer.from(buffer));

            return filePath;
        } catch (error) {
            console.error('图片下载失败:', error);
            return null;
        }
    }

    // 获取缓存的图片
    async getCachedImages() {
        const folderPath = this.getCacheFolderPath();
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
            return [];
        }

        const categories = fs.readdirSync(folderPath);
        let images = [];
        for (let category of categories) {
            const categoryPath = path.join(folderPath, category);
            if (fs.statSync(categoryPath).isDirectory()) {
                const files = fs.readdirSync(categoryPath);
                files.forEach(file => {
                    images.push(path.join(categoryPath, file));
                });
            }
        }

        return images;
    }

    // 获取图片的 URL
    async getImageUrlFromAPI() {
        try {
            let randomPicGroup = 1 + Math.floor(Math.random() * 50);
            let response = await fetch(`https://yingtall.com/wp-json/wp/v2/posts?page=${randomPicGroup}`);
            let json = await response.json();

            let urls = [];
            json.forEach(item => {
                let context = item.content.rendered;
                let regex = /(http[a-zA-Z0-9:/._-]+\.jpg)/g;
                let matches = context.match(regex);
                if (matches) {
                    urls.push(...matches);
                }
            });
            return urls;
        } catch (error) {
            console.error('API 获取图片失败:', error);
            return [];
        }
    }

    // 获取最少调用次数的文件夹
    getLeastUsedFolder(categories, callCounts) {
        let leastUsedFolder = null;
        let minCount = Infinity;

        for (let folder of categories) {
            const count = callCounts[folder] || 0;
            if (count < minCount) {
                minCount = count;
                leastUsedFolder = folder;
            }
        }

        return leastUsedFolder;
    }

    // woc 指令处理
    async woc(e) {
        // 获取图片URL和缓存的图片
        let urls = await this.getImageUrlFromAPI();
        let cachedImages = await this.getCachedImages();

        // 准备下载图片
        let downloadPromises = [];
        const folderPath = this.getCacheFolderPath();
        const categories = {};

        // 如果缓存中有图片，加入下载列表
        for (let filePath of cachedImages) {
            const category = this.getImageCategory(path.basename(filePath));
            if (!categories[category]) {
                categories[category] = [];
            }
            categories[category].push(filePath);
        }

        // 如果有新的图片URL，加入下载列表
        for (let url of urls) {
            downloadPromises.push(
                this.downloadImage(url, folderPath).then(filePath => {
                    if (filePath) {
                        const category = this.getImageCategory(path.basename(filePath));
                        if (!categories[category]) {
                            categories[category] = [];
                        }
                        categories[category].push(filePath);
                    }
                })
            );
        }

        // 等待所有图片下载完成
        await Promise.all(downloadPromises);

        // 获取当前的调用次数记录
        let callCounts = this.getCallCounts();

        // 选择调用次数最少的文件夹
        const folderNames = Object.keys(categories);
        if (folderNames.length === 0) {
            e.reply('没有找到任何图片');
            return;
        }

        const leastUsedFolder = this.getLeastUsedFolder(folderNames, callCounts);

        // 随机选择该文件夹中的图片
        const selectedImages = categories[leastUsedFolder];

        // 更新该文件夹的调用次数
        callCounts[leastUsedFolder] = (callCounts[leastUsedFolder] || 0) + 1;

        // 保存更新后的调用次数
        this.updateCallCounts(callCounts);

        // 创建伪造消息
        const fakeMsgArr = selectedImages.map(filePath => ({
            user_id: e.user_id,
            nickname: e.nickname,
            message: segment.image(`file://${filePath}`)  // 确保使用 file:// 协议发送本地文件
        }));

        try {
            // 发送图片
            const makeForwardMsg = await e.group.makeForwardMsg(fakeMsgArr);
            await e.reply(makeForwardMsg);
        } catch (error) {
            // 发送失败，回复指定的消息
            console.error("转发失败:", error); // 打印详细的错误信息
            await e.reply("天天看？我都无法转发了"); // 向用户发送错误提示
        }
    }
}
