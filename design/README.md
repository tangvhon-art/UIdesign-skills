# sw-ui（Ant Design Pro 风格）通用化组件库（40+ 组件）

本目录提供一套 **不依赖框架** 的 UI 组件样式与交互脚本，视觉语义对齐 Ant Design Pro 的常见中后台风格（密度、圆角、灰阶层级、阴影、交互反馈）。

## 预览

打开 `design/index.html` 即可预览全部组件与模板组合。

## 文件结构

- `index.html`：组件展示/模板预览页
- `styles/tokens.css`：设计令牌（颜色/圆角/阴影/间距/字体）+ 暗色主题
- `styles/base.css`：布局壳（侧边栏/顶部栏/内容区）+ 基础样式
- `styles/components.css`：通用组件（Button / Input / Select / Table / Tabs / Modal / Drawer / Toast / Timeline / Tree / Collapse / List / Upload / Rate / Transfer / Segmented / Statistic ...）
- `scripts/app.js`：预览页交互（Select、Tabs、Modal、Drawer、Toast、Collapse、Tree、Segmented、Rate、Transfer、Popover ...）

## 组件清单 (40+)

**通用**: Button (6 variants + 3 sizes), IconButton
**布局**: Shell, Sider, Header, Breadcrumb, Grid (12 cols)
**导航**: Menu, Dropdown, Tabs, Steps
**数据录入**: Input, Textarea, Select, Checkbox, Radio, Switch, Segmented, Upload, Rate, Transfer
**数据展示**: Table, Pagination, Tag, Badge, Avatar, AvatarGroup, Timeline, Tree, Collapse, List, Descriptions, Statistic, StatCard, Card, KPI, Banner, Empty, Skeleton, Progress, DotStatus
**反馈**: Alert, Toast, Modal, Drawer, Result, Spin, NoticeBar, Popover, Tooltip

## 快速复用（复制即可用）

在你的页面中按顺序引入：

```html
<link rel="stylesheet" href="./styles/tokens.css" />
<link rel="stylesheet" href="./styles/base.css" />
<link rel="stylesheet" href="./styles/components.css" />
<script src="./scripts/app.js"></script>
```

然后复制 `index.html` 中对应组件区块到你的项目即可。

## 主题切换

```js
document.documentElement.setAttribute('data-theme', 'light'); // 亮色
document.documentElement.setAttribute('data-theme', 'dark');  // 暗色
```

