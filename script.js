"use strict";

const appVersion = "2026.07.14.4";
const lessonVideos = {
  "good-morning": {
    src: "assets/lesson-01-good-morning.mp4",
    label: "Lesson 1 Good Morning"
  },
  "breakfast-time": {
    src: "assets/lesson-02-breakfast-time.mp4",
    label: "Lesson 2 Breakfast Time"
  },
  "brush-teeth": {
    src: "assets/lesson-03-brush-teeth.mp4",
    label: "Lesson 3 Brush Teeth"
  },
  "getting-dressed": {
    src: "assets/lesson-04-getting-dressed.mp4",
    label: "Lesson 4 Getting Dressed"
  },
  "school-bag": {
    src: "assets/lesson-05-school-bag.mp4",
    label: "Lesson 5 School Bag"
  }
};
const progressStorageSchemaVersion = 4;

// Vocabulary is kept in JavaScript arrays so the game works offline.
// The picture field uses emoji as built-in visual cards, avoiding images, APIs, or CDNs.
const vocabulary = [
  ...makeWords("Actions", [
    ["come", "来", "👋"],
    ["go", "去", "👉"],
    ["run", "跑", "🏃"],
    ["turn around", "转身", "🔄"],
    ["stop", "停止", "🛑"],
    ["quick", "快的", "⚡"],
    ["fast", "快", "💨"],
    ["slow", "慢", "🐢"],
    ["sit", "坐下", "🪑"],
    ["stand", "站立", "🧍"],
    ["jump", "跳", "🦘"],
    ["walk", "走路", "🚶"],
    ["look", "看", "👀"],
    ["listen", "听", "👂"],
    ["throw", "扔；投", "🏀"],
    ["say", "说", "💬"],
    ["swim", "游泳", "🏊"],
    ["fly", "飞", "🪽"],
    ["wake up", "醒来；起床", "⏰"],
    ["brush teeth", "刷牙", "🪥"],
    ["play with", "和……玩", "🧸"],
    ["have a bath", "洗澡", "🛁"],
    ["draw picture", "画画", "🎨"],
    ["learn", "学习", "📖"],
    ["write", "写", "✏️"],
    ["taste", "尝；品尝", "👅"],
    ["watch TV", "看电视", "📺"],
    ["see", "看见", "👀"],
    ["move", "移动", "➡️"],
    ["work", "工作", "💼"],
    ["find", "找到；发现", "🔎"]
  ]),
  ...makeWords("Colors", [
    ["red", "红色", "🔴"],
    ["blue", "蓝色", "🔵"],
    ["yellow", "黄色", "🟡"],
    ["white", "白色", "⚪"],
    ["orange", "橙色", "🟠"],
    ["green", "绿色", "🟢"],
    ["black", "黑色", "⚫"],
    ["brown", "棕色", "🟤"]
  ]),
  ...makeWords("Home Objects", [
    ["table", "桌子", "🍽️"],
    ["chair", "椅子", "🪑"],
    ["bed", "床", "🛏️"],
    ["window", "窗户", "🪟"],
    ["door", "门", "🚪"],
    ["bag", "包", "🎒"],
    ["book", "书", "📘"],
    ["toy", "玩具", "🧸"],
    ["house", "房子", "🏠"],
    ["pen", "钢笔", "🖊️"],
    ["umbrella", "雨伞", "☂️"],
    ["towel", "毛巾", "🧺"],
    ["bucket", "桶", "🪣"]
  ]),
  ...makeWords("Outdoor", [
    ["car", "汽车", "🚗"],
    ["bike", "自行车", "🚲"],
    ["street", "街道", "🛣️"],
    ["tree", "树", "🌳"],
    ["building", "建筑物", "🏢"],
    ["grass", "草地", "🌱"],
    ["star", "星星", "⭐"],
    ["school", "学校", "🏫"]
  ]),
  ...makeWords("Feelings", [
    ["happy", "开心的", "😊"],
    ["sad", "难过的", "😢"],
    ["tired", "累的", "😴"],
    ["angry", "生气的", "😠"],
    ["scared", "害怕的", "😨"]
  ]),
  ...makeWords("Food", [
    ["water", "水", "💧"],
    ["milk", "牛奶", "🥛"],
    ["bread", "面包", "🍞"],
    ["apple", "苹果", "🍎"],
    ["banana", "香蕉", "🍌"],
    ["strawberry", "草莓", "🍓"],
    ["noodles", "面条", "🍜"],
    ["fruit", "水果", "🍇"],
    ["rice", "米饭", "🍚"],
    ["tomato", "西红柿", "🍅"],
    ["food", "食物", "🍽️"],
    ["cake", "蛋糕", "🍰"],
    ["egg", "鸡蛋", "🥚"],
    ["pear", "梨", "🍐"]
  ]),
  ...makeWords("Animals", [
    ["duck", "鸭子", "🦆"],
    ["dog", "狗", "🐶"],
    ["cat", "猫", "🐱"],
    ["chicken", "鸡", "🐔"],
    ["pig", "猪", "🐷"],
    ["bird", "鸟", "🐦"],
    ["fish", "鱼", "🐟"],
    ["rabbit", "兔子", "🐰"],
    ["tiger", "老虎", "🐯"],
    ["lion", "狮子", "🦁"],
    ["snake", "蛇", "🐍"],
    ["cow", "奶牛", "🐄"],
    ["sheep", "羊", "🐑"],
    ["horse", "马", "🐴"],
    ["monkey", "猴子", "🐵"],
    ["elephant", "大象", "🐘"]
  ]),
  ...makeWords("Temperature", [
    ["hot", "热的", "🔥"],
    ["cold", "冷的", "❄️"]
  ]),
  ...makeWords("Body Parts", [
    ["hand", "手", "✋"],
    ["foot", "脚", "🦶"],
    ["nose", "鼻子", "👃"],
    ["mouth", "嘴巴", "👄"],
    ["head", "头", "🙂"],
    ["face", "脸", "😀"],
    ["eye", "眼睛", "👁️"],
    ["ear", "耳朵", "👂"]
  ]),
  ...makeWords("Pronouns", [
    ["I", "我", "🙋"],
    ["you", "你", "👉"],
    ["he", "他", "👦"],
    ["she", "她", "👧"],
    ["my", "我的", "🤲"],
    ["your", "你的", "🫵"],
    ["her", "她的；她", "👧"],
    ["his", "他的", "👦"]
  ]),
  ...makeWords("Family", [
    ["mother", "妈妈", "👩"],
    ["father", "爸爸", "👨"],
    ["sister", "姐妹；姐姐；妹妹", "👧"],
    ["brother", "兄弟；哥哥；弟弟", "👦"],
    ["grandmother", "奶奶；外婆", "👵"]
  ]),
  ...makeWords("Questions", [
    ["what", "什么", "❓"],
    ["where", "哪里", "📍"],
    ["why", "为什么", "🤔"],
    ["how", "怎样；如何", "❔"],
    ["who", "谁", "🧒"],
    ["how many", "多少", "🔢"],
    ["what do you like?", "你喜欢什么？", "💗"],
    ["what can it do?", "它会做什么？", "❓"],
    ["what are you doing?", "你正在做什么？", "🏃"],
    ["what do you do?", "你是做什么的？", "💼"],
    ["what can you see?", "你能看见什么？", "👀"],
    ["how are you?", "你好吗？", "😊"],
    ["how old are you?", "你几岁了？", "🎂"],
    ["do you have a blue pen?", "你有一支蓝色钢笔吗？", "🖊️"],
    ["which one is different?", "哪一个不一样？", "☝️"],
    ["what can we use fire for?", "我们可以用火做什么？", "🔥"],
    ["which", "哪一个", "☝️"],
    ["there is", "有", "✅"],
    ["it is", "它是", "💬"]
  ]),
  ...makeWords("Daily Instructions", [
    ["give", "给", "🤲"],
    ["show", "展示", "🖼️"],
    ["take", "拿", "✋"],
    ["put", "放", "📦"],
    ["open", "打开", "🔓"],
    ["close", "关闭", "🔒", "close the door"],
    ["eat", "吃", "🍽️"],
    ["drink", "喝", "🥤"],
    ["sleep", "睡觉", "🛌"],
    ["like", "喜欢", "💗"],
    ["can", "能；会", "💪"],
    ["help", "帮助", "🤝"],
    ["raise your hand", "举手", "🙋"]
  ]),
  ...makeWords("Position Words", [
    ["in", "在里面", "📥"],
    ["on", "在上面", "⬆️"],
    ["under", "在下面", "⬇️"],
    ["behind", "在后面", "↩️"]
  ]),
  ...makeWords("Adjectives", [
    ["delicious", "美味的", "😋"],
    ["beautiful", "漂亮的", "🌸"],
    ["perfect", "完美的", "⭐"],
    ["sweet", "甜的", "🍯"],
    ["tall", "高的", "📏"],
    ["short", "矮的；短的", "↕️"],
    ["healthy", "健康的", "💪"],
    ["heavy", "重的", "🏋️"],
    ["light", "轻的", "🪶"],
    ["sour", "酸的", "🍋"],
    ["easy", "容易的", "✅"],
    ["difficult", "困难的", "🧩"],
    ["empty", "空的", "⬜"],
    ["full", "满的", "🈵"],
    ["dirty", "脏的", "🟤"],
    ["clean", "干净的", "✨"]
  ]),
  ...makeWords("People", [
    ["teacher", "老师", "👩‍🏫"],
    ["friend", "朋友", "🧑‍🤝‍🧑"],
    ["name", "名字", "🏷️"],
    ["doctor", "医生", "🧑‍⚕️"],
    ["chef", "厨师", "🧑‍🍳"]
  ]),
  ...makeWords("Clothes", [
    ["clothes", "衣服", "👕"],
    ["trousers", "裤子", "👖"],
    ["socks", "袜子", "🧦"],
    ["shoe", "鞋", "👟"],
    ["He is wearing a red shirt", "他穿着一件红色衬衫", "👕"]
  ]),
  ...makeWords("Nature", [
    ["soil", "土壤", "🟫"],
    ["leaf", "叶子", "🍃"],
    ["plant", "植物", "🪴"],
    ["land", "陆地", "🏝️"],
    ["sea", "大海", "🌊"],
    ["sky", "天空", "☁️"],
    ["moon", "月亮", "🌙"],
    ["river", "河流", "🏞️"],
    ["storm", "暴风雨", "⛈️"],
    ["weather", "天气", "🌦️"],
    ["fire", "火", "🔥"]
  ]),
  ...makeWords("Transport", [
    ["ship", "船", "🚢"],
    ["train", "火车", "🚆"],
    ["bus", "公交车", "🚌"],
    ["by train", "乘火车", "🚆"]
  ]),
  ...makeWords("Time", [
    ["morning", "早晨；上午", "🌅"],
    ["afternoon", "下午", "🌤️"],
    ["evening", "晚上；傍晚", "🌆"],
    ["day", "白天；一天", "☀️"],
    ["night", "夜晚", "🌙"],
    ["time", "时间", "⏰"]
  ]),
  ...makeWords("Art and Music", [
    ["music", "音乐", "🎵"]
  ]),
  ...makeWords("Common Words", [
    ["every", "每一个；每个", "🔁"]
  ]),
  ...makeWords("Daily Phrases", [
    ["Good morning", "早上好", "🌞"],
    ["Good night", "晚安", "🌙"],
    ["Thank you", "谢谢", "🙏"],
    ["You’re welcome", "不客气", "😊"],
    ["Excuse me", "打扰一下", "🙋"],
    ["Sorry", "对不起", "🙇"],
    ["I’m hungry", "我饿了", "🍽️"],
    ["I’m thirsty", "我渴了", "🥤"],
    ["I want this", "我想要这个", "☝️"],
    ["Let’s go", "我们走吧", "🚶"],
    ["I get 7 stars", "我得到了7颗星", "⭐"],
    ["You have a purple pen", "你有一支紫色钢笔", "🖊️"],
    ["Welcome", "欢迎", "👋"],
    ["Watch out", "小心", "⚠️"]
  ])
];

const quizQuestionCount = 40;
const parentCommands = [
  "Run.",
  "Stop.",
  "Jump.",
  "Walk slowly.",
  "Turn around.",
  "Sit down.",
  "Stand up.",
  "Raise your hand.",
  "Watch out!",
  "Touch your [body part].",
  "Show me your [body part].",
  "Point to the [object].",
  "Open the [object].",
  "Close the [object].",
  "Give me the [object].",
  "Put the [object] on the [object].",
  "Put on your [clothes].",
  "Take off your [clothes].",
  "What is it?",
  "What color is it?",
  "What can you see?",
  "What can it do?",
  "What are you doing?",
  "What do you like?",
  "What do you want?",
  "What is in the bag?",
  "What is on the table?",
  "What does a [animal] say?",
  "What is your name?",
  "What do you do in the morning?",
  "Where is the [object]?",
  "Where is your bag?",
  "Where is the toy?",
  "Where is the pen?",
  "Where is Mom?",
  "Where is Dad?",
  "Where is the ship?",
  "Where is the train?",
  "Who is he?",
  "Who is she?",
  "Who is this?",
  "Who is your teacher?",
  "Who helps people?",
  "Who is happy?",
  "When do you wake up?",
  "When do you brush your teeth?",
  "When do you go to school?",
  "When do you have a bath?",
  "When do you sleep?",
  "When do you say good night?",
  "How are you?",
  "How are you today?",
  "How do you feel?",
  "How do you go to school?",
  "How many books are there?",
  "How many stars do you get?",
  "How many apples do you have?",
  "How much is it?",
  "How much water do you want?",
  "How does it taste?",
  "Are you hungry?",
  "Are you thirsty?",
  "Do you like apples?",
  "Do you have a blue pen?",
  "Can you swim?",
  "Can a bird fly?",
  "Which one is different?",
  "Which one is heavy?",
  "Which one is full?",
  "Good morning, Mom.",
  "Good night, Dad.",
  "Thank you.",
  "You are welcome.",
  "Excuse me.",
  "Sorry.",
  "I am hungry.",
  "I am thirsty.",
  "I want this.",
  "Let us go.",
  "Let us read a book.",
  "Let us draw a picture."
];

const storyLessons = createStoryLessons([
  {
    id: "good-morning", number: 1, title: "Good Morning", chinese: "早晨问候", icon: "🌅", scene: "bedroom", summary: "起床、问候和表达感受", focus: ["Good morning", "wake up", "How are you?", "happy", "tired", "open"],
    dialogue: [["Mom", "Good morning, Bella.", "早上好，Bella。", "☀️"], ["Bella", "Good morning, Mom.", "早上好，妈妈。"], ["Mom", "Wake up, please.", "请起床。", "⏰"], ["Bella", "Okay, Mom.", "好的，妈妈。"], ["Mom", "How are you today?", "你今天感觉怎么样？", "❓"], ["Bella", "I'm a little tired.", "我有一点累。", "😴"], ["Mom", "Stand up and open the window.", "站起来，把窗户打开。", "🪟"], ["Bella", "Okay! I'm happy now!", "好的！我现在开心了！", "😊"]],
    questions: [["Wake up, Bella.", "Bella 应该做什么？", ["🛏️ Wake up", "🍽️ Eat", "🎨 Draw", "🚲 Ride"], 0], ["Open the window.", "选择正确的动作。", ["🚪 Close the door", "🪟 Open the window", "🪑 Sit down", "🪥 Brush teeth"], 1], ["I'm tired.", "她感觉怎么样？", ["😊 Happy", "😧 Angry", "😴 Tired", "😋 Hungry"], 2]],
    roleplay: [["Good morning, Bella.", "Good morning, Mom.", "向妈妈问好"], ["How are you today?", "I'm happy. / I'm tired.", "说出你真实的感受"]],
    mission: "明天早晨，对妈妈说 Good morning，并回答 How are you today?"
  },
  {
    id: "breakfast-time", number: 2, title: "Breakfast Time", chinese: "早餐时间", icon: "🥚", scene: "breakfast", summary: "表达饥饿和想吃的早餐", focus: ["hungry", "want", "egg", "milk", "please", "delicious"],
    dialogue: [["Mom", "Are you hungry, Bella?", "Bella，你饿了吗？", "❓"], ["Bella", "Yes, I am.", "是的，我饿了。", "😋"], ["Mom", "What do you want?", "你想要什么？", "🍽️"], ["Bella", "I want an egg and some milk, please.", "我想要一个鸡蛋和一些牛奶。", "🥚🥛"], ["Mom", "Here you are.", "给你。", "🤲"], ["Bella", "Thank you, Mom.", "谢谢妈妈。"], ["Mom", "How does it taste?", "味道怎么样？", "❓"], ["Bella", "It's delicious!", "很好吃！", "😋"]],
    questions: [["I want an egg.", "Bella 想要什么？", ["🍎 Apple", "🥚 Egg", "🥛 Milk", "🎂 Cake"], 1], ["I want some milk.", "选择正确的早餐。", ["🍐 Pear", "🥛 Milk", "🥚 Egg", "🍓 Strawberry"], 1], ["What do you want?", "选择合适的回答。", ["I'm happy.", "Good night.", "I want an apple, please.", "It's on the table."], 2]],
    roleplay: [["Are you hungry?", "Yes, I am. / No, I'm not.", "根据真实感受回答"], ["What do you want?", "I want an egg, please.", "说出你真正想吃的东西"], ["Here you are.", "Thank you.", "礼貌地说谢谢"]],
    mission: "下一次早餐时，用 I want..., please. 告诉家长你想吃什么。"
  },
  {
    id: "brush-teeth", number: 3, title: "Brush Teeth", chinese: "刷牙洗脸", icon: "🪥", scene: "bathroom", summary: "完成早晨清洁指令", focus: ["brush teeth", "wash", "face", "clean", "water", "towel"],
    dialogue: [["Mom", "It's time to brush your teeth.", "该刷牙了。", "🪥"], ["Bella", "Okay. Where is my toothbrush?", "好的。我的牙刷在哪里？", "❓"], ["Mom", "It is on the table.", "它在桌子上。", "⬆️"], ["Bella", "I see it.", "我看见了。", "👀"], ["Mom", "Wash your face, please.", "请洗脸。", "🫧"], ["Bella", "My face is clean.", "我的脸干净了。", "✨"], ["Mom", "Take the towel.", "拿毛巾。", "🧺"], ["Bella", "All done!", "全部完成了！", "✅"]],
    questions: [["Brush your teeth.", "Bella 要做什么？", ["🪥 Brush teeth", "🛏️ Sleep", "🎒 Pack bag", "🏃 Run"], 0], ["Where is my toothbrush?", "这个问题在问什么？", ["Who", "Where", "How many", "Why"], 1], ["My face is clean.", "Bella 的脸怎么样？", ["Dirty", "Clean", "Heavy", "Cold"], 1]],
    roleplay: [["Where is my toothbrush?", "It is on the table.", "练习 where 和 on"], ["Wash your face, please.", "Okay.", "听懂并回应指令"]],
    mission: "刷牙时说 Brush teeth, wash my face, all done."
  },
  {
    id: "getting-dressed", number: 4, title: "Getting Dressed", chinese: "穿衣服", icon: "👕", scene: "closet", summary: "说出衣物、颜色和穿脱动作", focus: ["clothes", "shirt", "trousers", "socks", "shoes", "put on"],
    dialogue: [["Mom", "Put on your clothes, please.", "请穿上衣服。", "👕"], ["Bella", "Where are my socks?", "我的袜子在哪里？", "🧦"], ["Mom", "They are under the chair.", "它们在椅子下面。", "⬇️"], ["Bella", "I found them.", "我找到它们了。", "✅"], ["Mom", "What color is your shirt?", "你的衬衫是什么颜色？", "❓"], ["Bella", "It is red.", "它是红色的。", "🔴"], ["Mom", "Put on your shoes.", "穿上你的鞋。", "👟"], ["Bella", "I'm ready!", "我准备好了！", "🌟"]],
    questions: [["Put on your shoes.", "选择正确的物品。", ["🧦 Socks", "👟 Shoes", "📘 Book", "🥛 Milk"], 1], ["They are under the chair.", "袜子在哪里？", ["On the chair", "Under the chair", "In the bag", "Behind the door"], 1], ["What color is your shirt?", "这个问题在问什么？", ["颜色", "数量", "地点", "感觉"], 0]],
    roleplay: [["What color is your shirt?", "It is red / blue / yellow.", "说出衣服颜色"], ["Where are my socks?", "They are under the chair.", "练习 under"]],
    mission: "穿衣服时说 Put on my socks / shoes，并说出一种颜色。"
  },
  {
    id: "school-bag", number: 5, title: "School Bag", chinese: "整理书包", icon: "🎒", scene: "schoolbag", summary: "准备上学物品", focus: ["bag", "book", "pen", "take", "put", "in"],
    dialogue: [["Mom", "Let's pack your bag.", "我们来整理书包。", "🎒"], ["Bella", "I need my book.", "我需要我的书。", "📘"], ["Mom", "Put the book in the bag.", "把书放进书包。", "⬇️"], ["Bella", "Okay. The book is in the bag.", "好的。书在书包里。", "✅"], ["Mom", "Do you have a blue pen?", "你有蓝色钢笔吗？", "🔵"], ["Bella", "Yes, I do.", "是的，我有。", "✏️"], ["Mom", "Take your umbrella too.", "也拿上你的雨伞。", "☂️"], ["Bella", "I'm ready for school.", "我准备好上学了。", "🏫"]],
    questions: [["Put the book in the bag.", "书应该放在哪里？", ["On the table", "In the bag", "Under the bed", "Behind the door"], 1], ["Do you have a blue pen?", "选择合适回答。", ["Yes, I do.", "Good night.", "I'm hungry.", "It can fly."], 0], ["Take your umbrella.", "Bella 要拿什么？", ["☂️ Umbrella", "🍎 Apple", "🧦 Socks", "🐟 Fish"], 0]],
    roleplay: [["Do you have a blue pen?", "Yes, I do. / No, I don't.", "回答 have 问句"], ["Where is your book?", "It is in my bag.", "练习 in"]],
    mission: "整理书包时说 The book is in my bag."
  },
  {
    id: "on-the-way", number: 6, title: "On the Way", chinese: "上学路上", icon: "🚶", scene: "street", summary: "路上安全和交通表达", focus: ["go", "walk", "street", "car", "bike", "watch out"],
    dialogue: [["Mom", "Let's go to school.", "我们去学校吧。", "🏫"], ["Bella", "Let's go!", "走吧！", "🚶"], ["Mom", "Walk slowly on the street.", "在街上慢慢走。", "🐢"], ["Bella", "Okay. I walk slowly.", "好的。我慢慢走。"], ["Mom", "Watch out! A car is coming.", "小心！一辆车来了。", "🚗"], ["Bella", "I stop.", "我停下。", "🛑"], ["Mom", "Good. Now we can go.", "很好。现在我们可以走了。"], ["Bella", "I can see my school.", "我能看见我的学校。", "🏫"]],
    questions: [["Watch out!", "这句话是什么意思？", ["小心", "晚安", "谢谢", "我饿了"], 0], ["A car is coming.", "什么来了？", ["🚗 Car", "🚲 Bike", "🚢 Ship", "🐱 Cat"], 0], ["Walk slowly.", "应该怎么走？", ["Fast", "Slowly", "Fly", "Swim"], 1]],
    roleplay: [["Let's go to school.", "Let's go!", "回应出发"], ["Watch out!", "I stop.", "听懂安全提醒"]],
    mission: "过马路前练习 Watch out 和 Stop."
  },
  {
    id: "classroom-hello", number: 7, title: "Classroom Hello", chinese: "进教室问好", icon: "🏫", scene: "classroom", summary: "见到老师和同学", focus: ["teacher", "friend", "hello", "name", "sit down", "listen"],
    dialogue: [["Teacher", "Hello, Bella.", "你好，Bella。", "👩‍🏫"], ["Bella", "Hello, teacher.", "老师好。"], ["Teacher", "What is your name?", "你叫什么名字？", "❓"], ["Bella", "My name is Bella.", "我的名字是 Bella。"], ["Teacher", "This is your friend.", "这是你的朋友。", "👧"], ["Bella", "Hello, friend.", "你好，朋友。"], ["Teacher", "Sit down and listen, please.", "请坐下并听。", "🪑"], ["Bella", "Okay. I can listen.", "好的。我会听。", "👂"]],
    questions: [["What is your name?", "选择合适回答。", ["My name is Bella.", "It is red.", "I want milk.", "It can swim."], 0], ["Sit down.", "选择动作。", ["🪑 Sit down", "🏃 Run", "🛏️ Sleep", "🧼 Wash"], 0], ["Hello, teacher.", "Bella 在跟谁问好？", ["Teacher", "Doctor", "Chef", "Dad"], 0]],
    roleplay: [["What is your name?", "My name is Bella.", "介绍名字"], ["Sit down and listen, please.", "Okay.", "听懂课堂指令"]],
    mission: "见到老师或家长时说 Hello，并说 My name is Bella."
  },
  {
    id: "raise-your-hand", number: 8, title: "Raise Your Hand", chinese: "举手回答", icon: "✋", scene: "classroom", summary: "课堂提问和表达能力", focus: ["raise your hand", "say", "what", "can", "see", "answer"],
    dialogue: [["Teacher", "Raise your hand, please.", "请举手。", "✋"], ["Bella", "I raise my hand.", "我举手。"], ["Teacher", "What can you see?", "你能看见什么？", "❓"], ["Bella", "I can see a book.", "我能看见一本书。", "📘"], ["Teacher", "What color is the book?", "这本书是什么颜色？", "🔵"], ["Bella", "It is blue.", "它是蓝色的。"], ["Teacher", "Good answer!", "回答得好！", "🌟"], ["Bella", "Thank you.", "谢谢。"]],
    questions: [["Raise your hand.", "选择正确动作。", ["✋ Raise hand", "🛏️ Sleep", "🥛 Drink", "🚪 Close"], 0], ["I can see a book.", "Bella 看见了什么？", ["Book", "Car", "Dog", "Cake"], 0], ["It is blue.", "书是什么颜色？", ["Red", "Blue", "Yellow", "Green"], 1]],
    roleplay: [["What can you see?", "I can see a book.", "说出你看到的东西"], ["What color is it?", "It is blue.", "说出颜色"]],
    mission: "家长指一个物品，Bella 用 I can see... 和 It is... 回答。"
  },
  {
    id: "colors-and-toys", number: 9, title: "Colors and Toys", chinese: "颜色和玩具", icon: "🧸", scene: "playroom", summary: "描述喜欢的玩具和颜色", focus: ["toy", "red", "blue", "yellow", "like", "beautiful"],
    dialogue: [["Mom", "Show me your toy.", "给我看看你的玩具。", "🧸"], ["Bella", "This is my toy.", "这是我的玩具。"], ["Mom", "What color is it?", "它是什么颜色？", "❓"], ["Bella", "It is yellow and red.", "它是黄色和红色的。", "🟡🔴"], ["Mom", "Do you like it?", "你喜欢它吗？", "💗"], ["Bella", "Yes, I like it.", "是的，我喜欢它。"], ["Mom", "It is beautiful.", "它很漂亮。", "✨"], ["Bella", "Thank you.", "谢谢。"]],
    questions: [["Show me your toy.", "妈妈想看什么？", ["Toy", "Milk", "Window", "Socks"], 0], ["It is yellow and red.", "玩具有哪两种颜色？", ["Yellow and red", "Black and white", "Blue and green", "Brown and orange"], 0], ["Do you like it?", "选择合适回答。", ["Yes, I like it.", "Good morning.", "It is under the chair.", "I am tired."], 0]],
    roleplay: [["What color is it?", "It is yellow and red.", "描述玩具颜色"], ["Do you like it?", "Yes, I like it.", "表达喜欢"]],
    mission: "选一个玩具，用 It is... 和 I like it. 描述。"
  },
  {
    id: "snack-time", number: 10, title: "Snack Time", chinese: "点心时间", icon: "🍎", scene: "snack", summary: "表达想吃水果和口味", focus: ["apple", "banana", "strawberry", "sweet", "sour", "want"],
    dialogue: [["Mom", "Do you want a snack?", "你想吃点心吗？", "🍎"], ["Bella", "Yes, please.", "是的，请给我。"], ["Mom", "What fruit do you want?", "你想要什么水果？", "🍓"], ["Bella", "I want a banana.", "我想要一根香蕉。", "🍌"], ["Mom", "Taste the strawberry.", "尝尝草莓。", "🍓"], ["Bella", "It is sweet.", "它很甜。", "🍬"], ["Mom", "Taste the lemon.", "尝尝柠檬。", "🍋"], ["Bella", "It is sour!", "它很酸！", "😆"]],
    questions: [["I want a banana.", "Bella 想要什么？", ["🍌 Banana", "🍎 Apple", "🍓 Strawberry", "🥛 Milk"], 0], ["It is sweet.", "味道怎么样？", ["Sweet", "Sour", "Hot", "Cold"], 0], ["Taste the strawberry.", "选择正确水果。", ["🍓 Strawberry", "🍐 Pear", "🍚 Rice", "🥚 Egg"], 0]],
    roleplay: [["What fruit do you want?", "I want an apple.", "表达想吃的水果"], ["How does it taste?", "It is sweet / sour.", "描述味道"]],
    mission: "吃水果时说 I want... 和 It is sweet / sour."
  },
  {
    id: "feelings-check", number: 11, title: "Feelings Check", chinese: "情绪表达", icon: "😊", scene: "feelings", summary: "说出开心、难过、生气和害怕", focus: ["happy", "sad", "angry", "scared", "tired", "help"],
    dialogue: [["Mom", "How do you feel?", "你感觉怎么样？", "❓"], ["Bella", "I am sad.", "我难过。", "😢"], ["Mom", "Why are you sad?", "你为什么难过？"], ["Bella", "I can't find my toy.", "我找不到我的玩具。", "🧸"], ["Mom", "I can help you.", "我可以帮你。", "🤝"], ["Bella", "Thank you, Mom.", "谢谢妈妈。"], ["Mom", "Here is your toy.", "你的玩具在这里。"], ["Bella", "Now I am happy.", "现在我开心了。", "😊"]],
    questions: [["I am sad.", "Bella 感觉怎么样？", ["Happy", "Sad", "Angry", "Scared"], 1], ["I can help you.", "妈妈可以做什么？", ["Help", "Fly", "Sleep", "Swim"], 0], ["Now I am happy.", "最后 Bella 怎么样？", ["Happy", "Tired", "Cold", "Dirty"], 0]],
    roleplay: [["How do you feel?", "I am happy / sad / tired.", "说真实感受"], ["I can help you.", "Thank you.", "接受帮助并感谢"]],
    mission: "每天选一次心情，用 I am... 告诉家长。"
  },
  {
    id: "playground-fun", number: 12, title: "Playground Fun", chinese: "操场玩耍", icon: "🏃", scene: "playground", summary: "用动作词玩起来", focus: ["run", "jump", "fast", "slow", "stop", "play"],
    dialogue: [["Mom", "Let's play outside.", "我们去外面玩吧。", "🏃"], ["Bella", "Great! I can run.", "太好了！我会跑。"], ["Mom", "Run fast.", "快跑。", "⚡"], ["Bella", "I run fast!", "我快跑！"], ["Mom", "Now walk slowly.", "现在慢慢走。", "🐢"], ["Bella", "I walk slowly.", "我慢慢走。"], ["Mom", "Jump three times.", "跳三次。", "3️⃣"], ["Bella", "One, two, three!", "一、二、三！", "🌟"]],
    questions: [["Run fast.", "应该怎么跑？", ["Fast", "Slow", "Clean", "Full"], 0], ["Walk slowly.", "应该怎么走？", ["Slowly", "Fast", "Under", "Behind"], 0], ["Jump three times.", "Bella 要跳几次？", ["One", "Two", "Three", "Four"], 2]],
    roleplay: [["Run fast.", "I run fast!", "边做边说"], ["Jump three times.", "One, two, three!", "数数和动作结合"]],
    mission: "玩动作游戏：家长说 Run / Stop / Jump，Bella 做动作并复述。"
  },
  {
    id: "at-the-park", number: 13, title: "At the Park", chinese: "公园观察", icon: "🌳", scene: "park", summary: "观察树、草、花和天空", focus: ["tree", "grass", "sky", "flower", "see", "beautiful"],
    dialogue: [["Mom", "What can you see in the park?", "你在公园能看见什么？", "🌳"], ["Bella", "I can see a tree.", "我能看见一棵树。"], ["Mom", "What is under the tree?", "树下面有什么？", "❓"], ["Bella", "Grass is under the tree.", "草在树下面。", "🌱"], ["Mom", "Look at the sky.", "看天空。", "☁️"], ["Bella", "The sky is blue.", "天空是蓝色的。"], ["Mom", "The flower is beautiful.", "花很漂亮。", "🌼"], ["Bella", "I like the park.", "我喜欢公园。", "💗"]],
    questions: [["I can see a tree.", "Bella 看见了什么？", ["Tree", "Ship", "Cake", "Sock"], 0], ["The sky is blue.", "天空是什么颜色？", ["Blue", "Red", "Black", "Brown"], 0], ["Grass is under the tree.", "草在哪里？", ["Under the tree", "In the bag", "On the table", "Behind the door"], 0]],
    roleplay: [["What can you see?", "I can see a tree.", "观察并回答"], ["What color is the sky?", "The sky is blue.", "描述天空颜色"]],
    mission: "去公园或看窗外时，用 I can see... 说三样东西。"
  },
  {
    id: "animal-sounds", number: 14, title: "Animal Sounds", chinese: "动物声音", icon: "🐶", scene: "zoo", summary: "认识动物和能力", focus: ["dog", "cat", "bird", "fish", "can", "fly"],
    dialogue: [["Mom", "What animal can you see?", "你能看见什么动物？", "🐶"], ["Bella", "I can see a dog.", "我能看见一只狗。"], ["Mom", "What does a dog say?", "狗怎么叫？", "❓"], ["Bella", "Woof, woof!", "汪汪！"], ["Mom", "Can a bird fly?", "鸟会飞吗？", "🐦"], ["Bella", "Yes, it can fly.", "是的，它会飞。"], ["Mom", "Can a fish swim?", "鱼会游泳吗？", "🐟"], ["Bella", "Yes, it can swim.", "是的，它会游泳。"]],
    questions: [["Can a bird fly?", "鸟会做什么？", ["Fly", "Read", "Brush teeth", "Wear shoes"], 0], ["Can a fish swim?", "鱼会做什么？", ["Swim", "Jump rope", "Write", "Sleep in a bed"], 0], ["What does a dog say?", "狗怎么叫？", ["Woof", "Meow", "Moo", "Quack"], 0]],
    roleplay: [["What animal can you see?", "I can see a dog.", "说出动物"], ["Can a bird fly?", "Yes, it can.", "回答 can 问句"]],
    mission: "看动物图片时，用 I can see... 和 It can... 说两句。"
  },
  {
    id: "where-is-it", number: 15, title: "Where Is It?", chinese: "东西在哪里", icon: "📍", scene: "home", summary: "练习 in/on/under/behind", focus: ["where", "in", "on", "under", "behind", "find"],
    dialogue: [["Mom", "Where is your pen?", "你的钢笔在哪里？", "✏️"], ["Bella", "It is on the table.", "它在桌子上。", "⬆️"], ["Mom", "Where is your toy?", "你的玩具在哪里？", "🧸"], ["Bella", "It is under the chair.", "它在椅子下面。", "⬇️"], ["Mom", "Where is your bag?", "你的书包在哪里？", "🎒"], ["Bella", "It is behind the door.", "它在门后面。", "🚪"], ["Mom", "Good. You found them.", "很好。你找到它们了。"], ["Bella", "I can find my things.", "我能找到我的东西。", "✅"]],
    questions: [["It is on the table.", "钢笔在哪里？", ["On the table", "Under the chair", "In the bag", "Behind the door"], 0], ["It is under the chair.", "玩具在哪里？", ["On the bed", "Under the chair", "Behind the window", "In the cup"], 1], ["It is behind the door.", "书包在哪里？", ["Behind the door", "On the table", "Under the chair", "In the box"], 0]],
    roleplay: [["Where is your pen?", "It is on the table.", "练习 on"], ["Where is your bag?", "It is behind the door.", "练习 behind"]],
    mission: "家长藏一个物品，Bella 用 It is in/on/under/behind... 回答。"
  },
  {
    id: "bath-time", number: 16, title: "Bath Time", chinese: "洗澡时间", icon: "🛁", scene: "bath", summary: "洗澡、冷热和身体部位", focus: ["bath", "hot", "cold", "hand", "foot", "clean"],
    dialogue: [["Mom", "It's bath time.", "洗澡时间到了。", "🛁"], ["Bella", "Is the water hot?", "水热吗？", "🔥"], ["Mom", "No, it is warm.", "不，它是温的。"], ["Bella", "Good. I wash my hands.", "好的。我洗手。", "✋"], ["Mom", "Wash your feet, please.", "请洗脚。", "🦶"], ["Bella", "My feet are clean.", "我的脚干净了。", "✨"], ["Mom", "Take the towel.", "拿毛巾。", "🧺"], ["Bella", "Good night soon?", "快晚安了吗？", "🌙"]],
    questions: [["Wash your hands.", "Bella 洗什么？", ["Hands", "Book", "Bag", "Window"], 0], ["Wash your feet.", "Bella 还要洗什么？", ["Feet", "Pen", "Toy", "Apple"], 0], ["Is the water hot?", "这个问题在问水是否怎样？", ["Hot", "Blue", "Heavy", "Sweet"], 0]],
    roleplay: [["Is the water hot?", "No, it is warm.", "回答冷热"], ["Wash your feet, please.", "Okay.", "听懂身体部位指令"]],
    mission: "洗澡时说 Wash my hands / feet 和 clean."
  },
  {
    id: "story-time", number: 17, title: "Story Time", chinese: "读书时间", icon: "📖", scene: "reading", summary: "读书、看图和讲述", focus: ["book", "read", "look", "picture", "what", "see"],
    dialogue: [["Mom", "Let's read a book.", "我们读一本书吧。", "📖"], ["Bella", "I like this book.", "我喜欢这本书。"], ["Mom", "Look at the picture.", "看这张图。", "🖼️"], ["Bella", "I can see a rabbit.", "我能看见一只兔子。", "🐰"], ["Mom", "What is the rabbit doing?", "兔子正在做什么？", "❓"], ["Bella", "It is jumping.", "它在跳。", "跳"], ["Mom", "Can you jump?", "你会跳吗？"], ["Bella", "Yes, I can jump!", "是的，我会跳！"]],
    questions: [["Let's read a book.", "要做什么？", ["Read a book", "Brush teeth", "Ride a bike", "Eat noodles"], 0], ["Look at the picture.", "应该看哪里？", ["Picture", "Door", "Shoe", "Milk"], 0], ["It is jumping.", "兔子在做什么？", ["Jumping", "Sleeping", "Writing", "Drinking"], 0]],
    roleplay: [["What can you see?", "I can see a rabbit.", "看图回答"], ["Can you jump?", "Yes, I can.", "回答能力"]],
    mission: "读绘本时，每页说一句 I can see..."
  },
  {
    id: "good-night", number: 18, title: "Good Night", chinese: "睡前晚安", icon: "🌙", scene: "night", summary: "睡前流程和告别", focus: ["good night", "sleep", "tired", "close", "door", "moon"],
    dialogue: [["Mom", "It's time to sleep.", "该睡觉了。", "🛏️"], ["Bella", "I am tired.", "我累了。", "😴"], ["Mom", "Close the book, please.", "请合上书。", "📘"], ["Bella", "Okay. The book is closed.", "好的。书合上了。"], ["Mom", "Look at the moon.", "看月亮。", "🌙"], ["Bella", "The moon is beautiful.", "月亮很漂亮。"], ["Mom", "Good night, Bella.", "晚安，Bella。"], ["Bella", "Good night, Mom.", "晚安，妈妈。"]],
    questions: [["It's time to sleep.", "现在该做什么？", ["Sleep", "Run", "Eat breakfast", "Go to school"], 0], ["Close the book.", "要对书做什么？", ["Close", "Open", "Throw", "Drink"], 0], ["Good night, Mom.", "这句话什么时候说？", ["晚上睡前", "早上起床", "吃午饭", "上课举手"], 0]],
    roleplay: [["Good night, Bella.", "Good night, Mom.", "睡前道晚安"], ["Are you tired?", "Yes, I am.", "表达疲倦"]],
    mission: "睡前用 Good night, Mom/Dad. 结束一天。"
  },
  {
    id: "rainy-day", number: 19, title: "Rainy Day", chinese: "下雨天", icon: "☔", scene: "rain", summary: "天气、雨伞和出门准备", focus: ["rain", "weather", "umbrella", "cold", "put on", "go"],
    dialogue: [["Mom", "How is the weather?", "天气怎么样？", "☔"], ["Bella", "It is rainy.", "下雨了。"], ["Mom", "Take your umbrella.", "拿上你的雨伞。", "☂️"], ["Bella", "Where is my umbrella?", "我的雨伞在哪里？", "❓"], ["Mom", "It is behind the door.", "它在门后面。", "🚪"], ["Bella", "I found it.", "我找到了。"], ["Mom", "Put on your shoes.", "穿上你的鞋。", "👟"], ["Bella", "Now I can go.", "现在我可以走了。", "🚶"]],
    questions: [["It is rainy.", "天气怎么样？", ["Rainy", "Sunny", "Hot", "Sweet"], 0], ["Take your umbrella.", "Bella 要拿什么？", ["Umbrella", "Book", "Egg", "Toy"], 0], ["It is behind the door.", "雨伞在哪里？", ["Behind the door", "On the table", "In the bag", "Under the chair"], 0]],
    roleplay: [["How is the weather?", "It is rainy.", "描述天气"], ["Where is my umbrella?", "It is behind the door.", "找雨伞"]],
    mission: "下雨或看天气时说 It is rainy / sunny."
  },
  {
    id: "doctor-visit", number: 20, title: "Doctor Visit", chinese: "看医生", icon: "🩺", scene: "doctor", summary: "表达身体不舒服和需要帮助", focus: ["doctor", "help", "head", "mouth", "tired", "feel"],
    dialogue: [["Doctor", "Hello, Bella. How are you?", "你好，Bella。你怎么样？", "🩺"], ["Bella", "I am not very well.", "我不太舒服。", "😟"], ["Doctor", "Open your mouth, please.", "请张开嘴。", "👄"], ["Bella", "Okay.", "好的。"], ["Doctor", "Does your head hurt?", "你的头疼吗？", "❓"], ["Bella", "No, but I am tired.", "不疼，但是我累。", "😴"], ["Doctor", "Drink some water and rest.", "喝点水并休息。", "💧"], ["Bella", "Thank you, doctor.", "谢谢医生。"]],
    questions: [["Open your mouth.", "医生让 Bella 做什么？", ["Open mouth", "Close book", "Run fast", "Put on shoes"], 0], ["I am tired.", "Bella 怎么了？", ["Tired", "Happy", "Hungry", "Scared"], 0], ["Drink some water.", "医生建议喝什么？", ["Water", "Milk", "Juice", "Soup"], 0]],
    roleplay: [["How are you?", "I am not very well.", "表达不舒服"], ["Open your mouth, please.", "Okay.", "听懂医生指令"]],
    mission: "不舒服时，用 I am not very well / I am tired. 表达。"
  },
  {
    id: "supermarket", number: 21, title: "Supermarket", chinese: "超市买东西", icon: "🛒", scene: "supermarket", summary: "选择、数量和礼貌表达", focus: ["want", "how many", "apple", "pear", "take", "thank you"],
    dialogue: [["Mom", "We need some fruit.", "我们需要一些水果。", "🍎"], ["Bella", "I want apples.", "我想要苹果。"], ["Mom", "How many apples do you want?", "你想要几个苹果？", "❓"], ["Bella", "Two apples, please.", "两个苹果，谢谢。", "2️⃣"], ["Mom", "Take one pear too.", "也拿一个梨。", "🍐"], ["Bella", "Okay. One pear.", "好的。一个梨。"], ["Mom", "Put them in the bag.", "把它们放进袋子。", "🎒"], ["Bella", "All done. Thank you.", "完成了。谢谢。"]],
    questions: [["Two apples, please.", "Bella 要几个苹果？", ["One", "Two", "Three", "Four"], 1], ["Take one pear.", "还要拿什么？", ["Pear", "Egg", "Milk", "Book"], 0], ["Put them in the bag.", "水果放在哪里？", ["In the bag", "Under the chair", "Behind the door", "On the bed"], 0]],
    roleplay: [["How many apples do you want?", "Two apples, please.", "回答数量"], ["What do you want?", "I want apples.", "表达想买的东西"]],
    mission: "买东西时练习 I want... 和 How many...?"
  },
  {
    id: "birthday-party", number: 22, title: "Birthday Party", chinese: "生日聚会", icon: "🎂", scene: "party", summary: "祝福、蛋糕和感谢", focus: ["birthday", "cake", "happy", "thank you", "friend", "sweet"],
    dialogue: [["Friend", "Happy birthday, Bella!", "Bella，生日快乐！", "🎂"], ["Bella", "Thank you, friend.", "谢谢你，朋友。"], ["Mom", "Here is your cake.", "这是你的蛋糕。", "🍰"], ["Bella", "It is beautiful.", "它很漂亮。", "✨"], ["Mom", "Taste the cake.", "尝尝蛋糕。"], ["Bella", "It is sweet and delicious.", "它又甜又好吃。", "😋"], ["Friend", "Do you like the party?", "你喜欢聚会吗？", "❓"], ["Bella", "Yes, I am happy.", "是的，我很开心。", "😊"]],
    questions: [["Happy birthday, Bella!", "朋友在说什么？", ["生日快乐", "晚安", "小心", "请坐"], 0], ["It is sweet and delicious.", "蛋糕味道怎么样？", ["Sweet and delicious", "Cold and sour", "Dirty and heavy", "Fast and slow"], 0], ["Yes, I am happy.", "Bella 感觉怎么样？", ["Happy", "Sad", "Angry", "Scared"], 0]],
    roleplay: [["Happy birthday, Bella!", "Thank you.", "回应祝福"], ["Do you like the party?", "Yes, I do.", "表达喜欢"]],
    mission: "收到祝福或礼物时说 Thank you，并补一句 I like it."
  },
  {
    id: "at-the-beach", number: 23, title: "At the Beach", chinese: "海边玩水", icon: "🌊", scene: "beach", summary: "海边、游泳和安全", focus: ["sea", "sand", "swim", "cold", "can", "watch out"],
    dialogue: [["Mom", "Look at the sea.", "看大海。", "🌊"], ["Bella", "The sea is blue.", "大海是蓝色的。"], ["Mom", "Can you swim?", "你会游泳吗？", "🏊"], ["Bella", "Yes, I can swim.", "是的，我会游泳。"], ["Mom", "The water is cold today.", "今天水有点冷。", "❄️"], ["Bella", "I can touch the water.", "我可以摸摸水。"], ["Mom", "Watch out and stay with me.", "小心，跟我在一起。", "⚠️"], ["Bella", "Okay, Mom.", "好的，妈妈。"]],
    questions: [["The sea is blue.", "大海是什么颜色？", ["Blue", "Red", "Yellow", "Black"], 0], ["Can you swim?", "这个问题在问什么能力？", ["Swim", "Fly", "Write", "Cook"], 0], ["Watch out.", "这句话提醒 Bella 什么？", ["小心", "睡觉", "刷牙", "吃饭"], 0]],
    roleplay: [["Can you swim?", "Yes, I can. / No, I can't.", "回答能力"], ["What can you see?", "I can see the sea.", "描述海边"]],
    mission: "玩水前练习 Watch out 和 stay with me."
  },
  {
    id: "my-day-review", number: 24, title: "My Day Review", chinese: "我的一天复盘", icon: "⭐", scene: "review", summary: "串起一天的基础表达", focus: ["morning", "school", "food", "play", "night", "I can"],
    dialogue: [["Mom", "What do you do in the morning?", "你早上做什么？", "🌅"], ["Bella", "I wake up and brush my teeth.", "我起床并刷牙。", "🪥"], ["Mom", "What do you do at school?", "你在学校做什么？", "🏫"], ["Bella", "I listen and raise my hand.", "我听讲并举手。", "✋"], ["Mom", "What do you like to eat?", "你喜欢吃什么？", "🍎"], ["Bella", "I like apples and cake.", "我喜欢苹果和蛋糕。"], ["Mom", "What can you do?", "你会做什么？", "❓"], ["Bella", "I can speak English!", "我会说英语！", "🌟"]],
    questions: [["I wake up and brush my teeth.", "Bella 早上做什么？", ["Wake up and brush teeth", "Swim in the sea", "Buy apples", "Go to sleep"], 0], ["I listen and raise my hand.", "Bella 在学校做什么？", ["Listen and raise hand", "Wash feet", "Taste cake", "Take umbrella"], 0], ["I can speak English!", "Bella 会做什么？", ["Speak English", "Fly", "Drive a car", "Cook rice"], 0]],
    roleplay: [["What do you do in the morning?", "I wake up and brush my teeth.", "说早晨流程"], ["What can you do?", "I can speak English.", "总结能力"], ["How are you today?", "I'm happy.", "结束复盘"]],
    mission: "睡前用三句英文复盘：I wake up... I like... I can..."
  }
]);

// Every review word is assigned to at least one story lesson. The sequence moves
// from concrete daily routines to descriptions, questions, and freer speech.
const lessonVocabularyPlan = {
  "good-morning": ["Good morning", "wake up", "morning", "bed", "window", "open", "happy", "tired", "stand", "how are you?", "every"],
  "breakfast-time": ["water", "milk", "bread", "egg", "food", "eat", "drink", "delicious", "I’m hungry", "I’m thirsty", "table", "chair"],
  "brush-teeth": ["brush teeth", "face", "nose", "mouth", "towel", "bucket", "clean", "dirty", "have a bath", "hand", "foot"],
  "getting-dressed": ["clothes", "trousers", "socks", "shoe", "red", "blue", "yellow", "white", "put", "He is wearing a red shirt", "my", "your"],
  "school-bag": ["bag", "book", "pen", "umbrella", "take", "give", "show", "in", "do you have a blue pen?", "You have a purple pen"],
  "on-the-way": ["go", "walk", "street", "car", "bike", "bus", "train", "by train", "ship", "slow", "fast", "stop", "Watch out", "Let’s go"],
  "classroom-hello": ["teacher", "friend", "name", "school", "building", "sit", "listen", "say", "raise your hand", "Welcome", "Excuse me"],
  "raise-your-hand": ["learn", "write", "draw picture", "look", "see", "what can you see?", "can", "easy", "difficult", "perfect", "Thank you", "You’re welcome"],
  "colors-and-toys": ["toy", "orange", "green", "black", "brown", "beautiful", "like", "play with", "what do you like?", "which", "which one is different?", "light", "heavy"],
  "snack-time": ["apple", "banana", "strawberry", "fruit", "pear", "tomato", "sweet", "sour", "taste", "I want this", "how many"],
  "feelings-check": ["sad", "angry", "scared", "help", "mother", "father", "sister", "brother", "grandmother", "he", "she", "her", "his", "who", "why", "Sorry"],
  "playground-fun": ["run", "jump", "quick", "turn around", "throw", "move", "come", "what are you doing?", "tall", "short"],
  "at-the-park": ["tree", "grass", "sky", "star", "soil", "leaf", "plant", "land", "river", "there is", "it is"],
  "animal-sounds": ["dog", "cat", "duck", "chicken", "pig", "cow", "sheep", "horse", "rabbit", "bird", "fish", "fly", "swim", "what can it do?"],
  "where-is-it": ["house", "door", "find", "on", "under", "behind", "where", "book", "toy", "pen", "close", "tiger", "lion", "snake", "monkey", "elephant"],
  "bath-time": ["hot", "cold", "head", "eye", "ear", "clean", "dirty", "bucket", "towel", "have a bath", "hand", "foot"],
  "story-time": ["music", "watch TV", "draw picture", "book", "look", "see", "rabbit", "what can you see?", "what"],
  "good-night": ["sleep", "moon", "storm", "weather", "evening", "night", "Good night", "close", "door"],
  "rainy-day": ["soil", "leaf", "plant", "river", "storm", "weather", "umbrella", "cold", "put", "go"],
  "doctor-visit": ["doctor", "healthy", "how", "how old are you?", "help", "head", "mouth", "drink", "water"],
  "supermarket": ["noodles", "rice", "tomato", "chef", "full", "empty", "what do you do?", "food", "take", "put"],
  "birthday-party": ["cake", "friend", "sweet", "I get 7 stars", "Thank you", "beautiful", "happy"],
  "at-the-beach": ["sea", "swim", "ship", "fire", "what can we use fire for?", "cold", "hot", "Watch out"],
  "my-day-review": ["what", "heavy", "tall", "afternoon", "day", "time", "work", "what do you do?", "what are you doing?", "what do you like?", "I", "you"]
};

const oralSentenceOverrides = {
  "come": "Come here, please.", "go": "Let’s go.", "turn around": "Turn around, please.",
  "stop": "Stop, please.", "quick": "Be quick, please.", "fast": "I can run fast.",
  "slow": "I can walk slowly.", "sit": "Sit down, please.", "stand": "Stand up, please.",
  "look": "Look at this.", "listen": "Listen, please.", "throw": "Throw the ball, please.",
  "say": "Say it again, please.", "wake up": "I wake up in the morning.",
  "brush teeth": "I brush my teeth every morning.", "play with": "I play with my friend.",
  "have a bath": "I have a bath in the evening.", "draw picture": "I can draw a picture.",
  "watch TV": "I watch TV with my family.", "move": "Move the chair, please.",
  "work": "My mother and father work.", "find": "I can find my book.",
  "what": "What is it?", "where": "Where is my bag?", "why": "Why are you sad?",
  "how": "How do you feel?", "who": "Who is she?", "how many": "How many apples are there?",
  "which": "Which one do you like?", "there is": "There is a book on the table.",
  "it is": "It is blue.", "give": "Give me the book, please.", "show": "Show me your picture, please.",
  "take": "Take your bag, please.", "put": "Put the book on the table, please.",
  "open": "Open the door, please.", "close": "Close the door, please.",
  "eat": "I eat breakfast in the morning.", "drink": "I drink water every day.",
  "sleep": "I sleep at night.", "like": "I like it.", "can": "I can do it.",
  "help": "Can you help me, please?", "raise your hand": "Raise your hand, please.",
  "in": "The book is in the bag.", "on": "The pen is on the table.",
  "under": "The toy is under the chair.", "behind": "The bag is behind the door.",
  "I": "I am Bella.", "you": "You are my friend.", "he": "He is my brother.",
  "she": "She is my sister.", "my": "This is my book.", "your": "This is your pen.",
  "her": "This is her bag.", "his": "This is his bike.",
  "He is wearing a red shirt": "He is wearing a red shirt.",
  "name": "My name is Bella.", "clothes": "These are my clothes.",
  "trousers": "These are my trousers.", "socks": "These are my socks.",
  "by train": "I go to school by train.", "morning": "Good morning.",
  "afternoon": "Good afternoon.", "evening": "Good evening.", "day": "Have a good day.",
  "night": "Good night.", "time": "What time is it?", "every": "I read every day."
};

function buildOralSentence(item) {
  if (oralSentenceOverrides[item.word]) return oralSentenceOverrides[item.word];
  if (/[?!.]$/.test(item.word)) return item.word.charAt(0).toUpperCase() + item.word.slice(1);
  if (item.category === "Actions") return `I can ${item.word}.`;
  if (item.category === "Colors") return `It is ${item.word}.`;
  if (["Home Objects", "Clothes"].includes(item.category)) return `This is my ${item.word}.`;
  if (["Outdoor", "Nature", "Transport"].includes(item.category)) return `I can see the ${item.word}.`;
  if (item.category === "Feelings") return `I am ${item.word}.`;
  if (item.category === "Food") return `I like ${item.word}.`;
  if (item.category === "Animals") {
    const article = /^[aeiou]/i.test(item.word) ? "an" : "a";
    return `I can see ${article} ${item.word}.`;
  }
  if (item.category === "Temperature") return `It is ${item.word}.`;
  if (item.category === "Body Parts") return `This is my ${item.word}.`;
  if (item.category === "Family") return `This is my ${item.word}.`;
  if (item.category === "Adjectives") return `It is ${item.word}.`;
  if (item.category === "People") return `This is a ${item.word}.`;
  if (item.category === "Time") return `It is ${item.word}.`;
  if (item.category === "Art and Music") return `I like ${item.word}.`;
  return `${item.word}.`;
}

storyLessons.forEach((lesson) => {
  const plannedWords = lessonVocabularyPlan[lesson.id] || lesson.focus;
  lesson.focus = plannedWords;
  lesson.oralPractice = plannedWords.map((word) => {
    const item = vocabulary.find((entry) => entry.word.toLowerCase() === word.toLowerCase());
    return item ? { ...item, model: buildOralSentence(item) } : null;
  }).filter(Boolean);
});

const sceneTemplates = {
  bedroom: { className: "scene-bedroom", place: "🪟", object: "🛏️", accent: "☀️" },
  breakfast: { className: "scene-breakfast", place: "☀️", object: "🥚 🥛 🍎", accent: "🍽️" },
  bathroom: { className: "scene-bathroom", place: "🪞", object: "🪥 🧼 🧺", accent: "💧" },
  closet: { className: "scene-closet", place: "👕", object: "🧦 👟 👖", accent: "🪑" },
  schoolbag: { className: "scene-school", place: "🏫", object: "🎒 📘 ✏️", accent: "☂️" },
  street: { className: "scene-street", place: "🏫", object: "🚗 🚲 🚦", accent: "🛑" },
  classroom: { className: "scene-classroom", place: "👩‍🏫", object: "📘 ✋ 🪑", accent: "⭐" },
  playroom: { className: "scene-playroom", place: "🧸", object: "🔴 🟡 🔵", accent: "💗" },
  snack: { className: "scene-snack", place: "🍎", object: "🍌 🍓 🍐", accent: "🍽️" },
  feelings: { className: "scene-feelings", place: "😊", object: "😢 😴 😧", accent: "🧸" },
  playground: { className: "scene-playground", place: "🏃", object: "⚽ 🛝 3️⃣", accent: "⭐" },
  park: { className: "scene-park", place: "🌳", object: "🌱 🌼 ☁️", accent: "💗" },
  zoo: { className: "scene-zoo", place: "🐶", object: "🐱 🐦 🐟", accent: "❓" },
  home: { className: "scene-home", place: "🚪", object: "✏️ 🧸 🎒", accent: "📍" },
  bath: { className: "scene-bath", place: "🛁", object: "✋ 🦶 🧺", accent: "💧" },
  reading: { className: "scene-reading", place: "📖", object: "🖼️ 🐰 ⭐", accent: "👀" },
  night: { className: "scene-night", place: "🌙", object: "🛏️ 📘 ✨", accent: "😴" },
  rain: { className: "scene-rain", place: "☔", object: "☂️ 🚪 👟", accent: "🌧️" },
  doctor: { className: "scene-doctor", place: "🩺", object: "👄 💧 🛏️", accent: "🤝" },
  supermarket: { className: "scene-market", place: "🛒", object: "🍎 🍎 🍐", accent: "2️⃣" },
  party: { className: "scene-party", place: "🎂", object: "🍰 🎁 🎈", accent: "😊" },
  beach: { className: "scene-beach", place: "🌊", object: "🏊 🏖️ ❄️", accent: "⚠️" },
  review: { className: "scene-review", place: "⭐", object: "🌅 🏫 🌙", accent: "🎤" }
};

function createStoryLessons(specs) {
  const avatars = {
    Bella: "👧",
    Mom: "👩",
    Teacher: "👩‍🏫",
    Doctor: "🧑‍⚕️",
    Friend: "🧒"
  };

  return specs.map((lesson) => ({
    ...lesson,
    dialogue: lesson.dialogue.map(([speaker, text, chinese, prop]) => ({
      speaker,
      avatar: avatars[speaker] || "👤",
      text,
      chinese,
      prop
    })),
    questions: lesson.questions.map(([prompt, chinese, options, answer]) => ({
      prompt,
      chinese,
      options,
      answer
    })),
    roleplay: lesson.roleplay.map(([prompt, hint, chinese]) => ({
      prompt,
      hint,
      chinese
    }))
  }));
}


const allowedCategories = [
  "Actions",
  "Colors",
  "Home Objects",
  "Outdoor",
  "Feelings",
  "Food",
  "Animals",
  "Temperature",
  "Body Parts",
  "Pronouns",
  "Family",
  "Questions",
  "Daily Instructions",
  "Position Words",
  "Adjectives",
  "People",
  "Clothes",
  "Nature",
  "Transport",
  "Time",
  "Art and Music",
  "Common Words",
  "Daily Phrases"
];

const progressKey = "bellaEnglishReviewProgress";
const screens = document.querySelectorAll(".screen");
const homeScreen = document.querySelector("#homeScreen");
const quizScreen = document.querySelector("#quizScreen");
const categoryScreen = document.querySelector("#categoryScreen");
const categorySummaryScreen = document.querySelector("#categorySummaryScreen");
const commandScreen = document.querySelector("#commandScreen");
const resultScreen = document.querySelector("#resultScreen");
const progressScreen = document.querySelector("#progressScreen");
const mistakesScreen = document.querySelector("#mistakesScreen");
const lessonListScreen = document.querySelector("#lessonListScreen");
const lessonScreen = document.querySelector("#lessonScreen");
const testScreen = document.querySelector("#testScreen");
const questionWord = document.querySelector("#questionWord");
const categoryLabel = document.querySelector("#categoryLabel");
const roundInfo = document.querySelector("#roundInfo");
const optionsArea = document.querySelector("#optionsArea");
const feedback = document.querySelector("#feedback");
const scoreText = document.querySelector("#scoreText");
const categoryButtons = document.querySelector("#categoryButtons");
const summaryTitle = document.querySelector("#summaryTitle");
const summaryList = document.querySelector("#summaryList");
const commandText = document.querySelector("#commandText");
const appVersionLabel = document.querySelector("#appVersion");
const lessonCards = document.querySelector("#lessonCards");
const lessonStepInfo = document.querySelector("#lessonStepInfo");
const lessonStageLabel = document.querySelector("#lessonStageLabel");
const lessonTitle = document.querySelector("#lessonTitle");
const lessonScene = document.querySelector("#lessonScene");
const dialoguePanel = document.querySelector("#dialoguePanel");
const speakerAvatar = document.querySelector("#speakerAvatar");
const speakerName = document.querySelector("#speakerName");
const dialogueText = document.querySelector("#dialogueText");
const dialogueChinese = document.querySelector("#dialogueChinese");
const lessonOptions = document.querySelector("#lessonOptions");
const lessonFeedback = document.querySelector("#lessonFeedback");
const lessonListenButton = document.querySelector("#lessonListenButton");
const lessonNextButton = document.querySelector("#lessonNextButton");
let quizWords = [];
let quizMode = "text";
let currentQuestion = null;
let currentIndex = 0;
let score = 0;
let answered = false;
let englishVoices = [];
let selectedVoice = null;
let activeLesson = null;
let lessonStage = "story";
let lessonItemIndex = 0;
let lessonCorrect = 0;
let lessonAnswered = false;

function makeWords(category, rows) {
  return rows.map(([word, chinese, picture, phoneticHint]) => ({
    category,
    word,
    chinese,
    picture,
    phoneticHint
  }));
}

function validateDataIntegrity() {
  const issues = [];
  const seenWords = new Set();
  const categorySet = new Set(allowedCategories);

  vocabulary.forEach((item, index) => {
    const word = String(item.word || "").trim();
    const key = word.toLowerCase();

    if (!word) issues.push(`Vocabulary row ${index + 1} is missing word.`);
    if (!String(item.chinese || "").trim()) issues.push(`${word || `Row ${index + 1}`} is missing Chinese.`);
    if (!String(item.picture || "").trim()) issues.push(`${word || `Row ${index + 1}`} is missing picture.`);
    if (!categorySet.has(item.category)) issues.push(`${word || `Row ${index + 1}`} has unknown category: ${item.category}`);
    if (key && seenWords.has(key)) issues.push(`Duplicate vocabulary word: ${word}`);
    seenWords.add(key);
  });

  parentCommands.forEach((command, index) => {
    if (!String(command || "").trim()) {
      issues.push(`Parent command ${index + 1} is empty.`);
    }
  });

  if (issues.length > 0) {
    console.warn("Bella English data check found issues:", issues);
  }

  return issues;
}

function validateLessonVocabularyCoverage() {
  const plannedWords = new Set(storyLessons.flatMap((lesson) => lesson.focus.map((word) => word.toLowerCase())));
  const missing = vocabulary.filter((item) => !plannedWords.has(item.word.toLowerCase()));
  const emptyLessons = storyLessons.filter((lesson) => !lesson.oralPractice.length);
  if (missing.length || emptyLessons.length || storyLessons.length !== 24) {
    console.warn("Bella lesson coverage check found issues:", {
      lessonCount: storyLessons.length,
      missingWords: missing.map((item) => item.word),
      emptyLessons: emptyLessons.map((lesson) => lesson.id)
    });
  }
  return { lessonCount: storyLessons.length, missingWords: missing, emptyLessons };
}

function showScreen(screenToShow) {
  screens.forEach((screen) => screen.classList.remove("active"));
  screenToShow.classList.add("active");
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function speak(text) {
  if (!("speechSynthesis" in window)) {
    feedback.textContent = "This browser cannot speak.";
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(getSpeechText(text));
  const voice = selectedVoice || chooseBestVoice();
  if (voice) {
    utterance.voice = voice;
  }
  utterance.lang = "en-US";
  utterance.rate = 0.85;
  utterance.pitch = 1;
  utterance.volume = 1;
  window.speechSynthesis.speak(utterance);
}

function getSpeechText(text) {
  if (typeof text === "object" && text !== null) {
    return cleanSpeechText(text.phoneticHint || text.word || "");
  }
  return cleanSpeechText(text);
}

function cleanSpeechText(text) {
  const replacements = {
    "I": "I.",
    "there is": "There is.",
    "it is": "It is.",
    "You’re welcome": "You are welcome.",
    "I’m hungry": "I am hungry.",
    "I’m thirsty": "I am thirsty.",
    "Let’s go": "Let us go.",
    "close": "close the door",
    "read": "read a book"
  };

  const direct = replacements[text];
  if (direct) {
    return direct;
  }

  let spoken = text
    .replace(/[’]/g, "'")
    .replace(/\bI'm\b/gi, "I am")
    .replace(/\bLet's\b/gi, "Let us")
    .replace(/\bYou're\b/gi, "You are")
    .replace(/\bcan't\b/gi, "cannot")
    .trim();

  if (!/[.!?]$/.test(spoken)) {
    spoken += ".";
  }

  return spoken;
}

function voiceScore(voice) {
  const name = voice.name.toLowerCase();
  const lang = voice.lang.toLowerCase();
  let score = 0;

  if (lang === "en-us") score += 150;
  else if (lang === "en-gb") score += 135;
  else if (lang.startsWith("en-us")) score += 125;
  else if (lang.startsWith("en-gb")) score += 118;
  else if (lang.startsWith("en-au") || lang.startsWith("en-ca")) score += 86;
  else if (lang.startsWith("en")) score += 60;

  if (name.includes("google us english")) score += 60;
  if (name.includes("microsoft jenny")) score += 58;
  if (name.includes("microsoft aria")) score += 56;
  if (name.includes("samantha")) score += 54;
  if (name.includes("natural") || name.includes("neural") || name.includes("online")) score += 44;
  if (name.includes("microsoft guy")) score += 30;
  if (name.includes("google uk english")) score += 28;
  if (name.includes("daniel")) score += 22;
  if (name.includes("zira")) score += 20;
  if (name.includes("mark")) score += 18;
  if (name.includes("compact")) score -= 20;

  return score;
}

function chooseBestVoice() {
  return englishVoices[0] || null;
}

function loadEnglishVoices() {
  if (!("speechSynthesis" in window)) {
    selectedVoice = null;
    return;
  }

  englishVoices = window.speechSynthesis
    .getVoices()
    .filter((voice) => {
      const lang = voice.lang.toLowerCase();
      return lang === "en-us" || lang === "en-gb" || lang.startsWith("en");
    })
    .sort((a, b) => voiceScore(b) - voiceScore(a));

  selectedVoice = chooseBestVoice();
}

function getProgress() {
  const saved = localStorage.getItem(progressKey);
  if (!saved) {
    return createEmptyProgress();
  }

  try {
    const progress = migrateProgress(JSON.parse(saved));
    if (saved !== JSON.stringify(progress)) {
      saveProgress(progress);
    }
    return progress;
  } catch (error) {
    localStorage.setItem(`${progressKey}Backup`, saved);
    const progress = createEmptyProgress();
    saveProgress(progress);
    return progress;
  }
}

function saveProgress(progress) {
  localStorage.setItem(progressKey, JSON.stringify(progress));
}

function createEmptyProgress() {
  return {
    schemaVersion: progressStorageSchemaVersion,
    appVersion,
    totalSessions: 0,
    totalQuestions: 0,
    totalCorrect: 0,
    mistakes: {},
    lessons: {}
  };
}

function migrateProgress(savedProgress) {
  const totalSessions = safeProgressNumber(savedProgress?.totalSessions);
  const totalQuestions = safeProgressNumber(savedProgress?.totalQuestions);
  const totalCorrect = Math.min(safeProgressNumber(savedProgress?.totalCorrect), totalQuestions);

  return {
    schemaVersion: progressStorageSchemaVersion,
    appVersion,
    totalSessions,
    totalQuestions,
    totalCorrect,
    mistakes: normalizeMistakes(savedProgress?.mistakes),
    lessons: normalizeLessonProgress(savedProgress?.lessons)
  };
}

function normalizeLessonProgress(lessons) {
  if (!lessons || typeof lessons !== "object" || Array.isArray(lessons)) return {};
  const validIds = new Set(storyLessons.map((lesson) => lesson.id));
  return Object.fromEntries(Object.entries(lessons)
    .filter(([id]) => validIds.has(id))
    .map(([id, value]) => [id, {
      completed: Boolean(value?.completed),
      bestScore: Math.min(3, safeProgressNumber(value?.bestScore))
    }]));
}

function normalizeMistakes(mistakes) {
  if (!mistakes || typeof mistakes !== "object" || Array.isArray(mistakes)) return {};
  const validWords = new Set(vocabulary.map((item) => item.word));
  return Object.fromEntries(Object.entries(mistakes)
    .filter(([word]) => validWords.has(word))
    .map(([word, count]) => [word, Math.max(1, safeProgressNumber(count))]));
}

function safeProgressNumber(value) {
  const number = Number(value);
  if (!Number.isFinite(number) || number < 0) {
    return 0;
  }
  return Math.floor(number);
}

function updateProgress(questionCount, correctCount) {
  const progress = getProgress();
  progress.schemaVersion = progressStorageSchemaVersion;
  progress.appVersion = appVersion;
  progress.totalSessions += 1;
  progress.totalQuestions += questionCount;
  progress.totalCorrect += correctCount;
  saveProgress(progress);
}

function startQuiz(words, label, mode = "text") {
  quizWords = shuffle(words).slice(0, quizQuestionCount);
  quizMode = mode;
  currentIndex = 0;
  score = 0;
  categoryLabel.textContent = label;
  showScreen(quizScreen);
  showQuestion();
}

function showQuestion() {
  answered = false;
  feedback.textContent = "";
  currentQuestion = quizWords[currentIndex];
  questionWord.classList.toggle("question-prompt", quizMode === "chinese-english");
  questionWord.textContent = quizMode === "listen-picture"
    ? "🔊 Listen and choose"
    : quizMode === "chinese-english" ? currentQuestion.chinese : currentQuestion.word;
  roundInfo.textContent = `${currentIndex + 1} / ${quizWords.length}`;
  optionsArea.innerHTML = "";

  const choicePool = quizMode === "picture" || quizMode === "listen-picture"
    ? vocabulary.filter((item) => item.word !== currentQuestion.word && item.picture !== currentQuestion.picture)
    : vocabulary.filter((item) => item.word !== currentQuestion.word);
  const wrongChoices = shuffle(choicePool).slice(0, 3);
  const choices = shuffle([currentQuestion, ...wrongChoices]);

  choices.forEach((choice) => {
    const button = document.createElement("button");
    button.className = quizMode === "picture" || quizMode === "listen-picture" ? "option-button picture-button" : "option-button";
    button.dataset.word = choice.word;

    if (quizMode === "picture" || quizMode === "listen-picture") {
      button.innerHTML = `
        <span class="picture-symbol">${choice.picture}</span>
        <span class="picture-label">${choice.chinese}</span>
      `;
      button.setAttribute("aria-label", `${choice.chinese} ${choice.picture}`);
    } else if (quizMode === "chinese-english") {
      button.textContent = choice.word;
    } else {
      button.textContent = choice.chinese;
    }

    button.addEventListener("click", () => checkAnswer(button, choice));
    optionsArea.appendChild(button);
  });

  if (quizMode === "listen-picture") setTimeout(() => speak(currentQuestion), 180);
}

function checkAnswer(button, choice) {
  if (answered) {
    return;
  }

  answered = true;

  if (choice.word === currentQuestion.word) {
    score += 1;
    button.classList.add("correct");
    feedback.textContent = "Good job!";
    setTimeout(nextQuestion, 850);
  } else {
    recordMistake(currentQuestion.word);
    button.classList.add("wrong");
    showCorrectAnswer();
    feedback.textContent = "Try again!";
    setTimeout(nextQuestion, 1200);
  }
}

function showCorrectAnswer() {
  [...optionsArea.children].forEach((optionButton) => {
    if (optionButton.dataset.word === currentQuestion.word) {
      optionButton.classList.add("correct");
    }
  });
}

function nextQuestion() {
  currentIndex += 1;

  if (currentIndex >= quizWords.length) {
    finishQuiz();
  } else {
    showQuestion();
  }
}

function finishQuiz() {
  updateProgress(quizWords.length, score);
  scoreText.textContent = `Score: ${score} / ${quizWords.length}`;
  showScreen(resultScreen);
}

function showMistakes() {
  const progress = getProgress();
  const entries = Object.entries(progress.mistakes)
    .map(([word, count]) => ({ item: vocabulary.find((entry) => entry.word === word), count }))
    .filter((entry) => entry.item)
    .sort((a, b) => b.count - a.count);
  const list = document.querySelector("#mistakesList");
  const note = document.querySelector("#mistakesNote");
  list.innerHTML = "";
  note.textContent = entries.length ? `共有 ${entries.length} 个需要再练习的单词。` : "太棒了，错题集现在是空的！";
  entries.forEach(({ item, count }) => {
    const card = document.createElement("div");
    card.className = "word-card";
    card.innerHTML = `<span class="word-picture">${item.picture}</span><span class="word-text"><strong>${item.word}</strong><span>${item.chinese}</span></span><span class="mistake-count">错 ${count} 次</span>`;
    list.appendChild(card);
  });
  document.querySelector("#practiceMistakesButton").disabled = entries.length === 0;
  document.querySelector("#clearMistakesButton").disabled = entries.length === 0;
  showScreen(mistakesScreen);
}

function buildCategoryButtons() {
  const categories = [...new Set(vocabulary.map((item) => item.category))];
  categoryButtons.innerHTML = "";

  categories.forEach((category) => {
    const count = vocabulary.filter((item) => item.category === category).length;
    const button = document.createElement("button");
    button.className = "category-button";
    button.textContent = `${category} (${count})`;
    button.addEventListener("click", () => showCategorySummary(category));
    categoryButtons.appendChild(button);
  });
}

function showCategorySummary(category) {
  const words = vocabulary.filter((item) => item.category === category);
  summaryTitle.textContent = `${category} (${words.length})`;
  summaryList.innerHTML = "";

  words.forEach((item) => {
    const card = document.createElement("div");
    card.className = "word-card";
    card.innerHTML = `
      <span class="word-picture">${item.picture}</span>
      <span class="word-text">
        <strong>${item.word}</strong>
        <span>${item.chinese}</span>
      </span>
      <button class="tiny-listen" data-speak="${item.phoneticHint || item.word}" type="button" aria-label="Listen to ${item.word}">🔊</button>
    `;
    summaryList.appendChild(card);
  });

  showScreen(categorySummaryScreen);
}

function showRandomCommand() {
  const command = parentCommands[Math.floor(Math.random() * parentCommands.length)];
  commandText.textContent = command;
}

function buildLessonCards() {
  const progress = getProgress();
  lessonCards.innerHTML = "";

  storyLessons.forEach((lesson) => {
    const completed = progress.lessons[lesson.id]?.completed;
    const button = document.createElement("button");
    button.className = "lesson-card";
    button.type = "button";
    button.dataset.lessonId = lesson.id;
    button.innerHTML = `
      <span class="lesson-card-art">${lesson.icon}</span>
      <span class="lesson-card-copy">
        <span class="lesson-number">LESSON ${String(lesson.number).padStart(2, "0")}</span>
        <h3>${lesson.title}</h3>
        <p>${lesson.chinese} · ${lesson.summary}</p>
        <span class="lesson-status">${completed ? "✓ 已完成 · 再学一次" : "▶ 开始课程"}</span>
      </span>
    `;
    button.addEventListener("click", () => startStoryLesson(lesson.id));
    lessonCards.appendChild(button);
  });
}

function showLessonList() {
  buildLessonCards();
  showScreen(lessonListScreen);
}

function startStoryLesson(lessonId) {
  activeLesson = storyLessons.find((lesson) => lesson.id === lessonId);
  if (!activeLesson) return;
  lessonStage = "story";
  lessonItemIndex = 0;
  lessonCorrect = 0;
  lessonAnswered = false;
  lessonTitle.textContent = `${activeLesson.title} · ${activeLesson.chinese}`;
  showScreen(lessonScreen);
  renderLessonStage();
}

function renderLessonStage() {
  lessonOptions.innerHTML = "";
  lessonFeedback.textContent = "";
  lessonAnswered = false;
  dialoguePanel.hidden = false;
  lessonListenButton.hidden = false;
  lessonNextButton.hidden = false;

  if (lessonStage === "story" && usesLessonVideo()) renderLessonVideo();
  if (lessonStage === "story" && !usesLessonVideo()) renderStoryLine();
  if (lessonStage === "words") renderLessonWord();
  if (lessonStage === "questions") renderLessonQuestion();
  if (lessonStage === "roleplay") renderRoleplay();
  if (lessonStage === "complete") renderLessonComplete();
}

function usesLessonVideo() {
  return Boolean(getLessonVideo());
}

function getLessonVideo() {
  if (lessonStage !== "story" || !activeLesson) return null;
  return lessonVideos[activeLesson.id] || null;
}

function playLessonVideo() {
  const video = lessonScene.querySelector("video");
  if (!video) return;
  video.currentTime = 0;
  video.play().catch(() => {});
}

function renderLessonVideo() {
  const lessonVideo = getLessonVideo();
  if (!lessonVideo) return;
  lessonStageLabel.textContent = "Watch & Listen · 看情景听对话";
  lessonStepInfo.textContent = "Video 1 / 1";
  dialoguePanel.hidden = true;
  lessonListenButton.textContent = "🔊 Replay video";
  lessonNextButton.textContent = "Start key words →";
  lessonScene.className = "lesson-scene lesson-video-scene";
  lessonScene.innerHTML = `
    <video class="lesson-video" controls playsinline preload="metadata" aria-label="${lessonVideo.label} story video">
      <source src="${lessonVideo.src}" type="video/mp4">
      Your browser cannot play this video.
    </video>`;
  const video = lessonScene.querySelector("video");
  video.addEventListener("ended", () => {
    if (!usesLessonVideo()) return;
    lessonStage = "words";
    lessonItemIndex = 0;
    renderLessonStage();
  });
  video.play().catch(() => {});
}

function renderLessonWord() {
  const item = activeLesson.oralPractice[lessonItemIndex];
  lessonStageLabel.textContent = "Key Words & Speak · 重点词开口说";
  lessonStepInfo.textContent = `Words ${lessonItemIndex + 1} / ${activeLesson.oralPractice.length}`;
  speakerAvatar.textContent = item.picture;
  speakerName.textContent = `${item.word} · ${item.chinese}`;
  dialogueText.textContent = item.model;
  dialogueChinese.textContent = "先听一遍，再大声跟读。";
  dialogueChinese.classList.remove("hidden");
  lessonOptions.innerHTML = `<div class="oral-word-card"><span>${item.picture}</span><strong>${item.word}</strong><small>${item.chinese}</small></div>`;
  lessonNextButton.textContent = lessonItemIndex === activeLesson.oralPractice.length - 1 ? "Try listening →" : "I said it! →";
  renderScene({ speaker: "Bella", prop: item.picture });
  setTimeout(() => speak(item.model), 220);
}

function renderStoryLine() {
  const line = activeLesson.dialogue[lessonItemIndex];
  lessonStageLabel.textContent = "Watch & Listen · 看情景听对话";
  lessonStepInfo.textContent = `Story ${lessonItemIndex + 1} / ${activeLesson.dialogue.length}`;
  speakerAvatar.textContent = line.avatar;
  speakerName.textContent = line.speaker;
  dialogueText.textContent = line.text;
  dialogueChinese.textContent = line.chinese;
  dialogueChinese.classList.remove("hidden");
  lessonNextButton.textContent = lessonItemIndex === activeLesson.dialogue.length - 1 ? "Try listening →" : "Next →";
  renderScene(line);
  setTimeout(() => speak(line.text), 220);
}

function renderScene(line) {
  const activeClass = line.speaker === "Bella" ? "bella" : "mom";
  const template = sceneTemplates[activeLesson.scene] || sceneTemplates.home;
  const adultAvatar = line.speaker === "Teacher"
    ? "👩‍🏫"
    : line.speaker === "Doctor" ? "🧑‍⚕️" : line.speaker === "Friend" ? "🧒" : "👩";

  lessonScene.className = "lesson-scene " + template.className;
  lessonScene.innerHTML =
    '<span class="scene-place">' + template.place + '</span>' +
    '<span class="scene-object main">' + template.object + '</span>' +
    '<span class="scene-object accent">' + (line.prop || template.accent || "") + '</span>' +
    '<span class="scene-person bella ' + (activeClass === "bella" ? "active" : "") + '">👧</span>' +
    '<span class="scene-person mom ' + (activeClass === "mom" ? "active" : "") + '">' + adultAvatar + '</span>';
}


function renderLessonQuestion() {
  const question = activeLesson.questions[lessonItemIndex];
  lessonStageLabel.textContent = "Listen & Choose · 听懂后选择";
  lessonStepInfo.textContent = `Listen ${lessonItemIndex + 1} / ${activeLesson.questions.length}`;
  speakerAvatar.textContent = "👂";
  speakerName.textContent = "Listen carefully";
  dialogueText.textContent = question.prompt;
  dialogueChinese.textContent = question.chinese;
  dialogueChinese.classList.remove("hidden");
  lessonNextButton.hidden = true;
  renderScene({ speaker: "Bella", prop: "👂" });

  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "lesson-option";
    button.textContent = option;
    button.addEventListener("click", () => answerLessonQuestion(button, index));
    lessonOptions.appendChild(button);
  });
  setTimeout(() => speak(question.prompt), 220);
}

function answerLessonQuestion(button, selectedIndex) {
  if (lessonAnswered) return;
  lessonAnswered = true;
  const question = activeLesson.questions[lessonItemIndex];
  const buttons = [...lessonOptions.children];
  buttons[question.answer].classList.add("correct");
  if (selectedIndex === question.answer) {
    lessonCorrect += 1;
    lessonFeedback.textContent = "Good listening! 🌟";
  } else {
    button.classList.add("wrong");
    lessonFeedback.textContent = "Listen again — you found it!";
    speak(question.prompt);
  }
  setTimeout(() => {
    lessonItemIndex += 1;
    if (lessonItemIndex >= activeLesson.questions.length) {
      lessonStage = "roleplay";
      lessonItemIndex = 0;
    }
    renderLessonStage();
  }, selectedIndex === question.answer ? 900 : 1500);
}

function renderRoleplay() {
  const turn = activeLesson.roleplay[lessonItemIndex];
  lessonStageLabel.textContent = "Your Turn · 轮到你说";
  lessonStepInfo.textContent = `Speak ${lessonItemIndex + 1} / ${activeLesson.roleplay.length}`;
  speakerAvatar.textContent = "👩";
  speakerName.textContent = "Mom asks";
  dialogueText.textContent = turn.prompt;
  dialogueChinese.textContent = turn.chinese;
  dialogueChinese.classList.remove("hidden");
  lessonOptions.innerHTML = `<div class="dialogue-panel"><div class="speaker-avatar">👧</div><div class="dialogue-copy"><strong>Bella can say</strong><p class="roleplay-hint">${turn.hint}</p><p class="dialogue-chinese">先听妈妈说，再大声回答。</p></div></div>`;
  lessonNextButton.textContent = "I said it! ✓";
  renderScene({ speaker: "Mom", prop: "💬" });
  setTimeout(() => speak(turn.prompt), 220);
}

function renderLessonComplete() {
  const progress = getProgress();
  const previousBest = progress.lessons[activeLesson.id]?.bestScore || 0;
  progress.lessons[activeLesson.id] = {
    completed: true,
    bestScore: Math.max(previousBest, lessonCorrect)
  };
  saveProgress(progress);
  lessonStageLabel.textContent = "Lesson Complete · 完成课程";
  lessonStepInfo.textContent = `${lessonCorrect} / ${activeLesson.questions.length}`;
  lessonScene.className = `lesson-scene scene-${activeLesson.scene}`;
  lessonScene.innerHTML = `<div class="lesson-finish-card"><span class="lesson-finish-icon">🏆</span><h3>Great job, Bella!</h3><p>You listened and spoke English.</p></div>`;
  speakerAvatar.textContent = "🏠";
  speakerName.textContent = "Try it in real life";
  dialogueText.textContent = activeLesson.mission;
  dialogueChinese.textContent = "和家长在真实生活里再完成一次。";
  dialogueChinese.classList.remove("hidden");
  lessonListenButton.hidden = true;
  lessonNextButton.textContent = "Back to Lessons";
  lessonOptions.innerHTML = "";
}

function advanceLesson() {
  if (!activeLesson) return;
  if (lessonStage === "story") {
    if (usesLessonVideo()) {
      lessonStage = "words";
      lessonItemIndex = 0;
    } else {
      lessonItemIndex += 1;
      if (lessonItemIndex >= activeLesson.dialogue.length) {
        lessonStage = "words";
        lessonItemIndex = 0;
      }
    }
  } else if (lessonStage === "words") {
    lessonItemIndex += 1;
    if (lessonItemIndex >= activeLesson.oralPractice.length) {
      lessonStage = "questions";
      lessonItemIndex = 0;
    }
  } else if (lessonStage === "roleplay") {
    lessonItemIndex += 1;
    if (lessonItemIndex >= activeLesson.roleplay.length) {
      lessonStage = "complete";
      lessonItemIndex = 0;
    }
  } else if (lessonStage === "complete") {
    showLessonList();
    return;
  }
  renderLessonStage();
}

function showProgress() {
  const progress = getProgress();
  const accuracy = progress.totalQuestions === 0
    ? 0
    : Math.round((progress.totalCorrect / progress.totalQuestions) * 100);

  document.querySelector("#totalSessions").textContent = progress.totalSessions;
  document.querySelector("#totalQuestions").textContent = progress.totalQuestions;
  document.querySelector("#totalCorrect").textContent = progress.totalCorrect;
  document.querySelector("#accuracyRate").textContent = `${accuracy}%`;
  document.querySelector("#completedLessons").textContent = `${Object.values(progress.lessons).filter((lesson) => lesson.completed).length} / ${storyLessons.length}`;
  appVersionLabel.textContent = appVersion;
  showScreen(progressScreen);
}

function recordMistake(word) {
  const progress = getProgress();
  progress.mistakes[word] = (progress.mistakes[word] || 0) + 1;
  saveProgress(progress);
}

document.addEventListener("click", (event) => {
  const action = event.target.closest("[data-action]")?.dataset.action;
  const speakText = event.target.closest("[data-speak]")?.dataset.speak;

  if (speakText) {
    speak(speakText);
  }

  if (action === "home") {
    showScreen(homeScreen);
  }

  if (action === "lessons") {
    showLessonList();
  }

  if (action === "tests") {
    showScreen(testScreen);
  }

  if (action === "mixed") {
    startQuiz(vocabulary, "Mixed Review", "text");
  }

  if (action === "picture") {
    startQuiz(vocabulary, "Picture Review", "picture");
  }

  if (action === "listen-picture") {
    startQuiz(vocabulary, "Listen & Choose Picture", "listen-picture");
  }

  if (action === "chinese-english") {
    startQuiz(vocabulary, "Chinese to English", "chinese-english");
  }

  if (action === "category") {
    showScreen(categoryScreen);
  }

  if (action === "command") {
    showRandomCommand();
    showScreen(commandScreen);
  }

  if (action === "progress") {
    showProgress();
  }

  if (action === "mistakes") showMistakes();
});

document.querySelector("#practiceMistakesButton").addEventListener("click", () => {
  const progress = getProgress();
  const words = vocabulary.filter((item) => progress.mistakes[item.word]);
  if (words.length) startQuiz(words, "Mistake Practice", "chinese-english");
});

document.querySelector("#clearMistakesButton").addEventListener("click", () => {
  if (!window.confirm("确定要清空全部错题吗？")) return;
  const progress = getProgress();
  progress.mistakes = {};
  saveProgress(progress);
  showMistakes();
});

document.querySelector("#listenButton").addEventListener("click", () => {
  if (currentQuestion) {
    speak(currentQuestion);
  }
});

document.querySelector("#commandListenButton").addEventListener("click", () => {
  speak(commandText.textContent);
});

document.querySelector("#nextCommandButton").addEventListener("click", showRandomCommand);
lessonListenButton.addEventListener("click", () => {
  if (!activeLesson) return;
  if (usesLessonVideo()) {
    playLessonVideo();
    return;
  }
  if (lessonStage === "story") speak(activeLesson.dialogue[lessonItemIndex].text);
  if (lessonStage === "words") speak(activeLesson.oralPractice[lessonItemIndex].model);
  if (lessonStage === "questions") speak(activeLesson.questions[lessonItemIndex].prompt);
  if (lessonStage === "roleplay") speak(activeLesson.roleplay[lessonItemIndex].prompt);
});
lessonNextButton.addEventListener("click", advanceLesson);

validateDataIntegrity();
validateLessonVocabularyCoverage();
getProgress();
buildCategoryButtons();
buildLessonCards();
loadEnglishVoices();
if ("speechSynthesis" in window) {
  window.speechSynthesis.onvoiceschanged = loadEnglishVoices;
}

const sharedLessonId = new URLSearchParams(window.location.search).get("lesson");
if (sharedLessonId && storyLessons.some((lesson) => lesson.id === sharedLessonId)) {
  startStoryLesson(sharedLessonId);
}
