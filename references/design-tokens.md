# 设计令牌（Design Tokens）

完整 CSS 变量定义，引入顺序：`tokens.css` → `base.css` → `components.css`

## tokens.css — 全局 CSS 变量

```css
/* Ant Design Pro-like design tokens (framework-agnostic) */

:root{
  /* Typography */
  --sw-font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
    Arial, "Noto Sans", "Liberation Sans", "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "Noto Sans CJK SC", sans-serif;
  --sw-font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;

  --sw-text: rgba(0,0,0,.88);
  --sw-text-secondary: rgba(0,0,0,.65);
  --sw-text-tertiary: rgba(0,0,0,.45);
  --sw-text-quaternary: rgba(0,0,0,.25);
  --sw-text-inverse: rgba(255,255,255,.92);

  /* Colors (Ant Design 5 baseline) */
  --sw-primary: #1677ff;
  --sw-primary-hover: #4096ff;
  --sw-primary-active: #0958d9;
  --sw-success: #52c41a;
  --sw-warning: #faad14;
  --sw-error: #ff4d4f;
  --sw-info: #1677ff;

  --sw-bg: #f5f5f5;
  --sw-bg-elevated: #ffffff;
  --sw-bg-layout: #f0f2f5;

  --sw-border: rgba(5,5,5,.12);
  --sw-border-strong: rgba(5,5,5,.18);
  --sw-split: rgba(5,5,5,.06);

  --sw-fill: rgba(0,0,0,.04);
  --sw-fill-hover: rgba(0,0,0,.06);
  --sw-fill-active: rgba(0,0,0,.15);

  /* Sizing / spacing */
  --sw-radius-xs: 4px;
  --sw-radius: 6px;
  --sw-radius-lg: 10px;

  --sw-space-2xs: 4px;
  --sw-space-xs: 8px;
  --sw-space-sm: 12px;
  --sw-space-md: 16px;
  --sw-space-lg: 24px;
  --sw-space-xl: 32px;
  --sw-space-2xl: 48px;

  /* Shadows */
  --sw-shadow-1: 0 1px 2px rgba(0,0,0,.04);
  --sw-shadow-2: 0 6px 16px rgba(0,0,0,.08);
  --sw-shadow-3: 0 12px 24px rgba(0,0,0,.12);

  /* Motion */
  --sw-ease: cubic-bezier(.2,.8,.2,1);
  --sw-dur-1: 120ms;
  --sw-dur-2: 220ms;

  /* Layout */
  --sw-sider-w: 248px;
  --sw-header-h: 56px;
  --sw-content-max: 1400px;
}

/* Dark mode */
html[data-theme="dark"]{
  --sw-text: rgba(255,255,255,.92);
  --sw-text-secondary: rgba(255,255,255,.68);
  --sw-text-tertiary: rgba(255,255,255,.45);
  --sw-text-quaternary: rgba(255,255,255,.25);
  --sw-bg: #141414;
  --sw-bg-elevated: #1f1f1f;
  --sw-bg-layout: #0f0f0f;
  --sw-border: rgba(255,255,255,.14);
  --sw-border-strong: rgba(255,255,255,.22);
  --sw-split: rgba(255,255,255,.08);
  --sw-fill: rgba(255,255,255,.08);
  --sw-fill-hover: rgba(255,255,255,.12);
  --sw-fill-active: rgba(255,255,255,.20);
  --sw-shadow-1: 0 1px 2px rgba(0,0,0,.50);
  --sw-shadow-2: 0 8px 20px rgba(0,0,0,.55);
  --sw-shadow-3: 0 16px 32px rgba(0,0,0,.65);
}
```

## 使用方式

在每个业务系统的 HTML 中按顺序引入三个样式文件：

```html
<link rel="stylesheet" href="./styles/tokens.css" />
<link rel="stylesheet" href="./styles/base.css" />
<link rel="stylesheet" href="./styles/components.css" />
```
