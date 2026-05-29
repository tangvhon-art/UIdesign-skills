/* sw-ui: tiny JS helpers for the preview page */

const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

function on(el, evt, fn){
  if(!el) return;
  el.addEventListener(evt, fn);
}

function closeAllPopups(exceptEl){
  $$('.sw-dd[data-open="true"]').forEach(dd=>{
    if(exceptEl && dd.contains(exceptEl)) return;
    dd.dataset.open = 'false';
  });
  $$('.sw-select[data-open="true"]').forEach(s=>{
    if(exceptEl && s.contains(exceptEl)) return;
    s.dataset.open = 'false';
  });
}

function setTheme(next){
  document.documentElement.setAttribute('data-theme', next);
  try{ localStorage.setItem('sw-theme', next); }catch(_){}
}

function toast({title="提示", desc="", tone="info", duration=2600}){
  const host = $('.sw-toasts');
  if(!host) return;

  const toneColor = {
    info: 'var(--sw-primary)',
    success: 'var(--sw-success)',
    warning: 'var(--sw-warning)',
    error: 'var(--sw-error)',
  }[tone] || 'var(--sw-primary)';

  const el = document.createElement('div');
  el.className = 'sw-toast';
  el.innerHTML = `
    <div class="sw-alert__icon" aria-hidden="true">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" stroke="${toneColor}" stroke-width="2"/>
        <path d="M12 7v6" stroke="${toneColor}" stroke-width="2" stroke-linecap="round"/>
        <path d="M12 17h.01" stroke="${toneColor}" stroke-width="3" stroke-linecap="round"/>
      </svg>
    </div>
    <div>
      <p class="sw-toast__t">${escapeHtml(title)}</p>
      <p class="sw-toast__d">${escapeHtml(desc)}</p>
    </div>
    <button class="sw-toast__x" aria-label="关闭">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M7 7l10 10M17 7L7 17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>
  `;
  host.appendChild(el);

  const close = ()=>{
    el.style.animation = 'none';
    el.style.transition = 'opacity 180ms var(--sw-ease), transform 180ms var(--sw-ease)';
    el.style.opacity = '0';
    el.style.transform = 'translateY(-6px)';
    setTimeout(()=>el.remove(), 190);
  };
  on($('.sw-toast__x', el), 'click', close);
  setTimeout(close, duration);
}

function escapeHtml(s){
  return String(s)
    .replaceAll('&','&amp;')
    .replaceAll('<','&lt;')
    .replaceAll('>','&gt;')
    .replaceAll('"','&quot;')
    .replaceAll("'","&#39;");
}

function init(){
  // Restore theme
  try{
    const saved = localStorage.getItem('sw-theme');
    if(saved) setTheme(saved);
  }catch(_){}

  // Mobile sider toggle
  const shell = $('.sw-shell');
  const backdrop = $('.sw-backdrop');
  on($('#swSiderOpen'), 'click', ()=> shell?.setAttribute('data-sider-open', 'true'));
  on($('#swSiderClose'), 'click', ()=> shell?.setAttribute('data-sider-open', 'false'));
  on(backdrop, 'click', ()=> shell?.setAttribute('data-sider-open', 'false'));

  // Menu navigation: scroll to sections
  $$('.sw-menu__item[data-target]').forEach(item=>{
    on(item, 'click', ()=>{
      const id = item.getAttribute('data-target');
      const target = document.getElementById(id);
      if(target){
        shell?.setAttribute('data-sider-open', 'false');
        target.scrollIntoView({behavior:'smooth', block:'start'});
        $$('.sw-menu__item[aria-current="page"]').forEach(i=>i.removeAttribute('aria-current'));
        item.setAttribute('aria-current','page');
      }
    });
  });

  // Dropdown
  $$('.sw-dd [data-dd-toggle]').forEach(btn=>{
    on(btn, 'click', (e)=>{
      const dd = e.currentTarget.closest('.sw-dd');
      const open = dd.dataset.open === 'true';
      closeAllPopups(dd);
      dd.dataset.open = open ? 'false' : 'true';
      e.stopPropagation();
    });
  });

  // Theme toggle
  on($('#swThemeToggle'), 'click', ()=>{
    const cur = document.documentElement.getAttribute('data-theme') || 'light';
    const next = cur === 'dark' ? 'light' : 'dark';
    setTheme(next);
    toast({title:'主题已切换', desc: next === 'dark' ? '已启用暗色主题' : '已启用亮色主题', tone:'info'});
  });

  // Select component
  $$('.sw-select').forEach(select=>{
    const btn = $('.sw-select__btn', select);
    on(btn, 'click', (e)=>{
      const open = select.dataset.open === 'true';
      closeAllPopups(select);
      select.dataset.open = open ? 'false' : 'true';
      e.stopPropagation();
    });
    $$('.sw-option', select).forEach(opt=>{
      on(opt, 'click', ()=>{
        $$('.sw-option[aria-selected="true"]', select).forEach(o=>o.setAttribute('aria-selected','false'));
        opt.setAttribute('aria-selected','true');
        const value = opt.getAttribute('data-value') || opt.textContent.trim();
        const valueEl = $('.sw-select__value', select);
        if(valueEl){
          valueEl.textContent = value;
          valueEl.classList.remove('sw-select__muted');
        }
        select.dataset.open = 'false';
        toast({title:'已选择', desc:value, tone:'success'});
      });
    });
  });

  // Switches
  $$('.sw-switch').forEach(sw=>{
    on(sw,'click', ()=>{
      if(sw.getAttribute('aria-disabled') === 'true') return;
      const next = sw.getAttribute('aria-checked') !== 'true';
      sw.setAttribute('aria-checked', next ? 'true' : 'false');
      toast({title:'开关已更新', desc: next ? '已开启' : '已关闭', tone: next ? 'success' : 'warning'});
    });
  });

  // Tabs
  $$('.sw-tabs').forEach(tabs=>{
    const root = tabs.closest('[data-tabs-root]') || document;
    $$('.sw-tab', tabs).forEach(tab=>{
      on(tab,'click', ()=>{
        const name = tab.getAttribute('data-tab');
        $$('.sw-tab[aria-selected="true"]', tabs).forEach(t=>t.setAttribute('aria-selected','false'));
        tab.setAttribute('aria-selected','true');
        $$('.sw-tabpanel', root).forEach(p=>{
          p.dataset.active = (p.getAttribute('data-tabpanel') === name) ? 'true' : 'false';
        });
      });
    });
  });

  // Modal
  const overlay = $('#swModalOverlay');
  const openModal = ()=> overlay?.setAttribute('data-open','true');
  const closeModal = ()=> overlay?.setAttribute('data-open','false');
  // 绑定所有打开 Modal 的按钮
  ['swOpenModal','swOpenModal2','swOpenModal3'].forEach(id => on($('#'+id), 'click', openModal));
  on($('#swCloseModal'), 'click', closeModal);
  on($('#swCancelModal'), 'click', closeModal);
  on($('#swOkModal'), 'click', ()=>{
    closeModal();
    toast({title:'已提交', desc:'示例操作已完成', tone:'success'});
  });
  on(overlay, 'click', (e)=>{
    if(e.target === overlay) closeModal();
  });

  // Drawer
  const drawer = $('#swDrawer');
  const openDrawer = ()=> drawer?.setAttribute('data-open','true');
  const closeDrawer = ()=> drawer?.setAttribute('data-open','false');
  // 绑定所有打开 Drawer 的按钮
  ['swOpenDrawer','swOpenDrawer2'].forEach(id => on($('#'+id), 'click', openDrawer));
  on($('#swCloseDrawer'), 'click', closeDrawer);

  // Demo actions（header + feedback section 两处按钮）
  ['swDemoNotify','swDemoNotify2'].forEach(id => {
    on($('#'+id), 'click', ()=>{
      toast({title:'新通知', desc:'你有 3 条待处理事项（示例）。', tone:'info'});
    });
  });
  ['swDemoError','swDemoError2'].forEach(id => {
    on($('#'+id), 'click', ()=>{
      toast({title:'操作失败', desc:'网络波动导致请求失败（示例）。', tone:'error'});
    });
  });

  // Global click to close popups
  document.addEventListener('click', ()=> closeAllPopups(null));
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape'){
      closeAllPopups(null);
      closeModal();
      closeDrawer();
      shell?.setAttribute('data-sider-open','false');
    }
  });

  // ========= NEW: Collapse / Accordion =========
  $$('.sw-collapse__header').forEach(header => {
    on(header, 'click', () => {
      const panel = header.closest('.sw-collapse__panel');
      if (!panel) return;
      const isOpen = panel.dataset.open === 'true';
      panel.dataset.open = isOpen ? 'false' : 'true';
    });
  });

  // ========= NEW: Tree - toggle expand =========
  $$('.sw-tree__node[aria-expanded]').forEach(node => {
    on(node, 'click', (e) => {
      const expanded = node.getAttribute('aria-expanded') === 'true';
      node.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    });
  });

  // ========= NEW: Segmented control =========
  $$('.sw-segmented').forEach(seg => {
    $$('.sw-segmented__item', seg).forEach(item => {
      on(item, 'click', () => {
        $$('.sw-segmented__item[aria-selected="true"]', seg).forEach(i => i.setAttribute('aria-selected', 'false'));
        item.setAttribute('aria-selected', 'true');
        const label = item.textContent.trim();
        toast({ title: '视图已切换', desc: `当前选择：${label}`, tone: 'info' });
      });
    });
  });

  // ========= NEW: Rate stars =========
  $$('.sw-rate').forEach(rate => {
    if (rate.getAttribute('aria-readonly') === 'true') return;
    const stars = $$('.sw-rate__star', rate);
    const textEl = $('.sw-rate__text', rate);
    stars.forEach((star, idx) => {
      on(star, 'click', () => {
        const value = idx + 1;
        stars.forEach((s, i) => {
          if (i < value) s.classList.add('sw-rate__star--filled');
          else s.classList.remove('sw-rate__star--filled');
        });
        if (textEl) textEl.textContent = value + '.0';
        toast({ title: '评分', desc: `已评分 ${value} 星`, tone: 'success' });
      });
    });
  });

  // ========= NEW: Transfer =========
  const transferSource = $('#transferSource');
  const transferTarget = $('#transferTarget');

  function updateTransferCounts() {
    const srcPanel = transferSource?.closest('.sw-transfer__panel');
    const tgtPanel = transferTarget?.closest('.sw-transfer__panel');
    if (srcPanel) {
      const countEl = $('.sw-transfer__panel-hd .sw-muted', srcPanel);
      if (countEl) countEl.textContent = `${$$('.sw-transfer__item', transferSource).length} 项`;
    }
    if (tgtPanel) {
      const countEl = $('.sw-transfer__panel-hd .sw-muted', tgtPanel);
      if (countEl) countEl.textContent = `${$$('.sw-transfer__item', transferTarget).length} 项`;
    }
  }

  // Click to select in transfer panels
  [transferSource, transferTarget].forEach(panel => {
    if (!panel) return;
    $$('.sw-transfer__item', panel).forEach(item => {
      on(item, 'click', () => {
        item.classList.toggle('sw-transfer__item--selected');
      });
    });
  });

  on($('#transferRight'), 'click', () => {
    const selected = $$('.sw-transfer__item--selected', transferSource);
    selected.forEach(item => {
      item.classList.remove('sw-transfer__item--selected');
      transferTarget.appendChild(item);
    });
    updateTransferCounts();
  });

  on($('#transferLeft'), 'click', () => {
    const selected = $$('.sw-transfer__item--selected', transferTarget);
    selected.forEach(item => {
      item.classList.remove('sw-transfer__item--selected');
      transferSource.appendChild(item);
    });
    updateTransferCounts();
  });

  // ========= NEW: Popover toggle =========
  $$('.sw-popover').forEach(pop => {
    const trigger = $('.sw-popover__trigger', pop);
    on(trigger, 'click', (e) => {
      e.stopPropagation();
      const open = pop.dataset.open === 'true';
      // Close other popovers
      $$('.sw-popover[data-open="true"]').forEach(p => {
        if (p !== pop) p.dataset.open = 'false';
      });
      pop.dataset.open = open ? 'false' : 'true';
    });
    // Click inside popover content shouldn't close it
    const content = $('.sw-popover__content', pop);
    if (content) {
      on(content, 'click', (e) => e.stopPropagation());
    }
  });

  // ========= NEW: Notice close buttons =========
  $$('.sw-notice__close').forEach(btn => {
    on(btn, 'click', () => {
      const notice = btn.closest('.sw-notice');
      if (notice) {
        notice.style.transition = 'opacity 180ms var(--sw-ease), transform 180ms var(--sw-ease)';
        notice.style.opacity = '0';
        notice.style.transform = 'translateY(-4px)';
        setTimeout(() => notice.remove(), 200);
      }
    });
  });

  // ========= NEW: Upload area demo =========
  $$('.sw-upload__area').forEach(area => {
    on(area, 'click', () => {
      toast({ title: '上传演示', desc: '此为静态演示，实际项目请接入上传逻辑。', tone: 'info' });
    });
  });

  // ========= NEW: Upload file remove =========
  $$('.sw-upload__file-remove').forEach(btn => {
    on(btn, 'click', (e) => {
      e.stopPropagation();
      const file = btn.closest('.sw-upload__file');
      if (file) {
        file.style.transition = 'opacity 180ms var(--sw-ease), transform 180ms var(--sw-ease)';
        file.style.opacity = '0';
        file.style.transform = 'translateX(-8px)';
        setTimeout(() => file.remove(), 200);
        toast({ title: '已移除', desc: '文件已从列表中移除', tone: 'warning' });
      }
    });
  });

  // ========= NEW: Popover close on outside click =========
  document.addEventListener('click', (e) => {
    $$('.sw-popover[data-open="true"]').forEach(pop => {
      if (!pop.contains(e.target)) {
        pop.dataset.open = 'false';
      }
    });
  });

  // ========= NEW: InputNumber =========
  $$('.sw-input-number').forEach(wrap => {
    const input = wrap.querySelector('input');
    const dec = wrap.querySelector('[data-in-dec]');
    const inc = wrap.querySelector('[data-in-inc]');
    if (!input) return;
    on(dec, 'click', () => {
      const min = parseFloat(input.min ?? '-Infinity');
      const step = parseFloat(input.step ?? 1);
      const val = parseFloat(input.value ?? 0) - step;
      if (val >= min) { input.value = val; toast({ title: '已更新', desc: `当前值：${val}`, tone: 'info' }); }
    });
    on(inc, 'click', () => {
      const max = parseFloat(input.max ?? 'Infinity');
      const step = parseFloat(input.step ?? 1);
      const val = parseFloat(input.value ?? 0) + step;
      if (val <= max) { input.value = val; toast({ title: '已更新', desc: `当前值：${val}`, tone: 'info' }); }
    });
  });

  // ========= NEW: Slider (drag) =========
  $$('.sw-slider').forEach(slider => {
    const thumb = slider.querySelector('.sw-slider__thumb');
    const fill  = slider.querySelector('.sw-slider__fill');
    const label = slider.querySelector('.sw-slider__value');
    const track = slider.querySelector('.sw-slider__track');
    if (!thumb || !track) return;

    function updateSlider(pct) {
      pct = Math.max(0, Math.min(100, pct));
      thumb.style.left = pct + '%';
      if (fill) fill.style.width = pct + '%';
      const val = Math.round(pct);
      thumb.setAttribute('aria-valuenow', val);
      if (label) label.textContent = `当前值：${val}`;
    }

    on(track.parentElement, 'mousedown', e => {
      const rect = track.getBoundingClientRect();
      const move = ev => {
        const pct = ((ev.clientX - rect.left) / rect.width) * 100;
        updateSlider(pct);
      };
      const up = () => {
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', up);
      };
      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', up);
      move(e);
    });
  });

  // ========= NEW: Cascader toggle =========
  $$('.sw-cascader').forEach(cas => {
    const input = cas.querySelector('.sw-cascader__input');
    on(input, 'click', e => {
      e.stopPropagation();
      const open = cas.dataset.open === 'true';
      cas.dataset.open = open ? 'false' : 'true';
    });
    // Select leaf item
    $$('.sw-cascader__item[data-cas-l3]', cas).forEach(item => {
      on(item, 'click', () => {
        const textEl = cas.querySelector('[id$="-text"]') || cas.querySelector('.sw-cascader__input span');
        const val = item.getAttribute('data-cas-l3');
        if (textEl) { textEl.textContent = `广东省 / 深圳市 / ${val}`; textEl.style.color = ''; }
        cas.dataset.open = 'false';
        toast({ title: '已选择', desc: val, tone: 'success' });
      });
    });
    document.addEventListener('click', e => {
      if (!cas.contains(e.target)) cas.dataset.open = 'false';
    });
  });

  // ========= NEW: Menu sub-menu toggle =========
  $$('.sw-menu__item[aria-expanded]').forEach(item => {
    on(item, 'click', () => {
      const expanded = item.getAttribute('aria-expanded') === 'true';
      item.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    });
  });

  // ========= NEW: Tag close =========
  $$('.sw-tag__close').forEach(btn => {
    on(btn, 'click', e => {
      e.stopPropagation();
      const tag = btn.closest('.sw-tag');
      if (tag) {
        tag.style.transition = 'opacity 180ms var(--sw-ease), transform 180ms var(--sw-ease)';
        tag.style.opacity = '0';
        tag.style.transform = 'scale(0.85)';
        setTimeout(() => tag.remove(), 190);
      }
    });
  });

  // ========= DatePicker & TimePicker =========
  initDatePickers();
  initTimePickers();
  initTimeRangePickers();
  initHorizontalMenuDropdown();
}

document.addEventListener('DOMContentLoaded', init);


/* =============================================
   DatePicker / DateRangePicker
   ============================================= */
function initDatePickers() {
  const WEEKDAYS = ['一','二','三','四','五','六','日'];
  const MONTHS   = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];

  function pad(n){ return String(n).padStart(2,'0'); }
  function fmtDate(y,m,d){ return `${y}-${pad(m+1)}-${pad(d)}`; }
  function today(){ const t=new Date(); return {y:t.getFullYear(),m:t.getMonth(),d:t.getDate()}; }

  // 渲染单个月历
  function renderCal(container, state) {
    const { year, month, selected, rangeStart, rangeEnd, hoverDate, mode } = state;
    const t = today();
    const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
    // 转为周一起始：0=Mon…6=Sun
    const startOffset = (firstDay + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrev  = new Date(year, month, 0).getDate();

    // 头部
    const isLeft  = mode === 'range-left'  || mode === 'single';
    const isRight = mode === 'range-right';

    container.innerHTML = `
      <div class="sw-cal__header">
        <button class="sw-cal__nav" data-nav="prev-year"  ${isRight ? 'disabled' : ''} title="上一年">«</button>
        <button class="sw-cal__nav" data-nav="prev-month" ${isRight ? 'disabled' : ''} title="上一月">‹</button>
        <span class="sw-cal__title">${year}年 ${MONTHS[month]}</span>
        <button class="sw-cal__nav" data-nav="next-month" ${isLeft && mode!=='single' ? 'disabled' : ''} title="下一月">›</button>
        <button class="sw-cal__nav" data-nav="next-year"  ${isLeft && mode!=='single' ? 'disabled' : ''} title="下一年">»</button>
      </div>
      <div class="sw-cal__weekrow">${WEEKDAYS.map(w=>`<div class="sw-cal__weekday">${w}</div>`).join('')}</div>
      <div class="sw-cal__grid" id="${container.id}-grid"></div>
    `;

    const grid = container.querySelector('.sw-cal__grid');
    const cells = [];

    // 上月补位
    for(let i = startOffset - 1; i >= 0; i--){
      cells.push({ d: daysInPrev - i, m: month - 1, y: year, outside: true });
    }
    // 本月
    for(let d = 1; d <= daysInMonth; d++){
      cells.push({ d, m: month, y: year, outside: false });
    }
    // 下月补位（补满6行42格）
    const remaining = 42 - cells.length;
    for(let d = 1; d <= remaining; d++){
      cells.push({ d, m: month + 1, y: year, outside: true });
    }

    cells.forEach(cell => {
      const realY = cell.y + (cell.m < 0 ? -1 : cell.m > 11 ? 1 : 0);
      const realM = ((cell.m % 12) + 12) % 12;
      const dateStr = fmtDate(realY, realM, cell.d);

      const el = document.createElement('div');
      el.className = 'sw-cal__day';
      el.textContent = cell.d;
      el.dataset.date = dateStr;

      if(cell.outside) el.dataset.outside = '';
      if(realY===t.y && realM===t.m && cell.d===t.d && !cell.outside) el.dataset.today = '';

      // 单选
      if(mode === 'single' && selected === dateStr) el.dataset.selected = '';

      // 范围
      if(mode !== 'single'){
        const rs = rangeStart, re = rangeEnd || hoverDate;
        if(rs && dateStr === rs) el.dataset.rangeStart = '';
        if(re && dateStr === re) el.dataset.rangeEnd = '';
        if(rs && re && dateStr > rs && dateStr < re) el.dataset.inRange = '';
        if(rs && !re && dateStr === rs) el.dataset.selected = '';
      }

      grid.appendChild(el);
    });
  }

  // ---- 单日期选择器 ----
  function initSingleDP(id) {
    const wrap  = document.getElementById(id);
    if(!wrap) return;
    const trigger = wrap.querySelector('.sw-datepicker__input');
    const textEl  = document.getElementById(id+'-text');
    const calEl   = document.getElementById(id+'-cal');
    const t = today();
    const state = { year: t.y, month: t.m, selected: null };

    function open(){
      wrap.dataset.open = 'true';
      renderCal(calEl, { ...state, mode: 'single' });
      bindCalNav(calEl, state, 'single');
    }
    function close(){ wrap.dataset.open = 'false'; }

    on(trigger, 'click', e => {
      e.stopPropagation();
      wrap.dataset.open === 'true' ? close() : open();
    });

    // 今天快捷
    on(wrap.querySelector('[data-dp-today]'), 'click', () => {
      const t2 = today();
      state.selected = fmtDate(t2.y, t2.m, t2.d);
      state.year = t2.y; state.month = t2.m;
      renderCal(calEl, { ...state, mode: 'single' });
      bindCalNav(calEl, state, 'single');
      updateText();
    });

    // 确定
    on(wrap.querySelector('[data-dp-ok]'), 'click', () => {
      updateText();
      close();
    });

    function updateText(){
      if(state.selected){
        textEl.textContent = state.selected;
        textEl.classList.remove('sw-datepicker__input-text--placeholder');
      }
    }

    // 日期格子点击（事件委托）
    on(calEl, 'click', e => {
      const day = e.target.closest('.sw-cal__day');
      if(!day || day.dataset.disabled !== undefined) return;
      state.selected = day.dataset.date;
      renderCal(calEl, { ...state, mode: 'single' });
      bindCalNav(calEl, state, 'single');
      updateText();
    });

    // 点击外部关闭
    document.addEventListener('click', e => {
      if(!wrap.contains(e.target)) close();
    });
  }

  // ---- 日期范围选择器 ----
  function initRangeDP(id) {
    const wrap   = document.getElementById(id);
    if(!wrap) return;
    const trigger  = wrap.querySelector('.sw-datepicker__input');
    const startEl  = document.getElementById(id+'-start');
    const endEl    = document.getElementById(id+'-end');
    const calL     = document.getElementById(id+'-cal-l');
    const calR     = document.getElementById(id+'-cal-r');
    const t = today();
    // 左月：当前月，右月：下月
    const stateL = { year: t.y, month: t.m };
    const stateR = { year: t.m === 11 ? t.y+1 : t.y, month: (t.m+1)%12 };
    let rangeStart = null, rangeEnd = null, hoverDate = null;

    function open(){
      wrap.dataset.open = 'true';
      renderBoth();
    }
    function close(){ wrap.dataset.open = 'false'; }

    function renderBoth(){
      renderCal(calL, { ...stateL, rangeStart, rangeEnd, hoverDate, mode: 'range-left' });
      renderCal(calR, { ...stateR, rangeStart, rangeEnd, hoverDate, mode: 'range-right' });
      bindRangeNav();
      bindRangeDays();
    }

    function bindRangeNav(){
      // 左月导航
      on(calL.querySelector('[data-nav="prev-year"]'),  'click', ()=>{ stateL.year--;  syncRight(); renderBoth(); });
      on(calL.querySelector('[data-nav="prev-month"]'), 'click', ()=>{ bumpMonth(stateL,-1); syncRight(); renderBoth(); });
      // 右月导航
      on(calR.querySelector('[data-nav="next-month"]'), 'click', ()=>{ bumpMonth(stateR,1); syncLeft(); renderBoth(); });
      on(calR.querySelector('[data-nav="next-year"]'),  'click', ()=>{ stateR.year++;  syncLeft(); renderBoth(); });
    }

    function bumpMonth(s, delta){
      s.month += delta;
      if(s.month > 11){ s.month=0; s.year++; }
      if(s.month < 0) { s.month=11; s.year--; }
    }
    function syncRight(){
      // 右月始终比左月晚一个月
      stateR.year  = stateL.month === 11 ? stateL.year+1 : stateL.year;
      stateR.month = (stateL.month+1)%12;
    }
    function syncLeft(){
      stateL.year  = stateR.month === 0 ? stateR.year-1 : stateR.year;
      stateL.month = (stateR.month-1+12)%12;
    }

    function bindRangeDays(){
      [calL, calR].forEach(cal => {
        // hover
        $$('.sw-cal__day', cal).forEach(day => {
          on(day, 'mouseenter', () => {
            if(rangeStart && !rangeEnd){
              hoverDate = day.dataset.date;
              renderBoth();
            }
          });
        });
        // click
        on(cal, 'click', e => {
          const day = e.target.closest('.sw-cal__day');
          if(!day) return;
          const d = day.dataset.date;
          if(!rangeStart || (rangeStart && rangeEnd)){
            rangeStart = d; rangeEnd = null; hoverDate = null;
          } else {
            if(d < rangeStart){ rangeEnd = rangeStart; rangeStart = d; }
            else { rangeEnd = d; }
            hoverDate = null;
            updateRangeText();
          }
          renderBoth();
        });
      });
    }

    function updateRangeText(){
      if(rangeStart){
        startEl.textContent = rangeStart;
        startEl.classList.remove('sw-datepicker__input-text--placeholder');
      }
      if(rangeEnd){
        endEl.textContent = rangeEnd;
        endEl.classList.remove('sw-datepicker__input-text--placeholder');
        close();
      }
    }

    on(trigger, 'click', e => {
      e.stopPropagation();
      wrap.dataset.open === 'true' ? close() : open();
    });

    document.addEventListener('click', e => {
      if(!wrap.contains(e.target)) close();
    });
  }

  function bindCalNav(calEl, state, mode){
    on(calEl.querySelector('[data-nav="prev-year"]'),  'click', ()=>{ state.year--;  renderCal(calEl,{...state,mode}); bindCalNav(calEl,state,mode); });
    on(calEl.querySelector('[data-nav="prev-month"]'), 'click', ()=>{ bumpM(state,-1); renderCal(calEl,{...state,mode}); bindCalNav(calEl,state,mode); });
    on(calEl.querySelector('[data-nav="next-month"]'), 'click', ()=>{ bumpM(state,1);  renderCal(calEl,{...state,mode}); bindCalNav(calEl,state,mode); });
    on(calEl.querySelector('[data-nav="next-year"]'),  'click', ()=>{ state.year++;  renderCal(calEl,{...state,mode}); bindCalNav(calEl,state,mode); });
  }
  function bumpM(s, delta){
    s.month += delta;
    if(s.month > 11){ s.month=0; s.year++; }
    if(s.month < 0) { s.month=11; s.year--; }
  }

  // 初始化页面上的选择器
  initSingleDP('dp1');
  initRangeDP('drp1');
}

/* =============================================
   TimePicker
   ============================================= */
function initTimePickers() {
  function pad(n){ return String(n).padStart(2,'0'); }

  function buildCol(colEl, label, count, selected, onSelect) {
    colEl.innerHTML = `<div class="sw-timepicker__col-label">${label}</div>`;
    for(let i = 0; i < count; i++){
      const item = document.createElement('div');
      item.className = 'sw-timepicker__item';
      item.textContent = pad(i);
      item.dataset.val = i;
      if(i === selected) item.dataset.selected = '';
      item.addEventListener('click', () => onSelect(i));
      colEl.appendChild(item);
    }
    // 滚动到选中项
    const selectedEl = colEl.querySelector('[data-selected]');
    if(selectedEl){
      // 延迟一帧确保渲染完成
      requestAnimationFrame(() => {
        selectedEl.scrollIntoView({ block: 'center', behavior: 'instant' });
      });
    }
  }

  function initTP(id) {
    const wrap    = document.getElementById(id);
    if(!wrap) return;
    const trigger = wrap.querySelector('.sw-timepicker__input');
    const textEl  = document.getElementById(id+'-text');
    const colsEl  = document.getElementById(id+'-cols');

    const now = new Date();
    const state = { h: now.getHours(), m: now.getMinutes(), s: now.getSeconds() };
    // 暂存选择中的值（未点确定前不更新 state）
    const pending = { h: state.h, m: state.m, s: state.s };

    function renderCols(){
      colsEl.innerHTML = '';
      const hCol = document.createElement('div');
      hCol.className = 'sw-timepicker__col';
      const mCol = document.createElement('div');
      mCol.className = 'sw-timepicker__col';
      const sCol = document.createElement('div');
      sCol.className = 'sw-timepicker__col';

      buildCol(hCol, '时', 24, pending.h, v => { pending.h = v; renderCols(); });
      buildCol(mCol, '分', 60, pending.m, v => { pending.m = v; renderCols(); });
      buildCol(sCol, '秒', 60, pending.s, v => { pending.s = v; renderCols(); });

      colsEl.appendChild(hCol);
      colsEl.appendChild(mCol);
      colsEl.appendChild(sCol);
    }

    function open(){
      pending.h = state.h; pending.m = state.m; pending.s = state.s;
      wrap.dataset.open = 'true';
      renderCols();
    }
    function close(){ wrap.dataset.open = 'false'; }

    function confirm(){
      state.h = pending.h; state.m = pending.m; state.s = pending.s;
      const val = `${pad(state.h)}:${pad(state.m)}:${pad(state.s)}`;
      textEl.textContent = val;
      textEl.classList.remove('sw-timepicker__input-text--placeholder');
      close();
    }

    on(trigger, 'click', e => {
      e.stopPropagation();
      wrap.dataset.open === 'true' ? close() : open();
    });

    // 此刻
    on(wrap.querySelector('[data-tp-now]'), 'click', () => {
      const n = new Date();
      pending.h = n.getHours(); pending.m = n.getMinutes(); pending.s = n.getSeconds();
      renderCols();
    });

    // 确定
    on(wrap.querySelector('[data-tp-ok]'), 'click', confirm);

    // 点击外部关闭
    document.addEventListener('click', e => {
      if(!wrap.contains(e.target)) close();
    });
  }

  initTP('tp1');

  // 仅时分（HH:mm）选择器 — data-tp-mode="hm"
  $$('.sw-timepicker[data-tp-mode="hm"]').forEach(wrap => {
    const id      = wrap.id;
    if(!id) return;
    const trigger = wrap.querySelector('.sw-timepicker__input');
    const textEl  = document.getElementById(id+'-text');
    const colsEl  = document.getElementById(id+'-cols');
    if(!trigger || !textEl || !colsEl) return;

    const now = new Date();
    const state   = { h: now.getHours(), m: now.getMinutes() };
    const pending = { h: state.h, m: state.m };

    function renderCols(){
      colsEl.innerHTML = '';
      const hCol = document.createElement('div'); hCol.className = 'sw-timepicker__col';
      const mCol = document.createElement('div'); mCol.className = 'sw-timepicker__col';
      buildCol(hCol, '时', 24, pending.h, v => { pending.h = v; renderCols(); });
      buildCol(mCol, '分', 60, pending.m, v => { pending.m = v; renderCols(); });
      colsEl.appendChild(hCol);
      colsEl.appendChild(mCol);
    }

    function open(){ pending.h = state.h; pending.m = state.m; wrap.dataset.open = 'true'; renderCols(); }
    function close(){ wrap.dataset.open = 'false'; }
    function confirm(){
      state.h = pending.h; state.m = pending.m;
      textEl.textContent = `${pad(state.h)}:${pad(state.m)}`;
      textEl.classList.remove('sw-timepicker__input-text--placeholder');
      close();
    }

    on(trigger, 'click', e => { e.stopPropagation(); wrap.dataset.open === 'true' ? close() : open(); });
    const nowBtn = wrap.querySelector('[data-tp-now]');
    if(nowBtn) on(nowBtn, 'click', () => { const n=new Date(); pending.h=n.getHours(); pending.m=n.getMinutes(); renderCols(); });
    const okBtn = wrap.querySelector('[data-tp-ok]');
    if(okBtn) on(okBtn, 'click', confirm);
    document.addEventListener('click', e => { if(!wrap.contains(e.target)) close(); });
  });
}

/* =============================================
   TimeRangePicker（时间范围：开始时间 → 结束时间）
   支持 data-tr-mode="hm"（仅时分）或默认时分秒
   ============================================= */
function initTimeRangePickers() {
  function pad(n){ return String(n).padStart(2,'0'); }

  function buildCol(colEl, label, count, selected, onSelect) {
    colEl.innerHTML = `<div class="sw-timepicker__col-label">${label}</div>`;
    for(let i = 0; i < count; i++){
      const item = document.createElement('div');
      item.className = 'sw-timepicker__item';
      item.textContent = pad(i);
      item.dataset.val = i;
      if(i === selected) item.dataset.selected = '';
      item.addEventListener('click', () => onSelect(i));
      colEl.appendChild(item);
    }
    const sel = colEl.querySelector('[data-selected]');
    if(sel) requestAnimationFrame(() => sel.scrollIntoView({ block: 'center', behavior: 'instant' }));
  }

  $$('.sw-timerange').forEach(wrap => {
    const id     = wrap.id;
    if(!id) return;
    const trigger  = wrap.querySelector('.sw-timerange__input');
    const startEl  = document.getElementById(id+'-start');
    const endEl    = document.getElementById(id+'-end');
    const panel    = wrap.querySelector('.sw-timerange__panel');
    if(!trigger || !startEl || !endEl || !panel) return;

    const hmOnly = wrap.dataset.trMode === 'hm';
    const now    = new Date();
    const defH   = now.getHours(), defM = now.getMinutes(), defS = now.getSeconds();

    const stateS  = { h: defH, m: defM, s: defS };
    const stateE  = { h: defH, m: defM, s: defS };
    const pendS   = { ...stateS };
    const pendE   = { ...stateE };

    // 构建左右两侧列容器
    const sideS = panel.querySelector('.sw-timerange__side:first-child .sw-timepicker__columns');
    const sideE = panel.querySelector('.sw-timerange__side:last-child  .sw-timepicker__columns');
    if(!sideS || !sideE) return;

    function renderSide(colsEl, pend, onUpdate){
      colsEl.innerHTML = '';
      const hCol = document.createElement('div'); hCol.className = 'sw-timepicker__col';
      const mCol = document.createElement('div'); mCol.className = 'sw-timepicker__col';
      buildCol(hCol, '时', 24, pend.h, v => { pend.h = v; onUpdate(); });
      buildCol(mCol, '分', 60, pend.m, v => { pend.m = v; onUpdate(); });
      colsEl.appendChild(hCol);
      colsEl.appendChild(mCol);
      if(!hmOnly){
        const sCol = document.createElement('div'); sCol.className = 'sw-timepicker__col';
        buildCol(sCol, '秒', 60, pend.s, v => { pend.s = v; onUpdate(); });
        colsEl.appendChild(sCol);
      }
    }

    function fmt(p){ return hmOnly ? `${pad(p.h)}:${pad(p.m)}` : `${pad(p.h)}:${pad(p.m)}:${pad(p.s)}`; }

    function open(){
      Object.assign(pendS, stateS); Object.assign(pendE, stateE);
      wrap.dataset.open = 'true';
      renderSide(sideS, pendS, () => renderSide(sideS, pendS, ()=>{}));
      renderSide(sideE, pendE, () => renderSide(sideE, pendE, ()=>{}));
    }
    function close(){ wrap.dataset.open = 'false'; }
    function confirm(){
      Object.assign(stateS, pendS); Object.assign(stateE, pendE);
      startEl.textContent = fmt(stateS);
      endEl.textContent   = fmt(stateE);
      startEl.classList.remove('sw-timerange__text--placeholder');
      endEl.classList.remove('sw-timerange__text--placeholder');
      close();
    }

    on(trigger, 'click', e => { e.stopPropagation(); wrap.dataset.open === 'true' ? close() : open(); });
    const nowBtn = wrap.querySelector('[data-tr-now]');
    if(nowBtn) on(nowBtn, 'click', () => {
      const n = new Date();
      pendS.h = pendE.h = n.getHours();
      pendS.m = pendE.m = n.getMinutes();
      if(!hmOnly){ pendS.s = pendE.s = n.getSeconds(); }
      renderSide(sideS, pendS, ()=>{});
      renderSide(sideE, pendE, ()=>{});
    });
    const okBtn = wrap.querySelector('[data-tr-ok]');
    if(okBtn) on(okBtn, 'click', confirm);
    document.addEventListener('click', e => { if(!wrap.contains(e.target)) close(); });
  });
}

/* =============================================
   水平菜单 — 悬浮下拉子菜单（纯 CSS hover 驱动，
   JS 仅处理键盘 Escape 关闭 & 激活项切换）
   ============================================= */
function initHorizontalMenuDropdown() {
  // 激活项点击切换（叶子菜单项）
  $$('.sw-menu--horizontal .sw-menu__item:not(.sw-menu__item--has-sub)').forEach(item => {
    on(item, 'click', () => {
      const menu = item.closest('.sw-menu--horizontal');
      $$('.sw-menu__item[aria-current="page"]', menu).forEach(i => i.removeAttribute('aria-current'));
      item.setAttribute('aria-current', 'page');
    });
  });

  // 下拉内叶子项点击：更新顶层父项激活态
  $$('.sw-menu--horizontal .sw-menu__dropdown .sw-menu__item:not(.sw-menu__item--has-sub)').forEach(item => {
    on(item, 'click', e => {
      e.stopPropagation();
      const topItem = item.closest('.sw-menu--horizontal > .sw-menu__item--has-sub');
      const menu    = item.closest('.sw-menu--horizontal');
      if(menu) $$('.sw-menu__item[aria-current="page"]', menu).forEach(i => i.removeAttribute('aria-current'));
      if(topItem) topItem.setAttribute('aria-current', 'page');
    });
  });

  // Escape 关闭（CSS hover 自动关闭，此处仅作键盘支持）
  document.addEventListener('keydown', e => {
    if(e.key === 'Escape'){
      // 移除 focus，让 CSS :hover 失效
      if(document.activeElement) document.activeElement.blur();
    }
  });
}

/* =============================================
   AI 对话输入框（sw-chat）
   - 自动高度：textarea 随内容增长，最高 160px
   - 发送按钮：空内容时禁用，响应中变为停止按钮
   - Enter 发送，Shift+Enter 换行
   - 演示模式：模拟 AI 流式输出 + 三点等待动画
   ============================================= */
function initAIChat() {
  $$('.sw-chat').forEach(chat => {
    const textarea  = chat.querySelector('.sw-chat__textarea');
    const sendBtn   = chat.querySelector('.sw-chat__send');
    const msgList   = chat.querySelector('.sw-chat__messages');
    const charCount = chat.querySelector('[data-chat-count]');
    if (!textarea || !sendBtn || !msgList) return;

    let isThinking = false;
    let streamTimer = null;

    // ---- 自动高度 ----
    function autoResize() {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 160) + 'px';
    }

    // ---- 空内容禁用发送 ----
    function updateSendState() {
      const empty = textarea.value.trim() === '';
      sendBtn.dataset.empty = empty ? 'true' : 'false';
      sendBtn.disabled = empty || isThinking;
    }

    textarea.addEventListener('input', () => {
      autoResize();
      updateSendState();
      if (charCount) charCount.textContent = textarea.value.length;
    });

    // ---- Enter 发送 / Shift+Enter 换行 ----
    textarea.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (!sendBtn.disabled) doSend();
      }
    });

    // ---- 发送 / 停止 ----
    sendBtn.addEventListener('click', () => {
      if (isThinking) {
        stopStream();
      } else {
        doSend();
      }
    });

    function doSend() {
      const text = textarea.value.trim();
      if (!text) return;

      // 追加用户消息
      appendMsg('user', text);
      textarea.value = '';
      autoResize();
      updateSendState();
      if (charCount) charCount.textContent = '0';

      // 进入等待状态
      startThinking();
    }

    // ---- 追加消息气泡 ----
    function appendMsg(role, text) {
      const isUser = role === 'user';
      const el = document.createElement('div');
      el.className = `sw-chat__msg sw-chat__msg--${isUser ? 'user' : 'ai'}`;
      el.innerHTML = `
        <div class="sw-chat__msg-avatar" aria-hidden="true">${isUser ? '我' : 'AI'}</div>
        <div class="sw-chat__msg-body">
          <div class="sw-chat__msg-name">${isUser ? '你' : 'AI 助手'}</div>
          <div class="sw-chat__msg-bubble">${escapeHtml(text)}</div>
          ${!isUser ? `
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
          </div>` : ''}
        </div>
      `;
      msgList.appendChild(el);
      scrollToBottom();

      // 绑定复制
      const copyBtn = el.querySelector('[data-chat-copy]');
      if (copyBtn) {
        copyBtn.addEventListener('click', () => {
          navigator.clipboard?.writeText(text).then(() => {
            toast({ title: '已复制', desc: '消息内容已复制到剪贴板', tone: 'success' });
          }).catch(() => {
            toast({ title: '复制失败', desc: '请手动选中文字复制', tone: 'warning' });
          });
        });
      }

      // 绑定重新生成
      const regenBtn = el.querySelector('[data-chat-regen]');
      if (regenBtn) {
        regenBtn.addEventListener('click', () => {
          el.remove();
          startThinking();
        });
      }

      return el;
    }

    // ---- 三点等待动画 ----
    function startThinking() {
      isThinking = true;
      sendBtn.classList.add('sw-chat__send--stop');
      sendBtn.disabled = false;
      sendBtn.title = '停止生成';
      sendBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <rect x="5" y="5" width="14" height="14" rx="3" fill="currentColor"/>
        </svg>`;

      // 插入思考气泡
      const thinkEl = document.createElement('div');
      thinkEl.className = 'sw-chat__msg sw-chat__msg--ai sw-chat__msg--thinking';
      thinkEl.id = 'swChatThinking';
      thinkEl.innerHTML = `
        <div class="sw-chat__msg-avatar" aria-hidden="true">AI</div>
        <div class="sw-chat__msg-body">
          <div class="sw-chat__msg-name">AI 助手</div>
          <div class="sw-chat__msg-bubble" aria-label="AI 正在思考">
            <span class="sw-chat__thinking-dot"></span>
            <span class="sw-chat__thinking-dot"></span>
            <span class="sw-chat__thinking-dot"></span>
          </div>
        </div>`;
      msgList.appendChild(thinkEl);
      scrollToBottom();

      // 模拟延迟后开始流式输出
      streamTimer = setTimeout(() => {
        thinkEl.remove();
        startStream();
      }, 900 + Math.random() * 600);
    }

    // ---- 模拟流式输出 ----
    function startStream() {
      const demoReplies = [
        '好的，我来帮你分析一下这个问题。根据你的描述，建议从以下几个方向入手：\n\n1. 首先确认数据来源是否准确\n2. 检查业务逻辑中的边界条件\n3. 对关键路径增加日志追踪\n\n如需进一步协助，请提供更多上下文。',
        '这是一个很好的问题。简单来说，核心思路是将复杂流程拆解为可独立验证的小步骤，每步完成后再推进下一步，这样可以有效降低整体风险。',
        '明白了。我建议优先处理高优先级的部分，其余内容可以在后续迭代中逐步完善。有什么具体需要我帮你起草或整理的吗？',
      ];
      const reply = demoReplies[Math.floor(Math.random() * demoReplies.length)];

      const msgEl = appendMsg('ai', '');
      const bubble = msgEl.querySelector('.sw-chat__msg-bubble');
      bubble.textContent = '';

      // 插入光标
      const cursor = document.createElement('span');
      cursor.className = 'sw-chat__cursor';
      cursor.setAttribute('aria-hidden', 'true');
      bubble.appendChild(cursor);

      let i = 0;
      function tick() {
        if (!isThinking) return; // 已停止
        if (i < reply.length) {
          bubble.insertBefore(document.createTextNode(reply[i]), cursor);
          i++;
          scrollToBottom();
          streamTimer = setTimeout(tick, 18 + Math.random() * 22);
        } else {
          // 输出完成
          cursor.remove();
          stopStream(false);
        }
      }
      tick();
    }

    // ---- 停止生成 ----
    function stopStream(removeLastMsg = false) {
      clearTimeout(streamTimer);
      isThinking = false;

      // 移除思考气泡（如果还在）
      document.getElementById('swChatThinking')?.remove();

      // 移除光标
      chat.querySelectorAll('.sw-chat__cursor').forEach(c => c.remove());

      // 恢复发送按钮
      sendBtn.classList.remove('sw-chat__send--stop');
      sendBtn.title = '发送';
      sendBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M22 2L11 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M22 2L15 22l-4-9-9-4 20-7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
      updateSendState();
    }

    function scrollToBottom() {
      msgList.scrollTop = msgList.scrollHeight;
    }

    // 初始化状态
    updateSendState();
  });
}

// 在 DOMContentLoaded 后自动初始化
document.addEventListener('DOMContentLoaded', initAIChat);
