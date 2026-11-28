# 青竹 · 全栈学习指南

把自己做过的课程和配套源码放在同一个站点，自己学习用，也开放给别人一起学。

线上站点（GitHub Pages）：https://qingzhu-ai-public.github.io/qingzhu-ai-fullstack/

## 这里有什么

| 内容 | 状态 | 入口 |
|---|---|---|
| 青竹蓝牙学堂：通用基础 + Android / iOS / 鸿蒙 / Flutter / RN 五端 BLE 实战，共 62 门正课 | 已上线 | [蓝牙学堂](https://qingzhu-ai-public.github.io/qingzhu-blue/academy/) |
| 蓝牙学堂 Android 端 SDK 与示例源码 | 已开源 | [qingzhu-ble-android](https://github.com/qingzhu-ai-public/qingzhu-ble-android) |
| Java 中级 11 课：用 Spring 搭 AI 网关（图解 + 交互演练 + 自测） | 已上线 | [后端 / Java / 中级](tracks/backend/index.html) |
| Vue 初级 7 课 · 做出一页 AI 对话助手 | 已收录 | [前端 / Vue / 初级](tracks/frontend/index.html) · [配套工程](examples/vue-chat/README.md) |
| 后端、前端、移动端、跨平台、AI 应用五个方向的学习大纲与选型笔记 | 已上线 | `tracks/` 下对应页面 |

## 学习方法

每门课按同一条线走：先讲清这项技术解决什么问题、边界在哪，再按场景做选型，最后把架构和约束写成指令交给 AI 实现，自己负责判断和验收。每课配图解、交互演练和自测。

## 目录结构

```
qingzhu-ai-fullstack/
├── index.html                 ← 首页：站点介绍 + 五大方向块，块内按技术栈直达第一课
├── assets/
│   ├── style.css              ← 定稿样式（沿用青竹 Java 学堂 / 蓝牙学堂课程模板配色）
│   ├── catalog.js             ← 课程目录数据：首页、方向页、文章页左栏共用
│   ├── content/
│   │   ├── lesson.css         ← 课程正文组件样式（作用域 .article：图解/演练/自测/依据卡）
│   │   └── java-mid.js        ← Java 中级 11 课正文注册表（命中后渲染真实正文，否则回退占位）
│   ├── brand.svg              ← 站点图标
│   └── icons.svg              ← 图标集（GitHub）
└── tracks/
    ├── article.html           ← 通用文章页：左课程目录 / 正文 / 右文章目录
    ├── backend/index.html     ← 后端：Java / Python / Go / Node.js
    ├── frontend/index.html    ← 前端：Vue / React
    ├── mobile/index.html      ← 移动端：Android / iOS / 鸿蒙
    ├── cross-platform/index.html ← 跨平台：Flutter / React Native
    └── ai/index.html          ← AI 应用：LLM 接入 / RAG / Agent / 评估
```

## 部署

GitHub Pages，源 `main` 分支根目录。推送后自动构建：

```bash
git add -A && git commit -m "..." && git push origin main
```

## 关联仓库

- 私有课程底稿：`qingzhu-ai-fullstack-universe`（Gitee）
- 蓝牙专项公开站：`qingzhu-blue`（GitHub）
