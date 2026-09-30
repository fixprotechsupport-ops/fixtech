(() => {
  const DEFAULTS=window.FIXTECH_DATA;
  const deep=v=>JSON.parse(JSON.stringify(v));
  const PROMO_ELEMENT_DEFAULTS=[{id:'badge',label:'Promotion Badge'},{id:'title',label:'Main Title'},{id:'description',label:'Description'},{id:'price',label:'Price Box'},{id:'features',label:'Feature Group'},{id:'download',label:'Download Button'},{id:'version',label:'Version Text'}];
  const PROMO_FEATURE_DEFAULTS=['Repairs','Deposits & due','Accessories','Reports & invoices','Printing','Users & permissions'];
  function childBlueprints(s){
    if(!s)return[];
    if(s.id==='pos-intro')return[];
    if(s.id==='pos-features')return[{id:'eyebrow'},{id:'title'},{id:'description'},{id:'cards'}];
    if(s.id==='pos-workflow')return[{id:'eyebrow'},{id:'title'},{id:'description'},{id:'steps'}];
    if(s.id==='pos-bottom-highlight'||s.type==='posHighlight')return[{id:'eyebrow'},{id:'title'},{id:'description'},{id:'cards'}];
    if(s.id==='contact-main')return[{id:'title'},{id:'description'},{id:'note'}];
    if(s.type==='contactForm'||s.id==='contact-form')return[{id:'title'},{id:'description'},{id:'form'}];
    if(s.type==='hero')return[{id:'title'},{id:'description'},{id:'button'},{id:'slideshow'}];
    if(s.type==='pageHeading'||s.type==='sectionHeading')return[{id:'title'},{id:'description'}];
    if(s.type==='featureCard')return[{id:'title'},{id:'description'},{id:'button'}];
    if(s.type==='pos')return[{id:'eyebrow'},{id:'title'},{id:'description'},{id:'button'},{id:'visual'}];
    if(s.type==='panicFilters')return[{id:'title'},{id:'description'},{id:'controls'}];
    if(s.type==='panicResults')return[{id:'title'},{id:'description'},{id:'count'},{id:'results'}];
    if(s.type==='knowledgeTopics')return[{id:'title'},{id:'description'},{id:'topics'}];
    if(s.type==='knowledgeDetail')return[{id:'topicTitle'},{id:'description'},{id:'content'}];
    if(s.type==='quiz')return[{id:'controls'},{id:'progress'},{id:'question'},{id:'answers'},{id:'feedback'},{id:'navigation'}];
    return[{id:'title'},{id:'description'}];
  }
  function ensureSectionChildren(s){if(!s||s.id==='pos-intro')return[];if(!Array.isArray(s.childElements))s.childElements=childBlueprints(s).map(x=>({id:x.id}));return s.childElements}
  function hasSectionChild(s,id){return ensureSectionChildren(s).some(x=>!x.kind&&x.id===id)}
  function imageStyleV602(st){
    st=st||{};const o=[];
    if(st.widthPct!==undefined&&+st.widthPct>=10&&+st.widthPct<=100)o.push(`width:${+st.widthPct}%`);
    if(st.maxWidth!==undefined&&+st.maxWidth>=60&&+st.maxWidth<=1800)o.push(`max-width:${+st.maxWidth}px`);
    if(st.height!==undefined&&+st.height>=60&&+st.height<=1000)o.push(`height:${+st.height}px`);
    if(st.fit==='contain'||st.fit==='cover')o.push(`object-fit:${st.fit}`);
    if(st.radius!==undefined&&+st.radius>=0&&+st.radius<=60)o.push(`border-radius:${+st.radius}px`);
    if(st.align==='center')o.push('margin-left:auto','margin-right:auto');
    else if(st.align==='right')o.push('margin-left:auto','margin-right:0');
    else if(st.align==='left')o.push('margin-left:0','margin-right:auto');
    return o.length?` style="${o.join(';')}"`:'';
  }
  function customChildMarkup(c){
    if(!c?.kind)return'';
    if(c.kind==='text')return `<div class="ft-custom-child ft-custom-text" data-ft-child="${attr(c.id)}"><p>${esc(c.text||'')}</p></div>`;
    if(c.kind==='button')return `<div class="ft-custom-child ft-custom-button" data-ft-child="${attr(c.id)}"><button class="primary" data-route="${attr(c.route||'home')}">${esc(c.text||'Button')}</button></div>`;
    if(c.kind==='image')return c.image?`<div class="ft-custom-child ft-custom-image" data-ft-child="${attr(c.id)}"><img src="${attr(c.image)}" alt="${attr(c.alt||'Image')}"${imageStyleV602(c.imageStyle)}></div>`:'';
    return'';
  }
  function childSequence(s,parts){return ensureSectionChildren(s).map(c=>c.kind?customChildMarkup(c):(parts[c.id]?parts[c.id](c):'')).join('')}
  const ensurePromoElements=intro=>{if(!intro)return[];if(!Array.isArray(intro.promoElements))intro.promoElements=deep(PROMO_ELEMENT_DEFAULTS.map(x=>({id:x.id})));if(!Array.isArray(intro.promoFeatures)||!intro.promoFeatures.length)intro.promoFeatures=deep(PROMO_FEATURE_DEFAULTS);return intro.promoElements};
  const PUBLISHED_STATE=window.FIXTECH_PUBLISHED_STATE&&typeof window.FIXTECH_PUBLISHED_STATE==='object'?window.FIXTECH_PUBLISHED_STATE:null;
  const IS_LOCAL_PREVIEW=['localhost','127.0.0.1','::1'].includes(location.hostname);
  const PUBLISHED_KEYS={'fixtech.site':'site','fixtech.nav':'nav','fixtech.pages':'pages','fixtech.panicEntries':'panicEntries','fixtech.panicCatalog':'panicCatalog','fixtech.knowledgeTopics':'knowledgeTopics','fixtech.questions':'questions'};
  const load=(k,f)=>{
    const publishedKey=PUBLISHED_KEYS[k];
    if(IS_LOCAL_PREVIEW){
      try{
        const raw=localStorage.getItem(k);
        if(raw!==null)return JSON.parse(raw)??deep(f);
      }catch{}
      if(PUBLISHED_STATE&&publishedKey&&Object.prototype.hasOwnProperty.call(PUBLISHED_STATE,publishedKey))return deep(PUBLISHED_STATE[publishedKey]);
      return deep(f);
    }
    if(PUBLISHED_STATE&&publishedKey&&Object.prototype.hasOwnProperty.call(PUBLISHED_STATE,publishedKey))return deep(PUBLISHED_STATE[publishedKey]);
    try{return JSON.parse(localStorage.getItem(k))??deep(f)}catch{return deep(f)}
  };
  const defaultZone=s=>s.zone||(s.type==='hero'||s.type==='pageHeading'?'top':s.type==='pos'?'bottom':'main');
  const normalizePages=pages=>{Object.values(pages||{}).forEach(p=>(p.sections||[]).forEach(s=>{if(!s.zone)s.zone=defaultZone(s)}));return pages};
  function migratePages(pages){
    const home=pages?.home;
    if(home?.sections?.some(s=>s.type==='features')){
      const out=[];
      for(const s of home.sections){
        if(s.type!=='features'){out.push(s);continue}
        const zone=s.zone||'main', style=s.style||{};
        out.push({id:'home-section-heading',zone,type:'sectionHeading',title:s.title||'Learn • Diagnose • Practice',text:'',visible:s.visible!==false,style:deep(style)});
        out.push({id:'home-card-panic',zone,type:'featureCard',title:'Panic Log',text:'Choose a phone model and see codes directly below.',buttonText:'Explore →',buttonRoute:'panic',visible:true,style:{}});
        out.push({id:'home-card-knowledge',zone,type:'featureCard',title:'General Knowledge',text:'IC, capacitor, resistor, diode, motherboard, short circuit and more.',buttonText:'Explore →',buttonRoute:'knowledge',visible:true,style:{}});
        out.push({id:'home-card-qa',zone,type:'featureCard',title:'Q&A',text:'Practice with simple technician questions.',buttonText:'Explore →',buttonRoute:'qa',visible:true,style:{}});
      }
      home.sections=out;
    }
    const hero=home?.sections?.find(s=>s.type==='hero');
    const defaultHero=DEFAULTS.pages?.home?.sections?.find(s=>s.type==='hero');
    if(hero&&!Array.isArray(hero.slides))hero.slides=deep(defaultHero?.slides||[]);
    if(hero&&(!hero.slideSeconds||+hero.slideSeconds<2))hero.slideSeconds=defaultHero?.slideSeconds||5;
    if(hero&&['Explore Panic Log','Go to Panic Log','Open Panic Log'].includes(hero.buttonText))hero.buttonText='Panic Log';
    if(hero&&Array.isArray(hero.slides)){const ps=hero.slides.find(x=>x.id==='hero-slide-panic'||x.buttonRoute==='panic');if(ps&&['Open Panic Log','Go to Panic Log','Explore Panic Log'].includes(ps.buttonText))ps.buttonText='Open';}
    const qaSection=pages?.qa?.sections?.find(s=>s.id==='qa-quiz'||s.type==='quiz');
    if(qaSection&&qaSection.title==='Repair Knowledge Quiz')qaSection.title='Q&A Questions';
    if(qaSection&&qaSection.text==='Choose 10, 20, or all questions.')qaSection.text='Choose 10, 20, or all questions to practice.';
    const pos=pages?.pos;
    if(pos?.sections){
      const h=pos.sections.find(s=>s.id==='pos-heading');
      if(h&&h.text==='Phone repair shop management made simple.')h.text='Repair management, deposits, accessories, reports and invoices — in one clean Windows app.';
      const intro=pos.sections.find(s=>s.id==='pos-intro');
      if(intro&&intro.title==='Manage Repairs in One Place')intro.title='Run Your Repair Shop with FixPro';
      if(intro&&intro.text==='FixPro POS brings repairs, deposits, accessories, reports, invoices and shop management into one clean system.')intro.text='Keep the whole repair workflow organized — from customer check-in and deposits to accessories, final payment, reports and professional invoices.';
      if(intro){
        const dIntro=DEFAULTS.pages?.pos?.sections?.find(s=>s.id==='pos-intro');
        if(!intro.promoLabel)intro.promoLabel=dIntro?.promoLabel||'SPECIAL PROMOTION';
        if(!intro.promoPrice)intro.promoPrice=dIntro?.promoPrice||'$10';
        if(!intro.promoPeriod)intro.promoPeriod=dIntro?.promoPeriod||'/ YEAR';
        if(!intro.promoTitle)intro.promoTitle=dIntro?.promoTitle||'FixPro POS';
        if(!intro.promoText)intro.promoText=dIntro?.promoText||'Simple annual access for phone repair shops.';
        if(!intro.promoFoot)intro.promoFoot=dIntro?.promoFoot||'Windows • Version 0.26.0';
        if(intro.promoImage===undefined)intro.promoImage=dIntro?.promoImage||'';
        ensurePromoElements(intro);
      }
      const dl=pos.sections.find(s=>s.id==='pos-download'||s.type==='posDownload');
      if(dl&&dl.title==='Download FixPro')dl.title='Get FixPro for Windows';
      if(dl&&dl.text==='Windows installer • Version 0.26.0')dl.text='Version 0.26.0 • Windows installer';
      const f=pos.sections.find(s=>s.id==='pos-features');
      if(f&&f.title==='Core Features')f.title='Everything Your Shop Needs';
      // v5.52: one download CTA only. Keep the promotional content in the main flow
      // and place the single installer CTA at the end of the page.
      if(f&&f.zone==='bottom')f.zone='main';
      if(dl&&dl.zone==='main')dl.zone='bottom';
      // v5.68: add the new bottom FixPro highlight exactly once for existing installs.
      // Do not rebuild or restore any other section the owner has already deleted.
      if(!localStorage.getItem('fixtech.posBottom568')){
        const bottomDefault=DEFAULTS.pages?.pos?.sections?.find(s=>s.id==='pos-bottom-highlight');
        if(bottomDefault&&!pos.sections.some(s=>s.id==='pos-bottom-highlight'))pos.sections.push(deep(bottomDefault));
        localStorage.setItem('fixtech.posBottom568','1');
      }
    }

    // FIXTECH_ABOUT_PRO_V576
    // Professional About content that is distinct from the Home page.
    // Existing deletions are respected: no deleted section is recreated.
    const about=pages?.about;
    if(about?.sections&&!localStorage.getItem('fixtech.aboutPro576')){
      const heading=about.sections.find(s=>s.id==='about-heading');
      if(heading){
        heading.title='About FixTech';
        heading.text='Practical iPhone repair knowledge, organized clearly for technicians.';
      }

      const main=about.sections.find(s=>s.id==='about-main');
      if(main){
        main.title='Built Around Practical Repair Knowledge';
        main.text='FixTech is designed for technicians who want a cleaner way to learn, reference, and organize repair knowledge. The goal is simple: make useful technical information easier to understand and faster to find.';
      }

      const oldMap={
        'about-panic':{
          title:'Our Purpose',
          text:'To organize repair knowledge into a clear reference that technicians can use while learning, diagnosing, and improving their skills.'
        },
        'about-knowledge':{
          title:'Who FixTech Is For',
          text:'FixTech is made for repair technicians, learners, and shop teams who want practical information without unnecessary clutter.'
        },
        'about-practice':{
          title:'Our Content Approach',
          text:'Content is presented in a direct, technician-friendly format with emphasis on clarity, useful context, and information that supports real repair work.'
        }
      };

      Object.entries(oldMap).forEach(([id,v])=>{
        const s=about.sections.find(x=>x.id===id);
        if(s){
          s.title=v.title;
          s.text=v.text;
        }
      });

      // Add a fourth About-only section only when no prior section with this ID exists.
      // This is a new element for the redesign, not a restoration of a deleted old element.
      if(!about.sections.some(s=>s.id==='about-growth')){
        about.sections.push({
          id:'about-growth',
          zone:'main',
          type:'text',
          title:'A Knowledge Base That Can Grow',
          text:'FixTech is structured so new repair knowledge can be added and organized over time while keeping the website simple and consistent.',
          visible:true,
          style:{}
        });
      }

      localStorage.setItem('fixtech.aboutPro576','1');
    }
    // FIXTECH_ABOUT_CLEANUP_V577
    if(pages?.about&&!localStorage.getItem('fixtech.aboutCleanup577')){
      const h=pages.about.sections?.find(s=>s.id==='about-heading');
      if(h&&h.text==='A focused iPhone repair knowledge website built to keep technical information clear, practical, and easy to use.'){
        h.text='Practical iPhone repair knowledge, organized clearly for technicians.';
      }
      localStorage.setItem('fixtech.aboutCleanup577','1');
    }

    // FIXTECH_CONTACT_SUPPORT_V579
    // Set the Contact page to use the official support address and add one
    // message form. This migration runs once so deleted elements stay deleted.
    const contact=pages?.contact;
    if(contact?.sections&&!localStorage.getItem('fixtech.contactSupport579')){
      const heading=contact.sections.find(s=>s.id==='contact-heading');
      if(heading){
        heading.title='Contact & Support';
        heading.text='Send us a message or contact FixTech support directly.';
      }

      const support=contact.sections.find(s=>s.id==='contact-main');
      if(support){
        support.title='Support';
        support.text='Need help with FixTech, have a question, or want to send feedback? Contact our support team.';
        support.contactNote='fixprotechsupport@gmail.com';
      }

      if(!contact.sections.some(s=>s.id==='contact-form')){
        contact.sections.push({
          id:'contact-form',
          zone:'main',
          type:'contactForm',
          title:'Send a Message',
          text:'Fill out the form below. Your message will be sent to FixTech support.',
          visible:true,
          style:{}
        });
      }

      localStorage.setItem('fixtech.contactSupport579','1');
    }

    Object.values(pages||{}).forEach(p=>(p.sections||[]).forEach(s=>{if(s.id!=='pos-intro')ensureSectionChildren(s)}));
    return normalizePages(pages);
  }
  function migrateQuestions(saved){
    const q=Array.isArray(saved)?saved:[];
    const ids=new Set(q.map(x=>x?.id));
    // v5.21 shipped with only two demo questions. If that untouched demo set is
    // still stored in the browser, expand it to the full 20-question starter set.
    let out=(q.length<=2 && [...ids].every(id=>id==='q1'||id==='q2'))?deep(DEFAULTS.questions):(q.length?q:deep(DEFAULTS.questions));
    // v5.26: add the Q&A Basic Test bank from the supplied PDF without replacing existing questions.
    const basicDefaults=(DEFAULTS.questions||[]).filter(x=>String(x?.id||'').startsWith('basic'));
    const existingIds=new Set(out.map(x=>x?.id));
    const missingBasic=basicDefaults.filter(x=>!existingIds.has(x.id));
    if(missingBasic.length)out=[...deep(missingBasic),...out];
    // v5.24: add one optional-image example to the untouched starter Q1 once.
    // After this one-time migration, Admin can remove/replace it without it returning.
    if(!localStorage.getItem('fixtech.qimage524')){
      const d=DEFAULTS.questions?.[0],x=out.find(v=>v?.id==='q1');
      if(d&&x&&x.question===d.question&&!x.image){x.image=d.image||'';x.imageSize=d.imageSize||'medium';x.imageCaption=d.imageCaption||''}
      localStorage.setItem('fixtech.qimage524','1');
    }
    // v5.25: introduce explicit Q&A types without overwriting custom questions.
    if(!localStorage.getItem('fixtech.qtypes525')){
      const q5=out.find(v=>v?.id==='q5');
      if(q5&&q5.question==='What is a short circuit?'){Object.assign(q5,{questionType:'truefalse',question:'A short circuit is an unintended low-resistance path in a circuit.',options:['True','False'],answer:0,shuffleAnswers:false,explanation:'True. A short circuit creates an unintended low-resistance path and can cause excessive current.'})}
      const q16=out.find(v=>v?.id==='q16');
      if(q16&&q16.question==='When measuring resistance on a board, what is generally safer?'){Object.assign(q16,{questionType:'truefalse',question:'Resistance measurements should always be taken with power applied to the board.',options:['True','False'],answer:1,shuffleAnswers:false,explanation:'False. Resistance measurements are generally made with power removed unless a specific diagnostic procedure says otherwise.'})}
      const q20=out.find(v=>v?.id==='q20');
      if(q20&&q20.question==='Why should a panic code be treated as a diagnostic clue rather than a guaranteed failed part?'){Object.assign(q20,{questionType:'truefalse',question:'A panic code always guarantees that one specific part has failed.',options:['True','False'],answer:1,shuffleAnswers:false,explanation:'False. A panic code is a diagnostic clue. The exact failed part still needs inspection and testing.'})}
      localStorage.setItem('fixtech.qtypes525','1');
    }
    out.forEach(x=>{
      if(!x.questionType)x.questionType='multiple';
      if(x.questionType==='truefalse'){x.options=['True','False'];x.answer=(+x.answer===1)?1:0;x.shuffleAnswers=false}
      else if(x.questionType==='multiselect'){x.options=Array.isArray(x.options)?x.options:[];x.answers=Array.isArray(x.answers)?x.answers.map(Number).filter(Number.isInteger):[];if(x.shuffleAnswers===undefined)x.shuffleAnswers=true}
      else{x.questionType='multiple';if(x.shuffleAnswers===undefined)x.shuffleAnswers=true}
    });
    return out;
  }
  const state={site:load('fixtech.site',DEFAULTS.site),nav:load('fixtech.nav',DEFAULTS.nav),pages:migratePages(load('fixtech.pages',DEFAULTS.pages)),panicEntries:load('fixtech.panicEntries',DEFAULTS.panicEntries),knowledgeTopics:load('fixtech.knowledgeTopics',DEFAULTS.knowledgeTopics),questions:migrateQuestions(load('fixtech.questions',DEFAULTS.questions)),openPanic:null,qaIndex:0,qaSelected:null,qaMultiSelected:[],qaMultiRevealed:false,qaLimit:10,qaMode:'practice',qaSessionIds:[],qaResponses:{},qaFinished:false,activeTopic:load('fixtech.activeTopic','ic')};
  if(IS_LOCAL_PREVIEW){
    localStorage.setItem('fixtech.pages',JSON.stringify(state.pages));
    localStorage.setItem('fixtech.questions',JSON.stringify(state.questions));
  }

  // Keep the public website synchronized with edits made in /admin/.
  // Both pages share the same origin (localhost:8080), so localStorage is the
  // lightweight local-preview database until the real backend is connected.
  const CONTENT_KEYS=new Set(['fixtech.site','fixtech.nav','fixtech.pages','fixtech.panicEntries','fixtech.knowledgeTopics','fixtech.questions','fixtech.updatedAt']);
  function syncFromStorage(){
    state.site=load('fixtech.site',DEFAULTS.site);
    state.nav=load('fixtech.nav',DEFAULTS.nav);
    state.pages=migratePages(load('fixtech.pages',DEFAULTS.pages));
    state.panicEntries=load('fixtech.panicEntries',DEFAULTS.panicEntries);
    state.knowledgeTopics=load('fixtech.knowledgeTopics',DEFAULTS.knowledgeTopics);
    state.questions=migrateQuestions(load('fixtech.questions',DEFAULTS.questions));
    state.qaSessionIds=[];state.qaResponses={};state.qaFinished=false;state.qaIndex=0;state.qaSelected=null;state.qaMultiSelected=[];state.qaMultiRevealed=false;
  }
  const app=document.getElementById('app'),nav=document.getElementById('mainNav'),footerNav=document.getElementById('footerNav');
  const PUBLIC_ROUTE_SLUGS={home:'',panic:'panic-log',knowledge:'general-knowledge',qa:'q-and-a',pos:'fixpro-pos',about:'about',contact:'contact'};
  const PUBLIC_SLUG_ROUTES=Object.fromEntries(Object.entries(PUBLIC_ROUTE_SLUGS).filter(([,slug])=>slug).map(([id,slug])=>[slug,id]));
  const publicBasePath=()=>{
    try{const p=new URL('.',document.baseURI).pathname;return p.endsWith('/')?p:p+'/'}catch{return '/'}
  };
  const routeFromPath=()=>{
    let p=decodeURIComponent(location.pathname||'/');
    const base=publicBasePath();
    if(p.startsWith(base))p=p.slice(base.length);
    p=p.replace(/^\/+|\/+$/g,'');
    if(!p||p==='home')return 'home';
    return PUBLIC_SLUG_ROUTES[p]||'home';
  };
  const route=()=>IS_LOCAL_PREVIEW?(location.hash.replace('#/','')||'home'):routeFromPath();
  const go=id=>{
    if(IS_LOCAL_PREVIEW){location.hash='#/'+id;return}
    const slug=PUBLIC_ROUTE_SLUGS[id]??'';
    const target=publicBasePath()+(slug?slug+'/':'');
    if(location.pathname!==target)history.pushState({fixtechRoute:id},'',target);
    render();window.scrollTo({top:0,left:0,behavior:'auto'});
  };
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const attr=s=>esc(s).replace(/`/g,'&#96;');
  function orderedQuestionChoices(q){
    const arr=(q.options||[]).map((text,index)=>({text,index}));
    if(q.questionType==='truefalse'||q.shuffleAnswers===false||arr.length<2)return arr;
    let seed=2166136261;
    const src=String(q.id||'')+'|'+String(q.question||'');
    for(let i=0;i<src.length;i++){seed^=src.charCodeAt(i);seed=Math.imul(seed,16777619)}
    for(let i=arr.length-1;i>0;i--){seed=(Math.imul(seed,1664525)+1013904223)>>>0;const j=seed%(i+1);[arr[i],arr[j]]=[arr[j],arr[i]]}
    return arr;
  }
  function shuffleList(list){
    const out=[...list];
    for(let i=out.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[out[i],out[j]]=[out[j],out[i]]}
    return out;
  }
  function qaTargetCount(poolLength){
    return state.qaLimit==='all'?poolLength:Math.min(poolLength,Math.max(1,+state.qaLimit||10));
  }
  function startQaSession(){
    const pool=state.questions.filter(x=>x.visible!==false);
    const count=qaTargetCount(pool.length);
    state.qaSessionIds=shuffleList(pool).slice(0,count).map(x=>x.id);
    state.qaIndex=0;
    state.qaSelected=null;
    state.qaMultiSelected=[];
    state.qaMultiRevealed=false;
    state.qaResponses={};
    state.qaFinished=false;
  }
  function qaSessionQuestions(){
    const pool=state.questions.filter(x=>x.visible!==false),byId=new Map(pool.map(x=>[x.id,x]));
    const target=qaTargetCount(pool.length);
    const valid=Array.isArray(state.qaSessionIds)&&state.qaSessionIds.length===target&&state.qaSessionIds.every(id=>byId.has(id));
    if(!valid)startQaSession();
    return state.qaSessionIds.map(id=>byId.get(id)).filter(Boolean);
  }
  function qaResponse(q){return q?state.qaResponses[q.id]:undefined}
  function qaHasResponse(q,response=qaResponse(q)){
    return q?.questionType==='multiselect'?Array.isArray(response)&&response.length>0:Number.isInteger(response);
  }
  function qaResponseCorrect(q,response=qaResponse(q)){
    if(!q||!qaHasResponse(q,response))return false;
    if(q.questionType==='multiselect'){
      const a=[...new Set(response)].map(Number).sort((x,y)=>x-y),b=[...new Set(q.answers||[])].map(Number).sort((x,y)=>x-y);
      return a.length===b.length&&a.every((v,i)=>v===b[i]);
    }
    return Number(response)===Number(q.answer);
  }
  function qaScore(qs){return qs.reduce((n,q)=>n+(qaResponseCorrect(q)?1:0),0)}
  function qaAnsweredCount(qs){return qs.reduce((n,q)=>n+(qaHasResponse(q)?1:0),0)}
  const QA_RESULT_DEFAULTS={
    low:'Keep going. Every try helps you improve.',
    forty:'It’s okay. Try again — you can get a better result.',
    fifty:'Good effort. You’re halfway there. Keep practicing.',
    sixty:'Nice work. You’re improving — try again and aim higher.',
    seventy:'Good job! You’re getting close.',
    eighty:'Great work! You’re very close to your goal.',
    ninety:'Wow, amazing! You’re close to a perfect score.',
    perfect:'Congratulations! Perfect score — excellent work!'
  };
  function qaResultMessages(section){return {...QA_RESULT_DEFAULTS,...(section?.resultMessages||{})}}
  function qaResultMessage(score,total,section){
    const m=qaResultMessages(section),ratio=total?score/total:0;
    if(ratio>=1)return m.perfect;
    if(ratio>=.9)return m.ninety;
    if(ratio>=.8)return m.eighty;
    if(ratio>=.7)return m.seventy;
    if(ratio>=.6)return m.sixty;
    if(ratio>=.5)return m.fifty;
    if(ratio>=.4)return m.forty;
    return m.low;
  }
  const safeColor=(v,f)=>/^#[0-9a-f]{6}$/i.test(String(v||''))?v:f;

  function applyTheme(){const t=state.site.theme||{},h=state.site.headerStyle||DEFAULTS.site.headerStyle||{},f=state.site.footerStyle||DEFAULTS.site.footerStyle||{},r=document.documentElement;r.style.setProperty('--latin-font-family',t.fontFamily||DEFAULTS.site.theme.fontFamily);r.style.setProperty('--body',`${Number(t.bodySize)||15}px`);r.style.setProperty('--h1',`${Number(t.h1Size)||46}px`);r.style.setProperty('--h2',`${Number(t.h2Size)||24}px`);r.style.setProperty('--button-size',`${Number(t.buttonSize)||13}px`);r.style.setProperty('--small-size',`${Number(t.smallSize)||12}px`);r.style.setProperty('--primary',safeColor(t.primary,'#0b6cff'));r.style.setProperty('--text-color',safeColor(t.text,'#0f1830'));r.style.setProperty('--page-bg',safeColor(t.pageBackground,'#f7fbff'));r.style.setProperty('--card-radius',`${Number(t.cardRadius)||14}px`);r.style.setProperty('--content-width',`${Number(t.contentWidth)||1180}px`);r.style.setProperty('--header-brand-size',`${Number(h.brandSize)||23}px`);r.style.setProperty('--header-tagline-size',`${Number(h.taglineSize)||10}px`);r.style.setProperty('--header-nav-size',`${Number(h.navSize)||13}px`);r.style.setProperty('--header-search-size',`${Number(h.searchSize)||13}px`);r.style.setProperty('--footer-brand-size',`${Number(f.brandSize)||16}px`);r.style.setProperty('--footer-tagline-size',`${Number(f.taglineSize)||12}px`);r.style.setProperty('--footer-nav-size',`${Number(f.navSize)||11}px`);r.style.setProperty('--footer-text-size',`${Number(f.textSize)||12}px`)}
  function renderBrand(){const b=document.querySelector('.brand'),name=state.site.brand||'FixTech',sp=name.length>3?[name.slice(0,3),name.slice(3)]:[name,''];b.innerHTML=`<span>${esc(sp[0])}</span>${esc(sp[1])}<small>${esc(state.site.tagline||'')}</small>`;document.querySelector('footer strong').textContent=name;document.querySelector('footer>div>span').textContent=state.site.tagline||'';document.querySelector('.footer-links span').textContent=state.site.footerText||''}
  function renderNav(){const cur=route(),items=state.nav.filter(x=>x.visible!==false);nav.innerHTML=items.map(x=>`<button class="${cur===x.id?'active':''}" data-route="${x.id}">${esc(x.label)}</button>`).join('');if(footerNav)footerNav.innerHTML=items.map(x=>`<button data-route="${x.id}">${esc(x.label)}</button>`).join('')}
  function bindRoutes(){document.querySelectorAll('[data-route]').forEach(b=>b.onclick=()=>go(b.dataset.route))}
  function sectionData(s){const st=s?.style||{};let out=s?.id?` data-fixtech-element="${attr(s.id)}"`:'';if(st.titleFontSize)out+=' data-ft-title-size="1"';if(st.textFontSize)out+=' data-ft-text-size="1"';if(st.buttonFontSize)out+=' data-ft-button-size="1"';if(st.smallFontSize)out+=' data-ft-small-size="1"';return out}
  function sectionStyle(s){const st=s?.style||{},o=[],fonts=['Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif','Arial, sans-serif','Georgia, serif','"Trebuchet MS", sans-serif','"Times New Roman", serif','Verdana, sans-serif'];if(st.fontFamily&&fonts.includes(st.fontFamily))o.push(`font-family:"FixTech Khmer",${st.fontFamily},"Noto Sans Khmer",sans-serif`);if(st.fontSize&&+st.fontSize>=10&&+st.fontSize<=72)o.push(`font-size:${+st.fontSize}px`);if(st.titleFontSize&&+st.titleFontSize>=10&&+st.titleFontSize<=96)o.push(`--ft-title-size:${+st.titleFontSize}px`);if(st.textFontSize&&+st.textFontSize>=8&&+st.textFontSize<=72)o.push(`--ft-text-size:${+st.textFontSize}px`);if(st.buttonFontSize&&+st.buttonFontSize>=8&&+st.buttonFontSize<=40)o.push(`--ft-button-size:${+st.buttonFontSize}px`);if(st.smallFontSize&&+st.smallFontSize>=8&&+st.smallFontSize<=32)o.push(`--ft-small-size:${+st.smallFontSize}px`);if(st.qaLimitButtonWidth&&+st.qaLimitButtonWidth>=36&&+st.qaLimitButtonWidth<=160)o.push(`--qa-limit-button-width:${+st.qaLimitButtonWidth}px`);if(st.qaModeButtonWidth&&+st.qaModeButtonWidth>=60&&+st.qaModeButtonWidth<=180)o.push(`--qa-mode-button-width:${+st.qaModeButtonWidth}px`);if(st.qaActionButtonWidth&&+st.qaActionButtonWidth>=80&&+st.qaActionButtonWidth<=220)o.push(`--qa-action-button-width:${+st.qaActionButtonWidth}px`);if(st.qaAnswerBoxWidth&&+st.qaAnswerBoxWidth>=180&&+st.qaAnswerBoxWidth<=380)o.push(`--qa-answer-box-width:${+st.qaAnswerBoxWidth}px`);if(st.fontWeight)o.push(`font-weight:${st.fontWeight}`);if(st.textColor&&/^#[0-9a-f]{6}$/i.test(st.textColor))o.push(`color:${st.textColor}`);if(st.backgroundColor&&/^#[0-9a-f]{6}$/i.test(st.backgroundColor))o.push(`background:${st.backgroundColor}`);if(st.align)o.push(`text-align:${st.align}`);if(st.padding!==undefined&&+st.padding>=0&&+st.padding<=80)o.push(`padding:${+st.padding}px`);if(st.widthPct!==undefined&&+st.widthPct>=25&&+st.widthPct<=100)o.push(`width:${+st.widthPct}%`);if(st.maxWidth!==undefined&&+st.maxWidth>=200&&+st.maxWidth<=1800)o.push(`max-width:${+st.maxWidth}px`);if(st.minHeight!==undefined&&+st.minHeight>=0&&+st.minHeight<=1200)o.push(`min-height:${+st.minHeight}px`);if(st.blockAlign==='center')o.push('margin-left:auto','margin-right:auto');else if(st.blockAlign==='right')o.push('margin-left:auto','margin-right:0');else if(st.blockAlign==='left')o.push('margin-left:0','margin-right:auto');return o.length?` style="${o.join(';')}"`:''}
  const card=(inner,cls='',s)=>`<section class="card ${cls} editable-section"${sectionData(s)}${sectionStyle(s)}>${inner}</section>`;
  const pageHeading=(title,text,s)=>`<div class="page-heading editable-section"${sectionData(s)}${sectionStyle(s)}>${childSequence(s,{title:()=>`<h1 data-ft-child="title">${esc(title)}</h1>`,description:()=>text?`<p data-ft-child="description">${esc(text)}</p>`:''})}</div>`;
  const sections=id=>(state.pages[id]?.sections||[]).filter(x=>x.visible!==false);
  const byZone=(id,z)=>sections(id).filter(s=>defaultZone(s)===z);
  function layout(id,renderSection){const top=byZone(id,'top').map(renderSection).join(''),left=byZone(id,'left').map(renderSection).join(''),main=byZone(id,'main').map(renderSection).join(''),right=byZone(id,'right').map(renderSection).join(''),bottom=byZone(id,'bottom').map(renderSection).join('');const cols=[left&&'has-left',right&&'has-right'].filter(Boolean).join(' ');return `<div class="page page-${id}"><div class="page-zone page-zone-top">${top}</div><div class="page-body-layout ${cols}">${left?`<aside class="page-side page-left">${left}</aside>`:''}<main class="page-main">${main}</main>${right?`<aside class="page-side page-right">${right}</aside>`:''}</div><div class="page-zone page-zone-bottom">${bottom}</div></div>`}
  function plain(s){if(s.type==='pageHeading')return pageHeading(s.title,s.text,s);return card(childSequence(s,{title:()=>`<h2 data-ft-child="title">${esc(s.title)}</h2>`,description:()=>`<p class="lead" data-ft-child="description">${esc(s.text||'')}</p>`}),'',s)}

  const heroRouteIcon=r=>r==='panic'?'⌁':r==='knowledge'?'▤':r==='qa'?'?':r==='pos'?'▦':'•';
  function renderHero(s){
    // Hero slideshow is intentionally image-only. Child controls can remove or
    // move the title, description, button, or slideshow without rebuilding the
    // main Hero element.
    const slides=(Array.isArray(s.slides)?s.slides:[]).filter(x=>x.visible!==false&&x.image);
    const slider=slides.length?`<div class="hero-slider" data-ft-child="slideshow" data-hero-slider data-seconds="${Math.max(2,Math.min(20,+s.slideSeconds||5))}"><div class="hero-slides">${slides.map((x,i)=>`<article class="hero-slide ${i===0?'active':''}" data-slide-index="${i}"><div class="hero-slide-image"><img src="${attr(x.image)}" alt="Hero slide ${i+1}"${imageStyleV602(x.imageStyle)}></div></article>`).join('')}</div>${slides.length>1?`<div class="hero-slider-controls"><button class="hero-slider-arrow prev" type="button" aria-label="Previous slide">‹</button><div class="hero-slider-dots">${slides.map((_,i)=>`<button type="button" class="hero-dot ${i===0?'active':''}" data-hero-dot="${i}" aria-label="Slide ${i+1}"></button>`).join('')}</div><button class="hero-slider-arrow next" type="button" aria-label="Next slide">›</button></div>`:''}</div>`:'';
    const children=ensureSectionChildren(s),showSlider=children.some(x=>!x.kind&&x.id==='slideshow')&&!!slider,sliderIndex=children.findIndex(x=>!x.kind&&x.id==='slideshow');
    const copy=children.filter(x=>x.kind||x.id!=='slideshow').map(c=>{
      if(c.kind)return customChildMarkup(c);
      if(c.id==='title')return `<h1 data-ft-child="title">${esc(s.title)}</h1>`;
      if(c.id==='description')return `<p data-ft-child="description">${esc(s.text)}</p>`;
      if(c.id==='button')return s.buttonText?`<button class="primary big" data-ft-child="button" data-route="${attr(s.buttonRoute||'panic')}">${esc(s.buttonText)}</button>`:'';
      return'';
    }).join('');
    const copyWrap=`<div class="hero-copy">${copy}</div>`;
    const body=showSlider&&sliderIndex===0?`${slider}${copyWrap}`:`${copyWrap}${showSlider?slider:''}`;
    return `<section class="hero editable-section ${showSlider?'has-slider':'no-slider'}"${sectionData(s)}${sectionStyle(s)}>${body}</section>`;
  }

  function renderHome(){
    const renderer=s=>{
      if(s.type==='hero')return renderHero(s);
      if(s.type==='sectionHeading')return `<section class="home-section-heading editable-section"${sectionData(s)}${sectionStyle(s)}>${childSequence(s,{title:()=>`<h2 data-ft-child="title">${esc(s.title)}</h2>`,description:()=>s.text?`<p data-ft-child="description">${esc(s.text)}</p>`:''})}</section>`;
      if(s.type==='featureCard')return card(childSequence(s,{title:()=>`<h2 data-ft-child="title">${esc(s.title)}</h2>`,description:()=>`<p data-ft-child="description">${esc(s.text||'')}</p>`,button:()=>s.buttonText?`<button class="link" data-ft-child="button" data-route="${attr(s.buttonRoute||'home')}">${esc(s.buttonText)}</button>`:''}),'home-feature-card',s);
      if(s.type==='pos'){
        const children=ensureSectionChildren(s),visualIndex=children.findIndex(x=>!x.kind&&x.id==='visual'),showVisual=visualIndex>=0;
        const copy=children.filter(x=>x.kind||x.id!=='visual').map(c=>{
          if(c.kind)return customChildMarkup(c);
          if(c.id==='eyebrow')return `<small data-ft-child="eyebrow">${esc(s.homePosEyebrow||'BUILT FOR REPAIR SHOPS')}</small>`;
          if(c.id==='title')return `<h2 data-ft-child="title">${esc(s.title)}</h2>`;
          if(c.id==='description')return `<p data-ft-child="description">${esc(s.text)}</p>`;
          if(c.id==='button')return s.buttonText?`<button class="primary" data-ft-child="button" data-route="${attr(s.buttonRoute||'pos')}">${esc(s.buttonText)}</button>`:'';
          return'';
        }).join('');
        const copyWrap=`<div class="pos-strip-copy">${copy}</div>`,visual=showVisual?`<div class="pos-placeholder" data-ft-child="visual">${esc(s.homePosVisual||'FixPro POS')}</div>`:'';
        const body=showVisual&&visualIndex===0?`${visual}${copyWrap}`:`${copyWrap}${visual}`;
        return `<section class="pos-strip editable-section ${showVisual?'':'no-visual'}"${sectionData(s)}${sectionStyle(s)}>${body}</section>`;
      }
      return plain(s)
    };
    app.innerHTML=layout('home',renderer)
  }


// FIXTECH_PANIC_CATALOG_PUBLIC_V592
  function getPanicCatalog(){
    let raw=load('fixtech.panicCatalog',[]);
    const out=[];
    const addSeries=name=>{
      name=String(name||'').trim();
      if(!name)return null;
      let s=out.find(x=>x.name.toLowerCase()===name.toLowerCase());
      if(!s){s={name,models:[]};out.push(s)}
      return s;
    };
    const addModel=(s,name)=>{
      name=String(name||'').trim();
      if(!s||!name)return;
      if(!s.models.some(x=>x.toLowerCase()===name.toLowerCase()))s.models.push(name);
    };

    if(Array.isArray(raw)){
      raw.forEach(item=>{
        if(typeof item==='string'){addSeries(item);return}
        if(!item||typeof item!=='object')return;
        const s=addSeries(item.name||item.series);
        (item.models||[]).forEach(m=>addModel(s,typeof m==='string'?m:(m?.name||m?.model)));
      });
    }

    state.panicEntries.forEach(e=>{
      const s=addSeries(e.series);
      addModel(s,e.model);
    });

    return out;
  }
// FIXTECH_PANIC_CATALOG_PUBLIC_V595
  function panicCatalogPublic(){
    let raw=[];
    if(IS_LOCAL_PREVIEW){
      try{const saved=localStorage.getItem('fixtech.panicCatalog');if(saved!==null)raw=JSON.parse(saved)||[]}catch{raw=[]}
      if((!Array.isArray(raw)||!raw.length)&&PUBLISHED_STATE&&Array.isArray(PUBLISHED_STATE.panicCatalog))raw=deep(PUBLISHED_STATE.panicCatalog);
    }else if(PUBLISHED_STATE&&Array.isArray(PUBLISHED_STATE.panicCatalog))raw=deep(PUBLISHED_STATE.panicCatalog);
    else try{raw=JSON.parse(localStorage.getItem('fixtech.panicCatalog')||'[]')}catch{raw=[]}

    const out=[];
    const addSeries=name=>{
      name=String(name||'').trim();
      if(!name)return null;
      let s=out.find(x=>x.name.toLowerCase()===name.toLowerCase());
      if(!s){
        s={name,models:[]};
        out.push(s);
      }
      return s;
    };
    const addModel=(s,name)=>{
      name=String(name||'').trim();
      if(!s||!name)return;
      if(!s.models.some(x=>x.toLowerCase()===name.toLowerCase()))s.models.push(name);
    };

    if(Array.isArray(raw)){
      raw.forEach(item=>{
        if(typeof item==='string'){
          addSeries(item);
          return;
        }
        if(!item||typeof item!=='object')return;
        const s=addSeries(item.name||item.series);
        (item.models||[]).forEach(m=>{
          if(typeof m==='string')addModel(s,m);
          else if(m&&typeof m==='object')addModel(s,m.name||m.model);
        });
      });
    }

    state.panicEntries.forEach(e=>{
      const s=addSeries(e.series);
      addModel(s,e.model);
    });

    return out;
  }
function getPanicSelection(){
    const all=state.panicEntries.filter(x=>x.visible!==false);
    const catalog=panicCatalogPublic();
    const series=catalog.map(x=>x.name);

    let selectedSeries=sessionStorage.getItem('panic.series')||series[0]||'';
    if(!series.includes(selectedSeries))selectedSeries=series[0]||'';

    const selectedSeriesData=catalog.find(x=>x.name===selectedSeries);
    const models=(selectedSeriesData?.models||[]).slice();

    let selectedModel=sessionStorage.getItem('panic.model')||models[0]||'';
    if(!models.includes(selectedModel))selectedModel=models[0]||'';

    const query=sessionStorage.getItem('panic.query')||'';
    const rows=all.filter(x=>
      x.series===selectedSeries &&
      x.model===selectedModel &&
      (`${x.code} ${x.problem}`).toLowerCase().includes(query.toLowerCase())
    );

    return{series,selectedSeries,models,selectedModel,query,rows};
  }
// FIXTECH_PANIC_RICH_PUBLIC_V596
  function panicPublicRichV596(html){
    if(!html)return'';
    const t=document.createElement('template');
    t.innerHTML=String(html);
    t.content.querySelectorAll('script,style,iframe,object,embed,form,input,button,link,meta').forEach(x=>x.remove());
    t.content.querySelectorAll('*').forEach(el=>{
      [...el.attributes].forEach(a=>{
        const n=a.name.toLowerCase(),v=String(a.value||'').trim().toLowerCase();
        if(n.startsWith('on'))el.removeAttribute(a.name);
        if((n==='href'||n==='src')&&v.startsWith('javascript:'))el.removeAttribute(a.name);
      });
    });
    return t.innerHTML;
  }

  function detailMarkup(r){
    const st=r.style||{},fs=(v,min=8,max=48)=>v&&+v>=min&&+v<=max?` style="font-size:${+v}px"`:'';
    const rich=r.rich||{};
    const problem=rich.problem?`<div class="panic-rich-public">${panicPublicRichV596(rich.problem)}</div>`:`<p${fs(st.problemSize)}>${esc(r.problem)}. This code points to this area or a closely related circuit.</p>`;
    const symptoms=rich.symptoms?`<div class="panic-rich-public">${panicPublicRichV596(rich.symptoms)}</div>`:`<ul>${(r.symptoms||[]).map(x=>`<li${fs(st.symptomsSize)}>${esc(x)}</li>`).join('')}</ul>`;
    const panicFull=rich.panicFull?`<div class="panic-rich-public">${panicPublicRichV596(rich.panicFull)}</div>`:`<p${fs(st.panicFullSize)}>${esc(r.panicFull)}</p>`;
    const diagnosis=rich.diagnosis?`<div class="panic-rich-public">${panicPublicRichV596(rich.diagnosis)}</div>`:`<ol>${(r.diagnosis||[]).map(x=>`<li${fs(st.diagnosisSize)}>${esc(x)}</li>`).join('')}</ol>`;
    const solution=rich.solution?`<div class="panic-rich-public">${panicPublicRichV596(rich.solution)}</div>`:`<ol>${(r.solution||[]).map(x=>`<li${fs(st.solutionSize)}>${esc(x)}</li>`).join('')}</ol>`;
    return `<div class="detail-grid">
      <div class="detail-box"><b><i>1</i> Problem</b>${problem}</div>
      <div class="detail-box"><b><i>2</i> Symptoms</b>${symptoms}</div>
      <div class="detail-box wide"><b><i>3</i> What to Find in Panic Full</b>${panicFull}</div>
      <div class="detail-box"><b><i>4</i> Diagnosis Steps</b>${diagnosis}</div>
      <div class="detail-box"><b><i>5</i> Solution / Repair</b>${solution}</div>
    </div>`;
  }
  function renderPanic(){
    const p=getPanicSelection();
    const renderer=s=>{
      if(s.type==='pageHeading')return pageHeading(s.title,s.text,s);
      if(s.type==='panicFilters'){
        const children=ensureSectionChildren(s),idx=id=>children.findIndex(x=>!x.kind&&x.id===id),customs=children.map((c,i)=>c.kind?{i,html:customChildMarkup(c)}:null).filter(Boolean);
        const headIds=['title','description'].filter(id=>idx(id)>=0),headIndex=headIds.length?Math.min(...headIds.map(idx)):999;
        const head=headIds.length?`<div class="section-title-row compact-title"><div class="ft-child-column">${headIds.sort((a,b)=>idx(a)-idx(b)).map(id=>id==='title'?`<h2 data-ft-child="title">${esc(s.title||'Find a Panic Code')}</h2>`:`${s.text?`<p data-ft-child="description">${esc(s.text)}</p>`:''}`).join('')}</div></div>`:'';
        const controlsIndex=idx('controls');
        const controls=controlsIndex>=0?`<div class="filters clean-filter" data-ft-child="controls"><div><label>iPhone Series</label><select id="panicSeries">${p.series.map(x=>`<option ${x===p.selectedSeries?'selected':''}>${esc(x)}</option>`).join('')}</select></div><div><label>Model</label><select id="panicModel">${p.models.map(x=>`<option ${x===p.selectedModel?'selected':''}>${esc(x)}</option>`).join('')}</select></div><div class="query"><label>Panic Code</label><div class="input-with-icon"><span>⌕</span><input id="panicQuery" value="${attr(p.query)}" placeholder="Enter panic code"></div></div><button class="primary" id="panicSearch">Search</button><button class="ghost" id="panicReset">↻ Reset</button></div>`:'';
        const blocks=[head?{i:headIndex,html:head}:null,controls?{i:controlsIndex,html:controls}:null,...customs].filter(Boolean).sort((a,b)=>a.i-b.i).map(x=>x.html).join('');
        return card(blocks,'filter-card',s)
      }
      if(s.type==='panicResults'){
        const children=ensureSectionChildren(s),idx=id=>children.findIndex(x=>!x.kind&&x.id===id),customs=children.map((c,i)=>c.kind?{i,html:customChildMarkup(c)}:null).filter(Boolean);
        const headIds=['title','description','count'].filter(id=>idx(id)>=0),headIndex=headIds.length?Math.min(...headIds.map(idx)):999;
        const copyIds=headIds.filter(id=>id!=='count').sort((a,b)=>idx(a)-idx(b)),copyHtml=copyIds.length?`<div class="ft-child-column">${copyIds.map(id=>id==='title'?`<h2 data-ft-child="title">${esc(p.selectedModel||'Panic Codes')} Panic Codes</h2>`:`<p data-ft-child="description">${esc(s.text||'')}</p>`).join('')}</div>`:'',countHtml=idx('count')>=0?`<span class="count-pill" data-ft-child="count">${p.rows.length} codes</span>`:'';
        const countFirst=countHtml&&(!copyIds.length||idx('count')<Math.min(...copyIds.map(idx)));
        const head=headIds.length?`<div class="section-title-row">${countFirst?countHtml:''}${copyHtml}${!countFirst?countHtml:''}</div>`:'';
        const resultsIndex=idx('results');
        const results=resultsIndex>=0?`<div class="panic-table" data-ft-child="results"><div class="panic-head"><span>Code</span><span>Possible Problem</span><span>Show Information</span></div>${p.rows.map(r=>`<div class="panic-row-wrap"><button class="panic-row ${state.openPanic===r.id?'selected':''}" data-panic-open="${attr(r.id)}"><strong${r.style?.codeSize?` style="font-size:${+r.style.codeSize}px"`:''}>${esc(r.code)}</strong><span${r.style?.problemSize?` style="font-size:${+r.style.problemSize}px"`:''}>${esc(r.problem)}</span><span class="show-info">${state.openPanic===r.id?'Hide ▲':'Show ▼'}</span></button>${state.openPanic===r.id?detailMarkup(r):''}</div>`).join('')||'<div class="empty">No panic codes found.</div>'}</div>`:'';
        const blocks=[head?{i:headIndex,html:head}:null,results?{i:resultsIndex,html:results}:null,...customs].filter(Boolean).sort((a,b)=>a.i-b.i).map(x=>x.html).join('');
        return card(blocks,'',s)
      }
      return plain(s)
    };
    app.innerHTML=layout('panic',renderer);
    const series=document.getElementById('panicSeries');if(series)series.onchange=e=>{sessionStorage.setItem('panic.series',e.target.value);sessionStorage.removeItem('panic.model');state.openPanic=null;render()};
    const model=document.getElementById('panicModel');if(model)model.onchange=e=>{sessionStorage.setItem('panic.model',e.target.value);state.openPanic=null;render()};
    const search=document.getElementById('panicSearch');if(search)search.onclick=()=>{sessionStorage.setItem('panic.query',document.getElementById('panicQuery').value);render()};
    const input=document.getElementById('panicQuery');if(input)input.onkeydown=e=>{if(e.key==='Enter'){sessionStorage.setItem('panic.query',e.target.value);render()}};
    const reset=document.getElementById('panicReset');if(reset)reset.onclick=()=>{sessionStorage.removeItem('panic.query');state.openPanic=null;render()};
    document.querySelectorAll('[data-panic-open]').forEach(b=>b.onclick=()=>{state.openPanic=state.openPanic===b.dataset.panicOpen?null:b.dataset.panicOpen;render()})
  }


  function renderKnowledge(){
    const topics=state.knowledgeTopics.filter(x=>x.visible!==false);
    let active=topics.find(x=>x.id===state.activeTopic)||topics[0];
    if(active)state.activeTopic=active.id;
    const renderer=s=>{
      if(s.type==='pageHeading')return pageHeading(s.title,s.text,s);
      if(s.type==='knowledgeTopics'){
        const children=ensureSectionChildren(s),idx=id=>children.findIndex(x=>!x.kind&&x.id===id),customs=children.map((c,i)=>c.kind?{i,html:customChildMarkup(c)}:null).filter(Boolean);
        const headIds=['title','description'].filter(id=>idx(id)>=0),headIndex=headIds.length?Math.min(...headIds.map(idx)):999;
        const head=headIds.length?`<div class="knowledge-topic-heading ft-child-column">${headIds.sort((a,b)=>idx(a)-idx(b)).map(id=>id==='title'?`<h2 data-ft-child="title">${esc(s.title)}</h2>`:`${s.text?`<p data-ft-child="description">${esc(s.text)}</p>`:''}`).join('')}</div>`:'';
        const topicsIndex=idx('topics'),list=topicsIndex>=0?`<nav class="topic-list" data-ft-child="topics" aria-label="General Knowledge topics">${topics.map(t=>`<button class="topic-list-item ${active?.id===t.id?'selected':''}" data-topic="${attr(t.id)}"><span>${esc(t.title)}</span><span class="topic-arrow">›</span></button>`).join('')}</nav>`:'';
        const body=[head?{i:headIndex,html:head}:null,list?{i:topicsIndex,html:list}:null,...customs].filter(Boolean).sort((a,b)=>a.i-b.i).map(x=>x.html).join('');
        return `<section class="editable-section knowledge-topic-section"${sectionData(s)}${sectionStyle(s)}>${body}</section>`
      }
      if(s.type==='knowledgeDetail'){
        if(!active)return'';
        const parts={
          topicTitle:()=>`<h2 data-ft-child="topicTitle"${active.style?.titleSize?` style="font-size:${+active.style.titleSize}px"`:''}>${esc(active.title)}</h2>`,
          description:()=>`<p class="lead" data-ft-child="description"${active.style?.summarySize?` style="font-size:${+active.style.summarySize}px"`:''}>${esc(s.text||'')}</p>`,
          content:()=>`<div class="knowledge-columns" data-ft-child="content">${(active.sections||[]).map((x,i)=>`<div><h3${active.style?.sectionTitleSize?` style="font-size:${+active.style.sectionTitleSize}px"`:''}>${i+1}. ${esc(x.title)}</h3><p${active.style?.sectionTextSize?` style="font-size:${+active.style.sectionTextSize}px"`:''}>${esc(x.text)}</p></div>`).join('')}</div>`
        };
        return card(childSequence(s,parts),'',s)
      }
      return plain(s)
    };
    app.innerHTML=layout('knowledge',renderer);
    document.querySelectorAll('[data-topic]').forEach(b=>b.onclick=()=>{state.activeTopic=b.dataset.topic;localStorage.setItem('fixtech.activeTopic',state.activeTopic);render()})
  }


  function renderQA(){
    const qs=qaSessionQuestions();
    if(qs.length&&state.qaIndex>=qs.length)state.qaIndex=qs.length-1;
    const q=qs.length?qs[state.qaIndex]:null;
    const response=q?qaResponse(q):undefined;
    const choices=q?orderedQuestionChoices(q):[];
    const isMulti=q?.questionType==='multiselect';
    const correctSet=new Set(isMulti?(q.answers||[]):[]);
    const correctDisplayIndex=q&&!isMulti?choices.findIndex(c=>c.index===q.answer):-1;
    const challenge=state.qaMode==='challenge';
    const answeredCount=qaAnsweredCount(qs);
    const score=qaScore(qs);
    const renderModeControls=()=>`<div class="qa-controls">
      <div class="qa-set-control">
        <span>Questions</span>
        <div class="segmented" aria-label="Choose question set">
          <button data-qa-limit="10" class="${state.qaLimit===10?'active':''}">10</button>
          <button data-qa-limit="20" class="${state.qaLimit===20?'active':''}">20</button>
          <button data-qa-limit="all" class="${state.qaLimit==='all'?'active':''}">All</button>
        </div>
      </div>
      <div class="qa-mode-control">
        <span>Mode</span>
        <div class="qa-mode-segmented" aria-label="Choose Q&A mode">
          <button data-qa-mode="practice" class="${state.qaMode==='practice'?'active':''}">Practice</button>
          <button data-qa-mode="challenge" class="${state.qaMode==='challenge'?'active':''}">Challenge</button>
        </div>
      </div>
    </div>`;
    const renderer=s=>{
      if(s.type==='pageHeading')return pageHeading(s.title,s.text,s);
      if(s.type==='quiz'){
        if(!q)return card('<p class="lead">No Q&A questions yet.</p>','qa-card',s);
        if(state.qaFinished){
          const resultMessage=qaResultMessage(score,qs.length,s);
          const parts={
            controls:()=>`<div class="qa-topline qa-result-topline" data-ft-child="controls">${renderModeControls()}<div class="qa-position"><span>Finished</span><strong>${qs.length}</strong><span>questions</span></div></div>`,
            progress:()=>`<div class="qa-progress" data-ft-child="progress" aria-hidden="true"><i style="width:100%"></i></div>`,
            question:()=>`<div class="qa-result-screen" data-ft-child="question"><div class="qa-result-badge">${challenge?'Challenge Complete':'Q&A Complete'}</div>${challenge?`<div class="qa-score"><strong>${score}</strong><span>/ ${qs.length}</span></div>`:`<div class="qa-score qa-score-small"><strong>${score}</strong><span>/ ${qs.length} correct</span></div>`}<h2>${esc(resultMessage)}</h2><p>Would you like to start again or finish?</p></div>`,
            answers:()=>'',
            feedback:()=>'',
            navigation:()=>`<div class="qa-result-actions" data-ft-child="navigation"><button class="primary" id="qaRestart">Start Over</button><button class="ghost" id="qaFinish">Finish</button></div>`
          };
          return card(childSequence(s,parts),'qa-card qa-result-card-builder',s);
        }
        const currentMulti=Array.isArray(response)?response:[];
        const revealed=!challenge&&(isMulti?state.qaMultiRevealed:Number.isInteger(response));
        const hasAnswer=qaHasResponse(q,response);
        const feedback=()=>revealed?(()=>{
          const isCorrect=qaResponseCorrect(q,response);
          const correctText=isMulti
            ? (q.answers||[]).map(i=>q.options?.[i]).filter(Boolean).join(' • ')
            : q.questionType==='truefalse'
              ? (q.options[q.answer]||'')
              : `${String.fromCharCode(65+Math.max(0,correctDisplayIndex))}. ${q.options[q.answer]||''}`;
          return `<div class="qa-answer-panel revealed ${isCorrect?'feedback-correct':'feedback-incorrect'}" data-ft-child="feedback"><div class="qa-feedback-title">${isCorrect?'✓ Correct!':'Not quite. Please try again.'}</div>${isCorrect?`<div class="qa-feedback-answer"><span>${isMulti?'Correct answers':'Correct answer'}</span><strong>${esc(correctText)}</strong></div>`:`<div class="qa-feedback-answer"><span>${isMulti?'Correct answers':'The correct answer is'}</span><strong>${esc(correctText)}</strong></div>`}${q.explanation?`<p${q.style?.explanationSize?` style="font-size:${+q.style.explanationSize}px"`:''}>${esc(q.explanation)}</p>`:''}</div>`
        })():'';
        const parts={
          controls:()=>`<div class="qa-topline" data-ft-child="controls">${renderModeControls()}<div class="qa-position">${challenge?`<span>Done</span><strong>${answeredCount}</strong><span>/ ${qs.length}</span>`:`<span>Question</span><strong>${state.qaIndex+1}</strong><span>/ ${qs.length}</span>`}</div></div>`,
          progress:()=>`<div class="qa-progress" data-ft-child="progress" aria-hidden="true"><i style="width:${qs.length?Math.round(((challenge?answeredCount:state.qaIndex+1)/qs.length)*100):0}%"></i></div>`,
          question:()=>`<div class="qa-question-block" data-ft-child="question"><div class="qa-question-labels"><div class="qa-qmark">Question ${state.qaIndex+1}</div><div class="qa-type-pill">${q.questionType==='truefalse'?'True / False':q.questionType==='multiselect'?'Multiple Answers':'Multiple Choice'}</div>${challenge?'<div class="qa-challenge-pill">Challenge</div>':''}</div><h2${q.style?.questionSize?` style="font-size:${+q.style.questionSize}px"`:''}>${esc(q.question)}</h2>${q.image?`<div class="qa-image-spacer" aria-hidden="true"></div><button class="qa-question-image qa-image-${attr(q.imageSize||'medium')}" data-qa-image="${attr(q.image)}" aria-label="Open question image larger"><img src="${attr(q.image)}" alt="${attr(q.imageCaption||'Question image')}"></button>${q.imageCaption?`<div class="qa-image-caption">${esc(q.imageCaption)}</div>`:''}`:''}${q.questionType==='truefalse'?'':`<p>${q.questionType==='multiselect'?'Select all correct answers.':'Choose the best answer.'}</p>`}</div>`,
          answers:()=>`<div class="qa-answer-list ${q.questionType==='truefalse'?'qa-truefalse-list':''}" data-ft-child="answers">${choices.map((c,displayIndex)=>{const i=c.index,o=c.text;const chosen=isMulti?currentMulti.includes(i):response===i;const correct=isMulti?correctSet.has(i):i===q.answer;const status=revealed&&correct?' correct':revealed&&chosen&&!correct?' incorrect':chosen?' selected':'';return `<button class="qa-answer${status}" data-answer="${i}"${q.style?.choiceSize?` style="font-size:${+q.style.choiceSize}px"`:''}><span class="answer-letter">${q.questionType==='truefalse'?(displayIndex===0?'T':'F'):String.fromCharCode(65+displayIndex)}</span><span class="answer-text">${esc(o)}</span></button>`}).join('')}</div>`,
          feedback,
          navigation:()=>`<div class="qa-navigation qa-navigation-four" data-ft-child="navigation"><button class="ghost" id="qaStartOver">Start Over</button><button class="ghost" id="qaPrev" ${state.qaIndex===0?'disabled':''}>← Previous</button><button class="primary" id="qaNext" ${challenge&&!hasAnswer||state.qaIndex===qs.length-1?'disabled':''}>${!challenge&&isMulti&&!state.qaMultiRevealed?'Check Answer':'Next →'}</button><button class="ghost" id="qaFinishNow">Finish</button></div>`
        };
        return card(childSequence(s,parts),'qa-card',s);
      }
      return plain(s)
    };
    app.innerHTML=layout('qa',renderer);
    document.querySelectorAll('[data-qa-limit]').forEach(b=>b.onclick=()=>{state.qaLimit=b.dataset.qaLimit==='all'?'all':+b.dataset.qaLimit;startQaSession();render()});
    document.querySelectorAll('[data-qa-mode]').forEach(b=>b.onclick=()=>{state.qaMode=b.dataset.qaMode==='challenge'?'challenge':'practice';startQaSession();render()});
    document.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>{
      if(!q||state.qaFinished)return;
      const i=+b.dataset.answer;
      if(isMulti){if(!challenge&&state.qaMultiRevealed)return;const cur=Array.isArray(qaResponse(q))?[...qaResponse(q)]:[];state.qaResponses[q.id]=cur.includes(i)?cur.filter(v=>v!==i):[...cur,i];state.qaMultiSelected=state.qaResponses[q.id]}
      else{if(!challenge&&Number.isInteger(qaResponse(q)))return;state.qaResponses[q.id]=i;state.qaSelected=i}
      render();
    });
    document.querySelectorAll('[data-qa-image]').forEach(b=>b.onclick=()=>{const src=b.dataset.qaImage;if(!src)return;const box=document.createElement('div');box.className='qa-image-lightbox';box.innerHTML=`<div class="qa-image-lightbox-inner"><button type="button" aria-label="Close image">×</button><img src="${attr(src)}" alt="Question image enlarged"></div>`;const close=()=>box.remove();box.onclick=e=>{if(e.target===box||e.target.closest('button'))close()};document.body.appendChild(box)});
    const prev=document.getElementById('qaPrev'),next=document.getElementById('qaNext'),startOver=document.getElementById('qaStartOver'),finishNow=document.getElementById('qaFinishNow');
    if(prev)prev.onclick=()=>{if(state.qaIndex>0)state.qaIndex--;state.qaSelected=null;state.qaMultiSelected=[];state.qaMultiRevealed=false;render()};
    if(next)next.onclick=()=>{if(!q)return;if(!challenge&&isMulti&&!state.qaMultiRevealed){state.qaMultiRevealed=true;render();return}if(state.qaIndex>=qs.length-1)return;state.qaIndex++;state.qaSelected=null;state.qaMultiSelected=[];state.qaMultiRevealed=false;render()};
    if(startOver)startOver.onclick=()=>{startQaSession();render()};
    if(finishNow)finishNow.onclick=()=>{state.qaFinished=true;render()};
    const restart=document.getElementById('qaRestart'),finish=document.getElementById('qaFinish');
    if(restart)restart.onclick=()=>{startQaSession();render()};
    if(finish)finish.onclick=()=>go('home');
  }

  function renderPos(){
    const page=state.pages?.pos||{};
    const intro=page.sections?.find(x=>x.id==='pos-intro');
    const download=page.sections?.find(x=>x.id==='pos-download');
    const promoPrice=intro?.promoPrice||'$10', promoPeriod=intro?.promoPeriod||'/ YEAR';
    const promoElements=ensurePromoElements(intro);
    const promoFeatures=Array.isArray(intro?.promoFeatures)&&intro.promoFeatures.length?intro.promoFeatures:PROMO_FEATURE_DEFAULTS;
    const featureMeta=[
      ['Repairs','Keep every repair organized from received to completed.','repair'],
      ['Deposits','Take a deposit now and track the remaining amount due.','deposit'],
      ['Accessories','Add accessory sales with or without a repair.','accessory'],
      ['Reports','Review day, week, month and year activity clearly.','report'],
      ['Printing','Print clean thermal or professional invoices.','print'],
      ['Users & Permissions','Control staff access with users and permissions.','users']
    ];
    const featureIcon=kind=>({
      repair:`<svg viewBox="0 0 24 24"><path d="M14.7 6.3a4 4 0 0 0-5 5L4 17l3 3 5.7-5.7a4 4 0 0 0 5-5l-2.4 2.4-3-3z"/></svg>`,
      deposit:`<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M15 8.5c-.7-.6-1.7-1-3-1-1.7 0-3 .8-3 2s1.1 1.8 3.1 2.2c1.9.4 2.9 1 2.9 2.2s-1.2 2.1-3 2.1c-1.2 0-2.4-.4-3.2-1.1M12 5v14"/></svg>`,
      accessory:`<svg viewBox="0 0 24 24"><path d="M4 8h16v11H4zM8 8V5h8v3M8 12h8M8 16h5"/></svg>`,
      report:`<svg viewBox="0 0 24 24"><path d="M4 19V10M10 19V6M16 19v-7M22 19H2"/></svg>`,
      print:`<svg viewBox="0 0 24 24"><path d="M6 9V3h12v6M6 18H4V9h16v9h-2M7 14h10v7H7z"/></svg>`,
      users:`<svg viewBox="0 0 24 24"><path d="M16 20v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 20v-2a4 4 0 0 0-3-3.87M16 2.13a4 4 0 0 1 0 7.75"/></svg>`
    }[kind]||'');
    const workflowIcon=i=>[
      `<svg viewBox="0 0 24 24"><path d="M8 4h8M9 3h6v3H9zM6 5h12v16H6z"/><path d="M9 11h6M12 8v6"/></svg>`,
      `<svg viewBox="0 0 24 24"><path d="M14.7 6.3a4 4 0 0 0-5 5L4 17l3 3 5.7-5.7a4 4 0 0 0 5-5l-2.4 2.4-3-3z"/></svg>`,
      `<svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M7 10h3M17 14h.01M14 10h3"/></svg>`,
      `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/></svg>`,
      `<svg viewBox="0 0 24 24"><path d="M6 9V3h12v6M6 18H4V9h16v9h-2M7 14h10v7H7z"/></svg>`
    ][i]||'';
    const highlightIcon=kind=>({
      repair:`<svg viewBox="0 0 24 24"><path d="M14.7 6.3a4 4 0 0 0-5 5L4 17l3 3 5.7-5.7a4 4 0 0 0 5-5l-2.4 2.4-3-3z"/></svg>`,
      payment:`<svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18M7 14h4"/></svg>`,
      invoice:`<svg viewBox="0 0 24 24"><path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6M9 16h4"/></svg>`
    }[kind]||'');
    const renderer=s=>{
      if(s.type==='pageHeading')return `<div class="pos-page-heading-v562 editable-section"${sectionData(s)}${sectionStyle(s)}>${childSequence(s,{title:()=>`<h1 data-ft-child="title">${esc(s.title)}</h1>`,description:()=>s.text?`<p data-ft-child="description">${esc(s.text)}</p>`:''})}</div>`;
      if(s.id==='pos-intro'){
        const promoPart={
          badge:()=>`<div class="pos-promo-pill-v562" data-fixtech-element="pos-promo-badge"><span class="pos-gift-icon-v562"><svg viewBox="0 0 24 24"><path d="M4 10h16v10H4zM3 7h18v4H3zM12 7v13M7.5 7C5.6 7 5 5.8 5 4.8 5 3.7 5.9 3 7 3c2.2 0 5 4 5 4M16.5 7C18.4 7 19 5.8 19 4.8 19 3.7 18.1 3 17 3c-2.2 0-5 4-5 4"/></svg></span>${esc(s.promoLabel||'SPECIAL PROMOTION')}</div>`,
          title:()=>`<h2 data-fixtech-element="pos-promo-title">${esc(s.title)}</h2>`,
          description:()=>`<p class="pos-promo-lead-v562" data-fixtech-element="pos-promo-description">${esc(s.text||'')}</p>`,
          price:()=>`<div class="pos-price-promo-v562" data-fixtech-element="pos-promo-price"><div class="pos-price-main-v562"><span>Only</span><strong>${esc(promoPrice)}</strong><em>${esc(promoPeriod)}</em></div><p>${esc(s.promoText||'Simple annual access for phone repair shops.')}</p></div>`,
          features:()=>`<div class="pos-promo-mini-features-v562" data-fixtech-element="pos-promo-features">${promoFeatures.map(x=>`<span><i>✓</i> ${esc(x)}</span>`).join('')}</div>`,
          download:()=>download?`<div class="pos-inline-download-v562 editable-section" data-fixtech-element="pos-promo-download"${sectionStyle(download)}><a class="primary pos-promo-download-v562" href="${attr(download.buttonUrl||'#')}" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5.5 10 4v7H3zM11 3.8 21 2v9h-10zM3 12h7v7l-7-1.5zM11 12h10v9l-10-1.8z"/></svg><span>${esc(download.buttonText||'Download FixPro 0.26.0')}</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12m0 0 4-4m-4 4-4-4M5 19h14"/></svg></a></div>`:'',
          version:()=>`<small class="pos-promo-version-v565" data-fixtech-element="pos-promo-version">${esc(s.promoFoot||'Windows • Version 0.26.0')}</small>`
        };
        const promoLeft=promoElements.map(x=>x.kind?customChildMarkup(x):(promoPart[x.id]?promoPart[x.id]():'' )).join('');
        return `<section class="pos-promo-hero-v562 editable-section"${sectionData(s)}${sectionStyle(s)}>
          <div class="pos-promo-copy-v562">${promoLeft}</div>
          <div class="pos-product-image-v563" aria-label="FixPro POS promotional image" data-fixtech-element="pos-promo-image">
            ${s.promoImage?`<img src="${attr(s.promoImage)}" alt="FixPro POS"${imageStyleV602(s.promoImageStyle)} onerror="this.closest('.pos-product-image-v563').classList.add('image-error')">`:`<div class="pos-product-image-empty-v563"><span>Upload a FixPro image from Admin</span></div>`}
          </div>
        </section>`;
      }
      if(s.id==='pos-features'){
        const names=String(s.text||'').split('•').map(x=>x.trim()).filter(Boolean),children=ensureSectionChildren(s),idx=id=>children.findIndex(x=>!x.kind&&x.id===id),customs=children.map((c,i)=>c.kind?{i,html:customChildMarkup(c)}:null).filter(Boolean);
        const headIds=['eyebrow','title','description'].filter(id=>idx(id)>=0),headIndex=headIds.length?Math.min(...headIds.map(idx)):999;
        const head=headIds.length?`<div class="pos-section-heading-v562 ft-child-column">${headIds.sort((a,b)=>idx(a)-idx(b)).map(id=>id==='eyebrow'?`<span data-ft-child="eyebrow">${esc(s.posFeatureEyebrow||'EVERYTHING YOU NEED')}</span>`:id==='title'?`<h2 data-ft-child="title">${esc(s.title)}</h2>`:`<p data-ft-child="description">${esc(s.posFeatureDescription||'One clean system for the daily work of a phone repair shop.')}</p>`).join('')}</div>`:'';
        const cardsIndex=idx('cards'),cards=cardsIndex>=0?`<div class="pos-feature-row-v562" data-ft-child="cards">${featureMeta.map(([fallback,desc,kind],i)=>`<article><div class="pos-feature-icon-v562 kind-${kind}">${featureIcon(kind)}</div><div><h3>${esc(names[i]||fallback)}</h3><p>${esc(desc)}</p></div></article>`).join('')}</div>`:'';
        const body=[head?{i:headIndex,html:head}:null,cards?{i:cardsIndex,html:cards}:null,...customs].filter(Boolean).sort((a,b)=>a.i-b.i).map(x=>x.html).join('');
        return `<section class="pos-feature-section-v562 editable-section"${sectionData(s)}${sectionStyle(s)}>${body}</section>`;
      }
      if(s.id==='pos-workflow'){
        const items=String(s.text||'').split('•').map(x=>x.trim()).filter(Boolean),children=ensureSectionChildren(s),idx=id=>children.findIndex(x=>!x.kind&&x.id===id),customs=children.map((c,i)=>c.kind?{i,html:customChildMarkup(c)}:null).filter(Boolean);
        const headIds=['eyebrow','title','description'].filter(id=>idx(id)>=0),headIndex=headIds.length?Math.min(...headIds.map(idx)):999;
        const head=headIds.length?`<div class="pos-section-heading-v562 ft-child-column">${headIds.sort((a,b)=>idx(a)-idx(b)).map(id=>id==='eyebrow'?`<span data-ft-child="eyebrow">${esc(s.posWorkflowEyebrow||'SIMPLE WORKFLOW')}</span>`:id==='title'?`<h2 data-ft-child="title">${esc(s.title)}</h2>`:`<p data-ft-child="description">${esc(s.posWorkflowDescription||'From customer check-in to a completed repair and printed invoice.')}</p>`).join('')}</div>`:'';
        const stepsIndex=idx('steps'),steps=stepsIndex>=0?`<div class="pos-workflow-v562" data-ft-child="steps">${items.map((x,i)=>`<div class="pos-workflow-step-v562"><b>${i+1}</b><i>${workflowIcon(i)}</i><span>${esc(x)}</span>${i<items.length-1?'<em>→</em>':''}</div>`).join('')}</div>`:'';
        const body=[head?{i:headIndex,html:head}:null,steps?{i:stepsIndex,html:steps}:null,...customs].filter(Boolean).sort((a,b)=>a.i-b.i).map(x=>x.html).join('');
        return `<section class="pos-workflow-section-v562 editable-section"${sectionData(s)}${sectionStyle(s)}>${body}</section>`;
      }
      if(s.type==='posHighlight'||s.id==='pos-bottom-highlight'){
        const defaults=[
          {title:'Repair Management',text:'Track each job from received to completed.',kind:'repair'},
          {title:'Flexible Payments',text:'Take a deposit or collect the remaining balance later.',kind:'payment'},
          {title:'Professional Invoices',text:'Finish the job with a clear customer-ready invoice.',kind:'invoice'}
        ];
        const items=(Array.isArray(s.items)&&s.items.length?s.items:defaults).slice(0,3),children=ensureSectionChildren(s),idx=id=>children.findIndex(x=>!x.kind&&x.id===id),customs=children.map((c,i)=>c.kind?{i,html:customChildMarkup(c)}:null).filter(Boolean);
        const copyIds=['eyebrow','title','description'].filter(id=>idx(id)>=0),copyIndex=copyIds.length?Math.min(...copyIds.map(idx)):999;
        const copy=copyIds.length?`<div class="pos-bottom-highlight-copy-v568 ft-child-column">${copyIds.sort((a,b)=>idx(a)-idx(b)).map(id=>id==='eyebrow'?`<span data-ft-child="eyebrow">${esc(s.posHighlightEyebrow||'FIXPRO POS')}</span>`:id==='title'?`<h2 data-ft-child="title">${esc(s.title)}</h2>`:`<p data-ft-child="description">${esc(s.text||'')}</p>`).join('')}</div>`:'';
        const cardsIndex=idx('cards'),cards=cardsIndex>=0?`<div class="pos-bottom-highlight-items-v568" data-ft-child="cards">${items.map((x,i)=>`<article><i>${highlightIcon(x.kind||defaults[i]?.kind)}</i><div><h3>${esc(x.title||defaults[i]?.title||'')}</h3><p>${esc(x.text||defaults[i]?.text||'')}</p></div></article>`).join('')}</div>`:'';
        const body=[copy?{i:copyIndex,html:copy}:null,cards?{i:cardsIndex,html:cards}:null,...customs].filter(Boolean).sort((a,b)=>a.i-b.i).map(x=>x.html).join('');
        return `<section class="pos-bottom-highlight-v568 editable-section"${sectionData(s)}${sectionStyle(s)}>${body}</section>`;
      }
      if(s.type==='posDownload'||s.id==='pos-download')return '';
      return plain(s)
    };
    app.innerHTML=layout('pos',renderer)
  }
  function renderAbout(){const renderer=s=>{if(s.type==='pageHeading')return pageHeading(s.title,s.text,s);return card(`<div class="simple-content">${childSequence(s,{title:()=>`<h2 data-ft-child="title">${esc(s.title)}</h2>`,description:()=>`<p class="lead" data-ft-child="description">${esc(s.text||'')}</p>`})}</div>`,'about-content-card',s)};app.innerHTML=layout('about',renderer)}

  // FIXTECH_CONTACT_SEND_V580
  // FIXTECH_GMAIL_CONTACT_V581
  // FIXTECH_GMAIL_CONTACT_V582
  // FIXTECH_GMAIL_CONTACT_V583
  // FIXTECH_GMAIL_CONTACT_V585
  // FIXTECH_GMAIL_CONTACT_V587
  // FIXTECH_CONTACT_CLEAR_IMMEDIATELY_V588
  // FIXTECH_CONTACT_REPEAT_SEND_V591
  function bindContactForm(){
    const form=document.getElementById('fixtechContactForm');
    if(!form)return;

    const status=form.querySelector('[data-contact-status]');
    const submit=form.querySelector('button[type="submit"]');
    let labelTimer=0;

    form.addEventListener('submit',event=>{
      event.preventDefault();

      const honey=form.querySelector('input[name="_honey"]');
      if(honey && String(honey.value||'').trim())return;

      // Copy this message before clearing the visible form.
      const data=new FormData(form);
      data.set('_url',location.href);

      // Give every submission its own hidden iframe so one send
      // can never block the next send.
      const token='fixtechContactSend_'+Date.now()+'_'+Math.random().toString(36).slice(2);
      const frame=document.createElement('iframe');
      frame.name=token;
      frame.style.display='none';
      frame.setAttribute('aria-hidden','true');

      const hidden=document.createElement('form');
      hidden.method='POST';
      hidden.action=form.action;
      hidden.target=token;
      hidden.style.display='none';

      for(const [name,value] of data.entries()){
        if(value instanceof File)continue;
        const input=document.createElement('input');
        input.type='hidden';
        input.name=name;
        input.value=String(value);
        hidden.appendChild(input);
      }

      document.body.appendChild(frame);
      document.body.appendChild(hidden);

      // Exact requested behavior:
      // clear the visible form immediately.
      form.querySelectorAll('input:not([type="hidden"]), textarea').forEach(el=>{
        el.value='';
        if(typeof el.blur==='function')el.blur();
      });

      if(document.activeElement && typeof document.activeElement.blur==='function'){
        document.activeElement.blur();
      }

      // Never disable the button. The user can send again without refresh.
      if(submit){
        submit.disabled=false;
        submit.textContent='Sent \u2713';
        clearTimeout(labelTimer);
        labelTimer=setTimeout(()=>{
          submit.textContent='Send Message';
          submit.disabled=false;
        },1400);
      }

      if(status){
        status.className='contact-form-status';
        status.textContent='';
      }

      hidden.submit();

      // Clean up this submission after it finishes, with a safety timeout.
      let cleaned=false;
      const cleanup=()=>{
        if(cleaned)return;
        cleaned=true;
        setTimeout(()=>{
          if(hidden.isConnected)hidden.remove();
          if(frame.isConnected)frame.remove();
        },500);
      };
      frame.addEventListener('load',cleanup,{once:true});
      setTimeout(cleanup,30000);
    });
  }
  function renderContact(){
    const supportEmail='fixprotechsupport@gmail.com';
    const renderer=s=>{
      if(s.type==='pageHeading')return pageHeading(s.title,s.text,s);

      if(s.type==='contactForm'||s.id==='contact-form'){
        const formMarkup=`<form id="fixtechContactForm" class="fixtech-contact-form" action="https://script.google.com/macros/s/AKfycbz-ZyYQ69oAeovR42RuACpOxIFxDb7NrV2cLowR8Ckk7yTI5vUwuHfzgpFXTua9jiPa_g/exec" method="POST" target="fixtechContactSubmitFrame">
          <div class="contact-form-grid">
            <label><span>Name</span><input name="name" type="text" autocomplete="name" required placeholder="Your name"></label>
            <label><span>Email</span><input name="email" type="email" autocomplete="email" required placeholder="you@example.com"></label>
          </div>
          <label><span>Subject</span><input name="subject" type="text" required placeholder="How can we help?"></label>
          <label><span>Message</span><textarea name="message" rows="7" required placeholder="Enter your message"></textarea></label>
                    <input type="hidden" name="_subject" value="New FixTech Support Message">
          <input type="hidden" name="_template" value="table">
          <input type="hidden" name="_captcha" value="false">
          <input type="hidden" name="_url" value="">
          <input name="_honey" class="contact-honey" tabindex="-1" autocomplete="off" aria-hidden="true">
          <div class="contact-form-actions">
            <button class="primary contact-send-button" type="submit">Send Message</button>
            <div class="contact-form-status" data-contact-status aria-live="polite"></div>
          </div>
        </form><iframe id="fixtechContactSubmitFrame" name="fixtechContactSubmitFrame" title="Contact form submission" style="display:none"></iframe>`;

        return card(`<div class="contact-form-wrap">${childSequence(s,{
          title:()=>`<h2 data-ft-child="title">${esc(s.title)}</h2>`,
          description:()=>`<p class="lead" data-ft-child="description">${esc(s.text||'')}</p>`,
          form:()=>`<div data-ft-child="form">${formMarkup}</div>`
        })}</div>`,'contact-form-card',s);
      }

      const children=ensureSectionChildren(s);
      const parts={
        title:()=>`<h2 data-ft-child="title">${esc(s.title)}</h2>`,
        description:()=>`<p class="lead" data-ft-child="description">${esc(s.text||'')}</p>`,
        note:()=>{
          const email=String(s.contactNote||supportEmail).trim()||supportEmail;
          return `<div class="contact-support-email" data-ft-child="note">
            <span>Support Email</span>
            <a href="mailto:${attr(email)}">${esc(email)}</a>
          </div>`;
        }
      };
      return card(`<div class="contact-support-wrap">${childSequence(s,parts)}</div>`,'contact-support-card',s);
    };

    app.innerHTML=layout('contact',renderer);
    bindContactForm();
  }

  function locateFromAdmin(){
    const id=new URLSearchParams(location.search).get('locate');
    if(!id)return;
    let target=null,label='Website element';
    if(id==='__header__'){target=document.querySelector('[data-fixtech-global="__header__"]');label='Header'}
    else if(id==='__footer__'){target=document.querySelector('[data-fixtech-global="__footer__"]');label='Footer'}
    else{
      target=document.querySelector(`[data-fixtech-element="${CSS.escape(id)}"]`);
      const promoLabels={'pos-promo-badge':'Promotion Badge','pos-promo-title':'Main Title','pos-promo-description':'Description','pos-promo-price':'Price Box','pos-promo-features':'Feature Group','pos-promo-download':'Download Button','pos-promo-version':'Version Text','pos-promo-image':'Right-Side Image'};
      if(promoLabels[id])label=promoLabels[id];
      else for(const p of Object.values(state.pages||{})){const found=(p.sections||[]).find(x=>x.id===id);if(found){label=found.title||'Website element';break}}
    }
    if(!target)return;
    document.querySelectorAll('.admin-locate-highlight').forEach(x=>x.classList.remove('admin-locate-highlight'));
    target.classList.add('admin-locate-highlight');
    target.scrollIntoView({behavior:'smooth',block:'center'});
    let toast=document.getElementById('adminLocateToast');if(toast)toast.remove();
    toast=document.createElement('div');toast.id='adminLocateToast';toast.className='admin-locate-toast';toast.innerHTML=`<b>Selected in Admin:</b> ${esc(label)}<span>This is the part you chose to edit.</span>`;document.body.appendChild(toast);
    clearTimeout(window.__fixtechLocateTimer);window.__fixtechLocateTimer=setTimeout(()=>{target.classList.remove('admin-locate-highlight');toast?.remove()},7000);
  }
  let heroSliderTimer=null;
  function initHeroSlider(){
    clearInterval(heroSliderTimer);heroSliderTimer=null;
    const root=document.querySelector('[data-hero-slider]');if(!root)return;
    const slides=[...root.querySelectorAll('.hero-slide')],dots=[...root.querySelectorAll('.hero-dot')];if(slides.length<2)return;
    let index=0;const show=i=>{index=(i+slides.length)%slides.length;slides.forEach((x,n)=>x.classList.toggle('active',n===index));dots.forEach((x,n)=>x.classList.toggle('active',n===index))};
    root.querySelector('.hero-slider-arrow.prev')?.addEventListener('click',()=>{show(index-1);restart()});root.querySelector('.hero-slider-arrow.next')?.addEventListener('click',()=>{show(index+1);restart()});dots.forEach((d,i)=>d.addEventListener('click',()=>{show(i);restart()}));
    const restart=()=>{clearInterval(heroSliderTimer);heroSliderTimer=setInterval(()=>show(index+1),(+root.dataset.seconds||5)*1000)};restart();
    root.addEventListener('mouseenter',()=>clearInterval(heroSliderTimer));root.addEventListener('mouseleave',restart);
  }
    // FIXTECH_DYNAMIC_BROWSER_TITLE_V570
  function updateDocumentTitle(){
    const r=route();
    const item=(state.nav||[]).find(x=>x.id===r);
    const fallback={home:'Home',panic:'Panic Log',knowledge:'General Knowledge',qa:'Q&A',pos:'FixPro POS',about:'About',contact:'Contact'};
    const pageName=(item&&item.label)||fallback[r]||'Home';
    const brand=(state.site&&state.site.brand)||'FixTech';
    document.title=pageName;
  }
function render(){clearInterval(heroSliderTimer);heroSliderTimer=null;applyTheme();renderBrand();renderNav();const r=route();updateDocumentTitle();if(r==='home')renderHome();else if(r==='panic')renderPanic();else if(r==='knowledge')renderKnowledge();else if(r==='qa')renderQA();else if(r==='pos')renderPos();else if(r==='about')renderAbout();else if(r==='contact')renderContact();else renderHome();bindRoutes();initHeroSlider();setTimeout(locateFromAdmin,80)}
  if(IS_LOCAL_PREVIEW)window.addEventListener('hashchange',()=>{render();window.scrollTo({top:0,left:0,behavior:'auto'})});
  else window.addEventListener('popstate',()=>{render();window.scrollTo({top:0,left:0,behavior:'auto'})});
  window.addEventListener('storage',e=>{if(CONTENT_KEYS.has(e.key)){syncFromStorage();render()}});
  window.addEventListener('focus',()=>{syncFromStorage();render()});
  document.addEventListener('visibilitychange',()=>{if(!document.hidden){syncFromStorage();render()}});
  document.getElementById('globalSearch').addEventListener('keydown',e=>{if(e.key==='Enter'){sessionStorage.setItem('panic.query',e.target.value);go('panic')}});
  render();
})();
