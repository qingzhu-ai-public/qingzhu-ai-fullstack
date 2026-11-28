# 青竹 Vue 初级配套工程

安装 Node.js 22.12 或以上受支持的版本。在 VS Code 打开本目录，推荐安装 Vue - Official 扩展。用终端运行以下命令。

```powershell
node --version
npm.cmd ci
npm.cmd run dev
```

在 macOS 和 Linux 使用 `npm`。Windows 的 PowerShell 可以直接调用 `npm.cmd`。B01 的脚本用 `node hello.js` 单独运行。

| 课 | 打开的地址 | 这次看什么 |
| --- | --- | --- |
| B01 | [第一课](http://127.0.0.1:5173/?lesson=b01) | 跑出页面，分清终端和浏览器输出 |
| B02 | [第二课](http://127.0.0.1:5173/?lesson=b02) | 点击发送、空值校验和消息列表 |
| B03 | [第三课](http://127.0.0.1:5173/?lesson=b03) | 在 Network 看一条完整回复 |
| B04 | [第四课](http://127.0.0.1:5173/?lesson=b04) | 追问时检查请求带了哪些前文 |
| B05 | [第五课](http://127.0.0.1:5173/?lesson=b05) | 模拟失败，再点重试 |
| B06 | [第六课](http://127.0.0.1:5173/?lesson=b06) | 模拟慢回复，等待时点新对话 |
| B07 | [第七课](http://127.0.0.1:5173/?lesson=b07) | 拆组件、构建和回归验收 |

`src/lessons/` 按课保存完整练习。`src/main.js` 根据 URL 的 `lesson` 选择页面，直接打开首页会进入 B07。

## 运行接口

从 B03 开始保持开发服务器运行，在 VS Code 新开一个终端，仍在本目录运行 `npm.cmd run api`。接口默认监听 `127.0.0.1:8787`。Vue 通过 Vite 访问 `POST /api/chat`。模拟模式会在回复开头标明「模拟」，课程里的失败和慢回复控制在这一模式生效。

接真实模型时，复制 `.env.example` 为 `.env`，填入服务商提供的 OpenAI 兼容 API 基础地址、API 密钥和文本模型 ID，把 `CHAT_MODE` 改成 `real`，再重启 `npm.cmd run api`。若服务商给的是以 `/v1/chat/completions` 结尾的完整接口地址，`MODEL_BASE_URL` 填到 `/v1` 为止。密钥只放在服务端的 `.env`，对话文本和密钥均不写进服务器的请求日志。模型服务的费用按服务商规则计算。

接口接受按顺序排列的 `messages`，已完成的用户和助手消息交替出现，最后一条是当前用户提问。示例面向短对话，接口最多接收 99 条消息。到达上限时可以新建会话。响应包含 `message` 和 `requestId`。失败时查看 Network 的 HTTP 状态和响应体，再根据 `requestId` 查第二个终端的请求日志。

## 构建验收

保持接口运行，另开终端执行 `npm.cmd run build` 和 `npm.cmd run preview`。打开 [构建预览](http://127.0.0.1:4173/?lesson=b07)。验收发送、追问、故障重试及新对话。运行 `npm.cmd run preview` 只用于本地检查构建。真正部署时，静态页面和 `/api/chat` 需要由部署环境接在同一来源上，或按实际部署方式配置接口访问。
