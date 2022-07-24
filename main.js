function waitForElm(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }
    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

function extract() {
  if (document.getElementById("images").className == "full") {
    let el = document.getElementById("images");
    el.parentNode.removeChild(el);
  }
  let y = document.getElementById("images").childNodes;
  let b = [];
  let title = null;
  for (let i of document.getElementsByClassName(
    "MuiToolbar-root MuiToolbar-regular MuiToolbar-gutters"
  )[0].childNodes) {
    if (
      i.innerText &&
      !i.innerText.match(/[0-9]+\:[0-9]+\:[0-9]*/g) &&
      i.className != "MuiTypography-root MuiTypography-body1" &&
      i.id != "dbutton"
    ) {
      title = i.innerText.replace(/[/\\?%*:|"<>]/g, "");
    }
  }
  for (i of y) b.push(`https://unsee.cc/image?id=${i.children[0].id}&size=big`);
  chrome.runtime.sendMessage({
    urls: b,
    title: title,
  });
}

waitForElm(".MuiToolbar-regular").then((elm) => {
  cssObj = {
    fontWeight: "600",
    backgroundColor: "#000000",
    color: "white",
    border: "1px solid white",
  };
  let xyz = document.getElementsByClassName(
    "MuiToolbar-root MuiToolbar-regular MuiToolbar-gutters"
  )[0];
  let button = document.createElement("a"),
    buttonStyle = button.style;
  button.innerHTML = "Download images";
  button.id = "dbutton";
  button.onclick = extract;
  button.href = "#";
  xyz.appendChild(button);
  Object.keys(cssObj).forEach((key) => (buttonStyle[key] = cssObj[key]));
});
