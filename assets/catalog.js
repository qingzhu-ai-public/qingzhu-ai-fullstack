/* 课程目录数据：方向页、文章页左侧目录共用。
   条目全部来自原有各方向页的大纲，未新增课程。 */
window.QZ_CATALOG = (function () {
  'use strict';

  var tracks = {
    backend: {
      label: '后端开发', dir: 'backend',
      stacks: [
        { id: 'java', name: 'Java', levels: [
          { name: '初级', lessons: ['JVM 内存', '线程', '垃圾回收与并发'] },
          { name: '中级', lessons: ['六道关与模块设计', 'JVM 线程与诊断', '事务·AOP·安全链路', '数据库与 Redis', '统一接入与路由', '计量配额限流', '幂等与韧性', '消息队列与异步', '可观测与压测', 'CI/CD 与交付', '毕业整合上线'] },
          { name: '高级', lessons: ['模块化单体与微服务的取舍', '事务', '消息队列'] }
        ] },
        { id: 'python', name: 'Python', levels: [
          { name: '初级', lessons: ['asyncio 异步编程', '类型提示', '包管理'] },
          { name: '中级', lessons: ['FastAPI', 'Django', 'Pydantic'] },
          { name: '高级', lessons: ['模型服务', '数据管道', '任务队列', '自动化脚本'] }
        ] },
        { id: 'go', name: 'Go', levels: [
          { name: '初级', lessons: ['goroutine', 'channel', '接口与错误处理'] },
          { name: '中级', lessons: ['Gin', 'Echo', 'gRPC'] },
          { name: '高级', lessons: ['微服务', '中间件', '高并发网关'] }
        ] },
        { id: 'node', name: 'Node.js', levels: [
          { name: '初级', lessons: ['事件循环', '异步 I/O', 'Stream'] },
          { name: '中级', lessons: ['Express', 'NestJS', 'Fastify'] },
          { name: '高级', lessons: ['面向前端的后端（BFF）', '实时应用', 'Serverless'] }
        ] }
      ]
    },
    frontend: {
      label: '前端开发', dir: 'frontend',
      stacks: [
        { id: 'vue', name: 'Vue', levels: [
          { name: '初级', lessons: ['响应式原理', '组合式 API', '组件生命周期'] },
          { name: '中级', lessons: ['Vue 3', 'Vite', 'Pinia', 'Vue Router'] },
          { name: '高级', lessons: ['组件拆分', '状态管理', 'Nuxt 服务端渲染'] }
        ] },
        { id: 'react', name: 'React', levels: [
          { name: '初级', lessons: ['JSX', 'Hooks', '渲染与协调机制'] },
          { name: '中级', lessons: ['React 18', 'Next.js', '状态管理库'] },
          { name: '高级', lessons: ['组件组合', '服务端组件', '跨端逻辑复用'] }
        ] }
      ]
    },
    mobile: {
      label: '移动端开发', dir: 'mobile',
      stacks: [
        { id: 'android', name: 'Android', levels: [
          { name: '初级', lessons: ['Kotlin', '协程', 'Activity 与 Fragment 生命周期'] },
          { name: '中级', lessons: ['Jetpack Compose', 'ViewModel', 'Room'] },
          { name: '高级', lessons: ['MVVM', '模块化', '后台任务与权限管理'] }
        ] },
        { id: 'ios', name: 'iOS', levels: [
          { name: '初级', lessons: ['Swift', 'async/await', 'App 生命周期'] },
          { name: '中级', lessons: ['SwiftUI', 'Combine', 'SwiftData'] },
          { name: '高级', lessons: ['MVVM', '隐私权限', 'App 审核要求'] }
        ] },
        { id: 'harmony', name: '鸿蒙', levels: [
          { name: '初级', lessons: ['ArkTS', '状态管理', 'Ability 生命周期'] },
          { name: '中级', lessons: ['ArkUI 声明式界面', '分布式能力'] },
          { name: '高级', lessons: ['多设备协同', '国产化环境适配'] }
        ] }
      ]
    },
    cross: {
      label: '跨平台开发', dir: 'cross-platform',
      stacks: [
        { id: 'flutter', name: 'Flutter', levels: [
          { name: '初级', lessons: ['Dart', 'Widget 树', '状态管理', '渲染引擎'] },
          { name: '中级', lessons: ['Flutter', 'Riverpod', 'Bloc'] },
          { name: '高级', lessons: ['多端一致的界面', '平台通道', '性能优化'] }
        ] },
        { id: 'rn', name: 'React Native', levels: [
          { name: '初级', lessons: ['JSX', '原生组件', 'React Native 新架构'] },
          { name: '中级', lessons: ['Expo', '导航', '状态管理'] },
          { name: '高级', lessons: ['接入原生模块', '热更新', 'Web 业务逻辑复用'] }
        ] }
      ]
    },
    ai: {
      label: 'AI 应用开发', dir: 'ai',
      stacks: [
        { id: 'llm', name: 'LLM 接入', levels: [
          { name: '初级', lessons: ['API 调用', '流式输出', 'Token 计费', '上下文窗口'] },
          { name: '中级', lessons: ['多模型路由', '限流', '超时', '降级'] },
          { name: '高级', lessons: ['直连 API 或经过网关', '自托管或使用云服务'] }
        ] },
        { id: 'rag', name: 'RAG 检索增强', levels: [
          { name: '初级', lessons: ['嵌入', '向量检索', '重排与生成'] },
          { name: '中级', lessons: ['文档分块', '向量库', '引用溯源'] },
          { name: '高级', lessons: ['检索增强', '微调', '长上下文'] }
        ] },
        { id: 'agent', name: 'Agent 编排', levels: [
          { name: '初级', lessons: ['工具调用', 'ReAct', '规划与反思'] },
          { name: '中级', lessons: ['工作流', '状态管理', '工具权限'] },
          { name: '高级', lessons: ['单个 Agent', '多 Agent 协作', '固定流程'] }
        ] },
        { id: 'eval', name: '评估与可观测', levels: [
          { name: '初级', lessons: ['质量评估', '幻觉与回归测试'] },
          { name: '中级', lessons: ['链路追踪', '成本监控', 'A/B 测试'] },
          { name: '高级', lessons: ['离线评估', '在线监控'] }
        ] }
      ]
    }
  };

  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function getTrack(id) { return tracks[id] || null; }
  function getStack(trackId, stackId) {
    var track = getTrack(trackId);
    if (!track) return null;
    for (var i = 0; i < track.stacks.length; i++) {
      if (track.stacks[i].id === stackId) return track.stacks[i];
    }
    return null;
  }
  function findLesson(trackId, stackId, name) {
    var stack = getStack(trackId, stackId);
    if (!stack) return null;
    for (var i = 0; i < stack.levels.length; i++) {
      var level = stack.levels[i];
      for (var j = 0; j < level.lessons.length; j++) {
        if (level.lessons[j] === name) return { name: name, level: level.name, stack: stack, track: getTrack(trackId) };
      }
    }
    return null;
  }
  function firstLesson(trackId, stackId) {
    var stack = getStack(trackId, stackId);
    return stack && stack.levels[0].lessons[0];
  }
  function lessonUrl(trackId, stackId, name, base) {
    return base + '?track=' + encodeURIComponent(trackId) +
      '&stack=' + encodeURIComponent(stackId) +
      '&lesson=' + encodeURIComponent(name);
  }

  function levelsHtml(trackId, stack, articleBase, currentName) {
    return stack.levels.map(function (level) {
      return '<section class="level"><h2>' + esc(level.name) + '</h2><div class="level-list">' +
        level.lessons.map(function (name) {
          var cur = name === currentName ? ' is-current' : '';
          return '<a class="lesson' + cur + '" href="' + esc(lessonUrl(trackId, stack.id, name, articleBase)) + '">' + esc(name) + '</a>';
        }).join('') +
      '</div></section>';
    }).join('');
  }

  /* 方向页：渲染技术栈 tab 与三块课程目录，每条都可点进文章 */
  function renderTrackPage(trackId, articleBase) {
    var track = getTrack(trackId);
    if (!track) return;
    var tabsEl = document.getElementById('subtabs');
    var levelsEl = document.getElementById('levels');
    if (!tabsEl || !levelsEl) return;

    tabsEl.innerHTML = track.stacks.map(function (stack, i) {
      return '<button type="button" class="' + (i === 0 ? 'on' : '') + '" data-panel="' + stack.id +
        '" aria-selected="' + (i === 0 ? 'true' : 'false') + '">' + esc(stack.name) + '</button>';
    }).join('');

    levelsEl.innerHTML = track.stacks.map(function (stack, i) {
      return '<div class="levels" data-panel="' + stack.id + '"' + (i === 0 ? '' : ' hidden') + '>' +
        levelsHtml(trackId, stack, articleBase, null) + '</div>';
    }).join('');

    var tabs = tabsEl.querySelectorAll('button');
    var panels = levelsEl.querySelectorAll('.levels');
    function show(name) {
      tabs.forEach(function (tab) {
        var on = tab.getAttribute('data-panel') === name;
        tab.classList.toggle('on', on);
        tab.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      panels.forEach(function (panel) { panel.hidden = panel.getAttribute('data-panel') !== name; });
    }
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () { show(tab.getAttribute('data-panel')); });
    });
    show(track.stacks[0].id);
  }

  var HOME_INTRO = {
    backend: '请求到了服务端，怎样读写数据、处理并发',
    frontend: '从页面状态变化看 Vue 和 React 怎么更新界面',
    mobile: '同一个功能写到三个平台，权限和生命周期各不一样',
    cross: '一套代码多端运行，在一致性和原生能力之间取舍',
    ai: '从接入模型开始，把检索、工具调用和评估接到产品里'
  };

  /* 首页：几大块区域，每块列出该技术栈，点哪个进哪个的第一课 */
  function renderHome(articleBase) {
    var el = document.getElementById('homeBlocks');
    if (!el) return;
    var ids = ['backend', 'frontend', 'mobile', 'cross', 'ai'];
    el.innerHTML = ids.map(function (id, i) {
      var track = tracks[id];
      return '<section class="home-block">' +
        '<span class="hb-idx">0' + (i + 1) + '</span>' +
        '<div class="hb-main"><h2 class="hb-name">' + esc(track.label) + '</h2>' +
          '<p class="hb-intro">' + esc(HOME_INTRO[id]) + '</p></div>' +
        '<div class="hb-stacks">' + track.stacks.map(function (stack) {
          var first = stack.levels[0].lessons[0];
          return '<a class="hb-stack" href="' + esc(lessonUrl(id, stack.id, first, articleBase)) + '">' +
            '<span class="hs-name">' + esc(stack.name) + '</span>' +
            '<span class="hs-first">第一课 · ' + esc(first) + ' →</span>' +
          '</a>';
        }).join('') + '</div>' +
      '</section>';
    }).join('');
  }

  return {
    tracks: tracks, getTrack: getTrack, getStack: getStack,
    findLesson: findLesson, firstLesson: firstLesson,
    lessonUrl: lessonUrl, levelsHtml: levelsHtml,
    renderTrackPage: renderTrackPage, renderHome: renderHome, esc: esc
  };
})();
