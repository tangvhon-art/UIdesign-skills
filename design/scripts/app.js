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

  // ========= DatePicker & TimePicker =========
  initDatePickers();
  initTimePickers();
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
}
