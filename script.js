const human = document.getElementById("human");
const world = document.getElementById("world");

let x = 180;
let y = 180;

// ランダムに歩く
setInterval(() => {
  x += Math.floor(Math.random() * 21) - 10;
  y += Math.floor(Math.random() * 21) - 10;

  // 壁に当たらないように
  x = Math.max(0, Math.min(360, x));
  y = Math.max(0, Math.min(360, y));

  human.style.left = x + "px";
  human.style.top = y + "px";
}, 500);

// マウスに反応
world.addEventListener("mousemove", (e) => {
  const rect = world.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  const dx = x - mouseX;
  const dy = y - mouseY;
  const dist = Math.sqrt(dx * dx + dy * dy);

  // 近づいたら逃げる
  if (dist < 80) {
    x += dx / dist * 20;
    y += dy / dist * 20;
  }

  x = Math.max(0, Math.min(360, x));
  y = Math.max(0, Math.min(360, y));

  human.style.left = x + "px";
  human.style.top = y + "px";
});
