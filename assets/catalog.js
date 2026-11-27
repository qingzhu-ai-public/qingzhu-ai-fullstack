/* 课程目录数据：方向页、文章页左侧目录共用。
   只有已编写真实正文的级别才列课名（ready:true）；
   其余级别 lessons 为空数组，目录显示「整理中」，不列占位课名。 */
window.QZ_CATALOG = (function () {
  'use strict';

  var tracks = {
    backend: {
      label: '后端开发', dir: 'backend',
      stacks: [
        { id: 'java', name: 'Java', levels: [
          { name: '初级', ready: true, lessons: ['认识后端：第一个能跑的服务', 'Java 本身：对象、集合与并发', 'Web 通用语言：HTTP、REST 与 JSON', '看懂 Spring Boot：三层与依赖注入', '账号系统：哈希、JWT 与数据权限', 'AI 聊天变真：SSE 与跨线程坑', '能交付：测试、日志、文档与 Docker', '进阶路线：能跑、能扛、能负责', '毕业考：串起来独立交付'] },
          { name: '中级', ready: true, lessons: ['六道关与模块设计', 'JVM 线程与诊断', '事务·AOP·安全链路', '数据库与 Redis', '统一接入与路由', '计量配额限流', '幂等与韧性', '消息队列与异步', '可观测与压测', 'CI/CD 与交付', '毕业整合上线'] },
          { name: '高级', ready: true, lessons: ['把模糊需求变成系统战略', '架构取舍与质量属性', '划边界：领域、系统与团队', '数据一致性与 Saga/Outbox', '平台契约与自助接入', '部署形态与弹性取舍', 'SLO、容灾与业务连续性', '零信任与供应链安全', '成本账与技术演进', '带团队与带 AI 交付', '毕业：平台分阶段交付'] },
          { name: '源码解读', ready: true, lessons: ['mall 全景：一个商城为什么拆七个模块', '登录认证：JWT 怎么确认你是你', 'Redis 缓存：为什么先查缓存再查库', 'MongoDB：浏览记录为什么不用 MySQL', 'RabbitMQ：订单超时怎么自动取消', 'Elasticsearch：商品搜索为什么快', 'MinIO：图片为什么单独存', '接口规范：统一回执与全局异常', '代码生成器：一百张表不手写', '毕业：把 mall 九项技术串成一张地图'] }
        ] },
        { id: 'python', name: 'Python', levels: [
          { name: '初级', lessons: [] },
          { name: '中级', lessons: [] },
          { name: '高级', lessons: [] }
        ] },
        { id: 'go', name: 'Go', levels: [
          { name: '初级', lessons: [] },
          { name: '中级', lessons: [] },
          { name: '高级', lessons: [] }
        ] },
        { id: 'node', name: 'Node.js', levels: [
          { name: '初级', lessons: [] },
          { name: '中级', lessons: [] },
          { name: '高级', lessons: [] }
        ] }
      ]
    },
    frontend: {
      label: '前端开发', dir: 'frontend',
      stacks: [
        { id: 'vue', name: 'Vue', levels: [
          { name: '初级', lessons: [] },
          { name: '中级', lessons: [] },
          { name: '高级', lessons: [] }
        ] },
        { id: 'react', name: 'React', levels: [
          { name: '初级', lessons: [] },
          { name: '中级', lessons: [] },
          { name: '高级', lessons: [] }
        ] }
      ]
    },
    mobile: {
      label: '移动端开发', dir: 'mobile',
      stacks: [
        { id: 'android', name: 'Android', levels: [
          { name: '初级', lessons: [] },
          { name: '中级', lessons: [] },
          { name: '高级', lessons: [] }
        ] },
        { id: 'ios', name: 'iOS', levels: [
          { name: '初级', lessons: [] },
          { name: '中级', lessons: [] },
          { name: '高级', lessons: [] }
        ] },
        { id: 'harmony', name: '鸿蒙', levels: [
          { name: '初级', lessons: [] },
          { name: '中级', lessons: [] },
          { name: '高级', lessons: [] }
        ] }
      ]
    },
    cross: {
      label: '跨平台开发', dir: 'cross-platform',
      stacks: [
        { id: 'flutter', name: 'Flutter', levels: [
          { name: '初级', lessons: [] },
          { name: '中级', lessons: [] },
          { name: '高级', lessons: [] }
        ] },
        { id: 'rn', name: 'React Native', levels: [
          { name: '初级', lessons: [] },
          { name: '中级', lessons: [] },
          { name: '高级', lessons: [] }
        ] }
      ]
    },
    ai: {
      label: 'AI 应用开发', dir: 'ai',
      stacks: [
        { id: 'llm', name: 'LLM 接入', levels: [
          { name: '初级', lessons: [] },
          { name: '中级', lessons: [] },
          { name: '高级', lessons: [] }
        ] },
        { id: 'rag', name: 'RAG 检索增强', levels: [
          { name: '初级', lessons: [] },
          { name: '中级', lessons: [] },
          { name: '高级', lessons: [] }
        ] },
        { id: 'agent', name: 'Agent 编排', levels: [
          { name: '初级', lessons: [] },
          { name: '中级', lessons: [] },
          { name: '高级', lessons: [] }
        ] },
        { id: 'eval', name: '评估与可观测', levels: [
          { name: '初级', lessons: [] },
          { name: '中级', lessons: [] },
          { name: '高级', lessons: [] }
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
  /* 第一个有真实内容的课（跳过空级别）；全空返回 null */
  function firstLesson(trackId, stackId) {
    var stack = getStack(trackId, stackId);
    if (!stack) return null;
    for (var i = 0; i < stack.levels.length; i++) {
      if (stack.levels[i].lessons.length) return stack.levels[i].lessons[0];
    }
    return null;
  }
  function lessonUrl(trackId, stackId, name, base) {
    return base + '?track=' + encodeURIComponent(trackId) +
      '&stack=' + encodeURIComponent(stackId) +
      '&lesson=' + encodeURIComponent(name);
  }
  function trackUrl(trackId, base) {
    return base.replace('article.html', getTrack(trackId).dir + '/index.html');
  }

  /* collapsible=true 时级别组可折叠（文章页左栏）：当前课所在级别默认展开，其余收起 */
  function levelsHtml(trackId, stack, articleBase, currentName, collapsible) {
    var hasCurrent = stack.levels.some(function (lv) { return lv.lessons.indexOf(currentName) >= 0; });
    return stack.levels.map(function (level, li) {
      var state = level.ready
        ? '<span class="lv-state on">已上线</span>'
        : '<span class="lv-state">待补</span>';
      var list = level.lessons.length
        ? '<div class="level-list">' + level.lessons.map(function (name) {
            var cur = name === currentName ? ' is-current' : '';
            return '<a class="lesson' + cur + '" href="' + esc(lessonUrl(trackId, stack.id, name, articleBase)) + '">' + esc(name) + '</a>';
          }).join('') + '</div>'
        : '<div class="level-empty">课程整理中，暂未上线</div>';
      if (!collapsible) {
        return '<section class="level"><h2>' + esc(level.name) + state + '</h2>' + list + '</section>';
      }
      var open = hasCurrent ? level.lessons.indexOf(currentName) >= 0 : li === 0;
      return '<section class="level' + (open ? ' open' : '') + '">' +
        '<h2><button type="button" class="level-toggle" aria-expanded="' + (open ? 'true' : 'false') + '">' +
          '<svg class="lv-caret" viewBox="0 0 12 12" aria-hidden="true"><path d="M4 2l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
          '<span class="lv-name">' + esc(level.name) + '</span>' +
          '<span class="lv-count">' + level.lessons.length + '</span>' + state +
        '</button></h2>' +
        '<div class="level-body">' + list + '</div>' +
      '</section>';
    }).join('');
  }

  /* 折叠开关：事件委托，动态插入的目录也生效 */
  document.addEventListener('click', function (e) {
    var t = e.target && e.target.closest ? e.target.closest('.level-toggle') : null;
    if (!t) return;
    var sec = t.closest('.level');
    if (!sec) return;
    var open = sec.classList.toggle('open');
    t.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

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

  /* 首页：几大块区域，每块列出该技术栈；有课的点进第一课，没课的进方向目录 */
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
          var first = firstLesson(id, stack.id);
          if (first) {
            return '<a class="hb-stack" href="' + esc(lessonUrl(id, stack.id, first, articleBase)) + '">' +
              '<span class="hs-name">' + esc(stack.name) + '</span>' +
              '<span class="hs-first">第一课 · ' + esc(first) + ' →</span>' +
            '</a>';
          }
          return '<a class="hb-stack empty" href="' + esc(trackUrl(id, articleBase)) + '">' +
            '<span class="hs-name">' + esc(stack.name) + '</span>' +
            '<span class="hs-first">课程整理中 · 查看目录 →</span>' +
          '</a>';
        }).join('') + '</div>' +
      '</section>';
    }).join('');
  }

  return {
    tracks: tracks, getTrack: getTrack, getStack: getStack,
    findLesson: findLesson, firstLesson: firstLesson,
    lessonUrl: lessonUrl, trackUrl: trackUrl, levelsHtml: levelsHtml,
    renderTrackPage: renderTrackPage, renderHome: renderHome, esc: esc
  };
})();