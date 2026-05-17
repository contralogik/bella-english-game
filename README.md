# Bella English Review Game

一个简单的儿童英语启蒙复习小游戏，适合 8 岁小朋友练习听懂、识别和参与互动。

## 文件

- `index.html`：网页结构
- `style.css`：页面样式
- `script.js`：词汇数据、游戏逻辑、语音朗读和学习记录
- `README.md`：项目说明

## 如何运行

直接双击 `index.html` 即可在浏览器中运行。

项目只使用 HTML、CSS 和 JavaScript，没有 React、Vue、后端、数据库、npm、登录系统或外部 API，可以离线运行。

## 功能

- Mixed Review 综合复习：显示英文，选择正确中文。
- Picture Review 识图复习：显示英文，选择正确图卡。
- Category Review 分类复习：选择一个类别后，只练习该类别。
- Parent Command 亲子指令：随机显示英文动作指令，不判断对错。
- Progress 学习进度：使用 `localStorage` 保存总练习次数、总答题数和总正确数。
- 语音朗读：使用浏览器 `speechSynthesis`，语速为 0.8。

## 放到 GitHub Pages

1. 在 GitHub 新建一个仓库，例如 `bella-english-review-game`。
2. 上传这 4 个文件：`index.html`、`style.css`、`script.js`、`README.md`。
3. 打开仓库的 `Settings`。
4. 找到 `Pages`。
5. 在 `Build and deployment` 中选择：
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
6. 保存后等待 GitHub 生成网址。

之后就可以用 GitHub Pages 链接打开这个小游戏。
