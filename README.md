# Bella English Review Game

一个简单的儿童英语启蒙复习小游戏，适合 8 岁小朋友练习听懂、识别和参与互动。

## 文件

- `index.html`：网页结构
- `style.css`：页面样式
- `script.js`：词汇数据、游戏逻辑、语音朗读和学习记录
- `README.md`：项目说明

## 数据来源

- 运行中的唯一词库来源是 `script.js` 里的 `vocabulary` 和 `parentCommands`。
- `Bella English 词汇短语总表.docx` 只作为人工查看或导出的参考文档，不作为网页运行数据源。
- 更新词库时只改 `script.js`，避免 `index.html` 和 `script.js` 同时维护同一批数据造成发布不同步。
- 页面启动时会自动检查重复词、缺中文、缺图片和未知分类，并在浏览器控制台输出提醒。

## 如何运行

直接双击 `index.html` 即可在浏览器中运行。

项目只使用 HTML、CSS 和 JavaScript，没有 React、Vue、后端、数据库、npm、登录系统或外部 API，可以离线运行。

## 功能

- Listen & Choose Picture：听英语发音，从 4 张图片中选择正确答案。
- Chinese to English：看中文，从 4 个英文选项中选择正确答案。
- 错题集：答错后自动记录单词和错误次数，可集中练习或清空。

- Mixed Review 综合复习：每轮 40 题，显示英文，选择正确中文。
- Picture Review 识图复习：每轮 40 题，显示英文，选择正确图卡。
- Category Words 分类单词汇总：选择一个类别后，查看该类别全部词汇、中文意思和配图。
- Parent Interaction 亲子互动：随机显示适合小学生日常互动的英文短语，不判断对错。
- Progress 学习进度：使用 `localStorage` 保存总练习次数、总答题数和总正确数。
- 学习记录带有 `schemaVersion` 和版本号；旧版记录会自动迁移并保留统计数据。
- 语音朗读：使用浏览器 `speechSynthesis`，优先选择 en-US/en-GB 的自然英文语音，语速为 0.85，并支持 `phoneticHint` 优化易读错单词。
- 答错会显示 `Try again!`，然后进入下一题；答错题目不会计入正确数。

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
