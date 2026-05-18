"use strict";

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
    ["listen", "听", "👂"]
  ]),
  ...makeWords("Colors", [
    ["red", "红色", "🔴"],
    ["blue", "蓝色", "🔵"],
    ["yellow", "黄色", "🟡"],
    ["white", "白色", "⚪"],
    ["orange", "橙色", "🟠"],
    ["green", "绿色", "🟢"],
    ["black", "黑色", "⚫"]
  ]),
  ...makeWords("Home Objects", [
    ["table", "桌子", "🍽️"],
    ["chair", "椅子", "🪑"],
    ["bed", "床", "🛏️"],
    ["window", "窗户", "🪟"],
    ["door", "门", "🚪"],
    ["bag", "包", "🎒"],
    ["book", "书", "📘"],
    ["toy", "玩具", "🧸"]
  ]),
  ...makeWords("Outdoor", [
    ["car", "汽车", "🚗"],
    ["bike", "自行车", "🚲"],
    ["street", "街道", "🛣️"],
    ["tree", "树", "🌳"],
    ["building", "建筑物", "🏢"],
    ["grass", "草地", "🌱"]
  ]),
  ...makeWords("Feelings", [
    ["happy", "开心的", "😊"],
    ["sad", "难过的", "😢"],
    ["tired", "累的", "😴"],
    ["angry", "生气的", "😠"]
  ]),
  ...makeWords("Food", [
    ["water", "水", "💧"],
    ["milk", "牛奶", "🥛"],
    ["bread", "面包", "🍞"],
    ["apple", "苹果", "🍎"],
    ["banana", "香蕉", "🍌"],
    ["noodles", "面条", "🍜"],
    ["fruit", "水果", "🍇"],
    ["rice", "米饭", "🍚"]
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
    ["lion", "狮子", "🦁"]
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
    ["your", "你的", "🫵"]
  ]),
  ...makeWords("Family", [
    ["mother", "妈妈", "👩"],
    ["father", "爸爸", "👨"],
    ["sister", "姐妹；姐姐；妹妹", "👧"],
    ["brother", "兄弟；哥哥；弟弟", "👦"]
  ]),
  ...makeWords("Questions", [
    ["what", "什么", "❓"],
    ["where", "哪里", "📍"],
    ["why", "为什么", "🤔"],
    ["who", "谁", "🧒"],
    ["how many", "多少", "🔢"],
    ["what do you like?", "你喜欢什么？", "💗"],
    ["there is", "有", "✅"],
    ["it is", "它是", "💬"]
  ]),
  ...makeWords("Daily Instructions", [
    ["give", "给", "🤲"],
    ["show", "展示", "🖼️"],
    ["take", "拿", "✋"],
    ["put", "放", "📦"],
    ["open", "打开", "🔓"],
    ["close", "关闭", "🔒"],
    ["eat", "吃", "🍽️"],
    ["drink", "喝", "🥤"],
    ["sleep", "睡觉", "🛌"],
    ["like", "喜欢", "💗"],
    ["can", "能；会", "💪"],
    ["help", "帮助", "🤝"]
  ]),
  ...makeWords("Position Words", [
    ["in", "在里面", "📥"],
    ["on", "在上面", "⬆️"],
    ["under", "在下面", "⬇️"]
  ]),
  ...makeWords("Adjectives", [
    ["delicious", "美味的", "😋"],
    ["beautiful", "漂亮的", "🌸"],
    ["perfect", "完美的", "⭐"],
    ["tall", "高的", "📏"],
    ["short", "矮的；短的", "↕️"],
    ["healthy", "健康的", "💪"]
  ]),
  ...makeWords("People", [
    ["teacher", "老师", "👩‍🏫"]
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
    ["Let’s go", "我们走吧", "🚶"]
  ])
];

const quizQuestionCount = 30;
const voiceSettingsKey = "bellaEnglishReviewVoice";

const parentCommands = [
  "Run!",
  "Stop!",
  "Jump!",
  "Walk slowly!",
  "Turn around!",
  "Sit down!",
  "Stand up!",
  "Touch your nose!",
  "Touch your head!",
  "Show me your hand!",
  "Open the door!",
  "Close the door!",
  "Give me the book!",
  "Put the toy on the table!",
  "Drink water!",
  "Look at me!",
  "Listen to me!",
  "Go to the chair!",
  "Come here, please.",
  "Please sit down.",
  "Please stand up.",
  "Raise your hand.",
  "Clap your hands.",
  "Touch your ears.",
  "Touch your mouth.",
  "Point to the window.",
  "Point to the door.",
  "Show me your book.",
  "Give me a high five.",
  "Can you help me?",
  "What do you like?",
  "Do you like apples?",
  "How many books are there?",
  "Where is your bag?",
  "What color is it?",
  "Are you hungry?",
  "Are you thirsty?",
  "I am happy.",
  "I am tired.",
  "Let's read a book.",
  "Let's drink some water.",
  "Let's wash our hands.",
  "Put on your shoes.",
  "Take off your shoes.",
  "Open your book.",
  "Close your book.",
  "Clean the table.",
  "Pack your bag.",
  "Say thank you.",
  "Say sorry.",
  "Good morning, Mom.",
  "Good night, Dad.",
  "Have some rice.",
  "Eat some fruit.",
  "Drink some milk.",
  "Walk slowly, please."
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
const voiceSelect = document.querySelector("#voiceSelect");
const voiceTestButton = document.querySelector("#voiceTestButton");

let quizWords = [];
let quizMode = "text";
let currentQuestion = null;
let currentIndex = 0;
let score = 0;
let answered = false;
let englishVoices = [];
let selectedVoice = null;

function makeWords(category, rows) {
  return rows.map(([word, chinese, picture, speechText]) => ({
    category,
    word,
    chinese,
    picture,
    speechText: speechText || cleanSpeechText(word)
  }));
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
  const utterance = new SpeechSynthesisUtterance(cleanSpeechText(text));
  const voice = selectedVoice || chooseBestVoice();
  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang;
  } else {
    utterance.lang = "en-US";
  }
  utterance.rate = 0.72;
  utterance.pitch = 1;
  utterance.volume = 1;
  window.speechSynthesis.speak(utterance);
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

  if (lang === "en-us") score += 110;
  else if (lang === "en-gb") score += 100;
  else if (lang.startsWith("en-au") || lang.startsWith("en-ca")) score += 86;
  else if (lang.startsWith("en")) score += 70;

  if (name.includes("natural") || name.includes("neural") || name.includes("online")) score += 38;
  if (name.includes("microsoft jenny")) score += 36;
  if (name.includes("microsoft aria")) score += 35;
  if (name.includes("microsoft guy")) score += 30;
  if (name.includes("google us english")) score += 30;
  if (name.includes("google uk english")) score += 28;
  if (name.includes("samantha")) score += 24;
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
    voiceSelect.innerHTML = "<option>Speech not supported</option>";
    voiceSelect.disabled = true;
    voiceTestButton.disabled = true;
    return;
  }

  const savedVoiceName = localStorage.getItem(voiceSettingsKey);
  englishVoices = window.speechSynthesis
    .getVoices()
    .filter((voice) => voice.lang.toLowerCase().startsWith("en"))
    .sort((a, b) => voiceScore(b) - voiceScore(a));

  voiceSelect.innerHTML = "";

  if (englishVoices.length === 0) {
    const option = document.createElement("option");
    option.textContent = "Default English Voice";
    option.value = "";
    voiceSelect.appendChild(option);
    selectedVoice = null;
    return;
  }

  englishVoices.forEach((voice, index) => {
    const option = document.createElement("option");
    option.value = voice.name;
    option.textContent = `${voice.name} (${voice.lang})${index === 0 ? " ★" : ""}`;
    voiceSelect.appendChild(option);
  });

  selectedVoice = englishVoices.find((voice) => voice.name === savedVoiceName) || chooseBestVoice();
  voiceSelect.value = selectedVoice?.name || "";
}

function setSelectedVoice(name) {
  selectedVoice = englishVoices.find((voice) => voice.name === name) || chooseBestVoice();
  if (selectedVoice) {
    localStorage.setItem(voiceSettingsKey, selectedVoice.name);
  }
}

function getProgress() {
  const saved = localStorage.getItem(progressKey);
  return saved ? JSON.parse(saved) : {
    totalSessions: 0,
    totalQuestions: 0,
    totalCorrect: 0
  };
}

function saveProgress(progress) {
  localStorage.setItem(progressKey, JSON.stringify(progress));
}

function updateProgress(questionCount, correctCount) {
  const progress = getProgress();
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
  categoryLabel.textContent = mode === "picture" ? "Picture Review" : label;
  showScreen(quizScreen);
  showQuestion();
}

function showQuestion() {
  answered = false;
  feedback.textContent = "";
  currentQuestion = quizWords[currentIndex];
  questionWord.textContent = currentQuestion.word;
  roundInfo.textContent = `${currentIndex + 1} / ${quizWords.length}`;
  optionsArea.innerHTML = "";

  const wrongChoices = shuffle(vocabulary.filter((item) => item.word !== currentQuestion.word)).slice(0, 3);
  const choices = shuffle([currentQuestion, ...wrongChoices]);

  choices.forEach((choice) => {
    const button = document.createElement("button");
    button.className = quizMode === "picture" ? "option-button picture-button" : "option-button";

    if (quizMode === "picture") {
      button.innerHTML = `
        <span class="picture-symbol">${choice.picture}</span>
        <span class="picture-label">${choice.chinese}</span>
      `;
      button.setAttribute("aria-label", `${choice.chinese} ${choice.picture}`);
    } else {
      button.textContent = choice.chinese;
    }

    button.addEventListener("click", () => checkAnswer(button, choice));
    optionsArea.appendChild(button);
  });
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
    button.classList.add("wrong");
    feedback.textContent = "Try again!";
    setTimeout(nextQuestion, 850);
  }
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
      <button class="tiny-listen" data-speak="${item.word}" type="button" aria-label="Listen to ${item.word}">🔊</button>
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
  showScreen(progressScreen);
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
});

document.querySelector("#listenButton").addEventListener("click", () => {
  if (currentQuestion) {
    speak(currentQuestion.speechText);
  }
});

document.querySelector("#commandListenButton").addEventListener("click", () => {
  speak(commandText.textContent);
});

document.querySelector("#nextCommandButton").addEventListener("click", showRandomCommand);
voiceSelect.addEventListener("change", () => {
  setSelectedVoice(voiceSelect.value);
  speak("Hello Bella. Let's practice English.");
});
voiceTestButton.addEventListener("click", () => {
  speak("Hello Bella. This English voice is clear and slow.");
});

buildCategoryButtons();
loadEnglishVoices();
if ("speechSynthesis" in window) {
  window.speechSynthesis.onvoiceschanged = loadEnglishVoices;
}
