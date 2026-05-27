# 组件 CSS 类名速查表

所有组件均使用 `sw-` 前缀，框架无关，直接在 HTML 中使用对应 class 即可。

## 布局 Layout

```html
<!-- 整体 Shell 布局 -->
<div class="sw-shell" data-sider-open="false">
  <aside class="sw-sider">
    <div class="sw-sider__brand">...</div>
    <div class="sw-sider__scroll">...</div>
  </aside>
  <main class="sw-main">
    <header class="sw-header">
      <div class="sw-header__left">...</div>
      <div class="sw-header__right">...</div>
    </header>
    <section class="sw-content">
      <div class="sw-page">...</div>
    </section>
  </main>
</div>

<!-- 12列栅格 -->
<div class="sw-grid">
  <div class="sw-col-12">全宽</div>
  <div class="sw-col-8">8列</div>
  <div class="sw-col-6">6列（半宽）</div>
  <div class="sw-col-4">4列（三分之一）</div>
  <div class="sw-col-3">3列（四分之一）</div>
</div>

<!-- 行内弹性布局 -->
<div class="sw-row">...</div>
<div class="sw-row sw-row--between">...</div>
<div class="sw-row sw-gap-xs">...</div>
<div class="sw-row sw-gap-sm">...</div>
```

## 卡片 Card

```html
<div class="sw-card">
  <div class="sw-card__hd">
    <div><h2 class="sw-h2">标题</h2><p class="sw-desc">描述</p></div>
    <span class="sw-tag">标签</span>
  </div>
  <div class="sw-card__bd">内容区</div>
  <div class="sw-card__ft">
    <button class="sw-btn sw-btn--ghost">取消</button>
    <button class="sw-btn sw-btn--primary">确认</button>
  </div>
</div>
```

## 按钮 Button

```html
<!-- 类型 -->
<button class="sw-btn sw-btn--primary">主要</button>
<button class="sw-btn">默认</button>
<button class="sw-btn sw-btn--ghost">幽灵</button>
<button class="sw-btn sw-btn--link">链接</button>
<button class="sw-btn sw-btn--danger">危险</button>
<button class="sw-btn" disabled>禁用</button>

<!-- 尺寸 -->
<button class="sw-btn sw-btn--primary sw-btn--sm">小</button>
<button class="sw-btn sw-btn--primary">中（默认）</button>
<button class="sw-btn sw-btn--primary sw-btn--lg">大</button>

<!-- 带图标 -->
<button class="sw-btn sw-btn--primary">
  <svg width="16" height="16" ...></svg>
  新增
</button>
```

## 表单 Form

```html
<!-- 输入框 -->
<div class="sw-field">
  <label class="sw-label">
    字段名 <span class="sw-label__req">*</span>
  </label>
  <input class="sw-input" type="text" placeholder="请输入" />
  <span class="sw-help">提示文字</span>
  <span class="sw-err">错误信息</span>
</div>

<!-- 文本域 -->
<textarea class="sw-textarea" placeholder="请输入"></textarea>

<!-- 输入框组（搜索框） -->
<div class="sw-input-group">
  <input class="sw-input" type="text" placeholder="搜索..." />
  <button class="sw-btn sw-btn--primary">搜索</button>
</div>

<!-- 自定义下拉选择 -->
<div class="sw-select" data-open="false">
  <button class="sw-select__btn">
    <span class="sw-select__value sw-select__muted">请选择</span>
    <svg ...></svg>
  </button>
  <div class="sw-select__menu">
    <div class="sw-option" data-value="1" aria-selected="false">选项一</div>
    <div class="sw-option" data-value="2" aria-selected="false">选项二</div>
  </div>
</div>

<!-- 复选框 -->
<div class="sw-checkrow">
  <label class="sw-check">
    <input type="checkbox" />
    <span class="sw-box"></span>
    <span>选项</span>
  </label>
</div>

<!-- 单选框 -->
<label class="sw-check">
  <input type="radio" name="group" />
  <span class="sw-dot"></span>
  <span>选项</span>
</label>

<!-- 开关 -->
<div class="sw-switch" role="switch" aria-checked="false"></div>
```

## 标签 Tag / 徽标 Badge / 头像 Avatar

```html
<!-- Tag -->
<span class="sw-tag">默认</span>
<span class="sw-tag sw-tag--blue">蓝色</span>
<span class="sw-tag sw-tag--green">绿色</span>
<span class="sw-tag sw-tag--gold">金色</span>
<span class="sw-tag sw-tag--red">红色</span>
<span class="sw-tag sw-tag--blue sw-tag--closable">
  可关闭
  <button class="sw-tag__close" aria-label="关闭">×</button>
</span>

<!-- Badge 徽标 -->
<span class="sw-badge">
  <div class="sw-avatar"></div>
  <span class="sw-badge__dot"></span>       <!-- 红点 -->
  <span class="sw-badge__count">8</span>    <!-- 数字 -->
</span>

<!-- Avatar 头像 -->
<div class="sw-avatar"></div>

<!-- 状态点 -->
<span class="sw-dot-status sw-dot-status--success">运行中</span>
<span class="sw-dot-status sw-dot-status--error">已停止</span>
<span class="sw-dot-status sw-dot-status--warning">异常</span>
<span class="sw-dot-status sw-dot-status--info">信息</span>
```

## 导航 Navigation

```html
<!-- 菜单 -->
<nav class="sw-menu">
  <div class="sw-menu__group">
    <div class="sw-menu__label">分组名</div>
    <div class="sw-menu__item" aria-current="page" data-target="sec-id">
      <span class="sw-menu__icon"><svg ...></svg></span>
      菜单项
    </div>
  </div>
</nav>

<!-- 面包屑 -->
<div class="sw-breadcrumb">
  <a href="#">首页</a>
  <span class="sw-breadcrumb__sep">/</span>
  <span>当前页</span>
</div>

<!-- 标签页 -->
<div class="sw-tabs">
  <button class="sw-tab" aria-selected="true" data-tab="tab1">标签一</button>
  <button class="sw-tab" aria-selected="false" data-tab="tab2">标签二</button>
</div>
<div data-tabs-root>
  <div class="sw-tabpanel" data-tabpanel="tab1" data-active="true">内容一</div>
  <div class="sw-tabpanel" data-tabpanel="tab2" data-active="false">内容二</div>
</div>

<!-- 分段控制器 -->
<div class="sw-segmented">
  <button class="sw-segmented__item" aria-selected="true">列表</button>
  <button class="sw-segmented__item" aria-selected="false">卡片</button>
  <button class="sw-segmented__item" aria-selected="false">看板</button>
</div>
```

## 数据展示

```html
<!-- 表格 -->
<div class="sw-table-wrap">
  <table class="sw-table">
    <thead>
      <tr>
        <th>列名</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>数据</td>
        <td>
          <div class="sw-row-actions">
            <button class="sw-btn sw-btn--link">编辑</button>
            <button class="sw-btn sw-btn--link" style="color:var(--sw-error)">删除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

<!-- 分页 -->
<div class="sw-pagination">
  <button class="sw-pagebtn">‹</button>
  <button class="sw-pagebtn" aria-current="true">1</button>
  <button class="sw-pagebtn">2</button>
  <button class="sw-pagebtn">›</button>
</div>

<!-- 进度条 -->
<div class="sw-progress" aria-label="进度">
  <div class="sw-progress__bar" style="--v:68%"></div>
</div>

<!-- 步骤条 -->
<div class="sw-steps">
  <div class="sw-step" aria-current="false">
    <div class="sw-step__n">1</div>
    <div class="sw-step__t">
      <div class="sw-step__title">创建</div>
      <div class="sw-step__desc">Draft</div>
    </div>
  </div>
  <div class="sw-step" aria-current="true">
    <div class="sw-step__n">2</div>
    <div class="sw-step__t">
      <div class="sw-step__title">审核</div>
      <div class="sw-step__desc">Reviewing</div>
    </div>
  </div>
</div>

<!-- KPI 数据卡 -->
<div class="sw-kpi">
  <div class="sw-kpi__label">本周活跃用户</div>
  <div class="sw-kpi__value">48,120</div>
  <div class="sw-kpi__delta sw-kpi__delta--up">▲ +12.4%</div>
</div>

<!-- 统计数字 -->
<div class="sw-statistic">
  <div class="sw-statistic__title">总收入</div>
  <div class="sw-statistic__value">
    <span class="sw-statistic__prefix">¥</span>
    128,000
  </div>
  <div class="sw-statistic__trend sw-statistic__trend--up">▲ 12.4%</div>
</div>

<!-- 描述列表 -->
<div class="sw-descriptions">
  <div class="sw-descriptions__item">
    <span class="sw-descriptions__label">订单号</span>
    <span class="sw-descriptions__value">20250415001</span>
  </div>
</div>

<!-- 时间轴 -->
<div class="sw-timeline">
  <div class="sw-timeline__item">
    <div class="sw-timeline__dot-wrap">
      <div class="sw-timeline__dot sw-timeline__dot--active"></div>
      <div class="sw-timeline__line"></div>
    </div>
    <div class="sw-timeline__content">
      <div class="sw-timeline__title">事件标题</div>
      <div class="sw-timeline__desc">事件描述</div>
      <div class="sw-timeline__time">2025-04-15 10:00</div>
    </div>
  </div>
</div>

<!-- 列表 List -->
<div class="sw-list">
  <div class="sw-list__item">
    <div class="sw-list__item-left">
      <div class="sw-avatar"></div>
      <div class="sw-list__item-content">
        <div class="sw-list__item-title">标题</div>
        <div class="sw-list__item-desc">描述</div>
      </div>
    </div>
    <div class="sw-list__item-meta">
      <span class="sw-tag sw-tag--green">状态</span>
    </div>
  </div>
</div>

<!-- 树形 Tree -->
<div class="sw-tree">
  <div class="sw-tree__node" aria-expanded="true">
    <span class="sw-tree__toggle"><svg ...></svg></span>
    <span class="sw-tree__icon"><svg ...></svg></span>
    父节点
  </div>
  <div class="sw-tree__children">
    <div class="sw-tree__node sw-tree__node--leaf">子节点</div>
  </div>
</div>
```

## 反馈 Feedback

```html
<!-- 提示 Alert -->
<div class="sw-alert sw-alert--info">
  <div class="sw-alert__icon">...</div>
  <div>
    <p class="sw-alert__title">提示标题</p>
    <p class="sw-alert__desc">提示内容</p>
  </div>
</div>
<!-- 变体：sw-alert--success / sw-alert--warning / sw-alert--error -->

<!-- 弹窗 Modal -->
<div class="sw-overlay" id="swModalOverlay" data-open="false">
  <div class="sw-modal">
    <div class="sw-modal__hd">
      <span class="sw-modal__title">弹窗标题</span>
      <button class="sw-iconbtn" id="swCloseModal">×</button>
    </div>
    <div class="sw-modal__bd">内容</div>
    <div class="sw-modal__ft">
      <button class="sw-btn sw-btn--ghost" id="swCancelModal">取消</button>
      <button class="sw-btn sw-btn--primary" id="swOkModal">确认</button>
    </div>
  </div>
</div>

<!-- 抽屉 Drawer -->
<div class="sw-drawer" id="swDrawer" data-open="false">
  <div class="sw-drawer__hd">
    <span class="sw-drawer__title">抽屉标题</span>
    <button class="sw-iconbtn" id="swCloseDrawer">×</button>
  </div>
  <div class="sw-drawer__bd">内容</div>
</div>

<!-- Toast 通知（由 JS 动态创建） -->
<div class="sw-toasts"></div>
<!-- 调用：toast({ title:'标题', desc:'描述', tone:'success', duration:2600 }) -->
<!-- tone 可选：info / success / warning / error -->

<!-- 折叠面板 Collapse -->
<div class="sw-collapse">
  <div class="sw-collapse__panel" data-open="false">
    <div class="sw-collapse__header">
      标题
      <svg class="sw-collapse__arrow" ...></svg>
    </div>
    <div class="sw-collapse__body">内容</div>
  </div>
</div>

<!-- 空状态 Empty -->
<div class="sw-empty">
  <div class="sw-empty__img"><svg ...></svg></div>
  <div class="sw-empty__text">暂无数据</div>
</div>

<!-- 骨架屏 Skeleton -->
<div class="sw-skeleton">
  <div class="sw-skeleton__row">
    <div class="sw-skeleton__line sw-skeleton__line--round"></div>
    <div style="flex:1;display:flex;flex-direction:column;gap:8px">
      <div class="sw-skeleton__line sw-skeleton__line--md"></div>
      <div class="sw-skeleton__line sw-skeleton__line--sm"></div>
    </div>
  </div>
  <div class="sw-skeleton__line sw-skeleton__line--lg"></div>
</div>
```

## Banner / 上传 / 其他

```html
<!-- Banner -->
<div class="sw-banner">
  <div class="sw-banner__content">
    <div class="sw-banner__title">标题</div>
    <div class="sw-banner__desc">描述文字</div>
    <div class="sw-banner__actions">
      <button class="sw-banner__btn sw-banner__btn--solid">立即开始</button>
      <button class="sw-banner__btn">了解更多</button>
    </div>
  </div>
</div>
<!-- 变体：sw-banner--purple / sw-banner--cyan / sw-banner--gold -->

<!-- 上传 Upload -->
<div class="sw-upload">
  <div class="sw-upload__area">
    <div class="sw-upload__icon"><svg ...></svg></div>
    <div class="sw-upload__text">点击或拖拽文件到此处上传</div>
    <div class="sw-upload__hint">支持 JPG、PNG、PDF，最大 10MB</div>
  </div>
  <div class="sw-upload__list">
    <div class="sw-upload__file">
      <span class="sw-upload__file-name">文件名.pdf</span>
      <span class="sw-upload__file-status sw-upload__file-status--done">已上传</span>
      <button class="sw-upload__file-remove">×</button>
    </div>
  </div>
</div>

<!-- 分割线 -->
<div class="sw-divider"></div>

<!-- 代码块 -->
<pre class="sw-code"><code>代码内容</code></pre>

<!-- 图标按钮 -->
<button class="sw-iconbtn" title="操作"><svg ...></svg></button>

<!-- 下拉菜单 -->
<div class="sw-dd" data-open="false">
  <button class="sw-iconbtn" data-dd-toggle="true">触发</button>
  <div class="sw-dd__menu">
    <div class="sw-dd__item">菜单项</div>
    <div class="sw-dd__sep"></div>
    <div class="sw-dd__item">菜单项</div>
  </div>
</div>
```

## 排版 Typography

```html
<!-- 标题 -->
<div class="sw-h1-typo">H1 标题</div>
<div class="sw-h2-typo">H2 标题</div>
<div class="sw-h3-typo">H3 标题</div>
<div class="sw-h4-typo">H4 标题</div>
<div class="sw-h5-typo">H5 标题</div>

<!-- 文本变体 -->
<span class="sw-text-primary">主色</span>
<span class="sw-text-secondary">次要</span>
<span class="sw-text-tertiary">辅助</span>
<span class="sw-text-success">成功</span>
<span class="sw-text-warning">警告</span>
<span class="sw-text-error">错误</span>
<span class="sw-text-bold">加粗</span>
<span class="sw-text-del">删除线</span>
<span class="sw-text-underline">下划线</span>
<span class="sw-text-mark">高亮标记</span>
<code class="sw-text-code">内联代码</code>

<!-- 引用块 -->
<div class="sw-blockquote">引用内容</div>

<!-- 辅助类 -->
<span class="sw-muted">灰色文字</span>
<span class="sw-mono">等宽字体</span>
```
