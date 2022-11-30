// https://www.youtube.com/watch?v=EomWt4Dc5xg
document.documentElement.classList.add("js");

addEventListener("input", (e) => {
  let _t = e.target;

  _t.parentNode.style.setProperty("--val", +_t.value);
});
