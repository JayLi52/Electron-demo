# Electron 初探 
> [Electron官方文档](https://electronjs.org/)  
> 参考掘金-[Electron构建跨平台应用Mac/Windows/Linux](https://juejin.im/post/5c46ab47e51d45522b4f55b1)  
> 上面文章可以作为入门的一个选择，打8分吧（10分满分），有点不足：章节衔接不够流畅，看着有点迷糊，但是检验学习成果的方式就是重新输出知识  
> 以下总结有不足之处，欢迎斧正

## Electron 介绍
- Web 技术
>> Electron 基于 Chromium 和 Node.js, 让你可以使用 HTML, CSS 和 JavaScript 构建应用。
- 开源
>> Electron 是一个由 GitHub 及众多贡献者组成的活跃社区共同维护的开源项目。
- 跨平台
>> Electron 兼容 Mac、Windows 和 Linux，可以构建出三个平台的应用程序。

## Electron 的主进程和渲染进程
- Electron 运行 package.json 的 main 脚本的进程被称为主进程。
- 在主进程中运行的脚本通过创建 web 页面来展示用户界面。 一个 Electron 应用总是有且只有一个主进程。
- 由于 Electron 使用了 Chromium(谷歌浏览器)来展示 web 页面，所以 Chromium 的 多进程架构也被使用到。 每个 Electron 中的 web 页面运行在它自己的渲染进程中。
- 主进程使用 BrowserWindow 实例创建页面。每个 BrowserWindow 实例都在自己的渲 染进程里运行页面。 当一个 BrowserWindow实例被销毁后，相应的渲染进程也会被终止

