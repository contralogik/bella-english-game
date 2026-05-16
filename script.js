"use strict";

// Vocabulary is kept in plain JavaScript so the game works fully offline.
const vocabulary = [
  ...makeWords("Actions", ["come", "go", "run", "turn around", "stop", "quick", "fast", "slow", "sit", "stand", "jump", "walk", "look", "listen"], ["来", "去", "跑", "转身", "停止", "快的", "快", "慢", "坐下", "站立", "跳", "走路", "看", "听"]),
  ...makeWords("Colors", ["red", "blue", "yellow", "white", "orange", "green", "black"], ["红色", "蓝色", "黄色", "白色", "橙色", "绿色", "黑色"]),
  ...makeWords("Home Objects", ["table", "chair", "bed", "window", "door", "bag", "book", "toy"], ["桌子", "椅子", "床", "窗户", "门", "包", "书", "玩具"]),
  ...makeWords("Outdoor", ["car", "bike", "street", "tree", "building", "grass"], ["汽车", "自行车", "街道", "树", "建筑物", "草地"]),
  ...makeWords("Feelings", ["happy", "sad", "tired", "angry"], ["开心的", "难过的", "累的", "生气的"]),
  ...makeWords("Food", ["water", "milk", "bread", "apple", "banana"], ["水", "牛奶", "面包", "苹果", "香蕉"]),
  ...makeWords("Animals", ["duck", "dog", "cat", "chicken", "pig", "bird", "fish", "rabbit"], ["鸭子", "狗", "猫", "鸡", "猪", "鸟", "鱼", "兔子"]),
  ...makeWords("Temperature", ["hot", "cold"], ["热的", "冷的"]),
  ...makeWords("Body Parts", ["hand", "foot", "nose", "mouth", "head", "face", "eye", "ear"], ["手", "脚", "鼻子", "嘴巴", "头", "脸", "眼睛", "耳朵"]),
  ...makeWords("Pronouns", ["I", "you", "he", "she", "my", "your"], ["我", "你", "他", "她", "我的", "你的"]),
  ...makeWords("Questions", ["what", "where", "why", "there is", "it is"], ["什么", "哪里", "为什么", "有", "它是"]),
  ...makeWords("Daily Instructions", ["give", "show", "take", "put", "open", "close", "eat", "drink", "sleep", "like"], ["给", "展示", "拿", "放", "打开", "关闭", "吃", "喝", "睡觉", "喜欢"]),
  ...makeWords("Position Words", ["in", "on", "under"], ["在里面", "在上面", "在下面"]),
  ...makeWords("Adjectives", ["delicious", "beautiful", "perfect"], ["美味的", "漂亮的", "完美的"]),
  ...makeWords("Daily Phrases", ["Good morning", "Good night", "Thank you", "You’re welcome", "Excuse me", "Sorry", "I’m hungry", "I’m thirsty", "I want this", "Let’s go"], ["早上好", "晚安", "谢谢", "不客气", "打扰一下", "对不起", "我饿了", "我渴了", "我想要这个", "我们走吧"])
];

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
  "Go to the chair!"
];

const progressKey = "bellaEnglishReviewProgress";
const screens = document.querySelectorAll(".screen");
const homeScreen = document.querySelector("#homeScreen");
const quizScreen = document.querySelector("#quizScreen");
const categoryScreen = document.querySelector("#categoryScreen");
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
const commandText = document.querySelector("#commandText");

let quizWords = [];
let currentQuestion = null;
let currentIndex = 0;
let score = 0;
let answered = false;

function makeWords(category, words, chineseList) {
  return words.map((word, index) => ({
    category,
    word,
    chinese: chineseList[index]
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
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.8;
  window.speechSynthesis.speak(utterance);
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

function startQuiz(words, label) {
  quizWords = shuffle(words).slice(0, 10);
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
  questionWord.textContent = currentQuestion.word;
  roundInfo.textContent = `${currentIndex + 1} / ${quizWords.length}`;

  const wrongChoices = shuffle(vocabulary.filter((item) => item.chinese !== currentQuestion.chinese)).slice(0, 3);
  const choices = shuffle([currentQuestion, ...wrongChoices]);

  optionsArea.innerHTML = "";
  choices.forEach((choice) => {
    const button = document.createElement("button");
    button.className = "option-button";
    button.textContent = choice.chinese;
    button.addEventListener("click", () => checkAnswer(button, choice));
    optionsArea.appendChild(button);
  });
}

function checkAnswer(button, choice) {
  if (answered) {
    return;
  }

  if (choice.chinese === currentQuestion.chinese) {
    answered = true;
    score += 1;
    button.classList.add("correct");
    feedback.textContent = "Good job!";
    setTimeout(nextQuestion, 850);
  } else {
    button.classList.add("wrong");
    feedback.textContent = "Try again!";
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
    const button = document.createElement("button");
    button.className = "category-button";
    button.textContent = category;
    button.addEventListener("click", () => {
      startQuiz(vocabulary.filter((item) => item.category === category), category);
    });
    categoryButtons.appendChild(button);
  });
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
  const action = event.target.dataset.action;

  if (action === "home") {
    showScreen(homeScreen);
  }

  if (action === "mixed") {
    startQuiz(vocabulary, "Mixed Review");
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
    speak(currentQuestion.word);
  }
});

document.querySelector("#commandListenButton").addEventListener("click", () => {
  speak(commandText.textContent);
});

document.querySelector("#nextCommandButton").addEventListener("click", showRandomCommand);

buildCategoryButtons();
