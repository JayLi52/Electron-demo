// 主进程代码
const electron = require("electron");

const { app, BrowserWindow, Menu, ipcMain } = electron;

// 指向窗口对象的一个全局引用，如果没有这个引用，那么当该 javascript 对象被垃圾回收 的
// 时候该窗口将会自动关闭
let win;

function createWindow() {
  // 创建一个新的浏览器窗口
  win = new BrowserWindow({
    width: 1104,
    height: 620,
    webPreferences: {
      nodeIntegration: true
    }
  }); // 570+50

  // 并且装载应用的 index.html 页面
  win.loadURL(`file://${__dirname}/render/news.html`);

  // 打开开发工具页面
  win.webContents.openDevTools();

  // 设置菜单
  const menu = [
    {
      label: "文件",
      submenu: [
        {
          label: "新建文件",
          accelerator: "ctrl+n", // 绑定快捷键
          click() {
            // 绑定事件
            console.log("新建文件");
          }
        },
        {
          label: "新建窗口",
          click() {
            console.log("新建窗口");
          }
        }
      ]
    },
    {
      label: "编辑",
      submenu: [
        {
          label: "复制",
          role: "copy" // 调用内置角色实现对应功能
        },
        {
          label: "剪切",
          role: "cut" // 调用内置角色实现对应功能
        }
      ]
    },
    {
      label: "视图",
      submenu: [
        {
          label: "浏览"
        },
        {
          label: "搜索"
        }
      ]
    }
  ];

  let m = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(m);

  // 当窗口关闭时调用的方法
  win.on("closed", () => {
    // 解除窗口对象的引用，通常而言如果应用支持多个窗口的话，你会在一个数组里 // 存放窗口对象，在窗口关闭的时候应当删除相应的元素。
    win = null;
  });

  ipcMain.on("openwindow", (event, data) => {
    // 主进程给渲染进程广播数据
    // event.sender.send("sendFeedbackToRender", "来自主进程的反馈");
    console.log("data", data);
    // win.webContents.on("did-finish-load", () => [
    win.webContents.send("toNews", {
      userInfo: {
        aa: "test"
      }
    });
    // ]);
  });

  console.log(process.getCPUUsage())
}

// 当 Electron 完成初始化并且已经创建了浏览器窗口，则该方法将会被调用。
// 有些 API 只能在该事件发生后才能被使用
app.on("ready", createWindow);

// 当所有的窗口被关闭后退出应用
app.on("window-all-closed", () => {
  // 对于 OS X 系统，应用和相应的菜单栏会一直激活直到用户通过 Cmd + Q 显式退出
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // 对于 OS X 系统，当 dock 图标被点击后会重新创建一个 app 窗口，并且不会有其他
  // 窗口打开
  if (win === null) {
    createWindow();
  }
});
