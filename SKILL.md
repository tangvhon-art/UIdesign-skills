---
name: 原型设计与前端开发规范
description: |
  Unified design system and frontend development standards for all business systems. Follow core rules: full copy of component library to each system, direct reuse of component code with zero modification, ensuring complete UI/UX consistency.
category: development
version: 1.0.0
tags: [ui-design, frontend, design-system, component-library, development-standards]
author: "UI Design Team"
---

# 原型设计与前端开发规范（SKILL）

## 技能概述

本技能提供一套**框架无关的 UI 组件库**与**前端开发规范**，用于统一所有业务系统的设计与开发标准。视觉语义对齐 **Ant Design Pro** 的中后台风格，支持亮色/暗色主题一键切换。

> **核心原则：** 全量复制组件库 → 直接复制组件代码使用 → 零修改、零二次开发。保证所有系统界面、交互、代码风格完全统一。

## 使用场景

当需要：
- 创建新的业务系统界面
- 开发统一风格的网页应用
- 维护公司内部系统UI一致性
- 快速原型设计和开发

## 目录结构

```
├─ design/               # 公共组件库（原样保留，禁止修改）
│  ├─ index.html         # 组件库总模板（所有组件DOM结构）
│  ├─ styles/
│  │  ├─ tokens.css      # 设计令牌（色彩/间距/字体等）
│  │  ├─ base.css        # 基础样式
│  │  └─ components.css  # 组件样式
│  └─ scripts/
│     └─ app.js          # 组件公共逻辑/交互
└─ 业务页面目录/          # 业务代码（根据系统名称命名）
   ├─ styles/           # 模块样式目录
   ├─ scripts/          # 模块交互目录
   └─template/          # 页面模块html目录
```

## 3. 系统界面设计
1. 所有界面**使用 design/ 组件库已存在的组件**，如不存在的组件再按照现有的设计风格进行设计。
2. 严格遵循组件库的**尺寸、间距、色彩、字体、交互规则**，不允许新增设计规范。
3. 禁止设计需要修改组件才能实现的界面效果，。

## 4. 开发阶段（代码直接复制复用）
1. 开发业务页面时，从 design/index.html 中直接复制完整组件DOM代码，严禁删减、改动组件原生代码结构。
2. 组件仅允许修改业务可变数据，包含文本内容、图片地址、接口数据源等；组件标签结构、原生样式、内置逻辑禁止修改。
3. 通用交互逻辑（按钮点击、表单校验、数据加载、弹窗交互等）优先复用 design/scripts/app.js 公共方法。现有逻辑不满足业务需求时，可新增自定义交互逻辑，禁止修改公共组件库原生逻辑代码。
4. 页面样式优先复用 design/styles/ 下全部样式文件；业务个性化样式可新增自定义CSS，禁止编写覆盖、篡改组件原生样式的代码。
5. 按钮大小需要与文字长度自适应匹配，不允许出现文字与按钮错位或超出按钮大小显示的情况。

**代码复用示例：**
```html
<!-- 直接从 design/index.html 复制完整代码，仅替换内容 -->
<div class="ui-card">
  <h3 class="ui-title">业务标题</h3>
  <p class="ui-desc">业务描述内容</p>
  <button class="ui-btn primary">操作按钮</button>
</div>
```

# 5. 补充约束（新增强化规则）
1. 所有开发过程都必须遵守本规范，违规修改组件库结构、样式、逻辑视为不规范开发，需整改返工。
2. 对系统界面设计和代码开发的任何问题，优先参考 design/ 组件库的现有设计与实现，确保完全对齐。
3. 需要检查按钮与文字的长度是否适应，如文字超出或换行等情况，需自适应进行修复。