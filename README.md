# 原型设计与前端开发规范（UIdesign Skills）

## 🚀 快速开始

### 作为可安装的Skill（推荐）
```bash
# 1. 克隆并安装
git clone <repository-url> UIdesign-skills
cd UIdesign-skills

# 2. 一键安装
python3 install.py

# 3. 验证安装
python3 update-skills-json.py
```

安装完成后，AI助手会在UI设计任务中**自动调用此技能**。

### 直接使用
```bash
# 可视化浏览所有组件
open design/index.html

# 查看组件代码
cat design/index.html | grep -A 20 "card"
```

---

## 项目概述

本项目提供一套**框架无关的 UI 组件库**与**前端开发规范**，用于统一所有业务系统的设计与开发标准。视觉语义对齐 **Ant Design Pro** 的中后台风格，支持亮色/暗色主题一键切换。

> **核心原则：** 全量复制组件库 → 直接复制组件代码使用 → 零修改、零二次开发。保证所有系统界面、交互、代码风格完全统一。

---

## 目录结构

```
├─ README.md                  # 本文件：项目总览与使用指南
├─ SKILL.md                   # Skill 定义文件（规范核心文档）
│
├─ design/                    # 公共组件库（原样保留，禁止修改）
│  ├─ README.md               # 组件库使用说明
│  ├─ index.html              # 组件预览页（打开即可浏览全部组件）
│  │
│  ├─ styles/
│  │  ├─ tokens.css           # 设计令牌（色彩/间距/阴影/字体/动画）
│  │  ├─ base.css             # 基础样式 + Shell 布局（侧边栏/顶栏/内容区）
│  │  └─ components.css       # 40+ 通用组件样式
│  │
│  └─ scripts/
│     └─ app.js               # 组件公共交互逻辑（预览页用）
│
└─ project/               # 你的业务代码放在这里（仅复制组件使用）
     ├─ styles/             #组件样式（主样式，及各模块样式）
     │  ├─ order.css
     │  ├─ list.css
     │  └─ base.css   
     └─ scripts/            #组件交互逻辑（主交互，及各模块交互）
     │  ├─ order.css
     │  ├─ list.css
     │  └─ app.js  
     └─template             #页面视图（放入各模块的视图文件）
     │  ├─ order            #订单页面文件夹（放入订单各页面视图）
     │  └─ product          #订单页面文件夹（放入商品各页面视图）
     └─ index.html          #主视图html
```

**关键约束：**
- `design/` 目录是公共组件库，**禁止修改**其中的任何文件
- 业务代码在 `design/` 同级或外层独立目录存放
- 保留 `design/` 的完整目录结构和所有文件

---

## 快速开始

### 1. 预览组件

直接在浏览器中打开 `design/index.html`，即可预览全部 40+ 组件与模板组合。

### 2. 在页面中引入组件库

```html
<!-- 按顺序引入三个 CSS 文件 -->
<link rel="stylesheet" href="./styles/tokens.css" />
<link rel="stylesheet" href="./styles/base.css" />
<link rel="stylesheet" href="./styles/components.css" />

<!-- 公共交互脚本（可选，按需引入） -->
<script src="./scripts/app.js"></script>
```

### 3. 复制组件代码

从 `design/index.html` 中找到所需组件，直接复制其 DOM 结构到你的页面：

```html
<!-- 示例：复制一个 Card 组件 -->
<div class="sw-card">
  <div class="sw-card__hd">
    <h2 class="sw-h2">卡片标题</h2>
  </div>
  <div class="sw-card__bd">
    <p class="sw-desc">卡片内容</p>
  </div>
</div>
```

> ⚠️ **仅允许修改：** 文本内容、图片地址、接口数据源
> ❌ **禁止修改：** 组件 DOM 标签结构、原生 CSS 样式、内置交互逻辑

---

## 设计规范

### 设计令牌（Design Tokens）

所有视觉属性通过 CSS 自定义属性（变量）统一管理，定义在 `tokens.css` 中：

| Token | 默认值 | 说明 |
|-------|--------|------|
| `--sw-primary` | `#1677ff` | 主题色（Ant Design 5 基准蓝） |
| `--sw-primary-hover` | `#4096ff` | 主题色悬停态 |
| `--sw-primary-active` | `#0958d9` | 主题色激活态 |
| `--sw-success` | `#52c41a` | 成功色 |
| `--sw-warning` | `#faad14` | 警告色 |
| `--sw-error` | `#ff4d4f` | 错误色 |
| `--sw-info` | `#1677ff` | 信息色 |
| `--sw-text` | `rgba(0,0,0,.88)` | 主文本色 |
| `--sw-text-secondary` | `rgba(0,0,0,.65)` | 次要文本色 |
| `--sw-text-tertiary` | `rgba(0,0,0,.45)` | 辅助文本色 |
| `--sw-bg` | `#f5f5f5` | 背景色 |
| `--sw-bg-elevated` | `#ffffff` | 容器背景色（卡片/弹窗等） |
| `--sw-bg-layout` | `#f0f2f5` | 页面背景色 |
| `--sw-border` | `rgba(5,5,5,.12)` | 边框色 |
| `--sw-radius` | `6px` | 标准圆角 |
| `--sw-radius-lg` | `10px` | 大圆角 |
| `--sw-shadow-2` | `0 6px 16px rgba(0,0,0,.08)` | 浮层阴影 |
| `--sw-space-md` | `16px` | 中等间距 |
| `--sw-sider-w` | `248px` | 侧边栏宽度 |
| `--sw-header-h` | `56px` | 顶部栏高度 |

### 字体

```css
--sw-font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
  "Helvetica Neue", Arial, "PingFang SC", "Microsoft YaHei",
  "Noto Sans CJK SC", sans-serif;
--sw-font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
```

### 阴影层级

| 变量 | 使用场景 |
|------|----------|
| `--sw-shadow-1` | 卡片、小型容器 |
| `--sw-shadow-2` | 下拉菜单、Popover、Select 面板 |
| `--sw-shadow-3` | Modal、Drawer |

### 间距体系

```
2xs(4px) → xs(8px) → sm(12px) → md(16px) → lg(24px) → xl(32px) → 2xl(48px)
```

---

## 组件清单（40+）

### 通用
| 组件 | CSS 类名 | 说明 |
|------|----------|------|
| Button | `.sw-btn` | 6 变体（primary / default / ghost / link / danger / disabled），3 尺寸（sm / md / lg）  字体单行显示：white-space: nowrap;|
| IconButton | `.sw-iconbtn` | 纯图标按钮，用于工具栏、关闭等 |

### 布局
| 组件 | CSS 类名 | 说明 |
|------|----------|------|
| Shell | `.sw-shell` | 整体布局容器，无样式仅语义 |
| Sider | `.sw-sider` | 固定侧边栏，移动端抽屉化 |
| Header | `.sw-header` | 顶部栏，sticky 吸顶 |
| Breadcrumb | `.sw-breadcrumb` | 面包屑导航 |
| Grid | `.sw-grid` | 12 列栅格系统，响应式断点 1200px / 700px |

### 导航
| 组件 | CSS 类名 | 说明 |
|------|----------|------|
| Menu | `.sw-menu` | 垂直菜单，支持分组、激活态 |
| Dropdown | `.sw-dd` | 下拉菜单，JS 控制开关 |
| Tabs | `.sw-tabs` / `.sw-tab` | 标签页，圆角 pills 样式 |
| Steps | `.sw-steps` / `.sw-step` | 步骤条 |

### 数据录入
| 组件 | CSS 类名 | 说明 |
|------|----------|------|
| Input | `.sw-input` | 文本输入框 |
| Textarea | `.sw-textarea` | 多行文本域 |
| Select | `.sw-select` | 自定义下拉选择 |
| Checkbox | `.sw-check` / `.sw-box` | 复选框 |
| Radio | `.sw-check` / `.sw-dot` | 单选框 |
| Switch | `.sw-switch` | 开关切换 |
| Segmented | `.sw-segmented` | 分段控制器 |
| Upload | `.sw-upload` | 上传组件（拖拽区 + 文件列表） |
| Rate | `.sw-rate` | 评分组件 |
| Transfer | `.sw-transfer` | 穿梭框 |
| DatePicker | `.sw-datepicker` | 日期选择 |
| TimePicker | `.sw-timepicker` | 时间选择（时分秒滚动列） |

### 数据展示
| 组件 | CSS 类名 | 说明 |
|------|----------|------|
| Table | `.sw-table` | 数据表格，hover 高亮行 |
| Pagination | `.sw-pagination` / `.sw-pagebtn` | 分页器 |
| Tag | `.sw-tag` | 标签（blue/green/gold/red 变体） |
| Badge | `.sw-badge` | 徽标（红点/数字） |
| Avatar | `.sw-avatar` | 头像 |
| AvatarGroup | `.sw-avatar-group` | 头像组 |
| Timeline | `.sw-timeline` | 时间轴 |
| Tree | `.sw-tree` | 树形控件 |
| Collapse | `.sw-collapse` | 折叠面板 |
| List | `.sw-list` | 列表 |
| Descriptions | `.sw-descriptions` | 描述列表 |
| Statistic | `.sw-statistic` | 统计数值 |
| StatCard | `.sw-statcard` | 统计卡片（Dashboard） |
| Card | `.sw-card` | 通用卡片（header / body / footer） |
| KPI | `.sw-kpi` | KPI 指标（标签 + 数值 + 趋势） |
| Banner | `.sw-banner` | 横幅（渐变背景，4 种配色） |
| Empty | `.sw-empty` | 空状态 |
| Skeleton | `.sw-skeleton` | 骨架屏加载 |
| Progress | `.sw-progress` | 进度条 |
| DotStatus | `.sw-dot-status` | 状态指示点（success/error/warning/info/processing） |

### 反馈
| 组件 | CSS 类名 | 说明 |
|------|----------|------|
| Alert | `.sw-alert` | 提示条（info/success/warning/error） |
| Toast | `.sw-toast` | 消息通知（右上角弹出） |
| Modal | `.sw-modal` | 弹窗（带入场动画） |
| Drawer | `.sw-drawer` | 抽屉（右侧滑入） |
| Result | `.sw-result` | 结果页（成功/失败等） |
| Spin | `.sw-spin` | 加载中（3 尺寸 + overlay 模式） |
| NoticeBar | `.sw-notice` | 通知栏（info/warning/error/success） |
| Popover | `.sw-popover` | 气泡卡片 |
| Tooltip | `.sw-tooltip` | 文字提示 |

---

## 开发工作流

### 第一步：界面设计

1. 优先使用 `design/` 组件库中**已存在的组件**
2. 严格遵循组件库的**尺寸、间距、色彩、字体、交互规则**
3. 如遇到组件库不存在的组件，按照现有设计风格新增
4. **禁止**设计需要修改组件才能实现的界面效果

### 第二步：代码开发

1. 从 `design/index.html` 中**直接复制完整组件 DOM 代码**
2. 仅允许修改：文本内容、图片地址、接口数据源
3. 禁止修改：组件标签结构、原生样式、内置逻辑
4. 通用交互逻辑优先复用 `design/scripts/app.js` 中的公共方法
5. 页面样式优先复用 `design/styles/` 下全部样式文件

### 第三步：个性化定制

```
├─ 业务页面目录/
│  └─ styles/
│     └─ custom.css      # 新增自定义 CSS（禁止覆盖组件原生样式）
│  └─ scripts/
│     └─ custom.js       # 新增自定义交互逻辑（禁止修改公共组件逻辑）
```

> ✅ 允许：新增自定义 CSS、新增自定义交互逻辑
> ❌ 禁止：覆盖/篡改组件原生样式、修改公共组件库原生逻辑

---

## 主题切换

组件库原生支持亮色/暗色主题切换：

```js
// 亮色主题
document.documentElement.setAttribute('data-theme', 'light');

// 暗色主题
document.documentElement.setAttribute('data-theme', 'dark');
```

亮色与暗色主题的变量映射关系定义在 `tokens.css` 的 `html[data-theme="dark"]` 区块中。所有组件自动响应主题切换，无需额外配置。

---

## 布局系统

### Shell 布局（中后台标准）

```
┌─────────────────────────────────────┐
│  Sider (fixed)    │  Header (sticky) │
│  ┌───────────┐    │  ┌────────────┐ │
│  │ Logo      │    │  │ Breadcrumb │ │
│  ├───────────┤    │  │   UserMenu │ │
│  │ Menu      │    │  └────────────┘ │
│  │  · 概览   │    ├─────────────────┤
│  │  · 组件   │    │  Content       │
│  │  · 设置   │    │  ┌─────────┐   │
│  │           │    │  │ Page    │   │
│  │           │    │  │  · Card │   │
│  │           │    │  │  · Grid │   │
│  │           │    │  │  · ...  │   │
│  └───────────┘    │  └─────────┘   │
└─────────────────────────────────────┘
```

- 侧边栏：`position: fixed`，宽度 `--sw-sider-w: 248px`
- 主区域：`margin-left` 让出侧边栏空间
- Header：`position: sticky` 吸顶
- 移动端（<768px）：侧边栏抽屉化，遮罩层点击关闭

### 栅格系统

12 列 CSS Grid，响应式断点：
- `≥1200px`：标准 12 列
- `1200px ~ 700px`：`.sw-col-4` 变 6 列，`.sw-col-3` 变 6 列
- `<700px`：全部变 12 列

---

## 命名规范

所有组件类名采用 `sw-` 前缀，遵循 BEM 风格：

```
.sw-component                    # 组件容器
.sw-component__element           # 组件子元素（双下划线）
.sw-component--modifier          # 组件变体（双连字符）
.sw-component[data-x="true"]     # 状态通过 data 属性控制
```

---

## 核心规则（违例清单）

| 行为 | 是否允许 | 说明 |
|------|----------|------|
| 复制组件完整 DOM 到业务页面 | ✅ 允许 | 必须原样复制 |
| 修改组件内文本/图片/数据 | ✅ 允许 | 仅限业务可变数据 |
| 修改组件 DOM 结构 | ❌ 禁止 | 必须原样保留 |
| 修改组件原生 CSS | ❌ 禁止 | 包括覆盖样式 |
| 修改公共组件 JS 逻辑 | ❌ 禁止 | 包括 app.js |
| 新增自定义 CSS | ✅ 允许 | 只能新增，不能覆盖 |
| 新增自定义 JS 逻辑 | ✅ 允许 | 不能修改公共逻辑 |
| 新增设计规范 | ❌ 禁止 | 必须对齐现有规范 |
| 设计需要改组件才能实现的效果 | ❌ 禁止 | 按现有组件能力设计 |

> **违规后果：** 必须整改返工，所有设计/开发问题优先对齐 `design/` 组件库现有标准。

---

## 图标方案

组件库中使用内联 SVG 图标，无需外部图标库依赖。如需使用图标框架，推荐搭配 [Lucide](https://lucide.dev/) 或 [Ant Design Icons](https://github.com/ant-design/ant-design-icons)，SVG 颜色通过 `currentColor` 自动继承 CSS 变量。

---

## 浏览器兼容性

支持所有现代浏览器（Chrome / Firefox / Safari / Edge）。使用了以下现代 CSS 特性：
- `color-mix()` — 用于生成变体颜色
- `oklab` 色彩空间 — 用于颜色插值
- CSS Custom Properties — 设计令牌
- CSS Grid — 栅格系统
- `scroll-snap` — 时间选择器滚动吸附
- `:focus-visible` — 焦点样式

---

## 相关资源

- [预览组件](computer:///Users/tangwh/探索/UIdesign-skills/design/index.html) — 打开即可查看所有组件
- [设计令牌](design/styles/tokens.css) — 色彩/间距/阴影/字体定义
- [组件样式](design/styles/components.css) — 所有组件样式源码
- [布局样式](design/styles/base.css) — Shell 布局与栅格系统
- [规范文档](SKILL.md) — 完整的 Skill 定义与规范细则

## 作为可安装的Skill使用

本项目可以作为可安装的Skill集成到AI开发助手中，当需要创建UI界面时自动提供设计规范和组件库。

### 安装方法

#### 方法一：使用安装脚本（推荐）

```bash
# 1. 克隆项目
cd /path/to/your/projects
git clone <repository-url> UIdesign-skills
cd UIdesign-skills

# 2. 运行安装脚本
python install.py
```

#### 方法二：手动安装

1. **复制技能文件** 到agent-skills目录：
```bash
mkdir -p ~/.agent-skills/skills/development/uidesign
cp -r design/ ~/.agent-skills/skills/development/uidesign/
cp SKILL.md ~/.agent-skills/skills/development/uidesign/
cp README.md ~/.agent-skills/skills/development/uidesign/
```

2. **更新skills.json** 在 `~/.agent-skills/skills.json` 文件的 `"skills"` 数组中添加：
```json
{
  "name": "uidesign",
  "display_name": "UI Design & Frontend Standards",
  "description": "Unified design system and frontend development standards for all business systems.",
  "category": "development",
  "subcategory": null,
  "path": "skills/development/uidesign/SKILL.md",
  "install_path": "skills/development/uidesign/",
  "version": "1.0.0",
  "tags": [
    "ui-design",
    "frontend",
    "design-system",
    "component-library"
  ]
}
```

### 使用方法

安装完成后，AI助手会在以下场景自动识别并使用此技能：

1. **创建新的业务系统界面**
2. **开发统一风格的网页应用**
3. **维护公司内部系统UI一致性**
4. **快速原型设计和开发**

**示例请求：**
- "创建一个管理后台页面"
- "设计一个包含表格和表单的ERP系统界面"
- "创建一个带有侧边栏和顶部导航的仪表板"

### 技能特点

1. **自动触发** - AI助手会根据需求自动识别是否需要UI设计技能
2. **规范指导** - 提供完整的开发规范和最佳实践
3. **组件重用** - 提供可直接复用的HTML/CSS/JS组件代码
4. **一致性保障** - 确保所有系统界面风格统一

---

## 项目文件说明

| 文件 | 说明 |
|------|------|
| `SKILL.md` | 技能核心文档，包含YAML frontmatter和详细规范 |
| `skill-manifest.json` | 技能元数据文件，用于技能系统识别 |
| `install.py` / `install-skill.sh` | 安装脚本，简化安装过程 |
| `package.json` | Node.js包管理文件 |
| `design/` | 公共组件库目录（核心资产） |
| `erp/` | 示例业务系统（参考实现）
