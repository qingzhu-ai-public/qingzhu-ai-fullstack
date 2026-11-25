# 青竹 · AI 全栈指南

> AI 时代的全栈学习指南：**懂原理 · 会选型 · 指挥 AI**。
> 不追求亲手写每一行，而是知道「什么场景该用什么架构/框架」，再把实现交给 AI。

线上站点（GitHub Pages）：https://qingzhu-ai-public.github.io/qingzhu-ai-fullstack/

## 定位

学基础原理、框架与架构的**适用边界**，按场景做技术选型，用清晰指令让 AI 生成实现，自己负责判断与验收。覆盖五大方向：

| 方向 | 覆盖 |
|---|---|
| 后端 | Java · Python · Go · Node.js |
| 前端 | Vue · React |
| 移动端 | Android · iOS · 鸿蒙 |
| 跨平台 | Flutter · React Native |
| AI 应用开发 | LLM 接入 · RAG · Agent · 评估可观测 |

## 目录结构

```
qingzhu-ai-fullstack/
├── index.html                 ← 首页 hub（理念 + 五方向 + 选型心法）
├── assets/style.css           ← 共享设计系统
└── tracks/
    ├── backend/index.html     ← 后端方向落地页
    ├── frontend/index.html    ← 前端
    ├── mobile/index.html      ← 移动端
    ├── cross-platform/index.html ← 跨平台
    └── ai/index.html          ← AI 应用开发
```

## 当前状态

- ✅ 站点框架 + 首页 + 五方向落地页已上线（GitHub Pages，main 根目录）。
- 🚧 各方向深度课程内容持续填充。Java 中级（11 课）样板已在私有仓 `qingzhu-ai-fullstack-universe/courses/fullstack-java` 写好，待并入。
- 🔗 专项「青竹蓝牙学堂」保持独立站点，首页放外链：https://qingzhu-ai-public.github.io/qingzhu-blue/academy/

## 内容模板（每课）

沿用青竹蓝牙学堂的「读得进去」结构：故事化类比 + SVG 图解 + 两场交互演练 + 六题带解析自测 + 依据链接卡。决策导向：先讲「什么场景用什么、为什么」，再讲实现。

## 部署

GitHub Pages，源 `main` 分支根目录。推送后自动构建：

```bash
git add -A && git commit -m "..." && git push origin main
```

## 关联仓库

- 私有课程底稿：`qingzhu-ai-fullstack-universe`（Gitee）
- 蓝牙专项公开站：`qingzhu-blue`（GitHub）