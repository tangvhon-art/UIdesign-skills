---
name: ui-design
description: sw-ui component library for enterprise admin dashboards. Pure HTML+CSS+JS, Ant Design Pro style, zero dependencies. Use when building admin pages, management systems, dashboards, forms, tables, or any enterprise UI. Provides exact class names and copy-paste HTML snippets for buttons, cards, forms, tables, modals, drawers, alerts, navigation, and more.
metadata:
  author: UI Design Team
  version: "1.0.0"
---

# sw-ui 企业级组件库

框架无关 · 零依赖 · Ant Design Pro 风格 · 支持亮色/暗色主题

## 使用前必读

**第一步：确认平台**
- PC 端（中后台/管理系统）→ 使用本规范
- 移动端（H5/小程序）→ 不适用本规范，改用移动端方案

**第二步：读取参考文件**

| 需求 | 读取文件 |
|------|---------|
| 查找组件 HTML 结构和 class 名 | `references/component-classes.md` |
| 查找 CSS 变量（颜色/间距/阴影） | `references/design-tokens.md` |

**第三步：直接复制代码**
`references/component-classes.md` 中每个组件都有完整可用的 HTML 片段，直接复制，不要自己编写 class 名。

---

## 页面初始化模板

每个页面必须按此顺序引入，缺一不可：

```html
<!doctype html>
<html lang="zh-CN" data-theme="light">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>页面标题</title>
  <link rel="stylesheet" href="./styles/tokens.css" />
  <link rel="stylesheet" href="./styles/base.css" />
  <link rel="stylesheet" href="./styles/components.css" />
</head>
<body>
  <!-- 页面内容 -->
  <script src="./scripts/app.js"></script>
</body>
</html>
```

切换暗色主题：将 `<html data-theme="light">` 改为 `<html data-theme="dark">`

---

## 文件结构（每个业务系统完整复制）

```
业务系统/
├── index.html
├── styles/
│   ├── tokens.css       ← 完整复制，禁止修改
│   ├── base.css         ← 完整复制，禁止修改
│   └── components.css   ← 完整复制，禁止修改
└── scripts/
    └── app.js           ← 完整复制，禁止修改
```

业务自定义样式写在单独的 `styles/custom.css` 中，不覆盖上述四个文件。

---

## 组件速查索引

按需求关键词快速定位 → 在 `references/component-classes.md` 中找对应章节：

| 需求关键词 | 组件章节 |
|-----------|---------|
| 整体页面框架、侧边栏、顶部栏 | `## 布局 Shell` |
| 栅格、列、行排列 | `## 栅格 Grid` |
| 卡片、面板、容器 | `## 卡片 Card` |
| 按钮、操作、提交、新增、删除 | `## 按钮 Button` |
| 输入框、文本域、搜索框 | `## 输入 Input` |
| 下拉选择、Select | `## 下拉选择 Select` |
| 复选框、单选框、开关 | `## 选择控件 Checkbox/Radio/Switch` |
| 标签、状态标记、徽标、头像 | `## 标签 Tag / 徽标 Badge / 头像 Avatar` |
| 侧边菜单、导航菜单、垂直菜单 | `## 菜单 Menu` → 垂直菜单 |
| 顶部导航栏、水平菜单 | `## 菜单 Menu` → 水平菜单（`sw-menu--horizontal`） |
| 顶部导航下拉、悬浮子菜单、树形导航 | `## 菜单 Menu` → 水平菜单 + 悬浮下拉子菜单（`sw-menu__item--has-sub`） |
| 子菜单、可展开菜单 | `## 菜单 Menu` → 可展开父菜单项（`aria-expanded`） |
| 日期选择、日历 | `## 日期时间选择器` → 仅日期选择（DatePicker） |
| 日期范围、起止日期 | `## 日期时间选择器` → 日期范围选择（DateRangePicker） |
| 时间选择、时分秒 | `## 日期时间选择器` → 时分秒选择（TimePicker） |
| 仅时分、HH:mm | `## 日期时间选择器` → 仅时分选择（`data-tp-mode="hm"`） |
| 时间范围、开始结束时间 | `## 日期时间选择器` → 时间范围选择（TimeRangePicker） |
| 标签页、Tab 切换 | `## 标签页 Tabs` |
| 分段控制器、视图切换 | `## 分段控制器 Segmented` |
| 表格、列表数据、行列 | `## 表格 Table` |
| 分页 | `## 分页 Pagination` |
| 进度条 | `## 进度条 Progress` |
| 步骤条、流程 | `## 步骤条 Steps` |
| 数据统计、KPI 卡片 | `## 数据统计 KPI / Statistic` |
| 详情描述、字段展示 | `## 描述列表 Descriptions` |
| 时间轴、操作记录 | `## 时间轴 Timeline` |
| 列表、信息流 | `## 列表 List` |
| 树形结构、层级 | `## 树形 Tree` |
| 提示条、警告、成功/错误提示 | `## 提示 Alert` |
| 弹窗、确认框、对话框 | `## 弹窗 Modal` |
| 抽屉、侧滑面板 | `## 抽屉 Drawer` |
| 消息通知、Toast | `## 消息通知 Toast` |
| 折叠面板、手风琴 | `## 折叠面板 Collapse` |
| 空状态、无数据 | `## 空状态 Empty` |
| 骨架屏、加载占位 | `## 骨架屏 Skeleton` |
| 横幅、宣传区块 | `## 横幅 Banner` |
| 文件上传 | `## 上传 Upload` |
| 分割线 | `## 分割线 Divider` |
| 下拉菜单、用户菜单 | `## 下拉菜单 Dropdown` |
| 标题、正文、文本样式 | `## 排版 Typography` |
| CSS 颜色变量、间距变量 | `references/design-tokens.md` |

---

## 强制规则

1. **class 名必须从 `references/component-classes.md` 中复制**，不得自行命名
2. **四个核心文件（tokens/base/components/app.js）禁止修改**
3. **交互组件**（Modal、Drawer、Select、Switch、Tabs、Toast 等）依赖 `app.js`，必须引入
4. **需要 JS 交互的组件**必须保留对应的 `id` 或 `data-*` 属性，否则交互失效：
   - Modal：`id="swModalOverlay"` / `id="swCloseModal"` / `id="swOkModal"`
   - Drawer：`id="swDrawer"` / `id="swCloseDrawer"`
   - Select：`data-open="false"` 属性
   - Switch：`role="switch"` + `aria-checked` 属性
   - Tabs：`data-tab` + `data-tabpanel` + `data-tabs-root` 属性
   - Collapse：`data-open="false"` 属性
   - Toast：页面需有 `<div class="sw-toasts"></div>` 容器
   - DatePicker（单日期）：`id="dp1"`，内部 `id="dp1-text"` / `id="dp1-cal"` / `data-dp-today` / `data-dp-ok`
   - DateRangePicker：`id="drp1"`，内部 `id="drp1-start"` / `id="drp1-end"` / `id="drp1-cal-l"` / `id="drp1-cal-r"`
   - TimePicker（时分秒）：`id="tp1"`，内部 `id="tp1-text"` / `id="tp1-cols"` / `data-tp-now` / `data-tp-ok`
   - TimePicker（仅时分）：在 `sw-timepicker` 上加 `data-tp-mode="hm"`，id 自定义（如 `id="tp2"`），内部 `id="{id}-text"` / `id="{id}-cols"`
   - TimeRangePicker：`id` 自定义（如 `id="tr1"`），内部 `id="tr1-start"` / `id="tr1-end"`，`data-tr-mode="hm"` 可选，`data-tr-now` / `data-tr-ok`
   - 水平菜单下拉：父菜单项加 `sw-menu__item--has-sub`，内部放 `.sw-menu__dropdown`，纯 CSS hover 驱动，无需额外 id
