"use strict";

const appVersion = "2026.07.11.2";
const progressStorageSchemaVersion = 3;

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
let quizWords = [];
let quizMode = "text";
let currentQuestion = null;
let currentIndex = 0;
let score = 0;
let answered = false;
let englishVoices = [];
let selectedVoice = null;

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
    mistakes: {}
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
    mistakes: normalizeMistakes(savedProgress?.mistakes)
  };
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

function showProgress() {
  const progress = getProgress();
  const accuracy = progress.totalQuestions === 0
    ? 0
    : Math.round((progress.totalCorrect / progress.totalQuestions) * 100);

  document.querySelector("#totalSessions").textContent = progress.totalSessions;
  document.querySelector("#totalQuestions").textContent = progress.totalQuestions;
  document.querySelector("#totalCorrect").textContent = progress.totalCorrect;
  document.querySelector("#accuracyRate").textContent = `${accuracy}%`;
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

validateDataIntegrity();
getProgress();
buildCategoryButtons();
loadEnglishVoices();
if ("speechSynthesis" in window) {
  window.speechSynthesis.onvoiceschanged = loadEnglishVoices;
}
