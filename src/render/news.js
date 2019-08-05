// 打开新窗口属性用法有点类似vscode打开新的窗口

const btn = document.querySelector("#btn");
const path = require("path");
const electron = require("electron");

const {
  remote: { BrowserWindow },
  ipcRenderer,
  shell
} = electron;
btn.onclick = () => {
  let win = new BrowserWindow({
    width: 300,
    height: 200,
    frame: true // false隐藏关闭按钮、菜单选项 true显示
    // fullscreen: true, // 全屏展示
    // transparent: true
  });

  win.loadURL(path.join("file:", __dirname, "index.html"));

  win.on("close", () => {
    win = null;
    console.log("关闭了");
  });

  // ipcRenderer.send('sendFeedback', {name:'poetries', age: 23})
  ipcRenderer.send("openwindow", { name: "poetries", age: 23 });
  ipcRenderer.on("toNews", (e, userInfo) => {
    console.log(userInfo);
  });
  shell.openExternal("https://www.baidu.com");

  console.log(Object.keys(electron));
};
