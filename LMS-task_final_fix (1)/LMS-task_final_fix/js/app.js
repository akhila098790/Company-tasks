
/**
 * CodeLearn (No innerHTML version)
 * - Safe DOM building (scales when you add more JSON content)
 * - Still uses srcdoc for previews/editor output (string is required there)
 */

const $ = (q, el=document) => el.querySelector(q);
const $$ = (q, el=document) => Array.from(el.querySelectorAll(q));

function qs(name){
  const u = new URL(location.href);
  return u.searchParams.get(name);
}

function el(tag, attrs={}, ...children){
  const node = document.createElement(tag);
  for(const [k,v] of Object.entries(attrs||{})){
    if(v === null || v === undefined) continue;
    if(k === 'class') node.className = v;
    else if(k === 'dataset'){
      for(const [dk,dv] of Object.entries(v)) node.dataset[dk] = dv;
    }
    else if(k === 'style'){
      for(const [sk,sv] of Object.entries(v)) node.style[sk] = sv;
    }
    else if(k.startsWith('on') && typeof v === 'function'){
      node.addEventListener(k.slice(2), v);
    }
    else if(k === 'text'){
      node.textContent = v;
    }
    else if(k === 'html'){
      // Avoid using unless you really must. Kept for rare safe constants.
      node.innerHTML = v;
    }
    else{
      node.setAttribute(k, String(v));
    }
  }
  for(const ch of children.flat()){
    if(ch === null || ch === undefined) continue;
    node.appendChild(typeof ch === 'string' ? document.createTextNode(ch) : ch);
  }
  return node;
}

function replaceChildren(parent, ...kids){
  parent.replaceChildren(...kids.filter(Boolean));
}

async function loadDB(){
  const res = await fetch('data/content.json');
  if(!res.ok) throw new Error('Failed to load data/content.json (use Live Server).');
  return await res.json();
}

function snippetToPreviewHTML(html, css, js){
  const safeJS = (js || '').replace(/<\/script>/gi,'<\\/script>');
  return `<!doctype html><html><head><meta charset="utf-8"><style>${css||''}</style></head><body>${html||''}<script>${safeJS}</script></body></html>`;
}

function setActiveNav(){
  const page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  $$('.navlinks a').forEach(a=>{
    const href=(a.getAttribute('href')||'').toLowerCase();
    a.classList.toggle('active', href===page);
  });
}

function renderTopbar(){
  const brand = el('a', {
  class: 'brand',
  href: 'index.html'
},
  el('img', {
    src: 'https://oppty.in/wp-content/uploads/2025/07/oppty.png', // ← YOU will replace this image
    class: 'brandLogo'
  })
);
const input = el('input', {id:'globalSearch', placeholder:'Search lessons… (ex: forms, flexbox, DOM)'});
  const btn = el('button', {class:'btn', id:'searchBtn', text:'Search'});
  const searchbar = el('div', {class:'searchbar'}, input, btn);

  const nav = el('div', {class:'navlinks'},
    el('a', {href:'index.html', text:'Home'}),
    el('a', {href:'courses.html', text:'Courses'}),
    el('a', {href:'editor.html', text:'Try-It'}),
    el('a', {href:'glossary.html', text:'Glossary'})
  );

  const inner = el('div', {class:'inner'}, brand, searchbar, nav);
  const bar = el('div', {class:'topbar'}, inner);
  document.body.prepend(bar);

  setActiveNav();

  const go = ()=>{
    const q = (input.value||'').trim();
    if(!q) return;
    location.href = `search.html?q=${encodeURIComponent(q)}`;
  };
  btn.addEventListener('click', go);
  input.addEventListener('keydown', (e)=>{ if(e.key==='Enter') go(); });
}

function renderFooter(){
  const f = el('div', {class:'footer', text:'© 2026 CodeLearn • Practice HTML, CSS & JavaScript'});
  document.body.appendChild(f);
}

/* ===== UI Components ===== */

function pill(text){
  return el('span', {class:'pill', text});
}
function badge(text){
  return el('span', {class:'badge', text});
}
function sideitemLink({href, title, meta, rightBadge, active=false}){
  const a = el('a', {href}, el('b', {text:title}), meta ? el('span',{class:'muted small', text:` • ${meta}`}) : null);
  const item = el('div', {class:`sideitem${active?' active':''}`}, a, badge(rightBadge||'OPEN'));
  return item;
}

function renderCourseCard(course){
  const title = el('div', {style:{fontSize:'18px', fontWeight:'900'}, text:course.title});
  const short = el('div', {class:'muted', style:{lineHeight:'1.6', marginTop:'4px'}, text:course.short});

  const pills = el('div', {class:'pills'},
    pill(course.level),
    pill(`${course.lessonCount} lessons`),
    pill('Try-It included')
  );

  const left = el('div', {}, title, short, pills);
  const right = badge('OPEN');

  const head = el('div', {style:{display:'flex', justifyContent:'space-between', gap:'10px', alignItems:'flex-start'}}, left, right);

  const card = el('a', {class:'card', href:`course.html?id=${encodeURIComponent(course.id)}`, style:{display:'block'}}, head);
  return card;
}

function lessonBlock(block){
  if(block.type==='h'){
    return el('h2', {class:'block', text:block.text});
  }
  if(block.type==='p'){
    return el('p', {class:'block', style:{lineHeight:'1.75'}, text:block.text});
  }
  if(block.type==='note'){
    return el('div', {class:'note block'},
      el('b', {text:block.title}),
      el('div', {style:{marginTop:'6px'}, text:block.text})
    );
  }
  
  if(block.type==='image'){
    const img = el('img', {src:block.src, alt:block.title||'Image', style:{width:'100%', borderRadius:'16px', border:'1px solid rgba(255,255,255,.14)', boxShadow:'0 18px 50px rgba(0,0,0,.28)'}});
    img.onerror = ()=>{ img.src = 'assets/visuals/fallback.svg'; };
    const cap = block.caption ? el('div', {class:'muted small', style:{marginTop:'8px'}, text:block.caption}) : null;
    return el('div', {class:'block card'},
      el('b', {text:block.title || 'Visual'}),
      el('div', {style:{height:'10px'}}),
      img,
      cap
    );
  }
if(block.type==='syntax'){
    const top = el('div', {style:{display:'flex', justifyContent:'space-between', gap:'10px', alignItems:'center'}},
      el('div', {},
        el('b', {text:block.title}),
        el('div', {class:'muted small', text:block.description || ''})
      ),
      badge(block.code?.language || 'code')
    );
    const pre = el('pre', {class:'code', style:{marginTop:'10px'}});
    pre.textContent = block.code?.value || '';
    return el('div', {class:'block card'}, top, pre);
  }
  if(block.type==='example'){
    const top = el('div', {style:{display:'flex', justifyContent:'space-between', gap:'10px', alignItems:'center'}},
      el('div', {},
        el('b', {text:block.title}),
        el('div', {class:'muted small', text:block.description || ''})
      ),
      badge(block.code?.language || 'code')
    );
    const pre = el('pre', {class:'code', style:{marginTop:'10px'}});
    pre.textContent = block.code?.value || '';

    const wrap = el('div', {class:'block card'}, top, pre);

    if(block.result){
      wrap.appendChild(el('div', {class:'muted small', style:{margin:'8px 0 6px'}, text:'Result preview:'}));
      const iframe = el('iframe', {
        class:'preview',
        sandbox:'allow-scripts allow-forms allow-modals allow-popups'
      });
      iframe.srcdoc = snippetToPreviewHTML(block.result.html||'', block.result.css||'', block.result.js||'');
      wrap.appendChild(iframe);
    }
    return wrap;
  }
  if(block.type==='tryit'){
    const starter = block.starter || {html:'', css:'', js:''};
    const payload = encodeURIComponent(JSON.stringify(starter));
    const top = el('div', {style:{display:'flex', justifyContent:'space-between', gap:'10px', alignItems:'center', flexWrap:'wrap'}},
      el('div', {},
        el('b', {text:block.title || 'Try it'}),
        el('div', {class:'muted small', text:'Open in editor with starter code.'})
      ),
      el('a', {class:'btn', href:`editor.html?starter=${payload}`, text:'Open Editor'})
    );
    return el('div', {class:'block card'}, top);
  }
  return null;
}

/* ===== Pages ===== */

async function pageIndex(){
  const db = await loadDB();
  const app = $('#app');

  const hero = el('div', {class:'hero'},
    el('h1', {text:'Learn HTML, CSS & JavaScript'}),
    el('p', {text:'Real tutorial-style platform: definitions, syntax, examples, and a Try‑It editor to practice with real code.'}),
    el('div', {class:'kpi'},
      el('div', {class:'k'}, el('b',{text:String(db.courses.length)}), el('span',{class:'muted small', text:'Courses'})),
      el('div', {class:'k'}, el('b',{text:String(db.lessons.length)}), el('span',{class:'muted small', text:'Lessons'})),
      el('div', {class:'k'}, el('b',{text:String(db.glossary.length)}), el('span',{class:'muted small', text:'Glossary terms'})),
    ),
    el('div', {class:'pills'},
      pill('Search'), pill('Editor'), pill('Preview Output'), pill('Offline friendly')
    )
  );

  const grid = el('div', {class:'grid cols3', id:'courseGrid'});
  db.courses.forEach(c=>grid.appendChild(renderCourseCard(c)));

  replaceChildren(app, hero, el('div',{style:{height:'14px'}}), grid);
}

async function pageCourses(){
  const db = await loadDB();
  const app = $('#app');

  const head = el('div', {class:'card'},
    el('h1', {style:{margin:'0 0 6px'}, text:'Courses'}),
    el('div', {class:'muted', text:'Pick a course and start learning.'})
  );

  const grid = el('div', {class:'grid cols3'});
  db.courses.forEach(c=>grid.appendChild(renderCourseCard(c)));

  replaceChildren(app, head, el('div',{style:{height:'12px'}}), grid);
}

async function pageCourse(){
  const db = await loadDB();
  const id = qs('id');
  const course = db.courses.find(c=>c.id===id) || db.courses[0];
  const courseLessons = db.lessons.filter(l=>l.courseId===course.id);

  const modules = course.modules.map(m=>{
    const ls = m.lessonSlugs.map(s=>courseLessons.find(x=>x.slug===s)).filter(Boolean);
    return {title:m.title, lessons:ls};
  });
  const firstSlug = modules[0]?.lessons[0]?.slug || courseLessons[0]?.slug;

  const headerLeft = el('div', {},
    el('h1', {style:{margin:'0'}, text:course.title}),
    el('div', {class:'muted', style:{marginTop:'6px', lineHeight:'1.6'}, text:course.short}),
    el('div', {class:'pills', style:{marginTop:'10px'}},
      pill(course.level), pill(`${course.lessonCount} lessons`), pill('JSON content')
    )
  );
  const startBtn = el('a', {class:'btn', href:`lesson.html?course=${encodeURIComponent(course.id)}&slug=${encodeURIComponent(firstSlug)}`, text:'Start Learning'});
  const header = el('div', {class:'card'},
    el('div', {style:{display:'flex', justifyContent:'space-between', gap:'12px', alignItems:'flex-start', flexWrap:'wrap'}}, headerLeft, startBtn)
  );

  const modList = el('div', {id:'modList'});
  modules.forEach(m=>{
    modList.appendChild(el('div', {class:'sideitem'}, el('span',{text:m.title}), badge(String(m.lessons.length))));
  });
  const sidebar = el('div', {class:'sidebar card'}, el('h3',{text:'Modules'}), modList);

  const outline = el('div', {id:'outline'});
  modules.forEach(m=>{
    const sec = el('div', {class:'sec'},
      el('h3', {text:m.title})
    );
    m.lessons.forEach(l=>{
      sec.appendChild(el('div', {class:'sideitem'},
        el('a', {href:`lesson.html?course=${encodeURIComponent(course.id)}&slug=${encodeURIComponent(l.slug)}`, text:l.title}),
        badge(l.level)
      ));
    });
    outline.appendChild(sec);
  });

  const main = el('div', {class:'card'},
    el('h2', {style:{margin:'0 0 10px'}, text:'Course Outline'}),
    el('div', {class:'muted', style:{lineHeight:'1.7'}, text:'Click any lesson to open it.'}),
    el('hr', {class:'sep'}),
    outline
  );

  const layout = el('div', {class:'layout'}, sidebar, main);

  replaceChildren(app, header, el('div',{style:{height:'12px'}}), layout);
}

async function pageLesson(){
  const db = await loadDB();
  const courseId = qs('course');
  const slug = qs('slug');
  const course = db.courses.find(c=>c.id===courseId) || db.courses[0];
  const courseLessons = db.lessons.filter(l=>l.courseId===course.id);

  const modules = course.modules.map(m=>({
    title:m.title,
    lessons:m.lessonSlugs.map(s=>courseLessons.find(x=>x.slug===s)).filter(Boolean)
  }));

  const lesson = courseLessons.find(l=>l.slug===slug) || courseLessons[0];

  const order = course.modules.flatMap(m=>m.lessonSlugs);
  const idx = order.indexOf(lesson.slug);
  const prevSlug = idx>0 ? order[idx-1] : null;
  const nextSlug = idx>=0 && idx<order.length-1 ? order[idx+1] : null;

  // Left column: course info + sidebar
  const courseCard = el('div', {class:'card'},
    el('div', {class:'muted small', text:'Course'}),
    el('div', {style:{fontWeight:'900', fontSize:'16px', marginTop:'2px'}, text:course.title}),
    el('div', {class:'row', style:{marginTop:'10px'}},
      el('a', {class:'btn', href:`course.html?id=${encodeURIComponent(course.id)}`, text:'Outline'}),
      el('a', {class:'btn', href:`search.html?q=${encodeURIComponent(course.id)}`, text:'Search'}),
    )
  );

  const sidebarList = el('div', {class:'card sidebar'});
  modules.forEach(m=>{
    const sec = el('div', {class:'sec'}, el('h3', {text:m.title}));
    m.lessons.forEach(l=>{
      const item = el('div', {class:`sideitem${l.slug===lesson.slug?' active':''}`},
        el('a', {href:`lesson.html?course=${encodeURIComponent(course.id)}&slug=${encodeURIComponent(l.slug)}`, text:l.title}),
        badge(l.level)
      );
      sec.appendChild(item);
    });
    sidebarList.appendChild(sec);
  });

  const left = el('div', {class:'sidebar'},
    courseCard,
    el('div',{style:{height:'12px'}}),
    sidebarList
  );

  // Right column: lesson content
  const meta = el('div', {class:'muted small', text:`${lesson.module} • ${lesson.level} • ~${lesson.estimatedMinutes} min`});
  const title = el('h1', {text:lesson.title});
  const tags = el('div', {class:'pills'});
  (lesson.tags||[]).slice(0,8).forEach(t=>tags.appendChild(pill(t)));

  const blocksWrap = el('div', {id:'lessonBlocks'});
  (lesson.blocks||[]).forEach(b=>{
    const node = lessonBlock(b);
    if(node) blocksWrap.appendChild(node);
  });

  const navRow = el('div', {class:'row', style:{justifyContent:'space-between'}},
    el('div', {},
      prevSlug ? el('a', {class:'btn', href:`lesson.html?course=${encodeURIComponent(course.id)}&slug=${encodeURIComponent(prevSlug)}`, text:'← Prev'}) : null
    ),
    el('div', {class:'row'},
      el('a', {class:'btn', href:'editor.html', text:'Try-It'}),
      nextSlug ? el('a', {class:'btn', href:`lesson.html?course=${encodeURIComponent(course.id)}&slug=${encodeURIComponent(nextSlug)}`, text:'Next →'}) : null
    )
  );

  const right = el('div', {class:'card lesson'},
    meta, title, tags,
    el('hr',{class:'sep'}),
    blocksWrap,
    el('hr',{class:'sep'}),
    navRow
  );

  const layout = el('div', {class:'layout'}, left, right);
  replaceChildren($('#app'), layout);
}

async function pageGlossary(){
  const db = await loadDB();
  const app = $('#app');

  const head = el('div', {class:'card'},
    el('h1', {style:{margin:'0 0 6px'}, text:'Glossary'}),
    el('div', {class:'muted', text:'Key terms used in lessons.'})
  );

  const list = el('div', {class:'card'});
  db.glossary.forEach(g=>{
    const left = el('div', {},
      el('b', {text:g.term}),
      el('div', {class:'muted small', style:{marginTop:'4px', lineHeight:'1.6'}, text:g.definition})
    );
    list.appendChild(el('div', {class:'sideitem', style:{alignItems:'flex-start'}}, left, badge('TERM')));
  });

  replaceChildren(app, head, el('div',{style:{height:'12px'}}), list);
}

async function pageSearch(){
  const db = await loadDB();
  const q = (qs('q')||'').trim().toLowerCase();
  const app = $('#app');

  const head = el('div', {class:'card'},
    el('h1', {style:{margin:'0 0 6px'}, text:'Search'}),
    el('div', {class:'muted'},
      'Query: ', el('b',{text:q || '(empty)'}), '. Try: ',
      el('kbd',{text:'forms'}), ' ', el('kbd',{text:'flexbox'}), ' ', el('kbd',{text:'grid'}), ' ', el('kbd',{text:'DOM'})
    )
  );

  const results = el('div', {class:'card', id:'results'});

  if(!q){
    results.appendChild(el('div', {class:'muted', text:'Type something in the top search bar to find lessons.'}));
    replaceChildren(app, head, el('div',{style:{height:'12px'}}), results);
    return;
  }

  const matches = db.lessons.filter(l=>{
    const hay = (l.title+' '+l.module+' '+(l.tags||[]).join(' ')+' '+(l.blocks||[]).map(b=>JSON.stringify(b)).join(' ')).toLowerCase();
    return hay.includes(q);
  }).slice(0, 200);

  if(matches.length===0){
    results.appendChild(el('div', {class:'muted', text:'No results found.'}));
  }else{
    matches.forEach(l=>{
      const a = el('a', {href:`lesson.html?course=${encodeURIComponent(l.courseId)}&slug=${encodeURIComponent(l.slug)}`},
        el('b',{text:l.title}),
        el('span',{class:'muted small', text:` • ${l.courseId.toUpperCase()} • ${l.module}`})
      );
      results.appendChild(el('div', {class:'sideitem'}, a, badge(l.level)));
    });
  }

  replaceChildren(app, head, el('div',{style:{height:'12px'}}), results);
}

function decodeStarter(){
  const raw = qs('starter');
  if(!raw) return null;
  try{ return JSON.parse(decodeURIComponent(raw)); }catch{ return null; }
}
function setTab(tab){
  $$('.tabbtn').forEach(b=>b.classList.toggle('active', b.dataset.tab===tab));
  $$('.editorarea').forEach(a=>a.style.display = (a.dataset.tab===tab ? 'block' : 'none'));
}
function runEditor(){
  const html = $('#taHtml').value;
  const css = $('#taCss').value;
  const js = $('#taJs').value;
  $('#preview').srcdoc = snippetToPreviewHTML(html, css, js);
}
function saveDraft(){
  const key = 'codelrn-draft';
  const draft = {html:$('#taHtml').value, css:$('#taCss').value, js:$('#taJs').value};
  localStorage.setItem(key, JSON.stringify(draft));
  const msg = $('#saveMsg');
  msg.textContent = 'Saved ✅';
  setTimeout(()=>msg.textContent='', 1200);
}
function loadDraft(){
  const key='codelrn-draft';
  try{ return JSON.parse(localStorage.getItem(key)||'null'); }catch{ return null; }
}

async function pageEditor(){
  const app = $('#app');

  const head = el('div', {class:'card'},
    el('h1', {style:{margin:'0 0 6px'}, text:'Try-It Editor'}),
    el('div', {class:'muted', text:'Write HTML/CSS/JS and run instantly. Save stores draft in localStorage.'})
  );

  const tabs = el('div', {class:'tabs'},
    el('button', {class:'tabbtn active', dataset:{tab:'html'}, text:'HTML'}),
    el('button', {class:'tabbtn', dataset:{tab:'css'}, text:'CSS'}),
    el('button', {class:'tabbtn', dataset:{tab:'js'}, text:'JS'}),
  );

  const runBtn = el('button', {class:'btn', id:'runBtn', text:'Run ▶'});
  const saveBtn = el('button', {class:'btn', id:'saveBtn', text:'Save'});
  const saveMsg = el('span', {id:'saveMsg', class:'muted small'});

  const controls = el('div', {class:'row'}, runBtn, saveBtn, saveMsg);

  const top = el('div', {class:'row', style:{justifyContent:'space-between', alignItems:'center'}}, tabs, controls);

  const taHtml = el('textarea', {id:'taHtml', class:'editorarea', dataset:{tab:'html'}, placeholder:'HTML here…'});
  const taCss  = el('textarea', {id:'taCss',  class:'editorarea', dataset:{tab:'css'}, placeholder:'CSS here…', style:{display:'none'}});
  const taJs   = el('textarea', {id:'taJs',   class:'editorarea', dataset:{tab:'js'},  placeholder:'JS here…',  style:{display:'none'}});

  const left = el('div', {class:'card'},
    top,
    el('div', {style:{height:'10px'}}),
    taHtml, taCss, taJs,
    el('div', {class:'muted small', style:{marginTop:'10px', lineHeight:'1.6'}, text:'Preview runs inside a sandboxed iframe.'})
  );

  const iframe = el('iframe', {id:'preview', class:'preview', sandbox:'allow-scripts allow-forms allow-modals allow-popups'});
  const right = el('div', {class:'card'},
    el('div', {style:{display:'flex', justifyContent:'space-between', alignItems:'center', gap:'10px'}},
      el('b', {text:'Output'}), badge('LIVE')
    ),
    el('div', {style:{height:'10px'}}),
    iframe
  );

  const editorGrid = el('div', {class:'editor'}, left, right);

  replaceChildren(app, head, el('div',{style:{height:'12px'}}), editorGrid);

  const starter = decodeStarter();
  const draft = loadDraft();
  const seed = starter || draft || {
    html: "<h1>Hello!</h1>\n<p>Edit code and click Run.</p>\n<button id=\"b\">Click</button>\n<p id=\"o\"></p>",
    css: "body{font-family:system-ui;padding:16px}\nh1{color:#2563eb}\nbutton{padding:10px 12px;border:0;border-radius:12px;background:#2563eb;color:#fff;font-weight:900}",
    js: "document.getElementById('b').onclick=()=>{document.getElementById('o').textContent='Clicked ✅';};"
  };
  taHtml.value = seed.html || '';
  taCss.value  = seed.css  || '';
  taJs.value   = seed.js   || '';

  $$('.tabbtn').forEach(b=>b.addEventListener('click', ()=>setTab(b.dataset.tab)));
  runBtn.addEventListener('click', runEditor);
  saveBtn.addEventListener('click', saveDraft);
  runEditor();
}

/* ===== Router ===== */

async function boot(){
  renderTopbar();

  const page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const routes = {
    'index.html': pageIndex,
    'courses.html': pageCourses,
    'course.html': pageCourse,
    'lesson.html': pageLesson,
    'editor.html': pageEditor,
    'glossary.html': pageGlossary,
    'search.html': pageSearch
  };
  const fn = routes[page] || pageIndex;

  try{ await fn(); }
  catch(e){
    const app = $('#app');
    replaceChildren(app,
      el('div',{class:'card'},
        el('h1',{style:{margin:'0 0 6px'}, text:'Error'}),
        el('div',{class:'muted', text:String(e)})
      )
    );
    console.error(e);
  }

  renderFooter();
}

document.addEventListener('DOMContentLoaded', boot);


// Home page metrics
(async function(){
  try{
    if((location.pathname.split('/').pop()||'index.html').toLowerCase()!=='index.html') return;
    const r = await fetch('data/content.json');
    const db = await r.json();
    const mLessons = document.getElementById('mLessons');
    const mTerms = document.getElementById('mTerms');
    if(mLessons) mLessons.textContent = (db.lessons||[]).length;
    if(mTerms) mTerms.textContent = (db.glossary||[]).length;
  }catch(e){}
})();
