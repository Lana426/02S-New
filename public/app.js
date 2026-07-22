
  var CURRENT='v1';
  function toggle(id){document.getElementById(id).classList.toggle('open')}
  function svg(inner,w){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="'+(w||1.5)+'">'+inner+'</svg>';}

  /* ═══════════ DATA ═══════════ */
  var ICON={
    crane:'<path d="M10 3h4l7 7-4 4-7-7V3z"/><path d="M3 21h18M6 21v-6"/>',
    lift:'<rect x="8" y="3" width="8" height="6" rx="1"/><path d="M10 9v6M14 9v6M6 21h12M8 15h8v6H8z"/>',
    material:'<path d="M3 17l6-6 4 4 8-8M14 7h7v7"/>',
    power:'<path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/>',
    access:'<path d="M6 3v18M18 3v18M6 8h12M6 13h12M6 18h12"/>',
    earth:'<path d="M3 18h4l2-3 4 6 3-9 2 3h3"/><circle cx="7" cy="20" r="1"/>',
    prefab:'<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>',
    proc:'<path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4"/>',
    box:'<path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>'
  };
  var PILLARS=[
    {key:'equipment',label:'Equipment',depth:'full',dtext:'Full'},
    {key:'prefab',label:'Prefab',depth:'full',dtext:'Full'},
    {key:'procurement',label:'Procurement',depth:'part',dtext:'~100 SKUs'},
    {key:'profservices',label:'Prof. services',depth:'thin',dtext:'By request'},
    {key:'logistics',label:'Logistics',depth:'thin',dtext:'By request'}
  ];
  // mode: 'rental' (per-day) or 'onetime'. rate=daily $/day. price string for display.
  var CATALOG=[
    {id:'crane40',pillar:'equipment',pcat:'Equipment › Cranes & lifting',cat:'Cranes',name:'Hydraulic Crane — 40T',spec:'All-terrain · 40–60 ft reach · operator incl.',price:'$1,240',unit:'/day',icon:'crane',mode:'rental',rate:1240,mrate:24000,plan:'EQ-114'},
    {id:'scissor32',pillar:'equipment',pcat:'Equipment › Access',cat:'Lifts',name:'Scissor Lift — 32 ft',spec:'Electric · 32 ft platform · 500 lb cap.',price:'$185',unit:'/day',icon:'lift',mode:'rental',rate:185,mrate:1900},
    {id:'tele10',pillar:'equipment',pcat:'Equipment › Material handling',cat:'Material',name:'Telehandler — 10K',spec:'10,000 lb · 55 ft lift · 4WD rough-terrain',price:'$420',unit:'/day',icon:'material',mode:'rental',rate:420,mrate:8800,plan:'EQ-118'},
    {id:'gen45',pillar:'equipment',pcat:'Equipment › Power & air',cat:'Power',name:'Towable Generator — 45kW',spec:'Diesel · 45kW · temp power / distribution',price:'$310',unit:'/day',icon:'power',mode:'rental',rate:310,mrate:4200},
    {id:'boom60',pillar:'equipment',pcat:'Equipment › Access',cat:'Access',name:'Boom Lift — 60 ft',spec:'Articulating · 60 ft · diesel · 4WD',price:'$395',unit:'/day',icon:'access',mode:'rental',rate:395,mrate:7500},
    {id:'excav20',pillar:'equipment',pcat:'Equipment › Earthmoving',cat:'Earthmoving',name:'Excavator — 20T',spec:'20-ton · hydraulic thumb · operator opt.',price:'$680',unit:'/day',icon:'earth',mode:'rental',rate:680,mrate:13500},
    {id:'lighttower',pillar:'equipment',pcat:'Equipment › Power & air',cat:'Power',name:'Light Tower',spec:'Diesel · 4×1000W LED · 30 ft mast',price:'$95',unit:'/day',icon:'power',mode:'rental',rate:95,mrate:1200},
    {id:'aircomp',pillar:'equipment',pcat:'Equipment › Power & air',cat:'Power',name:'Air Compressor — 185 CFM',spec:'Towable · 185 CFM · pneumatic tools',price:'$140',unit:'/day',icon:'power',mode:'rental',rate:140,mrate:2600},
    {id:'headwall',pillar:'prefab',pcat:'Prefab',cat:'Prefab',name:'L2 Headwall Assembly',spec:'Shop-fabricated · per approved submittal',price:'Quote',unit:'',icon:'prefab',mode:'onetime',rate:null,est:18400,plan:'PF-021'},
    {id:'piperack',pillar:'prefab',pcat:'Prefab',cat:'Prefab',name:'Prefab Pipe Rack Module',spec:'Pre-assembled · MEP rack · lift-in-place',price:'Quote',unit:'',icon:'prefab',mode:'onetime',rate:null,est:12200},
    {id:'restroom',pillar:'prefab',pcat:'Prefab',cat:'Prefab',name:'Modular Restroom Pod',spec:'Factory-built · plumbed · code-compliant',price:'Quote',unit:'',icon:'prefab',mode:'onetime',rate:null,est:9800},
    {id:'rigging',pillar:'procurement',pcat:'Procurement',cat:'Hardware',name:'Rigging & lift hardware',spec:'Slings, shackles, spreader bar — lot',price:'$340',unit:'',icon:'proc',mode:'onetime',rate:null,unitPrice:340},
    {id:'ppe',pillar:'procurement',pcat:'Procurement',cat:'Safety',name:'PPE kit (crew of 10)',spec:'Hard hats, vests, gloves, glasses',price:'$850',unit:'',icon:'proc',mode:'onetime',rate:null,unitPrice:850},
    {id:'fasteners',pillar:'procurement',pcat:'Procurement',cat:'Materials',name:'Structural fasteners — lot',spec:'A325 bolts, nuts, washers — bulk',price:'$220',unit:'',icon:'proc',mode:'onetime',rate:null,unitPrice:220}
  ];
  var KW={crane:'crane40',scissor:'scissor32',lift:'boom60',boom:'boom60',tele:'tele10',telehandler:'tele10',forklift:'tele10',generator:'gen45',power:'gen45',genset:'gen45',excavator:'excav20',dig:'excav20',light:'lighttower',compressor:'aircomp',air:'aircomp',headwall:'headwall',prefab:'headwall',pipe:'piperack',rack:'piperack',restroom:'restroom',rigging:'rigging',sling:'rigging',ppe:'ppe',safety:'ppe',bolt:'fasteners',fastener:'fasteners'};

  /* ═══════════════════ EQUIPMENT DEMAND PLAN ═══════════════════ */
  var EQ_MONTHS=['2026-03','2026-04','2026-05','2026-06','2026-07','2026-08','2026-09','2026-10','2026-11','2026-12','2027-01','2027-02','2027-03','2027-04','2027-05'];
  var EQ_TODAY='2026-08';
  var EQ_CODES=[
    {code:'02-320',task:'02-320.14',name:'Site Earthwork & Grading',phase:'Phase 1',budget:6100000,committed:5400000},
    {code:'31-620',task:'31-620.02',name:'Solar Pile Installation',phase:'Phase 2',budget:2500000,committed:2500000},
    {code:'26-540',task:'26-540.30',name:'Module Racking & Install',phase:'Phase 3',budget:2900000,committed:1900000},
    {code:'26-330',task:'26-330.05',name:'BESS & Substation',phase:'Phase 4',budget:1300000,committed:600000},
    {code:'01-540',task:'01-540.00',name:'Temporary Power & Site',phase:'Gen. conditions',budget:1400000,committed:700000}
  ];
  var EQ_TASKS=[
    {task:'02-320.14',name:'Mass grading',code:'02-320',phase:'Phase 1'},
    {task:'02-320.16',name:'Earthmoving & hauling',code:'02-320',phase:'Phase 1'},
    {task:'02-320.18',name:'Fine grade & compaction',code:'02-320',phase:'Phase 1'},
    {task:'31-620.02',name:'Pile driving',code:'31-620',phase:'Phase 2'},
    {task:'31-620.04',name:'Pile logistics',code:'31-620',phase:'Phase 2'},
    {task:'26-540.30',name:'Module install',code:'26-540',phase:'Phase 3'},
    {task:'26-540.32',name:'Module racking',code:'26-540',phase:'Phase 3'},
    {task:'26-540.34',name:'Module logistics',code:'26-540',phase:'Phase 3'},
    {task:'26-330.05',name:'BESS set',code:'26-330',phase:'Phase 4'},
    {task:'26-330.07',name:'Substation',code:'26-330',phase:'Phase 4'},
    {task:'01-540.00',name:'General conditions',code:'01-540',phase:'Gen. conditions'}
  ];
  var EQ_LINES=[
    {id:'e1',task:'02-320.14',code:'02-320',desc:'Excavator \u2014 20T',cat:'Earthmoving \u203a Excavators',qty:20,rate:13500,from:'2026-03',to:'2026-10',status:'on-rent',submitted:true,scope:'Phase 1 \u00b7 Mass grading',catId:'excav20'},
    {id:'e2',task:'02-320.14',code:'02-320',desc:'Dozer \u2014 D6',cat:'Earthmoving \u203a Dozers',qty:12,rate:16200,from:'2026-03',to:'2026-09',status:'on-rent',submitted:true,scope:'Phase 1 \u00b7 Mass grading'},
    {id:'e3',task:'02-320.16',code:'02-320',desc:'Off-highway hauler',cat:'Earthmoving \u203a Hauling',qty:24,rate:7200,from:'2026-03',to:'2026-09',status:'on-rent',submitted:true,scope:'Phase 1 \u00b7 Earthmoving'},
    {id:'e4',task:'02-320.18',code:'02-320',desc:'Motor grader',cat:'Earthmoving \u203a Grading',qty:6,rate:14000,from:'2026-04',to:'2026-08',status:'off-rent',submitted:true,scope:'Phase 1 \u00b7 Fine grading'},
    {id:'e5',task:'02-320.18',code:'02-320',desc:'Compaction roller',cat:'Earthmoving \u203a Compaction',qty:12,rate:6800,from:'2026-04',to:'2026-10',status:'on-rent',submitted:true,scope:'Phase 1 \u00b7 Subgrade'},
    {id:'e6',task:'31-620.02',code:'31-620',desc:'Pile driver',cat:'Foundations \u203a Pile driving',qty:6,rate:34500,from:'2026-06',to:'2027-01',status:'on-rent',submitted:true,scope:'Phase 2 \u00b7 Pile install'},
    {id:'e7',task:'31-620.04',code:'31-620',desc:'Telehandler \u2014 10K',cat:'Material handling \u203a Telehandlers',qty:16,rate:8800,from:'2026-06',to:'2026-12',status:'on-rent',submitted:true,scope:'Phase 2 \u00b7 Pile logistics',catId:'tele10'},
    {id:'e8',task:'26-540.30',code:'26-540',desc:'Scissor lift \u2014 32ft',cat:'Access \u203a Scissor lifts',qty:64,rate:1900,from:'2026-09',to:'2027-04',status:'projected',submitted:true,scope:'Phase 3 \u00b7 Module install',catId:'scissor32'},
    {id:'e9',task:'26-540.32',code:'26-540',desc:'Boom lift \u2014 60ft',cat:'Access \u203a Boom lifts',qty:18,rate:7500,from:'2026-09',to:'2027-03',status:'projected',submitted:true,scope:'Phase 3 \u00b7 Racking',catId:'boom60'},
    {id:'e10',task:'26-540.34',code:'26-540',desc:'Telehandler \u2014 10K',cat:'Material handling \u203a Telehandlers',qty:12,rate:8800,from:'2026-09',to:'2027-04',status:'projected',submitted:false,scope:'Phase 3 \u00b7 Module logistics',catId:'tele10'},
    {id:'e11',task:'26-330.05',code:'26-330',desc:'Rough-terrain crane \u2014 90T',cat:'Cranes \u203a Rough-terrain',qty:3,rate:42000,from:'2026-12',to:'2027-05',status:'projected',submitted:false,scope:'Phase 4 \u00b7 BESS set'},
    {id:'e12',task:'26-330.07',code:'26-330',desc:'Boom lift \u2014 80ft',cat:'Access \u203a Boom lifts',qty:10,rate:9200,from:'2027-01',to:'2027-05',status:'projected',submitted:false,scope:'Phase 4 \u00b7 Substation'},
    {id:'e13',task:'01-540.00',code:'01-540',desc:'Towable generator \u2014 45kW',cat:'Power \u203a Generators',qty:16,rate:4200,from:'2026-03',to:'2027-05',status:'on-rent',submitted:true,scope:'General conditions',catId:'gen45'},
    {id:'e14',task:'01-540.00',code:'01-540',desc:'Light tower',cat:'Power \u203a Lighting',qty:26,rate:1200,from:'2026-03',to:'2027-05',status:'on-rent',submitted:true,scope:'General conditions',catId:'lighttower'},
    {id:'e15',task:'26-330.05',code:'26-330',desc:'Crawler crane \u2014 230T',cat:'Cranes \u203a Crawler (non-catalog)',qty:1,rate:null,from:'2027-01',to:'2027-03',status:'projected',submitted:false,scope:'Phase 4 \u00b7 BESS heavy lift',catId:null}
  ];
  var eqState={view:'plan'};
  var eqEditId=null, eqSeq=15, eqAddCode=null, ordSeq=3042, eqRefSeq=200;
  var EQ_HISTORY=[
    {date:'Aug 2, 2026',who:'Dana Reyes',desc:'Increased scissor lift qty 56 \u2192 64 for the Phase 3 racking redesign'},
    {date:'Aug 2, 2026',who:'Dana Reyes',desc:'Added Phase 4 BESS crane + substation lifts (draft, not yet submitted)'},
    {date:'Jul 15, 2026',who:'M. Alvarez (Supt.)',desc:'Extended excavator off-rent Sep \u2192 Oct after the grading delay'},
    {date:'Jun 1, 2026',who:'Dana Reyes',desc:'Submitted Phase 2 pile installation to 02S \u2014 6 pile drivers, 16 telehandlers'},
    {date:'Mar 3, 2026',who:'Dana Reyes',desc:'Submitted Phase 1 earthwork to 02S \u2014 74 assets across 5 line items'},
    {date:'Mar 3, 2026',who:'Dana Reyes',desc:'Created plan from the estimate \u2014 5 cost codes, $14.2M equipment budget'}
  ];
  var CUSTOM_KW={warehouse:'Logistics',warehousing:'Logistics',freight:'Logistics',hauling:'Logistics',trucking:'Logistics',storage:'Logistics','lift plan':'Professional services',survey:'Professional services',inspection:'Professional services',engineer:'Professional services',consult:'Professional services',crew:'Professional services'};

  var state={pillar:'equipment', cart:[]};      // cart loads EMPTY
  var cfg={pid:null, kind:'catalog', custom:null}; // what the detail form is configuring
  var CID=0;

  function byId(id){return CATALOG.filter(function(p){return p.id===id;})[0];}
  function pillarLabel(k){var p=PILLARS.filter(function(x){return x.key===k;})[0];return p?p.label:k;}
  function fmt(n){return '$'+Math.round(n).toLocaleString();}
  function daysBetween(a,b){var d=Math.round((new Date(b)-new Date(a))/86400000);return d>0?d:1;}

  /* ═══════════ PILLS ═══════════ */
  function renderPills(){ var pr=document.getElementById('pillRow'); if(!pr)return; pr.innerHTML = PILLARS.map(function(p){
      return '<span class="pill'+(p.key===state.pillar?' on':'')+'" onclick="setPillar(\''+p.key+'\')">'+p.label+' <span class="depth '+p.depth+'">'+p.dtext+'</span></span>';
    }).join(''); }
  function setPillar(k){state.pillar=k; renderPills(); renderCatalog();}

  /* ═══════════ CATALOG ═══════════ */
  var catOpen=null;
  function pillarIcon(k){
    var m={
      equipment:'<path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/>',
      prefab:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>',
      procurement:'<path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 01-8 0"/>',
      profservices:'<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>',
      logistics:'<rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>'
    };
    return m[k]||ICON.box;
  }
  function pillarBody(pil,items){
    if(pil.depth==='thin'){
      return '<div class="thin-panel">'+svg('<circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>',2)+
        '<div class="tp-t">'+pil.label+' is ordered by request in v1</div>'+
        '<div class="tp-d">This pillar isn\'t in the self-serve catalog yet. Describe what you need and 02S routes it to the '+pil.label.toLowerCase()+' team.</div>'+
        '<button class="btn btn-dark" onclick="openCustom(\''+pil.label+'\')">Create custom request'+svg('<path d="M5 12h14M12 5l7 7-7 7"/>',2)+'</button></div>';
    }
    var cards=items.map(function(p){
      var lead = p.mode==='rental' ? 'Lead 24\u201348 hr' : (p.pillar==='prefab' ? 'Lead 2\u20133 wk' : 'Ships 3\u20135 days');
      return '<div class="prod"><div class="pimg"><span class="pcat">'+p.cat+'</span>'+svg(ICON[p.icon]||ICON.box)+'</div>'+
        '<div class="pbody"><div class="pname">'+p.name+'</div><div class="pspec">'+p.spec+'</div>'+
        '<div class="pfoot"><div><div class="pprice">'+p.price+'<span class="pu">'+p.unit+'</span></div><div class="plead">'+lead+'</div></div>'+
        '<button class="padd txt" onclick="openDetail(\''+p.id+'\',\'catalog\')">Add</button></div></div></div>';
    }).join('');
    if(pil.depth==='part'){
      cards+='<div class="prod custom"><div class="pimg">'+svg('<path d="M12 5v14M5 12h14"/><rect x="3" y="3" width="18" height="18" rx="2" stroke-dasharray="3 3"/>')+'</div>'+
        '<div class="pbody"><div class="pname">Need something else?</div><div class="pspec">Procurement shows ~100 core SKUs in v1. Request anything else via form.</div>'+
        '<div class="pfoot"><span class="cflag">Custom request</span><button class="padd" onclick="openCustom(\'Procurement\')">'+svg('<path d="M5 12h14M12 5l7 7-7 7"/>',2)+'</button></div></div></div>';
    }
    return '<div class="cat-grid">'+cards+'</div>';
  }
  function renderCatalog(){
    var acc=document.getElementById('catAccordion'); if(!acc)return;
    var html='';
    for(var i=0;i<PILLARS.length;i++){
      var pil=PILLARS[i];
      var items=CATALOG.filter(function(p){return p.pillar===pil.key;});
      var open=(catOpen===pil.key);
      html+='<div class="pacc'+(open?' open':'')+'">'+
        '<button class="pacc-head" onclick="togglePillar(\''+pil.key+'\')">'+
          '<span class="pacc-ic">'+svg(pillarIcon(pil.key),2)+'</span>'+
          '<span class="pacc-t"><span class="pacc-name">'+pil.label+'</span></span>'+
          '<span class="depth '+pil.depth+'">'+pil.dtext+'</span>'+
          '<span class="pacc-chev">'+svg('<path d="M6 9l6 6 6-6"/>',2)+'</span>'+
        '</button>'+
        '<div class="pacc-body'+(open?'':' hide')+'">'+(open?pillarBody(pil,items):'')+'</div>'+
      '</div>';
    }
    acc.innerHTML=html;
  }
  function togglePillar(k){ catOpen=(catOpen===k)?null:k; renderCatalog(); }

  /* ═══════════ TYPE-AHEAD (empty until typing) ═══════════ */
  function onAskInput(){
    var raw=document.getElementById('askInput').value, q=raw.toLowerCase().trim();
    var ta=document.getElementById('typeahead'), lbl=document.getElementById('taLabel');
    if(!q){ ta.innerHTML=''; document.getElementById('taWrap').classList.add('hide'); return; }
    var hits={};
    CATALOG.forEach(function(p){ if(p.name.toLowerCase().indexOf(q)>-1||p.cat.toLowerCase().indexOf(q)>-1) hits[p.id]=1; });
    Object.keys(KW).forEach(function(k){ if(q.indexOf(k)>-1) hits[KW[k]]=1; });
    var rows=Object.keys(hits).slice(0,5).map(function(id){var p=byId(id);
      return '<div class="ta-row" onclick="openDetail(\''+p.id+'\',\'catalog\')"><span class="tai">'+svg(ICON[p.icon]||ICON.box,2)+'</span><span class="tat">'+p.name+'</span><span class="ta-map">'+pillarLabel(p.pillar)+' · matched</span><span class="tameta">'+p.price+p.unit+'</span></div>';
    });
    var custHit=null; Object.keys(CUSTOM_KW).forEach(function(k){ if(q.indexOf(k)>-1) custHit=CUSTOM_KW[k]; });
    if(custHit) rows.push('<div class="ta-row" onclick="openCustom(\''+custHit+'\')"><span class="tai">'+svg('<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8z"/>',2)+'</span><span class="tat">Create custom request</span><span class="ta-map" style="background:var(--warning-tint);color:var(--warning)">'+custHit+' · custom</span><span class="tameta">via form &rsaquo;</span></div>');
    if(rows.length===0) rows.push('<div class="ta-row" onclick="parseReq()"><span class="tai">'+svg('<path d="M12 2l2.4 7.4H22l-6 4.5 2.3 7.1-6.3-4.6L5.7 21l2.3-7.1-6-4.5h7.6z"/>',0)+'</span><span class="tat">Parse "'+raw+'" into a request</span><span class="ta-map">AI</span><span class="tameta">&rsaquo;</span></div>');
    lbl.textContent='Matches for "'+raw+'"';
    document.getElementById('taWrap').classList.remove('hide');
    ta.innerHTML=rows.join('');
  }

  /* ═══════════ DETAIL FORM ═══════════ */
  function setTag(id,show){var e=document.getElementById(id); if(e) e.style.display=show?'':'none';}
  function openDetail(pid,kind){
    var p=byId(pid); if(!p) return;
    cfg={pid:pid,kind:kind,custom:null};
    document.getElementById('fPillar').value = optExists('fPillar',p.pcat)?p.pcat:document.getElementById('fPillar').value;
    document.getElementById('fDesc').value = p.name+' — '+p.spec;
    var ns=CURRENT==='ns';
    // rental vs one-time field visibility
    var rental = p.mode==='rental';
    document.getElementById('rentalRow').style.display = rental?'':'none';
    document.getElementById('qtyOnlyRow').style.display = rental?'none':'';
    document.getElementById('qtyLabel').textContent='Units';
    // provenance banner
    var pic=document.getElementById('provIcon'), pt=document.getElementById('provTitle'), pd=document.getElementById('provDesc');
    if(kind==='plan' && ns){
      pic.innerHTML='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6 4.5 2.3 7.1-6.3-4.6L5.7 21l2.3-7.1-6-4.5h7.6z"/></svg>';
      pt.textContent='Pre-filled from your plan & schedule';
      pd.innerHTML='<em>'+p.name+'</em>'+(p.plan?' maps to plan item '+p.plan:'')+'. Dates and quantity are pulled from your schedule — confirm and add.';
      setTag('tagPillar',true); setTag('tagDesc',true);
      document.querySelectorAll('#composeState .ptl').forEach(function(x){x.textContent='from plan';});
    } else {
      pic.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>';
      pt.textContent = rental?'Set your rental dates & quantity':'Set the quantity';
      pd.innerHTML = 'Configuring <em>'+p.name+'</em>. '+(rental?'Duration and 02S day-rate set the line total.':'02S rate applies per unit.');
      setTag('tagPillar',false); setTag('tagDesc',false);
    }
    // defaults
    document.getElementById('fFrom').value='2026-08-04';
    document.getElementById('fTo').value = rental?'2026-08-29':'2026-08-04';
    document.getElementById('fQty').value=1;
    document.getElementById('fQtyOnly').value=1;
    recalc();
    showCompose();
  }
  function openCustom(pillar){
    cfg={pid:null,kind:'custom',custom:pillar};
    document.getElementById('fPillar').value = optExists('fPillar',pillar)?pillar:lastOpt('fPillar');
    document.getElementById('fDesc').value = document.getElementById('askInput').value.trim();
    // custom requests still need timing — collect start date + duration + quantity
    document.getElementById('rentalRow').style.display='';
    document.getElementById('qtyOnlyRow').style.display='none';
    document.getElementById('qtyLabel').textContent='Quantity';
    document.getElementById('fFrom').value='2026-08-04';
    document.getElementById('fTo').value='2026-08-18';
    document.getElementById('fQty').value=1;
    var pic=document.getElementById('provIcon');
    pic.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8z"/></svg>';
    document.getElementById('provTitle').textContent='Custom request';
    document.getElementById('provDesc').innerHTML='Set <em>when you need it</em> and <em>for how long</em> below — then 02S routes this to the <em>'+pillar+'</em> team and sends a quote.';
    setTag('tagPillar',false); setTag('tagDesc',false);
    recalc();
    showCompose();
  }
  function parseReq(){
    var raw=document.getElementById('askInput').value.trim()||document.getElementById('askInput').placeholder;
    var q=raw.toLowerCase(), matchId=null;
    Object.keys(KW).forEach(function(k){ if(q.indexOf(k)>-1 && !matchId) matchId=KW[k]; });
    var custHit=null; Object.keys(CUSTOM_KW).forEach(function(k){ if(q.indexOf(k)>-1) custHit=CUSTOM_KW[k]; });
    if(matchId){
      openDetail(matchId, CURRENT==='ns'?'plan':'parse');
      // override provenance for parse (from text) when V1
      if(CURRENT!=='ns'){
        var p=byId(matchId);
        document.getElementById('provIcon').innerHTML='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6 4.5 2.3 7.1-6.3-4.6L5.7 21l2.3-7.1-6-4.5h7.6z"/></svg>';
        document.getElementById('provTitle').textContent='Parsed from your request';
        document.getElementById('provDesc').innerHTML='02S read <em>"'+raw+'"</em> and pre-filled the fields. Set or confirm dates & quantity, then add.';
        setTag('tagPillar',true); setTag('tagDesc',true);
        document.querySelectorAll('#composeState .ptl').forEach(function(x){x.textContent='parsed';});
      }
    } else if(custHit){ openCustom(custHit); }
    else { openCustom('Professional services'); }
  }

  /* ═══════════ "HERE'S WHAT I UNDERSTOOD" INTERSTITIAL ═══════════ */
  function esc(s){return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
  function askExampleReq(t){ document.getElementById('askInput').value=t; ask02S(); }
  function dashAskGo(){ var v=document.getElementById('dashAsk').value.trim(); go('order'); if(v){ document.getElementById('askInput').value=v; ask02S(); } else { document.getElementById('askInput').focus(); } }
  function ask02S(){
    var raw=document.getElementById('askInput').value.trim();
    if(!raw){ document.getElementById('askInput').focus(); return; }
    var q=raw.toLowerCase();
    // same mapping parseReq uses — keyword → catalog item / custom pillar
    var matchId=null; Object.keys(KW).forEach(function(k){ if(q.indexOf(k)>-1 && !matchId) matchId=KW[k]; });
    var custHit=null; Object.keys(CUSTOM_KW).forEach(function(k){ if(q.indexOf(k)>-1) custHit=CUSTOM_KW[k]; });
    var matchedItem=null, pillar, guess=false;
    if(matchId){ matchedItem=byId(matchId); pillar=pillarLabel(matchedItem.pillar); }
    else if(custHit){ pillar=custHit; }
    else { pillar='Professional services'; guess=true; } // unmatched defaults here — the confirm step is what catches it
    // light "needed by" parse
    var neededBy=null, days=['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
    for(var i=0;i<days.length;i++){ if(q.indexOf(days[i])>-1){ neededBy=days[i].charAt(0).toUpperCase()+days[i].slice(1); break; } }
    if(!neededBy && q.indexOf('today')>-1) neededBy='Today';
    if(!neededBy && q.indexOf('tomorrow')>-1) neededBy='Tomorrow';
    if(!neededBy){ var mons=['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec']; for(var m=0;m<mons.length;m++){ var idx=q.indexOf(mons[m]); if(idx>-1){ var frag=raw.substr(idx,7).replace(/[^A-Za-z0-9 \u2013-]/g,'').trim(); neededBy=frag.charAt(0).toUpperCase()+frag.slice(1); break; } } }
    if(!neededBy) neededBy='Not specified';
    // clear the live type-ahead so it doesn't compete with the committed parse
    document.getElementById('typeahead').innerHTML=''; document.getElementById('taLabel').textContent='Start typing — matching catalog items appear here'; document.getElementById('taWrap').classList.add('hide');
    var ns=CURRENT==='ns', nsLine='';
    if(ns){
      var msg = (matchedItem && matchedItem.pillar==='equipment')
        ? 'An idle <b>scissor lift</b> is already on site (off-rent since Tue). It could cover this — reassign instead of a new rental and save <b>$185/day</b>.'
        : 'I can route this to <b>'+pillar+'</b> now. <b>'+neededBy+'</b> is tight against your schedule — I\'ve flagged it for expedite.';
      nsLine='<div class="un-ns">'+svg('<path d="M12 2l2.4 7.4H22l-6 4.5 2.3 7.1-6.3-4.6L5.7 21l2.3-7.1-6-4.5h7.6z"/>',0)+'<div>'+msg+'</div></div>';
    }
    var el=document.getElementById('understood');
    el.className='understood';
    el.innerHTML=
      '<div class="un-h"><span class="uhi">'+svg('<path d="M12 2l2.4 7.4H22l-6 4.5 2.3 7.1-6.3-4.6L5.7 21l2.3-7.1-6-4.5h7.6z"/>',0)+'</span><span class="uht">Here\'s what I understood</span>'+
        '<span class="undismiss" onclick="dismissUnderstood()">'+svg('<path d="M18 6L6 18M6 6l12 12"/>',2)+'Dismiss</span></div>'+
      '<div class="un-grid">'+
        '<div class="un-f"><div class="unl">Request</div><div class="unv">'+esc(raw)+'</div></div>'+
        '<div class="un-f"><div class="unl">Pillar</div><div class="unv'+(guess?' guess':'')+'">'+pillar+(guess?' ?':'')+'</div></div>'+
        '<div class="un-f"><div class="unl">Needed by</div><div class="unv">'+neededBy+'</div></div>'+
        '<div class="un-f"><div class="unl">Deliver to</div><div class="unv">Site default \u2014 Gate B</div></div>'+
      '</div>'+nsLine+
      '<div class="un-foot"><span class="un-note">'+svg('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',2)+(guess?'Check the pillar — 02S guessed; refine if it\'s wrong':'Confirm or refine before you send')+'</span>'+
        '<button class="btn btn-ghost" onclick="refineUnderstood()">Refine details</button>'+
        '<button class="btn btn-red" onclick="sendUnderstood()">Send as request'+svg('<path d="M5 12h14M12 5l7 7-7 7"/>',2)+'</button></div>';
    el.classList.remove('hide');
    if(el.scrollIntoView) el.scrollIntoView({behavior:'smooth',block:'nearest'});
  }
  function dismissUnderstood(){ var el=document.getElementById('understood'); el.classList.add('hide'); el.innerHTML=''; document.getElementById('askInput').value=''; onAskInput(); }
  function refineUnderstood(){ parseReq(); }
  function sendUnderstood(){
    var el=document.getElementById('understood'); el.className='understood sent';
    el.innerHTML='<div class="un-done">'+svg('<path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/>',2)+'<div>Request sent to 02S<div class="udsub">You\'ll get a quote within ~2 hours — track it under Orders, and we\'ll notify you when it\'s ready.</div></div></div>';
    toast('Request sent to 02S — quote incoming'); document.getElementById('askInput').value='';
  }

  function recalc(){
    var pl=document.getElementById('priceLine');
    if(cfg.kind==='custom' || (cfg.pid && byId(cfg.pid).mode==='onetime' && byId(cfg.pid).rate===null && byId(cfg.pid).price==='Quote')){
      // quote / custom: no computed number
      if(cfg.kind==='custom'){ var _cf=document.getElementById('fFrom').value,_ct=document.getElementById('fTo').value,_cd=daysBetween(_cf,_ct); pl.className='price-line quote'; pl.innerHTML='<span class="pl-calc">'+(_cf&&_ct?_cd+'-day need · ':'')+'02S will price this on review and send a quote.</span><span class="pl-total">Quote</span>'; return; }
    }
    var p=cfg.pid?byId(cfg.pid):null;
    if(!p){ pl.className='price-line quote'; pl.innerHTML='<span class="pl-calc">02S will price this on review.</span><span class="pl-total">Quote</span>'; return; }
    if(p.mode==='rental'){
      var from=document.getElementById('fFrom').value, to=document.getElementById('fTo').value;
      var qty=Math.max(1,parseInt(document.getElementById('fQty').value||1,10));
      var days=daysBetween(from,to);
      var total=days*p.rate*qty;
      var wk=(days/7).toFixed(days%7?1:0);
      pl.className='price-line';
      pl.innerHTML='<span class="pl-calc"><b>'+fmt(p.rate)+'</b>/day × <b>'+days+' days</b> ('+wk+' wk)'+(qty>1?' × <b>'+qty+' units</b>':'')+'</span><span class="pl-total">'+fmt(total)+'<span class="plu"> est.</span></span>';
    } else if(p.price==='Quote'){
      var q2=Math.max(1,parseInt(document.getElementById('fQtyOnly').value||1,10));
      pl.className='price-line quote';
      pl.innerHTML='<span class="pl-calc">Prefab is priced by 02S on submission · est. '+fmt(p.est*q2)+'</span><span class="pl-total">Quote</span>';
    } else {
      var q3=Math.max(1,parseInt(document.getElementById('fQtyOnly').value||1,10));
      var t3=p.unitPrice*q3;
      pl.className='price-line';
      pl.innerHTML='<span class="pl-calc"><b>'+fmt(p.unitPrice)+'</b> × <b>'+q3+'</b></span><span class="pl-total">'+fmt(t3)+'</span>';
    }
  }

  function addConfiguredToCart(){
    var line;
    if(cfg.kind==='custom'){
      line={cid:++CID, pid:null, name:(document.getElementById('fDesc').value.split('\n')[0]||'Custom request').slice(0,60), icon:'box', pillarKey:pillarKeyFromLabel(cfg.custom), pcat:cfg.custom, mode:'custom', qtyText:(function(){var f=document.getElementById('fFrom').value,t=document.getElementById('fTo').value,q=Math.max(1,parseInt(document.getElementById('fQty').value||1,10));return (f&&t?fmtDate(f)+'–'+fmtDate(t)+' · '+daysBetween(f,t)+'d':'timing TBD')+(q>1?' × '+q:'')+' · quote';})(), total:null, plan:null};
    } else {
      var p=byId(cfg.pid);
      if(p.mode==='rental'){
        var from=document.getElementById('fFrom').value,to=document.getElementById('fTo').value;
        var qty=Math.max(1,parseInt(document.getElementById('fQty').value||1,10));
        var days=daysBetween(from,to);
        line={cid:++CID,pid:p.id,name:p.name,icon:p.icon,pillarKey:p.pillar,pcat:p.pcat,mode:'rental',
              qtyText:fmtDate(from)+'–'+fmtDate(to)+' · '+days+'d'+(qty>1?' × '+qty:''),total:days*p.rate*qty,plan:p.plan||null};
      } else if(p.price==='Quote'){
        var q2=Math.max(1,parseInt(document.getElementById('fQtyOnly').value||1,10));
        line={cid:++CID,pid:p.id,name:p.name,icon:p.icon,pillarKey:p.pillar,pcat:p.pcat,mode:'quote',qtyText:(q2>1?q2+' units · ':'')+'quote',total:p.est*q2,plan:p.plan||null,isQuote:true};
      } else {
        var q3=Math.max(1,parseInt(document.getElementById('fQtyOnly').value||1,10));
        line={cid:++CID,pid:p.id,name:p.name,icon:p.icon,pillarKey:p.pillar,pcat:p.pcat,mode:'onetime',qtyText:(q3>1?q3+' units':'one-time'),total:p.unitPrice*q3,plan:p.plan||null};
      }
    }
    state.cart.push(line);
    renderCart(); flashCount(); backToCatalog();
  }
  function pillarKeyFromLabel(l){var m={'Equipment':'equipment','Prefab':'prefab','Procurement':'procurement','Professional services':'profservices','Logistics':'logistics'};return m[l]||'logistics';}
  function fmtDate(iso){var d=new Date(iso+'T00:00');return d.toLocaleDateString('en-US',{month:'short',day:'numeric'});}

  /* ═══════════ CART ═══════════ */
  function removeFromCart(cid){state.cart=state.cart.filter(function(c){return c.cid!==cid;}); renderCart();}
  function flashCount(){var c=document.getElementById('reqCount');c.style.transform='scale(1.35)';setTimeout(function(){c.style.transform='';},180);}
  function overridePlanMatch(itemId, planId){
    openModal('Override plan match',
      '<div style="font-size:12.5px;padding:10px 12px;background:var(--warning-tint);border:1px solid #c9a227;border-radius:6px;margin-bottom:14px">'
      +'<b>This item matches plan item '+planId+'.</b> You can add it as a separate ad hoc request — it will be logged as a new need outside the plan.</div>'
      +'<div class="mf" style="margin-bottom:12px"><label>Reason for adding as new need</label>'
      +'<select class="acc-sel wfull"><option>Scope change — additional quantity needed</option><option>Plan item no longer applicable — replacing with this request</option><option>Ad hoc need — not in original plan</option><option>Other</option></select></div>'
      +'<div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button>'
      +'<button class="btn btn-red" onclick="closeModal();toast(\'Added as new need — logged outside plan · 02S notified\')">Add as new need</button></div>'
    );
  }
  function renderCart(){
    var body=document.getElementById('reqBody'), count=document.getElementById('reqCount');
    count.textContent=state.cart.length;
    if(state.cart.length===0){
      body.innerHTML='<div class="req-empty">'+svg('<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 002 1.6h9.7a2 2 0 002-1.6L23 6H6"/>',1.5)+'<div style="margin-top:10px">Your request is empty.</div><div style="font-size:11.5px;margin-top:3px">Browse the catalog or ask 02S — you\'ll set dates & quantity before it\'s added.</div></div>';
      return;
    }
    var ns=CURRENT==='ns', total=0, eq=0, other=0, matches=0, newn=0;
    var rows=state.cart.map(function(c){
      if(c.total) total+=c.total;
      if(c.pillarKey==='equipment') eq++; else other++;
      var planline;
      if(c.plan){matches++; planline='<div class="ri-plan match">'+svg('<path d="M20 6L9 17l-5-5"/>',2)+'Matches plan item '+c.plan+' <span class="lk" onclick="toast(\'Viewing plan item '+c.plan+'\')">view</span><span class="lk" style="margin-left:8px;color:var(--warning)" onclick="overridePlanMatch(\''+c.id+'\',\''+c.plan+'\')">override / add as new need</span></div>';}
      else {newn++; planline='<div class="ri-plan newneed">'+svg('<path d="M12 9v4M12 17h.01M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L14.7 3.9a2 2 0 00-3.4 0z"/>',2)+(ns?'New need — logged':'New need — not in plan')+' <span class="lk">'+(ns?'ok':'confirm')+'</span></div>';}
      var priceStr = c.total? (c.isQuote?('<span class="ri-price">Quote</span>'):('<span class="ri-price">'+fmt(c.total)+'</span>')) : '<span class="ri-price">Quote</span>';
      return '<div class="ri-row"><span class="ri-thumb">'+svg(ICON[c.icon]||ICON.box)+'</span>'+
        '<div class="ri-body"><div class="ri-name">'+c.name+'</div>'+
        '<div class="ri-meta"><span class="ri-pillar'+(c.pillarKey==='equipment'?' eq':'')+'">'+pillarLabel(c.pillarKey)+'</span> '+c.qtyText+'</div>'+planline+'</div>'+
        '<div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px">'+priceStr+
        '<button class="ri-rm" title="Remove" onclick="removeFromCart('+c.cid+')">'+svg('<path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>',2)+'</button></div></div>';
    }).join('');
    var recon = ns
      ? '<div class="req-recon ns"><div class="rrt">'+svg('<path d="M20 6L9 17l-5-5"/>',2)+'Reconciled against your plan</div><div class="rrd">'+matches+' of '+state.cart.length+' items tie to your Div 3 plan and are on-budget. '+(newn>0?newn+' logged as new need'+(newn>1?'s':'')+'.':'Nothing over plan.')+'</div></div>'
      : '<div class="req-recon"><div class="rrt">'+svg('<path d="M12 9v4M12 17h.01M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L14.7 3.9a2 2 0 00-3.4 0z"/>',2)+'Review before submitting</div><div class="rrd">'+matches+' item'+(matches===1?'':'s')+' match your plan. '+(newn>0?'<b>'+newn+' item'+(newn===1?'':'s')+'</b> not in plan — confirm new need or map to a plan item.':'All items matched.')+'</div></div>';
    var route='<div class="req-route">'+
      (eq>0?'<div class="rr">'+svg('<path d="M20 6L9 17l-5-5"/>',2)+'Equipment &rarr; <b>YardHub</b> ('+eq+')</div>':'')+
      (other>0?'<div class="rr">'+svg('<path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="9"/>',2)+'Other pillars &rarr; <b>02S ops backlog</b> ('+other+')</div>':'')+'</div>';
    body.innerHTML='<div class="req-items">'+rows+'</div>'+recon+
      '<div class="req-upload" onclick="toast(\'Photo upload — attach specs or images\')">'+svg('<path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>',2)+'Attach specs or drawings</div>'+
      '<div class="req-foot">'+route+
      '<div class="req-total"><span class="tl">Est. total · 02S rates</span><span class="tv">'+fmt(total)+'<span class="per"> /project</span></span></div>'+
      '<button class="btn btn-red req-submit" onclick="sendUnderstood()">Submit request'+svg('<path d="M5 12h14M12 5l7 7-7 7"/>',2)+'</button></div>';
  }

  /* ═══════════ compose show/hide ═══════════ */
  function showCompose(){document.getElementById('browseState').classList.add('hide');document.getElementById('composeState').classList.add('active');window.scrollTo(0,0);}
  function backToCatalog(){document.getElementById('composeState').classList.remove('active');document.getElementById('browseState').classList.remove('hide');var _u=document.getElementById('understood');if(_u){_u.classList.add('hide');_u.innerHTML='';}}
  function optExists(sel,val){var o=document.getElementById(sel).options;for(var i=0;i<o.length;i++){if(o[i].value===val)return true;}return false;}
  function lastOpt(sel){var o=document.getElementById(sel).options;return o[o.length-1].value;}

  /* ═══════════ SCREEN SWITCH ═══════════ */
  /* ═══════════════════ EQUIPMENT DEMAND PLAN — render ═══════════════════ */
  function gel(id){return document.getElementById(id);}
  function eqIdx(m){return EQ_MONTHS.indexOf(m);}
  function eqMonths(from,to){var a=eqIdx(from),b=eqIdx(to);if(a<0)a=0;if(b<0)b=EQ_MONTHS.length-1;return (b-a)+1;}
  function eqLineTotal(l){if(!l.rate)return 0; return eqMonths(l.from,l.to)*l.rate*l.qty;}
  function eqCodeProjected(code){var t=0;for(var i=0;i<EQ_LINES.length;i++){if(EQ_LINES[i].code===code)t+=eqLineTotal(EQ_LINES[i]);}return t;}
  function eqMonthLabel(m){var names=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];return names[parseInt(m.split('-')[1],10)-1];}
  function eqMonthYear(m){return m.split('-')[0];}
  function fmtBig(n){var a=Math.abs(n),s=(n<0?'-':'');if(a>=1000000)return s+'$'+(a/1000000).toFixed(1)+'M';if(a>=1000)return s+'$'+Math.round(a/1000)+'K';return s+'$'+a;}

  var eqGroupBy='task';
  function eqTaskInfo(t){ for(var i=0;i<EQ_TASKS.length;i++){if(EQ_TASKS[i].task===t)return EQ_TASKS[i];} return null; }
  function eqGroupClass(l){ return (l.cat||'Other').split(' \u203a ')[0]; }
  function eqSumLines(ls){ var s=0; for(var i=0;i<ls.length;i++)s+=eqLineTotal(ls[i]); return s; }
  function eqGroups(){
    var mode=eqGroupBy, groups=[], map={}, i, l;
    if(mode==='code'){
      for(i=0;i<EQ_CODES.length;i++){var c=EQ_CODES[i]; var g={tag:c.code,title:c.name,meta:c.phase,lines:[],hasBudget:true,budget:c.budget,committed:c.committed,code:c.code}; groups.push(g); map[c.code]=g;}
      for(i=0;i<EQ_LINES.length;i++){l=EQ_LINES[i]; if(map[l.code])map[l.code].lines.push(l);}
      return groups;
    }
    for(i=0;i<EQ_LINES.length;i++){
      l=EQ_LINES[i]; var key,tag,title,meta,pcode=null;
      if(mode==='task'){ key=l.task||(l.code+'.00'); var ti=eqTaskInfo(key); tag=key; title=ti?ti.name:l.desc; meta=ti?(ti.code+' \u00b7 '+ti.phase):l.code; pcode=ti?ti.code:l.code; }
      else if(mode==='class'){ key=eqGroupClass(l); tag=null; title=key; meta='equipment class'; }
      else { key=l.scope||'Unassigned'; tag=null; title=key; meta='scope of work'; }
      if(!map[key]){ map[key]={tag:tag,title:title,meta:meta,lines:[],hasBudget:false,code:pcode}; groups.push(map[key]); }
      map[key].lines.push(l);
    }
    return groups;
  }
  function setEqGroup(v){ eqPopClose(); eqGroupBy=v; var s=gel('eqGroupSel'); if(s)s.value=v; setEqView(eqState.view); }
  function renderEqBudget(){
    var ns=CURRENT==='ns';
    var tB=0,tC=0,tP=0,over=0;
    for(var i=0;i<EQ_CODES.length;i++){var c=EQ_CODES[i];var p=eqCodeProjected(c.code);tB+=c.budget;tC+=c.committed;tP+=p;if(p>c.budget)over++;}
    var vAr=tB-tP;
    var onr=0,off=0;
    for(var j=0;j<EQ_LINES.length;j++){var l=EQ_LINES[j];if(l.status==='on-rent')onr+=l.qty;else if(l.status==='off-rent')off+=l.qty;}
    var pct=Math.round(tC/tB*100);
    var varCls=ns?'bad':(vAr>=0?'ok':'bad');
    var varSub=ns?('<span class="tag bad">'+over+' codes over</span><span style="color:var(--g400)">forecast to close</span>'):(vAr>=0?'under plan at completion':'over plan at completion');
    var pend=0; for(var pj=0;pj<EQ_LINES.length;pj++){if(eqLineState(EQ_LINES[pj])==='pending')pend++;}
    var pendTxt=pend?(' \u00b7 '+pend+' pending pricing'):'';
    var projSub=ns?('<span class="tag neu">02S forecast</span><span style="color:var(--g400)">from the schedule'+pendTxt+'</span>'):('across '+EQ_CODES.length+' cost codes'+pendTxt);
    var h=''
     +'<div class="vital ok"><div class="vk">'+svg('<path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>')+'Plan budget</div><div class="vv">'+fmtBig(tB)+'</div><div class="vsub">equipment \u00b7 15-mo horizon</div></div>'
     +'<div class="vital ok"><div class="vk">'+svg('<path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/>')+'Committed to date</div><div class="vv">'+fmtBig(tC)+'</div><div class="vsub">'+pct+'% \u00b7 '+(onr+off)+' assets called on</div></div>'
     +'<div class="vital ok"><div class="vk">'+svg('<path d="M3 3v18h18"/><path d="M7 13l3-3 4 4 5-5"/>')+'Projected at complete</div><div class="vv">'+fmtBig(tP)+'</div><div class="vsub">'+projSub+'</div></div>'
     +'<div class="vital '+varCls+'"><div class="vk">'+svg('<path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>')+'Variance to budget</div><div class="vv">'+(vAr>=0?'+':'')+fmtBig(vAr)+'</div><div class="vsub">'+varSub+'</div></div>';
    gel('eqBudget').innerHTML=h;
  }

  function renderEqPlan(){
    var ns=CURRENT==='ns';
    var cap='<div class="eq-cap">'+svg('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>')+'<span><b>How pricing works:</b> rates are pulled from the 02S catalog \u2014 the team sets quantity, dates, and cost code, never the rate. Specialized items not in the catalog are sent to 02S admin to price.'+(ns?' 02S also rebuilds the month spread automatically whenever the CPM schedule moves.':' Draft lines stay editable until they\u2019re submitted to 02S.')+'</span></div>';
    var thead='<div class="eq-thead"><span>Equipment</span><span>On-rent \u2192 off-rent</span><span class="c">Qty</span><span class="r">Monthly / line total</span><span>Status</span><span class="c">Edit</span></div>';
    var body='';
    var GS=eqGroups();
    for(var i=0;i<GS.length;i++){
      var g=GS[i];
      var p=eqSumLines(g.lines);
      var over=g.hasBudget&&((g.budget-p)<0), vAr=g.hasBudget?(g.budget-p):0;
      var cnt=0; for(var k=0;k<g.lines.length;k++)cnt+=g.lines[k].qty;
      var cpend=0; for(var kp=0;kp<g.lines.length;kp++){if(eqLineState(g.lines[kp])==='pending')cpend++;}
      var metaLine=(g.meta?g.meta+' \u00b7 ':'')+cnt+' assets \u00b7 '+g.lines.length+' line'+(g.lines.length===1?'':'s')+(cpend?' \u00b7 <span class="egpend">'+cpend+' pending pricing</span>':'');
      var rside=g.hasBudget?('<div class="egproj">Projected <b>'+fmtBig(p)+'</b> / '+fmtBig(g.budget)+' budget \u00b7 <span class="'+(over?'eq-var-bad':'eq-var-ok')+'">'+(over?(fmtBig(-vAr)+' over'):(fmtBig(vAr)+' under'))+'</span></div>'):('<div class="egproj">Projected <b>'+fmtBig(p)+'</b></div>');
      var addb=g.hasBudget?('<button class="eq-addrow" onclick="openEqAdd(\''+g.code+'\')" title="Add a demand line to '+g.code+'">'+svg('<path d="M12 5v14M5 12h14"/>',2)+'</button>'):'';
      body+='<div class="eq-grp">';
      body+='<div class="eq-ghead">'+(g.tag?'<span class="egc">'+g.tag+'</span>':'')+'<div><div class="egn">'+g.title+'</div><div class="egphase">'+metaLine+'</div></div>'+rside+addb+'</div>';
      if(ns&&over){ body+='<div class="eq-projnote">'+svg('<path d="M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L14.7 3.9a2 2 0 00-3.4 0z"/><path d="M12 9v4M12 17h.01"/>')+'02S: at the current spread this code lands <b>'+fmtBig(-vAr)+' over budget</b> \u2014 rebalance while the later phases are still projected.</div>'; }
      for(var j=0;j<g.lines.length;j++){
        var l=g.lines[j];
        var mo=eqMonths(l.from,l.to), lt=eqLineTotal(l);
        var stt=eqLineState(l);
        var stTxt=stt==='onrent'?'On-rent':stt==='offrent'?'Off-rent':stt==='submitted'?'Submitted':stt==='pending'?'Pending pricing':'Draft';
        var editBtn='<button class="eq-ib" onclick="openEqEdit(\''+l.id+'\')" title="'+(stt==='submitted'?'Request change':'Edit line')+'">'+svg('<path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 013 3L12 15l-4 1 1-4z"/>',2)+'</button>';
        var delBtn='<button class="eq-ib danger" onclick="delEqLine(\''+l.id+'\')" title="'+(stt==='pending'?'Withdraw request':'Remove draft')+'">'+svg('<path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>',2)+'</button>';
        var act;
        if(stt==='draft'||stt==='pending') act=editBtn+delBtn;
        else if(stt==='submitted') act=editBtn;
        else act='<span class="eq-lock" title="On rent \u2014 locked">'+svg('<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>',2)+'</span>';
        body+='<div class="eqrow">'
          +'<div class="eq-desc">'+l.desc+'<div class="sub">'+l.cat+' \u00b7 '+l.scope+(l.ref?' \u00b7 <span class="eq-ref">'+l.ref+'</span>':'')+'</div></div>'
          +'<div class="eq-dates">'+eqMonthLabel(l.from)+' \u2019'+l.from.slice(2,4)+' \u2192 '+eqMonthLabel(l.to)+' \u2019'+l.to.slice(2,4)+'<div class="sub">'+mo+' billable months</div></div>'
          +'<div class="eq-qty">\u00d7'+l.qty+'</div>'
          +(stt==='pending'?'<div class="eq-cost pend">Pending<div class="sub">02S to price</div></div>':'<div class="eq-cost">'+fmt(l.rate)+'/mo<div class="sub"><b>'+fmtBig(lt)+'</b> total</div></div>')
          +'<div class="eq-status"><span class="eq-st '+stt+'"><span class="d"></span>'+stTxt+'</span></div>'
          +'<div class="eq-actions">'+act+'</div>'
          +'</div>';
      }
      body+='</div>';
    }
    var pend=0; for(var pk=0;pk<EQ_LINES.length;pk++){if(eqLineState(EQ_LINES[pk])==='pending')pend++;}
    var pendBar=pend?'<div class="eq-pendbar">'+svg('<circle cx="12" cy="12" r="10"/><path d="M12 7v5l3 2"/>')+'<span><b>'+pend+' line'+(pend===1?'':'s')+' awaiting 02S pricing</b> \u2014 excluded from the projected totals until 02S admin sets the rate.</span></div>':'';
    gel('eqPlan').innerHTML=cap+pendBar+'<div class="eqtbl">'+thead+body+'</div>';
  }

  function renderEqGantt(){
    var ns=CURRENT==='ns';
    var N=EQ_MONTHS.length, todayIdx=eqIdx(EQ_TODAY), todayPct=((todayIdx+1)/N)*100;
    var mh='';
    for(var i=0;i<N;i++){
      var m=EQ_MONTHS[i];
      var yrStart=(i===0)||(eqMonthYear(m)!==eqMonthYear(EQ_MONTHS[i-1]));
      mh+='<div class="gh-m">'+eqMonthLabel(m)+(yrStart?'<span class="ghy">\u2019'+m.slice(2,4)+'</span>':'')+'</div>';
    }
    var head='<div class="g-head"><div class="gh-label">Cost code / equipment</div><div class="gh-months">'+mh+'</div></div>';
    var grid='repeating-linear-gradient(to right, transparent 0, transparent calc('+(100/N)+'% - 1px), var(--g150) calc('+(100/N)+'% - 1px), var(--g150) calc('+(100/N)+'%))';
    var rows='';
    var GS=eqGroups();
    for(var c=0;c<GS.length;c++){
      var g=GS[c];
      var gp=eqSumLines(g.lines), gover=g.hasBudget&&((g.budget-gp)<0);
      var flag=(ns&&gover)?'<span class="gg-flag">'+svg('<path d="M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L14.7 3.9a2 2 0 00-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',2)+fmtBig(-(g.budget-gp))+' over</span>':'';
      rows+='<div class="g-grp">'+(g.tag?'<span class="ggc">'+g.tag+'</span> ':'')+g.title+(g.meta?' <span class="ggmeta">'+g.meta+'</span>':'')+flag+'</div>';
      for(var j=0;j<g.lines.length;j++){
        var l=g.lines[j];
        var a=eqIdx(l.from),b=eqIdx(l.to); if(a<0)a=0; if(b<0)b=N-1;
        var left=(a/N)*100, width=((b-a+1)/N)*100;
        var stt=eqLineState(l);
        var locked=(stt==='onrent'||stt==='offrent');
        var btitle=locked?'Click to view details':(stt==='draft'?'Click to adjust qty & dates':stt==='pending'?'Click to adjust the pricing request':'Click to request a change');
        rows+='<div class="grow"><div class="g-label">'+l.desc+'<span class="gqty">\u00d7'+l.qty+'</span></div>'
          +'<div class="g-track" style="background-image:'+grid+'">'
          +'<div id="gb-'+l.id+'" class="g-bar '+stt+' '+(locked?'vw':'clk')+'" style="left:'+left.toFixed(3)+'%;width:calc('+width.toFixed(3)+'% - 3px)" onclick="openEqBar(\''+l.id+'\')" title="'+btitle+'">\u00d7'+l.qty+'</div>'
          +'</div></div>';
      }
    }
    var today='<div class="g-today" style="left:calc(200px + (100% - 200px) * '+(todayPct/100).toFixed(4)+')"><span class="gt-lbl">Today</span></div>';
    var leg='<div class="g-legend"><span class="lg"><span class="gl-sw onrent"></span>On-rent</span><span class="lg"><span class="gl-sw submitted"></span>Submitted</span><span class="lg"><span class="gl-sw draft"></span>Draft</span><span class="lg"><span class="gl-sw pending"></span>Pending</span><span class="lg"><span class="gl-sw offrent"></span>Off-rent</span><span class="lg"><span class="gl-today"></span>Today \u00b7 '+eqMonthLabel(EQ_TODAY)+' \u2019'+EQ_TODAY.slice(2,4)+'</span></div>';
    gel('eqGantt').innerHTML='<div class="gantt">'+head+'<div class="g-body">'+today+rows+'</div></div>'+leg;
  }

  var eqPop=null;
  function openEqBar(id){
    var l=eqGetLine(id); if(!l)return;
    var st=eqLineState(l);
    eqPop={id:id, qty:l.qty, from:l.from, to:l.to, ro:(st==='onrent'||st==='offrent')};
    eqPopRender();
    var pop=gel('eqPop'); if(pop)pop.classList.remove('hide');
    eqPopPosition(id);
  }
  function eqPopPosition(id){
    var pop=gel('eqPop'), bar=gel('gb-'+id); if(!pop||!bar||!bar.getBoundingClientRect)return;
    var r=bar.getBoundingClientRect(), pw=326, ph=pop.offsetHeight||300;
    var vw=window.innerWidth||1200, vh=window.innerHeight||800;
    var left=r.left; if(left+pw>vw-12)left=vw-pw-12; if(left<12)left=12;
    var top=r.bottom+8; if(top+ph>vh-12)top=r.top-ph-8; if(top<12)top=12;
    pop.style.left=left+'px'; pop.style.top=top+'px';
  }
  function eqPopMonthOpts(sel){ var o=''; for(var i=0;i<EQ_MONTHS.length;i++){var m=EQ_MONTHS[i]; o+='<option value="'+m+'"'+(m===sel?' selected':'')+'>'+eqMonthLabel(m)+' \u2019'+m.slice(2,4)+'</option>';} return o; }
  function eqPopRender(){
    var pop=gel('eqPop'); if(!pop||!eqPop)return;
    var l=eqGetLine(eqPop.id); if(!l){eqPopClose();return;}
    var st=eqLineState(l);
    var stTxt=st==='onrent'?'On-rent':st==='offrent'?'Off-rent':st==='submitted'?'Submitted':st==='pending'?'Pending pricing':'Draft';
    var mo=eqMonths(eqPop.from,eqPop.to), priced=!!l.rate;
    var totTxt=priced?('<b>'+fmtBig(mo*l.rate*eqPop.qty)+'</b> \u00b7 '+eqPop.qty+' \u00d7 '+fmt(l.rate)+'/mo \u00d7 '+mo+' mo'):('<span class="eqp-tbd">Total TBD \u2014 awaiting 02S pricing</span> \u00b7 '+mo+' mo');
    var h='<div class="eqp-head"><div class="eqp-title">'+l.desc+'</div><button class="eqp-x" onclick="eqPopClose()">'+svg('<path d="M18 6L6 18M6 6l12 12"/>',2)+'</button></div>';
    h+='<div class="eqp-meta"><span class="eq-st '+st+'"><span class="d"></span>'+stTxt+'</span><span class="eqp-code">'+l.code+' \u00b7 '+l.scope+'</span></div>';
    if(eqPop.ro){
      h+='<div class="eqp-ro">'+svg('<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>',2)+'<span>This line is <b>'+stTxt.toLowerCase()+'</b> and locked \u2014 viewing details only.</span></div>';
      h+='<div class="eqp-grid"><div class="eqp-f"><label>Quantity</label><div class="eqp-val">\u00d7'+l.qty+'</div></div><div class="eqp-f"><label>Date needed</label><div class="eqp-val">'+eqMonthLabel(l.from)+' \u2019'+l.from.slice(2,4)+'</div></div><div class="eqp-f"><label>Off-rent</label><div class="eqp-val">'+eqMonthLabel(l.to)+' \u2019'+l.to.slice(2,4)+'</div></div></div>';
      h+='<div class="eqp-total">'+totTxt+'</div>';
    } else {
      h+='<div class="eqp-grid">';
      h+='<div class="eqp-f"><label>Quantity</label><div class="eqp-step"><button onclick="eqPopQty(-1)">\u2212</button><input id="eqpQty" type="number" min="1" value="'+eqPop.qty+'" onchange="eqPopQtySet()"><button onclick="eqPopQty(1)">+</button></div></div>';
      h+='<div class="eqp-f"><label>Date needed</label><div class="eqp-nudge"><button onclick="eqPopNudge(\'from\',-1)" title="Earlier">\u2039</button><select id="eqpFrom" onchange="eqPopSel(\'from\')">'+eqPopMonthOpts(eqPop.from)+'</select><button onclick="eqPopNudge(\'from\',1)" title="Later">\u203a</button></div></div>';
      h+='<div class="eqp-f"><label>Off-rent</label><div class="eqp-nudge"><button onclick="eqPopNudge(\'to\',-1)" title="Earlier">\u2039</button><select id="eqpTo" onchange="eqPopSel(\'to\')">'+eqPopMonthOpts(eqPop.to)+'</select><button onclick="eqPopNudge(\'to\',1)" title="Later">\u203a</button></div></div>';
      h+='</div>';
      h+='<div class="eqp-total">'+totTxt+'</div>';
      var saveLbl=st==='submitted'?'Send change request':'Save changes';
      h+='<div class="eqp-foot"><button class="btn btn-ghost btn-sm" onclick="eqPopMore()">Full details\u2026</button><div class="eqp-fb"><button class="btn btn-ghost btn-sm" onclick="eqPopClose()">Cancel</button><button class="btn btn-red btn-sm" onclick="eqPopSave()">'+saveLbl+'</button></div></div>';
    }
    pop.innerHTML=h;
  }
  function eqPopQty(d){ if(!eqPop)return; eqPop.qty=Math.max(1,eqPop.qty+d); eqPopRender(); }
  function eqPopQtySet(){ if(!eqPop)return; var v=parseInt((gel('eqpQty')||{}).value,10)||1; eqPop.qty=Math.max(1,v); eqPopRender(); }
  function eqPopClamp(changed){ if(eqIdx(eqPop.from)>eqIdx(eqPop.to)){ if(changed==='from')eqPop.to=eqPop.from; else eqPop.from=eqPop.to; } }
  function eqPopNudge(f,d){ if(!eqPop)return; var idx=eqIdx(eqPop[f])+d; idx=Math.max(0,Math.min(EQ_MONTHS.length-1,idx)); eqPop[f]=EQ_MONTHS[idx]; eqPopClamp(f); eqPopRender(); }
  function eqPopSel(f){ if(!eqPop)return; var v=(gel(f==='from'?'eqpFrom':'eqpTo')||{}).value; if(v)eqPop[f]=v; eqPopClamp(f); eqPopRender(); }
  function eqPopSave(){
    if(!eqPop)return; var l=eqGetLine(eqPop.id); if(!l){eqPopClose();return;}
    var wasSub=(eqLineState(l)==='submitted');
    var old={qty:l.qty,from:l.from,to:l.to}, parts=[];
    l.qty=eqPop.qty; l.from=eqPop.from; l.to=eqPop.to;
    if(old.qty!==l.qty)parts.push('qty '+old.qty+'\u2192'+l.qty);
    if(old.from!==l.from)parts.push('start '+eqMonthLabel(old.from)+'\u2192'+eqMonthLabel(l.from));
    if(old.to!==l.to)parts.push('off-rent '+eqMonthLabel(old.to)+'\u2192'+eqMonthLabel(l.to));
    if(!parts.length){ eqPopClose(); return; }
    eqLog((wasSub?'Change request \u2014 ':'Edited ')+l.desc+' ('+parts.join(', ')+')');
    toast(wasSub?'Change request sent to 02S':'Demand line updated');
    eqPopClose(); eqRefresh();
  }
  function eqPopMore(){ var id=eqPop?eqPop.id:null; eqPopClose(); if(id)openEqEdit(id); }
  function eqPopClose(){ eqPop=null; var pop=gel('eqPop'); if(pop){pop.classList.add('hide'); pop.innerHTML='';} }
  function eqPopDocClick(e){ if(!eqPop||!e||!e.target||!e.target.closest)return; if(e.target.closest('#eqPop')||e.target.closest('.g-bar'))return; eqPopClose(); }
  function setEqView(v){
    eqPopClose();
    eqState.view=v;
    var pb=gel('eqSegPlan'),gb=gel('eqSegGantt');
    if(pb)pb.classList.toggle('on',v==='plan'); if(gb)gb.classList.toggle('on',v==='gantt');
    var pw=gel('eqPlanWrap'),gw=gel('eqGanttWrap');
    if(pw)pw.classList.toggle('hide',v!=='plan'); if(gw)gw.classList.toggle('hide',v!=='gantt');
    if(v==='gantt')renderEqGantt(); else renderEqPlan();
  }

  function eqCallout(kind,title,body){
    var icon=(kind==='opp')?svg('<path d="M20 6L9 17l-5-5"/>',2):svg('<path d="M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L14.7 3.9a2 2 0 00-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',2);
    return '<div class="track-insight '+kind+'">'+icon+'<span><b>'+title+'</b> \u2014 '+body+'</span></div>';
  }
  function renderEqInsights(){
    var box=gel('eqInsights'); if(!box) return;
    if(CURRENT!=='ns'){ box.innerHTML=''; return; }
    var overs=[];
    for(var i=0;i<EQ_CODES.length;i++){var c=EQ_CODES[i];var p=eqCodeProjected(c.code);if(p>c.budget)overs.push({c:c,d:p-c.budget});}
    var overTxt='';
    for(var k=0;k<overs.length;k++){overTxt+=(k>0?(k===overs.length-1?' and ':', '):'')+overs[k].c.code+' '+overs[k].c.name+' (<b>'+fmtBig(overs[k].d)+' over</b>)';}
    var p3=0; for(var j=0;j<EQ_LINES.length;j++){if(EQ_LINES[j].code==='26-540')p3+=EQ_LINES[j].qty;}
    var craneCost=0; for(var m=0;m<EQ_LINES.length;m++){if(EQ_LINES[m].desc.indexOf('crane')>-1)craneCost+=eqLineTotal(EQ_LINES[m]);}
    var h='<div class="ins-strip"><span class="isi"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6 4.5 2.3 7.1-6.3-4.6L5.7 21l2.3-7.1-6-4.5h7.6z"/></svg></span>'
      +'<div><div class="ist">02S is actively managing this plan</div><div class="isd">Projection rebuilt from the current CPM schedule \u00b7 '+(overs.length+3)+' things to weigh before Phase 3 mobilizes.</div></div></div>';
    h+='<div class="eq-callouts">';
    if(overs.length){ h+=eqCallout('risk','Cost codes trending over',overTxt+' at the current spread. Both are still mostly in-flight \u2014 rebalance now, not at closeout.'); }
    h+=eqCallout('risk','Schedule slip cascades into the plan','The CPM update moved <b>Phase 3 racking +3 weeks</b>. 02S re-dated '+p3+' access assets (scissor + boom + telehandler) and flagged the knock-on to the Phase 4 crane mobilization.');
    h+=eqCallout('opp','Telehandler overlap \u2014 pool instead of double-rent','You\u2019ll run 16 telehandlers on Phase 2 and 12 on Phase 3 at the same time through the fall. Hold 12 on transfer instead of off-rent + re-rent \u2192 <b>save ~$106K</b>.');
    h+=eqCallout('opp','Own-vs-rent candidate','3\u00d7 90-ton cranes for 6 months (Phase 4 BESS) is <b>'+fmtBig(craneCost)+'</b> in rental. McCarthy owns 2 comparable units freeing up in the region in March \u2014 02S flags this for an own-vs-rent call.');
    h+='</div>';
    box.innerHTML=h;
  }
  function eqLineState(l){ if(l.status==='on-rent')return 'onrent'; if(l.status==='off-rent')return 'offrent'; if(l.submitted)return 'submitted'; if(!l.rate)return 'pending'; return 'draft'; }
  function eqGetLine(id){ for(var i=0;i<EQ_LINES.length;i++){if(EQ_LINES[i].id===id)return EQ_LINES[i];} return null; }
  function eqMonthOptions(sel){ var o=''; for(var i=0;i<EQ_MONTHS.length;i++){var m=EQ_MONTHS[i]; o+='<option value="'+m+'"'+(m===sel?' selected':'')+'>'+eqMonthLabel(m)+' \u2019'+m.slice(2,4)+'</option>';} return o; }
  function eqCodeOptions(sel){ var o=''; for(var i=0;i<EQ_CODES.length;i++){var c=EQ_CODES[i]; o+='<option value="'+c.code+'"'+(c.code===sel?' selected':'')+'>'+c.code+' \u00b7 '+c.name+'</option>';} return o; }
  function eqLog(desc){ EQ_HISTORY.unshift({date:'Aug 2, 2026',who:'Dana Reyes',desc:desc}); renderEqHistory(); }

  function eqCatalogItems(){ return CATALOG.filter(function(p){return p.pillar==='equipment' && p.mrate;}); }
  function eqForm(l){
    var code=l?l.code:(eqAddCode||EQ_CODES[0].code);
    var items=eqCatalogItems();
    var pick=l?(l.catId?l.catId:'__custom__'):'';
    var opts='<option value="">\u2014 Select equipment \u2014</option>';
    for(var i=0;i<items.length;i++){ opts+='<option value="'+items[i].id+'"'+(pick===items[i].id?' selected':'')+'>'+items[i].name+' \u2014 '+fmt(items[i].mrate)+'/mo</option>'; }
    opts+='<option value="__custom__"'+(pick==='__custom__'?' selected':'')+'>Other / not in the catalog\u2026</option>';
    var f='<div class="mform">';
    f+='<div class="mf"><label>Equipment <span class="opt">rate is set by the 02S catalog</span></label><select id="eqfPick" class="acc-sel wfull" onchange="eqPickChange()">'+opts+'</select></div>';
    f+='<div id="eqfDetail"></div>';
    f+='<div class="mf"><label>Cost code <span class="opt">your project budget line</span></label><select id="eqfCode" class="acc-sel wfull">'+eqCodeOptions(code)+'</select></div>';
    f+='<div class="mf3"><div class="mf"><label>Quantity</label><input id="eqfQty" class="rin" type="number" min="1" value="'+(l?l.qty:1)+'"></div><div class="mf"><label>Date needed</label><select id="eqfFrom" class="acc-sel wfull">'+eqMonthOptions(l?l.from:EQ_MONTHS[6])+'</select></div><div class="mf"><label>Projected off-rent</label><select id="eqfTo" class="acc-sel wfull">'+eqMonthOptions(l?l.to:EQ_MONTHS[9])+'</select></div></div>';
    f+='<div class="mf"><label>Scope <span class="opt">schedule activity</span></label><input id="eqfScope" class="rin" placeholder="Phase 3 \u00b7 Module install" value="'+(l?esc(l.scope):'')+'"></div>';
    f+='<div class="eqf-total" id="eqfHint">\u2014</div>';
    f+='</div>';
    return f;
  }
  function eqPickChange(){
    var det=gel('eqfDetail'); if(!det)return;
    var v=(gel('eqfPick')||{}).value, isEdit=!!eqEditId, sb=gel('eqSaveBtn');
    if(!v){
      det.innerHTML='<div class="eqf-pick-hint">'+svg('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>')+'<span>Pick equipment from the 02S catalog to pull its monthly rate \u2014 or choose <b>Other</b> to request a non-catalog item, which 02S admin will price.</span></div>';
      if(sb&&!isEdit)sb.textContent='Add line';
    } else if(v==='__custom__'){
      var l=isEdit?eqGetLine(eqEditId):null;
      var dn=(l&&!l.catId)?esc(l.desc):'', dc=(l&&!l.catId)?esc(l.cat):'', rate;
      if(l&&!l.catId&&l.rate){ rate='<div class="eqf-rate set">'+svg('<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>')+'<span>Rate <b>'+fmt(l.rate)+'/mo</b> \u00b7 set by 02S \u00b7 locked</span></div>'; }
      else { rate='<div class="eqf-rate pending">'+svg('<circle cx="12" cy="12" r="10"/><path d="M12 7v5l3 2"/>')+'<span><b>Pending 02S pricing</b> \u2014 02S admin sets the rate after you submit. This line stays out of the projected total until it\u2019s priced.</span></div>'; }
      det.innerHTML='<div class="mf2"><div class="mf"><label>Equipment name</label><input id="eqfDesc" class="rin" placeholder="e.g. Crawler crane \u2014 230T" value="'+dn+'"></div><div class="mf"><label>Category</label><input id="eqfCat" class="rin" placeholder="Cranes \u203a Crawler" value="'+dc+'"></div></div>'+rate;
      if(sb&&!isEdit)sb.textContent='Request 02S pricing';
    } else {
      var it=byId(v);
      if(it){ det.innerHTML='<div class="eqf-cat-card">'+svg((ICON[it.icon]||ICON.box),2)+'<div class="ecc-b"><div class="ecc-n">'+it.name+'</div><div class="ecc-s">'+it.pcat+'</div></div><span class="eqf-rate set inl"><b>'+fmt(it.mrate)+'/mo</b> \u00b7 from catalog</span></div>'; }
      if(sb&&!isEdit)sb.textContent='Add line';
    }
    eqBindHint();
  }
  function eqCurrentRate(){
    var v=(gel('eqfPick')||{}).value;
    if(v&&v!=='__custom__'){ var it=byId(v); return it?it.mrate:0; }
    if(v==='__custom__'&&eqEditId){ var l=eqGetLine(eqEditId); if(l&&!l.catId&&l.rate)return l.rate; }
    return 0;
  }
  function eqFormFoot(isEdit,canDelete){
    var del=canDelete?'<button class="btn btn-ghost" style="margin-right:auto;color:var(--red)" onclick="delEqLine(eqEditId)">Remove line</button>':'';
    return '<div class="modal-foot">'+del+'<div class="mfoot-btns" style="margin-left:auto"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-red" id="eqSaveBtn" onclick="saveEqLine()">'+(isEdit?'Save changes':'Add line')+'</button></div></div>';
  }
  function _eqMenuBtn(icon,title,sub,fn){
    return '<button class="btn btn-ghost" style="height:auto;padding:12px 14px;text-align:left;display:flex;align-items:center;gap:12px;border-radius:var(--radius);width:100%" onclick="closeModal();'+fn+'">'
      +'<span style="width:34px;height:34px;border-radius:8px;background:var(--g100);color:var(--charcoal);display:grid;place-items:center;flex-shrink:0">'+icon+'</span>'
      +'<span style="flex:1;min-width:0"><span style="font-size:13px;font-weight:650;color:var(--g900);display:block">'+title+'</span><span style="font-size:11.5px;color:var(--g500)">'+sub+'</span></span>'
      +'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14" style="color:var(--g400);flex-shrink:0"><path d="M9 18l6-6-6-6"/></svg>'
      +'</button>';
  }
  function openEqAdd(code){
    eqEditId=null; eqAddCode=code||null;
    var ic=function(d){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="17" height="17">'+d+'</svg>';};
    var h='<div style="display:flex;flex-direction:column;gap:8px;margin-top:2px">'
      +_eqMenuBtn(ic('<path d="M12 5v14M5 12h14"/>'),   'Single line',            'Add one item manually — description, qty, dates',        '_openEqSingle()')
      +_eqMenuBtn(ic('<path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/>'), 'From 02S catalog', 'Pick priced equipment — rate auto-filled', '_openEqAddForm()')
      +_eqMenuBtn(ic('<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>'), 'Bulk grid entry', 'Enter multiple lines at once, spreadsheet-style', '_openEqBulk()')
      +_eqMenuBtn(ic('<path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>'), 'Import from estimate', 'HeavyBid extract or Excel estimate', '_openEqImport()')
      +'</div>';
    openModal('Add demand line', h);
  }
  function _openEqSingle(){
    var h='<div class="mform">'
      +'<div class="mf"><label>Description</label><input id="eqsDesc" class="rin" placeholder="e.g. Excavator 20T" style="width:100%"></div>'
      +'<div class="mf2"><div class="mf"><label>Quantity</label><input id="eqsQty" class="rin" type="number" min="1" value="1"></div><div class="mf"><label>Task code</label><input id="eqsTask" class="rin" placeholder="e.g. 02-320.14" value="01-000.00"></div></div>'
      +'<div class="mf2"><div class="mf"><label>Date needed</label><select id="eqsFrom" class="acc-sel wfull">'+eqMonthOptions(EQ_MONTHS[6])+'</select></div><div class="mf"><label>Projected off-rent</label><select id="eqsTo" class="acc-sel wfull">'+eqMonthOptions(EQ_MONTHS[9])+'</select></div></div>'
      +'<div class="mf"><label>Scope <span class="opt">schedule activity</span></label><input id="eqsScope" class="rin" placeholder="Phase 3 · Module install"></div>'
      +'</div>'
      +'<div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-red" onclick="_saveEqSingle()">Add line</button></div>';
    openModal('Add single line', h);
  }
  function _saveEqSingle(){
    var desc=(gel('eqsDesc').value||'').trim();
    if(!desc){toast('Enter a description');return;}
    var qty=parseInt(gel('eqsQty').value,10)||1;
    var task=(gel('eqsTask').value||'01-000.00').trim();
    var from=gel('eqsFrom').value||EQ_MONTHS[0];
    var to=gel('eqsTo').value||EQ_MONTHS[4];
    var scope=(gel('eqsScope').value||'').trim();
    eqSeq++;
    EQ_LINES.push({id:'e'+eqSeq,task:task,code:task.split('.')[0]||'01-000',desc:desc,cat:'Material handling',qty:qty,rate:null,from:from,to:to,status:'projected',submitted:false,scope:scope,catId:null});
    eqLog('Added '+qty+'\xd7 '+desc+' ('+task+')');
    closeModal(); toast('Line added as draft'); eqRefresh();
  }
  function _openEqAddForm(){ openModal('Add demand line', eqForm(null)+eqFormFoot(false,false)); eqPickChange(); }
  function _openEqBulk(){
    var bulkRows=function(){
      var cols=['Equipment description','Qty','Date needed','Off-rent','Task code'];
      var thead='<tr>'+cols.map(function(c){return '<th style="font-size:10.5px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:var(--g500);padding:7px 8px;border-bottom:1px solid var(--g200);text-align:left;white-space:nowrap">'+c+'</th>';}).join('')+'<th></th></tr>';
      var rows='';
      for(var i=0;i<5;i++){
        rows+='<tr>'
          +'<td style="padding:5px 4px"><input class="rin" placeholder="e.g. Excavator 20T" style="width:200px"></td>'
          +'<td style="padding:5px 4px"><input class="rin" type="number" min="1" placeholder="1" style="width:60px;text-align:center"></td>'
          +'<td style="padding:5px 4px"><select class="acc-sel">'+EQ_MONTHS.map(function(m){return '<option value="'+m+'">'+eqMonthLabel(m)+'</option>';}).join('')+'</select></td>'
          +'<td style="padding:5px 4px"><select class="acc-sel">'+EQ_MONTHS.map(function(m){return '<option value="'+m+'">'+eqMonthLabel(m)+'</option>';}).join('')+'</select></td>'
          +'<td style="padding:5px 4px"><input class="rin" placeholder="e.g. 02-320.14" style="width:110px"></td>'
          +'<td style="padding:5px 4px"><button class="eq-ib danger" onclick="this.closest(\'tr\').remove()" title="Remove row"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" width=\"14\" height=\"14\"><path d=\"M18 6L6 18M6 6l12 12\"/></svg></button></td>'
          +'</tr>';
      }
      return thead+rows;
    };
    var h='<div style="overflow-x:auto;margin-bottom:12px"><table style="border-collapse:collapse;font-size:12.5px" id="bulkTbl">'+bulkRows()+'</table></div>'
      +'<button class="btn btn-ghost btn-sm" onclick="_addBulkRow()"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" width=\"13\" height=\"13\"><path d=\"M12 5v14M5 12h14\"/></svg> Add row</button>'
      +'<div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-red" onclick="_saveBulkLines()">Add all lines</button></div>';
    openModal('Bulk grid entry', h);
  }
  function _addBulkRow(){
    var t=document.getElementById('bulkTbl'); if(!t)return;
    var r=t.insertRow(-1);
    r.innerHTML='<td style="padding:5px 4px"><input class="rin" placeholder="e.g. Excavator 20T" style="width:200px"></td>'
      +'<td style="padding:5px 4px"><input class="rin" type="number" min="1" placeholder="1" style="width:60px;text-align:center"></td>'
      +'<td style="padding:5px 4px"><input class="rin" placeholder="YYYY-MM" style="width:90px"></td>'
      +'<td style="padding:5px 4px"><input class="rin" placeholder="YYYY-MM" style="width:90px"></td>'
      +'<td style="padding:5px 4px"><input class="rin" placeholder="e.g. 02-320.14" style="width:110px"></td>'
      +'<td style="padding:5px 4px"><button class="eq-ib danger" onclick="this.closest(\'tr\').remove()" title="Remove row"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M18 6L6 18M6 6l12 12"/></svg></button></td>';
  }
  function _saveBulkLines(){
    var tbl=document.getElementById('bulkTbl'); if(!tbl)return;
    var rows=tbl.querySelectorAll('tr'); var added=0;
    for(var i=1;i<rows.length;i++){
      var inputs=rows[i].querySelectorAll('input,select');
      var desc=(inputs[0].value||'').trim();
      if(!desc)continue;
      var qty=parseInt(inputs[1].value,10)||1;
      var from=inputs[2].value||EQ_MONTHS[0], to=inputs[3].value||EQ_MONTHS[4];
      var task=(inputs[4].value||'').trim()||'01-000.00';
      eqSeq++;
      EQ_LINES.push({id:'e'+eqSeq,task:task,code:task.split('.')[0]||'01-000',desc:desc,cat:'Material handling',qty:qty,rate:null,from:from,to:to,status:'projected',submitted:false,scope:'',catId:null});
      eqLog('Bulk added '+qty+'× '+desc+' ('+task+')'); added++;
    }
    closeModal();
    if(added){ toast(added+' line'+(added===1?'':'s')+' added as draft'); eqRefresh(); }
    else toast('No lines added — fill in at least one description');
  }
  function _openEqImport(){
    var h='<div style="border:2px dashed var(--g300);border-radius:var(--radius);padding:28px;text-align:center;background:var(--g50);margin-bottom:14px;cursor:pointer" onclick="toast(\'File picker — select HeavyBid CSV or Excel export\')">'
      +'<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" width=\"28\" height=\"28\" style=\"color:var(--g400);margin:0 auto 10px;display:block\"><path d=\"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4\"/><polyline points=\"17 8 12 3 7 8\"/><line x1=\"12\" y1=\"3\" x2=\"12\" y2=\"15\"/></svg>'
      +'<div style=\"font-size:13px;font-weight:600;color:var(--g700)\">Drop file here or click to upload</div>'
      +'<div style=\"font-size:11.5px;color:var(--g500);margin-top:4px\">HeavyBid CSV, Excel estimate export, or 02S template</div>'
      +'</div>'
      +'<div class="mf" style="margin-bottom:12px"><label>Map task codes to</label><select class="acc-sel wfull" style="margin-top:5px"><option>Task code hierarchy</option><option>P6 Schedule activities</option><option>Manual</option></select></div>'
      +'<div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-red" onclick="closeModal();toast(\'Import processing — 02S will map lines and return for review\')">Import &amp; map</button></div>';
    openModal('Import from HeavyBid / estimate', h);
  }
  function openEqEdit(id){ var l=eqGetLine(id); if(!l)return; eqEditId=id; var stt=eqLineState(l);
    var note='';
    if(stt==='submitted') note='<div class="eqf-note">'+svg('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',2)+'This line is already submitted to 02S \u2014 saving raises a <b>change request</b> rather than editing silently.</div>';
    else if(stt==='pending') note='<div class="eqf-note pend">'+svg('<circle cx="12" cy="12" r="10"/><path d="M12 7v5l3 2"/>',2)+'This line is <b>awaiting 02S pricing</b>. You can adjust quantity, dates, and scope \u2014 02S admin sets the rate.</div>';
    var title=stt==='submitted'?'Request change to demand line':(stt==='pending'?'Edit pricing request':'Edit demand line');
    openModal(title, note+eqForm(l)+eqFormFoot(true, stt==='draft'||stt==='pending')); eqPickChange(); }
  function eqBindHint(){ var ids=['eqfQty','eqfFrom','eqfTo']; for(var i=0;i<ids.length;i++){var e=gel(ids[i]); if(e){e.oninput=eqHint; e.onchange=eqHint;}} eqHint(); }
  function eqHint(){ var h=gel('eqfHint'); if(!h)return; var v=(gel('eqfPick')||{}).value, q=parseInt((gel('eqfQty')||{}).value,10)||0, r=eqCurrentRate(), fr=(gel('eqfFrom')||{}).value, to=(gel('eqfTo')||{}).value;
    if(v==='__custom__'&&!r){ h.innerHTML='<span class="eqf-tbd">Line total \u2014 <b>TBD</b> until 02S sets the rate</span>'; return; }
    if(!v){ h.textContent='\u2014'; return; }
    if(q&&r&&fr&&to&&eqIdx(fr)<=eqIdx(to)){ var mo=eqMonths(fr,to); h.innerHTML='Line total <b>'+fmtBig(mo*r*q)+'</b> \u00b7 '+q+' \u00d7 '+fmt(r)+'/mo \u00d7 '+mo+' mo'; } else h.textContent='\u2014'; }
  function saveEqLine(){
    var pick=(gel('eqfPick')||{}).value;
    if(!pick){ toast('Select equipment first'); return; }
    var code=(gel('eqfCode')||{}).value, qty=parseInt((gel('eqfQty')||{}).value,10)||0;
    var from=(gel('eqfFrom')||{}).value, to=(gel('eqfTo')||{}).value, scope=((gel('eqfScope')||{}).value||'').trim();
    var desc,cat,rate,catId;
    if(pick==='__custom__'){
      desc=((gel('eqfDesc')||{}).value||'').trim(); cat=((gel('eqfCat')||{}).value||'').trim(); catId=null;
      if(eqEditId){ var le=eqGetLine(eqEditId); rate=(le&&!le.catId)?le.rate:null; } else { rate=null; }
      if(!desc){ toast('Enter the equipment name'); return; }
      if(!cat) cat='Non-catalog \u203a Specialized';
    } else {
      var it=byId(pick); if(!it){ toast('Select equipment first'); return; }
      desc=it.name; cat=it.pcat; rate=it.mrate; catId=it.id;
    }
    if(qty<1){ toast('Quantity must be at least 1'); return; }
    if(eqIdx(from)>eqIdx(to)){ toast('Off-rent must be on or after the date needed'); return; }
    if(!scope){ for(var s=0;s<EQ_CODES.length;s++){if(EQ_CODES[s].code===code)scope=EQ_CODES[s].phase;} }
    if(eqEditId){
      var l=eqGetLine(eqEditId); if(!l)return;
      var old={qty:l.qty,rate:l.rate,from:l.from,to:l.to,code:l.code,desc:l.desc};
      var wasSub=(eqLineState(l)==='submitted');
      l.code=code; l.desc=desc; l.cat=cat; l.qty=qty; l.rate=rate; l.from=from; l.to=to; l.scope=scope; l.catId=catId;
      var parts=[];
      if(old.qty!==qty)parts.push('qty '+old.qty+'\u2192'+qty);
      if(old.from!==from)parts.push('start '+eqMonthLabel(old.from)+'\u2192'+eqMonthLabel(from));
      if(old.to!==to)parts.push('off-rent '+eqMonthLabel(old.to)+'\u2192'+eqMonthLabel(to));
      if(old.code!==code)parts.push('code '+old.code+'\u2192'+code);
      if(old.desc!==desc)parts.push('changed to '+desc);
      eqLog((wasSub?'Change request \u2014 ':'Edited ')+desc+(parts.length?' ('+parts.join(', ')+')':''));
      toast(wasSub?'Change request sent to 02S':'Demand line updated');
    } else {
      eqSeq++;
      var pending=(rate==null);
      EQ_LINES.push({id:'e'+eqSeq,code:code,desc:desc,cat:cat,qty:qty,rate:rate,from:from,to:to,status:'projected',submitted:false,scope:scope,catId:catId});
      if(pending) eqLog('Requested pricing from 02S \u2014 '+qty+'\u00d7 '+desc+' (non-catalog, '+code+')');
      else eqLog('Added '+qty+'\u00d7 '+desc+' to '+code+' (draft, from catalog)');
      toast(pending?'Pricing request sent to 02S admin':'Draft demand line added');
    }
    closeModal(); eqRefresh();
  }
  function delEqLine(id){ var l=eqGetLine(id); if(!l)return; var st=eqLineState(l); if(st!=='draft'&&st!=='pending'){ toast('Only draft or pending lines can be removed'); return; } var idx=EQ_LINES.indexOf(l); if(idx>-1)EQ_LINES.splice(idx,1); eqLog('Removed '+l.qty+'\u00d7 '+l.desc+' from '+l.code); toast(st==='pending'?'Pricing request withdrawn':'Draft line removed'); closeModal(); eqRefresh(); }
  function eqRangeLabel(from,to){ return eqMonthLabel(from)+' '+eqMonthYear(from)+' \u2013 '+eqMonthLabel(to)+' '+eqMonthYear(to); }
  function submitEqDrafts(){
    var d=EQ_LINES.filter(function(l){return eqLineState(l)==='draft';});
    if(!d.length){ var pn=EQ_LINES.filter(function(l){return eqLineState(l)==='pending';}).length; toast(pn?(pn+' line'+(pn===1?'':'s')+' still awaiting 02S pricing \u2014 can\u2019t submit until priced'):'No draft lines to submit'); return; }
    var q=0, made=[];
    for(var i=0;i<d.length;i++){
      var l=d[i]; l.submitted=true;
      if(!l.ref){ eqRefSeq++; l.ref='EQ-'+eqRefSeq; }
      q+=l.qty;
      var cname=''; for(var s=0;s<EQ_CODES.length;s++){if(EQ_CODES[s].code===l.code)cname=EQ_CODES[s].name;}
      ordSeq++;
      ORDERS.unshift({id:'ORD-'+ordSeq,od:'2026-08-02',item:l.desc,sub:l.qty+' units \u00b7 '+l.scope,pillar:'equipment',dates:eqRangeLabel(l.from,l.to),cost:l.code+' \u00b7 '+cname,stage:0,plan:l.ref,fresh:true,latest:'Submitted from the demand plan \u2014 awaiting 02S acknowledgement'});
      made.push('ORD-'+ordSeq);
    }
    eqLog('Submitted '+d.length+' line'+(d.length===1?'':'s')+' to 02S \u2014 '+q+' assets \u2192 '+made.length+' order'+(made.length===1?'':'s')+' created ('+made.join(', ')+')');
    toast(d.length+' line'+(d.length===1?'':'s')+' submitted \u2192 '+made.length+' order'+(made.length===1?'':'s')+' created in Orders (tagged New)');
    renderOrders(); eqRefresh();
  }
  function updateEqSubmitBtn(){ var b=gel('eqSubmitBtn'); if(!b)return; var d=0; for(var i=0;i<EQ_LINES.length;i++){if(eqLineState(EQ_LINES[i])==='draft')d++;} b.innerHTML=svg('<path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>',2)+'Submit '+d+' draft'+(d===1?'':'s')+' to 02S'; b.style.display=d?'inline-flex':'none'; }
  function renderEqHistory(){ var box=gel('eqHistory'); if(!box)return; var rows=''; for(var i=0;i<EQ_HISTORY.length;i++){var h=EQ_HISTORY[i]; rows+='<div class="eqh-row"><div class="eqh-date">'+h.date+'</div><div class="eqh-who">'+h.who+'</div><div class="eqh-desc">'+h.desc+'</div></div>';} box.innerHTML='<div class="eqh-head"><span>Date</span><span>Changed by</span><span>Change</span></div>'+rows; }

  function renderEqHeatmap(){
    var box=document.getElementById('eqHeatmap'); if(!box)return;
    var cats=['Earthmoving','Access','Power','Material handling','Foundations','Cranes'];
    var months=EQ_MONTHS;
    var N=months.length;
    // build month abbrev labels
    var abbrevs=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    function mLabel(m){ var parts=m.split('-'); var yr=parts[0]; var mo=parseInt(parts[1],10)-1; return abbrevs[mo]+(yr!=='2026'?' ’27':''); }
    // compute totals: cat x month
    var data={};
    for(var c=0;c<cats.length;c++) data[cats[c]]=new Array(N).fill(0);
    for(var i=0;i<EQ_LINES.length;i++){
      var l=EQ_LINES[i];
      var catKey=(l.cat||'').split(' › ')[0];
      if(!data[catKey]) continue;
      var a=EQ_MONTHS.indexOf(l.from), b=EQ_MONTHS.indexOf(l.to);
      if(a<0)a=0; if(b<0)b=N-1;
      for(var mi=a;mi<=b&&mi<N;mi++) data[catKey][mi]+=l.qty;
    }
    // compute per-month peak category index
    var colMax=new Array(N).fill(0);
    for(var ci2=0;ci2<cats.length;ci2++) for(var mj2=0;mj2<N;mj2++) if(data[cats[ci2]][mj2]>colMax[mj2]) colMax[mj2]=data[cats[ci2]][mj2];
    var colPeak={}; // mj -> cat index with peak
    for(var mj3=0;mj3<N;mj3++) if(colMax[mj3]>0) for(var ci3=0;ci3<cats.length;ci3++) if(data[cats[ci3]][mj3]===colMax[mj3]){colPeak[mj3]=ci3;break;}
    var html='<table style="border-collapse:collapse;font-size:11px;white-space:nowrap;width:100%">'
      +'<thead><tr><th style="width:120px;text-align:left;padding:6px 8px;font-size:10.5px;font-weight:600;text-transform:uppercase;letter-spacing:.04em;color:var(--g500);border-bottom:1px solid var(--g200)">Class</th>'
      +months.map(function(m){return '<th style="width:40px;text-align:center;padding:5px 2px;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.03em;color:var(--g500);border-bottom:1px solid var(--g200)">'+mLabel(m)+'</th>';}).join('')
      +'</tr></thead><tbody>';
    for(var ci=0;ci<cats.length;ci++){
      var cat=cats[ci], row=data[cat];
      html+='<tr><td style="padding:4px 8px;font-weight:600;color:var(--g700);font-size:11.5px;border-bottom:1px solid var(--g150)">'+cat+'</td>';
      for(var mj=0;mj<N;mj++){
        var v=row[mj];
        var isPeak=(v>0&&colPeak[mj]===ci);
        var bg=isPeak?'var(--red)':'var(--g100)';
        var clr=isPeak?'#fff':(v?'var(--g700)':'var(--g300)');
        var fw=isPeak?'700':(v?'500':'400');
        html+='<td style="text-align:center;height:28px;width:40px;background:'+bg+';color:'+clr+';font-weight:'+fw+';border-bottom:1px solid var(--g150);border-left:1px solid rgba(0,0,0,.04)" title="'+(v?cat+': '+v+' units'+(isPeak?' — peak this month':''):'')+'"><span style="font-size:11px">'+(v||'')+'</span></td>';
      }
      html+='</tr>';
    }
    html+='</tbody></table>';
    box.innerHTML=html;
  }
  function eqRefresh(){ renderEqBudget(); renderEqInsights(); setEqView(eqState.view); renderEqHistory(); updateEqSubmitBtn(); }

  /* ═══════════ WORKSPACE LANDING ═══════════ */
  var WS={
    command:{ name:'Command Center', who:'For 02S operations \u2014 equipment managers, dispatch &amp; fulfillment', desc:'The operations cockpit for the 02S team: receive and triage demand across every project, allocate the shared fleet, schedule logistics and hauls, and keep utilization high.', caps:['Demand intake','Fleet allocation','Dispatch &amp; logistics','Utilization &amp; idle'] },
    control:{ name:'Control Tower', who:'For leadership, finance, estimating &amp; pursuit', desc:'The portfolio view across all projects: forecast demand, track financial performance and margin, manage the rate catalog, and steer 02S with data.', caps:['Portfolio forecast','Financials &amp; margin','Rate management','Analytics &amp; reporting'] }
  };
  function enterWorkspace(w){
    var lp=document.getElementById('landing'), ap=document.querySelector('.app'), uc=document.getElementById('uc');
    if(w==='portal'){ if(lp)lp.style.display='none'; if(uc)uc.style.display='none'; if(ap)ap.style.display='flex'; go('dashboard'); window.scrollTo(0,0); return; }
    if(w==='command'){ enterCC(); return; }
    if(w==='control'){ enterCT(); return; }
    var d=WS[w]; if(!d)return;
    document.getElementById('ucName').textContent=d.name;
    document.getElementById('ucWho').innerHTML=d.who;
    document.getElementById('ucDesc').innerHTML=d.desc;
    document.getElementById('ucCaps').innerHTML=d.caps.map(function(c){ return '<span class="cap">'+c+'</span>'; }).join('');
    if(lp)lp.style.display='none'; if(ap)ap.style.display='none'; if(uc)uc.style.display='flex'; window.scrollTo(0,0);
  }
  function backToLanding(){
    var lp=document.getElementById('landing'), ap=document.querySelector('.app'), uc=document.getElementById('uc');
    if(ap)ap.style.display='none'; if(uc)uc.style.display='none'; if(lp)lp.style.display='flex'; window.scrollTo(0,0);
  }

  /* ═══════════ OTHER-PILLAR DEMAND PLANS (config-driven strawman) ═══════════ */
  var DP_TONE={'Active':'ok','Delivered':'ok','Complete':'ok','Installed':'ok','Approved':'ok','In transit':'info','In fabrication':'info','Submittal':'info','PO issued':'info','Scheduled':'info','Mobilized':'info','Projected':'info','Requested':'neu','Acknowledged':'neu','Draft':'neu','Demobilized':'neu','Pending pricing':'warn','At-risk':'bad'};
  var IC={dollar:'<path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>',check:'<path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/>',people:'<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/>',chart:'<path d="M3 3v18h18"/><path d="M7 13l3-3 4 4 5-5"/>',clock:'<circle cx="12" cy="12" r="10"/><path d="M12 7v5l3 2"/>',warn:'<path d="M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L14.7 3.9a2 2 0 00-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',cart:'<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 002 1.6h9.7a2 2 0 002-1.6L23 6H6"/>',box:'<path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><path d="M3.3 7L12 12l8.7-5"/>',layers:'<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>',truck:'<rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>',crane:'<path d="M10 3h4l7 7-4 4-7-7V3z"/><path d="M3 21h18M6 21v-6"/>'};
  var DP={
    profservices:{ title:'Professional services demand plan', chip:'Engineering, inspection &amp; commissioning', icon:IC.people, singular:'services',
      vitals:[{label:'Plan budget',value:'$3.2M',sub:'services \u00b7 15-mo horizon',tone:'ok',icon:IC.dollar},{label:'Committed to date',value:'$1.9M',sub:'59% \u00b7 6 roles active',tone:'ok',icon:IC.check},{label:'Active headcount',value:'14 FTE',sub:'across 6 firms',tone:'ok',icon:IC.people},{label:'Projected at complete',value:'$3.1M',sub:'+$0.1M under plan',tone:'ok',icon:IC.chart}],
      ns:'02S maps each role to the CPM schedule \u2014 the BESS commissioning agent mobilizes as the containers land, and the VDC role is flagged as unpriced before it\u2019s needed on site.',
      cap:'Roles are priced from the 02S rate card; specialty roles are quoted by 02S. The team sets headcount, mobilization window, and cost code.',
      cols:[{key:'role',label:'Role',sub:'firm',w:'1fr'},{key:'qty',label:'Headcount',cls:'c',w:'92px'},{key:'window',label:'Mobilize \u2192 demobilize',w:'176px'},{key:'code',label:'Cost code',w:'160px'},{key:'cost',label:'Monthly',cls:'r',w:'100px'},{key:'__state',label:'Status',w:'118px'}],
      add:{nameKey:'role',subKey:'firm',qtyKey:'qty',whenKey:'window',costKey:'cost'}, addName:{label:'Role',ph:'e.g. Commissioning agent'}, addQty:{label:'Headcount',ph:'e.g. 2 FTE'}, addWhen:{label:'Mobilize \u2192 demobilize',ph:'e.g. Nov 2026 \u2013 Mar 2027'},
      rows:[
        {role:'Owner\u2019s engineer / IE support',firm:'DNV',qty:'2 FTE',window:'Mar 2026 \u2013 Dec 2026',code:'01-100 \u00b7 General conditions',cost:'$28K/mo',state:'Active'},
        {role:'Geotechnical inspection',firm:'Terracon',qty:'3 FTE',window:'Mar 2026 \u2013 Aug 2026',code:'02-320 \u00b7 Site Earthwork',cost:'$18K/mo',state:'Active'},
        {role:'Structural special inspection',firm:'Terracon',qty:'2 FTE',window:'Jun 2026 \u2013 Feb 2027',code:'31-620 \u00b7 Solar Pile',cost:'$16K/mo',state:'Active'},
        {role:'BESS commissioning agent',firm:'3rd-party',qty:'2 FTE',window:'Nov 2026 \u2013 Mar 2027',code:'26-330 \u00b7 BESS &amp; Substation',cost:'$34K/mo',state:'Projected'},
        {role:'Environmental / SWPPP monitoring',firm:'SWCA',qty:'1 FTE',window:'Mar 2026 \u2013 May 2026',code:'01-100 \u00b7 General conditions',cost:'$9K/mo',state:'Draft'},
        {role:'VDC / BIM coordination',firm:'TBD \u2014 not in rate card',qty:'3 FTE',window:'Apr 2026 \u2013 Oct 2026',code:'01-100 \u00b7 General conditions',cost:'Pending',state:'Pending pricing'},
        {role:'Site survey crew',firm:'Bowman',qty:'2 FTE',window:'Apr 2026 \u2013 Jul 2026',code:'01-100 \u00b7 General conditions',cost:'$12K/mo',state:'Demobilized'}
      ]},
    procurement:{ title:'Procurement demand plan', chip:'Long-lead equipment &amp; materials', icon:IC.cart, singular:'procurement',
      vitals:[{label:'Committed',value:'$8.9M',sub:'materials &amp; equipment',tone:'ok',icon:IC.dollar},{label:'Long-lead items',value:'5',sub:'12\u201330 wk lead times',tone:'warn',icon:IC.clock},{label:'At-risk',value:'2',sub:'order-by date passed',tone:'bad',icon:IC.warn},{label:'On-time to need-by',value:'71%',sub:'5 of 7 tracking',tone:'warn',icon:IC.chart}],
      ns:'02S back-calculates every order-by date from lead time and the schedule need-by \u2014 two long-lead items are already past order-by and flagged red; releasing the switchgear PO this week recovers the substation date.',
      cap:'Order-by dates are computed from lead time and the schedule need-by. Prices come from the 02S catalog or vendor quote; specialty items are quoted by 02S.',
      cols:[{key:'item',label:'Item',sub:'itemSub',w:'1fr'},{key:'qty',label:'Qty',cls:'c',w:'86px'},{key:'needby',label:'Need-by',w:'96px'},{key:'orderby',label:'Order-by (lead)',w:'146px',flag:'risk'},{key:'code',label:'Cost code',w:'150px'},{key:'cost',label:'Ext.',cls:'r',w:'82px'},{key:'__state',label:'Status',w:'112px'}],
      add:{nameKey:'item',subKey:'itemSub',qtyKey:'qty',whenKey:'needby',costKey:'cost'}, addName:{label:'Item',ph:'e.g. Medium-voltage switchgear'}, addQty:{label:'Quantity',ph:'e.g. 2'}, addWhen:{label:'Need-by date',ph:'e.g. Oct 15'},
      rows:[
        {item:'Medium-voltage switchgear',itemSub:'15kV lineup',qty:'2',needby:'Oct 15',orderby:'May 1 \u00b7 24 wk',risk:true,code:'26-330 \u00b7 BESS',cost:'$1.4M',state:'At-risk'},
        {item:'Main power transformer',qty:'1',needby:'Nov 1',orderby:'Apr 15 \u00b7 28 wk',code:'26-330 \u00b7 BESS',cost:'$2.1M',state:'PO issued'},
        {item:'PV modules \u2014 tranche 1',qty:'40,000',needby:'Sep 1',orderby:'Jun 1 \u00b7 12 wk',code:'26-540 \u00b7 Module',cost:'$3.6M',state:'In transit'},
        {item:'String inverters',qty:'24',needby:'Sep 15',orderby:'Jun 15 \u00b7 14 wk',code:'26-540 \u00b7 Module',cost:'$980K',state:'PO issued'},
        {item:'BESS containers',itemSub:'2.5 MWh each',qty:'6',needby:'Dec 1',orderby:'May 15 \u00b7 30 wk',risk:true,code:'26-330 \u00b7 BESS',cost:'$2.4M',state:'At-risk'},
        {item:'Structural steel \u2014 racking',qty:'lot',needby:'Aug 1',orderby:'Jun 15 \u00b7 7 wk',code:'26-540 \u00b7 Module',cost:'$620K',state:'Delivered'},
        {item:'Cable &amp; conductors',qty:'lot',needby:'rolling',orderby:'rolling',code:'26-540 \u00b7 Module',cost:'$340K',state:'Draft'}
      ]},
    prefab:{ title:'Prefab demand plan', chip:'Shop-fabricated assemblies', icon:IC.layers, singular:'prefab',
      vitals:[{label:'Assemblies planned',value:'32',sub:'5 assembly types',tone:'ok',icon:IC.layers},{label:'In fabrication',value:'16',sub:'2 shops',tone:'info',icon:IC.box},{label:'Committed',value:'$0.9M',sub:'made-to-order',tone:'ok',icon:IC.dollar},{label:'On-track to need date',value:'4 of 5',sub:'1 awaiting submittal',tone:'warn',icon:IC.chart}],
      ns:'02S ties each assembly\u2019s submittal \u2192 fabrication \u2192 delivery back to its install date \u2014 the BESS e-houses need submittal approval this week to protect November energization.',
      cap:'Assemblies are made-to-order, so pricing is quoted by 02S after submittal. The team sets quantity, need-on-site date, and cost code.',
      cols:[{key:'asm',label:'Assembly',w:'1fr'},{key:'qty',label:'Qty',cls:'c',w:'80px'},{key:'need',label:'Need on-site',w:'114px'},{key:'stage',label:'Submittal \u2192 fab \u2192 deliver',w:'190px'},{key:'code',label:'Cost code',w:'150px'},{key:'cost',label:'Quote',cls:'r',w:'96px'},{key:'__state',label:'Status',w:'124px'}],
      add:{nameKey:'asm',qtyKey:'qty',whenKey:'need',costKey:'cost'}, addName:{label:'Assembly',ph:'e.g. Modular e-house'}, addQty:{label:'Quantity',ph:'e.g. 2'}, addWhen:{label:'Need on-site',ph:'e.g. Nov 1'},
      rows:[
        {asm:'Prefab pipe rack modules',qty:'12',need:'Aug 15',stage:'Submittal approved \u00b7 in fab',code:'26-540 \u00b7 Module',cost:'$146K',state:'In fabrication'},
        {asm:'L2 headwall assemblies',qty:'8',need:'Jul 20',stage:'Delivered \u00b7 order PF-021',code:'26-540 \u00b7 Module',cost:'$147K',state:'Delivered'},
        {asm:'Modular e-houses (BESS)',qty:'2',need:'Nov 1',stage:'Submittal in review',code:'26-330 \u00b7 BESS',cost:'Pending',state:'Submittal'},
        {asm:'Skid-mounted pump assemblies',qty:'4',need:'Sep 1',stage:'In fabrication',code:'02-320 \u00b7 Site Earthwork',cost:'$88K',state:'In fabrication'},
        {asm:'Prefab cable tray runs',qty:'lot',need:'Aug 1',stage:'Not started',code:'26-540 \u00b7 Module',cost:'Pending',state:'Draft'}
      ]},
    logistics:{ title:'Logistics demand plan', chip:'Deliveries, hauls &amp; site moves', icon:IC.truck, singular:'logistics',
      vitals:[{label:'Moves this week',value:'6',sub:'2 heavy hauls',tone:'info',icon:IC.truck},{label:'Heavy hauls (oversize)',value:'3',sub:'permit required',tone:'warn',icon:IC.warn},{label:'Crane picks',value:'2',sub:'scheduled this month',tone:'ok',icon:IC.crane},{label:'Laydown utilization',value:'78%',sub:'Yards A\u2013C',tone:'warn',icon:IC.chart}],
      ns:'02S auto-generates most logistics events from delivery dates across the equipment, procurement, and prefab plans \u2014 and flagged a north-gate conflict where the switchgear haul overlaps tower-crane mobilization.',
      cap:'Most moves are auto-created from delivery dates in the other plans. Add ad-hoc moves here; 02S schedules windows, gates, and permits.',
      cols:[{key:'move',label:'Move / event',sub:'moveSub',w:'1fr'},{key:'type',label:'Type',w:'126px'},{key:'when',label:'Date &amp; window',w:'150px'},{key:'gate',label:'Route / gate',w:'124px'},{key:'src',label:'Source',w:'118px'},{key:'__state',label:'Status',w:'114px'}],
      add:{nameKey:'move',subKey:'moveSub',qtyKey:'type',whenKey:'when'}, addName:{label:'Move / event',ph:'e.g. Crane pick \u2014 module racking'}, addQty:{label:'Type',ph:'Delivery / Heavy haul / Crane pick'}, addWhen:{label:'Date &amp; window',ph:'e.g. Aug 15 \u00b7 6 AM'},
      rows:[
        {move:'Excavator delivery',type:'Heavy haul',when:'May 20 \u00b7 6\u201310 AM',gate:'North gate',src:'ORD-3042',state:'Scheduled'},
        {move:'MV switchgear delivery',moveSub:'oversize load',type:'Heavy haul',when:'Oct 15 \u00b7 TBD',gate:'North gate',src:'Procurement',state:'Requested'},
        {move:'Tower crane mobilization',type:'Crane pick',when:'Aug 3 \u00b7 5 AM',gate:'Laydown A',src:'ORD-3054',state:'Scheduled'},
        {move:'PV module deliveries',moveSub:'recurring',type:'Delivery',when:'Sep \u00b7 daily',gate:'East gate',src:'Procurement',state:'Requested'},
        {move:'BESS container placement',type:'Haul + crane',when:'Dec 1',gate:'Pad 3',src:'Procurement',state:'Requested'},
        {move:'Prefab pipe rack delivery',type:'Delivery',when:'Aug 15',gate:'Laydown B',src:'Prefab',state:'Requested'},
        {move:'Site laydown reservation',type:'Laydown',when:'Ongoing',gate:'Yard C',src:'\u2014',state:'Active'}
      ]}
  };
  var dpActive=null, dpAddPk=null;
  function dpGv(id){ var e=document.getElementById(id); return e?(''+e.value):''; }
  function dpCodeOpts(){ var c=['01-100 \u00b7 General conditions','02-320 \u00b7 Site Earthwork','31-620 \u00b7 Solar Pile','26-540 \u00b7 Module Racking','26-330 \u00b7 BESS &amp; Substation','01-540 \u00b7 Temporary Power']; return c.map(function(x){return '<option>'+x+'</option>';}).join(''); }
  function renderDP(pk){
    var cfg=DP[pk], mount=document.getElementById('dp-'+pk); if(!cfg||!mount)return;
    var ns=CURRENT==='ns';
    var h='<div class="phead"><div><h1>'+cfg.title+'</h1><div class="meta"><span class="chip">'+svg(cfg.icon)+cfg.chip+'</span><span class="chip ver">'+(ns?'North Star':'V1 \u2014 standard')+'</span></div></div></div>';
    h+='<div class="vitals">';
    cfg.vitals.forEach(function(v){ h+='<div class="vital '+(v.tone||'ok')+'"><div class="vk">'+svg(v.icon||IC.check)+v.label+'</div><div class="vv">'+v.value+'</div><div class="vsub">'+(v.sub||'')+'</div></div>'; });
    h+='</div>';
    if(ns&&cfg.ns){ h+='<div class="ins-strip"><span class="isi"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6 4.5 2.3 7.1L12 16.9 5.3 21l2.3-7.1-6-4.5h7.6z"/></svg></span><div><div class="ist">02S</div><div class="isd">'+cfg.ns+'</div></div></div>'; }
    h+='<div class="eq-toolbar"><span class="spacer"></span><button class="btn btn-dark btn-sm" onclick="openDPAdd(\''+pk+'\')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>Add demand line</button><button class="btn btn-red btn-sm" onclick="dpSubmit(\''+pk+'\')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>Submit to 02S</button></div>';
    h+='<div class="eq-cap">'+svg('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>')+'<span>'+cfg.cap+'</span></div>';
    var gt=cfg.cols.map(function(c){return c.w;}).join(' ');
    h+='<div class="dp-tbl"><div class="dp-head" style="grid-template-columns:'+gt+'">';
    cfg.cols.forEach(function(c){ h+='<span class="'+(c.cls||'')+'">'+c.label+'</span>'; });
    h+='</div>';
    cfg.rows.forEach(function(r){
      h+='<div class="dp-row" style="grid-template-columns:'+gt+'">';
      cfg.cols.forEach(function(c){
        if(c.key==='__state'){ var t=DP_TONE[r.state]||'neu'; h+='<div class="'+(c.cls||'')+'"><span class="tag '+t+'">'+r.state+'</span></div>'; }
        else { var main=(r[c.key]!=null&&r[c.key]!=='')?r[c.key]:'\u2014'; var sub=(c.sub&&r[c.sub])?'<div class="sub">'+r[c.sub]+'</div>':''; var cls=(c.cls||'')+((c.flag&&r[c.flag])?' dp-risk':''); h+='<div class="'+cls+'">'+main+sub+'</div>'; }
      });
      h+='</div>';
    });
    h+='</div>';
    mount.innerHTML=h;
  }
  function openDPAdd(pk){ dpAddPk=pk; var cfg=DP[pk];
    var f='<div class="mform">';
    f+='<div class="mf"><label>'+cfg.addName.label+'</label><input id="dpaName" class="rin" placeholder="'+cfg.addName.ph+'"></div>';
    f+='<div class="mf2"><div class="mf"><label>'+cfg.addQty.label+'</label><input id="dpaQty" class="rin" placeholder="'+cfg.addQty.ph+'"></div><div class="mf"><label>'+cfg.addWhen.label+'</label><input id="dpaWhen" class="rin" placeholder="'+cfg.addWhen.ph+'"></div></div>';
    f+='<div class="mf"><label>Cost code</label><select id="dpaCode" class="acc-sel wfull">'+dpCodeOpts()+'</select></div>';
    f+='<div class="mf"><label>Scope / notes <span class="opt">optional</span></label><input id="dpaScope" class="rin" placeholder="Schedule activity or note"></div>';
    f+='<div class="eqf-rate pending">'+svg('<circle cx="12" cy="12" r="10"/><path d="M12 7v5l3 2"/>',2)+'<span><b>Pricing set by 02S</b> \u2014 the rate or quote is sourced from the 02S catalog or priced by 02S admin after you submit.</span></div>';
    f+='</div>';
    openModal('Add '+cfg.singular+' demand line', f+'<div class="modal-foot"><div class="mfoot-btns" style="margin-left:auto"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-red" onclick="dpAddSave()">Request &amp; add</button></div></div>');
  }
  function dpAddSave(){
    var pk=dpAddPk, cfg=DP[pk], a=cfg.add;
    var name=dpGv('dpaName').trim(); if(!name){ toast('Enter a name first'); return; }
    var row={state:'Pending pricing'};
    row[a.nameKey]=name;
    if(a.subKey){ var sc=dpGv('dpaScope').trim(); if(sc)row[a.subKey]=sc; }
    row[a.qtyKey]=dpGv('dpaQty')||'\u2014';
    row[a.whenKey]=dpGv('dpaWhen')||'\u2014';
    row.code=dpGv('dpaCode');
    if(a.costKey)row[a.costKey]='Pending';
    cfg.rows.push(row); closeModal(); renderDP(pk);
    toast('Demand line added \u2014 pricing request routed to 02S admin');
  }
  function dpSubmit(pk){ var cfg=DP[pk],n=0; cfg.rows.forEach(function(r){ if(r.state==='Draft'){ r.state='Requested'; n++; } }); if(!n){ var p=0; cfg.rows.forEach(function(r){if(r.state==='Pending pricing')p++;}); toast(p?(p+' line'+(p===1?'':'s')+' still awaiting 02S pricing \u2014 can\u2019t submit until priced'):'No draft lines to submit'); return; } renderDP(pk); toast(n+' line'+(n===1?'':'s')+' submitted to 02S'); }
  function go(screen){
    document.querySelectorAll('.screen').forEach(function(s){s.classList.remove('active')});
    document.getElementById('screen-'+screen).classList.add('active');
    document.getElementById('nav-dashboard').classList.toggle('active',screen==='dashboard');
    document.getElementById('nav-order').classList.toggle('active',screen==='order');
    var neq=document.getElementById('nav-equip'); if(neq) neq.classList.toggle('active',screen==='equip');
    var no=document.getElementById('nav-orders'); if(no) no.classList.toggle('active',screen==='orders');
    var nb=document.getElementById('nav-billing'); if(nb) nb.classList.toggle('active',screen==='billing');
    var npf=document.getElementById('nav-profile'); if(npf) npf.classList.toggle('active',screen==='profile');
    var nct=document.getElementById('nav-contact'); if(nct) nct.classList.toggle('active',screen==='contact');
    ['profservices','procurement','prefab','logistics'].forEach(function(pk){ var n=document.getElementById('nav-dp-'+pk); if(n)n.classList.toggle('active',screen==='dp-'+pk); });
    if(screen.indexOf('dp-')===0){ dpActive=screen.slice(3); renderDP(dpActive); } else dpActive=null;
    if(screen==='order'){ backToCatalog(); renderPills(); renderCatalog(); renderCart(); }
    if(screen==='orders'){ renderOrders(); renderOrdInsights(); }
    if(screen==='billing'){ renderBills(); renderPending(); renderBillInsights(); }
    if(screen==='equip') eqRefresh();
    if(screen==='profile'){ renderTeam(); renderEscalation(); renderProfileInsights(); }
    window.scrollTo(0,0);
  }

  /* ═══════════ VERSION TOGGLE ═══════════ */
  function setVer(v){
    var ns=v==='ns'; CURRENT=v;
    document.getElementById('btnV1').classList.toggle('on',!ns);
    document.getElementById('btnNS').classList.toggle('on',ns);
    document.getElementById('vitalsV1').classList.toggle('hide',ns);
    document.getElementById('vitalsNS').classList.toggle('hide',!ns);
    document.getElementById('attnV1').classList.toggle('hide',ns);
    document.getElementById('attnNS').classList.toggle('hide',!ns);
    document.getElementById('sec4').classList.toggle('hide',!ns);
    document.querySelector('.lookV1').classList.toggle('hide',ns);
    document.querySelector('.lookNS').classList.toggle('hide',!ns);
    document.getElementById('verChip').innerHTML = ns?'North Star &mdash; vision':'V1 &mdash; standard';
    ['sec1','sec2','sec3','sec4'].forEach(function(s){document.getElementById(s).classList.remove('open')});
    // browse: copilot is NS-only; refresh an open interstitial for the new version
    document.getElementById('copilotWrap').classList.toggle('hide',!ns);
    var _uds=document.getElementById('understood');
    if(_uds && !_uds.classList.contains('hide') && document.getElementById('screen-order').classList.contains('active') && document.getElementById('askInput').value.trim()){ ask02S(); }
    if(ns) renderCopilot();
    document.getElementById('verChipOrder').innerHTML = ns?'North Star &mdash; vision':'V1 &mdash; standard';
    var vco2=document.getElementById('verChipOrders'); if(vco2) vco2.innerHTML = ns?'North Star &mdash; vision':'V1 &mdash; standard';
    // billing & budget
    var vcb=document.getElementById('verChipBilling'); if(vcb) vcb.innerHTML = ns?'North Star &mdash; vision':'V1 &mdash; standard';
    var bv1=document.getElementById('budgetV1'); if(bv1) bv1.classList.toggle('hide',ns);
    var bns=document.getElementById('budgetNS'); if(bns) bns.classList.toggle('hide',!ns);
    var psub=document.getElementById('pendSub'); if(psub) psub.textContent = ns?'ranked by risk · 02S flags anomalies before you approve':'act before the 10-day window closes';
    var vcp=document.getElementById('verChipProfile'); if(vcp) vcp.innerHTML = ns?'North Star &mdash; vision':'V1 &mdash; standard';
    var vcc=document.getElementById('verChipContact'); if(vcc) vcc.innerHTML = ns?'North Star &mdash; vision':'V1 &mdash; standard';
    renderCart();
    renderOrders(); renderBills(); renderOrdInsights();
    renderPending(); renderBillInsights();
    renderTeam(); renderEscalation(); renderProfileInsights();
    var cv1=document.getElementById('composeV1'); if(cv1) cv1.classList.toggle('hide',ns);
    var cns=document.getElementById('composeNS'); if(cns) cns.classList.toggle('hide',!ns);
    var vce=document.getElementById('verChipEquip'); if(vce) vce.innerHTML = ns?'North Star &mdash; vision':'V1 &mdash; standard';
    if(document.getElementById('eqBudget')){ renderEqBudget(); renderEqInsights(); setEqView(eqState.view); renderEqHistory(); updateEqSubmitBtn(); }
    if(dpActive)renderDP(dpActive);
    renderTickets(); renderContactInsights(); if(!ns){ var ar=document.getElementById('askRoute'); if(ar) ar.classList.add('hide'); }
    if(ccActive)renderCcScreen(ccActive); ccSyncToggle();
  }
  function renderCopilot(){
    document.getElementById('copilot').innerHTML =
      '<div class="cop hero"><span class="copi">'+svg('<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',2)+'</span><div class="copbody"><div class="copt">Structural steel starts in 3 weeks</div><div class="copd">Your plan needs a <b>40T crane</b>, a <b>telehandler</b>, and <b>temp power</b>. I\'ve pre-built the request — review dates and add.</div><div class="copact"><button class="btn btn-red btn-sm" onclick="openDetail(\'crane40\',\'plan\')">Review pre-built request</button></div></div></div>'+
      '<div class="cop"><span class="copi">'+svg('<path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4"/>',2)+'</span><div class="copbody"><div class="copt">Bundle what jobs like this need</div><div class="copd">Crane orders on similar steel packages also add <b>rigging</b>. Add it to keep pillars in sync?</div><div class="copact"><button class="btn btn-dark btn-sm" onclick="openDetail(\'rigging\',\'plan\')">Add rigging</button></div></div></div>'+
      '<div class="cop"><span class="copi">'+svg('<path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>',2)+'</span><div class="copbody"><div class="copt">Owned fleet is cheaper here</div><div class="copd">A telehandler is idle in-region wks 2–4. Using owned saves <b>~$4.1K</b> vs renting.</div><div class="copact"><button class="btn btn-dark btn-sm" onclick="openDetail(\'tele10\',\'plan\')">Configure telehandler</button></div></div></div>';
  }

  /* ═══════════ INIT ═══════════ */
  /* ═══════════ ORDERS SCREEN ═══════════ */
  var STAGES_EQ=['Requested','Acknowledged','In fulfillment','Delivered','On-Rent','Off-Rent'];
  var STAGES_OTHER=['Requested','Acknowledged','Fulfilled'];
  var STATUS_TAG={'Requested':'neu','Acknowledged':'neu','In fulfillment':'info','Delivered':'info','On-Rent':'ok','Off-Rent':'neu','Fulfilled':'ok','Pending':'warn','Approved':'ok','Finalized':'neu','Disputed':'bad'};

  var ORDERS=[
    {id:'ORD-3051',od:'2026-05-20',item:'\u00be-Ton Crew Truck',sub:'2 units \u00b7 civil support',pillar:'equipment',dates:'May 20 \u2013 ongoing',cost:'01-540 \u00b7 General conditions',stage:4,plan:null,qty:2,onRentSince:'May 20',mrate:2400,recert:'pending',recertDue:'Jul 21\u201325',note:'Civil support \u2014 active daily use by site crew',nsReco:{rec:'keep',why:'Daily fuel logs show active use'},latest:'On rent \u2014 active use by site crew',latestTone:'ok'},
    {id:'ORD-3054',od:'2026-08-03',item:'Tower Crane \u2014 self-erect',sub:'1 unit \u00b7 structure phase',pillar:'equipment',dates:'Aug 3 \u2013 Sep 30',cost:'26-330 \u00b7 BESS & Substation',stage:4,plan:null,qty:1,onRentSince:'Aug 3',mrate:24000,recert:'pending',recertDue:'Jul 21\u201325',note:'Structure phase \u2014 critical path through Sep',nsReco:{rec:'keep',why:'On the critical path; required through Sep per schedule'},latest:'On rent \u2014 structure phase, critical path',latestTone:'ok'},
    {id:'ORD-3042',od:'2026-05-12',item:'Excavator — 20T',sub:'1 unit · operator',pillar:'equipment',dates:'May 12 – Jun 6',cost:'03 · Concrete',stage:2,plan:null,
      latest:'Delivery rescheduled to May 20 after a 2-day yard delay',latestTone:'warn',
      risk:{type:'risk',text:'Trending <b>2 days late</b> — steel erection (ORD-3038) crane mob depends on this. 02S flagged the yard for expedite.'},
      recv:{status:'scheduled',window:'May 20, 6:00 AM – 10:00 AM CT',windowType:'Heavy haul — oversized load',carrier:'McCarthy Logistics (internal)',dispatch:'(555) 482-7700',coordinator:'Marcus Webb',coordPhone:'(555) 482-3190',vehicle:'3-axle lowboy trailer. Operating weight 46,000 lb. North gate access — verify road bearing.',
        checklist:[
          {t:'Confirm laydown and access road cleared (north approach)',due:'May 18',done:false},
          {t:'Verify access road can bear 46,000 lb plus trailer',due:'May 19',done:false},
          {t:'Operator and spotter scheduled for delivery window',due:'May 20',done:false},
          {t:'Notify site security of heavy-haul delivery',due:'May 17',done:true},
          {t:'Superintendent to sign delivery receipt on arrival',due:'May 20',done:false}
        ],
        note:'Excavator ships on a single lowboy. Delivery revised to May 20 after a 2-day yard delay — steel erection (ORD-3038) crane mob depends on this unit landing on time. Access road must be cleared by May 19.',
        docs:['Delivery route map (PDF)','Access road load rating (PDF)','Operating manual (PDF)']}},
    {id:'ORD-3038',od:'2026-08-04',item:'Hydraulic Crane — 40T',sub:'1 unit · Aug hold',pillar:'equipment',dates:'Aug 4 – Aug 29',cost:'05 · Metals',stage:1,plan:'EQ-114',latest:'Allocated — rate confirmed, mobilization holds for August'},
    {id:'ORD-3031',od:'2026-05-01',item:'Scissor Lift — 32 ft',sub:'2 units',pillar:'equipment',dates:'May 1 – May 15',cost:'09 · Finishes',stage:4,plan:null,qty:2,onRentSince:'May 1',mrate:3800,recert:'pending',recertDue:'Jul 21\u201325',note:'MEP rough-in at L2 \u2014 both units idle',nsReco:{rec:'return',why:'No badge-ins at L2 for 9 days \u00b7 BILL-9012 flagged idle-day overage \u00b7 MEP rough-in complete per CPM',save:3800},
      latest:'On rent — both units idle 4 days (no badge-ins)',latestTone:'warn',
      rental:{offRent:'May 15, 2026',daysLeft:3,idle:true,save:740},
      recv:{status:'completed',window:'May 1, 7:00 AM – 9:00 AM CT',windowType:'Standard flatbed delivery',carrier:'McCarthy Logistics (internal)',dispatch:'(555) 482-7700',coordinator:'Marcus Webb',coordPhone:'(555) 482-3190',vehicle:'Single flatbed. 2 scissor-lift units. Standard site access.',
        checklist:[
          {t:'Staging area designated near finishes zone',due:'Apr 30',done:true},
          {t:'Operator on site to accept and inspect units',due:'May 1',done:true},
          {t:'Delivery receipt signed by superintendent',due:'May 1',done:true}
        ],
        note:'Two scissor lifts delivered and inspected, both cleared for operation. No badge-ins logged since May 6 — units appear idle.',
        docs:['Equipment inspection checklist (PDF)','Operating manual (PDF)']}},
    {id:'ORD-3029',od:'2026-05-05',item:'Telehandler — 10K',sub:'1 unit',pillar:'equipment',dates:'May 5 – May 26',cost:'05 · Metals',stage:3,plan:'EQ-118',
      latest:'Delivered and inspected — cleared for operation',
      recv:{status:'completed',window:'May 5, 6:30 AM – 9:00 AM CT',windowType:'Standard flatbed delivery',carrier:'McCarthy Logistics (internal)',dispatch:'(555) 482-7700',coordinator:'Marcus Webb',coordPhone:'(555) 482-3190',vehicle:'Single flatbed. 1 telehandler, 10K reach. Standard site access.',
        checklist:[
          {t:'Staging area near steel laydown designated',due:'May 4',done:true},
          {t:'Operator on site to accept and inspect',due:'May 5',done:true},
          {t:'Delivery receipt signed by superintendent',due:'May 5',done:true}
        ],
        note:'Single 10K telehandler. Pre-delivery inspection completed. Machine cleared for immediate operation.',
        docs:['Equipment inspection checklist (PDF)','Operating manual (PDF)']}},
    {id:'ORD-3020',od:'2026-05-13',item:'Rigging & lift hardware',sub:'lot',pillar:'procurement',dates:'one-time',cost:'05 · Metals',stage:2,plan:null,latest:'Order acknowledged — fulfillment in progress'},
    {id:'ORD-3014',od:'2026-04-28',item:'L2 Headwall Assembly',sub:'per submittal',pillar:'prefab',dates:'one-time',cost:'03 · Concrete',stage:1,plan:'PF-021',latest:'Submittal under review with prefab'},
    {id:'ORD-3009',od:'2026-04-18',item:'Site survey crew',sub:'2 days',pillar:'profservices',dates:'Apr 18 – Apr 19',cost:'01 · General',stage:2,plan:null,latest:'Crew scheduled — 2-day survey window'},
    {id:'ORD-2998',od:'2026-04-05',item:'SUV AWD',sub:'1 unit',pillar:'equipment',dates:'Apr 5 – May 18',cost:'01 · General',stage:5,plan:null,latest:'Off-rent — returned Apr 30'}
  ];
  var BILLS=[
    {id:'BILL-9012',order:'ORD-3031',product:'Scissor Lift — 32 ft (2)',amt:4820,cost:'09 · Finishes',status:'Pending',date:'May 10',day:8,anomaly:'12% above order est.',reason:'Idle-day overage — 4 days no badge-ins',notes:2},
    {id:'BILL-9015',order:'ORD-3042',product:'Excavator — 20T + operator',amt:38400,cost:'03 · Concrete',status:'Pending',date:'May 12',day:4,notes:0},
    {id:'BILL-9016',order:'ORD-3020',product:'Rigging & lift hardware',amt:4980,cost:'05 · Metals',status:'Pending',date:'May 13',day:2,notes:1},
    {id:'BILL-9008',order:'ORD-3029',product:'Telehandler — 10K',amt:6180,cost:'05 · Metals',status:'Approved',date:'May 6',audit:'J. Torres · approved May 6'},
    {id:'BILL-9001',order:'ORD-2998',product:'SUV AWD',amt:3900,cost:'01 · General',status:'Finalized',date:'Apr 30',audit:'Auto-finalized Apr 30'},
    {id:'BILL-8994',order:'ORD-3020',product:'Rigging & lift hardware',amt:1180,cost:'05 · Metals',status:'Finalized',date:'Apr 25',audit:'M. Chen · approved Apr 24'},
    {id:'BILL-8987',order:'ORD-3009',product:'Site survey crew',amt:4200,cost:'01 · General',status:'Finalized',date:'Apr 20',audit:'Auto-finalized Apr 20'}
  ];
  var COST_CODES=['01 · General','03 · Concrete','05 · Metals','09 · Finishes'];
  function stageStatus(o){var arr=o.pillar==='equipment'?STAGES_EQ:STAGES_OTHER;return arr[Math.min(o.stage,arr.length-1)];}

  function ordClearDates(){ var a=document.getElementById('ordFrom'); if(a)a.value=''; var b=document.getElementById('ordTo'); if(b)b.value=''; renderOrders(); }
  /* ═══════════ WEEKLY ON-RENT RECERTIFICATION ═══════════ */
  var recertPick={};
  function recertItems(){ return ORDERS.filter(function(o){return o.recert==='pending';}); }
  function openRecert(){
    var items=recertItems();
    if(!items.length){ toast('Nothing pending \u2014 all on-rent items are recertified for the week'); return; }
    var ns=CURRENT==='ns';
    recertPick={};
    items.forEach(function(o){ recertPick[o.id]=(ns && o.nsReco && o.nsReco.rec==='return') ? 'off' : 'keep'; });
    openModal('Weekly on-rent recertification', recertBody());
  }
  function recertBody(){
    var items=recertItems(), ns=CURRENT==='ns', keep=0,off=0;
    items.forEach(function(o){ if(recertPick[o.id]==='off')off++; else keep++; });
    var star='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6 4.5 2.3 7.1L12 16.9 5.3 21l2.3-7.1-6-4.5h7.6z"/></svg>';
    var h='<div class="rc-sub">Hercules Solar + BESS \u00b7 Jul 21\u201325 \u00b7 '+items.length+' item'+(items.length===1?'':'s')+' pending</div>';
    if(ns){
      var ret=0,save=0; items.forEach(function(o){ if(o.nsReco&&o.nsReco.rec==='return'){ret++;save+=o.mrate||0;} });
      h+='<div class="rc-ns"><span class="rc-nsi">'+star+'</span><span><b>02S reviewed all '+items.length+' items against the CPM schedule, badge-in logs, and billing.</b> '+(items.length-ret)+' are clearly still needed and pre-set to renew; '+ret+' look returnable \u2014 <b>~'+fmtBig(save)+'/mo</b> at stake. Confirm or override below.</span></div>';
    } else {
      h+='<div class="rc-warn">'+svg('<path d="M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L14.7 3.9a2 2 0 00-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',2)+'<span>Confirm each item is still needed. Items confirmed will auto-renew; items called off will trigger return logistics through 02S.</span></div>';
    }
    items.forEach(function(o){
      var pick=recertPick[o.id];
      var reco='';
      if(ns&&o.nsReco){
        var isRet=o.nsReco.rec==='return';
        reco='<div class="rc-reco '+(isRet?'ret':'keep')+'">'+svg(isRet?'<path d="M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L14.7 3.9a2 2 0 00-3.4 0z"/><path d="M12 9v4M12 17h.01"/>':'<path d="M20 6L9 17l-5-5"/>',2)+'<span><b>02S: '+(isRet?'recommend call-off':'still needed')+'</b>'+(isRet?' \u00b7 save ~'+fmtBig(o.mrate||0)+'/mo':'')+' \u2014 '+o.nsReco.why+'</span></div>';
      }
      h+='<div class="rc-item">'+
        '<div class="rc-top"><div class="rc-name">'+(o.qty?o.qty+'\u00d7 ':'')+o.item+'</div><span class="tag ok">On-rent</span></div>'+
        '<div class="rc-meta">'+o.id+' \u00b7 on-rent since '+(o.onRentSince||'\u2014')+' \u00b7 '+o.cost+'</div>'+
        (o.note?'<div class="rc-note">'+o.note+'</div>':'')+
        reco+
        '<div class="rc-btns"><button class="rc-b keep'+(pick==='keep'?' on':'')+'" onclick="recertSet(\''+o.id+'\',\'keep\')">'+svg('<path d="M20 6L9 17l-5-5"/>',2)+'Still needed</button>'+
        '<button class="rc-b off'+(pick==='off'?' on':'')+'" onclick="recertSet(\''+o.id+'\',\'off\')">'+svg('<path d="M18 6L6 18M6 6l12 12"/>',2)+'Call off</button></div>'+
      '</div>';
    });
    var lbl = off>0 ? ('Submit \u2014 renew '+keep+', return '+off) : 'Submit all & renew';
    h+='<div class="rc-foot"><button class="btn btn-ghost" onclick="closeModal()">Close</button><button class="btn btn-red" onclick="recertSubmit()">'+svg('<path d="M20 6L9 17l-5-5"/>',2)+lbl+'</button></div>';
    return h;
  }
  function recertSet(id,d){ recertPick[id]=d; var mb=document.getElementById('modalBody'); if(mb)mb.innerHTML=recertBody(); }
  function recertSubmit(){
    var items=recertItems(), keep=0,off=0,save=0;
    items.forEach(function(o){
      if(recertPick[o.id]==='off'){ o.stage=STAGES_EQ.indexOf('Off-Rent'); o.recert='off'; o.latest='Called off Jul 21 \u2014 return logistics scheduled through 02S; rental billing stops at off-rent'; o.latestTone='info'; off++; save+=o.mrate||0; }
      else { o.recert='kept'; o.latest='Recertified Jul 21 \u2014 still on rent, auto-renewed for the week'; o.latestTone='ok'; keep++; }
    });
    closeModal(); renderOrders(); syncRecert();
    var msg = off>0 ? (keep+' renewed \u00b7 '+off+' called off \u2014 return logistics scheduled, ~'+fmtBig(save)+'/mo of rental billing avoided') : ('All '+keep+' items recertified \u2014 rentals renewed for the week');
    toast(msg);
  }
  function syncRecert(){
    var n=recertItems().length;
    var sub=document.getElementById('dashRecertSub');
    if(sub) sub.textContent = n ? (n+' item'+(n===1?'':'s')+' due Jul 21\u201325 \u2014 confirm what\u2019s still on rent.') : 'All on-rent items recertified for the week \u2014 nothing pending.';
    var card=document.getElementById('dashRecert'); if(card) card.classList.toggle('rc-done', n===0);
  }
  function renderOrders(){
    var _rb=document.getElementById('recertBanner');
    if(_rb){ var _rc=recertItems(); _rb.innerHTML=_rc.length?('<div class="rc-banner">'+svg('<circle cx="12" cy="12" r="10"/><path d="M12 7v5l3 2"/>',2)+'<div class="rcb-t"><b>Weekly on-rent recertification</b><span>'+_rc.length+' item'+(_rc.length===1?'':'s')+' due Jul 21\u201325 \u00b7 confirm what\u2019s still on rent</span></div><button class="btn btn-red btn-sm" onclick="openRecert()">Review &amp; certify</button></div>'):''; }
    var q=(document.getElementById('ordSearch').value||'').toLowerCase().trim();
    var fp=document.getElementById('ordPillar').value, fs=document.getElementById('ordStatus').value, fc=document.getElementById('ordCost').value;
    var fo=(document.getElementById('ordOrigin')||{}).value||'';
    var ff=(document.getElementById('ordFrom')||{}).value||'', ft=(document.getElementById('ordTo')||{}).value||'';
    var ns=CURRENT==='ns';
    var list=ORDERS.filter(function(o){
      var st=stageStatus(o);
      if(fp && o.pillar!==fp) return false;
      if(fs && st!==fs) return false;
      if(fc && o.cost!==fc) return false;
      if(fo==='plan' && !o.plan) return false;
      if(fo==='adhoc' && o.plan) return false;
      if(ff && o.od && o.od<ff) return false;
      if(ft && o.od && o.od>ft) return false;
      if(q && (o.id.toLowerCase().indexOf(q)<0 && o.item.toLowerCase().indexOf(q)<0 && o.cost.toLowerCase().indexOf(q)<0)) return false;
      return true;
    });
    document.getElementById('ordCountLbl').textContent='· '+list.length+' order'+(list.length===1?'':'s');
    var head='<div class="ot-head"><span>Order</span><span>Items</span><span>Pillar</span><span>Origin</span><span class="hide-sm">Dates</span><span class="hide-sm">Cost code</span><span>Status</span><span></span></div>';
    var rows=list.map(function(o){
      var st=stageStatus(o);
      var badge='';
      var freshBadge=o.fresh?'<span class="tag ok" style="margin-left:7px">New</span>':'';
      if(ns){
        if(o.risk) badge = o.risk.type==='risk'?'<span class="tag bad" style="margin-left:7px">At risk</span>':'<span class="tag ok" style="margin-left:7px">Save $</span>';
        else if(o.rental) badge = '<span class="tag warn" style="margin-left:7px">Ending soon</span>';
      }
      var trk = trackerHTML(o, ns);
      return '<div class="orow" id="row-'+o.id+'" onclick="toggleOrder(\''+o.id+'\')">'+
        '<div class="oc-id">'+o.id+'</div>'+
        '<div class="oc-item">'+o.item+freshBadge+badge+'<div class="sub">'+o.sub+'</div></div>'+
        '<div><span class="tag '+(o.pillar==='equipment'?'info':'neu')+'">'+pillarLabel(o.pillar)+'</span></div>'+
        '<div class="oc-origin">'+(o.plan?'<span class="tag info">Demand plan</span><span class="oo-ref">'+o.plan+'</span>':'<span class="tag neu">Ad-hoc</span>')+'</div>'+
        '<div class="oc-dates hide-sm">'+o.dates+'</div>'+
        '<div class="oc-cost hide-sm" title="'+o.cost+'">'+o.cost+'</div>'+
        '<div><span class="tag '+(STATUS_TAG[st]||'neu')+'">'+st+'</span></div>'+
        '<div>'+svg('<path d="M9 18l6-6-6-6"/>',2).replace('<svg ','<svg class="oc-chev" ')+'</div>'+
        '</div>'+
        '<div class="otrack" id="trk-'+o.id+'">'+trk+'</div>';
    }).join('');
    document.getElementById('ordTable').innerHTML = head + (rows||'<div style="padding:32px;text-align:center;color:var(--g400);font-size:12.5px">No orders match these filters.</div>');
  }

  function trackerHTML(o, ns){
    var arr=o.pillar==='equipment'?STAGES_EQ:STAGES_OTHER;
    var icons=['<path d="M5 12h14M12 5l7 7-7 7"/>','<path d="M20 6L9 17l-5-5"/>','<path d="M20 7l-8-4-8 4m16 0l-8 4"/>','<rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/>','<path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>','<path d="M21 12a9 9 0 11-6.2-8.5"/>'];
    var steps=arr.map(function(lbl,i){
      var cls = i<o.stage?'done':(i===o.stage?'cur':'future');
      var ic = i<o.stage?'<path d="M20 6L9 17l-5-5"/>':icons[i];
      return '<div class="step '+cls+'"><span class="dot">'+svg(ic, cls==='done'?3:2)+'</span><span class="slbl">'+lbl+'</span></div>';
    }).join('');
    var parts=[];
    if(ns && o.rental) parts.push(eorHTML(o));                       // NS: proactive end-of-rental banner
    parts.push('<div class="trk">'+steps+'</div>');                  // tracker (both versions)
    if(o.latest) parts.push('<div class="latest-line'+(o.latestTone?' '+o.latestTone:'')+'"><span class="ll-k">Latest</span>'+o.latest+'</div>'); // both
    if(ns && o.risk) parts.push('<div class="track-insight '+(o.risk.type==='risk'?'risk':'opp')+'">'+svg(o.risk.type==='risk'?'<path d="M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L14.7 3.9a2 2 0 00-3.4 0z"/><path d="M12 9v4M12 17h.01"/>':'<path d="M12 2l2.4 7.4H22l-6 4.5 2.3 7.1-6.3-4.6L5.7 21l2.3-7.1-6-4.5h7.6z"/>',2)+'<div>'+o.risk.text+'</div></div>'); // NS insight
    if(ns && o.recv) parts.push(recvHTML(o));                        // NS: rich receiving details
    return parts.join('');
  }

  function eorHTML(o){
    var r=o.rental;
    var save = (r.idle && r.save) ? ' Both units idle 4 days — <b>return now to save ~'+fmt(r.save)+'</b>.' : '';
    return '<div class="eor-banner">'+
      '<span class="eor-i">'+svg('<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 1.5M5 3L2.5 5.5M22 6l-2.5-2.5"/>',2)+'</span>'+
      '<div class="eor-body"><b>Approaching end of rental</b> — '+r.daysLeft+' days remaining (off-rent: '+r.offRent+').'+save+'</div>'+
      '<div class="eor-act">'+
        '<button class="btn btn-info-solid btn-sm" onclick="event.stopPropagation();openEorAction(\''+o.id+'\',\'Extend rental\')">Extend rental</button>'+
        '<button class="btn btn-return btn-sm" onclick="event.stopPropagation();openEorAction(\''+o.id+'\',\'Early off-rent / return\')">Initiate return</button>'+
        '<button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();go(\'order\')">Different spec</button>'+
      '</div>'+
    '</div>';
  }

  function recvHTML(o){
    var r=o.recv, done=r.status==='completed';
    var hdrIcon = done?'<path d="M20 6L9 17l-5-5"/>':'<rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>';
    var hdrLbl = done?'Delivery completed ✓':'Delivery scheduled';
    var checks = r.checklist.map(function(c){
      return '<div class="ck-row'+(c.done?' done':' pending')+'">'+
        (c.done?'<span class="ck-ic">'+svg('<path d="M20 6L9 17l-5-5"/>',3)+'</span>':'<span class="ck-ic todo"></span>')+
        '<span class="ck-t">'+c.t+'</span><span class="ck-due">Due '+c.due+'</span></div>';
    }).join('');
    var docs = r.docs.map(function(d){
      return '<span class="doc-chip" data-doc="'+d.replace(/"/g,'&quot;')+'" onclick="event.stopPropagation();openDocChip(this.getAttribute(\'data-doc\'))">'+svg('<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/>',2)+d+'</span>';
    }).join('');
    return '<div class="recv '+(done?'d':'s')+'">'+
      '<div class="recv-head">'+svg(hdrIcon,2)+'<b>Receiving details</b><span class="recv-sub">· '+hdrLbl+'</span></div>'+
      '<div class="recv-body">'+
        '<div class="recv-grid">'+
          '<div class="rg-cell"><div class="rg-k">Delivery window</div><div class="rg-v">'+r.window+'</div><div class="rg-s">'+r.windowType+'</div></div>'+
          '<div class="rg-cell"><div class="rg-k">Carrier &amp; contact</div><div class="rg-v">'+r.carrier+'</div><div class="rg-s link">Dispatch: '+r.dispatch+'</div></div>'+
          '<div class="rg-cell"><div class="rg-k">Your coordinator</div><div class="rg-v">'+r.coordinator+'</div><div class="rg-s link phone">'+svg('<path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013 5.18 2 2 0 015 3h3a2 2 0 012 1.72c.13.98.36 1.94.7 2.86a2 2 0 01-.45 2.11L9 11a16 16 0 006 6l1.31-1.25a2 2 0 012.11-.45c.92.34 1.88.57 2.86.7A2 2 0 0122 16.92z"/>',2)+r.coordPhone+'</div></div>'+
          '<div class="rg-cell"><div class="rg-k">Vehicle</div><div class="rg-v vsm">'+r.vehicle+'</div></div>'+
        '</div>'+
        '<div class="recv-ck-t">Site preparation checklist</div>'+
        '<div class="recv-ck">'+checks+'</div>'+
        '<div class="recv-note">'+svg('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',2)+'<div>'+r.note+'</div></div>'+
        '<div class="recv-docs"><span class="rd-k">Documents</span>'+docs+'</div>'+
      '</div>'+
    '</div>';
  }
  function toggleOrder(id){document.getElementById('row-'+id).classList.toggle('open');document.getElementById('trk-'+id).classList.toggle('open');}

  /* ═══════════ BILLING & BUDGET ═══════════ */
  function getBill(id){return BILLS.filter(function(b){return b.id===id;})[0];}
  var billUI={}; // id -> '' | 'dispute' | 'edit'

  // ── Billing history table (moved here from Orders) ──
  function renderBills(){
    var host=document.getElementById('billHist'); if(!host) return;
    var ns=CURRENT==='ns';
    var q=(document.getElementById('billSearch').value||'').toLowerCase().trim();
    var fs=document.getElementById('billStatus').value, fc=document.getElementById('billCost').value;
    var list=BILLS.filter(function(b){
      if(fs && b.status!==fs) return false;
      if(fc && b.cost!==fc) return false;
      if(q && (b.id.toLowerCase().indexOf(q)<0 && b.order.toLowerCase().indexOf(q)<0 && b.product.toLowerCase().indexOf(q)<0)) return false;
      return true;
    });
    var lbl=document.getElementById('billCountLbl'); if(lbl) lbl.textContent='· '+list.length+' bill'+(list.length===1?'':'s');
    var head='<div class="ot-head bt-head"><span>Bill</span><span>Order</span><span>Product</span><span class="r">Amount</span><span class="hide-sm">Cost code</span><span>Status</span></div>';
    var rows=list.map(function(b){
      var anom = (ns && b.anomaly) ? '<span class="anomaly-flag">'+svg('<path d="M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L14.7 3.9a2 2 0 00-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',2)+b.anomaly+'</span>' : '';
      return '<div class="brow">'+
        '<div class="oc-id">'+b.id+'</div>'+
        '<div><span class="oc-link" onclick="jumpToOrder(\''+b.order+'\')">'+b.order+'</span></div>'+
        '<div class="oc-item" style="font-weight:500">'+b.product+anom+'</div>'+
        '<div class="oc-amt r">'+fmt(b.amt)+'</div>'+
        '<div class="oc-cost hide-sm">'+b.cost+'</div>'+
        '<div><span class="tag '+(STATUS_TAG[b.status]||'neu')+'">'+b.status+'</span></div>'+
        '</div>';
    }).join('');
    host.innerHTML = head + (rows||'<div style="padding:32px;text-align:center;color:var(--g400);font-size:12.5px">No bills match these filters.</div>');
  }

  // ── Pending review & approval (10-day window) ──
  function renderPending(){
    var host=document.getElementById('pendingWrap'); if(!host) return;
    var ns=CURRENT==='ns';
    var pend=BILLS.filter(function(b){return b.status==='Pending';});
    pend.sort(function(a,b){ if(ns){var ra=(a.anomaly?1:0),rb=(b.anomaly?1:0); if(rb-ra!==0) return rb-ra;} return b.day-a.day; });
    if(!pend.length){ host.innerHTML='<div class="pc-empty">'+svg('<path d="M20 6L9 17l-5-5"/>',2)+'<div><b>All caught up.</b> No bills in the 10-day window right now.</div></div>'; return; }
    host.innerHTML = pend.map(function(b){
      var urg = b.day>=8?'red':(b.day>=5?'gold':'neu');
      var left = 10-b.day;
      var mode = billUI[b.id]||'';
      var anomCard = (ns && b.anomaly) ? '<div class="pc-anom">'+svg('<path d="M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L14.7 3.9a2 2 0 00-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',2)+'<div><b>'+b.anomaly+'</b> — '+(b.reason||'')+'. <span class="pc-rec">02S recommends you dispute.</span></div></div>' : '';
      // inline panels
      var inline='';
      if(mode==='dispute'){
        inline='<div class="pc-inline">'+
          '<div class="pi-t">Reason for dispute <span class="pi-note">pauses auto-finalization until 02S responds</span></div>'+
          '<textarea id="dr-'+b.id+'" class="pi-ta" placeholder="e.g. Billed 4 idle days with no badge-ins — request adjustment">'+((ns&&b.reason)?b.reason:'')+'</textarea>'+
          '<div class="pi-act"><button class="btn btn-red btn-sm" onclick="disputeBill(\''+b.id+'\')">Submit dispute</button><button class="btn btn-ghost btn-sm" onclick="setBillUI(\''+b.id+'\',\'\')">Cancel</button></div>'+
        '</div>';
      } else if(mode==='edit'){
        var opts=COST_CODES.map(function(c){return '<option'+(c===b.cost?' selected':'')+'>'+c+'</option>';}).join('');
        inline='<div class="pc-inline">'+
          '<div class="pi-t">Dispute · correct cost code <span class="pi-note">every change is captured to the audit trail</span></div>'+
          '<div style="margin-bottom:10px"><label style="font-size:10.5px;font-weight:600;color:var(--g500);text-transform:uppercase;letter-spacing:.02em;display:flex;flex-direction:column;gap:4px">Cost code<select style="border:1px solid var(--g250);border-radius:6px;padding:7px 8px;font:inherit;font-size:12px;color:var(--g800);background:#fff;font-weight:500;max-width:260px;margin-top:4px" id="cc-'+b.id+'">'+opts+'</select></label></div>'+
          '<div class="pi-act"><button class="btn btn-dark btn-sm" onclick="saveCost(\''+b.id+'\')">Save correction</button><button class="btn btn-ghost btn-sm" onclick="setBillUI(\''+b.id+'\',\'\')">Cancel</button></div>'+
        '</div>';
      }
      var notes = b.notes ? '<span class="pc-notes" onclick="openBillDiscuss(\''+b.id+'\')">'+svg('<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>',2)+b.notes+' note'+(b.notes===1?'':'s')+'</span>' : '<span class="pc-notes" onclick="openBillDiscuss(\''+b.id+'\')">'+svg('<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>',2)+'Discuss</span>';
      var audit = b.audit ? '<span class="pc-audit">'+b.audit+'</span>' : '<span class="pc-audit">Awaiting your review</span>';
      return '<div class="pcard'+(urg==='red'?' urg':'')+'" id="pc-'+b.id+'">'+
        '<div class="pc-top">'+
          '<div class="pc-idwrap"><span class="oc-id">'+b.id+'</span><span class="pc-from">from</span><span class="oc-link" onclick="jumpToOrder(\''+b.order+'\')">'+b.order+'</span></div>'+
          '<div class="pc-amt">'+fmt(b.amt)+'</div>'+
        '</div>'+
        '<div class="pc-prod">'+b.product+'<span class="pc-cc">'+b.cost+'</span></div>'+
        anomCard+
        '<div class="pc-window">'+
          '<div class="pw-meter"><span class="pw-'+urg+'" style="width:'+(b.day*10)+'%"></span></div>'+
          '<div class="pw-lbl">Day <b>'+b.day+'</b> of 10 &middot; <span class="pw-'+urg+'-t">'+(left<=2?'auto-finalizes in '+left+' day'+(left===1?'':'s'):left+' days left')+'</span></div>'+
        '</div>'+
        '<div class="pc-actions">'+
          '<button class="btn btn-approve btn-sm" onclick="approveBill(\''+b.id+'\')">'+svg('<path d="M20 6L9 17l-5-5"/>',2.4)+'Approve</button>'+
          '<button class="btn btn-ghost btn-sm'+(mode==='edit'?' on':'')+'" onclick="setBillUI(\''+b.id+'\',\'edit\')">Dispute / correct code</button>'+
          notes+audit+
        '</div>'+
        inline+
      '</div>';
    }).join('');
  }
  function setBillUI(id,mode){ billUI[id]=(billUI[id]===mode?'':mode); renderPending(); }
  function approveBill(id){ var b=getBill(id); if(!b) return; b.status='Approved'; b.audit='You · approved just now'; billUI[id]=''; renderPending(); renderBills(); renderBillInsights(); toast('Bill '+id+' approved → routed to YardHub'); }
  function disputeBill(id){ var b=getBill(id); if(!b) return; var el=document.getElementById('dr-'+id); var r=(el&&el.value||'').trim()||'Amount exceeds order estimate'; b.status='Disputed'; b.disputeReason=r; b.audit='You · disputed just now — auto-finalization paused'; billUI[id]=''; renderPending(); renderBills(); renderBillInsights(); toast('Dispute raised on '+id+' — auto-finalization paused until 02S responds'); }
  function saveCost(id){ var b=getBill(id); if(!b) return; var el=document.getElementById('cc-'+id); if(el) b.cost=el.value; b.audit='You · edited cost code just now'; billUI[id]=''; renderPending(); renderBills(); toast('Cost code updated on '+id+' — logged to audit trail'); }

  function renderBillInsights(){
    var wrap=document.getElementById('billInsights'); if(!wrap) return;
    if(CURRENT!=='ns'){wrap.classList.add('hide');return;}
    var pend=BILLS.filter(function(b){return b.status==='Pending';});
    var anomalies=pend.filter(function(b){return b.anomaly;}).length;
    wrap.classList.remove('hide');
    wrap.innerHTML='<div class="ins-strip"><span class="isi">'+svg('<path d="M12 2l2.4 7.4H22l-6 4.5 2.3 7.1-6.3-4.6L5.7 21l2.3-7.1-6-4.5h7.6z"/>',0)+'</span>'+
      '<div><div class="ist">'+(anomalies?anomalies+' billing anomaly to review':'Billing on track')+' &middot; forecast $13.8M ($0.4M under plan)</div><div class="isd">'+
      (anomalies?'<b>BILL-9012</b> is 12% above its order estimate — likely idle-day overage on the scissor lifts. 02S recommends a dispute. ':'')+
      '<b>$3.2K/week</b> open exposure from idle fleet is eroding your forecast headroom — ending ORD-3031 early recovers ~$740.</div></div></div>';
  }

  // click-through: bill → originating order (now cross-tab: switch to Orders, expand + flash)
  function jumpToOrder(id){
    go('orders');
    var row=document.getElementById('row-'+id); if(!row) return;
    if(!row.classList.contains('open')) toggleOrder(id);
    setTimeout(function(){
      row.scrollIntoView({behavior:'smooth',block:'center'});
      row.classList.add('flash'); setTimeout(function(){row.classList.remove('flash');},1500);
    },70);
  }
  function renderOrdInsights(){
    var wrap=document.getElementById('ordInsights');
    if(CURRENT!=='ns'){wrap.classList.add('hide');return;}
    wrap.classList.remove('hide');
    wrap.innerHTML='<div class="ins-strip"><span class="isi">'+svg('<path d="M12 2l2.4 7.4H22l-6 4.5 2.3 7.1-6.3-4.6L5.7 21l2.3-7.1-6-4.5h7.6z"/>',0)+'</span>'+
      '<div><div class="ist">2 orders need your attention</div><div class="isd"><b>ORD-3042</b> (excavator) is trending 2 days late and blocks the crane mobilization · <b>ORD-3031</b> (scissor lifts) has been idle 4 days — ending early saves ~$740. 1 billing anomaly is waiting in Billing &amp; budget.</div></div></div>';
  }

  // ── toast ──
  function toggleEl(id){var el=document.getElementById(id);if(el)el.style.display=el.style.display==='none'?'':'none';}
  function toast(msg){ var t=document.getElementById('toast'); if(!t) return; t.textContent=msg; t.classList.add('show'); clearTimeout(window.__tt); window.__tt=setTimeout(function(){t.classList.remove('show');},2800); }

  /* ═══════════ PROJECT PROFILE ═══════════ */
  var ACCESS_LEVELS=['View only','Editor','Approver','Admin'];
  var TEAM=[
    {name:'Sarah Chen',email:'s.chen@mccarthy.com',role:'Project Manager',access:'Admin'},
    {name:'Linda Osei',email:'l.osei@mccarthy.com',role:'Project Accountant',access:'Approver'},
    {name:'Dan Reyes',email:'d.reyes@mccarthy.com',role:'Superintendent',access:'Editor'},
    {name:'Marcus Webb',email:'m.webb@mccarthy.com',role:'Field Coordinator',access:'Editor'},
    {name:'Priya Nair',email:'p.nair@mccarthy.com',role:'Project Engineer',access:'Editor',inactiveDays:31},
    {name:'Tom Bradley',email:'t.bradley@mccarthy.com',role:'Assistant PM',access:'View only',permRec:'Editor'},
    {name:'Kevin Zhang',email:'k.zhang@mccarthy.com',role:'Field Engineer',access:'View only',leftFlag:true}
  ];
  var ESCAL=[
    {role:'Primary PM',name:'Sarah Chen',phone:'(555) 482-3100'},
    {role:'Site lead',name:'Dan Reyes',phone:'(555) 482-3120'},
    {role:'Safety / after-hours',name:null,phone:null,nsFlag:'Recommended'},
    {role:'Backup bill approver',name:null,phone:null,nsFlag:'Coverage gap'}
  ];
  function initials(n){var p=n.trim().split(/\s+/);return ((p[0]||'')[0]||'')+((p[1]||'')[0]||'');}
  function accTag(a){var m={'Admin':'bad','Approver':'info','Editor':'neu','View only':'neu'};return m[a]||'neu';}
  function renderTeam(){
    var ns=CURRENT==='ns';
    document.getElementById('teamCount').textContent='· '+TEAM.length+' people';
    var rows=TEAM.map(function(t,i){
      var sel='<select class="acc-sel" onchange="setAccess('+i+',this.value)">'+ACCESS_LEVELS.map(function(a){return '<option'+(a===t.access?' selected':'')+'>'+a+'</option>';}).join('')+'</select>';
      var flags='';
      if(ns){
        if(t.leftFlag) flags+='<span class="tag bad">No activity 45d</span>';
        else if(t.inactiveDays) flags+='<span class="tag warn">Inactive '+t.inactiveDays+'d</span>';
        if(t.permRec) flags+='<span class="tag info" title="Recommended access">Suggest '+t.permRec+'</span>';
        if(!flags) flags='<span class="tag ok">Active</span>';
      }
      return '<div class="rrow">'+
        '<div class="rt-who"><span class="avi">'+initials(t.name)+'</span><div><div class="rt-n">'+t.name+'</div><div class="rt-e">'+t.email+'</div></div></div>'+
        '<div class="rt-role">'+t.role+'</div>'+
        '<div>'+sel+'</div>'+
        '<div class="hide-sm rt-flags">'+flags+'</div>'+
        '<div class="rt-x"><button class="iconbtn" title="Remove" onclick="removeTeammate('+i+')">'+svg('<path d="M18 6L6 18M6 6l12 12"/>',2)+'</button></div>'+
      '</div>';
    }).join('');
    document.getElementById('teamTable').innerHTML=rows;
  }
  function renderEscalation(){
    var ns=CURRENT==='ns';
    document.getElementById('escGrid').innerHTML=ESCAL.map(function(e){
      var set=!!e.name;
      var flag=(ns && e.nsFlag && !set)?'<span class="tag warn esc-flag">'+e.nsFlag+'</span>':'';
      var body = set
        ? '<div class="esc-n">'+e.name+'</div><div class="esc-p">'+e.phone+'</div>'
        : '<div class="esc-empty">Not set</div>';
      var btn = set?'Change':'Set contact';
      return '<div class="esc-cell'+(set?'':' empty')+'"><div class="esc-k">'+e.role+flag+'</div>'+body+
        '<button class="esc-edit" data-role="'+e.role.replace(/"/g,'&quot;')+'" data-isset="'+(set?'1':'0')+'" onclick="openSetEscalation(this)">'+btn+'</button></div>';
    }).join('');
  }
  function renderProfileInsights(){
    var wrap=document.getElementById('profInsights'); if(!wrap) return;
    if(CURRENT!=='ns'){wrap.classList.add('hide');return;}
    var approvers=TEAM.filter(function(t){return t.access==='Approver'||t.access==='Admin';}).length;
    var stale=TEAM.filter(function(t){return t.leftFlag||t.inactiveDays;}).length;
    wrap.classList.remove('hide');
    wrap.innerHTML='<div class="ins-strip"><span class="isi">'+svg('<path d="M12 2l2.4 7.4H22l-6 4.5 2.3 7.1-6.3-4.6L5.7 21l2.3-7.1-6-4.5h7.6z"/>',0)+'</span>'+
      '<div><div class="ist">1 coverage gap &middot; '+stale+' access items to review</div><div class="isd">'+
      'Only <b>1 person</b> (Linda Osei) can approve bills — if she\'s unavailable, pending bills <b>auto-finalize at day 10</b>. Grant a second teammate Approver access. '+
      '<b>Kevin Zhang</b> has no activity in 45 days — confirm he\'s still on the project or remove access.</div></div></div>';
  }
  function toggleAddRow(){var r=document.getElementById('addRow'); r.classList.toggle('hide'); if(!r.classList.contains('hide')){var n=document.getElementById('ntName'); if(n) n.focus();}}
  function addTeammate(){
    var n=(document.getElementById('ntName').value||'').trim();
    var role=(document.getElementById('ntRole').value||'').trim()||'Team member';
    var acc=document.getElementById('ntAccess').value;
    if(!n){toast('Enter a name to add a teammate');return;}
    var email=n.toLowerCase().replace(/[^a-z ]/g,'').split(/\s+/).map(function(w,i){return i===0?w[0]:w;}).join('')+'@mccarthy.com';
    TEAM.push({name:n,role:role,access:acc,email:email});
    document.getElementById('ntName').value='';document.getElementById('ntRole').value='';
    toggleAddRow(); renderTeam(); renderProfileInsights();
    toast(n+' added as '+acc+' — access logged');
  }
  function removeTeammate(i){var t=TEAM[i]; if(!t) return; TEAM.splice(i,1); renderTeam(); renderProfileInsights(); toast(t.name+' removed from the project');}
  function setAccess(i,val){var t=TEAM[i]; if(!t) return; t.access=val; if(t.permRec===val) delete t.permRec; renderTeam(); renderProfileInsights(); toast('Access for '+t.name+' set to '+val+' — logged');}

  /* ═══════════ CONTACT & SUPPORT ═══════════ */
  var TICKETS=[
    {id:'TKT-0891',cat:'Equipment issue',catTag:'ok',title:'Excavator ORD-3042 — hydraulic warning light',line:'May 14 — Inspected on site, sensor fault cleared. Equipment cleared for operation.',opened:'May 13',status:'Resolved',statusCls:'ok',color:'var(--success)',sla:'Resolved within SLA (24hr)',slaCls:'ok'},
    {id:'TKT-0887',cat:'Schedule change',catTag:'warn',title:'Scissor lift ORD-3031 — requested early off-rent',line:'May 12 — Change request received. Equipment team reviewing impact.',opened:'May 11',status:'Pending 02S review',statusCls:'warn',color:'var(--warning)',sla:'Response due May 14',slaCls:'warn'},
    {id:'TKT-0884',cat:'Billing',catTag:'info',title:'BILL-9012 dispute — idle-day overage',line:'May 12 — 02S placed a hold on finalization; awaiting your confirmation to proceed.',opened:'May 12',status:'Awaiting your reply',statusCls:'bad',color:'var(--red)',sla:'Your response needed',slaCls:'bad',awaitYou:true,rec:'BILL-9012'}
  ];
  function renderTickets(){
    var ns=CURRENT==='ns';
    document.getElementById('tktCount').textContent='· '+TICKETS.length+' open & recent';
    document.getElementById('ticketList').innerHTML=TICKETS.map(function(t){
      var sla = ns ? '<span class="tkt-sla '+t.slaCls+'">'+t.sla+'</span>' : '';
      var respond = (ns && t.awaitYou) ? '<div class="tkt-respond"><span>02S is holding for your confirmation</span><button class="btn btn-dark btn-sm" onclick="'+(t.rec?'jumpToBill(\''+t.rec+'\')':'toast(\'Opening '+t.id+'\')')+'">Respond</button></div>' : '';
      return '<div class="tkt'+(ns&&t.awaitYou?' hot':'')+'" style="border-left-color:'+t.color+'">'+
        '<div class="tkt-top"><span class="tkt-id">'+t.id+'</span><span class="tag '+t.catTag+'">'+t.cat+'</span><span class="tkt-status '+t.statusCls+'">'+t.status+'</span></div>'+
        '<div class="tkt-title">'+t.title+'</div>'+
        '<div class="tkt-line">'+t.line+'</div>'+
        '<div class="tkt-foot"><span class="tkt-opened">Opened '+t.opened+'</span>'+sla+'</div>'+
        respond+
      '</div>';
    }).join('');
  }
  function renderContactInsights(){
    var wrap=document.getElementById('contactInsights'); if(!wrap) return;
    if(CURRENT!=='ns'){wrap.classList.add('hide');return;}
    var awaiting=TICKETS.filter(function(t){return t.awaitYou;}).length;
    wrap.classList.remove('hide');
    wrap.innerHTML='<div class="ins-strip"><span class="isi">'+svg('<path d="M12 2l2.4 7.4H22l-6 4.5 2.3 7.1-6.3-4.6L5.7 21l2.3-7.1-6-4.5h7.6z"/>',0)+'</span>'+
      '<div><div class="ist">'+awaiting+' ticket awaiting your response &middot; 1 pending 02S review</div><div class="isd">02S is holding <b>BILL-9012</b> pending your confirmation (<b>TKT-0884</b>). Describe any new issue below and 02S routes it to the right team automatically — no need to pick a category.</div></div></div>';
  }
  // ── NS AI concierge intake ──
  var ASK=null;
  function detectRoute(t){
    t=(t||'').toLowerCase();
    if(/bill|invoice|charge|dispute|cost code|finaliz|overage|\$/.test(t)) return {cat:'Billing question',to:'02S Billing',contact:'Billing desk',rec:'BILL-9012'};
    if(/emergency|hazard|injur|stoppage|urgent|now|down|unsafe/.test(t)) return {cat:'Emergency',to:'Emergency hotline',contact:'(555) 911-02S',rec:''};
    if(/reschedul|push|delay|extend|cancel|move|month|week|off-rent|mob/.test(t)) return {cat:'Schedule change',to:'02S Equipment (YardHub)',contact:'Marcus Webb',rec:'EQ-114'};
    if(/won\S*t start|warning|malfunction|broke|damage|leak|fault|hydraulic|not working/.test(t)) return {cat:'Report issue',to:'02S Equipment (YardHub)',contact:'Marcus Webb',rec:'ORD-3042'};
    if(/status|where|track|when.*(arrive|deliver)|scissor|excavat|crane|telehandler/.test(t)) return {cat:'Track request',to:'02S Equipment (YardHub)',contact:'Marcus Webb',rec:'ORD-3031'};
    if(/prefab|headwall|submittal/.test(t)) return {cat:'Report issue',to:'02S Prefab',contact:'Prefab desk',rec:'ORD-3014'};
    return null;
  }
  function onAsk02S(){
    var box=document.getElementById('askRoute');
    var t=(document.getElementById('askBody').value||'');
    if(t.trim().length<10){ box.classList.add('hide'); ASK=null; return; }
    var r=detectRoute(t);
    if(!r){ box.classList.remove('hide'); box.className='askroute'; box.innerHTML='<span class="ar-i">'+svg('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',2)+'</span><div>02S will read this and route it to the right team when you send.</div>'; ASK={cat:'General question',to:'General 02S',contact:'02S support',rec:''}; return; }
    ASK=r;
    var urgent=r.cat==='Emergency';
    box.classList.remove('hide'); box.className='askroute'+(urgent?' urgent':'');
    box.innerHTML='<span class="ar-i">'+svg(urgent?'<path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 01-3.4 0"/>':'<path d="M12 2l2.4 7.4H22l-6 4.5 2.3 7.1-6.3-4.6L5.7 21l2.3-7.1-6-4.5h7.6z"/>',0)+'</span>'+
      '<div class="ar-body"><b>'+r.cat+'</b> &rarr; routing to <b>'+r.to+'</b> ('+r.contact+')'+(r.rec?' &middot; will attach <b>'+r.rec+'</b>':'')+(urgent?'. For a live hazard, call <b>(555) 911-02S</b> now.':'')+'</div>';
  }
  function askExample(txt){ var el=document.getElementById('askBody'); el.value=txt; onAsk02S(); el.focus(); }
  function askSend(){
    var t=(document.getElementById('askBody').value||'').trim();
    if(!t){toast('Describe your issue first');return;}
    var r=ASK||{cat:'General question',to:'General 02S',contact:'02S support',rec:''};
    var num=890+Math.floor(Math.random()*90);
    TICKETS.unshift({id:'TKT-0'+num,cat:r.cat==='General question'?'General':r.cat,catTag:r.cat==='Billing question'?'info':(r.cat==='Emergency'?'bad':(r.cat==='Schedule change'?'warn':'neu')),title:(t.length>62?t.slice(0,62)+'…':t),line:'Just now — routed to '+r.to+', 02S notified.',opened:'Today',status:'Open',statusCls:'info',color:'var(--info)',sla:'Response due in 4 business hrs',slaCls:'info',rec:r.rec});
    document.getElementById('askBody').value=''; document.getElementById('askRoute').classList.add('hide'); ASK=null;
    renderTickets();
    toast('Sent to '+r.to+' — routed as “'+r.cat+'”'+(r.rec?' · '+r.rec+' attached':''));
  }
  // ── V1 structured compose ──
  function sendMessage(){
    var subj=(document.getElementById('msgSubj').value||'').trim();
    var cat=document.getElementById('msgCat').value;
    var rec=document.getElementById('msgRec').value;
    var body=(document.getElementById('msgBody').value||'').trim();
    if(!body){toast('Write a message before sending');return;}
    TICKETS.unshift({id:'TKT-0'+(890+Math.floor(Math.random()*90)),cat:cat==='General question'?'General':cat,catTag:cat==='Billing question'?'info':(cat==='Report issue'?'warn':'neu'),title:subj||body.slice(0,60),line:'Just now — submitted, 02S notified by email.',opened:'Today',status:'Open',statusCls:'info',color:'var(--info)',sla:'Response due in 4 business hrs',slaCls:'info',rec:rec||''});
    document.getElementById('msgSubj').value=''; document.getElementById('msgBody').value=''; document.getElementById('msgRec').value='';
    renderTickets();
    toast('Message sent to 02S — typically answered within 4 business hours');
  }
  // ── quick actions: each launches a real flow ──
  var ACTIVE_EQUIP=[
    {id:'ORD-3042',label:'Excavator 20T'},
    {id:'ORD-3038',label:'Hydraulic Crane 40T'},
    {id:'ORD-3031',label:'Scissor Lift ×2'},
    {id:'ORD-3029',label:'Telehandler 10K'},
    {id:'ORD-3021',label:'Light Tower ×4'}
  ];
  function equipOptions(sel){return ACTIVE_EQUIP.map(function(e){return '<option value="'+e.id+'"'+(e.id===sel?' selected':'')+'>'+e.label+' · '+e.id+'</option>';}).join('');}
  function equipLabel(id){for(var i=0;i<ACTIVE_EQUIP.length;i++){if(ACTIVE_EQUIP[i].id===id)return ACTIVE_EQUIP[i].label;}return id;}
  function openModal(title,html){document.getElementById('modalTitle').innerHTML=title;document.getElementById('modalBody').innerHTML=html;document.getElementById('modal').classList.remove('hide');}
  function closeModal(){document.getElementById('modal').classList.add('hide');}
  function quickAction(cat){
    if(cat==='Billing question'){ go('billing'); toast('Billing & budget — review or dispute a charge here'); return; }
    if(cat==='Track request'){ go('orders'); toast('Orders — track the status of every request'); return; }
    if(cat==='Emergency'){ openEmergency(); return; }
    if(cat==='Contact coordinator'){ openCoordinator(); return; }
    if(cat==='Schedule change'){ openSchedule(); return; }
    if(cat==='Report issue'){ openIssue(); return; }
  }
  // Schedule change — structured request (NS pre-fills a smart suggestion)
  function openShipToModal(){
    openModal('Add ship-to location',
      '<div class="mform">'
      +'<div class="mf"><label>Delivery address</label><input class="rin" id="shipAddr" placeholder="Street address, city, state"></div>'
      +'<div class="mf"><label>Site contact</label><input class="rin" id="shipContact" placeholder="Name and phone"></div>'
      +'</div>'
      +'<div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button>'
      +'<button class="btn btn-dark" onclick="var a=(document.getElementById(\'shipAddr\')||{}).value;if(!a||!a.trim()){toast(\'Enter an address\');return;}closeModal();toast(\'Ship-to location saved — 02S notified\')">Save</button></div>'
    );
  }
  function openSchedule(){
    var ns=CURRENT==='ns';
    var sugg = ns ? '<div class="msg-sugg"><span class="ms-i">'+svg('<path d="M12 2l2.4 7.4H22l-6 4.5 2.3 7.1-6.3-4.6L5.7 21l2.3-7.1-6-4.5h7.6z"/>',0)+'</span><div><b>02S suggests</b> — your 2× Scissor Lift (ORD-3031) have sat idle 4 days. An early off-rent recovers ~$740. <button class="linkbtn" onclick="schedUse()">Use this</button></div></div>' : '';
    openModal('Request a schedule change',
      sugg+
      '<div class="mform">'+
      '<div class="mf"><label>Equipment</label><select id="schEquip" class="acc-sel wfull">'+equipOptions(ns?'ORD-3031':'')+'</select></div>'+
      '<div class="mf"><label>Change type</label><select id="schType" class="acc-sel wfull"><option>Reschedule delivery</option><option>Extend rental</option><option>Early off-rent / return</option><option>Cancel</option></select></div>'+
      '<div class="mf"><label>New date <span class="opt">if rescheduling or extending</span></label><input id="schDate" type="date" class="rin" /></div>'+
      '<div class="mf"><label>Reason</label><textarea id="schReason" class="ctext" style="min-height:66px" placeholder="Briefly, why the change…"></textarea></div>'+
      '</div>'+
      '<div class="modal-foot"><span class="cnote">'+svg('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/>',2)+'Routes to 02S Equipment · YardHub reviews impact.</span><button class="btn btn-red" onclick="submitSchedule()">Submit request</button></div>');
  }
  function schedUse(){var e=document.getElementById('schEquip'); if(e) e.value='ORD-3031'; var t=document.getElementById('schType'); if(t) t.value='Early off-rent / return';}
  function submitSchedule(){
    var eq=equipLabel(document.getElementById('schEquip').value);
    var ty=document.getElementById('schType').value;
    var ns=CURRENT==='ns';
    TICKETS.unshift({id:'TKT-0'+(890+Math.floor(Math.random()*90)),cat:'Schedule change',catTag:'warn',title:ty+' — '+eq,line:'Just now — submitted to 02S Equipment, YardHub reviewing impact.',opened:'Today',status:'Pending 02S review',statusCls:'warn',color:'var(--warning)',sla:'Response due in 1 business day',slaCls:'warn'});
    closeModal(); renderTickets();
    toast('Schedule change submitted for '+eq+' — YardHub reviewing');
  }
  // Report an issue — structured report
  function openIssue(){
    openModal('Report an equipment issue',
      '<div class="mform">'+
      '<div class="mf"><label>Equipment</label><select id="isEquip" class="acc-sel wfull">'+equipOptions('')+'</select></div>'+
      '<div class="mf"><label>Issue type</label><select id="isType" class="acc-sel wfull"><option>Won\'t start</option><option>Physical damage</option><option>Malfunction / fault</option><option>Safety concern</option><option>Other</option></select></div>'+
      '<div class="mf"><label>Severity</label><div class="seg" id="isSev"><button class="seg-b on" onclick="segPick(this,\'Low\')">Low</button><button class="seg-b" onclick="segPick(this,\'Medium\')">Medium</button><button class="seg-b" onclick="segPick(this,\'Stops work\')">Stops work</button></div></div>'+
      '<div class="mf"><label>Description</label><textarea id="isDesc" class="ctext" style="min-height:66px" placeholder="What\'s happening, and where on site…"></textarea></div>'+
      '<div class="mf"><button class="btn btn-ghost btn-sm" onclick="toast(\'Photo upload — attach specs or images\')">'+svg('<path d="M21 15l-5-5L5 21M13 7h.01M3 5h18v14H3z"/>',2)+'Attach photo</button></div>'+
      '<div id="isNote"></div>'+
      '</div>'+
      '<div class="modal-foot"><span class="cnote">'+svg('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/>',2)+'Routes to your Equipment coordinator, Marcus Webb.</span><button class="btn btn-red" onclick="submitIssue()">Submit issue</button></div>');
  }
  var isSev='Low';
  function segPick(btn,val){isSev=val;var p=btn.parentNode.querySelectorAll('.seg-b');for(var i=0;i<p.length;i++)p[i].classList.remove('on');btn.classList.add('on');var note=document.getElementById('isNote');if(note)note.innerHTML=(val==='Stops work')?'<div class="mf-warn">'+svg('<path d="M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L14.7 3.9a2 2 0 00-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',2)+'For a live safety hazard or work stoppage, call <b>(555) 911-02S</b> now.</div>':'';}
  function submitIssue(){
    var eq=equipLabel(document.getElementById('isEquip').value);
    var ty=document.getElementById('isType').value;
    var sevBad=isSev==='Stops work';
    TICKETS.unshift({id:'TKT-0'+(890+Math.floor(Math.random()*90)),cat:'Equipment issue',catTag:sevBad?'bad':'warn',title:eq+' — '+ty,line:'Just now — reported to Marcus Webb ('+isSev+' severity). Coordinator notified.',opened:'Today',status:sevBad?'Escalated':'Open',statusCls:sevBad?'bad':'info',color:sevBad?'var(--red)':'var(--info)',sla:sevBad?'4-hour on-site response':'Response due in 4 business hrs',slaCls:sevBad?'bad':'info'});
    isSev='Low'; closeModal(); renderTickets();
    toast('Issue reported for '+eq+' — routed to your coordinator');
  }
  // Emergency
  function openEmergency(){
    openModal('Equipment emergency',
      '<div class="emg"><div class="emg-lead">For a safety hazard or work stoppage, call the 02S emergency line now.</div>'+
      '<a class="emg-num">(555) 911-02S</a>'+
      '<div class="emg-sub">Answered 24 / 7 / 365 · 4-hour on-site response guaranteed</div>'+
      '<div class="modal-foot" style="border:none;padding-top:6px"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-red" onclick="toast(\'Connecting to (555) 911-02S…\')">'+svg('<path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013 5.18 2 2 0 015 3h3a2 2 0 012 1.72c.13.98.36 1.94.7 2.86a2 2 0 01-.45 2.11L9 11a16 16 0 006 6l1.31-1.25a2 2 0 012.11-.45c.92.34 1.88.57 2.86.7A2 2 0 0122 16.92z"/>',2)+'Call now</button></div></div>');
  }
  // Contact coordinator
  function openCoordinator(){
    openModal('Your Equipment coordinator',
      '<div class="coord"><div class="coord-top"><span class="avi lg">MW</span><div><div class="coord-n">Marcus Webb</div><div class="coord-r">Equipment Coordinator — Southern Region</div></div></div>'+
      '<div class="coord-rows"><div class="coord-row"><span>Direct</span><b>(555) 482-3190</b></div><div class="coord-row"><span>Email</span><b>m.webb@mccarthy.com</b></div><div class="coord-row"><span>Hours</span><b>Mon–Fri 6AM–6PM CT</b></div></div>'+
      '<div class="modal-foot" style="border:none"><button class="btn btn-ghost" onclick="toast(\'Emailing Marcus Webb…\')">Email</button><button class="btn btn-dark" onclick="toast(\'Calling (555) 482-3190…\')">'+svg('<path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013 5.18 2 2 0 015 3h3a2 2 0 012 1.72c.13.98.36 1.94.7 2.86a2 2 0 01-.45 2.11L9 11a16 16 0 006 6l1.31-1.25a2 2 0 012.11-.45c.92.34 1.88.57 2.86.7A2 2 0 0122 16.92z"/>',2)+'Call</button></div></div>');
  }
  function sendFeedback(){
    var b=(document.getElementById('fbBody').value||'').trim();
    if(!b){toast('Write feedback before sending');return;}
    document.getElementById('fbBody').value='';
    toast('Feedback sent to 02S — thank you');
  }
  function jumpToBill(id){ go('billing'); toast('Opening '+id+' in Billing & budget'); }

  function openBillDiscuss(id){
    openModal('Billing discussion — '+id,
      '<div style="font-size:12px;color:var(--g600);margin-bottom:12px">Thread with 02S billing desk regarding '+id+'. Replies appear here and are sent to <b>o2s-billing@mccarthy.com</b>.</div>'
      +'<div style="border:1px solid var(--g200);border-radius:6px;padding:10px 12px;margin-bottom:12px;background:var(--g50)">'
      +'<div style="font-size:11px;color:var(--g500);margin-bottom:6px">02S Billing · 2 days ago</div>'
      +'<div style="font-size:12.5px;color:var(--g800)">Hi — we\'ve received your bill. Please note this covers the full on-rent window including the 3-day buffer per contract § 4.2. Let us know if you have questions.</div>'
      +'</div>'
      +'<div class="mf"><label>Reply</label><textarea class="rin" rows="3" id="billDiscussReply" placeholder="Type your message…" style="width:100%"></textarea></div>'
      +'<div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal()">Close</button><button class="btn btn-red" onclick="var v=(document.getElementById(\'billDiscussReply\')||{}).value;if(!v||!v.trim()){toast(\'Enter a message first\');return;}closeModal();toast(\'Message sent to 02S billing desk · you will be notified of a reply\')">Send</button></div>'
    );
  }

  function openEorAction(ordId, changeType){
    var ns = CURRENT === 'ns';
    var sugg = ns ? '<div class="msg-sugg"><span class="ms-i">'+svg('<path d="M12 2l2.4 7.4H22l-6 4.5 2.3 7.1-6.3-4.6L5.7 21l2.3-7.1-6-4.5h7.6z"/>',0)+'</span><div><b>02S suggests</b> — ending this rental early recovers ~$740 this cycle.</div></div>' : '';
    openModal('Request a schedule change — ' + ordId,
      sugg +
      '<div class="mform">'
      +'<div class="mf"><label>Equipment</label><select id="eorEquip" class="acc-sel wfull">'+equipOptions(ordId)+'</select></div>'
      +'<div class="mf"><label>Change type</label><select id="eorType" class="acc-sel wfull"><option'+(changeType==='Extend rental'?' selected':'')+'>Extend rental</option><option'+(changeType==='Early off-rent / return'?' selected':'')+'>Early off-rent / return</option><option>Reschedule delivery</option><option>Cancel</option></select></div>'
      +'<div class="mf"><label>New date <span class="opt">if extending</span></label><input id="eorDate" type="date" class="rin" /></div>'
      +'<div class="mf"><label>Notes <span class="opt">optional</span></label><textarea id="eorNotes" class="ctext" style="min-height:54px" placeholder="Any additional context…"></textarea></div>'
      +'</div>'
      +'<div class="modal-foot"><span class="cnote">'+svg('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/>',2)+'Routes to 02S Equipment · YardHub reviews impact.</span>'
      +'<button class="btn btn-red" onclick="var eq=equipLabel(document.getElementById(\'eorEquip\').value);var ty=document.getElementById(\'eorType\').value;closeModal();toast(ty+\' submitted for \'+eq+\' — 02S notified\')">Submit request</button></div>'
    );
  }

  function openDocChip(name){
    window._docName = name;
    openModal(name,
      '<div style="display:flex;align-items:center;gap:10px;padding:14px;background:var(--g50);border:1px solid var(--g200);border-radius:6px;margin-bottom:14px">'
      +'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:28px;height:28px;flex-shrink:0;color:var(--info)"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>'
      +'<div><div style="font-size:13px;font-weight:600;color:var(--g900)">'+name+'</div><div style="font-size:11.5px;color:var(--g500);margin-top:2px">Attached to this order · provided by 02S</div></div>'
      +'</div>'
      +'<div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal()">Close</button>'
      +'<button class="btn btn-dark" onclick="closeModal();toast(\'Downloading \' + window._docName + \' — check your downloads folder\')">Download</button></div>'
    );
  }

  function openSetEscalation(btn){
    var role = btn.getAttribute('data-role');
    var isSet = btn.getAttribute('data-isset') === '1';
    openModal((isSet ? 'Change' : 'Set') + ' escalation contact — ' + role,
      '<div class="mform">'
      +'<div class="mf"><label>Full name</label><input class="rin" id="escName" placeholder="e.g. Jane Smith" /></div>'
      +'<div class="mf"><label>Phone</label><input class="rin" id="escPhone" type="tel" placeholder="(555) 000-0000" /></div>'
      +'</div>'
      +'<div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button>'
      +'<button class="btn btn-dark" onclick="var n=(document.getElementById(\'escName\')||{}).value;var p=(document.getElementById(\'escPhone\')||{}).value;if(!n.trim()){toast(\'Enter a name\');return;}closeModal();toast(\'Escalation contact updated — 02S notified\')">Save</button></div>'
    );
  }

  function openRolesModal(){
    openModal('View as role',
      '<div style="font-size:13px;color:var(--g600);margin-bottom:14px">Switch the portal view to see exactly what each team member sees.</div>'
      +'<div class="mform">'
      +'<div class="mf">'
      +'<label>Current role</label>'
      +'<select class="acc-sel wfull" id="rolePickSel">'
      +'<option value="Admin" selected>Admin — Sarah Chen</option>'
      +'<option value="Approver">Approver — Linda Osei</option>'
      +'<option value="Editor">Editor — Dan Reyes</option>'
      +'<option value="View only">View only — Tom Bradley</option>'
      +'</select>'
      +'</div>'
      +'</div>'
      +'<div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button>'
      +'<button class="btn btn-dark" onclick="var v=(document.getElementById(\'rolePickSel\')||{}).value;closeModal();toast(\'Viewing as \'+v+\' — some actions may be restricted\')">Apply</button></div>'
    );
  }


  /* ═══════════ COMMAND CENTER ═══════════ */
  var ccActive=null;
  var CC_KEYS=['ccdash','fulfill','gap','anomaly','margin','fleet','dpequip','dplog','dpsvc','dpproc','dpprefab'];
  function ccSyncToggle(){ var ns=CURRENT==='ns'; var b1=document.getElementById('ccBtnV1'); if(!b1)return; b1.classList.toggle('on',!ns); var b2=document.getElementById('ccBtnNS'); if(b2)b2.classList.toggle('on',ns); var cv=document.getElementById('ccVerChip'); if(cv)cv.innerHTML= ns?'North Star &mdash; vision':'V1 &mdash; standard'; var fn=document.getElementById('ccnav-fleet'); if(fn)fn.style.display=ns?'':'none'; if(!ns&&ccActive==='fleet'){ccGo('ccdash');} }
  function ccGo(s){
    CC_KEYS.forEach(function(k){ var sc=document.getElementById('ccscreen-'+k); if(sc)sc.classList.toggle('active',k===s); var nv=document.getElementById('ccnav-'+k); if(nv)nv.classList.toggle('active',k===s); });
    ccActive=s; renderCcScreen(s); window.scrollTo(0,0);
  }
  function renderCcScreen(s){ if(s==='ccdash'){ renderCcDash(); } else if(s==='fulfill'){ renderFulfill(); } else if(s==='gap'){ renderGap(); } else if(s==='anomaly'){ renderAnomaly(); } else if(s==='margin'){ renderMargin(); } else if(s==='dpequip'){ renderCcDemand('equipment'); } else if(s==='dplog'){ renderCcDemand('logistics'); } else if(s==='dpsvc'){ renderCcDemand('profservices'); } else if(s==='dpproc'){ renderCcDemand('procurement'); } else if(s==='dpprefab'){ renderCcDemand('prefab'); } else if(s==='fleet'){ renderFleet(); } else { ccStub(s); } }
  var CC_STUBS={
    fulfill:{t:'Fulfillment queue',d:'Every incoming request across all projects \u2014 acknowledge, price, and allocate \u2014 with the owned-vs-re-rent optimizer. Portal orders and pending-pricing lines land here. Coming next in this build.'},
    fleet:{t:'Fleet & asset lifecycle',d:'The owned-asset pool: status, utilization, and the replacement engine (age, hours, condition, depreciation \u2192 replace/retire). Recert returns surface here as idle-to-redeploy. Coming next in this build.'},
    gap:{t:'Demand\u2013supply gap & CapEx plan',d:'Aggregated portfolio demand vs owned-fleet capacity \u2014 the gap \u2014 and the CapEx plan it drives. Coming next in this build.'},
    anomaly:{t:'Billing anomaly detection',d:'Anomalies across every project: idle-but-billing, rate mismatches, AR/AP spread errors, double-billing. Ties back to the Portal\u2019s billing flags. Coming next in this build.'},
    margin:{t:'02S project margin plan',d:'Margin by project and pillar \u2014 02S rate revenue vs owned + re-rent + services cost \u2014 plan vs actual. Coming next in this build.'}
  };
  function ccStub(s){
    var mount=document.getElementById('cc'+s.charAt(0).toUpperCase()+s.slice(1)); if(!mount)return;
    var c=CC_STUBS[s]||{t:'Section',d:''};
    mount.innerHTML='<div class="phead"><div><h1>'+c.t+'</h1><div class="meta"><span class="chip">'+svg(IC.chart)+'All projects \u00b7 portfolio</span><span class="chip ver">'+(CURRENT==='ns'?'North Star':'V1 \u2014 standard')+'</span></div></div></div><div class="cc-stub">'+svg('<path d="M14.7 6.3a4 4 0 00-5.4 5.4l-6.4 6.4a2.12 2.12 0 003 3l6.4-6.4a4 4 0 005.4-5.4l-2.6 2.6-2.6-.7-.7-2.6 2.5-2.6z"/>')+'<h3>Building this next</h3><p>'+c.d+'</p></div>';
  }
  function renderCcDash(){
    var mount=document.getElementById('ccDash'); if(!mount)return;
    var ns=CURRENT==='ns';
    var SPARK='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6 4.5 2.3 7.1L12 16.9 5.3 21l2.3-7.1-6-4.5h7.6z"/></svg>';
    var ICO_SWAP='<path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 014-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 01-4 4H3"/>';
    var ICO_TAX='<path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><path d="M7 7h.01"/>';
    var h='';
    var rc=(typeof recertItems==='function')?recertItems():[]; var rn=rc.length; var ret=0;
    for(var ri=0;ri<rc.length;ri++){ if(rc[ri].nsReco&&rc[ri].nsReco.rec==='return')ret++; } var kp=rn-ret;
    if(rn){
      var shield='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>';
      var bT, bS;
      if(ns){ bT='On-rent recertification \u2014 '+rn+' items auto-renew Fri Jul 25 unless you act'; bS='02S pre-checked '+kp+' as still needed; flags '+ret+' (idle scissor lift) to return \u2014 recovers $3.8K/mo'; }
      else { bT=rn+' on-rent items due for recertification (Jul 21\u201325)'; bS='Confirm what\u2019s still on rent \u2014 unconfirmed items auto-renew Friday'; }
      h+='<div class="rc-banner">'+shield+'<div class="rcb-t"><b>'+bT+'</b><span>'+bS+'</span></div><button class="btn '+(ns?'btn-red':'btn-dark')+' btn-sm" onclick="openRecert()">Review &amp; certify</button></div>';
    }
    var mgR=(typeof mgAtRisk==='function')?mgAtRisk():{t:27200,n:11};
    var mgP=(typeof mgPortfolioRoll==='function')?mgPortfolioRoll():{act:{pct:0}};
    var openReq=(typeof FQ!=='undefined'&&FQ.length)?FQ.length:20;
    var kpis=[
      {k:'Open requests',v:String(openReq),sub:'5 awaiting pricing',tone:'warn',icon:IC.cart,to:'fulfill'},
      {k:'Owned vs re-rent',v:'3',sub:'decisions due',tone:'warn',icon:ICO_SWAP,to:'fulfill'},
      {k:'Demand\u2013supply gap',v:'\u22127',sub:'peak \u00b7 October',tone:'bad',icon:IC.chart,to:'gap'},
      {k:'Idle fleet',v:'$142K/mo',sub:'9 units idle',tone:'bad',icon:IC.warn,to:'fleet'},
      {k:'Billing at risk',v:kfmt(mgR.t)+'/mo',sub:mgR.n+' open anomalies',tone:'bad',icon:IC.warn,to:'anomaly'},
      {k:'Project margin',v:mgP.act.pct.toFixed(1)+'%',sub:'target 15%',tone:mgP.act.pct>=15?'ok':'warn',icon:IC.dollar,to:'margin'}
    ];
    var acts=[
      {t:'REQ-4479 needs taxonomy confirmation',s:'2\u00d7 excavator \u2014 unmapped equipment class',tag:{l:'Needs map',tone:'warn'},to:'fulfill',reco:'02S mapped it to Excavator \u203a 50-ton (94% confidence) \u2014 confirm to release for pricing & allocation',icon:ICO_TAX},
      {t:'5 requests awaiting pricing',s:'2 are pending-pricing lines from Hercules demand plans',tag:{l:'Pending pricing',tone:'warn'},to:'fulfill',reco:'Auto-price 3 from the 02S catalog; 2 need admin review',icon:IC.cart},
      {t:'Riverside \u2014 5\u00d7 tower crane request',s:'needs an owned vs re-rent decision',tag:{l:'Decision',tone:'info'},to:'fulfill',reco:'Optimizer: 2 owned + 3 re-rent \u2014 19% margin (~$34K/mo)',icon:IC.crane},
      {t:'TC-0012 past replacement threshold',s:'11,800 hrs \u00b7 9 yrs \u00b7 rising maintenance cost',tag:{l:'Replace',tone:'bad'},to:'fleet',reco:'Add to Q3 CapEx plan \u2014 est. $1.2M replacement',icon:IC.box},
      {t:'Idle-but-billing \u2014 scissor lift',s:'Hercules \u00b7 $3.8K/mo \u00b7 BILL-9012 \u00b7 1 of 11 open anomalies ($27.2K/mo at risk)',tag:{l:'Anomaly',tone:'bad'},to:'anomaly',reco:'Call-off drafted \u2014 auto-applies in 2 days unless you hold \u00b7 recovers $3.8K/mo',icon:IC.warn},
      {t:'Excavator shortfall projected \u2014 October',s:'portfolio demand exceeds owned fleet by 3 units',tag:{l:'Gap',tone:'warn'},to:'gap',reco:'Buy 2 (19-mo payback) or pre-position idle units \u2014 both in the ranked buy list',icon:IC.chart}
    ];
    h+='<div class="phead"><div><h1>Operations dashboard</h1><div class="meta"><span class="chip">'+svg(IC.chart)+'All projects \u00b7 portfolio</span><span class="chip ver">'+(ns?'North Star':'V1 \u2014 standard')+'</span></div></div></div>';
    h+='<div class="vitals" style="grid-template-columns:repeat(6,1fr)">';
    kpis.forEach(function(k){ h+='<div class="vital clk '+k.tone+'" onclick="ccGo(\''+k.to+'\')"><div class="vk">'+svg(k.icon)+k.k+'</div><div class="vv">'+k.v+'</div><div class="vsub">'+k.sub+'</div><span class="vchev">'+svg('<path d="M9 18l6-6-6-6"/>')+'</span></div>'; });
    h+='</div>';
    if(ns){ h+='<div class="ins-strip"><span class="isi">'+SPARK+'</span><div><div class="ist">02S</div><div class="isd">3 idle excavators at Southern Yard can cover 2 open October requests (Hercules, Riverside). Redeploying instead of re-renting saves ~$96K this quarter and lifts utilization to 86%.</div></div></div>'; }
    h+='<div class="cc-lower">';
    h+='<div class="cc-queue"><div class="cc-qhead">'+(ns?SPARK:svg('<path d="M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L14.7 3.9a2 2 0 00-3.4 0z"/><path d="M12 9v4M12 17h.01"/>'))+(ns?'02S \u2014 recommended actions':'Needs you \u2014 across all projects')+'</div>';
    acts.forEach(function(a){
      h+='<div class="cc-act" onclick="ccGo(\''+a.to+'\')"><div class="cc-ai">'+svg(a.icon)+'</div><div class="cc-ab"><div class="cc-at">'+a.t+'</div><div class="cc-as">'+a.s+'</div>'+((ns&&a.reco)?'<div class="cc-reco">'+SPARK+a.reco+'</div>':'')+'</div><span class="tag '+a.tag.tone+'">'+a.tag.l+'</span><span class="cc-chev">'+svg('<path d="M9 18l6-6-6-6"/>')+'</span></div>';
    });
    h+='</div>';
    var qlinks=[
      {l:'Fulfillment queue',to:'fulfill',icon:IC.cart},
      {l:'Billing &amp; anomalies',to:'anomaly',icon:IC.warn}
    ];
    h+='<div class="cc-quick"><div class="cc-qhead">'+svg('<path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>')+'Quick links</div>';
    qlinks.forEach(function(q){ h+='<div class="cc-qlink" onclick="ccGo(\''+q.to+'\')"><span>'+svg(q.icon)+'</span><span class="qll">'+q.l+'</span><button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();ccGo(\''+q.to+'\')">Open</button></div>'; });
    h+='</div>';
    h+='</div>';
    mount.innerHTML=h;
  }

  /* ═══════════ FULFILLMENT QUEUE + OPTIMIZER ═══════════ */
  var CC_SPARK='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6 4.5 2.3 7.1L12 16.9 5.3 21l2.3-7.1-6-4.5h7.6z"/></svg>';
  var FQ_TONE={'New':'neu','Requested':'neu','Awaiting pricing':'warn','Acknowledged':'info','Allocated':'ok','Fulfilled':'ok','Scheduled':'info','At-risk':'bad','PO issued':'ok','Submittal':'info','In fabrication':'info','Delivered':'ok'};
  var FQ_DONE=['Allocated','Acknowledged','PO issued','Delivered','In fabrication','Scheduled','Fulfilled'];
  function scissorUnits(){ var y=['South Yard','Central Yard','North Yard','West Yard']; var a=[]; for(var i=1;i<=8;i++){ a.push({id:'SL-33'+(i<10?'0':'')+i,yard:y[i%4]}); } return a; }
  var FQ=[
    {id:'fq1',ref:'REQ-4471',pillar:'equipment',item:'Tower crane (self-erect)',qty:5,project:'Riverside Medical Center',needby:'Aug 20',code:'Hoisting',kind:'equip',status:'New',o2sRate:35000,ownedCost:22500,avail:[{id:'TC-0012',yard:'Southern Yard'},{id:'TC-0018',yard:'Central Yard'}],reRentRate:32000,vendor:'ALL Crane',reco:2},
    {id:'fq2',ref:'REQ-4472',pillar:'equipment',item:'Excavator, 45K class',qty:4,project:'Cimarron Data Center',needby:'Sep 5',code:'02-320',kind:'equip',status:'New',o2sRate:12000,ownedCost:7000,avail:[{id:'EX-2201',yard:'North Yard'}],reRentRate:9500,vendor:'Sunbelt',reco:1},
    {id:'fq3',ref:'REQ-4473',pillar:'equipment',item:'Crawler crane, 230T',qty:1,project:'Hercules Solar + BESS',needby:'Oct 1',code:'26-330',kind:'equip',status:'New',o2sRate:68000,ownedCost:0,avail:[],reRentRate:58000,vendor:'Maxim Crane',reco:0},
    {id:'fq4',ref:'REQ-4474',pillar:'equipment',item:'Scissor lift, 32 ft',qty:12,project:'Riverside Medical Center',needby:'Aug 12',code:'01-100',kind:'equip',status:'New',o2sRate:950,ownedCost:400,avail:scissorUnits(),reRentRate:700,vendor:'United Rentals',reco:8},
    {id:'fq9',ref:'REQ-4479',pillar:'equipment',item:'Excavator, 50-ton',qty:2,project:'Cimarron Data Center',needby:'Sep 12',code:'02-320',kind:'equip',status:'New',o2sRate:14000,ownedCost:8000,avail:[{id:'EX-2205',yard:'North Yard'},{id:'EX-2208',yard:'South Yard'}],reRentRate:11000,vendor:'United Rentals',reco:2},
    {id:'fqL1',ref:'REQ-L-3042',pillar:'logistics',item:'Excavator delivery + haul (oversize)',qty:'1 move',project:'Cimarron Data Center',needby:'Sep 3',code:'01-500',kind:'flow',status:'Scheduled',doneNote:'Self-perform \u00b7 crew + trailer'},
    {id:'fqL2',ref:'REQ-L-3054',pillar:'logistics',item:'Tower crane mobilization (crane pick)',qty:'1 move',project:'Riverside Medical Center',needby:'Aug 18',code:'01-500',kind:'flow',status:'Scheduled',doneNote:'3PL \u00b7 Bragg Crane'},
    {id:'fqL3',ref:'REQ-L-3061',pillar:'logistics',item:'BESS container placement (haul + crane)',qty:'6 moves',project:'Hercules Solar + BESS',needby:'Oct 20',code:'01-500',kind:'flow',status:'Requested',actLabel:'Schedule move',nextStatus:'Scheduled',hint:'Self-perform available \u2014 crew + crane free that week'},
    {id:'fq5',ref:'REQ-4475',pillar:'services',item:'VDC / BIM coordination',qty:'3 FTE',project:'Hercules Solar + BESS',needby:'Apr 2026',code:'01-100',kind:'pending',status:'Awaiting pricing',suggest:'$26,000/mo (rate card)'},
    {id:'fq7',ref:'REQ-4477',pillar:'services',item:'Site survey crew',qty:'2 FTE',project:'Cimarron Data Center',needby:'Jul 28',code:'01-100',kind:'service',status:'New'},
    {id:'fqS1',ref:'REQ-S-2101',pillar:'services',item:'Owner\u2019s engineer / IE support',qty:'2 FTE',project:'Hercules Solar + BESS',needby:'ongoing',code:'01-100',kind:'service',status:'Acknowledged'},
    {id:'fqS2',ref:'REQ-S-2108',pillar:'services',item:'BESS commissioning agent',qty:'2 FTE',project:'Hercules Solar + BESS',needby:'Nov 2026',code:'26-330',kind:'pending',status:'Awaiting pricing',suggest:'Quote \u2014 specialty commissioning'},
    {id:'fqS3',ref:'REQ-S-2114',pillar:'services',item:'Structural special inspection',qty:'2 FTE',project:'Riverside Medical Center',needby:'Aug 2026',code:'01-100',kind:'service',status:'New'},
    {id:'fqP1',ref:'REQ-P-0501',pillar:'procurement',item:'MV switchgear \u00b7 15kV lineup',qty:2,project:'Hercules Solar + BESS',needby:'Nov 2026',code:'26-100',kind:'flow',status:'At-risk',actLabel:'Release PO',nextStatus:'PO issued',hint:'Order-by passed \u2014 release now to recover the substation date'},
    {id:'fqP2',ref:'REQ-P-0508',pillar:'procurement',item:'BESS containers \u00b7 2.5 MWh',qty:6,project:'Hercules Solar + BESS',needby:'Nov 2026',code:'26-330',kind:'flow',status:'At-risk',actLabel:'Release PO',nextStatus:'PO issued',hint:'Order-by passed \u2014 release to hold November energization'},
    {id:'fqP3',ref:'REQ-P-0512',pillar:'procurement',item:'Main power transformer',qty:1,project:'Hercules Solar + BESS',needby:'Dec 2026',code:'26-100',kind:'flow',status:'PO issued',doneNote:'28 wk lead \u00b7 on order'},
    {id:'fqF1',ref:'REQ-F-021',pillar:'prefab',item:'Prefab pipe rack modules',qty:12,project:'Hercules Solar + BESS',needby:'Aug 2026',code:'26-540',kind:'flow',status:'In fabrication',doneNote:'Pipe rack \u00b7 shop slot held'},
    {id:'fqF2',ref:'REQ-F-034',pillar:'prefab',item:'Modular e-houses (BESS)',qty:2,project:'Hercules Solar + BESS',needby:'Oct 2026',code:'26-540',kind:'flow',status:'Submittal',actLabel:'Approve submittal',nextStatus:'In fabrication',hint:'Approve this week to protect November energization'},
    {id:'fqF3',ref:'REQ-F-041',pillar:'prefab',item:'L2 headwall assemblies',qty:8,project:'Riverside Medical Center',needby:'Jul 2026',code:'26-540',kind:'flow',status:'Delivered',doneNote:'On site'},
    {id:'fq6',ref:'REQ-4476',pillar:'prefab',item:'Prefab cable tray runs',qty:'lot',project:'Hercules Solar + BESS',needby:'Aug 1',code:'26-540',kind:'pending',status:'Awaiting pricing',suggest:'Quote \u2014 route to prefab shop'}
  ];
  var fqCurId=null, fqPickOwned=0; var ccHighlight=null;
  var fqFP='all', fqFPr='all', fqFS='all';
  function fqIsDone(r){ return FQ_DONE.indexOf(r.status)>=0; }
  function fqVisible(r){ if(fqFP!=='all'&&r.pillar!==fqFP)return false; if(fqFPr!=='all'&&r.project!==fqFPr)return false; if(fqFS==='open'&&fqIsDone(r))return false; if(fqFS==='done'&&!fqIsDone(r))return false; return true; }
  function fqSetFilter(k,v){ if(k==='p')fqFP=v; else if(k==='pr')fqFPr=v; else if(k==='s')fqFS=v; renderFulfill(); }
  function fqClearFilters(){ fqFP='all'; fqFPr='all'; fqFS='all'; renderFulfill(); }
  function fqAdvance(id){ var r=fqById(id); if(!r)return; if(r.nextStatus)r.status=r.nextStatus; renderFulfill(); toast(r.item+' \u2014 '+r.status.toLowerCase()); }
  function fqById(id){ for(var i=0;i<FQ.length;i++){ if(FQ[i].id===id)return FQ[i]; } return null; }
  function fqCompute(r,owned){ var q=r.qty; var maxOwned=Math.min(r.avail.length,q); owned=Math.max(0,Math.min(owned,maxOwned)); var rerent=q-owned; var ar=q*r.o2sRate; var oc=owned*r.ownedCost; var rc=rerent*r.reRentRate; var margin=ar-oc-rc; var pct=ar?(margin/ar*100):0; return {owned:owned,rerent:rerent,maxOwned:maxOwned,ar:ar,oc:oc,rc:rc,margin:margin,pct:pct}; }
  function fqMarginPct(r){ return fqCompute(r,r.reco).pct.toFixed(0); }
  function renderFulfill(){
    var mount=gel('ccFulfill'); if(!mount)return; var ns=CURRENT==='ns';
    var hlRef=ccHighlight; ccHighlight=null;
    var openN=0,awaitN=0,readyN=0; FQ.forEach(function(r){ if(!fqIsDone(r))openN++; if(r.status==='Awaiting pricing')awaitN++; if(r.kind==='equip'&&r.status==='New')readyN++; });
    var h='<div class="phead"><div><h1>Fulfillment queue</h1><div class="meta"><span class="chip">'+svg(IC.cart)+'All projects \u00b7 portfolio</span><span class="chip ver">'+(ns?'North Star':'V1 \u2014 standard')+'</span></div></div></div>';
    var vit=[{k:'Open requests',v:''+openN,sub:'across the portfolio',tone:'ok',icon:IC.cart},{k:'Awaiting pricing',v:''+awaitN,sub:'need a price or quote',tone:awaitN>0?'warn':'ok',icon:IC.clock},{k:'Ready to allocate',v:''+readyN,sub:'equipment',tone:'ok',icon:IC.check},{k:'Est. margin on open',v:'22%',sub:'owned-first mix',tone:'ok',icon:IC.chart}];
    h+='<div class="vitals">'; vit.forEach(function(x){ h+='<div class="vital '+x.tone+'"><div class="vk">'+svg(x.icon)+x.k+'</div><div class="vv">'+x.v+'</div><div class="vsub">'+x.sub+'</div></div>'; }); h+='</div>';
    if(ns){ h+='<div class="ins-strip"><span class="isi">'+CC_SPARK+'</span><div><div class="ist">02S</div><div class="isd">The optimizer can clear the '+readyN+' open equipment requests now \u2014 owned-first, then re-rent \u2014 at a blended ~22% margin. '+awaitN+' more need a price or quote, and the at-risk procurement lines should be released this week.</div></div></div>'; }
    h+='<div class="eq-cap">'+svg('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>')+'<span>'+openN+' open requests in the queue across all five pillars. Pricing is set from the 02S catalog / rate card; equipment is allocated owned-first, then re-rent. Filter by pillar, project, or status below.</span></div>';
    var PILLARS=[['all','All'],['equipment','Equipment'],['logistics','Logistics'],['services','Prof services'],['procurement','Procurement'],['prefab','Pre-fab']];
    var PROJECTS=[['all','All'],['Hercules Solar + BESS','Hercules'],['Riverside Medical Center','Riverside'],['Cimarron Data Center','Cimarron']];
    var STATS=[['all','All'],['open','Open'],['done','Resolved']];
    h+='<div class="fq-filters">';
    h+='<div class="ff-grp"><span class="ff-lbl">Pillar</span><div class="ff-seg">'; PILLARS.forEach(function(o){ h+='<button class="ff-b'+(fqFP===o[0]?' on':'')+'" onclick="fqSetFilter(\'p\',\''+o[0]+'\')">'+o[1]+'</button>'; }); h+='</div></div>';
    h+='<div class="ff-grp"><span class="ff-lbl">Project</span><div class="ff-seg">'; PROJECTS.forEach(function(o){ h+='<button class="ff-b'+(fqFPr===o[0]?' on':'')+'" onclick="fqSetFilter(\'pr\',\''+o[0]+'\')">'+o[1]+'</button>'; }); h+='</div></div>';
    h+='<div class="ff-grp"><span class="ff-lbl">Status</span><div class="ff-seg">'; STATS.forEach(function(o){ h+='<button class="ff-b'+(fqFS===o[0]?' on':'')+'" onclick="fqSetFilter(\'s\',\''+o[0]+'\')">'+o[1]+'</button>'; }); h+='</div></div>';
    h+='</div>';
    var rows=FQ.filter(fqVisible);
    var anyF=(fqFP!=='all'||fqFPr!=='all'||fqFS!=='all');
    h+='<div class="eq-toolbar" style="margin-bottom:10px"><span style="font-size:12px;color:var(--g600)">Showing <b style="color:var(--g900)">'+rows.length+'</b> of '+FQ.length+' requests</span>'+(anyF?'<span class="spacer"></span><button class="btn btn-ghost btn-sm" onclick="fqClearFilters()">Clear filters</button>':'')+'</div>';
    if(!rows.length){ h+='<div class="dp-tbl"><div class="fq-empty">No requests match these filters. <span onclick="fqClearFilters()" style="color:var(--red);cursor:pointer;font-weight:600">Clear filters</span></div></div>'; mount.innerHTML=h; return; }
    var gt='1fr 168px 92px 128px 300px';
    h+='<div class="dp-tbl"><div class="dp-head" style="grid-template-columns:'+gt+'"><span>Request</span><span>Project</span><span>Need-by</span><span>Status</span><span>Fulfillment</span></div>';
    rows.forEach(function(r){
      var qty=(typeof r.qty==='number')?(r.qty+' units'):r.qty;
      h+='<div class="dp-row'+(r.ref===hlRef?' fq-hl':'')+'" id="fqrow-'+r.ref+'" style="grid-template-columns:'+gt+'"><div>'+r.item+'<div class="sub">'+qty+' \u00b7 '+r.ref+' \u00b7 '+r.code+'</div></div><div>'+r.project+'</div><div>'+r.needby+'</div><div><span class="tag '+(FQ_TONE[r.status]||'neu')+'">'+r.status+'</span></div><div>'+fqCell(r,ns)+'</div></div>';
    });
    h+='</div>';
    mount.innerHTML=h;
    if(hlRef){ setTimeout(function(){ var el=gel('fqrow-'+hlRef); if(el&&el.scrollIntoView){ el.scrollIntoView({behavior:'smooth',block:'center'}); } }, 80); }
  }
  function fqCell(r,ns){
    if(r.status==='Allocated'&&r.alloc){ return '<div class="fq-done">'+r.alloc.owned+' owned \u00b7 '+r.alloc.rerent+' re-rent<div class="sub">'+fmt(r.alloc.margin)+'/mo \u00b7 '+r.alloc.pct.toFixed(0)+'% margin</div></div>'; }
    if(r.status==='Acknowledged'){ return '<div class="fq-done">'+(r.priced?('Priced '+r.priced):'Acknowledged')+'</div>'; }
    if(r.kind==='flow'){ if(fqIsDone(r)) return '<div class="fq-done">'+r.status+(r.doneNote?('<div class="sub">'+r.doneNote+'</div>'):'')+'</div>'; return (ns&&r.hint?'<div class="fq-hint">'+CC_SPARK+r.hint+'</div>':'')+'<button class="btn '+(ns?'btn-red':'btn-dark')+' btn-sm" onclick="fqAdvance(\''+r.id+'\')">'+r.actLabel+'</button>'; }
    if(r.kind==='pending'){ return (ns&&r.suggest?'<div class="fq-hint">'+CC_SPARK+r.suggest+'</div>':'')+'<button class="btn '+(ns?'btn-red':'btn-dark')+' btn-sm" onclick="fqPriceModal(\''+r.id+'\')">'+(ns?'Price':'Set price')+'</button>'; }
    if(r.kind==='service'){ return '<button class="btn btn-dark btn-sm" onclick="fqAck(\''+r.id+'\')">Acknowledge</button>'; }
    if(ns){ return '<div class="fq-hint">'+CC_SPARK+r.reco+' owned + '+(r.qty-r.reco)+' re-rent \u00b7 ~'+fqMarginPct(r)+'% margin</div><button class="btn btn-red btn-sm" onclick="fqOptModal(\''+r.id+'\')">Review &amp; accept</button>'; }
    return '<button class="btn btn-dark btn-sm" onclick="fqOptModal(\''+r.id+'\')">Allocate</button>';
  }

  function fqOptModal(id){
    var r=fqById(id); if(!r)return; fqCurId=id; var ns=CURRENT==='ns';
    fqPickOwned = ns ? Math.min(r.reco,Math.min(r.avail.length,r.qty)) : 0;
    var b='<div class="fq-req"><div class="fq-req-t">'+r.qty+'\u00d7 '+r.item+'</div><div class="sub">'+r.project+' \u00b7 need by '+r.needby+' \u00b7 billed to project at '+fmt(r.o2sRate)+'/mo per unit</div></div>';
    if(ns){ b+='<div class="fq-reco-badge">'+CC_SPARK+'Recommended: '+r.reco+' owned + '+(r.qty-r.reco)+' re-rent \u2014 maximizes margin given current availability</div>'; }
    b+='<div class="fq-split"><div class="fq-srow"><div><div class="fq-slbl">From owned fleet</div><div class="fq-savail" id="fqAvail"></div></div><div class="fq-step"><button class="fq-sb" onclick="fqStep(-1)">\u2039</button><span id="fqOwnedN">0</span><button class="fq-sb" onclick="fqStep(1)">\u203a</button></div></div><div class="fq-srow"><div><div class="fq-slbl">Re-rent the remainder</div><div class="fq-savail" id="fqRerentLine"></div></div><div class="fq-rn" id="fqRerentN">0</div></div></div>';
    b+='<div class="fq-calc"><div class="fq-crow"><span>Revenue to project (AR)</span><span id="fqAR"></span></div><div class="fq-crow neg"><span>Owned fleet cost</span><span id="fqOC"></span></div><div class="fq-crow neg"><span>Re-rent cost (AP)</span><span id="fqRC"></span></div><div class="fq-margin"><span>02S margin</span><span id="fqMargin"></span></div></div>';
    b+='<div class="modal-foot"><div class="mfoot-btns" style="margin-left:auto;display:flex;gap:8px"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-red" onclick="fqAccept()">Accept &amp; allocate</button></div></div>';
    openModal('Fulfill \u2014 '+r.item, b); fqRefresh();
  }
  function fqRefresh(){
    var r=fqById(fqCurId); if(!r)return; var c=fqCompute(r,fqPickOwned); fqPickOwned=c.owned;
    if(gel('fqOwnedN'))gel('fqOwnedN').textContent=c.owned;
    if(gel('fqRerentN'))gel('fqRerentN').textContent=c.rerent;
    var used=r.avail.slice(0,c.owned);
    var usedTxt = used.length ? (used.slice(0,4).map(function(u){return u.id+' \u00b7 '+u.yard;}).join('<br>')+(used.length>4?'<br>+'+(used.length-4)+' more':'')) : (r.avail.length?(r.avail.length+' units available (none selected)'):'No owned units available for this class');
    if(gel('fqAvail'))gel('fqAvail').innerHTML=usedTxt;
    if(gel('fqRerentLine'))gel('fqRerentLine').innerHTML=c.rerent>0?(r.vendor+' @ '+fmt(r.reRentRate)+'/mo (MSA)'):'\u2014';
    if(gel('fqAR'))gel('fqAR').textContent=fmt(c.ar)+'/mo';
    if(gel('fqOC'))gel('fqOC').textContent='\u2212'+fmt(c.oc)+'/mo';
    if(gel('fqRC'))gel('fqRC').textContent='\u2212'+fmt(c.rc)+'/mo';
    if(gel('fqMargin'))gel('fqMargin').innerHTML=fmt(c.margin)+'/mo<span class="fq-pct">'+c.pct.toFixed(1)+'%</span>';
  }
  function fqStep(d){ fqPickOwned+=d; fqRefresh(); }
  function fqAccept(){ var r=fqById(fqCurId); if(!r)return; var c=fqCompute(r,fqPickOwned); r.status='Allocated'; r.alloc={owned:c.owned,rerent:c.rerent,margin:c.margin,pct:c.pct}; closeModal(); renderFulfill(); toast(r.qty+'\u00d7 '+r.item+' allocated \u2014 '+c.owned+' owned, '+c.rerent+' re-rent \u00b7 '+fmt(c.margin)+'/mo margin'); }
  function fqPriceModal(id){
    var r=fqById(id); if(!r)return; fqCurId=id; var ns=CURRENT==='ns';
    var b='<div class="fq-req"><div class="fq-req-t">'+r.item+'</div><div class="sub">'+r.project+' \u00b7 '+r.qty+' \u00b7 need by '+r.needby+'</div></div>';
    b+='<div class="mform"><div class="mf"><label>02S rate</label><input id="fqRate" class="rin" placeholder="e.g. $26,000/mo" value="'+((ns&&r.suggest)?r.suggest:'')+'"></div>';
    if(ns){ b+='<div class="fq-reco-badge">'+CC_SPARK+'Suggested from the 02S rate card / catalog \u2014 accept or adjust</div>'; }
    b+='<div class="eqf-rate pending">'+svg(IC.clock,2)+'<span>This line came in as <b>pending pricing</b> from the demand plan. Set the rate to acknowledge it back to the project.</span></div></div>';
    b+='<div class="modal-foot"><div class="mfoot-btns" style="margin-left:auto;display:flex;gap:8px"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-red" onclick="fqPriceSave()">Set price &amp; acknowledge</button></div></div>';
    openModal('Price \u2014 '+r.item, b);
  }
  function fqPriceSave(){ var r=fqById(fqCurId); if(!r)return; var v=gel('fqRate')?gel('fqRate').value.trim():''; if(!v){ toast('Enter a rate first'); return; } r.status='Acknowledged'; r.priced=v; closeModal(); renderFulfill(); toast(r.item+' priced \u2014 acknowledged to the project'); }
  function fqAck(id){ var r=fqById(id); if(!r)return; r.status='Acknowledged'; renderFulfill(); toast(r.item+' acknowledged'); }

  /* ═══════════ FLEET & ASSET LIFECYCLE ═══════════ */
  var FLEET=[
    {id:'TC-0012',cls:'Tower crane',yard:'Southern Yard',status:'idle',idleDays:12,util:41,age:9,hours:'11,800',cond:'Fair',life:'replace',capex:'$1.2M',reco:'Replace \u2014 add to Q3 CapEx (~$1.2M)'},
    {id:'TC-0018',cls:'Tower crane',yard:'Central Yard',status:'idle',idleDays:5,util:78,age:3,hours:'4,200',cond:'Good',life:'redeploy',covers:'Riverside REQ-4471',coversProject:'Riverside Medical Center',reco:'Redeploy \u2014 covers Riverside REQ-4471'},
    {id:'EX-2201',cls:'Excavator, 45K',yard:'North Yard',status:'idle',idleDays:8,util:63,age:5,hours:'6,900',cond:'Good',life:'redeploy',covers:'Cimarron REQ-4472',coversProject:'Cimarron Data Center',save:'$9,500/mo',reco:'Redeploy \u2014 covers Cimarron REQ-4472'},
    {id:'EX-2205',cls:'Excavator, 45K',yard:'West Yard',status:'idle',idleDays:21,util:38,age:6,hours:'8,100',cond:'Good',life:'redeploy',covers:'Cimarron REQ-4472',coversProject:'Cimarron Data Center',save:'$9,500/mo',reco:'Redeploy \u2014 covers Cimarron REQ-4472'},
    {id:'EX-2208',cls:'Excavator, 45K',yard:'South Yard',status:'idle',idleDays:15,util:44,age:6,hours:'7,400',cond:'Fair',life:'redeploy',covers:'Cimarron demand',coversProject:'Cimarron Data Center',save:'$9,500/mo',reco:'Redeploy \u2014 covers Cimarron demand'},
    {id:'SL-3301',cls:'Scissor lift, 32 ft',yard:'South Yard',status:'idle',idleDays:6,util:52,age:4,hours:'\u2014',cond:'Good',life:'redeploy',covers:'Riverside REQ-4474',coversProject:'Riverside Medical Center',note:'returned from Hercules (recert)',reco:'Redeploy \u2014 covers Riverside REQ-4474'},
    {id:'DZ-0210',cls:'Dozer, D6',yard:'West Yard',status:'idle',idleDays:34,util:22,age:11,hours:'14,200',cond:'Poor',life:'replace',capex:'$0.9M',reco:'Replace \u2014 aging, low use (~$0.9M)'},
    {id:'CR-0440',cls:'Crawler crane, 150T',yard:'\u2014',status:'onrent',project:'Cimarron Data Center',util:91,age:4,hours:'5,100',cond:'Good',life:'ok'},
    {id:'TH-1120',cls:'Telehandler',yard:'\u2014',status:'onrent',project:'Hercules Solar + BESS',util:88,age:3,hours:'3,600',cond:'Good',life:'ok'},
    {id:'GEN-0770',cls:'Generator, 45 kW',yard:'\u2014',status:'onrent',project:'Hercules Solar + BESS',util:95,age:2,hours:'2,100',cond:'Good',life:'ok'},
    {id:'LB-0330',cls:'Loader backhoe',yard:'West Yard',status:'maint',util:0,age:7,hours:'9,300',cond:'Fair',life:'ok',note:'hydraulic repair'}
  ];
  var fleetFilter='all', fleetCurId=null;
  var FL_STAT={onrent:{l:'On-rent',t:'ok'},idle:{l:'Idle',t:'warn'},maint:{l:'Maintenance',t:'neu'}};
  var FL_COND={Good:'ok',Fair:'warn',Poor:'bad'};
  function fleetById(id){ for(var i=0;i<FLEET.length;i++){ if(FLEET[i].id===id)return FLEET[i]; } return null; }
  function fleetSetFilter(f){ fleetFilter=f; renderFleet(); }
  function renderFleet(){
    var mount=gel('ccFleet'); if(!mount)return; var ns=CURRENT==='ns';
    var rows=FLEET.filter(function(r){ if(fleetFilter==='all')return true; if(fleetFilter==='replace')return r.life==='replace'; return r.status===fleetFilter; });
    var h='<div class="phead"><div><h1>Asset lifecycle &amp; replacement</h1><div class="meta"><span class="chip">'+svg(IC.box)+'Owned fleet \u00b7 portfolio</span><span class="chip ver">'+(ns?'North Star':'V1 \u2014 standard')+'</span></div></div></div>';
    var vit=[{k:'Owned units',v:'486',sub:'22 classes',tone:'ok',icon:IC.box},{k:'Utilization',v:'82%',sub:'target 85%',tone:'warn',icon:IC.chart},{k:'Idle fleet',v:'$142K/mo',sub:'9 units idle',tone:'bad',icon:IC.warn},{k:'Replace soon',v:'6',sub:'past threshold',tone:'bad',icon:IC.clock}];
    h+='<div class="vitals">'; vit.forEach(function(x){ h+='<div class="vital '+x.tone+'"><div class="vk">'+svg(x.icon)+x.k+'</div><div class="vv">'+x.v+'</div><div class="vsub">'+x.sub+'</div></div>'; }); h+='</div>';
    if(ns){ h+='<div class="ins-strip"><span class="isi">'+CC_SPARK+'</span><div><div class="ist">02S</div><div class="isd">6 units are past their replacement threshold \u2014 a ~$4.2M Q3 CapEx ask. Meanwhile 9 idle units (incl. 3 excavators) can cover open October demand \u2014 redeploying lifts utilization to 86% and avoids ~$96K in re-rent.</div></div></div>'; }
    h+='<div class="eq-cap">'+svg('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>')+'<span>Fleet status, hours, and condition are read from the EAM/OMS system of record (EquipmentShare T3). This view adds the Palantir intelligence \u2014 the replacement engine and idle-to-redeploy \u2014 on top.</span></div>';
    var segs=[['all','All'],['onrent','On-rent'],['idle','Idle'],['replace','Replace soon'],['maint','Maintenance']];
    h+='<div class="eq-toolbar"><div class="seg">';
    segs.forEach(function(s){ h+='<button class="seg-b'+(fleetFilter===s[0]?' on':'')+'" onclick="fleetSetFilter(\''+s[0]+'\')">'+s[1]+'</button>'; });
    h+='</div><span class="spacer"></span><span class="fl-count">'+rows.length+' of '+FLEET.length+' shown</span></div>';
    var gt='1fr 108px 168px 118px 150px 240px';
    h+='<div class="dp-tbl"><div class="dp-head" style="grid-template-columns:'+gt+'"><span>Asset</span><span>Status</span><span>Deployment</span><span>Utilization</span><span>Health</span><span>Lifecycle</span></div>';
    rows.forEach(function(r){
      var st=FL_STAT[r.status];
      var dep = r.status==='onrent'? r.project : (r.status==='idle'? ('Idle '+r.idleDays+'d'+(r.note?' \u00b7 '+r.note:'')) : (r.note||'In maintenance'));
      var utl = r.status==='maint'? '<span class="fl-muted">\u2014</span>' : ('<div class="fl-utop">'+r.util+'%</div><div class="fl-bar '+(r.util<50?'low':(r.util<75?'mid':''))+'"><span style="width:'+r.util+'%"></span></div>');
      var health = r.age+' yr \u00b7 '+r.hours+' hrs<div style="margin-top:5px"><span class="tag '+(FL_COND[r.cond]||'neu')+'">'+r.cond+'</span></div>';
      h+='<div class="dp-row" style="grid-template-columns:'+gt+'"><div>'+r.id+'<div class="sub">'+r.cls+(r.yard!=='\u2014'?' \u00b7 '+r.yard:'')+'</div></div><div><span class="tag '+st.t+'">'+st.l+'</span></div><div>'+dep+'</div><div>'+utl+'</div><div>'+health+'</div><div>'+fleetLife(r,ns)+'</div></div>';
    });
    h+='</div>';
    h+='<div class="cc-arch">'+svg('<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>')+'<span><b>System of record:</b> the asset register, maintenance work orders, depreciation, and order records live in EquipmentShare T3 (EAM + OMS). The Command Center reads T3 via the ontology and layers on the intelligence \u2014 the replacement engine and idle-to-redeploy (Palantir).</span></div>';
    mount.innerHTML=h;
  }
  function fleetLife(r,ns){
    if(r.capexQueued) return '<div class="fq-done">Queued for Q3 CapEx</div>';
    if(!ns){
      if(r.life==='replace')return '<span class="fl-muted">High hours \u00b7 service due</span>';
      if(r.life==='redeploy')return '<span class="fl-muted">Available to deploy</span>';
      if(r.status==='onrent')return '<span class="fl-muted">On-rent \u00b7 healthy</span>';
      if(r.status==='maint')return '<span class="fl-muted">In maintenance</span>';
      return '<span class="fl-muted">Monitor</span>';
    }
    if(r.life==='replace')return '<div class="fq-hint">'+CC_SPARK+r.reco+'</div><button class="btn btn-red btn-sm" onclick="fleetReplaceModal(\''+r.id+'\')">Plan CapEx</button>';
    if(r.life==='redeploy')return '<div class="fq-hint">'+CC_SPARK+r.reco+'</div><button class="btn btn-red btn-sm" onclick="fleetRedeployModal(\''+r.id+'\')">Redeploy</button>';
    if(r.status==='onrent')return '<span class="fl-muted">On-rent \u00b7 healthy</span>';
    if(r.status==='maint')return '<span class="fl-muted">In maintenance</span>';
    return '<span class="fl-muted">Healthy</span>';
  }
  function fleetReplaceModal(id){
    var r=fleetById(id); if(!r)return; fleetCurId=id;
    var b='<div class="fq-req"><div class="fq-req-t">'+r.id+' \u00b7 '+r.cls+'</div><div class="sub">'+(r.yard!=='\u2014'?r.yard+' \u00b7 ':'')+r.age+' years \u00b7 '+r.hours+' hrs \u00b7 '+r.cond+' condition</div></div>';
    b+='<div class="fq-reco-badge">'+CC_SPARK+'Past replacement threshold \u2014 maintenance cost trending up; replace to avoid downtime risk</div>';
    b+='<div class="fq-calc"><div class="fq-crow"><span>Age</span><span>'+r.age+' yr &middot; threshold 8 yr</span></div><div class="fq-crow"><span>Operating hours</span><span>'+r.hours+' &middot; threshold 10,000</span></div><div class="fq-crow"><span>Maintenance (last 12 mo)</span><span>rising \u2014 \u25b2 34% YoY</span></div><div class="fq-crow"><span>Condition</span><span>'+r.cond+'</span></div><div class="fq-margin"><span>Recommended CapEx</span><span>'+r.capex+'</span></div></div>';
    b+='<div class="modal-foot"><div class="mfoot-btns" style="margin-left:auto;display:flex;gap:8px"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-red" onclick="fleetReplaceSave()">Add to CapEx plan</button></div></div>';
    openModal('Replacement review \u2014 '+r.id, b);
  }
  function fleetReplaceSave(){ var r=fleetById(fleetCurId); if(!r)return; r.capexQueued=true; closeModal(); renderFleet(); toast(r.id+' added to Q3 CapEx plan \u2014 '+r.capex+' \u00b7 flows to Demand\u2013supply & CapEx'); }
  function fleetRedeployModal(id){
    var r=fleetById(id); if(!r)return; fleetCurId=id;
    var b='<div class="fq-req"><div class="fq-req-t">'+r.id+' \u00b7 '+r.cls+'</div><div class="sub">'+r.yard+' \u00b7 idle '+r.idleDays+' days</div></div>';
    b+='<div class="fq-reco-badge">'+CC_SPARK+'Idle unit matches open demand \u2014 redeploy instead of re-renting</div>';
    b+='<div class="fq-calc"><div class="fq-crow"><span>Open request</span><span>'+r.covers+'</span></div><div class="fq-crow"><span>Currently planned</span><span>owned + re-rent (optimizer)</span></div><div class="fq-crow"><span>Redeploying this unit</span><span>+1 owned</span></div>'+(r.save?'<div class="fq-margin"><span>Re-rent avoided</span><span>'+r.save+'</span></div>':'<div class="fq-margin"><span>Effect</span><span>+1 owned unit</span></div>')+'</div>';
    b+='<div class="modal-foot"><div class="mfoot-btns" style="margin-left:auto;display:flex;gap:8px"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-red" onclick="fleetRedeploySave()">Redeploy</button></div></div>';
    openModal('Redeploy \u2014 '+r.id, b);
  }
  function fleetRedeploySave(){ var r=fleetById(fleetCurId); if(!r)return; r.status='onrent'; r.project=r.coversProject||('Redeployed \u2014 '+r.covers); r.life='ok'; closeModal(); renderFleet(); toast(r.id+' redeployed to '+(r.coversProject||'project')+(r.save?' \u2014 avoids '+r.save+' re-rent':'')); }

  /* ═══════════ DEMAND-SUPPLY GAP & CAPEX PLAN ═══════════ */
  var HM_CLASSES=['Excavator, 45K','Tower crane','Telehandler','Dozer, D6','Crawler crane','Scissor lift'];
  var HM_MONTHS=['Aug','Sep','Oct','Nov','Dec','Jan'];
  var HM_GAP={'Excavator, 45K':[-1,-3,-3,-2,0,1],'Tower crane':[-2,-1,-1,0,1,1],'Telehandler':[0,-1,-2,-2,-1,0],'Dozer, D6':[1,0,-1,-1,-1,-1],'Crawler crane':[0,1,0,1,2,2],'Scissor lift':[4,3,2,3,4,5]};
  var CAPEX_BUYS=[
    {id:'buy-ex',cls:'Excavator, 45K',action:'Buy 2',rec:'buy',rationale:'$0.9M/yr re-rent across 3 jobs \u2014 exceeds purchase break-even (Sep\u2013Nov short 3)',capex:'$1.4M',capexN:1.4,rerent:'$0.9M/yr',rerentN:0.9,payback:'19 mo',reco:true,recoText:'Buy 2 \u2014 19-mo payback vs re-rent'},
    {id:'buy-th',cls:'Telehandler',action:'Buy 2',rec:'buy',rationale:'$0.4M/yr re-rent \u00b7 41% utilization when active \u2014 buy gives utilization upside (Oct\u2013Dec short 2)',capex:'$0.6M',capexN:0.6,rerent:'$0.4M/yr',rerentN:0.4,payback:'18 mo',reco:true,recoText:'Buy 2 \u2014 18-mo payback vs re-rent'},
    {id:'buy-sl',cls:'Scissor lift, 32 ft',action:'Redeploy',rec:'redeploy',rationale:'$0.3M/yr re-rent \u2014 but 12 owned units sit idle; fix allocation, don\u2019t buy',capex:'\u2014',capexN:0,rerent:'$0.3M/yr',rerentN:0.3,payback:'\u2014',reco:false,note:'Redeploy idle \u2014 no CapEx'},
    {id:'buy-cr',cls:'Crawler crane, 150T',action:'Redeploy',rec:'redeploy',rationale:'Surplus through Q4 \u2014 owned units cover demand',capex:'\u2014',capexN:0,rerent:'$0.15M/yr',rerentN:0.15,payback:'\u2014',reco:false,note:'Surplus \u2014 no CapEx'},
    {id:'buy-tc',cls:'Tower crane \u2014 self-erect',action:'Re-rent',rec:'rerent',rationale:'Specialty \u00b7 1\u20132 jobs/yr \u2014 capital not justified, re-rent preferred',capex:'\u2014',capexN:0,rerent:'$0.15M/yr',rerentN:0.15,payback:'\u2014',reco:false,note:'Re-rent preferred \u2014 specialty'}
  ];
  var capexBuyAdded={},capexReasonMap={},capexByMap={},capexWhenMap={},capexCurId=null; var CAPEX_NOW='Jul 21, 2026';
  function hmColor(v){ if(v<=-4)return{bg:'rgba(220,29,52,.20)',fg:'#B81729'}; if(v<0)return{bg:'rgba(220,29,52,.09)',fg:'#B81729'}; if(v===0)return{bg:'transparent',fg:'var(--g400)'}; if(v<=3)return{bg:'rgba(47,122,67,.10)',fg:'var(--success)'}; return{bg:'rgba(47,122,67,.20)',fg:'var(--success)'}; }
  function gapItems(){ var items=CAPEX_BUYS.slice(); FLEET.forEach(function(r){ if(r.life==='replace'){ items.push({id:r.id,cls:r.cls+' \u00b7 '+r.id,action:'Replace',rec:'replace',rationale:'Past replacement threshold \u00b7 '+r.hours+' hrs \u00b7 rising maintenance',capex:r.capex,capexN:(parseFloat(r.capex.replace(/[^0-9.]/g,''))||0),rerent:'\u2014',payback:'\u2014',reco:true,recoText:'Replace \u2014 aging fleet, rising maintenance',isReplace:true,queued:!!r.capexQueued}); } }); return items; }
  function capexRecTag(it){ var m={buy:['BUY','ok'],replace:['REPLACE','warn'],redeploy:['REDEPLOY','info'],rerent:['RE-RENT','neu']}; var x=m[it.rec]||['\u2014','neu']; return '<span class="tag '+x[1]+'">'+x[0]+'</span>'; }
  function capexModal(id){
    var it=null,arr=gapItems(),i; for(i=0;i<arr.length;i++){ if(arr[i].id===id){it=arr[i];break;} } if(!it)return; capexCurId=id; var ns=CURRENT==='ns';
    var b='<div class="fq-req"><div class="fq-req-t">'+it.cls+'</div><div class="sub">'+(it.rationale||'')+'</div></div>';
    b+='<div class="fq-reco-badge">'+(ns?CC_SPARK+'02S recommends this \u2014 '+it.recoText+'. ':'')+'Validating adds it to the CapEx plan and captures your name, timestamp, and reasoning.</div>';
    if(it.isReplace){ var r=fleetById(id); b+='<div class="fq-calc"><div class="fq-crow"><span>Age</span><span>'+(r?r.age:'\u2014')+' yr \u00b7 threshold 8 yr</span></div><div class="fq-crow"><span>Operating hours</span><span>'+(r?r.hours:'\u2014')+' \u00b7 threshold 10,000</span></div><div class="fq-crow"><span>Maintenance (last 12 mo)</span><span>rising \u2014 \u25b2 34% YoY</span></div><div class="fq-margin"><span>Recommended CapEx</span><span>'+it.capex+'</span></div></div>'; }
    else { b+='<div class="fq-calc"><div class="fq-crow"><span>Annual re-rent</span><span>'+it.rerent+'</span></div><div class="fq-crow"><span>Buy price</span><span>'+it.capex+'</span></div><div class="fq-crow"><span>Payback</span><span>'+it.payback+'</span></div><div class="fq-margin"><span>Recommendation</span><span>Buy \u2014 '+it.payback+' payback vs re-rent</span></div></div>'; }
    var draft=it.isReplace?'Unit past replacement threshold; rising maintenance justifies replacement.':('Gap confirmed across the pipeline; '+it.rerent+' recurring re-rent spend justifies the buy.');
    b+='<div style="margin-top:14px;font-size:12px;font-weight:600;color:var(--g600)">Validation reasoning <span class="fl-muted" style="font-weight:400">(recommended)</span></div>';
    b+='<textarea id="capexReason" class="ctext" style="width:100%;min-height:60px;margin-top:6px">'+(ns?draft:'')+'</textarea>';
    b+='<div class="modal-foot"><div class="mfoot-btns" style="margin-left:auto;display:flex;gap:8px"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-red" onclick="capexValidate(\''+id+'\')">\u2713 Validate &amp; add to plan</button></div></div>';
    openModal('Validate for CapEx \u2014 '+it.cls, b);
  }
  function capexValidate(id){
    var el=gel('capexReason'); var reason=(el&&el.value)?el.value:'\u2014';
    var it=null,arr=gapItems(),i; for(i=0;i<arr.length;i++){ if(arr[i].id===id){it=arr[i];break;} }
    if(it&&it.isReplace){ var r=fleetById(id); if(r)r.capexQueued=true; } else { capexBuyAdded[id]=true; }
    capexReasonMap[id]=reason; capexByMap[id]='Harsh Vardhan Singh'; capexWhenMap[id]=CAPEX_NOW;
    closeModal(); renderGap(); toast('Validated \u2014 added to the CapEx plan');
  }
  function gapDecision(it,ns){
    var inPlan = it.isReplace ? it.queued : !!capexBuyAdded[it.id];
    if(inPlan) return '<div class="fq-done">In plan</div>';
    if(!it.reco) return '<span class="fl-muted">'+(it.note||'No action')+'</span>';
    if(!ns) return '<button class="btn btn-dark btn-sm" onclick="capexModal(\''+it.id+'\')">Validate</button>';
    return '<div class="fq-hint">'+CC_SPARK+it.recoText+'</div><button class="btn btn-red btn-sm" onclick="capexModal(\''+it.id+'\')">Validate &amp; add</button>';
  }
  function renderGap(){
    var mount=gel('ccGap'); if(!mount)return; var ns=CURRENT==='ns';
    var items=gapItems();
    items.sort(function(a,b){ var ra=(a.reco&&!a.isReplace)?0:(a.isReplace?1:2), rb=(b.reco&&!b.isReplace)?0:(b.isReplace?1:2); if(ra!==rb)return ra-rb; return (b.rerentN||0)-(a.rerentN||0); });
    var recTotal=0,planTotal=0,recCount=0,planCount=0;
    items.forEach(function(it){ if(it.reco){recTotal+=it.capexN;recCount++;} var inPlan=it.isReplace?it.queued:!!capexBuyAdded[it.id]; if(inPlan){planTotal+=it.capexN;planCount++;} });
    var h='<div class="phead"><div><h1>Demand\u2013supply &amp; CapEx</h1><div class="meta"><span class="chip">'+svg(IC.chart)+'All classes \u00b7 next 6 months</span><span class="chip ver">'+(ns?'North Star':'V1 \u2014 standard')+'</span></div></div></div>';
    var vit=[{k:'Peak gap',v:'\u22127',sub:'units short \u00b7 Oct',tone:'bad',icon:IC.warn},{k:'Re-rent spend',v:'$2.4M/yr',sub:'flagged to cover gaps',tone:'warn',icon:IC.dollar},{k:'Recommended CapEx',v:'$'+recTotal.toFixed(1)+'M',sub:recCount+' items \u00b7 ranked by re-rent',tone:'ok',icon:IC.box},{k:'In plan',v:'$'+planTotal.toFixed(1)+'M',sub:planCount+' validated',tone:'ok',icon:IC.check}];
    h+='<div class="vitals">'; vit.forEach(function(x){ h+='<div class="vital '+x.tone+'"><div class="vk">'+svg(x.icon)+x.k+'</div><div class="vv">'+x.v+'</div><div class="vsub">'+x.sub+'</div></div>'; }); h+='</div>';
    if(ns){ h+='<div class="ins-strip"><span class="isi">'+CC_SPARK+'</span><div><div class="ist">02S</div><div class="isd">Four classes run short through Q4 \u2014 excavators, telehandlers, tower cranes, and dozers (peak \u22127 units in October). A ~$4.1M CapEx plan (6 units) retires ~$1.3M/yr of re-rent and rising maintenance at a blended ~19-month payback. Scissor lifts and crawlers are in surplus \u2014 redeploy, don\u2019t buy.</div></div></div>'; }
    h+='<div class="eq-cap">'+svg('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>')+'<span>Owned covers ~88% of peak demand. Net owned position vs demand by class and month \u2014 persistent shortfalls become CapEx; surplus classes are redeployed, not bought.</span></div>';
    var gth='160px repeat(6,1fr)';
    h+='<div class="hm"><div class="hm-row hm-head" style="grid-template-columns:'+gth+'"><div class="hm-cell">Class</div>'+HM_MONTHS.map(function(mo){return '<div class="hm-cell">'+mo+'</div>';}).join('')+'</div>';
    HM_CLASSES.forEach(function(cl){ var row=HM_GAP[cl]; h+='<div class="hm-row" style="grid-template-columns:'+gth+'"><div class="hm-cell">'+cl+'</div>'+row.map(function(v){ var c=hmColor(v); var lbl=v<0?('\u2212'+(-v)):(v>0?('+'+v):'0'); return '<div class="hm-cell" style="background:'+c.bg+';color:'+c.fg+'">'+lbl+'</div>'; }).join('')+'</div>'; });
    h+='</div>';
    h+='<div class="hm-legend">Net owned position vs demand by month \u00b7 <span class="hl-neg">red = short</span> \u00b7 <span class="hl-pos">green = surplus</span></div>';
    h+='<div class="eq-toolbar" style="margin-top:18px"><span class="dp-sec-t">'+svg(IC.box)+'Ranked buy list</span><span class="spacer"></span><span class="ff-hint">02S recommendation \u2014 ranked by recurring re-rent spend</span></div>';
    var gt='1.5fr 104px 92px 118px 74px 150px';
    h+='<div class="dp-tbl"><div class="dp-head" style="grid-template-columns:'+gt+'"><span>Asset</span><span>Rec</span><span class="r">Buy price</span><span>Annual re-rent</span><span>Payback</span><span>Decision</span></div>';
    items.forEach(function(it){ h+='<div class="dp-row" style="grid-template-columns:'+gt+'"><div>'+it.cls+'<div class="sub" style="white-space:normal">'+it.rationale+'</div></div><div>'+capexRecTag(it)+'</div><div class="r">'+it.capex+'</div><div>'+it.rerent+'</div><div>'+it.payback+'</div><div>'+gapDecision(it,ns)+'</div></div>'; });
    h+='</div>';
    var planned=items.filter(function(it){ return it.isReplace?it.queued:!!capexBuyAdded[it.id]; });
    h+='<div class="eq-toolbar" style="margin-top:22px"><span class="dp-sec-t">'+svg(IC.check)+'Your CapEx plan</span><span class="spacer"></span><span class="ff-hint">'+(planned.length?('$'+planTotal.toFixed(1)+'M \u00b7 '+planCount+' line'+(planCount===1?'':'s')):'validated items only')+'</span></div>';
    if(!planned.length){ h+='<div class="fq-empty">No line items yet. Validate items from the ranked list above and they\u2019ll populate here.</div>'; }
    else { var gtp='1.4fr 96px 118px 74px 1.5fr'; h+='<div class="dp-tbl"><div class="dp-head" style="grid-template-columns:'+gtp+'"><span>Asset</span><span class="r">Buy price</span><span>Annual re-rent</span><span>Payback</span><span>Validated</span></div>'; planned.forEach(function(it){ h+='<div class="dp-row" style="grid-template-columns:'+gtp+'"><div>'+it.cls+'</div><div class="r">'+it.capex+'</div><div>'+it.rerent+'</div><div>'+it.payback+'</div><div class="sub" style="white-space:normal">'+(capexByMap[it.id]||'\u2014')+' \u00b7 '+(capexWhenMap[it.id]||CAPEX_NOW)+'<br>\u201c'+(capexReasonMap[it.id]||'\u2014')+'\u201d</div></div>'; }); h+='</div>'; }
    h+='<div class="cp-total">In plan: <b>$'+planTotal.toFixed(1)+'M</b> of $'+recTotal.toFixed(1)+'M recommended</div>';
    h+='<div class="cc-arch">'+svg('<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>')+'<span>Demand is aggregated from the project demand plans and the fulfillment queue; owned supply is read from the owned-fleet register. The approved CapEx plan flows to FP&amp;A (Anaplan) \u2014 extend layer.</span></div>';
    mount.innerHTML=h;
  }

  /* ═══════════ BILLING ANOMALIES ═══════════ */
  var AN_SEV={high:{l:'High',t:'bad'},med:{l:'Med',t:'warn'},low:{l:'Low',t:'neu'}};
  var ANOM=[
    {id:'BILL-9012',type:'Idle-but-billing',asset:'Scissor lift SL-2204',project:'Hercules Solar + BESS',code:'01-100',impact:3800,dir:'Project overpay',sev:'high',status:'Open',bucket:'idle',stream:'ar',evidence:['No telematics activity for 18 days','Still billing the project at $3,800/mo','Flagged by the project team (Dana Reyes)'],reco:'Draft call-off to stop billing + credit 18 idle days (~$2,280)',action:'Draft call-off'},
    {id:'BILL-9021',type:'Billing after return',asset:'Excavator EX-1180',project:'Hercules Solar + BESS',code:'02-320',impact:5200,dir:'Project overpay',sev:'high',status:'Open',bucket:'idle',stream:'ar',evidence:['Unit returned to the yard 9 days ago','AR still accruing at $5,200/mo','Off-rent event never posted to CMiC'],reco:'Stop AR + credit 9 days ($1,560); post the off-rent to CMiC',action:'Issue credit'},
    {id:'BILL-9038',type:'Rate mismatch',asset:'Telehandler TH-0904',project:'Cimarron Data Center',code:'02-220',impact:1400,dir:'Project overpay',sev:'med',status:'Open',bucket:'rate',stream:'ar',evidence:['Billed at $2,900/mo','02S catalog rate is $2,200/mo','$700/mo over catalog since June \u2014 12% above the contract rate'],reco:'Correct rate to catalog + credit the overage ($2,100)',action:'Correct rate'},
    {id:'BILL-9047',type:'Duplicate charge',asset:'Scissor lift SL-2261',project:'Riverside Medical Center',code:'01-100',impact:900,dir:'Project overpay',sev:'low',status:'Open',bucket:'other',stream:'ar',evidence:['Same asset billed on two cost codes','Duplicate AR of $900/mo since July'],reco:'Remove the duplicate line + credit ($900)',action:'Remove dup'},
    {id:'BILL-9052',type:'Idle-but-billing',asset:'Dozer DZ-0188',project:'Cimarron Data Center',code:'02-320',impact:1400,dir:'Project overpay',sev:'med',status:'Open',bucket:'idle',stream:'ar',evidence:['Utilization 4% over the last 21 days','Billing the project $1,400/mo'],reco:'Confirm need with the PM, or call off + credit',action:'Draft call-off'},
    {id:'BILL-9058',type:'PO quantity mismatch',asset:'Telehandler TH-1150 \u00b7 billed 3, PO covers 2',project:'Riverside Medical Center',code:'02-220',impact:2900,dir:'Project overpay',sev:'med',status:'Open',bucket:'other',stream:'ar',evidence:['July invoice bills 3 units','PO-2214 authorizes 2 units','1 unit ($2,900/mo) has no PO coverage'],reco:'Correct the invoice to 2 units + credit the 3rd ($2,900)',action:'Correct qty'},
    {id:'BILL-9061',type:'Late billing start',asset:'Crawler crane CR-0440',project:'Hercules Solar + BESS',code:'Hoisting',impact:1800,dir:'02S under-bill',sev:'low',status:'Open',bucket:'other',stream:'ar',evidence:['Unit went on-rent Jun 28','Billing started Jul 1 \u2014 3 days after on-rent','~$1,800 of billable time never invoiced'],reco:'Back-bill the 3-day gap to the project ($1,800)',action:'Back-bill'},
    {id:'BILL-9034',type:'Margin-negative re-rent',asset:'Tower crane \u00b7 re-rent (ALL Crane)',project:'Riverside Medical Center',code:'Hoisting',impact:4100,dir:'02S loss',sev:'high',status:'Open',bucket:'margin',stream:'ap',evidence:['Vendor AP $36,100/mo vs 02S AR $35,000/mo','Vendor raised the MSA rate on renewal','Margin is \u2212$1,100/mo on this line'],reco:'Re-price to the project, or switch to owned TC-0018 (idle)',action:'Re-price'},
    {id:'BILL-9041',type:'Missing AR',asset:'Generator GEN-0512 \u00b7 re-rent',project:'Cimarron Data Center',code:'26-330',impact:2600,dir:'02S leakage',sev:'high',status:'Open',bucket:'other',stream:'ap',evidence:['Vendor AP posted at $2,600/mo','No matching AR to the project','Re-rent never linked to a cost code'],reco:'Create the AR line to project cost code 26-330',action:'Create AR'},
    {id:'BILL-9063',type:'Vendor rate above MSA',asset:'Excavator \u00b7 re-rent (Sunbelt)',project:'Cimarron Data Center',code:'02-320',impact:1000,dir:'02S loss',sev:'med',status:'Open',bucket:'rate',stream:'ap',evidence:['Vendor invoice $10,500/mo','Contracted MSA rate is $9,500/mo','$1,000/mo over MSA since June'],reco:'Dispute the vendor invoice down to the MSA rate + recover the overage',action:'Dispute invoice'},
    {id:'BILL-9067',type:'Vendor billing after off-rent',asset:'Boom lift \u00b7 re-rent (United)',project:'Riverside Medical Center',code:'01-100',impact:2100,dir:'02S loss',sev:'high',status:'Open',bucket:'idle',stream:'ap',evidence:['Off-rent posted Jul 8 (returned to vendor)','Vendor AP still accruing $2,100/mo','12-day overlap billed in error'],reco:'Dispute the vendor invoice + stop AP; recover the overlap',action:'Dispute invoice'}
  ];
  var anomStream='all';
  function anomSetStream(v){ anomStream=v; renderAnomaly(); }
  var BILL_ST={Approved:'ok',Disputed:'bad',Pending:'warn',Finalized:'info'};
  var CC_BILL=[
    {id:'BILL-9018',item:'Excavator, 45K \u00d74',project:'Cimarron Data Center',amt:48000,period:'Jul 2026',status:'Approved',stream:'ar'},
    {id:'BILL-9017',item:'Tower crane (owned)',project:'Riverside Medical Center',amt:22500,period:'Jul 2026',status:'Approved',stream:'ar'},
    {id:'BILL-9015',item:'Boom lift 60ft \u00d72',project:'Riverside Medical Center',amt:15000,period:'Jul 2026',status:'Approved',stream:'ar'},
    {id:'BILL-9014',item:'Dozer D6 \u00d72',project:'Cimarron Data Center',amt:32400,period:'Jul 2026',status:'Approved',stream:'ar'},
    {id:'BILL-9013',item:'Generator 45kW \u00d73',project:'Hercules Solar + BESS',amt:12600,period:'Jul 2026',status:'Approved',stream:'ar'},
    {id:'BILL-9011',item:'Light tower \u00d74',project:'Riverside Medical Center',amt:4800,period:'Jun 2026',status:'Approved',stream:'ar'},
    {id:'BILL-9010',item:'Compaction roller',project:'Cimarron Data Center',amt:6800,period:'Jun 2026',status:'Disputed',stream:'ar'},
    {id:'INV-5545',item:'Tower crane re-rent \u00b7 ALL Crane',project:'Riverside Medical Center',amt:36100,period:'Jul 2026',status:'Disputed',stream:'ap'},
    {id:'INV-5521',item:'Crawler crane \u00b7 Maxim',project:'Hercules Solar + BESS',amt:58000,period:'Jul 2026',status:'Approved',stream:'ap'},
    {id:'INV-5530',item:'Scissor lifts \u00d78 \u00b7 United',project:'Riverside Medical Center',amt:5600,period:'Jul 2026',status:'Approved',stream:'ap'},
    {id:'INV-5540',item:'BESS commissioning \u00b7 vendor',project:'Hercules Solar + BESS',amt:18000,period:'Jul 2026',status:'Pending',stream:'ap'},
    {id:'INV-5550',item:'Generator re-rent \u00b7 Sunbelt',project:'Cimarron Data Center',amt:2600,period:'Jul 2026',status:'Pending',stream:'ap'}
  ];
  var anomCurId=null;
  function anomById(id){ for(var i=0;i<ANOM.length;i++){ if(ANOM[i].id===id)return ANOM[i]; } return null; }
  function kfmt(n){ return '$'+(n/1000).toFixed(1).replace(/\.0$/,'')+'K'; }
  function kfmt2(n){ if(n>=1000000){ return '$'+(n/1000000).toFixed(2).replace(/\.?0+$/,'')+'M'; } return kfmt(n); }
  function anomCell(a,ns){
    if(a.status==='Resolved') return '<div class="fq-done">Resolved</div>';
    if(!ns) return '<button class="btn btn-dark btn-sm" onclick="anomModal(\''+a.id+'\')">Review</button>';
    return '<div class="fq-hint">'+CC_SPARK+a.reco+'</div><button class="btn btn-red btn-sm" onclick="anomModal(\''+a.id+'\')">'+a.action+'</button>';
  }
  function renderAnomaly(){
    var mount=gel('ccAnomaly'); if(!mount)return; var ns=CURRENT==='ns'; var st=anomStream;
    var rows=ANOM.filter(function(a){ return st==='all'||a.stream===st; });
    var openN=0,atRisk=0; rows.forEach(function(a){ if(a.status==='Open'){ openN++; atRisk+=a.impact; } });
    var billedAR=1240000, spendAP=710000, recAll=14000, recAR=9000, recAP=5000;
    var k1,k2lbl,k3lbl,recLbl,recV;
    if(st==='ar'){ k1={k:'Billed to projects MTD',v:kfmt2(billedAR),sub:'AR \u00b7 02S rate'}; k2lbl='AR anomalies'; k3lbl='Project credits at risk'; recLbl='Credits issued MTD'; recV=recAR; }
    else if(st==='ap'){ k1={k:'Vendor spend MTD',v:kfmt2(spendAP),sub:'AP \u00b7 MSA rate'}; k2lbl='AP anomalies'; k3lbl='Margin leakage at risk'; recLbl='Recovered MTD'; recV=recAP; }
    else { k1={k:'Billed MTD',v:kfmt2(billedAR),sub:'AR \u00b7 portfolio'}; k2lbl='Open anomalies'; k3lbl='At risk'; recLbl='Recovered MTD'; recV=recAll; }
    var vit=[{k:k1.k,v:k1.v,sub:k1.sub,tone:'ok',icon:IC.dollar},{k:k2lbl,v:''+openN,sub:'this cycle',tone:'bad',icon:IC.warn},{k:k3lbl,v:kfmt(atRisk)+'/mo',sub:'open items',tone:'warn',icon:IC.warn},{k:recLbl,v:kfmt(recV),sub:'resolved',tone:'ok',icon:IC.check}];
    var h='<div class="phead"><div><h1>Billing &amp; anomalies</h1><div class="meta"><span class="chip">'+svg(IC.warn)+'All projects \u00b7 dual-stream AR/AP</span><span class="chip ver">'+(ns?'North Star':'V1 \u2014 standard')+'</span></div></div></div>';
    h+='<div class="vitals">'; vit.forEach(function(x){ h+='<div class="vital '+x.tone+'"><div class="vk">'+svg(x.icon)+x.k+'</div><div class="vv">'+x.v+'</div><div class="vsub">'+x.sub+'</div></div>'; }); h+='</div>';
    var STREAMS=[['all','Combined'],['ar','Receivable (AR)'],['ap','Payable (AP)']];
    h+='<div class="fq-filters"><div class="ff-grp"><span class="ff-lbl">Stream</span><div class="ff-seg">';
    STREAMS.forEach(function(o){ h+='<button class="ff-b'+(st===o[0]?' on':'')+'" onclick="anomSetStream(\''+o[0]+'\')">'+o[1]+'</button>'; });
    h+='</div></div><span class="ff-hint">'+(st==='ar'?'What we bill projects, at the 02S rate':(st==='ap'?'What we pay rental vendors, at the MSA rate':'Both streams \u2014 project billing (AR) and vendor cost (AP)'))+'</span></div>';
    if(ns){ var ins; if(st==='ar'){ ins='Projects are being over-billed ~'+kfmt(atRisk)+'/mo \u2014 mostly idle or returned units still accruing, plus a PO-quantity and a rate mismatch. North Star has the credits and call-offs drafted; each needs one click to issue and stop the meter.'; } else if(st==='ap'){ ins='~'+kfmt(atRisk)+'/mo of 02S margin is leaking on the payable side \u2014 vendors billing above the MSA rate or after off-rent, plus a re-rent line renewed margin-negative. North Star has the vendor disputes drafted and can switch the margin-negative crane to the idle owned unit.'; } else { ins=openN+' anomalies across both streams put ~'+kfmt(atRisk)+'/mo at risk. On the receivable side, gear still charging projects after it went idle is the biggest bucket; on the payable side, two re-rent lines went margin-negative as vendor rates rose. Every anomaly has a drafted resolution \u2014 credits, call-offs, and vendor disputes \u2014 ready to send.'; } h+='<div class="ins-strip"><span class="isi">'+CC_SPARK+'</span><div><div class="ist">02S</div><div class="isd">'+ins+'</div></div></div>'; }
    h+='<div class="eq-cap">'+svg('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>')+'<span>Anomalies are detected across both billing streams \u2014 AR (billed to the project at the 02S rate) and AP (paid to the vendor at the MSA rate). Impact is monthly unless resolved.</span></div>';
    var showChip=(st==='all');
    h+='<div class="eq-toolbar"><span class="dp-sec-t">'+svg(IC.warn)+'Flagged anomalies</span><span class="spacer"></span><span class="ff-hint">'+openN+' open \u00b7 '+kfmt(atRisk)+'/mo at risk</span></div>';
    var gt='1fr 150px 120px 92px 214px';
    h+='<div class="dp-tbl"><div class="dp-head" style="grid-template-columns:'+gt+'"><span>Anomaly</span><span>Project</span><span>Impact</span><span>Severity</span><span>Resolution</span></div>';
    if(!rows.length){ h+='<div class="fq-empty">No anomalies on this stream.</div>'; }
    rows.forEach(function(a){ var sv=AN_SEV[a.sev]; var chip=showChip?('<span class="st-chip '+(a.stream==='ap'?'ap':'ar')+'">'+(a.stream==='ap'?'AP':'AR')+'</span>'):''; h+='<div class="dp-row" style="grid-template-columns:'+gt+'"><div>'+chip+a.type+'<div class="sub">'+a.asset+' \u00b7 '+a.id+'</div></div><div>'+a.project+'</div><div>'+fmt(a.impact)+'/mo<div class="sub">'+a.dir+'</div></div><div><span class="tag '+sv.t+'">'+sv.l+'</span></div><div>'+anomCell(a,ns)+'</div></div>'; });
    h+='</div>';
    var led=CC_BILL.filter(function(b){ return st==='all'||b.stream===st; });
    h+='<div class="eq-toolbar" style="margin-top:22px"><span class="dp-sec-t">'+svg(dpIcon('proj'))+'Recent billing activity</span><span class="spacer"></span><button class="btn btn-ghost btn-sm" onclick="toast(\'Billing ledger exported \u2014 CSV for client backup\')">Export</button></div>';
    var gtl='150px 1fr 156px 116px 96px 96px';
    h+='<div class="dp-tbl"><div class="dp-head" style="grid-template-columns:'+gtl+'"><span>ID</span><span>Item</span><span>Project</span><span>Amount</span><span>Period</span><span>Status</span></div>';
    led.forEach(function(b){ var chip=showChip?('<span class="st-chip '+(b.stream==='ap'?'ap':'ar')+'" style="margin-right:6px">'+(b.stream==='ap'?'AP':'AR')+'</span>'):''; h+='<div class="dp-row" style="grid-template-columns:'+gtl+'"><div>'+chip+b.id+'</div><div>'+b.item+'</div><div>'+b.project+'</div><div>'+fmt(b.amt)+'</div><div style="color:var(--g600)">'+b.period+'</div><div><span class="tag '+(BILL_ST[b.status]||'neu')+'">'+b.status+'</span></div></div>'; });
    h+='</div>';
    h+='<div class="cc-arch">'+svg('<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>')+'<span>Detection is Palantir intelligence over the CMiC billing ledger and equipment telematics; resolutions \u2014 credits, call-offs, rate corrections, and vendor disputes \u2014 are written back to CMiC. Extend layer.</span></div>';
    mount.innerHTML=h;
  }
  function anomModal(id){
    var a=anomById(id); if(!a)return; anomCurId=id; var ns=CURRENT==='ns';
    var ev=a.evidence.map(function(e){ return '<div class="an-ei">'+svg('<circle cx="12" cy="12" r="4"/>')+e+'</div>'; }).join('');
    var b='<div class="fq-req"><div class="fq-req-t">'+a.type+'</div><div class="sub">'+a.asset+' \u00b7 '+a.project+' \u00b7 '+a.id+'</div></div>';
    b+='<div class="fq-calc"><div class="fq-crow"><span>Monthly impact</span><span>'+fmt(a.impact)+'/mo</span></div><div class="fq-crow"><span>Direction</span><span>'+a.dir+'</span></div><div class="fq-crow"><span>Cost code</span><span>'+a.code+'</span></div></div>';
    b+='<div class="an-lbl">Evidence</div><div class="an-ev">'+ev+'</div>';
    if(ns){ b+='<div class="fq-reco-badge">'+CC_SPARK+a.reco+'</div>'; }
    if(ns){ b+='<div class="modal-foot"><div class="mfoot-btns" style="margin-left:auto;display:flex;gap:8px"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-red" onclick="anomResolve()">'+a.action+'</button></div></div>'; }
    else { b+='<div class="modal-foot"><div class="mfoot-btns" style="margin-left:auto;display:flex;gap:8px"><button class="btn btn-ghost" onclick="closeModal()">Close</button></div></div>'; }
    openModal('Anomaly \u2014 '+a.id, b);
  }
  function anomResolve(){ var a=anomById(anomCurId); if(!a)return; a.status='Resolved'; closeModal(); renderAnomaly(); toast(a.id+' resolved \u2014 '+a.action.toLowerCase()); }

  /* ═══════════ PROJECT MARGIN ═══════════ */
  var MARGIN_PILLARS=['Equipment','Logistics','Professional services','Procurement','Pre-fab'];
  var MARGIN_PROJECTS=['Hercules Solar + BESS','Riverside Medical Center','Cimarron Data Center'];
  var MARGIN_DATA={
    'Hercules Solar + BESS':{
      'Equipment':{arP:118000,costP:91000,arA:127000,costA:91000,note:'Actual AR includes $9.0K/mo from 2 open idle-billing anomalies (BILL-9012, BILL-9021) not yet credited \u2014 reported margin is overstated until they\u2019re resolved.'},
      'Logistics':{arP:18000,costP:16500,arA:18000,costA:16500,note:'Move-coordination fee only \u2014 a future logistics-execution build will sharpen this pillar\u2019s economics.'},
      'Professional services':{arP:62000,costP:56000,arA:62000,costA:56000,note:'3 active roles (owner\u2019s engineer, geotechnical, structural) billed at the 02S rate card \u2014 steady.'},
      'Procurement':{arP:210000,costP:206000,arA:205000,costA:201500,note:'Pass-through spend on long-lead BESS/module items \u2014 thin admin margin by design.'},
      'Pre-fab':{arP:58000,costP:55000,arA:56000,costA:53200,note:'Made-to-order assemblies quoted by 02S after submittal.'}
    },
    'Riverside Medical Center':{
      'Equipment':{arP:186400,costP:147000,arA:186400,costA:151100,note:'Includes the 5\u00d7 tower crane (REQ-4471 \u2014 2 owned + 3 re-rent, plan 19.4%). One re-rent line renewed at a higher MSA rate (BILL-9034), cutting margin $4.1K/mo.'},
      'Logistics':{arP:9000,costP:8300,arA:9000,costA:8300,note:''},
      'Professional services':{arP:24000,costP:21800,arA:24000,costA:21800,note:''},
      'Procurement':{arP:95000,costP:93200,arA:95000,costA:93200,note:''},
      'Pre-fab':{arP:12000,costP:11500,arA:12000,costA:11500,note:''}
    },
    'Cimarron Data Center':{
      'Equipment':{arP:188000,costP:149900,arA:140000,costA:109000,note:'Plan includes REQ-4472 (4\u00d7 excavator) \u2014 still open in the Fulfillment queue, so that margin isn\u2019t realized yet. A missing-AR anomaly (BILL-9041) also understates actual by $2.6K/mo.'},
      'Logistics':{arP:11000,costP:10100,arA:11000,costA:10100,note:''},
      'Professional services':{arP:19000,costP:17300,arA:19000,costA:17300,note:''},
      'Procurement':{arP:76000,costP:74500,arA:76000,costA:74500,note:''},
      'Pre-fab':{arP:9000,costP:8600,arA:9000,costA:8600,note:''}
    }
  };
  var MG_LINK={
    'Hercules Solar + BESS':{to:'anomaly',label:'Open in Billing anomalies',text:'2 idle-billing lines (BILL-9012, BILL-9021) are inflating reported margin by $9.0K/mo until credited.'},
    'Riverside Medical Center':{to:'anomaly',label:'Open in Billing anomalies',text:'A re-rent tower crane renewed at a higher MSA rate (BILL-9034) \u2014 cutting this project\u2019s margin $4.1K/mo. Reconciles to the Fulfillment optimizer (2 owned + 3 re-rent, plan 19.4%).'},
    'Cimarron Data Center':{to:'fulfill',label:'Open in Fulfillment queue',text:'REQ-4472 (4\u00d7 excavator, 1 owned + 3 re-rent) is still open \u2014 allocating it realizes ~$12.5K/mo of planned margin not yet in actuals.'}
  };
  function mgCalc(ar,cost){ var m=ar-cost; return {ar:ar,cost:cost,margin:m,pct:ar?(m/ar*100):0}; }
  function mgProjRoll(p){
    var d=MARGIN_DATA[p]; var arP=0,costP=0,arA=0,costA=0;
    MARGIN_PILLARS.forEach(function(pl){ var x=d[pl]; arP+=x.arP; costP+=x.costP; arA+=x.arA; costA+=x.costA; });
    return {plan:mgCalc(arP,costP),act:mgCalc(arA,costA)};
  }
  function mgPortfolioRoll(){
    var arP=0,costP=0,arA=0,costA=0;
    MARGIN_PROJECTS.forEach(function(p){ var r=mgProjRoll(p); arP+=r.plan.ar; costP+=r.plan.cost; arA+=r.act.ar; costA+=r.act.cost; });
    return {plan:mgCalc(arP,costP),act:mgCalc(arA,costA)};
  }
  function mgPillarRoll(pl){
    var arP=0,costP=0,arA=0,costA=0;
    MARGIN_PROJECTS.forEach(function(p){ var x=MARGIN_DATA[p][pl]; arP+=x.arP; costP+=x.costP; arA+=x.arA; costA+=x.costA; });
    return {plan:mgCalc(arP,costP),act:mgCalc(arA,costA)};
  }
  function mgAtRisk(){ var t=0,n=0; ANOM.forEach(function(a){ if(a.status==='Open'){ t+=a.impact; n++; } }); return {t:t,n:n}; }
  function mgProjRisk(p){ var t=0,n=0; ANOM.forEach(function(a){ if(a.project===p&&a.status==='Open'){ t+=a.impact; n++; } }); return {t:t,n:n}; }
  function mgHmColor(pct){ if(pct<8)return{bg:'rgba(220,29,52,.20)',fg:'#B81729'}; if(pct<12)return{bg:'rgba(220,29,52,.09)',fg:'#B81729'}; if(pct<18)return{bg:'transparent',fg:'var(--g600)'}; if(pct<25)return{bg:'rgba(47,122,67,.10)',fg:'var(--success)'}; return{bg:'rgba(47,122,67,.20)',fg:'var(--success)'}; }
  function mgVar(spanId,v){ return (v>=0?'+':'\u2212')+fmt(Math.abs(v)); }
  function renderMargin(){
    var mount=gel('ccMargin'); if(!mount)return; var ns=CURRENT==='ns';
    var port=mgPortfolioRoll(); var risk=mgAtRisk();
    var varv=port.act.margin-port.plan.margin;
    var h='<div class="phead"><div><h1>Project margin</h1><div class="meta"><span class="chip">'+svg(IC.dollar)+'All projects \u00b7 portfolio</span><span class="chip ver">'+(ns?'North Star':'V1 \u2014 standard')+'</span></div></div></div>';
    var vit=[
      {k:'Portfolio margin',v:fmt(port.act.margin)+'/mo',sub:'plan '+fmt(port.plan.margin)+'/mo',tone:varv>=0?'ok':'warn',icon:IC.dollar},
      {k:'Margin %',v:port.act.pct.toFixed(1)+'%',sub:'target 15%',tone:port.act.pct>=15?'ok':'warn',icon:IC.chart},
      {k:'Variance to plan',v:mgVar(0,varv)+'/mo',sub:'net of anomalies',tone:varv>=0?'ok':'bad',icon:IC.warn},
      {k:'Margin at risk',v:kfmt(risk.t)+'/mo',sub:risk.n+' open anomalies',tone:'bad',icon:IC.warn}
    ];
    h+='<div class="vitals">'; vit.forEach(function(x){ h+='<div class="vital '+x.tone+'"><div class="vk">'+svg(x.icon)+x.k+'</div><div class="vv">'+x.v+'</div><div class="vsub">'+x.sub+'</div></div>'; }); h+='</div>';
    if(ns){ h+='<div class="ins-strip"><span class="isi">'+CC_SPARK+'</span><div><div class="ist">02S</div><div class="isd">Portfolio margin looks roughly flat ('+mgVar(0,varv)+'/mo), but that hides two real headwinds and one overstatement. Riverside\u2019s tower crane re-rent renewed at a higher MSA rate (\u2212$4.1K/mo, BILL-9034). Cimarron\u2019s excavator request (REQ-4472) hasn\u2019t been allocated yet, so ~$12.5K/mo of planned margin isn\u2019t in actuals. And Hercules\u2019 reported margin is inflated $9.0K/mo by two idle-billing lines still awaiting credit.</div></div></div>'; }
    h+='<div class="eq-cap">'+svg('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>')+'<span>Margin = 02S rate revenue (AR, billed to the project) \u2212 owned fleet cost \u2212 re-rent AP (vendor MSA) \u2212 services/procurement vendor cost, by project and pillar. Reconciles to the Fulfillment optimizer and Billing anomaly detection.</span></div>';
    h+='<div class="hm"><div class="hm-row hm-head" style="grid-template-columns:180px repeat(3,1fr)"><div class="hm-cell">Pillar</div>'+MARGIN_PROJECTS.map(function(p){ return '<div class="hm-cell">'+p.split(' ')[0]+'</div>'; }).join('')+'</div>';
    MARGIN_PILLARS.forEach(function(pl){
      h+='<div class="hm-row" style="grid-template-columns:180px repeat(3,1fr)"><div class="hm-cell">'+pl+'</div>';
      MARGIN_PROJECTS.forEach(function(p){ var x=MARGIN_DATA[p][pl]; var a=mgCalc(x.arA,x.costA); var c=mgHmColor(a.pct); h+='<div class="hm-cell" style="background:'+c.bg+';color:'+c.fg+'">'+a.pct.toFixed(0)+'%</div>'; });
      h+='</div>';
    });
    h+='</div>';
    h+='<div class="hm-legend">Actual margin % by pillar and project \u00b7 <span class="hl-neg">red = below 12%</span> \u00b7 <span class="hl-pos">green = 18%+</span></div>';
    var gt='1fr 120px 120px 100px 84px 168px';
    h+='<div class="dp-tbl" style="margin-top:18px"><div class="dp-head" style="grid-template-columns:'+gt+'"><span>Project</span><span class="r">Plan margin</span><span class="r">Actual margin</span><span class="r">Variance</span><span>Margin %</span><span>Detail</span></div>';
    MARGIN_PROJECTS.forEach(function(p){
      var r=mgProjRoll(p); var pr=mgProjRisk(p); var v=r.act.margin-r.plan.margin;
      h+='<div class="dp-row" style="grid-template-columns:'+gt+'"><div>'+p+(pr.n?'<div class="sub">'+pr.n+' open anomal'+(pr.n===1?'y':'ies')+' \u00b7 '+kfmt(pr.t)+'/mo</div>':'')+'</div>';
      h+='<div class="r">'+fmt(r.plan.margin)+'/mo</div><div class="r">'+fmt(r.act.margin)+'/mo</div>';
      h+='<div class="r"><span class="tag '+(v>=0?'ok':'bad')+'">'+mgVar(0,v)+'/mo</span></div>';
      h+='<div>'+r.act.pct.toFixed(1)+'%</div>';
      h+='<div><button class="btn btn-dark btn-sm" onclick="mgModal(\''+p+'\')">By pillar</button></div></div>';
    });
    h+='</div>';
    h+='<div class="cc-arch">'+svg('<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>')+'<span>AR is billed to projects via CMiC at the 02S rate card; cost is read from EquipmentShare T3 (owned + re-rent) and vendor invoices (services/procurement). Margin reconciles to the Fulfillment optimizer and Billing anomaly detection \u2014 extend layer over Palantir intelligence.</span></div>';
    mount.innerHTML=h;
  }
  function mgModal(p){
    var d=MARGIN_DATA[p]; var roll=mgProjRoll(p); var ns=CURRENT==='ns'; var lk=MG_LINK[p];
    var b='<div class="fq-req"><div class="fq-req-t">'+p+'</div><div class="sub">Plan '+fmt(roll.plan.margin)+'/mo ('+roll.plan.pct.toFixed(1)+'%) \u2192 Actual '+fmt(roll.act.margin)+'/mo ('+roll.act.pct.toFixed(1)+'%)</div></div>';
    b+='<div class="fq-calc">';
    MARGIN_PILLARS.forEach(function(pl){
      var x=d[pl]; var a=mgCalc(x.arA,x.costA);
      b+='<div class="fq-crow"><span>'+pl+'</span><span>'+fmt(a.margin)+'/mo<span class="fq-pct">'+a.pct.toFixed(1)+'%</span></span></div>';
    });
    b+='</div>';
    MARGIN_PILLARS.forEach(function(pl){ var x=d[pl]; if(x.note){ b+='<div class="eq-cap"><b>'+pl+':</b>&nbsp;'+x.note+'</div>'; } });
    if(ns&&lk){ b+='<div class="fq-reco-badge">'+CC_SPARK+lk.text+'</div>'; }
    b+='<div class="modal-foot"><div class="mfoot-btns" style="margin-left:auto;display:flex;gap:8px"><button class="btn btn-ghost" onclick="closeModal()">Close</button>'+((ns&&lk)?('<button class="btn btn-red" onclick="closeModal();ccGo(\''+lk.to+'\')">'+lk.label+'</button>'):'')+'</div></div>';
    openModal('Margin \u2014 '+p, b);
  }

  /* ═══════════ COMMAND CENTER — PILLAR DEMAND PLANS (portfolio mirror of the portal plans) ═══════════ */
  var DP_ST={'Ready':'ok','Needs map':'warn','Scheduled':'info','Requested':'neu','Projected':'info','Active':'ok','Submittal':'info','In fabrication':'info','Delivered':'ok','At-risk':'bad','PO issued':'info'};
  function dpIcon(name){ var M={proj:'<path d="M3 21h18M5 21V8l7-5 7 5v13"/><path d="M9 21v-6h6v6"/>',tax:'<path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><path d="M7 7h.01"/>'}; return M[name]||IC[name]||IC.chart; }
  var CC_DP={
    equipment:{ mount:'ccDpEquip', title:'Equipment demand plan', icon:'box', decCol:'Sourcing',
      kpis:[{k:'Active projects',v:'14',sub:'with equipment demand',tone:'ok',icon:'proj'},{k:'Planned value',v:'$18.4M',sub:'equipment \u00b7 portfolio',tone:'ok',icon:'dollar'},{k:'Awaiting taxonomy',v:'0',sub:'need confirmation',tone:'warn',icon:'tax',dyn:'tax'},{k:'Owned coverage',v:'67%',sub:'vs re-rent',tone:'ok',icon:'chart'}],
      ns:'Equipment carries the messiest taxonomy \u2014 every rental vendor names classes differently. 02S auto-maps each incoming request to the canonical class and flags the ones that need a human confirm before they can be priced and allocated. Aerial peaks at 82 units in October, mostly coverable from idle owned fleet.',
      cap:'Every project\u2019s equipment demand, aggregated. 02S confirms each request against the canonical taxonomy, then releases it to the Fulfillment queue for the owned vs re-rent decision.',
      rows:[
        {id:'REQ-4479',asset:'2\u00d7 excavator, 50-ton \u00b7 dual aux + GPS',project:'Cimarron Data Center',tax:'Asset \u203a Earthmoving \u203a Excavator',taxOk:false,mapLeaf:'50-ton',conf:'94',leafOpts:['30-ton','45-55T','50-ton','80-ton'],dec:'Use owned',decTone:'ok',status:'Needs map'},
        {id:'REQ-4471',asset:'5\u00d7 tower crane \u00b7 self-erect, ~250 ft',project:'Riverside Medical Center',tax:'Asset \u203a Lifting \u203a Tower crane',taxOk:false,mapLeaf:'Self-erect',conf:'88',leafOpts:['Self-erect','Flat-top','Luffing-jib','Hammerhead'],dec:'Re-rent',decTone:'info',status:'Needs map'},
        {id:'REQ-4472',asset:'4\u00d7 excavator \u00b7 45K class',project:'Cimarron Data Center',tax:'Asset \u203a Earthmoving \u203a Excavator',taxOk:true,leaf:'45-55T',dec:'Use owned',decTone:'ok',status:'Ready'}
      ],
      rollCols:['Category','Peak units','Peak month','vs plan'],
      roll:[{a:'Earthmoving',b:'26',c:'Jul 2026',v:'+4 over',vt:'warn'},{a:'Lifting',b:'3',c:'Aug 2026',v:'on plan',vt:'ok'},{a:'Aerial',b:'82',c:'Oct 2026',v:'+14 over',vt:'bad'}],
      varSummary:'Aerial running 14 units over plan for October \u2014 the main portfolio driver.',
      consol:{save:'~$62K',cta:'Consolidate aerial',detail:'Aerial demand overlaps all three projects and peaks at 82 units in October, 14 over plan. Consolidate into one fleet re-rent rate instead of per-project spot rentals.'} },
    logistics:{ mount:'ccDpLog', title:'Logistics demand plan', icon:'truck', decCol:'Delivery',
      kpis:[{k:'Active projects',v:'12',sub:'with move demand',tone:'ok',icon:'proj'},{k:'Moves this month',v:'18',sub:'across the portfolio',tone:'ok',icon:'truck'},{k:'Awaiting taxonomy',v:'0',sub:'need confirmation',tone:'ok',icon:'tax',dyn:'tax'},{k:'Heavy hauls',v:'3',sub:'permit required',tone:'warn',icon:'warn'}],
      ns:'02S auto-generates most logistics events from delivery dates across the equipment, procurement, and prefab plans. Three oversize heavy hauls need permits, and a north-gate conflict on Oct 15 (switchgear haul vs tower-crane mobilization) is flagged for resequencing.',
      cap:'Every project\u2019s move demand, aggregated \u2014 deliveries, heavy hauls, and crane picks. 02S schedules windows, gates, and permits; the supply side is executed downstream in logistics.',
      rows:[
        {id:'REQ-L-3042',asset:'Excavator delivery + haul \u00b7 oversize',project:'Cimarron Data Center',tax:'Logistics \u203a Transport \u203a Heavy haul',taxOk:true,leaf:'Oversize',dec:'Self-perform',decTone:'ok',status:'Scheduled'},
        {id:'REQ-L-3054',asset:'Tower crane mobilization \u00b7 crane pick',project:'Riverside Medical Center',tax:'Logistics \u203a Crane \u203a Mobilization',taxOk:true,leaf:'Crane pick',dec:'3PL',decTone:'info',status:'Scheduled'},
        {id:'REQ-L-3061',asset:'BESS container placement \u00b7 haul + crane',project:'Hercules Solar + BESS',tax:'Logistics \u203a Transport \u203a Oversize',taxOk:true,leaf:'Haul + crane',dec:'3PL',decTone:'info',status:'Requested'}
      ],
      rollCols:['Move type','Peak count','Peak month','vs plan'],
      roll:[{a:'Deliveries',b:'24',c:'Sep 2026',v:'on plan',vt:'ok'},{a:'Heavy hauls',b:'3',c:'Oct 2026',v:'+1 over',vt:'warn'},{a:'Crane picks',b:'2',c:'Aug 2026',v:'on plan',vt:'ok'}],
      varSummary:'Heavy hauls one over plan \u2014 3 route to the same corridor within a week.',
      consol:{save:'~$18K + 1 permit',cta:'Combine hauls',detail:'3 heavy hauls route to the same corridor (Cimarron + Riverside) within one week. Combine permits and carrier into a single mobilization.'} },
    profservices:{ mount:'ccDpSvc', title:'Professional services demand plan', icon:'people', decCol:'Pricing',
      kpis:[{k:'Active projects',v:'9',sub:'with services demand',tone:'ok',icon:'proj'},{k:'Active FTEs',v:'14',sub:'across 6 firms',tone:'ok',icon:'people'},{k:'Awaiting taxonomy',v:'0',sub:'need confirmation',tone:'ok',icon:'tax',dyn:'tax'},{k:'Committed',v:'$3.2M',sub:'services \u00b7 portfolio',tone:'ok',icon:'dollar'}],
      ns:'02S maps each role to the canonical service taxonomy and to the CPM schedule \u2014 the BESS commissioning agent mobilizes as containers land, and unpriced specialty roles are flagged before they\u2019re needed on site.',
      cap:'Every project\u2019s professional-services demand, aggregated. Roles are priced from the 02S rate card; specialty roles are quoted by 02S after confirmation.',
      rows:[
        {id:'REQ-S-2101',asset:'Owner\u2019s engineer / IE support \u00b7 2 FTE',project:'Hercules Solar + BESS',tax:'Services \u203a Engineering \u203a Owner\u2019s engineer',taxOk:true,leaf:'IE support',dec:'Rate card',decTone:'ok',status:'Active'},
        {id:'REQ-S-2108',asset:'BESS commissioning agent \u00b7 2 FTE',project:'Hercules Solar + BESS',tax:'Services \u203a Commissioning \u203a BESS',taxOk:true,leaf:'BESS',dec:'Quoted',decTone:'info',status:'Projected'},
        {id:'REQ-S-2114',asset:'Structural special inspection \u00b7 2 FTE',project:'Riverside Medical Center',tax:'Services \u203a Inspection \u203a Structural',taxOk:true,leaf:'Structural',dec:'Rate card',decTone:'ok',status:'Active'}
      ],
      rollCols:['Discipline','Peak FTE','Peak period','vs plan'],
      roll:[{a:'Engineering',b:'6 FTE',c:'ongoing',v:'on plan',vt:'ok'},{a:'Inspection',b:'5 FTE',c:'Q3 2026',v:'+1 FTE',vt:'warn'},{a:'Commissioning',b:'3 FTE',c:'Q4 2026',v:'on plan',vt:'ok'}],
      varSummary:'Inspection one FTE over plan \u2014 overlapping scopes at two projects.',
      consol:{save:'~$40K/qtr',cta:'Blend inspection',detail:'Structural inspection demand overlaps Riverside and a second project. One firm can cover both at a blended rate instead of two separate MSAs.'} },
    procurement:{ mount:'ccDpProc', title:'Procurement demand plan', icon:'cart', decCol:'Order-by (lead)',
      kpis:[{k:'Active projects',v:'8',sub:'with long-lead demand',tone:'ok',icon:'proj'},{k:'Long-lead items',v:'5',sub:'12\u201330 wk lead times',tone:'warn',icon:'clock'},{k:'Awaiting taxonomy',v:'0',sub:'need confirmation',tone:'ok',icon:'tax',dyn:'tax'},{k:'At-risk',v:'2',sub:'order-by passed',tone:'bad',icon:'warn'}],
      ns:'02S back-calculates every order-by date from lead time and the schedule need-by \u2014 two long-lead items (switchgear, BESS containers) are already past order-by and flagged red; releasing the switchgear PO this week recovers the substation date.',
      cap:'Every project\u2019s long-lead procurement demand, aggregated. Order-by dates are computed from lead time and the schedule need-by; the pillar signal is order-by risk.',
      rows:[
        {id:'REQ-P-0501',asset:'MV switchgear \u00b7 15kV lineup \u00b7 qty 2',project:'Hercules Solar + BESS',tax:'Material \u203a Electrical \u203a Switchgear',taxOk:true,leaf:'15kV',dec:'May 1 \u00b7 24 wk',decTone:'bad',status:'At-risk'},
        {id:'REQ-P-0508',asset:'BESS containers \u00b7 2.5 MWh \u00b7 qty 6',project:'Hercules Solar + BESS',tax:'Material \u203a Energy storage \u203a BESS',taxOk:true,leaf:'2.5 MWh',dec:'May 15 \u00b7 30 wk',decTone:'bad',status:'At-risk'},
        {id:'REQ-P-0512',asset:'Main power transformer \u00b7 qty 1',project:'Hercules Solar + BESS',tax:'Material \u203a Electrical \u203a Transformer',taxOk:true,leaf:'MPT',dec:'Apr 15 \u00b7 28 wk',decTone:'neu',status:'PO issued'}
      ],
      rollCols:['Category','Committed','Order window','vs plan'],
      roll:[{a:'Electrical',b:'$3.5M',c:'Q2 2026',v:'+$0.3M',vt:'warn'},{a:'Energy storage',b:'$2.4M',c:'Q2 2026',v:'on plan',vt:'ok'},{a:'Modules',b:'$4.6M',c:'Q3 2026',v:'on plan',vt:'ok'}],
      varSummary:'Electrical spend $0.3M over plan \u2014 same OEM across two projects.',
      consol:{save:'~$110K + 2 wk',cta:'Combine POs',detail:'Switchgear and transformer share the same OEM across two projects. Combine POs to hit the next volume tier and shorten lead time.'} },
    prefab:{ mount:'ccDpPrefab', title:'Pre-fab demand plan', icon:'layers', decCol:'Stage',
      kpis:[{k:'Active projects',v:'6',sub:'with prefab demand',tone:'ok',icon:'proj'},{k:'Assemblies planned',v:'32',sub:'5 assembly types',tone:'ok',icon:'layers'},{k:'Awaiting taxonomy',v:'0',sub:'need confirmation',tone:'ok',icon:'tax',dyn:'tax'},{k:'On-track to need date',v:'4 of 5',sub:'1 awaiting submittal',tone:'warn',icon:'chart'}],
      ns:'02S ties each assembly\u2019s submittal \u2192 fabrication \u2192 delivery back to its install date \u2014 the BESS e-houses need submittal approval this week to protect November energization.',
      cap:'Every project\u2019s prefab demand, aggregated. Assemblies are made-to-order, so pricing is quoted by 02S after submittal; the pillar signal is fabrication stage.',
      rows:[
        {id:'REQ-F-021',asset:'Prefab pipe rack modules \u00b7 qty 12',project:'Hercules Solar + BESS',tax:'Assembly \u203a Mechanical \u203a Pipe rack',taxOk:true,leaf:'Pipe rack',dec:'In fab',decTone:'info',status:'In fabrication'},
        {id:'REQ-F-034',asset:'Modular e-houses \u00b7 BESS \u00b7 qty 2',project:'Hercules Solar + BESS',tax:'Assembly \u203a Electrical \u203a E-house',taxOk:true,leaf:'E-house',dec:'Submittal',decTone:'info',status:'Submittal'},
        {id:'REQ-F-041',asset:'L2 headwall assemblies \u00b7 qty 8',project:'Riverside Medical Center',tax:'Assembly \u203a Structural \u203a Headwall',taxOk:true,leaf:'Headwall',dec:'Delivered',decTone:'ok',status:'Delivered'}
      ],
      rollCols:['Assembly type','Peak units','Need-by','vs plan'],
      roll:[{a:'Mechanical',b:'12',c:'Aug 2026',v:'on plan',vt:'ok'},{a:'Electrical',b:'8',c:'Nov 2026',v:'on plan',vt:'ok'},{a:'Structural',b:'12',c:'Jul 2026',v:'+2 over',vt:'warn'}],
      varSummary:'Structural 2 assemblies over plan \u2014 batchable in one fab slot.',
      consol:{save:'~$35K',cta:'Batch fab run',detail:'E-house and structural assemblies can share one fab-shop slot. Batch the run to cut setup cost and protect the November date.'} }
  };
  var dpCur=null;
  function dpRowById(p,id){ var rs=CC_DP[p].rows; for(var i=0;i<rs.length;i++){ if(rs[i].id===id)return rs[i]; } return null; }
  function dpTaxCell(r){
    var CHK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>';
    var BOLT='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/></svg>';
    if(r.taxOk) return '<span class="dp-tax ok">'+CHK+r.tax+(r.leaf?(' \u203a '+r.leaf):'')+'</span>';
    return '<span class="dp-tax warn">'+BOLT+r.tax+' \u00b7 confirm</span>';
  }
  function dpReviewCell(p,r,ns){ if(r.taxOk){ return '<button class="btn btn-ghost btn-sm" onclick="dpReview(\''+p+'\',\''+r.id+'\')">View</button>'; } var cls=ns?'btn-red':'btn-dark'; return '<button class="btn '+cls+' btn-sm" onclick="dpReview(\''+p+'\',\''+r.id+'\')">Confirm</button>'; }
  function renderCcDemand(p){
    var cfg=CC_DP[p]; if(!cfg)return; var mount=gel(cfg.mount); if(!mount)return; var ns=CURRENT==='ns';
    var pending=0,ready=0; cfg.rows.forEach(function(r){ if(!r.taxOk)pending++; if(r.status==='Ready')ready++; });
    var h='<div class="phead"><div><h1>'+cfg.title+'</h1><div class="meta"><span class="chip">'+svg(dpIcon(cfg.icon))+'All projects \u00b7 portfolio</span><span class="chip ver">'+(ns?'North Star':'V1 \u2014 standard')+'</span></div></div></div>';
    h+='<div class="vitals">';
    cfg.kpis.forEach(function(k){ var v=k.v, tone=k.tone; if(k.dyn==='tax'){ v=''+pending; tone=pending>0?'warn':'ok'; } h+='<div class="vital '+tone+'"><div class="vk">'+svg(dpIcon(k.icon))+k.k+'</div><div class="vv">'+v+'</div><div class="vsub">'+k.sub+'</div></div>'; });
    h+='</div>';
    if(ns&&cfg.ns){ h+='<div class="ins-strip"><span class="isi">'+CC_SPARK+'</span><div><div class="ist">02S</div><div class="isd">'+cfg.ns+'</div></div></div>'; }
    h+='<div class="eq-cap">'+svg('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>')+'<span>'+cfg.cap+'</span></div>';
    h+='<div class="eq-toolbar"><span class="dp-sec-t">'+svg(dpIcon(cfg.icon))+'Requests from project teams</span><span class="spacer"></span><button class="btn '+(ns?'btn-red':'btn-dark')+' btn-sm" onclick="dpRelease(\''+p+'\')">Release ready ('+ready+') \u2192</button></div>';
    var gt='1.15fr 1.5fr 118px 108px 84px';
    h+='<div class="dp-tbl"><div class="dp-head" style="grid-template-columns:'+gt+'"><span>Request ID / asset</span><span>Taxonomy match</span><span>'+cfg.decCol+'</span><span>Status</span><span></span></div>';
    cfg.rows.forEach(function(r){
      h+='<div class="dp-row" style="grid-template-columns:'+gt+'"><div>'+r.id+'<div class="sub" style="white-space:normal">'+r.asset+' \u00b7 '+r.project+'</div></div><div>'+dpTaxCell(r)+'</div><div><span class="tag '+(r.decTone||'neu')+'">'+r.dec+'</span></div><div><span class="tag '+(DP_ST[r.status]||'neu')+'">'+r.status+'</span></div><div>'+dpReviewCell(p,r,ns)+'</div></div>';
    });
    h+='</div>';
    if(ns&&cfg.consol){ var cs=cfg.consol; h+='<div class="dp-consol">'+CC_SPARK+'<div class="dcx"><div class="dct">Cross-project consolidation <span class="dcsave">saves '+cs.save+'</span></div><div class="dcd">'+cs.detail+'</div></div><button class="btn btn-red btn-sm" onclick="dpConsolidate(\''+p+'\')">'+cs.cta+'</button></div>'; }
    h+='<div class="eq-toolbar" style="margin-top:20px"><span class="dp-sec-t">'+svg(IC.chart)+'Portfolio demand roll-up</span><span class="spacer"></span><span style="font-size:11.5px;color:var(--g500)">'+cfg.varSummary+'</span></div>';
    var gt2='1fr 150px 1fr 120px';
    h+='<div class="dp-tbl"><div class="dp-head" style="grid-template-columns:'+gt2+'">'+cfg.rollCols.map(function(c){return '<span>'+c+'</span>';}).join('')+'</div>';
    cfg.roll.forEach(function(rr){ h+='<div class="dp-row" style="grid-template-columns:'+gt2+'"><div>'+rr.a+'</div><div>'+rr.b+'</div><div style="font-weight:400;color:var(--g600)">'+rr.c+'</div><div><span class="tag '+(rr.vt||'neu')+'">'+rr.v+'</span></div></div>'; });
    h+='</div>';
    mount.innerHTML=h;
  }
  function dpReview(p,id){
    var r=dpRowById(p,id); if(!r)return; dpCur={p:p,id:id}; var ns=CURRENT==='ns'; var cfg=CC_DP[p];
    var b='<div class="fq-req"><div class="fq-req-t">'+r.id+'</div><div class="sub">'+r.asset+' \u00b7 '+r.project+'</div></div>';
    b+='<div class="fq-calc"><div class="fq-crow"><span>Requested taxonomy</span><span>'+r.tax+(r.leaf?(' \u203a '+r.leaf):'')+'</span></div>';
    if(!r.taxOk){
      var opts=(r.leafOpts||[r.mapLeaf]).map(function(o){ return '<option'+(o===r.mapLeaf?' selected':'')+'>'+o+'</option>'; }).join('');
      b+='<div class="fq-crow"><span>Class (L3)</span><span><select id="dpLeafSel" class="dp-sel">'+opts+'</select></span></div>';
    }
    b+='<div class="fq-crow"><span>'+cfg.decCol+'</span><span>'+r.dec+'</span></div><div class="fq-crow"><span>Status</span><span>'+r.status+'</span></div></div>';
    if(!r.taxOk){
      if(ns){ b+='<div class="fq-reco-badge">'+CC_SPARK+'02S mapped this to <b>'+r.tax+(r.mapLeaf?(' \u203a '+r.mapLeaf):'')+'</b> ('+(r.conf||'92')+'% confidence) \u2014 confirm, or adjust the class above</div>'; }
      else { b+='<div class="eq-cap">'+svg('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>')+'<span>Pick the class this request maps to in the 02S taxonomy, then confirm to release it for pricing and allocation.</span></div>'; }
      b+='<div class="modal-foot"><div class="mfoot-btns" style="margin-left:auto;display:flex;gap:8px"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-red" onclick="dpConfirmTax()">Confirm taxonomy</button></div></div>';
    } else {
      b+='<div class="eq-cap">'+svg('<path d="M20 6L9 17l-5-5"/>')+'<span>Taxonomy confirmed \u2014 this request is released to the Fulfillment queue for the owned vs re-rent decision.</span></div>';
      b+='<div class="modal-foot"><div class="mfoot-btns" style="margin-left:auto;display:flex;gap:8px"><button class="btn btn-ghost" onclick="closeModal()">Close</button><button class="btn btn-dark" onclick="dpOpenFulfill(\''+r.id+'\')">Open in Fulfillment queue</button></div></div>';
    }
    openModal((r.taxOk?'Request':'Confirm class')+' \u2014 '+r.id, b);
  }
  function dpConfirmTax(){ var r=dpRowById(dpCur.p,dpCur.id); if(!r)return; var sel=gel('dpLeafSel'); var chosen=(sel&&sel.value)?sel.value:(r.mapLeaf||''); r.taxOk=true; if(chosen)r.leaf=chosen; r.status='Ready'; closeModal(); renderCcDemand(dpCur.p); toast(r.id+' confirmed as '+r.tax+(r.leaf?(' \u203a '+r.leaf):'')+' \u2014 released to the Fulfillment queue'); }
  function dpRelease(p){ var rs=CC_DP[p].rows; var n=0; for(var i=0;i<rs.length;i++){ if(rs[i].status==='Ready')n++; } if(!n){ toast('No ready requests \u2014 confirm taxonomy first'); return; } toast(n+' ready request'+(n===1?'':'s')+' released to the Fulfillment queue'); }
  function dpConsolidate(p){ var cs=CC_DP[p].consol; if(!cs)return; toast('Consolidation queued \u2014 '+cs.cta.toLowerCase()+' \u00b7 est. '+cs.save+' saved'); }
  function dpOpenFulfill(ref){ ccHighlight=ref; fqFP='all'; fqFPr='all'; fqFS='all'; closeModal(); ccGo('fulfill'); }

  /* ═══════════ OTHER-PILLAR DEMAND PLANS (config-driven strawman) ═══════════ */
  var DP_TONE={'Active':'ok','Delivered':'ok','Complete':'ok','Installed':'ok','Approved':'ok','In transit':'info','In fabrication':'info','Submittal':'info','PO issued':'info','Scheduled':'info','Mobilized':'info','Projected':'info','Requested':'neu','Acknowledged':'neu','Draft':'neu','Demobilized':'neu','Pending pricing':'warn','At-risk':'bad'};
  var IC={dollar:'<path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>',check:'<path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/>',people:'<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/>',chart:'<path d="M3 3v18h18"/><path d="M7 13l3-3 4 4 5-5"/>',clock:'<circle cx="12" cy="12" r="10"/><path d="M12 7v5l3 2"/>',warn:'<path d="M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L14.7 3.9a2 2 0 00-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',cart:'<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 002 1.6h9.7a2 2 0 002-1.6L23 6H6"/>',box:'<path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><path d="M3.3 7L12 12l8.7-5"/>',layers:'<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>',truck:'<rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>',crane:'<path d="M10 3h4l7 7-4 4-7-7V3z"/><path d="M3 21h18M6 21v-6"/>'};
  var DP={
    profservices:{ title:'Professional services demand plan', chip:'Engineering, inspection &amp; commissioning', icon:IC.people, singular:'services',
      vitals:[{label:'Plan budget',value:'$3.2M',sub:'services \u00b7 15-mo horizon',tone:'ok',icon:IC.dollar},{label:'Committed to date',value:'$1.9M',sub:'59% \u00b7 6 roles active',tone:'ok',icon:IC.check},{label:'Active headcount',value:'14 FTE',sub:'across 6 firms',tone:'ok',icon:IC.people},{label:'Projected at complete',value:'$3.1M',sub:'+$0.1M under plan',tone:'ok',icon:IC.chart}],
      ns:'02S maps each role to the CPM schedule \u2014 the BESS commissioning agent mobilizes as the containers land, and the VDC role is flagged as unpriced before it\u2019s needed on site.',
      cap:'Roles are priced from the 02S rate card; specialty roles are quoted by 02S. The team sets headcount, mobilization window, and cost code.',
      cols:[{key:'role',label:'Role',sub:'firm',w:'1fr'},{key:'qty',label:'Headcount',cls:'c',w:'92px'},{key:'window',label:'Mobilize \u2192 demobilize',w:'176px'},{key:'code',label:'Cost code',w:'160px'},{key:'cost',label:'Monthly',cls:'r',w:'100px'},{key:'__state',label:'Status',w:'118px'}],
      add:{nameKey:'role',subKey:'firm',qtyKey:'qty',whenKey:'window',costKey:'cost'}, addName:{label:'Role',ph:'e.g. Commissioning agent'}, addQty:{label:'Headcount',ph:'e.g. 2 FTE'}, addWhen:{label:'Mobilize \u2192 demobilize',ph:'e.g. Nov 2026 \u2013 Mar 2027'},
      rows:[
        {role:'Owner\u2019s engineer / IE support',firm:'DNV',qty:'2 FTE',window:'Mar 2026 \u2013 Dec 2026',code:'01-100 \u00b7 General conditions',cost:'$28K/mo',state:'Active'},
        {role:'Geotechnical inspection',firm:'Terracon',qty:'3 FTE',window:'Mar 2026 \u2013 Aug 2026',code:'02-320 \u00b7 Site Earthwork',cost:'$18K/mo',state:'Active'},
        {role:'Structural special inspection',firm:'Terracon',qty:'2 FTE',window:'Jun 2026 \u2013 Feb 2027',code:'31-620 \u00b7 Solar Pile',cost:'$16K/mo',state:'Active'},
        {role:'BESS commissioning agent',firm:'3rd-party',qty:'2 FTE',window:'Nov 2026 \u2013 Mar 2027',code:'26-330 \u00b7 BESS &amp; Substation',cost:'$34K/mo',state:'Projected'},
        {role:'Environmental / SWPPP monitoring',firm:'SWCA',qty:'1 FTE',window:'Mar 2026 \u2013 May 2026',code:'01-100 \u00b7 General conditions',cost:'$9K/mo',state:'Draft'},
        {role:'VDC / BIM coordination',firm:'TBD \u2014 not in rate card',qty:'3 FTE',window:'Apr 2026 \u2013 Oct 2026',code:'01-100 \u00b7 General conditions',cost:'Pending',state:'Pending pricing'},
        {role:'Site survey crew',firm:'Bowman',qty:'2 FTE',window:'Apr 2026 \u2013 Jul 2026',code:'01-100 \u00b7 General conditions',cost:'$12K/mo',state:'Demobilized'}
      ]},
    procurement:{ title:'Procurement demand plan', chip:'Long-lead equipment &amp; materials', icon:IC.cart, singular:'procurement',
      vitals:[{label:'Committed',value:'$8.9M',sub:'materials &amp; equipment',tone:'ok',icon:IC.dollar},{label:'Long-lead items',value:'5',sub:'12\u201330 wk lead times',tone:'warn',icon:IC.clock},{label:'At-risk',value:'2',sub:'order-by date passed',tone:'bad',icon:IC.warn},{label:'On-time to need-by',value:'71%',sub:'5 of 7 tracking',tone:'warn',icon:IC.chart}],
      ns:'02S back-calculates every order-by date from lead time and the schedule need-by \u2014 two long-lead items are already past order-by and flagged red; releasing the switchgear PO this week recovers the substation date.',
      cap:'Order-by dates are computed from lead time and the schedule need-by. Prices come from the 02S catalog or vendor quote; specialty items are quoted by 02S.',
      cols:[{key:'item',label:'Item',sub:'itemSub',w:'1fr'},{key:'qty',label:'Qty',cls:'c',w:'86px'},{key:'needby',label:'Need-by',w:'96px'},{key:'orderby',label:'Order-by (lead)',w:'146px',flag:'risk'},{key:'code',label:'Cost code',w:'150px'},{key:'cost',label:'Ext.',cls:'r',w:'82px'},{key:'__state',label:'Status',w:'112px'}],
      add:{nameKey:'item',subKey:'itemSub',qtyKey:'qty',whenKey:'needby',costKey:'cost'}, addName:{label:'Item',ph:'e.g. Medium-voltage switchgear'}, addQty:{label:'Quantity',ph:'e.g. 2'}, addWhen:{label:'Need-by date',ph:'e.g. Oct 15'},
      rows:[
        {item:'Medium-voltage switchgear',itemSub:'15kV lineup',qty:'2',needby:'Oct 15',orderby:'May 1 \u00b7 24 wk',risk:true,code:'26-330 \u00b7 BESS',cost:'$1.4M',state:'At-risk'},
        {item:'Main power transformer',qty:'1',needby:'Nov 1',orderby:'Apr 15 \u00b7 28 wk',code:'26-330 \u00b7 BESS',cost:'$2.1M',state:'PO issued'},
        {item:'PV modules \u2014 tranche 1',qty:'40,000',needby:'Sep 1',orderby:'Jun 1 \u00b7 12 wk',code:'26-540 \u00b7 Module',cost:'$3.6M',state:'In transit'},
        {item:'String inverters',qty:'24',needby:'Sep 15',orderby:'Jun 15 \u00b7 14 wk',code:'26-540 \u00b7 Module',cost:'$980K',state:'PO issued'},
        {item:'BESS containers',itemSub:'2.5 MWh each',qty:'6',needby:'Dec 1',orderby:'May 15 \u00b7 30 wk',risk:true,code:'26-330 \u00b7 BESS',cost:'$2.4M',state:'At-risk'},
        {item:'Structural steel \u2014 racking',qty:'lot',needby:'Aug 1',orderby:'Jun 15 \u00b7 7 wk',code:'26-540 \u00b7 Module',cost:'$620K',state:'Delivered'},
        {item:'Cable &amp; conductors',qty:'lot',needby:'rolling',orderby:'rolling',code:'26-540 \u00b7 Module',cost:'$340K',state:'Draft'}
      ]},
    prefab:{ title:'Prefab demand plan', chip:'Shop-fabricated assemblies', icon:IC.layers, singular:'prefab',
      vitals:[{label:'Assemblies planned',value:'32',sub:'5 assembly types',tone:'ok',icon:IC.layers},{label:'In fabrication',value:'16',sub:'2 shops',tone:'info',icon:IC.box},{label:'Committed',value:'$0.9M',sub:'made-to-order',tone:'ok',icon:IC.dollar},{label:'On-track to need date',value:'4 of 5',sub:'1 awaiting submittal',tone:'warn',icon:IC.chart}],
      ns:'02S ties each assembly\u2019s submittal \u2192 fabrication \u2192 delivery back to its install date \u2014 the BESS e-houses need submittal approval this week to protect November energization.',
      cap:'Assemblies are made-to-order, so pricing is quoted by 02S after submittal. The team sets quantity, need-on-site date, and cost code.',
      cols:[{key:'asm',label:'Assembly',w:'1fr'},{key:'qty',label:'Qty',cls:'c',w:'80px'},{key:'need',label:'Need on-site',w:'114px'},{key:'stage',label:'Submittal \u2192 fab \u2192 deliver',w:'190px'},{key:'code',label:'Cost code',w:'150px'},{key:'cost',label:'Quote',cls:'r',w:'96px'},{key:'__state',label:'Status',w:'124px'}],
      add:{nameKey:'asm',qtyKey:'qty',whenKey:'need',costKey:'cost'}, addName:{label:'Assembly',ph:'e.g. Modular e-house'}, addQty:{label:'Quantity',ph:'e.g. 2'}, addWhen:{label:'Need on-site',ph:'e.g. Nov 1'},
      rows:[
        {asm:'Prefab pipe rack modules',qty:'12',need:'Aug 15',stage:'Submittal approved \u00b7 in fab',code:'26-540 \u00b7 Module',cost:'$146K',state:'In fabrication'},
        {asm:'L2 headwall assemblies',qty:'8',need:'Jul 20',stage:'Delivered \u00b7 order PF-021',code:'26-540 \u00b7 Module',cost:'$147K',state:'Delivered'},
        {asm:'Modular e-houses (BESS)',qty:'2',need:'Nov 1',stage:'Submittal in review',code:'26-330 \u00b7 BESS',cost:'Pending',state:'Submittal'},
        {asm:'Skid-mounted pump assemblies',qty:'4',need:'Sep 1',stage:'In fabrication',code:'02-320 \u00b7 Site Earthwork',cost:'$88K',state:'In fabrication'},
        {asm:'Prefab cable tray runs',qty:'lot',need:'Aug 1',stage:'Not started',code:'26-540 \u00b7 Module',cost:'Pending',state:'Draft'}
      ]},
    logistics:{ title:'Logistics demand plan', chip:'Deliveries, hauls &amp; site moves', icon:IC.truck, singular:'logistics',
      vitals:[{label:'Moves this week',value:'6',sub:'2 heavy hauls',tone:'info',icon:IC.truck},{label:'Heavy hauls (oversize)',value:'3',sub:'permit required',tone:'warn',icon:IC.warn},{label:'Crane picks',value:'2',sub:'scheduled this month',tone:'ok',icon:IC.crane},{label:'Laydown utilization',value:'78%',sub:'Yards A\u2013C',tone:'warn',icon:IC.chart}],
      ns:'02S auto-generates most logistics events from delivery dates across the equipment, procurement, and prefab plans \u2014 and flagged a north-gate conflict where the switchgear haul overlaps tower-crane mobilization.',
      cap:'Most moves are auto-created from delivery dates in the other plans. Add ad-hoc moves here; 02S schedules windows, gates, and permits.',
      cols:[{key:'move',label:'Move / event',sub:'moveSub',w:'1fr'},{key:'type',label:'Type',w:'126px'},{key:'when',label:'Date &amp; window',w:'150px'},{key:'gate',label:'Route / gate',w:'124px'},{key:'src',label:'Source',w:'118px'},{key:'__state',label:'Status',w:'114px'}],
      add:{nameKey:'move',subKey:'moveSub',qtyKey:'type',whenKey:'when'}, addName:{label:'Move / event',ph:'e.g. Crane pick \u2014 module racking'}, addQty:{label:'Type',ph:'Delivery / Heavy haul / Crane pick'}, addWhen:{label:'Date &amp; window',ph:'e.g. Aug 15 \u00b7 6 AM'},
      rows:[
        {move:'Excavator delivery',type:'Heavy haul',when:'May 20 \u00b7 6\u201310 AM',gate:'North gate',src:'ORD-3042',state:'Scheduled'},
        {move:'MV switchgear delivery',moveSub:'oversize load',type:'Heavy haul',when:'Oct 15 \u00b7 TBD',gate:'North gate',src:'Procurement',state:'Requested'},
        {move:'Tower crane mobilization',type:'Crane pick',when:'Aug 3 \u00b7 5 AM',gate:'Laydown A',src:'ORD-3054',state:'Scheduled'},
        {move:'PV module deliveries',moveSub:'recurring',type:'Delivery',when:'Sep \u00b7 daily',gate:'East gate',src:'Procurement',state:'Requested'},
        {move:'BESS container placement',type:'Haul + crane',when:'Dec 1',gate:'Pad 3',src:'Procurement',state:'Requested'},
        {move:'Prefab pipe rack delivery',type:'Delivery',when:'Aug 15',gate:'Laydown B',src:'Prefab',state:'Requested'},
        {move:'Site laydown reservation',type:'Laydown',when:'Ongoing',gate:'Yard C',src:'\u2014',state:'Active'}
      ]}
  };
  var dpActive=null, dpAddPk=null;
  function dpGv(id){ var e=document.getElementById(id); return e?(''+e.value):''; }
  function dpCodeOpts(){ var c=['01-100 \u00b7 General conditions','02-320 \u00b7 Site Earthwork','31-620 \u00b7 Solar Pile','26-540 \u00b7 Module Racking','26-330 \u00b7 BESS &amp; Substation','01-540 \u00b7 Temporary Power']; return c.map(function(x){return '<option>'+x+'</option>';}).join(''); }
  function renderDP(pk){
    var cfg=DP[pk], mount=document.getElementById('dp-'+pk); if(!cfg||!mount)return;
    var ns=CURRENT==='ns';
    var h='<div class="phead"><div><h1>'+cfg.title+'</h1><div class="meta"><span class="chip">'+svg(cfg.icon)+cfg.chip+'</span><span class="chip ver">'+(ns?'North Star':'V1 \u2014 standard')+'</span></div></div></div>';
    h+='<div class="vitals">';
    cfg.vitals.forEach(function(v){ h+='<div class="vital '+(v.tone||'ok')+'"><div class="vk">'+svg(v.icon||IC.check)+v.label+'</div><div class="vv">'+v.value+'</div><div class="vsub">'+(v.sub||'')+'</div></div>'; });
    h+='</div>';
    if(ns&&cfg.ns){ h+='<div class="ins-strip"><span class="isi"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6 4.5 2.3 7.1L12 16.9 5.3 21l2.3-7.1-6-4.5h7.6z"/></svg></span><div><div class="ist">02S</div><div class="isd">'+cfg.ns+'</div></div></div>'; }
    h+='<div class="eq-toolbar"><span class="spacer"></span><button class="btn btn-dark btn-sm" onclick="openDPAdd(\''+pk+'\')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>Add demand line</button><button class="btn btn-red btn-sm" onclick="dpSubmit(\''+pk+'\')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>Submit to 02S</button></div>';
    h+='<div class="eq-cap">'+svg('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>')+'<span>'+cfg.cap+'</span></div>';
    var gt=cfg.cols.map(function(c){return c.w;}).join(' ');
    h+='<div class="dp-tbl"><div class="dp-head" style="grid-template-columns:'+gt+'">';
    cfg.cols.forEach(function(c){ h+='<span class="'+(c.cls||'')+'">'+c.label+'</span>'; });
    h+='</div>';
    cfg.rows.forEach(function(r){
      h+='<div class="dp-row" style="grid-template-columns:'+gt+'">';
      cfg.cols.forEach(function(c){
        if(c.key==='__state'){ var t=DP_TONE[r.state]||'neu'; h+='<div class="'+(c.cls||'')+'"><span class="tag '+t+'">'+r.state+'</span></div>'; }
        else { var main=(r[c.key]!=null&&r[c.key]!=='')?r[c.key]:'\u2014'; var sub=(c.sub&&r[c.sub])?'<div class="sub">'+r[c.sub]+'</div>':''; var cls=(c.cls||'')+((c.flag&&r[c.flag])?' dp-risk':''); h+='<div class="'+cls+'">'+main+sub+'</div>'; }
      });
      h+='</div>';
    });
    h+='</div>';
    mount.innerHTML=h;
  }
  function openDPAdd(pk){ dpAddPk=pk; var cfg=DP[pk];
    var f='<div class="mform">';
    f+='<div class="mf"><label>'+cfg.addName.label+'</label><input id="dpaName" class="rin" placeholder="'+cfg.addName.ph+'"></div>';
    f+='<div class="mf2"><div class="mf"><label>'+cfg.addQty.label+'</label><input id="dpaQty" class="rin" placeholder="'+cfg.addQty.ph+'"></div><div class="mf"><label>'+cfg.addWhen.label+'</label><input id="dpaWhen" class="rin" placeholder="'+cfg.addWhen.ph+'"></div></div>';
    f+='<div class="mf"><label>Cost code</label><select id="dpaCode" class="acc-sel wfull">'+dpCodeOpts()+'</select></div>';
    f+='<div class="mf"><label>Scope / notes <span class="opt">optional</span></label><input id="dpaScope" class="rin" placeholder="Schedule activity or note"></div>';
    f+='<div class="eqf-rate pending">'+svg('<circle cx="12" cy="12" r="10"/><path d="M12 7v5l3 2"/>',2)+'<span><b>Pricing set by 02S</b> \u2014 the rate or quote is sourced from the 02S catalog or priced by 02S admin after you submit.</span></div>';
    f+='</div>';
    openModal('Add '+cfg.singular+' demand line', f+'<div class="modal-foot"><div class="mfoot-btns" style="margin-left:auto"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-red" onclick="dpAddSave()">Request &amp; add</button></div></div>');
  }
  function dpAddSave(){
    var pk=dpAddPk, cfg=DP[pk], a=cfg.add;
    var name=dpGv('dpaName').trim(); if(!name){ toast('Enter a name first'); return; }
    var row={state:'Pending pricing'};
    row[a.nameKey]=name;
    if(a.subKey){ var sc=dpGv('dpaScope').trim(); if(sc)row[a.subKey]=sc; }
    row[a.qtyKey]=dpGv('dpaQty')||'\u2014';
    row[a.whenKey]=dpGv('dpaWhen')||'\u2014';
    row.code=dpGv('dpaCode');
    if(a.costKey)row[a.costKey]='Pending';
    cfg.rows.push(row); closeModal(); renderDP(pk);
    toast('Demand line added \u2014 pricing request routed to 02S admin');
  }
  function dpSubmit(pk){ var cfg=DP[pk],n=0; cfg.rows.forEach(function(r){ if(r.state==='Draft'){ r.state='Requested'; n++; } }); if(!n){ var p=0; cfg.rows.forEach(function(r){if(r.state==='Pending pricing')p++;}); toast(p?(p+' line'+(p===1?'':'s')+' still awaiting 02S pricing \u2014 can\u2019t submit until priced'):'No draft lines to submit'); return; } renderDP(pk); toast(n+' line'+(n===1?'':'s')+' submitted to 02S'); }
  function go(screen){
    document.querySelectorAll('.screen').forEach(function(s){s.classList.remove('active')});
    document.getElementById('screen-'+screen).classList.add('active');
    document.getElementById('nav-dashboard').classList.toggle('active',screen==='dashboard');
    document.getElementById('nav-order').classList.toggle('active',screen==='order');
    var neq=document.getElementById('nav-equip'); if(neq) neq.classList.toggle('active',screen==='equip');
    var no=document.getElementById('nav-orders'); if(no) no.classList.toggle('active',screen==='orders');
    var nb=document.getElementById('nav-billing'); if(nb) nb.classList.toggle('active',screen==='billing');
    var npf=document.getElementById('nav-profile'); if(npf) npf.classList.toggle('active',screen==='profile');
    var nct=document.getElementById('nav-contact'); if(nct) nct.classList.toggle('active',screen==='contact');
    ['profservices','procurement','prefab','logistics'].forEach(function(pk){ var n=document.getElementById('nav-dp-'+pk); if(n)n.classList.toggle('active',screen==='dp-'+pk); });
    if(screen.indexOf('dp-')===0){ dpActive=screen.slice(3); renderDP(dpActive); } else dpActive=null;
    if(screen==='order'){ backToCatalog(); renderPills(); renderCatalog(); renderCart(); }
    if(screen==='orders'){ renderOrders(); renderOrdInsights(); }
    if(screen==='billing'){ renderBills(); renderPending(); renderBillInsights(); }
    if(screen==='equip') eqRefresh();
    if(screen==='profile'){ renderTeam(); renderEscalation(); renderProfileInsights(); }
    window.scrollTo(0,0);
  }

  /* ═══════════ VERSION TOGGLE ═══════════ */

  function enterCC() {
    var uc=document.getElementById('uc'); if(uc)uc.style.display='none';
    var lp=document.getElementById('landing'); if(lp)lp.style.display='none';
    var ap=document.querySelector('.app'); if(ap)ap.style.display='none';
    var cc=document.getElementById('ccApp'); if(cc)cc.style.display='flex';
    ccSyncToggle(); ccGo('ccdash'); window.scrollTo(0,0);
  }
  function backFromCC() {
    var cc=document.getElementById('ccApp'); if(cc)cc.style.display='none';
    var lp=document.getElementById('landing'); if(lp)lp.style.display='flex';
  }


  /* ═══════════ CONTROL TOWER ═══════════ */
  function enterCT(){
    var uc=document.getElementById('uc'); if(uc)uc.style.display='none';
    var lp=document.getElementById('landing'); if(lp)lp.style.display='none';
    var ap=document.querySelector('.app'); if(ap)ap.style.display='none';
    var cc=document.getElementById('ccApp'); if(cc)cc.style.display='none';
    var ct=document.getElementById('ctApp'); if(ct)ct.style.display='flex';
    ctSetVer('ns');
  }
  function backFromCT(){
    var ct=document.getElementById('ctApp'); if(ct)ct.style.display='none';
    var lp=document.getElementById('landing'); if(lp)lp.style.display='flex';
  }
  function ctNav(id){
    document.querySelectorAll('#ctApp .cc-screen').forEach(function(s){s.style.display='none';});
    document.querySelectorAll('#ctApp .sb-item').forEach(function(b){b.classList.remove('active');});
    var screen=document.getElementById(id); if(screen)screen.style.display='block';
    var btn=document.querySelector('#ctApp .sb-item[data-screen="'+id+'"]'); if(btn)btn.classList.add('active');
    if(typeof ctNavNsInit==='function')ctNavNsInit(id);
  }
  function ctSetVer(v){
    var ns=v==='ns';
    var bv1=document.getElementById('ctBtnV1'); if(bv1)bv1.classList.toggle('on',!ns);
    var bns=document.getElementById('ctBtnNS'); if(bns)bns.classList.toggle('on',ns);
    var nv1=document.getElementById('ctNavV1'); if(nv1)nv1.style.display=ns?'none':'';
    var nns=document.getElementById('ctNavNS'); if(nns)nns.style.display=ns?'':'none';
    ctNav(ns?'ct-main':'ct-opp-list');
  }
  function ctPillarTab(el){
    el.parentElement.querySelectorAll('.opp-tab').forEach(function(t){t.classList.remove('active');});
    el.classList.add('active');
    toast(el.textContent.trim()+' pillar — demo shows Equipment detail');
  }

/* ═══ CT North Star icons + helpers ═══ */
var CT_ICONS={grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',chart:'<line x1="3" y1="21" x2="21" y2="21"/><rect x="5" y="11" width="3" height="8" rx="1"/><rect x="10.5" y="6" width="3" height="13" rx="1"/><rect x="16" y="14" width="3" height="5" rx="1"/>',layers:'<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 12 12 17 22 12"/><polyline points="2 17 12 22 22 17"/>',dollar:'<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',flag:'<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>',check:'<polyline points="20 6 9 17 4 12"/>',sparkle:'<path d="M12 3l1.6 5L18 9.5l-4.4 1.5L12 16l-1.6-5L6 9.5 10.4 8 12 3z"/>',bulb:'<path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2z"/>',search:'<circle cx="11" cy="11" r="7.5"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',chevronRight:'<polyline points="9 18 15 12 9 6"/>',send:'<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',team:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',box:'<path d="M21 8v8a2 2 0 0 1-1 1.73l-7 4a2 2 0 0 1-2 0l-7-4A2 2 0 0 1 3 16V8a2 2 0 0 1 1-1.73l7-4a2 2 0 0 1 2 0l7 4A2 2 0 0 1 21 8z"/>',gauge:'<path d="M3.5 13a8.5 8.5 0 1 1 17 0"/><line x1="12" y1="13" x2="8.5" y2="9.5"/><circle cx="12" cy="13" r="1.2"/>',link:'<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',receipt:'<path d="M6 2h12v20l-3-2-3 2-3-2-3 2V2z"/>',warning:'<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',close:'<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>'};
function ctIc(name,sz){sz=sz||16;return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:'+sz+'px;height:'+sz+'px;flex-shrink:0">'+(CT_ICONS[name]||'')+'</svg>';}

/* Allocation flow data */
var AF_DATA=[
  ['gauge','Regional utilization','How busy each region\'s crews and fleet are — the base 02S allocates against.','Bay Area 88% · Mountain 72% · Southwest 91%'],
  ['chart','National market splits','How results split across Building, Infrastructure, and Industrial markets.','Building 46% · Infra 34% · Industrial 20%'],
  ['team','Resource / cost allocation','Shared crews, equipment, and overhead assigned to the jobs that used them.','$42M shared cost allocated across 61 jobs'],
  ['box','Project / opportunity','Everything lands on the project (or opportunity) it belongs to — the leaf of the flow.','634 opportunities · 226 with margin plans']
];
function ctAllocPick(el,i){el.parentElement.querySelectorAll('.af-step').forEach(function(s){s.classList.remove('on');});el.classList.add('on');var d=AF_DATA[i],box=document.getElementById('afDetail');if(box)box.innerHTML='<div class="af-d-t">'+ctIc(d[0],14)+' '+d[1]+'</div><div class="af-d-b">'+d[2]+'</div><div class="af-d-m">'+d[3]+'</div>';}

/* Waterfall data */
var WF_DATA=[
  ['Gross margin','$472M','Revenue less direct project cost.','var(--charcoal)'],
  ['Less: project costs','−$132M','Field labor, equipment, materials on the job.','var(--red)'],
  ['Less: market G&A','−$66M','Regional office & market-level overhead.','var(--red)'],
  ['Less: national G&A','−$57M','Shared services allocated nationally.','var(--red)'],
  ['Less: enterprise G&A','−$47M','Corporate overhead allocation.','var(--red)'],
  ['Operating profit','$170M','What drops through to the bottom line.','var(--success)']
];
function ctWfPick(el,i){el.closest('.waterfall').querySelectorAll('.wf-row').forEach(function(r){r.classList.remove('on');});el.classList.add('on');var d=WF_DATA[i],box=document.getElementById('wfDetail');if(box)box.innerHTML='<div class="af-d-t">'+d[0]+' \xb7 <span style="color:'+d[3]+'">'+d[1]+'</span></div><div class="af-d-b">'+d[2]+'</div>';}

/* FY Forecast — 5 02S pillars */
var CT_PILLAR_STACK='<div style="height:40%;background:var(--red)"></div><div style="height:29%;background:var(--charcoal)"></div><div style="height:17%;background:var(--info)"></div><div style="height:7%;background:var(--warning)"></div><div style="height:7%;background:var(--g400)"></div>';
var CT_PILLAR_LEGEND='<div class="ct-legend" style="margin-top:10px"><span><i style="background:var(--red)"></i>Equipment</span><span><i style="background:var(--charcoal)"></i>Procurement</span><span><i style="background:var(--info)"></i>Logistics</span><span><i style="background:var(--warning)"></i>Prof. Services</span><span><i style="background:var(--g400)"></i>Prefab</span></div>';
function ctForecastView(yr){
  var FY={
    FY25:{focus:2,bars:[['FY23A',55],['FY24A',68],['FY25F',82],['FY26F',94],['FY27F',100]],total:'$1.31B',yoy:'+21% vs FY24',win:'62%',
      cols:['FY23A','FY24A','FY25F','FY26F','FY27F'],hi:2,
      rows:[['Equipment','$332M','$432M','$524M','$632M','$760M'],['Procurement','$241M','$313M','$380M','$458M','$551M'],['Logistics','$141M','$184M','$223M','$269M','$324M'],['Prefabrication','$60M','$78M','$95M','$115M','$139M'],['Prof. Services','$55M','$71M','$88M','$106M','$126M']],
      note:'FY 2025 is mostly committed — 82% of the forecast is backed by won or in-execution work.'},
    FY26:{focus:3,bars:[['FY24A',68],['FY25F',82],['FY26F',94],['FY27F',100],['FY28F',108]],total:'$1.58B',yoy:'+15% vs FY25',win:'44%',
      cols:['FY24A','FY25F','FY26F','FY27F','FY28F'],hi:2,
      rows:[['Equipment','$432M','$524M','$632M','$760M','$900M'],['Procurement','$313M','$380M','$458M','$551M','$650M'],['Logistics','$184M','$223M','$269M','$324M','$385M'],['Prefabrication','$78M','$95M','$115M','$139M','$165M'],['Prof. Services','$71M','$88M','$106M','$126M','$148M']],
      note:'FY 2026 leans more on pipeline — only 44% is committed today, so scenario range is wider.'}
  }[yr];
  var bars=FY.bars.map(function(b,i){return '<div class="ctb"><div class="ctb-stack'+(i===FY.focus?' focus':'')+'" style="height:'+b[1]+'%">'+CT_PILLAR_STACK+'</div><div class="ctb-l'+(i===FY.focus?' focus':'')+'">'+b[0]+'</div></div>';}).join('');
  var cols=FY.cols.length;
  var gtc='2fr'+' 1fr'.repeat(cols);
  var rowHtml=FY.rows.map(function(r){return '<div class="lrow" style="grid-template-columns:'+gtc+'"><div class="lrow-pri">'+r[0]+'</div>'+r.slice(1).map(function(v,i){return '<div'+(i===FY.hi?' style="font-weight:800;color:var(--red)"':'')+'>'+v+'</div>';}).join('')+'</div>';}).join('');
  var colHdr=FY.cols.map(function(c){return '<div>'+c+'</div>';}).join('');
  return '<div class="ct-fy-summary"><div class="cfs"><div class="cfs-n">'+FY.total+'</div><div class="cfs-k">'+(yr==='FY25'?'FY25':'FY26')+' forecast revenue</div></div><div class="cfs-div"></div><div class="cfs"><div class="cfs-n" style="color:var(--success)">'+FY.yoy+'</div><div class="cfs-k">year-over-year growth</div></div><div class="cfs-div"></div><div class="cfs"><div class="cfs-n">'+FY.win+'</div><div class="cfs-k">committed vs pipeline</div></div></div>'
  +'<div class="card" style="margin-top:14px"><div class="ch"><span class="t">FY forecast by pillar</span><span class="sub">$ millions \xb7 '+(yr==='FY25'?'FY 2025 view':'FY 2026 view')+'</span></div><div class="ct-bars big">'+bars+'</div>'+CT_PILLAR_LEGEND+'<div class="cfs-note">'+FY.note+'</div></div>'
  +'<div class="card" style="margin-top:16px"><div class="ch"><span class="t">By 02S pillar</span><span class="sub">'+(yr==='FY25'?'anchored on FY25F':'anchored on FY26F')+'</span></div><div class="list"><div class="lrow lhead" style="grid-template-columns:'+gtc+'"><div>Pillar</div>'+colHdr+'</div>'+rowHtml+'</div></div>';
}
function ctForecastYear(el,yr){el.parentElement.querySelectorAll('button').forEach(function(b){b.classList.remove('on');});el.classList.add('on');var c=document.getElementById('ctForecast');if(c)c.innerHTML=yr==='YTD'?ctForecastYTD():ctForecastView(yr);}
function ctForecastYTD(){
  var months=[['Jan','$44M',22],['Feb','$76M',38],['Mar','$112M',56],['Apr','$148M',74],['May','$180M',90]];
  var bars=months.map(function(m){return '<div class="ctb"><div class="ctb-stack" style="height:'+m[2]+'%">'+CT_PILLAR_STACK+'</div><div class="ctb-l">'+m[0]+'</div></div>';}).join('');
  var vals=months.map(function(m){return '<div class="ctbv">'+m[1]+'</div>';}).join('');
  var rows=[['January','$17M','$12M','$7M','$3M','$5M','$44M'],['February','$29M','$21M','$13M','$5M','$8M','$76M'],['March','$44M','$31M','$18M','$7M','$12M','$112M'],['April','$57M','$41M','$25M','$9M','$16M','$148M'],['May','$69M','$50M','$31M','$12M','$18M','$180M']];
  var gtc='1.4fr 1fr 1fr 1fr 1fr 1fr 1fr';
  var hdr='<div class="lrow lhead" style="grid-template-columns:'+gtc+'"><div>Month</div><div>Equipment</div><div>Procurement</div><div>Logistics</div><div>Prefab</div><div>Prof. Svcs</div><div>Total</div></div>';
  var rowHtml=rows.map(function(r){return '<div class="lrow" style="grid-template-columns:'+gtc+'">'+r.map(function(v,i){return '<div'+(i===6?' style="font-weight:700;color:var(--charcoal)"':'')+'>'+v+'</div>';}).join('')+'</div>';}).join('');
  return '<div class="ct-fy-summary"><div class="cfs"><div class="cfs-n">$560M</div><div class="cfs-k">YTD revenue · Jan–May</div></div><div class="cfs-div"></div><div class="cfs"><div class="cfs-n" style="color:var(--success)">43%</div><div class="cfs-k">of $1.31B FY25 annual</div></div><div class="cfs-div"></div><div class="cfs"><div class="cfs-n" style="color:var(--success)">On track</div><div class="cfs-k">vs. annual plan</div></div></div>'
  +'<div class="card" style="margin-top:14px"><div class="ch"><span class="t">Monthly 02S revenue</span><span class="sub">FY25 YTD · Jan–May · by pillar</span></div><div class="ctb-values">'+vals+'</div><div class="ct-bars big">'+bars+'</div>'+CT_PILLAR_LEGEND+'</div>'
  +'<div class="card" style="margin-top:16px"><div class="ch"><span class="t">By month &amp; pillar</span><span class="sub">$ millions</span></div><div class="list">'+hdr+rowHtml+'</div></div>';
}
function openD2CModal(){
  openModal('Direct-to-client flag',
    '<div class="opp-flag" style="margin:0 0 14px;font-size:12px">The D2C flag classifies an opportunity as directly contracted with the end client — bypassing standard channel routing. This affects market split, cost allocation, and G&amp;A treatment.</div>'
    +'<div style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--g500);margin-bottom:8px">Flagged opportunities</div>'
    +'<table class="mini ct-opp-tbl" style="margin-bottom:14px"><tr><th>Opportunity</th><th>Pillar</th><th>Value</th><th>Status</th></tr>'
    +'<tr><td>Fountain Valley WTP</td><td>Equipment</td><td>$40.0M</td><td><span class="chip red" style="font-size:10px">Active</span></td></tr>'
    +'<tr><td>Mercy Hospital</td><td>Prof. Svcs</td><td>$210.0M</td><td><span class="chip warn" style="font-size:10px">Pending</span></td></tr>'
    +'<tr><td>Route 9 Widening</td><td>Procurement</td><td>$28.5M</td><td><span class="chip warn" style="font-size:10px">Pending</span></td></tr>'
    +'</table>'
    +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px">'
    +'<div style="background:rgba(220,29,52,.04);border:1px solid rgba(220,29,52,.12);border-radius:6px;padding:10px 12px"><div class="stat-sub">Revenue impact</div><div style="font-size:18px;font-weight:800;color:var(--charcoal)">+$4.2M</div></div>'
    +'<div style="background:rgba(220,29,52,.04);border:1px solid rgba(220,29,52,.12);border-radius:6px;padding:10px 12px"><div class="stat-sub">Margin impact</div><div style="font-size:18px;font-weight:800;color:var(--charcoal)">+2.1pp</div></div>'
    +'</div>'
    +'<div style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--g500);margin-bottom:8px">What changes</div>'
    +'<div class="fpa-checks" style="margin-bottom:14px">'
    +'<div class="fpa-check"><span class="fc-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Market split reclassified to Direct segment</div>'
    +'<div class="fpa-check"><span class="fc-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>G&amp;A rate adjusted to direct-client tier</div>'
    +'<div class="fpa-check"><span class="fc-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Allocation flow bypasses standard regional split</div>'
    +'</div>'
    +'<div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal()">Close</button><button class="btn btn-red" onclick="closeModal();ctNav(\'ct-allocation\')">View allocation flow →</button></div>'
  );
}

/* Margin drill modal — uses existing openModal pattern */
function ctDraftPlans(){
  var rows=[['Mercy Hospital','9.0%','9.4%'],['Civic Center Ph.2','8.0%','7.8%'],['Baystate Med','9.0%','9.1%'],['Route 9 Widening','7.5%','7.9%']];
  var rowHtml=rows.map(function(r){return '<div class="lrow" style="grid-template-columns:1.7fr 1fr 1fr"><div class="lrow-pri">'+r[0]+'</div><div style="color:var(--g500)">'+r[1]+' <span style="font-size:10px">TAM</span></div><div><span class="chip ok">'+r[2]+' drafted</span></div></div>';}).join('');
  var body='<div class="ai-panel" style="margin:0 0 12px"><div class="aih"><div class="ico">'+ctIc('sparkle',16)+'</div><div class="t">02S can draft these from the estimates</div></div><div class="ctx" style="margin-bottom:0">Rather than defaulting to TAM, 02S drafts a margin plan for each opportunity from its estimate and pillar mix — leadership reviews and approves instead of building from scratch.</div></div><div class="list"><div class="lrow lhead" style="grid-template-columns:1.7fr 1fr 1fr"><div>Opportunity</div><div>TAM default</div><div>02S draft</div></div>'+rowHtml+'<div style="font-size:11px;color:var(--g500);padding:8px 4px">+ 8 more</div></div>'
  +'<div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal()">Not now</button><button class="btn btn-dark" onclick="closeModal();toast(\'12 margin plans drafted — routed to leadership for review\')">'+ctIc('check',14)+' Draft all 12 for review</button></div>';
  openModal('<div><h3 style="margin:0 0 2px">Draft the missing margin plans</h3><div class="sub">12 opportunities \xb7 $14M without a plan</div></div>', body);
}
function ctMarginDrill(pillar){
  var D={Equipment:{plan:'8.4%',tgt:'9.0%',d:'−60 bps',drivers:[['Re-rent premium on cranes','+$1.8M cost','red'],['Idle-unit billing','+$0.3M','warn'],['Owned-fleet mix improving','−$0.4M','ok']],lever:'Pull the tower-crane buy forward — see the CAPEX plan.'},Prefab:{plan:'10.2%',tgt:'11.0%',d:'−80 bps',drivers:[['Dallas shop at capacity','overtime premium + delay','red'],['Re-route to St. Louis','recoverable','warn'],['Standardized assemblies','helping','ok']],lever:'Move pull-forward pre-builds to St. Louis or Arizona.'},Procurement:{plan:'6.3%',tgt:'6.0%',d:'+30 bps',drivers:[['Consolidated supplier volume','saving','ok'],['Preferred-tier rebates','saving','ok']],lever:'Hold the line — consolidation is working.'}}[pillar]||{plan:'—',tgt:'—',d:'',drivers:[],lever:''};
  var driverHtml=D.drivers.map(function(dr){var c=dr[2]==='red'?'var(--red)':dr[2]==='warn'?'var(--warning)':'var(--success)';return '<div class="lrow" style="grid-template-columns:1.8fr 1fr"><div class="lrow-pri"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:'+c+';margin-right:6px;flex-shrink:0"></span>'+dr[0]+'</div><div style="text-align:right;color:var(--g500);font-size:11.5px">'+dr[1]+'</div></div>';}).join('');
  var body='<div style="font-size:12px;color:var(--g700);font-weight:700;margin-bottom:8px">What\'s moving it</div><div class="list">'+driverHtml+'</div><div class="ai-panel" style="margin-top:12px"><div class="aih"><div class="ico">'+ctIc('bulb',16)+'</div><div class="t">Recommended lever</div></div><div class="ctx" style="margin-bottom:0">'+D.lever+'</div></div>'
  +'<div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal()">Close</button><button class="btn btn-dark" onclick="closeModal();toast(\'Added to the action plan\')">'+ctIc('send',14)+' Add lever to action plan</button></div>';
  openModal('<div><h3 style="margin:0 0 2px">'+pillar+' margin</h3><div class="sub">plan '+D.plan+' vs target '+D.tgt+' \xb7 '+D.d+'</div></div>', body);
}

/* Scenario cards */
function scenarioCards(k){
  var S={base:{rev:'$4.77B',mgn:'7.6%',op:'$362M',note:'Weighted pipeline as planned.',tone:''},up:{rev:'$5.02B',mgn:'8.1%',op:'$407M',note:'Fountain Valley + 1 pursuit convert; margin lifts on mix.',tone:'ok'},down:{rev:'$4.41B',mgn:'7.0%',op:'$309M',note:'Two soft-award jobs slip a quarter; equipment re-rent costs rise.',tone:'red'}};var s=S[k]||S.base;
  return '<div class="scn-cell"><div class="scn-k">Revenue</div><div class="scn-v">'+s.rev+'</div></div><div class="scn-cell"><div class="scn-k">Operating margin</div><div class="scn-v'+(s.tone?' '+s.tone:'')+'">'+s.mgn+'</div></div><div class="scn-cell"><div class="scn-k">Operating profit</div><div class="scn-v">'+s.op+'</div></div><div class="scn-note">'+s.note+'</div>';
}
function runScenario(el,k){el.parentElement.querySelectorAll('button').forEach(function(b){b.classList.remove('on');});el.classList.add('on');var g=document.getElementById('scnGrid');if(g)g.innerHTML=scenarioCards(k);}

/* Enterprise FP&A feature cards */
function ctFpaFeature(k){
  var M={
    consolidated:{title:'Consolidated plan',sub:'FY 2025 · by 02S pillar',body:'<div class="list"><div class="lrow lhead" style="grid-template-columns:1fr 1fr"><div>Pillar</div><div>Plan</div></div><div class="lrow" style="grid-template-columns:1fr 1fr"><div class="lrow-pri">Equipment</div><div>$524M</div></div><div class="lrow" style="grid-template-columns:1fr 1fr"><div class="lrow-pri">Procurement</div><div>$380M</div></div><div class="lrow" style="grid-template-columns:1fr 1fr"><div class="lrow-pri">Logistics</div><div>$223M</div></div><div class="lrow" style="grid-template-columns:1fr 1fr"><div class="lrow-pri">Prefabrication</div><div>$95M</div></div><div class="lrow" style="grid-template-columns:1fr 1fr"><div class="lrow-pri">Prof. Services</div><div>$88M</div></div></div>'},
    reporting:{title:'Financial reporting',sub:'02S_FY25_Plan_v3 · May 20, 2025',body:'<div class="ct-guardrails"><div class="grd"><div class="grd-ico ok">'+ctIc('check',16)+'</div><div class="grd-l">Revenue — on plan</div><div class="grd-b"><div class="grd-fill ok" style="width:88%"></div></div></div><div class="grd"><div class="grd-ico warn">'+ctIc('warning',16)+'</div><div class="grd-l">Margin — 40 bps under</div><div class="grd-b"><div class="grd-fill warn" style="width:62%"></div></div></div><div class="grd"><div class="grd-ico ok">'+ctIc('check',16)+'</div><div class="grd-l">SG&A — under budget</div><div class="grd-b"><div class="grd-fill ok" style="width:75%"></div></div></div></div>'},
    scenario:{title:'Scenario modeling',sub:'FY 2025',body:'<div class="scn-toggle" style="margin-bottom:12px"><button class="on" onclick="this.parentElement.querySelectorAll(\'button\').forEach(function(b){b.classList.remove(\'on\')});this.classList.add(\'on\');document.getElementById(\'fpaScnGrid\').innerHTML=\'<div class=\'scn-cell\'><div class=\'scn-k\'>Revenue</div><div class=\'scn-v\'>$4.77B</div></div><div class=\'scn-cell\'><div class=\'scn-k\'>Op. margin</div><div class=\'scn-v\'>7.6%</div></div><div class=\'scn-cell\'><div class=\'scn-k\'>Op. profit</div><div class=\'scn-v\'>$362M</div></div><div class=\'scn-note\'>Weighted pipeline as planned.</div>\'">Base</button><button onclick="this.parentElement.querySelectorAll(\'button\').forEach(function(b){b.classList.remove(\'on\')});this.classList.add(\'on\');document.getElementById(\'fpaScnGrid\').innerHTML=\'<div class=\'scn-cell\'><div class=\'scn-k\'>Revenue</div><div class=\'scn-v\'>$5.02B</div></div><div class=\'scn-cell\'><div class=\'scn-k\'>Op. margin</div><div class=\'scn-v ok\'>8.1%</div></div><div class=\'scn-cell\'><div class=\'scn-k\'>Op. profit</div><div class=\'scn-v ok\'>$407M</div></div><div class=\'scn-note\'>Fountain Valley + 1 pursuit convert.</div>\'">Upside</button><button onclick="this.parentElement.querySelectorAll(\'button\').forEach(function(b){b.classList.remove(\'on\')});this.classList.add(\'on\');document.getElementById(\'fpaScnGrid\').innerHTML=\'<div class=\'scn-cell\'><div class=\'scn-k\'>Revenue</div><div class=\'scn-v\'>$4.41B</div></div><div class=\'scn-cell\'><div class=\'scn-k\'>Op. margin</div><div class=\'scn-v red\'>7.0%</div></div><div class=\'scn-cell\'><div class=\'scn-k\'>Op. profit</div><div class=\'scn-v red\'>$309M</div></div><div class=\'scn-note\'>Two jobs slip; re-rent costs rise.</div>\'">Downside</button></div><div class="scn-grid" id="fpaScnGrid"><div class="scn-cell"><div class="scn-k">Revenue</div><div class="scn-v">$4.77B</div></div><div class="scn-cell"><div class="scn-k">Op. margin</div><div class="scn-v">7.6%</div></div><div class="scn-cell"><div class="scn-k">Op. profit</div><div class="scn-v">$362M</div></div><div class="scn-note">Weighted pipeline as planned.</div></div>'},
    insights:{title:'Performance insights',sub:'FY 2025 · as of May 2025',body:'<div class="edp-stats"><div class="edp-stat"><div class="k">Win rate</div><div class="n">62%</div><div class="s">vs 58% last year</div></div><div class="edp-stat cost"><div class="k">Margin gap</div><div class="n">−40 bps</div><div class="s">vs plan · Equipment</div></div><div class="edp-stat"><div class="k">Pipeline coverage</div><div class="n">3.6×</div><div class="s">vs target 3.0×</div></div><div class="edp-stat"><div class="k">Plans submitted</div><div class="n">226</div><div class="s">of 634 opps</div></div></div>'}
  }[k];
  if(!M)return;
  openModal('<div><h3 style="margin:0 0 2px">'+M.title+'</h3><div class="sub">'+M.sub+'</div></div>',M.body+'<div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal()">Close</button><button class="btn btn-dark" onclick="closeModal();toast(\'Opening in Anaplan (demo)\')">Open in Anaplan</button></div>');
}

/* Init NS screens on navigate */
function ctNavNsInit(id){
  if(id==='ct-forecast'){var c=document.getElementById('ctForecast');if(c&&!c.dataset.init){c.innerHTML=ctForecastView('FY25');c.dataset.init='1';}}
  if(id==='ct-fpa'){var g=document.getElementById('scnGrid');if(g&&!g.dataset.init){g.innerHTML=scenarioCards('base');g.dataset.init='1';}}
  if(id==='ct-allocation'){var af=document.querySelector('#ct-allocation .af-step');if(af){var det=document.getElementById('afDetail');if(det&&!det.dataset.init){ctAllocPick(af,0);det.dataset.init='1';}}}
}
