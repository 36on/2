const chat = document.getElementById("chat");
const N = 2; // 覚える文字数
let model = {};

function add(text, cls) {
  const div = document.createElement("div");
  div.textContent = text;
  div.className = cls;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

// 学習（会話のたびに呼ばれる）
function learn(text) {
  for (let i = 0; i < text.length - N; i++) {
    const key = text.slice(i, i + N);
    const next = text[i + N];
    if (!model[key]) model[key] = [];
    model[key].push(next);
  }
}

// 文章生成
function generate() {
  const keys = Object.keys(model);
  if (keys.length === 0) return "まだ何も知らないよ";

  let key = keys[Math.floor(Math.random() * keys.length)];
  let result = key;

  for (let i = 0; i < 50; i++) {
    const nexts = model[key];
    if (!nexts) break;
    const next = nexts[Math.floor(Math.random() * nexts.length)];
    result += next;
    key = result.slice(result.length - N);
  }
  return result;
}

function send() {
  const input = document.getElementById("input");
  const text = input.value.trim();
  if (!text) return;

  add("あなた: " + text, "user");

  // 👇 会話から学習
  learn(text);

  const reply = generate();
  add("AI: " + reply, "ai");

  input.value = "";
}
