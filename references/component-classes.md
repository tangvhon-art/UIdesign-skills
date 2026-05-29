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

## 菜单 Menu

**用途**：侧边栏导航（垂直）或顶部导航栏（水平）。
**交互依赖**：子菜单展开需 `app.js`，`data-target` 滚动定位需 `app.js`。

### 变体一览

| class | 说明 |
|-------|------|
| `sw-menu` | 基础垂直菜单（用于侧边栏） |
| `sw-menu sw-menu--horizontal` | 水平菜单（用于顶部导航栏），激活项显示底部蓝色下划线 |
| `sw-menu__group` | 菜单分组容器，顶部有虚线分隔 |
| `sw-menu__label` | 分组标题文字（灰色小字） |
| `sw-menu__item` | 菜单项，`aria-current="page"` 表示当前激活项（蓝色高亮） |
| `sw-menu__icon` | 菜单项左侧图标容器（18×18） |
| `sw-menu__item[aria-expanded]` | 可展开的父菜单项，`aria-expanded="true"` 时展开子菜单 |
| `sw-menu__item-arrow` | 展开箭头图标，激活时自动旋转 180° |
| `sw-menu__sub` | 子菜单容器，父项 `aria-expanded="true"` 时显示 |

### 垂直菜单（侧边栏）

```html
<nav class="sw-menu" aria-label="侧边导航">

  <!-- 无分组的顶级菜单项 -->
  <div class="sw-menu__item" aria-current="page" data-target="sec-overview">
    <span class="sw-menu__icon">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M4 11.5V20h16v-8.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M12 3l9 8H3l9-8Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      </svg>
    </span>
    概览
  </div>

  <!-- 带分组的菜单 -->
  <div class="sw-menu__group">
    <div class="sw-menu__label">业务管理</div>

    <!-- 普通菜单项 -->
    <div class="sw-menu__item" data-target="sec-orders">
      <span class="sw-menu__icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="16" rx="3" stroke="currentColor" stroke-width="2"/>
          <path d="M3 9h18" stroke="currentColor" stroke-width="2"/>
        </svg>
      </span>
      订单管理
    </div>

    <!-- 可展开的父菜单项（需 app.js） -->
    <div class="sw-menu__item" aria-expanded="false">
      <span class="sw-menu__icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </span>
      商品管理
      <svg class="sw-menu__item-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <!-- 子菜单（父项 aria-expanded="true" 时自动显示） -->
    <div class="sw-menu__sub">
      <div class="sw-menu__item" data-target="sec-products">商品列表</div>
      <div class="sw-menu__item" data-target="sec-categories">商品分类</div>
    </div>

  </div>
</nav>
```

### 水平菜单（顶部导航栏）

激活项底部显示 2px 蓝色下划线，背景透明（不同于垂直菜单的蓝色背景块）。

```html
<nav class="sw-menu sw-menu--horizontal" aria-label="顶部导航">
  <div class="sw-menu__item" aria-current="page">首页</div>
  <div class="sw-menu__item">订单管理</div>
  <div class="sw-menu__item">商品管理</div>
  <div class="sw-menu__item">数据报表</div>
  <div class="sw-menu__item">系统设置</div>
</nav>
```

### 激活态说明

- **垂直菜单激活**：`aria-current="page"` → 蓝色背景块 + 蓝色文字
- **水平菜单激活**：`aria-current="page"` → 底部 2px 蓝色下划线，背景保持透明
- **切换激活项**：移除旧项的 `aria-current="page"`，在新项上添加 `aria-current="page"`

### 水平菜单 + 悬浮下拉子菜单（树形）

**交互依赖**：纯 CSS hover 驱动，需 `app.js` 处理叶子项激活态同步。
父菜单项加 `sw-menu__item--has-sub`，内部放 `.sw-menu__dropdown` 即可，无需额外 JS 初始化。

```html
<nav class="sw-menu sw-menu--horizontal" aria-label="顶部导航">

  <!-- 普通菜单项（无子菜单） -->
  <div class="sw-menu__item" aria-current="page">首页</div>

  <!-- 一级下拉（hover 展开） -->
  <div class="sw-menu__item sw-menu__item--has-sub">
    订单管理
    <svg class="sw-menu__item-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <div class="sw-menu__dropdown">
      <div class="sw-menu__item">订单列表</div>
      <div class="sw-menu__item">退款管理</div>
      <div class="sw-menu__dropdown-sep"></div>
      <div class="sw-menu__item">导出记录</div>
    </div>
  </div>

  <!-- 二级嵌套下拉（树形，hover 向右展开） -->
  <div class="sw-menu__item sw-menu__item--has-sub">
    商品管理
    <svg class="sw-menu__item-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <div class="sw-menu__dropdown">
      <div class="sw-menu__item">商品列表</div>
      <!-- 二级子菜单：向右展开 -->
      <div class="sw-menu__item sw-menu__item--has-sub">
        商品分类
        <svg class="sw-menu__item-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none">
          <path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div class="sw-menu__dropdown">
          <div class="sw-menu__item">服装</div>
          <div class="sw-menu__item">电子产品</div>
          <div class="sw-menu__item">食品</div>
        </div>
      </div>
      <div class="sw-menu__item">库存管理</div>
    </div>
  </div>

  <div class="sw-menu__item">数据报表</div>
  <div class="sw-menu__item">系统设置</div>
</nav>
```

**class 说明：**

| class | 说明 |
|-------|------|
| `sw-menu__item--has-sub` | 标记该菜单项有子菜单，hover 时展开 `.sw-menu__dropdown` |
| `sw-menu__dropdown` | 下拉面板，绝对定位，默认隐藏，父项 hover 时显示 |
| `sw-menu__dropdown-sep` | 下拉面板内分隔线 |
| `sw-menu__item-arrow`（水平菜单顶层） | 向下箭头 `↓`，hover 时旋转 180° |
| `sw-menu__item-arrow`（下拉内二级） | 向右箭头 `→`，固定 `transform: rotate(-90deg)` |

---

## 面包屑 Breadcrumb

```html
<!-- 基础 -->
<div class="sw-breadcrumb">
  <a href="#">首页</a>
  <span class="sw-breadcrumb__sep">/</span>
  <a href="#">订单管理</a>
  <span class="sw-breadcrumb__sep">/</span>
  <span>订单详情</span>
</div>

<!-- 大号（带图标） -->
<div class="sw-breadcrumb sw-breadcrumb--lg">
  <span class="sw-breadcrumb__item">
    <svg width="16" height="16" ...></svg>
    <a href="#">首页</a>
  </span>
  <span class="sw-breadcrumb__sep">/</span>
  <span class="sw-breadcrumb__item sw-breadcrumb__item--current">当前页</span>
</div>
```

## 标签页 Tabs

**交互依赖**：需 `app.js`，`data-tab` 与 `data-tabpanel` 值必须一一对应。

```html
<div class="sw-tabs">
  <button class="sw-tab" aria-selected="true" data-tab="tab1">标签一</button>
  <button class="sw-tab" aria-selected="false" data-tab="tab2">标签二</button>
  <button class="sw-tab" aria-selected="false" data-tab="tab3">标签三</button>
</div>
<div data-tabs-root>
  <div class="sw-tabpanel" data-tabpanel="tab1" data-active="true">内容一</div>
  <div class="sw-tabpanel" data-tabpanel="tab2" data-active="false">内容二</div>
  <div class="sw-tabpanel" data-tabpanel="tab3" data-active="false">内容三</div>
</div>
```

## 分段控制器 Segmented

**交互依赖**：需 `app.js`。

```html
<div class="sw-segmented">
  <button class="sw-segmented__item" aria-selected="true">列表</button>
  <button class="sw-segmented__item" aria-selected="false">卡片</button>
  <button class="sw-segmented__item" aria-selected="false">看板</button>
</div>
```

---

## 日期时间选择器 DatePicker / TimePicker

**交互依赖**：所有变体均需 `app.js`。
**必须保留的 id**：JS 通过 id 初始化，id 不可省略或修改。

### 变体一览

| 变体 | 组件 | 初始化方式 |
|------|------|-----------|
| 仅日期选择 | `sw-datepicker` | `initSingleDP('id')` — 已内置，id=`dp1` |
| 日期范围选择 | `sw-datepicker` + `--range` | `initRangeDP('id')` — 已内置，id=`drp1` |
| 时分秒选择 | `sw-timepicker` | `initTP('id')` — 已内置，id=`tp1` |
| 仅时分选择 | `sw-timepicker` + `data-tp-mode="hm"` | 自动初始化，无需额外调用 |
| 时间范围选择 | `sw-timerange` | `initTimeRangePickers()` — 已内置，自动扫描 |

### 仅日期选择（DatePicker）

```html
<div class="sw-datepicker" id="dp1" data-open="false">
  <div class="sw-datepicker__input" role="button" aria-haspopup="true" aria-expanded="false">
    <span class="sw-datepicker__input-text sw-datepicker__input-text--placeholder" id="dp1-text">请选择日期</span>
    <span class="sw-datepicker__input-icon">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="18" rx="3" stroke="currentColor" stroke-width="2"/>
        <path d="M3 9h18" stroke="currentColor" stroke-width="2"/>
        <path d="M8 2v4M16 2v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </span>
  </div>
  <div class="sw-datepicker__panel" id="dp1-panel">
    <div class="sw-cal" id="dp1-cal" data-mode="single"></div>
    <div class="sw-datepicker__footer">
      <button class="sw-datepicker__footer-link" data-dp-today="dp1">今天</button>
      <button class="sw-btn sw-btn--primary sw-btn--sm" data-dp-ok="dp1">确定</button>
    </div>
  </div>
</div>
```

### 日期范围选择（DateRangePicker）

```html
<div class="sw-datepicker" id="drp1" data-open="false">
  <div class="sw-datepicker__input" role="button" aria-haspopup="true" aria-expanded="false">
    <span class="sw-datepicker__input-text sw-datepicker__input-text--placeholder" id="drp1-start">开始日期</span>
    <span class="sw-datepicker__input-sep">→</span>
    <span class="sw-datepicker__input-text sw-datepicker__input-text--placeholder" id="drp1-end">结束日期</span>
    <span class="sw-datepicker__input-icon">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="18" rx="3" stroke="currentColor" stroke-width="2"/>
        <path d="M3 9h18" stroke="currentColor" stroke-width="2"/>
        <path d="M8 2v4M16 2v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </span>
  </div>
  <div class="sw-datepicker__panel sw-datepicker__panel--range" id="drp1-panel">
    <div class="sw-cal" id="drp1-cal-l" data-mode="range-left"></div>
    <div class="sw-cal" id="drp1-cal-r" data-mode="range-right"></div>
  </div>
</div>
```

### 时分秒选择（TimePicker，默认）

```html
<div class="sw-timepicker" id="tp1" data-open="false">
  <div class="sw-timepicker__input" role="button" aria-haspopup="true" aria-expanded="false">
    <span class="sw-timepicker__input-text sw-timepicker__input-text--placeholder" id="tp1-text">请选择时间</span>
    <span class="sw-timepicker__input-icon">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
        <path d="M12 7v5l3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </span>
  </div>
  <div class="sw-timepicker__panel" id="tp1-panel">
    <div class="sw-timepicker__columns" id="tp1-cols"></div>
    <div class="sw-timepicker__footer">
      <button class="sw-timepicker__now" data-tp-now="tp1">此刻</button>
      <button class="sw-timepicker__ok" data-tp-ok="tp1">确 定</button>
    </div>
  </div>
</div>
```

### 仅时分选择（TimePicker HH:mm）

在 `sw-timepicker` 上加 `data-tp-mode="hm"`，JS 自动识别，只渲染时/分两列，输出格式 `HH:mm`。

```html
<div class="sw-timepicker" id="tp2" data-open="false" data-tp-mode="hm">
  <div class="sw-timepicker__input" role="button" aria-haspopup="true" aria-expanded="false">
    <span class="sw-timepicker__input-text sw-timepicker__input-text--placeholder" id="tp2-text">请选择时间</span>
    <span class="sw-timepicker__input-icon">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
        <path d="M12 7v5l3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </span>
  </div>
  <div class="sw-timepicker__panel" id="tp2-panel">
    <div class="sw-timepicker__columns" id="tp2-cols"></div>
    <div class="sw-timepicker__footer">
      <button class="sw-timepicker__now" data-tp-now="tp2">此刻</button>
      <button class="sw-timepicker__ok" data-tp-ok="tp2">确 定</button>
    </div>
  </div>
</div>
```

### 时间范围选择（TimeRangePicker）

`data-tr-mode="hm"` 时仅时分（输出 `HH:mm`），省略则时分秒（输出 `HH:mm:ss`）。

```html
<div class="sw-timerange" id="tr1" data-open="false" data-tr-mode="hm">
  <div class="sw-timerange__input" role="button" aria-haspopup="true" aria-expanded="false">
    <span class="sw-timerange__text sw-timerange__text--placeholder" id="tr1-start">开始时间</span>
    <span class="sw-timerange__sep">→</span>
    <span class="sw-timerange__text sw-timerange__text--placeholder" id="tr1-end">结束时间</span>
    <span class="sw-timerange__icon">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
        <path d="M12 7v5l3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </span>
  </div>
  <div class="sw-timerange__panel">
    <div class="sw-timerange__pickers">
      <div class="sw-timerange__side">
        <div class="sw-timerange__side-label">开始时间</div>
        <div class="sw-timepicker__columns"></div>
      </div>
      <div class="sw-timerange__side">
        <div class="sw-timerange__side-label">结束时间</div>
        <div class="sw-timepicker__columns"></div>
      </div>
    </div>
    <div class="sw-timerange__footer">
      <button class="sw-timerange__now" data-tr-now>此刻</button>
      <button class="sw-timerange__ok" data-tr-ok>确 定</button>
    </div>
  </div>
</div>
```

**关键 class / data 属性说明：**

| 属性 | 说明 |
|------|------|
| `id="tr1"` | 必须有 id，JS 通过 id 查找 start/end 文本元素 |
| `id="tr1-start"` / `id="tr1-end"` | 显示选中时间的文本节点，id = `{组件id}-start` / `{组件id}-end` |
| `data-tr-mode="hm"` | 仅时分模式，省略则时分秒 |
| `data-tr-now` | 此刻快捷按钮 |
| `data-tr-ok` | 确定按钮 |
| `.sw-timerange__side:first-child .sw-timepicker__columns` | 开始时间列容器，JS 自动填充 |
| `.sw-timerange__side:last-child .sw-timepicker__columns` | 结束时间列容器，JS 自动填充 |



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


## AI 对话 AI Chat

**交互依赖**：需 `app.js`（自动高度、发送/停止、流式输出演示）。

### 变体一览

| 变体 | 说明 |
|------|------|
| `sw-chat` | 完整对话容器（消息列表 + 输入区） |
| `sw-chat__msg--user` | 用户消息（右对齐，蓝色气泡） |
| `sw-chat__msg--ai` | AI 消息（左对齐，灰色气泡） |
| `sw-chat__msg--thinking` | AI 等待状态（三点跳动动画） |
| `sw-chat__cursor` | 流式输出光标（闪烁竖线） |
| `sw-chat__send--stop` | 发送按钮变为停止按钮（响应中） |
| `sw-ai-loading` | 行内等待提示条（带旋转图标） |
| `sw-ai-progress` | 进度式等待（多步骤状态列表） |

---

### 完整对话框

```html
<!-- 需要给容器设置固定高度，例如 height: 600px -->
<div class="sw-chat" style="height: 600px;">

  <!-- 消息列表 -->
  <div class="sw-chat__messages">

    <!-- AI 消息 -->
    <div class="sw-chat__msg sw-chat__msg--ai">
      <div class="sw-chat__msg-avatar" aria-hidden="true">AI</div>
      <div class="sw-chat__msg-body">
        <div class="sw-chat__msg-name">AI 助手</div>
        <div class="sw-chat__msg-bubble">你好！有什么我可以帮你的吗？</div>
        <div class="sw-chat__msg-actions" aria-label="消息操作">
          <button class="sw-chat__msg-action" title="复制" data-chat-copy>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <rect x="9" y="9" width="13" height="13" rx="3" stroke="currentColor" stroke-width="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" stroke-width="2"/>
            </svg>
          </button>
          <button class="sw-chat__msg-action" title="重新生成" data-chat-regen>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path d="M1 4v6h6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M3.51 15a9 9 0 1 0 .49-4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- 用户消息 -->
    <div class="sw-chat__msg sw-chat__msg--user">
      <div class="sw-chat__msg-avatar" aria-hidden="true">我</div>
      <div class="sw-chat__msg-body">
        <div class="sw-chat__msg-name">你</div>
        <div class="sw-chat__msg-bubble">帮我分析一下这份数据报告的关键问题。</div>
      </div>
    </div>

    <!-- AI 等待状态（三点跳动） -->
    <div class="sw-chat__msg sw-chat__msg--ai sw-chat__msg--thinking">
      <div class="sw-chat__msg-avatar" aria-hidden="true">AI</div>
      <div class="sw-chat__msg-body">
        <div class="sw-chat__msg-name">AI 助手</div>
        <div class="sw-chat__msg-bubble" aria-label="AI 正在思考">
          <span class="sw-chat__thinking-dot"></span>
          <span class="sw-chat__thinking-dot"></span>
          <span class="sw-chat__thinking-dot"></span>
        </div>
      </div>
    </div>

    <!-- AI 流式输出中（带光标） -->
    <div class="sw-chat__msg sw-chat__msg--ai">
      <div class="sw-chat__msg-avatar" aria-hidden="true">AI</div>
      <div class="sw-chat__msg-body">
        <div class="sw-chat__msg-name">AI 助手</div>
        <div class="sw-chat__msg-bubble">
          好的，我来帮你分析……<span class="sw-chat__cursor" aria-hidden="true"></span>
        </div>
      </div>
    </div>

  </div>

  <!-- 输入区 -->
  <div class="sw-chat__input-area">

    <!-- 工具栏（可选） -->
    <div class="sw-chat__toolbar">
      <button class="sw-chat__tool-btn sw-chat__tool-btn--active">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
          <path d="M12 8v4l3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        深度思考
      </button>
      <button class="sw-chat__tool-btn">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
        </svg>
        联网搜索
      </button>
    </div>

    <!-- 输入行 -->
    <div class="sw-chat__input-row">
      <textarea
        class="sw-chat__textarea"
        placeholder="输入消息，Enter 发送，Shift+Enter 换行"
        rows="1"
        aria-label="消息输入框"
      ></textarea>

      <!-- 发送按钮（正常态） -->
      <button class="sw-chat__send" title="发送" aria-label="发送消息" data-empty="true" disabled>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M22 2L11 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M22 2L15 22l-4-9-9-4 20-7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>

    <!-- 状态栏（可选） -->
    <div class="sw-chat__status">
      <span class="sw-chat__status-hint">
        <kbd style="font-size:10px;padding:1px 4px;border:1px solid var(--sw-border);border-radius:4px;">Enter</kbd>
        发送 &nbsp;·&nbsp;
        <kbd style="font-size:10px;padding:1px 4px;border:1px solid var(--sw-border);border-radius:4px;">Shift+Enter</kbd>
        换行
      </span>
      <span><span data-chat-count>0</span> 字</span>
    </div>

  </div>
</div>
```

---

### 发送按钮：响应中（停止态）

AI 响应期间，`app.js` 会自动切换按钮样式。如需手动展示停止态：

```html
<!-- 停止按钮（响应中） -->
<button class="sw-chat__send sw-chat__send--stop" title="停止生成" aria-label="停止生成">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <rect x="5" y="5" width="14" height="14" rx="3" fill="currentColor"/>
  </svg>
</button>
```

---

### 行内等待提示条（sw-ai-loading）

适用于页面内嵌的 AI 处理等待提示，不依赖完整对话容器。

```html
<div class="sw-ai-loading" role="status" aria-live="polite">
  <div class="sw-ai-loading__spinner" aria-hidden="true"></div>
  AI 正在分析数据，请稍候…
</div>
```

---

### 进度式等待（sw-ai-progress）

适用于多步骤 AI 任务（如：检索 → 分析 → 生成），展示当前执行阶段。

```html
<div class="sw-ai-progress" role="status" aria-live="polite">

  <!-- 已完成步骤 -->
  <div class="sw-ai-progress__step sw-ai-progress__step--done">
    <div class="sw-ai-progress__step-icon" aria-hidden="true">✓</div>
    <div class="sw-ai-progress__step-label">检索相关文档</div>
  </div>

  <!-- 进行中步骤（旋转图标由 CSS 自动渲染） -->
  <div class="sw-ai-progress__step sw-ai-progress__step--active">
    <div class="sw-ai-progress__step-icon" aria-hidden="true"></div>
    <div class="sw-ai-progress__step-label">分析数据内容…</div>
  </div>

  <!-- 待执行步骤 -->
  <div class="sw-ai-progress__step sw-ai-progress__step--pending">
    <div class="sw-ai-progress__step-icon" aria-hidden="true">○</div>
    <div class="sw-ai-progress__step-label">生成最终报告</div>
  </div>

</div>
```

---

### class 速查

| class | 说明 |
|-------|------|
| `sw-chat` | 对话容器，需设置固定高度 |
| `sw-chat__messages` | 消息滚动区，`flex-direction: column` |
| `sw-chat__msg` | 单条消息行 |
| `sw-chat__msg--user` | 用户消息（右对齐） |
| `sw-chat__msg--ai` | AI 消息（左对齐） |
| `sw-chat__msg--thinking` | 等待气泡（三点动画） |
| `sw-chat__msg-avatar` | 头像圆圈 |
| `sw-chat__msg-bubble` | 消息气泡内容 |
| `sw-chat__msg-actions` | 气泡下方操作栏（hover 显示） |
| `sw-chat__msg-action` | 单个操作按钮（复制、重新生成等） |
| `sw-chat__thinking-dot` | 三点等待动画中的单个圆点 |
| `sw-chat__cursor` | 流式输出闪烁光标 |
| `sw-chat__input-area` | 底部输入区容器 |
| `sw-chat__toolbar` | 工具栏（深度思考、联网等功能按钮） |
| `sw-chat__tool-btn` | 工具栏按钮 |
| `sw-chat__tool-btn--active` | 工具栏按钮激活态 |
| `sw-chat__input-row` | 文本框 + 发送按钮的行容器 |
| `sw-chat__textarea` | 自动高度文本输入框 |
| `sw-chat__send` | 发送按钮 |
| `sw-chat__send--stop` | 停止按钮（响应中） |
| `sw-chat__status` | 底部状态栏（字数、快捷键提示） |
| `sw-ai-loading` | 行内旋转等待提示条 |
| `sw-ai-loading__spinner` | 旋转加载图标 |
| `sw-ai-progress` | 多步骤进度等待容器 |
| `sw-ai-progress__step` | 单个步骤行 |
| `sw-ai-progress__step--done` | 步骤：已完成（绿色 ✓，文字划线） |
| `sw-ai-progress__step--active` | 步骤：进行中（蓝色旋转图标，加粗文字） |
| `sw-ai-progress__step--pending` | 步骤：待执行（灰色） |

### 交互依赖说明

| 功能 | 依赖 |
|------|------|
| 自动高度（textarea 随内容增长） | `app.js` → `initAIChat()` |
| 空内容禁用发送按钮 | `app.js` → `initAIChat()` |
| Enter 发送 / Shift+Enter 换行 | `app.js` → `initAIChat()` |
| 三点等待动画 → 流式输出演示 | `app.js` → `initAIChat()` |
| 发送按钮 ↔ 停止按钮切换 | `app.js` → `initAIChat()` |
| 复制消息内容 | `app.js` → `initAIChat()` |
| 重新生成 | `app.js` → `initAIChat()` |
| 旋转加载图标（sw-ai-loading） | 纯 CSS，无需 JS |
| 进度步骤状态（sw-ai-progress） | 纯 CSS，状态切换由业务代码控制 |


## 页签导航 PageTabs

**场景**：点击侧边菜单或导航项时，在内容区顶部动态追加新标签页（类似浏览器多标签）。每个 tab 带刷新图标，激活 tab 额外显示关闭按钮。

**交互依赖**：需 `app.js`（`initPageTabs()` 自动初始化，无需手动调用）。

### 变体一览

| class / 属性 | 说明 |
|---|---|
| `sw-pagetabs` | 页签栏容器，横向滚动，底部有分割线 |
| `sw-pagetab` | 单个页签，`aria-selected="true"` 为激活态 |
| `sw-pagetab--new` | 新追加时的入场动画 class（JS 自动添加） |
| `sw-pagetab__label` | 页签标题文字 |
| `sw-pagetab__refresh` | 刷新图标按钮（每个 tab 都有） |
| `sw-pagetab__close` | 关闭按钮（仅激活 tab 显示） |
| `data-pagetab-open="标题"` | 触发器属性，点击后向 `sw-pagetabs` 追加同名 tab |
| `data-pagetab-target="barId"` | 可选，指定追加到哪个 `sw-pagetabs`（多栏场景） |

---

### 静态 HTML 结构

```html
<!-- 页签栏（放在内容区顶部，sw-content 内或 sw-header 下方） -->
<div class="sw-pagetabs" id="mainPageTabs" role="tablist" aria-label="页签导航">

  <!-- 固定首页 tab（不可关闭，无关闭按钮） -->
  <div class="sw-pagetab" aria-selected="true" role="tab">
    <span class="sw-pagetab__label">发布中心</span>
    <button class="sw-pagetab__refresh" title="刷新" aria-label="刷新 发布中心">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
        <path d="M1 4v6h6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M3.51 15a9 9 0 1 0 .49-4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>
    <!-- 首页不放 sw-pagetab__close，使其不可关闭 -->
  </div>

  <!-- 普通 tab（可关闭） -->
  <div class="sw-pagetab" aria-selected="false" role="tab">
    <span class="sw-pagetab__label">全部内容</span>
    <button class="sw-pagetab__refresh" title="刷新" aria-label="刷新 全部内容">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
        <path d="M1 4v6h6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M3.51 15a9 9 0 1 0 .49-4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>
    <button class="sw-pagetab__close" title="关闭" aria-label="关闭 全部内容">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
        <path d="M7 7l10 10M17 7L7 17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>
  </div>

  <!-- 激活态 tab（蓝色文字 + 关闭按钮可见） -->
  <div class="sw-pagetab" aria-selected="true" role="tab">
    <span class="sw-pagetab__label">频道管理</span>
    <button class="sw-pagetab__refresh" title="刷新" aria-label="刷新 频道管理">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
        <path d="M1 4v6h6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M3.51 15a9 9 0 1 0 .49-4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>
    <button class="sw-pagetab__close" title="关闭" aria-label="关闭 频道管理">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
        <path d="M7 7l10 10M17 7L7 17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>
  </div>

</div>
```

---

### 动态追加 tab（菜单项触发）

给任意菜单项或按钮加 `data-pagetab-open="页面名称"` 属性，点击后自动追加新 tab。若同名 tab 已存在则直接激活，不重复追加。

```html
<!-- 侧边菜单项：点击追加新 tab -->
<div class="sw-menu__item" data-pagetab-open="订单管理" data-pagetab-target="mainPageTabs">
  订单管理
</div>
<div class="sw-menu__item" data-pagetab-open="商品列表" data-pagetab-target="mainPageTabs">
  商品列表
</div>

<!-- 普通按钮也可触发 -->
<button class="sw-btn" data-pagetab-open="数据报表" data-pagetab-target="mainPageTabs">
  打开报表
</button>
```

---

### 与 Shell 布局结合的完整示例

```html
<div class="sw-shell" data-sider-open="false">
  <aside class="sw-sider">
    <!-- 侧边菜单，菜单项加 data-pagetab-open -->
    <nav class="sw-menu">
      <div class="sw-menu__item" aria-current="page" data-pagetab-open="发布中心" data-pagetab-target="mainPageTabs">发布中心</div>
      <div class="sw-menu__item" data-pagetab-open="全部内容" data-pagetab-target="mainPageTabs">全部内容</div>
      <div class="sw-menu__item" data-pagetab-open="频道管理" data-pagetab-target="mainPageTabs">频道管理</div>
    </nav>
  </aside>
  <main class="sw-main">
    <header class="sw-header">...</header>

    <!-- 页签栏紧贴 header 下方，在 sw-content 之前 -->
    <div class="sw-pagetabs" id="mainPageTabs" role="tablist">
      <div class="sw-pagetab" aria-selected="true" role="tab">
        <span class="sw-pagetab__label">发布中心</span>
        <button class="sw-pagetab__refresh" title="刷新" aria-label="刷新">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M1 4v6h6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.51 15a9 9 0 1 0 .49-4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        </button>
      </div>
    </div>

    <section class="sw-content">
      <div class="sw-page">
        <!-- 页面内容 -->
      </div>
    </section>
  </main>
</div>
```

---

### 交互行为说明

| 操作 | 行为 |
|------|------|
| 点击 tab 主体 | 激活该 tab（蓝色文字，底部白色融合线） |
| 点击刷新图标 | 图标旋转 0.6s（业务自行监听后接入刷新逻辑） |
| 点击关闭按钮 | 移除 tab，自动激活右侧相邻 tab，无则激活左侧 |
| 最后一个 tab | 不可关闭（`closeTab` 内部保护） |
| 点击 `data-pagetab-open` 触发器 | 追加新 tab 并激活；同名已存在则直接激活 |
| 新 tab 入场 | `sw-pagetab--new` 触发 180ms 滑入动画 |
