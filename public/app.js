
  var CURRENT='v1';
  var GM_PLAN=10.9, GM_CURR=10.4;
  (function(){
    document.body.setAttribute('data-ver','v1');
    var _s=document.createElement('style');
    _s.id='ns-toggle-css';
    _s.textContent="body:not([data-ver='ns']) .ns-only{display:none!important}";
    document.head.appendChild(_s);
  })();
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
  function getPillars(){ var ns=CURRENT==='ns'; return [
    {key:'equipment',label:'Equipment',depth:'full',dtext:'Full'},
    {key:'prefab',label:'Prefab',depth:'full',dtext:'Full'},
    {key:'procurement',label:'Procurement',depth:ns?'full':'part',dtext:ns?'Full':'~100 SKUs'},
    {key:'profservices',label:'Prof. services',depth:ns?'full':'thin',dtext:ns?'Full':'By request'},
    {key:'logistics',label:'Logistics',depth:ns?'full':'thin',dtext:ns?'Full':'By request'}
  ]; }
  var PILLARS=getPillars();
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
    {id:'fasteners',pillar:'procurement',pcat:'Procurement',cat:'Materials',name:'Structural fasteners — lot',spec:'A325 bolts, nuts, washers — bulk',price:'$220',unit:'',icon:'proc',mode:'onetime',rate:null,unitPrice:220},
    // Additional equipment
    {id:'dozer-d6',pillar:'equipment',pcat:'Equipment › Earthmoving',cat:'Earthmoving',name:'Bulldozer — D6',spec:'Medium dozer · 6-way blade · GPS grade control',price:'$890',unit:'/day',icon:'earth',mode:'rental',rate:890,mrate:18500},
    {id:'compactor',pillar:'equipment',pcat:'Equipment › Earthmoving',cat:'Earthmoving',name:'Vibratory Compactor — 84″',spec:'Padfoot drum · 84″ · soil & subgrade',price:'$440',unit:'/day',icon:'earth',mode:'rental',rate:440,mrate:9200},
    {id:'motorgrader',pillar:'equipment',pcat:'Equipment › Earthmoving',cat:'Earthmoving',name:'Motor Grader — 140M',spec:'14-ft blade · GPS-ready · subgrade finishing',price:'$720',unit:'/day',icon:'earth',mode:'rental',rate:720,mrate:15000},
    {id:'skidsteer',pillar:'equipment',pcat:'Equipment › Earthmoving',cat:'Earthmoving',name:'Skid Steer — 70HP',spec:'70HP · universal hitch · tracks',price:'$340',unit:'/day',icon:'earth',mode:'rental',rate:340,mrate:7100},
    {id:'manlift40',pillar:'equipment',pcat:'Equipment › Access',cat:'Access',name:'Personnel Lift — 40 ft',spec:'Vertical mast · electric · indoor/outdoor',price:'$145',unit:'/day',icon:'lift',mode:'rental',rate:145,mrate:1500},
    {id:'compressor375',pillar:'equipment',pcat:'Equipment › Power & air',cat:'Power',name:'Air Compressor — 375 CFM',spec:'Towable · 375 CFM · large tool support',price:'$265',unit:'/day',icon:'power',mode:'rental',rate:265,mrate:4800},
    {id:'pump4in',pillar:'equipment',pcat:'Equipment › Dewatering',cat:'Dewatering',name:'Dewatering Pump — 4″',spec:'Diaphragm · 4″ inlet · mud capable',price:'$180',unit:'/day',icon:'power',mode:'rental',rate:180,mrate:2800},
    {id:'weldgen',pillar:'equipment',pcat:'Equipment › Power & air',cat:'Power',name:'Welder / Generator Combo — 300A',spec:'300A welder + 10.5kW gen · diesel',price:'$195',unit:'/day',icon:'power',mode:'rental',rate:195,mrate:3200},
    // Attachments
    {id:'att-auger',pillar:'equipment',pcat:'Equipment › Attachments',cat:'Attachments',name:'Auger Attachment',spec:'24″ diameter · skid steer / excavator mount',price:'$140',unit:'/day',icon:'earth',mode:'rental',rate:140,mrate:2200},
    {id:'att-breaker',pillar:'equipment',pcat:'Equipment › Attachments',cat:'Attachments',name:'Hydraulic Breaker',spec:'1,500 ft-lb impact · excavator pin-on',price:'$290',unit:'/day',icon:'earth',mode:'rental',rate:290,mrate:5200},
    {id:'att-grapple',pillar:'equipment',pcat:'Equipment › Attachments',cat:'Attachments',name:'Grapple Bucket',spec:'60″ · rotating · debris and log handling',price:'$210',unit:'/day',icon:'earth',mode:'rental',rate:210,mrate:3800},
    {id:'att-trencher',pillar:'equipment',pcat:'Equipment › Attachments',cat:'Attachments',name:'Trencher Attachment',spec:'6″ × 48″ depth · skid steer mount',price:'$175',unit:'/day',icon:'earth',mode:'rental',rate:175,mrate:2900},
    {id:'att-broom',pillar:'equipment',pcat:'Equipment › Attachments',cat:'Attachments',name:'Power Broom',spec:'72″ angle sweep · skid steer mount',price:'$115',unit:'/day',icon:'earth',mode:'rental',rate:115,mrate:1800},
    {id:'att-forks',pillar:'equipment',pcat:'Equipment › Attachments',cat:'Attachments',name:'Pallet Forks',spec:'48″ forks · 6,000 lb · universal quick-attach',price:'$85',unit:'/day',icon:'material',mode:'rental',rate:85,mrate:1100},
    {id:'att-plate',pillar:'equipment',pcat:'Equipment › Attachments',cat:'Attachments',name:'Tamper Plate Attachment',spec:'Vibratory plate · compaction · skid steer',price:'$130',unit:'/day',icon:'earth',mode:'rental',rate:130,mrate:2100},
    {id:'att-ripper',pillar:'equipment',pcat:'Equipment › Attachments',cat:'Attachments',name:'Ripper Attachment',spec:'Single-shank · dozer rear-mount · rock breaking',price:'$160',unit:'/day',icon:'earth',mode:'rental',rate:160,mrate:2600},
    {id:'att-bucket-rock',pillar:'equipment',pcat:'Equipment › Attachments',cat:'Attachments',name:'Rock Bucket — 36″',spec:'Heavy-duty · bolt-on edge · excavator pin-on',price:'$180',unit:'/day',icon:'earth',mode:'rental',rate:180,mrate:2900},
    {id:'att-compwheel',pillar:'equipment',pcat:'Equipment › Attachments',cat:'Attachments',name:'Compaction Wheel',spec:'Padfoot · excavator mount · trench compaction',price:'$145',unit:'/day',icon:'earth',mode:'rental',rate:145,mrate:2400},
    {id:'att-mulcher',pillar:'equipment',pcat:'Equipment › Attachments',cat:'Attachments',name:'Brush Hog / Mulcher',spec:'Forestry mulcher · excavator or skid steer',price:'$310',unit:'/day',icon:'earth',mode:'rental',rate:310,mrate:5800},
    // Prefab
    {id:'pf-steelframe',pillar:'prefab',pcat:'Prefab › Structural',cat:'Structural',name:'Prefab Steel Frame Module',spec:'Shop-welded · per IBC · crane-set',price:'Quote',unit:'',icon:'prefab',mode:'onetime',rate:null,est:24500},
    {id:'pf-mepwall',pillar:'prefab',pcat:'Prefab › MEP',cat:'MEP',name:'MEP Coordination Wall',spec:'Prefabricated MEP rough-in panel · lift-in-place',price:'Quote',unit:'',icon:'prefab',mode:'onetime',rate:null,est:8800},
    {id:'pf-stairs',pillar:'prefab',pcat:'Prefab › Architectural',cat:'Architectural',name:'Prefab Stair Tower',spec:'Shop-fab · HSS stringers · pan treads · galv.',price:'Quote',unit:'',icon:'prefab',mode:'onetime',rate:null,est:31200},
    {id:'pf-gensteel',pillar:'prefab',pcat:'Prefab › Structural',cat:'Structural',name:'Structural Steel Embedment Kit',spec:'Anchor bolts, embed plates · column base set',price:'Quote',unit:'',icon:'prefab',mode:'onetime',rate:null,est:4200},
    // Logistics
    {id:'log-lowboy',pillar:'logistics',pcat:'Logistics › Heavy haul',cat:'Heavy haul',name:'Lowboy Transport — up to 80T',spec:'Permitted route · escort included · 48-hr lead',price:'$2,400',unit:'/move',icon:'proc',mode:'onetime',rate:null,unitPrice:2400},
    {id:'log-flatbed',pillar:'logistics',pcat:'Logistics › Freight',cat:'Freight',name:'Flatbed Freight — full trailer',spec:'48 ft flatbed · tarped · dock or flatbed delivery',price:'$1,100',unit:'/load',icon:'proc',mode:'onetime',rate:null,unitPrice:1100},
    {id:'log-crane-mob',pillar:'logistics',pcat:'Logistics › Crane logistics',cat:'Crane logistics',name:'Crane Mobilization Package',spec:'Super-load permit · route survey · pilot cars',price:'Quote',unit:'',icon:'crane',mode:'onetime',rate:null,est:8500},
    {id:'log-staging',pillar:'logistics',pcat:'Logistics › Staging',cat:'Staging',name:'Laydown Area Management',spec:'Inventory staging · material sequencing · daily',price:'$1,800',unit:'/week',icon:'proc',mode:'rental',rate:258,mrate:1800},
    {id:'log-courier',pillar:'logistics',pcat:'Logistics › Freight',cat:'Freight',name:'Expedited Courier — same day',spec:'Parts & documents · metropolitan area',price:'$180',unit:'/run',icon:'proc',mode:'onetime',rate:null,unitPrice:180},
    // Professional services
    {id:'ps-survey',pillar:'profservices',pcat:'Prof. services › Survey',cat:'Survey',name:'Construction Survey Crew',spec:'Licensed PLS · layout & control · daily rate',price:'$2,200',unit:'/day',icon:'proc',mode:'rental',rate:2200,mrate:44000},
    {id:'ps-inspect',pillar:'profservices',pcat:'Prof. services › Inspection',cat:'Inspection',name:'Special Inspections — IBC §1705',spec:'ICC-certified · concrete, steel, masonry',price:'$350',unit:'/day',icon:'proc',mode:'rental',rate:350,mrate:7000},
    {id:'ps-geotech',pillar:'profservices',pcat:'Prof. services › Geotechnical',cat:'Geotechnical',name:'Geotechnical Monitoring',spec:'Inclinometers, piezometers · weekly report',price:'Quote',unit:'',icon:'proc',mode:'onetime',rate:null,est:6500},
    {id:'ps-env',pillar:'profservices',pcat:'Prof. services › Environmental',cat:'Environmental',name:'Environmental Monitoring',spec:'Air quality, stormwater, noise · NPDES',price:'$1,400',unit:'/week',icon:'proc',mode:'rental',rate:200,mrate:1400},
    {id:'ps-struct-eng',pillar:'profservices',pcat:'Prof. services › Engineering',cat:'Engineering',name:'Structural Engineering Support',spec:'SE-of-record backup · RFI & submittal review',price:'$280',unit:'/hr',icon:'proc',mode:'rental',rate:280,mrate:5600},
    {id:'ps-safety',pillar:'profservices',pcat:'Prof. services › Safety',cat:'Safety',name:'Safety Officer — dedicated',spec:'OSHA-30 · daily site presence · weekly report',price:'$1,100',unit:'/day',icon:'proc',mode:'rental',rate:1100,mrate:22000},
    // More equipment from taxonomy
    {id:'att-bedbox',pillar:'equipment',pcat:'Equipment › Attachments',cat:'Attachments',name:'Bedding Box',spec:'Aggregate bedding box · skid steer mount · fine grading',price:'$110',unit:'/day',icon:'earth',mode:'rental',rate:110,mrate:1700},
    {id:'att-boxscraper',pillar:'equipment',pcat:'Equipment › Attachments',cat:'Attachments',name:'Box Scraper',spec:'72″ · 3-point hitch · finish grading',price:'$95',unit:'/day',icon:'earth',mode:'rental',rate:95,mrate:1500},
    {id:'att-disc',pillar:'equipment',pcat:'Equipment › Attachments',cat:'Attachments',name:'Disc / Tiller',spec:'60″ disc harrow · soil preparation',price:'$100',unit:'/day',icon:'earth',mode:'rental',rate:100,mrate:1600},
    {id:'att-extractor',pillar:'equipment',pcat:'Equipment › Attachments',cat:'Attachments',name:'Pile Extractor',spec:'Vibratory extractor · excavator mount',price:'$380',unit:'/day',icon:'earth',mode:'rental',rate:380,mrate:6800},
    {id:'att-harrow',pillar:'equipment',pcat:'Equipment › Attachments',cat:'Attachments',name:'Harrow Attachment',spec:'Finishing harrow · skid steer · seedbed prep',price:'$90',unit:'/day',icon:'earth',mode:'rental',rate:90,mrate:1400},
    {id:'att-jib',pillar:'equipment',pcat:'Equipment › Attachments',cat:'Attachments',name:'Jib Boom Attachment',spec:'12 ft · excavator mount · precision placement',price:'$195',unit:'/day',icon:'crane',mode:'rental',rate:195,mrate:3200},
    {id:'att-landleveler',pillar:'equipment',pcat:'Equipment › Attachments',cat:'Attachments',name:'Land Leveler',spec:'8 ft laser-ready blade · finish grading',price:'$150',unit:'/day',icon:'earth',mode:'rental',rate:150,mrate:2500},
    {id:'att-powerrake',pillar:'equipment',pcat:'Equipment › Attachments',cat:'Attachments',name:'Power Rake',spec:'60″ rotary rake · debris & rock windrow',price:'$120',unit:'/day',icon:'earth',mode:'rental',rate:120,mrate:1900},
    {id:'att-rockdrill',pillar:'equipment',pcat:'Equipment › Attachments',cat:'Attachments',name:'Rock Drill Attachment',spec:'Down-the-hole hammer · excavator mount',price:'$420',unit:'/day',icon:'earth',mode:'rental',rate:420,mrate:7500},
    {id:'att-rockscreen',pillar:'equipment',pcat:'Equipment › Attachments',cat:'Attachments',name:'Rock Screen Bucket',spec:'48″ screening bucket · size classification',price:'$195',unit:'/day',icon:'earth',mode:'rental',rate:195,mrate:3300},
    {id:'att-rockwheel',pillar:'equipment',pcat:'Equipment › Attachments',cat:'Attachments',name:'Rock Wheel / Saw',spec:'Rotary rock cutter · excavator · rock trenching',price:'$480',unit:'/day',icon:'earth',mode:'rental',rate:480,mrate:8500},
    {id:'att-siltsock',pillar:'equipment',pcat:'Equipment › Attachments',cat:'Attachments',name:'Silt Fence Installer',spec:'Vibra-plow installer · skid steer mount',price:'$140',unit:'/day',icon:'earth',mode:'rental',rate:140,mrate:2200},
    {id:'att-clamshell',pillar:'equipment',pcat:'Equipment › Attachments',cat:'Attachments',name:'Clamshell Bucket',spec:'30″ · crane-hung · deep excavation',price:'$290',unit:'/day',icon:'earth',mode:'rental',rate:290,mrate:5000},
    {id:'att-scraper',pillar:'equipment',pcat:'Equipment › Attachments',cat:'Attachments',name:'Scraper Bowl Attachment',spec:'Elevating scraper · carry & spread · motor grader',price:'$350',unit:'/day',icon:'earth',mode:'rental',rate:350,mrate:6200},
    // Cranes & lifting additional
    {id:'crane80',pillar:'equipment',pcat:'Equipment › Cranes & lifting',cat:'Cranes',name:'Hydraulic Crane — 80T',spec:'All-terrain · 80–130 ft reach · operator incl.',price:'$2,100',unit:'/day',icon:'crane',mode:'rental',rate:2100,mrate:42000},
    {id:'picker-truck',pillar:'equipment',pcat:'Equipment › Cranes & lifting',cat:'Cranes',name:'Boom Truck — 20T',spec:'20T picker · 80 ft boom · on-board winch',price:'$680',unit:'/day',icon:'crane',mode:'rental',rate:680,mrate:13500},
    {id:'manbasket',pillar:'equipment',pcat:'Equipment › Cranes & lifting',cat:'Lifts',name:'Personnel Basket',spec:'2-person · crane-hung · OSHA-rated',price:'$95',unit:'/day',icon:'lift',mode:'rental',rate:95,mrate:1400},
    // Earthmoving additional
    {id:'excav35',pillar:'equipment',pcat:'Equipment › Earthmoving',cat:'Earthmoving',name:'Excavator — 35T',spec:'35-ton · long-reach option · GPS grade',price:'$980',unit:'/day',icon:'earth',mode:'rental',rate:980,mrate:19500},
    {id:'excav5',pillar:'equipment',pcat:'Equipment › Earthmoving',cat:'Earthmoving',name:'Mini Excavator — 5T',spec:'Tight-access · 5T · zero tail-swing',price:'$310',unit:'/day',icon:'earth',mode:'rental',rate:310,mrate:5800},
    {id:'skidsteer-highflow',pillar:'equipment',pcat:'Equipment › Earthmoving',cat:'Earthmoving',name:'Skid Steer — High Flow',spec:'High-flow hydraulics · universal hitch · cold planer ready',price:'$380',unit:'/day',icon:'earth',mode:'rental',rate:380,mrate:7800},
    // Procurement additional
    {id:'conc-anchors',pillar:'procurement',pcat:'Procurement',cat:'Materials',name:'Concrete anchor kit',spec:'Hilti KB-TZ2 · M12 & M16 · seismic rated',price:'$180',unit:'/lot',icon:'proc',mode:'onetime',rate:null,unitPrice:180},
    {id:'temp-fence',pillar:'procurement',pcat:'Procurement',cat:'Site',name:'Temp chain-link fence panel',spec:'6 ft × 10 ft · base feet incl. · per panel',price:'$28',unit:'/ea',icon:'proc',mode:'onetime',rate:null,unitPrice:28},
    {id:'safety-harness',pillar:'procurement',pcat:'Procurement › Safety',cat:'Safety',name:'Fall protection kit',spec:'Full-body harness, lanyard, D-ring · per person',price:'$145',unit:'/ea',icon:'proc',mode:'onetime',rate:null,unitPrice:145},
    // Additional logistics
    {id:'log-curtain',pillar:'logistics',pcat:'Logistics › Staging',cat:'Staging',name:'Safety curtain / debris net',spec:'Site enclosure · floor-by-floor drop protection',price:'$640',unit:'/floor',icon:'proc',mode:'onetime',rate:null,unitPrice:640},
    {id:'log-container',pillar:'logistics',pcat:'Logistics › Staging',cat:'Staging',name:'Storage container — 40 ft',spec:'40 ft · lockable · delivery & pick-up incl.',price:'$220',unit:'/mo',icon:'proc',mode:'rental',rate:220,mrate:220},
    // Additional professional services
    {id:'ps-commissioning',pillar:'profservices',pcat:'Prof. services › Engineering',cat:'Engineering',name:'Commissioning Agent — MEP',spec:'3rd-party CxA · LEED / ASHRAE 202',price:'$3,400',unit:'/week',icon:'proc',mode:'rental',rate:680,mrate:3400},
    {id:'ps-bim',pillar:'profservices',pcat:'Prof. services › VDC',cat:'VDC',name:'VDC / BIM Coordination',spec:'3D clash detection · RFI modeling · weekly meetings',price:'$280',unit:'/hr',icon:'proc',mode:'rental',rate:280,mrate:5600},
    // Logistics — additional
    {id:'log-concrete-pump',pillar:'logistics',pcat:'Logistics › Concrete',cat:'Concrete',name:'Boom Pump — 47m',spec:'47m reach · 150 CY/hr · full setup incl.',price:'$1,800',unit:'/pour',icon:'proc',mode:'onetime',rate:null,unitPrice:1800},
    {id:'log-trailer-drop',pillar:'logistics',pcat:'Logistics › Equipment moves',cat:'Equipment moves',name:'Trailer drop — equipment relocation',spec:'On-site equipment relocation · forklift or crane assist',price:'$480',unit:'/move',icon:'proc',mode:'onetime',rate:null,unitPrice:480},
    {id:'log-hoist',pillar:'logistics',pcat:'Logistics › Vertical transport',cat:'Vertical transport',name:'Material hoist — 2,000 lb',spec:'2,000 lb · 200 ft · diesel · platform car',price:'$2,800',unit:'/mo',icon:'lift',mode:'rental',rate:93,mrate:2800},
    {id:'log-elev',pillar:'logistics',pcat:'Logistics › Vertical transport',cat:'Vertical transport',name:'Personnel / material elevator',spec:'Rack-and-pinion · 6,000 lb · 400 ft height',price:'$5,200',unit:'/mo',icon:'lift',mode:'rental',rate:173,mrate:5200},
    {id:'log-rolloff',pillar:'logistics',pcat:'Logistics › Waste & cleanup',cat:'Waste & cleanup',name:'Roll-off container — 30 CY',spec:'30 CY debris box · swap-out on call',price:'$420',unit:'/pull',icon:'proc',mode:'onetime',rate:null,unitPrice:420},
    {id:'log-container-rental',pillar:'logistics',pcat:'Logistics › Staging',cat:'Staging',name:'Trash chute system — multi-floor',spec:'12″ chute · gravity feed · ground-level dumpster',price:'$1,400',unit:'/mo',icon:'proc',mode:'rental',rate:47,mrate:1400},
    {id:'log-roadplate',pillar:'logistics',pcat:'Logistics › Site access',cat:'Site access',name:'Road plates — 4×8 steel',spec:'1/2″ plate · temp road surface · installed',price:'$18',unit:'/day/plate',icon:'proc',mode:'rental',rate:18,mrate:540},
    {id:'log-matting',pillar:'logistics',pcat:'Logistics › Site access',cat:'Site access',name:'Ground protection matting',spec:'8×16 HDPE · swamp mat · 80,000 lb rated',price:'$12',unit:'/day/mat',icon:'proc',mode:'rental',rate:12,mrate:360},
    {id:'log-traffic',pillar:'logistics',pcat:'Logistics › Site access',cat:'Site access',name:'Traffic control — flagging crew',spec:'Certified flagger(s) · haul route / gate control',price:'$580',unit:'/day',icon:'proc',mode:'rental',rate:580,mrate:11600},
    {id:'log-fuel',pillar:'logistics',pcat:'Logistics › Fuel & fluids',cat:'Fuel & fluids',name:'On-site fuel delivery',spec:'Diesel & gasoline · mobile tank · weekly scheduled',price:'$0.08',unit:'/gal surcharge',icon:'proc',mode:'onetime',rate:null,unitPrice:200},
    {id:'log-water',pillar:'logistics',pcat:'Logistics › Fuel & fluids',cat:'Fuel & fluids',name:'Potable water service',spec:'1,000 gal tank truck · job-site delivery',price:'$280',unit:'/delivery',icon:'proc',mode:'onetime',rate:null,unitPrice:280},
    {id:'log-portapotty',pillar:'logistics',pcat:'Logistics › Worker welfare',cat:'Worker welfare',name:'Portable restroom — standard',spec:'Weekly service · ADA available',price:'$140',unit:'/mo',icon:'proc',mode:'rental',rate:5,mrate:140},
    {id:'log-portapotty-vip',pillar:'logistics',pcat:'Logistics › Worker welfare',cat:'Worker welfare',name:'Portable restroom — VIP / flushing',spec:'Flushable · hand wash station · weekly service',price:'$320',unit:'/mo',icon:'proc',mode:'rental',rate:11,mrate:320},
    {id:'log-site-office',pillar:'logistics',pcat:'Logistics › Temporary facilities',cat:'Temporary facilities',name:'Modular site office — 10×40',spec:'Office trailer · HVAC · electrical · weekly rate',price:'$780',unit:'/mo',icon:'proc',mode:'rental',rate:26,mrate:780},
    {id:'log-conf-trailer',pillar:'logistics',pcat:'Logistics › Temporary facilities',cat:'Temporary facilities',name:'Conference / break room trailer',spec:'20×60 · tables, chairs, kitchenette',price:'$1,400',unit:'/mo',icon:'proc',mode:'rental',rate:47,mrate:1400},
    {id:'log-security',pillar:'logistics',pcat:'Logistics › Site security',cat:'Site security',name:'Guard booth & barrier package',spec:'Prefab guard booth · drop arm · camera-ready',price:'$620',unit:'/mo',icon:'proc',mode:'rental',rate:21,mrate:620},
    {id:'log-fence-rental',pillar:'logistics',pcat:'Logistics › Site security',cat:'Site security',name:'Temp chain-link fence — installed',spec:'6 ft galvanized · posts · installed & removed',price:'$4',unit:'/LF/mo',icon:'proc',mode:'rental',rate:4,mrate:4},
    {id:'log-oversize-air',pillar:'logistics',pcat:'Logistics › Freight',cat:'Freight',name:'Air freight — expedited',spec:'Same-day / next-flight-out · parts & instruments',price:'Quote',unit:'',icon:'proc',mode:'onetime',rate:null,est:800},
    {id:'log-rail',pillar:'logistics',pcat:'Logistics › Freight',cat:'Freight',name:'Rail freight coordination',spec:'Box car or flatcar · 48-hr loading window',price:'Quote',unit:'',icon:'proc',mode:'onetime',rate:null,est:4200},
    {id:'log-signage',pillar:'logistics',pcat:'Logistics › Site access',cat:'Site access',name:'Construction signage package',spec:'Barricades, cones, warning signs · MUTCD compliant',price:'$340',unit:'/mo',icon:'proc',mode:'rental',rate:11,mrate:340},
    // Professional services — additional
    {id:'ps-scheduler',pillar:'profservices',pcat:'Prof. services › Planning',cat:'Planning',name:'Project scheduler — CPM',spec:'Primavera P6 · CPM build & maintain · weekly update',price:'$180',unit:'/hr',icon:'proc',mode:'rental',rate:180,mrate:7200},
    {id:'ps-estimator',pillar:'profservices',pcat:'Prof. services › Planning',cat:'Planning',name:'Cost estimator / QS',spec:'Quantity take-off · bid leveling · change order eval',price:'$160',unit:'/hr',icon:'proc',mode:'rental',rate:160,mrate:6400},
    {id:'ps-owners-rep',pillar:'profservices',pcat:'Prof. services › Oversight',cat:'Oversight',name:"Owner's representative",spec:'Full-time site oversight · RFI routing · meeting facilitation',price:'$2,800',unit:'/week',icon:'proc',mode:'rental',rate:560,mrate:11200},
    {id:'ps-mep-eng',pillar:'profservices',pcat:'Prof. services › Engineering',cat:'Engineering',name:'MEP engineer — field support',spec:'Mechanical / electrical / plumbing coordination',price:'$195',unit:'/hr',icon:'proc',mode:'rental',rate:195,mrate:7800},
    {id:'ps-civil-eng',pillar:'profservices',pcat:'Prof. services › Engineering',cat:'Engineering',name:'Civil engineer — site support',spec:'Grading, drainage, utilities · RFI & inspection',price:'$185',unit:'/hr',icon:'proc',mode:'rental',rate:185,mrate:7400},
    {id:'ps-leed',pillar:'profservices',pcat:'Prof. services › Sustainability',cat:'Sustainability',name:'LEED / sustainability consultant',spec:'LEED BD+C · documentation · submittals',price:'$175',unit:'/hr',icon:'proc',mode:'rental',rate:175,mrate:7000},
    {id:'ps-code',pillar:'profservices',pcat:'Prof. services › Compliance',cat:'Compliance',name:'Code consultant — IBC / fire',spec:'Building code analysis · AHJ coordination',price:'$280',unit:'/hr',icon:'proc',mode:'rental',rate:280,mrate:5600},
    {id:'ps-wp',pillar:'profservices',pcat:'Prof. services › Specialty',cat:'Specialty',name:'Waterproofing consultant',spec:'Below-grade & plaza systems · mock-up review',price:'$220',unit:'/hr',icon:'proc',mode:'rental',rate:220,mrate:8800},
    {id:'ps-fp',pillar:'profservices',pcat:'Prof. services › Specialty',cat:'Specialty',name:'Fire protection engineer',spec:'Hydraulic calcs · system review · AHJ meetings',price:'$240',unit:'/hr',icon:'proc',mode:'rental',rate:240,mrate:9600},
    {id:'ps-acoustics',pillar:'profservices',pcat:'Prof. services › Specialty',cat:'Specialty',name:'Acoustical consultant',spec:'IIC/STC analysis · mechanical noise review',price:'$210',unit:'/hr',icon:'proc',mode:'rental',rate:210,mrate:8400},
    {id:'ps-testing-lab',pillar:'profservices',pcat:'Prof. services › Testing',cat:'Testing',name:'Testing laboratory — materials',spec:'Concrete, soil, steel · AASHTO / ASTM certified',price:'$1,200',unit:'/week',icon:'proc',mode:'rental',rate:240,mrate:4800},
    {id:'ps-ndt',pillar:'profservices',pcat:'Prof. services › Testing',cat:'Testing',name:'Non-destructive testing — welds',spec:'UT, MT, PT · AWS D1.1 · weld inspection',price:'$480',unit:'/day',icon:'proc',mode:'rental',rate:480,mrate:9600},
    {id:'ps-air-balance',pillar:'profservices',pcat:'Prof. services › Commissioning',cat:'Commissioning',name:'Test & balance — HVAC',spec:'TAB certification · AABC / NEBB · full report',price:'$4,800',unit:'/system',icon:'proc',mode:'onetime',rate:null,est:4800},
    {id:'ps-cx-hvac',pillar:'profservices',pcat:'Prof. services › Commissioning',cat:'Commissioning',name:'Commissioning agent — HVAC/MEP',spec:'Systems cx · functional testing · Cx report',price:'$3,200',unit:'/week',icon:'proc',mode:'rental',rate:640,mrate:3200},
    {id:'ps-electrical-eng',pillar:'profservices',pcat:'Prof. services › Engineering',cat:'Engineering',name:'Electrical engineer — site support',spec:'Power systems · arc flash · coordination study',price:'$210',unit:'/hr',icon:'proc',mode:'rental',rate:210,mrate:8400},
    {id:'ps-drone',pillar:'profservices',pcat:'Prof. services › Survey',cat:'Survey',name:'Drone / aerial survey',spec:'FAA Part 107 · photogrammetry · weekly progress scan',price:'$680',unit:'/flight',icon:'proc',mode:'onetime',rate:null,unitPrice:680},
    {id:'ps-as-built',pillar:'profservices',pcat:'Prof. services › Survey',cat:'Survey',name:'As-built survey — floor-by-floor',spec:'3D laser scan · point cloud · AutoCAD deliverable',price:'$1,800',unit:'/floor',icon:'proc',mode:'onetime',rate:null,unitPrice:1800},
    {id:'ps-photo',pillar:'profservices',pcat:'Prof. services › Documentation',cat:'Documentation',name:'Construction photography',spec:'Weekly progress photos · Matterport 3D tour option',price:'$480',unit:'/week',icon:'proc',mode:'rental',rate:96,mrate:480},
    {id:'ps-pm-support',pillar:'profservices',pcat:'Prof. services › Planning',cat:'Planning',name:'Project controls — weekly reporting',spec:'Cost/schedule integration · variance report · EVM',price:'$140',unit:'/hr',icon:'proc',mode:'rental',rate:140,mrate:5600},
    {id:'ps-enviro-consult',pillar:'profservices',pcat:'Prof. services › Environmental',cat:'Environmental',name:'Environmental compliance consultant',spec:'Permit compliance · agency liaison · SWPPP review',price:'$195',unit:'/hr',icon:'proc',mode:'rental',rate:195,mrate:7800},
    // Procurement — additional
    {id:'proc-rebar',pillar:'procurement',pcat:'Procurement › Concrete',cat:'Concrete',name:'Rebar — #4 through #8',spec:'ASTM A615 Gr. 60 · cut & bent · per ton',price:'Quote',unit:'/ton',icon:'proc',mode:'onetime',rate:null,est:1100},
    {id:'proc-cmu',pillar:'procurement',pcat:'Procurement › Masonry',cat:'Masonry',name:'CMU block — 8×8×16',spec:'Standard weight · 2,000 psi · per unit',price:'$2.80',unit:'/ea',icon:'proc',mode:'onetime',rate:null,unitPrice:3},
    {id:'proc-lumber',pillar:'procurement',pcat:'Procurement › Wood',cat:'Wood',name:'Dimensional lumber — 2×6 KD',spec:'SPF · kiln-dried · random lengths',price:'Quote',unit:'/MBF',icon:'proc',mode:'onetime',rate:null,est:820},
    {id:'proc-plywood',pillar:'procurement',pcat:'Procurement › Wood',cat:'Wood',name:'Plywood — 3/4″ CDX',spec:'4×8 sheet · exterior glue · sheathing',price:'$46',unit:'/sheet',icon:'proc',mode:'onetime',rate:null,unitPrice:46},
    {id:'proc-geotext',pillar:'procurement',pcat:'Procurement › Site',cat:'Site',name:'Geotextile fabric — 4oz non-woven',spec:'Separation & filtration · 300 ft roll',price:'$280',unit:'/roll',icon:'proc',mode:'onetime',rate:null,unitPrice:280},
    {id:'proc-drain-pipe',pillar:'procurement',pcat:'Procurement › Site',cat:'Site',name:'Corrugated HDPE drain pipe — 12″',spec:'12″ diameter · perforated · 20 ft stick',price:'$38',unit:'/ea',icon:'proc',mode:'onetime',rate:null,unitPrice:38},
    {id:'proc-wp-materials',pillar:'procurement',pcat:'Procurement › Waterproofing',cat:'Waterproofing',name:'Below-grade waterproofing membrane',spec:'Self-adhering · HDPE-backed · 200 SF roll',price:'$420',unit:'/roll',icon:'proc',mode:'onetime',rate:null,unitPrice:420},
    {id:'proc-sealant',pillar:'procurement',pcat:'Procurement › Sealants',cat:'Sealants',name:'Polyurethane sealant — 20 oz sausage',spec:'1-part moisture-cure · non-sag · joints up to 1.5″',price:'$14',unit:'/ea',icon:'proc',mode:'onetime',rate:null,unitPrice:14},
    {id:'proc-safety-net',pillar:'procurement',pcat:'Procurement › Safety',cat:'Safety',name:'Fall protection net system',spec:'4″ mesh · 5,000 lb min. break strength · per panel',price:'$680',unit:'/panel',icon:'proc',mode:'onetime',rate:null,unitPrice:680},
    {id:'proc-firstaid',pillar:'procurement',pcat:'Procurement › Safety',cat:'Safety',name:'First aid cabinet — OSHA Class A',spec:'Stocked · 25-person job site · wall-mount',price:'$185',unit:'/ea',icon:'proc',mode:'onetime',rate:null,unitPrice:185},
    {id:'proc-cones',pillar:'procurement',pcat:'Procurement › Safety',cat:'Safety',name:'Traffic cones — 28″ fluorescent',spec:'28″ MUTCD-compliant · reflective collar · lot of 10',price:'$95',unit:'/lot',icon:'proc',mode:'onetime',rate:null,unitPrice:95},
    {id:'proc-barricade',pillar:'procurement',pcat:'Procurement › Safety',cat:'Safety',name:'Interlocking plastic barricade',spec:'Water-ballasted · 6.5 ft · MUTCD Type III',price:'$38',unit:'/ea',icon:'proc',mode:'onetime',rate:null,unitPrice:38},
    {id:'proc-form-ply',pillar:'procurement',pcat:'Procurement › Formwork',cat:'Formwork',name:'Concrete form ply — 3/4″ HDO',spec:'High-density overlay · reusable · 4×8',price:'$82',unit:'/sheet',icon:'proc',mode:'onetime',rate:null,unitPrice:82},
    {id:'proc-snapties',pillar:'procurement',pcat:'Procurement › Formwork',cat:'Formwork',name:'Snap ties — 6″ wall',spec:'Steel snap ties · 3,000 lb · lot of 100',price:'$48',unit:'/lot',icon:'proc',mode:'onetime',rate:null,unitPrice:48},
    {id:'proc-wedge',pillar:'procurement',pcat:'Procurement › Formwork',cat:'Formwork',name:'Wedge bolts & clamps',spec:'Plate clamps · coil ties · assorted lot',price:'$180',unit:'/lot',icon:'proc',mode:'onetime',rate:null,unitPrice:180},
    {id:'proc-epoxy',pillar:'procurement',pcat:'Procurement › Adhesives',cat:'Adhesives',name:'Hilti epoxy anchor system',spec:'HIT-HY 270 · 16.9 fl oz · with nozzle',price:'$42',unit:'/ea',icon:'proc',mode:'onetime',rate:null,unitPrice:42},
    {id:'proc-expansion',pillar:'procurement',pcat:'Procurement › Sealants',cat:'Sealants',name:'Expansion joint filler — 1/2″',spec:'Closed-cell polyethylene · compressible · 50 LF roll',price:'$28',unit:'/roll',icon:'proc',mode:'onetime',rate:null,unitPrice:28},
    {id:'proc-asphalt-patch',pillar:'procurement',pcat:'Procurement › Site',cat:'Site',name:'Cold-patch asphalt — 50 lb bag',spec:'Ready-to-use · pothole & trench repair',price:'$24',unit:'/bag',icon:'proc',mode:'onetime',rate:null,unitPrice:24},
    {id:'proc-handtools',pillar:'procurement',pcat:'Procurement › Tools',cat:'Tools',name:'Hand tool kit — carpenter',spec:'Hammers, levels, squares, tape · crew of 4',price:'$380',unit:'/kit',icon:'proc',mode:'onetime',rate:null,unitPrice:380},
    {id:'proc-extension-cords',pillar:'procurement',pcat:'Procurement › Electrical',cat:'Electrical',name:'GFCI extension cord — 12/3 50 ft',spec:'Lighted end · outdoor rated · OSHA compliant',price:'$65',unit:'/ea',icon:'proc',mode:'onetime',rate:null,unitPrice:65},
    // Prefab — additional
    {id:'pf-bathroom-pod',pillar:'prefab',pcat:'Prefab › Architectural',cat:'Architectural',name:'Prefab bathroom pod',spec:'Factory-built · plumbing roughed · ADA or standard',price:'Quote',unit:'',icon:'prefab',mode:'onetime',rate:null,est:22000},
    {id:'pf-elec-room',pillar:'prefab',pcat:'Prefab › MEP',cat:'MEP',name:'Electrical room module',spec:'Shop-built switchgear room · conduit bundled · crane-set',price:'Quote',unit:'',icon:'prefab',mode:'onetime',rate:null,est:48000},
    {id:'pf-mech-room',pillar:'prefab',pcat:'Prefab › MEP',cat:'MEP',name:'Mechanical room module',spec:'Pre-assembled AHU & piping skid · test-run factory',price:'Quote',unit:'',icon:'prefab',mode:'onetime',rate:null,est:62000},
    {id:'pf-guardrail',pillar:'prefab',pcat:'Prefab › Safety',cat:'Safety',name:'Prefab guard rail system',spec:'Shop-welded posts & rails · OSHA 1926.502 compliant',price:'Quote',unit:'/LF',icon:'prefab',mode:'onetime',rate:null,est:180},
    {id:'pf-canopy',pillar:'prefab',pcat:'Prefab › Architectural',cat:'Architectural',name:'Prefab canopy / sunshade',spec:'Steel tube frame · polycarbonate panels · crane-set',price:'Quote',unit:'',icon:'prefab',mode:'onetime',rate:null,est:18500},
    {id:'pf-wall-panel',pillar:'prefab',pcat:'Prefab › Architectural',cat:'Architectural',name:'Prefab wall panel system',spec:'Insulated metal panel · factory-finished · per SF',price:'Quote',unit:'/SF',icon:'prefab',mode:'onetime',rate:null,est:38},
    {id:'pf-precast',pillar:'prefab',pcat:'Prefab › Structural',cat:'Structural',name:'Precast concrete panels',spec:'Architectural precast · custom finish · per panel',price:'Quote',unit:'',icon:'prefab',mode:'onetime',rate:null,est:14000},
    {id:'pf-mech-skid',pillar:'prefab',pcat:'Prefab › MEP',cat:'MEP',name:'Prefab mechanical piping skid',spec:'Pre-piped pump & valve assembly · shop-tested',price:'Quote',unit:'',icon:'prefab',mode:'onetime',rate:null,est:28000},
    {id:'pf-roof-hatch',pillar:'prefab',pcat:'Prefab › Architectural',cat:'Architectural',name:'Prefab roof access hatch',spec:'48×96 aluminum · insulated · OSHA ladder-up guard',price:'Quote',unit:'',icon:'prefab',mode:'onetime',rate:null,est:3800},
    {id:'pf-modular-util',pillar:'prefab',pcat:'Prefab › MEP',cat:'MEP',name:'Modular utility room',spec:'Pre-assembled utility connections · UL listed · lift-in',price:'Quote',unit:'',icon:'prefab',mode:'onetime',rate:null,est:35000}
  ];
  var KW={crane:'crane40',scissor:'scissor32',lift:'boom60',boom:'boom60',tele:'tele10',telehandler:'tele10',forklift:'tele10',generator:'gen45',power:'gen45',genset:'gen45',excavator:'excav20',dig:'excav20',light:'lighttower',compressor:'aircomp',air:'aircomp',headwall:'headwall',prefab:'headwall',pipe:'piperack',rack:'piperack',restroom:'restroom',rigging:'rigging',sling:'rigging',ppe:'ppe',safety:'ppe',bolt:'fasteners',fastener:'fasteners',dozer:'dozer-d6',compactor:'compactor',grader:'motorgrader',skid:'skidsteer','skid steer':'skidsteer',pump:'pump4in',dewater:'pump4in',welder:'weldgen',auger:'att-auger',breaker:'att-breaker',grapple:'att-grapple',trencher:'att-trencher',broom:'att-broom',forks:'att-forks',tamper:'att-plate',ripper:'att-ripper',mulcher:'att-mulcher',lowboy:'log-lowboy',flatbed:'log-flatbed',survey:'ps-survey',inspect:'ps-inspect',geotech:'ps-geotech',environmental:'ps-env',staging:'log-staging'};

  /* ═══════════════════ EQUIPMENT DEMAND PLAN ═══════════════════ */
  var EQ_MONTHS=['2026-03','2026-04','2026-05','2026-06','2026-07','2026-08','2026-09','2026-10','2026-11','2026-12','2027-01','2027-02','2027-03','2027-04','2027-05'];
  var EQ_TODAY='2026-08';
  var EQ_CODES=[
    {code:'0100-5000-0000-0001',name:'Temporary Facilities & Controls',phase:'General conditions',budget:2600000,committed:2600000},
    {code:'0200-2000-0000-0001',name:'Site Clearing & Grubbing',phase:'Phase 1 \u00b7 Site prep',budget:720000,committed:720000},
    {code:'3100-2000-0000-0001',name:'Mass Grading & Drainage',phase:'Phase 1 \u00b7 Site prep',budget:4800000,committed:4200000},
    {code:'3100-6300-0000-0001',name:'Solar Pile Foundations',phase:'Phase 2 \u00b7 Piles',budget:3100000,committed:3100000},
    {code:'2600-5600-0000-0001',name:'PV Racking & Module Install',phase:'Phase 3 \u00b7 Solar',budget:5200000,committed:1900000},
    {code:'2600-3300-0000-0001',name:'BESS, Inverters & Substation',phase:'Phase 4 \u00b7 Electrical',budget:2800000,committed:600000}
  ];
  var EQ_TASKS=[
    {task:'A1000',name:'Site Mobilization & Laydown Area',code:'0100-5000-0000-0001',phase:'General conditions'},
    {task:'A1010',name:'Temporary Access Roads & Site Fencing',code:'0100-5000-0000-0001',phase:'General conditions'},
    {task:'A2010',name:'Vegetation Clearing & Grubbing',code:'0200-2000-0000-0001',phase:'Phase 1 \u00b7 Site prep'},
    {task:'A2020',name:'Mass Grading & Cut/Fill Operations',code:'3100-2000-0000-0001',phase:'Phase 1 \u00b7 Site prep'},
    {task:'A2030',name:'Stormwater Drainage & Erosion Control',code:'3100-2000-0000-0001',phase:'Phase 1 \u00b7 Site prep'},
    {task:'A3010',name:'Solar Pile Driving \u2014 Sector 1 (NW/NE)',code:'3100-6300-0000-0001',phase:'Phase 2 \u00b7 Piles'},
    {task:'A3020',name:'Solar Pile Driving \u2014 Sector 2 (SW/SE)',code:'3100-6300-0000-0001',phase:'Phase 2 \u00b7 Piles'},
    {task:'A4010',name:'Single-Axis Tracker Assembly \u2014 Sector 1',code:'2600-5600-0000-0001',phase:'Phase 3 \u00b7 Solar'},
    {task:'A4020',name:'Module Installation & String Wiring \u2014 Sector 1',code:'2600-5600-0000-0001',phase:'Phase 3 \u00b7 Solar'},
    {task:'A4030',name:'Tracker & Module Install \u2014 Sector 2',code:'2600-5600-0000-0001',phase:'Phase 3 \u00b7 Solar'},
    {task:'A5010',name:'Inverter & Transformer Setting',code:'2600-3300-0000-0001',phase:'Phase 4 \u00b7 Electrical'},
    {task:'A6010',name:'BESS Block Install & Commissioning',code:'2600-3300-0000-0001',phase:'Phase 4 \u00b7 Electrical'}
  ];
  var EQ_LINES=[
    {id:'e1',task:'A1000',code:'0100-5000-0000-0001',desc:'Generator \u2014 125 kW',cat:'Power \u203a Generators',qty:16,rate:4200,from:'2026-03',to:'2027-05',status:'on-rent',submitted:true,scope:'Site Mobilization & Laydown Area',catId:'gen45'},
    {id:'e2',task:'A1010',code:'0100-5000-0000-0001',desc:'Light tower',cat:'Power \u203a Lighting',qty:26,rate:1200,from:'2026-03',to:'2027-05',status:'on-rent',submitted:true,scope:'Temporary Access Roads & Site Fencing',catId:'lighttower'},
    {id:'e3',task:'A2010',code:'0200-2000-0000-0001',desc:'Excavator \u2014 20T',cat:'Earthmoving \u203a Excavators',qty:6,rate:13500,from:'2026-03',to:'2026-05',status:'off-rent',submitted:true,scope:'Vegetation Clearing & Grubbing',catId:'excav20'},
    {id:'e4',task:'A2020',code:'3100-2000-0000-0001',desc:'Dozer \u2014 D6',cat:'Earthmoving \u203a Dozers',qty:12,rate:16200,from:'2026-03',to:'2026-09',status:'on-rent',submitted:true,scope:'Mass Grading & Cut/Fill Operations'},
    {id:'e5',task:'A2020',code:'3100-2000-0000-0001',desc:'Motor grader',cat:'Earthmoving \u203a Graders',qty:6,rate:14000,from:'2026-04',to:'2026-08',status:'off-rent',submitted:true,scope:'Mass Grading & Cut/Fill Operations'},
    {id:'e6',task:'A2030',code:'3100-2000-0000-0001',desc:'Compaction roller',cat:'Earthmoving \u203a Compaction',qty:12,rate:6800,from:'2026-04',to:'2026-10',status:'on-rent',submitted:true,scope:'Stormwater Drainage & Erosion Control'},
    {id:'e7',task:'A3010',code:'3100-6300-0000-0001',desc:'Hydraulic pile driver',cat:'Foundations \u203a Pile driving',qty:6,rate:34500,from:'2026-06',to:'2026-10',status:'on-rent',submitted:true,scope:'Solar Pile Driving \u2014 Sector 1 (NW/NE)'},
    {id:'e8',task:'A3020',code:'3100-6300-0000-0001',desc:'Hydraulic pile driver',cat:'Foundations \u203a Pile driving',qty:6,rate:34500,from:'2026-08',to:'2026-12',status:'on-rent',submitted:true,scope:'Solar Pile Driving \u2014 Sector 2 (SW/SE)'},
    {id:'e9',task:'A3010',code:'3100-6300-0000-0001',desc:'Telehandler \u2014 10K',cat:'Material handling \u203a Telehandlers',qty:16,rate:8800,from:'2026-06',to:'2026-12',status:'on-rent',submitted:true,scope:'Solar Pile Driving \u2014 Sector 1 (NW/NE)',catId:'tele10'},
    {id:'e10',task:'A4010',code:'2600-5600-0000-0001',desc:'Telehandler \u2014 10K',cat:'Material handling \u203a Telehandlers',qty:24,rate:8800,from:'2026-09',to:'2027-04',status:'projected',submitted:true,scope:'Single-Axis Tracker Assembly \u2014 Sector 1',catId:'tele10'},
    {id:'e11',task:'A4020',code:'2600-5600-0000-0001',desc:'Boom lift \u2014 60ft',cat:'Access equipment \u203a Boom lifts',qty:18,rate:7500,from:'2026-09',to:'2027-03',status:'projected',submitted:true,scope:'Module Installation & String Wiring \u2014 Sector 1',catId:'boom60'},
    {id:'e12',task:'A4030',code:'2600-5600-0000-0001',desc:'Telehandler \u2014 10K',cat:'Material handling \u203a Telehandlers',qty:12,rate:8800,from:'2026-11',to:'2027-04',status:'projected',submitted:false,scope:'Tracker & Module Install \u2014 Sector 2',catId:'tele10'},
    {id:'e13',task:'A4030',code:'2600-5600-0000-0001',desc:'Scissor lift \u2014 32ft',cat:'Access equipment \u203a Scissor lifts',qty:64,rate:1900,from:'2026-11',to:'2027-04',status:'projected',submitted:false,scope:'Tracker & Module Install \u2014 Sector 2',catId:'scissor32'},
    {id:'e14',task:'A5010',code:'2600-3300-0000-0001',desc:'Rough-terrain crane \u2014 90T',cat:'Cranes \u203a Rough-terrain',qty:3,rate:42000,from:'2026-12',to:'2027-05',status:'projected',submitted:false,scope:'Inverter & Transformer Setting'},
    {id:'e15',task:'A6010',code:'2600-3300-0000-0001',desc:'Crawler crane \u2014 230T',cat:'Cranes \u203a Crawler (non-catalog)',qty:1,rate:null,from:'2027-01',to:'2027-03',status:'projected',submitted:false,scope:'BESS Block Install & Commissioning'}
  ];
  var eqState={view:'plan'};
  var eqEditId=null, eqSeq=15, eqAddCode=null, ordSeq=3042, eqRefSeq=200;
  var EQ_HISTORY=[
    {date:'Aug 2, 2026',who:'Dana Reyes',desc:'Increased scissor lift qty 48 \u2192 64 for expanded Sector 2 module install footprint (A4030)'},
    {date:'Aug 2, 2026',who:'Dana Reyes',desc:'Added BESS crawler crane line (A6010) \u2014 draft, no rate set yet, pending 02S quote'},
    {date:'Jul 15, 2026',who:'C. Navarrete (Supt.)',desc:'Extended Sector 2 pile driving off-rent Nov \u2192 Dec after geotechnical revision added 18% more pile locations'},
    {date:'Jun 1, 2026',who:'Dana Reyes',desc:'Submitted Phase 3 solar racking to 02S \u2014 telehandlers + boom lifts, Sector 1, 42 assets'},
    {date:'May 10, 2026',who:'Dana Reyes',desc:'Submitted Phase 2 pile package to 02S \u2014 6 hydraulic pile drivers + 16 telehandlers across both sectors'},
    {date:'Mar 3, 2026',who:'Dana Reyes',desc:'Created plan from the LNTP budget \u2014 6 cost codes, $19.2M equipment budget'}
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
  function renderPills(){ PILLARS=getPillars(); var pr=document.getElementById('pillRow'); if(!pr)return; pr.innerHTML = PILLARS.map(function(p){
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
        '<button class="padd txt" onclick="openCatDetail(\''+p.id+'\')">Add</button></div></div></div>';
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

  function onCatSearch(q){
    var res=document.getElementById('catSearchResults'), acc=document.getElementById('catAccordion');
    if(!q||!q.trim()){res.innerHTML='';res.classList.add('hide');acc.style.display='';return;}
    var qt=q.toLowerCase().trim();
    var hits=CATALOG.filter(function(p){return p.name.toLowerCase().indexOf(qt)>-1||p.cat.toLowerCase().indexOf(qt)>-1||(p.pcat&&p.pcat.toLowerCase().indexOf(qt)>-1)||(p.spec&&p.spec.toLowerCase().indexOf(qt)>-1);});
    acc.style.display='none';
    if(!hits.length){res.innerHTML='<div style="padding:24px;text-align:center;color:var(--g400);font-size:13px">No catalog items match "'+q+'"</div>';res.classList.remove('hide');return;}
    var html='<div class="cat-search-count">'+hits.length+' result'+(hits.length===1?'':'s')+' for &ldquo;'+q+'&rdquo;</div>';
    html+='<div class="cat-grid">'+hits.map(function(p){
      var lead=p.mode==='rental'?'Lead 24–48 hr':(p.pillar==='prefab'?'Lead 2–3 wk':'Ships 3–5 days');
      return '<div class="prod" onclick="openCatDetail(\''+p.id+'\')" style="cursor:pointer">'
        +'<div class="pimg"><span class="pcat">'+p.cat+'</span>'+svg(ICON[p.icon]||ICON.box)+'</div>'
        +'<div class="pbody"><div class="pname">'+p.name+'</div><div class="pspec">'+p.spec+'</div>'
        +'<div class="pfoot"><div><div class="pprice">'+p.price+'<span class="pu">'+p.unit+'</span></div><div class="plead">'+lead+'</div></div>'
        +'<button class="padd txt" onclick="event.stopPropagation();openCatDetail(\''+p.id+'\')">Add</button></div></div></div>';
    }).join('')+'</div>';
    html+='<div class="cat-not-found">Don\'t see what you need? <button class="clink" onclick="(function(){var _q=document.getElementById(\'catSearchInp\').value;onCatSearch(\'\');document.getElementById(\'catSearchInp\').value=\'\';openCustom(inferPillar(_q));})()">Send a custom request &rsaquo;</button></div>';
    res.innerHTML=html;
    res.classList.remove('hide');
  }

  /* ═══════════ TYPE-AHEAD (empty until typing) ═══════════ */
  function onAskInput(){
    var raw=document.getElementById('askInput').value, q=raw.toLowerCase().trim();
    var ta=document.getElementById('typeahead'), lbl=document.getElementById('taLabel');
    if(!q){ ta.innerHTML=''; document.getElementById('taWrap').classList.add('hide'); return; }
    var hits={};
    CATALOG.forEach(function(p){ if(p.name.toLowerCase().indexOf(q)>-1||p.cat.toLowerCase().indexOf(q)>-1) hits[p.id]=1; });
    Object.keys(KW).forEach(function(k){ if(q.indexOf(k)>-1) hits[KW[k]]=1; });
    var rows=Object.keys(hits).slice(0,5).map(function(id){var p=byId(id);
      return '<div class="ta-row" onclick="openCatDetail(\''+p.id+'\')"><span class="tai">'+svg(ICON[p.icon]||ICON.box,2)+'</span><span class="tat">'+p.name+'</span><span class="ta-map">'+pillarLabel(p.pillar)+' · matched</span><span class="tameta">'+p.price+p.unit+'</span></div>';
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
  function openCatDetail(pid){
    var p=byId(pid); if(!p) return;
    var ns=CURRENT==='ns';
    var lead = p.mode==='rental' ? 'Lead 24–48 hr' : (p.pillar==='prefab' ? 'Lead 2–3 wk' : 'Ships 3–5 days');
    var price = p.price+p.unit;
    var modeTag = p.mode==='rental'?'<span class="tag info">Rental</span>':'<span class="tag neu">One-time</span>';
    var nsReco = (ns && p.plan) ? '<div class="cd-reco">'+CC_SPARK+'In your demand plan ('+p.plan+') — pre-configured dates and qty ready</div>' : '';
    var specs = [
      {k:'Category',v:p.pcat||p.cat},
      {k:'Specification',v:p.spec},
      {k:'Rate',v:price+(p.mrate?' · $'+p.mrate.toLocaleString()+'/mo (est.)':'')},
      {k:'Lead time',v:lead},
      {k:'Pillar',v:pillarLabel(p.pillar)},
      {k:'Mode',v:p.mode==='rental'?'Rental — daily/monthly rate':'One-time procurement'}
    ];
    var rows=specs.map(function(s){return '<div class="cd-row"><div class="cd-k">'+s.k+'</div><div class="cd-v">'+s.v+'</div></div>';}).join('');
    var body='<div class="cat-detail">'+
      '<div class="cd-hero">'+
        '<div class="cd-icon-wrap">'+svg(ICON[p.icon]||ICON.box,3)+'</div>'+
        '<div class="cd-head">'+
          '<div class="cd-name">'+p.name+'</div>'+
          '<div class="cd-tags">'+modeTag+'<span class="tag">'+pillarLabel(p.pillar)+'</span></div>'+
          '<div class="cd-price">'+price+'</div>'+
        '</div>'+
      '</div>'+
      nsReco+
      '<div class="cd-spec-grid">'+rows+'</div>'+
    '</div>';
    openModal(p.name, body+'<div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal()">Close</button><button class="btn btn-red" onclick="closeModal();openDetail(\''+pid+'\',\'catalog\')">Add to request →</button></div>');
  }
  function openDetail(pid,kind){
    var p=byId(pid); if(!p) return;
    cfg={pid:pid,kind:kind,custom:null};
    var _plab=pillarLabel(p.pillar); document.getElementById('fPillar').value = optExists('fPillar',_plab)?_plab:document.getElementById('fPillar').value;
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
  function inferPillar(term){
    if(!term) return 'Equipment';
    var q=(term||'').toLowerCase();
    var eqK=['crane','lift','excavat','dozer','grader','compactor','forklift','tele','generator','boom','scissor','skid','pump','welder','auger','breaker','roller','paver','ripper','loader','scraper','trencher','drill','pile','grapple','rigging','compressor','mulcher','lowboy','flatbed'];
    for(var ei=0;ei<eqK.length;ei++){ if(q.indexOf(eqK[ei])>-1) return 'Equipment'; }
    var ck=Object.keys(CUSTOM_KW); for(var ci=0;ci<ck.length;ci++){ if(q.indexOf(ck[ci])>-1) return CUSTOM_KW[ck[ci]]; }
    var hits=CATALOG.filter(function(p){return p.name.toLowerCase().indexOf(q)>-1||p.cat.toLowerCase().indexOf(q)>-1;});
    if(hits.length) return pillarLabel(hits[0].pillar);
    return 'Equipment';
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
    // Try to surface catalog results instead of jumping straight to a request form
    var catHits=CATALOG.filter(function(p){
      return p.name.toLowerCase().indexOf(q)>-1||p.cat.toLowerCase().indexOf(q)>-1||(p.pcat&&p.pcat.toLowerCase().indexOf(q)>-1)||(p.spec&&p.spec.toLowerCase().indexOf(q)>-1);
    });
    var catTerm=raw;
    if(!catHits.length){
      var tokens=q.split(/\s+/).filter(function(t){return t.length>2;});
      for(var ti=0;ti<tokens.length;ti++){
        var tok=tokens[ti];
        var tokHits=CATALOG.filter(function(p){return p.name.toLowerCase().indexOf(tok)>-1||p.cat.toLowerCase().indexOf(tok)>-1||(p.spec&&p.spec.toLowerCase().indexOf(tok)>-1);});
        if(tokHits.length){catHits=tokHits;catTerm=tok;break;}
      }
    }
    if(catHits.length){
      var inp=document.getElementById('catSearchInp'); if(inp) inp.value=catTerm;
      onCatSearch(catTerm);
      document.getElementById('typeahead').innerHTML=''; document.getElementById('taWrap').classList.add('hide');
      var res=document.getElementById('catSearchResults');
      if(res) setTimeout(function(){res.scrollIntoView({behavior:'smooth',block:'start'});},50);
      // fall through — also show the "understood" panel so user can submit a request directly
    }
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
    if(!catHits.length && el.scrollIntoView) el.scrollIntoView({behavior:'smooth',block:'nearest'});
  }
  function dismissUnderstood(){ var el=document.getElementById('understood'); el.classList.add('hide'); el.innerHTML=''; document.getElementById('askInput').value=''; onAskInput(); }
  function refineUnderstood(){ parseReq(); }
  function renderNSMilestones(){
    var mount=document.getElementById('nsMilestonesMount'); if(!mount) return;
    var milestones=[
      {date:'Jun 1',label:'Demob phase begins',tone:'warn',recos:[
        'Issue off-rent notices for all equipment 2 weeks ahead',
        'Schedule final site walk and off-rent inspections',
        'Confirm damage waivers and return logistics with 02S',
        'Notify 02S of early call-off candidates to avoid idle billing'
      ]},
      {date:'Jun 15',label:'BESS commissioning window',tone:'info',recos:[
        'Confirm BAS commissioning specialist start date',
        'Verify BESS and switchgear readiness by Nov 15',
        'Ensure VDC coordinator and drone operator site windows aligned'
      ]},
      {date:'Jul 15',label:'Module racking mobilization',tone:'ok',recos:[
        'Confirm Landstar heavy haul capacity 6 weeks ahead',
        'Verify prefab headwall submittals are approved',
        'Coordinate crane handoff from pile drive to racking schedule'
      ]}
    ];
    var toneColor={warn:'var(--warning)',info:'var(--info)',ok:'var(--success)'};
    var rows=milestones.map(function(m){
      var recoRows=m.recos.map(function(r,i){
        return '<div style="display:flex;align-items:flex-start;gap:8px;padding:5px 8px;background:var(--g50);border-radius:5px;border:1px solid var(--g200);margin-bottom:4px">'
          +'<span style="min-width:16px;height:16px;background:var(--info-tint);border-radius:3px;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:9px;font-weight:700;color:var(--info)">'+(i+1)+'</span>'
          +'<div style="flex:1;font-size:11.5px;color:var(--g700)">'+r+'</div>'
          +'</div>';
      }).join('');
      var tc=toneColor[m.tone];
      return '<div style="border:1px solid var(--g200);border-left:3px solid '+tc+';border-radius:var(--radius);padding:12px 14px;margin-bottom:10px;background:#fff">'
        +'<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">'
        +'<span style="font-size:11px;font-weight:700;color:'+tc+';background:var(--g100);padding:2px 7px;border-radius:4px;flex-shrink:0">'+m.date+'</span>'
        +'<div style="font-size:13px;font-weight:650;color:var(--g900)">'+m.label+'</div>'
        +'</div>'
        +'<div style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:var(--g500);margin-bottom:5px">02S recommendations</div>'
        +recoRows
        +'</div>';
    }).join('');
    var SPARK='<svg viewBox="0 0 24 24" fill="currentColor" style="width:13px;height:13px"><path d="M12 2l2.4 7.4H22l-6 4.5 2.3 7.1L12 16.9 5.3 21l2.3-7.1-6-4.5h7.6z"/></svg>';
    mount.innerHTML='<div class="ins-strip" style="margin-bottom:14px"><span class="isi">'+SPARK+'</span><div><div class="ist">02S sees what\'s coming</div><div class="isd">3 milestones in the next 6 weeks — actions pre-loaded from your CPM schedule and demand plan.</div></div></div>'+rows;
  }
  function showNSActivities(){
    var el=document.getElementById('understood'); if(!el) return;
    var acts=[
      'Site prep: access road and laydown area clearance',
      'Equipment walk inspection on delivery',
      'Operator orientation and site safety brief',
      'Daily operator log — photo + hours report',
      'Material receiving report (MRR) on each delivery',
      'Off-rent equipment inspection and documentation'
    ];
    var rows=acts.map(function(a,i){
      return '<div style="display:flex;align-items:center;gap:8px;padding:7px 10px;background:var(--g50);border-radius:6px;border:1px solid var(--g200);margin-bottom:5px">'
        +'<span style="min-width:18px;height:18px;background:var(--info-tint);border-radius:3px;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:10px;font-weight:700;color:var(--info)">'+(i+1)+'</span>'
        +'<div style="flex:1;font-size:12px;color:var(--g800)">'+a+'</div>'
        +'<button class="btn btn-ghost btn-sm" style="font-size:10.5px;padding:2px 7px;flex-shrink:0" onclick="toast(\'Document attached\')">Attach doc</button>'
        +'</div>';
    }).join('');
    var _SPARK02='<svg viewBox="0 0 24 24" fill="currentColor" style="width:12px;height:12px"><path d="M12 2l2.4 7.4H22l-6 4.5 2.3 7.1L12 16.9 5.3 21l2.3-7.1-6-4.5h7.6z"/></svg>';
    el.innerHTML+='<div style="margin-top:14px;border-top:1px solid var(--g200);padding-top:12px">'
      +'<div style="display:flex;align-items:center;gap:7px;margin-bottom:10px;padding:8px 10px;background:var(--info-tint);border-radius:6px;border:1px solid rgba(38,93,159,.18)">'
      +'<span style="color:var(--info)">'+_SPARK02+'</span>'
      +'<div style="font-size:12px;font-weight:650;color:var(--info)">Auto-populated sub-activities</div>'
      +'<span style="font-size:11px;color:var(--g500);margin-left:4px">— from your demand plan and CPM schedule</span>'
      +'</div>'
      +rows
      +'<div style="font-size:11px;color:var(--g500);margin-top:6px">Attach documents per activity as work progresses. These flow into your 3-week schedule and command center.</div>'
      +'</div>';
  }
    function sendUnderstood(){
    var el=document.getElementById('understood'); el.className='understood sent';
    el.innerHTML='<div class="un-done">'+svg('<path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/>',2)+'<div>Request sent to 02S<div class="udsub">Your request is in — 02S will confirm and notify you.</div></div></div>';
    toast('Request sent to 02S — quote incoming'); document.getElementById('askInput').value=''; if(CURRENT==='ns') showNSActivities();
  }

  var _rfqRef=''; var _rfqHasPending=false;

  function openRFQModal(){
    if(!state.cart.length){ toast('Add items to your request first'); return; }
    _rfqRef='Q-'+String(Math.floor(Math.random()*90000)+10000); _rfqHasPending=false;
    var ICO_DOWN='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:13px;height:13px;margin-left:4px;vertical-align:middle"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>';
    var tblHead='<div style="display:grid;grid-template-columns:1fr 110px 100px;gap:0;padding:6px 0;border-bottom:2px solid var(--g200)">'
      +'<span style="font-size:10.5px;font-weight:700;color:var(--g500);text-transform:uppercase;letter-spacing:.05em">Item</span>'
      +'<span style="font-size:10.5px;font-weight:700;color:var(--g500);text-transform:uppercase;letter-spacing:.05em">Period / qty</span>'
      +'<span style="font-size:10.5px;font-weight:700;color:var(--g500);text-transform:uppercase;letter-spacing:.05em;text-align:right">Estimate</span></div>';
    var tblRows='';
    var totalPriced=0, pendingN=0;
    state.cart.forEach(function(c){
      var needsQ=c.isQuote||!c.total;
      if(!needsQ) totalPriced+=c.total; else pendingN++;
      var amt=needsQ
        ?'<span style="font-size:11.5px;color:var(--g400);font-style:italic">Pending 02S</span>'
        :'<span style="font-size:12.5px;font-weight:600;color:var(--charcoal)">'+fmt(c.total)+'</span>';
      tblRows+='<div style="display:grid;grid-template-columns:1fr 110px 100px;gap:3px;padding:9px 0;border-bottom:1px solid var(--g100);align-items:start">'
        +'<div><div style="font-size:12.5px;font-weight:500;color:var(--g900)">'+c.name+'</div>'
        +'<div style="font-size:11px;color:var(--g500);margin-top:1px">'+pillarLabel(c.pillarKey)+(c.costCode?' \u00b7 '+c.costCode:'')+'</div>'
        +(c.plan?'<div style="font-size:10.5px;color:var(--success);margin-top:2px">On plan \u00b7 '+c.plan+'</div>':'')+'</div>'
        +'<div style="font-size:11.5px;color:var(--g700);padding-top:2px">'+c.qtyText+'</div>'
        +'<div style="text-align:right;padding-top:2px">'+amt+'</div></div>';
    });
    var tblFoot='<div style="display:flex;justify-content:space-between;align-items:baseline;padding:10px 0 2px;border-top:1px solid var(--g200);margin-top:4px">'
      +'<span style="font-size:12px;font-weight:600;color:var(--g900)">Confirmed pricing</span>'
      +'<span style="font-size:14px;font-weight:700;color:var(--charcoal)">'+fmt(totalPriced)+'<span style="font-size:11px;font-weight:400;color:var(--g400)"> est.</span></span></div>';
    if(pendingN){
      tblFoot+='<div style="font-size:11.5px;color:var(--g500);padding-bottom:2px">'+pendingN+' item'+(pendingN===1?'':'s')+' pending 02S pricing \u2014 finalizes once confirmed (24\u00a0hrs)</div>';
    }
    _rfqHasPending=pendingN>0;
    var ns=CURRENT==='ns';
    var nsNote=ns?'<div style="background:var(--info-tint);border:1px solid rgba(38,93,159,.18);border-radius:6px;padding:8px 12px;margin-bottom:14px;font-size:11.5px;color:var(--g700)"><b>02S context:</b> Hercules Solar + BESS \u00b7 BESS substation phase \u00b7 rate card applied to standard items.</div>':'';
    var useNote='<div style="background:var(--g50);border-radius:6px;padding:10px 12px;margin-top:14px;font-size:11.5px;color:var(--g700);line-height:1.55">'
      +'<b>Documentation use only.</b> Attach to Change Order authorizations or cost-plus reimbursement submissions to the owner. Does not trigger fulfillment \u2014 for that, use <b>Submit request</b> in your cart.</div>';
    var body=nsNote
      +'<div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:14px">'
      +'<div><div style="font-size:14px;font-weight:700;color:var(--charcoal)">02S Equipment &amp; Services Quote</div>'
      +'<div style="font-size:11.5px;color:var(--g500);margin-top:3px">Ref <b>'+_rfqRef+'</b>&nbsp;&nbsp;\u00b7&nbsp;&nbsp;Jul 28, 2026&nbsp;&nbsp;\u00b7&nbsp;&nbsp;Hercules Solar + BESS</div></div>'
      +'<span class="tag '+(pendingN?'warn':'ok')+'" style="font-size:10px;white-space:nowrap">'+(pendingN?'Draft':'Full quote')+'</span></div>'
      +tblHead+tblRows+tblFoot
      +(pendingN?'<div style="background:rgba(217,119,6,.08);border:1px solid rgba(217,119,6,.22);border-radius:6px;padding:9px 12px;margin-top:12px;font-size:11.5px;color:var(--g700)"><b>Draft quote — '+pendingN+' item'+(pendingN===1?'':'s')+' pending 02S pricing.</b> You can download this now as a draft. Once 02S confirms pricing, a complete quote is available for CO documentation.</div>':'')
      +useNote
      +'<div class="modal-foot"><button onclick="closeModal()">Cancel</button>'
      +'<button class="btn '+(pendingN?'btn-dark':'btn-red')+'" onclick="closeModal();sendRFQ()">'+(pendingN?'Download draft PDF':'Download full quote PDF')+ICO_DOWN+'</button></div>';
    openModal('Request for Quote', body);
  }

  function sendRFQ(){
    var el=document.getElementById('understood'); if(!el)return; el.className='understood sent';
    var ref=_rfqRef||'Q-pending';
    var isDraftQ=_rfqHasPending;
    el.innerHTML='<div class="un-done">'+svg('<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M9 15h6"/>',2)+'<div>'+(isDraftQ?'Draft PDF generated':'Full quote PDF generated')+'<div class="udsub">Ref '+ref+(isDraftQ?' \u2014 pending 02S pricing confirmation. A complete quote will be emailed once all items are confirmed.':' \u2014 all items priced. Attach to Change Order or cost-plus reimbursement submission.')+'</div></div></div>';
    if(CURRENT==='ns'){ var rfqEl=document.getElementById('understood'); if(rfqEl) rfqEl.innerHTML+='<div style="margin-top:8px;font-size:11.5px;color:var(--g700);background:var(--info-tint);border-radius:5px;padding:6px 9px"><b>CPM context attached:</b> Hercules Solar + BESS \u00b7 BESS substation phase \u00b7 rate card rates applied.</div>'; }
    toast(isDraftQ?'Draft PDF generated \u2014 ref '+ref+' (awaiting 02S pricing)':'Full quote PDF \u2014 ref '+ref+' · attach to CO or cost-plus docs'); document.getElementById('askInput').value='';
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
    var costCode=(document.getElementById('fCostCode')||{}).value||'';
    if(!costCode){ toast('Select a cost code before adding'); document.getElementById('fCostCode').focus(); return; }
    var line;
    if(cfg.kind==='custom'){
      line={cid:++CID, pid:null, name:(document.getElementById('fDesc').value.split('\n')[0]||'Custom request').slice(0,60), icon:'box', pillarKey:pillarKeyFromLabel(cfg.custom), pcat:cfg.custom, mode:'custom', costCode:costCode, qtyText:(function(){var f=document.getElementById('fFrom').value,t=document.getElementById('fTo').value,q=Math.max(1,parseInt(document.getElementById('fQty').value||1,10));return (f&&t?fmtDate(f)+'–'+fmtDate(t)+' · '+daysBetween(f,t)+'d':'timing TBD')+(q>1?' × '+q:'')+' · quote';})(), total:null, plan:null};
    } else {
      var p=byId(cfg.pid);
      if(p.mode==='rental'){
        var from=document.getElementById('fFrom').value,to=document.getElementById('fTo').value;
        var qty=Math.max(1,parseInt(document.getElementById('fQty').value||1,10));
        var days=daysBetween(from,to);
        line={cid:++CID,pid:p.id,name:p.name,icon:p.icon,pillarKey:p.pillar,pcat:p.pcat,mode:'rental',costCode:costCode,
              qtyText:fmtDate(from)+'–'+fmtDate(to)+' · '+days+'d'+(qty>1?' × '+qty:''),total:days*p.rate*qty,plan:p.plan||null};
      } else if(p.price==='Quote'){
        var q2=Math.max(1,parseInt(document.getElementById('fQtyOnly').value||1,10));
        line={cid:++CID,pid:p.id,name:p.name,icon:p.icon,pillarKey:p.pillar,pcat:p.pcat,mode:'quote',costCode:costCode,qtyText:(q2>1?q2+' units · ':'')+'quote',total:p.est*q2,plan:p.plan||null,isQuote:true};
      } else {
        var q3=Math.max(1,parseInt(document.getElementById('fQtyOnly').value||1,10));
        line={cid:++CID,pid:p.id,name:p.name,icon:p.icon,pillarKey:p.pillar,pcat:p.pcat,mode:'onetime',costCode:costCode,qtyText:(q3>1?q3+' units':'one-time'),total:p.unitPrice*q3,plan:p.plan||null};
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
        '<div class="ri-meta"><span class="ri-pillar'+(c.pillarKey==='equipment'?' eq':'')+'">'+pillarLabel(c.pillarKey)+'</span> '+c.qtyText+(c.costCode?'<span class="ri-cc"> · '+c.costCode+'</span>':'')+'</div>'+planline+'</div>'+
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
      (ns?'<div style="background:var(--info-tint);border:1px solid rgba(38,93,159,.18);border-radius:var(--radius);padding:10px 14px;margin-bottom:10px;display:flex;align-items:flex-start;gap:10px">'+svg('<path d="M12 2l2.4 7.4H22l-6 4.5 2.3 7.1-6.3-4.6L5.7 21l2.3-7.1-6-4.5h7.6z"/>',1.5)+'<div style="font-size:11.5px;color:var(--g700)"><div style="font-weight:700;color:var(--info);margin-bottom:2px">AI-powered cost code suggestions</div>Based on your past orders, cost codes have been pre-matched to these items. Review each line and click to change if needed.</div></div>':'')+
      '<div class="req-upload" onclick="toast(\'Photo upload — attach specs or images\')">'+svg('<path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>',2)+'Attach specs or drawings</div>'+
      '<div class="req-foot">'+route+
      '<div class="req-total"><span class="tl">Est. total · 02S rates</span><span class="tv">'+fmt(total)+'<span class="per"> /project</span></span></div>'+
      '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">'+
      '<button class="btn btn-red req-submit" onclick="sendUnderstood()">Submit request'+svg('<path d="M5 12h14M12 5l7 7-7 7"/>',2)+'</button>'+
      '<button class="btn btn-ghost req-submit" onclick="openRFQModal()">Request for Quote'+svg('<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M9 15h6"/>',2)+'</button>'+
      '</div></div>';
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

  var eqGroupBy='code';
  var eqSearchStr='';
  function eqSetSearch(v){ eqSearchStr=(v||'').toLowerCase().trim(); eqPopClose(); setEqView(eqState.view); }
  function eqTaskInfo(t){ for(var i=0;i<EQ_TASKS.length;i++){if(EQ_TASKS[i].task===t)return EQ_TASKS[i];} return null; }
  function eqGroupClass(l){ return (l.cat||'Other').split(' \u203a ')[0]; }
  function eqSumLines(ls){ var s=0; for(var i=0;i<ls.length;i++)s+=eqLineTotal(ls[i]); return s; }
  function eqGroups(){
    var mode=eqGroupBy, groups=[], map={}, i, l;
    var _sl=eqSearchStr?EQ_LINES.filter(function(x){var q=eqSearchStr;return(x.desc||'').toLowerCase().indexOf(q)>=0||(x.cat||'').toLowerCase().indexOf(q)>=0||(x.code||'').toLowerCase().indexOf(q)>=0;}):EQ_LINES;
    if(mode==='code'){
      for(i=0;i<EQ_CODES.length;i++){var c=EQ_CODES[i]; var g={tag:c.code,title:c.name,meta:c.phase,lines:[],hasBudget:true,budget:c.budget,committed:c.committed,code:c.code}; groups.push(g); map[c.code]=g;}
      for(i=0;i<_sl.length;i++){l=_sl[i]; if(map[l.code])map[l.code].lines.push(l);}
      return groups;
    }
    for(i=0;i<_sl.length;i++){
      l=_sl[i]; var key,tag,title,meta,pcode=null;
      if(mode==='task'){ key=l.task||(l.code+'.00'); var ti=eqTaskInfo(key); tag=key; title=ti?ti.name:l.desc; meta=ti?(ti.code+' \u00b7 '+ti.phase):l.code; pcode=ti?ti.code:l.code; }
      else if(mode==='class'){ key=eqGroupClass(l); tag=null; title=key; meta='equipment class'; }
      else { key=l.scope||'Unassigned'; tag=null; title=key; meta='schedule activity'; }
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
    var cap='';
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
        var editBtn='<button class="eq-ib" onclick="event.stopPropagation();openEqEdit(\''+l.id+'\')" title="'+(stt==='submitted'?'Request change':'Edit line')+'">'+svg('<path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 013 3L12 15l-4 1 1-4z"/>',2)+'</button>';
        var delBtn='<button class="eq-ib danger" onclick="event.stopPropagation();delEqLine(\''+l.id+'\')" title="'+(stt==='pending'?'Withdraw request':'Remove draft')+'">'+svg('<path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>',2)+'</button>';
        var act;
        if(stt==='draft'||stt==='pending') act=editBtn+delBtn;
        else if(stt==='submitted') act=editBtn;
        else act='<span class="eq-lock" title="On rent \u2014 locked">'+svg('<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>',2)+'</span>';
        body+='<div class="eqrow" onclick="toggleEqDrill(\''+l.id+'\')" style="cursor:pointer" title="View full details">'
          +'<div class="eq-desc">'+l.desc+'<div class="sub">'+l.cat+' \u00b7 '+l.scope+(l.ref?' \u00b7 <span class="eq-ref">'+l.ref+'</span>':'')+'</div>'+(_dpItemAttrs[l.id]&&_dpItemAttrs[l.id].length?'<div style="display:flex;gap:3px;flex-wrap:wrap;margin-top:3px">'+_dpItemAttrs[l.id].map(function(a){return '<span style="font-size:9px;padding:1px 5px;border-radius:8px;background:var(--g100);color:var(--g600);border:1px solid var(--g150)">'+a+'</span>';}).join('')+'</div>':'')+'</div>'
          +'<div class="eq-dates">'+eqMonthLabel(l.from)+' \u2019'+l.from.slice(2,4)+' \u2192 '+eqMonthLabel(l.to)+' \u2019'+l.to.slice(2,4)+'<div class="sub">'+mo+' billable months</div></div>'
          +'<div class="eq-qty">\u00d7'+l.qty+'</div>'
          +(stt==='pending'?'<div class="eq-cost pend">Pending<div class="sub">02S to price</div></div>':'<div class="eq-cost">'+fmt(l.rate)+'/mo<div class="sub"><b>'+fmtBig(lt)+'</b> total</div></div>')
          +'<div class="eq-status"><span class="eq-st '+stt+'"><span class="d"></span>'+stTxt+'</span></div>'
          +'<div class="eq-actions">'+act+'</div>'
          +'</div>';
      body+='<div id="eq-drill-'+l.id+'" class="otrack" style="display:none">'+buildEqTrack(l)+'</div>';
      }
      body+='</div>';
    }
    gel('eqPlan').innerHTML=cap+'<div class="eqtbl">'+thead+body+'</div>';
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
    var modeLabel=eqGroupBy==='code'?'Cost code':eqGroupBy==='task'?'Schedule activity':'Equipment class';
    var head='<div class="g-head"><div class="gh-label">'+modeLabel+' / equipment</div><div class="gh-months">'+mh+'</div></div>';
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
        var _gRA=_dpRowAssets[l.id]||[];
        var _panIdEq='egap-'+l.id;
        var _gRO=stt==='offrent';
        var _onRE=_gRA.filter(function(a){return a.status!=='offrent';}).length;
        var _offRE=_gRA.length-_onRE;
        var _hasAss=locked;
        rows+='<div class="gas-row-wrap">';
        rows+='<div class="grow" style="cursor:'+(_hasAss?'pointer':'default')+'"'+(_hasAss?' data-panel="'+_panIdEq+'" onclick="gasToggle(this)"':'')+'>'
          +'<div class="g-label">'+l.desc+'<span class="gqty">\u00d7'+l.qty+'</span>'
          +(_hasAss?'<span style="font-size:9px;color:var(--g400);margin-left:auto">'+(_gRA.length||0)+(_gRO?' hist':'\u25be')+'</span>':'')
          +'</div>'
          +'<div class="g-track" style="background-image:'+grid+'">'
          +'<div id="gb-'+l.id+'" class="g-bar '+stt+' '+(locked?'vw':'clk')+'" style="left:'+left.toFixed(3)+'%;width:calc('+width.toFixed(3)+'% - 3px)" onclick="event.stopPropagation();openEqBar(\''+l.id+'\')" title="'+btitle+'">\u00d7'+l.qty+'</div>'
          +'</div>'
          +'</div>';
        if(_hasAss){
          rows+='<div id="'+_panIdEq+'" class="gas-panel">';
          rows+='<div class="gas-panel-hd">';
          if(_gRA.length){
            if(_onRE>0)rows+='<span class="gas-badge gas-badge-onrent">\u25cf '+_onRE+' on-rent</span>';
            if(_offRE>0)rows+='<span class="gas-badge gas-badge-offrent">\u2713 '+_offRE+' historical</span>';
          }else{rows+='<span class="gas-badge gas-badge-empty">No assets assigned</span>';}
          rows+='<div class="gas-actions">';
          if(!_gRO){rows+='<button class="gas-btn" onclick="event.stopPropagation();dpOpenAssetPicker(\''+l.id+'\',\''+l.cat.split(' ')[0]+'\')">+ Assign</button>';}
          if(!_gRO&&_onRE>0){rows+='<button class="gas-btn gas-btn-red" onclick="event.stopPropagation();dpInitOffrentModal(\''+l.id+'\',\''+l.desc.replace(/'/g,'\\x27')+'\')">\u2193 Off-rent</button>';}
          rows+='</div></div>';
          if(_gRA.length){
            rows+='<div class="gas-chips-grid">';
            _gRA.forEach(function(a){
              var isOff=a.status==='offrent';
              rows+='<div class="gas-chip '+(isOff?'gas-chip-offrent':'gas-chip-onrent')+'">'+a.id+(isOff?'<span class="gas-chip-tag">returned</span>':'')+'</div>';
            });
            rows+='</div>';
          }
          rows+='</div>';
        }
        rows+='</div>';
      }
    }
    var today='<div class="g-today" style="left:calc(220px + (100% - 220px) * '+(todayPct/100).toFixed(4)+')"><span class="gt-lbl">Today</span></div>';
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
    var pileAssets=0; for(var j=0;j<EQ_LINES.length;j++){if(EQ_LINES[j].code==='31-630')pileAssets+=EQ_LINES[j].qty;}
    var bessCrane=null; for(var m=0;m<EQ_LINES.length;m++){if(EQ_LINES[m].task==='A6010')bessCrane=EQ_LINES[m];}
    var h='<div class="ins-strip"><span class="isi"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6 4.5 2.3 7.1-6.3-4.6L5.7 21l2.3-7.1-6-4.5h7.6z"/></svg></span>'
      +'<div><div class="ist">02S is actively managing this plan</div><div class="isd">Projection rebuilt from the current CPM schedule \u00b7 '+(overs.length+3)+' things to weigh before Sector 2 module install begins.</div></div></div>';
    h+='<div class="eq-callouts">';
    if(overs.length){ h+=eqCallout('risk','Cost codes trending over',overTxt+' at the current spread. Still in-flight \u2014 rebalance now, not at closeout.'); }
    h+=eqCallout('risk','Schedule slip cascades into the plan','The CPM update pushed <b>A3020 Sector 2 pile driving +2 weeks</b>. 02S re-dated '+pileAssets+' pile package assets (drivers + telehandlers) and flagged the knock-on delay to Sector 2 racking mobilization.');
    h+=eqCallout('opp','Telehandler overlap \u2014 pool instead of double-rent','Pile driving (16 units) and racking (24 units) overlap Sep\u2013Dec. As Sector 1 piling wraps, transfer 8 telehandlers directly to racking instead of off-rent + re-rent \u2192 <b>save ~$85K</b>.');
    if(bessCrane&&!bessCrane.rate){ h+=eqCallout('risk','BESS crawler crane (A6010) \u2014 no rate set','The 230T crawler for BESS heavy lift is still in draft with no 02S rate. Procurement window is narrowing \u2014 finalize the spec and submit before Q4 to avoid spot-market pricing.'); }
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
    var selectedName=l&&l.catId?(byId(l.catId)||{}).name||'':'';
    var f='<div class="mform">';
    f+='<div class="mf"><label>Equipment <span class="opt">rate is set by the 02S catalog</span></label>'
     +'<div class="eq-search-wrap" style="margin-bottom:6px"><svg class="eq-search-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg><input class="rin eq-search-inp" id="eqCatSearch" placeholder="Search catalog — excavator, crane, scissor lift…" oninput="eqCatFilter(this.value)" value="'+selectedName+'"></div>'
     +'<div id="eqCatHits" style="display:none;border:1px solid var(--g200);border-radius:8px;overflow:hidden;margin-bottom:6px;max-height:200px;overflow-y:auto"></div>'
     +'<div id="eqCatSelected" style="'+(pick&&pick!=='__custom__'?'':'display:none')+';font-size:12px;color:var(--g600);padding:6px 8px;background:var(--g050);border-radius:6px;margin-bottom:4px">Selected: <b id="eqCatSelName">'+(selectedName||'')+'</b> <button class="linkbtn" style="margin-left:6px;font-size:11px" onclick="eqCatClear()">Clear</button></div>'
     +'<input type="hidden" id="eqfPick" value="'+pick+'">'
     +'</div>';
    f+='<div id="eqfDetail"></div>';
    f+='<div class="mf"><label>Cost code <span class="opt">your project budget line</span></label><select id="eqfCode" class="acc-sel wfull">'+eqCodeOptions(code)+'</select></div>';
    f+='<div class="mf3"><div class="mf"><label>Quantity</label><input id="eqfQty" class="rin" type="number" min="1" value="'+(l?l.qty:1)+'"></div><div class="mf"><label>Date needed</label><select id="eqfFrom" class="acc-sel wfull">'+eqMonthOptions(l?l.from:EQ_MONTHS[6])+'</select></div><div class="mf"><label>Projected off-rent</label><select id="eqfTo" class="acc-sel wfull">'+eqMonthOptions(l?l.to:EQ_MONTHS[9])+'</select></div></div>';
    f+='<div class="mf"><label>Schedule activity</label><input id="eqfScope" class="rin" placeholder="Phase 3 \u00b7 Module install" value="'+(l?esc(l.scope):'')+'"></div>';
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
  function eqCatFilter(q){
    var sel=gel('eqfPick'), wrap=gel('eqCatHits'); if(!sel||!wrap)return;
    if(!q||!q.trim()){wrap.style.display='none';return;}
    var qt=q.toLowerCase().trim();
    var hits=eqCatalogItems().filter(function(p){return p.name.toLowerCase().indexOf(qt)>-1||(p.spec&&p.spec.toLowerCase().indexOf(qt)>-1)||(p.cat&&p.cat.toLowerCase().indexOf(qt)>-1);}).slice(0,8);
    if(!hits.length){wrap.innerHTML='<div style="padding:10px 12px;font-size:12px;color:var(--g400)">No matches</div>';wrap.style.display='block';return;}
    wrap.innerHTML=hits.map(function(p){return '<div style="padding:9px 12px;cursor:pointer;border-bottom:1px solid var(--g100);display:flex;justify-content:space-between;align-items:center;font-size:12.5px" onmouseover="this.style.background=\'var(--g050)\'" onmouseout="this.style.background=\'\'" onclick="eqCatSelect(\''+p.id+'\')">'+'<span>'+p.name+'</span><span style="color:var(--g400);font-size:11.5px">'+p.price+p.unit+'</span></div>';}).join('');
    wrap.style.display='block';
  }
  function eqCatSelect(pid){
    var hid=gel('eqfPick'); if(!hid)return;
    hid.value=pid; eqPickChange();
    var p=byId(pid)||{};
    var inp=gel('eqCatSearch'); if(inp)inp.value='';
    var wrap=gel('eqCatHits'); if(wrap)wrap.style.display='none';
    var sel=gel('eqCatSelected'); if(sel)sel.style.display='';
    var nm=gel('eqCatSelName'); if(nm)nm.textContent=p.name||pid;
  }
  function eqCatClear(){
    var hid=gel('eqfPick'); if(hid)hid.value='';
    var sel=gel('eqCatSelected'); if(sel)sel.style.display='none';
    var inp=gel('eqCatSearch'); if(inp){inp.value='';inp.focus();}
    eqPickChange();
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
      +'<span style="flex:1;min-width:0;overflow:hidden"><span style="font-size:13px;font-weight:650;color:var(--g900);display:block">'+title+'</span><span style="font-size:11.5px;color:var(--g500);display:block;white-space:normal">'+sub+'</span></span>'
      +'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14" style="color:var(--g400);flex-shrink:0"><path d="M9 18l6-6-6-6"/></svg>'
      +'</button>';
  }
  function openEqAdd(code){
    eqEditId=null; eqAddCode=code||null;
    var ic=function(d){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="17" height="17">'+d+'</svg>';};
    var h='<div style="display:flex;flex-direction:column;gap:8px;margin-top:2px">'
      +_eqMenuBtn(ic('<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18"/>'), 'Add lines',  'Enter one or more items manually — start with one row, add more as needed', '_openEqUnified()')
      +_eqMenuBtn(ic('<path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/>'), 'From 02S catalog', 'Pick priced equipment — rate auto-filled', '_openEqAddForm()')
      +_eqMenuBtn(ic('<path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>'), 'Import from estimate', 'HeavyBid extract or Excel estimate', '_openEqImport()')
      +'</div>';
    openModal('Add demand line', h);
  }
  function _openEqUnified(){
    var makeRow=function(){
      return '<tr>'
        +'<td style="padding:5px 4px"><input class="rin" placeholder="e.g. Excavator 20T" style="width:160px"></td>'
        +'<td style="padding:5px 4px"><input class="rin" type="number" min="1" placeholder="1" style="width:56px;text-align:center"></td>'
        +'<td style="padding:5px 4px"><select class="acc-sel" style="min-width:110px">'+EQ_CODES.map(function(c){return '<option value="'+c.code+'">'+c.code+' · '+c.name+'</option>';}).join('')+'</select></td>'
        +'<td style="padding:5px 4px"><select class="acc-sel">'+EQ_MONTHS.map(function(m){return '<option value="'+m+'">'+eqMonthLabel(m)+'</option>';}).join('')+'</select></td>'
        +'<td style="padding:5px 4px"><select class="acc-sel">'+EQ_MONTHS.map(function(m){return '<option value="'+m+'">'+eqMonthLabel(m)+'</option>';}).join('')+'</select></td>'
        +'<td style="padding:5px 4px"><input class="rin" placeholder="Phase · activity" style="width:110px"></td>'
        +'<td style="padding:5px 4px"><button class="eq-ib danger" onclick="this.closest(\'tr\').remove()" title="Remove"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" width=\"14\" height=\"14\"><path d=\"M18 6L6 18M6 6l12 12\"/></svg></button></td>'
        +'</tr>';
    };
    var cols=['Description','Qty','Cost code','Date needed','Off-rent','Schedule activity',''];
    var thead='<tr>'+cols.map(function(c){return '<th style="font-size:10px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:var(--g500);padding:6px 8px;border-bottom:1px solid var(--g200);text-align:left;white-space:nowrap">'+c+'</th>';}).join('')+'</tr>';
    var h='<div style="font-size:11.5px;color:var(--g500);margin-bottom:8px">Fill in descriptions — one row per equipment type. Add more rows as needed.</div>'
      +'<div style="overflow-x:auto;margin-bottom:10px"><table style="border-collapse:collapse;font-size:12.5px" id="unifiedTbl">'+thead+makeRow()+'</table></div>'
      +'<button class="btn btn-ghost btn-sm" onclick="_addUnifiedRow()"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" width=\"13\" height=\"13\"><path d=\"M12 5v14M5 12h14\"/></svg> Add row</button>'
      +'<div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-red" onclick="_saveEqUnified()">Add lines</button></div>';
    openModal('Add demand lines', h);
  }
  function _addUnifiedRow(){
    var t=document.getElementById('unifiedTbl'); if(!t)return;
    var r=t.insertRow(-1);
    r.innerHTML='<td style="padding:5px 4px"><input class="rin" placeholder="e.g. Excavator 20T" style="width:160px"></td>'
      +'<td style="padding:5px 4px"><input class="rin" type="number" min="1" placeholder="1" style="width:56px;text-align:center"></td>'
      +'<td style="padding:5px 4px"><select class="acc-sel" style="min-width:110px">'+EQ_CODES.map(function(c){return '<option value="'+c.code+'">'+c.code+' · '+c.name+'</option>';}).join('')+'</select></td>'
      +'<td style="padding:5px 4px"><select class="acc-sel">'+EQ_MONTHS.map(function(m){return '<option value="'+m+'">'+eqMonthLabel(m)+'</option>';}).join('')+'</select></td>'
      +'<td style="padding:5px 4px"><select class="acc-sel">'+EQ_MONTHS.map(function(m){return '<option value="'+m+'">'+eqMonthLabel(m)+'</option>';}).join('')+'</select></td>'
      +'<td style="padding:5px 4px"><input class="rin" placeholder="Phase · activity" style="width:110px"></td>'
      +'<td style="padding:5px 4px"><button class="eq-ib danger" onclick="this.closest(\'tr\').remove()" title="Remove"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M18 6L6 18M6 6l12 12"/></svg></button></td>';
  }
  function _saveEqUnified(){
    var tbl=document.getElementById('unifiedTbl'); if(!tbl)return;
    var rows=tbl.querySelectorAll('tr'); var added=0;
    for(var i=1;i<rows.length;i++){
      var inp=rows[i].querySelectorAll('input,select');
      var desc=(inp[0].value||'').trim(); if(!desc)continue;
      var qty=parseInt(inp[1].value,10)||1;
      var code=(inp[2].value||EQ_CODES[0].code).trim();
      var from=inp[3].value||EQ_MONTHS[0], to=inp[4].value||EQ_MONTHS[4];
      var scope=(inp[5].value||'').trim();
      var task=code+'.00';
      eqSeq++;
      EQ_LINES.push({id:'e'+eqSeq,task:task,code:code,desc:desc,cat:'Material handling',qty:qty,rate:null,from:from,to:to,status:'projected',submitted:false,scope:scope,catId:null});
      eqLog('Added '+qty+'× '+desc+' ('+code+')'); added++;
    }
    closeModal();
    if(added){ toast(added+' line'+(added===1?'':'s')+' added as draft'); eqRefresh(); }
    else toast('No lines added — fill in at least one description');
  }
  function _openEqSingle(){
    var h='<div class="mform">'
      +'<div class="mf"><label>Description</label><input id="eqsDesc" class="rin" placeholder="e.g. Excavator 20T" style="width:100%"></div>'
      +'<div class="mf2"><div class="mf"><label>Quantity</label><input id="eqsQty" class="rin" type="number" min="1" value="1"></div><div class="mf"><label>Cost code</label><input id="eqsTask" class="rin" placeholder="e.g. 02-320.14" value="01-000.00"></div></div>'
      +'<div class="mf2"><div class="mf"><label>Date needed</label><select id="eqsFrom" class="acc-sel wfull">'+eqMonthOptions(EQ_MONTHS[6])+'</select></div><div class="mf"><label>Projected off-rent</label><select id="eqsTo" class="acc-sel wfull">'+eqMonthOptions(EQ_MONTHS[9])+'</select></div></div>'
      +'<div class="mf"><label>Schedule activity</label><input id="eqsScope" class="rin" placeholder="Phase 3 · Module install"></div>'
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
      var cols=['Equipment description','Qty','Date needed','Off-rent','Cost code'];
      var thead='<tr>'+cols.map(function(c){return '<th style="font-size:10.5px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:var(--g500);padding:7px 8px;border-bottom:1px solid var(--g200);text-align:left;white-space:nowrap">'+c+'</th>';}).join('')+'<th></th></tr>';
      var rows='';
      for(var i=0;i<5;i++){
        rows+='<tr>'
          +'<td style="padding:5px 4px"><input class="rin" placeholder="e.g. Excavator 20T" style="width:200px"></td>'
          +'<td style="padding:5px 4px"><input class="rin" type="number" min="1" placeholder="1" style="width:60px;text-align:center"></td>'
          +'<td style="padding:5px 4px"><select class="acc-sel">'+EQ_MONTHS.map(function(m){return '<option value="'+m+'">'+eqMonthLabel(m)+'</option>';}).join('')+'</select></td>'
          +'<td style="padding:5px 4px"><select class="acc-sel">'+EQ_MONTHS.map(function(m){return '<option value="'+m+'">'+eqMonthLabel(m)+'</option>';}).join('')+'</select></td>'
          +'<td style="padding:5px 4px"><input class="rin" placeholder="e.g. 02-320" style="width:110px"></td>'
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
  function eqRefresh(){ initEqOnRentAssets(); renderEqBudget(); renderEqInsights(); setEqView(eqState.view); renderEqHistory(); updateEqSubmitBtn(); }

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
      vitals:[{label:'Plan budget',value:'$3.2M',sub:'services \u00b7 15-mo horizon',tone:'ok',icon:IC.dollar},{label:'Committed to date',value:'$1.3M',sub:'41% \u00b7 5 roles active',tone:'ok',icon:IC.check},{label:'Active headcount',value:'14 FTE',sub:'across 6 firms',tone:'ok',icon:IC.people},{label:'Projected at complete',value:'$2.4M',sub:'+$0.8M under plan',tone:'ok',icon:IC.chart}],
      v1:'6 active roles · 1 role pending pricing (VDC / BIM) · Special inspection on track through current phase.',
      ns:'02S maps each role to the CPM schedule \u2014 the BESS commissioning agent mobilizes as the containers land, and the VDC role is flagged as unpriced before it\u2019s needed on site.',
      cap:'Roles are priced from the 02S rate card; specialty roles are quoted by 02S. The team sets headcount, mobilization window, and cost code.',
      cols:[{key:'role',label:'Role',sub:'firm',w:'1fr'},{key:'qty',label:'Headcount',cls:'c',w:'92px'},{key:'window',label:'Mobilize \u2192 demobilize',w:'176px'},{key:'code',label:'Cost code',w:'160px'},{key:'cost',label:'Monthly',cls:'r',w:'100px'},{key:'__docs',label:'Documents',w:'88px'},{key:'__state',label:'Status',w:'118px'}],
      add:{nameKey:'role',subKey:'firm',qtyKey:'qty',whenKey:'window',costKey:'cost'}, addName:{label:'Role',ph:'e.g. Commissioning agent'}, addQty:{label:'Headcount',ph:'e.g. 2 FTE'}, addWhen:{label:'Mobilize \u2192 demobilize',ph:'e.g. Nov 2026 \u2013 Mar 2027'},
      rows:[
        {role:'Owner\u2019s engineer / IE support',firm:'DNV',qty:'2 FTE',window:'Mar 2026 \u2013 Dec 2026',code:'0100-0100-0000-0001 \u00b7 General conditions',cost:'$28K/mo',state:'Active',scope:'Engineering & oversight',sa:0,ea:8,linkOrd:'ORD-3095'},
        {role:'Geotechnical inspection',firm:'Terracon',qty:'3 FTE',window:'Mar 2026 \u2013 Aug 2026',code:'0200-0320-0000-0001 \u00b7 Site earthwork',cost:'$18K/mo',state:'Active',scope:'Survey & site monitoring',sa:0,ea:4,linkOrd:'ORD-3096',attachments:[{type:'Engineering',name:'Geotechnical investigation report — Hercules phase 2',ref:'GIR-3096-001',status:'Approved'},{type:'Engineering',name:'Field inspection log — Jul 2026',ref:'FIL-3096-JUL',status:'Current'},{type:'Safety',name:'Scope of work — geotech inspection',ref:'SOW-3096-001',status:'Executed'}]},
        {role:'Structural special inspection',firm:'Terracon',qty:'2 FTE',window:'Jun 2026 \u2013 Feb 2027',code:'3100-6200-0000-0001 \u00b7 Solar pile',cost:'$16K/mo',state:'Active',scope:'Engineering & oversight',sa:2,ea:9,linkOrd:'ORD-3091',attachments:[{type:'Engineering',name:'Special inspection program — IBC §1705',ref:'SIP-3091-001',status:'Approved'},{type:'Engineering',name:'Monthly inspection report — Jul 2026',ref:'MIR-3091-JUL',status:'Current'}]},
        {role:'BESS commissioning agent',firm:'3rd-party',qty:'2 FTE',window:'Nov 2026 \u2013 Mar 2027',code:'2600-3300-0000-0001 \u00b7 BESS &amp; Substation',cost:'$34K/mo',state:'Projected',scope:'BESS & commissioning',sa:7,ea:9},
        {role:'Environmental / SWPPP monitoring',firm:'SWCA',qty:'1 FTE',window:'Mar 2026 \u2013 May 2026',code:'0100-0100-0000-0001 \u00b7 General conditions',cost:'$9K/mo',state:'Demobilized',scope:'Survey & site monitoring',sa:0,ea:1,linkOrd:'ORD-3092'},
        {role:'VDC / BIM coordination',firm:'TBD \u2014 not in rate card',qty:'3 FTE',window:'Apr 2026 \u2013 Oct 2026',code:'0100-0100-0000-0001 \u00b7 General conditions',cost:'Pending',state:'Pending pricing',scope:'Engineering & oversight',sa:0,ea:6,quoteRef:'Q-63415',linkOrd:'ORD-3120'},
        {role:'Site survey crew',firm:'Bowman',qty:'2 FTE',window:'Apr 2026 \u2013 Jul 2026',code:'0100-0100-0000-0001 \u00b7 General conditions',cost:'$12K/mo',state:'Demobilized',scope:'Survey & site monitoring',sa:0,ea:3,linkOrd:'ORD-3009'}
      ]},
    procurement:{ title:'Procurement demand plan', chip:'Small tools &amp; consumables', icon:IC.cart, singular:'procurement',
      vitals:[{label:'Committed',value:'$87K',sub:'small tools on plan',tone:'ok',icon:IC.dollar},{label:'Items on plan',value:'10',sub:'5 categories',tone:'ok',icon:IC.check},{label:'At-risk',value:'1',sub:'order-by passed',tone:'bad',icon:IC.warn},{label:'On-time to need-by',value:'90%',sub:'9 of 10 tracking',tone:'warn',icon:IC.chart}],
      v1:'10 items on plan · 1 at-risk · Tone shear wrenches overdue — needed for structural bolt tensioning.',
      ns:'02S auto-calculates reorder points from the tool deployment schedule \u2014 tone shear wrenches are overdue; release the PO now to protect August solar-pile completion.',
      cap:'Order-by dates are auto-computed from lead time and the tool deployment schedule. Small tools are sourced from the 02S rate card; specialty items are quoted directly.',
      cols:[{key:'item',label:'Item',sub:'itemSub',w:'1fr'},{key:'qty',label:'Qty',cls:'c',w:'86px'},{key:'needby',label:'Need-by',w:'96px'},{key:'orderby',label:'Order-by (lead)',w:'146px',flag:'risk'},{key:'code',label:'Cost code',w:'150px'},{key:'cost',label:'Ext.',cls:'r',w:'82px'},{key:'__docs',label:'Documents',w:'88px'},{key:'__state',label:'Status',w:'112px'}],
      add:{nameKey:'item',subKey:'itemSub',qtyKey:'qty',whenKey:'needby',costKey:'cost'}, addName:{label:'Item',ph:'e.g. Medium-voltage switchgear'}, addQty:{label:'Quantity',ph:'e.g. 2'}, addWhen:{label:'Need-by date',ph:'e.g. Oct 15'},
      rows:[
        {item:'Nut runners \u2014 3/8\'',itemSub:'cordless torque-controlled · solar racking',qty:'48',needby:'Jul 15',orderby:'Jun 1 \u00b7 6 wk',code:'3100-6200-0000-0001 \u00b7 Solar pile',cost:'$22K',state:'PO issued',linkOrd:'ORD-3100'},
        {item:'Battery packs \u2014 20v',itemSub:'Milwaukee M18 · site cordless fleet',qty:'100',needby:'Jul 1',orderby:'Jun 15 \u00b7 2 wk',code:'0100-0100-0000-0001 \u00b7 General conditions',cost:'$11K',state:'Delivered',linkOrd:'ORD-3101'},
        {item:'Quad charging banks',itemSub:'12-bay · site-wide tool charging',qty:'20',needby:'Jul 1',orderby:'Jun 10 \u00b7 3 wk',code:'0100-0100-0000-0001 \u00b7 General conditions',cost:'$14K',state:'Delivered',linkOrd:'ORD-3102'},
        {item:'Tone shear wrenches',itemSub:'TS60 + TS90 · structural bolt tensioning',qty:'12',needby:'Aug 15',orderby:'Jul 18 \u00b7 4 wk',risk:true,code:'3100-6200-0000-0001 \u00b7 Solar pile',cost:'$18K',state:'At-risk',linkOrd:'ORD-3103'},
        {item:'Angle grinders \u2014 4.5\'',itemSub:'cordless 20v · metalwork &amp; weld prep',qty:'16',needby:'Aug 1',orderby:'Jun 15 \u00b7 6 wk',code:'0100-0100-0000-0001 \u00b7 General conditions',cost:'$4K',state:'Delivered',linkOrd:'ORD-3104'},
        {item:'SDS Max rotary hammers',itemSub:'1-3/4\' · concrete anchoring · BESS pad',qty:'8',needby:'Sep 1',orderby:'Aug 10 \u00b7 3 wk',code:'2600-3300-0000-0001 \u00b7 BESS &amp; Substation',cost:'$6K',state:'Draft',quoteRef:'Q-63413'},
        {item:'HEPA vacuums \u2014 10 gal',itemSub:'cordless · silica dust control · OSHA Table 1',qty:'6',needby:'Aug 1',orderby:'Jul 15 \u00b7 2 wk',code:'0100-0100-0000-0001 \u00b7 General conditions',cost:'$4K',state:'PO issued',linkOrd:'ORD-3105'},
        {item:'Wire crimpers \u2014 hydraulic',itemSub:'11T / 12T · BESS &amp; electrical terminations',qty:'8',needby:'Oct 1',orderby:'Sep 5 \u00b7 4 wk',code:'2600-3300-0000-0001 \u00b7 BESS &amp; Substation',cost:'$8K',state:'Draft',quoteRef:'Q-63414'}
      ]},
    prefab:{ title:'Prefab demand plan', chip:'Shop-fabricated assemblies', icon:IC.layers, singular:'prefab',
      vitals:[{label:'Assemblies planned',value:'32',sub:'5 assembly types',tone:'ok',icon:IC.layers},{label:'In fabrication',value:'16',sub:'2 shops',tone:'info',icon:IC.box},{label:'Committed',value:'$0.9M',sub:'made-to-order',tone:'ok',icon:IC.dollar},{label:'On-track to need date',value:'4 of 5',sub:'1 awaiting submittal',tone:'warn',icon:IC.chart}],
      v1:'32 assemblies planned · 16 in fabrication · 1 awaiting submittal approval (BESS e-houses).',
      ns:'02S ties each assembly\u2019s submittal \u2192 fabrication \u2192 delivery back to its install date \u2014 the BESS e-houses need submittal approval this week to protect November energization.',
      cap:'Assemblies are made-to-order, so pricing is quoted by 02S after submittal. The team sets quantity, need-on-site date, and cost code.',
      cols:[{key:'asm',label:'Assembly',w:'1fr'},{key:'qty',label:'Qty',cls:'c',w:'80px'},{key:'need',label:'Need on-site',w:'114px'},{key:'stage',label:'Submittal \u2192 fab \u2192 deliver',w:'190px'},{key:'code',label:'Cost code',w:'150px'},{key:'cost',label:'Quote',cls:'r',w:'96px'},{key:'__docs',label:'Documents',w:'88px'},{key:'__state',label:'Status',w:'124px'}],
      add:{nameKey:'asm',qtyKey:'qty',whenKey:'need',costKey:'cost'}, addName:{label:'Assembly',ph:'e.g. Modular e-house'}, addQty:{label:'Quantity',ph:'e.g. 2'}, addWhen:{label:'Need on-site',ph:'e.g. Nov 1'},
      rows:[
        {asm:'Prefab pipe rack modules',qty:'12',need:'Aug 15',stage:'Submittal approved \u00b7 in fab',code:'2600-0540-0000-0001 \u00b7 Module install',cost:'$146K',state:'In fabrication',linkOrd:'ORD-3060'},
        {asm:'L2 headwall assemblies',qty:'8',need:'Jul 20',stage:'Delivered \u00b7 order PF-021',code:'2600-0540-0000-0001 \u00b7 Module install',cost:'$147K',state:'Delivered',linkOrd:'ORD-3106'},
        {asm:'Modular e-houses (BESS)',qty:'2',need:'Nov 1',stage:'Submittal in review',code:'2600-3300-0000-0001 \u00b7 BESS',cost:'Pending',state:'Submittal',linkOrd:'ORD-3107',attachments:[{type:'Submittals',name:'Submittal package — BESS e-houses rev 1',ref:'SUB-3107-R1',status:'Under review'},{type:'Engineering',name:'Engineer review notes — structural',ref:'ERN-3107-001',status:'In progress'},{type:'Engineering',name:'Shop drawings — e-house layout rev B',ref:'SD-3107-RB',status:'Pending approval'}]},
        {asm:'Skid-mounted pump assemblies',qty:'4',need:'Sep 1',stage:'In fabrication',code:'0200-0320-0000-0001 \u00b7 Site earthwork',cost:'$88K',state:'In fabrication',linkOrd:'ORD-3108',attachments:[{type:'Engineering',name:'Shop drawings — pipe rack modules rev C',ref:'SD-3108-RC',status:'Approved'},{type:'Engineering',name:'Material certification — A53 pipe',ref:'MC-3108-001',status:'Approved'},{type:'Submittals',name:'Fabrication schedule — Aug delivery',ref:'FS-3108-001',status:'Current'}]},
        {asm:'Prefab cable tray runs',qty:'lot',need:'Aug 1',stage:'Not started',code:'2600-0540-0000-0001 \u00b7 Module install',cost:'Pending',state:'Draft',quoteRef:'Q-63412'}
      ]},
    logistics:{ title:'Logistics demand plan', chip:'Deliveries, hauls &amp; site moves', icon:IC.truck, singular:'logistics',
      vitals:[{label:'Moves this week',value:'3',sub:'2 heavy hauls',tone:'info',icon:IC.truck},{label:'Heavy hauls (oversize)',value:'4',sub:'permit required',tone:'warn',icon:IC.warn},{label:'Crane mobilizations',value:'2',sub:'scheduled this month',tone:'ok',icon:IC.crane},{label:'Laydown utilization',value:'78%',sub:'Yards A\u2013C',tone:'warn',icon:IC.chart}],
      v1:'6 moves this week · 3 oversize hauls pending permits · Tower crane mobilization confirmed Aug 3.',
      ns:'02S auto-generates most logistics events from delivery dates across the equipment, procurement, and prefab plans \u2014 and flagged a north-gate conflict where the switchgear haul overlaps tower-crane mobilization.',
      cap:'Most moves are auto-created from delivery dates in the other plans. Add ad-hoc moves here; 02S schedules windows, gates, and permits.',
      cols:[{key:'move',label:'Move / event',sub:'moveSub',w:'1fr'},{key:'type',label:'Type',w:'126px'},{key:'when',label:'Date &amp; window',w:'150px'},{key:'gate',label:'Route / gate',w:'124px'},{key:'src',label:'Source',w:'118px'},{key:'__state',label:'Status',w:'114px'}],
      add:{nameKey:'move',subKey:'moveSub',qtyKey:'type',whenKey:'when'}, addName:{label:'Move / event',ph:'e.g. Tower crane mobilization'}, addQty:{label:'Type',ph:'Delivery / Heavy haul / Crane mobilization'}, addWhen:{label:'Date &amp; window',ph:'e.g. Aug 15 \u00b7 6 AM'},
      rows:[
        {move:'Excavator delivery',type:'Heavy haul',when:'May 20 \u00b7 6\u201310 AM',gate:'North gate',src:'ORD-3042',state:'Complete',linkOrd:'ORD-3070'},
        {move:'MV switchgear delivery',moveSub:'oversize load',type:'Heavy haul',linkOrd:'ORD-3116',when:'Oct 15 \u00b7 TBD',gate:'North gate',src:'Procurement',state:'Requested'},
        {move:'Tower crane mobilization',type:'Crane mobilization',when:'Aug 3 \u00b7 5 AM',gate:'Laydown A',src:'ORD-3054',state:'Scheduled',linkOrd:'ORD-3071',attachments:[{type:'Safety',name:'Lift plan — tower crane mobilization Aug 2026',ref:'LP-3071-001',status:'Approved'},{type:'Shipping',name:'Haul route map — oversize crane transport',ref:'HR-3071-001',status:'Approved'},{type:'Safety',name:'Traffic control plan',ref:'TCP-3071-001',status:'Approved'}]},
        {move:'PV module deliveries',moveSub:'recurring',type:'Delivery',linkOrd:'ORD-3117',when:'Sep \u00b7 daily',gate:'East gate',src:'Procurement',state:'Requested'},
        {move:'BESS container placement',type:'Haul + crane',linkOrd:'ORD-3118',when:'Dec 1',gate:'Pad 3',src:'Procurement',state:'Requested'},
        {move:'Prefab pipe rack delivery',type:'Delivery',linkOrd:'ORD-3119',when:'Aug 15',gate:'Laydown B',src:'Prefab',state:'Requested'},
        {move:'Site laydown reservation',type:'Laydown',when:'Ongoing',gate:'Yard C',src:'\u2014',state:'Active',linkOrd:'ORD-3072'}
      ]}
  };
  var dpActive=null, dpAddPk=null;

  var logPlanView='gcgr';
  var gcgrView='table';
  var deliveryFilter='active';
  var GCGR_SERVICES=[
    {svc:'Trash hauling & dumpster service',vendor:'Republic Services',start:'May 1',end:'Jan 31, 2027',cost:'0100-0100-0000-0001',monthly:'$3,200',status:'Active',sa:1,ea:9},
    {svc:'Portable restrooms',vendor:'United Site Services',start:'May 1',end:'Nov 30',cost:'0100-0100-0000-0001',monthly:'$1,800',status:'Active',sa:1,ea:7},
    {svc:'Site office trailers (4 units)',vendor:'WillScot',start:'Apr 15',end:'Dec 15',cost:'0100-0100-0000-0001',monthly:'$4,600',status:'Active',sa:0,ea:8},
    {svc:'Security services — 24/7',vendor:'Allied Universal',start:'May 1',end:'Jan 31, 2027',cost:'0100-0100-0000-0001',monthly:'$18,400',status:'Active',sa:1,ea:9},
    {svc:'Dewatering — sumps & pumping',vendor:'Rain Bird Industrial',start:'Jun 1',end:'Sep 30',cost:'0200-0320-0000-0001',monthly:'$5,100',status:'Scheduled',sa:2,ea:5},
    {svc:'Temporary fencing & barricade',vendor:'Sunbelt Rentals',start:'Apr 15',end:'Nov 30',cost:'0100-0100-0000-0001',monthly:'$1,400',status:'Active',sa:0,ea:7},
    {svc:'Lighting towers (8 units)',vendor:'Sunbelt Rentals',start:'May 1',end:'Jan 31, 2027',cost:'0100-0100-0000-0001',monthly:'$2,800',status:'Active',sa:1,ea:9},
    {svc:'Concrete washout service',vendor:'US LBM',start:'Jun 15',end:'Oct 31',cost:'0300-0100-0000-0001',monthly:'$900',status:'Scheduled',sa:2,ea:6}
  ];
  var MOBDEMOB_EVENTS=[
    {evt:'Tower crane mobilization',vendor:'Maxim Crane Works',needby:'Aug 3',type:'Mob',cost:'0100-5100-0000-0001',notes:'Self-erect · Laydown A · 5 AM window'},
    {evt:'Generator set — 500 kW',vendor:'AGGREKO',needby:'May 20',type:'Mob',cost:'0100-5100-0000-0001',notes:'Temporary power during grid interconnect'},
    {evt:'Site office trailer delivery (4 units)',vendor:'WillScot',needby:'Apr 15',type:'Mob',cost:'0100-0100-0000-0001',notes:'Completed · in service'},
    {evt:'MV switchgear haul — oversize',vendor:'Landstar',needby:'Oct 15',type:'Mob',cost:'0100-5100-0000-0001',notes:'Permit required · North gate · TBD window'},
    {evt:'BESS container placement',vendor:'Barnhart Crane',needby:'Dec 1',type:'Mob',cost:'0100-5100-0000-0001',notes:'Pad 3 · rigging crew required'},
    {evt:'Tower crane demobilization',vendor:'Maxim Crane Works',needby:'Oct 15',type:'Demob',cost:'0100-5100-0000-0001',notes:'After structure phase completion'},
    {evt:'Generator demob after grid tie-in',vendor:'AGGREKO',needby:'Sep 1',type:'Demob',cost:'0100-5100-0000-0001',notes:'Pending grid interconnect confirmation'},
    {evt:'Office trailer removal',vendor:'WillScot',needby:'Jan 15, 2027',type:'Demob',cost:'0100-0100-0000-0001',notes:'Post-substantial completion'}
  ];
  var DELIVERIES=[
    {item:'Excavator — 20T',pillar:'Equipment',needby:'May 20',vendor:'Sunbelt Rentals',order:'ORD-3042',status:'Scheduled'},
    {item:'PV module deliveries (recurring)',pillar:'Procurement',needby:'Sep · daily',vendor:'First Solar',order:'PO-4412',status:'Requested'},
    {item:'Prefab pipe rack modules',pillar:'Prefab',needby:'Aug 15',vendor:'Steel Fab Inc.',order:'PF-021',status:'In fabrication'},
    {item:'MV switchgear',pillar:'Procurement',needby:'Oct 15',vendor:'Eaton',order:'PO-4391',status:'Requested'},
    {item:'¾-Ton Crew Truck (2 units)',pillar:'Equipment',needby:'May 20',vendor:'Enterprise Fleet',order:'ORD-3051',status:'Delivered'},
    {item:'Structural steel — racking',pillar:'Procurement',needby:'Aug 1',vendor:'Nucor Steel',order:'PO-4398',status:'Requested'},
    {item:'Modular e-houses (BESS, 2)',pillar:'Prefab',needby:'Nov 1',vendor:'Eaton Power',order:'PF-022',status:'Submittal'},
    {item:'Cable &amp; conductors',pillar:'Procurement',needby:'Rolling',vendor:'Anixter',order:'PO-4421',status:'Draft'}
  ];
  function setLogPlanView(v){ logPlanView=v; gcgrView='table'; renderLogPlan(); }
  function setGcgrView(v){ gcgrView=v; renderLogPlan(); }
  function setDeliveryFilter(f){ deliveryFilter=f; renderLogPlan(); }
  function renderLogPlan(){
    var mount=document.getElementById('dp-logistics'); if(!mount)return;
    var ns=CURRENT==='ns';
    var LSPARK='<svg viewBox="0 0 24 24" fill="currentColor" style="width:13px;height:13px"><path d="M12 2l2.4 7.4H22l-6 4.5 2.3 7.1L12 16.9 5.3 21l2.3-7.1-6-4.5h7.6z"/></svg>';
    var tabs=[['gcgr','GC/GR Services']].concat(ns?[['trnwh','Transportation &amp; Warehousing']]:[]);
    if(logPlanView==='mobdemob') logPlanView='gcgr';
    if(!ns&&logPlanView==='trnwh') logPlanView='gcgr';
    if(logPlanView==='delivery') logPlanView='gcgr';
    var h='<div class="phead"><div><h1>Logistics plan <span style="font-size:12.5px;font-weight:400;color:var(--g400);margin-left:6px">DP-LOG-HRC-001</span></h1><div class="meta"><span class="chip">Deliveries, ongoing services &amp; mobilization</span><span class="chip ver">'+(ns?'North Star':'V1 — standard')+'</span></div></div></div>';
    if(ns){
      h+='<div class="eq-toolbar" style="margin-bottom:0"><span class="spacer"></span><button class="btn btn-dark btn-sm" onclick="openDPAdd(\'logistics\')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>Add demand line</button></div>';
      h+='<div class="log-tabs">';
      tabs.forEach(function(t){ h+='<button class="log-tab'+(logPlanView===t[0]?' active':'')+'" onclick="setLogPlanView(\''+t[0]+'\')">'+t[1]+'</button>'; });
      h+='</div>';
    } else {
      h+='<div class="eq-toolbar" style="margin-bottom:14px"><span style="font-size:12.5px;color:var(--g500)">V1 focused on GC/GR services — pending scoping conversations with pillar leads.</span><span class="spacer"></span><button class="btn btn-dark btn-sm" onclick="openDPAdd(\'logistics\')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>Add demand line</button></div>';
    }
    var LOG_ROWS=DP['logistics'].rows;
    if(LOG_ROWS&&LOG_ROWS.length){
      h+='<div style="margin-top:0;margin-bottom:8px;display:flex;align-items:center;gap:10px">';
      h+='<span style="font-size:12px;font-weight:700;color:#0f172a;text-transform:uppercase;letter-spacing:.05em">Demand plan</span>';
      h+='<span style="font-size:11.5px;color:var(--g400)">'+LOG_ROWS.length+' line'+(LOG_ROWS.length===1?'':'s')+'</span>';
      h+='</div>';
      var pmGt='1fr 126px 150px 124px 118px 88px 114px';
      h+='<div class="dp-tbl"><div class="dp-head" style="grid-template-columns:'+pmGt+'">';
      h+='<span>Move / event</span><span>Type</span><span>Date &amp; window</span><span>Gate / route</span><span>Source</span><span>Documents</span><span>Status</span></div>';
      LOG_ROWS.forEach(function(r,pmIdx){
        var tone=DP_TONE[r.state]||'neu';
        h+='<div class="dp-row" style="grid-template-columns:'+pmGt+';cursor:pointer" onclick="toggleDPDrill(\'logistics\','+pmIdx+')" title="View full details">';
        h+='<div>'+(r.move||'\u2014')+(r.moveSub?'<div class="sub">'+r.moveSub+'</div>':'')+'</div>';
        h+='<div>'+(r.type||'\u2014')+'</div>';
        h+='<div>'+(r.when||'\u2014')+'</div>';
        h+='<div>'+(r.gate||'\u2014')+'</div>';
        h+='<div>'+(r.src||'\u2014')+'</div>';
        var _lgDocs=r.attachments||[]; h+='<div>'+(_lgDocs.length?'<button class="btn btn-ghost btn-sm" style="font-size:11px;padding:2px 8px" onclick="event.stopPropagation();portalDpDocModal(\'logistics\','+pmIdx+')">'+_lgDocs.length+' doc'+(_lgDocs.length===1?'':'s')+'</button>':'<button class="btn btn-ghost btn-sm" style="font-size:10.5px;padding:2px 7px;color:var(--g400)" onclick="event.stopPropagation();portalDpDocModal(\'logistics\','+pmIdx+')">&#43; Add</button>')+'</div>';
        h+='<div><span class="tag '+tone+'">'+r.state+'</span></div>';
        h+='</div>';
        h+='<div id="dp-drill-logistics-'+pmIdx+'" class="otrack" style="display:none">'+buildDPTrack('logistics',r,pmIdx)+'</div>';
      });
      h+='</div>';
      h+='<div style="margin-top:24px"></div>';
    }
    mount.innerHTML=h;
  }
  function dpGv(id){ var e=document.getElementById(id); return e?(''+e.value):''; }
  function dpCodeOpts(){ var c=['0100-0100-0000-0001 \u00b7 General conditions','0200-0320-0000-0001 \u00b7 Site earthwork','3100-6200-0000-0001 \u00b7 Solar pile','26-540 \u00b7 Module Racking','2600-3300-0000-0001 \u00b7 BESS &amp; Substation','01-540 \u00b7 Temporary Power']; return c.map(function(x){return '<option>'+x+'</option>';}).join(''); }
  var _dp_pri={'Draft':0,'Pending pricing':0,'At-risk':1,'Requested':1,'Submittal':2,'In fabrication':3,'In transit':4,'PO issued':4,'Active':4,'Projected':5,'Delivered':6,'Demobilized':7};
  function renderDP(pk){
    if(pk==='profservices'&&CURRENT==='ns'){ renderProfServicesDP(); return; }
    var cfg=DP[pk], mount=document.getElementById('dp-'+pk); if(!cfg||!mount)return;
    var ns=CURRENT==='ns';
    var _dpId=(_DP_IDS[pk]&&_DP_IDS[pk].hercules)||'';
  var h='<div class="phead"><div><h1>'+cfg.title+(_dpId?' <span style="font-size:12.5px;font-weight:400;color:var(--g400);margin-left:6px">'+_dpId+'</span>':'')+'</h1><div class="meta"><span class="chip">'+svg(cfg.icon)+cfg.chip+'</span><span class="chip ver">'+(ns?'North Star':'V1 \u2014 standard')+'</span></div></div></div>';
    h+='<div class="vitals">';
    cfg.vitals.forEach(function(v){ h+='<div class="vital '+(v.tone||'ok')+'"><div class="vk">'+svg(v.icon||IC.check)+v.label+'</div><div class="vv">'+v.value+'</div><div class="vsub">'+(v.sub||'')+'</div></div>'; });
    h+='</div>';
    if(ns&&cfg.ns){ h+='<div class="ins-strip"><span class="isi"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6 4.5 2.3 7.1L12 16.9 5.3 21l2.3-7.1-6-4.5h7.6z"/></svg></span><div><div class="ist">02S</div><div class="isd">'+cfg.ns+'</div></div></div>'; }
    else if(!ns&&cfg.v1){ h+='<div class="ins-strip"><span class="isi">'+svg('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',0)+'</span><div><div class="ist">Plan summary</div><div class="isd">'+cfg.v1+'</div></div></div>'; }
    var _baselined=PLAN_BASELINES[pk];
    h+='<div class="eq-toolbar"><span class="spacer"></span><button class="btn btn-dark btn-sm" onclick="openDPAdd(\''+pk+'\')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>Add demand line</button><button class="btn btn-red btn-sm" onclick="dpSubmit(\''+pk+'\')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>Submit to 02S</button><button class="btn btn-ghost btn-sm" onclick="openBaselineModal(\''+pk+'\',\''+cfg.title+' demand plan\')" title="'+(_baselined?'Baselined: '+_baselined:'Approve as the version of record for forecasting')+'">'+svg('<path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/>',2)+(_baselined?'Baselined':'Approve baseline')+'</button><button class="btn btn-ghost btn-sm" onclick="go(\'billing\')" title="View orders, actuals, budget &amp; forecast">'+svg('<path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>',2)+' Financials</button></div>';
    h+='<div class="eq-cap">'+svg('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>')+'<span>'+cfg.cap+'</span></div>';
    var gt=cfg.cols.map(function(c){return c.w;}).join(' ');
    h+='<div class="dp-tbl"><div class="dp-head" style="grid-template-columns:'+gt+'">';
    cfg.cols.forEach(function(c){ h+='<span class="'+(c.cls||'')+'">'+c.label+'</span>'; });
    h+='</div>';
    var _srows=cfg.rows.slice().sort(function(a,b){var ap=(_dp_pri[a.state]!=null?_dp_pri[a.state]:3),bp=(_dp_pri[b.state]!=null?_dp_pri[b.state]:3);return ap-bp;});
    _srows.forEach(function(r){
      var origIdx=cfg.rows.indexOf(r);
      h+='<div class="dp-row" style="grid-template-columns:'+gt+';cursor:pointer" onclick="toggleDPDrill(\''+pk+'\','+origIdx+')" title="View full details">';
      cfg.cols.forEach(function(c){
        if(c.key==='__docs'){ var _docs=r.attachments||[]; h+='<div>'+(_docs.length?'<button class="btn btn-ghost btn-sm" style="font-size:11px;padding:2px 8px" onclick="event.stopPropagation();portalDpDocModal(\''+pk+'\','+origIdx+')">'+_docs.length+' doc'+(_docs.length===1?'':'s')+'</button>':'<button class="btn btn-ghost btn-sm" style="font-size:10.5px;padding:2px 7px;color:var(--g400)" onclick="event.stopPropagation();portalDpDocModal(\''+pk+'\','+origIdx+')">&#43; Add</button>')+'</div>'; }
        else if(c.key==='__state'){ var t=DP_TONE[r.state]||'neu'; h+='<div class="'+(c.cls||'')+'"><span class="tag '+t+'">'+r.state+'</span></div>'; }
        else { var main=(r[c.key]!=null&&r[c.key]!=='')?r[c.key]:'\u2014'; var sub=(c.sub&&r[c.sub])?'<div class="sub">'+r[c.sub]+'</div>':''; var cls=(c.cls||'')+((c.flag&&r[c.flag])?' dp-risk':''); h+='<div class="'+cls+'">'+main+sub+'</div>'; }
      });
      h+='</div>';
      h+='<div id="dp-drill-'+pk+'-'+origIdx+'" class="otrack" style="display:none">'+buildDPTrack(pk,r,origIdx)+'</div>';
    });
    h+='</div>';
    if(pk==='prefab'){var _pq=cfg.rows.filter(function(r){return r.cost==='Pending';}).length;if(_pq){h+='<div class="eqf-rate pending" style="margin-top:14px">'+svg('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',2)+'<span><b>'+_pq+' '+(    _pq===1?'assembly':'assemblies')+' being priced by 02S</b> — quotes confirmed before fabrication begins.</span></div>';}}
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
    cfg.rows.push(row); closeModal(); if(pk==='logistics'){renderLogPlan();}else{renderDP(pk);}
    toast('Demand line added \u2014 pricing request routed to 02S admin');
  }
  function dpSubmit(pk){ var cfg=DP[pk],n=0; cfg.rows.forEach(function(r){ if(r.state==='Draft'){ r.state='Requested'; n++; } }); if(!n){ var p=0; cfg.rows.forEach(function(r){if(r.state==='Pending pricing')p++;}); toast(p?(p+' line'+(p===1?'':'s')+' still awaiting 02S pricing \u2014 can\u2019t submit until priced'):'No draft lines to submit'); return; } renderDP(pk); toast(n+' line'+(n===1?'':'s')+' submitted to 02S'); }
function renderProfServicesDP(){
    var pk='profservices'; var cfg=DP[pk]; var mount=document.getElementById('dp-'+pk); if(!cfg||!mount)return;
    var ns=CURRENT==='ns';
    var LSPARK='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6 4.5 2.3 7.1L12 16.9 5.3 21l2.3-7.1-6-4.5h7.6z"/></svg>';
    var _dpId=(_DP_IDS[pk]&&_DP_IDS[pk].hercules)||'';
    var h='<div class="phead"><div><h1>'+cfg.title+(_dpId?' <span style="font-size:12.5px;font-weight:400;color:var(--g400);margin-left:6px">'+_dpId+'</span>':'')+'</h1><div class="meta"><span class="chip">'+svg(cfg.icon)+cfg.chip+'</span><span class="chip ver">'+(ns?'North Star':'V1 — standard')+'</span></div></div></div>';
    h+='<div class="vitals">'; cfg.vitals.forEach(function(v){ h+='<div class="vital '+(v.tone||'ok')+'"><div class="vk">'+svg(v.icon||IC.check)+v.label+'</div><div class="vv">'+v.value+'</div><div class="vsub">'+(v.sub||'')+'</div></div>'; }); h+='</div>';
    if(ns&&cfg.ns){ h+='<div class="ins-strip"><span class="isi">'+LSPARK+'</span><div><div class="ist">02S</div><div class="isd">'+cfg.ns+'</div></div></div>'; }
    else if(!ns&&cfg.v1){ h+='<div class="ins-strip"><span class="isi">'+svg('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',0)+'</span><div><div class="ist">Plan summary</div><div class="isd">'+cfg.v1+'</div></div></div>'; }
    var _baselined=PLAN_BASELINES[pk];
    h+='<div class="eq-toolbar"><span class="spacer"></span><button class="btn btn-dark btn-sm" onclick="openDPAdd(\''+pk+'\')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>Add demand line</button><button class="btn btn-red btn-sm" onclick="dpSubmit(\''+pk+'\')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>Submit to 02S</button><button class="btn btn-ghost btn-sm" onclick="openBaselineModal(\''+pk+'\',\''+cfg.title+' demand plan\')" title="'+(_baselined?'Baselined: '+_baselined:'Approve as the version of record for forecasting')+'">'+svg('<path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/>',2)+(_baselined?'Baselined':'Approve baseline')+'</button><button class="btn btn-ghost btn-sm" onclick="go(\'billing\')" title="View orders, actuals, budget &amp; forecast">'+svg('<path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>',2)+' Financials</button></div>';
    h+='<div class="eq-cap">'+svg('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>')+'<span>'+cfg.cap+'</span></div>';
    if(ns){
      var LGM=['Apr 26','May 26','Jun 26','Jul 26','Aug 26','Sep 26','Oct 26','Nov 26','Dec 26','Jan 27'];
      var N=LGM.length, todayIdx=3;
      var todayPct=((todayIdx+0.8)/N)*100;
      var mh=''; for(var mi=0;mi<N;mi++){ mh+='<div class="gh-m">'+LGM[mi]+'</div>'; }
      var gridBg='repeating-linear-gradient(to right, transparent 0, transparent calc('+(100/N)+'% - 1px), var(--g150) calc('+(100/N)+'% - 1px), var(--g150) calc('+(100/N)+'%))';
      var stateBar={Active:'onrent',Projected:'submitted','Pending pricing':'draft',Draft:'draft',Demobilized:'offrent'};
      h+='<div class="gantt log-gantt"><div class="g-head"><div class="gh-label">Role / firm</div><div class="gh-months">'+mh+'</div></div><div class="g-body">';
      h+='<div class="g-today" style="left:calc(220px + (100% - 220px) * '+(todayPct/100).toFixed(4)+')"><span class="gt-lbl">Today</span></div>';
      cfg.rows.forEach(function(r){
        if(typeof r.sa==='undefined') return;
        var a=r.sa, b=r.ea;
        var left=(a/N)*100, width=((b-a+1)/N)*100;
        var barCls=stateBar[r.state]||'draft';
        h+='<div class="grow" style="min-height:46px">'+'<div class="g-label" style="flex-direction:column;align-items:flex-start;gap:1px;white-space:normal;overflow:visible">'+'<span style="line-height:1.3">'+r.role+'</span>'+'<span style="font-size:10.5px;font-weight:400;color:var(--g400);line-height:1.2">'+r.firm+'</span></div>'
          +'<div class="g-track" style="background-image:'+gridBg+'">'
          +'<div class="g-bar '+barCls+' vw" style="left:'+left.toFixed(3)+'%;width:calc('+width.toFixed(3)+'% - 3px)" title="'+r.window+' · '+r.qty+'">'+r.qty+'</div>'
          +'</div></div>';
      });
      h+='</div>';
      h+='<div class="g-legend"><span class="lg"><span class="gl-sw onrent"></span>Active</span><span class="lg"><span class="gl-sw submitted"></span>Projected</span><span class="lg"><span class="gl-sw draft"></span>Draft / pending</span><span class="lg"><span class="gl-sw offrent"></span>Demobilized</span><span class="lg"><span class="gl-today"></span>Today · Jul 26</span></div>';
      h+='</div>';
    } else {
      var PS_SCOPE_DESCS={'Survey & site monitoring':'Field measurements, geotechnical data, and environmental compliance across active site phases.','Engineering & oversight':'Engineering support, construction management oversight, and VDC coordination.','BESS & commissioning':'Third-party commissioning and technical oversight for BESS, electrical, and MEP systems.'};
      var scopes=[],scopeMap={};
      cfg.rows.forEach(function(r){ var sc=r.scope||'Other'; if(!scopeMap[sc]){scopeMap[sc]=[];scopes.push(sc);} scopeMap[sc].push(r); });
      var gt='1fr 92px 176px 150px 100px 118px';
      h+='<div class="dp-tbl">';
      h+='<div class="dp-head" style="grid-template-columns:'+gt+'"><span>Role</span><span class="c">HC</span><span>Window</span><span>Cost code</span><span class="r">Monthly</span><span>Status</span></div>';
      scopes.forEach(function(sc){
        h+='<div class="dp-row" style="grid-template-columns:'+gt+';background:var(--g50);padding:5px 10px;border-top:1px solid var(--g200)"><div style="grid-column:1/-1"><span class="dp-sec-t" style="font-size:12px">'+sc+'</span>'+(PS_SCOPE_DESCS[sc]?'<div class="sub" style="font-weight:400;margin-top:1px;font-size:11px">'+PS_SCOPE_DESCS[sc]+'</div>':'')+'</div></div>';
        scopeMap[sc].forEach(function(r){
          var t=DP_TONE[r.state]||'neu';
          var ri=cfg.rows.indexOf(r);
          h+='<div class="dp-row" style="grid-template-columns:'+gt+';cursor:pointer" onclick="toggleDPDrill(\'profservices\','+ri+')" title="View full details"><div>'+r.role+'<div class="sub">'+r.firm+'</div></div><div class="c">'+r.qty+'</div><div>'+r.window+'</div><div class="sub">'+r.code+'</div><div class="r">'+r.cost+'</div><div><span class="tag '+t+'">'+r.state+'</span></div></div>';
          h+='<div id="dp-drill-profservices-'+ri+'" class="otrack" style="display:none">'+buildDPTrack('profservices',r,ri)+'</div>';
        });
      });
      h+='</div>';
    }
    mount.innerHTML=h;
  }
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
    if(screen.indexOf('dp-')===0){ dpActive=screen.slice(3); if(dpActive==='logistics'){renderLogPlan();}else{renderDP(dpActive);} } else dpActive=null;
    if(screen==='order'){ backToCatalog(); renderPills(); renderCatalog(); renderCart(); }
    if(screen==='orders'){ _ordersShowAll=false; renderOrders(); renderOrdInsights(); }
    if(screen==='billing'){ _billsShowAll=false; renderBudget(); renderBills(); renderPending(); renderBillInsights(); renderCostCodes(); }
    if(screen==='equip') eqRefresh();
    if(screen==='profile'){ renderTeam(); renderEscalation(); renderProfileInsights(); renderApprovers(); renderShipTo(); }
    if(screen==='dashboard'){ renderPlanRing(); syncRecert(); renderFleetDemand(); renderAllActivity(); renderGMDashKPI(); renderLookahead(); renderPortalQuotesWidget(); renderNSDashKPIs(); renderTasksDueWidget(); renderGlance(); }
    window.scrollTo(0,0);
  }

  /* ═══════════ VERSION TOGGLE ═══════════ */
  function setVer(v){
    if(!document.getElementById('ns-toggle-css')){var _s=document.createElement('style');_s.id='ns-toggle-css';_s.textContent="body:not([data-ver='ns']) .ns-only{display:none!important}";document.head.appendChild(_s);}
    var ns=v==='ns'; CURRENT=v; document.body.setAttribute('data-ver',v);
    var _e; function _tog(id,cls,val){_e=typeof id==='string'?document.getElementById(id):id;if(_e)_e.classList.toggle(cls,val);}
    _tog('btnV1','on',!ns); _tog('btnNS','on',ns);
    _tog('vitalsV1','hide',ns); _tog('vitalsNS','hide',!ns);
    _tog('attnV1','hide',ns); _tog('attnNS','hide',!ns);
    _tog('sec4','hide',!ns);
    _tog(document.querySelector('.lookV1'),'hide',ns);
    _tog(document.querySelector('.lookNS'),'hide',!ns);
    document.getElementById('verChip').innerHTML = ns?'North Star &mdash; vision':'V1 &mdash; standard';
    ['sec1','sec2','sec3','sec4'].forEach(function(s){document.getElementById(s).classList.remove('open')});
    // browse: copilot is NS-only; refresh an open interstitial for the new version
    _tog('copilotWrap','hide',!ns);
    var _uds=document.getElementById('understood');
    if(_uds && !_uds.classList.contains('hide') && document.getElementById('screen-order').classList.contains('active') && document.getElementById('askInput').value.trim()){ ask02S(); }
    if(ns) renderCopilot();
    _e=document.getElementById('verChipOrder'); if(_e)_e.innerHTML=ns?'North Star &mdash; vision':'V1 &mdash; standard';
    var vco2=document.getElementById('verChipOrders'); if(vco2) vco2.innerHTML = ns?'North Star &mdash; vision':'V1 &mdash; standard';
    // billing & budget
    var vcb=document.getElementById('verChipBilling'); if(vcb) vcb.innerHTML = ns?'North Star &mdash; vision':'V1 &mdash; standard';
    var psub=document.getElementById('pendSub'); if(psub) psub.textContent = ns?'ranked by risk · 02S flags anomalies before you approve':'act before the 10-day window closes';
    var vcp=document.getElementById('verChipProfile'); if(vcp) vcp.innerHTML = ns?'North Star &mdash; vision':'V1 &mdash; standard';
    var vcc=document.getElementById('verChipContact'); if(vcc) vcc.innerHTML = ns?'North Star &mdash; vision':'V1 &mdash; standard';
    renderCart();
    renderPills(); renderCatalog();
    var _bfEl=document.getElementById('billFrom'); if(_bfEl)_bfEl.value='';
    var _btEl=document.getElementById('billTo'); if(_btEl)_btEl.value='';
    renderOrders(); renderBills(); renderOrdInsights();
    renderPending(); renderBillInsights();
    renderBudget(); renderGMDashKPI(); renderNSMilestones(); renderGlance();
    renderTeam(); renderEscalation(); renderProfileInsights();
    var cv1=document.getElementById('composeV1'); if(cv1) cv1.classList.toggle('hide',ns);
    var cns=document.getElementById('composeNS'); if(cns) cns.classList.toggle('hide',!ns);
    var vce=document.getElementById('verChipEquip'); if(vce) vce.innerHTML = ns?'North Star &mdash; vision':'V1 &mdash; standard';
    if(document.getElementById('eqBudget')){ renderEqBudget(); renderEqInsights(); setEqView(eqState.view); renderEqHistory(); updateEqSubmitBtn(); }
    if(dpActive){if(dpActive==='logistics'){renderLogPlan();}else{renderDP(dpActive);}}
    renderTickets(); renderContactInsights(); if(!ns){ var ar=document.getElementById('askRoute'); if(ar) ar.classList.add('hide'); }
    var _ccv=document.getElementById('ccApp');
    if(_ccv&&_ccv.style.display!=='none'){
      renderCcScreen(ccActive||'ccdash'); ccSyncToggle();
    } else { ccSyncToggle(); }
  }
  function renderCopilot(){
    document.getElementById('copilot').innerHTML =
      '<div class="cop hero"><span class="copi">'+svg('<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',2)+'</span><div class="copbody"><div class="copt">Structural steel starts in 3 weeks</div><div class="copd">Your plan needs a <b>40T crane</b>, a <b>telehandler</b>, and <b>temp power</b>. I\'ve pre-built the request — review dates and add.</div><div class="copact"><button class="btn btn-red btn-sm" onclick="openDetail(\'crane40\',\'plan\')">Review pre-built request</button></div></div></div>'+
      '<div class="cop"><span class="copi">'+svg('<path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4"/>',2)+'</span><div class="copbody"><div class="copt">Bundle what jobs like this need</div><div class="copd">Crane orders on similar steel packages also add <b>rigging</b>. Add it to keep pillars in sync?</div><div class="copact"><button class="btn btn-dark btn-sm" onclick="openDetail(\'rigging\',\'plan\')">Add rigging</button></div></div></div>';
  }

  /* ═══════════ INIT ═══════════ */
  /* ═══════════ ORDERS SCREEN ═══════════ */
  var STAGES_EQ=['Requested','Acknowledged','In fulfillment','Delivered','On-Rent','Off-Rent'];
  var STAGES_OTHER=['Requested','Acknowledged','Fulfilled'];
  var STAGES_LOG=['Scheduled','In transit','Delivered'];
  var STAGES_PROC=['PO issued','Ordered','Delivered'];
  var STAGES_FAB=['In fabrication','QC approved','Delivered'];
  var STAGES_SVC=['SOW executed','Active','Demobilized'];
  function _stageArr(o){if(o.pillar==='equipment')return STAGES_EQ;if(o.pillar==='logistics')return STAGES_LOG;if(o.pillar==='procurement')return STAGES_PROC;if(o.pillar==='prefab')return STAGES_FAB;if(o.pillar==='profservices')return STAGES_SVC;return STAGES_OTHER;}
  var STATUS_TAG={'Requested':'neu','Acknowledged':'neu','In fulfillment':'info','Delivered':'info','On-Rent':'ok','Off-Rent':'neu','Fulfilled':'ok','Pending':'warn','Approved':'ok','Finalized':'neu','Disputed':'bad'};

  var ORDERS=[
    {id:'ORD-3051',proj:'hercules',od:'2026-05-20',item:'\u00be-Ton Crew Truck',sub:'2 units \u00b7 civil support',pillar:'equipment',dates:'May 20 \u2013 ongoing',cost:'01-540 \u00b7 General conditions',stage:4,plan:'EQ-002',qty:2,onRentSince:'May 20',mrate:2400,recert:'pending',recertDue:'Jul 21\u201325',note:'Civil support \u2014 active daily use by site crew',nsReco:{rec:'keep',why:'Daily fuel logs show active use'},latest:'On rent \u2014 active use by site crew',latestTone:'ok',rental:{offRent:'Oct 31, 2026',daysLeft:101,idle:false,save:0}},
    {id:'ORD-3054',proj:'hercules',od:'2026-08-03',item:'Tower Crane \u2014 self-erect',sub:'1 unit \u00b7 structure phase',pillar:'equipment',dates:'Aug 3 \u2013 Sep 30',cost:'26-330 \u00b7 BESS & Substation',stage:4,plan:'EQ-106',qty:1,onRentSince:'Aug 3',mrate:24000,recert:'pending',anticipatedOff:'2026-09-30',note:'Structure phase \u2014 critical path through Sep',nsReco:{rec:'keep',why:'On the critical path; required through Sep per schedule'},latest:'On rent \u2014 structure phase, critical path',latestTone:'ok',rental:{offRent:'Sep 30, 2026',daysLeft:72,idle:false,save:0}},
    {id:'ORD-3042',proj:'riverside',od:'2026-05-12',item:'Excavator — 20T',sub:'1 unit · operator',pillar:'equipment',dates:'May 12 – Jun 6',cost:'03 · Concrete',stage:6,plan:'EQ-085',rental:{offRent:'Jun 6, 2026',daysLeft:0,idle:false,save:0},
      latest:'Off-rent — returned Jun 6, 2026. Final bill issued and finalized.',latestTone:'ok',
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
    {id:'ORD-3038',proj:'riverside',od:'2026-08-04',item:'Hydraulic Crane — 40T',sub:'1 unit · Aug hold',pillar:'equipment',dates:'Aug 4 – Aug 29',cost:'05 · Metals',stage:1,plan:'EQ-114',latest:'Allocated — rate confirmed, mobilization holds for August'},
    {id:'ORD-3031',proj:'riverside',od:'2026-05-01',item:'Scissor Lift — 32 ft',sub:'2 units',pillar:'equipment',dates:'May 1 – May 15',cost:'09 · Finishes',stage:4,plan:'EQ-091',anticipatedOff:'2026-05-15',qty:2,onRentSince:'May 1',mrate:3800,recert:'pending',note:'MEP rough-in at L2 \u2014 both units idle',nsReco:{rec:'return',why:'No badge-ins at L2 for 9 days \u00b7 BILL-9012 flagged idle-day overage \u00b7 MEP rough-in complete per CPM',save:3800},
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
    {id:'ORD-3029',proj:'hercules',od:'2026-04-01',anticipatedOff:'2026-12-31',item:'Telehandler 10K (Sector 1)',sub:'16 units',pillar:'equipment',dates:'Apr – Dec 2026',cost:'0100-0100-0000-0001 · General conditions',stage:5,plan:'EQ-118',
      latest:'On-rent — 16 units active, Sector 1 module installation phase',
      recv:{status:'completed',window:'Apr 1–3, 2026 · phased delivery',windowType:'Multi-unit phased delivery',carrier:'McCarthy Logistics (internal)',dispatch:'(555) 482-7700',coordinator:'Marcus Webb',coordPhone:'(555) 482-3190',vehicle:'Multiple flatbeds. 16 × Telehandler 10K, Sector 1. Staged across 3 delivery windows.',
        checklist:[
          {t:'Staging area near steel laydown designated',due:'Mar 31',done:true},
          {t:'Operators on site to accept and inspect units',due:'Apr 1',done:true},
          {t:'Delivery receipts signed by superintendent',due:'Apr 3',done:true}
        ],
        note:'16 × Telehandler 10K delivered in 3 drops Apr 1–3. Pre-delivery inspections complete on all units. All 16 cleared for operation.',
        docs:['Equipment inspection checklist (PDF)','Operating manual (PDF)']}},
    {id:'ORD-3020',proj:'riverside',od:'2026-05-13',item:'Rigging & lift hardware',sub:'lot',pillar:'procurement',dates:'one-time',cost:'05 · Metals',stage:2,plan:null,latest:'Order acknowledged — fulfillment in progress'},
    {id:'ORD-3014',proj:'riverside',od:'2026-04-28',item:'L2 Headwall Assembly',sub:'per submittal',pillar:'prefab',dates:'one-time',cost:'03 · Concrete',stage:1,plan:'PF-021',latest:'Submittal under review with prefab'},
    {id:'ORD-3009',proj:'hercules',od:'2026-04-18',item:'Site survey crew',sub:'2 days',pillar:'profservices',dates:'Apr 18 – Apr 19',cost:'01 · General',stage:2,plan:null,latest:'Crew scheduled — 2-day survey window'},
    {id:'ORD-2998',proj:'hercules',od:'2026-04-05',item:'SUV AWD',sub:'1 unit',pillar:'equipment',dates:'Apr 5 – May 18',cost:'01 · General',stage:5,plan:null,latest:'Off-rent — returned Apr 30'},
    {id:'ORD-3060',proj:'riverside',od:'2026-05-08',item:'MEP Pipe Rack Module',sub:'3 modules · Level 2–4',pillar:'prefab',dates:'one-time · deliver Jun 3',cost:'22 · Plumbing',stage:2,plan:'PF-021',latest:'Shop drawings approved — fabrication started'},
    {id:'ORD-3061',proj:'hercules',od:'2026-05-15',item:'Modular Restroom Pod',sub:'1 unit · worker welfare',pillar:'prefab',dates:'one-time · deliver Jun 20',cost:'01 · General',stage:1,plan:null,latest:'Submittal submitted — awaiting prefab team review'},
    {id:'ORD-3070',proj:'riverside',od:'2026-05-18',item:'Heavy haul transport — excavator',sub:'1 load · lowboy',pillar:'logistics',dates:'May 20 · one-time',cost:'03 · Concrete',stage:4,plan:null,latest:'Delivery confirmed — excavator on site May 20'},
    {id:'ORD-3071',proj:'hercules',od:'2026-08-01',item:'Tower crane mobilization haul',sub:'1 move · permitted route',pillar:'logistics',dates:'Aug 3 · one-time',cost:'26-330 · BESS & Substation',stage:2,plan:null,latest:'Permits confirmed — crane mobilization window Aug 3, 5 AM · North gate. Haul carrier confirmed.',attachments:[{type:'Safety',name:'JHA — crane mobilization Aug 2026',ref:'JHA-3071-001',status:'Approved'},{type:'Safety',name:'Loading & unloading plan — crane haul',ref:'LULP-3071-01',status:'Approved'},{type:'Crew Design',name:'Lift drawings — tower crane self-erect',ref:'LD-3071-001',status:'Approved'},{type:'Crew Design',name:'Rigging plan — Aug 3 mobilization',ref:'RIG-3071-001',status:'Approved'},{type:'Shipping',name:'Bill of lading — ORD-3071',ref:'BOL-3071-01',status:'Available'},{type:'Shipping',name:'DOT oversize load permit — Route A7',ref:'DOT-3071-01',status:'Approved'}]},
    {id:'ORD-3072',proj:'hercules',od:'2026-06-10',item:'Material staging & drayage',sub:'ongoing · laydown A',pillar:'logistics',dates:'Jun 10 – Sep 30',cost:'01 · General',stage:3,plan:null,latest:'Staging operations active at laydown A'},
    {id:'ORD-3080',proj:'hercules',od:'2026-05-01',item:'PPE kit — crew of 20',sub:'hard hats, vests, gloves',pillar:'procurement',dates:'one-time',cost:'01 · General',stage:4,plan:null,latest:'Delivered and distributed to crew'},
    {id:'ORD-3081',proj:'riverside',od:'2026-05-10',item:'Concrete form hardware — lot',sub:'snap ties, wedge bolts',pillar:'procurement',dates:'one-time',cost:'03 · Concrete',stage:3,plan:null,latest:'Order acknowledged — fulfillment in progress'},
    {id:'ORD-3082',proj:'hercules',od:'2026-06-01',item:'Temporary fencing & gates',sub:'400 LF + 2 gates',pillar:'procurement',dates:'Jun 1 – project close',cost:'01 · General',stage:2,plan:null,latest:'Fabrication quote received — awaiting PO approval'},
    {id:'ORD-3090',proj:'riverside',od:'2026-04-25',anticipatedOff:'2026-12-31',item:'Special inspections — concrete',sub:'IBC §1705 · 3rd party',pillar:'profservices',dates:'ongoing',cost:'03 · Concrete',stage:4,plan:null,latest:'Inspector on site as scheduled — reports filed weekly'},
    {id:'ORD-3091',proj:'hercules',od:'2026-06-01',item:'Structural special inspection',sub:'Terracon · 2 FTE',pillar:'profservices',dates:'Jun 2026 – Feb 2027',cost:'0200-0320-0000-0001 · Site earthwork',stage:3,plan:null,latest:'Active — onsite inspections ongoing through Feb 2027',attachments:[{type:'Engineering',name:'Special inspection program — IBC §1705',ref:'SIP-3091-001',status:'Approved'},{type:'Quality',name:'Special inspection reports — Jun 2026',ref:'SIR-3091-006',status:'Available'},{type:'Quality',name:'Storage & handling requirements',ref:'SHR-3091-001',status:'Available'},{type:'Safety',name:'Site safety plan — Terracon crew',ref:'SSP-3091-001',status:'Approved'}]},
    {id:'ORD-3092',proj:'hercules',od:'2026-06-15',item:'Environmental monitoring',sub:'dust, noise, stormwater',pillar:'profservices',dates:'Jun – Nov 2026',cost:'01 · General',stage:2,plan:null,latest:'Baseline readings established — monitoring ongoing'},
    {id:'ORD-3095',proj:'hercules',od:'2026-03-01',item:"Owner's engineer / IE support",sub:'DNV \u00b7 2 FTE',pillar:'profservices',dates:'Mar \u2013 Dec 2026',cost:'0100-0100-0000-0001 \u00b7 General conditions',stage:3,plan:null,latest:'Monthly progress report submitted \u2014 Jun 2026. On track per CPM schedule.'},
    {id:'ORD-3096',proj:'hercules',od:'2026-03-05',item:'Geotechnical monitoring',sub:'Terracon \u00b7 3 FTE',pillar:'profservices',dates:'Mar \u2013 Aug 2026',cost:'0200-0320-0000-0001 \u00b7 Site earthwork',stage:3,plan:null,latest:'Monitoring ongoing \u2014 no deviations. Jul billing submitted.'},
    {id:'ORD-3100',proj:'hercules',od:'2026-06-01',item:'Nut runners \u2014 3/8\" cordless',sub:'48 units \u00b7 solar racking',pillar:'procurement',dates:'Jul 2026',cost:'3100-6200-0000-0001 \u00b7 Solar pile',stage:4,plan:null,latest:'Delivered \u2014 48 nut runners on-site. Solar racking crews active.'},
    {id:'ORD-3101',proj:'hercules',od:'2026-06-15',item:'Battery packs \u2014 20v M18',sub:'100 units \u00b7 site cordless fleet',pillar:'procurement',dates:'Jul 1, 2026',cost:'0100-0100-0000-0001 \u00b7 General conditions',stage:4,plan:null,latest:'Delivered Jun 30 \u2014 distributed to crews. Receiving inspection complete.'},
    {id:'ORD-3102',proj:'hercules',od:'2026-06-10',item:'Quad charging banks \u2014 12-bay',sub:'20 units \u00b7 site-wide tool charging',pillar:'procurement',dates:'Jul 1, 2026',cost:'0100-0100-0000-0001 \u00b7 General conditions',stage:4,plan:null,latest:'Installed at tool cribs Jul 1. All stations operational.'},
    {id:'ORD-3103',proj:'hercules',od:'2026-07-18',item:'Tone shear wrenches TS60/TS90',sub:'12 units \u00b7 structural bolt tensioning',pillar:'procurement',dates:'Aug 15, 2026',cost:'3100-6200-0000-0001 \u00b7 Solar pile',stage:4,plan:null,latest:'Delivered \u2014 12 tone shear wrenches received Aug 15. Bolt tensioning crews active.'},
    {id:'ORD-3104',proj:'hercules',od:'2026-06-15',item:'Angle grinders \u2014 cordless 20v',sub:'16 units \u00b7 metalwork & weld prep',pillar:'procurement',dates:'Aug 1, 2026',cost:'0100-0100-0000-0001 \u00b7 General conditions',stage:4,plan:null,latest:'Delivered Jul 30 \u2014 received and logged at tool crib.'},
    {id:'ORD-3105',proj:'hercules',od:'2026-07-15',item:'HEPA vacuums \u2014 10 gal cordless',sub:'6 units \u00b7 silica dust control OSHA Table 1',pillar:'procurement',dates:'Aug 5, 2026',cost:'0100-0100-0000-0001 \u00b7 General conditions',stage:3,plan:null,latest:'PO issued Jul 15 \u2014 delivery expected Aug 5. Expedited per OSHA compliance.'},
    {id:'ORD-3106',proj:'hercules',od:'2026-06-01',item:'L2 headwall assemblies',sub:'8 units \u00b7 fabricated & delivered',pillar:'prefab',dates:'Jul 20, 2026',cost:'2600-0540-0000-0001 \u00b7 Module install',stage:4,plan:null,latest:'Delivered Jul 18 \u2014 receiving inspection complete. Installed in field.',recv:{status:'completed',window:'Jul 18',carrier:'02S Prefab Shop A',checklist:[{t:'Confirm delivery window with 02S shop',due:'Jul 17',done:true},{t:'Receiving inspection \u2014 dimensions and finish',due:'Jul 18',done:true},{t:'Sign off delivery receipt',due:'Jul 18',done:true}],docs:['Shop drawings (PDF)','Receiving inspection checklist (PDF)']},attachments:[{type:'Engineering',name:'Pick plan — L2 headwall assemblies',ref:'PKP-3106-001',status:'Approved'},{type:'Engineering',name:'Rigging plan — L2 headwall install',ref:'RIG-3106-001',status:'Approved'},{type:'Safety',name:'JHA — headwall delivery & installation',ref:'JHA-3106-001',status:'Approved'},{type:'Quality',name:'Material receiving report — Ironclad Mfg',ref:'MRR-3106-001',status:'Available'},{type:'Quality',name:'Daily visual inspection log — Jun 2026',ref:'DVI-3106-001',status:'Available'},{type:'Turnover',name:'Certificate of proper installation (COPI)',ref:'COPI-3106-001',status:'Approved'}]},
    {id:'ORD-3107',proj:'hercules',od:'2026-07-01',item:'Modular e-houses (BESS)',sub:'2 units \u00b7 custom fabrication',pillar:'prefab',dates:'Nov 2026',cost:'2600-3300-0000-0001 \u00b7 BESS & Substation',stage:1,plan:null,latest:'Submittal under engineering review \u2014 approval expected Aug 2026.'},
    {id:'ORD-3108',proj:'hercules',od:'2026-05-01',item:'Prefab pipe rack modules',sub:'12 modules \u00b7 shop-fabricated',pillar:'prefab',dates:'Aug 2026',cost:'2600-0540-0000-0001 \u00b7 Module install',stage:2,plan:null,latest:'In fabrication \u2014 shop drawings approved, 4 of 12 modules complete. Delivery Aug 2026.',attachments:[{type:'Submittals',name:'Fabrication shop drawings \u2014 Piperite Fab',ref:'SUB-3108-001',status:'In review'},{type:'Submittals',name:'Material certifications \u2014 steel & coatings',ref:'SUB-3108-002',status:'Pending'},{type:'Engineering',name:'Rigging plan \u2014 pipe rack module lifts',ref:'RIG-3108-001',status:'Draft'},{type:'Quality',name:'QA\/QC inspection checklist \u2014 Piperite',ref:'QA-3108-001',status:'Available'},{type:'Safety',name:'JHA \u2014 module delivery & rigging',ref:'JHA-3108-001',status:'Draft'}]},
    {id:'ORD-3109',proj:'hercules',od:'2026-07-10',item:'Skid-mounted pump assemblies',sub:'4 units \u00b7 in fabrication',pillar:'prefab',dates:'Sep 1, 2026',cost:'0200-0320-0000-0001 \u00b7 Site earthwork',stage:2,plan:null,latest:'In fabrication \u2014 shop drawings approved Jul 5. Delivery on track for Sep 1.'},
    {id:'ORD-3093',proj:'hercules',od:'2026-06-01',anticipatedOff:'2026-10-31',item:'Hydraulic pile driver',sub:'4 units \u00b7 Sector 1 pile driving',pillar:'equipment',dates:'Jun 2026 \u2013 Oct 2026',cost:'3100-6300-0000-0001 \u00b7 Solar pile',stage:5,plan:null,latest:'On-rent \u2014 Sector 1 pile driving on schedule. 68% complete.',rental:{type:'monthly',rate:34500,unit:'unit',units:4}},
    {id:'ORD-3110',proj:'hercules',od:'2026-03-01',anticipatedOff:'2027-05-31',item:'Generator \u2014 125 kW',sub:'16 units \u00b7 site power',pillar:'equipment',dates:'Mar 2026 \u2013 May 2027',cost:'0100-5000-0000-0001 \u00b7 Power & Temp',stage:5,plan:null,latest:'On-rent \u2014 monthly meter readings submitted. No issues.',rental:{type:'monthly',rate:4200,unit:'unit',units:16}},
    {id:'ORD-3111',proj:'hercules',od:'2026-03-01',anticipatedOff:'2027-05-31',item:'Light towers',sub:'26 units \u00b7 site lighting',pillar:'equipment',dates:'Mar 2026 \u2013 May 2027',cost:'0100-5000-0000-0001 \u00b7 Power & Temp',stage:5,plan:null,latest:'On-rent \u2014 all towers operational.',rental:{type:'monthly',rate:1200,unit:'unit',units:26}},
    {id:'ORD-3112',proj:'hercules',od:'2026-03-01',anticipatedOff:'2026-09-30',item:'Dozer \u2014 D6',sub:'12 units \u00b7 mass grading',pillar:'equipment',dates:'Mar 2026 \u2013 Sep 2026',cost:'3100-2000-0000-0001 \u00b7 Mass Grading',stage:5,plan:null,latest:'On-rent \u2014 grading 92% complete.',rental:{type:'monthly',rate:16200,unit:'unit',units:12}},
    {id:'ORD-3113',proj:'hercules',od:'2026-04-01',item:'Motor grader',sub:'6 units \u00b7 finish grading',pillar:'equipment',dates:'Apr 2026 \u2013 Aug 2026',cost:'3100-2000-0000-0001 \u00b7 Mass Grading',stage:6,plan:null,latest:'Off-rent \u2014 returned Aug 5. Final inspection passed.',rental:{type:'monthly',rate:14000,unit:'unit',units:6}},
    {id:'ORD-3114',proj:'hercules',od:'2026-04-01',anticipatedOff:'2026-10-31',item:'Compaction roller',sub:'12 units \u00b7 compaction',pillar:'equipment',dates:'Apr 2026 \u2013 Oct 2026',cost:'3100-2000-0000-0001 \u00b7 Mass Grading',stage:5,plan:null,latest:'On-rent \u2014 compaction testing in progress.',rental:{type:'monthly',rate:6800,unit:'unit',units:12}},
    {id:'ORD-3115',proj:'hercules',od:'2026-08-01',anticipatedOff:'2026-12-31',item:'Hydraulic pile driver',sub:'6 units \u00b7 Sector 2',pillar:'equipment',dates:'Aug 2026 \u2013 Dec 2026',cost:'3100-6300-0000-0001 \u00b7 Solar pile',stage:5,plan:null,latest:'On-rent \u2014 mobilized Aug 1.',rental:{type:'monthly',rate:34500,unit:'unit',units:6}},
    {id:'ORD-3116',proj:'hercules',od:'2026-10-01',item:'MV switchgear delivery \u2014 oversize haul',sub:'1 load \u00b7 permitted route',pillar:'logistics',dates:'Oct 15, 2026',cost:'2600-3300-0000-0001 \u00b7 BESS & Substation',stage:1,plan:null,latest:'Submitted \u2014 02S coordinating permit and route survey.'},
    {id:'ORD-3117',proj:'hercules',od:'2026-09-01',item:'PV module deliveries \u2014 recurring',sub:'daily Sep \u2013 Nov \u00b7 East gate',pillar:'logistics',dates:'Sep \u2013 Nov 2026',cost:'2600-5600-0000-0001 \u00b7 Tracker & Module',stage:1,plan:null,latest:'Submitted \u2014 02S scheduling gate slots.'},
    {id:'ORD-3118',proj:'hercules',od:'2026-12-01',item:'BESS container placement',sub:'haul + crane \u00b7 Pad 3',pillar:'logistics',dates:'Dec 1, 2026',cost:'2600-3300-0000-0001 \u00b7 BESS & Substation',stage:1,plan:null,latest:'Submitted \u2014 02S coordinating crane and haul.'},
    {id:'ORD-3119',proj:'hercules',od:'2026-08-15',item:'Prefab pipe rack delivery',sub:'1 load \u00b7 Laydown B',pillar:'logistics',dates:'Aug 15, 2026',cost:'2600-0540-0000-0001 \u00b7 Module install',stage:1,plan:null,latest:'Submitted \u2014 02S confirming truck size and Laydown B availability.'},
    {id:'ORD-3120',proj:'hercules',od:'2026-07-15',item:'VDC / BIM coordination',sub:'3 FTE \u00b7 Apr\u2013Oct 2026',pillar:'profservices',dates:'Apr 2026 \u2013 Oct 2026',cost:'0100-0100-0000-0001 \u00b7 General conditions',stage:1,plan:null,latest:'Submitted \u2014 pending 02S pricing confirmation for 3-FTE VDC/BIM engagement.'},
    {id:'ORD-3121',proj:'hercules',od:'2026-07-20',item:'Telehandler \u2014 10K \u00d7 24 (Sector 1)',sub:'24 units \u00b7 Sep 2026\u2013Apr 2027 \u00b7 Tracker assembly',pillar:'equipment',dates:'Sep 2026 \u2013 Apr 2027',cost:'2600-5600-0000-0001 \u00b7 Module install',stage:1,plan:null,latest:'Submitted \u2014 02S reviewing allocation; confirm by Aug 15.'},
    {id:'ORD-3122',proj:'hercules',od:'2026-07-20',item:'Boom lift \u2014 60 ft \u00d7 18 (Sector 1)',sub:'18 units \u00b7 Sep 2026\u2013Mar 2027 \u00b7 Module installation',pillar:'equipment',dates:'Sep 2026 \u2013 Mar 2027',cost:'2600-5600-0000-0001 \u00b7 Module install',stage:1,plan:null,latest:'Submitted \u2014 02S reviewing availability across fleet; confirm by Aug 15.'},
  {id:'ORD-3123',proj:'hercules',od:'2026-04-01',anticipatedOff:'2027-03-31',item:'Forklift 5K',sub:'4 units \u00b7 Riverside material handling',pillar:'equipment',dates:'Apr 2026 \u2013 ongoing',cost:'0200-0320-0000-0001 \u00b7 Site earthwork',stage:5,plan:null,latest:'On-rent \u2014 4 units active, Riverside Medical Center site.'},
  {id:'ORD-3124',proj:'hercules',od:'2026-07-01',anticipatedOff:'2026-10-31',item:'Excavator 20T',sub:'2 units \u00b7 Riverside earthwork',pillar:'equipment',dates:'Jul\u2013Oct 2026',cost:'0200-0320-0000-0001 \u00b7 Site earthwork',stage:5,plan:null,latest:'On-rent \u2014 2 units active, Riverside. Off-rent target Oct 2026.'},
  {id:'ORD-3125',proj:'hercules',od:'2026-04-01',anticipatedOff:'2027-02-28',item:'Compaction roller',sub:'4 units \u00b7 Cimarron site prep',pillar:'equipment',dates:'Apr 2026 \u2013 ongoing',cost:'0200-0320-0000-0001 \u00b7 Site earthwork',stage:5,plan:null,latest:'On-rent \u2014 4 units active, Cimarron Data Center.'},
  {id:'ORD-3126',proj:'hercules',od:'2026-04-01',anticipatedOff:'2027-02-28',item:'Motor grader',sub:'2 units \u00b7 Cimarron grading',pillar:'equipment',dates:'Apr 2026 \u2013 ongoing',cost:'0200-0320-0000-0001 \u00b7 Site earthwork',stage:5,plan:null,latest:'On-rent \u2014 2 units active, Cimarron Data Center.'},
  {id:'ORD-3127',proj:'hercules',od:'2026-06-01',item:'Excavator demobi',sub:'2 units \u00b7 Hercules site',pillar:'logistics',dates:'Jun 2026',cost:'0100-0100-0000-0001 \u00b7 General conditions',stage:2,plan:null,latest:'Scheduled \u2014 demobi window confirmed Jun 2026. Self-perform crew assigned.'},
  {id:'ORD-3128',proj:'hercules',od:'2026-07-15',item:'Tower crane mobilization (Riverside)',sub:'1 move \u00b7 Riverside Medical',pillar:'logistics',dates:'Aug 2026',cost:'0200-0320-0000-0001 \u00b7 Site earthwork',stage:2,plan:null,latest:'Scheduled \u2014 Bragg Crane confirmed Aug slot. Permit applications filed.'},
  {id:'ORD-3129',proj:'hercules',od:'2026-07-20',item:'Excavator delivery (Riverside)',sub:'1 move \u00b7 Riverside site',pillar:'logistics',dates:'Sep 2026',cost:'0200-0320-0000-0001 \u00b7 Site earthwork',stage:2,plan:null,latest:'Scheduled \u2014 self-perform delivery, Sep window confirmed.'},
  {id:'ORD-3130',proj:'hercules',od:'2026-04-01',anticipatedOff:'2027-04-30',item:'Floor-by-floor material hoisting',sub:'8 lifts/mo \u00b7 internal crew',pillar:'logistics',dates:'Apr 2026 \u2013 ongoing',cost:'0200-0320-0000-0001 \u00b7 Site earthwork',stage:5,plan:null,latest:'On-rent \u2014 internal crew active, 8 lifts/mo average. Ongoing through structural close.'},
  {id:'ORD-3131',proj:'hercules',od:'2026-07-20',item:'Excavator delivery + haul',sub:'2 moves \u00b7 Cimarron site',pillar:'logistics',dates:'Sep 2026',cost:'0200-0320-0000-0001 \u00b7 Site earthwork',stage:2,plan:null,latest:'Scheduled \u2014 self-perform, Sep delivery window confirmed.'},
  {id:'ORD-3132',proj:'hercules',od:'2026-07-10',item:'PDU site delivery',sub:'3 loads \u00b7 3PL',pillar:'logistics',dates:'Oct 2026',cost:'2600-0540-0000-0001 \u00b7 Module install',stage:2,plan:null,latest:'PO issued \u2014 3PL confirmed. Delivery window Oct 2026; receiving team scheduled.'},
  {id:'ORD-3133',proj:'hercules',od:'2026-06-01',item:'Overhead MEP rack modules',sub:'6 modules \u00b7 shop-fabricated',pillar:'prefab',dates:'Sep 2026',cost:'0200-0320-0000-0001 \u00b7 Site earthwork',stage:2,plan:null,latest:'In fabrication \u2014 Piperite Fab. 2 of 6 modules complete. Delivery Sep 2026.'},
  {id:'ORD-3134',proj:'hercules',od:'2026-05-01',item:'L2 headwall assemblies (Riverside)',sub:'8 units \u00b7 fabricated & delivered',pillar:'prefab',dates:'Jul 2026',cost:'0200-0320-0000-0001 \u00b7 Site earthwork',stage:3,plan:null,latest:'Delivered \u2014 all 8 headwall units received Jul 20, 2026. Signed off by site lead.'},
  {id:'ORD-3135',proj:'hercules',od:'2026-06-15',item:'Server room partition panels',sub:'6 panels \u00b7 custom fab',pillar:'prefab',dates:'Nov 2026',cost:'2600-0540-0000-0001 \u00b7 Module install',stage:2,plan:null,latest:'In fabrication \u2014 ModSpace. Drawings approved, fabrication underway. Delivery Nov 2026.'},
  {id:'ORD-3136',proj:'hercules',od:'2026-06-15',item:'Main power transformer',sub:'1 unit \u00b7 custom spec 345/12.5kV',pillar:'procurement',dates:'Dec 2026',cost:'3100-6200-0000-0001 \u00b7 Solar pile',stage:2,plan:null,latest:'PO issued \u2014 ABB confirmed 26-wk lead time. Delivery Dec 2026. Critical path item.',attachments:[{type:'Quotes',name:'ABB transformer quote rev 2',ref:'Q-ABB-3136-R2',status:'Available'},{type:'Submittals',name:'Transformer shop drawings \u2014 ABB',ref:'SUB-3136-001',status:'Pending'},{type:'Submittals',name:'Factory acceptance test plan',ref:'FAT-3136-001',status:'In review'},{type:'Shipping',name:'Carrier details \u2014 heavy haul logistics',ref:'SHIP-3136-001',status:'Draft'},{type:'Safety',name:'MSDS \u2014 transformer insulating oil',ref:'MSDS-3136-001',status:'Available'}]},
  {id:'ORD-3137',proj:'hercules',od:'2026-04-01',anticipatedOff:'2026-12-31',item:'Surgical unit supply runs',sub:'Ongoing \u00b7 McKesson',pillar:'procurement',dates:'Apr 2026 \u2013 ongoing',cost:'0200-0320-0000-0001 \u00b7 Site earthwork',stage:4,plan:null,latest:'Active \u2014 McKesson supply runs ongoing. Weekly deliveries per spec.'},
  {id:'ORD-3138',proj:'hercules',od:'2026-04-01',anticipatedOff:'2026-12-31',item:'Safety signage + PPE bundles',sub:'Lot \u00b7 MSA Safety',pillar:'procurement',dates:'Apr 2026 \u2013 ongoing',cost:'0200-0320-0000-0001 \u00b7 Site earthwork',stage:4,plan:null,latest:'Active \u2014 MSA Safety standing order. Restocked monthly.'},
  {id:'ORD-3139',proj:'hercules',od:'2026-07-01',item:'High-density PDUs',sub:'24 units \u00b7 Vertiv',pillar:'procurement',dates:'Oct 2026',cost:'2600-0540-0000-0001 \u00b7 Module install',stage:2,plan:null,latest:'PO issued \u2014 Vertiv confirmed. Lead time 10 wks, delivery Oct 2026.'},
  {id:'ORD-3140',proj:'hercules',od:'2026-07-05',item:'Cable management trays',sub:'Lot \u00b7 Panduit',pillar:'procurement',dates:'Oct 2026',cost:'2600-0540-0000-0001 \u00b7 Module install',stage:2,plan:null,latest:'PO issued \u2014 Panduit order confirmed. Delivery Oct 2026 per schedule.'},
  {id:'ORD-3141',proj:'hercules',od:'2026-07-01',item:'Raised floor panels',sub:'2,000 sqft \u00b7 Tate Access',pillar:'procurement',dates:'Oct 2026',cost:'2600-0540-0000-0001 \u00b7 Module install',stage:2,plan:null,latest:'PO issued \u2014 Tate Access confirmed. Delivery Oct 2026, coordinating dock access.'},
  {id:'ORD-3142',proj:'hercules',od:'2026-07-10',item:'Precision cooling units',sub:'16 units \u00b7 Liebert',pillar:'procurement',dates:'Nov 2026',cost:'2600-0540-0000-0001 \u00b7 Module install',stage:2,plan:null,latest:'PO issued \u2014 Liebert confirmed, 16-wk lead time. Delivery Nov 2026. Critical.'},
  {id:'ORD-3143',proj:'hercules',od:'2026-04-01',anticipatedOff:'2027-04-30',item:"Owner's rep",sub:'1 FTE \u00b7 HDR',pillar:'profservices',dates:'Apr 2026 \u2013 ongoing',cost:'0200-0320-0000-0001 \u00b7 Site earthwork',stage:4,plan:null,latest:'Active \u2014 HDR owner\u2019s rep onsite, Riverside Medical. No billing disputes.'},
  {id:'ORD-3144',proj:'hercules',od:'2026-05-01',anticipatedOff:'2027-04-30',item:'Material testing lab',sub:'2 FTE \u00b7 GeoTech Labs',pillar:'profservices',dates:'May 2026 \u2013 ongoing',cost:'2600-0540-0000-0001 \u00b7 Module install',stage:4,plan:null,latest:'Active \u2014 GeoTech Labs 2 FTE onsite. Compaction and concrete testing per project specs.'}
  ];
  var PORTAL_QUOTES=[
    {ref:'Q-51822',submitted:'Jul 10, 2026',project:'Hercules Solar + BESS',items:3,status:'Complete',totalPriced:'$117,700',note:'Scissor lifts + owner\'s engineer + crane mobilization',
     lineItems:[
       {name:'Scissor lift, 32 ft \u00d7 8',pillar:'Equipment',qty:'8 units \u00b7 8 weeks',amount:'$15,200'},
       {name:'Owner\'s engineer / IE support \u00d7 2 FTE',pillar:'Prof. services',qty:'2 FTE \u00b7 3 months',amount:'$84,000'},
       {name:'Tower crane mobilization (oversize)',pillar:'Logistics',qty:'1 move',amount:'$18,500'}
     ]},
    {ref:'Q-63411',submitted:'Jul 25, 2026',project:'Hercules Solar + BESS',items:2,status:'Draft',pendingN:1,note:'MEWP (pending 02S) + structural inspection',
     lineItems:[
       {name:'Mobile elevated work platform \u00d7 3',pillar:'Equipment',qty:'3 units \u00b7 8 weeks',amount:null},
       {name:'Structural special inspection \u00d7 2 FTE',pillar:'Prof. services',qty:'2 FTE \u00b7 4 months',amount:'$64,000'}
     ]},
    {ref:'Q-63413',submitted:'Jul 20, 2026',project:'Hercules Solar + BESS',items:1,status:'Draft',pendingN:1,note:'SDS Max rotary hammers \u2014 specialty tool, not in rate card',
     lineItems:[
       {name:'SDS Max rotary hammers, 1-3/4\" \u00d7 8',pillar:'Procurement',qty:'8 units',amount:null}
     ]},
    {ref:'Q-63414',submitted:'Jul 22, 2026',project:'Hercules Solar + BESS',items:1,status:'Draft',pendingN:1,note:'Wire crimpers, hydraulic \u2014 BESS & electrical terminations',
     lineItems:[
       {name:'Wire crimpers, hydraulic 11T/12T \u00d7 8',pillar:'Procurement',qty:'8 units',amount:null}
     ]},
    {ref:'Q-63415',submitted:'Jul 15, 2026',project:'Hercules Solar + BESS',items:1,status:'Draft',pendingN:1,note:'VDC / BIM coordination \u2014 specialty role, not in rate card',
     lineItems:[
       {name:'VDC / BIM coordination, 3 FTE',pillar:'Prof. services',qty:'3 FTE \u00b7 7 months',amount:null}
     ]}
  ];
  var EXTRA_LOOKAHEAD=[];
  var ORDER_TASKS={
    // ── EQUIPMENT ──────────────────────────────────────────────────────────
    'ORD-3051':{node:'crew-vehicle',tasks:[
      {id:'c1',side:'02s',label:'Maintenance schedule confirmed',done:true,date:'May 20'},
      {id:'c2',side:'02s',label:'Insurance docs on file',done:true,date:'May 20'},
      {id:'c3',side:'02s',label:'Monthly meter reading requested · Aug',done:false,due:'Aug 1',dueIso:'2026-08-01'},
      {id:'c4',side:'02s',label:'Off-rent coordination when phase ends',done:false,due:'Oct 30'},
      {id:'g1',side:'gc',label:'Fuel log maintained (weekly)',done:true,date:'Jul 27'},
      {id:'g2',side:'gc',label:'Driver assignment current',done:true,date:'Jul 1'},
      {id:'g3',side:'gc',label:'Monthly usage report submitted · Aug',done:false,due:'Aug 1',dueIso:'2026-08-01'},
      {id:'g4',side:'gc',label:'Return authorization when civil phase ends',done:false,due:'Oct 28'}
    ]},
    'ORD-3054':{node:'crane-tower',tasks:[
      {id:'c1',side:'02s',label:'Oversize permit issued',done:true,date:'Jul 25'},
      {id:'c2',side:'02s',label:'Erection crew scheduled · Aug 4',done:true,date:'Jul 28'},
      {id:'c3',side:'02s',label:'Insurance certificate to GC',done:true,date:'Jul 28'},
      {id:'c4',side:'02s',label:'Post-erection inspection report',done:false,due:'Aug 6',dueIso:'2026-08-06'},
      {id:'g1',side:'gc',label:'Lift zone designated in site plan',done:true,date:'Jul 20',blocking:true},
      {id:'g2',side:'gc',label:'Safety pre-task plan signed',done:false,due:'Aug 3',dueIso:'2026-08-03',blocking:true},
      {id:'g3',side:'gc',label:'Operator badge-in confirmed',done:false,due:'Aug 4',dueIso:'2026-08-04'},
      {id:'g4',side:'gc',label:'Crane operator orientation acknowledged',done:false,due:'Aug 4',dueIso:'2026-08-04'}
    ]},
    'ORD-3042':{node:'excavator',tasks:[
      {id:'c1',side:'02s',label:'Final inspection report filed',done:true,date:'Jun 6'},
      {id:'c2',side:'02s',label:'Final billing issued',done:true,date:'Jun 10'},
      {id:'c3',side:'02s',label:'Lien waiver submitted',done:true,date:'Jun 15'},
      {id:'c4',side:'02s',label:'Account reconciliation closed',done:true,date:'Jun 20'},
      {id:'g1',side:'gc',label:'Delivery receipt archived',done:true,date:'May 20'},
      {id:'g2',side:'gc',label:'Return receipt signed',done:true,date:'Jun 6'},
      {id:'g3',side:'gc',label:'Site cleared post-return',done:true,date:'Jun 7'},
      {id:'g4',side:'gc',label:'Final cost allocated to cost code',done:true,date:'Jun 20'}
    ]},
    'ORD-3038':{node:'crane-hydraulic',tasks:[
      {id:'c1',side:'02s',label:'Rigging plan prepared',done:true,date:'Jul 28'},
      {id:'c2',side:'02s',label:'Operator assignment confirmed',done:true,date:'Jul 28'},
      {id:'c3',side:'02s',label:'Pre-delivery inspection scheduled',done:true,date:'Jul 30'},
      {id:'c4',side:'02s',label:'Mobilization notification sent',done:false,due:'Aug 3',dueIso:'2026-08-03',blocking:true},
      {id:'g1',side:'gc',label:'Rigging zone designated in site plan',done:true,date:'Jul 26',blocking:true},
      {id:'g2',side:'gc',label:'Operator + rigging crew confirmed on site',done:false,due:'Aug 3',dueIso:'2026-08-03',blocking:true},
      {id:'g3',side:'gc',label:'Site safety pre-task plan for Aug 4',done:false,due:'Aug 3',dueIso:'2026-08-03'},
      {id:'g4',side:'gc',label:'Boom erection zone clear + barricaded',done:false,due:'Aug 3',dueIso:'2026-08-03'}
    ]},
    'ORD-3031':{node:'scissor-lift',tasks:[
      {id:'c1',side:'02s',label:'Idle alert issued to GC',done:true,date:'Jul 20'},
      {id:'c2',side:'02s',label:'Off-rent window offered (4-day notice)',done:true,date:'Jul 22'},
      {id:'c3',side:'02s',label:'Pickup scheduled once authorized',done:false,due:'Aug 2',dueIso:'2026-08-02',blocking:true},
      {id:'c4',side:'02s',label:'Final billing on return',done:false,due:'Aug 5',dueIso:'2026-08-05'},
      {id:'g1',side:'gc',label:'MEP supervisor sign-off on idle status',done:true,date:'Jul 24'},
      {id:'g2',side:'gc',label:'Confirm replacement not needed',done:true,date:'Jul 24'},
      {id:'g3',side:'gc',label:'Authorize off-rent · 2 idle units',done:false,due:'Aug 1',dueIso:'2026-08-01',blocking:true},
      {id:'g4',side:'gc',label:'Clear staging area for pickup',done:false,due:'Aug 2',dueIso:'2026-08-02'}
    ]},
    'ORD-3029':{node:'telehandler',tasks:[
      {id:'c1',side:'02s',label:'Operator certification on file',done:true,date:'May 5'},
      {id:'c2',side:'02s',label:'Service interval check (300h)',done:true,date:'Jul 15'},
      {id:'c3',side:'02s',label:'Utilization tracking · Jul report',done:true,date:'Jul 31'},
      {id:'c4',side:'02s',label:'Off-rent coordination when metals phase ends',done:false,due:'Aug 29'},
      {id:'g1',side:'gc',label:'Operator assignment current',done:true,date:'May 5'},
      {id:'g2',side:'gc',label:'Daily pre-start inspection maintained',done:true,date:'Jul 27'},
      {id:'g3',side:'gc',label:'Usage log submitted weekly',done:true,date:'Jul 27'},
      {id:'g4',side:'gc',label:'Off-rent notice to 02S when phase done',done:false,due:'Aug 26'}
    ]},
    'ORD-3093':{node:'pile-driver',tasks:[
      {id:'c1',side:'02s',label:'Sector 1 schedule confirmed',done:true,date:'Jun 1'},
      {id:'c2',side:'02s',label:'Daily production tracking active',done:true,date:'Jun 15'},
      {id:'c3',side:'02s',label:'Week 8 utilization report · Jul 28',done:true,date:'Jul 28'},
      {id:'c4',side:'02s',label:'Demob coordination · Sector 1 close',done:false,due:'Aug 30'},
      {id:'g1',side:'gc',label:'GPS staking S1 complete',done:true,date:'Jun 1'},
      {id:'g2',side:'gc',label:'Vibration monitoring active',done:true,date:'Jun 2'},
      {id:'g3',side:'gc',label:'Weekly pile log reviewed + signed · Aug 4 wk',done:false,due:'Aug 1',dueIso:'2026-08-01'},
      {id:'g4',side:'gc',label:'Sector 1 → Sector 3 handoff plan confirmed',done:false,due:'Aug 15'}
    ]},
    'ORD-3110':{node:'generator',tasks:[
      {id:'c1',side:'02s',label:'Monthly service visits scheduled',done:true,date:'Mar 1'},
      {id:'c2',side:'02s',label:'Fuel contract confirmed · on-call delivery',done:true,date:'Mar 5'},
      {id:'c3',side:'02s',label:'Jul meter reading compiled',done:true,date:'Jul 31'},
      {id:'c4',side:'02s',label:'Aug service visit scheduled · Aug 15',done:false,due:'Aug 15'},
      {id:'g1',side:'gc',label:'Power distribution layout approved',done:true,date:'Mar 1'},
      {id:'g2',side:'gc',label:'Weekly safety inspections current',done:true,date:'Jul 27'},
      {id:'g3',side:'gc',label:'Monthly meter readings submitted · Aug',done:false,due:'Aug 1',dueIso:'2026-08-01'},
      {id:'g4',side:'gc',label:'Fuel log maintained (weekly)',done:false,due:'Aug 4',dueIso:'2026-08-04'}
    ]},
    'ORD-3111':{node:'light-towers',tasks:[
      {id:'c1',side:'02s',label:'Monthly operational check scheduled',done:true,date:'Jul 1'},
      {id:'c2',side:'02s',label:'Fuel replenishment on-call confirmed',done:true,date:'Mar 1'},
      {id:'c3',side:'02s',label:'Jul tower count + status report',done:true,date:'Jul 31'},
      {id:'c4',side:'02s',label:'Aug inspection · all 26 units',done:false,due:'Aug 8'},
      {id:'g1',side:'gc',label:'Tower position map current',done:true,date:'Jul 15'},
      {id:'g2',side:'gc',label:'Weekly operational inspection logged',done:true,date:'Jul 27'},
      {id:'g3',side:'gc',label:'Report any outage within 24h',done:true,date:'Jul 27'},
      {id:'g4',side:'gc',label:'Aug position review · expansion to S2 area',done:false,due:'Aug 5',dueIso:'2026-08-05'}
    ]},
    'ORD-3112':{node:'dozer',tasks:[
      {id:'c1',side:'02s',label:'Grading KPI tracking · Jul update',done:true,date:'Jul 31'},
      {id:'c2',side:'02s',label:'Operator rotation plan confirmed',done:true,date:'Jun 1'},
      {id:'c3',side:'02s',label:'Off-rent notice issued (2 wks)',done:false,due:'Aug 15'},
      {id:'c4',side:'02s',label:'Final fuel + service billing',done:false,due:'Sep 5'},
      {id:'g1',side:'gc',label:'Haul road condition checks weekly',done:true,date:'Jul 27'},
      {id:'g2',side:'gc',label:'Grade completion certification · S2',done:false,due:'Aug 4',dueIso:'2026-08-04',blocking:true},
      {id:'g3',side:'gc',label:'Final topographic survey requested',done:false,due:'Aug 10'},
      {id:'g4',side:'gc',label:'Haul road decommission plan submitted',done:false,due:'Aug 20'}
    ]},
    'ORD-3113':{node:'motor-grader',tasks:[
      {id:'c1',side:'02s',label:'Final inspection report filed',done:true,date:'Aug 5'},
      {id:'c2',side:'02s',label:'Off-rent confirmation issued',done:true,date:'Aug 5'},
      {id:'c3',side:'02s',label:'Final billing submitted',done:true,date:'Aug 8'},
      {id:'c4',side:'02s',label:'Account reconciliation complete',done:true,date:'Aug 10'},
      {id:'g1',side:'gc',label:'Return authorization signed',done:true,date:'Aug 5'},
      {id:'g2',side:'gc',label:'Return receipt archived',done:true,date:'Aug 5'},
      {id:'g3',side:'gc',label:'Site cleared post-return',done:true,date:'Aug 5'},
      {id:'g4',side:'gc',label:'Final cost allocated to cost code',done:true,date:'Aug 10'}
    ]},
    'ORD-3114':{node:'compaction-roller',tasks:[
      {id:'c1',side:'02s',label:'Compaction test schedule confirmed',done:true,date:'Apr 1'},
      {id:'c2',side:'02s',label:'Operator assignments current',done:true,date:'Jul 1'},
      {id:'c3',side:'02s',label:'Jul utilization report',done:true,date:'Jul 31'},
      {id:'c4',side:'02s',label:'Off-rent coordination when sector done',done:false,due:'Oct 1'},
      {id:'g1',side:'gc',label:'Compaction test reports signed weekly',done:true,date:'Jul 27'},
      {id:'g2',side:'gc',label:'QC inspection report · Jul',done:true,date:'Jul 31'},
      {id:'g3',side:'gc',label:'Test frequency per spec confirmed',done:true,date:'Apr 5'},
      {id:'g4',side:'gc',label:'Sector 2 compaction handoff plan',done:false,due:'Aug 15'}
    ]},
    'ORD-3115':{node:'pile-driver',tasks:[
      {id:'c1',side:'02s',label:'Ground bearing capacity confirmed',done:true,date:'Jul 29'},
      {id:'c2',side:'02s',label:'Operator qualified + certified',done:true,date:'Jul 28'},
      {id:'c3',side:'02s',label:'On-rent confirmed · Aug 1',done:true,date:'Aug 1'},
      {id:'c4',side:'02s',label:'Weekly utilization report · Aug 4 wk',done:false,due:'Aug 8',dueIso:'2026-08-08'},
      {id:'g1',side:'gc',label:'GPS staking complete',done:true,date:'Jul 29'},
      {id:'g2',side:'gc',label:'Vibration monitoring in place',done:true,date:'Jul 30'},
      {id:'g3',side:'gc',label:'Phase 1 pile log submitted',done:false,due:'Aug 8',dueIso:'2026-08-08'},
      {id:'g4',side:'gc',label:'Subgrade acceptance — S3 sector',done:false,due:'Aug 15',dueIso:'2026-08-15'}
    ]},
    // ── LOGISTICS ─────────────────────────────────────────────────────────
    'ORD-3070':{node:'logistics-heavy-haul',tasks:[
      {id:'c1',side:'02s',label:'Route survey completed',done:true,date:'May 18'},
      {id:'c2',side:'02s',label:'Oversize permit confirmed',done:true,date:'May 19'},
      {id:'c3',side:'02s',label:'Carrier dispatched',done:true,date:'May 20'},
      {id:'c4',side:'02s',label:'Delivery report filed',done:true,date:'May 20'},
      {id:'g1',side:'gc',label:'Gate clearance confirmed',done:true,date:'May 19'},
      {id:'g2',side:'gc',label:'Laydown area cleared',done:true,date:'May 19'},
      {id:'g3',side:'gc',label:'Delivery receipt signed',done:true,date:'May 20'},
      {id:'g4',side:'gc',label:'Dispatch confirmation archived',done:true,date:'May 20'}
    ]},
    'ORD-3071':{node:'logistics-oversize',tasks:[
      {id:'c1',side:'02s',label:'Route survey completed',done:true,date:'Jul 20'},
      {id:'c2',side:'02s',label:'Oversize permits issued',done:true,date:'Jul 25'},
      {id:'c3',side:'02s',label:'Escort vehicle arranged',done:true,date:'Jul 28'},
      {id:'c4',side:'02s',label:'5 AM move notification to site',done:false,due:'Aug 2',dueIso:'2026-08-02'},
      {id:'g1',side:'gc',label:'North gate clearance confirmed',done:false,due:'Aug 2',dueIso:'2026-08-02',blocking:true},
      {id:'g2',side:'gc',label:'Traffic control plan submitted',done:true,date:'Jul 26'},
      {id:'g3',side:'gc',label:'Laydown A ready for crane delivery',done:false,due:'Aug 3',dueIso:'2026-08-03',blocking:true},
      {id:'g4',side:'gc',label:'Notify adjacent subcontractors',done:false,due:'Aug 2',dueIso:'2026-08-02'}
    ]},
    'ORD-3072':{node:'logistics-staging',tasks:[
      {id:'c1',side:'02s',label:'Laydown plan confirmed with GC',done:true,date:'Jun 10'},
      {id:'c2',side:'02s',label:'Material tracking system active',done:true,date:'Jun 15'},
      {id:'c3',side:'02s',label:'Jul drayage summary report',done:true,date:'Jul 31'},
      {id:'c4',side:'02s',label:'Aug schedule updated · S2 expansion',done:false,due:'Aug 4',dueIso:'2026-08-04'},
      {id:'g1',side:'gc',label:'Laydown A FIFO protocol confirmed',done:true,date:'Jun 10'},
      {id:'g2',side:'gc',label:'Gate log current (weekly)',done:true,date:'Jul 27'},
      {id:'g3',side:'gc',label:'Incoming material log submitted · Aug 4 wk',done:false,due:'Aug 1',dueIso:'2026-08-01'},
      {id:'g4',side:'gc',label:'S2 laydown zone designated',done:false,due:'Aug 8'}
    ]},
    'ORD-3116':{node:'logistics-oversize',tasks:[
      {id:'c1',side:'02s',label:'Route survey initiated',done:false,due:'Sep 1'},
      {id:'c2',side:'02s',label:'Oversize permit application submitted',done:false,due:'Sep 15',blocking:true},
      {id:'c3',side:'02s',label:'Carrier selected + booked',done:false,due:'Oct 1'},
      {id:'c4',side:'02s',label:'Delivery notification to GC (72h prior)',done:false,due:'Oct 12'},
      {id:'g1',side:'gc',label:'Oct delivery window confirmed',done:false,due:'Sep 1'},
      {id:'g2',side:'gc',label:'Haul access road load-rated',done:false,due:'Sep 15'},
      {id:'g3',side:'gc',label:'Site contact + escort designated',done:false,due:'Oct 12'},
      {id:'g4',side:'gc',label:'Laydown area for switchgear reserved',done:false,due:'Oct 10'}
    ]},
    'ORD-3117':{node:'logistics-recurring',tasks:[
      {id:'c1',side:'02s',label:'Gate slot schedule prepared',done:false,due:'Aug 15',blocking:true},
      {id:'c2',side:'02s',label:'Delivery sequencing plan issued',done:false,due:'Aug 20'},
      {id:'c3',side:'02s',label:'Unload crew plan confirmed',done:false,due:'Aug 25'},
      {id:'c4',side:'02s',label:'First delivery window confirmed · Sep 1',done:false,due:'Aug 25'},
      {id:'g1',side:'gc',label:'East gate slots reserved (daily Sep–Nov)',done:false,due:'Aug 20',blocking:true,blockedBy:'c1'},
      {id:'g2',side:'gc',label:'Module storage area designated',done:false,due:'Aug 20'},
      {id:'g3',side:'gc',label:'Receiving team schedule confirmed',done:false,due:'Aug 25'},
      {id:'g4',side:'gc',label:'FIFO protocol established for modules',done:false,due:'Aug 28'}
    ]},
    'ORD-3118':{node:'logistics-placement',tasks:[
      {id:'c1',side:'02s',label:'Crane capacity confirmed for BESS weight',done:false,due:'Oct 15'},
      {id:'c2',side:'02s',label:'Haul route identified + permitted',done:false,due:'Oct 20',blocking:true},
      {id:'c3',side:'02s',label:'Carrier + crane operator booked',done:false,due:'Nov 1'},
      {id:'c4',side:'02s',label:'Delivery window confirmed · Dec 1',done:false,due:'Nov 15'},
      {id:'g1',side:'gc',label:'Pad 3 ready date confirmed',done:false,due:'Nov 1'},
      {id:'g2',side:'gc',label:'Crane access path cleared',done:false,due:'Nov 25'},
      {id:'g3',side:'gc',label:'Electrical sub coordinated for placement',done:false,due:'Nov 20'},
      {id:'g4',side:'gc',label:'BESS commissioning team notified',done:false,due:'Nov 25'}
    ]},
    'ORD-3119':{node:'logistics-delivery',tasks:[
      {id:'c1',side:'02s',label:'Truck size confirmed (flatbed)',done:true,date:'Jul 25'},
      {id:'c2',side:'02s',label:'Laydown B availability confirmed',done:false,due:'Aug 8',dueIso:'2026-08-08',blocking:true},
      {id:'c3',side:'02s',label:'Carrier dispatched · Aug 15 delivery',done:false,due:'Aug 10',dueIso:'2026-08-10'},
      {id:'c4',side:'02s',label:'Delivery notification to GC (48h prior)',done:false,due:'Aug 13',dueIso:'2026-08-13'},
      {id:'g1',side:'gc',label:'Laydown B cleared + surveyed',done:false,due:'Aug 10',dueIso:'2026-08-10',blocking:true,blockedBy:'c2'},
      {id:'g2',side:'gc',label:'Unload crew scheduled · Aug 15',done:false,due:'Aug 13',dueIso:'2026-08-13'},
      {id:'g3',side:'gc',label:'Crane or forklift reserved for unload',done:false,due:'Aug 14',dueIso:'2026-08-14'},
      {id:'g4',side:'gc',label:'Receiving inspection plan confirmed',done:false,due:'Aug 14',dueIso:'2026-08-14'}
    ]},
    // ── PROCUREMENT ───────────────────────────────────────────────────────
    'ORD-3020':{node:'procurement-rigging',tasks:[
      {id:'c1',side:'02s',label:'Hardware spec confirmed with GC',done:true,date:'May 13'},
      {id:'c2',side:'02s',label:'Vendor selected',done:true,date:'May 15'},
      {id:'c3',side:'02s',label:'PO issued',done:true,date:'May 18'},
      {id:'c4',side:'02s',label:'Delivery confirmed',done:true,date:'May 25'},
      {id:'g1',side:'gc',label:'Approved rigging plan on file',done:true,date:'May 13'},
      {id:'g2',side:'gc',label:'Rigging supervisor designated',done:true,date:'May 13'},
      {id:'g3',side:'gc',label:'Receiving inspection complete',done:true,date:'May 25'},
      {id:'g4',side:'gc',label:'Storage location assigned',done:true,date:'May 25'}
    ]},
    'ORD-3080':{node:'procurement-ppe',tasks:[
      {id:'c1',side:'02s',label:'PPE spec confirmed',done:true,date:'May 1'},
      {id:'c2',side:'02s',label:'PO issued',done:true,date:'May 3'},
      {id:'c3',side:'02s',label:'Delivery confirmed · May 15',done:true,date:'May 15'},
      {id:'c4',side:'02s',label:'Replacement order standing PO established',done:true,date:'Jun 1'},
      {id:'g1',side:'gc',label:'Distribution complete to all crews',done:true,date:'May 16'},
      {id:'g2',side:'gc',label:'Sign-out log established',done:true,date:'May 16'},
      {id:'g3',side:'gc',label:'Daily sign-out log maintained',done:true,date:'Jul 27'},
      {id:'g4',side:'gc',label:'Replacement requests submitted as needed',done:true,date:'Jul 15'}
    ]},
    'ORD-3081':{node:'procurement-form-hardware',tasks:[
      {id:'c1',side:'02s',label:'Hardware spec confirmed',done:true,date:'May 10'},
      {id:'c2',side:'02s',label:'Vendor allocation in process',done:true,date:'May 15'},
      {id:'c3',side:'02s',label:'PO issued',done:true,date:'May 20'},
      {id:'c4',side:'02s',label:'Delivery confirmed',done:false,due:'Aug 10'},
      {id:'g1',side:'gc',label:'Delivery location designated',done:true,date:'May 10'},
      {id:'g2',side:'gc',label:'Receiving inspection team on standby',done:true,date:'May 25'},
      {id:'g3',side:'gc',label:'Storage location clear + secured',done:false,due:'Aug 8'},
      {id:'g4',side:'gc',label:'Receiving inspection complete on delivery',done:false,due:'Aug 12'}
    ]},
    'ORD-3082':{node:'procurement-fencing',tasks:[
      {id:'c1',side:'02s',label:'Fabrication quote received',done:true,date:'Jun 15'},
      {id:'c2',side:'02s',label:'PO approval pending GC auth',done:false,due:'Aug 6',dueIso:'2026-08-06',blocking:true},
      {id:'c3',side:'02s',label:'Fabrication lead time 3 wks',done:false,due:'Aug 27'},
      {id:'c4',side:'02s',label:'Delivery + installation scheduled',done:false,due:'Sep 3'},
      {id:'g1',side:'gc',label:'Fencing layout plan confirmed',done:true,date:'Jun 10'},
      {id:'g2',side:'gc',label:'Perimeter survey complete',done:true,date:'Jun 15'},
      {id:'g3',side:'gc',label:'Authorize PO release',done:false,due:'Aug 5',dueIso:'2026-08-05',blocking:true,blockedBy:'c2'},
      {id:'g4',side:'gc',label:'Installation crew slot reserved',done:false,due:'Aug 25'}
    ]},
    'ORD-3100':{node:'procurement-tools',tasks:[
      {id:'c1',side:'02s',label:'Spec confirmed (nut runner qty/torque)',done:true,date:'Jun 1'},
      {id:'c2',side:'02s',label:'PO issued',done:true,date:'Jun 5'},
      {id:'c3',side:'02s',label:'Delivery tracking · Jul 18',done:true,date:'Jul 18'},
      {id:'c4',side:'02s',label:'Receipt confirmation to GC',done:true,date:'Jul 18'},
      {id:'g1',side:'gc',label:'Delivery acceptance complete',done:true,date:'Jul 18'},
      {id:'g2',side:'gc',label:'Tool crib storage location assigned',done:true,date:'Jul 18'},
      {id:'g3',side:'gc',label:'Usage log started',done:true,date:'Jul 20'},
      {id:'g4',side:'gc',label:'Operator training on nut runners confirmed',done:true,date:'Jul 22'}
    ]},
    'ORD-3101':{node:'procurement-batteries',tasks:[
      {id:'c1',side:'02s',label:'PO issued',done:true,date:'Jun 15'},
      {id:'c2',side:'02s',label:'Delivery confirmed · Jun 30',done:true,date:'Jun 30'},
      {id:'c3',side:'02s',label:'Receipt confirmation issued',done:true,date:'Jul 1'},
      {id:'c4',side:'02s',label:'Warranty documentation on file',done:true,date:'Jul 1'},
      {id:'g1',side:'gc',label:'Receiving inspection complete',done:true,date:'Jun 30'},
      {id:'g2',side:'gc',label:'Distribution to crews complete',done:true,date:'Jul 1'},
      {id:'g3',side:'gc',label:'Charging station assignment confirmed',done:true,date:'Jul 1'},
      {id:'g4',side:'gc',label:'Battery health checks monthly',done:true,date:'Jul 25'}
    ]},
    'ORD-3102':{node:'procurement-charging',tasks:[
      {id:'c1',side:'02s',label:'PO issued',done:true,date:'Jun 10'},
      {id:'c2',side:'02s',label:'Delivery confirmed · Jul 1',done:true,date:'Jul 1'},
      {id:'c3',side:'02s',label:'Installation support coordinated',done:true,date:'Jul 1'},
      {id:'c4',side:'02s',label:'Installation confirmation to billing',done:true,date:'Jul 2'},
      {id:'g1',side:'gc',label:'Installation location designated',done:true,date:'Jun 20'},
      {id:'g2',side:'gc',label:'Electrical connection verified',done:true,date:'Jul 1'},
      {id:'g3',side:'gc',label:'All stations operational confirmed',done:true,date:'Jul 1'},
      {id:'g4',side:'gc',label:'Capacity expansion plan if needed',done:true,date:'Jul 10'}
    ]},
    'ORD-3103':{node:'procurement-tool',tasks:[
      {id:'c1',side:'02s',label:'Spec confirmed (TS60/TS90 mix)',done:true,date:'Jul 26'},
      {id:'c2',side:'02s',label:'Vendor lead time confirmed (4 wk)',done:true,date:'Jul 26'},
      {id:'c3',side:'02s',label:'PO issued',done:false,due:'Aug 1',dueIso:'2026-08-01',blocking:true},
      {id:'c4',side:'02s',label:'Delivery to site confirmed',done:false,due:'Aug 29',dueIso:'2026-08-29'},
      {id:'g1',side:'gc',label:'Quantity + torque spec confirmed',done:true,date:'Jul 25'},
      {id:'g2',side:'gc',label:'Authorize PO release',done:false,due:'Aug 1',dueIso:'2026-08-01',blocking:true,blockedBy:'c3'},
      {id:'g3',side:'gc',label:'Secure storage location assigned',done:false,due:'Aug 15',dueIso:'2026-08-15'},
      {id:'g4',side:'gc',label:'Operator training scheduled',done:false,due:'Aug 29',dueIso:'2026-08-29'}
    ]},
    'ORD-3104':{node:'procurement-tools',tasks:[
      {id:'c1',side:'02s',label:'PO issued',done:true,date:'Jun 15'},
      {id:'c2',side:'02s',label:'Delivery confirmed · Jul 30',done:true,date:'Jul 30'},
      {id:'c3',side:'02s',label:'Receipt confirmation issued',done:true,date:'Jul 30'},
      {id:'c4',side:'02s',label:'Warranty + PPE documentation on file',done:true,date:'Jul 30'},
      {id:'g1',side:'gc',label:'Receiving inspection complete',done:true,date:'Jul 30'},
      {id:'g2',side:'gc',label:'Tool crib assignment confirmed',done:true,date:'Jul 30'},
      {id:'g3',side:'gc',label:'Blade stock confirmed on site',done:true,date:'Jul 31'},
      {id:'g4',side:'gc',label:'Operator PPE (face shield) confirmed',done:true,date:'Jul 31'}
    ]},
    'ORD-3105':{node:'procurement-safety',tasks:[
      {id:'c1',side:'02s',label:'PO issued · expedited',done:true,date:'Jul 15'},
      {id:'c2',side:'02s',label:'Delivery tracking · Aug 5',done:false,due:'Aug 5',dueIso:'2026-08-05',blocking:true},
      {id:'c3',side:'02s',label:'Receipt confirmation to GC',done:false,due:'Aug 5',dueIso:'2026-08-05'},
      {id:'c4',side:'02s',label:'OSHA compliance docs on file',done:false,due:'Aug 6',dueIso:'2026-08-06'},
      {id:'g1',side:'gc',label:'OSHA Table 1 silica plan updated',done:true,date:'Jul 15'},
      {id:'g2',side:'gc',label:'Receiving team on standby · Aug 5',done:false,due:'Aug 4',dueIso:'2026-08-04'},
      {id:'g3',side:'gc',label:'Storage location designated (dry, secure)',done:false,due:'Aug 4',dueIso:'2026-08-04'},
      {id:'g4',side:'gc',label:'OSHA operator training scheduled',done:false,due:'Aug 6',dueIso:'2026-08-06'}
    ]},
    // ── PREFAB ────────────────────────────────────────────────────────────
    'ORD-3014':{node:'prefab-headwall',tasks:[
      {id:'c1',side:'02s',label:'Shop drawings prepared',done:true,date:'May 5'},
      {id:'c2',side:'02s',label:'Submittal package issued',done:true,date:'May 8'},
      {id:'c3',side:'02s',label:'Fabrication start pending EOR approval',done:false,due:'Aug 15',blocking:true},
      {id:'c4',side:'02s',label:'Delivery window confirmed',done:false,due:'Sep 1'},
      {id:'g1',side:'gc',label:'Submittal log entry filed',done:true,date:'May 9'},
      {id:'g2',side:'gc',label:'EOR submittal review in progress',done:false,due:'Aug 8',blocking:true,blockedBy:'c2',note:'14-day review window from submittal'},
      {id:'g3',side:'gc',label:'Installation crew identified',done:false,due:'Aug 20'},
      {id:'g4',side:'gc',label:'Foundation / rough-in ready for delivery',done:false,due:'Sep 1'}
    ]},
    'ORD-3060':{node:'prefab-pipe-rack',tasks:[
      {id:'c1',side:'02s',label:'Shop drawings approved',done:true,date:'Jun 1'},
      {id:'c2',side:'02s',label:'Fabrication underway',done:true,date:'Jun 5'},
      {id:'c3',side:'02s',label:'Delivery window confirmed · Aug 15',done:true,date:'Jun 20'},
      {id:'c4',side:'02s',label:'Delivery notification (48h prior)',done:false,due:'Aug 13',dueIso:'2026-08-13'},
      {id:'g1',side:'gc',label:'Submittal approved on file',done:true,date:'Jun 1'},
      {id:'g2',side:'gc',label:'MEP rough-in complete before delivery',done:false,due:'Aug 12',dueIso:'2026-08-12',blocking:true},
      {id:'g3',side:'gc',label:'Installation crew scheduled · Aug 15',done:false,due:'Aug 10',dueIso:'2026-08-10'},
      {id:'g4',side:'gc',label:'Receiving inspection plan confirmed',done:false,due:'Aug 13',dueIso:'2026-08-13'}
    ]},
    'ORD-3061':{node:'prefab-pod',tasks:[
      {id:'c1',side:'02s',label:'Submittal package issued',done:true,date:'May 20'},
      {id:'c2',side:'02s',label:'EOR review coordination',done:false,due:'Aug 10',blocking:true},
      {id:'c3',side:'02s',label:'Fabrication start pending approval',done:false,due:'Aug 15'},
      {id:'c4',side:'02s',label:'Delivery window confirmed',done:false,due:'Sep 10'},
      {id:'g1',side:'gc',label:'Site location for pod designated',done:true,date:'May 18'},
      {id:'g2',side:'gc',label:'EOR submittal review',done:false,due:'Aug 10',blocking:true,blockedBy:'c1',note:'Review clock starts on 02S submission'},
      {id:'g3',side:'gc',label:'Utility connections planned (water/sewer)',done:false,due:'Aug 20'},
      {id:'g4',side:'gc',label:'Access path to pod location cleared',done:false,due:'Sep 5'}
      ]},
    'ORD-3106':{node:'prefab-headwall',tasks:[
      {id:'c1',side:'02s',label:'Shop drawings approved',done:true,date:'Jun 1'},
      {id:'c2',side:'02s',label:'Fabrication complete',done:true,date:'Jul 10'},
      {id:'c3',side:'02s',label:'Delivery confirmed · Jul 18',done:true,date:'Jul 18'},
      {id:'c4',side:'02s',label:'Final billing issued',done:true,date:'Jul 22'},
      {id:'g1',side:'gc',label:'Receiving inspection complete',done:true,date:'Jul 18'},
      {id:'g2',side:'gc',label:'Installation crew mobilized',done:true,date:'Jul 19'},
      {id:'g3',side:'gc',label:'Field installation complete',done:true,date:'Jul 24'},
      {id:'g4',side:'gc',label:'As-built documentation filed',done:false,due:'Aug 1',dueIso:'2026-08-01'}
    ]},
    'ORD-3107':{node:'prefab-ehouse',tasks:[
      {id:'c1',side:'02s',label:'Shop drawings prepared',done:false,due:'Aug 12',dueIso:'2026-08-12'},
      {id:'c2',side:'02s',label:'Submittal package issued to GC',done:false,due:'Aug 14',dueIso:'2026-08-14',blocking:true},
      {id:'c3',side:'02s',label:'Factory witness test scheduled',done:false,due:'Sep 15'},
      {id:'c4',side:'02s',label:'Delivery window confirmed',done:false,due:'Oct 1'},
      {id:'g1',side:'gc',label:'EOR submittal review (14-day clock)',done:false,blocking:true,blockedBy:'c2',note:'Starts when 02S issues submittal'},
      {id:'g2',side:'gc',label:'Foundation ready confirmation',done:false,due:'Oct 15',dueIso:'2026-10-15'},
      {id:'g3',side:'gc',label:'Interconnect sequence w/ electrical sub',done:false,due:'Oct 20'},
      {id:'g4',side:'gc',label:'Crane access window reserved',done:false,due:'Oct 28'}
    ]},
    'ORD-3108':{node:'prefab-skid',tasks:[
      {id:'c1',side:'02s',label:'Shop drawings approved',done:true,date:'Jul 5'},
      {id:'c2',side:'02s',label:'Fabrication active',done:true,date:'Jul 10'},
      {id:'c3',side:'02s',label:'Factory witness test scheduled · Aug 20',done:false,due:'Aug 20'},
      {id:'c4',side:'02s',label:'Delivery confirmed · Sep 1',done:false,due:'Sep 1'},
      {id:'g1',side:'gc',label:'Submittal on file',done:true,date:'Jul 5'},
      {id:'g2',side:'gc',label:'Pad / foundation ready by Aug 25',done:false,due:'Aug 25'},
      {id:'g3',side:'gc',label:'Receiving inspection team identified',done:false,due:'Aug 28'},
      {id:'g4',side:'gc',label:'Installation contractor confirmed',done:false,due:'Aug 28'}
    ]},
    // ── PROF SERVICES ─────────────────────────────────────────────────────
    'ORD-3009':{node:'profservices-survey',tasks:[
      {id:'c1',side:'02s',label:'Survey crew assigned',done:true,date:'Apr 18'},
      {id:'c2',side:'02s',label:'Survey complete · 2-day window',done:true,date:'Apr 19'},
      {id:'c3',side:'02s',label:'Survey report issued',done:true,date:'Apr 22'},
      {id:'c4',side:'02s',label:'Final billing closed',done:true,date:'May 1'},
      {id:'g1',side:'gc',label:'Site access granted for survey',done:true,date:'Apr 18'},
      {id:'g2',side:'gc',label:'Survey report reviewed',done:true,date:'Apr 24'},
      {id:'g3',side:'gc',label:'Survey data incorporated into drawings',done:true,date:'May 5'},
      {id:'g4',side:'gc',label:'Cost allocated to cost code',done:true,date:'May 10'}
    ]},
    'ORD-3090':{node:'profservices-inspection',tasks:[
      {id:'c1',side:'02s',label:'Inspector assigned (3rd party)',done:true,date:'Apr 1'},
      {id:'c2',side:'02s',label:'Inspection schedule confirmed',done:true,date:'Apr 5'},
      {id:'c3',side:'02s',label:'Weekly reports filed to date',done:true,date:'Jul 27'},
      {id:'c4',side:'02s',label:'Phase completion sign-off pending concrete close',done:false,due:'Sep 30'},
      {id:'g1',side:'gc',label:'Daily work notifications to inspector',done:true,date:'Jul 27'},
      {id:'g2',side:'gc',label:'Weekly inspection reports signed',done:true,date:'Jul 25'},
      {id:'g3',side:'gc',label:'Compliance docs archived',done:true,date:'Jul 25'},
      {id:'g4',side:'gc',label:'Phase closeout report to AHJ',done:false,due:'Oct 1'}
    ]},
    'ORD-3091':{node:'profservices-engineering',tasks:[
      {id:'c1',side:'02s',label:'RFI queue monitored (24h SLA)',done:true,date:'Jul 27'},
      {id:'c2',side:'02s',label:'Jul RFI report compiled',done:true,date:'Jul 31'},
      {id:'c3',side:'02s',label:'Aug scope confirmation',done:false,due:'Aug 1',dueIso:'2026-08-01'},
      {id:'c4',side:'02s',label:'Field guidance documentation current',done:false,due:'Aug 4',dueIso:'2026-08-04'},
      {id:'g1',side:'gc',label:'RFI log maintained + current',done:true,date:'Jul 27'},
      {id:'g2',side:'gc',label:'RFIs submitted with 48h notice',done:true,date:'Jul 27'},
      {id:'g3',side:'gc',label:'Field conditions documented (photos)',done:true,date:'Jul 27'},
      {id:'g4',side:'gc',label:'Aug priority RFI list submitted',done:false,due:'Aug 1',dueIso:'2026-08-01'}
    ]},
    'ORD-3092':{node:'profservices-enviro',tasks:[
      {id:'c1',side:'02s',label:'Monitoring stations placed',done:true,date:'Jun 5'},
      {id:'c2',side:'02s',label:'Baseline readings established',done:true,date:'Jun 10'},
      {id:'c3',side:'02s',label:'Jul monitoring report compiled',done:true,date:'Jul 31'},
      {id:'c4',side:'02s',label:'Aug monitoring schedule confirmed',done:false,due:'Aug 4',dueIso:'2026-08-04'},
      {id:'g1',side:'gc',label:'SWPPP compliance current',done:true,date:'Jul 27'},
      {id:'g2',side:'gc',label:'Site disturbance notifications sent',done:true,date:'Jul 27'},
      {id:'g3',side:'gc',label:'Weekly coordination meeting held',done:true,date:'Jul 27'},
      {id:'g4',side:'gc',label:'Stormwater BMP inspection · Aug 1',done:false,due:'Aug 1',dueIso:'2026-08-01'}
    ]},
    'ORD-3095':{node:'profservices-owner-rep',tasks:[
      {id:'c1',side:'02s',label:'Jun monthly report submitted',done:true,date:'Jul 5'},
      {id:'c2',side:'02s',label:'Jul site visit conducted',done:true,date:'Jul 22'},
      {id:'c3',side:'02s',label:'Aug scope confirmed (2 FTE)',done:true,date:'Jul 25'},
      {id:'c4',side:'02s',label:'Jul billing submitted',done:false,due:'Aug 5',dueIso:'2026-08-05'},
      {id:'g1',side:'gc',label:'Monthly progress report reviewed · Jul',done:false,due:'Aug 1',dueIso:'2026-08-01'},
      {id:'g2',side:'gc',label:'Field access confirmed for Aug site visit',done:false,due:'Aug 6',dueIso:'2026-08-06'},
      {id:'g3',side:'gc',label:'RFI copies to DNV current',done:true,date:'Jul 25'},
      {id:'g4',side:'gc',label:'Cost code review with DNV · Aug',done:false,due:'Aug 12',dueIso:'2026-08-12'}
    ]},
    'ORD-3096':{node:'profservices-geo',tasks:[
      {id:'c1',side:'02s',label:'Terracon 3 FTE assigned',done:true,date:'Jun 1'},
      {id:'c2',side:'02s',label:'Monitoring schedule issued',done:true,date:'Jun 5'},
      {id:'c3',side:'02s',label:'Report distribution confirmed',done:true,date:'Jun 5'},
      {id:'c4',side:'02s',label:'Final reporting + demob plan',done:false,due:'Aug 18',dueIso:'2026-08-18'},
      {id:'g1',side:'gc',label:'Site access granted for instrumentation',done:true,date:'Jun 3'},
      {id:'g2',side:'gc',label:'Week 12 report reviewed + signed',done:false,due:'Jul 22',dueIso:'2026-07-22',blocking:true,overdue:true},
      {id:'g3',side:'gc',label:'Phase closeout authorization',done:false,due:'Aug 18',dueIso:'2026-08-18',blocking:true},
      {id:'g4',side:'gc',label:'Regulatory submission',done:false,due:'Aug 25',dueIso:'2026-08-25'}
    ]}
  };
  var ORDER_NOTES={
    'ORD-3042':[
      {who:'Marcus Webb · 02S',when:'May 18',text:'Yard cleared for departure. ETA May 20, 6 AM. Heavy haul permit confirmed.'},
      {who:'Dana Reyes · You',when:'May 17',text:'Site crew briefed on delivery window. North gate access road secured.'},
      {who:'02S Dispatch',when:'May 16',text:'Delivery rescheduled to May 20 due to yard delay at origin. Carrier notified.'}
    ],
    'ORD-3051':[
      {who:'02S Ops',when:'May 22',text:'Both crew trucks active daily. Fuel logs confirm 8-10 hrs use per day per unit.'},
      {who:'Dana Reyes · You',when:'May 20',text:'Confirmed rental extension through Oct 31. Civil support scope continuing.'}
    ],
    'ORD-3054':[
      {who:'02S Logistics',when:'Aug 1',text:'Crane assembly confirmed on site Aug 3 per schedule. Rigger crew en route.'},
      {who:'Dana Reyes · You',when:'Jul 30',text:'North gate reserved. Coordinated with structural foreman for Aug 3 mob window.'}
    ],
    'ORD-3093':[
      {who:'Dana Reyes · You',when:'Jun 1',text:'All 6 pile drivers delivered and cleared. Sector 1 layout staked. Crew starting A3010 piles today.'},
      {who:'02S Ops',when:'Jun 3',text:'Pile production at 42 piles/day — tracking 4 days ahead of A3010 schedule. Sector 2 mob will follow in August.'}
    ],
    'ORD-3091':[
      {who:'Dana Reyes · You',when:'Jun 5',text:'3 RFIs on steel connections responded this week. Avg turnaround 18 hrs. Structural team responsive.'},
      {who:'02S Ops',when:'Jun 10',text:'June billing issued — BILL-9036 includes 32 hrs RFI support and 8 drawing markups. Confirm approval.'}
    ],
    'ORD-3092':[
      {who:'02S Environmental',when:'Jun 2',text:'Baseline monitoring in place for dust, noise, and stormwater. Weekly reports auto-filed to project team.'},
      {who:'Dana Reyes · You',when:'Jul 2',text:'June monitoring report reviewed and approved. No exceedances. BILL-9037 approved.'}
    ],
    'ORD-3070':[
      {who:'Marcus Webb · 02S',when:'May 20',text:'Excavator arrived on site 6:22 AM. Delivery receipt signed by site superintendent. Unit inspected and cleared.'},
      {who:'Dana Reyes · You',when:'May 19',text:'North gate access confirmed. Road bearing verified at 55,000 lb. Superintendent on site for 6 AM window.'}
    ],
    'ORD-3071':[
      {who:'02S Logistics',when:'Jul 28',text:'Route permits approved for Aug 3 crane mob. 4-axle lowboy + 2 escorts confirmed. Departure 4:30 AM.'},
      {who:'Dana Reyes · You',when:'Jul 30',text:'Laydown A cleared and mat prepped for crane assembly. Structural foreman on site Aug 3 for rigging supervision.'}
    ]
  };

  var EQ_ORD_MAP={'e1':'ORD-3110','e2':'ORD-3111','e3':'ORD-3042','e4':'ORD-3112','e5':'ORD-3113','e6':'ORD-3114','e7':'ORD-3093','e8':'ORD-3115','e9':'ORD-3029','e10':'ORD-3121','e11':'ORD-3122'};
  var EQ_LINE_NOTES={
    'e3':[
      {who:'Dana Reyes · You',when:'May 10',text:'Submitted Phase 1 earthwork package — 6 excavators across A2010/A2020. Rate confirmed at $13,500/mo from 02S rate card.'},
      {who:'02S Ops',when:'May 12',text:'Phase 1 earthwork allocation confirmed. ORD-3042 issued. Excavator delivering May 20 per heavy haul schedule.'}
    ],
    'e7':[
      {who:'Dana Reyes · You',when:'May 10',text:'Submitted Phase 2 pile driving package — 6 hydraulic pile drivers for Sectors 1+2. Start tied to A3010 activity.'},
      {who:'02S Ops',when:'May 11',text:'Pile driver package received. Equipment reserved from 02S fleet for Jun 2026 mob. Confirming logistics window.'}
    ],
    'e13':[
      {who:'Dana Reyes · You',when:'Aug 2',text:'Increased qty 48 → 64 after Sector 2 module footprint expanded per rev. drawings. Draft — not yet submitted.'},
      {who:'02S Admin',when:'Aug 3',text:'Noted. Confirm final qty once Sector 2 layout is locked before submitting to 02S.'}
    ],
    'e15':[
      {who:'Dana Reyes · You',when:'Aug 2',text:'Added 230T crawler crane for BESS block install (A6010). Not in rate card — pending 02S specialty quote. Jan–Mar 2027.'},
      {who:'02S Admin',when:'Aug 3',text:'Crawler crane RFQ issued to 3 specialty vendors. Expect quotes within 5 business days.'}
    ]
  };
  var DP_LINE_NOTES={
    'prefab-2':[
      {who:'Dana Reyes · You',when:'Jul 20',text:'Submittal package sent for BESS e-houses — 2 units, Nov 1 need-on-site. Approval needed this week to protect Nov energization.'},
      {who:'02S Prefab',when:'Jul 21',text:'Submittal received. Engineering review in progress — expect approval or RFI within 5 business days.'}
    ],
    'procurement-3':[
      {who:'Dana Reyes · You',when:'Jul 20',text:'Tone shear wrenches at-risk — order-by Jul 18 has passed. Need to expedite PO now or risk Aug 15 bolt tensioning window.'},
      {who:'02S Procurement',when:'Jul 21',text:'Expedite request acknowledged. Emergency PO being issued — 4-week rush delivery. Confirm receipt by Aug 10.'}
    ],
    'logistics-0':[
      {who:'02S Logistics',when:'May 18',text:'Heavy haul permit confirmed for May 20 delivery. Lowboy dispatched from depot. ETA site 6:00 AM.'},
      {who:'Dana Reyes · You',when:'May 17',text:'North gate cleared and access road inspected. Superintendent will sign delivery receipt on arrival.'}
    ]
  };

  var BILLS=[
    {id:'BILL-9048',order:'ORD-3110',product:'Generator 125 kW \u00d7 16 \u2014 Jul 2026',amt:67200,cost:'0100-5000-0000-0001 \u00b7 Power & Temp',status:'Pending',date:'Aug 1',day:4,notes:0,
      charges:[
        {desc:'Generator 125 kW monthly rental \u00d7 16 units',qty:16,rate:4200,amt:67200,cost:'0100-5000-0000-0001 \u00b7 Power & Temp'}
      ]},
    {id:'BILL-9049',order:'ORD-3111',product:'Light towers \u00d7 26 \u2014 Jul 2026',amt:31200,cost:'0100-5000-0000-0001 \u00b7 Power & Temp',status:'Pending',date:'Aug 1',day:4,notes:0,
      charges:[
        {desc:'Light tower monthly rental \u00d7 26 units',qty:26,rate:1200,amt:31200,cost:'0100-5000-0000-0001 \u00b7 Power & Temp'}
      ]},
    {id:'BILL-9050',order:'ORD-3112',product:'Dozer D6 \u00d7 12 \u2014 Jul 2026',amt:194400,cost:'3100-2000-0000-0001 \u00b7 Mass Grading',status:'Pending',date:'Aug 1',day:4,notes:0,
      charges:[
        {desc:'Dozer D6 monthly rental \u00d7 12 units',qty:12,rate:16200,amt:194400,cost:'3100-2000-0000-0001 \u00b7 Mass Grading'}
      ]},
    {id:'BILL-9051',order:'ORD-3113',product:'Motor grader \u00d7 6 \u2014 final (Apr\u2013Aug)',amt:112000,cost:'3100-2000-0000-0001 \u00b7 Mass Grading',status:'Finalized',date:'Aug 7',audit:'J. Torres \u00b7 approved Aug 6',
      charges:[
        {desc:'Motor grader rental \u00d7 6 units \u00d7 4 months (Apr\u2013Jul)',qty:24,rate:14000,amt:84000,cost:'3100-2000-0000-0001 \u00b7 Mass Grading'},
        {desc:'Partial Aug (5 days before off-rent)',qty:6,rate:2333,amt:14000,cost:'3100-2000-0000-0001 \u00b7 Mass Grading'},
        {desc:'Return inspection fee',qty:1,rate:14000,amt:14000,cost:'3100-2000-0000-0001 \u00b7 Mass Grading'}
      ]},
    {id:'BILL-9052',order:'ORD-3114',product:'Compaction roller \u00d7 12 \u2014 Jul 2026',amt:81600,cost:'3100-2000-0000-0001 \u00b7 Mass Grading',status:'Pending',date:'Aug 1',day:4,notes:0,
      charges:[
        {desc:'Compaction roller monthly rental \u00d7 12 units',qty:12,rate:6800,amt:81600,cost:'3100-2000-0000-0001 \u00b7 Mass Grading'}
      ]},
    {id:'BILL-9053',order:'ORD-3115',product:'Hydraulic pile driver \u00d7 6 Sector 2 \u2014 Aug 2026',amt:207000,cost:'3100-6300-0000-0001 \u00b7 Solar pile',status:'Pending',date:'Sep 1',day:1,notes:0,
      charges:[
        {desc:'Hydraulic pile driver monthly rental \u00d7 6 units',qty:6,rate:34500,amt:207000,cost:'3100-6300-0000-0001 \u00b7 Solar pile'}
      ]},
    {id:'BILL-9040',order:'ORD-3095',product:"Owner's engineer / IE support — Jul 2026",amt:28000,cost:'0100-0100-0000-0001 \u00b7 General conditions',status:'Pending',date:'Aug 1',day:4,notes:0,
      charges:[
        {desc:'IE / owner\'s rep support — 2 FTE Jul 2026',qty:2,rate:14000,amt:28000,cost:'0100-0100-0000-0001 \u00b7 General conditions'}
      ]},
    {id:'BILL-9041',order:'ORD-3096',product:'Geotechnical monitoring — Jul 2026',amt:18000,cost:'0200-0320-0000-0001 \u00b7 Site earthwork',status:'Pending',date:'Aug 1',day:4,notes:0,
      charges:[
        {desc:'Geotechnical monitoring — 3 FTE Jul 2026',qty:3,rate:6000,amt:18000,cost:'0200-0320-0000-0001 \u00b7 Site earthwork'}
      ]},
    {id:'BILL-9042',order:'ORD-3092',product:'Environmental / SWPPP monitoring — final',amt:9000,cost:'0100-0100-0000-0001 \u00b7 General conditions',status:'Finalized',date:'Jun 2',audit:'Auto-finalized Jun 2',
      charges:[
        {desc:'Environmental monitoring — SWCA 1 FTE final month',qty:1,rate:9000,amt:9000,cost:'0100-0100-0000-0001 \u00b7 General conditions'}
      ]},
    {id:'BILL-9043',order:'ORD-3071',product:'Tower crane mobilization haul',amt:18500,cost:'26-330 \u00b7 BESS & Substation',status:'Pending',date:'Aug 5',day:3,notes:0,
      charges:[
        {desc:'Lowboy transport — crane base & counterweights',qty:1,rate:12000,amt:12000,cost:'26-330 \u00b7 BESS & Substation'},
        {desc:'Escort vehicles (3) — permitted oversize route',qty:3,rate:1500,amt:4500,cost:'26-330 \u00b7 BESS & Substation'},
        {desc:'Permit & route survey fees',qty:1,rate:2000,amt:2000,cost:'26-330 \u00b7 BESS & Substation'}
      ]},
    {id:'BILL-9044',order:'ORD-3101',product:'Battery packs 20v M18 — 100 units',amt:11000,cost:'0100-0100-0000-0001 \u00b7 General conditions',status:'Finalized',date:'Jul 3',audit:'Auto-finalized Jul 5',
      charges:[
        {desc:'Milwaukee M18 battery packs — 100 units',qty:100,rate:110,amt:11000,cost:'0100-0100-0000-0001 \u00b7 General conditions'}
      ]},
    {id:'BILL-9045',order:'ORD-3102',product:'Quad charging banks 12-bay — 20 units',amt:14000,cost:'0100-0100-0000-0001 \u00b7 General conditions',status:'Finalized',date:'Jul 5',audit:'Auto-finalized Jul 7',
      charges:[
        {desc:'12-bay charging stations — 20 units installed',qty:20,rate:700,amt:14000,cost:'0100-0100-0000-0001 \u00b7 General conditions'}
      ]},
    {id:'BILL-9046',order:'ORD-3104',product:'Angle grinders cordless 20v — 16 units',amt:4000,cost:'0100-0100-0000-0001 \u00b7 General conditions',status:'Finalized',date:'Aug 2',audit:'Auto-finalized Aug 2',
      charges:[
        {desc:'Cordless angle grinders 20v — 16 units',qty:16,rate:250,amt:4000,cost:'0100-0100-0000-0001 \u00b7 General conditions'}
      ]},
    {id:'BILL-9047',order:'ORD-3106',product:'L2 headwall assemblies — 8 units',amt:147000,cost:'2600-0540-0000-0001 \u00b7 Module install',status:'Finalized',date:'Jul 22',audit:'J. Torres \u00b7 approved Jul 21',
      charges:[
        {desc:'L2 headwall fabrication — 8 units',qty:8,rate:16200,amt:129600,cost:'2600-0540-0000-0001 \u00b7 Module install'},
        {desc:'Shop drawings & engineering stamp',qty:1,rate:9400,amt:9400,cost:'2600-0540-0000-0001 \u00b7 Module install'},
        {desc:'Delivery & crane-in coordination',qty:1,rate:8000,amt:8000,cost:'2600-0540-0000-0001 \u00b7 Module install'}
      ]},
    {id:'BILL-9012',order:'ORD-3031',product:'Scissor Lift — 32 ft (2)',amt:4820,cost:'09 · Finishes',status:'Approved',date:'May 10',day:8,anomaly:'12% above order est.',reason:'Idle-day overage — 4 days no badge-ins',notes:2,
charges:[
  {desc:'Daily rental rate × 2 units × 10 days',qty:20,rate:220,amt:4400,cost:'09 · Finishes'},
  {desc:'Damage inspection & site incident report fee',qty:1,rate:420,amt:420,cost:'09 · Finishes'}
]},
    {id:'BILL-9015',order:'ORD-3042',product:'Excavator — 20T + operator',amt:38400,cost:'03 · Concrete',status:'Finalized',date:'May 12',audit:'J. Torres · approved Jun 8',
charges:[
  {desc:'Daily rate — 20T excavator + operator',qty:16,rate:2250,amt:36000,cost:'03 · Concrete'},
  {desc:'Fuel surcharge',qty:1,rate:2400,amt:2400,cost:'03 · Concrete'}
]},
    {id:'BILL-9016',order:'ORD-3020',product:'Rigging & lift hardware',amt:4980,cost:'05 · Metals',status:'Approved',date:'May 13',day:2,notes:1,
charges:[
  {desc:'Rigging hardware — daily rental',qty:7,rate:680,amt:4760,cost:'05 · Metals'},
  {desc:'Setup / teardown labor',qty:1,rate:220,amt:220,cost:'05 · Metals'}
]},
    {id:'BILL-9020',order:'ORD-3060',product:'MEP Pipe Rack Module (3)',amt:36600,cost:'22 · Plumbing',status:'Approved',date:'Jun 1',day:3,notes:1,
      charges:[
        {desc:'Fabrication — 3 module assemblies',qty:3,rate:9800,amt:29400,cost:'22 · Plumbing'},
        {desc:'Shop drawings & engineering stamp',qty:1,rate:4200,amt:4200,cost:'01 · General'},
        {desc:'Delivery & crane-in coordination',qty:1,rate:3000,amt:3000,cost:'22 · Plumbing'}
      ]},
    {id:'BILL-9021',order:'ORD-3070',product:'Heavy haul — excavator delivery',amt:3200,cost:'03 · Concrete',status:'Finalized',date:'May 21',audit:'J. Torres · approved May 27',
      charges:[
        {desc:'Lowboy transport — 85-mile haul',qty:1,rate:2400,amt:2400,cost:'03 · Concrete'},
        {desc:'Escort vehicle (required by permit)',qty:1,rate:800,amt:800,cost:'03 · Concrete'}
      ]},
    {id:'BILL-9022',order:'ORD-3090',product:'Special inspections — concrete (May)',amt:8400,cost:'03 · Concrete',status:'Approved',date:'Jun 1',day:5,notes:0,
      charges:[
        {desc:'IBC §1705 inspection — 21 days',qty:21,rate:350,amt:7350,cost:'03 · Concrete'},
        {desc:'Inspection report preparation',qty:3,rate:350,amt:350,cost:'01 · General'},
        {desc:'Travel & expense reimbursement',qty:1,rate:700,amt:700,cost:'03 · Concrete'}
      ]},
    {id:'BILL-9023',order:'ORD-3080',product:'PPE kit — crew of 20',amt:1700,cost:'01 · General',status:'Approved',date:'May 5',day:1,notes:0,
      charges:[
        {desc:'Hard hats, vests, gloves — 20 sets',qty:20,rate:65,amt:1300,cost:'01 · General'},
        {desc:'Safety glasses & face shields',qty:20,rate:20,amt:400,cost:'01 · General'}
      ]},
    {id:'BILL-9025',order:'ORD-3091',product:'Structural special inspection — Jun 2026',amt:14400,cost:'3100-6200-0000-0001 · Solar pile',status:'Approved',date:'Jul 3',day:5,notes:1,
      charges:[
        {desc:'IBC §1705 special inspection — 24 days',qty:24,rate:500,amt:12000,cost:'3100-6200-0000-0001 · Solar pile'},
        {desc:'Inspection report preparation',qty:3,rate:600,amt:1800,cost:'3100-6200-0000-0001 · Solar pile'},
        {desc:'Travel & expense reimbursement',qty:3,rate:200,amt:600,cost:'3100-6200-0000-0001 · Solar pile'}
      ]},
    {id:'BILL-9035',order:'ORD-3093',product:'Hydraulic pile driver x6 (Jun)',amt:207000,cost:'3100-6300-0000-0001 · Solar pile',status:'Approved',date:'Jul 1',day:3,notes:0,
      charges:[
        {desc:'Monthly rental — 20T pile driver x6 units',qty:6,rate:34500,amt:207000,cost:'3100-6300-0000-0001 · Solar pile'}
      ]},
    {id:'BILL-9054',order:'ORD-3029',product:'Telehandler — 10K · Jul 2026',amt:6180,cost:'05 · Metals',status:'Pending',date:'Aug 1',day:4,notes:0,
      charges:[{desc:'Telehandler 10K monthly rental · Jul 2026',qty:1,rate:5800,amt:5800,cost:'05 · Metals'},{desc:'Fuel surcharge',qty:1,rate:380,amt:380,cost:'05 · Metals'}]},
    {id:'BILL-9008',order:'ORD-3029',product:'Telehandler — 10K · May 2026',amt:6180,cost:'05 · Metals',status:'Finalized',date:'May 6',audit:'J. Torres · approved May 6'},
    {id:'BILL-9001',order:'ORD-2998',product:'SUV AWD',amt:3900,cost:'01 · General',status:'Finalized',date:'Apr 30',audit:'Auto-finalized Apr 30'},
    {id:'BILL-8994',order:'ORD-3020',product:'Rigging & lift hardware',amt:1180,cost:'05 · Metals',status:'Finalized',date:'Apr 25',audit:'M. Chen · approved Apr 24',co:'CO-001'},
    {id:'BILL-8987',order:'ORD-3009',product:'Site survey crew',amt:4200,cost:'01 · General',status:'Finalized',date:'Apr 20',audit:'Auto-finalized Apr 20',co:'CO-002'},
    {id:'BILL-8990',order:'ORD-3009',product:'Site survey crew — 2 days',amt:6200,cost:'01 · General',status:'Finalized',date:'Apr 22',audit:'M. Chen · approved Apr 22'},
    {id:'BILL-8985',order:'ORD-3080',product:'PPE kit — initial order',amt:850,cost:'01 · General',status:'Finalized',date:'May 3',audit:'Auto-finalized May 3'},
    {id:'BILL-9039',order:'ORD-3072',product:'Material staging & drayage — Jun/Jul 2026',amt:8640,cost:'0100-0100-0000-0001 · General conditions',status:'Pending',date:'Aug 1',day:2,notes:0,
      charges:[
        {desc:'Laydown Yard C — monthly staging fee',qty:2,rate:3600,amt:7200,cost:'0100-0100-0000-0001 · General conditions'},
        {desc:'Drayage / material movement — 8 moves',qty:8,rate:180,amt:1440,cost:'0100-0100-0000-0001 · General conditions'}
      ]},
    
    {id:'BILL-9055',order:'ORD-3108',product:'Skid-mounted pump assemblies — fabrication deposit',amt:18400,cost:'2600-0540-0000-0001 · Module install',status:'Approved',date:'Jul 15',day:4,notes:0,
      charges:[{desc:'Fabrication deposit — 50% of contract',qty:1,rate:18400,amt:18400,cost:'2600-0540-0000-0001 · Module install'}]},
    {id:'BILL-9056',order:'ORD-3051',product:'¾-Ton Crew Truck × 2 — Jul 2026',amt:4800,cost:'01-540 · General conditions',status:'Pending',date:'Aug 1',day:3,notes:0,
      charges:[
        {desc:'¾-ton crew truck monthly rental × 2 units',qty:2,rate:2400,amt:4800,cost:'01-540 · General conditions'}
      ]},
    {id:'BILL-8982',order:'ORD-3070',product:'Lowboy staging — depot fee',amt:420,cost:'03 · Concrete',status:'Finalized',date:'May 19',audit:'J. Torres · approved May 19',co:'CO-001'}
  ];
  var CHANGE_ORDERS=[
    {id:'CO-001',desc:'Crane extension — BESS mobilization delay',status:'Approved',amt:148000,costCode:'26-0330-CO001'},
    {id:'CO-002',desc:'Earthwork scope expansion — unforeseen subsurface conditions',status:'Pending',amt:62000,costCode:'31-0620-CO002'}
  ];
  var _billExCO='';
  var COST_CODES=['01 · General','03 · Concrete','05 · Metals','09 · Finishes'];
  function stageStatus(o){var arr=_stageArr(o);return arr[Math.min(o.stage,arr.length-1)];}

  function ordClearDates(){ var a=document.getElementById('ordFrom'); if(a)a.value=''; var b=document.getElementById('ordTo'); if(b)b.value=''; renderOrders(); }
  /* ═══════════ WEEKLY ON-RENT RECERTIFICATION ═══════════ */
  var recertPick={};
  function recertItems(){ var today='2026-07-22'; return ORDERS.filter(function(o){return o.recert==='pending'&&o.anticipatedOff&&o.anticipatedOff<today;}); }
  function openRecert(){
    var items=recertItems();
    if(!items.length){ toast('Nothing pending \u2014 all on-rent items are recertified for the week'); return; }
    var ns=CURRENT==='ns';
    recertPick={};
    items.forEach(function(o){ recertPick[o.id]=(ns && o.nsReco && o.nsReco.rec==='return') ? 'off' : 'keep'; });
    openModal('Overdue off-rent exceptions', recertBody());
  }
  function recertBody(){
    var items=recertItems(), ns=CURRENT==='ns', keep=0,off=0;
    items.forEach(function(o){ if(recertPick[o.id]==='off')off++; else keep++; });
    var star='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6 4.5 2.3 7.1L12 16.9 5.3 21l2.3-7.1-6-4.5h7.6z"/></svg>';
    var h='<div class="rc-sub">Hercules Solar + BESS \u00b7 '+items.length+' item'+(items.length===1?'':'s')+' past anticipated off-rent without a return request</div>';
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
    if(sub) sub.textContent = n ? (n+' overdue off-rent \u2014 anticipated return date passed, no request filed.') : 'No overdue off-rents \u2014 all on-rent items within their anticipated window.';
    var card=document.getElementById('dashRecert'); if(card) card.classList.toggle('rc-done', n===0);
  }
  function renderPlanRing(){
    var mount=gel('dashPlanRing'); if(!mount)return;
    var plan=0,adhoc=0;
    ORDERS.forEach(function(o){ if(o.plan)plan++; else adhoc++; });
    var total=plan+adhoc||1, pct=Math.round(plan/total*100);
    var r=28, circ=2*Math.PI*r, arc=circ*plan/total;
    var svg2='<svg width="72" height="72" viewBox="0 0 72 72" style="display:block;margin:0 auto 6px">'
      +'<circle cx="36" cy="36" r="'+r+'" fill="none" stroke="var(--g200)" stroke-width="10"/>'
      +'<circle cx="36" cy="36" r="'+r+'" fill="none" stroke="var(--success)" stroke-width="10" '
      +'stroke-dasharray="'+arc.toFixed(1)+' '+circ.toFixed(1)+'" stroke-linecap="round" transform="rotate(-90 36 36)"/>'
      +'<text x="36" y="41" text-anchor="middle" font-size="13" font-weight="700" fill="var(--charcoal)">'+pct+'%</text>'
      +'</svg>';
    mount.innerHTML=svg2
      +'<div class="actt">Plan vs. ad-hoc</div>'
      +'<div class="acts">'+plan+' of '+total+' orders sourced from the demand plan</div>'
      +'<button class="btn" onclick="go(\'orders\')">View orders<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>';
    // also populate the vitals row cards
    var r2=16, circ2=2*Math.PI*r2, arc2=(circ2*plan/total).toFixed(1);
    var miniRingHtml='<svg width="42" height="42" viewBox="0 0 42 42" style="display:block;margin:4px 0 6px"><circle cx="21" cy="21" r="'+r2+'" fill="none" stroke="var(--g150)" stroke-width="6"/><circle cx="21" cy="21" r="'+r2+'" fill="none" stroke="var(--success)" stroke-width="6" stroke-dasharray="'+arc2+' '+circ2.toFixed(1)+'" stroke-linecap="round" transform="rotate(-90 21 21)"/><text x="21" y="25" text-anchor="middle" font-size="10" font-weight="700" fill="var(--charcoal)">'+pct+'%</text></svg>';
    var pv=gel('vitalPlanPct'); if(pv) pv.innerHTML=miniRingHtml;
    var ps=gel('vitalPlanSub'); if(ps) ps.textContent=plan+' of '+total+' orders from plan';
    var pvn=gel('vitalPlanPctNS'); if(pvn) pvn.innerHTML=miniRingHtml;
    var psn=gel('vitalPlanSubNS'); if(psn) psn.textContent=plan+' of '+total+' orders from plan';
  }
  function renderGlance(){
    var deliveries=0,offrents=0,pendingBills=0;
    var lgRows=(DP['logistics']&&DP['logistics'].rows)||[];
    lgRows.forEach(function(r){if(r.state==='Scheduled'||r.state==='Requested')deliveries++;});
    var today=new Date('2026-08-03');
    if(typeof EQ_LINES!=='undefined'){EQ_LINES.forEach(function(l){var s=eqLineState(l);if(s==='offrent'){offrents++;}else if(s==='onrent'){var mo=l.to;var mMap={Jan:'01',Feb:'02',Mar:'03',Apr:'04',May:'05',Jun:'06',Jul:'07',Aug:'08',Sep:'09',Oct:'10',Nov:'11',Dec:'12'};var toDate=new Date('20'+mo.slice(0,2)+'-'+(mMap[mo.slice(3)]||'01')+'-28');var diff=(toDate-today)/(1000*60*60*24);if(diff>=0&&diff<=30)offrents++;}});}
    if(typeof BILLS!=='undefined'){BILLS.forEach(function(b){if(b.status==='Pending'||b.status==='Open'||b.status==='Awaiting approval')pendingBills++;});}
    var dEl=document.getElementById('glance-deliveries');var oEl=document.getElementById('glance-offrents');var bEl=document.getElementById('glance-bills');
    if(dEl)dEl.textContent=deliveries||0;if(oEl)oEl.textContent=offrents||0;if(bEl)bEl.textContent=pendingBills||0;
  }
  function openMarginPlanModal(){
    var gmPlan=10.9,gmCurr=10.4,gmProj=16780000;
    var GP=[
      {l:'Equipment',     p:18.0,a:15.2,note:'Re-rent crane premium on BESS — primary gap driver'},
      {l:'Prefab',        p:14.0,a:13.5,note:'Headwall fabrication slightly behind forecast'},
      {l:'Logistics',     p:12.0,a:12.4,note:''},
      {l:'Procurement',   p:8.0, a:7.8, note:''},
      {l:'Prof. services',p:22.0,a:21.0,note:''}
    ];
    var gt='1fr 72px 72px 84px';
    var b='<div style="background:var(--g50);border-radius:7px;padding:10px 13px;margin-bottom:14px">'
      +'<div style="font-size:12.5px;font-weight:600;color:var(--g900)">Hercules Solar + BESS</div>'
      +'<div style="font-size:12px;color:var(--g500);margin-top:2px">Plan '+gmPlan+'% GM &rarr; actual '+gmCurr+'% &mdash; '
      +fmtBig(Math.round((gmPlan-gmCurr)/100*gmProj))+' gap to plan</div></div>';
    b+='<div style="display:grid;grid-template-columns:'+gt+';font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:var(--g500);padding-bottom:5px;border-bottom:1px solid var(--g200);margin-bottom:2px">'
      +'<span>Pillar</span><span style="text-align:right">Plan %</span><span style="text-align:right">Actual %</span><span style="text-align:right">Variance</span></div>';
    GP.forEach(function(r){
      var v=(r.a-r.p).toFixed(1); var vtone=r.a<r.p-1?'var(--red)':r.a<r.p?'var(--warning)':'var(--success)';
      b+='<div style="display:grid;grid-template-columns:'+gt+';padding:8px 0;border-bottom:1px solid var(--g100);align-items:start">'
        +'<div><div style="font-size:13px;color:var(--g800);font-weight:500">'+r.l+'</div>'
        +(r.note?'<div style="font-size:11px;color:var(--g400);margin-top:2px">'+r.note+'</div>':'')
        +'</div>'
        +'<div style="font-size:13px;color:var(--g500);text-align:right;padding-top:2px">'+r.p.toFixed(1)+'%</div>'
        +'<div style="font-size:13px;font-weight:700;color:var(--g900);text-align:right;padding-top:2px">'+r.a.toFixed(1)+'%</div>'
        +'<div style="font-size:13px;font-weight:700;color:'+vtone+';text-align:right;padding-top:2px">'+(r.a>=r.p?'+':'')+v+' pts</div>'
        +'</div>';
    });
    b+='<div style="display:grid;grid-template-columns:'+gt+';padding:9px 0 2px">'
      +'<div style="font-size:13px;font-weight:700;color:var(--g900)">Total project GM</div>'
      +'<div style="font-size:13px;font-weight:700;color:var(--g500);text-align:right">'+gmPlan.toFixed(1)+'%</div>'
      +'<div style="font-size:14px;font-weight:700;color:var(--red);text-align:right">'+gmCurr.toFixed(1)+'%</div>'
      +'<div style="font-size:14px;font-weight:700;color:var(--red);text-align:right">−'+(gmPlan-gmCurr).toFixed(1)+' pts</div>'
      +'</div>';
    b+='<div style="margin-top:12px;padding:9px 11px;background:var(--g50);border-radius:6px;font-size:12px;color:var(--g600)">'
      +'<b style="color:var(--g800)">Enterprise contribution:</b> '
      +fmtBig(Math.round(gmCurr/100*gmProj))+' gross profit from this project ('
      +gmCurr+'% of $16.8M). McCarthy portfolio target is 15% GM — this project is currently 0.8 pts below that benchmark.</div>';
    b+='<div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal()">Close</button>'
      +'<button class="btn btn-dark" onclick="closeModal();go(\'billing\')">View cost breakdown &rarr;</button></div>';
    openModal('Margin plan — Hercules Solar + BESS', b);
  }
  function renderGMDashKPI(){
    var mount=document.getElementById('gmDashKPI'); if(!mount)return;
    var ns=CURRENT==='ns';
    var gmPlan=GM_PLAN,gmCurr=GM_CURR,gmProj=16780000;
    var gmTone=gmCurr<gmPlan-1?'bad':gmCurr<gmPlan?'warn':'ok';
    var gmColor={ok:'var(--success)',warn:'var(--warning)',bad:'var(--red)'}[gmTone];
    var view=window._gmDashView||'summary';
    var h='<div style="background:#fff;border:1px solid var(--g200);border-radius:var(--radius,8px);padding:13px 16px;margin-bottom:18px">'
      +'<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">'
      +'<div style="font-size:12px;font-weight:700;color:var(--g900)">Project gross margin</div>'
      +'<div style="display:flex;align-items:center;gap:8px">'
      +'<select style="font-size:11px;border:1px solid var(--g200);border-radius:4px;padding:2px 6px;color:var(--g700);background:#fff" onchange="window._gmDashView=this.value;renderGMDashKPI()">'
      +'<option value="summary"'+(view==='summary'?' selected':'')+'>Summary</option>'
      +'<option value="pillar"'+(view==='pillar'?' selected':'')+'>By pillar</option>'
      +'<option value="project"'+(view==='project'?' selected':'')+'>By project</option>'
      +'</select>'
      +'<button class="btn btn-ghost btn-sm" onclick="openMarginPlanModal()">Margin plan</button>'
      +'<button class="btn btn-ghost btn-sm" onclick="go(\'billing\')">Full detail</button>'
      +'</div>'
      +'</div>';
    if(view==='summary'){
      h+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:8px">'
        +'<div><div style="font-size:10px;color:var(--g500);margin-bottom:2px;text-transform:uppercase;letter-spacing:.04em">Margin plan target</div><div style="font-size:19px;font-weight:700;color:var(--charcoal)">'+gmPlan+'%</div><div style="font-size:11px;color:var(--g500)">set at project kickoff</div></div>'
        +'<div><div style="font-size:10px;color:var(--g500);margin-bottom:2px;text-transform:uppercase;letter-spacing:.04em">Current gross margin</div><div style="font-size:19px;font-weight:700;color:'+gmColor+'">'+gmCurr+'%</div><div style="font-size:11px;color:var(--g500)">'+fmtBig(Math.round((gmPlan-gmCurr)/100*gmProj))+' below plan</div></div>'
        +'<div><div style="font-size:10px;color:var(--g500);margin-bottom:2px;text-transform:uppercase;letter-spacing:.04em">Enterprise contribution</div><div style="font-size:19px;font-weight:700;color:var(--charcoal)">'+fmtBig(Math.round(gmCurr/100*gmProj))+'</div><div style="font-size:11px;color:var(--g500)">gross profit &middot; '+gmCurr+'% of $16.8M</div></div>'
        +'</div>';
    } else if(view==='pillar'){
      var _pm={'Equipment':'Equipment','Logistics':'Logistics','Professional services':'Prof. services','Procurement':'Procurement','Pre-fab':'Prefab'};
      var GP=(typeof mgPillarRoll==='function'&&typeof MARGIN_PILLARS!=='undefined')?MARGIN_PILLARS.map(function(pl){var r=mgPillarRoll(pl);return{l:_pm[pl]||pl,p:r.plan.pct,a:r.act.pct};}): [{l:'Equipment',p:18.0,a:15.2},{l:'Prefab',p:14.0,a:13.5},{l:'Logistics',p:12.0,a:12.4},{l:'Procurement',p:8.0,a:7.8},{l:'Prof. services',p:22.0,a:21.0}];
      h+='<div style="font-size:11px">'
        +'<div style="display:grid;grid-template-columns:1fr 60px 60px 60px;gap:4px 8px;padding:4px 0;border-bottom:1px solid var(--g100);color:var(--g500);font-weight:600;text-transform:uppercase;letter-spacing:.04em">'
        +'<span>Pillar</span><span style="text-align:right">Plan%</span><span style="text-align:right">Actual%</span><span style="text-align:right">Var</span></div>';
      GP.forEach(function(r){
        var tone=r.a<r.p-1?'var(--red)':r.a<r.p?'var(--warning)':'var(--success)';
        var vr=(r.a-r.p).toFixed(1);
        h+='<div style="display:grid;grid-template-columns:1fr 60px 60px 60px;gap:4px 8px;padding:5px 0;border-bottom:1px solid var(--g50)">'
          +'<span style="color:var(--g900)">'+r.l+'</span>'
          +'<span style="text-align:right;color:var(--g600)">'+r.p.toFixed(1)+'%</span>'
          +'<span style="text-align:right;font-weight:600;color:'+tone+'">'+r.a.toFixed(1)+'%</span>'
          +'<span style="text-align:right;color:'+tone+'">'+( r.a>=r.p?'+':'')+vr+'pp</span>'
          +'</div>';
      });
      h+='</div>';
    } else if(view==='project'){
      var _gt='1fr 60px 60px 60px';
      h+='<div style="font-size:11px">'
        +'<div style="display:grid;grid-template-columns:'+_gt+';gap:4px 8px;padding:4px 0;border-bottom:1px solid var(--g100);color:var(--g500);font-weight:600;text-transform:uppercase;letter-spacing:.04em">'
        +'<span>Project</span><span style="text-align:right">Plan%</span><span style="text-align:right">Actual%</span><span style="text-align:right">Var</span></div>';
      if(typeof MARGIN_PROJECTS!=='undefined'&&typeof mgProjRoll==='function'){
        MARGIN_PROJECTS.filter(function(p){return p==='Hercules Solar + BESS';}).forEach(function(p){
          var r=mgProjRoll(p);
          var pPct=r.plan.pct,aPct=r.act.pct;
          var tone=aPct<pPct-1?'var(--red)':aPct<pPct?'var(--warning)':'var(--success)';
          var vr=(aPct-pPct).toFixed(1);
          var sName=p==='Hercules Solar + BESS'?'Hercules':p==='Riverside Medical Center'?'Riverside':'Cimarron';
          h+='<div style="display:grid;grid-template-columns:'+_gt+';gap:4px 8px;padding:5px 0;border-bottom:1px solid var(--g50)">'
            +'<span style="color:var(--g900)">'+sName+'</span>'
            +'<span style="text-align:right;color:var(--g600)">'+pPct.toFixed(1)+'%</span>'
            +'<span style="text-align:right;font-weight:600;color:'+tone+'">'+aPct.toFixed(1)+'%</span>'
            +'<span style="text-align:right;color:'+tone+'">'+( aPct>=pPct?'+':'')+vr+'pp</span>'
            +'</div>';
        });
      }
      h+='</div>';
    }
    if(ns) h+='<div style="margin-top:8px;font-size:11.5px;color:var(--g700);background:var(--g50);border-radius:5px;padding:7px 10px"><b>02S forecast:</b> Equipment re-rent premium is recoverable if crane extension is converted to a planned demand plan line by Jul 30. Projected GM recovery: +0.8 pts to 15.0%.</div>';
    h+='</div>';
    mount.innerHTML=h;
  }
  function renderFleetDemand(){
    var mount=document.getElementById('fleetDemandMount'); if(!mount)return;
    var ns=CURRENT==='ns';
    /* per-pillar budget totals from COST_CODES */
    var pillarDefs=[
      {key:'equipment',    label:'Equipment',    icon:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',        to:'equip'},
      {key:'profservices', label:'Prof. services',icon:'<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>',          to:'dp-profservices'},
      {key:'prefab',       label:'Prefab',        icon:'<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>',                        to:'dp-prefab'},
      {key:'procurement',  label:'Procurement',   icon:'<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 002 1.6h9.7a2 2 0 002-1.6L23 6H6"/>',to:'dp-procurement'},
      {key:'logistics',    label:'Logistics',     icon:'<rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>',to:'dp-logistics'}
    ];
    var actU=EQ_LINES.filter(function(l){return l.status==='on-rent'&&l.from<=EQ_TODAY&&l.to>=EQ_TODAY;}).reduce(function(s,l){return s+l.qty;},0);
    var actMo=EQ_LINES.filter(function(l){return l.status==='on-rent'&&l.from<=EQ_TODAY&&l.to>=EQ_TODAY;}).reduce(function(s,l){return s+(l.rate?l.qty*l.rate:0);},0);
    /* compute totals per pillar */
    var totals={};
    pillarDefs.forEach(function(pd){
      var codes=COST_CODES.filter(function(c){return c.pillar===pd.key;});
      totals[pd.key]={
        budget:codes.reduce(function(s,c){return s+(c.originalBudget||0)+(c.approvedCO||0);},0),
        committed:codes.reduce(function(s,c){return s+(c.committed||0);},0),
        spent:codes.reduce(function(s,c){return s+(c.spent||0);},0)
      };
    });
    /* grand total row */
    var grandB=0,grandC=0;
    pillarDefs.forEach(function(pd){grandB+=totals[pd.key].budget;grandC+=totals[pd.key].committed;});
    var h='';
    /* header KPI strip */
    h+='<div style="display:flex;gap:16px;padding:12px 0 14px;border-bottom:2px solid var(--g150);margin-bottom:4px">';
    h+='<div><div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:var(--g500);margin-bottom:3px">Total budget</div><div style="font-size:18px;font-weight:700;color:var(--charcoal)">'+fmtBig(grandB)+'</div></div>';
    h+='<div><div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:var(--g500);margin-bottom:3px">Committed</div><div style="font-size:18px;font-weight:700;color:var(--charcoal)">'+fmtBig(grandC)+'</div></div>';
    h+='<div><div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:var(--g500);margin-bottom:3px">Utilization</div><div style="font-size:18px;font-weight:700;color:var(--charcoal)">'+actU+' units on-rent</div></div>';
    h+='<div style="margin-left:auto;align-self:center"><button class="btn btn-ghost btn-sm" onclick="go(\'billing\')">View budget detail</button></div>';
    h+='</div>';
    /* per-pillar rows */
    h+='<div>';
    pillarDefs.forEach(function(pd,i){
      var t=totals[pd.key];
      var pct=t.budget>0?Math.min(Math.round(t.committed/t.budget*100),100):0;
      var tone=t.committed>t.budget?'bad':t.committed>t.budget*.95?'warn':'ok';
      var barColor={ok:'var(--success)',warn:'var(--warning)',bad:'var(--red)'}[tone];
      var statusLbl={ok:'On track',warn:'Near limit',bad:'Over budget'}[tone];
      var nsAlert=ns&&tone!=='ok'?'<span class="tag '+tone+'" style="margin-left:6px;font-size:10px">'+statusLbl+'</span>':'';
      h+='<div style="display:flex;align-items:center;gap:12px;padding:10px 0'+(i<pillarDefs.length-1?';border-bottom:1px solid var(--g100)':'')+'">';
      h+='<div style="width:28px;height:28px;border-radius:7px;background:var(--g100);display:grid;place-items:center;flex-shrink:0"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px">'+pd.icon+'</svg></div>';
      h+='<div style="flex:1;min-width:0">';
      h+='<div style="display:flex;align-items:center;margin-bottom:4px"><span style="font-size:13px;font-weight:600">'+pd.label+'</span>'+nsAlert+'</div>';
      h+='<div style="height:5px;background:var(--g150);border-radius:3px;overflow:hidden;margin-bottom:4px"><div style="height:100%;width:'+pct+'%;background:'+barColor+';border-radius:3px;transition:width .4s"></div></div>';
      h+='<div style="font-size:11.5px;color:var(--g500)">'+fmtBig(t.committed)+' committed of '+fmtBig(t.budget)+' &middot; <span style="color:'+barColor+';font-weight:600">'+pct+'%</span></div>';
      h+='</div>';
      h+='<button class="btn btn-ghost btn-sm" style="flex-shrink:0" onclick="go(\''+pd.to+'\')">View plan</button>';
      h+='</div>';
    });
    h+='</div>';
    if(ns){
      h+='<div style="margin-top:12px;background:var(--info-tint);border:1px solid rgba(38,93,159,.18);border-radius:7px;padding:9px 12px;font-size:12px;color:var(--g700)">'
        +'<b>02S insight:</b> Procurement is at 94% of budget with active bulk materials at-risk. Rebalancing ~$120K from the equipment underrun (25% remaining) can cover the gap without a CO. '
        +'<span class="lk" onclick="go(\'billing\')">View details</span>'
        +'</div>';
    }
    mount.innerHTML=h;
  }
  function renderLookahead(){
    var v1m=document.getElementById('lookaheadGantt'); if(!v1m)return;
    var WIN_DAYS=21;
    function dayOffset(dateStr){
      var parts=dateStr.split('-');
      var d=new Date(+parts[0],+parts[1]-1,+parts[2]);
      var s=new Date(2026,4,12);
      return Math.round((d-s)/(86400000));
    }
    function pct(d){return Math.max(0,Math.min(100,Math.round(d/WIN_DAYS*100)))+'%';}
    var ITEMS=[
      {label:'Billing approval due',    pillar:'Billing',       ref:'BILL-9012',start:'2026-05-12',end:'2026-05-18',tone:'warn', note:'Auto-finalizes May 18 · action required'},
      {label:'Env. monitoring demob',   pillar:'Prof. services',ref:'DP-SWPPP', start:'2026-05-16',end:'2026-05-16',tone:'ok',   note:'SWPPP monitoring · Mar–May scope closing'},
      {label:'Excavator delivery',      pillar:'Logistics',     ref:'ORD-3042', start:'2026-05-20',end:'2026-05-20',tone:'warn', note:'Heavy haul · north gate · 6 AM window'},
      {label:'Excavator on-rent',       pillar:'Equipment',     ref:'ORD-3042', start:'2026-05-20',end:'2026-06-01',tone:'ok',   note:'Active through Jun · site earthwork'},
      {label:'Nut runners order-by',    pillar:'Procurement',   ref:'PO-4401',  start:'2026-05-22',end:'2026-05-22',tone:'info',note:'6-wk lead · Jul 15 need-by · solar pile'},
      {label:'Pipe rack fab milestone', pillar:'Prefab',        ref:'PF-021',   start:'2026-05-25',end:'2026-05-25',tone:'info',note:'Shop drawings approved · Aug 15 need on-site'},
      {label:'Crane mob permits',       pillar:'Logistics',     ref:'ORD-3071', start:'2026-05-26',end:'2026-06-01',tone:'info',note:'Route permits in process · Aug 3 final mob'}
    ];
    if(CURRENT==='ns'){
      ITEMS.push({label:'BESS submittal critical',pillar:'Prefab',ref:'PF-022',start:'2026-05-22',end:'2026-05-22',tone:'warn',note:'Critical path · 2 days float remaining'});
      ITEMS.sort(function(a,b){return a.start<b.start?-1:a.start>b.start?1:0;});
    }
    if(EXTRA_LOOKAHEAD.length){EXTRA_LOOKAHEAD.forEach(function(x){ITEMS.push(x);});ITEMS.sort(function(a,b){return a.start<b.start?-1:a.start>b.start?1:0;});}
    var pillarTone={'Equipment':'info','Billing':'warn','Prof. services':'ok','Logistics':'neu','Procurement':'neu','Prefab':'info'};
    var toneColor={ok:'var(--success)',warn:'var(--warning)',info:'var(--info)',neu:'var(--g400)'};
    var head='<div style="display:grid;grid-template-columns:190px 1fr;gap:0;margin-bottom:2px">'
      +'<div></div>'
      +'<div style="display:grid;grid-template-columns:repeat(3,1fr)">'
      +'<div style="font-size:10px;font-weight:700;color:var(--g500);padding:0 4px;border-right:1px dashed var(--g200)">May 12–18</div>'
      +'<div style="font-size:10px;font-weight:700;color:var(--g500);padding:0 4px;border-right:1px dashed var(--g200)">May 19–25</div>'
      +'<div style="font-size:10px;font-weight:700;color:var(--g500);padding:0 4px">May 26–Jun 1</div>'
      +'</div></div>';
    var rows=ITEMS.map(function(item){
      var s=dayOffset(item.start), e=dayOffset(item.end)+1;
      var left=pct(s), width=pct(Math.max(1,e-s));
      var bc=toneColor[item.tone]||'var(--g400)';
      var ptone=pillarTone[item.pillar]||'neu';
      return '<div style="display:grid;grid-template-columns:190px 1fr;gap:0;margin-bottom:4px;align-items:center">'
        +'<div style="display:flex;align-items:center;gap:4px;padding-right:8px;min-width:0">'
        +'<span class="tag '+ptone+'" style="font-size:9px;padding:1px 5px;white-space:nowrap;flex-shrink:0">'+item.pillar+'</span>'
        +'<span style="font-size:11px;color:var(--g800);white-space:nowrap;overflow:hidden;text-overflow:ellipsis" title="'+item.ref+' · '+item.note+'">'+item.label+'</span>'
        +'</div>'
        +'<div style="position:relative;height:22px;background:var(--g100);border-radius:4px">'
        +'<div style="position:absolute;left:'+left+';width:'+width+';height:100%;background:'+bc+';border-radius:4px;opacity:.85;display:flex;align-items:center;padding:0 6px;overflow:hidden">'
        +'<span style="font-size:10px;font-weight:600;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+item.ref+'</span>'
        +'</div>'
        +'</div>'
        +'</div>';
    }).join('');
    var todayNote='<div style="font-size:11px;color:var(--g400);margin-top:8px;padding-top:8px;border-top:1px solid var(--g150)">'
      +(CURRENT==='ns'?'Lookahead tied to CPM · Structural steel is crane-dependent — crane arrives 4 days ahead of need. <span class="lk" onclick="go(\'equip\')">Adjust mobilization</span>':'8 touchpoints · 5 pillars · 2 require action this week. <span class="lk" onclick="go(\'equip\')">View equipment plan</span>')
      +'</div>';
    v1m.innerHTML=head+rows+todayNote;
  }
  function renderAllActivity(){
    var mount=document.getElementById('allActivityMount'); if(!mount) return;
    var eqOnRent=ORDERS.filter(function(o){return o.pillar==='equipment'&&o.stage===4;}).length;
    var pillars=[
      {k:'Equipment',    icon:'<rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/>',
       summary:eqOnRent+' units on-rent',stat:'7 active orders · Aug 2026',tone:'ok'},
      {k:'Prof. services',icon:'<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>',
       summary:'14 FTE active',stat:'6 firms · Apr–Oct scope',tone:'ok'},
      {k:'Prefab',icon:'<path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>',
       summary:'$234K in fabrication',stat:'2 quotes outstanding',tone:'warn'},
      {k:'Logistics',icon:'<path d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11a2 2 0 012 2v3M10 17h7M17 17l2 5-4-1.5"/>',
       summary:'Deliveries on track',stat:'3 oversize loads in progress',tone:'ok'},
      {k:'Procurement',icon:'<path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>',
       summary:'$55K committed',stat:'1 delivery at-risk',tone:'bad'}
    ];
    var h='<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:10px">';
    pillars.forEach(function(p){
      h+='<div class="vital '+p.tone+'">';
      h+='<div class="vk">'+svg(p.icon,2)+p.k+'</div>';
      h+='<div class="vv" style="font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+p.summary+'</div>';
      h+='<div class="vsub">'+p.stat+'</div>';
      h+='</div>';
    });
    h+='</div>';
    mount.innerHTML=h;
  }
  function openEqLineDrill(id){
    var l=EQ_LINES.filter(function(x){return x.id===id;})[0]; if(!l)return;
    var stt=eqLineState(l);
    var stTxt=stt==='onrent'?'On-rent':stt==='offrent'?'Off-rent':stt==='submitted'?'Submitted':stt==='pending'?'Pending pricing':'Draft';
    var mo=eqMonths(l.from,l.to), lt=l.rate?eqLineTotal(l):0;
    var dn=l.desc.replace(/—.*/,'').trim().toLowerCase().slice(0,8);
    var ord=ORDERS.filter(function(o){return o.pillar==='equipment'&&o.item&&o.item.toLowerCase().indexOf(dn)>=0;})[0];
    var stageLabels=['Requested','Allocated','Acknowledged','In fulfillment','On-rent','Off-rent'];
    var data={
      title:l.desc,pillar:'Equipment',statusText:stTxt,statusCls:stt,
      category:l.cat,scope:l.scope,task:l.task,
      dates:eqMonthLabel(l.from)+' ’'+l.from.slice(2,4)+' → '+eqMonthLabel(l.to)+' ’'+l.to.slice(2,4),
      qty:'×'+l.qty+' units · '+mo+' billable months',
      costDisplay:l.rate?fmt(l.rate)+'/mo · '+fmtBig(lt)+' projected total':'Pending 02S pricing',
      costCode:l.code,
      order:ord?{ref:ord.id,stage:stageLabels[ord.stage-1]||('Stage '+ord.stage),latest:ord.latest,latestTone:ord.latestTone||'ok',
        delivery:ord.recv?{window:ord.recv.window,carrier:ord.recv.carrier,status:ord.recv.status}:null}:null,
      billing:{committed:l.rate?fmtBig(lt):null},
      docs:ord&&ord.recv&&ord.recv.docs?ord.recv.docs:['Equipment specification sheet (PDF)','Delivery receipt (PDF)']
    };
    renderPlanDrillModal(data);
  }
  function openDPLineDrill(pk,rowIdx){
    var cfg=DP[pk]; if(!cfg)return;
    var r=cfg.rows[rowIdx]; if(!r)return;
    var a=cfg.add||{};
    var name=r[a.nameKey]||r.role||r.asm||r.item||r.move||'—';
    var sub=r[a.subKey]||r.firm||r.moveSub||'';
    var qty=r[a.qtyKey]||r.qty||'—';
    var when=r[a.whenKey]||r.window||r.need||r.when||r.needby||'—';
    var cost=r[a.costKey]||r.cost||'—';
    var code=r.code||'—';
    var state=r.state||'—';
    var src=r.src||null;
    var ord=null;
    var _oid=r.linkOrd||(src&&src.indexOf('ORD-')===0?src:null);
    if(_oid) ord=ORDERS.filter(function(o){return o.id===_oid;})[0];
    if(!ord){var dn2=name.replace(/[— ].*/,'').trim().toLowerCase().slice(0,8); ord=ORDERS.filter(function(o){return o.pillar===pk&&o.item&&o.item.toLowerCase().indexOf(dn2)>=0;})[0];}
    var stageLabels=['Requested','Allocated','Acknowledged','In fulfillment','On-rent','Off-rent'];
    var pillarNames={profservices:'Prof. services',procurement:'Procurement',prefab:'Prefab',logistics:'Logistics'};
    var docsByPillar={profservices:['Service agreement (PDF)','SOW & deliverables (PDF)'],procurement:['Purchase order (PDF)','Product specification (PDF)'],prefab:['Submittal drawings (PDF)','Shop drawings (PDF)','Fabrication schedule (PDF)'],logistics:['Delivery route map (PDF)','Permit documentation (PDF)']};
    var dpBill=ord?BILLS.filter(function(b){return b.order===ord.id;})[0]:null;
    var dpQuote=r.quoteRef?PORTAL_QUOTES.filter(function(q){return q.ref===r.quoteRef;})[0]:null;
    var data={
      title:name,pillar:pillarNames[pk]||pk,statusText:state,
      category:sub,scope:when,task:null,
      dates:when,qty:qty,
      costDisplay:cost,costCode:code,
      order:ord?{ref:ord.id,stage:stageLabels[ord.stage-1]||('Stage '+ord.stage),latest:ord.latest,latestTone:ord.latestTone||'ok',delivery:null}:null,
      bill:dpBill||null,
      quote:dpQuote||null,
      docs:docsByPillar[pk]||['Documentation (PDF)']
    };
    renderPlanDrillModal(data);
  }
  function renderPlanDrillModal(data){
    var ICO_DOC='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:12px;height:12px;display:inline;margin-right:3px;vertical-align:middle"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>';
    var ICO_ORD='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:12px;height:12px;margin-right:4px;vertical-align:middle"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>';
    var ICO_BILL='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:12px;height:12px;margin-right:4px;vertical-align:middle"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>';
    var b='';
    b+='<div class="fq-req" style="margin-bottom:12px">';
    b+='<div class="fq-req-t">'+data.title+'</div>';
    if(data.category) b+='<div class="sub">'+data.category+(data.scope?' · '+data.scope:'')+'</div>';
    b+='</div>';
    b+='<div class="fq-calc" style="margin-bottom:14px">';
    b+='<div class="fq-crow"><span>Dates / window</span><span>'+data.dates+'</span></div>';
    b+='<div class="fq-crow"><span>Quantity</span><span>'+data.qty+'</span></div>';
    b+='<div class="fq-crow"><span>Pricing</span><span>'+data.costDisplay+'</span></div>';
    b+='<div class="fq-crow"><span>Cost code</span><span style="font-size:11px;font-family:monospace">'+data.costCode+'</span></div>';
    if(data.task) b+='<div class="fq-crow"><span>Schedule activity</span><span>'+data.task+'</span></div>';
    b+='</div>';
    b+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px">';
    b+='<div>';
    b+='<div style="font-size:10.5px;font-weight:700;color:var(--g500);text-transform:uppercase;letter-spacing:.06em;margin-bottom:7px">'+ICO_ORD+'Order &amp; fulfillment</div>';
    if(data.order){
      b+='<div style="background:var(--g50);border:1px solid var(--g150);border-radius:6px;padding:10px 12px;cursor:pointer" onclick="closeModal();gotoOrder(\''+data.order.ref+'\')">';
      b+='<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:4px">';
      b+='<span style="font-size:12px;font-weight:700;color:var(--g900)">'+data.order.ref+'</span>';
      b+='<span class="tag ok" style="font-size:10px">'+data.order.stage+'</span>';
      b+='</div>';
      b+='<div style="font-size:11.5px;color:var(--g700)">' +data.order.latest+'</div>';
      b+='</div>';
    } else {
      b+='<div style="background:var(--g50);border:1px dashed var(--g200);border-radius:6px;padding:10px 12px;font-size:11.5px;color:var(--g400)">No order on file yet — draft or projected line.</div>';
    }
    b+='</div>';
    b+='<div>';
    b+='<div style="font-size:10.5px;font-weight:700;color:var(--g500);text-transform:uppercase;letter-spacing:.06em;margin-bottom:7px">'+ICO_BILL+'Billing &amp; cost code</div>';
    var shortCode=data.costCode?data.costCode.split('·')[0].trim():'—';
    if(data.bill){
      var bTone=data.bill.status==='Finalized'||data.bill.status==='Approved'?'ok':'warn';
      b+='<div style="background:var(--g50);border:1px solid var(--g150);border-radius:6px;padding:10px 12px;cursor:pointer" onclick="closeModal();gotoBill(\''+data.bill.id+'\')">';
      b+='<div style="font-size:11px;color:var(--g500);font-family:monospace;margin-bottom:6px">'+shortCode+'</div>';
      b+='<div style="font-size:12px;font-weight:600;color:var(--charcoal);margin-bottom:4px">'+data.bill.id+'</div>';
      b+='<div style="font-size:11.5px;color:var(--g700)">$'+data.bill.amt.toLocaleString()+' <span class="tag '+bTone+'">'+data.bill.status+'</span></div>';
      b+='</div>';
    } else if(data.quote){
      var qDraft=data.quote.status==='Draft';
      b+='<div style="background:var(--g50);border:1px '+(qDraft?'dashed var(--g300)':'solid var(--g150)')+';border-radius:6px;padding:10px 12px;cursor:pointer" onclick="closeModal();gotoQuote(\''+data.quote.ref+'\')">';
      b+='<div style="font-size:11px;color:var(--g500);font-family:monospace;margin-bottom:6px">'+shortCode+'</div>';
      b+='<div><span style="font-size:12px;font-weight:700;color:var(--charcoal)">'+data.quote.ref+'</span> <span class="tag '+(qDraft?'warn':'ok')+'">'+data.quote.status+'</span></div>';
      b+='<div style="font-size:11px;color:var(--g500);margin-top:4px">'+(qDraft?'Pricing pending 02S confirmation':'All items priced — PDF ready')+'</div>';
      b+='</div>';
    } else {
      b+='<div style="background:var(--g50);border:1px solid var(--g150);border-radius:6px;padding:10px 12px">';
      b+='<div style="font-size:11px;color:var(--g500);font-family:monospace;margin-bottom:6px">'+shortCode+'</div>';
      b+='<div style="font-size:11.5px;color:var(--g400)">'+(data.order?'Billing generated once order is fulfilled.':'No billing on file yet.')+'</div>';
      b+='</div>';
    }
    b+='</div>';
    b+='</div>';
    if(CURRENT==='ns'&&data.order&&ORDER_TASKS[data.order.id])b+=renderOrderTasksPanel(data.order.id,false);
    b+='<div style="font-size:10.5px;font-weight:700;color:var(--g500);text-transform:uppercase;letter-spacing:.06em;margin-bottom:7px">'+ICO_DOC+'Documents</div>';
    b+='<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:4px">';
    data.docs.forEach(function(d){
      b+='<button class="btn btn-ghost btn-sm" style="font-size:11px" onclick="toast(\'Opening: '+d.replace(/'/g,'\\'+'\'')+'\')" >'+ICO_DOC+d+'</button>';
    });
    b+='</div>';
    b+='<div class="modal-foot" style="margin-top:16px">';
    b+='<button onclick="closeModal()">Close</button>';
    b+='</div>';
    openModal(data.pillar+' plan line — '+data.title, b);
  }

  var _eqDrillOpen=null;
  function toggleEqDrill(id){
    var prev=_eqDrillOpen;
    if(prev){var p=document.getElementById('eq-drill-'+prev);if(p)p.style.display='none';}
    if(prev===id){_eqDrillOpen=null;return;}
    var t=document.getElementById('eq-drill-'+id);if(t)t.style.display='block';
    _eqDrillOpen=id;
  }
  var _dpDrillOpen={};
  function toggleDPDrill(pk,idx){
    var prev=_dpDrillOpen[pk];
    if(prev!=null){var p=document.getElementById('dp-drill-'+pk+'-'+prev);if(p)p.style.display='none';}
    if(prev===idx){_dpDrillOpen[pk]=null;return;}
    var t=document.getElementById('dp-drill-'+pk+'-'+idx);if(t)t.style.display='block';
    _dpDrillOpen[pk]=idx;
  }
  function postPlanNote(id){
    var inp=document.getElementById('plan-note-'+id);
    if(!inp||!inp.value.trim())return;
    toast('Note sent to 02S — you will be notified when they reply');
    inp.value='';
  }
  var DP_CHAIN={
    profservices:{
      labels:['Plan line','Contracted','Active','Demobilized'],
      icons:['<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/>','<path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>','<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>','<path d="M20 6L9 17l-5-5"/>'],
      stageOf:function(r){var m={Draft:0,Projected:0,'Pending pricing':0,Requested:1,Acknowledged:1,Active:2,Demobilized:3};return m[r.state]!=null?m[r.state]:0;}
    },
    procurement:{
      labels:['Plan line','PO submitted','PO issued','Delivered'],
      icons:['<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/>','<path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>','<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 002 1.6h9.7a2 2 0 002-1.6L23 6H6"/>','<path d="M20 6L9 17l-5-5"/>'],
      stageOf:function(r){var m={Draft:0,'Pending pricing':0,Requested:1,Acknowledged:1,'PO issued':2,Delivered:3,'At-risk':1};return m[r.state]!=null?m[r.state]:1;}
    },
    prefab:{
      labels:['Plan line','Submittal','In fabrication','Delivered'],
      icons:['<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/>','<path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>','<path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>','<path d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11a2 2 0 012 2v3"/>'],
      stageOf:function(r){var m={Draft:0,Requested:0,'Pending pricing':0,Submittal:1,'In fabrication':2,Delivered:3};return m[r.state]!=null?m[r.state]:0;}
    },
    logistics:{
      labels:['Plan line','Requested','Scheduled','Active'],
      icons:['<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/>','<path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>','<circle cx="12" cy="12" r="10"/><path d="M12 7v5l3 2"/>','<path d="M20 6L9 17l-5-5"/>'],
      stageOf:function(r){var m={Draft:0,Requested:1,Scheduled:2,Active:3,Complete:3,'At-risk':1};return m[r.state]!=null?m[r.state]:1;}
    }
  };
  var EQ_LINE_DOCS={
    'e1':['Generator maintenance log (PDF)','Load test certificate (PDF)','Fuel & hour log (PDF)'],
    'e2':['Light tower inspection checklist (PDF)','Operating manual (PDF)'],
    'e3':['Delivery route map (PDF)','Access road load rating (PDF)','Operating manual (PDF)','Delivery receipt (PDF)','Fuel & hour log (PDF)'],
    'e4':['Dozer operating manual (PDF)','Grade sheet (PDF)'],
    'e5':['Motor grader inspection log (PDF)','Operating manual (PDF)'],
    'e6':['Compaction test reports (PDF)','Roller inspection log (PDF)'],
    'e7':['Pile driving log (PDF)','Vibration monitoring report (PDF)','Operating manual (PDF)','Delivery receipt (PDF)'],
    'e8':['Pile driving log (PDF)','Operating manual (PDF)'],
    'e9':['Equipment inspection checklist (PDF)','Operating manual (PDF)','Delivery receipt (PDF)'],
    'e10':['Equipment specification (PDF)','Delivery checklist (PDF)'],
    'e11':['Boom lift inspection report (PDF)','Operator training certificate (PDF)'],
    'e12':['Equipment specification (PDF)','Delivery checklist (PDF)'],
    'e13':['Scissor lift spec sheet (PDF)','ANSI compliance certificate (PDF)'],
    'e14':['Crane load chart (PDF)','Rigging plan (PDF)'],
    'e15':['Crawler crane specification (PDF)','Manufacturer assembly manual (PDF)','Rigging & lift plan (PDF)']
  };
  var DP_LINE_DOCS={
    'profservices-0':["Owner's engineer contract (PDF)","Monthly progress report (PDF)","IE inspection checklist (PDF)"],
    'profservices-1':["Geotechnical report (PDF)","Soil testing lab results (PDF)","Site monitoring log (PDF)"],
    'profservices-2':["Special inspection reports (PDF)","IBC §1705 compliance log (PDF)","RFI response log (PDF)","Structural drawings (PDF)"],
    'profservices-3':["BESS commissioning scope (PDF)","Vendor proposal (PDF)"],
    'profservices-4':["SWPPP permit (PDF)","Environmental baseline report (PDF)","Monitoring log (PDF)"],
    'profservices-5':["VDC—BIM scope of work (PDF)","Rate card request (PDF)"],
    'profservices-6':["Survey report (PDF)","As-built survey drawings (PDF)","Deliverable acceptance letter (PDF)"],
    'procurement-0':["Purchase order PO-4401 (PDF)","Nut runner product spec (PDF)","Safety data sheet (PDF)"],
    'procurement-1':["Purchase order PO-4395 (PDF)","Delivery receipt (PDF)"],
    'procurement-2':["Purchase order PO-4396 (PDF)","Delivery receipt (PDF)"],
    'procurement-3':["Purchase order draft PO-4410 (PDF)","Tone wrench spec (PDF)","Safety data sheet (PDF)"],
    'procurement-4':["Purchase order PO-4397 (PDF)","Delivery receipt (PDF)"],
    'procurement-5':["SDS Max spec sheet (PDF)","BESS safety plan (PDF)"],
    'procurement-6':["Purchase order PO-4403 (PDF)","OSHA Table 1 compliance log (PDF)"],
    'procurement-7':["Wire crimper spec (PDF)","BESS & electrical plan (PDF)"],
    'prefab-0':["Shop drawings (PDF)","Submittal approval letter (PDF)","Fabrication schedule (PDF)","Receiving inspection checklist (PDF)"],
    'prefab-1':["Delivery receipt (PDF)","Installation drawings (PDF)","Quality inspection report (PDF)","As-built record (PDF)"],
    'prefab-2':["Submittal package (PDF)","BESS e-house shop drawings (PDF)","Vendor fabrication proposal (PDF)"],
    'prefab-3':["Shop drawings (PDF)","Pump assembly spec (PDF)","Fabrication progress photos (PDF)"],
    'prefab-4':["Cable tray submittal (PDF)","Product data sheet (PDF)"],
    'logistics-0':["Heavy haul permit (PDF)","Delivery route map (PDF)","Delivery receipt (PDF)","Access road load rating (PDF)"],
    'logistics-1':["Oversize load permit application (PDF)","Route survey (PDF)"],
    'logistics-2':["Crane mobilization permit (PDF)","Rigging plan (PDF)","Mobilization checklist (PDF)","Escort vehicle agreement (PDF)"],
    'logistics-3':["PV module delivery schedule (PDF)","East gate access plan (PDF)"],
    'logistics-4':["BESS container placement plan (PDF)","Crane lift plan (PDF)"],
    'logistics-5':["Prefab delivery schedule (PDF)","Laydown B plan (PDF)"],
    'logistics-6':["Laydown agreement (PDF)","Site plan (PDF)","Yard C inventory log (PDF)"]
  };
  function buildEqTrack(l){
    var stt=eqLineState(l);
    var mo=eqMonths(l.from,l.to);
    var lt=l.rate?eqLineTotal(l):0;
    var ordId=EQ_ORD_MAP[l.id];
    var ord=ordId?ORDERS.filter(function(o){return o.id===ordId;})[0]:null;
    var bill=ord?BILLS.filter(function(b){return b.order===ord.id;})[0]:null;
    var chainStage=0;
    if(bill) chainStage=4;
    else if(stt==='onrent'||stt==='offrent'||(ord&&ord.stage>=4)) chainStage=3;
    else if(ord) chainStage=2;
    else if(l.submitted) chainStage=1;
    var chainLabels=['Plan line','Submitted to 02S','Order placed','On-rent / active','Billing'];
    var chainIcons=[
      '<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/>',
      '<path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>',
      '<path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>',
      '<rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/>',
      '<path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>'
    ];
    var stageLabels=['Requested','Acknowledged','In fulfillment','Delivered','On-Rent','Off-Rent'];
    var steps=chainLabels.map(function(lbl,i){
      var cls=i<chainStage?'done':(i===chainStage?'cur':'future');
      var ic=i<chainStage?'<path d="M20 6L9 17l-5-5"/>':chainIcons[i];
      var clickAttr='';
      if(i===2&&ord) clickAttr=' style="cursor:pointer" onclick="event.stopPropagation();openOrderPreviewModal(\''+ord.id+'\')" title="View '+ord.id+'"';
      if(i===4&&bill) clickAttr=' style="cursor:pointer" onclick="event.stopPropagation();openBillPreviewModal(\''+bill.id+'\')" title="View '+bill.id+'"';
      var sub='';
      if(i===2&&ord) sub='<div style="font-size:10px;color:inherit;opacity:.75;margin-top:1px">'+ord.id+'</div>';
      if(i===4&&bill) sub='<div style="font-size:10px;color:inherit;opacity:.75;margin-top:1px">'+bill.id+'</div>';
      return '<div class="step '+cls+'"'+clickAttr+'><span class="dot">'+svg(ic,cls==='done'?3:2)+'</span><span class="slbl">'+lbl+sub+'</span></div>';
    }).join('');
    var h='';
    h+='<div class="trk" style="padding:12px 18px 10px">'+steps+'</div>';
    if(ord&&ord.latest){
      h+='<div class="latest-line '+(ord.latestTone||'ok')+'" style="margin:0 18px 10px"><span class="ll-k">Latest</span>'+ord.latest+'</div>';
    }
    if(stt==='offrent'){
      h+='<div style="margin:0 18px 10px;display:flex;align-items:center;gap:6px">';
      h+='<span class="tag ok" style="font-size:10px">✓ Off-rent</span>';
      h+='<span style="font-size:11px;color:var(--g500)">Equipment returned · rental period closed</span>';
      h+='</div>';
    }
    if(!ord){
      if(l.submitted){
        h+='<div style="margin:0 18px 10px;background:var(--g50);border:1px dashed var(--g200);border-radius:6px;padding:10px 12px;font-size:11.5px;color:var(--g500)">Submitted to 02S — order pending allocation. You\'ll be notified when an order is created.</div>';
      } else {
        h+='<div style="margin:0 18px 10px;background:var(--g50);border:1px dashed var(--g200);border-radius:6px;padding:10px 12px;font-size:11.5px;color:var(--g400)">Draft or projected line — submit to 02S to begin the fulfillment process.</div>';
      }
    }
    var notes=EQ_LINE_NOTES[l.id]||[];
    if(notes.length){
      h+='<div style="border-top:1px solid var(--g150);margin:0 18px;padding:10px 0 4px">';
      h+='<div style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--g500);margin-bottom:8px">Notes &amp; history</div>';
      notes.forEach(function(n){
        h+='<div style="margin-bottom:8px"><div style="display:flex;gap:8px;align-items:baseline;margin-bottom:2px"><span style="font-size:12px;font-weight:600;color:var(--g900)">'+n.who+'</span><span style="font-size:11px;color:var(--g400)">'+n.when+'</span></div>';
        h+='<div style="font-size:12px;color:var(--g700);line-height:1.5">'+n.text+'</div></div>';
      });
      h+='<div style="display:flex;gap:6px;margin-top:4px">';
      h+='<input style="flex:1;border:1px solid var(--g200);border-radius:6px;padding:6px 10px;font-size:12px;font-family:inherit;outline:none;color:var(--g900)" placeholder="Add a note to 02S…" id="plan-note-'+l.id+'">';
      h+='<button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();postPlanNote(\''+l.id+'\')">Send</button>';
      h+='</div></div>';
    }
    var docs=(EQ_LINE_DOCS&&EQ_LINE_DOCS[l.id])?EQ_LINE_DOCS[l.id]:(ord&&ord.recv&&ord.recv.docs?ord.recv.docs:['Equipment specification (PDF)','Delivery receipt (PDF)']);
    h+='<div style="border-top:1px solid var(--g150);margin:0 18px;padding:10px 0 10px">';
    h+='<div style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--g500);margin-bottom:8px">Documents</div>';
    h+='<div style="display:flex;flex-wrap:wrap;gap:5px">';
    docs.forEach(function(d){
      h+='<span class="doc-chip" onclick="event.stopPropagation();openDocChip(\''+d.replace(/'/g,"\\'")+'\')" >'+svg('<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/>',2)+d+'</span>';
    });
    var _eqRA=_dpRowAssets[l.id]||[];
    var _onR=_eqRA.filter(function(a){return a.status!=='offrent';}).length;
    var _offR=_eqRA.length-_onR;
    h+='<div style="border-top:1px solid var(--g150);margin:0 18px;padding:10px 0">';
    h+='<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:8px">';
    h+='<span style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--g500)">Assigned assets</span>';
    h+='<span style="font-size:10.5px;color:var(--g400)">· '+_onR+' on-rent'+(_offR?' · '+_offR+' off-rent':'')+'</span>';
    h+='<div style="margin-left:auto;display:flex;gap:6px">';
    if(_onR>0){h+='<button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();dpInitOffrentModal(\''+l.id+'\',\''+l.desc.split(/[ —–]/)[0]+'\')" style="font-size:11px;color:var(--warning);border-color:var(--warning)">↓ Initiate off-rent</button>';}
    h+='<button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();dpOpenAssetPicker(\''+l.id+'\',\''+l.cat.split(' ')[0]+'\')" style="font-size:11px">'+'+ Assign'+'</button>';
    h+='</div></div>';
    if(_eqRA.length){
      h+='<div style="display:flex;flex-wrap:wrap;gap:5px">';
      _eqRA.forEach(function(a){
        var _isOff=a.status==='offrent';
        h+='<div style="display:inline-flex;align-items:center;gap:3px;padding:3px 6px 3px 8px;border-radius:20px;border:1px solid '+(_isOff?'var(--g200)':'var(--success)')+';background:'+(_isOff?'var(--g50)':'rgba(16,185,129,.06)')+';">';
        h+='<span style="font-family:monospace;font-size:10.5px;font-weight:600;color:'+(_isOff?'var(--g400)':'var(--g800)')+'">'+a.id+'</span>';
        if(_isOff){h+='<span style="font-size:9px;color:var(--g400);margin-left:2px">off-rent</span>';}
        h+='<button onclick="event.stopPropagation();dpRemoveRowAsset(\''+l.id+'\',\''+a.id+'\')" style="background:none;border:none;padding:0 2px;cursor:pointer;font-size:11px;color:var(--g300);line-height:1">×</button>';
        h+='</div>';
      });
      h+='</div>';
    }else{
      h+='<div style="font-size:11.5px;color:var(--g400);font-style:italic">No assets assigned yet — click + Assign to tag specific units.</div>';
    }
    h+='</div>';
    h+='</div></div>';
    h+='<div style="display:flex;gap:8px;padding:10px 18px;border-top:1px solid var(--g150)">';
    if(ord) h+='<button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();openOrderPreviewModal(\''+ord.id+'\')">' +ord.id+' ↗</button>';
    if(bill) h+='<button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();openBillPreviewModal(\''+bill.id+'\')">' +bill.id+' ↗</button>';
    h+='<button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();openEqLineDrill(\''+l.id+'\')">Full details</button>';
    h+='</div>';
    if(ord&&ORDER_TASKS[ord.id])h+='<div class="ns-only">'+renderOrderTasksPanel(ord.id,true)+'</div>';
    return h;
  }
  function buildDPTrack(pk,r,rowIdx){
    var chain=DP_CHAIN[pk]; if(!chain)return '';
    var chainStage=chain.stageOf(r);
    var _ordId=chainStage>0?(r.linkOrd||(r.src&&r.src.indexOf('ORD-')===0?r.src:null)):null;
    var ord=_ordId?ORDERS.filter(function(o){return o.id===_ordId;})[0]:null;
    var bill=ord?BILLS.filter(function(b){return b.order===ord.id;})[0]:null;
    var steps=chain.labels.map(function(lbl,i){
      var cls=i<chainStage?'done':(i===chainStage?'cur':'future');
      var ic=i<chainStage?'<path d="M20 6L9 17l-5-5"/>':chain.icons[i];
      var clickAttr='';
      if(i===chain.labels.length-1&&bill) clickAttr=' style="cursor:pointer" onclick="event.stopPropagation();openBillPreviewModal(\''+bill.id+'\')" title="View '+bill.id+'"';
      else if(ord&&i>=2) clickAttr=' style="cursor:pointer" onclick="event.stopPropagation();openOrderPreviewModal(\''+ord.id+'\')" title="View '+ord.id+'"';
      var sub=(ord&&i===Math.min(2,chain.labels.length-2)&&cls!=='future')?'<div style="font-size:10px;color:inherit;opacity:.75;margin-top:1px">'+ord.id+'</div>':'';
      return '<div class="step '+cls+'"'+clickAttr+'><span class="dot">'+svg(ic,cls==='done'?3:2)+'</span><span class="slbl">'+lbl+sub+'</span></div>';
    }).join('');
    var stageLabels=['Requested','Acknowledged','In fulfillment','Delivered','On-Rent','Off-Rent'];
    var h='';
    h+='<div class="trk" style="padding:12px 18px 10px">'+steps+'</div>';
    if(ord&&ord.latest){
      h+='<div class="latest-line '+(ord.latestTone||'ok')+'" style="margin:0 18px 10px"><span class="ll-k">Latest</span>'+ord.latest+'</div>';
    }
    if(!ord){
      var stateNote={Draft:'Draft line — submit to 02S to begin fulfillment.',Requested:'Submitted to 02S — awaiting acknowledgement.',Acknowledged:'Acknowledged — 02S processing.','Pending pricing':'Pending 02S quote — price will be confirmed before order is placed.','At-risk':'At-risk — order-by date approaching or passed. Expedite required.'};
      h+='<div style="margin:0 18px 10px;background:var(--g50);border:1px '+(r.state==='At-risk'?'solid var(--red)':'dashed var(--g200)')+';border-radius:6px;padding:10px 12px;font-size:11.5px;color:'+(r.state==='At-risk'?'var(--red)':'var(--g500)')+'">'+( stateNote[r.state]||r.state)+'</div>';
    }
    if(r.linkOrd){var _bl=buildDpBillingInline(r.linkOrd);if(_bl)h+=_bl;}
    var notes=DP_LINE_NOTES[pk+'-'+rowIdx]||[];
    if(notes.length){
      h+='<div style="border-top:1px solid var(--g150);margin:0 18px;padding:10px 0 4px">';
      h+='<div style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--g500);margin-bottom:8px">Notes &amp; history</div>';
      notes.forEach(function(n){
        h+='<div style="margin-bottom:8px"><div style="display:flex;gap:8px;align-items:baseline;margin-bottom:2px"><span style="font-size:12px;font-weight:600;color:var(--g900)">'+n.who+'</span><span style="font-size:11px;color:var(--g400)">'+n.when+'</span></div>';
        h+='<div style="font-size:12px;color:var(--g700);line-height:1.5">'+n.text+'</div></div>';
      });
      h+='<div style="display:flex;gap:6px;margin-top:4px">';
      h+='<input style="flex:1;border:1px solid var(--g200);border-radius:6px;padding:6px 10px;font-size:12px;font-family:inherit;outline:none;color:var(--g900)" placeholder="Add a note to 02S…" id="plan-note-'+pk+'-'+rowIdx+'">';
      h+='<button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();postPlanNote(\''+pk+'-'+rowIdx+'\')">Send</button>';
      h+='</div></div>';
    }
    var docs=(DP_LINE_DOCS&&DP_LINE_DOCS[pk+'-'+rowIdx])?DP_LINE_DOCS[pk+'-'+rowIdx]:['Documentation (PDF)'];
    h+='<div style="border-top:1px solid var(--g150);margin:0 18px;padding:10px 0 10px">';
    h+='<div style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--g500);margin-bottom:8px">Documents</div>';
    h+='<div style="display:flex;flex-wrap:wrap;gap:5px">';
    docs.forEach(function(d){
      h+='<span class="doc-chip" onclick="event.stopPropagation();openDocChip(\''+d.replace(/'/g,"\\'")+'\')" >'+svg('<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/>',2)+d+'</span>';
    });
    h+='</div></div>';
    h+='<div style="display:flex;gap:8px;padding:10px 18px;border-top:1px solid var(--g150)">';
    if(ord) h+='<button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();openOrderPreviewModal(\''+ord.id+'\')">' +ord.id+' ↗</button>';
    if(bill) h+='<button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();openBillPreviewModal(\''+bill.id+'\')">' +bill.id+' ↗</button>';
    if(r.quoteRef){var _bqb=PORTAL_QUOTES.filter(function(q){return q.ref===r.quoteRef;})[0];if(_bqb)h+='<button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();openQuotePreviewModal(\''+_bqb.ref+'\')">'+ _bqb.ref+' ↗</button>';}
    h+='<button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();openDPLineDrill(\''+pk+'\','+rowIdx+')">Full details</button>';
    h+='</div>';
    if(_ordId&&ORDER_TASKS[_ordId])h+='<div class="ns-only">'+renderOrderTasksPanel(_ordId,true)+'</div>';
    return h;
  }


  function orderTaskSummary(ordId){
    var ot=ORDER_TASKS[ordId]; if(!ot)return null;
    var tasks=ot.tasks;
    var total=tasks.length,done=tasks.filter(function(t){return t.done;}).length;
    var gcActionable=tasks.filter(function(t){
      if(t.done||t.side!=='gc'||!t.blocking)return false;
      if(t.blockedBy){var bl=tasks.filter(function(b){return b.id===t.blockedBy;})[0];return !!(bl&&bl.done);}
      return true;
    }).length;
    var gcOverdue=tasks.filter(function(t){return !t.done&&t.side==='gc'&&t.blocking&&t.overdue;}).length;
    var o2sBlocking=tasks.filter(function(t){return !t.done&&t.side==='02s'&&t.blocking;}).length;
    return {total:total,done:done,gcActionable:gcActionable,gcOverdue:gcOverdue,o2sBlocking:o2sBlocking};
  }
  function gcBlockingCount(){
    var n=0; Object.keys(ORDER_TASKS).forEach(function(id){var s=orderTaskSummary(id);if(s&&s.gcActionable>0)n++;});
    return n;
  }
  function renderNSDashKPIs(){
    var bc=document.getElementById('nsTaskBlockBadge'); if(bc)bc.textContent=gcBlockingCount();
  }
  function _ticon(path,size,color){
    return '<svg viewBox="0 0 24 24" fill="none" stroke="'+(color||'currentColor')+'" stroke-width="2" style="width:'+(size||12)+'px;height:'+(size||12)+'px;flex-shrink:0;margin-top:1px">'+path+'</svg>';
  }
  function renderOrderTasksPanel(ordId,compact){
    var ot=ORDER_TASKS[ordId]; if(!ot)return '';
    var s=orderTaskSummary(ordId);
    var ICO_OK='<path d="M20 6L9 17l-5-5"/>',ICO_WARN='<circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>',ICO_CIRC='<circle cx="12" cy="12" r="9"/>';
    if(compact){
      var blockers=ot.tasks.filter(function(t){if(t.done||t.side!=='gc'||!t.blocking)return false;if(t.blockedBy){var bl=ot.tasks.filter(function(b){return b.id===t.blockedBy;})[0];return !!(bl&&bl.done);}return true;});
      var h='<div id="tp-'+ordId+'" data-compact="1" style="margin:6px 16px 2px;padding:7px 12px;background:var(--g50);border:1px solid var(--g150);border-radius:5px;display:flex;align-items:center;gap:8px;font-size:11.5px;flex-wrap:wrap">';
      h+=_ticon('<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>',12,'var(--g400)');
      h+='<span style="color:var(--g700);font-weight:500">Tasks</span><span style="color:var(--g400)">'+s.done+'/'+s.total+'</span>';
      if(s.gcOverdue>0) h+='<span style="color:var(--red);font-weight:600">· '+s.gcOverdue+' overdue</span>';
      else if(s.gcActionable>0) h+='<span style="color:var(--amber);font-weight:600">· '+s.gcActionable+' Subcontractor action'+(s.gcActionable>1?'s':'')+' needed</span>';
      if(s.o2sBlocking>0) h+='<span style="color:var(--g500)">· '+s.o2sBlocking+' pending 02S</span>';
      if(blockers.length) h+='<span style="color:var(--g500)">— '+blockers[0].label+(blockers[0].due?' · '+blockers[0].due:'')+'</span>';
      if(s.gcActionable===0&&s.gcOverdue===0&&s.o2sBlocking===0) h+='<span style="color:var(--success)">· on track</span>';
      h+='</div>';
      return h;
    }
    var h='<div id="tp-'+ordId+'" data-compact="0" style="margin-bottom:16px">';
    h+='<div style="font-size:10.5px;font-weight:700;color:var(--g500);text-transform:uppercase;letter-spacing:.06em;margin-bottom:10px;display:flex;align-items:center;gap:8px">';
    h+=_ticon('<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>',13,'var(--g500)');
    h+='Workflow tasks';
    h+='<span style="font-weight:400;text-transform:none;letter-spacing:0;font-size:11.5px;color:'+(s.gcOverdue>0?'var(--red)':s.gcActionable>0?'var(--amber)':'var(--success)')+'">'+s.done+'/'+s.total+(s.gcOverdue>0?' · '+s.gcOverdue+' overdue':s.gcActionable>0?' · '+s.gcActionable+' Subcontractor action'+(s.gcActionable>1?'s':'')+' needed':'')+'</span>';
    h+='</div>';
    h+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">';
    h+='<div><div style="font-size:10px;font-weight:700;color:var(--g400);text-transform:uppercase;letter-spacing:.04em;padding:3px 0;border-bottom:1px solid var(--g100);margin-bottom:5px">02S tasks</div>';
    ot.tasks.filter(function(t){return t.side==='02s';}).forEach(function(t){
      var ico=t.done?_ticon(ICO_OK,12,'var(--success)'):t.blocking?_ticon(ICO_WARN,12,'var(--amber)'):_ticon(ICO_CIRC,12,'var(--g300)');
      var col=t.done?'var(--g400)':t.blocking?'var(--amber)':'var(--g800)';
      h+='<div style="display:flex;align-items:flex-start;gap:5px;padding:3px 0;font-size:11.5px;color:'+col+(t.blocking&&!t.done?';font-weight:600':'')+'">'+ico+'<span>'+t.label+(t.done&&t.date?' <span style="color:var(--g400)">· '+t.date+'</span>':!t.done&&t.due?' <span style="color:'+(t.blocking?'var(--amber)':'var(--g500)')+';">· '+t.due+'</span>':'')+'</span></div>';
    });
    h+='</div>';
    h+='<div><div style="font-size:10px;font-weight:700;color:var(--g400);text-transform:uppercase;letter-spacing:.04em;padding:3px 0;border-bottom:1px solid var(--g100);margin-bottom:5px">Your tasks</div>';
    ot.tasks.filter(function(t){return t.side==='gc';}).forEach(function(t){
      var canAct=!t.done&&t.blocking&&(!t.blockedBy||(ot.tasks.filter(function(b){return b.id===t.blockedBy;})[0]||{}).done);
      var isOver=t.overdue&&!t.done; var isBlock=t.blocking&&!t.done;
      var col=t.done?'var(--g400)':isOver?'var(--red)':isBlock?'var(--amber)':'var(--g800)';
      var ico=t.done?_ticon(ICO_OK,12,'var(--success)'):isOver?_ticon(ICO_WARN,12,'var(--red)'):isBlock?_ticon(ICO_WARN,12,'var(--amber)'):_ticon(ICO_CIRC,12,'var(--g300)');
      h+='<div style="display:flex;align-items:flex-start;gap:5px;padding:3px 0;font-size:11.5px;color:'+col+(isBlock||isOver?';font-weight:600':'')+'">'+ico;
      h+='<span style="flex:1">'+t.label;
      if(t.note) h+=' <span style="color:var(--g400);font-size:10.5px">— '+t.note+'</span>';
      if(t.done&&t.date) h+=' <span style="color:var(--g400)">· '+t.date+'</span>';
      else if(!t.done&&t.due) h+=' <span style="color:'+(isOver?'var(--red)':isBlock?'var(--amber)':'var(--g500)')+';">· '+t.due+'</span>';
      if(isOver) h+=' <span class="tag bad" style="font-size:9px;padding:1px 4px">Overdue</span>';
      h+='</span>';
      if(canAct) h+='<button onclick="toggleOrdTask(\''+ordId+'\',\''+t.id+'\')" style="font-size:10px;padding:1px 7px;border-radius:4px;border:1px solid var(--g200);background:#fff;cursor:pointer;color:var(--g700);white-space:nowrap;margin-left:4px">Mark done</button>';
      h+='</div>';
    });
    h+='</div></div></div>';
    return h;
  }
  function toggleOrdTask(ordId,taskId){
    var ot=ORDER_TASKS[ordId]; if(!ot)return;
    var task=ot.tasks.filter(function(t){return t.id===taskId;})[0]; if(!task)return;
    var wasBlocking=task.blocking&&!task.done;
    task.done=!task.done; if(task.done)task.date='Jul 29';
    var panel=document.getElementById('tp-'+ordId);
    if(panel){var compact=panel.getAttribute('data-compact')==='1';var d=document.createElement('div');d.innerHTML=renderOrderTasksPanel(ordId,compact);panel.parentNode.replaceChild(d.firstChild,panel);}
    toast(task.done?task.label+' — marked done':task.label+' — unmarked');
    if(wasBlocking&&task.done){
      EXTRA_LOOKAHEAD.push({label:'GC task cleared — '+ordId,pillar:'Tasks',ref:ordId,start:'2026-07-29',end:'2026-07-29',tone:'ok',note:task.label+' — blocking task resolved'});
      renderNSDashKPIs();
      setTimeout(function(){toast('✓ Lookahead updated — blocking task cleared on '+ordId);},700);
    }
  }
  function renderCCTaskPanel(ordId){
    var ot=ORDER_TASKS[ordId]; if(!ot)return '';
    var ord=ORDERS.filter(function(o){return o.id===ordId;})[0];
    var ICO_OK='<path d="M20 6L9 17l-5-5"/>',ICO_WARN='<circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>',ICO_CIRC='<circle cx="12" cy="12" r="9"/>';
    var h='<div id="cctpanel-'+ordId+'" style="display:none;margin:4px 0 6px;padding:10px 14px;background:var(--g50);border:1px solid var(--g150);border-radius:6px">';
    h+='<div style="font-size:11px;font-weight:700;color:var(--g700);margin-bottom:8px">'+ordId+(ord?' · '+ord.item:'')+'</div>';
    h+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;font-size:11px">';
    h+='<div><div style="font-size:10px;font-weight:700;color:var(--g400);text-transform:uppercase;letter-spacing:.04em;border-bottom:1px solid var(--g150);padding-bottom:3px;margin-bottom:4px">02S tasks</div>';
    ot.tasks.filter(function(t){return t.side==='02s';}).forEach(function(t){
      var ico=t.done?_ticon(ICO_OK,11,'var(--success)'):t.blocking?_ticon(ICO_WARN,11,'var(--amber)'):_ticon(ICO_CIRC,11,'var(--g300)');
      var col=t.done?'var(--g400)':t.blocking?'var(--amber)':'var(--g800)';
      h+='<div style="display:flex;align-items:center;gap:5px;padding:2px 0;color:'+col+(t.blocking&&!t.done?';font-weight:600':'')+'">'+ico+'<span style="flex:1">'+t.label+(t.due&&!t.done?' · '+t.due:'')+(t.done&&t.date?' · '+t.date:'')+'</span>'+(!t.done?'<button onclick="toggleCCTask(\''+ordId+'\',\''+t.id+'\')" style="font-size:9.5px;padding:1px 6px;border-radius:3px;border:1px solid var(--g200);background:#fff;cursor:pointer;color:var(--g700)">Done</button>':'')+'</div>';
    });
    h+='</div>';
    h+='<div><div style="font-size:10px;font-weight:700;color:var(--g400);text-transform:uppercase;letter-spacing:.04em;border-bottom:1px solid var(--g150);padding-bottom:3px;margin-bottom:4px">Subcontractor tasks</div>';
    ot.tasks.filter(function(t){return t.side==='gc';}).forEach(function(t){
      var isOver=t.overdue&&!t.done; var isBlock=t.blocking&&!t.done;
      var col=t.done?'var(--g400)':isOver?'var(--red)':isBlock?'var(--amber)':'var(--g700)';
      var ico=t.done?_ticon(ICO_OK,11,'var(--success)'):isOver?_ticon(ICO_WARN,11,'var(--red)'):isBlock?_ticon(ICO_WARN,11,'var(--amber)'):_ticon(ICO_CIRC,11,'var(--g300)');
      h+='<div style="display:flex;align-items:center;gap:5px;padding:2px 0;color:'+col+(isBlock||isOver?';font-weight:600':'')+'">'+ico+'<span>'+t.label+(t.due&&!t.done?' · '+t.due:'')+(t.done&&t.date?' · '+t.date:'')+'</span>'+(isOver?'<span class="tag bad" style="font-size:9px;padding:1px 4px;margin-left:4px">Overdue</span>':isBlock?'<span class="tag warn" style="font-size:9px;padding:1px 4px;margin-left:4px">Needs action</span>':'')+'</div>';
    });
    h+='</div></div></div>';
    return h;
  }
  function toggleCCTask(ordId,taskId){
    var ot=ORDER_TASKS[ordId]; if(!ot)return;
    var task=ot.tasks.filter(function(t){return t.id===taskId;})[0]; if(!task)return;
    var wasBlocking=task.blocking&&!task.done;
    task.done=!task.done; if(task.done)task.date='Jul 29';
    var panel=document.getElementById('cctpanel-'+ordId);
    if(panel){var d=document.createElement('div');d.innerHTML=renderCCTaskPanel(ordId);var np=d.firstChild;np.style.display='block';panel.parentNode.replaceChild(np,panel);}
    toast(task.label+' — '+(task.done?'marked complete':'unmarked'));
    if(wasBlocking&&task.done){
      var unblocked=ot.tasks.filter(function(t){return t.side==='gc'&&!t.done&&t.blockedBy===taskId;});
      if(unblocked.length){setTimeout(function(){toast('✓ '+ordId+': '+unblocked[0].label+' is now unblocked — notification sent to project team');},700);}
      EXTRA_LOOKAHEAD.push({label:ordId+' task unblocked',pillar:'Tasks',ref:ordId,start:'2026-07-29',end:'2026-07-29',tone:'ok',note:task.label+' complete — '+(unblocked&&unblocked[0]?unblocked[0].label+' now actionable for GC':'GC notified')});
      renderNSDashKPIs();
    }
  }
  function toggleCCTaskPanel(ordId){
    var el=document.getElementById('cctpanel-'+ordId);
    if(el)el.style.display=el.style.display==='none'||el.style.display===''?'block':'none';
  }


  function renderTasksDueWidget(){
    var mount=document.getElementById('tasksWidgetMount'); if(!mount)return;
    if(CURRENT!=='ns'){mount.innerHTML='';return;}
    var TODAY='2026-07-29'; var WEEK_END='2026-08-04';
    var byOrd={};
    Object.keys(ORDER_TASKS).forEach(function(oid){
      var entry=ORDER_TASKS[oid]; if(!entry||!entry.tasks)return;
      entry.tasks.forEach(function(t){
        if(t.side==='gc'&&!t.done&&t.dueIso){
          var isOver=t.dueIso<TODAY; var isWk=!isOver&&t.dueIso<=WEEK_END;
          if(isOver||isWk){
            if(!byOrd[oid]) byOrd[oid]={over:0,wk:0};
            if(isOver) byOrd[oid].over++; else byOrd[oid].wk++;
          }
        }
      });
    });
    var oids=Object.keys(byOrd);
    if(!oids.length){mount.innerHTML='';return;}
    var totalOver=oids.reduce(function(n,id){return n+byOrd[id].over;},0);
    var total=oids.reduce(function(n,id){return n+byOrd[id].over+byOrd[id].wk;},0);
    var ICO='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:13px;height:13px;vertical-align:-2px"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>';
    var h='<div style="margin-top:10px;background:#fff;border:1px solid var(--g200);border-radius:8px;padding:11px 14px">';
    h+='<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">';
    h+='<div style="font-size:11.5px;font-weight:700;color:var(--g900)">'+ICO+' &nbsp;GC tasks due this week</div>';
    h+='<div style="display:flex;gap:5px">';
    if(totalOver) h+='<span class="tag bad" style="font-size:10px">'+totalOver+' overdue</span>';
    h+='<span class="tag info" style="font-size:10px">'+total+' tasks · '+oids.length+' orders</span>';
    h+='</div></div>';
    h+='<div style="display:flex;flex-wrap:wrap;gap:5px">';
    oids.slice(0,4).forEach(function(oid){
      var info=byOrd[oid]; var isOv=info.over>0;
      var lbl=oid+' · '+(isOv?info.over+' overdue':info.wk+' due');
      var st=isOv?'background:#fef2f2;color:var(--red);border:1px solid rgba(239,68,68,.2)':'background:var(--g50);color:var(--g700);border:1px solid var(--g200)';
      h+='<button onclick="gotoOrder(\''+oid+'\')" style="'+st+';font-size:11px;padding:3px 9px;border-radius:5px;cursor:pointer;font-weight:500">'+lbl+'</button>';
    });
    if(oids.length>4) h+='<span style="font-size:11px;color:var(--g400);padding:3px 6px">+'+(oids.length-4)+' more</span>';
    h+='</div></div>';
    mount.innerHTML=h;
  }

  var ordView='orders';
  function ordSetView(v){
    ordView=v;
    var fb=document.getElementById('ordFilterBar'); if(fb)fb.style.display=v==='orders'?'':'none';
    var st=document.getElementById('ordSecTitle'); if(st)st.style.display=v==='orders'?'':'none';
    var ins=document.getElementById('ordInsights'); if(ins)ins.style.display=v==='orders'?'':'none';
    var to=document.getElementById('ordTabOrders'); if(to)to.classList.toggle('on',v==='orders');
    var tq=document.getElementById('ordTabQuotes'); if(tq)tq.classList.toggle('on',v==='quotes');
    var badge=document.getElementById('ordQuotesBadge');
    if(badge)badge.textContent=PORTAL_QUOTES.filter(function(q){return q.status==='Draft';}).length||'';
    renderOrders();
  }
  function renderOrders(){
    var _rb=document.getElementById('recertBanner');
    if(_rb){ var _rc=recertItems(); _rb.innerHTML=_rc.length?('<div class="rc-banner">'+svg('<path d="M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L14.7 3.9a2 2 0 00-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',2)+'<div class="rcb-t"><b>Overdue off-rent</b><span>'+_rc.length+' item'+(_rc.length===1?'':'s')+' past anticipated return date \u2014 no return request on file</span></div><button class="btn btn-red btn-sm" onclick="openRecert()">Review</button></div>'):''; }
    var _badge=document.getElementById('ordQuotesBadge');
    if(_badge)_badge.textContent=PORTAL_QUOTES.filter(function(q){return q.status==='Draft';}).length||'';
    var _fbar=document.getElementById('ordFilterBar'); if(_fbar)_fbar.style.display=ordView==='orders'?'':'none';
    var _stitle=document.getElementById('ordSecTitle'); if(_stitle)_stitle.style.display=ordView==='orders'?'':'none';
    var _oi=document.getElementById('ordInsights'); if(_oi&&ordView==='quotes')_oi.style.display='none';
    if(ordView==='quotes'){ renderPortalQuotes(); return; }
    var q=(document.getElementById('ordSearch').value||'').toLowerCase().trim();
    var fp=document.getElementById('ordPillar').value, fs=document.getElementById('ordStatus').value, fc=document.getElementById('ordCost').value;
    var fo=(document.getElementById('ordOrigin')||{}).value||'';
    var ff=(document.getElementById('ordFrom')||{}).value||'', ft=(document.getElementById('ordTo')||{}).value||'';
    var ns=CURRENT==='ns';
    var list=ORDERS.filter(function(o){
      var st=stageStatus(o);
      if(!ns && o.proj!=='hercules') return false;
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
    list.sort(function(a,b){var aOver=a.recert==='pending'&&a.anticipatedOff&&a.anticipatedOff<'2026-07-22';var bOver=b.recert==='pending'&&b.anticipatedOff&&b.anticipatedOff<'2026-07-22';if(aOver&&!bOver)return -1;if(!aOver&&bOver)return 1;return 0;});
    document.getElementById('ordCountLbl').textContent='· '+list.length+' order'+(list.length===1?'':'s');
    var head='<div class="ot-head"><span>Order</span><span>Items</span><span>Pillar</span><span>Origin</span><span class="hide-sm">Dates</span><span class="hide-sm">Cost code</span><span>Status</span><span></span></div>';
    var ORD_LIMIT=6;
    var rows=[];
    var _ordList=_ordersShowAll?list:list.slice(0,ORD_LIMIT);
    var ordMoreN=list.length-ORD_LIMIT;
    _ordList.forEach(function(o){
      var st=stageStatus(o);
      var badge='';
      var freshBadge=o.fresh?'<span class="tag ok" style="margin-left:7px">New</span>':'';
      if(o.recert==='pending'&&o.anticipatedOff&&o.anticipatedOff<'2026-07-22'){
        badge='<span class="tag bad" style="margin-left:7px">Off-rent overdue</span>';
      } else if(o.rental&&o.rental.offRent){
        badge='<span style="margin-left:8px;font-size:10.5px;color:var(--g500)">Off-rent: '+o.rental.offRent+'</span>';
      } else if(o.anticipatedOff&&(!o.rental||!o.rental.offRent)){
        badge='<span style="margin-left:8px;font-size:10.5px;color:var(--g500)">Off-rent: '+new Date(o.anticipatedOff).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})+'</span>';
      } else if(ns){
        if(o.risk) badge = o.risk.type==='risk'?'<span class="tag bad" style="margin-left:7px">At risk</span>':'<span class="tag ok" style="margin-left:7px">Save $</span>';
        else if(o.rental) badge = '<span class="tag warn" style="margin-left:7px">Ending soon</span>';
      }
      var trk = trackerHTML(o, ns);
      rows.push('<div class="orow" id="row-'+o.id+'" onclick="toggleOrder(\''+o.id+'\')">'+
        '<div class="oc-id">'+o.id+'</div>'+
        '<div class="oc-item">'+o.item+freshBadge+badge+'<div class="sub">'+o.sub+'</div></div>'+
        '<div><span class="tag '+(o.pillar==='equipment'?'info':'neu')+'">'+pillarLabel(o.pillar)+'</span></div>'+
        '<div class="oc-origin">'+(o.plan?'<span class="tag info">Demand plan</span><span class="oo-ref">'+o.plan+'</span>':'<span class="tag neu">Ad-hoc</span>')+'</div>'+
        '<div class="oc-dates hide-sm">'+o.dates+'</div>'+
        '<div class="oc-cost hide-sm" title="'+o.cost+'">'+o.cost+'</div>'+
        '<div><span class="tag '+(STATUS_TAG[st]||'neu')+'">'+st+'</span></div>'+
        '<div>'+svg('<path d="M9 18l6-6-6-6"/>',2).replace('<svg ','<svg class="oc-chev" ')+'</div>'+
        '</div>'+
        '<div class="otrack" id="trk-'+o.id+'">'+trk+'</div>');
    });
    var ordMoreBtn=(!_ordersShowAll&&ordMoreN>0)?'<button class="show-more-btn" onclick="_ordersShowAll=true;renderOrders()">Show '+ordMoreN+' more orders ↓</button>':'';
    document.getElementById('ordTable').innerHTML = head + (rows.length?rows.join('')+'<div class="show-more-wrap">'+ordMoreBtn+'</div>':'<div style="padding:32px;text-align:center;color:var(--g400);font-size:12.5px">No orders match these filters.</div>');
  }

  function renderPortalQuotes(){
    var tbl=document.getElementById('ordTable'); if(!tbl)return;
    var gt='90px 1fr 130px 70px 120px';
    var h='<div class="ot-head" style="grid-template-columns:'+gt+'"><span>Ref</span><span>Description</span><span>Project</span><span>Status</span><span></span></div>';
    PORTAL_QUOTES.forEach(function(q){
      var isDraft=q.status==='Draft';
      var btn=isDraft
        ?'<button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();downloadDraftQuote(\''+q.ref+'\')">Draft PDF</button>'
        :'<button class="btn btn-red btn-sm" onclick="event.stopPropagation();downloadFullQuote(\''+q.ref+'\')">Download PDF</button>';
      h+='<div class="orow" id="qrow-'+q.ref+'" onclick="togglePortalQuote(\''+q.ref+'\')">'+
        '<div class="oc-id">'+q.ref+'</div>'+
        '<div style="font-size:11.5px;color:var(--g700)">'+q.note+'</div>'+
        '<div style="font-size:11.5px;color:var(--g700)">'+q.project+'<div class="sub">'+q.submitted+'</div></div>'+
        '<div><span class="tag '+(isDraft?'warn':'ok')+'">'+ q.status+'</span></div>'+
        '<div>'+btn+'</div>'+
        '</div>'+
        '<div class="otrack" id="qtrk-'+q.ref+'" style="display:none">'+quoteTrackerHTML(q)+'</div>';
    });
    h+='<div style="font-size:11.5px;color:var(--g500);padding:14px 0 4px">'+PORTAL_QUOTES.filter(function(q){return q.status==='Draft';}).length+' draft · '+PORTAL_QUOTES.filter(function(q){return q.status==='Complete';}).length+' complete. Drafts have items pending 02S pricing confirmation — full PDF is available once all items are confirmed.</div>';
    tbl.innerHTML=h;
  }
  function quoteTrackerHTML(q){
    var gt='1fr 130px 110px';
    var h='<div style="padding:12px 16px;background:var(--g50);border-top:1px solid var(--g100)">';
    h+='<div style="display:grid;grid-template-columns:'+gt+';gap:4px;font-size:10.5px;font-weight:700;color:var(--g500);text-transform:uppercase;letter-spacing:.04em;padding:4px 0;border-bottom:1px solid var(--g200);margin-bottom:6px"><span>Item</span><span>Period / qty</span><span style="text-align:right">Amount</span></div>';
    q.lineItems.forEach(function(li){
      h+='<div style="display:grid;grid-template-columns:'+gt+';gap:4px;padding:6px 0;border-bottom:1px solid var(--g100)">'+
        '<div><div style="font-size:12px;font-weight:500;color:var(--g900)">'+li.name+'</div><div style="font-size:11px;color:var(--g500)">'+li.pillar+'</div></div>'+
        '<div style="font-size:11.5px;color:var(--g700)">'+li.qty+'</div>'+
        '<div style="text-align:right;font-size:12px;font-weight:600;color:'+(li.amount?'var(--charcoal)':'var(--g400)')+'">'+( li.amount||'Pending 02S')+'</div>'+
        '</div>';
    });
    if(q.totalPriced){ h+='<div style="display:flex;justify-content:space-between;padding:8px 0 0;border-top:1px solid var(--g200);margin-top:4px"><span style="font-size:12px;font-weight:600">Total (confirmed pricing)</span><span style="font-size:13px;font-weight:700">'+q.totalPriced+'</span></div>'; }
    else { h+='<div style="font-size:11.5px;color:var(--g400);padding-top:6px">Total pending — complete once 02S confirms all line items.</div>'; }
    h+='</div>';
    return h;
  }
  function togglePortalQuote(ref){ var t=document.getElementById('qtrk-'+ref); if(t)t.style.display=t.style.display==='none'?'':'none'; }
  function downloadDraftQuote(ref){
    var q=PORTAL_QUOTES.filter(function(x){return x.ref===ref;})[0];
    toast('Draft PDF for '+ref+' — '+(q&&q.pendingN||'some')+' item(s) pending 02S pricing. Full quote will be emailed once 02S confirms.');
  }
  function downloadFullQuote(ref){ toast('Full quote PDF for '+ref+' — all items confirmed. Attach to Change Order or cost-plus reimbursement submission.'); }
  function renderPortalQuotesWidget(){
    var mount=document.getElementById('quotesWidgetMount'); if(!mount)return;
    var pending=PORTAL_QUOTES.filter(function(q){return q.status==='Draft';}).length;
    var complete=PORTAL_QUOTES.filter(function(q){return q.status==='Complete';}).length;
    var ICO_DOC='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><path d="M9 15h6M9 11h6M9 7h3"/></svg>';
    var h='<div style="margin-top:12px;background:#fff;border:1px solid var(--g200);border-radius:8px;padding:13px 16px">';
    h+='<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">';
    h+='<div style="font-size:12px;font-weight:700;color:var(--g900)">'+ICO_DOC+' &nbsp;Quotes</div>';
    h+='<button class="btn btn-ghost btn-sm" onclick="ordSetView(\'quotes\');go(\'orders\')">View all</button>';
    h+='</div>';
    h+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">';
    h+='<div class="vital warn" style="padding:10px 12px;cursor:pointer" onclick="ordSetView(\'quotes\');go(\'orders\')"><div class="vk">Awaiting 02S pricing</div><div class="vv">'+pending+'</div><div class="vsub">draft quote'+(pending===1?'':'s')+'</div></div>';
    h+='<div class="vital ok" style="padding:10px 12px;cursor:pointer" onclick="ordSetView(\'quotes\');go(\'orders\')"><div class="vk">Ready to download</div><div class="vv">'+complete+'</div><div class="vsub">full quote'+(complete===1?'':'s')+'</div></div>';
    h+='</div>';
    h+='</div>';
    mount.innerHTML=h;
  }

  function trackerHTML(o, ns){
    var arr=_stageArr(o);
    var icons=['<path d="M5 12h14M12 5l7 7-7 7"/>','<path d="M20 6L9 17l-5-5"/>','<path d="M20 7l-8-4-8 4m16 0l-8 4"/>','<rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/>','<path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>','<path d="M21 12a9 9 0 11-6.2-8.5"/>'];
    var steps=arr.map(function(lbl,i){
      var cls = i<o.stage?'done':(i===o.stage?'cur':'future');
      var ic = i<o.stage?'<path d="M20 6L9 17l-5-5"/>':icons[i];
      return '<div class="step '+cls+'"><span class="dot">'+svg(ic, cls==='done'?3:2)+'</span><span class="slbl">'+lbl+'</span></div>';
    }).join('');
    var parts=[];
    var _overdueOffRent=o.recert==='pending'&&o.anticipatedOff&&o.anticipatedOff<'2026-07-22';
    if(_overdueOffRent) parts.push('<div style="background:rgba(239,68,68,.07);border:1px solid rgba(239,68,68,.3);border-radius:7px;padding:10px 14px;margin-bottom:4px;display:flex;align-items:flex-start;gap:10px"><span style="flex-shrink:0;color:var(--red);margin-top:1px">'+svg('<path d="M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L14.7 3.9a2 2 0 00-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',2)+'</span><div><div style="font-size:12px;font-weight:700;color:var(--red)">Off-rent overdue</div><div style="font-size:11.5px;color:var(--g700);margin-top:2px">Anticipated return: '+new Date(o.anticipatedOff).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})+'\u00a0\u2014 no return request on file. Flagged on Customer Portal.</div></div></div>');
    if(o.rental) parts.push(eorHTML(o,ns));                          // show extend/return for all; NS adds savings banner
    parts.push('<div class="trk">'+steps+'</div>');                  // tracker (both versions)
    if(o.stage===5&&o.anticipatedOff&&(!o.rental||!o.rental.offRent)) parts.push('<div style="border-top:1px solid var(--g200);padding:8px 0 4px;font-size:11.5px;color:var(--g500)">Projected off-rent: '+new Date(o.anticipatedOff).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})+'</div>');
    if(o.latest) parts.push('<div class="latest-line'+(o.latestTone?' '+o.latestTone:'')+'"><span class="ll-k">Latest</span>'+o.latest+'</div>'); // both
    if(ns && o.risk) parts.push('<div class="track-insight '+(o.risk.type==='risk'?'risk':'opp')+'">'+svg(o.risk.type==='risk'?'<path d="M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L14.7 3.9a2 2 0 00-3.4 0z"/><path d="M12 9v4M12 17h.01"/>':'<path d="M12 2l2.4 7.4H22l-6 4.5 2.3 7.1-6.3-4.6L5.7 21l2.3-7.1-6-4.5h7.6z"/>',2)+'<div>'+o.risk.text+'</div></div>'); // NS insight
    if(ns && o.recv) parts.push(recvHTML(o));                        // NS: rich receiving details
    var _nts=ORDER_NOTES[o.id]; if(_nts&&_nts.length) parts.push(notesHTML(o,_nts));
    return parts.join('');
  }

  function notesHTML(o,notes){
    var h='<div style="border-top:1px solid var(--g200);padding:12px 0 4px">';
    var nsNoteBadge=CURRENT==='ns'?'<span class="tag warn" style="font-size:10px;margin-left:8px">1 awaiting 02S reply</span>':'';
    h+='<div style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--g500);margin-bottom:10px;display:flex;align-items:center">Notes &amp; history'+nsNoteBadge+'</div>';
    notes.forEach(function(n){
      h+='<div style="margin-bottom:10px">';
      h+='<div style="display:flex;gap:8px;align-items:baseline;margin-bottom:3px">';
      h+='<span style="font-size:12px;font-weight:600;color:var(--g900)">'+n.who+'</span>';
      h+='<span style="font-size:11px;color:var(--g400)">'+n.when+'</span></div>';
      h+='<div style="font-size:12.5px;color:var(--g700);line-height:1.5">'+n.text+'</div></div>';
    });
    h+='<div style="display:flex;gap:6px;margin-top:4px">';
    h+='<input style="flex:1;border:1px solid var(--g200);border-radius:6px;padding:6px 10px;font-size:12px;font-family:inherit;outline:none;color:var(--g900)" placeholder="Add a note or question to 02S…" id="note-'+o.id+'"/>';
    h+='<button class="btn btn-ghost btn-sm" onclick="postNote(\''+o.id+'\')">Send</button></div>';
    h+='</div>';
    return h;
  }
  function postNote(id){
    var inp=document.getElementById('note-'+id);
    if(!inp||!inp.value.trim()) return;
    toast('Note sent to 02S ops — you will be notified when they reply');
    inp.value='';
  }
  function eorHTML(o,ns){
    var r=o.rental;
    if(!r||!r.offRent) return '';
    return '<div style="border-top:1px solid var(--g200);padding:8px 0 4px;font-size:11.5px;color:var(--g500)">Projected off-rent: '+r.offRent+(r.daysLeft!=null?' · '+r.daysLeft+' day'+(r.daysLeft===1?'':'s')+' away':'')+'</div>';
  }

  function recvHTML(o){
    var r=o.recv, done=r.status==='completed';
    var hdrIcon = done?'<path d="M20 6L9 17l-5-5"/>':'<rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>';
    var hdrLbl = done?'Delivery completed ✓':'Delivery scheduled';
    var checks = (r.checklist||[]).map(function(c){
      return '<div class="ck-row'+(c.done?' done':' pending')+'">'+
        (c.done?'<span class="ck-ic">'+svg('<path d="M20 6L9 17l-5-5"/>',3)+'</span>':'<span class="ck-ic todo"></span>')+
        '<span class="ck-t">'+c.t+'</span><span class="ck-due">Due '+c.due+'</span></div>';
    }).join('');
    var docs = (r.docs||[]).map(function(d){
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

  /* ═══════════ BILLING & FINANCIALS ═══════════ */
  function getBill(id){return BILLS.filter(function(b){return b.id===id;})[0];}
  var billUI={}; // id -> '' | 'dispute' | 'edit'
  var BF_PILLAR='';
  var NS_SUB_JOBS=[
    {id:'SJ-001',name:'General Conditions',spw:true},
    {id:'SJ-002',name:'Site Preparation',  spw:true},
    {id:'SJ-003',name:'Demo & Clearing',   spw:false}, // no SPW commitment issued yet
    {id:'SJ-004',name:'Solar Installation',spw:true},
    {id:'SJ-005',name:'BESS & Electrical', spw:true},
    {id:'SJ-006',name:'Professional Support',spw:true}
  ];
  var COST_CODES=[
    // Equipment pillar
    {code:'0100-0540-0000-0001',name:'General conditions',    originalBudget:2100000,approvedCO:0,      pendingCO:45000, committed:1840000,spent:1140000, pillar:'equipment',subJob:'SJ-001'},
    {code:'0200-0320-0000-0001',name:'Site earthwork',         originalBudget:3000000,approvedCO:280000, pendingCO:0,     committed:3190000,spent:2200000,pillar:'equipment',subJob:'SJ-002'},
    {code:'0200-0310-0000-0001',name:'Demo & site clearing',   originalBudget:420000, approvedCO:0,      pendingCO:0,     committed:0,      spent:0,      pillar:'equipment',subJob:'SJ-003'},
    {code:'2600-3300-0000-0001',name:'BESS & Substation',      originalBudget:4800000,approvedCO:0,      pendingCO:320000,committed:2400000,spent:760000, pillar:'equipment',subJob:'SJ-005'},
    {code:'3100-6200-0000-0001',name:'Solar pile foundations', originalBudget:2400000,approvedCO:0,      pendingCO:0,     committed:1960000,spent:980000, pillar:'equipment',subJob:'SJ-002'},
    {code:'0500-0120-0000-0001',name:'Metals & structural',    originalBudget:960000, approvedCO:0,      pendingCO:0,     committed:1020000,spent:362000, pillar:'equipment',subJob:'SJ-004'},
    // Prefab pillar
    {code:'2200-0000-0000-0001',name:'MEP pipe racks & headwalls',       originalBudget:1840000,approvedCO:0,     pendingCO:80000,committed:1120000,spent:560000,pillar:'prefab',subJob:'SJ-004'},
    {code:'0300-0100-0000-0001',name:'Prefab concrete formwork',          originalBudget:580000, approvedCO:0,     pendingCO:0,    committed:340000, spent:120000,pillar:'prefab',subJob:'SJ-002'},
    {code:'0500-0500-0000-0001',name:'Prefab structural assemblies',      originalBudget:920000, approvedCO:60000, pendingCO:0,    committed:980000, spent:114000, pillar:'prefab',subJob:'SJ-004'},
    // Logistics pillar
    {code:'0100-5100-0000-0001',name:'Heavy haul & crane mobilization',originalBudget:640000,approvedCO:0,pendingCO:0,committed:280000,spent:108000, pillar:'logistics',subJob:'SJ-002'},
    {code:'0100-5200-0000-0001',name:'Freight & site staging',         originalBudget:320000,approvedCO:0,pendingCO:0,committed:180000,spent:68000, pillar:'logistics',subJob:'SJ-004'},
    // Procurement pillar
    {code:'0600-0100-0000-0001',name:'Bulk materials',       originalBudget:1200000,approvedCO:40000,pendingCO:0,committed:1295000,spent:410000,pillar:'procurement',subJob:'SJ-004'},
    {code:'0600-0200-0000-0001',name:'Hardware & safety',    originalBudget:380000, approvedCO:0,     pendingCO:0,committed:220000, spent:132000, pillar:'procurement',subJob:'SJ-004'},
    // Prof services pillar
    {code:'0100-0100-0000-0001',name:'General conditions — services',      originalBudget:1200000,approvedCO:0,pendingCO:0,    committed:980000,spent:560000,pillar:'profservices',subJob:'SJ-001'},
    {code:'0200-0100-0000-0001',name:'Geotechnical & special inspection',  originalBudget:320000, approvedCO:0,pendingCO:25000,committed:240000,spent:160000,pillar:'profservices',subJob:'SJ-006'},
    {code:'0100-0800-0000-0001',name:'Environmental monitoring',           originalBudget:180000, approvedCO:0,pendingCO:0,    committed:80000, spent:28000, pillar:'profservices',subJob:'SJ-006'}
  ];
  function ccBudget(c){return c.originalBudget+(c.approvedCO||0);}
  function ccProjected(c){return ccBudget(c)+(c.pendingCO||0);}
  function ccTone(c){var b=ccBudget(c);return c.committed>b?'bad':c.committed>b*.95?'warn':'ok';}
  function ccEAC(c){var b=ccBudget(c); if(!c.committed||!c.spent) return b; var cpi=c.spent/c.committed; return Math.round(b/Math.max(cpi,0.5));}
  function sjById(id){return NS_SUB_JOBS.filter(function(s){return s.id===id;})[0]||null;}
  function setPillarLabel(k){ var m={equipment:'Equipment',prefab:'Prefab',logistics:'Logistics',procurement:'Procurement',profservices:'Prof. services'}; return m[k]||k; }
  function renderBudget(){
    var mount=document.getElementById('budgetViz'); if(!mount)return;
    var ns=CURRENT==='ns';
    var list=BF_PILLAR?COST_CODES.filter(function(c){return c.pillar===BF_PILLAR;}):COST_CODES;
    if(!list.length){mount.innerHTML='';return;}
    var totB=0,totCO=0,totPend=0,totC=0,totA=0;
    list.forEach(function(c){totB+=c.originalBudget;totCO+=(c.approvedCO||0);totPend+=(c.pendingCO||0);totC+=c.committed;totA+=c.spent;});
    var totCurr=totB+totCO, totProj=totCurr+totPend;
    var pLabel=BF_PILLAR?setPillarLabel(BF_PILLAR):'All pillars';
    var commitPct=Math.round(totC/totCurr*100);
    var pendPct=Math.min(Math.round(totPend/totCurr*100),4);
    var tone=totC>totCurr?'bad':totC>totCurr*.95?'warn':'ok';
    var toneLabel=tone==='ok'?fmtBig(totCurr-totC)+' remaining':tone==='warn'?'Near budget limit':'Over budget';
    var h='<div class="budget-card'+(ns?' ns':'')+'">'+
      '<div class="bc-head">'+
        '<div><div class="bc-k">'+pLabel+' budget</div>'+
        '<div class="bc-plan">Current budget <b>'+fmtBig(totCurr)+'</b>'+(totCO?'<span class="bc-co"> +'+fmtBig(totCO)+' approved CO</span>':'')+(ns?' &middot; projected <b>'+fmtBig(totProj)+'</b>':'')+'</div></div>'+
        '<span class="tag '+tone+'">'+toneLabel+'</span>'+
      '</div>'+
      '<div class="budget-bar">'+
        '<span class="bseg-committed" style="width:'+Math.min(commitPct,100)+'%"></span>'+
        (pendPct?'<span class="bseg-pending" style="width:'+pendPct+'%;min-width:4px"></span>':'')+
      '</div>'+
      '<div class="budget-legend">'+
        '<span class="lg"><span class="sw" style="background:var(--success)"></span>Committed <b>'+fmtBig(totC)+'</b> &middot; '+commitPct+'%</span>'+
        '<span class="lg"><span class="sw" style="background:var(--warning)"></span>Spent (billed) <b>'+fmtBig(totA)+'</b></span>'+
        (totPend?'<span class="lg"><span class="sw" style="background:var(--amber,#f59e0b)"></span>Pending CO <b>'+fmtBig(totPend)+'</b></span>':'')+''+
        '<span class="lg"><span class="sw" style="background:var(--g200)"></span>Remaining <b>'+fmtBig(totCurr-totC)+'</b></span>'+
      '</div>';
    if(ns){
      var overBudget=list.filter(function(c){return ccTone(c)==='bad';});
      if(overBudget.length){h+='<div class="bc-flags"><div class="bc-flag bad">'+svg('<path d="M12 9v4M12 17h.01M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L14.7 3.9a2 2 0 00-3.4 0z"/>',2)+'<div><b>'+overBudget.length+' cost code'+(overBudget.length===1?'':'s')+' over budget:</b> '+overBudget.map(function(c){return c.code;}).join(', ')+'</div></div></div>';}
      var idleExp=ORDERS.filter(function(o){return o.recert==='pending'&&o.nsReco&&o.nsReco.rec==='return';});
      if(idleExp.length){h+='<div class="bc-flags"><div class="bc-flag warn">'+svg('<path d="M12 2l2.4 7.4H22l-6 4.5 2.3 7.1-6.3-4.6L5.7 21l2.3-7.1-6-4.5h7.6z"/>',2)+'<div><b>'+fmtBig(idleExp.reduce(function(s,o){return s+(o.mrate||0);},0))+'/mo idle exposure</b> — '+idleExp.length+' unit'+(idleExp.length===1?'':'s')+' flagged for early call-off</div></div></div>';}
    }
    h+='</div>';
    if(!BF_PILLAR){
      var gmPlan=10.9,gmCurr=10.4;
      var gmTone=gmCurr<gmPlan-1.0?'bad':gmCurr<gmPlan?'warn':'ok';
      var gmColor={ok:'var(--success)',warn:'var(--warning)',bad:'var(--red)'}[gmTone];
      h+='<div style="margin-top:16px;padding:14px 16px;background:#fff;border:1px solid var(--g200);border-radius:var(--radius)">';
      h+='<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">';
      h+='<div style="font-size:12px;font-weight:700;color:var(--g900)">Project gross margin</div>';
      h+='<button class="btn btn-ghost btn-sm" onclick="openMarginPlanModal()">Margin plan</button>';
      h+='</div>';
      h+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:8px">';
      h+='<div><div style="font-size:10px;color:var(--g500);margin-bottom:2px;text-transform:uppercase;letter-spacing:.04em">Margin plan target</div><div style="font-size:17px;font-weight:700;color:var(--charcoal)">'+gmPlan+'%</div><div style="font-size:11px;color:var(--g500)">set at project kickoff</div></div>';
      h+='<div><div style="font-size:10px;color:var(--g500);margin-bottom:2px;text-transform:uppercase;letter-spacing:.04em">Current gross margin</div><div style="font-size:17px;font-weight:700;color:'+gmColor+'">'+gmCurr+'%</div><div style="font-size:11px;color:var(--g500)">'+fmtBig(Math.round((gmPlan-gmCurr)/100*22600000))+' below plan</div></div>';
      h+='<div><div style="font-size:10px;color:var(--g500);margin-bottom:2px;text-transform:uppercase;letter-spacing:.04em">Enterprise contribution</div><div style="font-size:17px;font-weight:700;color:var(--charcoal)">'+fmtBig(Math.round(gmCurr/100*22600000))+'</div><div style="font-size:11px;color:var(--g500)">gross profit · '+gmCurr+'% of $16.8M</div></div>';
      h+='</div>';
      h+='<div style="font-size:11.5px;color:var(--g600);padding-top:8px;border-top:1px solid rgba(38,93,159,.12)">Tracking against budget &amp; financials — '+fmtBig(Math.round((gmPlan-gmCurr)/100*22600000))+' gap driven by crane re-rent premium on BESS. <span class="lk" onclick="go(\'billing\')">View cost breakdown</span></div>';
      h+='</div>';
    }
    mount.innerHTML=h;
  }
  function toggleCostCodes(){
    var t=gel('costCodeTable'),ch=gel('ccChevron'); if(!t||!ch)return;
    var open=t.style.display!=='none';
    t.style.display=open?'none':'';
    ch.textContent=open?'▼ show':'▲ hide';
    if(!open) renderCostCodes();
  }
  function setBfPillar(p){
    BF_PILLAR=p;
    document.querySelectorAll('.bf-tab').forEach(function(b){
      var oc=b.getAttribute('onclick')||'';
      var isAll=(b.textContent.trim()==='All pillars');
      b.classList.toggle('on',(isAll&&!p)||(oc.indexOf("'"+p+"'")>-1&&!isAll&&p));
    });
    renderBudget(); renderCostCodes(); renderBills(); renderPending();
  }
  function renderCostCodes(){
    var mount=document.getElementById('costCodeTable'); if(!mount||mount.style.display==='none')return;
    var ns=CURRENT==='ns';
    var fullList=BF_PILLAR?COST_CODES.filter(function(c){return c.pillar===BF_PILLAR;}):COST_CODES;
    if(!fullList.length){mount.innerHTML='<div style="padding:20px;color:var(--g400);font-size:13px">No cost codes for this pillar.</div>';return;}
    // group by pillar when viewing all
    var pillarsShown=BF_PILLAR?[BF_PILLAR]:['equipment','prefab','logistics','procurement','profservices'];
    // NS mode: 8-col table with sub-job grouping + EAC/variance
    // V1 mode: 7-col table grouped by pillar only
    var nsColSpec='2fr 1fr .8fr 1fr 1.1fr .85fr .85fr .85fr';
    var v1ColSpec='2fr 1fr .8fr 1fr 1.2fr .9fr .9fr';
    var colSpec=ns?nsColSpec:v1ColSpec;
    mount.style.setProperty('--cc-cols',colSpec);
    var head='<div class="cc-table-head">'
      +'<span>Cost code</span>'
      +'<span class="r">Orig. budget</span>'
      +'<span class="r">Approved CO</span>'
      +'<span class="r">Curr. budget</span>'
      +'<span class="r">Committed</span>'
      +'<span class="r">Spent</span>'
      +(ns?'<span class="r">EAC</span><span class="r">Variance</span>':'<span>Status</span>')
      +'</div>';
    var body='';
    var gTotOrig=0,gTotCO=0,gTotCurr=0,gTotC=0,gTotS=0,gTotEAC=0;
    pillarsShown.forEach(function(pil){
      var grp=fullList.filter(function(c){return c.pillar===pil;});
      if(!grp.length) return;
      if(!BF_PILLAR) body+='<div class="cc-pillar-hdr">'+setPillarLabel(pil)+'</div>';

      if(ns){
        // group by sub-job within pillar
        var sjIds=[]; grp.forEach(function(c){if(sjIds.indexOf(c.subJob)<0) sjIds.push(c.subJob);});
        sjIds.forEach(function(sjId){
          var sjMeta=sjById(sjId);
          var sjCodes=grp.filter(function(c){return c.subJob===sjId;});
          var sjB=0,sjC=0,sjS=0; sjCodes.forEach(function(c){sjB+=ccBudget(c);sjC+=c.committed;sjS+=c.spent;});
          var noSpw=sjMeta&&!sjMeta.spw;
          body+='<div class="cc-sj-hdr">'
            +'<span class="cc-sj-id">'+(sjMeta?sjMeta.id:sjId)+'</span>'
            +'<span class="cc-sj-name">'+(sjMeta?sjMeta.name:sjId)+'</span>'
            +(noSpw?'<span class="tag warn cc-sj-spw">No SPW commitment</span>':'')
            +'<span class="cc-sj-sum">'+fmtBig(sjB)+' budget · '+fmtBig(sjC)+' committed · '+fmtBig(sjS)+' spent</span>'
            +'</div>';
          sjCodes.forEach(function(c){
            var curr=ccBudget(c), pct=Math.min(Math.round(c.committed/Math.max(curr,1)*100),999), tone=ccTone(c);
            var barW=Math.min(pct,100);
            var barCol=tone==='bad'?'var(--red)':tone==='warn'?'var(--warning)':'var(--success)';
            var coTxt=c.approvedCO>0?'+'+fmtBig(c.approvedCO):c.approvedCO<0?'−'+fmtBig(-c.approvedCO):'—';
            var coClass=c.approvedCO>0?'cc-co-pos':c.approvedCO<0?'cc-co-neg':'cc-co-nil';
            var eac=ccEAC(c), variance=curr-eac;
            var varClass=variance<0?'cc-var-bad':variance<curr*.05?'cc-var-warn':'cc-var-ok';
            var noCommit=!c.committed&&noSpw;
            body+='<div class="cc-row'+(noCommit?' cc-row-dim':'')+'">'
              +'<div><div class="cc-code">'+c.code+'</div><div class="cc-cname">'+c.name+(c.pendingCO?'<span class="cc-pend-flag"> · '+fmtBig(c.pendingCO)+' pending CO</span>':'')+(noCommit?'<span class="cc-pend-flag"> · awaiting commitment</span>':'')+'</div></div>'
              +'<div class="r cc-num">'+fmtBig(c.originalBudget)+'</div>'
              +'<div class="r cc-num"><span class="'+coClass+'">'+coTxt+'</span></div>'
              +'<div class="r cc-num cc-curr">'+fmtBig(curr)+'</div>'
              +'<div class="r cc-num">'+(noCommit?'<span class="cc-co-nil">—</span>':'<div class="cc-bar-wrap"><div class="cc-mini-bar" style="width:'+barW+'%;background:'+barCol+'"></div></div><span>'+fmtBig(c.committed)+'</span><span class="cc-pct">'+pct+'%</span>')+'</div>'
              +'<div class="r cc-num">'+(noCommit?'<span class="cc-co-nil">—</span>':fmtBig(c.spent))+'</div>'
              +'<div class="r cc-num">'+(noCommit?'<span class="cc-co-nil">—</span>':fmtBig(eac))+'</div>'
              +'<div class="r cc-num"><span class="'+varClass+'">'+(noCommit?'—':(variance>=0?'+':'')+fmtBig(variance))+'</span></div>'
              +'</div>';
            gTotOrig+=c.originalBudget; gTotCO+=(c.approvedCO||0); gTotCurr+=curr; gTotC+=c.committed; gTotS+=c.spent; gTotEAC+=eac;
          });
        });
      } else {
        grp.forEach(function(c){
          var curr=ccBudget(c), pct=Math.min(Math.round(c.committed/Math.max(curr,1)*100),999), tone=ccTone(c);
          var barW=Math.min(pct,100);
          var barCol=tone==='bad'?'var(--red)':tone==='warn'?'var(--warning)':'var(--success)';
          var coTxt=c.approvedCO>0?'+'+fmtBig(c.approvedCO):c.approvedCO<0?'−'+fmtBig(-c.approvedCO):'—';
          var coClass=c.approvedCO>0?'cc-co-pos':c.approvedCO<0?'cc-co-neg':'cc-co-nil';
          body+='<div class="cc-row">'
            +'<div><div class="cc-code">'+c.code+'</div><div class="cc-cname">'+c.name+(c.pendingCO?'<span class="cc-pend-flag"> · '+fmtBig(c.pendingCO)+' pending CO</span>':'')+'</div></div>'
            +'<div class="r cc-num">'+fmtBig(c.originalBudget)+'</div>'
            +'<div class="r cc-num"><span class="'+coClass+'">'+coTxt+'</span></div>'
            +'<div class="r cc-num cc-curr">'+fmtBig(curr)+'</div>'
            +'<div class="r cc-num">'
              +'<div class="cc-bar-wrap"><div class="cc-mini-bar" style="width:'+barW+'%;background:'+barCol+'"></div></div>'
              +'<span>'+fmtBig(c.committed)+'</span><span class="cc-pct">'+pct+'%</span>'
            +'</div>'
            +'<div class="r cc-num">'+fmtBig(c.spent)+'</div>'
            +'<div><span class="tag '+tone+'">'+(tone==='ok'?'On track':tone==='warn'?'Near limit':'Over budget')+'</span></div>'
            +'</div>';
          gTotOrig+=c.originalBudget; gTotCO+=(c.approvedCO||0); gTotCurr+=curr; gTotC+=c.committed; gTotS+=c.spent;
        });
      }
    });
    var footPct=Math.min(Math.round(gTotC/Math.max(gTotCurr,1)*100),999);
    var totalVar=gTotCurr-gTotEAC;
    var foot='<div class="cc-row cc-foot">'
      +'<div><b>Total</b></div>'
      +'<div class="r cc-num"><b>'+fmtBig(gTotOrig)+'</b></div>'
      +'<div class="r cc-num"><b class="cc-co-pos">+'+fmtBig(gTotCO)+'</b></div>'
      +'<div class="r cc-num cc-curr"><b>'+fmtBig(gTotCurr)+'</b></div>'
      +'<div class="r cc-num"><b>'+fmtBig(gTotC)+'</b><span class="cc-pct">'+footPct+'%</span></div>'
      +'<div class="r cc-num"><b>'+fmtBig(gTotS)+'</b></div>'
      +(ns?'<div class="r cc-num"><b>'+fmtBig(gTotEAC)+'</b></div><div class="r cc-num"><span class="'+(totalVar<0?'cc-var-bad':'cc-var-ok')+'">'+(totalVar>=0?'+':'')+fmtBig(totalVar)+'</span></div>':'<div></div>')
      +'</div>';
    mount.innerHTML=head+body+foot;
  }

  // ── Billing history table (moved here from Orders) ──
  var _BMONS=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  function _billDateISO(s){ if(!s)return ''; var pts=s.split(' '); var m=_BMONS.indexOf(pts[0])+1; if(m<1)return ''; return '2026-'+('0'+m).slice(-2)+'-'+('0'+(pts[1]||'1')).slice(-2); }
  function billClearDates(){ var a=document.getElementById('billFrom'); if(a)a.value=''; var b=document.getElementById('billTo'); if(b)b.value=''; renderBills(); }
  function renderBills(){
    var host=document.getElementById('billHist'); if(!host) return;
    var ns=CURRENT==='ns';
    var q=(document.getElementById('billSearch').value||'').toLowerCase().trim();
    var fs=document.getElementById('billStatus').value, fc=document.getElementById('billCost').value;
    var bf=(document.getElementById('billFrom')||{}).value||'';
    var bt=(document.getElementById('billTo')||{}).value||'';
    var list=BILLS.filter(function(b){
      if(fs && b.status!==fs) return false;
      if(fc && b.cost!==fc) return false;
      if(bf && b.date && _billDateISO(b.date)<bf) return false;
      if(bt && b.date && _billDateISO(b.date)>bt) return false;
      if(q && (b.id.toLowerCase().indexOf(q)<0 && b.order.toLowerCase().indexOf(q)<0 && b.product.toLowerCase().indexOf(q)<0)) return false;
      return true;
    });
    var lbl=document.getElementById('billCountLbl'); if(lbl) lbl.textContent='· '+list.length+' bill'+(list.length===1?'':'s');
    var head='<div class="ot-head bt-head"><span>Bill</span><span>Order</span><span>Product</span><span class="r">Amount</span><span class="hide-sm">Cost code</span><span>Status</span></div>';
    var rows=[];
    list.forEach(function(b){
      var anom = '';
      var isPend=b.status==='Pending';
      var isFin=b.status==='Finalized';
      var statusCell=isPend
        ?'<div style="display:flex;align-items:center;gap:6px"><span class="tag '+(STATUS_TAG[b.status]||'neu')+'">'+b.status+'</span><button class="btn btn-ghost btn-sm" style="font-size:11px;padding:2px 8px" onclick="openBillModal(\''+b.id+'\')">Review</button></div>'
        :'<div style="display:flex;align-items:center;gap:5px"><span class="tag '+(STATUS_TAG[b.status]||'neu')+'">'+b.status+'</span>'+(isFin?'<button class="btn btn-ghost btn-sm" style="font-size:11px;padding:2px 7px" onclick="openBillPDFModal(\''+b.id+'\')" title="View PDF">PDF</button>':'')+'</div>';
      rows.push('<div class="brow">'+
        '<div class="oc-id">'+b.id+'</div>'+
        '<div><span class="oc-link" onclick="jumpToOrder(\''+b.order+'\')">'+b.order+'</span></div>'+
        '<div class="oc-item" style="font-weight:500">'+b.product+anom+'</div>'+
        '<div class="oc-amt r">'+fmt(b.amt)+'</div>'+
        '<div class="oc-cost hide-sm">'+b.cost+'</div>'+
        statusCell+
        '</div>');
    });
    var BILL_LIMIT=6;
    var moreN=rows.length-BILL_LIMIT;
    var vis=_billsShowAll?rows:rows.slice(0,BILL_LIMIT);
    var moreBtn=(!_billsShowAll&&moreN>0)?'<button class="show-more-btn" onclick="_billsShowAll=true;renderBills()">Show '+moreN+' more ↓</button>':'';
    host.innerHTML=head+(rows.length?vis.join('')+'<div class="show-more-wrap">'+moreBtn+'</div>':'<div style="padding:32px;text-align:center;color:var(--g400);font-size:12.5px">No bills match these filters.</div>');
  }

  var _billsShowAll=false; var _ordersShowAll=false; var _fqShowAll=false;
  var _billExFilter='all';
  function _billExRows(filter){
    var fin=BILLS.filter(function(b){return b.status==='Finalized';});
    var ns=CURRENT==='ns';
    var anomIds=ns?BILLS.filter(function(b){return b.anomaly;}).map(function(b){return b.id;}):[];
    if(filter&&filter!=='all'){
      var df=document.getElementById('billExFrom'),dt=document.getElementById('billExTo');
      if(filter==='custom'&&df&&dt&&df.value&&dt.value){
        // custom date range — compare by month string matching
        fin=fin.filter(function(b){
          var mons=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
          var bDate=new Date(b.date+' 2026'); var from=new Date(df.value); var to=new Date(dt.value);
          return !isNaN(bDate)&&bDate>=from&&bDate<=to;
        });
      } else {
        fin=fin.filter(function(b){return b.date&&b.date.indexOf(filter)>=0;});
      }
    }
    if(_billExCO) fin=fin.filter(function(b){return b.co===_billExCO;});
    if(!fin.length) return '<div style="font-size:12.5px;color:var(--g400);padding:8px 0">No invoices match this filter.</div>';
    return fin.map(function(b){
      var anomBadge=anomIds.indexOf(b.id)>=0?'<span class="tag bad" style="font-size:10px;margin-left:4px">Anomaly</span>':'';
      return '<label style="display:flex;align-items:center;gap:8px;padding:7px 0;border-bottom:1px solid var(--g100,var(--g200));cursor:pointer"><input type="checkbox" class="bill-ex-cb" value="'+b.id+'" checked style="accent-color:var(--red);width:14px;height:14px"/><span style="flex:1;font-size:12px;color:var(--g800)">'+b.id+' · '+b.product+anomBadge+'</span><span style="font-size:12px;color:var(--g500);white-space:nowrap">'+fmt(b.amt)+'</span></label>';
    }).join('');
  }
  function setBillExFilter(f){
    _billExFilter=f;
    document.querySelectorAll('.bex-quick').forEach(function(b){b.classList.toggle('on',b.dataset.f===f);});
    var mount=document.getElementById('billExRows');
    if(mount) mount.innerHTML=_billExRows(f);
    var cr=document.getElementById('billExCustom');
    if(cr) cr.style.display=f==='custom'?'flex':'none';
  }
  function setBillExCO(coId){
    _billExCO=(_billExCO===coId?'':coId);
    document.querySelectorAll('.bex-co').forEach(function(b){b.classList.toggle('on',b.dataset.co===_billExCO);});
    var mount=document.getElementById('billExRows');
    if(mount) mount.innerHTML=_billExRows(_billExFilter);
  }
  function doExportPDF(){
    var cbs=document.querySelectorAll('.bill-ex-cb:checked');
    var ids=[]; cbs.forEach(function(c){ids.push(c.value);});
    if(!ids.length){toast('Select at least one invoice');return;}
    closeModal();
    toast('PDF exported — '+ids.length+' invoice'+(ids.length===1?'':'s')+' · check Downloads');
  }
  function openBillPDFModal(id){
    openModal('<div><b>Bill PDF</b><div style="font-size:12px;font-weight:400;color:var(--g500);margin-top:2px">'+id+'</div></div>',
      '<div style="text-align:center;padding:32px 16px">'
      +'<div style="width:48px;height:48px;background:var(--g100);border-radius:10px;display:flex;align-items:center;justify-content:center;margin:0 auto 14px">'+svg('<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M9 15h6"/>',2)+'</div>'
      +'<div style="font-size:14px;font-weight:650;color:var(--g900);margin-bottom:8px">Bill PDF</div>'
      +'<div style="font-size:12.5px;color:var(--g500);max-width:280px;margin:0 auto">This is where your bill PDF for <b style="color:var(--g800)">'+id+'</b> would show — once connected to the billing system the finalized invoice will be available for download.</div>'
      +'</div>'
      +'<div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal()">Close</button></div>');
  }
  function selectAllBillEx(){
    var cbs=document.querySelectorAll('.bill-ex-cb');
    var allChecked=Array.from(cbs).every(function(c){return c.checked;});
    cbs.forEach(function(c){c.checked=!allChecked;});
    var btn=document.getElementById('billExSelAll');
    if(btn) btn.textContent=allChecked?'Select all':'Deselect all';
  }
  function openBillExportModal(){
    var ns=CURRENT==='ns';
    var anomCount=ns?BILLS.filter(function(b){return b.anomaly&&b.status==='Finalized';}).length:0;
    var anomStrip=ns&&anomCount?'<div style="background:var(--warning-tint);border:1px solid rgba(138,109,31,.25);border-radius:6px;padding:8px 12px;font-size:12px;color:var(--g800);margin-bottom:12px;display:flex;align-items:center;gap:8px">'+svg('<path d="M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L14.7 3.9a2 2 0 00-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',2)+'<span><b>'+anomCount+' invoice'+(anomCount===1?' has':'s have')+' a flagged anomaly</b> — review before exporting</span></div>':'';
    var pageFrom=(document.getElementById('billFrom')||{}).value||'';
    var pageTo=(document.getElementById('billTo')||{}).value||'';
    var _MNS=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var monthLabel='';
    if(pageFrom&&pageTo){
      var _fd=new Date(pageFrom),_td=new Date(pageTo);
      if(!isNaN(_fd)&&!isNaN(_td)&&_fd.getMonth()===_td.getMonth()&&_fd.getFullYear()===_td.getFullYear()){
        var _ld=new Date(_fd.getFullYear(),_fd.getMonth()+1,0).getDate();
        if(_fd.getDate()===1&&_td.getDate()===_ld) monthLabel=_MNS[_fd.getMonth()]+' '+_fd.getFullYear();
      }
    }
    var initFilter=(pageFrom&&pageTo)?'custom':'all';
    var initFrom=pageFrom||'';
    var initTo=pageTo||'';
    _billExFilter=initFilter;
    var customLbl=monthLabel||'Custom range';
    var body=anomStrip
      +'<div style="margin-bottom:12px">'
      +'<div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:var(--g500);margin-bottom:8px">Filter by period</div>'
      +'<div style="display:flex;gap:7px;flex-wrap:wrap;margin-bottom:10px">'
      +'<button class="btn btn-ghost btn-sm bex-quick'+(initFilter==='all'?' on':'')+'" data-f="all" onclick="setBillExFilter(\'all\')">All finalized</button>'
      +'<button class="btn btn-ghost btn-sm bex-quick'+(initFilter==='custom'?' on':'')+'" data-f="custom" onclick="setBillExFilter(\'custom\')">'+customLbl+'</button>'
      +'</div>'
      +'<div id="billExCustom" style="display:'+(initFilter==='custom'?'flex':'none')+';gap:8px;align-items:center;margin-bottom:10px">'
      +'<input type="date" id="billExFrom" style="border:1px solid var(--g200);border-radius:6px;padding:5px 8px;font-size:12px;font-family:inherit" value="'+initFrom+'" onchange="setBillExFilter(\'custom\')">'
      +'<span style="font-size:12px;color:var(--g500)">–</span>'
      +'<input type="date" id="billExTo" style="border:1px solid var(--g200);border-radius:6px;padding:5px 8px;font-size:12px;font-family:inherit" value="'+initTo+'" onchange="setBillExFilter(\'custom\')">'
      +'</div>'
      +'<div style="margin-bottom:12px">'
      +'<div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:var(--g500);margin-bottom:8px">Filter by change order</div>'
      +'<div style="display:flex;gap:7px;flex-wrap:wrap">'
      +CHANGE_ORDERS.map(function(co){var badge=co.status==='Approved'?'<span style="font-size:9px;background:var(--success);color:#fff;border-radius:3px;padding:1px 5px;margin-left:4px">APR</span>':'<span style="font-size:9px;background:var(--warning);color:#fff;border-radius:3px;padding:1px 5px;margin-left:4px">PEND</span>';return '<button class="btn btn-ghost btn-sm bex-co" data-co="'+co.id+'" onclick="setBillExCO(\''+co.id+'\')" title="'+co.desc+'">'+co.id+badge+'</button>';}).join('')
      +'</div>'
      +'</div>'
      +'<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">'
      +'<div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:var(--g500)">Select invoices <span style="text-transform:none;font-weight:400;color:var(--g400)">(finalized only — auto-approved at day 10)</span></div>'
      +'<button class="btn btn-ghost btn-sm" style="font-size:11px;padding:2px 8px" id="billExSelAll" onclick="selectAllBillEx()">Select all</button>'
      +'</div>'
      +'<div id="billExRows">'+_billExRows(initFilter)+'</div>'
      +'</div>'
      +'<div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button>'
      +'<button class="btn btn-red" onclick="doExportPDF()">'+svg('<path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>',2)+' Export PDF</button></div>';
    openModal('<div><b>Export invoices as PDF</b><div style="font-size:12px;font-weight:400;color:var(--g500);margin-top:2px">Select invoices to include in the export</div></div>',body);
  }
  function openWhatsNewModal(idx){
    var WN=[
      {badge:'New',badgeTone:'var(--info)',title:'Prefab Pod Express',
       body:'Modular restroom pods are now stocked and available with a 3-week lead time — dramatically faster than traditional procurement through a GC or specialty sub. Pods come fully pre-plumbed and pre-wired. 02S can handle delivery, set, and connection on-site. This line is live in the 02S catalog now under Prefab › Modular Pods.',
       why:'Projects with remote or phased laydown often wait 8–12 weeks for site sanitation. With Pod Express, mobilization day-1 sanitation is now achievable.',
       contact:{name:'Sarah Chen',role:'Prefab Solutions Lead',phone:'(555) 347-2200',email:'s.chen@02s.io'}},
      {badge:'Win',badgeTone:'var(--success)',title:'$96K saved on Riverside Medical',
       body:'On the Riverside Medical Center project, 02S redeployed 3 excavators that had gone idle on a different project instead of re-renting. Fleet utilization on Riverside jumped from 61% to 86%. The $96K in avoided re-rent was confirmed in the final billing reconciliation.',
       why:'02S now actively monitors idle units across all active projects and proactively flags redeployment opportunities in the portal. You’ll see this in the Telematics KPI on your dashboard.',
       contact:{name:'Marcus Webb',role:'Fleet Optimization',phone:'(555) 482-3190',email:'m.webb@02s.io'}},
      {badge:'Update',badgeTone:'var(--charcoal)',title:'Telematics now live on yellow iron',
       body:'GPS telematics and utilization tracking is now active on all tracked heavy equipment (excavators, cranes, dozers, graders). You’ll see idle alerts, weekly usage stats, and engine-hour totals directly in your demand plan and dashboard. Alerts fire when a unit goes idle for 5+ consecutive days.',
       why:'Previously, idle detection required a call to 02S dispatch. Now it’s automated and surfaced in your portal. The Fleet utilization KPI on your NS dashboard reflects this data live.',
       contact:{name:'James Rowe',role:'Data & Analytics',phone:'(555) 291-0044',email:'j.rowe@02s.io'}}
    ];
    var item=WN[idx]||WN[0];
    var ns=CURRENT==='ns';
    var body='<div style="padding-bottom:4px">'
      +'<div style="display:flex;align-items:center;gap:7px;margin-bottom:14px">'
      +'<span style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:#fff;padding:2px 7px;border-radius:3px;background:'+item.badgeTone+'">'+item.badge+'</span>'
      +'<span style="font-size:15px;font-weight:700;color:var(--g900)">'+item.title+'</span>'
      +'</div>'
      +'<div style="font-size:13px;color:var(--g700);line-height:1.65;margin-bottom:14px">'+item.body+'</div>'
      +'<div style="background:var(--g50);border-radius:7px;padding:10px 12px;margin-bottom:14px;font-size:12px;color:var(--g700);line-height:1.6">'
      +item.why
      +'</div>'
      +(ns?'<div style="background:var(--info-tint);border:1px solid rgba(38,93,159,.18);border-radius:7px;padding:9px 12px;margin-bottom:14px;font-size:12px;color:var(--g700)"><b>North Star note:</b> This feature is fully integrated with your CPM schedule and demand plan data. 02S will surface relevant recommendations automatically as project conditions change.</div>':'')
      +'<div style="border-top:1px solid var(--g150);padding-top:13px;display:flex;align-items:center;gap:14px">'
      +'<div style="flex:1">'
      +'<div style="font-size:12px;font-weight:600;color:var(--g900)">'+item.contact.name+'</div>'
      +'<div style="font-size:11.5px;color:var(--g500)">'+item.contact.role+' &middot; 02S Equipment</div>'
      +'</div>'
      +'<a href="tel:'+item.contact.phone+'" style="font-size:12px;color:var(--info);text-decoration:none;display:flex;align-items:center;gap:5px">'+svg('<path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013 5.18 2 2 0 015 3h3a2 2 0 012 1.72c.13.98.36 1.94.7 2.86a2 2 0 01-.45 2.11L9 11a16 16 0 006 6l1.31-1.25a2 2 0 012.11-.45c.92.34 1.88.57 2.86.7A2 2 0 0122 16.92z"/>',2)+item.contact.phone+'</a>'
      +'<a href="mailto:'+item.contact.email+'" style="font-size:12px;color:var(--info);text-decoration:none;display:flex;align-items:center;gap:5px">'+svg('<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',2)+item.contact.email+'</a>'
      +'</div>'
      +'</div>'
      +(idx===0?'<div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal()">Close</button>'
      +'<button class="btn btn-red" onclick="closeModal();go(\'order\')">Request Prefab Pod Express</button></div>'
      :'<div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal()">Close</button></div>');
    openModal(item.title,body);
  }
  // ── Pending review & approval (10-day window) ──
  function renderPending(){
    var host=document.getElementById('pendingWrap'); if(!host) return;
    var ns=CURRENT==='ns';
    var pend=BILLS.filter(function(b){return b.status==='Pending';});
    pend.sort(function(a,b){ return b.day-a.day; });
    if(!pend.length){ host.innerHTML='<div class="pc-empty">'+svg('<path d="M20 6L9 17l-5-5"/>',2)+'<div><b>All caught up.</b> No bills in the 10-day window right now.</div></div>'; return; }
    var extra=pend.length>3?pend.length-3:0;
    pend=pend.slice(0,3);
    host.innerHTML = pend.map(function(b){
      var urg = b.day>=8?'red':(b.day>=5?'gold':'neu');
      var left = 10-b.day;
      var mode = billUI[b.id]||'';
      var anomCard = (ns && b.anomaly) ? '<div class="pc-anom">'+svg('<path d="M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L14.7 3.9a2 2 0 00-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',2)+'<div><b>'+b.anomaly+'</b> — '+(b.reason||'')+'. <span class="pc-rec">02S recommends you dispute.</span></div></div>' : '';
      var chargesHtml='';
      if(b.charges&&b.charges.length){
        chargesHtml='<div class="pc-charges">'
          +b.charges.map(function(c,ci){
            var curCost=c.cost||b.cost;
            var ccOpts=[
              {v:'01-0540-0000-0001',l:'01-0540-0000-0001 · General conditions'},
              {v:'26-0330-0000-0001',l:'26-0330-0000-0001 · BESS &amp; Substation'},
              {v:'03-0000-0000-0001',l:'03-0000-0000-0001 · Concrete'},
              {v:'05-0000-0000-0001',l:'05-0000-0000-0001 · Metals'},
              {v:'09-0000-0000-0001',l:'09-0000-0000-0001 · Finishes'},
              {v:'31-0620-0000-0001',l:'31-0620-0000-0001 · Earthwork / Piling'},
              {v:'22-0000-0000-0001',l:'22-0000-0000-0001 · Plumbing'},
              {v:'16-0000-0000-0001',l:'16-0000-0000-0001 · Electrical'},
              {v:'01-5100-0000-0001',l:'01-5100-0000-0001 · Logistics — heavy haul'},
              {v:'06-0100-0000-0001',l:'06-0100-0000-0001 · Procurement — materials'}
            ];
            var knownVals=ccOpts.map(function(o){return o.v;});
            var isKnown=knownVals.some(function(v){return curCost&&curCost.indexOf(v.substring(0,7))>-1;});
            var selVal=isKnown?curCost:'';
            var ccInput=(mode==='edit')
              ?'<div class="cc-pick-wrap">'+
                '<select class="rin cc-sel" id="cc-'+b.id+'-'+ci+'" onchange="ccSelChange(this,\''+b.id+'\','+ci+')" style="width:100%;font-size:11px;margin-bottom:0">'+
                '<option value="">— select cost code —</option>'+
                ccOpts.map(function(o){return '<option value="'+o.v+'"'+(selVal===o.v?' selected':'')+'>'+o.l+'</option>';}).join('')+
                '<option value="__new__">+ Add new cost code...</option>'+
                '</select>'+
                '<input class="rin" id="cc-new-'+b.id+'-'+ci+'" style="display:'+(selVal?'none':'')+'none;width:100%;font-size:11px;font-family:monospace;margin-top:4px" placeholder="Enter 16-digit code (e.g. 01-0540-0000-0002)">'+
              '</div>'
              :'<span class="pch-cc">'+(c.cost||b.cost)+'</span>';
            return '<div class="pch-row"><span class="pch-d">'+c.desc+'</span>'+ccInput+'<span class="pch-a">'+fmt(c.amt)+'</span></div>';
          }).join('')
          +'<div class="pch-row pch-total"><span class="pch-d">Total</span><span class="pch-a">'+fmt(b.amt)+'</span></div>'
          +'</div>';
      }
      // inline panels
      var inline='';
      if(mode==='dispute'){ inline=billDisputeInline(b,ns); }
      else if(mode==='edit'){ inline=billEditInline(b); }
      var notes = b.notes ? '<span class="pc-notes" onclick="openBillDiscuss(\''+b.id+'\')">'+svg('<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>',2)+b.notes+' note'+(b.notes===1?'':'s')+'</span>' : '<span class="pc-notes" onclick="openBillDiscuss(\''+b.id+'\')">'+svg('<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>',2)+'Discuss</span>';
      var audit = b.audit ? '<span class="pc-audit">'+b.audit+'</span>' : '<span class="pc-audit">Awaiting your review</span>';
      return '<div class="pcard'+(urg==='red'?' urg':'')+'" id="pc-'+b.id+'">'+
        '<div class="pc-top">'+
          '<div class="pc-idwrap"><span class="oc-id">'+b.id+'</span><span class="pc-from">from</span><span class="oc-link" onclick="jumpToOrder(\''+b.order+'\')">'+b.order+'</span></div>'+
          '<div class="pc-amt">'+fmt(b.amt)+'</div>'+
        '</div>'+
        '<div class="pc-prod">'+b.product+'<span class="pc-cc">'+b.cost+'</span></div>'+
        anomCard+
        chargesHtml+
        '<div class="pc-window">'+
          '<div class="pw-meter"><span class="pw-'+urg+'" style="width:'+(b.day*10)+'%"></span></div>'+
          '<div class="pw-lbl">Day <b>'+b.day+'</b> of 10 &middot; <span class="pw-'+urg+'-t">'+(left<=2?'auto-finalizes in '+left+' day'+(left===1?'':'s'):left+' days left')+'</span></div>'+
        '</div>'+
        '<div class="pc-actions">'+
          '<button class="btn btn-approve btn-sm" onclick="approveBill(\''+b.id+'\')">'+svg('<path d="M20 6L9 17l-5-5"/>',2.4)+'Approve</button>'+
          '<button class="btn btn-ghost btn-sm'+(mode==='dispute'?' on':'')+'" onclick="setBillUI(\''+b.id+'\',\'dispute\')">Dispute</button>'+
          '<button class="btn btn-ghost btn-sm'+(mode==='edit'?' on':'')+'" onclick="setBillUI(\''+b.id+'\',\'edit\')">Correct code</button>'+
          '<button class="btn btn-ghost btn-sm" onclick="openRemapCOModal(\''+b.id+'\')"' +'>Remap to CO</button>'+
          notes+audit+
        '</div>'+
        inline+
      '</div>';
    }).join('')+(extra?'<div style="grid-column:1/-1;font-size:12px;color:var(--g500);padding:6px 2px">+'+extra+' more pending — <span class="oc-link" onclick="document.getElementById(\'billHist\').scrollIntoView({behavior:\'smooth\'})">view all in billing history ↓</span></div>':'');
  }
  var activeBillModal=null;
  function setBillUI(id,mode){ billUI[id]=(billUI[id]===mode?'':mode); renderPending(); renderBills(); if(activeBillModal===id) openBillModal(id); }
  function whDisputeClose(){ var el=document.getElementById('wh-dispute-overlay'); if(el)el.remove(); }
  function whDisputeNewCodeToggle(){
    var sel=document.getElementById('wh-dispute-code');
    var inp=document.getElementById('wh-dispute-new');
    var lbl=document.getElementById('wh-dispute-new-lbl');
    var isNew=sel&&sel.value==='__new__';
    if(inp)inp.style.display=isNew?'block':'none';
    if(lbl)lbl.style.display=isNew?'block':'none';
  }
  function whDisputeSubmit(){
    var sel=document.getElementById('wh-dispute-code');
    var inp=document.getElementById('wh-dispute-new');
    var label;
    if(sel&&sel.value==='__new__'){
      label=(inp&&inp.value.trim())||'new code';
    } else {
      label=sel?sel.options[sel.selectedIndex].text:'012900.1010 · Warehousing services';
    }
    whDisputeClose();
    toast('Cost code corrected — ORD-3091 reclassified to '+label);
  }
  function openWarehousingDispute(){
    var existing=document.getElementById('wh-dispute-overlay');
    if(existing){ existing.remove(); return; }
    var ov=document.createElement('div');
    ov.id='wh-dispute-overlay';
    ov.style.cssText='position:fixed;inset:0;background:rgba(15,23,42,.45);backdrop-filter:blur(2px);z-index:9999;display:flex;align-items:center;justify-content:center';
    var html='<div style="background:#fff;border-radius:12px;box-shadow:0 24px 64px rgba(0,0,0,.18);width:600px;max-width:92vw;max-height:80vh;overflow:auto">';
    html+='<div style="padding:20px 24px;border-bottom:1px solid #e8ecf0;display:flex;justify-content:space-between;align-items:center">';
    html+='<div><div style="font-size:13px;font-weight:700;color:#0f172a">Billing code review</div>';
    html+='<div style="font-size:12px;color:#64748b;margin-top:2px">ORD-3091 · Warehousing services</div></div>';
    html+='<button onclick="whDisputeClose()" style="background:none;border:none;font-size:20px;cursor:pointer;color:#94a3b8;line-height:1">&times;</button>';
    html+='</div><div style="padding:20px 24px">';
    html+='<div style="background:#fffbf0;border:1px solid #f5d87a;border-radius:8px;padding:12px 14px;margin-bottom:16px;font-size:12.5px;color:#7a5a00">';
    html+='<b>Flagged:</b> Order ORD-3091 was auto-tagged to cost code <b>012900.1010 · Warehousing services</b>. 02S detected this may not match the work type for this line.';
    html+='</div><table style="width:100%;border-collapse:collapse;font-size:12.5px">';
    html+='<tr style="border-bottom:1px solid #f1f5f9"><td style="padding:8px 0;color:#64748b;width:140px">Order</td><td style="padding:8px 0;font-weight:600;color:#0f172a">ORD-3091</td></tr>';
    html+='<tr style="border-bottom:1px solid #f1f5f9"><td style="padding:8px 0;color:#64748b">Description</td><td style="padding:8px 0">Warehousing services — Hercules, CA site</td></tr>';
    html+='<tr style="border-bottom:1px solid #f1f5f9"><td style="padding:8px 0;color:#64748b">Tagged to</td>';
    html+='<td style="padding:8px 0"><span style="background:#fef3c7;color:#92400e;padding:2px 7px;border-radius:4px;font-weight:600;font-size:11.5px">012900.1010 · Warehousing services</span></td></tr>';
    html+='<tr><td style="padding:8px 0;color:#64748b">Amount</td><td style="padding:8px 0;font-weight:600">$3,200</td></tr></table>';
    html+='<div style="margin-top:18px;font-size:11.5px;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:.04em;margin-bottom:6px">Correct cost code</div>';
    html+='<select id="wh-dispute-code" onchange="whDisputeNewCodeToggle()" style="width:100%;border:1px solid #d1d5db;border-radius:6px;padding:8px 10px;font-size:13px;color:#0f172a;background:#fff">';
    html+='<option value="012900.1010">012900.1010 · Warehousing services (current)</option>';
    html+='<option value="015000.1000">015000.1000 · Temporary facilities &amp; controls</option>';
    html+='<option value="010000.5500">010000.5500 · Site logistics &amp; staging</option>';
    html+='<option value="013200.0100">013200.0100 · Construction layout &amp; survey</option>';
    html+='<option value="01-0540-0000-0001">01-0540-0000-0001 · General conditions</option>';
    html+='<option value="26-0330-0000-0001">26-0330-0000-0001 · BESS &amp; Substation</option>';
    html+='<option value="03-0000-0000-0001">03-0000-0000-0001 · Concrete</option>';
    html+='<option value="05-0000-0000-0001">05-0000-0000-0001 · Metals</option>';
    html+='<option value="09-0000-0000-0001">09-0000-0000-0001 · Finishes</option>';
    html+='<option value="31-0620-0000-0001">31-0620-0000-0001 · Earthwork / Piling</option>';
    html+='<option value="22-0000-0000-0001">22-0000-0000-0001 · Plumbing</option>';
    html+='<option value="16-0000-0000-0001">16-0000-0000-0001 · Electrical</option>';
    html+='<option value="01-5100-0000-0001">01-5100-0000-0001 · Logistics — heavy haul</option>';
    html+='<option value="06-0100-0000-0001">06-0100-0000-0001 · Procurement — materials</option>';
    html+='<option value="__new__">+ Add net new cost code…</option>';
    html+='</select>';
    html+='<div id="wh-dispute-new-lbl" style="display:none;font-size:11.5px;color:#64748b;font-weight:600;margin-top:12px;margin-bottom:4px">New cost code</div>';
    html+='<input id="wh-dispute-new" type="text" placeholder="e.g. 01-0540-0000-0002 · Description" style="display:none;width:100%;border:1px solid #d1d5db;border-radius:6px;padding:8px 10px;font-size:13px;color:#0f172a;box-sizing:border-box;font-family:monospace">';
    html+='</div>';
    html+='<div style="padding:16px 24px;border-top:1px solid #e8ecf0;display:flex;gap:10px;justify-content:flex-end">';
    html+='<button onclick="whDisputeClose()" style="border:1px solid #d1d5db;background:#fff;border-radius:6px;padding:7px 16px;font-size:13px;cursor:pointer;color:#374151">Cancel</button>';
    html+='<button onclick="whDisputeSubmit()" style="background:#0f172a;color:#fff;border:none;border-radius:6px;padding:7px 16px;font-size:13px;font-weight:600;cursor:pointer">Submit correction</button>';
    html+='</div></div>';
    ov.innerHTML=html;
    document.body.appendChild(ov);
    ov.addEventListener('click',function(e){if(e.target===ov)ov.remove();});
  }
  function openBillModal(id){
    var b=getBill(id); if(!b) return;
    var ns=CURRENT==='ns';
    var mode=billUI[id]||'';
    activeBillModal=id;
    var urg=b.day>=8?'red':(b.day>=5?'gold':'neu');
    var left=10-b.day;
    var anomCard='';
    var chargesHtml='';
    if(b.charges&&b.charges.length){
      var ccOpts=[
        {v:'01-0540-0000-0001',l:'01-0540-0000-0001 \xb7 General conditions'},
        {v:'26-0330-0000-0001',l:'26-0330-0000-0001 \xb7 BESS &amp; Substation'},
        {v:'03-0000-0000-0001',l:'03-0000-0000-0001 \xb7 Concrete'},
        {v:'05-0000-0000-0001',l:'05-0000-0000-0001 \xb7 Metals'},
        {v:'31-0620-0000-0001',l:'31-0620-0000-0001 \xb7 Earthwork / Piling'},
        {v:'22-0000-0000-0001',l:'22-0000-0000-0001 \xb7 Plumbing'},
        {v:'16-0000-0000-0001',l:'16-0000-0000-0001 \xb7 Electrical'},
        {v:'01-5100-0000-0001',l:'01-5100-0000-0001 \xb7 Logistics — heavy haul'},
        {v:'06-0100-0000-0001',l:'06-0100-0000-0001 \xb7 Procurement — materials'}
      ];
      chargesHtml='<div class="pc-charges">'
        +b.charges.map(function(c,ci){
          var curCost=c.cost||b.cost;
          var knownVals=ccOpts.map(function(o){return o.v;});
          var isKnown=knownVals.some(function(v){return curCost&&curCost.indexOf(v.substring(0,7))>-1;});
          var selVal=isKnown?curCost:'';
          var ccInput=(mode==='edit')
            ?'<div class="cc-pick-wrap"><select class="rin cc-sel" id="cc-'+id+'-'+ci+'" onchange="ccSelChange(this,\''+id+'\','+ci+')" style="width:100%;font-size:11px;margin-bottom:0">'
              +'<option value="">— select cost code —</option>'
              +ccOpts.map(function(o){return '<option value="'+o.v+'"'+(selVal===o.v?' selected':'')+'>'+o.l+'</option>';}).join('')
              +'<option value="__new__">+ Add new cost code...</option>'
              +'</select>'
              +'<input class="rin" id="cc-new-'+id+'-'+ci+'" style="display:none;width:100%;font-size:11px;font-family:monospace;margin-top:4px" placeholder="Enter 16-digit code">'
              +'</div>'
            :'<span class="pch-cc">'+(c.cost||b.cost)+'</span>';
          return '<div class="pch-row"><span class="pch-d">'+c.desc+'</span>'+ccInput+'<span class="pch-a">'+fmt(c.amt)+'</span></div>';
        }).join('')
        +'<div class="pch-row pch-total"><span class="pch-d">Total</span><span class="pch-a">'+fmt(b.amt)+'</span></div>'
        +'</div>';
    }
    var windowBar='<div class="pc-window"><div class="pw-meter"><span class="pw-'+urg+'" style="width:'+(b.day*10)+'%"></span></div><div class="pw-lbl">Day <b>'+b.day+'</b> of 10 &middot; <span class="pw-'+urg+'-t">'+(left<=2?'auto-finalizes in '+left+' day'+(left===1?'':'s'):left+' days left')+'</span></div></div>';
    var actions='<div class="pc-actions" style="margin-bottom:8px">'
      +'<button class="btn btn-approve btn-sm" onclick="approveBill(\''+id+'\')">'+svg('<path d="M20 6L9 17l-5-5"/>',2.4)+'Approve</button>'
      +'<button class="btn btn-ghost btn-sm'+(mode==='dispute'?' on':'')+'" onclick="setBillUI(\''+id+'\',\'dispute\')">Dispute</button>'
      +'<button class="btn btn-ghost btn-sm'+(mode==='edit'?' on':'')+'" onclick="setBillUI(\''+id+'\',\'edit\')">Correct code</button>'
      +'<button class="btn btn-ghost btn-sm" onclick="openRemapCOModal(\''+id+'\')"' +'>Remap to CO</button>'
      +'<span class="pc-audit">'+(b.audit||'Awaiting your review')+'</span>'
      +'</div>';
    var inline='';
    if(mode==='dispute') inline=billDisputeInline(b,ns);
    else if(mode==='edit') inline=billEditInline(b);
    var body=anomCard+chargesHtml+windowBar+actions+inline
      +'<div class="modal-foot"><button class="btn btn-ghost" onclick="activeBillModal=null;closeModal()">Close</button></div>';
    openModal('<div><h3 style="margin:0 0 2px">'+b.id+'</h3><div class="sub">'+b.product+' &middot; from <span class="oc-link" onclick="jumpToOrder(\''+b.order+'\')">'+b.order+'</span> &middot; '+fmt(b.amt)+'</div></div>',body);
  }
  function billDisputeInline(b,ns){
    return '<div class="pc-inline">'+
      '<div class="pi-t">Reason for dispute <span class="pi-note">pauses auto-finalization until 02S responds</span></div>'+
      '<div class="dispute-chips" id="dc-'+b.id+'">'+(ns?
        '<span class="dchip" onclick="setDChip(\''+b.id+'\',\'Idle-day overage — unit billing with no site activity\',this)">Idle-day overage</span>'+
        '<span class="dchip" onclick="setDChip(\''+b.id+'\',\'Rate mismatch — billed rate exceeds contract rate\',this)">Rate mismatch</span>'+
        '<span class="dchip" onclick="setDChip(\''+b.id+'\',\'Incorrect cost code assignment\',this)">Wrong cost code</span>'+
        '<span class="dchip" onclick="setDChip(\''+b.id+'\',\'Billing period overlap or duplicate charge\',this)">Duplicate/overlap</span>'+
        '<span class="dchip" onclick="setDChip(\''+b.id+'\',\'Equipment returned — billing continues after off-rent\',this)">Billing after return</span>'+
        '<span class="dchip" onclick="setDChip(\''+b.id+'\',\'Quantity billed exceeds PO authorization\',this)">PO qty exceeded</span>'+
        '<span class="dchip" onclick="setDChip(\''+b.id+'\',\'Unauthorized charge — no PO or work order\',this)">Unauthorized charge</span>':
        '<span class="dchip" onclick="setDChip(\''+b.id+'\',\'Incorrect cost code — requesting reassignment\',this)">Correct cost code</span>'+
        '<span class="dchip" onclick="setDChip(\''+b.id+'\',\'Billing period error — dates do not match rental period\',this)">Billing period error</span>'+
        '<span class="dchip" onclick="setDChip(\''+b.id+'\',\'Rate or quantity does not match order\',this)">Rate / qty mismatch</span>'+
        '<span class="dchip" onclick="setDChip(\''+b.id+'\',\'Idle days included — unit was not in active use\',this)">Idle days billed</span>'
      )+'</div>'+
      '<textarea id="dr-'+b.id+'" class="pi-ta" placeholder="'+(ns?'e.g. Billed 4 idle days with no badge-ins — request credit for idle period':'e.g. Incorrect cost code — should be 03-Concrete, not 09-Finishes')+'">'+(b.reason&&ns?b.reason:'')+'</textarea>'+
      '<div class="pi-act"><button class="btn btn-red btn-sm" onclick="disputeBill(\''+b.id+'\')">Submit dispute</button><button class="btn btn-ghost btn-sm" onclick="setBillUI(\''+b.id+'\',\'\')">Cancel</button></div>'+
    '</div>';
  }
  function billEditInline(b){
    return '<div class="pc-inline">'+
      '<div class="pi-t">Correct cost codes per charge <span class="pi-note">edit in the charge rows above — every change is captured to the audit trail</span></div>'+
      '<div class="pi-act"><button class="btn btn-dark btn-sm" onclick="saveCost(\''+b.id+'\')">Save corrections</button><button class="btn btn-ghost btn-sm" onclick="setBillUI(\''+b.id+'\',\'\')">Cancel</button></div>'+
    '</div>';
  }
  function billCOInline(b){
    var opts=CHANGE_ORDERS.map(function(co){
      var badge=co.status==='Approved'?'<span class="tag ok" style="font-size:10px">Approved</span>':'<span class="tag warn" style="font-size:10px">Pending</span>';
      return '<label style="display:flex;align-items:center;gap:10px;padding:8px 10px;border:1px solid var(--g200);border-radius:6px;cursor:pointer;margin-bottom:6px">'
        +'<input type="radio" name="co-pick-'+b.id+'" value="'+co.id+'" style="accent-color:var(--charcoal)">'
        +'<span style="flex:1"><b style="font-size:12px">'+co.id+'</b> '+badge+'<div style="font-size:11.5px;color:var(--g600);margin-top:2px">'+co.desc+'</div></span>'
        +'<span style="font-size:12px;color:var(--g500)">'+fmt(co.amt)+'</span>'
        +'</label>';
    }).join('');
    return '<div class="pc-inline">'
      +'<div class="pi-t">Remap to change order <span class="pi-note">reassigns cost code — logged to audit trail</span></div>'
      +opts
      +'<div class="pi-act">'
      +'<button class="btn btn-dark btn-sm" onclick="remapToCO(\''+b.id+'\');">Confirm remap</button>'
      +'<button class="btn btn-ghost btn-sm" onclick="setBillUI(\''+b.id+'\',\'\');">Cancel</button>'
      +'</div>'
      +'</div>';
  }
  function openRemapCOModal(id){
    var b=getBill(id); if(!b) return;
    var opts=CHANGE_ORDERS.map(function(co){
      var badge=co.status==='Approved'?'<span class="tag ok" style="font-size:10px">Approved</span>':'<span class="tag warn" style="font-size:10px">Pending</span>';
      return '<label style="display:flex;align-items:center;gap:10px;padding:10px 12px;border:1px solid var(--g200);border-radius:7px;cursor:pointer;margin-bottom:8px">'
        +'<input type="radio" name="co-pick-'+id+'" value="'+co.id+'" style="accent-color:var(--charcoal)">'
        +'<span style="flex:1"><b style="font-size:13px">'+co.id+'</b> '+badge+'<div style="font-size:12px;color:var(--g600);margin-top:3px">'+co.desc+'</div></span>'
        +'<span style="font-size:12px;color:var(--g500);white-space:nowrap">'+fmt(co.amt)+' approved</span>'
        +'</label>';
    }).join('');
    var body='<div style="font-size:13px;color:var(--g700);line-height:1.6;margin-bottom:14px">Reassign <b>'+id+'</b> ('+b.product+') to a change order cost code. This updates the cost code on all charge lines and logs to the audit trail.</div>'
      +opts
      +'<div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button>'
      +'<button class="btn btn-dark" onclick="remapToCO(\''+id+'\');">Confirm remap</button></div>';
    activeBillModal=null;
    openModal('<div><b>Remap to change order</b><div style="font-size:12px;font-weight:400;color:var(--g500);margin-top:2px">'+id+' · '+b.product+'</div></div>',body);
  }
  function remapToCO(id){
    var b=getBill(id); if(!b) return;
    var sel=document.querySelector('input[name="co-pick-'+id+'"]:checked');
    if(!sel){toast('Select a change order first');return;}
    var coId=sel.value;
    var co=CHANGE_ORDERS.filter(function(c){return c.id===coId;})[0];
    if(!co) return;
    b.co=coId; b.cost=co.costCode;
    if(b.charges) b.charges.forEach(function(c){c.cost=co.costCode;});
    b.audit='You · remapped to '+coId+' just now';
    billUI[id]='';
    if(activeBillModal===id){activeBillModal=null;closeModal();}
    renderPending(); renderBills(); renderBillInsights();
    toast('Bill '+id+' remapped to '+coId+' — cost code updated');
  }
  function approveBill(id){ var b=getBill(id); if(!b) return; b.status='Approved'; b.audit='You · approved just now'; billUI[id]=''; if(activeBillModal===id){activeBillModal=null;closeModal();} renderPending(); renderBills(); renderBillInsights(); toast('Bill '+id+' approved → routed to YardHub'); }
  function setDChip(id,text,el){ var ta=document.getElementById('dr-'+id); if(ta) ta.value=text; var chips=el.parentElement.querySelectorAll('.dchip'); chips.forEach(function(c){c.classList.remove('on');}); el.classList.add('on'); }
  function ccSelChange(sel,id,ci){ var inp=document.getElementById('cc-new-'+id+'-'+ci); if(!inp)return; if(sel.value==='__new__'){inp.style.display='';inp.focus();}else{inp.style.display='none';} }
  function disputeBill(id){ var b=getBill(id); if(!b) return; var el=document.getElementById('dr-'+id); var r=(el&&el.value||'').trim()||'Amount exceeds order estimate'; b.status='Disputed'; b.disputeReason=r; b.audit='You · disputed just now — auto-finalization paused'; billUI[id]=''; if(activeBillModal===id){activeBillModal=null;closeModal();} renderPending(); renderBills(); renderBillInsights(); toast('Dispute raised on '+id+' — auto-finalization paused until 02S responds'); }
  function saveCost(id){ var b=getBill(id); if(!b) return; if(b.charges){b.charges.forEach(function(c,i){ var sel=document.getElementById('cc-'+id+'-'+i); var custom=document.getElementById('cc-new-'+id+'-'+i); var val=sel?(sel.value==='__new__'?(custom&&custom.value.trim()||c.cost):(sel.value||c.cost)):c.cost; if(val)c.cost=val; });} b.audit='You · edited cost codes just now'; billUI[id]=''; renderPending(); renderBills(); toast('Cost codes updated on '+id+' — logged to audit trail'); }

  function renderBillInsights(){
    var wrap=document.getElementById('billInsights'); if(!wrap) return;
    var ns=CURRENT==='ns';
    var pend=BILLS.filter(function(b){return b.status==='Pending';});
    var pendTotal=pend.reduce(function(s,b){return s+b.amt;},0);
    var anomalies=0;
    var disputed=BILLS.filter(function(b){return b.status==='Disputed';}).length;
    if(!ns){
      wrap.classList.remove('hide');
      wrap.innerHTML='<div class="ins-strip"><span class="isi">'+svg('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',0)+'</span>'+
        '<div><div class="ist">'+pend.length+' bill'+(pend.length===1?'':'s')+' pending your review &middot; Total pending: '+fmt(pendTotal)+'</div><div class="isd">'+
        (disputed?disputed+' disputed bill'+(disputed===1?'':'s')+' paused for 02S response. ':'No disputed bills this period. ')+
        'Review and approve or dispute within 10 days to prevent auto-finalization.</div></div></div>';
      return;
    }
    wrap.classList.remove('hide');
    wrap.innerHTML='<div class="ins-strip"><span class="isi">'+svg('<path d="M12 2l2.4 7.4H22l-6 4.5 2.3 7.1-6.3-4.6L5.7 21l2.3-7.1-6-4.5h7.6z"/>',0)+'</span>'+
      '<div><div class="ist">Billing on track &middot; '+fmt(pendTotal)+' pending across '+pend.length+' bills</div><div class="isd">'+
      
      'Returning ORD-3031 now saves ~$740. Cost code review recommended for <b>BILL-9016</b>.</div></div></div>';
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
    var wrap=document.getElementById('ordInsights'); if(!wrap) return;
    var ns=CURRENT==='ns';
    var active=ORDERS.filter(function(o){return o.stage>=3&&o.stage<=4;}).length;
    var pending=ORDERS.filter(function(o){return o.stage<=2;}).length;
    if(!ns){
      wrap.classList.remove('hide');
      wrap.innerHTML='<div class="ins-strip"><span class="isi">'+svg('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',0)+'</span>'+
        '<div><div class="ist">'+active+' orders active &middot; '+pending+' pending delivery confirmation</div><div class="isd">'+
        'Review open orders to confirm delivery schedules are on track.</div></div></div>';
      return;
    }
    wrap.classList.remove('hide');
    wrap.innerHTML='<div class="ins-strip"><span class="isi">'+svg('<path d="M12 2l2.4 7.4H22l-6 4.5 2.3 7.1-6.3-4.6L5.7 21l2.3-7.1-6-4.5h7.6z"/>',0)+'</span>'+
      '<div><div class="ist">2 orders need your attention</div><div class="isd"><b>ORD-3042</b> (excavator) is 2 days behind schedule and blocks crane mobilization · <b>ORD-3031</b> (scissor lifts) idle 9 days — estimated $3.8K/mo exposure · Tower crane mobilization confirmed for Aug 3</div></div></div>';
  }

  // ── toast ──
  function toggleEl(id){var el=document.getElementById(id);if(el)el.style.display=el.style.display==='none'?'':'none';}
  function toast(msg){ var t=document.getElementById('toast'); if(!t) return; t.textContent=msg; t.classList.add('show'); clearTimeout(window.__tt); window.__tt=setTimeout(function(){t.classList.remove('show');},2800); }
  function toastHtml(html,dur){ var t=document.getElementById('toast'); if(!t) return; t.innerHTML=html; t.classList.add('show'); clearTimeout(window.__tt); window.__tt=setTimeout(function(){t.classList.remove('show');t.innerHTML='';},dur||3500); }

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
  var SHIP_TO={addr:'22 W. Washington St, Ste 1500, Chicago IL 60602',contact:'Marcus Webb — (555) 482-3190'};

  /* ═══════════ BASELINE APPROVAL ═══════════ */
  var PLAN_BASELINES={};
  function openBaselineModal(planKey, planTitle){
    if(!TEAM.some(function(t){return t.access==='Approver'||t.access==='Admin';})){
      toast('Only an Approver or Admin can baseline a plan'); return;
    }
    var already=PLAN_BASELINES[planKey];
    var body='<div class="mform">'
      +'<div style="font-size:13px;color:var(--g700);margin-bottom:12px">Approving <b>'+planTitle+'</b> as the baseline locks the current plan as the version of record for forecasting and commitment tracking.</div>'
      +(already?'<div class="pc-anom" style="margin-bottom:12px">'+svg('<path d="M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L14.7 3.9a2 2 0 00-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',2)+'<div>A baseline was previously approved on <b>'+already+'</b>. Approving again will replace it.</div></div>':'')
      +'<div class="mf"><label>Approved by</label><select class="acc-sel wfull" id="baselineApprover">'+TEAM.filter(function(t){return t.access==="Approver"||t.access==="Admin";}).map(function(t){return "<option>"+t.name+"</option>";}).join("")+'</select></div>'
      +'<div class="mf"><label>Notes <span class="opt">optional</span></label><input class="rin" id="baselineNote" placeholder="e.g. Approved for Phase 1 — reflects Aug 2026 schedule rev"></div>'
      +'</div>';
    openModal('Approve plan as baseline',body+'<div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-dark" onclick="confirmBaseline(\''+planKey+'\',\''+planTitle+'\')">Approve as baseline</button></div>');
  }
  function confirmBaseline(planKey, planTitle){
    var approver=(document.getElementById('baselineApprover')||{}).value||'You';
    var ts='Jul 22, 2026';
    PLAN_BASELINES[planKey]=ts+' — '+approver;
    closeModal();
    eqLog('Approved '+planTitle+' as baseline — '+approver+' · '+ts);
    toast(planTitle+' baselined by '+approver+' · '+ts);
    eqRefresh();
  }
  function renderApprovers(){
    var mount=gel('profApprovers'); if(!mount)return;
    var ap=TEAM.filter(function(m){return m.access==='Approver'||m.access==='Admin';});
    if(!ap.length){mount.innerHTML='<div style="font-size:12px;color:var(--g400)">No approvers — grant a team member Approver access on the Team tab.</div>';return;}
    mount.innerHTML=ap.map(function(m){
      return '<div class="esc-cell">'
        +'<div class="esc-k">'+m.role+'<span class="tag '+accTag(m.access)+'" style="margin-left:6px">'+m.access+'</span></div>'
        +'<div class="esc-n">'+m.name+'</div>'
        +'<div class="esc-p">'+m.email+'</div>'
        +'</div>';
    }).join('');
  }
  function renderShipTo(){
    var mount=gel('profShipTo'); if(!mount)return;
    if(SHIP_TO.addr){
      var cells='<div class="esc-cell"><div class="esc-k">Delivery address</div><div class="esc-n">'+SHIP_TO.addr+'</div></div>';
      if(SHIP_TO.contact) cells+='<div class="esc-cell"><div class="esc-k">Site contact</div><div class="esc-n">'+SHIP_TO.contact+'</div></div>';
      mount.innerHTML='<div class="esc-grid">'+cells+'</div><button class="btn btn-ghost btn-sm" style="margin-top:8px" onclick="openShipToModal()">Edit</button>';
    } else {
      mount.innerHTML='<div style="font-size:12px;color:var(--g400);margin-bottom:8px">No ship-to location saved.</div><button class="btn btn-ghost btn-sm" onclick="openShipToModal()">Add ship-to location</button>';
    }
  }
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
    if(cat==='Billing question'){ go('billing'); toast('Billing & financials — review or dispute a charge here'); return; }
    if(cat==='Track request'){ go('orders'); toast('Orders — track the status of every request'); return; }
    if(cat==='Emergency'){ openEmergency(); return; }
    if(cat==='Contact coordinator'){ openCoordinator(); return; }
    if(cat==='Schedule change'){ openSchedule(); return; }
    if(cat==='Report issue'){ openIssue(); return; }
  }
  // Schedule change — structured request (NS pre-fills a smart suggestion)
  function openShipToModal(){
    var title=SHIP_TO.addr?'Edit ship-to location':'Add ship-to location';
    openModal(title,
      '<div class="mform">'
      +'<div class="mf"><label>Delivery address</label><input class="rin" id="shipAddr" placeholder="Street address, city, state" value="'+SHIP_TO.addr+'"></div>'
      +'<div class="mf"><label>Site contact</label><input class="rin" id="shipContact" placeholder="Name and phone" value="'+SHIP_TO.contact+'"></div>'
      +'</div>'
      +'<div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button>'
      +'<button class="btn btn-dark" onclick="var a=(document.getElementById(\'shipAddr\')||{}).value,c=(document.getElementById(\'shipContact\')||{}).value;if(!a||!a.trim()){toast(\'Enter an address\');return;}SHIP_TO.addr=a.trim();SHIP_TO.contact=(c||\'\').trim();closeModal();renderShipTo();toast(\'Ship-to location saved\')">Save</button></div>'
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
  function jumpToBill(id){ go('billing'); toast('Opening '+id+' in Billing & financials'); }
  function openOrderPreviewModal(id){
    var ord=ORDERS.filter(function(o){return o.id===id;})[0]; if(!ord)return;
    var stgLbl={1:'Submitted',2:'Acknowledged',3:'In fulfillment',4:'On rent · active',5:'Off-rent · billing',6:'Closed'};
    var b='<div class="fq-req"><div class="fq-req-t">'+ord.id+' · '+ord.item+'</div>';
    if(ord.sub)b+='<div class="sub" style="font-size:11.5px;margin-top:2px">'+ord.sub+'</div>';
    b+='</div><div class="fq-calc">';
    b+='<div class="fq-crow"><span>Status</span><span><span class="tag ok">'+( stgLbl[ord.stage]||'Stage '+ord.stage)+'</span></span></div>';
    if(ord.dates)b+='<div class="fq-crow"><span>Period</span><span>'+ord.dates+'</span></div>';
    if(ord.cost)b+='<div class="fq-crow"><span>Cost code</span><span style="font-size:11px">'+ord.cost+'</span></div>';
    if(ord.mrate)b+='<div class="fq-crow"><span>Monthly rate</span><span>$'+ord.mrate.toLocaleString()+'·unit</span></div>';
    if(ord.latest)b+='<div class="fq-crow" style="align-items:flex-start"><span>Latest</span><span style="color:var(--g700);max-width:260px">'+ord.latest+'</span></div>';
    b+='</div>';
    b+='<div class="modal-foot"><button onclick="closeModal()">Close</button>';
    b+='<button class="btn btn-ghost" onclick="closeModal();gotoOrder(\''+id+'\')">Open in Orders →</button></div>';
    openModal('Order details', b);
  }
  function openBillPreviewModal(id){
    var bill=getBill(id); if(!bill)return;
    var b='<div class="fq-req"><div class="fq-req-t">'+bill.product+'</div>';
    b+='<div class="sub" style="font-size:11.5px;margin-top:2px">'+bill.id+' · order '+bill.order+'</div></div>';
    b+='<div class="fq-calc">';
    b+='<div class="fq-crow"><span>Amount</span><span style="font-weight:700;font-size:13px">'+fmt(bill.amt)+'</span></div>';
    b+='<div class="fq-crow"><span>Status</span><span><span class="tag '+(STATUS_TAG[bill.status]||'neu')+'">'+bill.status+'</span></span></div>';
    if(bill.date)b+='<div class="fq-crow"><span>Date</span><span>'+bill.date+'</span></div>';
    if(bill.cost)b+='<div class="fq-crow"><span>Cost code</span><span style="font-size:11px">'+bill.cost+'</span></div>';
    if(bill.charges&&bill.charges.length){
      b+='</div><div style="margin-top:10px;border-top:1px solid var(--g100);padding-top:8px">';
      b+='<div style="font-size:10px;font-weight:700;color:var(--g400);text-transform:uppercase;letter-spacing:.04em;margin-bottom:6px">Charges</div>';
      bill.charges.forEach(function(c){
        b+='<div class="fq-crow"><span style="font-size:11.5px">'+c.desc+'</span><span style="font-weight:600">'+fmt(c.amt)+'</span></div>';
      });
    }
    b+='</div>';
    b+='<div class="modal-foot"><button onclick="closeModal()">Close</button>';
    b+='<button class="btn btn-ghost" onclick="closeModal();gotoBill(\''+id+'\')">Go to Billing →</button></div>';
    openModal('Bill preview', b);
  }
  function openQuotePreviewModal(ref){
    var q=PORTAL_QUOTES.filter(function(x){return x.ref===ref;})[0]; if(!q)return;
    var isDraft=q.status==='Draft';
    var b='<div class="fq-req"><div class="fq-req-t">'+q.ref+'</div>';
    b+='<div class="sub" style="font-size:11.5px;margin-top:2px">'+q.project+' \u00b7 submitted '+q.submitted+'</div></div>';
    b+='<div class="fq-calc">';
    b+='<div class="fq-crow"><span>Status</span><span><span class="tag '+(isDraft?'warn':'ok')+'">'+q.status+'</span></span></div>';
    if(q.note)b+='<div class="fq-crow" style="align-items:flex-start"><span>Scope</span><span style="color:var(--g700);max-width:260px">'+q.note+'</span></div>';
    if(isDraft&&q.pendingN)b+='<div class="fq-crow"><span>Pricing</span><span style="color:var(--amber)">'+q.pendingN+' item'+(q.pendingN===1?'':'s')+' pending 02S confirmation</span></div>';
    b+='</div>';
    if(q.lineItems&&q.lineItems.length){
      b+='<div style="margin-top:10px;border-top:1px solid var(--g100);padding-top:8px">';
      b+='<div style="font-size:10px;font-weight:700;color:var(--g400);text-transform:uppercase;letter-spacing:.04em;margin-bottom:6px">Line items</div>';
      q.lineItems.forEach(function(li){
        b+='<div class="fq-crow">';
        b+='<span style="font-size:11.5px"><span style="font-weight:500">'+li.name+'</span><div style="font-size:10.5px;color:var(--g500)">'+li.pillar+' \u00b7 '+li.qty+'</div></span>';
        b+='<span style="font-weight:600;color:'+(li.amount?'var(--charcoal)':'var(--g400)')+'">'+( li.amount||'Pending 02S')+'</span>';
        b+='</div>';
      });
      if(q.totalPriced)b+='<div class="fq-crow" style="border-top:1px solid var(--g200);margin-top:6px;padding-top:6px"><span style="font-weight:600">Total</span><span style="font-weight:700;font-size:13px">'+q.totalPriced+'</span></div>';
    }
    b+='<div class="modal-foot"><button onclick="closeModal()">Close</button>';
    b+='<button class="btn btn-ghost" onclick="closeModal();setTimeout(function(){gotoQuote(\'' +ref+ '\');},30)">View in Quotes \u2192</button></div>';
    openModal('Quote preview', b);
  }
  function gotoOrder(id){
    ordView='orders'; go('orders'); _ordersShowAll=true; renderOrders();
    var row=document.getElementById('row-'+id); if(!row)return;
    if(!row.classList.contains('open'))toggleOrder(id);
    setTimeout(function(){
      row.scrollIntoView({behavior:'smooth',block:'start'});
      var trk=document.getElementById('trk-'+id); if(trk)trk.scrollIntoView({behavior:'smooth',block:'nearest'});
    },100);
  }
  function gotoBill(id){
    var inp=document.getElementById('billSearch'); if(inp)inp.value=id;
    go('billing');
    setTimeout(function(){
      _billsShowAll=true; renderBills();
      var b=getBill(id); if(!b)return;
      if(b.status==='Pending')openBillModal(id);
      else if(b.status==='Finalized')openBillPDFModal(id);
      else if(b.status==='Approved')openBillModal(id);
    },120);
  }

  function gotoQuote(ref){
    ordView='quotes'; go('orders');
    setTimeout(function(){
      ordSetView('quotes');
      var t=document.getElementById('qtrk-'+ref);
      if(t&&t.style.display==='none') togglePortalQuote(ref);
      var row=document.getElementById('qrow-'+ref); if(!row)return;
      row.style.outline='2px solid var(--blue,#3b82f6)'; row.style.borderRadius='4px';
      setTimeout(function(){row.style.outline='';row.style.borderRadius='';},1400);
      row.scrollIntoView({behavior:'smooth',block:'center'});
    },60);
  }
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
  var ccActive=null; var _ccTaskFilter='all';
  var ccPersona='fsm';
  var CC_FSM_PROJECTS=['Hercules Solar + BESS','Riverside Medical Center','Cimarron Data Center'];
  var _ccFSMProj='';
  var _ceProj='Hercules Solar + BESS';
  var CC_LOOKAHEAD={
    'Hercules Solar + BESS':[
      {label:'Crane mob permits',       pillar:'Logistics',      ref:'ORD-3071',   start:'2026-08-01',end:'2026-08-04',tone:'warn',note:'Route permits in process · Aug 3 final mob window'},
      {label:'BESS container placements',pillar:'Logistics',     ref:'REQ-L-3054', start:'2026-08-05',end:'2026-08-06',tone:'warn',note:'6 crane moves · sequencing tied to transformer delivery'},
      {label:'Billing approval due',     pillar:'Billing',        ref:'BILL-9012',  start:'2026-08-08',end:'2026-08-08',tone:'warn',note:'Scissor lift · idle-but-billing · auto-finalizes Aug 8 · action required'},
      {label:'Crawler crane mobilization',pillar:'Equipment',    ref:'REQ-4471',   start:'2026-08-10',end:'2026-08-14',tone:'ok',  note:'230T · solar transformer set · sector 1'},
      {label:'Pipe rack on-site delivery',pillar:'Prefab',       ref:'ORD-3108',   start:'2026-08-15',end:'2026-08-16',tone:'info',note:'Aug 15 need-by · shop drawings approved · Piperite Fab'},
      {label:'Geotech field report due', pillar:'Prof. services',ref:'ORD-3096',   start:'2026-08-18',end:'2026-08-18',tone:'ok',  note:'Monthly report · Terracon · phase 2 close-out'}
    ],
    'Riverside Medical Center':[
      {label:'Tower crane mobilization', pillar:'Logistics',     ref:'ORD-3128',   start:'2026-08-05',end:'2026-08-06',tone:'warn',note:'Scheduled · site access confirmation needed before Aug 4'},
      {label:'Structural inspection',    pillar:'Prof. services',ref:'ORD-3091',   start:'2026-08-11',end:'2026-08-12',tone:'info',note:'IBC §1705 monthly milestone · Terracon on-site'},
      {label:'Structural bolt PO needed',pillar:'Procurement',   ref:'REQ-P-0501', start:'2026-08-14',end:'2026-08-14',tone:'warn',note:'Requested · long-lead risk if PO not issued this week'},
      {label:"Forklift on-rent (ongoing)",pillar:'Equipment',    ref:'ORD-3123',   start:'2026-08-01',end:'2026-08-21',tone:'ok',  note:'4 units active · Sunbelt · surgical unit support'},
      {label:"Owner's rep site review",  pillar:'Prof. services',ref:'ORD-3143',   start:'2026-08-20',end:'2026-08-21',tone:'ok',  note:'Monthly progress review · HDR'}
    ],
    'Cimarron Data Center':[
      {label:'Raised floor PO tracking', pillar:'Procurement',   ref:'ORD-3141',   start:'2026-08-01',end:'2026-08-07',tone:'ok',  note:'PO issued · Tate Access · Oct delivery confirmed'},
      {label:'PDU site delivery',        pillar:'Logistics',     ref:'ORD-3132',   start:'2026-08-08',end:'2026-08-10',tone:'warn',note:'3 loads · dock schedule confirmation still pending'},
      {label:'Cable tray pricing due',   pillar:'Prefab',        ref:'REQ-F-041',  start:'2026-08-12',end:'2026-08-12',tone:'warn',note:'Awaiting pricing · critical path · Oct delivery at risk'},
      {label:'Server room partition fab',pillar:'Prefab',        ref:'ORD-3135',   start:'2026-08-15',end:'2026-08-21',tone:'info',note:'In fabrication · ModSpace · Nov delivery on track'},
      {label:'Site survey crew',         pillar:'Prof. services',ref:'ORD-3144',   start:'2026-08-18',end:'2026-08-20',tone:'info',note:'Requested · confirm resource availability'}
    ]
  };
  var CC_KEYS=['ccdash','fulfill','mytasks','gap','anomaly','margin','fleet','dpequip','dplog','dpsvc','dpproc','dpprefab'];
  var CC_PERSONA_ACCESS={
    fsm:   ['ccdash','fulfill','mytasks','gap','margin','fleet','dpequip','dplog','dpsvc','dpproc','dpprefab'],
    equip: ['fulfill','mytasks','gap','fleet','dpequip','margin'],
    logistics: ['fulfill','mytasks','dplog','margin'],
    prefab: ['fulfill','mytasks','dpprefab','margin'],
    procurement: ['fulfill','mytasks','dpproc','margin'],
    services: ['fulfill','mytasks','dpsvc','margin']
  };
  function ccPersonaCanAccess(s){ var a=CC_PERSONA_ACCESS[ccPersona]||CC_PERSONA_ACCESS.fsm; for(var i=0;i<a.length;i++){if(a[i]===s)return true;} return false; }
  var _PERSONA_PILLAR={equip:'equipment',logistics:'logistics',prefab:'prefab',procurement:'procurement',services:'services'};
  function ccSetPersona(p){ ccPersona=p; _ccFSMProj=''; fqFP='all'; ccUpdateNavForPersona(); FQ.forEach(function(r){r.tasked=false;}); if(!ccPersonaCanAccess(ccActive)){ccGo('fulfill');} else if(ccActive==='fulfill'){renderFulfill();} else if(ccActive==='mytasks'){renderMyTasks();} else if(ccActive&&ccActive.indexOf('dp')===0){renderCcScreen(ccActive);} _myTasksBadge(); }
  function setCCFSMProj(proj){ _ccFSMProj=proj; renderCcDash(); }
  function ccUpdateNavForPersona(){
    CC_KEYS.forEach(function(k){
      var nv=document.getElementById('ccnav-'+k); if(!nv)return;
      var ok=ccPersonaCanAccess(k);
      nv.classList.toggle('sb-locked',!ok);
      if(!ok){ nv.setAttribute('onclick','return false;'); } else { nv.setAttribute('onclick','ccGo(\''+k+'\')'); }
    });
  }
  function ccSyncToggle(){ var ns=CURRENT==='ns'; var b1=document.getElementById('ccBtnV1'); if(!b1)return; b1.classList.toggle('on',!ns); var b2=document.getElementById('ccBtnNS'); if(b2)b2.classList.toggle('on',ns); var cv=document.getElementById('ccVerChip'); if(cv)cv.innerHTML= ns?'North Star &mdash; vision':'V1 &mdash; standard'; var fn=document.getElementById('ccnav-fleet'); if(fn)fn.style.display=ns?'':'none'; if(!ns&&typeof ccActive!=='undefined'&&ccActive==='fleet')ccGo('ccdash'); ccUpdateNavForPersona(); }
  function ccSetTaskFilter(f){ _ccTaskFilter=f; renderFulfill(); }
  function ccSetVer(v){
    CURRENT=v; document.body.setAttribute('data-ver',v);
    if(!document.getElementById('ns-toggle-css')){
      var _s=document.createElement('style');_s.id='ns-toggle-css';
      _s.textContent="body:not([data-ver='ns']) .ns-only{display:none!important}";
      document.head.appendChild(_s);}
    renderCcScreen(ccActive||'ccdash');
    ccSyncToggle();
  }
  function ccGo(s){
    var sk=s==='fulfill-quotes'?'fulfill':s;
    if(!ccPersonaCanAccess(sk)) return;
    CC_KEYS.forEach(function(k){ var sc=document.getElementById('ccscreen-'+k); if(sc)sc.classList.toggle('active',k===sk); var nv=document.getElementById('ccnav-'+k); if(nv)nv.classList.toggle('active',k===sk); });
    ccActive=sk; renderCcScreen(s); window.scrollTo(0,0);
  }
  var SVC_SPECS=[
    {code:'SUM',name:'Subsurface Utility Mapping',items:[
      {svc:'Underground utility scan — pre-excavation',vendor:'GPRS',scope:'Site-wide',start:'May 15',end:'Jun 30',status:'Scheduled'},
      {svc:'Vacuum excavation support',vendor:'GPRS',scope:'Laydown A & B',start:'Jun 1',end:'Sep 30',status:'Requested'},
      {svc:'As-found utility documentation',vendor:'Geosetta',scope:'Site',start:'Jun 15',end:'Jul 15',status:'Draft'}
    ]},
    {code:'GEO',name:'Geospatial Services',items:[
      {svc:'Survey control & benchmarks',vendor:'HMH Engineers',scope:'Site perimeter',start:'Apr 15',end:'Ongoing',status:'Active'},
      {svc:'Progress drone survey (bi-weekly)',vendor:'DroneBase',scope:'Full site',start:'May 1',end:'Jan 2027',status:'Active'},
      {svc:'As-built survey — foundation',vendor:'HMH Engineers',scope:'Building pad',start:'Aug 1',end:'Sep 30',status:'Scheduled'}
    ]},
    {code:'BAS',name:'Building Automation Systems',items:[
      {svc:'BAS controls pre-programming',vendor:'Siemens',scope:'Electrical bldg',start:'Oct 1',end:'Dec 15',status:'Draft'},
      {svc:'Commissioning support',vendor:'Siemens',scope:'BESS & switchgear',start:'Dec 1',end:'Jan 2027',status:'Draft'}
    ]},
    {code:'OFE',name:'Owner-Furnished Equipment Planning',items:[
      {svc:'Equipment delivery coordination',vendor:'McCarthy OFE Mgr',scope:'All OFE',start:'Aug 1',end:'Dec 31',status:'Scheduled'},
      {svc:'Loading dock & rigging oversight',vendor:'McCarthy OFE Mgr',scope:'Dock C',start:'Sep 1',end:'Nov 30',status:'Scheduled'}
    ]},
    {code:'IRT',name:'Infrared Thermography',items:[
      {svc:'Electrical panel thermal scan',vendor:'Intertek',scope:'MV switchgear',start:'Jan 15, 2027',end:'Jan 20, 2027',status:'Draft'},
      {svc:'Thermal envelope survey',vendor:'Intertek',scope:'E-house & BESS',start:'Dec 1',end:'Dec 15',status:'Draft'}
    ]},
    {code:'VIZ',name:'Enhanced Visualization',items:[
      {svc:'BIM/VDC coordination',vendor:'Skanska VDC',scope:'Structural & MEP',start:'May 1',end:'Ongoing',status:'Active'},
      {svc:'3D progress capture (monthly)',vendor:'Matterport',scope:'Full site',start:'Jun 1',end:'Dec 31',status:'Scheduled'},
      {svc:'Clash detection support',vendor:'Skanska VDC',scope:'MEP coordination',start:'Jul 1',end:'Oct 31',status:'Scheduled'}
    ]}
  ];
  var SVC_PEOPLE=[
    {name:'Site Survey Lead',vendor:'HMH Engineers',role:'GEO',sa:0,ea:9},
    {name:'Utility Mapping Specialist',vendor:'GPRS',role:'SUM',sa:1,ea:5},
    {name:'VDC Coordinator',vendor:'Skanska VDC',role:'VIZ',sa:1,ea:8},
    {name:'Progress Drone Operator',vendor:'DroneBase',role:'GEO',sa:1,ea:9},
    {name:'BAS Controls Engineer',vendor:'Siemens',role:'BAS',sa:6,ea:9},
    {name:'OFE Manager',vendor:'McCarthy',role:'OFE',sa:4,ea:8},
    {name:'Commissioning Specialist',vendor:'Siemens',role:'BAS',sa:8,ea:9},
    {name:'IRT Thermographer',vendor:'Intertek',role:'IRT',sa:9,ea:9}
  ];
  function renderSvcPlan(){
    var mount=document.getElementById('ccDpSvc'); if(!mount)return;
    var ns=CURRENT==='ns';
    var LSPARK='<svg viewBox="0 0 24 24" fill="currentColor" style="width:13px;height:13px"><path d="M12 2l2.4 7.4H22l-6 4.5 2.3 7.1L12 16.9 5.3 21l2.3-7.1-6-4.5h7.6z"/></svg>';
    var h='<div class="phead"><div><h1>Professional services plan</h1><div class="meta"><span class="chip">Specialty services scoped to this project</span><span class="chip ver">'+(ns?'North Star':'V1 — standard')+'</span></div></div></div>';
    if(ns){
      h+='<div class="ins-strip"><span class="isi">'+LSPARK+'</span><div><div class="ist">02S insight</div><div class="isd">BAS commissioning specialist starts Dec 1 — confirm BESS and switchgear readiness by Nov 15. VDC coordinator and drone operator have overlapping site windows through Dec.</div></div></div>';
      var LGM=['Apr ’26','May ’26','Jun ’26','Jul ’26','Aug ’26','Sep ’26','Oct ’26','Nov ’26','Dec ’26','Jan ’27'];
      var N=LGM.length, todayIdx=3;
      var todayPct=((todayIdx+0.8)/N)*100;
      var mh=''; for(var mi=0;mi<N;mi++){ mh+='<div class="gh-m">'+LGM[mi]+'</div>'; }
      var gridBg='repeating-linear-gradient(to right, transparent 0, transparent calc('+(100/N)+'% - 1px), var(--g150) calc('+(100/N)+'% - 1px), var(--g150) calc('+(100/N)+'%))';
      h+='<div class="eq-cap"><span>Resources scheduled on site — people and specialists across all service categories.</span></div>';
      var roleColors={GEO:'onrent',SUM:'submitted',VIZ:'onrent',BAS:'submitted',OFE:'draft',IRT:'draft'};
      h+='<div class="gantt log-gantt"><div class="g-head"><div class="gh-label">Resource / vendor</div><div class="gh-months">'+mh+'</div></div><div class="g-body">';
      h+='<div class="g-today" style="left:calc(220px + (100% - 220px) * '+(todayPct/100).toFixed(4)+')">' + '<span class="gt-lbl">Today</span></div>';
      SVC_PEOPLE.forEach(function(r){
        var a=r.sa, b=r.ea;
        var left=(a/N)*100, width=((b-a+1)/N)*100;
        var barCls=roleColors[r.role]||'draft';
        h+='<div class="grow"><div class="g-label">'+r.name+'<span class="gqty" style="font-size:11px;font-weight:400;opacity:.7;margin-left:6px">'+r.vendor+'</span></div>'
          +'<div class="g-track" style="background-image:'+gridBg+'">'  
          +'<div class="g-bar '+barCls+' vw" style="left:'+left.toFixed(3)+'%;width:calc('+width.toFixed(3)+'% - 3px)" title="'+r.role+' · '+r.vendor+'">'+r.role+'</div>'
          +'</div></div>';
      });
      h+='</div>';
      h+='<div class="g-legend"><span class="lg"><span class="gl-sw onrent"></span>GEO / VIZ</span><span class="lg"><span class="gl-sw submitted"></span>SUM / BAS</span><span class="lg"><span class="gl-sw draft"></span>OFE / IRT</span><span class="lg"><span class="gl-today"></span>Today · Jul ’26</span></div>';
      h+='</div>';
    } else {
      h+='<div class="eq-cap"><span>Specialty services grouped by RSI service type — scope, vendor, and scheduling status for each engagement.</span></div>';
      var gt='1fr 140px 140px 80px 80px 100px';
      SVC_SPECS.forEach(function(spec){
        h+='<div style="margin-top:20px"><div class="eq-toolbar" style="margin-bottom:8px"><span class="dp-sec-t"><span class="tag info" style="font-size:10.5px;font-weight:700;letter-spacing:.04em;padding:2px 7px;margin-right:6px">'+spec.code+'</span>'+spec.name+'</span></div>';
        h+='<div class="dp-tbl"><div class="dp-head" style="grid-template-columns:'+gt+'"><span>Service</span><span>Vendor</span><span>Scope</span><span>Start</span><span>End</span><span>Status</span></div>';
        spec.items.forEach(function(r){
          var tone=r.status==='Active'?'ok':(r.status==='Scheduled'?'info':(r.status==='Requested'?'warn':'neu'));
          h+='<div class="dp-row" style="grid-template-columns:'+gt+'"><div>'+r.svc+'</div><div class="sub">'+r.vendor+'</div><div class="sub">'+r.scope+'</div><div>'+r.start+'</div><div>'+r.end+'</div><div><span class="tag '+tone+'">'+r.status+'</span></div></div>';
        });
        h+='</div></div>';
      });
    }
    mount.innerHTML=h;
  }
  function renderCcScreen(s){ if(s==='ccdash'){ renderCcDash(); } else if(s==='fulfill'||s==='fulfill-quotes'){ if(s==='fulfill-quotes')fqView='quotes'; renderFulfill(); } else if(s==='mytasks'){ renderMyTasks(); } else if(s==='gap'){ renderGap(); } else if(s==='anomaly'){ renderAnomaly(); } else if(s==='margin'){ renderMargin(); } else if(s==='dpequip'){ renderCcDemand('equipment'); } else if(s==='dplog'){ renderCcDemand('logistics'); } else if(s==='dpsvc'){ renderCcDemand('profservices'); } else if(s==='dpproc'){ renderCcDemand('procurement'); } else if(s==='dpprefab'){ renderCcDemand('prefab'); } else if(s==='fleet'){ renderFleet(); } else { ccStub(s); } }
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
  function ccLookaheadHTML(proj,ns){
    var LSPARK='<svg viewBox="0 0 24 24" fill="currentColor" style="width:13px;height:13px;flex-shrink:0"><path d="M12 2l2.4 7.4H22l-6 4.5 2.3 7.1L12 16.9 5.3 21l2.3-7.1-6-4.5h7.6z"/></svg>';
    var REF=new Date(2026,7,1);
    var WIN_DAYS=21;
    function dayOff(ds){var pts=ds.split('-');return Math.round((new Date(+pts[0],+pts[1]-1,+pts[2])-REF)/86400000);}
    function pct(d){return Math.max(0,Math.min(100,Math.round(d/WIN_DAYS*100)))+'%';}
    var isAll=(proj===''||proj==='all'||!proj);
    var items=[];
    if(isAll){
      ['Hercules Solar + BESS','Riverside Medical Center','Cimarron Data Center'].forEach(function(p){
        (CC_LOOKAHEAD[p]||[]).forEach(function(it){
          var o={}; for(var k in it)o[k]=it[k]; o._proj=p; items.push(o);
        });
      });
      var tonePri={warn:0,info:1,ok:2,neu:3};
      items.sort(function(a,b){var ta=tonePri[a.tone]||2,tb=tonePri[b.tone]||2;return ta!==tb?ta-tb:(a.start<b.start?-1:1);});
      items=items.slice(0,8);
    } else {
      items=(CC_LOOKAHEAD[proj]||[]).slice().sort(function(a,b){return a.start<b.start?-1:1;});
    }
    if(!items.length) return '';
    var toneColor={ok:'var(--success)',warn:'var(--warning)',info:'var(--info)',neu:'var(--g400)'};
    var pillarTone={Equipment:'info',Billing:'warn','Prof. services':'ok',Logistics:'neu',Procurement:'neu',Prefab:'info'};
    var short={'Hercules Solar + BESS':'HRC','Riverside Medical Center':'RIV','Cimarron Data Center':'CIM'};
    var labelW=isAll?'210px':'190px';
    var warnItems=items.filter(function(x){return x.tone==='warn';});
    if(!document.getElementById('cc-la-style')){var _sEl=document.createElement('style');_sEl.id='cc-la-style';_sEl.textContent='.cc-la-row{position:relative}.cc-la-tip{display:none;position:absolute;right:0;top:calc(100% + 5px);background:#1e293b;color:#f1f5f9;border-radius:7px;padding:9px 12px;font-size:11px;min-width:220px;max-width:290px;z-index:300;pointer-events:none;line-height:1.55;box-shadow:0 4px 16px rgba(0,0,0,.28);white-space:normal}.cc-la-row:hover .cc-la-tip{display:block}.cc-la-tip-label{font-size:12px;font-weight:700;color:#f8fafc;display:block;margin-bottom:3px}.cc-la-tip-meta{font-size:10px;color:#94a3b8;display:block;margin-bottom:3px}.cc-la-tip-note{font-size:11px;color:#cbd5e1}';document.head.appendChild(_sEl);}
    var h='';
    h+='<div id="cc-la-wrap" style="background:#fff;border:1px solid var(--g200);border-radius:8px;padding:16px 18px;display:flex;flex-direction:column;overflow:hidden">';
    h+='<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:'+(ns&&warnItems.length?'8':'12')+'px">';
    h+='<div style="font-size:13px;font-weight:700;color:var(--g900)">3-week lookahead</div>';
    h+='<div style="font-size:11px;color:var(--g400)">Aug 1–21, 2026</div>';
    h+='</div>';
    if(ns&&warnItems.length){
      var nw=warnItems.slice().sort(function(a,b){return a.start<b.start?-1:1;})[0];
      var nmsg=warnItems.length+' '+(warnItems.length===1?'item requires':'items require')+' action — ';
      nmsg+=nw.label.toLowerCase()+' ('+nw.ref;
      if(isAll&&nw._proj)nmsg+=', '+short[nw._proj];
      nmsg+=') is the nearest deadline. Hover any bar to see details.';
      h+='<div style="background:#eff6ff;border-left:3px solid var(--info);border-radius:0 6px 6px 0;padding:7px 10px;margin-bottom:11px;font-size:11px;color:var(--g800);display:flex;gap:7px;align-items:flex-start">';
      h+=LSPARK+'<span>'+nmsg+'</span></div>';
    } else if(!ns){
      h+='<div style="font-size:10.5px;color:var(--g400);margin-bottom:10px">Hover any bar to see details</div>';
    }
    h+='<div style="display:grid;grid-template-columns:'+labelW+' 1fr;gap:0;margin-bottom:4px">';
    h+='<div></div>';
    h+='<div style="display:grid;grid-template-columns:repeat(3,1fr)">';
    h+='<div style="font-size:10px;font-weight:700;color:var(--g500);padding:0 4px;border-right:1px dashed var(--g200)">Aug 1–7</div>';
    h+='<div style="font-size:10px;font-weight:700;color:var(--g500);padding:0 4px;border-right:1px dashed var(--g200)">Aug 8–14</div>';
    h+='<div style="font-size:10px;font-weight:700;color:var(--g500);padding:0 4px">Aug 15–21</div>';
    h+='</div></div>';
    items.forEach(function(item){
      var s=dayOff(item.start),e=dayOff(item.end)+1;
      var left=pct(s),width=pct(Math.max(1,e-s));
      var bc=toneColor[item.tone]||'var(--g400)';
      var ptone=pillarTone[item.pillar]||'neu';
      var dateStr=item.start.substring(5)+(item.end!==item.start?' → '+item.end.substring(5):'');
      var tipMeta=item.ref+(isAll&&item._proj?' · '+short[item._proj]:'')+' · '+dateStr;
      h+='<div class="cc-la-row" style="display:grid;grid-template-columns:'+labelW+' 1fr;gap:0;margin-bottom:4px;align-items:center">';
      h+='<div style="display:flex;align-items:center;gap:4px;padding-right:8px;min-width:0">';
      h+='<span class="tag '+ptone+'" style="font-size:9px;padding:1px 5px;white-space:nowrap;flex-shrink:0">'+item.pillar+'</span>';
      if(isAll&&item._proj)h+='<span style="font-size:9px;color:var(--g400);flex-shrink:0">'+short[item._proj]+'</span>';
      h+='<span style="font-size:11px;color:var(--g800);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+item.label+'</span>';
      h+='</div>';
      h+='<div style="position:relative;height:22px;background:var(--g100);border-radius:4px;cursor:default">';
      h+='<div style="position:absolute;left:'+left+';width:'+width+';height:100%;background:'+bc+';border-radius:4px;opacity:.85;display:flex;align-items:center;padding:0 6px;overflow:hidden">';
      h+='<span style="font-size:10px;font-weight:600;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+item.ref+'</span>';
      h+='</div>';
      h+='<div class="cc-la-tip"><span class="cc-la-tip-label">'+item.label+'</span><span class="cc-la-tip-meta">'+tipMeta+'</span><span class="cc-la-tip-note">'+item.note+'</span></div>';
      h+='</div>';
      h+='</div>';
    });
    var warnN=items.filter(function(x){return x.tone==='warn';}).length;
    h+='<div style="font-size:11px;color:var(--g400);margin-top:auto;padding-top:8px;border-top:1px solid var(--g150)">';
    h+=warnN+(warnN===1?' item requires action':' items require action')+' \xb7 '+items.length+' total touchpoints this period';
    if(!isAll)h+=' \xb7 <span class="lk" onclick="ccGo(\'fulfill\')">View fulfillment queue →</span>';
    h+='</div>';
    h+='</div>';
    return h;
  }

  
  function ccPfBU(bu){_pfBU=bu;renderCcPortfolio();}
  function ccPfRegion(r){_pfRegion=r;renderCcPortfolio();}
  function ccPfClear(){_pfBU='all';_pfRegion='all';renderCcPortfolio();}
  function renderCcPortfolio(){
    var mount=gel('ccPortfolio'); if(!mount)return;
    var ns=CURRENT==='ns';
    var allProjs=['hercules','riverside','cimarron'];
    var h='';
    h+='<div class="phead"><div><h1>Portfolio intelligence</h1>';
    h+='<div class="meta"><span class="chip">'+svg('<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/>')+'· All projects · portfolio</span>';
    h+='<span class="chip ver">'+(ns?'North Star':'V1 — standard')+'</span></div></div></div>';
    h+='<div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center;padding:11px 14px;background:var(--g50);border:1px solid var(--g100);border-radius:8px;margin-bottom:20px">';
    h+='<span style="font-size:10px;font-weight:700;color:var(--g500);letter-spacing:.05em;margin-right:2px">BU</span>';
    [['all','All'],['renewables','Renewables'],['civil','Civil'],['mc','Mission Critical']].forEach(function(o){
      var act=_pfBU===o[0];
      var col=act?(o[0]==='all'?'var(--charcoal)':(_BU_COLOR[o[0]]||'var(--charcoal)')):'var(--g200)';
      var bg=act?(o[0]==='all'?'var(--charcoal)':(_BU_COLOR[o[0]]||'var(--charcoal)')):'#fff';
      h+='<button style="padding:3px 11px;border-radius:5px;border:1px solid '+col+';background:'+bg+';color:'+(act?'#fff':'var(--g700)')+';font-size:11.5px;cursor:pointer;font-weight:'+(act?'600':'400')+'" onclick="ccPfBU(\''+o[0]+'\')">'+o[1]+'</button>';
    });
    h+='<span style="width:1px;height:18px;background:var(--g200);margin:0 6px;flex-shrink:0"></span>';
    h+='<span style="font-size:10px;font-weight:700;color:var(--g500);letter-spacing:.05em;margin-right:2px">REGION</span>';
    [['all','All'],['southern','Southern'],['sopac','SoPac'],['norpac','NorPac'],['southwest','Southwest'],['central','Central']].forEach(function(o){
      var act=_pfRegion===o[0];
      h+='<button style="padding:3px 10px;border-radius:5px;border:1px solid '+(act?'var(--charcoal)':'var(--g200)')+';background:'+(act?'var(--charcoal)':'#fff')+';color:'+(act?'#fff':'var(--g700)')+';font-size:11.5px;cursor:pointer;font-weight:'+(act?'600':'400')+'" onclick="ccPfRegion(\''+o[0]+'\')">'+o[1]+'</button>';
    });
    if(_pfBU!=='all'||_pfRegion!=='all'){h+='<button class="btn btn-ghost btn-sm" style="margin-left:8px;font-size:11px" onclick="ccPfClear()">Clear</button>';}
    h+='</div>';
    var buCols=_pfBU==='all'?['renewables','civil','mc']:[_pfBU];
    h+='<div style="display:grid;grid-template-columns:repeat('+buCols.length+',1fr);gap:16px">';
    buCols.forEach(function(bu){
      var buProjs=allProjs.filter(function(p){var m=_PROJ_META[p];if(!m||m.bu!==bu)return false;if(_pfRegion!=='all'&&m.region!==_pfRegion)return false;return true;});
      var buOrders=ORDERS.filter(function(o){var pm=_PROJ_META[o.proj||'hercules'];if(!pm||pm.bu!==bu)return false;if(_pfRegion!=='all'&&pm.region!==_pfRegion)return false;return true;});
      var buActive=buOrders.filter(function(o){return(o.stage===4||o.stage===5)&&!(o.latest&&o.latest.indexOf('Off-rent')===0);});
      var buBudget=buProjs.reduce(function(s,p){return s+((_PROJ_STATS[p]&&_PROJ_STATS[p].budget)||0);},0);
      var buBudgetLabel=buBudget>0?'$'+(buBudget/1000000).toFixed(1)+'M':'—';
      var active=_pfBU===bu;
      var col=_BU_COLOR[bu]||'#6b7280';
      h+='<div style="background:#fff;border:1px solid '+(active?col:'var(--g200)')+';border-top:3px solid '+col+';border-radius:10px;padding:18px 20px;cursor:pointer" onclick="ccPfBU(\''+(active?'all':bu)+'\')">';
      h+='<div style="display:flex;align-items:center;gap:7px;margin-bottom:12px">';
      h+='<span style="width:10px;height:10px;border-radius:50%;background:'+col+';flex-shrink:0"></span>';
      h+='<span style="font-size:14px;font-weight:700;color:var(--g900)">'+_BU_LABELS[bu]+'</span>';
      h+='</div>';
      if(buProjs.length){
        h+='<div style="display:flex;flex-direction:column;gap:5px;margin-bottom:14px">';
        buProjs.forEach(function(p){
          var rk=(_PROJ_META[p]||{}).region||'';
          h+='<div style="display:flex;justify-content:space-between;align-items:center;padding:6px 9px;background:var(--g50);border-radius:6px">';
          h+='<span style="font-size:12px;color:var(--g800);font-weight:500">'+(_PROJ_LABELS[p]||p)+'</span>';
          h+='<span style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--g500);background:#fff;border:1px solid var(--g200);padding:2px 7px;border-radius:3px">'+(_REGION_LABELS[rk]||rk)+'</span>';
          h+='</div>';
        });
        h+='</div>';
      } else {
        h+='<div style="font-size:11px;color:var(--g400);margin-bottom:14px;padding:6px 9px;font-style:italic">No projects match filter</div>';
      }
      h+='<div style="border-top:1px solid var(--g100);padding-top:12px;display:flex;justify-content:space-between;align-items:flex-end">';
      h+='<div style="display:flex;gap:18px">';
      h+='<div><div style="font-size:22px;font-weight:700;line-height:1;color:var(--g900);margin-bottom:2px">'+buOrders.length+'</div><div style="font-size:10px;color:var(--g500)">orders</div></div>';
      h+='<div><div style="font-size:22px;font-weight:700;line-height:1;color:'+(buActive.length>0?'#10b981':'var(--g400)')+';margin-bottom:2px">'+buActive.length+'</div><div style="font-size:10px;color:var(--g500)">active</div></div>';
      h+='</div>';
      h+='<div style="text-align:right"><div style="font-size:15px;font-weight:700;color:var(--g800);line-height:1;margin-bottom:2px">'+buBudgetLabel+'</div><div style="font-size:10px;color:var(--g500)">planned SC spend</div></div>';
      h+='</div>';
      h+='</div>';
    });
    h+='</div>';
    mount.innerHTML=h;
  }
  function renderCcDash(){
    var mount=document.getElementById('ccDash'); if(!mount)return;
    var ns=CURRENT==='ns';
    var SPARK='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6 4.5 2.3 7.1L12 16.9 5.3 21l2.3-7.1-6-4.5h7.6z"/></svg>';
    var ICO_SWAP='<path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 014-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 01-4 4H3"/>';
    var ICO_TAX='<path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><path d="M7 7h.01"/>';
    var h='';

    var mgR=(typeof mgAtRisk==='function')?mgAtRisk():{t:27200,n:11};
    var mgP=(typeof mgPortfolioRoll==='function')?(_ccFSMProj&&_ccFSMProj!==''&&_ccFSMProj!=='all'&&typeof mgProjRoll==='function'?mgProjRoll(_ccFSMProj):mgPortfolioRoll()):{act:{pct:0}};
    var isFSM=ccPersona==='fsm';
    var fsmScope=_ccFSMProj===''?CC_FSM_PROJECTS:(_ccFSMProj==='all'?null:[_ccFSMProj]);
    var fsmFQ=(typeof FQ!=='undefined'&&FQ.length)?FQ:[];
    var scopedFQ=isFSM&&fsmScope?fsmFQ.filter(function(r){return fsmScope.indexOf(r.project)>=0;}):fsmFQ;
    var QUOTES_scoped=isFSM&&fsmScope?CC_QUOTES.filter(function(q){return fsmScope.indexOf(q.project)>=0;}):CC_QUOTES;
    var FQ_open=scopedFQ.filter(function(r){return FQ_DONE.indexOf(r.status)<0;});
    var ownedVsRerent=FQ_open.filter(function(r){return r.kind==='equip'&&r.avail&&r.avail.length>0;}).length;
    var openReq=FQ_open.length+QUOTES_scoped.length;
    var awaitReq=scopedFQ.filter(function(r){return r.status==='Awaiting pricing';}).length+QUOTES_scoped.filter(function(q){return q.status==='Needs pricing'||q.status==='Quote in progress';}).length;
    var fIdle=FLEET.filter(function(r){return r.status==='idle';}).length;
    var fOR=FLEET.filter(function(r){return r.status==='onrent';}).length;
    var fRepl=FLEET.filter(function(r){return r.life==='replace';}).length;
    var kpis=[
      {k:'Open requests',v:String(openReq),sub:awaitReq+' awaiting pricing',tone:'warn',icon:IC.cart,to:'fulfill'},
      {k:'Owned vs re-rent',v:String(ownedVsRerent),sub:'decisions due',tone:ownedVsRerent>0?'warn':'ok',icon:ICO_SWAP,to:'fulfill'},
      {k:'Demand\u2013supply gap',v:'\u22127',sub:'peak \u00b7 October',tone:'bad',icon:IC.chart,to:'gap'},
      {k:'Billing at risk',v:kfmt(mgR.t)+'/mo',sub:mgR.n+' open anomalies',tone:'bad',icon:IC.warn,to:'anomaly'},
      {k:'Project margin',v:mgP.act.pct.toFixed(1)+'%',sub:'target 15%',tone:mgP.act.pct>=15?'ok':'warn',icon:IC.dollar,to:'margin'}
    ];
    if(ns) kpis.push({k:'Asset lifecycle',v:fRepl+' flags',sub:fOR+'\u00a0on-rent\u00a0\u00b7\u00a0'+fIdle+'\u00a0idle',tone:fRepl>0?'bad':fIdle>0?'warn':'ok',icon:IC.box,to:'fleet'});
    var acts=[
      {t:CC_QUOTES.filter(function(q){return q.status==='Needs pricing';}).length+' portal RFQs — pricing not set',s:'Equipment, prefab &amp; prof services · submitted this week',proj:null,tag:{l:'Quotes',tone:'warn'},to:'fulfill-quotes',reco:'MEWP matches the rate card — auto-price; cable tray brackets and MEP commissioning need fabrication &amp; specialty quotes',icon:IC.cart},
      {t:'REQ-4479 needs taxonomy confirmation',s:'2\u00d7 excavator \u2014 unmapped equipment class',proj:'Cimarron Data Center',tag:{l:'Needs map',tone:'warn'},to:'fulfill',fn:"ccGoFulfill('REQ-4479')",reco:'02S mapped it to Excavator \u203a 50-ton (94% confidence) \u2014 confirm to release for pricing & allocation',icon:ICO_TAX},
      {t:'6 requests awaiting pricing',s:'5 are pending-pricing lines across demand plans',proj:'Hercules Solar + BESS',tag:{l:'Pending pricing',tone:'warn'},to:'fulfill',fn:"ccGoFulfill(null)",reco:'Auto-price 3 from the 02S catalog; 2 need admin review',icon:IC.cart},
      {t:'Riverside \u2014 5\u00d7 tower crane request',s:'needs an owned vs re-rent decision',proj:'Riverside Medical Center',tag:{l:'Decision',tone:'info'},to:'fulfill',fn:"ccGoFulfill('REQ-4471')",reco:'Optimizer: 2 owned + 3 re-rent \u2014 19% margin (~$34K/mo)',icon:IC.crane},

      {t:'Excavator shortfall projected \u2014 October',s:'portfolio demand exceeds owned fleet by 3 units',tag:{l:'Gap',tone:'warn'},to:'gap',reco:'Buy 2 (19-mo payback) or pre-position idle units \u2014 both in the ranked buy list',icon:IC.chart},
      {t:'Excavator capacity \u2014 Cimarron Oct phase',s:'2\u00d7 50-ton unallocated \u00b7 excavation start at risk',proj:'Cimarron Data Center',tag:{l:'Capacity',tone:'warn'},to:'fulfill',fn:"ccGoFulfill('REQ-4479')",reco:'Assign EX-2205 + EX-2208 from North/South Yard \u2014 confirms Oct 12 excavation start',icon:IC.box},
      {t:'BESS commissioning resource gap',s:'2 FTE unplaced \u00b7 Nov 2026 P6 start \u00b7 SOW unexecuted',proj:'Hercules Solar + BESS',tag:{l:'Capacity',tone:'warn'},to:'fulfill',fn:"ccGoFulfill('REQ-S-2108')",reco:'02S: execute SOW by Oct 1 \u2014 slip risk 4\u20136 weeks if unaddressed',icon:IC.box},
      {t:'MV switchgear + BESS containers \u2014 PO release',s:'2 at-risk lines \u00b7 Nov 15 energization at risk',proj:'Hercules Solar + BESS',tag:{l:'At-risk',tone:'bad'},to:'fulfill',fn:"ccGoFulfill('REQ-P-0501')",reco:'Release both POs today \u2014 order-by window already passed',icon:IC.warn},
      {t:'Tower crane capacity \u2014 5\u00d7 decision',s:'Riverside \u00b7 owned vs re-rent \u00b7 Aug 20 need-by',proj:'Riverside Medical Center',tag:{l:'Capacity',tone:'info'},to:'fulfill',fn:"ccGoFulfill('REQ-4471')",reco:'Optimizer: 2 owned (TC-0012, TC-0018) + 3 re-rent \u2014 confirms Aug 20 installation',icon:IC.crane}
    ];
        var scopeLabel=!isFSM?'All projects \u00b7 portfolio':(_ccFSMProj===''?'My projects \u00b7 3 assigned':(_ccFSMProj==='all'?'All projects \u00b7 portfolio':_ccFSMProj));
    h+='<div class="phead"><div><h1>Operations dashboard</h1><div class="meta"><span class="chip">'+svg(IC.chart)+scopeLabel+'</span><span class="chip ver">'+(ns?'North Star':'V1 \u2014 standard')+'</span></div></div></div>';
    if(isFSM){
      h+='<div style="display:flex;align-items:center;gap:7px;padding:10px 0 4px;flex-wrap:wrap">';
      h+='<span style="font-size:11px;font-weight:600;color:var(--g500);text-transform:uppercase;letter-spacing:.04em;margin-right:2px">View:</span>';
      h+='<button class="btn btn-ghost btn-sm'+(_ccFSMProj===''?' on':'')+' bex-fsmp" onclick="setCCFSMProj(\'\')">My projects</button>';
      h+=CC_FSM_PROJECTS.map(function(pr){return '<button class="btn btn-ghost btn-sm'+(_ccFSMProj===pr?' on':'')+' bex-fsmp" onclick="setCCFSMProj(\''+pr+'\')">'+(pr==='Hercules Solar + BESS'?'Hercules Solar':pr==='Cimarron Data Center'?'Cimarron DC':'Riverside Medical')+'</button>';}).join('');
            h+='</div>';
    }
    if(isFSM&&fsmScope) acts=acts.filter(function(a){return !a.proj||fsmScope.indexOf(a.proj)>=0;});
    h+='<div class="vitals" style="grid-template-columns:repeat('+(ns?6:5)+',1fr)">';
    kpis.forEach(function(k){ h+='<div class="vital clk '+k.tone+'" onclick="ccGo(\''+k.to+'\')"><div class="vk">'+svg(k.icon)+k.k+'</div><div class="vv">'+k.v+'</div><div class="vsub">'+k.sub+'</div><span class="vchev">'+svg('<path d="M9 18l6-6-6-6"/>')+'</span></div>'; });
    h+='</div>';
    if(!ns){ h+='<style>#ccDash .vitals .vital:nth-child(4){opacity:.42;pointer-events:none;cursor:default;filter:grayscale(.6)}</style>'; }
    if(ns){ h+='<div class="ins-strip"><span class="isi">'+SPARK+'</span><div><div class="ist">02S</div><div class="isd">3 idle excavators at Southern Yard can cover 2 open October requests (Hercules, Riverside). Redeploying instead of re-renting saves ~$96K this quarter and lifts utilization to 86%.</div></div></div>'; }
    var qlinks=[
      {l:'Fulfillment queue',to:'fulfill',icon:IC.cart}
    ];
    h+='<div style="display:flex;justify-content:flex-end;align-items:center;gap:8px;margin-bottom:14px;padding:6px 0">';
    h+='<span style="font-size:10.5px;color:var(--g500);font-weight:600;margin-right:2px">Quick links</span>';
    qlinks.forEach(function(q){ h+='<button class="btn btn-ghost btn-sm" style="font-size:11px;display:inline-flex;align-items:center;gap:5px" onclick="ccGo(\''+q.to+'\')">'+svg(q.icon)+' '+q.l+' →</button>'; });
    h+='</div>';
    h+='<div style="display:grid;grid-template-columns:'+(isFSM?'1fr 1.6fr':'1fr')+';gap:24px;align-items:stretch">';
    h+='<div class="cc-queue" style="display:flex;flex-direction:column;overflow:hidden;margin-top:0"><div class="cc-qhead">'+(ns?SPARK:svg('<path d="M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L14.7 3.9a2 2 0 00-3.4 0z"/><path d="M12 9v4M12 17h.01"/>'))+(ns?'02S — recommended actions':(_ccFSMProj&&_ccFSMProj!==''&&_ccFSMProj!=='all'?'Ball in court — Needs you — '+(_ccFSMProj==='Hercules Solar + BESS'?'Hercules Solar':_ccFSMProj==='Cimarron Data Center'?'Cimarron DC':'Riverside Medical'):'Ball in court — Needs you — across all projects'))+'</div>';
    var _aHtml=function(a){return '<div class="cc-act" onclick="'+(a.fn||"ccGo('"+a.to+"')")+'"><div class="cc-ai">'+svg(a.icon)+'</div><div class="cc-ab"><div class="cc-at">'+a.t+'</div><div class="cc-as">'+a.s+'</div>'+((ns&&a.reco)?'<div class="cc-reco">'+SPARK+a.reco+'</div>':'')+'</div><span class="tag '+a.tag.tone+'">'+a.tag.l+'</span><span class="cc-chev">'+svg('<path d="M9 18l6-6-6-6"/>') +'</span></div>';};
    var _aPg=4,_aNp=Math.ceil(acts.length/_aPg);
    h+='<div style="flex:1">';
    for(var _pi=0;_pi<_aNp;_pi++){
      h+='<div class="cc-pg" id="cc-pg-'+_pi+'" style="'+(_pi>0?'display:none':'')+'">'; 
      acts.slice(_pi*_aPg,_pi*_aPg+_aPg).forEach(function(a){h+=_aHtml(a);});
      h+='</div>';
    }
    h+='</div>';
    if(_aNp>1){
      h+='<div style="display:flex;align-items:center;justify-content:space-between;border-top:1px solid var(--g100);padding:8px 8px 2px">';
      h+='<button id="cc-pg-p" class="btn btn-ghost btn-sm" style="font-size:15px;line-height:1;padding:2px 10px;opacity:.4;cursor:default" disabled onclick="(function(){var l=document.getElementById(\'cc-pg-lbl\');var c=+l.dataset.p,np=+l.dataset.np;if(c===0)return;document.getElementById(\'cc-pg-\'+c).style.display=\'none\';var n=c-1;document.getElementById(\'cc-pg-\'+n).style.display=\'\';l.dataset.p=n;l.textContent=(n+1)+\'/\'+np;var pp=document.getElementById(\'cc-pg-p\'),pn=document.getElementById(\'cc-pg-n\');pp.disabled=n===0;pp.style.opacity=n===0?\'0.4\':\'1\';pp.style.cursor=n===0?\'default\':\'pointer\';pn.disabled=false;pn.style.opacity=\'1\';pn.style.cursor=\'pointer\';})()">←</button>';
      h+='<span id="cc-pg-lbl" data-p="0" data-np="'+_aNp+'" style="font-size:11px;color:var(--g400)">1/'+_aNp+'</span>';
      h+='<button id="cc-pg-n" class="btn btn-ghost btn-sm" style="font-size:15px;line-height:1;padding:2px 10px" onclick="(function(){var l=document.getElementById(\'cc-pg-lbl\');var c=+l.dataset.p,np=+l.dataset.np;if(c===np-1)return;document.getElementById(\'cc-pg-\'+c).style.display=\'none\';var n=c+1;document.getElementById(\'cc-pg-\'+n).style.display=\'\';l.dataset.p=n;l.textContent=(n+1)+\'/\'+np;var pp=document.getElementById(\'cc-pg-p\'),pn=document.getElementById(\'cc-pg-n\');pn.disabled=n===np-1;pn.style.opacity=n===np-1?\'0.4\':\'1\';pn.style.cursor=n===np-1?\'default\':\'pointer\';pp.disabled=false;pp.style.opacity=\'1\';pp.style.cursor=\'pointer\';})()">→</button>';
      h+='</div>';
    }
    h+='</div>';

    if(isFSM) h+=ccLookaheadHTML(_ccFSMProj,ns);
    h+='</div>';
    h+='<div id="ccScView" style="margin-top:28px"></div>';
    h+='<div id="ccPortfolio" style="margin-top:28px"></div>';
    mount.innerHTML=h;
    renderScView();
    renderCcPortfolio();
    if(isFSM){var _eqH=function(){var _la=document.getElementById('cc-la-wrap'),_cq=mount.querySelector('.cc-queue');if(_la&&_cq){_la.style.minHeight='';_cq.style.minHeight='';var _mh=Math.max(_la.offsetHeight,_cq.offsetHeight);_la.style.minHeight=_mh+'px';_cq.style.minHeight=_mh+'px';}};requestAnimationFrame(function(){requestAnimationFrame(_eqH);});}

  }

  /* ═══════════ FULFILLMENT QUEUE + OPTIMIZER ═══════════ */
  var CC_SPARK='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6 4.5 2.3 7.1L12 16.9 5.3 21l2.3-7.1-6-4.5h7.6z"/></svg>';
  var SC_LIST=['Chandler','San Diego','Corona','St. Louis','Houston','Kansas City','Sacramento'];
  var _scFilter='', _scPillar='all', _scPage=0;
  function scSet(k,v){if(k==='sc')_scFilter=v;else if(k==='pillar')_scPillar=v;_scPage=0;renderScView();}
  function scPage(n){_scPage=n;renderScView();}
  function fqSetYard(id,yard){var r=fqById(id);if(r){r.yard=yard;renderFulfill();}}
  function fqYardSelect(r){
    var opts='<option value="">Assign yard…</option>'+SC_LIST.map(function(s){return'<option value="'+s+'"'+(r.yard===s?' selected':'')+'>'+s+'</option>';}).join('');
    return '<select onchange="fqSetYard(\''+r.id+'\'\',this.value)" style="font-size:10.5px;border:1px solid var(--g200);border-radius:4px;padding:2px 6px;color:'+(r.yard?'var(--g700)':'var(--g400)')+';cursor:pointer;background:#fff;margin-top:2px">'+opts+'</select>';
  }
  var FQ_TONE={'New':'neu','Requested':'neu','Awaiting pricing':'warn','Acknowledged':'info','Allocated':'ok','Fulfilled':'ok','Scheduled':'info','At-risk':'bad','PO issued':'ok','Submittal':'info','In fabrication':'info','Delivered':'ok'};
  var FQ_DONE=['Allocated','Acknowledged','PO issued','Delivered','In fabrication','Scheduled','Fulfilled'];
  var CC_QUOTES=[
    {id:'fqQ1',ref:'RFQ-4801',pillar:'equipment',item:'Mobile elevated work platform · 40 ft',qty:3,project:'Hercules Solar + BESS',needby:'Sep 15',code:'0100-0100-0000-0001',status:'Needs pricing',requestDate:'Jul 25',submittedBy:'J. Nakamura',note:'Panel installation · 8-week window · not on current demand plan'},
    {id:'fqQ2',ref:'RFQ-4802',pillar:'prefab',item:'Cable tray bracket assemblies',qty:'lot',project:'Cimarron Data Center',needby:'Oct 1',code:'2600-0540-0000-0001',status:'Needs pricing',requestDate:'Jul 26',submittedBy:'Site procurement',note:'Not in rate card — custom fabrication quote required'},
    {id:'fqQ4',ref:'RFQ-4804',pillar:'prefab',item:'Structural support frames (add scope)',qty:'8 units',project:'Hercules Solar + BESS',needby:'Oct 15',code:'0500-0500-0000-0001',status:'Needs pricing',requestDate:'Jul 29',submittedBy:'Site procurement',note:'Add-scope item — awaiting design review approval'},
    {id:'fqQ3',ref:'RFQ-4803',pillar:'profservices',item:'MEP commissioning lead · 1 FTE',qty:'1 FTE',project:'Riverside Medical Center',needby:'Nov 2026',code:'0100-0100-0000-0001',status:'Quote in progress',requestDate:'Jul 22',submittedBy:'R. Okafor',note:'Specialty role — checking rate card and 3 vendors'}
  ];
  var fqView='orders';
  function fqSetView(v){ fqView=v; renderFulfill(); }
  function ccSetQuotePrice(id){
    var q=CC_QUOTES.filter(function(x){return x.id===id;})[0]; if(!q)return;
    var b='<div class="fq-req"><div class="fq-req-t">'+q.item+'</div><div class="sub">'+q.ref+' · '+q.project+' · need-by '+q.needby+'</div></div>'
      +'<div class="fq-calc"><div class="fq-crow"><span>Submitted by</span><span>'+q.submittedBy+'</span></div>'
      +'<div class="fq-crow"><span>Request date</span><span>'+q.requestDate+'</span></div>'
      +'<div class="fq-crow"><span>Note</span><span>'+q.note+'</span></div></div>'
      +'<div style="margin:14px 0 4px"><label style="font-size:11.5px;font-weight:600;color:var(--g700);display:block;margin-bottom:5px">02S price</label>'
      +'<input id="quotePrice" type="text" class="dp-sel" style="width:190px" placeholder="e.g. $4,200/mo or $28K" /></div>'
      +'<div class="modal-foot"><button onclick="closeModal()">Cancel</button>'
      +'<button class="btn btn-red" onclick="ccConfirmQuotePrice(\'' +q.id+ '\')">Confirm &amp; send to project</button></div>';
    openModal('Set price — '+q.ref, b);
  }
  function ccConfirmQuotePrice(id){
    var q=CC_QUOTES.filter(function(x){return x.id===id;})[0]; if(!q)return;
    var inp=document.getElementById('quotePrice'); var val=inp&&inp.value&&inp.value.trim();
    if(!val){ toast('Enter a price first'); return; }
    q.status='Priced'; q.pricedAt=val;
    closeModal(); renderFulfill(); toast(q.ref+' priced at '+val+' — quote sent to project team');
  }
  function scissorUnits(){ var y=['South Yard','Central Yard','North Yard','West Yard']; var a=[]; for(var i=1;i<=8;i++){ a.push({id:'SL-33'+(i<10?'0':'')+i,yard:y[i%4]}); } return a; }
  var FQ=[
    {src:'adhoc',id:'fq1',yard:'Corona',ref:'REQ-4471',pillar:'equipment',item:'Tower crane (self-erect)',qty:5,project:'Riverside Medical Center',needby:'Aug 20',code:'0140-0000-0000-0001',kind:'equip',status:'New',o2sRate:35000,ownedCost:22500,avail:[{id:'TC-0012',yard:'Southern Yard'},{id:'TC-0018',yard:'Central Yard'}],reRentRate:32000,vendor:'ALL Crane',reco:2,taxMapped:false,docs:['Lift plan (PDF)','Crane rental agreement (PDF)','Site access plan (PDF)']},
    {src:'adhoc',id:'fq2',yard:'Houston',ref:'REQ-4472',pillar:'equipment',item:'Excavator, 45K class',qty:4,project:'Cimarron Data Center',needby:'Sep 5',code:'0200-0320-0000-0001',kind:'equip',status:'New',o2sRate:12000,ownedCost:7000,avail:[{id:'EX-2201',yard:'North Yard'}],reRentRate:9500,vendor:'Sunbelt',reco:1,docs:['Equipment spec sheet (PDF)','Ground bearing report (PDF)']},
    {src:'dp',id:'fq3',yard:'Chandler',ref:'REQ-4473',pillar:'equipment',item:'Crawler crane, 230T',qty:1,project:'Hercules Solar + BESS',needby:'Oct 1',code:'2600-3300-0000-0001',kind:'equip',status:'New',o2sRate:68000,ownedCost:0,avail:[],reRentRate:58000,vendor:'Maxim Crane',reco:0,docs:['Vendor quote (PDF)','Scope of work (PDF)']},
    {src:'adhoc',id:'fq4',yard:'Corona',ref:'REQ-4474',pillar:'equipment',item:'Scissor lift, 32 ft',qty:12,project:'Riverside Medical Center',needby:'Aug 12',code:'0100-0100-0000-0001',kind:'equip',status:'New',o2sRate:950,ownedCost:400,avail:scissorUnits(),reRentRate:700,vendor:'United Rentals',reco:8,docs:['Safety inspection checklist (PDF)']},
    {src:'adhoc',id:'fq9',yard:'Houston',ref:'REQ-4479',pillar:'equipment',item:'Excavator, 50-ton',qty:2,project:'Cimarron Data Center',needby:'Sep 12',code:'0200-0320-0000-0001',kind:'equip',status:'New',o2sRate:14000,ownedCost:8000,avail:[{id:'EX-2205',yard:'North Yard'},{id:'EX-2208',yard:'South Yard'}],reRentRate:11000,vendor:'United Rentals',reco:2,taxMapped:false,docs:['Equipment spec sheet (PDF)','Rental quote (PDF)']},
    {src:'adhoc',id:'fqL1',yard:'Houston',ref:'REQ-L-3042',pillar:'logistics',item:'Excavator delivery + haul (oversize)',qty:'1 move',project:'Cimarron Data Center',needby:'Sep 3',code:'0100-5000-0000-0001',kind:'flow',status:'Scheduled',doneNote:'Self-perform \u00b7 crew + trailer',docs:['Oversize permit (PDF)','Haul route map (PDF)']},
    {src:'adhoc',id:'fqL2',yard:'Corona',ref:'REQ-L-3054',pillar:'logistics',item:'Tower crane mobilization (oversize transport)',qty:'1 move',project:'Riverside Medical Center',needby:'Aug 18',code:'0100-5000-0000-0001',kind:'flow',status:'Scheduled',doneNote:'3PL \u00b7 Bragg Crane',docs:['Oversize permit (PDF)','Load & route plan (PDF)','Escort coordination brief (PDF)']},
    {src:'dp',id:'fqL3',yard:'Chandler',ref:'REQ-L-3061',pillar:'logistics',item:'BESS container placement (haul + crane)',qty:'6 moves',project:'Hercules Solar + BESS',needby:'Oct 20',code:'0100-5000-0000-0001',kind:'flow',status:'Requested',actLabel:'Schedule move',nextStatus:'Scheduled',hint:'Self-perform available \u2014 crew + crane free that week',docs:['Site layout plan (PDF)']},
    {src:'dp',id:'fq5',yard:'Chandler',ref:'REQ-4475',pillar:'services',item:'VDC / BIM coordination',qty:'3 FTE',project:'Hercules Solar + BESS',needby:'Apr 2026',code:'0100-0100-0000-0001',kind:'pending',status:'Awaiting pricing',suggest:'$26,000/mo (rate card)',docs:['Scope of work (PDF)','Rate card (PDF)']},
    {src:'adhoc',id:'fq7',yard:'Houston',ref:'REQ-4477',pillar:'services',item:'Site survey crew',qty:'2 FTE',project:'Cimarron Data Center',needby:'Jul 28',code:'0100-0100-0000-0001',kind:'service',status:'New'},
    {src:'dp',id:'fqS1',yard:'Chandler',ref:'REQ-S-2101',pillar:'services',item:'Owner\u2019s engineer / IE support',qty:'2 FTE',project:'Hercules Solar + BESS',needby:'ongoing',code:'0100-0100-0000-0001',kind:'service',status:'Acknowledged'},
    {src:'dp',id:'fqS2',yard:'Chandler',ref:'REQ-S-2108',pillar:'services',item:'BESS commissioning agent',qty:'2 FTE',project:'Hercules Solar + BESS',needby:'Nov 2026',code:'2600-3300-0000-0001',kind:'pending',status:'Awaiting pricing',suggest:'Quote \u2014 specialty commissioning',docs:['SOW draft (PDF)','Commissioning plan (PDF)']},
    {src:'adhoc',id:'fqS3',yard:'Corona',ref:'REQ-S-2114',pillar:'services',item:'Structural special inspection',qty:'2 FTE',project:'Riverside Medical Center',needby:'Aug 2026',code:'0100-0100-0000-0001',kind:'service',status:'New'},
    {src:'dp',id:'fqP1',yard:'Chandler',ref:'REQ-P-0501',pillar:'procurement',item:'MV switchgear \u00b7 15kV lineup',qty:2,project:'Hercules Solar + BESS',needby:'Nov 2026',code:'2600-0100-0000-0001',kind:'flow',status:'At-risk',actLabel:'Release PO',nextStatus:'PO issued',hint:'Order-by passed \u2014 release now to recover the substation date',docs:['Vendor quote (PDF)','Lead time confirmation (PDF)','Technical spec (PDF)']},
    {src:'dp',id:'fqP2',yard:'Chandler',ref:'REQ-P-0508',pillar:'procurement',item:'BESS containers \u00b7 2.5 MWh',qty:6,project:'Hercules Solar + BESS',needby:'Nov 2026',code:'2600-3300-0000-0001',kind:'flow',status:'At-risk',actLabel:'Release PO',nextStatus:'PO issued',hint:'Order-by passed \u2014 release to hold November energization',docs:['Vendor quote (PDF)','Delivery schedule (PDF)']},
    {src:'dp',id:'fqP3',yard:'Chandler',ref:'REQ-P-0512',pillar:'procurement',item:'Main power transformer',qty:1,project:'Hercules Solar + BESS',needby:'Dec 2026',code:'2600-0100-0000-0001',kind:'flow',status:'PO issued',doneNote:'28 wk lead \u00b7 on order',docs:['PO confirmation (PDF)','Technical datasheet (PDF)']},
    {src:'dp',id:'fqF1',yard:'Chandler',ref:'REQ-F-021',pillar:'prefab',item:'Prefab pipe rack modules',qty:12,project:'Hercules Solar + BESS',needby:'Aug 2026',code:'2600-0540-0000-0001',kind:'flow',status:'In fabrication',doneNote:'Pipe rack \u00b7 shop slot held',docs:['Shop drawings (PDF)','Material certification (PDF)','Fabrication schedule (PDF)']},
    {src:'dp',id:'fqF2',yard:'Chandler',ref:'REQ-F-034',pillar:'prefab',item:'Modular e-houses (BESS)',qty:2,project:'Hercules Solar + BESS',needby:'Oct 2026',code:'2600-0540-0000-0001',kind:'flow',status:'Submittal',actLabel:'Approve submittal',nextStatus:'In fabrication',hint:'Approve this week to protect November energization',docs:['Submittal package (PDF)','Engineer review notes (PDF)']},
    {src:'adhoc',id:'fqF3',yard:'Chandler',ref:'REQ-F-041',pillar:'prefab',item:'L2 headwall assemblies',qty:8,project:'Riverside Medical Center',needby:'Jul 2026',code:'2600-0540-0000-0001',kind:'flow',status:'Delivered',doneNote:'On site',docs:['Delivery receipt (PDF)','Inspection checklist (PDF)']},
    {src:'dp',id:'fq6',yard:'Chandler',ref:'REQ-4476',pillar:'prefab',item:'Prefab cable tray runs',qty:'lot',project:'Hercules Solar + BESS',needby:'Aug 1',code:'2600-0540-0000-0001',kind:'pending',status:'Awaiting pricing',suggest:'Quote \u2014 route to prefab shop'},
    {src:'dp',id:'fqRv1',yard:'Corona',ref:'REQ-S-2117',pillar:'services',item:'MEP commissioning lead',qty:'1 FTE',project:'Riverside Medical Center',needby:'Nov 2026',code:'0140-0100-0000-0001',kind:'pending',status:'Awaiting pricing',suggest:'Quote \u2014 specialty commissioning lead'},
    {src:'dp',id:'fqCm1',yard:'Chandler',ref:'REQ-F-051',pillar:'prefab',item:'Cable tray bracket assemblies',qty:'lot',project:'Cimarron Data Center',needby:'Oct 2026',code:'2600-0540-0000-0001',kind:'pending',status:'Awaiting pricing',suggest:'Quote \u2014 custom fabrication required'},
    {src:'dp',id:'fqPH1',yard:'Chandler',ref:'REQ-P-0531',pillar:'procurement',item:'Solar DC cabling',qty:'Lot',project:'Hercules Solar + BESS',needby:'Oct 2026',code:'2600-3300-0000-0001',kind:'flow',status:'At-risk',actLabel:'Release PO',nextStatus:'PO issued',hint:'Long lead — confirm spec with EPC, release immediately to protect energization'},
    {src:'dp',id:'fqPH2',yard:'Chandler',ref:'REQ-P-0537',pillar:'procurement',item:'Monitoring sensors',qty:'24 units',project:'Hercules Solar + BESS',needby:'Sep 2026',code:'2600-3300-0000-0001',kind:'flow',status:'At-risk',actLabel:'Release PO',nextStatus:'PO issued',hint:'SCADA integration — verify BOM with controls engineer'},
    {src:'dp',id:'fqPC1',yard:'Houston',ref:'REQ-P-0614',pillar:'procurement',item:'UPS bypass cable assembly',qty:'2 sets',project:'Cimarron Data Center',needby:'Dec 2026',code:'2600-0540-0000-0003',kind:'flow',status:'Requested',actLabel:'Place order',nextStatus:'Ordered',hint:'Specialty item — confirm spec with electrical engineer first'},
    {src:'dp',id:'fqPR1',yard:'Corona',ref:'REQ-P-0619',pillar:'procurement',item:'Structural bolt package',qty:'Lot',project:'Riverside Medical Center',needby:'Oct 2026',code:'0140-0100-0000-0001',kind:'flow',status:'Requested',actLabel:'Place order',nextStatus:'Ordered',hint:'Confirm structural spec before releasing'},
    {src:'dp',id:'fqRv2',yard:'Corona',ref:'REQ-P-0621',pillar:'procurement',item:'Surgical fixture hardware',qty:'lot',project:'Riverside Medical Center',needby:'Sep 2026',code:'0140-0100-0000-0001',kind:'flow',status:'Requested',actLabel:'Place order',nextStatus:'Ordered',hint:'Specialty item \u2014 confirm spec with MEP engineer first'}
  ];
  var fqCurId=null, fqPickOwned=0; var ccHighlight=null;
  var fqFP='all', fqFPr='all', fqFS='all', fqFSrc='all';
  var _dpCcProjMap={equipment:'hercules'}, _dpCcCap={}, _dpCcSrcF={}, _dpCcLimit={}, _capRiskLimit={};
  var _dpEquipView='table'; var _dpItemAttrs={}; var _dpRowAssets={};
  var _pfBU='all', _pfRegion='all';
  var _pfbP6Expanded={};
  var _pfbP6Overrides={};
  var _pfbDpTab='items';var _pfbInstFilter='all';
  function pfbSetTab(t){_pfbDpTab=t;renderCcDemand('prefab');}
  function pfbSetInstFilter(f){_pfbInstFilter=f;renderCcDemand('prefab');}
  function pfbCloseEditModal(){var m=document.getElementById('pfb-edit-modal');if(m)m.remove();}
  function pfbResetEditDates(idx){delete _pfbP6Overrides[idx];pfbCloseEditModal();renderCcDemand('prefab');}
  function pfbSaveEditDates(idx){var ov={};['demId','ordStart','ordEnd','matStart','matEnd','schedMfg','fs','fe','inspFacS','shipS','shipE','inspSiteS','p6'].forEach(function(k){var el=document.getElementById('pfb-ed-'+k);if(el&&el.value)ov[k]=el.value;});_pfbP6Overrides[idx]=ov;pfbCloseEditModal();renderCcDemand('prefab');}
  function pfbOpenEditDates(idx,enc){
    pfbCloseEditModal();
    var d=JSON.parse(decodeURIComponent(enc));
    var ov=_pfbP6Overrides[idx]||{};
    var fmt=function(s){if(!s)return '';return s;};
    var rows=[
      ['demId',null,'Demand ID','long lead',false],
      ['ordStart','ordEnd','Order & specs','1 wk',false],
      ['matStart','matEnd','Mat. procured','2 wks',false],
      ['schedMfg',null,'Sched. mfg','1 day',false],
      ['fs','fe','Manufacturing',d.mfgWks+' wks',false],
      ['inspFacS',null,'Insp. (facility)','1 day',false],
      ['shipS','shipE','Delivery',d.shipD+'d transit',false],
      ['inspSiteS',null,'Insp. (site)','1 day',false],
      ['p6',null,'INSTALL','P6 anchor',true]
    ];
    var h='<div id="pfb-edit-modal" style="position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:9999;display:flex;align-items:center;justify-content:center" onclick="if(event.target===this)pfbCloseEditModal()">';
    h+='<div style="background:#fff;border-radius:12px;padding:24px;width:500px;max-height:88vh;overflow-y:auto;box-shadow:0 20px 60px rgba(0,0,0,.3)">';
    h+='<div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:4px">';
    h+='<div><div style="font-size:15px;font-weight:700;color:var(--g900)">Edit schedule dates</div>';
    h+='<div style="font-size:11px;color:var(--g500);margin-top:2px">'+d.item+'</div></div>';
    h+='<button onclick="pfbCloseEditModal()" style="font-size:20px;color:var(--g400);background:none;border:none;cursor:pointer;line-height:1;padding:0 2px">×</button>';
    h+='</div>';
    h+='<div style="font-size:10.5px;color:var(--g500);background:var(--g50);border-radius:6px;padding:8px 10px;margin:10px 0 14px">Overrides auto-calculation. Changes apply to this session only.</div>';
    h+='<div style="font-size:10px;font-weight:600;color:var(--g400);text-transform:uppercase;letter-spacing:.05em;display:grid;grid-template-columns:140px 1fr 16px 1fr;gap:8px;padding:0 0 6px;border-bottom:1px solid var(--g200);margin-bottom:4px">';
    h+='<span>Activity</span><span>Start</span><span></span><span>End / date</span></div>';
    rows.forEach(function(r){
      var k1=r[0],k2=r[1],label=r[2],dur=r[3],isAnchor=r[4];
      var v1=ov[k1]||d[k1]||'';
      var borderCol=isAnchor?'#dc2626':'var(--g200)';
      var labelCol=isAnchor?'#dc2626':'var(--g800)';
      h+='<div style="display:grid;grid-template-columns:140px 1fr 16px 1fr;gap:8px;align-items:center;padding:7px 0;border-bottom:1px solid var(--g100)">';
      h+='<div><div style="font-size:11.5px;font-weight:'+(isAnchor?700:500)+';color:'+labelCol+'">'+label+'</div>';
      h+='<div style="font-size:9.5px;color:var(--g400)">'+dur+'</div></div>';
      h+='<input id="pfb-ed-'+k1+'" type="date" value="'+fmt(v1)+'" style="border:1px solid '+borderCol+';border-radius:6px;padding:5px 8px;font-size:11.5px;color:var(--g800);width:100%;box-sizing:border-box'+(isAnchor?';font-weight:600':'')+'">';
      if(k2){var v2=ov[k2]||d[k2]||'';h+='<span style="text-align:center;font-size:10px;color:var(--g300)">→</span>';h+='<input id="pfb-ed-'+k2+'" type="date" value="'+fmt(v2)+'" style="border:1px solid var(--g200);border-radius:6px;padding:5px 8px;font-size:11.5px;color:var(--g800);width:100%;box-sizing:border-box">';      }else{h+='<span></span><div style="color:var(--g400);font-size:11px;padding:5px 0">—</div>';}
      h+='</div>';
    });
    h+='<div style="display:flex;gap:8px;margin-top:18px;justify-content:flex-end;align-items:center">';
    if(_pfbP6Overrides[idx])h+='<button onclick="pfbResetEditDates('+idx+')" style="padding:7px 14px;border:1px solid var(--g200);border-radius:7px;font-size:12px;color:var(--g500);background:#fff;cursor:pointer">Reset to default</button>';
    h+='<button onclick="pfbCloseEditModal()" style="padding:7px 14px;border:1px solid var(--g200);border-radius:7px;font-size:12px;color:var(--g600);background:#fff;cursor:pointer">Cancel</button>';
    h+='<button onclick="pfbSaveEditDates('+idx+')" style="padding:7px 16px;border:none;border-radius:7px;font-size:12px;font-weight:600;color:#fff;background:#3b82f6;cursor:pointer">Save &amp; update Gantt</button>';
    h+='</div></div></div>';
    document.body.insertAdjacentHTML('beforeend',h);
  }
  function dpSetSrcFilter(pp,v){ _dpCcSrcF[pp]=v; _dpCcLimit[pp]=false; renderCcDemand(pp); }
  function dpToggleAllReqs(pp){ _dpCcLimit[pp]=true; renderCcDemand(pp); }
  function capRiskToggle(p){ _capRiskLimit[p]=!_capRiskLimit[p]; renderCcDemand(p); }
  function fqIsDone(r){ return FQ_DONE.indexOf(r.status)>=0; }
  function fqVisible(r){ if(fqFP!=='all'&&r.pillar!==fqFP)return false; if(fqFPr!=='all'&&r.project!==fqFPr)return false; if(fqFS==='open'&&fqIsDone(r))return false; if(fqFS==='done'&&!fqIsDone(r))return false; if(fqFSrc!=='all'&&r.src!==fqFSrc)return false; return true; }
  function fqSetFilter(k,v){ if(k==='p')fqFP=v; else if(k==='pr')fqFPr=v; else if(k==='s')fqFS=v; else if(k==='src')fqFSrc=v; _fqShowAll=false; renderFulfill(); }
  function fqClearFilters(){ fqFP='all'; fqFPr='all'; fqFS='all'; fqFSrc='all'; _fqShowAll=false; renderFulfill(); }
  function fqAdvance(id){ var r=fqById(id); if(!r)return; if(r.nextStatus)r.status=r.nextStatus; renderFulfill(); toast(r.item+' \u2014 '+r.status.toLowerCase()); }
  function fqById(id){ for(var i=0;i<FQ.length;i++){ if(FQ[i].id===id)return FQ[i]; } return null; }
  function fqCompute(r,owned){ var q=r.qty; var maxOwned=Math.min(r.avail.length,q); owned=Math.max(0,Math.min(owned,maxOwned)); var rerent=q-owned; var ar=q*r.o2sRate; var oc=owned*r.ownedCost; var rc=rerent*r.reRentRate; var margin=ar-oc-rc; var pct=ar?(margin/ar*100):0; return {owned:owned,rerent:rerent,maxOwned:maxOwned,ar:ar,oc:oc,rc:rc,margin:margin,pct:pct}; }
  function fqMarginPct(r){ return fqCompute(r,r.reco).pct.toFixed(0); }
  function renderFulfill(){
    var mount=gel('ccFulfill'); if(!mount)return; var ns=CURRENT==='ns';
    var isFSMFQ=ccPersona==='fsm'; var fsmFQScope=isFSMFQ&&_ccFSMProj!=='all'?(_ccFSMProj===''?CC_FSM_PROJECTS:[_ccFSMProj]):null;
    var FQ_scoped=fsmFQScope?FQ.filter(function(r){return fsmFQScope.indexOf(r.project)>=0;}):FQ;
    var hlRef=ccHighlight; ccHighlight=null;
    if(hlRef) _fqShowAll=true;
    var openN=0,awaitN=0,readyN=0; FQ_scoped.forEach(function(r){ if(!fqIsDone(r))openN++; if(r.status==='Awaiting pricing')awaitN++; if(r.kind==='equip'&&r.status==='New'&&r.avail&&r.avail.length>0)readyN++; });
    var fqQuotesScoped=fsmFQScope?CC_QUOTES.filter(function(q){return fsmFQScope.indexOf(q.project)>=0;}):CC_QUOTES;
    openN+=fqQuotesScoped.length;
    awaitN+=fqQuotesScoped.filter(function(q){return q.status==='Needs pricing'||q.status==='Quote in progress';}).length;
    var fqScopeLabel=isFSMFQ?(fsmFQScope&&fsmFQScope.length===1?fsmFQScope[0]:(fsmFQScope?'My projects \u00b7 3 assigned':'All projects \u00b7 portfolio')):'All projects \u00b7 portfolio';
    var h='<div class="phead"><div><h1>Fulfillment queue</h1><div class="meta"><span class="chip">'+svg(IC.cart)+fqScopeLabel+'</span><span class="chip ver">'+(ns?'North Star':'V1 \u2014 standard')+'</span></div></div></div>';
    var vit=[{k:'Open requests',v:''+openN,sub:'across the portfolio',tone:'ok',icon:IC.cart},{k:'Awaiting pricing',v:''+awaitN,sub:'need a price or quote',tone:awaitN>0?'warn':'ok',icon:IC.clock},{k:'Ready to allocate',v:''+readyN,sub:'equipment',tone:'ok',icon:IC.check},{k:'Est. margin on open',v:'22%',sub:'owned-first mix',tone:'ok',icon:IC.chart}];
    h+='<div class="vitals" style="grid-template-columns:repeat(4,1fr)">'; vit.forEach(function(x){ h+='<div class="vital '+x.tone+'"><div class="vk">'+svg(x.icon)+x.k+'</div><div class="vv">'+x.v+'</div><div class="vsub">'+x.sub+'</div></div>'; }); h+='</div>';
    if(ns){ h+='<div class="ins-strip"><span class="isi">'+CC_SPARK+'</span><div><div class="ist">02S</div><div class="isd">The optimizer can clear the '+readyN+' open equipment requests now \u2014 owned-first, then re-rent \u2014 at a blended ~22% margin. '+awaitN+' more need a price or quote, and the at-risk procurement lines should be released this week.</div></div></div>'; }
    var quotesNeedP=CC_QUOTES.filter(function(q){return q.status==='Needs pricing';}).length;
    h+='<div style="display:flex;align-items:center;gap:2px;padding:10px 0 4px">'
      +'<button class="ff-b'+(fqView==='orders'?' on':'')+'" onclick="fqSetView(\'orders\')">Orders</button>'
      +'<button class="ff-b'+(fqView==='quotes'?' on':'')+'" onclick="fqSetView(\'quotes\')">Quotes'+(quotesNeedP?' <span class="tag warn" style="font-size:10px;padding:1px 5px;margin-left:3px">'+quotesNeedP+'</span>':'')+'</button>'
      +'</div>';
    if(fqView==='quotes'){
      var qScope=fsmFQScope?CC_QUOTES.filter(function(q){return fsmFQScope.indexOf(q.project)>=0;}):CC_QUOTES;
      var qt='1fr 168px 90px 130px 170px';
      h+='<div class="eq-cap">'+svg('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>')+'<span>'+qScope.length+' portal RFQs received — submitted via the customer portal Request for Quote flow. Set a price to convert to a fulfillment order.</span></div>';
      h+='<div class="dp-tbl"><div class="dp-head" style="grid-template-columns:'+qt+'"><span>Request</span><span>Project</span><span>Need-by</span><span>Status</span><span>Action</span></div>';
      if(!qScope.length){ h+='<div class="fq-empty">No quotes in scope.</div>'; }
      qScope.forEach(function(q){
        var isPriced=q.status==='Priced'; var isIP=q.status==='Quote in progress';
        var tone=isPriced?'ok':isIP?'info':'warn';
        h+='<div class="dp-row" style="grid-template-columns:'+qt+'"><div>'+q.item+'<div class="sub">'+q.ref+' · '+q.note+'</div></div>'
          +'<div>'+q.project+'<div class="sub">by '+q.submittedBy+' · '+q.requestDate+'</div></div>'
          +'<div>'+q.needby+'</div>'
          +'<div><span class="tag '+tone+'">'+q.status+'</span></div>'
          +'<div>'+(isPriced?'<div class="fq-done">Priced · '+q.pricedAt+'</div>':'<button class="btn '+(isIP?'btn-dark':'btn-red')+' btn-sm" onclick="ccSetQuotePrice(\''+q.id+'\')">Set price</button>')+'</div></div>';
      });
      h+='</div>';
      mount.innerHTML=h; return;
    }
    var _dpOverview=[
      {p:'equipment',label:'Equipment',icon:'box',cc:'dpequip'},
      {p:'logistics',label:'Logistics',icon:'truck',cc:'dplog'},
      {p:'profservices',label:'Prof. Services',icon:'user',cc:'dpsvc'},
      {p:'procurement',label:'Procurement',icon:'pkg',cc:'dpproc'},
      {p:'prefab',label:'Pre-fab',icon:'home',cc:'dpprefab'}
    ];
    var _fmtKs=function(n){return n>=1000000?('$'+(n/1000000).toFixed(1)+'M'):('$'+(n/1000).toFixed(0)+'K');};
    h+='<div style="background:var(--g50);border:1px solid var(--g100);border-radius:8px;padding:13px 16px;margin-bottom:14px">';
    h+='<div style="font-size:11px;font-weight:700;color:var(--g500);text-transform:uppercase;letter-spacing:.04em;margin-bottom:10px">Demand plans — portfolio overview</div>';
    var _dpoFKey=fqFP==='services'?'profservices':fqFP;
    var _dpoF=fqFP==='all'?_dpOverview:_dpOverview.filter(function(d){return d.p===_dpoFKey;});
    h+='<div style="display:grid;grid-template-columns:repeat('+_dpoF.length+',1fr);gap:10px">';
    _dpoF.forEach(function(d){
      var pd_all=CC_PROJ_DP[d.p]||{}; var totalBudget=0,totalDp=0,totalAh=0;
      ['hercules','riverside','cimarron'].forEach(function(proj){ var pd=pd_all[proj]||{}; totalBudget+=(pd.budget||0); totalDp+=(pd.dpSpent||0); totalAh+=(pd.adHoc||0); });
      var pAh=totalBudget?Math.round(100*totalAh/(totalDp+totalAh||1)):0;
      h+='<div style="background:#fff;border:1px solid var(--g200);border-radius:6px;padding:10px;cursor:pointer" onclick="ccGo(\''+d.cc+'\')">';
      h+='<div style="font-size:11px;font-weight:600;color:var(--g900);margin-bottom:6px">'+d.label+'</div>';
      h+='<div style="font-size:12px;font-weight:700;color:var(--charcoal);margin-bottom:4px">'+_fmtKs(totalBudget)+'</div>';
        h+='<div style="font-size:10.5px;color:'+(pAh>10?'#f59e0b':'var(--g500)')+'">'+pAh+'% ad hoc vs. baseline</div>';
        h+='<div style="margin-top:6px;height:4px;border-radius:2px;overflow:hidden;background:var(--g200)">';
      var dpPct=totalBudget?Math.min(100,Math.round(100*totalDp/totalBudget)):0; var ahPct=Math.min(100-dpPct,Math.round(100*totalAh/totalBudget));
        h+='<div style="display:flex;height:100%"><div style="width:'+dpPct+'%;background:var(--charcoal)"></div><div style="width:'+ahPct+'%;background:#f59e0b"></div></div>';
        h+='</div></div>';
    });
    h+='</div></div>';
    h+='<div class="eq-cap">'+svg('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>')+'<span>'+openN+' open requests in the queue across all five pillars. Pricing is set from the 02S catalog / rate card; equipment is allocated owned-first, then re-rent. Filter by pillar, project, or status below.</span></div>';
    var PILLARS=[['equipment','Equipment'],['logistics','Logistics'],['services','Prof services'],['procurement','Procurement'],['prefab','Pre-fab']];
    var ALL_PROJ_OPTS=[['Hercules Solar + BESS','Hercules'],['Riverside Medical Center','Riverside'],['Cimarron Data Center','Cimarron']];
    var FSM_PROJ_OPTS=CC_FSM_PROJECTS.map(function(pr){return [pr,pr.indexOf('Hercules')>=0?'Hercules':pr.indexOf('Cimarron')>=0?'Cimarron DC':'Riverside'];});
    var PROJECTS=[['all','All']].concat(fsmFQScope?FSM_PROJ_OPTS:ALL_PROJ_OPTS);
    var STATS=[['all','All'],['open','Open'],['done','Resolved']];
    h+='<div class="fq-filters">';
    h+='<div class="ff-grp"><span class="ff-lbl">Pillar</span><div class="ff-seg">'; var _fqPillarOn=(_fqPPillar&&fqFP==='all')?_fqPPillar:fqFP; h+='<button class="ff-b'+(fqFP==='all'&&!_fqPPillar?' on':'')+' on-all" onclick="fqClearFilters()">All</button>'; PILLARS.forEach(function(o){ h+='<button class="ff-b'+(_fqPillarOn===o[0]?' on':'')+'" onclick="fqSetFilter(\'p\',\''+o[0]+'\')">'+o[1]+'</button>'; }); h+='</div></div>';    h+='<div class="ff-grp"><span class="ff-lbl">Project</span><div class="ff-seg">'; var _epf=(fsmFQScope&&fsmFQScope.length===1)?fsmFQScope[0]:fqFPr; PROJECTS.forEach(function(o){ h+='<button class="ff-b'+(_epf===o[0]?' on':'')+'" onclick="fqSetFilter(\'pr\',\''+o[0]+'\')">'+o[1]+'</button>'; }); h+='</div></div>';
    h+='<div class="ff-grp"><span class="ff-lbl">Status</span><div class="ff-seg">'; STATS.forEach(function(o){ h+='<button class="ff-b'+(fqFS===o[0]?' on':'')+'" onclick="fqSetFilter(\'s\',\''+o[0]+'\')">'+o[1]+'</button>'; }); h+='</div></div>';
    h+='<div class="ff-grp"><span class="ff-lbl">Source</span><div class="ff-seg">';
    [['all','All'],['dp','Demand plan'],['adhoc','Ad hoc']].forEach(function(o){ h+='<button class="ff-b'+(fqFSrc===o[0]?' on':'')+'" onclick="fqSetFilter(\'src\',\''+o[0]+'\')">'+o[1]+'</button>'; });
    h+='</div></div>';
    h+='</div>';
    var rows=FQ_scoped.filter(fqVisible);
    var _fqPPillar=_PERSONA_PILLAR[ccPersona];
    var anyF=(fqFP!=='all'||fqFPr!=='all'||fqFS!=='all'||fqFSrc!=='all');
    h+='<div class="eq-toolbar" style="margin-bottom:10px"><span style="font-size:12px;color:var(--g600)">Showing <b style="color:var(--g900)">'+rows.length+'</b> of '+FQ_scoped.length+' requests</span>'+(anyF?'<span class="spacer"></span><button class="btn btn-ghost btn-sm" onclick="fqClearFilters()">Clear filters</button>':'')+'</div>';
    if(!rows.length){ h+='<div class="dp-tbl"><div class="fq-empty">No requests match these filters. <span onclick="fqClearFilters()" style="color:var(--red);cursor:pointer;font-weight:600">Clear filters</span></div></div>'; mount.innerHTML=h; return; }
    var gt='1fr 168px 92px 128px 72px 300px';
    h+='<div class="dp-tbl"><div class="dp-head" style="grid-template-columns:'+gt+'"><span>Request</span><span>Project</span><span>Need-by</span><span>Status</span><span>Docs</span><span>Fulfillment</span></div>';
    var _fq_pri={'At-risk':0,'Pending pricing':1,'Requested':2,'Returned':2,'PO issued':3,'Approved':3,'In transit':4,'Acknowledged':5,'Allocated':6};
    rows=rows.slice().sort(function(a,b){var _pp=_PERSONA_PILLAR[ccPersona];if(_pp&&fqFP==='all'){var ao=a.pillar===_pp?0:1,bo=b.pillar===_pp?0:1;if(ao!==bo)return ao-bo;}var ap=(_fq_pri[a.status]!=null?_fq_pri[a.status]:3),bp=(_fq_pri[b.status]!=null?_fq_pri[b.status]:3);return ap-bp;});
    var FQ_LIMIT=7;
    var fqMoreN=rows.length-FQ_LIMIT;
    var visRows=_fqShowAll?rows:rows.slice(0,FQ_LIMIT);
    visRows.forEach(function(r){
      var _pPillar=_PERSONA_PILLAR[ccPersona];
      var _notOwn=!!(_pPillar&&r.pillar!==_pPillar);
      var qty=(typeof r.qty==='number')?(r.qty+' units'):r.qty;
      var srcTag=r.src==='dp'?'<span style="display:inline-block;font-size:9.5px;padding:0 5px;border-radius:3px;background:rgba(59,130,246,.1);color:var(--blue,#3b82f6);font-weight:600;margin-left:5px;vertical-align:middle">Demand plan</span>':'<span style="display:inline-block;font-size:9.5px;padding:0 5px;border-radius:3px;background:rgba(217,119,6,.1);color:#b45309;font-weight:600;margin-left:5px;vertical-align:middle">Ad hoc</span>';
      h+='<div class="dp-row'+(_notOwn?' fq-dim':r.ref===hlRef?' fq-hl':'')+'" id="fqrow-'+r.ref+'" style="grid-template-columns:'+gt+(_notOwn?';opacity:.32;pointer-events:none;user-select:none':'')+'"><div>'+r.item+srcTag+(r.taxMapped===false?'<span style="display:inline-block;font-size:9.5px;padding:0 5px;border-radius:3px;background:rgba(245,158,11,.14);color:#b45309;font-weight:600;margin-left:5px;vertical-align:middle">\u26a1 Needs confirm</span>':'')+'<div class="sub">'+qty+' \u00b7 '+r.ref+' \u00b7 '+r.code+'</div>'+fqYardSelect(r)+(_fqNotes[r.id]?'<div class="sub" style="color:#b45309;margin-top:2px">⚠ '+_fqNotes[r.id]+'</div>':'')+'</div><div>'+r.project+'</div><div>'+r.needby+'</div><div style="display:flex;align-items:center;gap:5px"><span class="tag '+(FQ_TONE[r.status]||'neu')+'">'+r.status+'</span><button style="background:none;border:none;cursor:pointer;padding:1px 3px;color:var(--g400);font-size:11px;line-height:1;border-radius:3px" onclick="fqEditModal(\''+r.id+'\')">&#9998;</button></div><div>'+fqDocCell(r)+'</div><div>'+(_notOwn?'<span style="font-size:11px;color:var(--g300)">View only</span>':fqCell(r,ns))+'</div></div>';
    });
    h+='<div class="show-more-wrap">'+((!_fqShowAll&&fqMoreN>0)?'<button class="show-more-btn" onclick="_fqShowAll=true;renderFulfill()">Show '+fqMoreN+' more requests ↓</button>':'')+'</div>';
    h+='</div>';
    if(ns){
      var _oids=Object.keys(ORDER_TASKS);
      var _o2sNeed=_oids.filter(function(id){var s=orderTaskSummary(id);return s&&s.o2sBlocking>0;});
      var _gcNeed=_oids.filter(function(id){var s=orderTaskSummary(id);return s&&s.gcActionable>0;});
      if(_o2sNeed.length||_gcNeed.length){
        h+='<div class="cc-queue" style="margin-top:20px">';
        h+='<div class="cc-qhead">';
        h+=svg('<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>');
        h+='<span style="font-weight:600">Workflow task tracker</span>';
        var _totalAct=_o2sNeed.length+_gcNeed.length;
        h+=' <span style="color:var(--g400);font-weight:400">· '+_totalAct+' order'+(_totalAct===1?'':'s')+' need attention</span>';
        h+='<div style="display:flex;gap:5px;margin-left:auto;flex-wrap:wrap">';
        [['all','All'],['02s','02S needed'],['sub-pending','Sub· pending'],['sub-overdue','Sub· overdue']].forEach(function(fv){
          var act=_ccTaskFilter===fv[0];
          h+='<button onclick="ccSetTaskFilter(\''+fv[0]+'\')" style="font-size:10px;padding:2px 9px;border-radius:4px;border:1px solid '+(act?'var(--red)':'var(--g200)')+';background:'+(act?'var(--red)':'#fff')+';color:'+(act?'#fff':'var(--g700)')+';cursor:pointer">'+fv[1]+'</button>';
        });
        h+='</div></div>';
        var _combined=_o2sNeed.slice();
        _gcNeed.forEach(function(id){if(_combined.indexOf(id)<0)_combined.push(id);});
        if(_ccTaskFilter==='02s') _combined=_combined.filter(function(id){var s=orderTaskSummary(id);return s&&s.o2sBlocking>0;});
        else if(_ccTaskFilter==='sub-pending') _combined=_combined.filter(function(id){var s=orderTaskSummary(id);return s&&s.gcActionable>0&&!s.gcOverdue;});
        else if(_ccTaskFilter==='sub-overdue') _combined=_combined.filter(function(id){var s=orderTaskSummary(id);return s&&s.gcOverdue>0;});
        _combined.forEach(function(oid){
          var s=orderTaskSummary(oid); var _or=ORDERS.filter(function(o){return o.id===oid;})[0];
          var isO2s=s.o2sBlocking>0; var isOver=s.gcOverdue>0;
          var subPend=ORDER_TASKS[oid].tasks.filter(function(t){
            return !t.done&&t.side==='gc'&&t.blocking&&(!t.blockedBy||(ORDER_TASKS[oid].tasks.filter(function(b){return b.id===t.blockedBy;})[0]||{}).done);
          });
          h+='<div class="cc-act">';
          h+='<div class="cc-ab"><div class="cc-at">'+oid+(_or?' · '+_or.item:'')+' <button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();toggleCCTaskPanel(\''+oid+'\')" style="font-size:10px;padding:1px 7px;margin-left:6px">Tasks ⇳</button></div>';
          if(isO2s){var _o2sTasks=ORDER_TASKS[oid].tasks.filter(function(t){return !t.done&&t.side==='02s'&&t.blocking;});h+='<div class="cc-as" style="color:var(--amber)">02S needed: '+_o2sTasks.map(function(t){return t.label+(t.due?' ('+t.due+')':'');}).join(' · ')+'</div>';}
          else if(subPend.length){h+='<div class="cc-as">Subcontractor: '+subPend.map(function(t){return t.label+(t.due?' ('+t.due+')':'');}).join(' · ')+'</div>';}
          h+='</div>';
          h+='<span class="tag '+(isOver?'bad':isO2s?'warn':'info')+'">'+( isOver?'Sub· overdue':isO2s?'02S needed':'Sub· pending')+'</span>';
          h+='</div>';
          h+=renderCCTaskPanel(oid);
        });
        h+='</div>';
      }
    }
    var _tl=FQ.filter(function(r){return r.tasked;});
    if(_tl.length){
      h+='<div class="cc-queue" style="margin-top:24px">';
      h+='<div class="cc-qhead">\u2713 Task list \u2014 pending actions in source systems</div>';
      _tl.forEach(function(r){
        h+='<div class="cc-act">';
        h+='<div class="cc-ab"><div class="cc-at">'+r.item+'</div>';
        h+='<div class="cc-as">'+r.ref+' \u00b7 '+r.actLabel+' \u00b7 complete in source system</div></div>';
        h+='<span class="tag info">Tasked</span>';
        h+='<button class="btn btn-ghost btn-sm" onclick="fqUntask(\''+r.id+'\')" style="margin-left:8px">Dismiss</button>';
        h+='</div>';
      });
      h+='</div>';
    }
    mount.innerHTML=h;
    if(hlRef){ setTimeout(function(){ var el=gel('fqrow-'+hlRef); if(el&&el.scrollIntoView){ el.scrollIntoView({behavior:'smooth',block:'center'}); } }, 300); }
  }
  function fqDocCell(r){
    var docs=r.docs||[];
    if(!docs.length) return '<button class="btn btn-ghost btn-sm" style="font-size:10.5px;padding:2px 7px;color:var(--g400)" onclick="event.stopPropagation();fqDocsModal(\''+r.ref+'\')">+ Add</button>';
    return '<button class="btn btn-ghost btn-sm" style="font-size:10.5px;padding:2px 6px;white-space:nowrap" onclick="event.stopPropagation();fqDocsModal(\''+r.ref+'\')">'+'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:11px;height:11px;flex-shrink:0;vertical-align:middle;margin-right:3px"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg> '+docs.length+(docs.length===1?' doc':' docs')+'</button>';
  }
  function fqDocsModal(ref){
    var r=FQ.find(function(x){return x.ref===ref;}); if(!r)return;
    var docs=r.docs||[];
    var b='<div style="margin-bottom:14px;font-size:12px;color:var(--g600);padding-bottom:10px;border-bottom:1px solid var(--g100)">'+r.item+' \u00b7 '+ref+'</div>';
    if(docs.length){
      b+='<div style="display:flex;flex-direction:column;gap:6px;margin-bottom:12px">';
      docs.forEach(function(d){
        b+='<div style="display:flex;align-items:center;gap:10px;padding:9px 12px;background:var(--g50);border:1px solid var(--g200);border-radius:6px">';
        b+='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:16px;height:16px;flex-shrink:0;color:var(--info)"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>';
        b+='<span style="flex:1;font-size:12.5px;color:var(--g800)">'+d+'</span>';
        b+='<button class="btn btn-ghost btn-sm" style="font-size:10.5px" onclick="toast(\'Opening document (demo)\')">View</button>';
        b+='</div>';
      });
      b+='</div>';
    } else {
      b+='<div style="padding:20px 0;text-align:center;color:var(--g400);font-size:12px">No documents attached yet.</div>';
    }
    b+='<div style="border-top:1px solid var(--g100);padding-top:12px;margin-top:4px">';
    b+='<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">';
    b+='<div style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:var(--g500)">Upload document</div>';
    b+='<button class="btn btn-ghost btn-sm" style="font-size:10.5px" onclick="event.stopPropagation();var up=this.parentElement.nextElementSibling;up.style.display=up.style.display===\'none\'?\'block\':\'none\';if(up.style.display===\'block\')up.scrollIntoView({block:\'nearest\',behavior:\'smooth\'})">+ Upload</button>';
    b+='</div>';
    b+='<div id="fq-up-panel" style="display:none;background:var(--g50);border:1px solid var(--g200);border-radius:6px;padding:10px 12px;margin-bottom:10px">';
    b+='<div style="font-size:10.5px;color:var(--g500);margin-bottom:6px;font-weight:600">Tag document type</div>';
    b+='<div style="display:flex;gap:8px;align-items:center">';
    b+='<select style="flex:1;border:1px solid var(--g200);border-radius:4px;padding:5px 8px;font-size:12px;font-family:inherit;color:var(--g700);background:#fff"><option value="">Select type…</option><option>RFIs</option><option>Submittals</option><option>Engineering</option><option>Safety</option><option>Quality</option><option>Quotes / Bills of Lading</option><option>Shipping / Logistics</option><option>Crew Design</option><option>Change Orders</option><option>Turnover — COPI</option><option>Turnover — COPO</option></select>';
    b+='<button class="btn btn-dark btn-sm" onclick="event.stopPropagation();var c=this.parentElement.nextElementSibling;c.style.display=\'block\';toast(\'Document uploaded (demo)\')">Upload</button>';
    b+='<button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();this.parentElement.parentElement.style.display=\'none\'">Cancel</button>';
    b+='</div>';
    b+='<div class="dp-up-confirm" style="display:none;margin-top:8px;background:rgba(16,185,129,.08);border:1px solid rgba(16,185,129,.25);border-radius:4px;padding:6px 10px;font-size:11.5px;color:#065f46">&#10003; Document uploaded successfully — it will appear in the list once reviewed.</div>';
    b+='</div>';
    b+='</div>';
    b+='<div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal()">Close</button></div>';
    openModal('Documents \u00b7 '+ref, b);
  }

  function fqCell(r,ns){
    if(r.status==='Allocated'&&r.alloc){ return '<div class="fq-done">'+r.alloc.owned+' owned \u00b7 '+r.alloc.rerent+' re-rent<div class="sub">'+fmt(r.alloc.margin)+'/mo \u00b7 '+r.alloc.pct.toFixed(0)+'% margin</div></div>'; }
    if(r.status==='Acknowledged'){ return '<div class="fq-done">'+(r.priced?('Priced '+r.priced):'Acknowledged')+'</div>'; }
    if(r.kind==='flow'){ if(fqIsDone(r)) return '<div class="fq-done">'+r.status+(r.doneNote?('<div class="sub">'+r.doneNote+'</div>'):'')+'</div>'; if(!ns){ if(r.tasked) return '<div class="fq-done"><span style="color:var(--success)">✓</span> On task list<div class="sub">'+r.actLabel+' · action in source system</div></div>'; return '<div class="fq-reco-badge" style="margin-bottom:4px">Recommended: '+r.actLabel+'</div><button class="btn btn-ghost btn-sm" onclick="fqTask(\''+r.id+'\')">Add to list</button>'; } return (r.hint?'<div class="fq-hint">'+CC_SPARK+r.hint+'</div>':'')+'<button class="btn btn-red btn-sm" onclick="fqAdvance(\''+r.id+'\')">'+r.actLabel+'</button>'; }
    if(r.kind==='pending'){ return (ns&&r.suggest?'<div class="fq-hint">'+CC_SPARK+r.suggest+'</div>':'')+'<button class="btn '+(ns?'btn-red':'btn-dark')+' btn-sm" onclick="fqPriceModal(\''+r.id+'\')">'+(ns?'Price':'Set price')+'</button>'; }
    if(r.kind==='service'){ return '<button class="btn btn-dark btn-sm" onclick="fqAck(\''+r.id+'\')">Acknowledge</button>'; }
    if(r.taxMapped===false){ return '<div class="fq-hint"><svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13" style="vertical-align:middle;margin-right:3px"><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/></svg>Confirm taxonomy to release for allocation</div><button class="btn btn-dark btn-sm" onclick="fqTaxModal(\''+r.id+'\')">⚡ Confirm taxonomy</button>'; }
    if(ns){ return '<div class="fq-hint">'+CC_SPARK+r.reco+' owned + '+(r.qty-r.reco)+' re-rent \u00b7 ~'+fqMarginPct(r)+'% margin</div><button class="btn btn-red btn-sm" onclick="fqOptModal(\''+r.id+'\')">Review &amp; accept</button>'; }
    return '<button class="btn btn-dark btn-sm" onclick="fqOptModal(\''+r.id+'\')">Allocate</button>';
  }

  function fqTaxModal(id){ var r=fqById(id); if(!r)return; dpReview('equipment',r.ref); }
    function fqApproveReco(){
    var r=fqById(fqCurId); if(!r)return;
    fqPickOwned=r.reco;
    var c=fqCompute(r,fqPickOwned);
    var _yr=r.avail&&r.avail.length>0?r.avail[0].yard:(r.yard||'Chandler');
    r.status='Allocated'; r.alloc={owned:c.owned,rerent:c.rerent,margin:c.margin,pct:c.pct}; r.yard=_yr;
    closeModal(); renderFulfill();
    toast(r.qty+'× '+r.item+' allocated — '+c.owned+' owned, '+c.rerent+' re-rent · '+fmt(c.margin)+'/mo margin');
  }
  function fqShowOverride(){
    var el=gel('fqOverrideSec'); if(el)el.style.display='block';
    var el2=gel('fqRecoBtns'); if(el2)el2.style.display='none';
    fqRefresh();
  }
  function fqHideOverride(){
    var el=gel('fqOverrideSec'); if(el)el.style.display='none';
    var el2=gel('fqRecoBtns'); if(el2)el2.style.display='flex';
  }
  function fqOptModal(id){
    var r=fqById(id); if(!r)return; fqCurId=id;
    fqPickOwned=Math.min(r.reco,Math.min(r.avail.length,r.qty));
    var maxOwned=Math.min(r.avail.length,r.qty);
    var cReco=fqCompute(r,r.reco), cAll=fqCompute(r,maxOwned), cNone=fqCompute(r,0);
    var ownCheaper=r.ownedCost<r.reRentRate;
    var savPct=r.reRentRate>0?Math.round(Math.abs(r.reRentRate-r.ownedCost)/r.reRentRate*100):0;
    var whyTxt;
    if(maxOwned===0){
      whyTxt='No owned units — re-renting from '+r.vendor+' at '+fmt(r.reRentRate)+'/mo.';
    } else if(maxOwned>=r.qty){
      whyTxt=r.qty+' owned available · '+fmt(r.ownedCost)+'/mo owned vs '+fmt(r.reRentRate)+'/mo re-rent'+(ownCheaper?' · '+savPct+'% cheaper to own':' · re-rent '+savPct+'% cheaper')+'. Using full fleet.';
    } else {
      whyTxt=maxOwned+' owned available · '+fmt(r.ownedCost)+'/mo owned vs '+fmt(r.reRentRate)+'/mo re-rent ('+r.vendor+')'+(ownCheaper?' · own '+savPct+'% cheaper, maximize fleet use':' · re-rent '+savPct+'% cheaper, but avoids AP outlay')+'.';
    }
    // Request header
    var b='<div class="fq-req"><div class="fq-req-t">'+r.qty+'× '+r.item+'</div><div class="sub">'+r.project+' · need by '+r.needby+' · billed at '+fmt(r.o2sRate)+'/unit/mo</div></div>';
    // GREEN recommendation box
    b+='<div style="background:#fafafa;border:1px solid var(--g200);border-left:3px solid #6ee7b7;border-radius:8px;padding:14px 16px;margin-bottom:14px">';
    b+='<div style="font-size:10.5px;font-weight:700;letter-spacing:.07em;color:var(--g500);text-transform:uppercase;margin-bottom:6px">Recommendation</div>';
    b+='<div style="font-size:20px;font-weight:800;color:var(--charcoal);margin-bottom:4px">'+r.reco+' owned + '+(r.qty-r.reco)+' re-rent</div>';
    b+='<div style="font-size:12px;color:var(--g600);margin-bottom:12px">'+whyTxt+'</div>';
    // 3-scenario comparison (compact)
    b+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px">';
    [{label:'All owned ('+maxOwned+')',c:cAll,hi:false},{label:'Recommended mix',c:cReco,hi:true},{label:'All sourced',c:cNone,hi:false}].forEach(function(s){
      b+='<div style="background:'+(s.hi?'#f3f4f6':'#fff')+';border:1px solid '+(s.hi?'var(--g400)':'var(--g200)')+';border-radius:5px;padding:6px 8px;text-align:center">';
      b+='<div style="font-size:9.5px;color:'+(s.hi?'var(--charcoal)':'var(--g400)')+';font-weight:600;margin-bottom:2px">'+s.label+'</div>';
      b+='<div style="font-size:15px;font-weight:800;color:'+(s.hi?'var(--charcoal)':s.c.pct<8?'#dc2626':'#374151')+'">'+s.c.pct.toFixed(1)+'%</div>';
      b+='<div style="font-size:10px;color:#6b7280">'+fmt(s.c.margin)+'/mo</div></div>';
    });
    b+='</div></div>';
    // Reco action buttons
    b+='<div class="modal-foot" id="fqRecoBtns" style="display:flex">';
    b+='<button class="btn btn-ghost" onclick="closeModal()">Cancel</button>';
    b+='<div style="margin-left:auto;display:flex;gap:8px">';
    b+='<button class="btn btn-ghost" onclick="fqShowOverride()">Override recommendation</button>';
    b+='<button class="btn" style="background:#059669;color:#fff;border-color:#059669" onclick="fqApproveReco()">Approve recommendation</button>';
    b+='</div></div>';
    // Override section (hidden)
    b+='<div id="fqOverrideSec" style="display:none">';
    b+='<div style="font-size:11px;font-weight:600;color:#92400e;background:#fffbeb;border:1px solid #fde68a;border-radius:5px;padding:7px 10px;margin-bottom:12px">You are overriding the recommended allocation — adjust the split below and provide a reason.</div>';
    b+='<div class="fq-split"><div class="fq-srow"><div><div class="fq-slbl">From owned fleet</div><div class="fq-savail" id="fqAvail"></div></div><div class="fq-step"><button class="fq-sb" type="button" id="fqStepDown" onclick="fqStep(-1)">‹</button><span id="fqOwnedN">0</span><button class="fq-sb" type="button" id="fqStepUp" onclick="fqStep(1)">›</button></div></div><div class="fq-srow"><div><div class="fq-slbl">Re-rent the remainder</div><div class="fq-savail" id="fqRerentLine"></div></div><div class="fq-rn" id="fqRerentN">0</div></div></div>';
    b+='<div class="fq-calc"><div class="fq-crow"><span>Revenue to project (AR)</span><span id="fqAR"></span></div><div class="fq-crow neg"><span>Owned fleet cost</span><span id="fqOC"></span></div><div class="fq-crow neg"><span>Re-rent cost (AP)</span><span id="fqRC"></span></div><div class="fq-margin"><span>02S margin</span><span id="fqMargin"></span></div></div>';
    // Source yard (inside override section)
    b+='<div style="display:flex;align-items:center;gap:10px;padding:10px 0 4px;margin-top:4px;border-top:1px solid var(--g100)">';
    b+='<div style="font-size:12px;font-weight:600;color:var(--g700);flex-shrink:0">Source yard</div>';
    var _yreco=r.avail&&r.avail.length>0?r.avail[0].yard:(r.yard||'Chandler');
    b+='<select id="fqYardSel" style="font-size:12px;border:1px solid var(--g200);border-radius:5px;padding:4px 8px;color:var(--g700);cursor:pointer">'+SC_LIST.map(function(s){return'<option value="'+s+'"'+((r.yard||_yreco)===s?' selected':'')+'>'+s+'</option>';}).join('')+'</select>';
    b+='</div>';
    b+='<div style="margin-top:10px"><div style="font-size:11px;font-weight:700;color:var(--g700);margin-bottom:5px">Reason for override <span style="font-weight:400;color:var(--g400)">(required — saved with allocation)</span></div>';
    b+='<textarea id="fqOverrideReason" rows="2" style="width:100%;box-sizing:border-box;font-size:12px;border:1px solid #fde68a;border-radius:4px;padding:6px 8px;color:var(--g800);background:#fffbeb;resize:vertical" placeholder="Why are you changing the recommended allocation? e.g., unit reserved for another project, equipment condition, yard distance, customer request…"></textarea></div>';
    b+='<div class="modal-foot" style="margin-top:8px">';
    b+='<button class="btn btn-ghost" onclick="fqHideOverride()">Back to recommendation</button>';
    b+='<button class="btn btn-red" style="margin-left:auto" onclick="fqAccept()">Accept allocation</button>';
    b+='</div>';
    b+='</div>';
    openModal('Fulfill — '+r.item, b);
  }
  function fqRefresh(){
    var r=fqById(fqCurId); if(!r)return; var c=fqCompute(r,fqPickOwned); fqPickOwned=c.owned;
    if(gel('fqOwnedN'))gel('fqOwnedN').textContent=c.owned;
    if(gel('fqRerentN'))gel('fqRerentN').textContent=c.rerent;
    var used=r.avail.slice(0,c.owned);
    var usedTxt = used.length ? (used.slice(0,4).map(function(u){return u.id+'· '+u.yard;}).join('<br>')+(used.length>4?'<br>+'+(used.length-4)+' more':'')) : (r.avail.length?(r.avail.length+' units available (none selected)'):'No owned units available for this class');
    if(gel('fqAvail'))gel('fqAvail').innerHTML=usedTxt;
    if(gel('fqRerentLine'))gel('fqRerentLine').innerHTML=c.rerent>0?(r.vendor+' @ '+fmt(r.reRentRate)+'/mo (MSA)'):'\u2014';
    if(gel('fqAR'))gel('fqAR').textContent=fmt(c.ar)+'/mo';
    if(gel('fqOC'))gel('fqOC').textContent='\u2212'+fmt(c.oc)+'/mo';
    if(gel('fqRC'))gel('fqRC').textContent='\u2212'+fmt(c.rc)+'/mo';
    if(gel('fqMargin'))gel('fqMargin').innerHTML=fmt(c.margin)+'/mo<span class="fq-pct">'+c.pct.toFixed(1)+'%</span>';
    var maxO=Math.min(r.avail.length,r.qty);
    if(gel('fqStepDown'))gel('fqStepDown').disabled=(fqPickOwned<=0);
    if(gel('fqStepUp'))gel('fqStepUp').disabled=(fqPickOwned>=maxO);
  }
  function fqStep(d){ fqPickOwned+=d; fqRefresh(); }
  function fqAccept(){ var r=fqById(fqCurId); if(!r)return; var c=fqCompute(r,fqPickOwned); r.status='Allocated'; r.alloc={owned:c.owned,rerent:c.rerent,margin:c.margin,pct:c.pct}; if(fqPickOwned!==r.reco){r.allocOverride=true;var _or=gel('fqOverrideReason');r.allocOverrideReason=_or?_or.value:'';} var _ys=gel('fqYardSel'); if(_ys)r.yard=_ys.value; closeModal(); renderFulfill(); toast(r.qty+'\u00d7 '+r.item+' allocated \u2014 '+c.owned+' owned, '+c.rerent+' re-rent'+(r.allocOverride?' (override)':'')+' \u00b7 '+fmt(c.margin)+'/mo margin'); }
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
  var MY_CC_TASKS=[
    {id:'mct-001',label:'Release PO — BESS containers (2.5 MWh)',ref:'REQ-P-0508',project:'Hercules Solar + BESS',pillar:'procurement',due:'Aug 5',priority:'high',source:'fq',done:false,closeNote:''},
    {id:'mct-002',label:'Release PO — MV switchgear 15kV lineup',ref:'REQ-P-0501',project:'Hercules Solar + BESS',pillar:'procurement',due:'Aug 5',priority:'high',source:'fq',done:false,closeNote:''},
    {id:'mct-003',label:'Release PO — Solar DC cabling',ref:'REQ-P-0531',project:'Hercules Solar + BESS',pillar:'procurement',due:'Aug 6',priority:'high',source:'fq',done:false,closeNote:''},
    {id:'mct-004',label:'Approve submittal — modular e-houses (BESS)',ref:'REQ-F-034',project:'Hercules Solar + BESS',pillar:'prefab',due:'Aug 8',priority:'high',source:'fq',done:false,closeNote:''},
    {id:'mct-005',label:'Call off rental — 2\xd7 scissor lift idle 6 days',ref:'ORD-3031',project:'Hercules Solar + BESS',pillar:'equipment',due:'Aug 4',priority:'medium',source:'manual',done:false,closeNote:''},
    {id:'mct-006',label:'Confirm site access — tower crane mobilization',ref:'ORD-3128',project:'Riverside Medical Center',pillar:'logistics',due:'Aug 4',priority:'high',source:'manual',done:false,closeNote:''},
    {id:'mct-007',label:'Schedule BESS container placement (6 moves)',ref:'REQ-L-3061',project:'Hercules Solar + BESS',pillar:'logistics',due:'Aug 10',priority:'medium',source:'fq',done:false,closeNote:''},
    {id:'mct-008',label:'Get quote — BESS commissioning agent',ref:'REQ-S-2108',project:'Hercules Solar + BESS',pillar:'services',due:'Aug 12',priority:'medium',source:'fq',done:false,closeNote:''},
    {id:'mct-009',label:'Allocate crawler crane 230T — Hercules',ref:'REQ-4473',project:'Hercules Solar + BESS',pillar:'equipment',due:'Aug 15',priority:'medium',source:'fq',done:false,closeNote:''},
    {id:'mct-010',label:'Place order — UPS bypass cable assembly',ref:'REQ-P-0614',project:'Cimarron Data Center',pillar:'procurement',due:'Aug 18',priority:'low',source:'fq',done:false,closeNote:''}
  ];
  var _MT_NS=[
    {id:'mct-001',rank:1,why:'BESS containers are on the critical path to November energization. Order-by date has passed — every additional week adds ~$40K in re-rent cost exposure.',sys:'S2P',sysLabel:'Release PO in S2P',sysIcon:'<path d="M9 12l2 2 4-4M7.8 3a9 9 0 100 18A9 9 0 007.8 3z"/>'},
    {id:'mct-005',rank:2,why:'Scissor lifts are idle-billing at $1.9K/wk with no active schedule dependency. Return window is open — this is pure avoidable spend.',sys:'T3',sysLabel:'Initiate return in T3',sysIcon:'<rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7z"/>'},
    {id:'mct-006',rank:3,why:'Tower crane mobilization window closes Aug 4. Structural steel erection is crane-dependent — missing access confirmation delays critical path by 2+ weeks.',sys:'T3',sysLabel:'Send confirmation in T3',sysIcon:'<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/>'},
    {id:'mct-002',rank:4,why:'MV switchgear has a 28-week lead time. Order-by date passed — substation schedule recoverable only if PO is released this week.',sys:'S2P',sysLabel:'Release PO in S2P',sysIcon:'<path d="M9 12l2 2 4-4M7.8 3a9 9 0 100 18A9 9 0 007.8 3z"/>'},
    {id:'mct-003',rank:5,why:'Solar DC cabling is long-lead and spec-dependent. EPC confirmation can run in parallel — release PO to vendor now to reserve lead time slot.',sys:'S2P',sysLabel:'Release PO in S2P',sysIcon:'<path d="M9 12l2 2 4-4M7.8 3a9 9 0 100 18A9 9 0 007.8 3z"/>'},
    {id:'mct-004',rank:6,why:'E-house submittal approval gates fabrication slot. Shop is holding capacity — delay past this week risks the Nov delivery window.',sys:'Procore',sysLabel:'Approve submittal in Procore',sysIcon:'<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><path d="M9 13h6M9 17h4"/>'},
    {id:'mct-007',rank:7,why:'BESS container placement is 6 crane moves. Self-perform crew is available Aug 5–6. Scheduling now locks the slot before competing project needs arise.',sys:'T3',sysLabel:'Assign crew in T3',sysIcon:'<rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7z"/>'},
    {id:'mct-008',rank:8,why:'Commissioning agent needs 8–12 weeks of onboarding lead time. Quote must be initiated now to hit the Nov energization milestone.',sys:'T3',sysLabel:'Request quote via T3',sysIcon:'<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>'},
    {id:'mct-009',rank:9,why:'No owned 230T crane available. Maxim Crane is the preferred vendor — confirm allocation to lock rate before spot market tightens in Q4.',sys:'T3',sysLabel:'Confirm allocation in T3',sysIcon:'<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>'},
    {id:'mct-010',rank:10,why:'UPS bypass cable is specialty; electrical spec confirmation can run in parallel. Non-critical-path — place order once spec is verified.',sys:'S2P',sysLabel:'Place order in S2P',sysIcon:'<path d="M9 12l2 2 4-4M7.8 3a9 9 0 100 18A9 9 0 007.8 3z"/>'}
  ];
  var _myTasksFilter='all', _myTasksFilterPri='all', _myTasksFilterProj='all', _myTasksSort='due', _myTasksEdit=null;
  function myTaskCheckChange(id,el){
    if(el.checked){el.checked=false;myTaskCloseStart(id);}
    else{var t=MY_CC_TASKS.find(function(x){return x.id===id;});if(t){t.done=false;t.closeNote='';renderMyTasks();_myTasksBadge();}}
  }
  function myTaskCloseStart(id){
    var t=MY_CC_TASKS.find(function(x){return x.id===id;}); if(!t)return;
    var b='<div style="font-size:13px;font-weight:600;color:var(--g900);margin-bottom:4px">'+t.label+'</div>';
    b+='<div style="font-size:11.5px;color:var(--g500);margin-bottom:16px">'+t.ref+(t.project?' \xb7 '+t.project:'')+'</div>';
    b+='<div style="font-size:12px;font-weight:600;color:var(--g700);margin-bottom:6px">What was done in the source system?</div>';
    b+='<textarea id="mtCloseNote" placeholder="e.g. PO released in S2P — confirmation #PO-20260803. Vendor acknowledged 14-week lead time." style="width:100%;box-sizing:border-box;min-height:90px;border:1px solid var(--g200);border-radius:6px;padding:8px 10px;font-size:12px;color:var(--g800);resize:vertical;line-height:1.5" autofocus></textarea>';
    b+='<div style="font-size:11px;color:var(--g400);margin-top:4px">Optional — leave blank to mark complete without a note.</div>';
    b+='<div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-dark" onclick="myTaskCloseConfirm(\''+id+'\')">Mark complete</button></div>';
    openModal('Complete task', b);
  }
  function myTaskCloseConfirm(id){
    var t=MY_CC_TASKS.find(function(x){return x.id===id;}); if(!t)return;
    var note=document.getElementById('mtCloseNote')?document.getElementById('mtCloseNote').value.trim():'';
    t.done=true; t.closeNote=note; t.closedAt=new Date().toLocaleDateString('en-US',{month:'short',day:'numeric'});
    closeModal(); renderMyTasks(); _myTasksBadge(); toast(t.label+' marked complete');
  }
  function myTaskAdd(label,ref,project,pillar,due){MY_CC_TASKS.unshift({id:'mct-'+Date.now(),label:label,ref:ref||'',project:project||'',pillar:pillar||'',due:due||'',priority:'',source:'fq',done:false,closeNote:''});_myTasksBadge();}
  function myTaskSetDue(id,val){var t=MY_CC_TASKS.find(function(x){return x.id===id;});if(t)t.due=val;}
  function myTaskSetPri(id,val){var t=MY_CC_TASKS.find(function(x){return x.id===id;});if(t){t.priority=val;renderMyTasks();}}
  function myTasksSet(k,v){if(k==='status')_myTasksFilter=v;else if(k==='pri')_myTasksFilterPri=v;else if(k==='proj')_myTasksFilterProj=v;else if(k==='sort')_myTasksSort=v;renderMyTasks();}
  function myTasksClearDone(){MY_CC_TASKS=MY_CC_TASKS.filter(function(t){return !t.done;});_myTasksFilter='all';renderMyTasks();_myTasksBadge();}
  function myTaskEditStart(id){_myTasksEdit=id;renderMyTasks();}
  function myTaskEditDone(){_myTasksEdit=null;renderMyTasks();}
  function _myTasksBadge(){
    var nav=document.getElementById('ccnav-mytasks'); if(!nav)return;
    var isFSM=ccPersona==='fsm'; var pf=isFSM?null:(_PERSONA_PILLAR[ccPersona]||null);
    var n=MY_CC_TASKS.filter(function(t){return !t.done&&(!pf||t.pillar===pf);}).length;
    var b=nav.querySelector('.mt-badge');
    if(!b){b=document.createElement('span');b.className='mt-badge';b.style.cssText='margin-left:auto;background:var(--charcoal);color:#fff;border-radius:10px;padding:0 5px;font-size:10px;font-weight:700;min-width:16px;text-align:center;line-height:16px;display:inline-block';nav.appendChild(b);}
    b.textContent=n||'';b.style.display=n?'':'none';
  }
  function _taskDueSort(due){if(!due)return 9999;var mo={Jan:1,Feb:2,Mar:3,Apr:4,May:5,Jun:6,Jul:7,Aug:8,Sep:9,Oct:10,Nov:11,Dec:12};var m=due.match(/([A-Za-z]+)\s+(\d+)/);return m?(mo[m[1]]||99)*100+parseInt(m[2],10):9999;}
  function _taskPriSort(p){return p==='high'?1:p==='medium'?2:p==='low'?3:4;}
  function renderMyTasks(){
    if(CURRENT==='ns'){renderMyTasksNS();return;}
    var mount=document.getElementById('ccMyTasks'); if(!mount)return;
    _myTasksBadge();
    var isFSM=ccPersona==='fsm'; var pf=isFSM?null:(_PERSONA_PILLAR[ccPersona]||null);
    var basePool=MY_CC_TASKS.filter(function(t){return !pf||t.pillar===pf;});
    var projs=[]; basePool.forEach(function(t){if(t.project&&projs.indexOf(t.project)<0)projs.push(t.project);}); projs.sort();
    var tasks=basePool.filter(function(t){
      if(_myTasksFilter==='active'&&t.done)return false;
      if(_myTasksFilter==='done'&&!t.done)return false;
      if(_myTasksFilterPri!=='all'&&t.priority!==_myTasksFilterPri)return false;
      if(_myTasksFilterProj!=='all'&&t.project!==_myTasksFilterProj)return false;
      return true;
    });
    tasks=tasks.slice().sort(function(a,b){
      if(_myTasksSort==='due')return _taskDueSort(a.due)-_taskDueSort(b.due);
      if(_myTasksSort==='priority')return _taskPriSort(a.priority)-_taskPriSort(b.priority);
      return 0;
    });
    var openAll=basePool.filter(function(t){return !t.done;}).length;
    var doneAll=basePool.filter(function(t){return t.done;}).length;
    var SPARK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:12px;height:12px;margin-right:4px;vertical-align:middle"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z"/></svg>';
    var h='<div class="phead"><div><h1>My Tasks</h1><div class="meta"><span class="chip">'+openAll+' open</span>'+(pf?'<span class="chip">'+pf+'</span>':'')+'</div></div></div>';
    h+='<div style="display:flex;align-items:center;gap:6px;margin-bottom:14px;flex-wrap:wrap">';
    [['all','All'],['active','Active'],['done','Done']].forEach(function(f){h+='<button onclick="myTasksSet(\'status\',\''+f[0]+'\')" style="font-size:11.5px;padding:3px 10px;border-radius:20px;border:1px solid '+(_myTasksFilter===f[0]?'var(--charcoal);background:var(--charcoal);color:#fff':'var(--g200);background:#fff;color:var(--g600)')+';cursor:pointer;font-weight:'+(_myTasksFilter===f[0]?'600':'400')+'">'+f[1]+'</button>';});
    h+='<div style="width:1px;height:18px;background:var(--g200);margin:0 2px"></div>';
    h+='<select onchange="myTasksSet(\'pri\',this.value)" style="font-size:11.5px;border:1px solid var(--g200);border-radius:6px;padding:3px 8px;color:var(--g700);background:#fff;cursor:pointer"><option value="all"'+(_myTasksFilterPri==='all'?' selected':'')+'>Priority</option>';
    ['high','medium','low',''].forEach(function(p){h+='<option value="'+p+'"'+(_myTasksFilterPri===p?' selected':'')+'>'+(p||'Not set')+'</option>';});
    h+='</select>';
    if(projs.length>1){h+='<select onchange="myTasksSet(\'proj\',this.value)" style="font-size:11.5px;border:1px solid var(--g200);border-radius:6px;padding:3px 8px;color:var(--g700);background:#fff;cursor:pointer"><option value="all"'+(_myTasksFilterProj==='all'?' selected':'')+'>Project</option>';projs.forEach(function(p){h+='<option value="'+p+'"'+(_myTasksFilterProj===p?' selected':'')+'>'+(p.length>22?p.slice(0,20)+'…':p)+'</option>';});h+='</select>';}
    h+='<div style="flex:1"></div>';
    h+='<select onchange="myTasksSet(\'sort\',this.value)" style="font-size:11.5px;border:1px solid var(--g200);border-radius:6px;padding:3px 8px;color:var(--g700);background:#fff;cursor:pointer">';
    [['due','Sort: Due date'],['priority','Sort: Priority'],['added','Sort: Recently added']].forEach(function(s){h+='<option value="'+s[0]+'"'+(_myTasksSort===s[0]?' selected':'')+'>'+ s[1]+'</option>';});
    h+='</select>';
    if(doneAll>0)h+='<button onclick="myTasksClearDone()" style="font-size:11.5px;padding:3px 10px;border-radius:6px;border:1px solid var(--g200);background:#fff;color:var(--g500);cursor:pointer">Clear done</button>';
    h+='</div>';
    if(!tasks.length){var hasF=_myTasksFilterPri!=='all'||_myTasksFilterProj!=='all'||_myTasksFilter!=='all';h+='<div style="padding:40px 0;text-align:center;color:var(--g400);font-size:13px">No tasks match'+(hasF?' these filters':''+(pf?' for '+pf:''))+'<div style="font-size:11.5px;margin-top:4px;color:var(--g300)">'+(hasF?'<button onclick="_myTasksFilterPri=\'all\';_myTasksFilterProj=\'all\';_myTasksFilter=\'all\';renderMyTasks()" style="font-size:11px;color:var(--info);background:none;border:none;cursor:pointer">Clear filters</button>':'Add from the Fulfillment queue with “Add to list”')+'</div></div>';mount.innerHTML=h;return;}
    var PRI_OPTS=['','high','medium','low']; var PRI_LBL={'high':'High','medium':'Medium','low':'Low'};
    var COL='display:grid;grid-template-columns:20px 1fr 86px 96px 130px;gap:0 14px;align-items:center;padding:9px 14px;';
    h+='<div style="'+COL.replace('padding:9px 14px','padding:2px 14px 8px')+'">';
    h+='<div></div>';
    h+='<div style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--g400)">Task</div>';
    h+='<div style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--g400)">Due</div>';
    h+='<div style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--g400)">Priority</div>';
    h+='<div></div></div>';
    h+='<div style="display:flex;flex-direction:column;gap:4px">';
    tasks.forEach(function(t){
      var isEd=_myTasksEdit===t.id&&!t.done;
      h+='<div style="'+COL+'background:#fff;border:1px solid var(--g200);border-radius:8px">';
      h+='<label style="cursor:pointer;display:flex;align-items:center"><input type="checkbox"'+(t.done?' checked':'')+' onchange="myTaskCheckChange(\''+t.id+'\',this)" style="width:15px;height:15px;cursor:pointer;accent-color:var(--charcoal)"></label>';
      h+='<div style="min-width:0"><div style="font-size:13px;font-weight:600;'+(t.done?'text-decoration:line-through;color:var(--g400)':'color:var(--g900)')+'">'+t.label+'</div>';
      h+='<div style="display:flex;align-items:center;gap:5px;margin-top:2px;flex-wrap:wrap">';
      if(t.ref){var isLink=t.source==='fq';h+=isLink?'<button onclick="dpOpenFulfill(\''+t.ref+'\')" style="font-size:10.5px;padding:1px 5px;border-radius:4px;border:1px solid var(--g200);background:#fff;color:var(--info);cursor:pointer">'+t.ref+' →</button>':'<span style="font-size:10.5px;color:var(--g400)">'+t.ref+'</span>';}
      if(t.project)h+='<span style="font-size:10.5px;color:var(--g500)">'+t.project+'</span>';
      h+='</div>';
      if(t.done&&t.closeNote)h+='<div style="margin-top:4px;font-size:11px;color:var(--g500);background:var(--g50);border-radius:4px;padding:3px 7px;border-left:2px solid var(--g200)">✓ '+t.closeNote+(t.closedAt?' <span style="color:var(--g400)">· '+t.closedAt+'</span>':'')+'</div>';
      h+='</div>';
      if(isEd){
        h+='<input type="text" value="'+(t.due||'')+'" oninput="myTaskSetDue(\''+t.id+'\',this.value)" placeholder="e.g. Aug 5" style="font-size:11.5px;border:1px solid var(--g200);border-radius:5px;padding:4px 7px;width:100%;box-sizing:border-box;color:var(--g700)">';
        h+='<select onchange="myTaskSetPri(\''+t.id+'\',this.value)" style="font-size:11.5px;border:1px solid var(--g200);border-radius:5px;padding:4px 6px;width:100%;box-sizing:border-box;color:var(--g700);cursor:pointer">'+PRI_OPTS.map(function(p){return'<option value="'+p+'"'+(t.priority===p?' selected':'')+'>'+(p?PRI_LBL[p]:'No priority')+'</option>';}).join('')+'</select>';
        h+='<div style="display:flex;gap:5px"><button onclick="myTaskEditDone()" style="font-size:11.5px;padding:3px 11px;border-radius:5px;border:1px solid var(--charcoal);background:var(--charcoal);color:#fff;cursor:pointer;white-space:nowrap">Done</button><button onclick="myTaskCloseStart(\''+t.id+'\')" style="font-size:11.5px;padding:3px 10px;border-radius:5px;border:1px solid var(--g200);background:#fff;color:var(--g600);cursor:pointer;white-space:nowrap">Close</button></div>';
      } else if(!t.done){
        h+='<span style="font-size:12px;color:'+(t.due?'var(--g700)':'var(--g300)')+'">'+( t.due||'—')+'</span>';
        h+=(t.priority?'<span style="font-size:11px;padding:2px 8px;border-radius:10px;background:'+(t.priority==='high'?'#fee2e2;color:#dc2626':t.priority==='medium'?'#fef9c3;color:#b45309':'#dcfce7;color:#16a34a')+'">'+PRI_LBL[t.priority]+'</span>':'<span style="font-size:12px;color:var(--g300)">—</span>');
        h+='<div style="display:flex;gap:5px"><button onclick="myTaskEditStart(\''+t.id+'\')" style="font-size:11.5px;padding:3px 10px;border-radius:5px;border:1px solid var(--g200);background:#fff;color:var(--g600);cursor:pointer">Edit</button><button onclick="myTaskCloseStart(\''+t.id+'\')" style="font-size:11.5px;padding:3px 10px;border-radius:5px;border:1px solid var(--g200);background:#fff;color:var(--g600);cursor:pointer">Close</button></div>';
      } else {
        h+='<span></span><span></span><span></span>';
      }
      h+='</div>';
    });
    h+='</div>';
    mount.innerHTML=h;
  }
  function renderMyTasksNS(){
    var mount=document.getElementById('ccMyTasks'); if(!mount)return;
    _myTasksBadge();
    var isFSM=ccPersona==='fsm'; var pf=isFSM?null:(_PERSONA_PILLAR[ccPersona]||null);
    var basePool=MY_CC_TASKS.filter(function(t){return !t.done&&(!pf||t.pillar===pf);});
    var ranked=[]; var unranked=[];
    var nsMap={}; _MT_NS.forEach(function(n){nsMap[n.id]=n;});
    basePool.forEach(function(t){if(nsMap[t.id])ranked.push({t:t,ns:nsMap[t.id]});else unranked.push(t);});
    var h='<div class="phead"><div><h1>My Tasks</h1><div class="meta"><span class="chip">'+basePool.length+' open</span>'+(pf?'<span class="chip">'+pf+'</span>':'')+'</div></div></div>';
    h+='<div style="background:var(--charcoal);border-radius:10px;padding:14px 16px;margin-bottom:18px;color:#fff">';
    h+='<div style="font-size:13px;font-weight:600;line-height:1.4;margin-bottom:6px">3 tasks on the critical path to November energization. 2 have passed their order-by date.</div>';
    h+='<div style="font-size:11.5px;opacity:.75;line-height:1.5">Ranked by schedule risk and margin impact. Tasks with an execute button can be actioned directly once source systems are connected — S2P for PO releases, Procore for submittals, T3 for everything else.</div>';
    h+='</div>';
    h+='<div style="display:flex;flex-direction:column;gap:8px">';
    var SYS_COLOR={S2P:'#2563eb',Procore:'#ea580c'};
    ranked.forEach(function(item,i){
      var t=item.t; var ns=item.ns;
      var sc=SYS_COLOR[ns.sys]||'var(--charcoal)';
      h+='<div style="background:#fff;border:1px solid var(--g200);border-radius:10px;padding:13px 15px">';
      h+='<div style="display:flex;align-items:flex-start;gap:10px">';
      h+='<div style="flex-shrink:0;width:22px;height:22px;border-radius:50%;background:var(--charcoal);color:#fff;font-size:10.5px;font-weight:700;display:flex;align-items:center;justify-content:center;margin-top:1px">'+(i+1)+'</div>';
      h+='<div style="flex:1;min-width:0">';
      h+='<div style="font-size:13px;font-weight:600;color:var(--g900)">'+t.label+'</div>';
      h+='<div style="display:flex;align-items:center;gap:8px;margin-top:3px;flex-wrap:wrap">';
      if(t.ref){var isLink=t.source==='fq';h+=isLink?'<button onclick="dpOpenFulfill(\''+t.ref+'\')" style="font-size:10.5px;padding:1px 6px;border-radius:4px;border:1px solid var(--g200);background:#fff;color:var(--info);cursor:pointer">'+t.ref+' →</button>':'<span style="font-size:10.5px;color:var(--g400)">'+t.ref+'</span>';}
      if(t.project)h+='<span style="font-size:10.5px;color:var(--g500)">'+t.project+'</span>';
      if(t.due)h+='<span style="font-size:10.5px;color:var(--g400)">Due '+t.due+'</span>';
      h+='</div>';
      h+='<div style="margin-top:8px;padding:7px 10px;background:#f8f9fa;border-radius:6px;border-left:2px solid var(--charcoal)">';
      h+='<span style="font-size:11.5px;color:var(--g700);line-height:1.45">'+ns.why+'</span>';
      h+='</div>';
      h+='<div style="display:flex;align-items:center;gap:8px;margin-top:10px;flex-wrap:wrap">';
      h+='<button onclick="toast(\''+ns.sysLabel+' — source system connection coming in next release\')" style="font-size:11.5px;padding:4px 12px;border-radius:6px;border:none;background:'+sc+';color:#fff;cursor:pointer;font-weight:600">'+ns.sysLabel+'</button>';
      h+='<span style="font-size:10px;padding:2px 7px;border-radius:10px;border:1px solid var(--g200);color:var(--g500)">Connected: '+ns.sys+'</span>';
      h+='<div style="flex:1"></div><button onclick="myTaskCloseStart(\''+t.id+'\')" style="font-size:11.5px;padding:3px 10px;border-radius:5px;border:1px solid var(--g200);background:#fff;color:var(--g500);cursor:pointer">Close task</button>';
      h+='</div>';
      h+='</div></div></div>';
    });
    unranked.forEach(function(t){
      h+='<div style="background:#fff;border:1px solid var(--g200);border-radius:10px;padding:13px 15px;display:flex;align-items:flex-start;gap:10px">';
      h+='<label style="flex-shrink:0;margin-top:2px;cursor:pointer"><input type="checkbox"'+(t.done?' checked':'')+' onchange="myTaskCheckChange(\''+t.id+'\',this)" style="width:15px;height:15px;cursor:pointer;accent-color:var(--charcoal)"></label>';
      h+='<div style="flex:1"><div style="font-size:13px;font-weight:600;color:var(--g900)">'+t.label+'</div>';
      h+='<div style="font-size:11px;color:var(--g400);margin-top:3px">'+t.ref+(t.project?' \xb7 '+t.project:'')+'</div></div>';
      h+='<button onclick="myTaskCloseStart(\''+t.id+'\')" style="font-size:11.5px;padding:3px 10px;border-radius:5px;border:1px solid var(--g200);background:#fff;color:var(--g500);cursor:pointer;flex-shrink:0">Close</button>';
      h+='</div>';
    });
    h+='</div>';
    mount.innerHTML=h;
  }
  function fqTask(id){ var r=fqById(id); if(!r)return; r.tasked=true; myTaskAdd(r.item,r.ref,r.project,r.pillar,r.needby||''); renderFulfill(); toast(r.item+' added to My Tasks — view in sidebar'); }
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
    h+='<div class="vitals" style="grid-template-columns:repeat(4,1fr)">'; vit.forEach(function(x){ h+='<div class="vital '+x.tone+'"><div class="vk">'+svg(x.icon)+x.k+'</div><div class="vv">'+x.v+'</div><div class="vsub">'+x.sub+'</div></div>'; }); h+='</div>';
    if(ns){ h+='<div class="ins-strip"><span class="isi">'+CC_SPARK+'</span><div><div class="ist">11 units active across 3 projects &middot; 2 units idle &gt;5 days &middot; Fleet utilization: 73%</div><div class="isd">6 units are past their replacement threshold \u2014 a ~$4.2M Q3 CapEx ask. 9 idle units (incl. 3 excavators) can cover open October demand \u2014 redeploying avoids ~$96K in re-rent and lifts utilization to 86%. <b>Demand plan coverage:</b> 68% of Q3 2026 equipment needs planned \u00b7 4 unplanned demand spikes identified for Jul\u2013Aug.</div></div></div>'; }
    else { h+='<div class="ins-strip"><span class="isi">'+svg('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',0)+'</span><div><div class="ist">486 owned units &middot; 82% utilization &middot; 6 flagged for replacement</div><div class="isd">Review asset conditions and mileage/hours in the table below. Replacement and redeployment actions require Approver access.</div></div></div>'; }
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
  var CAPEX_MANUAL=[]; var capexManualNext=1;
  function capexAddManualModal(){
    var b='<div class="fq-reco-badge">Add a line that isn’t in the ranked list — it will appear in your CapEx plan below.</div>';
    b+='<div class="fq-calc" style="display:grid;grid-template-columns:1fr 1fr;gap:10px 16px">'
      +'<div style="grid-column:1/-1"><label class="fld-label">Asset / description</label><input id="cm-cls" class="fsel" style="width:100%" placeholder="e.g. Compactor, 10T"></div>'
      +'<div><label class="fld-label">Action</label><select id="cm-rec" class="fsel" style="width:100%"><option value="buy">Buy</option><option value="replace">Replace</option><option value="rerent">Re-rent</option><option value="redeploy">Redeploy</option></select></div>'
      +'<div><label class="fld-label">CapEx / price</label><input id="cm-capex" class="fsel" style="width:100%" placeholder="e.g. $0.8M"></div>'
      +'<div><label class="fld-label">Annual re-rent (if replacing)</label><input id="cm-rerent" class="fsel" style="width:100%" placeholder="e.g. $0.3M/yr"></div>'
      +'<div><label class="fld-label">Payback</label><input id="cm-payback" class="fsel" style="width:100%" placeholder="e.g. 24 mo"></div>'
      +'<div style="grid-column:1/-1"><label class="fld-label">Rationale</label><textarea id="cm-reason" class="ctext" style="width:100%;min-height:56px" placeholder="Why is this needed?"></textarea></div>'
      +'</div>';
    b+='<div class="modal-foot"><div class="mfoot-btns" style="margin-left:auto;display:flex;gap:8px"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-red" onclick="capexSaveManual()">Add to plan</button></div></div>';
    openModal('Add line to CapEx plan', b);
  }
  function capexSaveManual(){
    var cls=(gel('cm-cls')||{}).value||''; if(!cls.trim()){toast('Enter an asset description');return;}
    CAPEX_MANUAL.push({id:'manual-'+(capexManualNext++),cls:cls.trim(),rec:(gel('cm-rec')||{}).value||'buy',capex:(gel('cm-capex')||{}).value||'—',rerent:(gel('cm-rerent')||{}).value||'—',payback:(gel('cm-payback')||{}).value||'—',reason:(gel('cm-reason')||{}).value||'—',by:'You',when:CAPEX_NOW,manual:true});
    closeModal(); renderGap(); toast('Line added to CapEx plan');
  }
  var capexPlanApproved=false;
  function approveCapexPlan(){ capexPlanApproved=true; renderGap(); toast('CapEx plan approved — sent to Anaplan as performance baseline'); }
  function hmColor(v){ if(v<=-4)return{bg:'rgba(220,29,52,.20)',fg:'#B81729'}; if(v<0)return{bg:'rgba(220,29,52,.09)',fg:'#B81729'}; if(v===0)return{bg:'transparent',fg:'var(--g400)'}; if(v<=3)return{bg:'rgba(47,122,67,.10)',fg:'var(--success)'}; return{bg:'rgba(47,122,67,.20)',fg:'var(--success)'}; }
  function gapItems(){ return CAPEX_BUYS.slice(); }
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
    h+='<div class="vitals" style="grid-template-columns:repeat(4,1fr)">'; vit.forEach(function(x){ h+='<div class="vital '+x.tone+'"><div class="vk">'+svg(x.icon)+x.k+'</div><div class="vv">'+x.v+'</div><div class="vsub">'+x.sub+'</div></div>'; }); h+='</div>';
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
    h+='<div class="eq-toolbar" style="margin-top:22px"><span class="dp-sec-t">'+svg(IC.check)+'Your CapEx plan</span><span class="spacer"></span>'+(planned.length?('<span class="ff-hint">$'+planTotal.toFixed(1)+'M \u00b7 '+planCount+' line'+(planCount===1?'':'s')+'</span>'):'')+'<button class="btn btn-ghost btn-sm" style="margin-left:8px" onclick="capexAddManualModal()">+ Add line manually</button></div>';
    var allPlanned=planned.concat(CAPEX_MANUAL);
    var allTotal=planTotal+CAPEX_MANUAL.reduce(function(s,m){var n=parseFloat((m.capex||'').replace(/[^0-9.]/g,''))||0;return s+n;},0);
    if(!allPlanned.length){ h+='<div class="fq-empty">No line items yet. Validate items from the ranked list above or add a line manually.</div>'; }
    else {
      var gtp='1.4fr 96px 118px 74px 1.5fr';
      h+='<div class="dp-tbl"><div class="dp-head" style="grid-template-columns:'+gtp+'"><span>Asset</span><span class="r">Buy price</span><span>Annual re-rent</span><span>Payback</span><span>Added by</span></div>';
      planned.forEach(function(it){ h+='<div class="dp-row" style="grid-template-columns:'+gtp+'"><div>'+it.cls+'</div><div class="r">'+it.capex+'</div><div>'+it.rerent+'</div><div>'+it.payback+'</div><div class="sub" style="white-space:normal">'+(capexByMap[it.id]||'\u2014')+' \u00b7 '+(capexWhenMap[it.id]||CAPEX_NOW)+'<br>\u201c'+(capexReasonMap[it.id]||'\u2014')+'\u201d</div></div>'; });
      CAPEX_MANUAL.forEach(function(m){ h+='<div class="dp-row" style="grid-template-columns:'+gtp+'"><div>'+m.cls+'<span class="tag neu" style="margin-left:6px;font-size:10px">Manual</span></div><div class="r">'+m.capex+'</div><div>'+m.rerent+'</div><div>'+m.payback+'</div><div class="sub" style="white-space:normal">'+m.by+' \u00b7 '+m.when+'<br>\u201c'+m.reason+'\u201d</div></div>'; });
      h+='</div>';
    }
    h+='<div class="cp-total">In plan: <b>$'+allTotal.toFixed(1)+'M</b> of $'+recTotal.toFixed(1)+'M recommended</div>';
    if(ns){
      if(capexPlanApproved){
        h+='<div class="ns-capex-approved">'+svg('<path d="M20 6L9 17l-5-5"/>',2)+'CapEx plan approved \u2014 sent to Anaplan as the performance baseline. Actuals will be tracked against this plan.</div>';
      } else {
        h+='<div class="ns-capex-strip"><div class="ncs-body"><span class="ncs-icon">'+CC_SPARK+'</span><div><div class="ncs-t">North Star: capital expense approval</div><div class="ncs-d">Approve this plan to send it to Anaplan as the baseline for performance measurement. Actuals will track against the approved plan line by line \u2014 budget vs. committed vs. spent, by asset class.</div></div><button class="btn btn-red" onclick="approveCapexPlan()"'+(allPlanned.length?'':' disabled')+'>Approve &amp; send to Anaplan</button></div></div>';
      }
    }
    h+='<div class="cc-arch">'+svg('<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>')+'<span>Demand is aggregated from the project demand plans and the fulfillment queue; owned supply is read from the owned-fleet register.</span></div>';
    mount.innerHTML=h;
  }

  /* ═══════════ BILLING ANOMALIES ═══════════ */
  var AN_SEV={high:{l:'High',t:'bad'},med:{l:'Med',t:'warn'},low:{l:'Low',t:'neu'}};
  var ANOM=[
    {id:'BILL-9012',type:'Idle-but-billing',asset:'Scissor lift SL-2204',project:'Hercules Solar + BESS',code:'0100-0100-0000-0001',impact:3800,dir:'Project overpay',sev:'high',status:'Open',bucket:'idle',stream:'ar',evidence:['No telematics activity for 18 days','Still billing the project at $3,800/mo','Flagged by the project team (Dana Reyes)'],reco:'Draft call-off to stop billing + credit 18 idle days (~$2,280)',action:'Draft call-off'},
    {id:'BILL-9021',type:'Billing after return',asset:'Excavator EX-1180',project:'Hercules Solar + BESS',code:'0200-0320-0000-0001',impact:5200,dir:'Project overpay',sev:'high',status:'Open',bucket:'idle',stream:'ar',evidence:['Unit returned to the yard 9 days ago','AR still accruing at $5,200/mo','Off-rent event never posted to CMiC'],reco:'Stop AR + credit 9 days ($1,560); post the off-rent to CMiC',action:'Issue credit'},
    {id:'BILL-9038',type:'Rate mismatch',asset:'Telehandler TH-0904',project:'Cimarron Data Center',code:'02-220',impact:1400,dir:'Project overpay',sev:'med',status:'Open',bucket:'rate',stream:'ar',evidence:['Billed at $2,900/mo','02S catalog rate is $2,200/mo','$700/mo over catalog since June \u2014 12% above the contract rate'],reco:'Correct rate to catalog + credit the overage ($2,100)',action:'Correct rate'},
    {id:'BILL-9047',type:'Duplicate charge',asset:'Scissor lift SL-2261',project:'Riverside Medical Center',code:'0100-0100-0000-0001',impact:900,dir:'Project overpay',sev:'low',status:'Open',bucket:'other',stream:'ar',evidence:['Same asset billed on two cost codes','Duplicate AR of $900/mo since July'],reco:'Remove the duplicate line + credit ($900)',action:'Remove dup'},
    {id:'BILL-9052',type:'Idle-but-billing',asset:'Dozer DZ-0188',project:'Cimarron Data Center',code:'0200-0320-0000-0001',impact:1400,dir:'Project overpay',sev:'med',status:'Open',bucket:'idle',stream:'ar',evidence:['Utilization 4% over the last 21 days','Billing the project $1,400/mo'],reco:'Confirm need with the PM, or call off + credit',action:'Draft call-off'},
    {id:'BILL-9058',type:'PO quantity mismatch',asset:'Telehandler TH-1150 \u00b7 billed 3, PO covers 2',project:'Riverside Medical Center',code:'02-220',impact:2900,dir:'Project overpay',sev:'med',status:'Open',bucket:'other',stream:'ar',evidence:['July invoice bills 3 units','PO-2214 authorizes 2 units','1 unit ($2,900/mo) has no PO coverage'],reco:'Correct the invoice to 2 units + credit the 3rd ($2,900)',action:'Correct qty'},
    {id:'BILL-9061',type:'Late billing start',asset:'Crawler crane CR-0440',project:'Hercules Solar + BESS',code:'0140-0000-0000-0001',impact:1800,dir:'02S under-bill',sev:'low',status:'Open',bucket:'other',stream:'ar',evidence:['Unit went on-rent Jun 28','Billing started Jul 1 \u2014 3 days after on-rent','~$1,800 of billable time never invoiced'],reco:'Back-bill the 3-day gap to the project ($1,800)',action:'Back-bill'},
    {id:'BILL-9034',type:'Margin-negative re-rent',asset:'Tower crane \u00b7 re-rent (ALL Crane)',project:'Riverside Medical Center',code:'0140-0000-0000-0001',impact:4100,dir:'02S loss',sev:'high',status:'Open',bucket:'margin',stream:'ap',evidence:['Vendor AP $36,100/mo vs 02S AR $35,000/mo','Vendor raised the MSA rate on renewal','Margin is \u2212$1,100/mo on this line'],reco:'Re-price to the project, or switch to owned TC-0018 (idle)',action:'Re-price'},
    {id:'BILL-9041',type:'Missing AR',asset:'Generator GEN-0512 \u00b7 re-rent',project:'Cimarron Data Center',code:'2600-3300-0000-0001',impact:2600,dir:'02S leakage',sev:'high',status:'Open',bucket:'other',stream:'ap',evidence:['Vendor AP posted at $2,600/mo','No matching AR to the project','Re-rent never linked to a cost code'],reco:'Create the AR line to project cost code 26-330',action:'Create AR'},
    {id:'BILL-9063',type:'Vendor rate above MSA',asset:'Excavator \u00b7 re-rent (Sunbelt)',project:'Cimarron Data Center',code:'0200-0320-0000-0001',impact:1000,dir:'02S loss',sev:'med',status:'Open',bucket:'rate',stream:'ap',evidence:['Vendor invoice $10,500/mo','Contracted MSA rate is $9,500/mo','$1,000/mo over MSA since June'],reco:'Dispute the vendor invoice down to the MSA rate + recover the overage',action:'Dispute invoice'},
    {id:'BILL-9067',type:'Vendor billing after off-rent',asset:'Boom lift \u00b7 re-rent (United)',project:'Riverside Medical Center',code:'0100-0100-0000-0001',impact:2100,dir:'02S loss',sev:'high',status:'Open',bucket:'idle',stream:'ap',evidence:['Off-rent posted Jul 8 (returned to vendor)','Vendor AP still accruing $2,100/mo','12-day overlap billed in error'],reco:'Dispute the vendor invoice + stop AP; recover the overlap',action:'Dispute invoice'}
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
      'Equipment':{arP:118000,costP:91000,arA:127000,costA:91000,note:'$9K/mo AR overstatement from 2 idle-billing lines (BILL-9012, BILL-9021) awaiting vendor credit.'},
      'Logistics':{arP:18000,costP:16500,arA:18000,costA:16500,note:'Move coordination only. Execution economics in a future build.'},
      'Professional services':{arP:62000,costP:56000,arA:62000,costA:56000,note:'3 active roles at rate card (owner’s engineer, geotech, structural). Steady.'},
      'Procurement':{arP:210000,costP:206000,arA:205000,costA:201500,note:'Pass-through long-lead items. Thin margin by design.'},
      'Pre-fab':{arP:58000,costP:55000,arA:56000,costA:53200,note:'Made-to-order assemblies quoted by 02S after submittal.'}
    },
    'Riverside Medical Center':{
      'Equipment':{arP:186400,costP:147000,arA:186400,costA:151100,note:'Tower crane re-rent renewed above MSA rate (BILL-9034) — margin cut $4.1K/mo.'},
      'Logistics':{arP:9000,costP:8300,arA:9000,costA:8300,note:'Move coordination. Steady.'},
      'Professional services':{arP:24000,costP:21800,arA:24000,costA:21800,note:'Active roles at rate card.'},
      'Procurement':{arP:95000,costP:93200,arA:95000,costA:93200,note:'Supply run pass-throughs. Thin margin by design.'},
      'Pre-fab':{arP:12000,costP:11500,arA:12000,costA:11500,note:'Assemblies quoted post-submittal.'}
    },
    'Cimarron Data Center':{
      'Equipment':{arP:188000,costP:149900,arA:140000,costA:109000,note:'REQ-4472 (4× excavator) open — planned margin unrealized. BILL-9041 missing-AR understates actual by $2.6K/mo.'},
      'Logistics':{arP:11000,costP:10100,arA:11000,costA:10100,note:'Delivery scheduling. Steady.'},
      'Professional services':{arP:19000,costP:17300,arA:19000,costA:17300,note:'Active roles at rate card.'},
      'Procurement':{arP:76000,costP:74500,arA:76000,costA:74500,note:'PDU/cooling pass-throughs. Thin margin by design.'},
      'Pre-fab':{arP:9000,costP:8600,arA:9000,costA:8600,note:'Assemblies quoted post-submittal.'}
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
  function ceParseAmt(s){
    if(!s) return 0;
    var n=parseFloat(String(s).replace(/[$,]/g,''));
    if(!n||isNaN(n)) return 0;
    if(String(s).indexOf('M')>-1) return Math.round(n*1e6);
    if(String(s).indexOf('K')>-1) return Math.round(n*1e3);
    return Math.round(n);
  }
  function ceProjKey(proj){
    if(proj==='Hercules Solar + BESS') return 'hercules';
    if(proj==='Riverside Medical Center') return 'riverside';
    return 'cimarron';
  }
  function ceSetProj(p){ _ceProj=p; renderMargin(); }

  var _rmProj='All';
  function rmSetProj(p){ _rmProj=p; renderMargin(); }
  function renderMargin(){
    var mount=gel('ccMargin'); if(!mount)return;
    var ns=CURRENT==='ns';
    var pillarFilter=_PERSONA_PILLAR[ccPersona];
    var isFSM=!pillarFilter;
    var PKEYS=['hercules','riverside','cimarron'];
    var PSHORT={hercules:'Hercules',riverside:'Riverside',cimarron:'Cimarron'};
    var PIL=['equipment','logistics','profservices','procurement','prefab'];
    var PIL_LBL={equipment:'Equipment',logistics:'Logistics',profservices:'Professional services',procurement:'Procurement',prefab:'Pre-fab'};
    var PIL_NAV={equipment:'dpequip',logistics:'dplog',profservices:'dpsvc',procurement:'dpproc',prefab:'dpprefab'};
    var selKeys=_rmProj==='All'?PKEYS:[ceProjKey(_rmProj)];
    var pillars=isFSM?PIL:[pillarFilter];

    var portROM=0,portBudget=0,portCommit=0,portActuals=0;
    var PD={};
    pillars.forEach(function(pl){
      var plROM=0,plBudget=0,plCommit=0,plActuals=0;
      var rows=[];
      selKeys.forEach(function(pk){
        var lin=(CC_DP_LINEAGE[pl]&&CC_DP_LINEAGE[pl][pk])?CC_DP_LINEAGE[pl][pk].margin:null;
        var cm=(CC_CMIC_DATA[pl]&&CC_CMIC_DATA[pl][pk])?CC_CMIC_DATA[pl][pk]:null;
        var rom=lin?ceParseAmt(lin.rom):0;
        var budget=cm?cm.origBudget+(cm.co||0):0;
        var commit=cm?cm.committed:0;
        var actuals=cm?cm.spent:0;
        plROM+=rom; plBudget+=budget; plCommit+=commit; plActuals+=actuals;
        rows.push({pk:pk,rom:rom,budget:budget,commit:commit,actuals:actuals});
      });
      portROM+=plROM; portBudget+=plBudget; portCommit+=plCommit; portActuals+=plActuals;
      PD[pl]={rom:plROM,budget:plBudget,commit:plCommit,actuals:plActuals,rows:rows};
    });
    var portMargin=portROM-portBudget;
    var portMarginPct=portROM?portMargin/portROM*100:0;
    var cvbPort=portCommit-portBudget;
    var commitPct=portBudget?Math.round(portCommit/portBudget*100):0;
    var actualsPct=portROM?Math.round(portActuals/portROM*100):0;

    var projLbl=_rmProj==='All'?'All projects':(_rmProj.indexOf('Hercules')>=0?'Hercules':_rmProj.indexOf('Riverside')>=0?'Riverside':'Cimarron');
    var h='<div class="phead"><div><h1>Project margin</h1><div class="meta">';
    h+='<span class="chip">02S opportunity · CMiC budget · actuals</span>';
    h+='<span class="chip">'+projLbl+'</span>';
    h+='<span class="chip ver">'+(ns?'North Star':'V1 — standard')+'</span>';
    h+='</div></div></div>';

    h+='<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:18px">';
    [{k:'All',l:'All projects'},{k:'Hercules Solar + BESS',l:'Hercules'},{k:'Riverside Medical Center',l:'Riverside'},{k:'Cimarron Data Center',l:'Cimarron'}].forEach(function(p){
      var _act=_rmProj===p.k;
      h+='<button style="padding:4px 12px;border-radius:5px;border:1px solid '+(_act?'var(--charcoal)':'var(--g200)')+';background:'+(_act?'var(--charcoal)':'#fff')+';color:'+(_act?'#fff':'var(--g700)')+';font-size:12px;cursor:pointer;font-weight:'+(_act?'600':'400')+'" onclick="rmSetProj(\''+p.k+'\')">' + p.l+'</button>';
    });
    h+='</div>';

    var _mgProjR=(_rmProj!=='All'&&typeof mgProjRoll==='function')?mgProjRoll(_rmProj):null;
    var dispMPct=_rmProj==='All'?GM_PLAN:(_mgProjR?_mgProjR.plan.pct:portMarginPct);
    var mColor=dispMPct>12?'var(--success)':dispMPct>5?'var(--g700)':'var(--red)';
    h+='<div style="display:flex;align-items:center;gap:14px;padding:10px 16px;background:#f8fafb;border:1px solid var(--g200);border-radius:8px;margin-bottom:16px">';
    h+='<div style="font-size:28px;font-weight:800;color:'+mColor+'">'+dispMPct.toFixed(1)+'%</div>';
    h+='<div style="border-left:1px solid var(--g200);padding-left:14px">';
    h+='<div style="font-size:12px;font-weight:700;color:var(--g900)">Planned margin · '+projLbl+'</div>'+(_rmProj==='All'?'<div style="font-size:11px;color:var(--g400)">matches dashboard · budget '+fmtBig(portBudget)+' vs opportunity '+fmtBig(portROM)+'</div>':'');
    h+='<div style="font-size:12px;color:var(--g500)">'+fmtBig(portMargin)+' · opportunity '+fmtBig(portROM)+' minus budget '+fmtBig(portBudget)+'</div>';
    h+='</div>';
    h+='<button class="btn btn-ghost btn-sm" style="margin-left:auto" onclick="go(\'home\')">→ dashboard</button>';
    h+='</div>';
    h+='<div class="vitals" style="grid-template-columns:repeat(3,1fr);margin-bottom:20px">';
    h+='<div class="vital neu"><div class="vk">02S opportunity (ROM)</div><div class="vv">'+fmtBig(portROM)+'</div>';
    h+='<div class="vsub">planned AR · '+projLbl+'</div></div>';
    h+='<div class="vital neu"><div class="vk">CMiC budget</div><div class="vv">'+fmtBig(portBudget)+'</div>';
    h+='<div class="vsub">'+(portROM?Math.round(portBudget/portROM*100)+'% of ROM':'—')+'</div></div>';
    h+='<div class="vital neu"><div class="vk">Actuals</div><div class="vv">'+fmtBig(portActuals)+'</div>';
    h+='<div class="vsub">'+actualsPct+'% of ROM · AR billed</div></div>';
    h+='</div>';

    pillars.forEach(function(pl){
      var pd=PD[pl];
      var plM=pd.rom-pd.budget;
      var plMPct=pd.rom?plM/pd.rom*100:0;
      var cvb2=pd.commit-pd.budget;
      var bc=cvb2>pd.budget*0.05?'var(--red)':cvb2<-pd.budget*0.05?'var(--success)':'var(--g300)';
      var badge=Math.abs(cvb2)<pd.budget*0.01?'<span class="tag ok">On budget</span>':
        (cvb2>0?'<span class="tag bad">▲ '+fmtBig(cvb2)+' over</span>':'<span class="tag ok">▼ '+fmtBig(-cvb2)+' under</span>');
      var mBadge=plMPct>12?'<span class="tag ok">'+plMPct.toFixed(1)+'% margin</span>':
        plMPct>5?'<span class="tag neu">'+plMPct.toFixed(1)+'% margin</span>':
        '<span class="tag bad">'+plMPct.toFixed(1)+'% margin</span>';
      h+='<div style="border:1px solid var(--g200);border-left:3px solid '+bc+';border-radius:8px;padding:16px 18px;margin-bottom:14px">';
      h+='<div style="display:flex;align-items:center;gap:8px;justify-content:space-between;margin-bottom:14px">';
      h+='<div style="font-size:14px;font-weight:700;color:var(--charcoal)">'+PIL_LBL[pl]+'</div>';
      h+='<div style="display:flex;gap:6px">'+badge+mBadge+'</div></div>';
      var maxV=Math.max(pd.rom,pd.budget,pd.commit,pd.actuals)*1.12||1;
      var rails=[
        {lbl:'ROM',val:pd.rom,col:'var(--g400)',note:fmtBig(pd.rom)+' · 02S opportunity'},
        {lbl:'Budget',val:pd.budget,col:'var(--info,#3b82f6)',note:fmtBig(pd.budget)+' · '+fmtBig(plM)+' margin ('+plMPct.toFixed(1)+'%)'},
        {lbl:'Actuals',val:pd.actuals,col:'var(--success)',note:fmtBig(pd.actuals)+' · AR billed to date'}
      ];
      h+='<div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">';
      rails.forEach(function(r){
        var pct2=Math.min(100,(r.val/maxV)*100);
        h+='<div style="display:grid;grid-template-columns:72px 1fr 72px 1fr;align-items:center;gap:10px">';
        h+='<div style="font-size:11px;font-weight:500;color:var(--g500)">'+r.lbl+'</div>';
        h+='<div style="background:var(--g100);border-radius:3px;height:7px"><div style="width:'+pct2.toFixed(1)+'%;height:7px;border-radius:3px;background:'+r.col+';transition:width .4s"></div></div>';
        h+='<div style="font-size:12px;font-weight:700;color:var(--charcoal);text-align:right">'+fmtBig(r.val)+'</div>';
        h+='<div style="font-size:10.5px;color:var(--g400)">'+r.note+'</div></div>';
      });
      h+='</div>';
      if(selKeys.length>1){
        var gt='1fr 80px 80px 80px 80px 70px';
        h+='<div class="dp-tbl"><div class="dp-head" style="grid-template-columns:'+gt+';font-size:10.5px">';
        h+='<span>Project</span><span class="r">ROM</span><span class="r">Budget</span><span class="r">Committed</span><span class="r">Actuals</span><span class="r">Margin</span></div>';
        pd.rows.forEach(function(row){
          var rMPct=row.rom?((row.rom-row.budget)/row.rom*100):0;
          var rMCol=rMPct>12?'var(--success)':rMPct>5?'var(--g700)':'var(--red)';
          var rvb2=row.commit-row.budget;
          h+='<div class="dp-row" style="grid-template-columns:'+gt+'">';
          h+='<div>'+PSHORT[row.pk]+'</div>';
          h+='<div class="r" style="color:var(--g600)">'+fmtBig(row.rom)+'</div>';
          h+='<div class="r" style="color:var(--info,#3b82f6)">'+fmtBig(row.budget)+'</div>';
          h+='<div class="r" style="color:'+(rvb2>row.budget*0.05?'var(--red)':'var(--g600)')+'">'+fmtBig(row.commit)+'</div>';
          h+='<div class="r" style="color:var(--success)">'+fmtBig(row.actuals)+'</div>';
          h+='<div class="r" style="font-weight:600;color:'+rMCol+'">'+rMPct.toFixed(1)+'%</div></div>';
        });
        h+='</div>';
      }
      h+='<div style="display:flex;justify-content:flex-end;margin-top:12px">';
      h+='<button class="btn btn-ghost btn-sm" onclick="ccGo(\''+PIL_NAV[pl]+'\')">'+PIL_LBL[pl]+' demand plan →</button>';
      h+='</div></div>';
    });
    h+='<div class="cc-arch"><span>ROM = arP × project months (MARGIN_DATA). Budget = costP × months + approved COs. Actuals = costA × months elapsed.</span></div>';
    mount.innerHTML=h;
  }
  function mgModal(p){
    var d=MARGIN_DATA[p]; var roll=mgProjRoll(p); var ns=CURRENT==='ns'; var lk=MG_LINK[p];
    var b='<div class="fq-req"><div class="fq-req-t">'+p+'</div><div class="sub">Plan '+fmt(roll.plan.margin)+'/mo ('+roll.plan.pct.toFixed(1)+'%) → Actual '+fmt(roll.act.margin)+'/mo ('+roll.act.pct.toFixed(1)+'%)</div></div>';
    b+='<div class="fq-calc">';
    MARGIN_PILLARS.forEach(function(pl){
      var x=d[pl]; var a=mgCalc(x.arA,x.costA);
      b+='<div class="fq-crow"><span>'+pl+'</span><span>'+fmt(a.margin)+'/mo<span class="fq-pct">'+a.pct.toFixed(1)+'%</span></span></div>';
    });
    b+='</div>';
    MARGIN_PILLARS.forEach(function(pl){ var x=d[pl]; if(x.note){ b+='<div class="eq-cap"><b>'+pl+':</b>&nbsp;'+x.note+'</div>'; } });
    if(ns&&lk){ b+='<div class="fq-reco-badge">'+CC_SPARK+lk.text+'</div>'; }
    b+='<div class="modal-foot"><div class="mfoot-btns" style="margin-left:auto;display:flex;gap:8px"><button class="btn btn-ghost" onclick="closeModal()">Close</button>'+((ns&&lk)?('<button class="btn btn-red" onclick="closeModal();ccGo(\''+lk.to+'\')" >'+lk.label+'</button>'):'')+'</div></div>';
    openModal('Margin — '+p, b);
  }
  function renderScView(){
    var mount=gel('ccScView'); if(!mount)return;
    var h='';
    var _scProj=(_ccFSMProj&&_ccFSMProj!==''&&_ccFSMProj!=='all')?_ccFSMProj:null;
    var scopedFQ=_scProj?FQ.filter(function(r){return r.project===_scProj;}):FQ;
    h+='<div style="border-top:2px solid var(--g100);padding-top:18px;margin-bottom:12px;display:flex;align-items:center;gap:8px;flex-wrap:wrap">';
    h+='<span style="font-size:13px;font-weight:700;color:var(--g900);display:inline-flex;align-items:center;gap:6px">'+svg('<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',2)+'Solution Centers'+((_scProj)?(' <span style="font-size:11px;font-weight:500;color:var(--g500)">&#183; '+(_scProj==='Hercules Solar + BESS'?'Hercules Solar':_scProj==='Cimarron Data Center'?'Cimarron DC':'Riverside Medical')+'</span>'):'')+'</span>';
    h+='<div style="flex:1"></div>';
    h+='<select onchange="scSet(\'sc\',this.value)" style="font-size:11.5px;border:1px solid var(--g200);border-radius:5px;padding:3px 8px;color:var(--g700);cursor:pointer;background:#fff"><option value="">All yards</option>'+SC_LIST.map(function(s){return'<option value="'+s+'"'+(_scFilter===s?' selected':'')+'>'+s+'</option>';}).join('')+'</select>';
    var _pills=[['all','All'],['equipment','Equip'],['logistics','Log'],['prefab','Prefab'],['procurement','Proc'],['services','Svcs']];
    _pills.forEach(function(p){h+='<button onclick="scSet(\'pillar\',\''+p[0]+'\')" style="font-size:11px;padding:2px 9px;border-radius:20px;border:1px solid '+(_scPillar===p[0]?'var(--charcoal);background:var(--charcoal);color:#fff':'var(--g200);background:#fff;color:var(--g600)')+';cursor:pointer;white-space:nowrap">'+p[1]+'</button>';});
    h+='</div>';
    var allItems=scopedFQ.filter(function(r){
      if(_scFilter&&r.yard!==_scFilter)return false;
      if(_scPillar!=='all'&&r.pillar!==_scPillar)return false;
      return true;
    });
    var atRisk=allItems.filter(function(r){return r.status==='At-risk';});
    if(atRisk.length){
      h+='<div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:12px 16px;margin-bottom:14px">';
      h+='<div style="font-size:12px;font-weight:700;color:#dc2626;margin-bottom:8px">&#9888; '+atRisk.length+' item'+(atRisk.length>1?'s':'')+' At-risk</div>';
      atRisk.forEach(function(r){
        h+='<div onclick="scOpenModal(\''+r.id+'\')" style="cursor:pointer;padding:4px 8px;margin:2px 0;border-radius:5px;background:rgba(220,38,38,.07);display:flex;align-items:baseline;gap:10px">';
        h+='<span style="font-size:12px;font-weight:600;color:#dc2626">'+r.item+'</span>';
        h+='<span style="font-size:11px;color:var(--g500)">'+r.project+' &#183; need-by '+r.needby+'</span>';
        if(r.hint)h+='<span style="font-size:11px;color:#b45309;margin-left:auto">'+r.hint+'</span>';
        h+='</div>';
      });
      h+='</div>';
    }
    if(!_scFilter){
      var scC={};
      SC_LIST.forEach(function(s){scC[s]={total:0,p:{},risk:0};});
      scopedFQ.forEach(function(r){if(r.yard&&scC[r.yard]){scC[r.yard].total++;scC[r.yard].p[r.pillar]=1;if(r.status==='At-risk')scC[r.yard].risk++;}});
      var aSCs=SC_LIST.filter(function(s){return scC[s].total>0;});
      if(aSCs.length){
        h+='<div style="display:grid;grid-template-columns:repeat('+Math.min(aSCs.length,7)+',1fr);gap:7px;margin-bottom:12px">';
        aSCs.forEach(function(s){
          var c=scC[s];
          var bdr=c.risk?'2px solid #f87171':'1px solid var(--g200)';
          h+='<div onclick="scSet(\'sc\',\''+s+'\')" style="cursor:pointer;border:'+bdr+';border-radius:8px;padding:10px 12px;background:#fff" onmouseenter="this.style.borderColor=\'var(--charcoal)\'" onmouseleave="this.style.borderColor=\''+  (c.risk?'#f87171':'var(--g200)')+'\'";>';
          h+='<div style="font-size:10.5px;font-weight:700;color:var(--g600);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-bottom:4px">'+s+'</div>';
          h+='<div style="font-size:20px;font-weight:800;color:var(--g900);line-height:1">'+c.total+'</div>';
          if(c.risk)h+='<div style="font-size:9.5px;color:#dc2626;margin-top:2px;font-weight:600">'+c.risk+' at-risk</div>';
          h+='<div style="font-size:9.5px;color:var(--g400);margin-top:2px">'+Object.keys(c.p).map(function(p){return p.charAt(0).toUpperCase()+p.slice(1,4);}).join(' &#183; ')+'</div>';
          h+='</div>';
        });
        h+='</div>';
      }
    }
    allItems.sort(function(a,b){
      var aR=a.status==='At-risk'?0:1, bR=b.status==='At-risk'?0:1;
      if(aR!==bR)return aR-bR;
      return _scSort(a.needby)-_scSort(b.needby);
    });
    var PG=5,np=Math.ceil(allItems.length/PG);
    if(_scPage>=np)_scPage=Math.max(0,np-1);
    var pgItems=allItems.slice(_scPage*PG,_scPage*PG+PG);
    if(pgItems.length){
      var gt='1fr 130px 80px 120px 80px 90px 28px';
      h+='<div class="dp-tbl"><div class="dp-head" style="grid-template-columns:'+gt+'"><span>Item</span><span>Project</span><span>Pillar</span><span>Yard</span><span>Need-by</span><span>Status</span><span></span></div>';
      pgItems.forEach(function(r){
        var tone=FQ_TONE[r.status]||'neu';
        h+='<div class="dp-row" style="grid-template-columns:'+gt+';cursor:pointer" onclick="scOpenModal(\''+r.id+'\')">'
          +'<div style="font-size:12.5px">'+r.item+'<div class="sub">'+r.ref+'</div></div>'
          +'<div style="font-size:11.5px;color:var(--g600)">'+r.project+'</div>'
          +'<div><span class="tag neu" style="font-size:10px">'+r.pillar.charAt(0).toUpperCase()+r.pillar.slice(1)+'</span></div>'
          +'<div onclick="event.stopPropagation()">'+(r.yard?'<select onchange="fqSetYard(\''+r.id+'\',this.value);renderScView();" style="font-size:11px;border:1px solid var(--g200);border-radius:5px;padding:2px 6px;color:var(--g700);cursor:pointer;background:#fff">'+SC_LIST.map(function(s){return'<option value="'+s+'"'+(r.yard===s?' selected':'')+'>'+s+'</option>';}).join('')+'</select>':'<span style="font-size:11px;color:var(--g400)">Unassigned</span>')+'</div>'
          +'<div style="font-size:12px">'+r.needby+'</div>'
          +'<div><span class="tag '+tone+'" style="font-size:10px">'+r.status+'</span></div>'
          +'<div style="font-size:16px;color:var(--g400);text-align:center">&#8250;</div>'
          +'</div>';
      });
      h+='</div>';
      if(np>1){
        h+='<div style="display:flex;align-items:center;justify-content:space-between;padding:6px 8px 2px;border-top:1px solid var(--g100)">';
        h+='<button class="btn btn-ghost btn-sm" style="font-size:14px;padding:1px 10px'+(_scPage===0?';opacity:.4;cursor:default':'')+'" '+(_scPage===0?'disabled ':'')+' onclick="scPage('+(_scPage-1)+')">&#8592;</button>';
        h+='<span style="font-size:11px;color:var(--g400)">'+(_scPage+1)+' / '+np+' &#183; '+allItems.length+' items</span>';
        h+='<button class="btn btn-ghost btn-sm" style="font-size:14px;padding:1px 10px'+(_scPage===np-1?';opacity:.4;cursor:default':'')+'" '+(_scPage===np-1?'disabled ':'')+' onclick="scPage('+(_scPage+1)+')">&#8594;</button>';
        h+='</div>';
      }
    } else {
      h+='<div style="padding:16px 0;font-size:12px;color:var(--g400);text-align:center">No items match'+((_scFilter||_scPillar!=='all')?' these filters.':'. Assign yards to fulfillment queue items.')+'</div>';
    }
    mount.innerHTML=h;
  }

  function _scSort(nb){
    if(!nb)return 9999;
    var months={'Jan':1,'Feb':2,'Mar':3,'Apr':4,'May':5,'Jun':6,'Jul':7,'Aug':8,'Sep':9,'Oct':10,'Nov':11,'Dec':12};
    var p=nb.split(' ');
    return (months[p[0]]||0)*100+(parseInt(p[1],10)||0);
  }

  function scOpenModal(id){
    var r=fqById(id); if(!r)return;
    var tone=FQ_TONE[r.status]||'neu';
    var h='<div style="display:flex;flex-direction:column;gap:10px">';
    h+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px 16px;font-size:12.5px">';
    h+='<div><div style="font-size:10px;color:var(--g400);text-transform:uppercase;margin-bottom:2px">Item</div><div style="font-weight:600">'+r.item+'</div></div>';
    h+='<div><div style="font-size:10px;color:var(--g400);text-transform:uppercase;margin-bottom:2px">Project</div><div>'+r.project+'</div></div>';
    h+='<div><div style="font-size:10px;color:var(--g400);text-transform:uppercase;margin-bottom:2px">Pillar</div><div>'+r.pillar+'</div></div>';
    h+='<div><div style="font-size:10px;color:var(--g400);text-transform:uppercase;margin-bottom:2px">Qty</div><div>'+(r.qty||1)+'</div></div>';
    h+='<div><div style="font-size:10px;color:var(--g400);text-transform:uppercase;margin-bottom:2px">Need-by</div><div>'+r.needby+'</div></div>';
    h+='<div><div style="font-size:10px;color:var(--g400);text-transform:uppercase;margin-bottom:2px">Status</div><div><span class="tag '+tone+'">'+r.status+'</span></div></div>';
    if(r.ref)h+='<div><div style="font-size:10px;color:var(--g400);text-transform:uppercase;margin-bottom:2px">Ref</div><div style="font-family:monospace;font-size:11.5px">'+r.ref+'</div></div>';
    if(r.yard)h+='<div><div style="font-size:10px;color:var(--g400);text-transform:uppercase;margin-bottom:2px">Yard</div><div>'+r.yard+'</div></div>';
    h+='</div>';
    if(r.hint)h+='<div style="background:'+(r.status==='At-risk'?'#fef2f2;border:1px solid #fecaca':'#fffbeb;border:1px solid #fde68a')+';border-radius:6px;padding:8px 12px;font-size:12px;color:'+(r.status==='At-risk'?'#b91c1c':'#92400e')+'">'+r.hint+'</div>';
    if(_fqNotes[r.id])h+='<div style="background:#fffbeb;border:1px solid #fde68a;border-radius:6px;padding:8px 12px;font-size:12px;color:#92400e"><span style="font-weight:700">Note:</span> '+_fqNotes[r.id]+'</div>';
    h+='</div>';
    h+='<div style="display:flex;gap:8px;margin-top:14px;flex-wrap:wrap">';
    h+='<button class="btn btn-ghost btn-sm" onclick="closeModal()">Close</button>';
    h+='<button class="btn btn-dark btn-sm" onclick="closeModal();fqEditModal(\''+r.id+'\')" >Edit status / notes</button>';
    h+='<button class="btn btn-red btn-sm" style="margin-left:auto" onclick="closeModal();ccHighlight=\''+r.ref+'\';ccGo(\'fulfill\')">Open in Fulfillment Queue &#8594;</button>';
    h+='</div>';
    openModal(r.item, h);
  }

  var _fqNotes={};

  function fqEditModal(id){
    var r=fqById(id); if(!r)return;
    var _pst={equipment:['New','Requested','Projected','Scheduled','PO issued','Allocated','At-risk'],logistics:['New','Requested','Scheduled','Active','Delivered','At-risk'],procurement:['New','Requested','Awaiting pricing','PO issued','Delivered','At-risk'],prefab:['New','Requested','Awaiting pricing','Submittal','Scheduled','In fabrication','Delivered','At-risk'],services:['New','Requested','Awaiting pricing','Acknowledged','Active','Delivered','At-risk']};var statuses=_pst[r.pillar]||['New','Requested','Scheduled','Active','Delivered','At-risk'];
    var h='<div style="display:flex;flex-direction:column;gap:12px">';
    h+='<div><label style="font-size:11px;color:var(--g500);display:block;margin-bottom:4px">Status</label>';
    h+='<select id="fqEditStatus" style="width:100%;font-size:12.5px;border:1px solid var(--g200);border-radius:6px;padding:6px 10px">';
    statuses.forEach(function(s){h+='<option value="'+s+'"'+(r.status===s?' selected':'')+'>'+s+'</option>';});
    h+='</select></div>';
    h+='<div><label style="font-size:11px;color:var(--g500);display:block;margin-bottom:4px">Notes <span style="color:var(--g300)">(explain risk, blockers, or context)</span></label>';
    h+='<textarea id="fqEditNotes" rows="3" style="width:100%;font-size:12.5px;border:1px solid var(--g200);border-radius:6px;padding:6px 10px;resize:vertical;font-family:inherit">'+(_fqNotes[r.id]||'')+'</textarea></div>';
    h+='<div style="display:flex;gap:8px;margin-top:4px">';
    h+='<button class="btn btn-ghost btn-sm" onclick="closeModal()">Cancel</button>';
    h+='<button class="btn btn-red btn-sm" style="margin-left:auto" onclick="fqSaveEdit(\''+r.id+'\')" >Save</button>';
    h+='</div></div>';
    openModal('Edit: '+r.item, h);
  }

  function fqSaveEdit(id){
    var r=fqById(id); if(!r)return;
    var newStatus=document.getElementById('fqEditStatus').value;
    var newNotes=document.getElementById('fqEditNotes').value.trim();
    r.status=newStatus;
    if(newNotes)_fqNotes[r.id]=newNotes; else delete _fqNotes[r.id];
    closeModal();
    if(typeof renderFulfill==='function')renderFulfill();
    if(typeof renderScView==='function')renderScView();
    if(typeof renderCcDash==='function')renderCcDash();
  }

  function dpIcon(name){ var M={proj:'<path d="M3 21h18M5 21V8l7-5 7 5v13"/><path d="M9 21v-6h6v6"/>',tax:'<path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><path d="M7 7h.01"/>'}; return M[name]||IC[name]||IC.chart; }
  var _DP_IDS={
    equipment:{hercules:'DP-EQ-HRC-001',riverside:'DP-EQ-RIV-001',cimarron:'DP-EQ-CIM-001'},
    logistics:{hercules:'DP-LOG-HRC-001',riverside:'DP-LOG-RIV-001',cimarron:'DP-LOG-CIM-001'},
    procurement:{hercules:'DP-PRO-HRC-001',riverside:'DP-PRO-RIV-001',cimarron:'DP-PRO-CIM-001'},
    prefab:{hercules:'DP-PFB-HRC-001',riverside:'DP-PFB-RIV-001',cimarron:'DP-PFB-CIM-001'},
    profservices:{hercules:'DP-SVC-HRC-001',riverside:'DP-SVC-RIV-001',cimarron:'DP-SVC-CIM-001'}
  };
  var _PILLAR_SCREEN={equipment:'dpequip',logistics:'dplog',profservices:'dpsvc',procurement:'dpproc',prefab:'dpprefab'};
var _PROJ_LABELS={hercules:'Hercules Solar + BESS',riverside:'Riverside Medical Center',cimarron:'Cimarron Data Center'}
  var _PROJ_META={hercules:{bu:'renewables',region:'norpac'},riverside:{bu:'civil',region:'sopac'},cimarron:{bu:'mc',region:'southwest'}};
  var _BU_LABELS={renewables:'Renewables',civil:'Civil',mc:'Mission Critical'};
  var _BU_COLOR={renewables:'#10b981',civil:'#3b82f6',mc:'#8b5cf6'};
  var _REGION_LABELS={southern:'Southern',sopac:'SoPac',norpac:'NorPac',southwest:'Southwest',central:'Central'};
  var _PROJ_STATS={hercules:{budget:22100000},riverside:{budget:7400000},cimarron:{budget:4200000}};;
  var CC_DP_LINEAGE={
    equipment:{
      hercules:{margin:{id:'OPP-HRC-0221',date:'Jan 2025',rom:'$4.2M',note:'ROM at opportunity stage — solar + BESS equipment package',lines:[{label:'Fleet + Pers Assets · owned deployment',est:'$840K'},{label:'Equipment Mgmt · re-rent sourcing & mgmt',est:'$1,220K'},{label:'Yard Mgd Fuel · fuel & consumables',est:'$390K'},{label:'CCEP · compliance, tracking & handling',est:'$280K'},{label:'Contingency (12%)',est:'$370K'},{label:'Total estimate',est:'$4.2M',bold:true}]},baseline:{id:'DP-EQ-HRC-BL1',date:'Mar 2025',total:'$2.74M',items:12,note:'Baseline at project award — detailed scope with owner concurrence'},delta:{added:3,value:'+$412K',reason:'2 panel install additions + crane acceleration',links:[{label:'Telehandler 10K (Sector 2)',rowIdx:9},{label:'Boom lift 60 ft',rowIdx:10}]}},
      riverside:{margin:{id:'OPP-RIV-0318',date:'Feb 2025',rom:'$4.5M',note:'ROM for hospital campus earthwork + MEP',lines:[{label:'Fleet + Pers Assets · owned deployment',est:'$520K'},{label:'Equipment Mgmt · re-rent sourcing & mgmt',est:'$840K'},{label:'Yard Mgd Fuel · fuel & consumables',est:'$240K'},{label:'CCEP · compliance & tracking',est:'$130K'},{label:'Contingency (4%)',est:'$70K'},{label:'Total estimate',est:'$4.5M',bold:true}]},baseline:{id:'DP-EQ-RIV-BL1',date:'Apr 2025',total:'$1.62M',items:3,note:'Baseline at LOI — earthwork + foundation equipment'},delta:{added:1,value:'+$88K',reason:'Material handling scope expansion',links:[{label:'Tower crane (self-erect)',rowIdx:0}]}},
      cimarron:{margin:{id:'OPP-CIM-0412',date:'Mar 2025',rom:'$3.8M',note:'ROM for data center shell + MEP',lines:[{label:'Fleet + Pers Assets · owned deployment',est:'$680K'},{label:'Equipment Mgmt · re-rent sourcing & mgmt',est:'$1,040K'},{label:'Yard Mgd Fuel · fuel & consumables',est:'$290K'},{label:'CCEP · compliance & tracking',est:'$140K'},{label:'Contingency (2%)',est:'$50K'},{label:'Total estimate',est:'$3.8M',bold:true}]},baseline:{id:'DP-EQ-CIM-BL1',date:'May 2025',total:'$1.98M',items:2,note:'Baseline at NTP — data center shell and core equipment'},delta:{added:2,value:'+$220K',reason:'Generator + UPS scope added post-design',links:[{label:'Excavator 45K',rowIdx:0},{label:'Excavator 50T',rowIdx:1}]}}},
    logistics:{
      hercules:{margin:{id:'OPP-HRC-0221',date:'Jan 2025',rom:'$648K',note:'ROM logistics envelope',lines:[{label:'Transport & Warehouse · oversize hauls',est:'$180K'},{label:'GC/GR Svcs · crane mobilizations',est:'$220K'},{label:'Logistics General · permits, escorts & flagging',est:'$48K'},{label:'Contingency (7%)',est:'$32K'},{label:'Total estimate',est:'$648K',bold:true}]},baseline:{id:'DP-LOG-HRC-BL1',date:'Mar 2025',total:'$412K',items:5,note:'Baseline logistics plan at award'},delta:{added:1,value:'+$38K',reason:'Oversize crane move added',links:[{label:'BESS container placements',rowIdx:1}]}},
      riverside:{margin:{id:'OPP-RIV-0318',date:'Feb 2025',rom:'$216K',note:'ROM logistics envelope',lines:[{label:'Transport & Warehouse · oversize hauls',est:'$110K'},{label:'GC/GR Svcs · crane mobilizations',est:'$140K'},{label:'Logistics General · permits & escorts',est:'$30K'},{label:'Contingency (3%)',est:'$10K'},{label:'Total estimate',est:'$216K',bold:true}]},baseline:{id:'DP-LOG-RIV-BL1',date:'Apr 2025',total:'$254K',items:3,note:'Baseline at LOI'},delta:{added:0,value:'On baseline',reason:'No scope changes since baseline'}},
      cimarron:{margin:{id:'OPP-CIM-0412',date:'Mar 2025',rom:'$220K',note:'ROM logistics envelope',lines:[{label:'Transport & Warehouse · oversize hauls',est:'$140K'},{label:'GC/GR Svcs · crane mobilizations',est:'$140K'},{label:'Logistics General · permits & escorts',est:'$28K'},{label:'Contingency (4%)',est:'$12K'},{label:'Total estimate',est:'$220K',bold:true}]},draft:{id:'DP-LOG-CIM-D1',date:'Jul 2026',total:'$310K est.',items:2,note:'Demand plan is still in draft — waiting to be approved by an authorized user as the baseline.'}}},
    procurement:{
      hercules:{margin:{id:'OPP-HRC-0221',date:'Jan 2025',rom:'$7.6M',note:'ROM procurement scope',lines:[{label:'Equip - CFE · long-lead electrical (switchgear, transformers)',est:'$480K'},{label:'Sm Tools & Consum · structural & bulk materials',est:'$220K'},{label:'Equip - CFE · instrumentation & controls',est:'$160K'},{label:'Procure General · misc bulk & consumables',est:'$60K'},{label:'Total estimate',est:'$7.6M',bold:true}]},baseline:{id:'DP-PRO-HRC-BL1',date:'Mar 2025',total:'$840K',items:11,note:'Baseline at award — long-lead items locked'},delta:{added:2,value:'+$118K',reason:'Solar DC cabling + monitoring sensors added',links:[{label:'Solar DC cabling',rowIdx:11},{label:'Monitoring sensors',rowIdx:12}]}},
      riverside:{margin:{id:'OPP-RIV-0318',date:'Feb 2025',rom:'$2.3M',note:'ROM procurement scope',lines:[{label:'Equip - CFE · long-lead mechanical (pumps, AHU)',est:'$290K'},{label:'Sm Tools & Consum · structural & bulk materials',est:'$140K'},{label:'Procure General · misc bulk & consumables',est:'$80K'},{label:'Contingency (9%)',est:'$50K'},{label:'Total estimate',est:'$2.3M',bold:true}]},baseline:{id:'DP-PRO-RIV-BL1',date:'Apr 2025',total:'$498K',items:3,note:'Baseline at LOI'},delta:{added:1,value:'+$62K',reason:'Structural bolt order added',links:[{label:'Structural bolt package',rowIdx:3}]}},
      cimarron:{margin:{id:'OPP-CIM-0412',date:'Mar 2025',rom:'$1.5M',note:'ROM procurement scope',lines:[{label:'Equip - CFE · long-lead electrical (UPS, switchgear)',est:'$360K'},{label:'Sm Tools & Consum · structural & architectural',est:'$180K'},{label:'Equip - CFE · instrumentation & low-voltage',est:'$90K'},{label:'Procure General · contingency',est:'$50K'},{label:'Total estimate',est:'$1.5M',bold:true}]},baseline:{id:'DP-PRO-CIM-BL1',date:'May 2025',total:'$612K',items:4,note:'Baseline at NTP'},delta:{added:1,value:'+$58K',reason:'UPS bypass cable added',links:[{label:'UPS bypass cable assembly',rowIdx:4}]}}},
    prefab:{
      hercules:{margin:{id:'OPP-HRC-0221',date:'Jan 2025',rom:'$2.1M',note:'ROM prefab / structural scope',lines:[{label:'Steel · MFAB structural assemblies',est:'$480K'},{label:'Mechanical · ICWC pipe racks + pump skids',est:'$520K'},{label:'Electrical · MFAB / Houston e-houses',est:'$280K'},{label:'Prefab General · misc DfMA assemblies',est:'$120K'},{label:'Total estimate',est:'$2.1M',bold:true}]},baseline:{id:'DP-PFB-HRC-BL1',date:'Mar 2025',total:'$1.24M',items:5,note:'Baseline at award — structural + racking prefab'},delta:{added:1,value:'+$88K',reason:'Combiner box prefab added',links:[{label:'Combiner box prefab array',rowIdx:5}]}},
      riverside:{margin:{id:'OPP-RIV-0318',date:'Feb 2025',rom:'$288K',note:'ROM prefab / structural scope',lines:[{label:'Concrete · headwalls 8 units',est:'$360K'},{label:'Mechanical · ICWC MEP rack modules 6 units',est:'$320K'},{label:'Prefab General · misc architectural assemblies',est:'$140K'},{label:'Total estimate',est:'$288K',bold:true}]},baseline:{id:'DP-PFB-RIV-BL1',date:'Apr 2025',total:'$745K',items:3,note:'Baseline at LOI'},delta:{added:0,value:'On baseline',reason:'No scope changes since baseline'}},
      cimarron:{margin:{id:'OPP-CIM-0412',date:'Mar 2025',rom:'$180K',note:'ROM prefab scope',lines:[{label:'Electrical · MFAB / Houston cable tray & switchgear',est:'$420K'},{label:'Steel · MFAB partitions & enclosures',est:'$280K'},{label:'Mechanical · ICWC MEP modules',est:'$240K'},{label:'Total estimate',est:'$180K',bold:true}]},draft:{id:'DP-PFB-CIM-D1',date:'Jul 2026',total:'$910K est.',items:3,note:'Demand plan is still in draft — waiting to be approved by an authorized user as the baseline.'}}},
    profservices:{
      hercules:{margin:{id:'OPP-HRC-0221',date:'Jan 2025',rom:'$2.2M',note:'ROM professional services',lines:[{label:'Equip - OFE · engineering / IE support 2 FTE',est:'$480K'},{label:'VIZ · VDC / BIM coordination 3 FTE',est:'$340K'},{label:'BAS · BESS commissioning agent 2 FTE',est:'$620K'},{label:'Geospatial · site survey & geotech',est:'$180K'},{label:'Mapping · quality & special inspection',est:'$220K'},{label:'Pro Svcs General · contingency',est:'$260K'},{label:'Total estimate',est:'$2.2M',bold:true}]},baseline:{id:'DP-SVC-HRC-BL1',date:'Mar 2025',total:'$1.88M',items:5,note:'Baseline at award'},delta:{added:2,value:'+$145K',reason:'IE + commissioning FTEs added',links:[{label:"Owner's engineer / IE support",rowIdx:0},{label:'BESS commissioning agent',rowIdx:3}]}},
      riverside:{margin:{id:'OPP-RIV-0318',date:'Feb 2025',rom:'$576K',note:'ROM professional services',lines:[{label:'Equip - OFE · engineering support 2 FTE',est:'$280K'},{label:'BAS · MEP commissioning lead 1 FTE',est:'$480K'},{label:'Mapping · structural special inspection',est:'$220K'},{label:'Thermography · safety & environmental monitoring',est:'$180K'},{label:'Pro Svcs General · contingency',est:'$140K'},{label:'Total estimate',est:'$576K',bold:true}]},draft:{id:'DP-SVC-RIV-D1',date:'Jun 2026',total:'$1.24M est.',items:3,note:'Demand plan is still in draft — waiting to be approved by an authorized user as the baseline.'}},
      cimarron:{margin:{id:'OPP-CIM-0412',date:'Mar 2025',rom:'$380K',note:'ROM professional services',lines:[{label:'Equip - OFE · engineering support 2 FTE',est:'$360K'},{label:'BAS · IT / MEP commissioning 2 FTE',est:'$580K'},{label:'Mapping · testing & special inspection',est:'$240K'},{label:'VIZ · VDC coordination',est:'$180K'},{label:'Pro Svcs General · contingency',est:'$240K'},{label:'Total estimate',est:'$380K',bold:true}]},baseline:{id:'DP-SVC-CIM-BL1',date:'May 2025',total:'$1.42M',items:2,note:'Baseline at NTP'},delta:{added:1,value:'+$96K',reason:'Data center commissioning specialist added',links:[{label:'Commissioning manager',rowIdx:1}]}}}
    };
  var CC_CMIC_DATA={
    equipment:{
      hercules: {origBudget:3276000,  co:0,      pendingCO:0,      committed:2040000, spent:1729000, lastSync:'Aug 4, 2026', coNote:''},
      riverside:{origBudget:3528000,  co:0,      pendingCO:120000, committed:3032000, spent:2569000, lastSync:'Aug 1, 2026', coNote:'$120K pending CO — crane mob scope change'},
      cimarron: {origBudget:2998000,  co:0,      pendingCO:0,      committed:1929000, spent:1635000, lastSync:'Aug 2, 2026', coNote:''}
    },
    logistics:{
      hercules: {origBudget:594000,   co:0,      pendingCO:0,      committed:370000,  spent:314000,  lastSync:'Aug 4, 2026', coNote:''},
      riverside:{origBudget:199000,   co:0,      pendingCO:0,      committed:166000,  spent:141000,  lastSync:'Aug 1, 2026', coNote:''},
      cimarron: {origBudget:202000,   co:0,      pendingCO:0,      committed:179000,  spent:152000,  lastSync:'Aug 2, 2026', coNote:''}
    },
    procurement:{
      hercules: {origBudget:7416000,  co:40000,  pendingCO:0,      committed:4518000, spent:3829000, lastSync:'Aug 4, 2026', coNote:'+$40K bulk materials CO'},
      riverside:{origBudget:2152000,  co:62000,  pendingCO:0,      committed:1869000, spent:1584000, lastSync:'Aug 1, 2026', coNote:'+$62K structural bolt CO'},
      cimarron: {origBudget:1490000,  co:0,      pendingCO:58000,  committed:1319000, spent:1118000, lastSync:'Aug 2, 2026', coNote:'$58K pending CO — UPS bypass cable'}
    },
    profservices:{
      hercules: {origBudget:2016000,  co:0,      pendingCO:25000,  committed:1255000, spent:1064000, lastSync:'Aug 4, 2026', coNote:''},
      riverside:{origBudget:523000,   co:0,      pendingCO:0,      committed:438000,  spent:371000,  lastSync:'Aug 1, 2026', coNote:''},
      cimarron: {origBudget:346000,   co:0,      pendingCO:0,      committed:307000,  spent:260000,  lastSync:'Aug 2, 2026', coNote:''}
    },
    prefab:{
      hercules: {origBudget:1980000,  co:60000,  pendingCO:80000,  committed:1193000, spent:1011000, lastSync:'Aug 4, 2026', coNote:'+$60K structural assemblies CO'},
      riverside:{origBudget:276000,   co:0,      pendingCO:0,      committed:231000,  spent:196000,  lastSync:'Aug 1, 2026', coNote:''},
      cimarron: {origBudget:172000,   co:0,      pendingCO:0,      committed:152000,  spent:129000,  lastSync:'Aug 2, 2026', coNote:''}
    }
  };
  var CC_PREFAB_CAP={
  types:['mechanical','electrical','structural','misc','concrete'],
  typeLabel:{mechanical:'Mechanical',electrical:'Electrical',structural:'Structural Steel',misc:'Misc Steel',concrete:'Concrete'},
  typeColor:{mechanical:'#3b82f6',electrical:'#d97706',structural:'#4f46e5',misc:'#059669',concrete:'#ea580c'},
  baseline:{mechanical:3,electrical:2,structural:3,misc:4,concrete:2},
  plan:{
    hercules:[
      {item:'Prefab pipe rack modules',t:'mechanical',qty:'12 modules',mo:'Apr 1',fs:'May 15',fe:'Jul 25',shipD:5,status:'in_fab',p6Date:'2026-09-28',p6Act:'Pipe rack install — Sector 1',mfgWks:5},
      {item:'Modular e-houses (BESS)',t:'electrical',qty:'2 units',mo:'May 1',fs:'Jun 15',fe:'Oct 10',shipD:14,p6Date:'2026-10-31',p6Act:'BESS e-house commissioning',mfgWks:6},
      {item:'L2 headwall assemblies',t:'structural',qty:'4 units',mo:'Feb 15',fs:'Mar 15',fe:'Jun 5',shipD:5,p6Date:'2026-06-20',p6Act:'L2 headwall installation',mfgWks:3},
      {item:'Pump skid assemblies',t:'mechanical',qty:'6 skids',mo:'May 15',fs:'Jul 1',fe:'Sep 15',shipD:7,status:'in_fab',p6Date:'2026-10-05',p6Act:'Pump skid commissioning',mfgWks:4},
      {item:'Prefab cable tray runs',t:'electrical',qty:'Lot',mo:'May 15',fs:'Jun 15',fe:'Jul 20',shipD:5,p6Date:'2026-08-15',p6Act:'Cable tray installation',mfgWks:2},
      {item:'Electrical conduit add-scope',t:'electrical',qty:'Lot',mo:'Jun 1',fs:'Jul 15',fe:'Aug 20',shipD:5,adhoc:true,p6Date:'2026-09-05',p6Act:'Conduit rough-in — add scope',mfgWks:2}
    ],
    riverside:[
      {item:'Overhead MEP rack modules',t:'mechanical',qty:'6 modules',mo:'May 15',fs:'Jul 1',fe:'Aug 25',shipD:5,p6Date:'2026-09-10',p6Act:'Overhead MEP install — Level 2',mfgWks:4},
      {item:'L2 headwall assemblies',t:'structural',qty:'8 units',mo:'Mar 15',fs:'Apr 15',fe:'Jun 20',shipD:5,p6Date:'2026-07-05',p6Act:'Level 2 headwall installation',mfgWks:3},
      {item:'Stairwell prefab panels',t:'structural',qty:'4 panels',mo:'Jun 1',fs:'Aug 1',fe:'Sep 25',shipD:5,p6Date:'2026-10-20',p6Act:'Stairwell panel erection',mfgWks:2},
      {item:'Fire suppression header modules',t:'mechanical',qty:'2 units',mo:'Jun 15',fs:'Aug 15',fe:'Sep 20',shipD:5,adhoc:true,p6Date:'2026-10-01',p6Act:'Fire suppression header install',mfgWks:2}
    ],
    cimarron:[
      {item:'Cable tray brackets',t:'electrical',qty:'Lot',mo:'Jun 15',fs:'Aug 1',fe:'Sep 20',shipD:5,p6Date:'2026-10-10',p6Act:'Cable tray install — Server Hall',mfgWks:2},
      {item:'Server room partition panels',t:'misc',qty:'6 panels',mo:'Jun 1',fs:'Jul 15',fe:'Oct 10',shipD:7,status:'in_fab',p6Date:'2026-10-25',p6Act:'Server room partition erection',mfgWks:3},
      {item:'Generator exhaust enclosures',t:'misc',qty:'4 units',mo:'Jul 15',fs:'Sep 1',fe:'Nov 20',shipD:10,p6Date:'2026-12-15',p6Act:'Generator enclosure install',mfgWks:4},
      {item:'UPS battery cabinet frames',t:'electrical',qty:'6 units',mo:'Jul 1',fs:'Aug 1',fe:'Sep 15',shipD:7,adhoc:true,p6Date:'2026-10-05',p6Act:'UPS battery installation',mfgWks:3}
    ]
  },
  gaps:{
    hercules:[{t:'mechanical',start:'Jul 1',end:'Jul 25',note:'Pipe racks + pump skids concurrent \u2014 Mechanical at risk Jul\u2013Aug'}],
    riverside:[],
    cimarron:[{t:'misc',start:'Sep 1',end:'Oct 10',note:'Partition panels + enclosures concurrent \u2014 Misc Steel at risk Sep\u2013Oct'}]
  }
};

  var CC_LOGISTICS_CAP={
    typeLabel:{fence:'Temp fencing',trailer_office:'Office trailers',trailer_storage:'Storage trailers',dumpster:'Dumpsters',portable_power:'Portable power',hoisting:'Hoisting / rigging',transport:'Transport / haul'},
    typeColor:{fence:'#6366f1',trailer_office:'#0ea5e9',trailer_storage:'#14b8a6',dumpster:'#f59e0b',portable_power:'#ef4444',hoisting:'#8b5cf6',transport:'#64748b'},
    fleetOwned:{fence:80,trailer_office:8,trailer_storage:6,dumpster:15,portable_power:4,hoisting:2},
    plan:{
      hercules:[
        {item:'Perimeter temp fencing',cat:'fence',qty:'320 LF',start:'Jun 1',end:'Jan 15',state:'Deployed'},
        {item:'Office trailer complex',cat:'trailer_office',qty:'6 units',start:'Jun 15',end:'Jan 30',state:'Deployed'},
        {item:'Storage trailers',cat:'trailer_storage',qty:'3 units',start:'Jul 1',end:'Jan 15',state:'Planned'},
        {item:'Dumpster rotation',cat:'dumpster',qty:'4 units',start:'Jun 1',end:'Jan 30',state:'Active'},
        {item:'Portable power (generator set)',cat:'portable_power',qty:'1 unit',start:'Jun 1',end:'Dec 15',state:'Deployed'},
        {item:'Excavator demob',cat:'transport',qty:'2 units',start:'Jun 1',end:'Jun 5',state:'Scheduled'},
        {item:'Tower crane mobilization',cat:'hoisting',qty:'1 move',start:'Aug 1',end:'Aug 10',state:'Scheduled'},
        {item:'Pipe rack transport',cat:'transport',qty:'2 loads',start:'Aug 10',end:'Aug 14',state:'Projected'},
        {item:'BESS container placements',cat:'hoisting',qty:'6 moves',start:'Oct 1',end:'Oct 20',state:'Requested'},
        {item:'PV modules site delivery',cat:'transport',qty:'Bulk lot',start:'Oct 15',end:'Nov 20',state:'Projected'},
        {item:'MV switchgear delivery',cat:'transport',qty:'2 pieces',start:'Nov 1',end:'Nov 5',state:'Pending'}
      ],
      riverside:[
        {item:'Temp fencing (phased)',cat:'fence',qty:'200 LF',start:'Jul 1',end:'Nov 30',state:'Planned'},
        {item:'Office trailer (3-unit)',cat:'trailer_office',qty:'3 units',start:'Jul 15',end:'Dec 15',state:'Planned'},
        {item:'Storage trailer',cat:'trailer_storage',qty:'2 units',start:'Aug 1',end:'Dec 1',state:'Planned'},
        {item:'Dumpster service',cat:'dumpster',qty:'2 units',start:'Jul 1',end:'Nov 30',state:'Planned'},
        {item:'Tower crane mobilization',cat:'hoisting',qty:'1 move',start:'Aug 1',end:'Aug 8',state:'Scheduled'},
        {item:'Excavator delivery',cat:'transport',qty:'1 move',start:'Sep 1',end:'Sep 5',state:'Scheduled'},
        {item:'Floor-by-floor hoisting',cat:'hoisting',qty:'8 lifts/mo',start:'Jul 1',end:'Dec 15',state:'On-rent'}
      ],
      cimarron:[
        {item:'Security fencing perimeter',cat:'fence',qty:'480 LF',start:'Aug 1',end:'Feb 28',state:'Planned'},
        {item:'Office trailers (4-unit)',cat:'trailer_office',qty:'4 units',start:'Aug 15',end:'Feb 28',state:'Planned'},
        {item:'Storage trailers',cat:'trailer_storage',qty:'2 units',start:'Sep 1',end:'Feb 1',state:'Planned'},
        {item:'Portable power',cat:'portable_power',qty:'1 unit',start:'Aug 1',end:'Jan 31',state:'Planned'},
        {item:'Excavator delivery + haul',cat:'transport',qty:'2 moves',start:'Sep 1',end:'Sep 8',state:'Scheduled'},
        {item:'PDU site delivery',cat:'transport',qty:'3 loads',start:'Oct 1',end:'Oct 5',state:'PO issued'},
        {item:'Precision cooling delivery',cat:'transport',qty:'16 units',start:'Nov 1',end:'Nov 15',state:'Projected'}
      ]
    },
    moveEvents:{
      hercules:[{week:'Jun 1',events:6,note:'Initial mob · fencing + trailers + generator'},{week:'Aug 1',events:5,note:'Crane mob + pipe rack hauls'},{week:'Oct 1',events:7,note:'BESS placements + PV delivery — peak'},{week:'Jan 15',events:5,note:'Demob wave'}],
      riverside:[{week:'Jul 1',events:4},{week:'Aug 1',events:3,note:'Crane mob'},{week:'Nov 30',events:4,note:'Full demob'}],
      cimarron:[{week:'Aug 1',events:4,note:'Mob wave'},{week:'Oct 1',events:5,note:'PDU + cooling delivery'},{week:'Feb 28',events:5,note:'Final demob'}]
    },
    moveCapacity:12,
    gaps:{hercules:[{cat:'hoisting',note:'Oct move-event load peaks at 7 — near crew capacity of 12/wk'}],riverside:[],cimarron:[]}
  };
  var CC_PROFSERVICES_CAP={
    scopeLabel:{ie:'Industrial Engineering',vdc:'VDC / BIM',pm:'Project Management',commissioning:'Commissioning',survey:'Survey & Inspection',qa:'QA / Quality'},
    scopeColor:{ie:'#3b82f6',vdc:'#8b5cf6',pm:'#0ea5e9',commissioning:'#10b981',survey:'#f59e0b',qa:'#f97316'},
    internalFTE:{ie:2,vdc:3,pm:4,commissioning:2,survey:1,qa:2},
    plan:{
      hercules:[
        {scope:'ie',label:"Owner's engineer / IE support",fte:2,start:'Mar 1',end:'Dec 15',status:'active',sow:'SOW-HRC-IE-01'},
        {scope:'survey',label:'Geotechnical inspection',fte:3,start:'Mar 1',end:'Aug 15',status:'active',sow:'SOW-HRC-GEO-01'},
        {scope:'survey',label:'Structural special inspection',fte:2,start:'Jun 1',end:'Feb 28',status:'active',sow:'SOW-HRC-INS-01'},
        {scope:'commissioning',label:'BESS commissioning agent',fte:2,start:'Nov 1',end:'Mar 15',status:'sow_pending'},
        {scope:'qa',label:'Environmental / SWPPP monitoring',fte:1,start:'Mar 1',end:'May 15',status:'demobilized',sow:'SOW-HRC-ENV-01'},
        {scope:'vdc',label:'VDC / BIM coordination',fte:3,start:'Apr 1',end:'Oct 15',status:'requested'},
        {scope:'survey',label:'Site survey crew',fte:2,start:'Apr 1',end:'Jul 15',status:'demobilized',sow:'SOW-HRC-SUR-01'}
      ],
      riverside:[
        {scope:'pm',label:"Owner's rep",fte:1,start:'Jun 1',end:'Dec 31',status:'active',sow:'SOW-RIV-PM-01'},
        {scope:'survey',label:'Structural special inspection',fte:2,start:'Aug 1',end:'Dec 31',status:'requested'},
        {scope:'commissioning',label:'MEP commissioning lead',fte:1,start:'Nov 1',end:'Dec 30',status:'sow_pending'}
      ],
      cimarron:[
        {scope:'survey',label:'Site survey crew',fte:2,start:'Jul 1',end:'Sep 30',status:'requested'},
        {scope:'commissioning',label:'Commissioning manager',fte:1,start:'Dec 1',end:'Mar 31',status:'sow_pending'},
        {scope:'qa',label:'Material testing lab',fte:2,start:'Jul 1',end:'Feb 28',status:'active',sow:'SOW-CIM-QA-01'}
      ]
    },
    gaps:{
      hercules:[{scope:'commissioning',note:'BESS commissioning SOW not yet executed — risk if Oct start slips'},{scope:'vdc',note:'VDC / BIM unpriced — needed Apr–Oct'}],
      riverside:[{scope:'commissioning',note:'MEP commissioning resource not confirmed — SOW needed by Sep'}],
      cimarron:[]
    }
  };
  var CC_PROCUREMENT_CAP={
    catLabel:{sm_tools:'Small Tools & Consumables',elec_commodity:'Electrical Commodity',mech_commodity:'Mechanical Commodity',struct_steel:'Structural Steel',safety:'Safety Supplies',concrete:'Concrete / Masonry'},
    state:{
      hercules:{
        sm_tools:{hasInventory:true,poIssued:true,note:'Stocked; reorder trigger at 20%'},
        elec_commodity:{hasInventory:false,poIssued:false,note:'PO pending final takeoff; long-lead items at risk'},
        struct_steel:{hasInventory:false,poIssued:false,note:'No agreement — sourcing needed'}
      },
      riverside:{
        sm_tools:{hasInventory:true,poIssued:true},
        safety:{hasInventory:true,poIssued:true},
        struct_steel:{hasInventory:false,poIssued:false,note:'Local supplier TBD'},
        concrete:{hasInventory:false,poIssued:false,note:'Local supplier TBD'},
        elec_commodity:{hasInventory:false,poIssued:false},
        mech_commodity:{hasInventory:false,poIssued:false}
      },
      cimarron:{
        sm_tools:{hasInventory:true,poIssued:true},
        elec_commodity:{hasInventory:false,poIssued:false,note:'High-voltage switchgear — confirm spec before PO'},
        mech_commodity:{hasInventory:false,poIssued:false},
        struct_steel:{hasInventory:false,poIssued:false,note:'No agreement — sourcing in progress'},
        concrete:{hasInventory:false,poIssued:false},
        safety:{hasInventory:true,poIssued:true}
      }
    }
  };
  var CC_DP={
    equipment:{ mount:'ccDpEquip', title:'Equipment demand plan', icon:'box', decCol:'Sourcing',
      kpis:[{k:'Active projects',v:'3',sub:'hercules \u00b7 riverside \u00b7 cimarron',tone:'ok',icon:'proj'},{k:'Planned value',v:'$18.4M',sub:'equipment \u00b7 portfolio',tone:'ok',icon:'dollar'},{k:'Awaiting taxonomy',v:'0',sub:'need confirmation',tone:'warn',icon:'tax',dyn:'tax'},{k:'Owned coverage',v:'67%',sub:'vs re-rent',tone:'ok',icon:'chart'}],
      ns:'Equipment carries the messiest taxonomy \u2014 every rental vendor names classes differently. 02S auto-maps each incoming request to the canonical class and flags the ones that need a human confirm before they can be priced and allocated. Aerial peaks at 82 units in October, mostly coverable from idle owned fleet.',
      cap:'Every project\u2019s equipment demand, aggregated. 02S confirms each request against the canonical taxonomy, then releases it to the Fulfillment queue for the owned vs re-rent decision.',
      rows:[
        {id:'REQ-4479',asset:'2\u00d7 excavator, 50-ton \u00b7 dual aux + GPS',project:'Cimarron Data Center',tax:'Asset \u203a Earthmoving \u203a Excavator',taxOk:false,mapLeaf:'50-ton',conf:'94',leafOpts:['30-ton','45-55T','50-ton','80-ton'],dec:'Use owned',decTone:'ok',status:'Needs map',attrs:['Dual aux','GPS RTK','Mesh track','Cat 390F']},
        {id:'REQ-4471',asset:'5\u00d7 tower crane \u00b7 self-erect, ~250 ft',project:'Riverside Medical Center',tax:'Asset \u203a Lifting \u203a Tower crane',taxOk:false,mapLeaf:'Self-erect',conf:'88',leafOpts:['Self-erect','Flat-top','Luffing-jib','Hammerhead'],dec:'Re-rent',decTone:'info',status:'Needs map',attrs:['Self-erect','250 ft reach','Remote pendant']},
        {id:'REQ-4472',asset:'4\u00d7 excavator \u00b7 45K class',project:'Cimarron Data Center',tax:'Asset \u203a Earthmoving \u203a Excavator',taxOk:true,leaf:'45-55T',dec:'Use owned',decTone:'ok',status:'Ready',attrs:['GPS grade control','45K class','Crawler track']}
      ],
      rollCols:['Category','Peak units','Peak month','vs plan'],
      roll:[{a:'Earthmoving',b:'26',c:'Jul 2026',v:'+4 over',vt:'warn'},{a:'Cranes',b:'3',c:'Aug 2026',v:'on plan',vt:'ok'},{a:'Aerial',b:'82',c:'Oct 2026',v:'+14 over',vt:'warn'}],
      varSummary:'Aerial running 14 units over plan for October \u2014 the main portfolio driver.',
      consol:{save:'~$62K',cta:'Consolidate aerial',detail:'Aerial demand overlaps all three projects and peaks at 82 units in October, 14 over plan. Consolidate into one fleet re-rent rate instead of per-project spot rentals.'} },
    logistics:{ mount:'ccDpLog', title:'Logistics demand plan', icon:'truck', decCol:'Delivery',
      kpis:[{k:'Active projects',v:'3',sub:'hercules \u00b7 riverside \u00b7 cimarron',tone:'ok',icon:'proj'},{k:'Moves this month',v:'18',sub:'across the portfolio',tone:'ok',icon:'truck'},{k:'Awaiting taxonomy',v:'0',sub:'need confirmation',tone:'ok',icon:'tax',dyn:'tax'},{k:'Heavy hauls',v:'3',sub:'permit required',tone:'warn',icon:'warn'}],
      ns:'02S auto-generates most logistics events from delivery dates across the equipment, procurement, and prefab plans. Three oversize heavy hauls need permits, and a north-gate conflict on Oct 15 (switchgear haul vs tower-crane mobilization) is flagged for resequencing.',
      cap:'Every project\u2019s move demand, aggregated \u2014 deliveries, heavy hauls, and crane mobilizations. 02S schedules windows, gates, and permits; the supply side is executed downstream in logistics.',
      rows:[
        {id:'REQ-L-3042',asset:'Excavator delivery + haul \u00b7 oversize',project:'Cimarron Data Center',tax:'Logistics \u203a Transport \u203a Heavy haul',taxOk:true,leaf:'Oversize',dec:'Self-perform',decTone:'ok',status:'Scheduled'},
        {id:'REQ-L-3054',asset:'Tower crane mobilization \u00b7 oversize transport',project:'Riverside Medical Center',tax:'Logistics \u203a Transport \u203a Mobilization',taxOk:true,leaf:'Oversize transport',dec:'3PL',decTone:'info',status:'Scheduled'},
        {id:'REQ-L-3061',asset:'BESS container placement \u00b7 haul + crane',project:'Hercules Solar + BESS',tax:'Logistics \u203a Transport \u203a Oversize',taxOk:true,leaf:'Haul + crane',dec:'3PL',decTone:'info',status:'Requested'}
      ],
      rollCols:['Move type','Peak count','Peak month','vs plan'],
      roll:[{a:'Deliveries',b:'24',c:'Sep 2026',v:'on plan',vt:'ok'},{a:'Heavy hauls',b:'3',c:'Oct 2026',v:'+1 over',vt:'warn'},{a:'Crane mobilizations',b:'2',c:'Aug 2026',v:'on plan',vt:'ok'}],
      varSummary:'Heavy hauls one over plan \u2014 3 route to the same corridor within a week.',
      consol:{save:'~$18K + 1 permit',cta:'Combine hauls',detail:'3 heavy hauls route to the same corridor (Cimarron + Riverside) within one week. Combine permits and carrier into a single mobilization.'} },
    profservices:{ mount:'ccDpSvc', title:'Professional services demand plan', icon:'people', decCol:'Pricing',
      kpis:[{k:'Active projects',v:'3',sub:'hercules \u00b7 riverside \u00b7 cimarron',tone:'ok',icon:'proj'},{k:'Active FTEs',v:'18',sub:'across 8 firms',tone:'ok',icon:'people'},{k:'Needs pricing',v:'2',sub:'specialty roles unquoted',tone:'warn',icon:'tax'},{k:'Committed',v:'$3.2M',sub:'services · portfolio',tone:'ok',icon:'dollar'}],
      ns:'02S maps each role to the canonical service taxonomy and to the CPM schedule — the BESS commissioning agent mobilizes as containers land, and unpriced specialty roles are flagged before they’re needed on site.',
      cap:'Every project’s professional-services demand, aggregated by discipline. Standard roles are priced from the 02S rate card; specialty roles are quoted before mobilization.',
      rows:[
        {id:'REQ-S-2101',asset:'Owner’s engineer / IE support · 2 FTE',project:'Hercules Solar + BESS',tax:'Services › Engineering › Owner’s engineer',taxOk:true,leaf:'IE support',dec:'Rate card',decTone:'ok',status:'Active'},
        {id:'REQ-S-2116',asset:'VDC / BIM coordination · 3 FTE',project:'Hercules Solar + BESS',tax:'Services › VDC › BIM coordination',taxOk:true,leaf:'BIM',dec:'Needs quote',decTone:'warn',status:'Awaiting pricing'},
        {id:'REQ-S-2108',asset:'BESS commissioning agent · 2 FTE',project:'Hercules Solar + BESS',tax:'Services › Commissioning › BESS',taxOk:true,leaf:'BESS',dec:'Quoted',decTone:'info',status:'Projected'},
        {id:'REQ-S-2114',asset:'Structural special inspection · 2 FTE',project:'Riverside Medical Center',tax:'Services › Inspection › Structural',taxOk:true,leaf:'Structural',dec:'Rate card',decTone:'ok',status:'Active'},
        {id:'REQ-S-2117',asset:'Safety officer — dedicated · 1 FTE',project:'Riverside Medical Center',tax:'Services › Safety › Dedicated officer',taxOk:true,leaf:'Dedicated',dec:'Rate card',decTone:'ok',status:'Active'},
        {id:'REQ-S-2115',asset:'Construction survey crew · 2 FTE',project:'Cimarron Data Center',tax:'Services › Survey › Construction survey',taxOk:true,leaf:'Licensed PLS',dec:'Rate card',decTone:'ok',status:'Active'},
        {id:'REQ-S-2118',asset:'Environmental compliance · 1 FTE',project:'Cimarron Data Center',tax:'Services › Environmental › SWPPP',taxOk:true,leaf:'SWPPP',dec:'Rate card',decTone:'ok',status:'Active'}
      ],
      rollCols:['Discipline','Peak FTE','Peak period','vs plan'],
      roll:[{a:'Engineering',b:'5 FTE',c:'ongoing',v:'on plan',vt:'ok'},{a:'Survey & monitoring',b:'4 FTE',c:'Q3 2026',v:'on plan',vt:'ok'},{a:'VDC / BIM',b:'3 FTE',c:'Q3 2026',v:'+1 FTE',vt:'warn'},{a:'Commissioning',b:'3 FTE',c:'Q4 2026',v:'on plan',vt:'ok'},{a:'Safety & inspection',b:'3 FTE',c:'ongoing',v:'on plan',vt:'ok'}],
      varSummary:'VDC / BIM one FTE over plan — two projects have overlapping coordination windows.',
      consol:{save:'~$40K/qtr',cta:'Blend inspection',detail:'Structural inspection demand overlaps Riverside and Cimarron. One firm can cover both projects at a blended MSA rate.'} },
    procurement:{ mount:'ccDpProc', title:'Procurement demand plan', icon:'cart', decCol:'Order-by (lead)',
      kpis:[{k:'Active projects',v:'3',sub:'hercules \u00b7 riverside \u00b7 cimarron',tone:'ok',icon:'proj'},{k:'Long-lead items',v:'5',sub:'12\u201330 wk lead times',tone:'warn',icon:'clock'},{k:'Awaiting taxonomy',v:'0',sub:'need confirmation',tone:'ok',icon:'tax',dyn:'tax'},{k:'At-risk',v:'2',sub:'order-by passed',tone:'bad',icon:'warn'}],
      ns:'02S back-calculates every order-by date from lead time and the schedule need-by \u2014 two long-lead items (switchgear, BESS containers) are already past order-by and flagged red; releasing the switchgear PO this week recovers the substation date.',
      cap:'Major materials with 12\u201330-week lead times, aggregated across the portfolio. Distinct from field small-tools procurement (managed in each project portal). Order-by dates are back-calculated from schedule need-by; the pillar signal is order-by risk.',
      rows:[
        {id:'REQ-P-0501',asset:'MV switchgear \u00b7 15kV lineup \u00b7 qty 2',project:'Hercules Solar + BESS',tax:'Material \u203a Electrical \u203a Switchgear',taxOk:true,leaf:'15kV',dec:'May 1 \u00b7 24 wk',decTone:'bad',status:'At-risk'},
        {id:'REQ-P-0508',asset:'BESS containers \u00b7 2.5 MWh \u00b7 qty 6',project:'Hercules Solar + BESS',tax:'Material \u203a Energy storage \u203a BESS',taxOk:true,leaf:'2.5 MWh',dec:'May 15 \u00b7 30 wk',decTone:'bad',status:'At-risk'},
        {id:'REQ-P-0512',asset:'Main power transformer \u00b7 qty 1',project:'Hercules Solar + BESS',tax:'Material \u203a Electrical \u203a Transformer',taxOk:true,leaf:'MPT',dec:'Apr 15 \u00b7 28 wk',decTone:'neu',status:'PO issued'},
        {id:'REQ-P-0621',asset:'Surgical fixture hardware \u00b7 specialty',project:'Riverside Medical Center',tax:'Material \u203a Specialty \u203a Medical fixture',taxOk:true,leaf:'Medical',dec:'Rate card',decTone:'ok',status:'Requested'},
        {id:'REQ-P-0622',asset:'Fire suppression heads \u00b7 qty 40',project:'Riverside Medical Center',tax:'Material \u203a Life safety \u203a Suppression',taxOk:true,leaf:'Wet pipe',dec:'Rate card',decTone:'ok',status:'Ordered'},
        {id:'REQ-P-0631',asset:'Server rack power strips \u00b7 qty 120',project:'Cimarron Data Center',tax:'Material \u203a Electrical \u203a PDU',taxOk:true,leaf:'PDU',dec:'Rate card',decTone:'ok',status:'Ordered'},
        {id:'REQ-P-0632',asset:'Grounding bus bars \u00b7 lot',project:'Cimarron Data Center',tax:'Material \u203a Electrical \u203a Grounding',taxOk:true,leaf:'Grounding',dec:'Rate card',decTone:'ok',status:'PO issued'}
      ],
      rollCols:['Category','Committed','Order window','vs plan'],
      roll:[{a:'Electrical & HV',b:'$8.1M',c:'Q2–Q4 2026',v:'+$0.3M',vt:'warn'},{a:'Mechanical systems',b:'$820K',c:'Q3 2026',v:'on plan',vt:'ok'},{a:'Tools & consumables',b:'$69K',c:'Q2–Q3 2026',v:'on plan',vt:'ok'},{a:'Structural materials',b:'$62K',c:'Q3 2026',v:'on plan',vt:'ok'}],
      varSummary:'Electrical & HV $0.3M over plan — BESS containers and MV switchgear same OEM across two projects.',
      consol:{save:'~$110K + 2 wk',cta:'Combine POs',detail:'Switchgear and transformer share the same OEM across two projects. Combine POs to hit the next volume tier and shorten lead time.'} },
    prefab:{ mount:'ccDpPrefab', title:'Pre-fab demand plan', icon:'layers', decCol:'Stage',
      kpis:[{k:'Active projects',v:'3',sub:'hercules \u00b7 riverside \u00b7 cimarron',tone:'ok',icon:'proj'},{k:'Assemblies planned',v:'32',sub:'5 assembly types',tone:'ok',icon:'layers'},{k:'Awaiting taxonomy',v:'0',sub:'need confirmation',tone:'ok',icon:'tax',dyn:'tax'},{k:'On-track to need date',v:'4 of 5',sub:'1 awaiting submittal',tone:'warn',icon:'chart'}],
      ns:'02S ties each assembly\u2019s submittal \u2192 fabrication \u2192 delivery back to its install date \u2014 the BESS e-houses need submittal approval this week to protect November energization.',
      cap:'Every project\u2019s prefab demand, aggregated. Assemblies are made-to-order, so pricing is quoted by 02S after submittal; the pillar signal is fabrication stage.',
      rows:[
        {id:'REQ-F-021',asset:'Prefab pipe rack modules \u00b7 qty 12',project:'Hercules Solar + BESS',tax:'Assembly \u203a Mechanical \u203a Pipe rack',taxOk:true,leaf:'Pipe rack',dec:'In fab',decTone:'info',status:'In fabrication'},
        {id:'REQ-F-034',asset:'Modular e-houses \u00b7 BESS \u00b7 qty 2',project:'Hercules Solar + BESS',tax:'Assembly \u203a Electrical \u203a E-house',taxOk:true,leaf:'E-house',dec:'Submittal',decTone:'info',status:'Submittal'},
        {id:'REQ-F-041',asset:'L2 headwall assemblies \u00b7 qty 8',project:'Riverside Medical Center',tax:'Assembly \u203a Structural \u203a Headwall',taxOk:true,leaf:'Headwall',dec:'Delivered',decTone:'ok',status:'Delivered'},
        {id:'REQ-F-042',asset:'Skid-mounted pump assemblies \u00b7 qty 4',project:'Hercules Solar + BESS',tax:'Assembly \u203a Mechanical \u203a Pump skid',taxOk:true,leaf:'Pump skid',dec:'In fab',decTone:'info',status:'In fabrication'},
        {id:'REQ-F-051',asset:'Cable tray bracket assemblies \u00b7 lot',project:'Cimarron Data Center',tax:'Assembly \u203a Electrical \u203a Cable tray',taxOk:true,leaf:'Cable tray',dec:'Needs quote',decTone:'warn',status:'Awaiting pricing'},
        {id:'REQ-F-052',asset:'Server room partition panels \u00b7 qty 6',project:'Cimarron Data Center',tax:'Assembly \u203a Structural \u203a Partition',taxOk:true,leaf:'Partition',dec:'In fab',decTone:'info',status:'In fabrication'}
      ],
      rollCols:['Assembly type','Active items','Capacity status','Peak conflict'],
      roll:[{a:'Mechanical',b:'2 active',c:'\u26a0 At risk Jul\u2013Aug',v:'Pipe racks + pump skids',vt:'warn'},{a:'Electrical',b:'2 active',c:'On plan',v:'BESS e-houses + cable tray',vt:'ok'},{a:'Structural Steel',b:'1 active',c:'On plan',v:'Headwall assemblies',vt:'ok'},{a:'Misc Steel',b:'1 active',c:'On plan',v:'On plan',vt:'ok'},{a:'Concrete',b:'\u2014',c:'\u2014',v:'No demand',vt:'neu'}],
      varSummary:'Mechanical at risk Jul\u2013Aug (Hercules concurrent orders) \u00b7 Misc Steel at risk Oct (Cimarron overlap)',
      consol:{save:'~$35K',cta:'Batch fab run',detail:'E-house and structural assemblies can share one fab-shop slot. Batch the run to cut setup cost and protect the November date.'} }
  };
  var _PROJ_NAMES={'hercules':'Hercules Solar + BESS','riverside':'Riverside Medical Center','cimarron':'Cimarron Data Center'};
  var CC_PROJ_DP={
    equipment:{
      hercules:{budget:4200000,dpSpent:3800000,adHoc:400000,
      rollCols:['Category','Peak units','Peak month','vs plan'],roll:[{a:'Power & lighting',b:'42 units',c:'Mar\u2013Dec 2026',v:'on plan',vt:'ok'},{a:'Earthmoving',b:'20 units',c:'Mar\u2013Sep 2026',v:'on plan',vt:'ok'},{a:'Telehandlers',b:'40 units',c:'Apr\u2013Dec 2026',v:'on plan',vt:'ok'},{a:'Cranes',b:'1 unit',c:'Oct 2026',v:'Requested',vt:'warn'}],varSummary:'Crawler crane (230T) requested for Oct \u2014 sourcing in fulfillment queue.',rows:[
        {item:'Generator 125 kW',qty:'16 units',window:'Mar–Dec 2026',state:'On-rent',ordId:'ORD-3110',cost:'$3,200/mo',firm:'Aggreko',note:'All 16 units active; 5 units cycling off Nov per phased-completion plan.',attachments:[{type:'Engineering',name:'Rental agreement — Aggreko master services',ref:'RA-3110-001',status:'Executed'},{type:'Safety',name:'Equipment inspection record — 125 kW generators',ref:'EIR-3110-001',status:'Current'},{type:'Safety',name:'Site-specific hazard assessment',ref:'SSHA-3110-001',status:'Approved'}]},
        {item:'Light tower',qty:'26 units',window:'Mar–Dec 2026',state:'On-rent',ordId:'ORD-3111',cost:'$2,600/mo',firm:'United Rentals'},
        {item:'Excavator 20T',qty:'6 units',window:'Mar–May 2026',state:'Off-rent',ordId:'ORD-3042',cost:'$7,200/mo',firm:'Sunbelt',note:'Off-rent as of Jun 2026. Final invoice confirmed, $3K dispute resolved with credit applied.'},
        {item:'Dozer D6',qty:'12 units',window:'Mar–Sep 2026',state:'On-rent',ordId:'ORD-3112',cost:'$14,400/mo',firm:'CAT Financial'},
        {item:'Motor grader',qty:'6 units',window:'Mar–Jun 2026',state:'Off-rent',ordId:'ORD-3113',cost:'$9,600/mo',firm:'Sunbelt'},
        {item:'Compaction roller',qty:'12 units',window:'Mar–Sep 2026',state:'On-rent',ordId:'ORD-3114',cost:'$12,000/mo',firm:'Volvo Rents'},
        {item:'Hydraulic pile driver (Sector 1)',qty:'6 units',window:'May–Sep 2026',state:'On-rent',ordId:'ORD-3093',cost:'$18,000/mo',firm:'ALL Crane'},
        {item:'Hydraulic pile driver (Sector 2)',qty:'6 units',window:'Aug–Dec 2026',state:'On-rent',ordId:'ORD-3115',cost:'$18,000/mo',firm:'ALL Crane'},
        {item:'Scissor lift 32 ft',qty:'2 units',window:'May 2026',state:'On-rent',ordId:'ORD-3031',cost:'$3,800/mo',firm:'United Rentals',note:'Anticipated off-rent May 15 — no return request on file. Flagged overdue.'},
        {item:'Telehandler 10K (Sector 1)',qty:'16 units',window:'Apr–Dec 2026',state:'On-rent',ordId:'ORD-3029',cost:'$19,200/mo',firm:'JLG'},
        {item:'Telehandler 10K (Sector 2)',qty:'24 units',window:'Aug–Dec 2026',state:'Projected',ordId:'ORD-3121',cost:'$28,800/mo',firm:'JLG'},
        {item:'Boom lift 60 ft',qty:'18 units',window:'Sep–Dec 2026',state:'Projected',ordId:'ORD-3122',cost:'$27,000/mo',firm:'United Rentals'},
        {item:'Tower crane 250T',qty:'1 unit',window:'Nov 2026+',state:'Projected',ordId:null,cost:'$68,000/mo',firm:'TBD'},
        {item:'Crawler crane 230T',qty:'1 unit',window:'Oct 2026',state:'Requested',ordId:null,cost:'$58,000/mo',firm:'Maxim Crane',fqRef:'REQ-4473',attachments:[{type:'Engineering',name:'Equipment specification sheet — 230T crawler crane',ref:'SPEC-230T-001',status:'Available'},{type:'Safety',name:'Ground bearing report — Sector 1 crane pad',ref:'GBR-3071-001',status:'Approved'},{type:'Engineering',name:'Lift plan — main transformer set',ref:'LP-230T-001',status:'Draft'}]},
        {item:'Scissor lift 32 ft',qty:'8 units',window:'Oct–Dec 2026',state:'Projected',ordId:null,cost:'$7,600/mo',firm:'TBD'},
        {item:'Forklift 10K',qty:'4 units',window:'Oct 2026+',state:'Projected',ordId:null,cost:'$2,400/mo',firm:'TBD'}
      ]},
      riverside:{budget:2100000,dpSpent:800000,adHoc:900000,
      rollCols:['Category','Peak units','Peak month','vs plan'],roll:[{a:'Aerial / lifts',b:'24 units',c:'Aug 2026',v:'Requested',vt:'warn'},{a:'Cranes',b:'1 unit',c:'Aug 2026',v:'on plan',vt:'ok'},{a:'Earthmoving',b:'2 units',c:'Jul\u2013Oct 2026',v:'on plan',vt:'ok'}],varSummary:'5\u00d7 tower crane + 12\u00d7 scissor lift requests pending sourcing decision.',rows:[
        {item:'Tower crane (self-erect)',qty:'5 units',window:'Aug 2026+',state:'Requested',ordId:null,cost:'$88K',firm:'TBD',fqRef:'REQ-4471'},
        {item:'Scissor lift 32 ft',qty:'12 units',window:'Aug 2026+',state:'Requested',ordId:null,cost:'$8,400/mo',firm:'TBD',fqRef:'REQ-4474'},
        {item:'Forklift 5K',qty:'4 units',window:'Ongoing',state:'On-rent',ordId:'ORD-3123',cost:'$4,000/mo',firm:'Sunbelt'},
        {item:'Excavator 20T',qty:'2 units',window:'Jul–Oct 2026',state:'On-rent',ordId:'ORD-3124',cost:'$14,400/mo',firm:'United Rentals'}
      ]},
      cimarron:{budget:1800000,dpSpent:600000,adHoc:600000,
      rollCols:['Category','Peak units','Peak month','vs plan'],roll:[{a:'Aerial / lifts',b:'70 units',c:'Oct 2026',v:'+14 over',vt:'warn'},{a:'Earthmoving',b:'6 units',c:'Sep 2026+',v:'+2 over',vt:'warn'},{a:'Compaction',b:'4 units',c:'ongoing',v:'on plan',vt:'ok'}],varSummary:'Aerial 14 over plan at peak \u2014 4 excavator requests pending. Consolidation opportunity.',rows:[
        {item:'Excavator 45K',qty:'4 units',window:'Sep 2026+',state:'Requested',ordId:null,cost:'$48,000/mo',firm:'TBD',fqRef:'REQ-4472'},
        {item:'Excavator 50T',qty:'2 units',window:'Sep 2026+',state:'Requested',ordId:null,cost:'$28,000/mo',firm:'TBD',fqRef:'REQ-4479'},
        {item:'Compaction roller',qty:'4 units',window:'Ongoing',state:'On-rent',ordId:'ORD-3125',cost:'$6,400/mo',firm:'Volvo Rents'},
        {item:'Motor grader',qty:'2 units',window:'Ongoing',state:'On-rent',ordId:'ORD-3126',cost:'$9,600/mo',firm:'CAT Financial'}
      ]}
    },
    logistics:{
      hercules:{budget:1200000,dpSpent:800000,adHoc:300000,
      rollCols:['Move type','Peak count','Peak month','vs plan'],roll:[{a:'Deliveries',b:'3 moves',c:'Aug\u2013Nov 2026',v:'on plan',vt:'ok'},{a:'Heavy hauls',b:'1 move',c:'Oct 2026',v:'on plan',vt:'ok'},{a:'Crane mobilizations',b:'1',c:'Aug 2026',v:'on plan',vt:'ok'}],varSummary:'BESS container placements (6 moves) unscheduled for Oct \u2014 confirm logistics provider.',rows:[
        {item:'Tower crane mobilization',qty:'1 move',window:'Aug 2026',state:'Scheduled',ordId:'ORD-3071',cost:'$18,500',firm:'Bragg Crane',attachments:[{type:'Safety',name:'Lift plan — tower crane mobilization Aug 2026',ref:'LP-3071-001',status:'Approved'},{type:'Shipping',name:'Haul route map — oversize crane transport',ref:'HR-3071-001',status:'Approved'},{type:'Safety',name:'Traffic control plan',ref:'TCP-3071-001',status:'Approved'}]},
        {item:'BESS container placements',qty:'6 moves',window:'Oct 2026',state:'Requested',ordId:null,cost:'$38K',firm:'Self-perform',fqRef:'REQ-L-3061',attachments:[{type:'Safety',name:'JHA — BESS container placement sequence',ref:'JHA-BESS-HRC-001',status:'Draft'},{type:'Safety',name:'Loading & unloading plan — container crane ops',ref:'LULP-BESS-001',status:'Draft'},{type:'Shipping',name:'DOT permit application — oversize haul',ref:'DOT-BESS-001',status:'Pending'},{type:'Change Orders',name:'Scope TBD — self-perform vs. subcontract',ref:'CO-LOG-BESS-001',status:'Draft'}]},
        {item:'MV switchgear delivery',qty:'2 pieces',window:'Nov 2026',state:'Pending',ordId:null,cost:'$8,200',firm:'TBD'},
        {item:'PV modules site delivery',qty:'Bulk lot',window:'Oct–Nov 2026',state:'Projected',ordId:null,cost:'$22,000',firm:'TBD'},
        {item:'Pipe rack transport',qty:'2 loads',window:'Aug 2026',state:'Projected',ordId:null,cost:'$14,000',firm:'TBD'},
        {item:'Excavator demobi',qty:'2 units',window:'Jun 2026',state:'Scheduled',ordId:'ORD-3127',cost:'$4,800',firm:'Self-perform'}
      ]},
      riverside:{budget:600000,dpSpent:300000,adHoc:180000,
      rollCols:['Move type','Peak count','Peak month','vs plan'],roll:[{a:'Crane mobilizations',b:'1',c:'Aug 2026',v:'on plan',vt:'ok'},{a:'Equipment deliveries',b:'2 moves',c:'Sep 2026',v:'on plan',vt:'ok'},{a:'Heavy hauls',b:'1',c:'Aug 2026',v:'+1 over',vt:'warn'},{a:'Material hoisting',b:'8 lifts/mo',c:'ongoing',v:'on plan',vt:'ok'}],varSummary:'Tower crane mobilization is oversize \u2014 permit required. Vendor Bragg confirmed.',rows:[
        {item:'Tower crane mobilization',qty:'1 move',window:'Aug 2026',state:'Scheduled',ordId:'ORD-3128',fqRef:'REQ-L-3054',cost:'$18,500',firm:'Bragg Crane',attachments:[{type:'Safety',name:'Lift plan — tower crane mobilization Riverside',ref:'LP-3128-001',status:'Approved'},{type:'Shipping',name:'Haul route map — oversize crane transport',ref:'HR-3128-001',status:'Approved'}]},
        {item:'Excavator delivery',qty:'1 move',window:'Sep 2026',state:'Scheduled',ordId:'ORD-3129',cost:'$3,200',firm:'Self-perform'},
        {item:'Floor-by-floor material hoisting',qty:'8 lifts/mo',window:'Ongoing',state:'On-rent',ordId:'ORD-3130',cost:'$6,400/mo',firm:'Internal crew'}
      ]},
      cimarron:{budget:400000,dpSpent:180000,adHoc:100000,
      rollCols:['Move type','Peak count','Peak month','vs plan'],roll:[{a:'Deliveries',b:'5 moves',c:'Sep\u2013Oct 2026',v:'on plan',vt:'ok'},{a:'Heavy hauls',b:'1',c:'Sep 2026',v:'on plan',vt:'ok'},{a:'Crane mobilizations',b:'0',c:'\u2014',v:'on plan',vt:'ok'}],varSummary:'PDU delivery (3 loads) and excavator haul scheduled. Data center logistics on track.',rows:[
        {item:'Excavator delivery + haul',qty:'2 moves',window:'Sep 2026',state:'Scheduled',ordId:'ORD-3131',fqRef:'REQ-L-3042',cost:'$6,400',firm:'Self-perform'},
        {item:'PDU site delivery',qty:'3 loads',window:'Oct 2026',state:'PO issued',ordId:'ORD-3132',cost:'$4,200',firm:'3PL'},
        {item:'Precision cooling delivery + install',qty:'16 units',window:'Nov 2026',state:'Projected',ordId:null,cost:'$44K',firm:'TBD'}
      ]}
    },
    profservices:{
      hercules:{budget:1920000,dpSpent:1560000,adHoc:180000,
      rollCols:['Discipline','Peak FTE','Peak period','vs plan'],roll:[{a:'Engineering',b:'2 FTE',c:'Mar\u2013Dec 2026',v:'on plan',vt:'ok'},{a:'Survey & monitoring',b:'3 FTE',c:'Mar\u2013Aug 2026',v:'on plan',vt:'ok'},{a:'VDC / BIM',b:'3 FTE',c:'Apr\u2013Oct 2026',v:'+1 FTE',vt:'warn'},{a:'Commissioning',b:'2 FTE',c:'Nov 2026+',v:'on plan',vt:'ok'}],varSummary:'VDC/BIM unpriced \u2014 needed Apr\u2013Oct. BESS commissioning SOW not yet executed.',rows:[
        {item:"Owner's engineer / IE support",qty:'2 FTE',window:'Mar–Dec 2026',state:'Active',ordId:'ORD-3095',fqRef:'REQ-S-2101',cost:'$28K/mo',firm:'DNV',note:'2 FTE active. Apr cost code reallocated to engineering support line. No billing disputes.'},
        {item:'Geotechnical inspection',qty:'3 FTE',window:'Mar–Aug 2026',state:'Active',ordId:'ORD-3096',cost:'$18K/mo',firm:'Terracon',attachments:[{type:'Engineering',name:'Geotechnical investigation report — Hercules phase 2',ref:'GIR-3096-001',status:'Approved'},{type:'Engineering',name:'Field inspection log — Jul 2026',ref:'FIL-3096-JUL',status:'Current'},{type:'Safety',name:'Scope of work — geotech inspection',ref:'SOW-3096-001',status:'Executed'}]},
        {item:'Structural special inspection',qty:'2 FTE',window:'Jun 2026–Feb 2027',state:'Active',ordId:'ORD-3091',cost:'$16K/mo',firm:'Terracon',attachments:[{type:'Engineering',name:'Special inspection program — IBC §1705',ref:'SIP-3091-001',status:'Approved'},{type:'Engineering',name:'Monthly inspection report — Jul 2026',ref:'MIR-3091-JUL',status:'Current'}]},
        {item:'BESS commissioning agent',qty:'2 FTE',window:'Nov 2026–Mar 2027',state:'Projected',ordId:null,cost:'$34K/mo',firm:'TBD',fqRef:'REQ-S-2108'},
        {item:'Environmental / SWPPP monitoring',qty:'1 FTE',window:'Mar–May 2026',state:'Demobilized',ordId:'ORD-3092',cost:'$9K/mo',firm:'SWCA'},
        {item:'VDC / BIM coordination',qty:'3 FTE',window:'Apr–Oct 2026',state:'Pending pricing',ordId:'ORD-3120',fqRef:'REQ-4475',cost:'Pending',firm:'TBD'},
        {item:'Site survey crew',qty:'2 FTE',window:'Apr–Jul 2026',state:'Demobilized',ordId:'ORD-3009',cost:'$12K/mo',firm:'Bowman'}
      ]},
      riverside:{budget:950000,dpSpent:320000,adHoc:420000,
      rollCols:['Discipline','Peak FTE','Peak period','vs plan'],roll:[{a:'Engineering',b:'1 FTE',c:'ongoing',v:'on plan',vt:'ok'},{a:'Safety & inspection',b:'2 FTE',c:'Aug 2026+',v:'Requested',vt:'warn'},{a:'Commissioning',b:'1 FTE',c:'Nov 2026+',v:'on plan',vt:'ok'}],varSummary:'Structural special inspection and MEP commissioning lead pending confirmation.',rows:[
        {item:"Owner's rep",qty:'1 FTE',window:'Ongoing',state:'Active',ordId:'ORD-3143',cost:'$22K/mo',firm:'HDR'},
        {item:'Structural special inspection',qty:'2 FTE',window:'Aug 2026+',state:'Requested',ordId:null,cost:'$14K/mo',firm:'TBD',fqRef:'REQ-S-2114'},
        {item:'MEP commissioning lead',qty:'1 FTE',window:'Nov 2026+',state:'Draft',ordId:null,cost:'$82K est.',firm:'TBD',fqRef:'REQ-S-2117'}
      ]},
      cimarron:{budget:600000,dpSpent:120000,adHoc:150000,
      rollCols:['Discipline','Peak FTE','Peak period','vs plan'],roll:[{a:'Survey & monitoring',b:'2 FTE',c:'Jul\u2013Sep 2026',v:'Requested',vt:'warn'},{a:'Materials testing',b:'2 FTE',c:'ongoing',v:'on plan',vt:'ok'},{a:'Commissioning',b:'1 FTE',c:'Dec 2026+',v:'on plan',vt:'ok'}],varSummary:'Site survey crew requested. Materials testing lab active and on plan.',rows:[
        {item:'Site survey crew',qty:'2 FTE',window:'Jul–Sep 2026',state:'Requested',ordId:null,cost:'$12K/mo',firm:'TBD',fqRef:'REQ-4477'},
        {item:'Commissioning manager',qty:'1 FTE',window:'Dec 2026+',state:'Draft',ordId:null,cost:'$96K est.',firm:'TBD'},
        {item:'Material testing lab',qty:'2 FTE',window:'Ongoing',state:'Active',ordId:'ORD-3144',cost:'$8,400/mo',firm:'GeoTech Labs'}
      ]}
    },
    procurement:{
      hercules:{budget:8200000,dpSpent:7400000,adHoc:120000,
      rollCols:['Category','Committed','Order window','vs plan'],roll:[{a:'Electrical & HV',b:'$7.8M',c:'Q3\u2013Q4 2026',v:'+$0.3M',vt:'warn'},{a:'Tools & consumables',b:'$34.8K',c:'Mar\u2013Sep 2026',v:'on plan',vt:'ok'}],varSummary:'MV switchgear and BESS containers at-risk \u2014 order-by dates passed. Expedite required.',rows:[
        {item:'Nut runners',cat:'sm_tools',qty:'12 sets',window:'Mar 2026',state:'Delivered',ordId:'ORD-3100',cost:'$8,400',firm:'Hilti'},
        {item:'Battery pack sets',cat:'sm_tools',qty:'12 sets',window:'Mar 2026',state:'Delivered',ordId:'ORD-3101',cost:'$6,000',firm:'Milwaukee Tool'},
        {item:'Charging banks',cat:'sm_tools',qty:'6 units',window:'Mar 2026',state:'Delivered',ordId:'ORD-3102',cost:'$4,800',firm:'Milwaukee Tool'},
        {item:'Tone shear wrenches',cat:'sm_tools',qty:'8 units',window:'Apr 2026',state:'Delivered',ordId:'ORD-3103',cost:'$12,800',firm:'Enerpac'},
        {item:'Angle grinders',cat:'sm_tools',qty:'6 units',window:'Apr 2026',state:'Delivered',ordId:'ORD-3104',cost:'$3,600',firm:'Bosch'},
        {item:'SDS Max + bits',cat:'sm_tools',qty:'10 units',window:'Sep 2026',state:'Projected',ordId:null,cost:'$7,500',firm:'TBD'},
        {item:'HEPA vacuums',cat:'sm_tools',qty:'8 units',window:'Sep 2026',state:'Projected',ordId:null,cost:'$4,800',firm:'TBD'},
        {item:'Wire crimpers',cat:'sm_tools',qty:'12 sets',window:'Oct 2026',state:'Projected',ordId:null,cost:'$9,600',firm:'TBD'},
        {item:'MV switchgear 15 kV',cat:'elec_commodity',qty:'2 lineups',window:'Nov 2026',state:'At-risk',ordId:null,cost:'$0.5M+',firm:'Eaton',fqRef:'REQ-P-0501',attachments:[{type:'Quotes',name:'Eaton MV switchgear quote — 2 lineups',ref:'Q-EATON-001',status:'Available'},{type:'Submittals',name:'MV switchgear specification sheet',ref:'SUB-MV-001',status:'Pending'},{type:'Engineering',name:'Installation requirements — MV switchgear',ref:'ENG-MV-001',status:'Draft'}]},
        {item:'BESS containers 2.5 MWh',cat:'elec_commodity',qty:'6 units',window:'Nov 2026',state:'At-risk',ordId:null,cost:'$6M+',firm:'Tesla Energy',fqRef:'REQ-P-0508'},
        {item:'Main power transformer',cat:'elec_commodity',qty:'1 unit',window:'Dec 2026',state:'PO issued',ordId:'ORD-3136',fqRef:'REQ-P-0512',cost:'$1.2M',firm:'ABB'},
        {item:'Solar DC cabling',cat:'elec_commodity',qty:'Lot',window:'Oct 2026',state:'At-risk',ordId:null,cost:'$100K',firm:'TBD',fqRef:'REQ-P-0531'},
        {item:'Monitoring sensors',cat:'elec_commodity',qty:'24 units',window:'Sep 2026',state:'At-risk',ordId:null,cost:'$18K',firm:'TBD',fqRef:'REQ-P-0537'}
      ]},
      riverside:{budget:450000,dpSpent:180000,adHoc:80000,
      rollCols:['Category','Committed','Order window','vs plan'],roll:[{a:'Tools & supplies',b:'$88K',c:'ongoing',v:'on plan',vt:'ok'},{a:'Structural materials',b:'$62K',c:'Oct 2026',v:'Requested',vt:'warn'}],varSummary:'Structural bolt package and surgical fixture hardware pending order placement.',rows:[
        {item:'Surgical unit supply runs',cat:'sm_tools',qty:'Ongoing',window:'Ongoing',state:'Active',ordId:'ORD-3137',cost:'$8,500',firm:'McKesson'},
        {item:'Safety signage + PPE bundles',cat:'safety',qty:'Lot',window:'Ongoing',state:'Active',ordId:'ORD-3138',cost:'$3,200',firm:'MSA Safety'},
        {item:'Specialty fasteners',cat:'sm_tools',qty:'Lot',window:'Oct 2026',state:'Projected',ordId:null,cost:'$5,400',firm:'TBD'},
        {item:'Structural bolt package',cat:'struct_steel',qty:'Lot',window:'Oct 2026',state:'Requested',ordId:null,cost:'$62K',firm:'TBD',fqRef:'REQ-P-0619',attachments:[{type:'Engineering',name:'Structural bolt specification sheet',ref:'SPEC-SB-001',status:'Available'},{type:'Quotes',name:'Vendor quote — structural bolt package',ref:'Q-SB-3137-001',status:'Pending'}]},
        {item:'Surgical fixture hardware',cat:'sm_tools',qty:'Lot',window:'Sep 2026',state:'Requested',ordId:null,cost:'$28K est.',firm:'TBD',fqRef:'REQ-P-0621',note:'New request REQ-P-0621 — sourcing in fulfillment queue.'}
      ]},
      cimarron:{budget:1200000,dpSpent:920000,adHoc:50000,
      rollCols:['Category','Committed','Order window','vs plan'],roll:[{a:'Electrical & HV',b:'$182K',c:'Q3\u2013Q4 2026',v:'on plan',vt:'ok'},{a:'Mechanical systems',b:'$820K',c:'Q3 2026',v:'on plan',vt:'ok'},{a:'Specialty items',b:'$58K',c:'Dec 2026',v:'Requested',vt:'neu'}],varSummary:'Data center procurement on track. UPS bypass cable pending spec confirmation.',rows:[
        {item:'High-density PDUs',cat:'elec_commodity',qty:'24 units',window:'Oct 2026',state:'PO issued',ordId:'ORD-3139',cost:'$144K',firm:'Vertiv'},
        {item:'Cable management trays',cat:'elec_commodity',qty:'Lot',window:'Oct 2026',state:'Ordered',ordId:'ORD-3140',cost:'$38,000',firm:'Panduit'},
        {item:'Raised floor panels',cat:'mech_commodity',qty:'2,000 sqft',window:'Oct 2026',state:'PO issued',ordId:'ORD-3141',cost:'$180K',firm:'Tate Access'},
        {item:'Precision cooling units',cat:'mech_commodity',qty:'16 units',window:'Nov 2026',state:'PO issued',ordId:'ORD-3142',cost:'$640K',firm:'Liebert'},
        {item:'UPS bypass cable assembly',cat:'elec_commodity',qty:'2 sets',window:'Dec 2026',state:'Requested',ordId:null,cost:'$58K',firm:'TBD',fqRef:'REQ-P-0614'}
      ]}
    },
    prefab:{
      hercules:{budget:900000,dpSpent:720000,adHoc:80000,rollCols:['Assembly type','Active items','Capacity status','Peak conflict'],roll:[{a:'Mechanical',b:'2 active',c:'⚠ At risk Jul–Aug',v:'Pipe racks + pump skids',vt:'warn'},{a:'Electrical',b:'1 active',c:'Submittal pending',v:'E-houses',vt:'warn'},{a:'Structural',b:'1 delivered',c:'Delivered Jun',v:'On plan',vt:'ok'}],varSummary:'Mechanical at risk Jul–Aug (concurrent orders) · E-house submittal pending approval',rows:[
        {item:'Prefab pipe rack modules',qty:'12 modules',window:'Sep 28',state:'In fabrication',ordId:'ORD-3108',fqRef:'REQ-F-021',cost:'$180K',firm:'Piperite Fab',attachments:[{type:'Engineering',name:'Shop drawings — pipe rack modules rev C',ref:'SD-3108-RC',status:'Approved'},{type:'Engineering',name:'Material certification — A53 pipe',ref:'MC-3108-001',status:'Approved'},{type:'Submittals',name:'Fabrication schedule — Aug delivery',ref:'FS-3108-001',status:'Current'}]},
        {item:'Modular e-houses (BESS)',qty:'2 units',window:'Oct 31',state:'Submittal',ordId:'ORD-3107',fqRef:'REQ-F-034',cost:'$380K',firm:'ModSpace',attachments:[{type:'Submittals',name:'Submittal package — BESS e-houses rev 1',ref:'SUB-3107-R1',status:'Under review'},{type:'Engineering',name:'Engineer review notes — structural',ref:'ERN-3107-001',status:'In progress'},{type:'Engineering',name:'Shop drawings — e-house layout rev B',ref:'SD-3107-RB',status:'Pending approval'}]},
        {item:'L2 headwall assemblies',qty:'4 units',window:'Jun 20',state:'Delivered',ordId:'ORD-3106',cost:'$65K',firm:'Ironclad Mfg'},
        {item:'Pump skid assemblies',qty:'6 skids',window:'Oct 5',state:'Projected',ordId:null,cost:'$45K',firm:'TBD'},
        {item:'Prefab cable tray runs',qty:'Lot',window:'Aug 15',state:'Awaiting pricing',ordId:null,cost:'Pending',firm:'TBD',fqRef:'REQ-4476'},
        {item:'Combiner box prefab array',qty:'8 units',window:'Sep 5',state:'Projected',ordId:null,cost:'$88K',firm:'TBD'}
      ]},
      riverside:{budget:400000,dpSpent:320000,adHoc:120000,rollCols:['Assembly type','Active items','Capacity status','Peak conflict'],roll:[{a:'Structural Steel',b:'1 complete',c:'Delivered',v:'On plan',vt:'ok'},{a:'Electrical',b:'1 active',c:'In fabrication',v:'On plan',vt:'ok'}],varSummary:'L2 headwall assemblies delivered. MEP rack modules in fabrication \u2014 on track.',rows:[
        {item:'Overhead MEP rack modules',qty:'6 modules',window:'Sep 10',state:'In fabrication',ordId:'ORD-3133',cost:'$92K',firm:'Piperite Fab'},
        {item:'L2 headwall assemblies',qty:'8 units',window:'Jul 5',state:'Delivered',ordId:'ORD-3134',fqRef:'REQ-F-041',cost:'$135K',firm:'Ironclad Mfg'},
        {item:'Stairwell prefab panels',qty:'4 panels',window:'Oct 20',state:'Projected',ordId:null,cost:'$48K',firm:'TBD'}
      ]},
      cimarron:{budget:300000,dpSpent:60000,adHoc:40000,rollCols:['Assembly type','Active items','Capacity status','Peak conflict'],roll:[{a:'Structural',b:'1 active',c:'In fabrication',v:'On plan',vt:'ok'},{a:'Electrical',b:'1 active',c:'\u26a0 Awaiting pricing',v:'Cable tray brackets',vt:'warn'}],varSummary:'Server room panels in fabrication. Cable tray brackets unpriced \u2014 required for fit-out.',rows:[
        {item:'Cable tray brackets',qty:'Lot',window:'Oct 10',state:'Awaiting pricing',ordId:null,cost:'Pending',firm:'TBD',fqRef:'REQ-F-051'},
        {item:'Server room partition panels',qty:'6 panels',window:'Oct 25',state:'In fabrication',ordId:'ORD-3135',cost:'$72K',firm:'ModSpace'},
        {item:'Generator exhaust enclosures',qty:'4 units',window:'Dec 15',state:'Projected',ordId:null,cost:'$48K',firm:'TBD'},
        {item:'Server room raised floor',qty:'2,000 sqft',window:'Nov 2026',state:'Projected',ordId:null,cost:'$68K',firm:'TBD'}
      ]}
    }
  };
  var CC_DP_BILLS={
    'ORD-3110':[
      {inv:'BILL-AGG-0326',period:'Mar 2026',amount:51200,status:'Paid',cc:'0100-5000-0000-0001'},
      {inv:'BILL-AGG-0426',period:'Apr 2026',amount:51200,status:'Paid',cc:'0100-5000-0000-0001'},
      {inv:'BILL-AGG-0526',period:'May 2026',amount:51200,status:'Paid',cc:'0100-5000-0000-0001'},
      {inv:'BILL-AGG-0626',period:'Jun 2026',amount:51200,status:'Paid',cc:'0100-5000-0000-0001'},
      {inv:'BILL-AGG-0726',period:'Jul 2026',amount:51200,status:'Pending',cc:'0100-5000-0000-0001'}
    ],
    'ORD-3111':[
      {inv:'BILL-UR-0326',period:'Mar 2026',amount:67600,status:'Paid',cc:'0100-5000-0000-0001'},
      {inv:'BILL-UR-0426',period:'Apr 2026',amount:67600,status:'Paid',cc:'0100-5000-0000-0001'},
      {inv:'BILL-UR-0526',period:'May 2026',amount:67600,status:'Paid',cc:'0100-5000-0000-0001'},
      {inv:'BILL-UR-0626',period:'Jun 2026',amount:67600,status:'Paid',cc:'0100-5000-0000-0001'},
      {inv:'BILL-UR-0726',period:'Jul 2026',amount:67600,status:'Pending',cc:'0100-5000-0000-0001'}
    ],
    'ORD-3093':[
      {inv:'BILL-ALL-0626',period:'Jun 2026',amount:108000,status:'Paid',cc:'3100-6300-0000-0001'},
      {inv:'BILL-ALL-0726',period:'Jul 2026',amount:111000,status:'Pending',cc:'3100-6300-0000-0001',dispute:'Vendor billed $18,500/unit \u00d7 6; MSA confirms $18,000/unit. $3,000 overage flagged for credit \u2014 ref BILL-9021.'}
    ],
    'ORD-3029':[
      {inv:'BILL-JLG-0426',period:'Apr 2026',amount:19200,status:'Paid',cc:'0100-0100-0000-0001'},
      {inv:'BILL-JLG-0526',period:'May 2026',amount:19200,status:'Paid',cc:'0100-0100-0000-0001'},
      {inv:'BILL-JLG-0626',period:'Jun 2026',amount:19200,status:'Paid',cc:'0100-0100-0000-0001'},
      {inv:'BILL-JLG-0726',period:'Jul 2026',amount:19200,status:'Pending',cc:'0100-0100-0000-0001'}
    ],
    'ORD-3042':[
      {inv:'BILL-SBL-0526',period:'May 2026',amount:7200,status:'Paid',cc:'03-Concrete'},
      {inv:'BILL-SBL-0606',period:'Jun 1\u20136, 2026',amount:1440,status:'Paid',cc:'03-Concrete'}
    ],
    'ORD-3112':[
      {inv:'BILL-CAT-0326',period:'Mar 2026',amount:172800,status:'Paid',cc:'0200-0310-0000-0001'},
      {inv:'BILL-CAT-0426',period:'Apr 2026',amount:172800,status:'Paid',cc:'0200-0310-0000-0001'},
      {inv:'BILL-CAT-0526',period:'May 2026',amount:172800,status:'Paid',cc:'0200-0310-0000-0001'},
      {inv:'BILL-CAT-0626',period:'Jun 2026',amount:172800,status:'Paid',cc:'0200-0310-0000-0001'},
      {inv:'BILL-CAT-0726',period:'Jul 2026',amount:172800,status:'Pending',cc:'0200-0310-0000-0001'}
    ],
    'ORD-3114':[
      {inv:'BILL-VR-0326',period:'Mar 2026',amount:144000,status:'Paid',cc:'0200-0310-0000-0001'},
      {inv:'BILL-VR-0426',period:'Apr 2026',amount:144000,status:'Paid',cc:'0200-0310-0000-0001'},
      {inv:'BILL-VR-0526',period:'May 2026',amount:144000,status:'Paid',cc:'0200-0310-0000-0001'},
      {inv:'BILL-VR-0626',period:'Jun 2026',amount:144000,status:'Paid',cc:'0200-0310-0000-0001'},
      {inv:'BILL-VR-0726',period:'Jul 2026',amount:144000,status:'Pending',cc:'0200-0310-0000-0001'}
    ],
    'ORD-3095':[
      {inv:'BILL-DNV-0326',period:'Mar 2026',amount:28000,status:'Paid',cc:'0100-0100-0000-0001'},
      {inv:'BILL-DNV-0426',period:'Apr 2026',amount:28000,status:'Paid',cc:'0100-5200-0000-0001',ccChange:'Realloc Apr 15 by field PM \u2014 General conditions (0100-0100) \u2192 Engineering support (0100-5200).'},
      {inv:'BILL-DNV-0526',period:'May 2026',amount:28000,status:'Paid',cc:'0100-5200-0000-0001'},
      {inv:'BILL-DNV-0626',period:'Jun 2026',amount:28000,status:'Paid',cc:'0100-5200-0000-0001'},
      {inv:'BILL-DNV-0726',period:'Jul 2026',amount:28000,status:'Pending',cc:'0100-5200-0000-0001'}
    ],
    'ORD-3096':[
      {inv:'BILL-TRC-0326',period:'Mar 2026',amount:18000,status:'Paid',cc:'0200-0320-0000-0001'},
      {inv:'BILL-TRC-0426',period:'Apr 2026',amount:18000,status:'Paid',cc:'0200-0320-0000-0001'},
      {inv:'BILL-TRC-0526',period:'May 2026',amount:18000,status:'Paid',cc:'0200-0320-0000-0001'},
      {inv:'BILL-TRC-0626',period:'Jun 2026',amount:18000,status:'Paid',cc:'0200-0320-0000-0001'},
      {inv:'BILL-TRC-0726',period:'Jul 2026',amount:18000,status:'Paid',cc:'0200-0320-0000-0001'},
      {inv:'BILL-TRC-0826',period:'Aug 2026 (partial)',amount:9000,status:'Pending',cc:'0200-0320-0000-0001',ccChange:'Demob Aug 15 \u2014 50% rate confirmed by PM. Final invoice pending.'}
    ],
    'ORD-3091':[
      {inv:'BILL-TRC-0626S',period:'Jun 2026',amount:16000,status:'Paid',cc:'0300-0540-0000-0001'},
      {inv:'BILL-TRC-0726S',period:'Jul 2026',amount:16000,status:'Pending',cc:'0300-0540-0000-0001'}
    ],
    'ORD-3092':[
      {inv:'BILL-SWC-0626',period:'Jun 2026',amount:9000,status:'Paid',cc:'01-General conditions'},
      {inv:'BILL-SWC-0726',period:'Jul 2026',amount:9000,status:'Pending',cc:'01-General conditions'}
    ],
    'ORD-3009':[
      {inv:'BILL-BWM-0426',period:'Apr 18\u201319, 2026',amount:800,status:'Paid',cc:'01-General conditions'}
    ],
    'ORD-3120':[
      {inv:'BILL-TBD-0726',period:'Jul 2026',amount:null,status:'Pending pricing',cc:'0100-0100-0000-0001'}
    ],
    'ORD-3100':[
      {inv:'BILL-NR-0826',period:'Aug 2026',amount:18400,status:'Paid',cc:'0200-0320-0000-0001'},
      {inv:'BILL-NR-0926',period:'Sep 2026',amount:9200,status:'Pending',cc:'0200-0320-0000-0001'}
    ],
    'ORD-3103':[
      {inv:'BILL-SW-0826',period:'Aug 2026',amount:22800,status:'Paid',cc:'0200-0320-0000-0001'}
    ],
    'ORD-3130':[
      {inv:'BILL-SOL-0426',period:'Apr 2026',amount:48000,status:'Paid',cc:'0100-0440-0000-0001'},
      {inv:'BILL-SOL-0526',period:'May 2026',amount:48000,status:'Paid',cc:'0100-0440-0000-0001'},
      {inv:'BILL-SOL-0626',period:'Jun 2026',amount:48000,status:'Paid',cc:'0100-0440-0000-0001'},
      {inv:'BILL-SOL-0726',period:'Jul 2026',amount:48000,status:'Paid',cc:'0100-0440-0000-0001'}
    ],
    'ORD-3137':[
      {inv:'BILL-RK-0426',period:'Apr 2026',amount:31200,status:'Paid',cc:'0100-0320-0000-0001'},
      {inv:'BILL-RK-0526',period:'May 2026',amount:31200,status:'Paid',cc:'0100-0320-0000-0001'},
      {inv:'BILL-RK-0626',period:'Jun 2026',amount:31200,status:'Paid',cc:'0100-0320-0000-0001'},
      {inv:'BILL-RK-0726',period:'Jul 2026',amount:31200,status:'Paid',cc:'0100-0320-0000-0001'}
    ],
    'ORD-3143':[
      {inv:'BILL-MB-0426',period:'Apr 2026',amount:14500,status:'Paid',cc:'0300-0820-0000-0001'},
      {inv:'BILL-MB-0526',period:'May 2026',amount:14500,status:'Paid',cc:'0300-0820-0000-0001'},
      {inv:'BILL-MB-0626',period:'Jun 2026',amount:14500,status:'Paid',cc:'0300-0820-0000-0001'},
      {inv:'BILL-MB-0726',period:'Jul 2026',amount:14500,status:'Paid',cc:'0300-0820-0000-0001'}
    ],
    'ORD-3113':[
      {inv:'BILL-SBL-MG-0326',period:'Mar 2026',amount:9600,status:'Paid',cc:'0200-0310-0000-0001'},
      {inv:'BILL-SBL-MG-0426',period:'Apr 2026',amount:9600,status:'Paid',cc:'0200-0310-0000-0001'},
      {inv:'BILL-SBL-MG-0526',period:'May 2026',amount:9600,status:'Paid',cc:'0200-0310-0000-0001'},
      {inv:'BILL-SBL-MG-0626',period:'Jun 2026',amount:9600,status:'Paid',cc:'0200-0310-0000-0001'},
      {inv:'BILL-SBL-MG-0726',period:'Jul 2026',amount:9600,status:'Pending',cc:'0200-0310-0000-0001'}
    ],
    'ORD-3123':[
      {inv:'BILL-SBL-FK-0426',period:'Apr 2026',amount:4000,status:'Paid',cc:'0500-0100-0000-0002'},
      {inv:'BILL-SBL-FK-0526',period:'May 2026',amount:4000,status:'Paid',cc:'0500-0100-0000-0002'},
      {inv:'BILL-SBL-FK-0626',period:'Jun 2026',amount:4000,status:'Paid',cc:'0500-0100-0000-0002'},
      {inv:'BILL-SBL-FK-0726',period:'Jul 2026',amount:4000,status:'Pending',cc:'0500-0100-0000-0002'}
    ],
    'ORD-3124':[
      {inv:'BILL-UR-EX-0726',period:'Jul 2026',amount:14400,status:'Pending',cc:'0500-0300-0000-0002'}
    ],
    'ORD-3125':[
      {inv:'BILL-VR-CR-0426',period:'Apr 2026',amount:6400,status:'Paid',cc:'0600-0310-0000-0003'},
      {inv:'BILL-VR-CR-0526',period:'May 2026',amount:6400,status:'Paid',cc:'0600-0310-0000-0003'},
      {inv:'BILL-VR-CR-0626',period:'Jun 2026',amount:6400,status:'Paid',cc:'0600-0310-0000-0003'},
      {inv:'BILL-VR-CR-0726',period:'Jul 2026',amount:6400,status:'Pending',cc:'0600-0310-0000-0003'}
    ],
    'ORD-3126':[
      {inv:'BILL-CAT-MG-0426',period:'Apr 2026',amount:9600,status:'Paid',cc:'0600-0310-0000-0003'},
      {inv:'BILL-CAT-MG-0526',period:'May 2026',amount:9600,status:'Paid',cc:'0600-0310-0000-0003'},
      {inv:'BILL-CAT-MG-0626',period:'Jun 2026',amount:9600,status:'Paid',cc:'0600-0310-0000-0003'},
      {inv:'BILL-CAT-MG-0726',period:'Jul 2026',amount:9600,status:'Pending',cc:'0600-0310-0000-0003'}
    ],
    'ORD-3138':[
      {inv:'BILL-MSA-0426',period:'Apr 2026',amount:3200,status:'Paid',cc:'0500-0100-0000-0002'},
      {inv:'BILL-MSA-0526',period:'May 2026',amount:3200,status:'Paid',cc:'0500-0100-0000-0002'},
      {inv:'BILL-MSA-0626',period:'Jun 2026',amount:3200,status:'Paid',cc:'0500-0100-0000-0002'},
      {inv:'BILL-MSA-0726',period:'Jul 2026',amount:3200,status:'Paid',cc:'0500-0100-0000-0002'}
    ],
    'ORD-3144':[
      {inv:'BILL-GTL-0526',period:'May 2026',amount:8400,status:'Paid',cc:'0600-0820-0000-0003'},
      {inv:'BILL-GTL-0626',period:'Jun 2026',amount:8400,status:'Paid',cc:'0600-0820-0000-0003'},
      {inv:'BILL-GTL-0726',period:'Jul 2026',amount:8400,status:'Pending',cc:'0600-0820-0000-0003'}
    ],
    'ORD-3101':[
      {inv:'BILL-MW-BP-0326',period:'Mar 2026',amount:6000,status:'Paid',cc:'0100-0100-0000-0001'}
    ],
    'ORD-3102':[
      {inv:'BILL-MW-CB-0326',period:'Mar 2026',amount:4800,status:'Paid',cc:'0100-0100-0000-0001'}
    ],
    'ORD-3104':[
      {inv:'BILL-BSH-0426',period:'Apr 2026',amount:3600,status:'Paid',cc:'0100-0100-0000-0001'}
    ],
    'ORD-3106':[
      {inv:'BILL-ICM-0626',period:'Jun 2026',amount:65000,status:'Paid',cc:'0300-0540-0000-0001'}
    ],
    'ORD-3134':[
      {inv:'BILL-ICM-0726R',period:'Jul 2026',amount:135000,status:'Pending',cc:'0500-0320-0000-0002'}
    ],
    'ORD-3136':[
      {inv:'BILL-ABB-DEP-0726',period:'Jul 2026 (30% deposit)',amount:360000,status:'Paid',cc:'2600-3300-0000-0001'}
    ],
    'ORD-3139':[
      {inv:'BILL-VRT-DEP-0726',period:'Jul 2026 (50% deposit)',amount:72000,status:'Pending',cc:'2600-0540-0000-0003'}
    ],
    'ORD-3140':[
      {inv:'BILL-PDT-0726',period:'Jul 2026',amount:38000,status:'Pending',cc:'2600-0540-0000-0003'}
    ],
    'ORD-3141':[
      {inv:'BILL-TAT-DEP-0726',period:'Jul 2026 (30% deposit)',amount:54000,status:'Pending',cc:'2600-0540-0000-0003'}
    ],
    'ORD-3142':[
      {inv:'BILL-LBT-DEP-0726',period:'Jul 2026 (30% deposit)',amount:192000,status:'Pending',cc:'2600-0540-0000-0003'}
    ],
    'ORD-3108':[
      {inv:'BILL-PIP-DEP-0526',period:'May 2026 (50% deposit)',amount:90000,status:'Paid',cc:'0100-0440-0000-0001'}
    ],
    'ORD-3133':[
      {inv:'BILL-PIP-DEP-0626R',period:'Jun 2026 (50% deposit)',amount:46000,status:'Paid',cc:'0500-0320-0000-0002'}
    ],
    'ORD-3135':[
      {inv:'BILL-MOD-DEP-0726',period:'Jul 2026 (50% deposit)',amount:36000,status:'Pending',cc:'2600-0540-0000-0003'}
    ],
    'ORD-3132':[
      {inv:'BILL-3PL-DEP-0726',period:'Jul 2026 (PO confirmation)',amount:4200,status:'Pending',cc:'2600-0100-0000-0003'}
    ],
    'ORD-3115':[
      {inv:'BILL-ALL-0826',period:'Aug 2026',amount:108000,status:'Pending',cc:'3100-6300-0000-0001'}
    ],
    'ORD-3127':[
      {inv:'BILL-LOG-EXC-DMB-0626',period:'Jun 2026',amount:4800,status:'Paid',cc:'0100-0100-0000-0001'}
    ],
    'ORD-2998':[
      {inv:'BILL-FLT-SUV-0426',period:'Apr 2026 (Apr 5–Apr 30)',amount:980,status:'Paid',cc:'0100-0100-0000-0001'}
    ],
    'ORD-3031':[
      {inv:'BILL-SBL-SL-0526',period:'May 2026',amount:3800,status:'Paid',cc:'0200-0820-0000-0001'},
      {inv:'BILL-SBL-SL-0626',period:'Jun 2026',amount:3800,status:'Paid',cc:'0200-0820-0000-0001'},
      {inv:'BILL-SBL-SL-0726',period:'Jul 2026',amount:3800,status:'Pending',cc:'0200-0820-0000-0001'}
    ],
    'ORD-3051':[
      {inv:'BILL-FLT-TRK-0526',period:'May 2026 (May 20–31)',amount:960,status:'Paid',cc:'0100-0540-0000-0001'},
      {inv:'BILL-FLT-TRK-0626',period:'Jun 2026',amount:2400,status:'Paid',cc:'0100-0540-0000-0001'},
      {inv:'BILL-FLT-TRK-0726',period:'Jul 2026',amount:2400,status:'Pending',cc:'0100-0540-0000-0001'}
    ],
    'ORD-3060':[
      {inv:'BILL-PIP-MEP-DEP-0526',period:'May 2026 (50% deposit)',amount:12000,status:'Paid',cc:'0200-0440-0000-0001'}
    ],
    'ORD-3070':[
      {inv:'BILL-3PL-HH-0526',period:'May 2026',amount:4200,status:'Paid',cc:'0300-0320-0000-0001'}
    ],
    'ORD-3072':[
      {inv:'BILL-LOG-STG-0626',period:'Jun 2026 (Jun 10–30)',amount:5000,status:'Paid',cc:'0100-0100-0000-0001'},
      {inv:'BILL-LOG-STG-0726',period:'Jul 2026',amount:7200,status:'Pending',cc:'0100-0100-0000-0001'}
    ],
    'ORD-3080':[
      {inv:'BILL-MSA-PPE-0526',period:'May 2026',amount:2000,status:'Paid',cc:'0100-0100-0000-0001'}
    ],
    'ORD-3090':[
      {inv:'BILL-TRC-CI-0426',period:'Apr 2026 (Apr 25–30)',amount:1200,status:'Paid',cc:'0300-0320-0000-0001'},
      {inv:'BILL-TRC-CI-0526',period:'May 2026',amount:6400,status:'Paid',cc:'0300-0320-0000-0001'},
      {inv:'BILL-TRC-CI-0626',period:'Jun 2026',amount:6400,status:'Paid',cc:'0300-0320-0000-0001'},
      {inv:'BILL-TRC-CI-0726',period:'Jul 2026',amount:6400,status:'Pending',cc:'0300-0320-0000-0001'}
    ],
    'ORD-3109':[
      {inv:'BILL-PMP-DEP-0726',period:'Jul 2026 (50% deposit)',amount:40000,status:'Pending',cc:'0200-0320-0000-0002'}
    ]
  };
  var dpCur=null;
  var _DP_TONE_MAP={'Active':'ok','On-rent':'ok','Delivered':'ok','Scheduled':'info','PO issued':'info','In fabrication':'info','Submittal':'info','Off-rent':'info','Demobilized':'info','Projected':'neu','Draft':'neu','Requested':'neu','Pending pricing':'warn','Awaiting pricing':'warn','At-risk':'bad','Ordered':'info'};
  function ccDpItemModal(pillar,proj,idx){
    var r=(CC_PROJ_DP[pillar]&&CC_PROJ_DP[pillar][proj]&&CC_PROJ_DP[pillar][proj].rows)||[];
    r=r[idx]; if(!r){toast('Row not found');return;}
    var tone=_DP_TONE_MAP[r.state]||'neu';
    var b='<div class="fq-req"><div class="fq-req-t">'+r.item+'</div><div class="sub">'+(r.qty||'')+' · '+(r.window||'')+' · '+(_PROJ_NAMES[proj]||proj)+'</div></div>';
    b+='<div class="fq-calc">';
    b+='<div class="fq-crow"><span>Rate / cost</span><span>'+r.cost+'</span></div>';
    b+='<div class="fq-crow"><span>Firm</span><span>'+(r.firm||'TBD')+'</span></div>';
    b+='<div class="fq-crow"><span>State</span><span><span class="tag '+tone+'">'+r.state+'</span></span></div>';
    b+='<div class="fq-crow"><span>Qty</span><span>'+r.qty+'</span></div>';
    b+='<div class="fq-crow"><span>Window</span><span>'+r.window+'</span></div>';
    b+='</div>';
    var portalActs=[];
    if(r.state==='Projected'||r.state==='Draft'){portalActs.push('<button class="btn btn-red" onclick="closeModal();toast('+"'"+'Order request created for '+r.item+"'"+')">Create order request →</button>');}
    else if(r.state==='Requested'||r.state==='Pending pricing'){portalActs.push('<button class="btn btn-red" onclick="closeModal();toast('+"'"+'Pricing started for '+r.item+"'"+')">Set pricing →</button>');}
    var extActs='<button class="btn btn-ghost" disabled style="opacity:.45;cursor:not-allowed" title="Requires action outside portal">Add to task list</button>';
    b+='<div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal()">Close</button>';
    b+='<div style="display:flex;gap:8px">'+(portalActs.length?portalActs.join('')+extActs:extActs)+'</div></div>';
    openModal('Plan item — '+r.item,b);
  }
  function dpGoDP(p,proj){_dpCcProjMap[p]=proj;ccGo(_PILLAR_SCREEN[p]||'dpequip');}
  function dpDpModal(p,proj,idx,isDp){
    var rows=CC_PROJ_DP[p]&&CC_PROJ_DP[p][proj]&&CC_PROJ_DP[p][proj].rows;
    var row=rows&&rows[idx]; if(!row)return;
    var dpId=(_DP_IDS[p]||{})[proj]||'\u2014';
    var pLabel=_PROJ_LABELS[proj]||proj;
    var bst=_DP_TONE_MAP[row.state]||'neu';
    var b='<div class="fq-calc">';
    b+='<div class="fq-crow"><span>Demand plan ID</span><span style="font-family:monospace;font-size:12px">'+dpId+'</span></div>';
    b+='<div class="fq-crow"><span>Project</span><span>'+pLabel+'</span></div>';
    b+='<div class="fq-crow"><span>Window</span><span>'+row.window+'</span></div>';
    b+='<div class="fq-crow"><span>Qty</span><span>'+row.qty+'</span></div>';
    b+='<div class="fq-crow"><span>Cost code</span><span>'+row.cost+'</span></div>';
    b+='<div class="fq-crow"><span>Status</span><span><span class="tag '+bst+'">'+row.state+'</span></span></div>';
    if(row.ordId){b+='<div class="fq-crow"><span>Order</span><span style="font-family:monospace;font-size:12px">'+row.ordId+'</span></div>';}
    b+='</div>';
    if(row.ordId){b+=buildDpBillingInline(row.ordId);}
    b+='<div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal()">Close</button>';
    if(!isDp){b+='<button class="btn btn-dark" onclick="dpGoDP(\''+p+'\',\''+proj+'\');closeModal()">View in demand plan \u2192</button>';}
    b+='</div>';
    openModal(row.item+'\u2014'+pLabel,b);
  }
  function dpShowLineage(p,proj,type){
    var lin=CC_DP_LINEAGE[p]&&CC_DP_LINEAGE[p][proj]; if(!lin)return;
    var pLabel=_PROJ_LABELS[proj]||proj;
    if(type==='margin'){
      var mp=lin.margin;
      var b='<div class="fq-calc"><div class="fq-crow"><span>Opportunity ID</span><span style="font-family:monospace">'+mp.id+'</span></div><div class="fq-crow"><span>Date locked</span><span>'+mp.date+'</span></div></div>';
      b+='<div style="margin:12px 0 6px;font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:var(--g500)">Opportunity estimate</div>';
      b+='<div style="border:1px solid var(--g200);border-radius:6px;overflow:hidden">';
      b+='<div style="display:grid;grid-template-columns:1fr 90px;font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.03em;color:var(--g500);padding:6px 12px;border-bottom:1px solid var(--g200);background:var(--g50)"><span>Line item</span><span style="text-align:right">Estimate</span></div>';
      (mp.lines||[]).forEach(function(ln){
        var isBold=!!ln.bold;
        b+='<div style="display:grid;grid-template-columns:1fr 90px;padding:6px 12px;font-size:'+(isBold?'12':'11.5')+'px;font-weight:'+(isBold?'700':'400')+';color:'+(isBold?'var(--g900)':'var(--g700)')+';'+(isBold?'border-top:1px solid var(--g200);background:var(--g50)':'border-bottom:1px solid var(--g100)')+'"><span>'+ln.label+'</span><span style="text-align:right">'+ln.est+'</span></div>';
      });
      b+='</div>';
      b+='<div class="eq-cap" style="margin-top:10px">'+svg('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',0)+'<span>'+mp.note+'. Figures are ROM estimates at opportunity stage \u2014 scope is refined against the baseline as the project progresses.</span></div>';
      b+='<div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal()">Close</button><button class="btn btn-dark" onclick="toast(\'Downloading margin plan PDF...\');">Download margin plan \u2192</button></div>';
      openModal('Margin plan \u2014 '+pLabel,b);
    } else {
      var bl=lin.baseline;
      var b='<div class="fq-calc">';
      b+='<div class="fq-crow"><span>Plan ID</span><span style="font-family:monospace">'+bl.id+'</span></div>';
      b+='<div class="fq-crow"><span>Locked</span><span>'+bl.date+'</span></div>';
      b+='<div class="fq-crow"><span>Total (baseline)</span><span style="font-weight:700">'+bl.total+'</span></div>';
      b+='<div class="fq-crow"><span>Line items</span><span>'+bl.items+'</span></div>';
      b+='</div>';
      b+='<div class="eq-cap" style="margin-top:12px">'+svg('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',0)+'<span>'+bl.note+'. Delta from baseline reflects additions and scope changes tracked against this locked plan.</span></div>';
      b+='<div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal()">Close</button><button class="btn btn-dark" onclick="toast(\'Downloading baseline plan PDF...\');">Download baseline plan \u2192</button></div>';
      openModal('Baseline plan snapshot \u2014 '+pLabel,b);
    }
  }
  function pfbP6Toggle(idx){_pfbP6Expanded[idx]=!_pfbP6Expanded[idx];renderCcDemand('prefab');}
  function renderPrefabP6Schedule(items){
    var TODAY_STR='2026-08-10';
    var TODAY_MS=new Date(TODAY_STR).getTime();
    var APR1=new Date(2026,3,1).getTime();
    var SPAN_MS=274*86400000;
    var LW=130;
    var MN={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};
    var MNAMES=['Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    function pd(s){
      if(!s)return null;
      if(s.indexOf('-')>3){var _p=s.split('-');return new Date(+_p[0],+_p[1]-1,+_p[2]);}
      var p=s.trim().split(' ');if(p.length<2)return null;
      return new Date(2026,MN[p[0]],parseInt(p[1]));
    }
    function addD(d,n){if(!d)return null;var r=new Date(d);r.setDate(r.getDate()+n);return r;}
    function fmtISO(d){if(!d||!(d instanceof Date))return '';var m=d.getMonth()+1;var dy=d.getDate();return d.getFullYear()+'-'+(m<10?'0'+m:m)+'-'+(dy<10?'0'+dy:dy);}
    function pctD(d){
      if(!d)return -999;
      var ms=d instanceof Date?d.getTime():new Date(d).getTime();
      return parseFloat(((ms-APR1)/SPAN_MS*100).toFixed(2));
    }
    function fmtD(d){
      if(!d)return '';
      var ms=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      return ms[d.getMonth()]+' '+d.getDate();
    }
    function prog(sD,eD){
      var sMs=sD?sD.getTime():TODAY_MS+1;
      var eMs=eD?eD.getTime():sMs+86400000;
      if(TODAY_MS>=eMs)return 100;
      if(TODAY_MS<=sMs)return 0;
      return Math.round((TODAY_MS-sMs)/(eMs-sMs)*100);
    }
    var todX=pctD(new Date(TODAY_STR));
    var TC=CC_PREFAB_CAP.typeColor; var TL=CC_PREFAB_CAP.typeLabel;
    // shared today line helper (short, per-row)
    function todayLine(){
      if(todX<0||todX>100)return '';
      return '<div style="position:absolute;left:'+todX+'%;top:0;bottom:0;width:1.5px;background:#10b981;opacity:.4;pointer-events:none;z-index:1"></div>';
    }
    // x-axis row
    function xAxis(small){
      var sz=small?'10px':'11px'; var sc=small?'var(--g400)':'var(--g500)';
      var h2='<div style="display:flex;margin-bottom:2px">';
      h2+='<div style="min-width:'+LW+'px;flex-shrink:0"></div>';
      h2+='<div style="position:relative;flex:1;height:'+(small?'16':'22')+'px;border-bottom:1px solid var(--g200)">';
      MNAMES.forEach(function(m){
        var mp=parseFloat(((new Date(2026,MN[m],1).getTime()-APR1)/SPAN_MS*100).toFixed(1));
        if(mp<-1||mp>101)return;
        h2+='<div style="position:absolute;left:'+Math.max(0,mp)+'%;font-size:'+sz+';color:'+sc+';pointer-events:none">'+m+'</div>';
      });
      if(todX>=0&&todX<=100){
        h2+='<div style="position:absolute;left:'+todX+'%;bottom:0;width:1.5px;height:5px;background:#10b981;z-index:2"></div>';
        if(!small)h2+='<div style="position:absolute;left:calc('+todX+'% + 3px);top:2px;font-size:8.5px;color:#10b981;font-weight:700">Today</div>';
      }
      h2+='</div></div>';
      return h2;
    }
    // activity row renderer
    function actRow(label,sD,eD,color,durLabel,mode){
      // mode: 'bar' | 'triangle' | 'flag'
      if(!sD)return '';
      var x1=pctD(sD); var x2=eD?pctD(eD):x1;
      var sMs=sD.getTime(); var eMs=eD?eD.getTime():sMs+86400000;
      var p=prog(sD,eD);
      var done=p===100; var active=p>0&&p<100;
      var dotCol=done?'#10b981':(active?'#3b82f6':'var(--g400)');
      var icon=done?'✓':(active?'▶':'·');
      var clampX=Math.max(0,Math.min(100,x1));
      var dateStr=eD&&fmtD(sD)!==fmtD(eD)?fmtD(sD)+'–'+fmtD(eD):fmtD(sD);
      var barCol=done?'#10b981':(active?'#3b82f6':(color||'#94a3b8'));
      var row='<div style="display:flex;align-items:center;height:28px;margin:2px 0">';
      row+='<div style="min-width:'+LW+'px;flex-shrink:0;display:flex;align-items:center;justify-content:space-between;padding-right:6px">';
      row+='<div style="display:flex;align-items:center;gap:3px"><span style="font-size:10px;color:'+dotCol+';width:12px;text-align:center">'+icon+'</span><span style="font-size:11px;color:var(--g800)">'+label+'</span></div>';
      row+='<span style="font-size:9.5px;color:var(--g400)">'+durLabel+'</span>';
      row+='</div>';
      row+='<div style="position:relative;flex:1;height:22px">';
      row+=todayLine();
      if(mode==='flag'){
        if(clampX>=0&&clampX<=100){
          row+='<div style="position:absolute;left:calc('+clampX+'% - 1px);top:4px;bottom:4px;width:2px;background:'+barCol+';border-radius:1px;z-index:2"></div>';
          row+='<div style="position:absolute;left:calc('+clampX+'% + 4px);top:6px;font-size:8px;color:var(--g500);white-space:nowrap">'+dateStr+'</div>';
        }
      } else if(mode==='triangle'){
        if(clampX>=0&&clampX<=100){
          row+='<div style="position:absolute;left:calc('+clampX+'% - 5px);top:7px;width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:9px solid '+barCol+';z-index:2"></div>';
          row+='<div style="position:absolute;left:calc('+clampX+'% + 7px);top:5px;font-size:8px;color:var(--g500);white-space:nowrap">'+dateStr+'</div>';
        }
      } else {
        var clampX2=Math.max(clampX,Math.min(100,x2));
        var bw=Math.max(clampX2-clampX,0.6);
        row+='<div style="position:absolute;left:'+clampX+'%;width:'+bw+'%;height:14px;top:7px;background:#e2e8f0;border-radius:3px"></div>';
        if(p>0){
          var fillW=bw*Math.min(p,100)/100;
          row+='<div style="position:absolute;left:'+clampX+'%;width:'+fillW+'%;height:14px;top:7px;background:'+barCol+';border-radius:3px;opacity:.85"></div>';
        }
        row+='<div style="position:absolute;left:calc('+Math.min(100,clampX2)+'% + 3px);top:9px;font-size:9px;color:var(--g400);white-space:nowrap">'+dateStr+'</div>';
      }
      row+='</div></div>';
      return row;
    }
    var h='';
    h+=xAxis(false);
    items.filter(function(it){return !!it.p6Date;}).forEach(function(it,idx){
      var p6=pd(it.p6Date); var sd=it.shipD||3;
      if(!p6)return;
      var mfgWks=it.mfgWks||3;
      var inspSiteS=addD(p6,-1); var inspSiteE=inspSiteS;
      var shipE=addD(inspSiteS,-1);
      var shipS=addD(shipE,-sd+1);
      var inspFacS=addD(shipS,-1); var inspFacE=inspFacS;
      var fe=addD(inspFacS,-1);
      var fs=addD(fe,-(mfgWks*7-1));
      var schedMfg=addD(fs,-1); var schedMfgEnd=schedMfg;
      var matEnd=addD(schedMfg,-1);
      var matStart=addD(matEnd,-13);
      var ordEnd=addD(matStart,-1);
      var ordStart=addD(ordEnd,-6);
      var demId=addD(ordStart,-23);
      // Apply user-edited date overrides if present
      var _ov=_pfbP6Overrides[idx];
      function _parseOvD(s){var p=s.split('-');return new Date(+p[0],+p[1]-1,+p[2]);}
      if(_ov){
        if(_ov.demId)demId=_parseOvD(_ov.demId);
        if(_ov.ordStart)ordStart=_parseOvD(_ov.ordStart);
        if(_ov.ordEnd)ordEnd=_parseOvD(_ov.ordEnd);
        if(_ov.matStart)matStart=_parseOvD(_ov.matStart);
        if(_ov.matEnd)matEnd=_parseOvD(_ov.matEnd);
        if(_ov.schedMfg){schedMfg=_parseOvD(_ov.schedMfg);schedMfgEnd=schedMfg;}
        if(_ov.fs)fs=_parseOvD(_ov.fs);
        if(_ov.fe)fe=_parseOvD(_ov.fe);
        if(_ov.inspFacS){inspFacS=_parseOvD(_ov.inspFacS);inspFacE=inspFacS;}
        if(_ov.shipS)shipS=_parseOvD(_ov.shipS);
        if(_ov.shipE)shipE=_parseOvD(_ov.shipE);
        if(_ov.inspSiteS){inspSiteS=_parseOvD(_ov.inspSiteS);inspSiteE=inspSiteS;}
        if(_ov.p6)p6=_parseOvD(_ov.p6);
      }
      var tc=TC[it.t]||'#888'; var tl=TL[it.t]||it.t;
      var p6col=p6.getTime()<TODAY_MS?'#dc2626':'#1d4ed8';
      var expanded=!!_pfbP6Expanded[idx];
      // header row
      h+='<div onclick="pfbP6Toggle('+idx+')" style="display:flex;align-items:center;cursor:pointer;padding:8px 14px;background:'+(expanded?'var(--g50)':'#fff')+';border:1px solid var(--g200);border-radius:'+(expanded?'6px 6px 0 0':'6px')+';margin-bottom:'+(expanded?'0':'3px')+'">';
      h+='<div style="width:'+LW+'px;flex:0 0 '+LW+'px;overflow:hidden;display:flex;align-items:center;gap:5px">';
      h+='<span style="font-size:9px;color:var(--g400)">'+(expanded?'▼':'▶')+'</span>';
      h+='<div style="overflow:hidden"><div style="font-size:13px;font-weight:600;color:var(--g900);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+it.item+'</div>';
      h+='<div style="font-size:10.5px;color:var(--g500)">'+it.qty+'</div></div>';
      h+='</div>';
      h+='<div style="flex:1;position:relative;height:26px">';
      var x0=Math.max(0,pctD(ordStart)); var xp=Math.min(100,pctD(p6));
      if(xp>x0)h+='<div style="position:absolute;left:'+x0+'%;width:'+(xp-x0)+'%;height:4px;top:8px;background:'+tc+';opacity:.25;border-radius:2px"></div>';
      var fx1=Math.max(0,pctD(fs)); var fx2=Math.min(100,pctD(fe));
      if(xp>fx2)h+='<div style="position:absolute;left:'+fx2+'%;width:'+(xp-fx2)+'%;height:2px;top:9px;background:'+tc+';opacity:.35;border-radius:0;background-image:repeating-linear-gradient(90deg,'+tc+' 0,'+tc+' 4px,transparent 4px,transparent 8px)"></div>';
      if(fx2>fx1)h+='<div style="position:absolute;left:'+fx1+'%;width:'+(fx2-fx1)+'%;height:10px;top:5px;background:'+tc+';opacity:.65;border-radius:3px"></div>';
      var px=pctD(p6);
      if(px>=0&&px<=100)h+='<div style="position:absolute;left:calc('+px+'% - 1px);top:1px;bottom:1px;width:2px;background:#dc2626;border-radius:1px;z-index:3"></div>';
      h+='<div style="position:absolute;right:0;top:50%;transform:translateY(-50%);display:flex;align-items:center;gap:5px;background:rgba(255,255,255,.92);padding-left:6px">';
      h+='<span style="font-size:9px;font-weight:600;color:'+tc+';background:'+tc+'18;padding:1px 5px;border-radius:8px">'+tl+'</span>';
      h+='<span style="font-size:11px;font-weight:700;color:#fff;background:'+p6col+';padding:2px 7px;border-radius:5px;white-space:nowrap">★ '+fmtD(p6)+'</span>';
      h+='</div>';
      h+='</div></div>';
      if(expanded){
        var _enc=encodeURIComponent(JSON.stringify({item:it.item,mfgWks:mfgWks,shipD:sd,demId:fmtISO(demId),ordStart:fmtISO(ordStart),ordEnd:fmtISO(ordEnd),matStart:fmtISO(matStart),matEnd:fmtISO(matEnd),schedMfg:fmtISO(schedMfg),fs:fmtISO(fs),fe:fmtISO(fe),inspFacS:fmtISO(inspFacS),shipS:fmtISO(shipS),shipE:fmtISO(shipE),inspSiteS:fmtISO(inspSiteS),p6:fmtISO(p6)}));
        var _hasOv=!!_pfbP6Overrides[idx];
        h+='<div style="border:1px solid var(--g200);border-top:none;border-radius:0 0 6px 6px;padding:12px 14px 16px;margin-bottom:6px;background:#fff">';
        h+='<div style="display:flex;justify-content:flex-end;margin-bottom:8px">';
        h+='<button onclick="event.stopPropagation();pfbOpenEditDates('+idx+',\''+_enc+'\')" style="display:flex;align-items:center;gap:5px;padding:5px 12px;border:1px solid '+(_hasOv?'#3b82f6':'var(--g200)')+';border-radius:7px;font-size:11.5px;font-weight:500;color:'+(_hasOv?'#3b82f6':'var(--g600)')+';background:'+(_hasOv?'#eff6ff':'#fff')+';cursor:pointer">';
        h+='<span style="font-size:12px">'+(String.fromCharCode(9998))+'</span>';
        h+=(_hasOv?'Custom dates':'Edit dates')+'</button>';
        h+='</div>';
        h+=xAxis(true);
        h+=actRow('Demand ID',demId,demId,'#94a3b8','long lead','flag');
        h+=actRow('Order & specs',ordStart,ordEnd,'#94a3b8','1 wk','bar');
        h+=actRow('Mat. procured',matStart,matEnd,'#94a3b8','2 wks','bar');
        h+=actRow('Sched. mfg',schedMfg,schedMfgEnd,'#94a3b8','1 day','triangle');
        h+=actRow('Manufacturing',fs,fe,tc,mfgWks+' wks','bar');
        h+=actRow('Insp. (facility)',inspFacS,inspFacE,'#94a3b8','1 day','triangle');
        h+=actRow('Delivery',shipS,shipE,'#94a3b8',sd+'d','bar');
        h+=actRow('Insp. (site)',inspSiteS,inspSiteE,'#94a3b8','1 day','triangle');
        h+=actRow('INSTALL ★',p6,p6,'#dc2626','P6','flag');
        h+='</div>';
      }
    });
    h+='<div style="display:flex;gap:12px;margin-top:8px;flex-wrap:wrap;font-size:10px;color:var(--g600);padding-top:7px;border-top:1px solid var(--g100);align-items:center">';
    h+='<div style="display:flex;align-items:center;gap:4px"><div style="width:14px;height:4px;background:#10b981;border-radius:2px"></div>Done</div>';
    h+='<div style="display:flex;align-items:center;gap:4px"><div style="width:14px;height:4px;background:#3b82f6;border-radius:2px"></div>Active</div>';
    h+='<div style="display:flex;align-items:center;gap:4px"><div style="width:14px;height:4px;background:#e2e8f0;border-radius:2px"></div>Upcoming</div>';
    h+='<div style="display:flex;align-items:center;gap:4px"><span style="font-size:9px;font-weight:600;color:var(--g400)">MFG</span><span style="font-size:9px;color:var(--g400)"> = type color</span></div>';
    h+='<div style="display:flex;align-items:center;gap:4px"><div style="width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:9px solid #94a3b8"></div>1-day event</div>';
    h+='<div style="display:flex;align-items:center;gap:4px"><div style="width:2px;height:12px;background:#dc2626;border-radius:1px"></div>P6 install</div>';
    h+='<div style="display:flex;align-items:center;gap:4px"><div style="width:2px;height:12px;background:#10b981;opacity:.7"></div>Today</div>';
    h+='</div>';
    return h;
  }
    function renderPrefabCapPlan(proj){
    if(!CC_PREFAB_CAP||!CC_PREFAB_CAP.plan[proj])return '';
    var items=CC_PREFAB_CAP.plan[proj];
    var caps=CC_PREFAB_CAP.baseline;
    var TYPES=CC_PREFAB_CAP.types;
    var TL=CC_PREFAB_CAP.typeLabel;
    var TC=CC_PREFAB_CAP.typeColor;
    var gaps=CC_PREFAB_CAP.gaps[proj]||[];
    var projName=_PROJ_LABELS[proj]||proj;
    var pillarQuotes=CC_QUOTES.filter(function(q){return q.pillar==='prefab'&&q.project===projName;});
    var h='';
            h+='<div class="eq-toolbar" style="margin-top:22px"><span class="dp-sec-t">'+svg(IC.layers)+'Capacity planning</span><span class="spacer"></span><button class="btn btn-ghost btn-sm" style="font-size:11px" onclick="pfbCapAdd(\''+proj+'\')">+ Add line</button></div>';
    if(CURRENT!=='ns'){
        h+='<div style="background:rgba(59,130,246,.05);border:1px solid rgba(59,130,246,.15);border-radius:7px;padding:8px 12px;margin-bottom:12px;font-size:11.5px;color:var(--g600)">'
      +'<b style="color:var(--charcoal)">V1 · Demo data pre-filled.</b> In production each line is manually entered by the prefab team. '
      +'<span style="color:var(--g400)">⭐ North Star: 02S auto-ingests submittal approvals and vendor lead times to propose fab dates and flags conflicts before they become critical.</span></div>';
    }
    var ns=CURRENT==='ns';
    if(ns){
    h+='<div style="background:rgba(99,102,241,.05);border:1px solid rgba(99,102,241,.15);border-radius:7px;padding:7px 12px;margin-bottom:10px;font-size:11.5px;color:var(--g500)"><span style="font-size:9.5px;font-weight:700;color:var(--indigo);background:rgba(99,102,241,.12);border-radius:3px;padding:1px 5px;margin-right:8px;vertical-align:1px">NORTH STAR</span>02S ingests submittal approvals and vendor lead times to auto-propose fab dates and surface shop conflicts.</div>';
    h+='<div class="ins-strip"><span class="isi">'+CC_SPARK+'</span><div><div class="ist">Shop at 94% capacity Aug&ndash;Sep</div><div class="isd">E-house submittal deadline 3 days &middot; Piperite Fab slot contested across 2 projects</div></div></div>';
    h+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:14px">';
    h+='<div style="background:#fff;border:1px solid rgba(239,68,68,.25);border-radius:6px;padding:10px 12px">';
    h+='<div style="font-size:9.5px;font-weight:700;color:var(--g400);text-transform:uppercase;letter-spacing:.04em;margin-bottom:4px">SHOP CAPACITY</div>';
    h+='<div style="font-size:12px;font-weight:600;color:var(--g900);margin-bottom:2px">Aug 12&ndash;Sep 4: 94%</div>';
    h+='<div style="font-size:11px;color:var(--red)">Hercules + Riverside competing for Piperite slot</div></div>';
    h+='<div style="background:#fff;border:1px solid rgba(239,68,68,.25);border-radius:6px;padding:10px 12px">';
    h+='<div style="font-size:9.5px;font-weight:700;color:var(--g400);text-transform:uppercase;letter-spacing:.04em;margin-bottom:4px">SUBMITTAL ALERT</div>';
    h+='<div style="font-size:12px;font-weight:600;color:var(--g900);margin-bottom:2px">E-house &mdash; deadline Jul 15</div>';
    h+='<div style="font-size:11px;color:var(--red)">3 days &middot; approve to protect Nov energization</div></div>';
    h+='<div style="background:#fff;border:1px solid var(--g200);border-radius:6px;padding:10px 12px">';
    h+='<div style="font-size:9.5px;font-weight:700;color:var(--g400);text-transform:uppercase;letter-spacing:.04em;margin-bottom:4px">P6 IMPACT</div>';
    h+='<div style="font-size:12px;font-weight:600;color:var(--g900);margin-bottom:2px">Pipe rack install: Sep 28</div>';
    h+='<div style="font-size:11px;color:#d97706">2 days behind &middot; inspect Jul 22</div></div>';
    h+='</div>';
    }
    var tgt='1.2fr 100px 82px 82px 100px 50px 28px';
    h+='<div style="background:var(--g50);border:1px solid var(--g200);border-radius:8px;padding:10px 14px;margin-bottom:14px">';
    h+='<div style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:var(--g500);margin-bottom:8px">Planned fab windows</div>';
    h+='<div class="dp-head" style="grid-template-columns:'+tgt+';font-size:10.5px"><span>Item</span><span>Type</span><span>Mat. order</span><span>Fab start</span><span>Ship date</span><span class="c">Qty</span><span></span></div>';
    items.forEach(function(it,idx){
      var tc=TC[it.t]||'var(--g600)'; var tl=TL[it.t]||it.t;
      var isAdhoc=!!it.adhoc;
      h+='<div class="dp-row" style="grid-template-columns:'+tgt+';padding:5px 0;border-bottom:1px solid var(--g100)'+(isAdhoc?';background:rgba(217,119,6,.03)':'')+'">';
      h+='<div style="font-size:12px">'+it.item+(isAdhoc?' <span style="font-size:9.5px;background:rgba(217,119,6,.1);color:#b45309;padding:1px 5px;border-radius:8px;font-weight:600">Ad hoc</span>':'')+'</div>';
      h+='<div><span style="display:inline-block;background:'+tc+'20;color:'+tc+';font-size:10px;padding:1px 6px;border-radius:10px;font-weight:600">'+tl+'</span></div>';
      h+='<div style="font-size:11.5px;color:var(--g600)">'+it.mo+'</div>';
      h+='<div style="font-size:11.5px;color:var(--g600)">'+it.fs+'</div>';
      h+='<div style="font-size:11.5px;color:var(--g600)">'+it.fe+' <span style="color:var(--g400);font-size:10px">+'+it.shipD+'d</span></div>';
      h+='<div class="c" style="font-size:11.5px">'+it.qty+'</div>';
      h+='<div><button style="background:none;border:none;padding:1px 4px;cursor:pointer;color:var(--g400);font-size:13px;line-height:1" title="Edit" onclick="pfbCapEdit(\''+proj+'\','+idx+')">&#9998;</button></div>';
      h+='</div>';
    });
    pillarQuotes.forEach(function(q){
      h+='<div class="dp-row" style="grid-template-columns:'+tgt+';padding:5px 0;border-bottom:1px dashed var(--g200);opacity:.6">';
      h+='<div style="font-size:12px;color:var(--g500)">'+q.item+' <span style="font-size:9.5px;background:var(--g200);color:var(--g500);padding:1px 5px;border-radius:8px;font-weight:600">Quote</span></div>';
      h+='<div><span style="display:inline-block;background:var(--g200);color:var(--g500);font-size:10px;padding:1px 6px;border-radius:10px">—</span></div>';
      h+='<div style="font-size:11px;color:var(--g400)">Pending</div>';
      h+='<div style="font-size:11px;color:var(--g400)">TBD</div>';
      h+='<div style="font-size:11px;color:var(--g400)">Need-by '+q.needby+'</div>';
      h+='<div class="c" style="font-size:11px;color:var(--g400)">'+q.qty+'</div>';
      h+='<div></div>';
      h+='</div>';
    });
    h+='</div>';
    h+='<div class="eq-toolbar" style="margin-top:4px"><span class="dp-sec-t" style="font-size:11.5px">'+svg(IC.chart)+'Fab schedule vs. plant capacity</span></div>';
    h+='<div style="background:#fff;border:1px solid var(--g200);border-radius:8px;padding:12px 14px 14px;overflow:hidden">';
    var TD=274; var LW=110;
    var MO={Jan:-90,Feb:-59,Mar:-31,Apr:0,May:30,Jun:61,Jul:91,Aug:122,Sep:153,Oct:183,Nov:213,Dec:244};
    var pct=function(dstr){
      var pt=dstr.trim().split(' '); if(pt.length<2)return 0;
      var base=MO[pt[0]]; if(base===undefined)return 0;
      return Math.max(0,Math.min(100,parseFloat(((base+parseInt(pt[1])-1)/TD*100).toFixed(2))));
    };
    h+='<div style="display:flex;margin-bottom:6px">';
    h+='<div style="min-width:'+LW+'px"></div>';
    h+='<div style="position:relative;flex:1;height:20px;border-bottom:1px solid var(--g200)">';
    ['Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].forEach(function(m){
      var x=parseFloat((MO[m]/TD*100).toFixed(2));
      if(x<-0.1)return;
      h+='<div style="position:absolute;left:'+Math.max(0,x)+'%;font-size:10px;color:var(--g500);white-space:nowrap">'+m+'</div>';
      if(x>0.1)h+='<div style="position:absolute;left:'+x+'%;top:16px;height:2000px;border-left:1px solid var(--g100);pointer-events:none"></div>';
    });
    var todayPctFab=parseFloat(((122+10-1)/274*100).toFixed(2));h+='<div style="position:absolute;left:'+todayPctFab+'%;top:0;height:1500px;width:1.5px;background:#10b981;opacity:.35;pointer-events:none;z-index:2"></div>';h+='<div style="position:absolute;left:calc('+todayPctFab+'% + 2px);top:2px;font-size:8.5px;color:#10b981;font-weight:700;z-index:2">Today</div>';
    h+='</div></div>';
    TYPES.forEach(function(type){
      var tItems=items.filter(function(it){return it.t===type;});
      if(!tItems.length)return;
      var tc=TC[type]||'#888'; var tl=TL[type]||type;
      var rH=tItems.length*26+14;
      var gapItem=(CC_PREFAB_CAP.gaps[proj]||[]).filter(function(g){return g.t===type;})[0];
      h+='<div style="display:flex;align-items:flex-start;margin:3px 0;min-height:'+rH+'px;border-bottom:1px solid var(--g100)">';
      h+='<div style="min-width:'+LW+'px;font-size:11px;color:var(--g700);font-weight:600;padding-top:6px;padding-right:8px;flex-shrink:0">'+tl+'<div style="font-size:10px;color:var(--g400);font-weight:400">cap: '+caps[type]+'/wk</div></div>';
      h+='<div style="position:relative;flex:1;min-height:'+rH+'px">';
      if(gapItem){
        var gs=pct(gapItem.start); var ge=pct(gapItem.end);
        h+='<div style="position:absolute;left:'+gs+'%;width:'+(ge-gs)+'%;top:0;bottom:0;background:rgba(239,68,68,.1);border-left:2px solid rgba(239,68,68,.4)"></div>';
      }
      tItems.forEach(function(it,ri){
        var _p6mn2=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];var _bp6=it.p6Date?(function(s){var p=s.split('-');return new Date(+p[0],+p[1]-1,+p[2]);})(it.p6Date):null;var x1,x2;if(_bp6){var _bsd=it.shipD||3,_bmw=it.mfgWks||3;var _bfe=new Date(_bp6);_bfe.setDate(_bfe.getDate()-(_bsd+3));var _bfs=new Date(_bp6);_bfs.setDate(_bfs.getDate()-(_bsd+2+_bmw*7));x1=Math.max(0,pct(_p6mn2[_bfs.getMonth()]+' '+_bfs.getDate()));x2=Math.min(100,pct(_p6mn2[_bfe.getMonth()]+' '+_bfe.getDate()));}else{x1=pct(it.fs);x2=pct(it.fe);}var bw=Math.max(x2-x1,0.8);
        var top=ri*26+4;
        var isAdhoc=!!it.adhoc;
        var isInFab=it.status==='in_fab';
        var barColor=tc;
        var barSty='position:absolute;left:'+x1+'%;width:'+bw+'%;height:18px;top:'+top+'px;border-radius:4px;overflow:hidden;z-index:1;background:'+barColor+';opacity:'+(isInFab?'.92':(isAdhoc?'.5':(gapItem?'.85':'.72')));
        h+='<div title="'+it.item+' \u2502 Fab: '+it.fs+' \u2192 '+it.fe+' \u2502 Delivery ~+'+it.shipD+'d" style="'+barSty+'">';
        if(!isAdhoc)h+='<div style="font-size:9.5px;color:#fff;padding:2px 4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+it.item+'</div>';
        h+='</div>';
        var mx=pct(it.mo);
        if(mx>=0&&mx<=100)h+='<div title="Mat. order: '+it.mo+'" style="position:absolute;left:'+mx+'%;top:'+(top-1)+'px;width:2px;height:20px;background:#64748b;z-index:2;border-radius:1px"></div>';
        if(it.p6Date){var p6d=(function(s){var _p=s.split('-');return new Date(+_p[0],+_p[1]-1,+_p[2]);})(it.p6Date);var p6mn=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];var p6x=pct(p6mn[p6d.getMonth()]+' '+p6d.getDate());if(p6x>=0&&p6x<=100){h+='<div title="★ P6 install: '+it.p6Act+' · '+it.p6Date+'" style="position:absolute;left:calc('+p6x+'% - 1px);top:'+(top-2)+'px;width:2px;height:22px;background:#dc2626;z-index:5;border-radius:1px"></div>';}}
      });
      h+='<div style="position:absolute;bottom:0;left:0;right:0;border-top:1.5px dashed rgba(0,0,0,.1)"></div>';
      h+='</div></div>';
    });
    h+='<div style="display:flex;gap:10px;margin-top:12px;flex-wrap:wrap;padding-top:8px;border-top:1px solid var(--g100);align-items:center">';
    h+='<span style="font-size:10px;color:var(--g400);font-weight:600;text-transform:uppercase;letter-spacing:.04em">Types</span>';
    Object.keys(TC).forEach(function(t){ if(!TL[t])return; h+='<div style="display:flex;align-items:center;gap:4px;font-size:11px;color:var(--g600)"><div style="width:18px;height:10px;border-radius:2px;background:'+TC[t]+';opacity:.8"></div>'+TL[t]+'</div>'; });
    h+='<span style="width:1px;height:14px;background:var(--g200);margin:0 4px"></span>';
    h+='<div style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--g600)"><div style="width:2px;height:14px;background:#64748b"></div>Mat. order</div>';
    h+='<div style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--g600)"><div style="width:24px;height:10px;background:rgba(239,68,68,.15);border:1.5px solid rgba(239,68,68,.4)"></div>Capacity risk</div>';
    h+='<div style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--g600)"><div style="width:2px;height:14px;background:#dc2626;border-radius:1px"></div>P6 install date</div>';h+='<div style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--g600)"><div style="width:2px;height:14px;background:#10b981;opacity:.6"></div>Today</div>';
    h+='</div>';
    if(gaps.length){
      h+='<div style="margin-top:10px;display:flex;flex-wrap:wrap;gap:8px">';
      gaps.forEach(function(g){
        var tl2=TL[g.t]||g.t;
        h+='<div style="background:rgba(239,68,68,.06);border:1px solid rgba(239,68,68,.2);border-radius:6px;padding:5px 10px;font-size:11.5px"><span style="color:var(--red);font-weight:600">⚠ Capacity risk · '+tl2+'</span>&nbsp;&nbsp;<span style="color:var(--g600)">'+g.note+'</span></div>';
      });
      h+='</div>';
    } else {
      h+='<div style="margin-top:10px;font-size:11.5px;color:#16a34a">✓ No capacity conflicts for this project.</div>';
    }
    h+='</div>';
    return h;
  }
  function pfbCapEdit(proj,idx){
    if(!CC_PREFAB_CAP||!CC_PREFAB_CAP.plan[proj])return;
    var items=CC_PREFAB_CAP.plan[proj];
    var isNew=idx<0;
    var it=isNew?{item:'',t:'mechanical',qty:'',mo:'',fs:'',fe:'',shipD:5}:items[idx];
    var TL=CC_PREFAB_CAP.typeLabel;
    var TYPES=CC_PREFAB_CAP.types;
    var inp=function(id,val,ph,w){return '<input id="'+id+'" placeholder="'+(ph||'')+'" style="border:1px solid var(--g200);border-radius:5px;padding:3px 7px;font-size:12px;width:'+(w||'110px')+'" value="'+(val||'')+'"/>';};
    var b='<div class="fq-calc">';
    b+='<div class="fq-crow"><span>Item name</span><span>'+inp('pfbItem',it.item,'e.g. Structural support frames','200px')+'</span></div>';
    b+='<div class="fq-crow"><span>Assembly type</span><span><select id="pfbT" style="border:1px solid var(--g200);border-radius:5px;padding:3px 7px;font-size:12px">';
    TYPES.forEach(function(t){b+='<option value="'+t+'"'+(t===it.t?' selected':'')+'>'+TL[t]+'</option>';});
    b+='</select></span></div>';
    b+='<div class="fq-crow"><span>Mat. order date</span><span>'+inp('pfbMo',it.mo,'Apr 15','90px')+'</span></div>';
    b+='<div class="fq-crow"><span>Fab start</span><span>'+inp('pfbFs',it.fs,'May 1','90px')+'</span></div>';
    b+='<div class="fq-crow"><span>Fab finish date</span><span>'+inp('pfbFe',it.fe,'Aug 15','90px')+'</span></div>';
    b+='<div class="fq-crow"><span>Transit (days)</span><span>'+inp('pfbSd',it.shipD,'5','60px')+'</span></div>';
    b+='<div class="fq-crow"><span>Qty</span><span>'+inp('pfbQty',it.qty,'e.g. 12 modules','130px')+'</span></div>';
    b+='</div><div style="font-size:11px;color:var(--g400);padding:4px 0 8px">Dates: use “Mon DD” format (e.g. Jul 15). Timeline spans Apr–Dec 2026.</div>';
    b+='<div class="modal-foot">';
    if(!isNew)b+='<button class="btn btn-ghost" style="color:var(--red);margin-right:auto" onclick="pfbCapDelete(\''+proj+'\','+idx+')">Remove</button>';
    b+='<button class="btn btn-ghost" onclick="closeModal()">Cancel</button>';
    b+='<button class="btn btn-dark" onclick="pfbCapSave(\''+proj+'\','+idx+')">Save</button></div>';
    openModal((isNew?'Add capacity plan line':'Edit — '+it.item),b);
  }
  function pfbCapAdd(proj){pfbCapEdit(proj,-1);}
  function pfbCapSave(proj,idx){
    if(!CC_PREFAB_CAP.plan[proj])CC_PREFAB_CAP.plan[proj]=[];
    var items=CC_PREFAB_CAP.plan[proj];
    var g=function(id){var el=document.getElementById(id);return el?el.value.trim():'';};
    var it=idx>=0?items[idx]:{};
    var nItem=g('pfbItem'); if(nItem)it.item=nItem;
    var nT=g('pfbT'); if(nT)it.t=nT;
    var nMo=g('pfbMo'); if(nMo)it.mo=nMo;
    var nFs=g('pfbFs'); if(nFs)it.fs=nFs;
    var nFe=g('pfbFe'); if(nFe)it.fe=nFe;
    var nSd=parseInt(g('pfbSd')); if(nSd>0)it.shipD=nSd;
    var nQty=g('pfbQty'); if(nQty)it.qty=nQty;
    if(idx<0)items.push(it);
    closeModal();
    renderCcScreen(ccActive);
  }
  function pfbCapDelete(proj,idx){
    if(CC_PREFAB_CAP.plan[proj])CC_PREFAB_CAP.plan[proj].splice(idx,1);
    closeModal();
    renderCcScreen(ccActive);
  }

  function dpDocCell(p,row){
    var docs=row.attachments||[];
    if(!docs.length) return '<button class="btn btn-ghost btn-sm" style="font-size:10.5px;padding:2px 7px;color:var(--g400)" onclick="event.stopPropagation();dpDocModal(\''+p+'\',\''+row._proj+'\','+row._idx+')">+ Add</button>';
    return '<button class="btn btn-ghost btn-sm" style="font-size:11px;padding:2px 8px" onclick="event.stopPropagation();dpDocModal(\''+p+'\',\''+row._proj+'\','+row._idx+')">' 
      +docs.length+(docs.length===1?' doc':' docs')+'</button>';
  }
  function dpDocModal(p,proj,idx){
    var rows=CC_PROJ_DP[p]&&CC_PROJ_DP[p][proj]&&CC_PROJ_DP[p][proj].rows;
    var row=rows&&rows[idx]; if(!row)return;
    openModal('Documentation · '+row.item, attachmentsHTML(row.attachments||[]));
  }
  function portalDpDocModal(pk,rowIdx){
    var row=DP[pk]&&DP[pk].rows&&DP[pk].rows[rowIdx]; if(!row)return;
    openModal('Documentation · '+(row.role||row.asm||row.move||row.item||''), attachmentsHTML(row.attachments||[]));
  }
  function dpRowClick(p,proj,idx){
    var rows=CC_PROJ_DP[p]&&CC_PROJ_DP[p][proj]&&CC_PROJ_DP[p][proj].rows;
    var row=rows&&rows[idx];
    if(row&&row.ordId){ccDpTracker(row.ordId);return;}
    var _isDp=(_dpCcProjMap[p]&&_dpCcProjMap[p]!=='all');
    dpDpModal(p,proj,idx,_isDp);
  }
  function dpAllReqModal(p,proj,idx){
    var rows=CC_PROJ_DP[p]&&CC_PROJ_DP[p][proj]&&CC_PROJ_DP[p][proj].rows;
    var row=rows&&rows[idx]; if(!row)return;
    var _pL={equipment:'Equipment',logistics:'Logistics',procurement:'Procurement',prefab:'Pre-fab',profservices:'Prof. Services'};
    var _prL={hercules:'Hercules Solar + BESS',riverside:'Riverside Medical Center',cimarron:'Cimarron Data Center'};
    var _toneM={Active:'ok','On-rent':'ok',Delivered:'ok',Fulfilled:'ok',Scheduled:'info','PO issued':'info',Ordered:'info','In fabrication':'info',Submittal:'info','Off-rent':'neu',Demobilized:'neu',Requested:'warn','Pending pricing':'warn','Awaiting pricing':'warn','At-risk':'bad'};
    var tone=_toneM[row.state]||'neu';
    var b='<div style="padding:4px 0 16px">';
    b+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px 24px;font-size:12px;margin-bottom:14px">';
    b+='<div><div style="color:var(--g500);font-size:10.5px;margin-bottom:2px">Project</div><div>'+(_prL[proj]||proj)+'</div></div>';
    b+='<div><div style="color:var(--g500);font-size:10.5px;margin-bottom:2px">State</div><div><span class="tag '+tone+'">'+row.state+'</span></div></div>';
    b+='<div><div style="color:var(--g500);font-size:10.5px;margin-bottom:2px">Qty</div><div>'+(row.qty||'\u2014')+'</div></div>';
    b+='<div><div style="color:var(--g500);font-size:10.5px;margin-bottom:2px">Window</div><div>'+(row.window||'\u2014')+'</div></div>';
    if(row.cost){b+='<div><div style="color:var(--g500);font-size:10.5px;margin-bottom:2px">Rate / cost</div><div>'+row.cost+'</div></div>';}
    if(row.firm){b+='<div><div style="color:var(--g500);font-size:10.5px;margin-bottom:2px">Vendor</div><div>'+row.firm+'</div></div>';}
    b+='</div>';
    if(row.ordId){b+='<div style="padding:8px 12px;background:var(--g50);border-radius:6px;font-size:11.5px;margin-bottom:12px"><span style="color:var(--g500)">Order ID: </span><span style="font-weight:600;font-family:monospace">'+row.ordId+'</span></div>';}
    b+='</div>';
    b+='<div class="modal-foot">';
    b+='<button class="btn btn-ghost" onclick="closeModal()">Close</button>';
    b+='<button class="btn btn-dark" onclick="dpGoDP(\''+p+'\',\''+proj+'\');closeModal()">View in demand plan \u2192</button>';
    b+='<button class="btn btn-dark" onclick="ccGo(\'fulfill\');closeModal()">View in fulfillment queue \u2192</button>';
    b+='</div>';
    openModal(row.item+' \u2014 '+(_pL[p]||p),b);
  }
  function ccDpTracker(ordId){
    var o=ORDERS.filter(function(x){return x.id===ordId;})[0];
    if(!o){toast('No order data for '+ordId);return;}
    var ns=CURRENT==='ns';
    var bills=CC_DP_BILLS[ordId]||[];
    var billH='';
    if(bills.length){ billH=buildDpBillingInline(ordId); }
    openModal('Order — '+ordId, trackerHTML(o,ns)+billH);
  }
  function dpExpandToggle(id){ var d=document.getElementById(id); if(d)d.style.display=d.style.display==='none'?'block':'none'; }
  function buildDpBillingInline(ordId){
    var bills=CC_DP_BILLS[ordId]||[];
    if(!bills.length) return '';
    var gb='140px 80px 95px 75px 1fr';
    var h='<div style="margin-top:8px;padding-top:8px;border-top:1px solid var(--g100)">';
    h+='<div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:var(--g500);margin-bottom:6px">Billing history</div>';
    h+='<div class="dp-head" style="grid-template-columns:'+gb+';font-size:10.5px;margin-top:6px"><span>Reference</span><span>Period</span><span>Amount</span><span>Status</span><span>Cost code</span></div>';
    bills.forEach(function(b){
      var bst=b.status==='Paid'?'ok':b.dispute?'bad':'warn';
      var hasD=!!(b.dispute||b.ccChange);
      var did='bdet-'+b.inv.replace(/[^a-zA-Z0-9]/g,'-');
      h+='<div class="dp-row" style="grid-template-columns:'+gb+';padding:5px 0;border-bottom:1px solid var(--g100)'+(hasD?';cursor:pointer':'')+'"'+(hasD?' onclick="event.stopPropagation();var nx=this.nextElementSibling;if(nx){nx.style.display=nx.style.display===\'none\'?\'block\':\'none\';if(nx.style.display===\'block\')nx.scrollIntoView({block:\'nearest\',behavior:\'smooth\'});}"':'')+'>';
      h+='<div style="font-size:11px;font-family:monospace;color:var(--g900)">'+b.inv+(b.dispute?'<span class="tag bad" style="font-size:9px;padding:0 4px;margin-left:5px;vertical-align:middle">Dispute</span>':'')+(b.ccChange&&!b.dispute?'<span class="tag warn" style="font-size:9px;padding:0 4px;margin-left:5px;vertical-align:middle">CC change</span>':'')+(hasD?' <span style="font-size:10px;color:var(--g400)">&#9660;</span>':'')+'</div>';
      h+='<div style="font-size:11px;color:var(--g600)">'+b.period+'</div>';
      h+='<div style="font-size:12px;font-weight:600;text-align:right">'+(b.amount!=null?('$'+b.amount.toLocaleString()):'Pending')+'</div>';
      h+='<div><span class="tag '+bst+'">'+b.status+'</span></div>';
      h+='<div style="font-size:10px;font-family:monospace;color:var(--g500)">'+b.cc+(b.status==='Paid'?'<br><button class="btn btn-ghost btn-sm" style="font-size:10px;padding:1px 6px;margin-top:2px" onclick="event.stopPropagation();toast(\'Bill PDF \u2014 '+b.inv+'\')">Bill PDF</button>':'')+'</div>';
      h+='</div>';
      if(hasD){
        h+='<div id="'+did+'" style="display:none;padding:4px 8px 8px;background:var(--g50);border-left:2px solid var(--g200);margin-bottom:2px">';
        if(b.dispute) h+='<div style="background:rgba(239,68,68,.06);border-left:3px solid var(--red);padding:4px 8px;font-size:11px;color:var(--g700);margin-top:3px"><b>Dispute:</b> '+b.dispute+'</div>';
        if(b.ccChange) h+='<div style="background:rgba(245,158,11,.07);border-left:3px solid #f59e0b;padding:4px 8px;font-size:11px;color:var(--g700);margin-top:3px"><b>Cost code change:</b> '+b.ccChange+'</div>';
        h+='</div>';
      }
    });
    h+='</div>';
    return h;
  }
  function attachmentsHTML(docs){
    if(!docs) docs=[];
    var groups={};
    docs.forEach(function(d){ if(!groups[d.type]) groups[d.type]=[]; groups[d.type].push(d); });
    var h='<div style="border-top:1px solid var(--g100);padding:12px 0 4px">';
    h+='<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">';
    h+='<div style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:var(--g500)">Attached documentation<span style="font-weight:400;color:var(--g400);margin-left:6px">('+docs.length+')</span></div>';
    h+='<button class="btn btn-ghost btn-sm" style="font-size:10.5px" onclick="event.stopPropagation();var up=this.parentElement.nextElementSibling;up.style.display=up.style.display===\'none\'?\'block\':\'none\';if(up.style.display===\'block\')up.scrollIntoView({block:\'nearest\',behavior:\'smooth\'})">+ Upload</button>';
    h+='</div>';
    h+='<div id="dp-up-panel" style="display:none;background:var(--g50);border:1px solid var(--g200);border-radius:6px;padding:10px 12px;margin-bottom:10px">';
    h+='<div style="font-size:10.5px;color:var(--g500);margin-bottom:6px;font-weight:600">Tag document type</div>';
    h+='<div style="display:flex;gap:8px;align-items:center">';
    h+='<select style="flex:1;border:1px solid var(--g200);border-radius:4px;padding:5px 8px;font-size:12px;font-family:inherit;color:var(--g700);background:#fff"><option value="">Select type…</option><option value="RFIs">RFIs</option><option value="Submittals">Submittals</option><option value="Engineering">Engineering</option><option value="Safety">Safety</option><option value="Quality">Quality</option><option value="Quotes">Quotes / Bills of Lading</option><option value="Shipping">Shipping / Logistics</option><option value="Crew Design">Crew Focused Design</option><option value="Change Orders">Change Orders / Schedule Impacts</option><option value="Turnover — COPI">Turnover — COPI</option><option value="Turnover — COPO">Turnover — COPO</option></select>';
    h+='<button class="btn btn-dark btn-sm" onclick="event.stopPropagation();dpUploadAttach(this)">Upload</button>';
    h+='<button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();this.parentElement.parentElement.style.display=\'none\'">Cancel</button>';
    h+='</div>';
    h+='<div class="dp-up-confirm" style="display:none;margin-top:8px;background:rgba(16,185,129,.08);border:1px solid rgba(16,185,129,.25);border-radius:4px;padding:6px 10px;font-size:11.5px;color:#065f46">'
      +'&#10003; Document uploaded successfully — it will appear in the list once reviewed.</div>';
    h+='</div>';
    if(docs.length){
      Object.keys(groups).forEach(function(type){
        h+='<div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:rgba(99,102,241,.85);margin:6px 0 3px">'+type+'</div>';
        groups[type].forEach(function(d){
          var st=d.status==='Approved'||d.status==='Available'?'ok':d.status==='Pending'||d.status==='In review'?'warn':'neu';
          h+='<div style="display:flex;align-items:center;justify-content:space-between;padding:5px 8px;background:var(--g50);border-radius:4px;border:1px solid var(--g100);margin-bottom:3px">';
          h+='<div style="min-width:0;flex:1"><span style="font-size:11.5px;color:var(--g900)">'+d.name+'</span><span style="font-size:10px;color:var(--g400);margin-left:8px">'+d.ref+'</span></div>';
          h+='<div style="display:flex;align-items:center;gap:6px;flex-shrink:0;margin-left:8px"><span class="tag '+st+'" style="font-size:9.5px;padding:0 5px">'+d.status+'</span>';
          h+='<button class="btn btn-ghost btn-sm" style="font-size:10.5px;padding:2px 7px" onclick="event.stopPropagation();dpDocDownload(\''+d.ref+'\')">↓ PDF</button></div></div>';
        });
      });
    } else {
      h+='<div style="font-size:11.5px;color:var(--g400);padding:4px 0">No documents attached yet.</div>';
    }
    h+='</div>';
    return h;
  }
  function dpDocDownload(ref){ toast('Opening '+ref+' — document staged'); }
  function dpUploadAttach(btn){
    var panel=btn.parentElement.parentElement;
    var t=panel.querySelector('select');
    if(!t||!t.value){ toast('Select a document type first'); return; }
    var conf=panel.querySelector('.dp-up-confirm');
    if(conf) conf.style.display='block';
    t.value='';
  }
  function dpRowById(p,id){ var rs=CC_DP[p].rows; for(var i=0;i<rs.length;i++){ if(rs[i].id===id)return rs[i]; } return null; }
  function dpTaxCell(r){
    var CHK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>';
    var BOLT='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/></svg>';
    if(r.taxOk) return '<span class="dp-tax ok">'+CHK+r.tax+(r.leaf?(' \u203a '+r.leaf):'')+'</span>';
    return '<span class="dp-tax warn">'+BOLT+r.tax+' \u00b7 confirm</span>';
  }
  function dpReviewCell(p,r,ns){ if(r.taxOk){ return '<button class="btn btn-ghost btn-sm" onclick="dpReview(\''+p+'\',\''+r.id+'\')">View</button>'; } var cls=ns?'btn-red':'btn-dark'; return '<button class="btn '+cls+' btn-sm" onclick="dpReview(\''+p+'\',\''+r.id+'\')">Confirm</button>'; }
  function eqRefreshDrill(id){
    var el=document.getElementById('eq-drill-'+id);
    var l=EQ_LINES.filter(function(x){return x.id===id;})[0];
    if(el&&l)el.innerHTML=buildEqTrack(l);
    renderEqPlan();
  }
  var _EQ_PFX={gen45:'GEN',lighttower:'LT',tele10:'TH',boom60:'BL',scissor32:'SL',excav20:'EX',excav45:'EX',crane150:'CR',crane90:'RT',crane230:'CR'};
  function _eqDescPfx(l){
    if(l.catId&&_EQ_PFX[l.catId])return _EQ_PFX[l.catId];
    var d=(l.desc||'').toLowerCase();
    if(d.indexOf('dozer')>=0)return 'DZ';
    if(d.indexOf('compaction')>=0||d.indexOf('roller')>=0)return 'RL';
    if(d.indexOf('pile')>=0)return 'PD';
    if(d.indexOf('crawler')>=0)return 'CR';
    if(d.indexOf('grader')>=0)return 'GR';
    if(d.indexOf('excavator')>=0)return 'EX';
    if(d.indexOf('telehandler')>=0)return 'TH';
    if(d.indexOf('crane')>=0)return 'CR';
    if(d.indexOf('generator')>=0)return 'GEN';
    if(d.indexOf('light')>=0)return 'LT';
    return 'EQ';
  }
  function initEqOnRentAssets(){
    if(!EQ_LINES)return;
    for(var i=0;i<EQ_LINES.length;i++){
      var l=EQ_LINES[i];
      if(l.status!=='on-rent'&&l.status!=='off-rent')continue;
      if(_dpRowAssets[l.id]&&_dpRowAssets[l.id].length)continue;
      var _isOffR=l.status==='off-rent';
      var pfx=_eqDescPfx(l);
      var arr=[];
      for(var k=1;k<=l.qty;k++){
        var num=k<10?'0'+k:''+k;
        arr.push({id:pfx+'-HRC-'+num,cls:l.desc,yard:_isOffR?'Returned · Hercules':'On site · Hercules',status:_isOffR?'offrent':'onrent'});
      }
      _dpRowAssets[l.id]=arr;
    }
  }
  function initCcEquipAssets(){
    var _pfxMap=[['generator','GEN'],['light tower','LT'],['telehandler','TH'],['boom lift','BL'],['scissor','SL'],['excavator','EX'],['crane','CR'],['dozer','DZ'],['grader','GR'],['compaction','RL'],['roller','RL'],['forklift','FK'],['pile','PD'],['crawler','CR'],['suv','VH'],['truck','TK']];
    var _siteMap={hercules:'On site · Hercules',riverside:'On site · Riverside',cimarron:'On site · Cimarron'};
    if(!ORDERS)return;
    for(var i=0;i<ORDERS.length;i++){
      var o=ORDERS[i];
      if(o.pillar!=='equipment')continue;
      if(_dpRowAssets[o.id]&&_dpRowAssets[o.id].length)continue;
      var lat=(o.latest||'').toLowerCase();
      var isOnRent=lat.indexOf('on-rent')>=0||lat.indexOf('on rent')>=0;
      var isOffRent=lat.indexOf('off-rent')>=0||lat.indexOf('off rent')>=0;
      if(!isOnRent&&!isOffRent)continue;
      var pfx='EQ';
      var itm=(o.item||'').toLowerCase();
      for(var pi=0;pi<_pfxMap.length;pi++){if(itm.indexOf(_pfxMap[pi][0])>=0){pfx=_pfxMap[pi][1];break;}}
      var qty=o.qty||1;
      var sm=o.sub||'';
      var qm=sm.match(/^(\d+)\s*(unit|x|×)/i);
      if(qm)qty=parseInt(qm[1]);
      if(qty>20)qty=20;
      var projKey=(o.proj||'hercules').toLowerCase();
      var yardLbl=_siteMap[projKey]||(isOffRent?'Returned':'On site');
      if(isOffRent)yardLbl=yardLbl.replace('On site','Returned');
      var projAbbr=(o.proj||'HRC').toUpperCase().slice(0,3);
      var arr=[];
      for(var k=1;k<=qty;k++){
        var num=k<10?'0'+k:''+k;
        arr.push({id:pfx+'-'+projAbbr+'-'+num,cls:o.item,yard:yardLbl,status:isOffRent?'offrent':'onrent'});
      }
      _dpRowAssets[o.id]=arr;
    }
  }
  function dpOpenAssetPicker(rowId,itemType){
    var assigned=_dpRowAssets[rowId]||[];
    var h='';
    if(assigned.length){
      h+='<div style="margin-bottom:12px">';
      h+='<div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--g500);margin-bottom:7px">Currently assigned</div>';
      h+='<div style="display:flex;flex-direction:column;gap:4px">';
      assigned.forEach(function(a){
        h+='<div style="display:flex;align-items:center;gap:8px;padding:5px 10px;background:var(--g50);border-radius:5px;font-size:12px">';
        h+='<span style="font-family:monospace;font-size:11px;font-weight:600;color:var(--g700);min-width:90px">'+a.id+'</span>';
        h+='<span style="flex:1;color:var(--g600)">'+a.cls+'</span>';
        h+='<span style="color:var(--g500);font-size:11px">'+( a.yard||'')+'</span>';
        h+='<button onclick="dpRemoveRowAsset(\''+rowId+'\',\''+a.id+'\')" style="font-size:10px;padding:1px 6px;border-radius:4px;border:1px solid var(--g200);background:#fff;cursor:pointer;color:var(--red)">\u00d7 Remove</button>';
        h+='</div>';
      });
      h+='</div></div>';
      h+='<div style="border-top:1px solid var(--g150);margin-bottom:12px"></div>';
    }
    h+='<div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--g500);margin-bottom:10px">Add asset</div>';
    h+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:12px">';
    h+='<div><div style="font-size:10.5px;color:var(--g500);margin-bottom:4px">Asset ID</div><input id="dpCA-id" placeholder="e.g. GEN-0990" style="width:100%;box-sizing:border-box;padding:6px 9px;border:1px solid var(--g200);border-radius:5px;font-size:12.5px;outline:none;font-family:monospace"></div>';
    h+='<div><div style="font-size:10.5px;color:var(--g500);margin-bottom:4px">Type / Make</div><input id="dpCA-cls" placeholder="e.g. Generator 125 kW" style="width:100%;box-sizing:border-box;padding:6px 9px;border:1px solid var(--g200);border-radius:5px;font-size:12.5px;outline:none;font-family:inherit"></div>';
    h+='<div><div style="font-size:10.5px;color:var(--g500);margin-bottom:4px">Yard / Location</div><input id="dpCA-yard" placeholder="e.g. On site" style="width:100%;box-sizing:border-box;padding:6px 9px;border:1px solid var(--g200);border-radius:5px;font-size:12.5px;outline:none;font-family:inherit"></div>';
    h+='</div>';
    h+='<button class="btn btn-red" onclick="dpAssignCustomAsset(\''+rowId+'\')" style="width:100%">+ Add asset</button>';
    openModal('Assign asset',h);
  }
  function dpAssignFleetAsset(rowId,assetId){
    var f=FLEET.filter(function(x){return x.id===assetId;})[0]; if(!f)return;
    if(!_dpRowAssets[rowId])_dpRowAssets[rowId]=[];
    if(!_dpRowAssets[rowId].some(function(a){return a.id===assetId;})){
      _dpRowAssets[rowId].push({id:f.id,cls:f.cls,yard:f.yard,status:f.status,hours:f.hours,cond:f.cond});
    }
    closeModal(); renderCcDemand('equipment'); eqRefreshDrill(rowId);
  }
  function dpAssignCustomAsset(rowId){
    var idEl=document.getElementById('dpCA-id');
    var clsEl=document.getElementById('dpCA-cls');
    var yardEl=document.getElementById('dpCA-yard');
    if(!idEl||!idEl.value.trim()){return;}
    if(!_dpRowAssets[rowId])_dpRowAssets[rowId]=[];
    _dpRowAssets[rowId].push({id:idEl.value.trim(),cls:clsEl?clsEl.value.trim():'',yard:yardEl?yardEl.value.trim():'',status:'assigned',custom:true});
    closeModal(); renderCcDemand('equipment'); eqRefreshDrill(rowId);
  }
  function dpRemoveRowAsset(rowId,assetId){
    if(!_dpRowAssets[rowId])return;
    _dpRowAssets[rowId]=_dpRowAssets[rowId].filter(function(a){return a.id!==assetId;});
    renderCcDemand('equipment'); eqRefreshDrill(rowId);
  }
  function dpOffrentRowAsset(rowId,assetId){
    var list=_dpRowAssets[rowId]; if(!list)return;
    for(var i=0;i<list.length;i++){if(list[i].id===assetId){list[i].status='offrent';break;}}
    renderCcDemand('equipment'); eqRefreshDrill(rowId);
  }
  function dpInitOffrentModal(rowId,desc){
    var list=(_dpRowAssets[rowId]||[]).filter(function(a){return a.status!=='offrent';});
    if(!list.length){return;}
    var h='<div style="font-size:12px;color:var(--g600);margin-bottom:14px">Select the units to return. This action marks them off-rent — it won\'t remove them from the record.</div>';
    h+='<div style="display:flex;flex-direction:column;gap:6px;max-height:340px;overflow-y:auto;margin-bottom:16px">';
    list.forEach(function(a,i){
      h+='<label style="display:flex;align-items:center;gap:10px;padding:7px 10px;border:1px solid var(--g150);border-radius:7px;cursor:pointer;font-size:12.5px;background:var(--g50)">';
      h+='<input type="checkbox" id="ofr-'+i+'" value="'+a.id+'" style="width:15px;height:15px;cursor:pointer;accent-color:var(--success)">';
      h+='<span style="font-family:monospace;font-weight:600;color:var(--g800);min-width:90px">'+a.id+'</span>';
      h+='<span style="color:var(--g500);font-size:11.5px">'+a.cls+'</span>';
      h+='<span style="margin-left:auto;color:var(--g400);font-size:11px">'+( a.yard||'On site')+'</span>';
      h+='</label>';
    });
    h+='</div>';
    h+='<div style="display:flex;gap:8px">';
    h+='<button class="btn btn-ghost btn-sm" onclick="var all=document.querySelectorAll(\'[id^=ofr-]\');all.forEach(function(c){c.checked=true;})" style="font-size:11px">Select all</button>';
    h+='<button class="btn btn-ghost btn-sm" onclick="var all=document.querySelectorAll(\'[id^=ofr-]\');all.forEach(function(c){c.checked=false;})" style="font-size:11px">Clear</button>';
    var _isV1=CURRENT!=='ns';
    h+='<button class="btn btn-red" style="margin-left:auto" onclick="dpConfirmOffrent(\''+rowId+'\')">↓ '+(_isV1?'Send to YardHub':'Confirm off-rent')+'</button>';
    h+='</div>';
    openModal('Initiate off-rent — '+(desc||rowId),h);
  }
  function dpConfirmOffrent(rowId){
    var checked=document.querySelectorAll('[id^=ofr-]:checked');
    if(!checked.length)return;
    var list=_dpRowAssets[rowId]; if(!list)return;
    var ids=[];
    checked.forEach(function(cb){
      var id=cb.value; ids.push(id);
      for(var i=0;i<list.length;i++){if(list[i].id===id){list[i].status='offrent';break;}}
    });
    closeModal();
    renderCcDemand('equipment'); eqRefreshDrill(rowId);
    if(CURRENT!=='ns'){
      toastHtml('<div style="display:flex;align-items:center;gap:10px"><div style="width:28px;height:28px;border-radius:50%;background:rgba(16,185,129,.15);display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div><div><div style="font-weight:600;font-size:12.5px">Sent to YardHub</div><div style="font-size:11px;opacity:.75;margin-top:1px">'+ids.length+' unit'+(ids.length===1?'':'s')+' · Off-rent initiated</div></div></div>');
    }
  }
  function dpSetEquipView(v){_dpEquipView=v;renderCcDemand('equipment');}
  function dpAddCustomAttr(reqId){var el=document.getElementById('dpAttrIn-'+reqId);if(!el||!el.value.trim())return;var v=el.value.trim();if(!_dpItemAttrs[reqId])_dpItemAttrs[reqId]=[];if(_dpItemAttrs[reqId].indexOf(v)<0)_dpItemAttrs[reqId].push(v);el.value='';renderCcDemand('equipment');}
  function dpRemoveCustomAttr(reqId,attr){if(!_dpItemAttrs[reqId])return;var i=_dpItemAttrs[reqId].indexOf(attr);if(i>=0){_dpItemAttrs[reqId].splice(i,1);renderCcDemand('equipment');}}
  function renderEquipGantt(selProj,ns){
    initCcEquipAssets();
    var GMONTHS=EQ_MONTHS.slice(0,11);
    var N=GMONTHS.length, todayIdx=GMONTHS.indexOf(EQ_TODAY), todayPct=((todayIdx+1)/N)*100;
    var MNS={Jan:'01',Feb:'02',Mar:'03',Apr:'04',May:'05',Jun:'06',Jul:'07',Aug:'08',Sep:'09',Oct:'10',Nov:'11',Dec:'12'};
    function toMoKey(s,def){
      if(!s)return def;
      var yr=s.match(/20[2-9][0-9]/); var y=yr?yr[0]:'2026';
      var mn=s.match(/Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/i);
      if(!mn)return def;
      var k=mn[0].charAt(0).toUpperCase()+mn[0].slice(1,3).toLowerCase();
      return y+'-'+(MNS[k]||'01');
    }
    function parseWinMo(w){
      if(!w||/ongoing/i.test(w))return{from:GMONTHS[0],to:GMONTHS[N-1]};
      var pts=w.split(/[–—]/);
      var from=toMoKey(pts[0],GMONTHS[0]);
      var to=pts.length>1?toMoKey(pts[pts.length-1],from):from;
      return{from:from,to:to};
    }
    function gIdx(m){var i=GMONTHS.indexOf(m);return i<0?0:i;}
    var LW=260, FQW=52;
    var mh='';
    for(var i=0;i<N;i++){
      var _m=GMONTHS[i];
      var yrStart=(i===0)||(eqMonthYear(_m)!==eqMonthYear(GMONTHS[i-1]));
      mh+='<div class="gh-m">'+eqMonthLabel(_m)+(yrStart?'<span class="ghy">\u2019'+_m.slice(2,4)+'</span>':'')+'</div>';
    }
    var fqHead='<div style="width:'+FQW+'px;flex-shrink:0;font-size:9.5px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:var(--g400);display:flex;align-items:center;justify-content:center;border-left:1px solid var(--g200)">FQ</div>';
    var head='<div class="g-head"><div class="gh-label" style="width:'+LW+'px">Equipment / billing</div><div class="gh-months">'+mh+'</div>'+fqHead+'</div>';
    var grid='repeating-linear-gradient(to right, transparent 0, transparent calc('+(100/N)+'% - 1px), var(--g150) calc('+(100/N)+'% - 1px), var(--g150) calc('+(100/N)+'%))';
    var rows='';
    if(selProj==='all'){
      ['hercules','riverside','cimarron'].forEach(function(proj){
        var pRows=(CC_PROJ_DP.equipment&&CC_PROJ_DP.equipment[proj]&&CC_PROJ_DP.equipment[proj].rows)||[];
        if(!pRows.length)return;
        var PC={hercules:'Hercules Solar + BESS',riverside:'Riverside Medical',cimarron:'Cimarron Data Center'};
        rows+='<div class="g-grp"><span class="ggc">'+pRows.length+'</span>'+PC[proj]+'<span class="ggmeta">'+pRows.filter(function(r){return r.state==='On-rent';}).length+' on-rent</span></div>';
        pRows.forEach(function(row){
          var win=parseWinMo(row.window);
          var a=gIdx(win.from),b=gIdx(win.to); if(b>=N)b=N-1;
          var left=(a/N)*100, width=((b-a+1)/N)*100;
          var stt=row.state==='On-rent'?'onrent':row.state==='Off-rent'?'offrent':'projected';
          var qtyNum=(row.qty||'').split(' ')[0];
          rows+='<div class="grow"><div class="g-label" style="width:'+LW+'px"><span style="overflow:hidden;text-overflow:ellipsis">'+row.item+'</span><span class="gqty">×'+qtyNum+'</span></div>';
          rows+='<div class="g-track" style="background-image:'+grid+'"><div class="g-bar '+stt+' vw" style="left:'+left.toFixed(3)+'%;width:calc('+width.toFixed(3)+'% - 3px)">×'+qtyNum+'</div></div>';
          rows+='<div style="width:'+FQW+'px;flex-shrink:0;display:flex;align-items:center;justify-content:center;border-left:1px solid var(--g100)"><button class="gas-btn" style="font-size:9px;padding:1px 5px" onclick="event.stopPropagation();ccGoFulfill(\''+row.ordId+'\')">FQ</button></div>';
          rows+='</div>';
        });
      });
    } else {
      var dpRows=(CC_PROJ_DP.equipment&&CC_PROJ_DP.equipment[selProj]&&CC_PROJ_DP.equipment[selProj].rows)||[];
      var GRP=[
        {title:'On-rent',key:'onrent',rows:dpRows.filter(function(r){return r.state==='On-rent';})},
        {title:'Projected / requested',key:'projected',rows:dpRows.filter(function(r){return r.state==='Projected'||r.state==='Requested'||r.state==='Scheduled'||r.state==='PO issued';})},
        {title:'Off-rent — returned',key:'offrent',rows:dpRows.filter(function(r){return r.state==='Off-rent'||r.state==='Demobilized';})}
      ];
      GRP.forEach(function(g){
        if(!g.rows.length)return;
        rows+='<div class="g-grp"><span class="ggc">'+g.rows.length+'</span>'+g.title+'</div>';
        g.rows.forEach(function(row){
          var win=parseWinMo(row.window);
          var a=gIdx(win.from),b=gIdx(win.to); if(b>=N)b=N-1;
          var left=(a/N)*100, width=((b-a+1)/N)*100;
          var stt=g.key;
          var _rA=_dpRowAssets[row.ordId]||[];
          var _panId='ccgp-'+(row.ordId||'').replace(/[^a-z0-9]/gi,'');
          var _onR=_rA.filter(function(a){return a.status!=='offrent';}).length;
          var _offR=_rA.length-_onR;
          var _isOff=stt==='offrent';
          var _hasAss=stt==='onrent'||stt==='offrent'||stt==='projected';
          var qtyNum=(row.qty||'').split(' ')[0];
          rows+='<div class="gas-row-wrap">';
          rows+='<div class="grow" style="min-height:44px;cursor:'+(_hasAss?'pointer':'default')+'"'+(_hasAss?' data-panel="'+_panId+'" onclick="gasToggle(this)"':'')+' >';
          rows+='<div class="g-label" style="width:'+LW+'px;flex-direction:column;align-items:flex-start;padding:5px 10px;height:auto;min-height:44px;white-space:normal;gap:1px">';
          rows+='<div style="display:flex;align-items:center;gap:4px;width:100%;min-width:0">';
          rows+='<span style="font-size:11.5px;font-weight:600;color:var(--g800);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1">'+row.item+'</span>';
          rows+='<span class="gqty">×'+qtyNum+'</span>';
          rows+='</div>';
          rows+='<div style="display:flex;align-items:center;gap:5px;width:100%;min-width:0">';
          if(row.firm)rows+='<span style="font-size:9.5px;color:var(--g500);flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+row.firm+'</span>';
          if(row.cost)rows+='<span style="font-size:9.5px;color:var(--g600);font-weight:600;white-space:nowrap">'+row.cost+'</span>';
          rows+='</div>';
          if(_hasAss&&_rA.length){
            rows+='<div style="display:flex;gap:2px;flex-wrap:wrap;margin-top:2px">';
            var previewCount=Math.min(_rA.length,4);
            for(var ai=0;ai<previewCount;ai++){
              var _a=_rA[ai]; var _isAOff=_a.status==='offrent';
              rows+='<span style="font-family:var(--mono);font-size:8px;padding:1px 4px;border-radius:3px;background:'+(_isAOff?'var(--g100)':'rgba(16,185,129,.08)')+';border:1px solid '+(_isAOff?'var(--g200)':'rgba(16,185,129,.25)')+';color:'+(_isAOff?'var(--g400)':'#166534')+';white-space:nowrap">'+_a.id+'</span>';
            }
            if(_rA.length>4)rows+='<span style="font-size:8px;color:var(--g400);align-self:center">+'+(_rA.length-4)+' more</span>';
            rows+='</div>';
          }
          rows+='</div>';
          rows+='<div class="g-track" style="background-image:'+grid+';">';
          rows+='<div class="g-bar '+stt+' vw" style="left:'+left.toFixed(3)+'%;width:calc('+width.toFixed(3)+'% - 3px)" onclick="event.stopPropagation();ccDpTracker(\''+row.ordId+'\')" title="Click to view order">×'+qtyNum+'</div>';
          rows+='</div>';
          rows+='<div style="width:'+FQW+'px;flex-shrink:0;display:flex;align-items:center;justify-content:center;border-left:1px solid var(--g100)">';
          rows+='<button class="gas-btn" style="font-size:9px;padding:2px 6px" onclick="event.stopPropagation();ccGoFulfill(\''+row.ordId+'\')" title="View in Fulfillment Queue">FQ →</button>';
          rows+='</div>';
          rows+='</div>';
          if(_hasAss){
            rows+='<div id="'+_panId+'" class="gas-panel open">';
            rows+='<div class="gas-panel-hd" style="margin-left:'+LW+'px;padding-right:'+(FQW+6)+'px">';
            if(_rA.length){
              var _rentLbl=stt==='projected'?' allocated':' on-rent';if(_onR>0)rows+='<span class="gas-badge gas-badge-onrent">● '+_onR+_rentLbl+'</span>';
              if(_offR>0)rows+='<span class="gas-badge gas-badge-offrent">✓ '+_offR+' historical</span>';
            }else{rows+='<span class="gas-badge gas-badge-empty">No assets assigned</span>';}
            rows+='<div class="gas-actions">';
            if(stt==='projected')rows+='<button class="gas-btn" onclick="event.stopPropagation();dpOpenAssetPicker(\''+row.ordId+'\',\'equipment\')">+ Assign</button>';
            if(stt==='onrent'&&_onR>0)rows+='<button class="gas-btn gas-btn-red" onclick="event.stopPropagation();dpInitOffrentModal(\''+row.ordId+'\',\''+row.item.split(/[—–]/)[0].trim()+'\')">↓ Off-rent</button>';
            rows+='</div></div>';
            if(_rA.length){
              rows+='<div class="gas-chips-grid" style="margin-left:'+LW+'px;padding-right:'+(FQW+6)+'px">';
              _rA.forEach(function(a){
                var isOff=a.status==='offrent';
                rows+='<div class="gas-chip '+(isOff?'gas-chip-offrent':'gas-chip-onrent')+'">'+a.id+(isOff?'<span class="gas-chip-tag">returned</span>':'')+'</div>';
              });
              rows+='</div>';
            }
            rows+='</div>';
          }
          rows+='</div>';
        });
      });
    }
    var today='<div class="g-today" style="left:calc('+LW+'px + (100% - '+(LW+FQW)+'px) * '+(todayPct/100).toFixed(4)+')"><span class="gt-lbl">Today</span></div>';
    var leg='<div class="g-legend"><span class="lg"><span class="gl-sw onrent"></span>On-rent</span><span class="lg"><span class="gl-sw projected"></span>Projected</span><span class="lg"><span class="gl-sw offrent"></span>Off-rent</span><span class="lg"><span class="gl-today"></span>Today \u00b7 '+eqMonthLabel(EQ_TODAY)+'\u2019'+EQ_TODAY.slice(2,4)+'</span></div>';
    return '<div class="gantt">'+head+'<div class="g-body">'+today+rows+'</div></div>'+leg;
  }
  function dpSetProjFilter(p,proj){_dpCcProjMap[p]=proj;renderCcDemand(p);}
  function renderCcDemand(p){
    if(p==='equipment')initCcEquipAssets();
    var cfg=CC_DP[p]; if(!cfg)return; var mount=gel(cfg.mount); if(!mount)return; var ns=CURRENT==='ns';
    var pending=0,ready=0; cfg.rows.forEach(function(r){ if(!r.taxOk)pending++; if(r.status==='Ready')ready++; });
    var selProj=_dpCcProjMap[p]||'all';
    var pLabel=selProj==='all'?'All projects · portfolio':(_PROJ_NAMES[selProj]||selProj);
    var fmtK=function(n){ return n>=1000000?('$'+(n/1000000).toFixed(1)+'M'):('$'+(n/1000).toFixed(0)+'K'); };
    var h='<div class="phead"><div><h1>'+cfg.title+'</h1><div class="meta"><span class="chip">'+svg(dpIcon(cfg.icon))+pLabel+'</span><span class="chip ver">'+(ns?'North Star':'V1 — standard')+'</span>'+(selProj!=='all'&&_PROJ_META[selProj]?'<span class="chip" style="background:'+_BU_COLOR[_PROJ_META[selProj].bu]+'1a;color:'+_BU_COLOR[_PROJ_META[selProj].bu]+';font-weight:600">'+_BU_LABELS[_PROJ_META[selProj].bu]+'</span><span class="chip">'+_REGION_LABELS[_PROJ_META[selProj].region]+'</span>':'')+'</div></div></div>';
    h+='<div style="display:flex;gap:4px;padding-bottom:13px;border-bottom:1px solid var(--g100);margin-bottom:14px">';
    [['all','All projects'],['hercules','Hercules Solar + BESS'],['riverside','Riverside Medical'],['cimarron','Cimarron Data Center']].forEach(function(pr){
      var act=selProj===pr[0];
      h+='<button style="padding:4px 12px;border-radius:5px;border:1px solid '+(act?'var(--charcoal)':'var(--g200)')+';background:'+(act?'var(--charcoal)':'#fff')+';color:'+(act?'#fff':'var(--g700)')+';font-size:12px;cursor:pointer;font-weight:'+(act?'600':'400')+'" onclick="dpSetProjFilter(\''+p+'\',\''+pr[0]+'\')">'+pr[1]+'</button>';
    });
    h+='</div>';
    if(selProj!=='all'&&selProj!=='hercules'){
      h+='<div style="display:flex;align-items:center;gap:8px;background:rgba(59,130,246,.07);border:1px solid rgba(59,130,246,.2);border-radius:6px;padding:9px 12px;margin-bottom:10px">';
      h+='<span style="font-size:11px;font-weight:700;color:#2563eb;text-transform:uppercase;letter-spacing:.03em">Demo</span>';
      h+='<span style="font-size:11.5px;color:var(--g700)">'+(_PROJ_NAMES[selProj]||selProj)+' data shown here for demo purposes only — not yet reflected in customer portal.</span>';
      h+='</div>';
    }
    if(selProj==='all'){
    h+='<div class="vitals" style="grid-template-columns:repeat('+cfg.kpis.length+',1fr)">';
    cfg.kpis.forEach(function(k){ var v=k.v, tone=k.tone; if(k.dyn==='tax'){ v=''+pending; tone=pending>0?'warn':'ok'; } h+='<div class="vital '+tone+'"><div class="vk">'+svg(dpIcon(k.icon))+k.k+'</div><div class="vv">'+v+'</div><div class="vsub">'+k.sub+'</div></div>'; });
    h+='</div>';
    }
    if(ns&&cfg.ns){ h+='<div class="ins-strip"><span class="isi">'+CC_SPARK+'</span><div><div class="ist">02S</div><div class="isd">'+cfg.ns+'</div></div></div>'; }
    else if(!ns&&cfg.v1){ h+='<div class="ins-strip"><span class="isi">'+svg('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',0)+'</span><div><div class="ist">Plan summary</div><div class="isd">'+cfg.v1+'</div></div></div>'; }
    if(selProj!=='all'){
      var lin=CC_DP_LINEAGE[p]&&CC_DP_LINEAGE[p][selProj];
      if(lin){
        var mp=lin.margin; var bl=lin.baseline; var dl=lin.delta; var dr=lin.draft;
        h+='<div style="display:flex;gap:10px;margin:14px 0 10px;align-items:stretch">';
        h+='<div style="flex:1;border:1px solid var(--g200);border-radius:8px;padding:12px 14px;background:#fff;cursor:pointer" onclick="dpShowLineage(\''+p+'\',\''+selProj+'\',\'margin\')">'
           +'<div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--g500);margin-bottom:6px">Margin plan</div>'
           +'<div style="font-size:13px;font-weight:700;color:var(--g900)">'+mp.rom+'</div>'
           +'<div style="font-size:11px;color:var(--g500);margin-top:3px">'+mp.id+' \u00b7 '+mp.date+'</div>'
           +'<div style="font-size:10.5px;color:var(--g600);margin-top:5px;white-space:normal">'+mp.note+'</div>'
           +'<div style="font-size:10px;color:#2563eb;margin-top:8px">View snapshot \u2192</div>'
           +'</div>';
        if(bl){
        h+='<div style="display:flex;align-items:center;color:var(--g400);font-size:18px;padding:0 4px">→</div>';
        h+='<div style="flex:1;border:1px solid var(--g200);border-radius:8px;padding:12px 14px;background:#fff;cursor:pointer" onclick="dpShowLineage(\''+p+'\',\''+selProj+'\',\'baseline\')">'
           +'<div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--g500);margin-bottom:6px">Baseline demand plan</div>'
           +'<div style="font-size:13px;font-weight:700;color:var(--g900)">'+bl.total+'</div>'
           +'<div style="font-size:11px;color:var(--g500);margin-top:3px">'+bl.id+' · '+bl.date+' · '+bl.items+' items</div>'
           +'<div style="font-size:10.5px;color:var(--g600);margin-top:5px;white-space:normal">'+bl.note+'</div>'
           +'<div style="font-size:10px;color:#2563eb;margin-top:8px">View snapshot →</div>'
           +'</div>';
        h+='<div style="display:flex;align-items:center;color:var(--g400);font-size:18px;padding:0 4px">→</div>';
        var dlTone=dl.added>0?'warn':'ok';
        h+='<div style="flex:1;border:1px solid var(--g200);border-radius:8px;padding:12px 14px;background:#fff">'
           +'<div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--g500);margin-bottom:6px">Current vs. baseline</div>'
           +'<div style="font-size:13px;font-weight:700;color:var(--g900)">'+dl.value+'</div>'
           +'<div style="font-size:11px;color:var(--g500);margin-top:3px">'+dl.added+' line'+(dl.added===1?'':'s')+' added since baseline</div>'
           +'<div style="font-size:10.5px;color:var(--g600);margin-top:5px;white-space:normal">'+dl.reason+'</div>'
           +(dl.links&&dl.links.length?'<div style="margin-top:8px;display:flex;flex-wrap:wrap;gap:5px">'+dl.links.map(function(lk){return '<button onclick="dpDeltaJump(\''+p+'\',\''+selProj+'\','+lk.rowIdx+')" style="font-size:10px;padding:2px 8px;border-radius:4px;border:1px solid #3b82f6;background:#eff6ff;color:#2563eb;cursor:pointer">'+lk.label+' →</button>';}).join('')+'</div>':'')
           +'</div>';
        } else if(dr){
        h+='<div style="display:flex;align-items:center;color:var(--g400);font-size:18px;padding:0 4px">→</div>';
        h+='<div style="flex:1;border:2px solid #f59e0b;border-radius:8px;padding:12px 14px;background:#fffbeb">'
           +'<div style="display:flex;align-items:center;gap:6px;margin-bottom:6px">'
           +'<div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--g500)">Draft demand plan</div>'
           +'<span style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;background:#f59e0b;color:#fff;padding:1px 6px;border-radius:3px">In progress</span>'
           +'</div>'
           +'<div style="font-size:13px;font-weight:700;color:var(--g900)">'+dr.total+'</div>'
           +'<div style="font-size:11px;color:var(--g500);margin-top:3px">'+dr.id+' · '+dr.date+' · '+dr.items+' items</div>'
           +'<div style="font-size:10.5px;color:var(--g600);margin-top:5px;white-space:normal">'+dr.note+'</div>'
           +'</div>';
        h+='<div style="display:flex;align-items:center;color:var(--g200);font-size:18px;padding:0 4px">→</div>';
        h+='<div style="flex:1;border:1px solid var(--g100);border-radius:8px;padding:12px 14px;background:var(--g50);opacity:0.5;pointer-events:none">'
           +'<div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--g400);margin-bottom:6px">Current tracking</div>'
           +'<div style="font-size:12px;color:var(--g400);font-style:italic;margin-top:4px">Not yet baselined</div>'
           +'<div style="font-size:10.5px;color:var(--g300);margin-top:6px">Tracking begins after the demand plan is locked to a baseline.</div>'
           +'</div>';
        }
        h+='</div>';
      }
    }
    if(selProj!=='all'&&CC_PROJ_DP[p]&&CC_PROJ_DP[p][selProj]&&CC_PROJ_DP[p][selProj].budget&&(!_PERSONA_PILLAR[ccPersona]||p===_PERSONA_PILLAR[ccPersona])){
      var pd=CC_PROJ_DP[p][selProj];
      var pDp=Math.min(100,Math.round(100*pd.dpSpent/pd.budget));
      var pAh=Math.min(100-pDp,Math.round(100*pd.adHoc/pd.budget));
      var driftPct=Math.round(100*pd.adHoc/((pd.dpSpent+pd.adHoc)||1));
      h+='<div style="background:var(--g50);border:1px solid var(--g100);border-radius:8px;padding:14px 16px;margin:14px 0">';
      h+='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">';
      h+='<div style="font-size:12px;font-weight:700;color:var(--g900)">Plan vs. actual spend — '+pLabel+'</div>';
      h+='<div style="display:flex;gap:16px">';
      h+='<span style="font-size:11.5px;color:var(--g600)"><span style="display:inline-block;width:10px;height:10px;background:var(--charcoal);border-radius:2px;margin-right:4px;vertical-align:middle"></span>On-plan: '+fmtK(pd.dpSpent)+'</span>';
      h+='<span style="font-size:11.5px;color:var(--g600)"><span style="display:inline-block;width:10px;height:10px;background:#f59e0b;border-radius:2px;margin-right:4px;vertical-align:middle"></span>Ad hoc vs. baseline: '+fmtK(pd.adHoc)+'</span>';
      h+='<span style="font-size:11.5px;color:var(--g500)">Budget: '+fmtK(pd.budget)+'</span>';
      h+='</div></div>';
      h+='<div style="display:flex;height:10px;border-radius:4px;overflow:hidden;background:var(--g200)">';
      h+='<div style="width:'+pDp+'%;background:var(--charcoal);transition:width .3s"></div>';
      h+='<div style="width:'+pAh+'%;background:#f59e0b;transition:width .3s"></div>';
      h+='</div>';
      h+='<div style="display:flex;justify-content:space-between;margin-top:5px">';
      h+='<span style="font-size:11px;color:var(--g500)">'+pDp+'% on-plan spend</span>';
      h+='<span style="font-size:11px;font-weight:600;color:'+(driftPct>10?'#f59e0b':'var(--g700)')+'">'+driftPct+'% ad hoc vs. baseline</span>';
      h+='</div></div>';
    }
    h+='<div class="eq-cap">'+svg('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>')+'<span>'+cfg.cap+'</span></div>';
    var _DP_TONE={'Active':'ok','On-rent':'ok','Delivered':'ok','Scheduled':'info','PO issued':'info','In fabrication':'info','Submittal':'info','Off-rent':'info','Demobilized':'info','Projected':'neu','Draft':'neu','Requested':'neu','Pending pricing':'warn','Awaiting pricing':'warn','At-risk':'bad','Ordered':'info'};
    var _PROJ_MATCH={'hercules':'Hercules Solar + BESS','riverside':'Riverside Medical Center','cimarron':'Cimarron Data Center'};
    var showProjCol=(selProj==='all');
    var allReqRows=[];
    var projsForTable=showProjCol?['hercules','riverside','cimarron']:[selProj];
    projsForTable.forEach(function(proj){
      if(CC_PROJ_DP[p]&&CC_PROJ_DP[p][proj]&&CC_PROJ_DP[p][proj].rows){
        CC_PROJ_DP[p][proj].rows.forEach(function(r,ri){
          if(showProjCol&&(r.state==='Projected'||r.state==='Draft'))return;
          allReqRows.push({_type:'dp',_proj:proj,_idx:ri,_projLabel:_PROJ_MATCH[proj],item:r.item,qty:r.qty,window:r.window,state:r.state,cost:r.cost,firm:r.firm,ordId:r.ordId||null,fqRef:r.fqRef||null,attachments:r.attachments||[]});
        });
      }
    });
    if(showProjCol){
      var adhocFiltered=cfg.rows;
      adhocFiltered.forEach(function(r){ allReqRows.push({_type:'adhoc',_projLabel:r.project,_raw:r}); });
    }
    var isDpView=!showProjCol;
    var dpSrcFil=isDpView?'dp':(_dpCcSrcF[p]||'all');
    var visRows=isDpView?allReqRows:(dpSrcFil==='all'?allReqRows:allReqRows.filter(function(r){return r._type===(dpSrcFil==='dp'?'dp':'adhoc');}));
    var dpShowAll=!!_dpCcLimit[p];
    var rowsToRender=isDpView?visRows:(dpShowAll?visRows:visRows.slice(0,5));
    var moreN=visRows.length-5;
    if(isDpView){
      h+='<div class="eq-toolbar"><span class="dp-sec-t">'+svg(dpIcon(cfg.icon))+'Demand plan</span><span class="spacer"></span>';
      if(p==='equipment'){h+='<div style="display:flex;gap:2px;margin-right:10px"><button class="ff-b'+(_dpEquipView==='table'?' on':'')+'" onclick="dpSetEquipView(\'table\')">List</button><button class="ff-b'+(_dpEquipView==='gantt'?' on':'')+'" onclick="dpSetEquipView(\'gantt\')">Gantt</button></div>';}
      h+='<span style="font-size:11.5px;color:var(--g500)">'+visRows.length+' items · '+pLabel+'</span></div>';
      if(p==='equipment'&&_dpEquipView==='gantt'){h+='<style>#equip-list-view{display:none!important}</style>'+renderEquipGantt(selProj,ns);}
    } else {
      h+='<div class="eq-toolbar"><span class="dp-sec-t">'+svg(dpIcon(cfg.icon))+'All requests</span><span class="spacer"></span><span style="font-size:11.5px;color:var(--g500)">'+visRows.length+' · '+pLabel+'</span></div>';
      h+='<div class="fq-filters" style="margin:6px 0 4px;padding:0"><div class="ff-grp"><span class="ff-lbl">Source</span><div class="ff-seg">';
      [['all','All'],['dp','Demand plan'],['adhoc','Ad hoc']].forEach(function(o){
        h+='<button class="ff-b'+(dpSrcFil===o[0]?' on':'')+' btn-sm" onclick="dpSetSrcFilter(\''+p+'\',\''+o[0]+'\')">'+o[1]+'</button>';
      });
      h+='</div></div></div>';
    }
    var gtA=isDpView?'1.6fr 80px 150px 105px 120px 90px 175px':(showProjCol?'1.3fr 90px 116px 150px 1fr 100px 110px':'1.3fr 90px 116px 1.2fr 100px 110px');
    if(!isDpView){ h+='<div class="eq-cap" style="margin-bottom:10px">'+svg('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',0)+'<span>Recommended actions for all pending requests are in the fulfillment queue. Click any request for more information.</span></div>'; }
    if(!isDpView&&p==='prefab'){
      var _capGaps=Object.keys(CC_PREFAB_CAP.gaps).filter(function(k){return CC_PREFAB_CAP.gaps[k].length>0;});
      if(_capGaps.length){
        h+='<div style="background:rgba(239,68,68,.05);border:1px solid rgba(239,68,68,.2);border-radius:8px;padding:10px 14px;margin-bottom:12px">';
        h+='<div style="display:flex;align-items:center;gap:8px;margin-bottom:5px"><b style="font-size:12px;color:var(--red)">Capacity planning \u2014 '+_capGaps.length+' project'+(1===1?'s have':'s have')+' risks</b><span style="font-size:10.5px;color:var(--g400);font-weight:400">Illustrative, V1 \u00b7 In production these gaps auto-populate from confirmed fab schedules</span></div>';
        h+='<div style="font-size:11.5px;color:var(--g700)">';
        _capGaps.forEach(function(k){
          var g=CC_PREFAB_CAP.gaps[k][0];
          var lbl=CC_PREFAB_CAP.typeLabel[g.t]||g.t;
          var pLbl=_PROJ_LABELS[k]||k;
          h+='<span style="display:inline-block;margin-right:16px">\u26a0 <b>'+pLbl+'</b> \u2014 '+lbl+': '+g.note+'&nbsp;&nbsp;<span style="color:var(--charcoal);cursor:pointer;text-decoration:underline" onclick="_dpCcProjMap[\'prefab\']=\''+k+'\';ccGo(\'dpprefab\')">View plan</span></span>';
        });
        h+='</div></div>';
      }
    }
    if(ns&&p==='prefab'&&!isDpView){
    h+='<div class="ins-strip"><span class="isi">'+CC_SPARK+'</span><div><div class="ist">Shop at 94% capacity Aug&ndash;Sep</div><div class="isd">E-house submittal deadline 3 days &middot; Piperite Fab slot contested across 2 projects</div></div></div>';
    h+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:14px">';
    h+='<div style="background:#fff;border:1px solid rgba(239,68,68,.25);border-radius:6px;padding:10px 12px">';
    h+='<div style="font-size:9.5px;font-weight:700;color:var(--g400);text-transform:uppercase;letter-spacing:.04em;margin-bottom:4px">SHOP CAPACITY</div>';
    h+='<div style="font-size:12px;font-weight:600;color:var(--g900);margin-bottom:2px">Aug 12&ndash;Sep 4: 94%</div>';
    h+='<div style="font-size:11px;color:var(--red)">Hercules + Riverside competing for Piperite slot</div></div>';
    h+='<div style="background:#fff;border:1px solid rgba(239,68,68,.25);border-radius:6px;padding:10px 12px">';
    h+='<div style="font-size:9.5px;font-weight:700;color:var(--g400);text-transform:uppercase;letter-spacing:.04em;margin-bottom:4px">SUBMITTAL ALERT</div>';
    h+='<div style="font-size:12px;font-weight:600;color:var(--g900);margin-bottom:2px">E-house &mdash; deadline Jul 15</div>';
    h+='<div style="font-size:11px;color:var(--red)">3 days &middot; approve to protect Nov energization</div></div>';
    h+='<div style="background:#fff;border:1px solid var(--g200);border-radius:6px;padding:10px 12px">';
    h+='<div style="font-size:9.5px;font-weight:700;color:var(--g400);text-transform:uppercase;letter-spacing:.04em;margin-bottom:4px">P6 IMPACT</div>';
    h+='<div style="font-size:12px;font-weight:600;color:var(--g900);margin-bottom:2px">Pipe rack install: Sep 28</div>';
    h+='<div style="font-size:11px;color:#d97706">2 days behind &middot; inspect Jul 22</div></div>';
    h+='</div>';
    }
    var _pfbSchedMode=(p==='prefab'&&isDpView&&_pfbDpTab==='schedule');
    if(p==='prefab'&&isDpView){
      h+='<div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;flex-wrap:wrap">';
      h+='<div style="display:flex;gap:2px;background:var(--g100);border-radius:8px;padding:3px">';
      h+='<button onclick="pfbSetTab(\'items\')" style="padding:4px 14px;border-radius:6px;border:none;cursor:pointer;font-size:12px;font-weight:600;transition:all .15s;background:'+(_pfbDpTab==='items'?'#fff':'transparent')+';color:'+(_pfbDpTab==='items'?'var(--charcoal)':'var(--g500)')+';box-shadow:'+(_pfbDpTab==='items'?'0 1px 3px rgba(0,0,0,.1)':'none')+'">Line items</button>';
      h+='<button onclick="pfbSetTab(\'schedule\')" style="padding:4px 14px;border-radius:6px;border:none;cursor:pointer;font-size:12px;font-weight:600;transition:all .15s;background:'+(_pfbDpTab==='schedule'?'#fff':'transparent')+';color:'+(_pfbDpTab==='schedule'?'var(--charcoal)':'var(--g500)')+';box-shadow:'+(_pfbDpTab==='schedule'?'0 1px 3px rgba(0,0,0,.1)':'none')+'">Schedule</button>';
      h+='</div>';
      h+='<div style="display:flex;gap:4px;align-items:center">';
      h+='<span style="font-size:10.5px;color:var(--g500);font-weight:500">Install:</span>';
      [['all','All'],['installed','✓ Done'],['pending','Pending']].forEach(function(b){
        var _ia=_pfbInstFilter===b[0];
        h+='<button onclick="pfbSetInstFilter(\''+b[0]+'\')" style="padding:3px 10px;border-radius:6px;border:1px solid '+(_ia?'var(--charcoal)':'var(--g200)')+';cursor:pointer;font-size:11px;font-weight:'+(_ia?'600':'400')+';background:'+(_ia?'var(--charcoal)':'#fff')+';color:'+(_ia?'#fff':'var(--g500)')+'">'+b[1]+'</button>';
      });
      h+='</div>';
      h+='</div>';
      if(_pfbSchedMode){
        var _p6fi=(CC_PREFAB_CAP.plan[selProj]||[]).filter(function(it){
          if(_pfbInstFilter==='all')return true;
          var _t2=new Date('2026-08-10').getTime();
          var _pm=it.p6Date?new Date(it.p6Date).getTime():null;
          return _pfbInstFilter==='installed'?(_pm&&_pm<_t2):(!_pm||_pm>=_t2);
        });
        h+=renderPrefabP6Schedule(_p6fi);
      }
    }
    if(!_pfbSchedMode){h+='<div class="dp-tbl" id="equip-list-view"><div class="dp-head" style="grid-template-columns:'+gtA+'"><span>Item</span>'+(isDpView?'<span class="c">Qty</span><span>Need by<div style="font-size:9px;color:#3b82f6;font-weight:400;line-height:1.3;margin-top:1px">↗ P6 install date</div></span><span class="r">Cost</span>':('<span>DP ID</span><span>Source</span>'+(showProjCol?'<span>Project</span>':'')+'<span>Details</span>'))+'<span>Status</span>'+(isDpView?'<span>Docs</span>':'')+'<span>'+(isDpView?'Order / action':'')+'</span></div>';
    if(!rowsToRender.length){ h+='<div class="fq-empty">No '+(isDpView?'plan ':dpSrcFil==='dp'?'demand plan ':dpSrcFil==='adhoc'?'ad hoc ':'')+'items for '+pLabel+'.</div>'; }
    rowsToRender.forEach(function(row,_rowI){
      if(row._type==='dp'&&isDpView&&p==='prefab'&&_pfbInstFilter!=='all'){
        if(_pfbInstFilter==='installed'&&row.state!=='Delivered')return;
        if(_pfbInstFilter==='pending'&&row.state==='Delivered')return;
      }
      if(row._type==='dp'){
        var dpTone=_DP_TONE[row.state]||'neu';
        var dpSrc='<span style="font-size:10px;padding:2px 7px;border-radius:10px;background:rgba(59,130,246,.1);color:#3b82f6;font-weight:600;white-space:nowrap">Demand plan</span>';
        var dpDet=(row.qty||'')+' · '+(row.window||'')+(row.firm?' · '+row.firm:'');
        var expId='dpx-'+p+'-'+(row._proj||'all')+'-'+row._idx;
        var expH='';
        if(row.ordId){
          var _eo=ORDERS.filter(function(x){return x.id===row.ordId;})[0];
          if(_eo){
            expH='<div style="padding:14px 16px 16px;background:var(--g50);border-top:1px solid var(--g100);border-bottom:2px solid var(--g200)">';
            expH+=trackerHTML(_eo,ns);
            expH+=buildDpBillingInline(row.ordId);
            if(row.note){expH+='<div style="margin-top:10px;padding:8px 10px;background:var(--g100);border-radius:5px;font-size:11.5px;color:var(--g700)"><b>Note · </b>'+row.note+'</div>';}
            var _aa=(row.attrs||[]).concat(_dpItemAttrs[row.id]||[]);
            expH+='<div style="margin-top:10px;padding-top:10px;border-top:1px solid var(--g200)"><div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--g500);margin-bottom:7px">Attributes</div><div style="display:flex;gap:4px;flex-wrap:wrap;align-items:center">';
            _aa.forEach(function(a){var isCust=(_dpItemAttrs[row.id]||[]).indexOf(a)>=0;expH+='<span style="display:inline-flex;align-items:center;gap:3px;font-size:10.5px;padding:2px 8px;border-radius:10px;background:'+(isCust?'rgba(59,130,246,.1)':'var(--g100)')+';color:'+(isCust?'#2563eb':'var(--g700)')+';border:1px solid '+(isCust?'rgba(59,130,246,.3)':'var(--g200)')+'">'+a+(ns&&isCust?'<button onclick="event.stopPropagation();dpRemoveCustomAttr(\''+row.id+'\',\''+a+'\')" style="background:none;border:none;padding:0;cursor:pointer;color:#93c5fd;margin-left:2px;font-size:12px">\u00d7</button>':'')+'</span>';});
            if(ns){expH+='<div style="display:inline-flex;align-items:center;gap:3px;background:var(--g50);border:1px dashed var(--g200);border-radius:10px;padding:1px 7px"><input id="dpAttrIn-'+row.id+'" placeholder="Add attribute\u2026" style="border:none;background:transparent;font-size:10.5px;width:100px;outline:none;color:var(--g700)" onkeydown="if(event.key===\'Enter\')dpAddCustomAttr(\''+row.id+'\')"><button onclick="event.stopPropagation();dpAddCustomAttr(\''+row.id+'\')" style="background:none;border:none;padding:0;cursor:pointer;color:#2563eb;font-size:15px;font-weight:700;line-height:1">+</button></div>';}
            expH+='</div></div>';
            var _rowAssets=_dpRowAssets[row.id]||[];
            var _itemWord=(row.item||'').split(/[\u00d7 ]/)[0].toLowerCase();
            expH+='<div style="margin-top:12px;padding-top:12px;border-top:1px solid var(--g200)">';
            var _ccOnR=_rowAssets.filter(function(a){return a.status!=='offrent';}).length;
            var _ccOffR=_rowAssets.length-_ccOnR;
            expH+='<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:8px">';
            expH+='<div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--g500)">Assigned assets <span style="font-weight:400;text-transform:none;font-size:9.5px">· '+_ccOnR+' on-rent'+(_ccOffR?' · '+_ccOffR+' off-rent':'')+'</span></div>';
            expH+='<div style="margin-left:auto;display:flex;gap:6px">';
            if(_ccOnR>0){expH+='<button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();dpInitOffrentModal(\''+row.id+'\',\''+_itemWord+'\')" style="font-size:10.5px;color:var(--warning);border-color:var(--warning)">↓ Initiate off-rent</button>';}
            expH+='<button class="btn btn-ghost btn-sm" style="font-size:10.5px" onclick="event.stopPropagation();dpOpenAssetPicker(\''+row.id+'\',\''+_itemWord+'\')">'+'+ Assign asset'+'</button>';
            expH+='</div></div>';
            if(_rowAssets.length){
              expH+='<div style="display:flex;flex-wrap:wrap;gap:5px">';
              _rowAssets.forEach(function(a){
                var _isOff=a.status==='offrent';
                expH+='<div style="display:inline-flex;align-items:center;gap:4px;padding:3px 6px 3px 8px;border-radius:20px;border:1px solid '+(_isOff?'var(--g200)':'var(--success)')+';background:'+(_isOff?'var(--g50)':'rgba(16,185,129,.06)')+';">';
                expH+='<span style="font-family:monospace;font-size:10.5px;font-weight:600;color:'+(_isOff?'var(--g400)':'var(--g800)')+'">'+a.id+'</span>';
                if(_isOff){expH+='<span style="font-size:9px;color:var(--g400);margin-left:2px">off-rent</span>';}
                expH+='<button onclick="event.stopPropagation();dpRemoveRowAsset(\''+row.id+'\',\''+a.id+'\')" style="background:none;border:none;padding:0 1px;cursor:pointer;font-size:11px;color:var(--g300);line-height:1">×</button>';
                expH+='</div>';
              });
              expH+='</div>';
            } else {
              expH+='<div style="color:var(--g400);font-size:11px;padding:6px 0">No assets assigned yet — click <b>+ Assign asset</b> to select from fleet or add a custom unit.</div>';
            }
            expH+='</div>';
            expH+='</div>';
          }
        } else {
          expH='<div style="padding:14px 16px 16px;background:var(--g50);border-top:1px solid var(--g100);border-bottom:2px solid var(--g200)">';
          var _sToneMap={Active:'ok','On-rent':'ok',Delivered:'ok',Scheduled:'ok',Demobilized:'info','Off-rent':'info',
            'In fabrication':'info',Submittal:'info','PO issued':'info',Projected:'neu',Draft:'neu',
            Requested:'neu','Pending pricing':'warn','Awaiting pricing':'warn','At-risk':'bad',Pending:'neu'};
          var _sLineMap={Draft:'Draft — submit to 02S to begin fulfillment.',Requested:'Submitted to 02S — awaiting acknowledgement.',
            'Pending pricing':'Pending 02S quote — price confirmed before order is placed.',
            'Awaiting pricing':'Awaiting 02S pricing confirmation.',Projected:'Projected demand — not yet submitted.',
            'At-risk':'At-risk — order-by date approaching. Expedite required.',
            Scheduled:'Scheduled — window confirmed.',Pending:'Submitted — order processing.',
            'In fabrication':'In fabrication — production in progress.',Submittal:'Submittal under review.'};
          expH+='<div class="latest-line '+(_sToneMap[row.state]||'neu')+'" style="margin-bottom:10px">'
            +'<span class="ll-k">Status</span>'+(_sLineMap[row.state]||row.state)+'</div>';
          expH+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px 24px;padding:6px 0;font-size:11.5px">';
          expH+='<div><div style="color:var(--g500);font-size:10.5px;margin-bottom:2px">Qty</div><div style="font-weight:500;color:var(--g900)">'+( row.qty||'\u2014')+'</div></div>';
          expH+='<div><div style="color:var(--g500);font-size:10.5px;margin-bottom:2px">Window</div><div style="font-weight:500;color:var(--g900)">'+( row.window||'\u2014')+'</div></div>';
          expH+='<div><div style="color:var(--g500);font-size:10.5px;margin-bottom:2px">Rate / cost</div><div style="font-weight:500;color:var(--g900)">'+( row.cost||'\u2014')+'</div></div>';
          expH+='<div><div style="color:var(--g500);font-size:10.5px;margin-bottom:2px">Vendor / firm</div><div style="font-weight:500;color:var(--g900)">'+( row.firm||'TBD')+'</div></div>';
          expH+='</div>';
          if(row.state==='Requested'||row.state==='Pending pricing'||row.state==='Awaiting pricing'||row.state==='At-risk'){
            expH+='<div style="margin-top:10px;padding-top:10px;border-top:1px solid var(--g200)">';
            expH+='<button class="btn btn-red btn-sm" onclick="dpExpandToggle(\''+expId+'\');'+(row.fqRef?'ccGoFulfill(\''+row.fqRef+'\')':'ccGo(\'fulfill\')')+'">View in fulfillment queue \u2192</button>';
            expH+='</div>';
          }
          if(row.note){expH+='<div style="margin-top:10px;padding:8px 10px;background:var(--g100);border-radius:5px;font-size:11.5px;color:var(--g700)"><b>Note \u00b7 </b>'+row.note+'</div>';}
          var _aa2=(row.attrs||[]).concat(_dpItemAttrs[row.id]||[]);
          if(_aa2.length){expH+='<div style="margin-top:10px;padding-top:10px;border-top:1px solid var(--g200)"><div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--g500);margin-bottom:7px">Attributes</div><div style="display:flex;gap:4px;flex-wrap:wrap;align-items:center">';_aa2.forEach(function(a){var isCust=(_dpItemAttrs[row.id]||[]).indexOf(a)>=0;expH+='<span style="display:inline-flex;align-items:center;gap:3px;font-size:10.5px;padding:2px 8px;border-radius:10px;background:'+(isCust?'rgba(59,130,246,.1)':'var(--g100)')+';color:'+(isCust?'#2563eb':'var(--g700)')+';border:1px solid '+(isCust?'rgba(59,130,246,.3)':'var(--g200)')+'">' +a+(ns&&isCust?'<button onclick="event.stopPropagation();dpRemoveCustomAttr(\''+row.id+'\',\''+a+'\')" style="background:none;border:none;padding:0;cursor:pointer;color:#93c5fd;margin-left:2px;font-size:12px">\u00d7</button>':'')+'</span>';});if(ns){expH+='<div style="display:inline-flex;align-items:center;gap:3px;background:var(--g50);border:1px dashed var(--g200);border-radius:10px;padding:1px 7px"><input id="dpAttrIn-'+row.id+'" placeholder="Add attribute\u2026" style="border:none;background:transparent;font-size:10.5px;width:100px;outline:none;color:var(--g700)" onkeydown="if(event.key===\'Enter\')dpAddCustomAttr(\''+row.id+'\')"><button onclick="event.stopPropagation();dpAddCustomAttr(\''+row.id+'\')" style="background:none;border:none;padding:0;cursor:pointer;color:#2563eb;font-size:15px;font-weight:700;line-height:1">+</button></div>';}expH+='</div></div>';}
          var _rowAssets2=_dpRowAssets[row.id]||[];
          var _iw2=(row.asset||row.item||'').split(/[\u00d7 ]/)[0].toLowerCase();
          expH+='<div style="margin-top:12px;padding-top:12px;border-top:1px solid var(--g200)">';
          var _elOnR=_rowAssets2.filter(function(a){return a.status!=='offrent';}).length;
          var _elOffR=_rowAssets2.length-_elOnR;
          expH+='<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:8px">';
          expH+='<span style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--g500)">Assigned assets <span style="font-weight:400;text-transform:none">· '+_elOnR+' on-rent'+(_elOffR?' · '+_elOffR+' off-rent':'')+'</span></span>';
          expH+='<div style="margin-left:auto;display:flex;gap:6px">';
          if(_elOnR>0){expH+='<button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();dpInitOffrentModal(\''+row.id+'\',\''+_iw2+'\')" style="font-size:10.5px;color:var(--warning);border-color:var(--warning)">↓ Initiate off-rent</button>';}
          expH+='<button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();dpOpenAssetPicker(\''+row.id+'\',\''+_iw2+'\')" style="font-size:10.5px">'+'+ Assign'+'</button>';
          expH+='</div></div>';
          if(_rowAssets2.length){
              expH+='<div style="display:flex;flex-wrap:wrap;gap:5px">';
              _rowAssets2.forEach(function(a){
                var _isOff=a.status==='offrent';
                expH+='<div style="display:inline-flex;align-items:center;gap:4px;padding:3px 6px 3px 8px;border-radius:20px;border:1px solid '+(_isOff?'var(--g200)':'var(--success)')+';background:'+(_isOff?'var(--g50)':'rgba(16,185,129,.06)')+';">';
                expH+='<span style="font-family:monospace;font-size:10.5px;font-weight:600;color:'+(_isOff?'var(--g400)':'var(--g800)')+'">'+a.id+'</span>';
                if(_isOff){expH+='<span style="font-size:9px;color:var(--g400);margin-left:2px">off-rent</span>';}
                expH+='<button onclick="event.stopPropagation();dpRemoveRowAsset(\''+row.id+'\',\''+a.id+'\')" style="background:none;border:none;padding:0 2px;cursor:pointer;font-size:11px;color:var(--g300);line-height:1">×</button>';
                expH+='</div>';
              });
              expH+='</div>';
          }else{expH+='<div style="color:var(--g400);font-size:11px;padding:6px 0">No assets assigned yet — click <b>+ Assign asset</b>.</div>';}
          expH+='</div>';
          expH+='</div>';    }
        if(isDpView){
          var _ordR=row.ordId?ORDERS.filter(function(x){return x.id===row.ordId;})[0]:null;
          var _billsR=CC_DP_BILLS[row.ordId]||[];
          var _dispR=_billsR.some(function(b){return !!b.dispute||!!b.ccChange;});
          var _stgLbls=['Requested','Quoted','PO issued','Delivered','On-site','On-rent','Off-rent'];
          var _actCell='';
          if(row.ordId&&_ordR){
            var _sl=_stgLbls[_ordR.stage]||'Stage '+_ordR.stage;
            _actCell='<div style="font-size:10.5px">';
            _actCell+='<div style="display:flex;align-items:center;justify-content:space-between;gap:4px">';
            _actCell+='<button style="background:none;border:none;padding:0;cursor:pointer;color:var(--charcoal);font-weight:600;font-size:10.5px;text-decoration:underline;text-underline-offset:2px" '+'onclick="event.stopPropagation();ccDpTracker(\''+row.ordId+'\')">'+ row.ordId+'</button>';
            if(row.fqRef){_actCell+='<button class="btn btn-ghost btn-sm" style="font-size:10px;padding:1px 6px;white-space:nowrap;flex-shrink:0" onclick="event.stopPropagation();ccGoFulfill(\''+row.fqRef+'\')">→ FQ</button>';}
            _actCell+='</div>';
            _actCell+='<div style="font-size:10px;color:var(--g400)">'+_sl+'</div>';
            if(_dispR){_actCell+='<div onclick="event.stopPropagation();ccDpTracker(\''+row.ordId+'\'" style="font-size:10px;color:var(--red);font-weight:600;margin-top:2px;cursor:pointer;text-decoration:underline;text-underline-offset:2px">⚠ Bill issue — click to review</div>';}
            _actCell+='</div>';
          } else if(row.state==='Requested'||row.state==='Pending pricing'||row.state==='Awaiting pricing'||row.state==='At-risk'){
            _actCell='<button class="btn btn-ghost btn-sm" style="font-size:10.5px;padding:2px 8px;white-space:nowrap" onclick="event.stopPropagation();'+(row.fqRef?'ccGoFulfill(\''+row.fqRef+'\')':'ccGo(\'fulfill\')')+'">→ Fulfillment queue</button>';
          } else if(row.state==='Projected'||row.state==='Draft'){
            _actCell=row.fqRef?'<button class="btn btn-ghost btn-sm" style="font-size:10.5px;padding:2px 8px;white-space:nowrap" onclick="event.stopPropagation();ccGoFulfill(\''+row.fqRef+'\')">\u2192 Fulfillment queue</button>':'<span style="font-size:10.5px;color:var(--g300)">Not yet submitted</span>';
          } else if(row.state==='Demobilized'||row.state==='Off-rent'){
            _actCell='<span style="font-size:10.5px;color:var(--g400)">Complete</span>';
          }
          h+='<div class="dp-row" id="dprow-'+p+'-'+row._proj+'-'+row._idx+'" style="grid-template-columns:'+gtA+';cursor:pointer" onclick="dpRowClick(\''+p+'\',\''+row._proj+'\','+row._idx+')">';
          var _ra=(row.attrs||[]).concat(_dpItemAttrs[row.id]||[]);
          h+='<div>'+row.item+'<div class="sub" style="font-size:10.5px">'+(row.firm||'')+'</div>'+(_ra.length?'<div style="display:flex;gap:3px;flex-wrap:wrap;margin-top:3px">'+_ra.map(function(a){return'<span style="font-size:9px;padding:1px 5px;border-radius:8px;background:var(--g100);color:var(--g600);border:1px solid var(--g150)">'+a+'</span>';}).join('')+'</div>':'')+'</div>';
          h+='<div class="c" style="font-size:11.5px">'+(row.qty||'\u2014')+'</div>';
          h+='<div style="font-size:11.5px;color:var(--g700)">'+(row.window||'\u2014')+'</div>';
          h+='<div class="r" style="font-size:11.5px">'+(row.cost||'\u2014')+'</div>';
          h+='<div><span class="tag '+dpTone+'">'+row.state+'</span></div>';
          h+='<div>'+dpDocCell(p,row)+'</div>';
          h+='<div>'+_actCell+'</div>';
          h+='</div>';
        } else {
          h+='<div class="dp-row" id="dprow-'+p+'-'+row._proj+'-'+row._idx+'" style="grid-template-columns:'+gtA+';cursor:pointer" onclick="dpAllReqModal(\''+p+'\',\''+row._proj+'\','+row._idx+')">';
          h+='<div>'+row.item+'<div class="sub" style="font-size:10.5px">'+row.cost+'</div></div>';
          h+='<div style="font-size:10px;font-family:monospace;color:var(--g600)">'+((_DP_IDS[p]||{})[row._proj]||'\u2014')+'</div>';
          h+=dpSrc;
          if(showProjCol){h+='<div style="font-size:11.5px">'+row._projLabel+'</div>';}
          h+='<div style="font-size:11.5px;color:var(--g600)">'+dpDet+'</div>';
          h+='<div><span class="tag '+dpTone+'">'+row.state+'</span></div>';
          h+='<div style="font-size:10px;color:var(--g500)">View \u2192</div>';
          h+='</div>';
        }
        if(expH&&isDpView) h+='<div id="'+expId+'" style="display:none">'+expH+'</div>';
      } else if(!isDpView) {
        var r2=row._raw;
        var ahSrc='<span style="font-size:10px;padding:2px 7px;border-radius:10px;background:rgba(217,119,6,.1);color:#b45309;font-weight:600;white-space:nowrap">Ad hoc</span>';
        var ahExpId='ahx-'+p+'-'+_rowI;
        h+='<div class="dp-row" style="grid-template-columns:'+gtA+';cursor:pointer" onclick="ccGoFulfill(\''+r2.id+'\')"><div>'+r2.id+'<div class="sub" style="white-space:normal;font-size:10.5px">'+r2.asset+'</div></div><div style="font-size:10px;color:var(--g400)">\u2014</div><div>'+ahSrc+'</div>'+(showProjCol?'<div style="font-size:11.5px">'+row._projLabel+'</div>':'')+'<div>'+dpTaxCell(r2)+'</div><div><span class="tag '+(_DP_TONE[r2.status]||'neu')+'">'+r2.status+'</span></div><div><button class="btn btn-ghost btn-sm" style="font-size:10px;padding:1px 8px">\u2192 Fulfillment queue</button></div></div>';
      }
    });
    if(!isDpView&&!dpShowAll&&moreN>0){
      h+='<div style="padding:10px 16px;font-size:11.5px;color:var(--charcoal);font-weight:500;cursor:pointer;border-top:1px solid var(--g100)" onclick="dpToggleAllReqs(\''+p+'\')">Show all '+visRows.length+' requests →</div>';
    }
    h+='</div>';}
    if(isDpView){
      var _ahRows=cfg.rows.filter(function(r){return r.project===_PROJ_MATCH[selProj];});
      if(_ahRows.length){
        h+='<div class="eq-toolbar" style="margin-top:18px"><span class="dp-sec-t" style="font-size:12px">Ad hoc requests</span><span class="spacer"></span><span style="font-size:11.5px;color:var(--g500)">'+_ahRows.length+' request'+((_ahRows.length===1)?'':'s')+'</span></div>';
        var gtAH='1.4fr 1.2fr 100px 110px';
        h+='<div class="dp-tbl"><div class="dp-head" style="grid-template-columns:'+gtAH+'"><span>Request</span><span>Details</span><span>Status</span><span>Action</span></div>';
        _ahRows.forEach(function(r2){
          h+='<div class="dp-row" style="grid-template-columns:'+gtAH+'"><div>'+r2.id+'<div class="sub" style="white-space:normal;font-size:10.5px">'+r2.asset+'</div></div><div>'+dpTaxCell(r2)+'</div><div><span class="tag '+(_DP_TONE[r2.status]||'neu')+'">'+r2.status+'</span></div><div><button class="btn btn-ghost btn-sm" style="font-size:10px;padding:1px 8px" onclick="dpReview(\''+p+'\',\''+r2.id+'\')">View →</button></div></div>';
        });
        h+='</div>';
      }
    }
    if(ns&&cfg.consol){ var cs=cfg.consol; h+='<div class="dp-consol">'+CC_SPARK+'<div class="dcx"><div class="dct">Cross-project consolidation <span class="dcsave">saves '+cs.save+'</span></div><div class="dcd">'+cs.detail+'</div></div><button class="btn btn-red btn-sm" onclick="dpConsolidate(\''+p+'\')">'+cs.cta+'</button></div>'; }
        var pillarQ=CC_QUOTES.filter(function(q){return q.pillar===p;});
    if(pillarQ.length){
      h+='<div class="eq-toolbar" style="margin-top:20px"><span class="dp-sec-t">'+svg(IC.cart)+'Portal quotes — pending pricing</span><span class="spacer"></span></div>';
      var gtq='1fr 168px 90px 130px 160px';
      h+='<div class="dp-tbl"><div class="dp-head" style="grid-template-columns:'+gtq+'"><span>Request / item</span><span>Project</span><span>Need-by</span><span>Status</span><span>Action</span></div>';
      pillarQ.forEach(function(q){
        var isPriced=q.status==='Priced'; var isIP=q.status==='Quote in progress';
        var tone=isPriced?'ok':isIP?'info':'warn';
        h+='<div class="dp-row" style="grid-template-columns:'+gtq+'"><div>'+q.item+'<div class="sub">'+q.ref+' · by '+q.submittedBy+'</div></div>'
          +'<div>'+q.project+'</div>'
          +'<div>'+q.needby+'</div>'
          +'<div><span class="tag '+tone+'">'+q.status+'</span></div>'
          +'<div>'+(isPriced?'<div class="fq-done">Priced · '+q.pricedAt+'</div>':'<button class="btn '+(isIP?'btn-dark':'btn-red')+' btn-sm" onclick="ccSetQuotePrice(\''+q.id+'\')">Set price</button>')+'</div></div>';
      });
      h+='</div>';
    }
    var _rollSrc=(isDpView&&CC_PROJ_DP[p]&&CC_PROJ_DP[p][selProj]&&CC_PROJ_DP[p][selProj].roll)?CC_PROJ_DP[p][selProj]:cfg;
    var _rollLabel=isDpView?(p==='prefab'?'Project assembly roll-up':'Project demand roll-up'):(p==='prefab'?'Assembly type rollup':'Portfolio demand roll-up');
    h+='<div class="eq-toolbar" style="margin-top:20px"><span class="dp-sec-t">'+svg(IC.chart)+_rollLabel+'</span><span class="spacer"></span><span style="font-size:11.5px;color:var(--g500)">'+_rollSrc.varSummary+'</span></div>';
    var gt2='1fr 150px 1fr 120px';
    h+='<div class="dp-tbl"><div class="dp-head" style="grid-template-columns:'+gt2+'">'+_rollSrc.rollCols.map(function(c){return '<span>'+c+'</span>';}).join('')+'</div>';
    _rollSrc.roll.forEach(function(rr){ h+='<div class="dp-row" style="grid-template-columns:'+gt2+'"><div>'+rr.a+'</div><div>'+rr.b+'</div><div style="font-weight:400;color:var(--g600)">'+rr.c+'</div><div><span class="tag '+(rr.vt||'neu')+'">'+rr.v+'</span></div></div>'; });
    h+='</div>';
    if(selProj==='all'){ h+=renderCapAtRiskSummary(p); }
    if(p==='prefab'&&isDpView){h+=renderPrefabCapPlan(selProj);}
    if(p==='logistics'&&isDpView){h+=renderLogisticsCapPlan(selProj);}
    if(p==='profservices'&&isDpView){h+=renderProfServicesCapPlan(selProj);}
    if(p==='procurement'&&isDpView){h+=renderProcurementCapPlan(selProj);}
    mount.innerHTML=h;
  }

  // ─── SHARED HELPERS ─────────────────────────────────────────────────────────
  function _sColor(s){
    if(/active|on.rent|in.fab|deployed|scheduled|delivered|po.issued|ordered/i.test(s||''))return '#10b981';
    if(/projected|planned/i.test(s||''))return '#3b82f6';
    if(/request|draft|pending|awaiting/i.test(s||''))return '#f59e0b';
    if(/demob|off.rent/i.test(s||''))return '#9ca3af';
    if(/at.risk/i.test(s||''))return '#ef4444';
    return '#3b82f6';
  }
  function _sOpacity(s){
    if(/active|deployed|scheduled|on.rent|in.fab|po.issued|ordered/i.test(s||''))return '.82';
    if(/projected|planned|delivered/i.test(s||''))return '.65';
    if(/request|draft|awaiting/i.test(s||''))return '.5';
    if(/demob|off.rent/i.test(s||''))return '.35';
    if(/pending/i.test(s||''))return '.55';
    return '.65';
  }
  function _sBadge(s){
    var t='neu';
    if(/active|deployed|delivered|ordered|po.issued|on.rent|in.fab|scheduled/i.test(s||''))t='ok';
    else if(/request|draft|awaiting|sow.pend/i.test(s||''))t='warn';
    else if(/at.risk/i.test(s||''))t='bad';
    else if(/demob|off.rent/i.test(s||''))t='neu';
    return '<span class="tag '+t+'" style="font-size:10px">'+(s||'—')+'</span>';
  }
  function _logN(s){
    var mo={Jan:1,Feb:2,Mar:3,Apr:4,May:5,Jun:6,Jul:7,Aug:8,Sep:9,Oct:10,Nov:11,Dec:12};
    var p=(s||'').trim().split(' ');
    return (mo[p[0]]||1)*30+(parseInt(p[1]||1,10));
  }
  function _ganttRange(items,sf,ef){
    var startNs=items.map(function(it){return _logN(it[sf]);});
    var endNs=items.map(function(it,i){var sn=startNs[i],en=_logN(it[ef]);return en<sn?en+360:en;});
    var allN=startNs.concat(endNs);
    return {lo:Math.min.apply(null,allN)-5,hi:Math.max.apply(null,allN)+10};
  }
  function _pct(n,lo,span){return Math.max(0,Math.min(100,Math.round((n-lo)/span*100)));}

  // ─── LOGISTICS EDIT HELPERS ──────────────────────────────────────────────────
  function logCapAdd(proj){
    if(!CC_LOGISTICS_CAP.plan[proj])CC_LOGISTICS_CAP.plan[proj]=[];
    CC_LOGISTICS_CAP.plan[proj].push({item:'New item',cat:'transport',qty:'1',start:'Aug 1',end:'Aug 15',state:'Planned'});
    var idx=CC_LOGISTICS_CAP.plan[proj].length-1;
    renderCcDemand('logistics');
    setTimeout(function(){logCapEdit(proj,idx);},50);
  }
  function logCapEdit(proj,idx){
    var it=CC_LOGISTICS_CAP.plan[proj][idx]; if(!it)return;
    var cap=CC_LOGISTICS_CAP;
    var catOpts=Object.keys(cap.typeLabel).map(function(k){return '<option value="'+k+'"'+(it.cat===k?' selected':'')+'>'+cap.typeLabel[k]+'</option>';}).join('');
    var stateOpts=['Deployed','Active','On-rent','Planned','Projected','Requested','Scheduled','Pending','PO issued','Demobilized','Off-rent','At-risk'].map(function(s){return '<option'+(it.state===s?' selected':'')+'>'+s+'</option>';}).join('');
    var b='<div class="fq-req"><div class="fq-req-t">Edit logistics line</div><div class="sub">'+proj+'</div></div>';
    b+='<div class="fq-calc">';
    b+='<div class="fq-crow"><span>Item</span><span><input id="lce-item" class="dp-input" value="'+it.item+'"></span></div>';
    b+='<div class="fq-crow"><span>Category</span><span><select id="lce-cat" class="dp-sel">'+catOpts+'</select></span></div>';
    b+='<div class="fq-crow"><span>Qty</span><span><input id="lce-qty" class="dp-input" value="'+it.qty+'"></span></div>';
    b+='<div class="fq-crow"><span>Start</span><span><input id="lce-start" class="dp-input" value="'+it.start+'"></span></div>';
    b+='<div class="fq-crow"><span>End</span><span><input id="lce-end" class="dp-input" value="'+it.end+'"></span></div>';
    b+='<div class="fq-crow"><span>Status</span><span><select id="lce-state" class="dp-sel">'+stateOpts+'</select></span></div>';
    b+='</div>';
    b+='<div class="modal-foot"><button class="btn btn-ghost" style="color:var(--red);margin-right:auto" onclick="logCapDelete(\''+proj+'\','+idx+')">Delete</button><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-red" onclick="logCapSave(\''+proj+'\','+idx+')">Save</button></div>';
    openModal(b);
  }
  function logCapSave(proj,idx){
    var it=CC_LOGISTICS_CAP.plan[proj][idx]; if(!it)return;
    it.item=document.getElementById('lce-item').value;
    it.cat=document.getElementById('lce-cat').value;
    it.qty=document.getElementById('lce-qty').value;
    it.start=document.getElementById('lce-start').value;
    it.end=document.getElementById('lce-end').value;
    it.state=document.getElementById('lce-state').value;
    closeModal(); renderCcDemand('logistics');
  }
  function logCapDelete(proj,idx){
    CC_LOGISTICS_CAP.plan[proj].splice(idx,1);
    closeModal(); renderCcDemand('logistics');
  }

  // ─── PROF SERVICES EDIT HELPERS ─────────────────────────────────────────────
  function psCapAdd(proj){
    if(!CC_PROFSERVICES_CAP.plan[proj])CC_PROFSERVICES_CAP.plan[proj]=[];
    CC_PROFSERVICES_CAP.plan[proj].push({scope:'ie',label:'New scope',fte:1,start:'Aug 1',end:'Dec 31',status:'planned'});
    var idx=CC_PROFSERVICES_CAP.plan[proj].length-1;
    renderCcDemand('profservices'); setTimeout(function(){psCapEdit(proj,idx);},50);
  }
  function psCapEdit(proj,idx){
    var it=CC_PROFSERVICES_CAP.plan[proj][idx]; if(!it)return;
    var cap=CC_PROFSERVICES_CAP;
    var scOpts=Object.keys(cap.scopeLabel).map(function(k){return '<option value="'+k+'"'+(it.scope===k?' selected':'')+'>'+cap.scopeLabel[k]+'</option>';}).join('');
    var stOpts=['active','sow_pending','requested','demobilized','planned'].map(function(s){return '<option'+(it.status===s?' selected':'')+'>'+s+'</option>';}).join('');
    var b='<div class="fq-req"><div class="fq-req-t">Edit resource line</div><div class="sub">'+proj+'</div></div>';
    b+='<div class="fq-calc">';
    b+='<div class="fq-crow"><span>Label</span><span><input id="pce-label" class="dp-input" value="'+it.label+'"></span></div>';
    b+='<div class="fq-crow"><span>Discipline</span><span><select id="pce-scope" class="dp-sel">'+scOpts+'</select></span></div>';
    b+='<div class="fq-crow"><span>FTE</span><span><input id="pce-fte" class="dp-input" value="'+it.fte+'"></span></div>';
    b+='<div class="fq-crow"><span>Start</span><span><input id="pce-start" class="dp-input" value="'+it.start+'"></span></div>';
    b+='<div class="fq-crow"><span>End</span><span><input id="pce-end" class="dp-input" value="'+it.end+'"></span></div>';
    b+='<div class="fq-crow"><span>SOW ref</span><span><input id="pce-sow" class="dp-input" value="'+(it.sow||'')+'"></span></div>';
    b+='<div class="fq-crow"><span>Status</span><span><select id="pce-status" class="dp-sel">'+stOpts+'</select></span></div>';
    b+='</div>';
    b+='<div class="modal-foot"><button class="btn btn-ghost" style="color:var(--red);margin-right:auto" onclick="psCapDelete(\''+proj+'\','+idx+')">Delete</button><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-red" onclick="psCapSave(\''+proj+'\','+idx+')">Save</button></div>';
    openModal(b);
  }
  function psCapSave(proj,idx){
    var it=CC_PROFSERVICES_CAP.plan[proj][idx]; if(!it)return;
    it.label=document.getElementById('pce-label').value;
    it.scope=document.getElementById('pce-scope').value;
    it.fte=parseFloat(document.getElementById('pce-fte').value)||it.fte;
    it.start=document.getElementById('pce-start').value;
    it.end=document.getElementById('pce-end').value;
    it.sow=document.getElementById('pce-sow').value||undefined;
    it.status=document.getElementById('pce-status').value;
    closeModal(); renderCcDemand('profservices');
  }
  function psCapDelete(proj,idx){
    CC_PROFSERVICES_CAP.plan[proj].splice(idx,1);
    closeModal(); renderCcDemand('profservices');
  }

  // ─── PROCUREMENT TOGGLE ──────────────────────────────────────────────────────
  function procToggle(proj,cat,field){
    if(!CC_PROCUREMENT_CAP.state[proj])CC_PROCUREMENT_CAP.state[proj]={};
    if(!CC_PROCUREMENT_CAP.state[proj][cat])CC_PROCUREMENT_CAP.state[proj][cat]={};
    CC_PROCUREMENT_CAP.state[proj][cat][field]=!CC_PROCUREMENT_CAP.state[proj][cat][field];
    renderCcDemand('procurement');
  }
  function procExpandCat(id){
    var el=document.getElementById(id); if(!el)return;
    el.style.display=el.style.display==='none'?'block':'none';
  }
  function procCapEditNote(proj,cat){
    var cur=(CC_PROCUREMENT_CAP.state[proj]&&CC_PROCUREMENT_CAP.state[proj][cat]&&CC_PROCUREMENT_CAP.state[proj][cat].note)||'';
    var b='<div class="fq-req"><div class="fq-req-t">Edit note</div><div class="sub">'+CC_PROCUREMENT_CAP.catLabel[cat]+' · '+proj+'</div></div>';
    b+='<div class="fq-calc"><div class="fq-crow"><span>Note</span><span><input id="pcn-note" class="dp-input" value="'+cur+'"></span></div></div>';
    b+='<div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-red" onclick="(function(){if(!CC_PROCUREMENT_CAP.state[\''+proj+'\'])CC_PROCUREMENT_CAP.state[\''+proj+'\']={};if(!CC_PROCUREMENT_CAP.state[\''+proj+'\'][\''+cat+'\'])CC_PROCUREMENT_CAP.state[\''+proj+'\'][\''+cat+'\']={}; CC_PROCUREMENT_CAP.state[\''+proj+'\'][\''+cat+'\'].note=document.getElementById(\'pcn-note\').value;closeModal();renderCcDemand(\'procurement\');})()">Save</button></div>';
    openModal(b);
  }

  // ─── RENDER: EQUIPMENT (placeholder) ────────────────────────────────────────
  // ─── SHARED HELPERS ─────────────────────────────────────────────────────────
  function _sColor(s){
    if(/active|on.rent|in.fab|deployed|scheduled|delivered|po.issued|ordered/i.test(s||''))return '#10b981';
    if(/projected|planned/i.test(s||''))return '#3b82f6';
    if(/request|draft|pending|awaiting/i.test(s||''))return '#f59e0b';
    if(/demob|off.rent/i.test(s||''))return '#9ca3af';
    if(/at.risk/i.test(s||''))return '#ef4444';
    return '#3b82f6';
  }
  function _sOpacity(s){
    if(/active|deployed|scheduled|on.rent|in.fab|po.issued|ordered/i.test(s||''))return '.82';
    if(/projected|planned|delivered/i.test(s||''))return '.65';
    if(/request|draft|awaiting/i.test(s||''))return '.5';
    if(/demob|off.rent/i.test(s||''))return '.35';
    if(/pending/i.test(s||''))return '.55';
    return '.65';
  }
  function _sBadge(s){
    var t='neu';
    if(/active|deployed|delivered|ordered|po.issued|on.rent|in.fab|scheduled/i.test(s||''))t='ok';
    else if(/request|draft|awaiting|sow.pend/i.test(s||''))t='warn';
    else if(/at.risk/i.test(s||''))t='bad';
    else if(/demob|off.rent/i.test(s||''))t='neu';
    return '<span class="tag '+t+'" style="font-size:10px">'+(s||'—')+'</span>';
  }
  function _logN(s){
    var mo={Jan:1,Feb:2,Mar:3,Apr:4,May:5,Jun:6,Jul:7,Aug:8,Sep:9,Oct:10,Nov:11,Dec:12};
    var p=(s||'').trim().split(' ');
    return (mo[p[0]]||1)*30+(parseInt(p[1]||1,10));
  }
  function _ganttRange(items,sf,ef){
    var startNs=items.map(function(it){return _logN(it[sf]);});
    var endNs=items.map(function(it,i){var sn=startNs[i],en=_logN(it[ef]);return en<sn?en+360:en;});
    var allN=startNs.concat(endNs);
    return {lo:Math.min.apply(null,allN)-5,hi:Math.max.apply(null,allN)+10};
  }
  function _pct(n,lo,span){return Math.max(0,Math.min(100,Math.round((n-lo)/span*100)));}

  // ─── ACCORDION TOGGLES ──────────────────────────────────────────────────────
  function logCapAccToggle(id){var el=document.getElementById(id);if(el)el.style.display=el.style.display==='none'?'block':'none';}
  function psCapAccToggle(id){var el=document.getElementById(id);if(el)el.style.display=el.style.display==='none'?'block':'none';}

  // ─── LOGISTICS EDIT HELPERS ──────────────────────────────────────────────────
  function logCapAdd(proj){
    if(!CC_LOGISTICS_CAP.plan[proj])CC_LOGISTICS_CAP.plan[proj]=[];
    CC_LOGISTICS_CAP.plan[proj].push({item:'New item',cat:'transport',qty:'1',start:'Aug 1',end:'Aug 15',state:'Planned'});
    var idx=CC_LOGISTICS_CAP.plan[proj].length-1;
    renderCcDemand('logistics');
    setTimeout(function(){logCapEdit(proj,idx);},50);
  }
  function logCapEdit(proj,idx){
    var it=CC_LOGISTICS_CAP.plan[proj][idx]; if(!it)return;
    var cap=CC_LOGISTICS_CAP;
    var catOpts=Object.keys(cap.typeLabel).map(function(k){return '<option value="'+k+'"'+(it.cat===k?' selected':'')+'>'+cap.typeLabel[k]+'</option>';}).join('');
    var stateOpts=['Deployed','Active','On-rent','Planned','Projected','Requested','Scheduled','Pending','PO issued','Demobilized','Off-rent','At-risk'].map(function(s){return '<option'+(it.state===s?' selected':'')+'>'+s+'</option>';}).join('');
    var b='<div class="fq-req"><div class="fq-req-t">Edit logistics line</div><div class="sub">'+proj+'</div></div>';
    b+='<div class="fq-calc">';
    b+='<div class="fq-crow"><span>Item</span><span><input id="lce-item" class="dp-input" value="'+it.item+'"></span></div>';
    b+='<div class="fq-crow"><span>Category</span><span><select id="lce-cat" class="dp-sel">'+catOpts+'</select></span></div>';
    b+='<div class="fq-crow"><span>Qty</span><span><input id="lce-qty" class="dp-input" value="'+it.qty+'"></span></div>';
    b+='<div class="fq-crow"><span>Start</span><span><input id="lce-start" class="dp-input" value="'+it.start+'"></span></div>';
    b+='<div class="fq-crow"><span>End</span><span><input id="lce-end" class="dp-input" value="'+it.end+'"></span></div>';
    b+='<div class="fq-crow"><span>Status</span><span><select id="lce-state" class="dp-sel">'+stateOpts+'</select></span></div>';
    b+='</div>';
    b+='<div class="modal-foot"><button class="btn btn-ghost" style="color:var(--red);margin-right:auto" onclick="logCapDelete(\''+proj+'\','+idx+')">Delete</button><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-red" onclick="logCapSave(\''+proj+'\','+idx+')">Save</button></div>';
    openModal(b);
  }
  function logCapSave(proj,idx){
    var it=CC_LOGISTICS_CAP.plan[proj][idx]; if(!it)return;
    it.item=document.getElementById('lce-item').value;
    it.cat=document.getElementById('lce-cat').value;
    it.qty=document.getElementById('lce-qty').value;
    it.start=document.getElementById('lce-start').value;
    it.end=document.getElementById('lce-end').value;
    it.state=document.getElementById('lce-state').value;
    closeModal(); renderCcDemand('logistics');
  }
  function logCapDelete(proj,idx){
    CC_LOGISTICS_CAP.plan[proj].splice(idx,1);
    closeModal(); renderCcDemand('logistics');
  }

  // ─── PROF SERVICES EDIT HELPERS ─────────────────────────────────────────────
  function psCapAdd(proj){
    if(!CC_PROFSERVICES_CAP.plan[proj])CC_PROFSERVICES_CAP.plan[proj]=[];
    CC_PROFSERVICES_CAP.plan[proj].push({scope:'ie',label:'New scope',fte:1,start:'Aug 1',end:'Dec 31',status:'planned'});
    var idx=CC_PROFSERVICES_CAP.plan[proj].length-1;
    renderCcDemand('profservices'); setTimeout(function(){psCapEdit(proj,idx);},50);
  }
  function psCapEdit(proj,idx){
    var it=CC_PROFSERVICES_CAP.plan[proj][idx]; if(!it)return;
    var cap=CC_PROFSERVICES_CAP;
    var scOpts=Object.keys(cap.scopeLabel).map(function(k){return '<option value="'+k+'"'+(it.scope===k?' selected':'')+'>'+cap.scopeLabel[k]+'</option>';}).join('');
    var stOpts=['active','sow_pending','requested','demobilized','planned'].map(function(s){return '<option'+(it.status===s?' selected':'')+'>'+s+'</option>';}).join('');
    var b='<div class="fq-req"><div class="fq-req-t">Edit resource line</div><div class="sub">'+proj+'</div></div>';
    b+='<div class="fq-calc">';
    b+='<div class="fq-crow"><span>Label</span><span><input id="pce-label" class="dp-input" value="'+it.label+'"></span></div>';
    b+='<div class="fq-crow"><span>Discipline</span><span><select id="pce-scope" class="dp-sel">'+scOpts+'</select></span></div>';
    b+='<div class="fq-crow"><span>FTE</span><span><input id="pce-fte" class="dp-input" value="'+it.fte+'"></span></div>';
    b+='<div class="fq-crow"><span>Start</span><span><input id="pce-start" class="dp-input" value="'+it.start+'"></span></div>';
    b+='<div class="fq-crow"><span>End</span><span><input id="pce-end" class="dp-input" value="'+it.end+'"></span></div>';
    b+='<div class="fq-crow"><span>SOW ref</span><span><input id="pce-sow" class="dp-input" value="'+(it.sow||'')+'"></span></div>';
    b+='<div class="fq-crow"><span>Status</span><span><select id="pce-status" class="dp-sel">'+stOpts+'</select></span></div>';
    b+='</div>';
    b+='<div class="modal-foot"><button class="btn btn-ghost" style="color:var(--red);margin-right:auto" onclick="psCapDelete(\''+proj+'\','+idx+')">Delete</button><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-red" onclick="psCapSave(\''+proj+'\','+idx+')">Save</button></div>';
    openModal(b);
  }
  function psCapSave(proj,idx){
    var it=CC_PROFSERVICES_CAP.plan[proj][idx]; if(!it)return;
    it.label=document.getElementById('pce-label').value;
    it.scope=document.getElementById('pce-scope').value;
    it.fte=parseFloat(document.getElementById('pce-fte').value)||it.fte;
    it.start=document.getElementById('pce-start').value;
    it.end=document.getElementById('pce-end').value;
    it.sow=document.getElementById('pce-sow').value||undefined;
    it.status=document.getElementById('pce-status').value;
    closeModal(); renderCcDemand('profservices');
  }
  function psCapDelete(proj,idx){
    CC_PROFSERVICES_CAP.plan[proj].splice(idx,1);
    closeModal(); renderCcDemand('profservices');
  }

  // ─── PROCUREMENT HELPERS ────────────────────────────────────────────────────
  function procToggle(proj,cat,field){
    if(!CC_PROCUREMENT_CAP.state[proj])CC_PROCUREMENT_CAP.state[proj]={};
    if(!CC_PROCUREMENT_CAP.state[proj][cat])CC_PROCUREMENT_CAP.state[proj][cat]={};
    CC_PROCUREMENT_CAP.state[proj][cat][field]=!CC_PROCUREMENT_CAP.state[proj][cat][field];
    renderCcDemand('procurement');
  }
  function procExpandCat(id){
    var el=document.getElementById(id); if(!el)return;
    el.style.display=el.style.display==='none'?'block':'none';
  }
  function procCapEditNote(proj,cat){
    var cur=(CC_PROCUREMENT_CAP.state[proj]&&CC_PROCUREMENT_CAP.state[proj][cat]&&CC_PROCUREMENT_CAP.state[proj][cat].note)||'';
    var b='<div class="fq-req"><div class="fq-req-t">Edit note</div><div class="sub">'+CC_PROCUREMENT_CAP.catLabel[cat]+' · '+proj+'</div></div>';
    b+='<div class="fq-calc"><div class="fq-crow"><span>Note</span><span><input id="pcn-note" class="dp-input" value="'+cur+'"></span></div></div>';
    b+='<div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-red" onclick="(function(){if(!CC_PROCUREMENT_CAP.state[\''+proj+'\'])CC_PROCUREMENT_CAP.state[\''+proj+'\']={}; if(!CC_PROCUREMENT_CAP.state[\''+proj+'\'][\''+cat+'\'])CC_PROCUREMENT_CAP.state[\''+proj+'\'][\''+cat+'\']={};CC_PROCUREMENT_CAP.state[\''+proj+'\'][\''+cat+'\'].note=document.getElementById(\'pcn-note\').value;closeModal();renderCcDemand(\'procurement\');})()">Save</button></div>';
    openModal(b);
  }
  function procRowEdit(proj,idx){
    var rows=CC_PROJ_DP.procurement&&CC_PROJ_DP.procurement[proj]&&CC_PROJ_DP.procurement[proj].rows;
    if(!rows||!rows[idx])return;
    var r=rows[idx];
    var stateOpts=['Delivered','PO issued','Ordered','Active','Projected','At-risk','Requested','Pending','Awaiting pricing'].map(function(s){return '<option'+(r.state===s?' selected':'')+'>'+s+'</option>';}).join('');
    var b='<div class="fq-req"><div class="fq-req-t">Edit procurement item</div><div class="sub">'+proj+'</div></div>';
    b+='<div class="fq-calc">';
    b+='<div class="fq-crow"><span>Item</span><span><input id="pre-item" class="dp-input" value="'+r.item+'"></span></div>';
    b+='<div class="fq-crow"><span>Qty</span><span><input id="pre-qty" class="dp-input" value="'+r.qty+'"></span></div>';
    b+='<div class="fq-crow"><span>Status</span><span><select id="pre-state" class="dp-sel">'+stateOpts+'</select></span></div>';
    b+='<div class="fq-crow"><span>Need by</span><span><input id="pre-window" class="dp-input" value="'+r.window+'"></span></div>';
    b+='<div class="fq-crow"><span>Cost est.</span><span><input id="pre-cost" class="dp-input" value="'+(r.cost||'')+'"></span></div>';
    b+='<div class="fq-crow"><span>Vendor</span><span><input id="pre-firm" class="dp-input" value="'+(r.firm||'TBD')+'"></span></div>';
    var _hInv=typeof r.hasInventory==='boolean'?r.hasInventory:!!(CC_PROCUREMENT_CAP.state[proj]&&CC_PROCUREMENT_CAP.state[proj][r.cat]&&CC_PROCUREMENT_CAP.state[proj][r.cat].hasInventory);
    b+='<div class="fq-crow" style="padding-top:8px;margin-top:4px;border-top:1px solid var(--g100)"><span>Has inventory</span><span style="display:flex;align-items:center;gap:6px"><input type="checkbox" id="pre-hasinv"'+(_hInv?' checked':'')+' style="width:15px;height:15px;cursor:pointer"><span style="font-size:11.5px;color:var(--g600)">'+(_hInv?'Marked as available':'Not yet sourced')+'</span></span></div>';
    b+='</div>';
    b+='<div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-red" onclick="procRowSave(\''+proj+'\','+idx+')">Save</button></div>';
    openModal(b);
  }
  function procRowSave(proj,idx){
    var rows=CC_PROJ_DP.procurement[proj].rows; if(!rows||!rows[idx])return;
    var r=rows[idx];
    r.item=document.getElementById('pre-item').value;
    r.qty=document.getElementById('pre-qty').value;
    r.state=document.getElementById('pre-state').value;
    r.window=document.getElementById('pre-window').value;
    r.cost=document.getElementById('pre-cost').value;
    r.firm=document.getElementById('pre-firm').value;
    r.hasInventory=!!document.getElementById('pre-hasinv').checked;
    closeModal(); renderCcDemand('procurement');
  }
  function procItemInvToggle(proj,idx){
    var rows=CC_PROJ_DP.procurement&&CC_PROJ_DP.procurement[proj]&&CC_PROJ_DP.procurement[proj].rows;
    if(!rows||!rows[idx])return;
    var r=rows[idx];
    var catSt=(CC_PROCUREMENT_CAP.state[proj]&&CC_PROCUREMENT_CAP.state[proj][r.cat])||{};
    var cur=typeof r.hasInventory==='boolean'?r.hasInventory:!!catSt.hasInventory;
    r.hasInventory=!cur;
    renderCcDemand('procurement');
  }

  // ─── RENDER: EQUIPMENT ───────────────────────────────────────────────────────

  // ─── RENDER: LOGISTICS ───────────────────────────────────────────────────────
  function renderLogisticsCapPlan(proj){
    if(!CC_LOGISTICS_CAP||!CC_LOGISTICS_CAP.plan[proj])return '';
    var cap=CC_LOGISTICS_CAP;
    var items=cap.plan[proj];
    var projName=_PROJ_LABELS[proj]||proj;
    var rng=_ganttRange(items,'start','end');
    var lo=rng.lo,span=rng.hi-rng.lo||1;
    function pctL(n){return _pct(n,lo,span);}
    var monthNms=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var ganttH=items.length*26+50;
    var h='<div style="margin-top:24px">';
    h+='<div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">';
    h+='<span class="dp-sec-t">'+svg(IC.truck)+'GC / GR Fleet Plan</span>';
    h+='<span style="font-size:10.5px;color:var(--g400);background:var(--g100);border-radius:4px;padding:2px 8px">Illustrative, V1</span>';
    h+='<span class="spacer"></span><span style="font-size:11.5px;color:var(--g500)">'+projName+'</span></div>';
    if(CURRENT!=='ns'){h+='<div style="background:rgba(99,102,241,.04);border:1px solid rgba(99,102,241,.15);border-radius:7px;padding:8px 12px;margin-bottom:12px;font-size:11.5px;color:var(--g600)"><b style="color:var(--charcoal)">V1 · Demo data.</b> <span style="color:var(--g400)">⭐ North Star: 02S auto-flags move-event overloads and fleet shortfalls against the regional pool before they hit the field.</span></div>';}
    var ns=CURRENT==='ns';
    if(ns){
    h+='<div style="background:rgba(99,102,241,.05);border:1px solid rgba(99,102,241,.15);border-radius:7px;padding:7px 12px;margin-bottom:10px;font-size:11.5px;color:var(--g500)"><span style="font-size:9.5px;font-weight:700;color:var(--indigo);background:rgba(99,102,241,.12);border-radius:3px;padding:1px 5px;margin-right:8px;vertical-align:1px">NORTH STAR</span>02S monitors move events and regional fleet availability to flag overloads before they reach the field.</div>';
    h+='<div class="ins-strip"><span class="isi">'+CC_SPARK+'</span><div><div class="ist">Gate conflict Oct 15 &middot; 2 permits pending</div><div class="isd">Switchgear haul + crane mobilization using same gate &middot; resequence before permits expire</div></div></div>';
    h+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:14px">';
    h+='<div style="background:#fff;border:1px solid rgba(239,68,68,.25);border-radius:6px;padding:10px 12px">';
    h+='<div style="font-size:9.5px;font-weight:700;color:var(--g400);text-transform:uppercase;letter-spacing:.04em;margin-bottom:4px">GATE CONFLICT</div>';
    h+='<div style="font-size:12px;font-weight:600;color:var(--g900);margin-bottom:2px">Oct 15 &mdash; north gate</div>';
    h+='<div style="font-size:11px;color:var(--red)">Switchgear haul + crane mob &middot; resequence or split</div></div>';
    h+='<div style="background:#fff;border:1px solid rgba(251,146,60,.35);border-radius:6px;padding:10px 12px">';
    h+='<div style="font-size:9.5px;font-weight:700;color:var(--g400);text-transform:uppercase;letter-spacing:.04em;margin-bottom:4px">PERMIT STATUS</div>';
    h+='<div style="font-size:12px;font-weight:600;color:var(--g900);margin-bottom:2px">3 oversize hauls</div>';
    h+='<div style="font-size:11px;color:#d97706">1 approved &middot; 2 pending (30-day lead time)</div></div>';
    h+='<div style="background:#fff;border:1px solid var(--g200);border-radius:6px;padding:10px 12px">';
    h+='<div style="font-size:9.5px;font-weight:700;color:var(--g400);text-transform:uppercase;letter-spacing:.04em;margin-bottom:4px">P6 ALERT</div>';
    h+='<div style="font-size:12px;font-weight:600;color:var(--g900);margin-bottom:2px">Cimarron concrete &mdash; Sep 12</div>';
    h+='<div style="font-size:11px;color:var(--g600)">Excavator delivery must complete Sep 10</div></div>';
    h+='</div>';
    }
    var gCols='1.4fr 120px 70px 80px 80px 80px 28px';
    h+='<div style="overflow:hidden;border:1px solid var(--g150);border-radius:8px;margin-bottom:16px">';
    h+='<div class="dp-head" style="grid-template-columns:'+gCols+'"><span>Item</span><span>Category</span><span>Qty</span><span>Start</span><span>End</span><span>Status</span><span></span></div>';
    items.forEach(function(it,idx){
      h+='<div class="dp-row" style="grid-template-columns:'+gCols+'">';
      h+='<div style="font-weight:600;font-size:12px">'+it.item+'</div>';
      h+='<div style="font-size:11.5px;color:var(--g600)">'+(cap.typeLabel[it.cat]||it.cat)+'</div>';
      h+='<div style="font-size:11.5px;color:var(--g600)">'+it.qty+'</div>';
      h+='<div style="font-size:11.5px">'+it.start+'</div>';
      h+='<div style="font-size:11.5px">'+it.end+'</div>';
      h+='<div>'+_sBadge(it.state)+'</div>';
      h+='<div><button style="background:none;border:none;padding:1px 4px;cursor:pointer;color:var(--g400);font-size:13px;line-height:1" title="Edit" onclick="logCapEdit(\''+proj+'\','+idx+')">&#9998;</button></div>';
      h+='</div>';
    });
    h+='</div>';
    h+='<div style="display:flex;justify-content:flex-end;margin-bottom:8px"><button class="btn btn-ghost btn-sm" style="font-size:11px" onclick="logCapAdd(\''+proj+'\')">+ Add line</button></div>';
    h+='<div class="eq-toolbar" style="margin-top:4px"><span class="dp-sec-t" style="font-size:11.5px">'+svg(IC.chart)+'Deployment &amp; transit schedule</span></div>';
    h+='<div style="background:#fff;border:1px solid var(--g200);border-radius:8px;padding:12px 14px 14px;overflow:hidden">';
    h+='<div style="display:flex;margin-bottom:4px"><div style="min-width:160px"></div>';
    h+='<div style="position:relative;flex:1;height:20px;border-bottom:1px solid var(--g200)">';
    for(var lmi=0;lmi<12;lmi++){
      var mn=(lmi+1)*30+1;
      if(mn>=lo&&mn<=rng.hi){h+='<div style="position:absolute;left:'+pctL(mn)+'%;font-size:10px;color:var(--g500);white-space:nowrap">'+monthNms[lmi]+'</div>';if(pctL(mn)>1)h+='<div style="position:absolute;left:'+pctL(mn)+'%;top:16px;height:'+ganttH+'px;border-left:1px solid var(--g100);pointer-events:none"></div>';}
      var mn2=mn+360;
      if(mn2>=lo&&mn2<=rng.hi){h+='<div style="position:absolute;left:'+pctL(mn2)+'%;font-size:10px;color:var(--g500);white-space:nowrap">'+monthNms[lmi]+'</div>';if(pctL(mn2)>1)h+='<div style="position:absolute;left:'+pctL(mn2)+'%;top:16px;height:'+ganttH+'px;border-left:1px solid var(--g100);pointer-events:none"></div>';}
    }
    h+='</div></div>';
    items.forEach(function(it){
      var sn=_logN(it.start),en=_logN(it.end);if(en<sn)en+=360;
      var x1=pctL(sn),x2=pctL(en),bw=Math.max(x2-x1,2);
      var bc=_sColor(it.state),op=_sOpacity(it.state);
      h+='<div style="display:flex;align-items:center;margin:3px 0">';
      h+='<div style="min-width:160px;font-size:11px;color:var(--g700);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding-right:8px;flex-shrink:0">'+it.item+'</div>';
      h+='<div style="position:relative;flex:1;height:22px">';
      h+='<div title="'+it.item+' · '+it.start+' → '+it.end+'" style="position:absolute;left:'+x1+'%;width:'+bw+'%;height:18px;top:2px;border-radius:4px;background:'+bc+';opacity:'+op+'">';
      if(bw>5)h+='<div style="font-size:9.5px;color:#fff;padding:2px 4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+it.item+'</div>';
      h+='</div></div></div>';
    });
    h+='<div style="display:flex;gap:14px;margin-top:10px;flex-wrap:wrap;padding-top:8px;border-top:1px solid var(--g100)">';
    h+='<div style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--g600)"><div style="width:18px;height:10px;background:#10b981;border-radius:2px;opacity:.82"></div>Active / Deployed</div>';
    h+='<div style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--g600)"><div style="width:18px;height:10px;background:#3b82f6;border-radius:2px;opacity:.65"></div>Planned / Projected</div>';
    h+='<div style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--g600)"><div style="width:18px;height:10px;background:#f59e0b;border-radius:2px;opacity:.55"></div>Requested / Pending</div>';
    h+='<div style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--g600)"><div style="width:18px;height:10px;background:#9ca3af;border-radius:2px;opacity:.45"></div>Demobilized</div>';
    h+='</div></div>';
    var catTotals={};items.forEach(function(it){var n=parseInt(it.qty,10)||1;catTotals[it.cat]=(catTotals[it.cat]||0)+n;});
    var withinItems=[],atRiskItems=[];
    items.forEach(function(it){var owned=cap.fleetOwned[it.cat];var used=catTotals[it.cat];var risk=typeof owned==='number'&&used>owned;(risk?atRiskItems:withinItems).push(it);});
    var accId='log-acc-'+proj;
    h+='<div style="margin-top:12px;display:grid;grid-template-columns:1fr 1fr;gap:10px">';
    h+='<div style="border:1px solid rgba(16,185,129,.2);border-radius:8px;overflow:hidden">';
    h+='<div style="padding:10px 14px;background:rgba(16,185,129,.06);display:flex;align-items:center;justify-content:space-between;cursor:pointer" onclick="logCapAccToggle(\''+accId+'-ok\')">';
    h+='<div><span style="font-size:12.5px;font-weight:700;color:#047857">✓ Within capacity</span><span style="margin-left:8px;font-size:11px;color:var(--g500)">'+withinItems.length+' item'+(withinItems.length!==1?'s':'')+'</span></div>';
    h+='<span style="font-size:11px;color:var(--g400)">▾</span></div>';
    h+='<div id="'+accId+'-ok">';
    withinItems.forEach(function(it){
      h+='<div style="display:flex;justify-content:space-between;align-items:center;padding:7px 14px;border-top:1px solid rgba(16,185,129,.1);font-size:11.5px">';
      h+='<span style="color:var(--g700)">'+it.item+'</span><span style="color:var(--g500)">'+(cap.typeLabel[it.cat]||it.cat)+' · '+it.qty+'</span></div>';
    });
    if(!withinItems.length)h+='<div style="padding:10px 14px;font-size:11.5px;color:var(--g400)">No items within capacity.</div>';
    h+='</div></div>';
    h+='<div style="border:1px solid '+(atRiskItems.length?'rgba(239,68,68,.25)':'var(--g200)')+';border-radius:8px;overflow:hidden">';
    h+='<div style="padding:10px 14px;background:'+(atRiskItems.length?'rgba(239,68,68,.05)':'var(--g50)')+';display:flex;align-items:center;justify-content:space-between;cursor:pointer" onclick="logCapAccToggle(\''+accId+'-risk\')">';
    h+='<div><span style="font-size:12.5px;font-weight:700;color:'+(atRiskItems.length?'var(--red)':'var(--g500)')+'">'+( atRiskItems.length?'⚠ At risk':'— No risks')+'</span><span style="margin-left:8px;font-size:11px;color:var(--g500)">'+atRiskItems.length+' item'+(atRiskItems.length!==1?'s':'')+'</span></div>';
    h+='<span style="font-size:11px;color:var(--g400)">▾</span></div>';
    h+='<div id="'+accId+'-risk">';
    atRiskItems.forEach(function(it){
      var owned=cap.fleetOwned[it.cat];
      h+='<div style="display:flex;justify-content:space-between;align-items:center;padding:7px 14px;border-top:1px solid rgba(239,68,68,.1);font-size:11.5px">';
      h+='<span style="color:var(--red)">'+it.item+'</span>';
      h+='<span style="color:var(--g500)">'+(cap.typeLabel[it.cat]||it.cat)+' · using '+catTotals[it.cat]+' / <b contenteditable="true" onblur="CC_LOGISTICS_CAP.fleetOwned[\''+it.cat+'\']=parseInt(this.innerText,10)||'+(owned||0)+';renderCcDemand(\'logistics\')" style="border-bottom:1px dashed var(--g400);outline:none;cursor:text">'+(owned||0)+'</b> owned</span>';
      h+='</div>';
    });
    if(!atRiskItems.length)h+='<div style="padding:10px 14px;font-size:11.5px;color:var(--g400)">All items within fleet capacity.</div>';
    h+='</div></div>';
    h+='</div>';
    var moves=cap.moveEvents[proj]||[];
    if(moves.length){
      h+='<div style="margin-top:14px"><div style="font-size:11px;font-weight:700;color:var(--g600);text-transform:uppercase;letter-spacing:.04em;margin-bottom:6px">Peak move events</div>';
      h+='<div style="display:flex;flex-wrap:wrap;gap:8px">';
      moves.forEach(function(m){var risk=m.events>=cap.moveCapacity*.8;h+='<div style="background:'+(risk?'rgba(239,68,68,.06)':'var(--g50)')+';border:1px solid '+(risk?'rgba(239,68,68,.2)':'var(--g150)')+';border-radius:6px;padding:6px 10px;font-size:11px"><b>'+m.week+'</b> — '+m.events+' moves'+(m.note?' · '+m.note:'')+(risk?' <span style="color:var(--red)">⚠</span>':'')+'</div>';});
      h+='</div><div style="font-size:10.5px;color:var(--g400);margin-top:5px">Regional crew capacity: <b contenteditable="true" onblur="CC_LOGISTICS_CAP.moveCapacity=parseInt(this.innerText,10)||'+cap.moveCapacity+';renderCcDemand(\'logistics\')" style="border-bottom:1px dashed var(--g400);outline:none;cursor:text">'+cap.moveCapacity+'</b> moves/wk</div></div>';
    }
    h+='</div>';
    return h;
  }

  // ─── RENDER: PROF SERVICES ───────────────────────────────────────────────────
  function renderProfServicesCapPlan(proj){
    if(!CC_PROFSERVICES_CAP||!CC_PROFSERVICES_CAP.plan[proj])return '';
    var cap=CC_PROFSERVICES_CAP;
    var items=cap.plan[proj];
    var projName=_PROJ_LABELS[proj]||proj;
    var rng=_ganttRange(items,'start','end');
    var lo=rng.lo,span=rng.hi-rng.lo||1;
    function pctP(n){return _pct(n,lo,span);}
    var monthNms=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var ganttH=items.length*26+50;
    var stMap={active:'Active',sow_pending:'SOW pending',requested:'Requested',demobilized:'Demobilized',planned:'Planned'};
    var h='<div style="margin-top:24px">';
    h+='<div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">';
    h+='<span class="dp-sec-t">'+svg(IC.people)+'Resource Deployment Plan</span>';
    h+='<span style="font-size:10.5px;color:var(--g400);background:var(--g100);border-radius:4px;padding:2px 8px">Illustrative, V1</span>';
    h+='<span class="spacer"></span><span style="font-size:11.5px;color:var(--g500)">'+projName+'</span></div>';
    if(CURRENT!=='ns'){h+='<div style="background:rgba(99,102,241,.04);border:1px solid rgba(99,102,241,.15);border-radius:7px;padding:8px 12px;margin-bottom:12px;font-size:11.5px;color:var(--g600)"><b style="color:var(--charcoal)">V1 · Demo data.</b> In production, resource lines are entered by the project PM (scope, FTE, dates, SOW ref). <span style="color:var(--g400)">⭐ North Star: 02S cross-references CPM milestones and flags resources not confirmed before their mobilization window.</span></div>';}
    var ns=CURRENT==='ns';
    if(ns){
    h+='<div style="background:rgba(99,102,241,.05);border:1px solid rgba(99,102,241,.15);border-radius:7px;padding:7px 12px;margin-bottom:10px;font-size:11.5px;color:var(--g500)"><span style="font-size:9.5px;font-weight:700;color:var(--indigo);background:rgba(99,102,241,.12);border-radius:3px;padding:1px 5px;margin-right:8px;vertical-align:1px">NORTH STAR</span>02S cross-references CPM milestones and flags any resource not confirmed before its mobilization window.</div>';
    h+='<div class="ins-strip"><span class="isi">'+CC_SPARK+'</span><div><div class="ist">2 roles unplaced &middot; commissioning SOW gap</div><div class="isd">VDC/BIM + structural inspection unpriced &middot; BESS commissioning SOW must execute by Oct 1</div></div></div>';
    h+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:14px">';
    h+='<div style="background:#fff;border:1px solid rgba(239,68,68,.25);border-radius:6px;padding:10px 12px">';
    h+='<div style="font-size:9.5px;font-weight:700;color:var(--g400);text-transform:uppercase;letter-spacing:.04em;margin-bottom:4px">UNPLACED ROLES</div>';
    h+='<div style="font-size:12px;font-weight:600;color:var(--g900);margin-bottom:2px">VDC/BIM + structural insp.</div>';
    h+='<div style="font-size:11px;color:var(--red)">Needed within 45 days &middot; pricing unconfirmed</div></div>';
    h+='<div style="background:#fff;border:1px solid rgba(239,68,68,.25);border-radius:6px;padding:10px 12px">';
    h+='<div style="font-size:9.5px;font-weight:700;color:var(--g400);text-transform:uppercase;letter-spacing:.04em;margin-bottom:4px">SOW ALERT</div>';
    h+='<div style="font-size:12px;font-weight:600;color:var(--g900);margin-bottom:2px">BESS commissioning</div>';
    h+='<div style="font-size:11px;color:var(--red)">P6 startup Nov 2026 &middot; SOW deadline: Oct 1</div></div>';
    h+='<div style="background:#fff;border:1px solid rgba(251,146,60,.35);border-radius:6px;padding:10px 12px">';
    h+='<div style="font-size:9.5px;font-weight:700;color:var(--g400);text-transform:uppercase;letter-spacing:.04em;margin-bottom:4px">UTILIZATION</div>';
    h+='<div style="font-size:12px;font-weight:600;color:var(--g900);margin-bottom:2px">Terracon &mdash; 2 FTE</div>';
    h+='<div style="font-size:11px;color:#d97706">Aug overlap: Hercules + Riverside &middot; confirm avail.</div></div>';
    h+='</div>';
    }
    var gCols='1.4fr 130px 60px 80px 80px 110px 28px';
    h+='<div style="overflow:hidden;border:1px solid var(--g150);border-radius:8px;margin-bottom:12px">';
    h+='<div class="dp-head" style="grid-template-columns:'+gCols+'"><span>Scope / Role</span><span>Discipline</span><span>FTE</span><span>Start</span><span>End</span><span>SOW Status</span><span></span></div>';
    items.forEach(function(it,idx){
      var stLabel=stMap[it.status]||it.status;
      h+='<div class="dp-row" style="grid-template-columns:'+gCols+'">';
      h+='<div style="font-weight:600;font-size:12px">'+it.label+(it.sow?'<span style="font-size:10px;color:var(--g400);margin-left:6px">'+it.sow+'</span>':'')+'</div>';
      h+='<div style="font-size:11.5px;color:var(--g600)">'+(cap.scopeLabel[it.scope]||it.scope)+'</div>';
      h+='<div style="font-size:11.5px">'+it.fte+' FTE</div>';
      h+='<div style="font-size:11.5px">'+it.start+'</div>';
      h+='<div style="font-size:11.5px">'+it.end+'</div>';
      h+='<div><span class="tag '+(it.status==='active'?'ok':it.status==='sow_pending'?'warn':it.status==='demobilized'?'neu':'neu')+'" style="font-size:10px">'+stLabel+'</span></div>';
      h+='<div><button style="background:none;border:none;padding:1px 4px;cursor:pointer;color:var(--g400);font-size:13px;line-height:1" title="Edit" onclick="psCapEdit(\''+proj+'\','+idx+')">&#9998;</button></div>';
      h+='</div>';
    });
    h+='</div>';
    h+='<div style="display:flex;justify-content:flex-end;margin-bottom:8px"><button class="btn btn-ghost btn-sm" style="font-size:11px" onclick="psCapAdd(\''+proj+'\')">+ Add line</button></div>';
    h+='<div class="eq-toolbar" style="margin-top:4px"><span class="dp-sec-t" style="font-size:11.5px">'+svg(IC.chart)+'Deployment window</span></div>';
    h+='<div style="background:#fff;border:1px solid var(--g200);border-radius:8px;padding:12px 14px 14px;overflow:hidden">';
    h+='<div style="display:flex;margin-bottom:4px"><div style="min-width:200px"></div>';
    h+='<div style="position:relative;flex:1;height:20px;border-bottom:1px solid var(--g200)">';
    for(var pmi=0;pmi<12;pmi++){
      var pmn=(pmi+1)*30+1;
      if(pmn>=lo&&pmn<=rng.hi){h+='<div style="position:absolute;left:'+pctP(pmn)+'%;font-size:10px;color:var(--g500);white-space:nowrap">'+monthNms[pmi]+'</div>';if(pctP(pmn)>1)h+='<div style="position:absolute;left:'+pctP(pmn)+'%;top:16px;height:'+ganttH+'px;border-left:1px solid var(--g100);pointer-events:none"></div>';}
      var pmn2=pmn+360;
      if(pmn2>=lo&&pmn2<=rng.hi){h+='<div style="position:absolute;left:'+pctP(pmn2)+'%;font-size:10px;color:var(--g500);white-space:nowrap">'+monthNms[pmi]+'</div>';if(pctP(pmn2)>1)h+='<div style="position:absolute;left:'+pctP(pmn2)+'%;top:16px;height:'+ganttH+'px;border-left:1px solid var(--g100);pointer-events:none"></div>';}
    }
    h+='</div></div>';
    items.forEach(function(it){
      var sn=_logN(it.start),en=_logN(it.end);if(en<sn)en+=360;
      var x1=pctP(sn),x2=pctP(en),bw=Math.max(x2-x1,1);
      var bc=it.status==='active'?'#10b981':it.status==='sow_pending'?'#f59e0b':it.status==='demobilized'?'#9ca3af':'#3b82f6';
      var op=it.status==='active'?'.82':it.status==='demobilized'?'.35':it.status==='sow_pending'?'.5':'.65';
      var isDash=it.status==='sow_pending'||it.status==='requested';
      h+='<div style="display:flex;align-items:center;margin:3px 0">';
      h+='<div style="min-width:200px;font-size:11px;color:var(--g700);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding-right:8px;flex-shrink:0">'+it.label+' ('+it.fte+' FTE)</div>';
      h+='<div style="position:relative;flex:1;height:22px">';
      h+='<div title="'+it.label+' · '+it.start+' → '+it.end+'" style="position:absolute;left:'+x1+'%;width:'+bw+'%;height:18px;top:2px;border-radius:4px;background:'+bc+';opacity:'+op+(isDash?';outline:2px dashed '+bc+';outline-offset:-2px;background:'+bc+'40':'')+'">';
      if(bw>8)h+='<div style="font-size:9.5px;color:'+(isDash?bc:'#fff')+';padding:2px 4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:'+(isDash?'600':'400')+'">'+it.label+'</div>';
      h+='</div></div></div>';
    });
    h+='<div style="display:flex;gap:14px;margin-top:10px;flex-wrap:wrap;padding-top:8px;border-top:1px solid var(--g100)">';
    h+='<div style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--g600)"><div style="width:18px;height:10px;background:#10b981;border-radius:2px;opacity:.82"></div>Active</div>';
    h+='<div style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--g600)"><div style="width:18px;height:10px;background:#3b82f6;border-radius:2px;opacity:.65"></div>Planned</div>';
    h+='<div style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--g600)"><div style="width:18px;height:10px;border:2px dashed #f59e0b;background:#f59e0b40;border-radius:2px"></div>SOW pending / Requested</div>';
    h+='<div style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--g600)"><div style="width:18px;height:10px;background:#9ca3af;border-radius:2px;opacity:.45"></div>Demobilized</div>';
    h+='</div></div>';
    var scopeTotals={};items.forEach(function(it){scopeTotals[it.scope]=(scopeTotals[it.scope]||0)+it.fte;});
    var psWithin=[],psRisk=[];
    items.forEach(function(it){var cap2=cap.internalFTE[it.scope]||0;var used=scopeTotals[it.scope];(used>cap2?psRisk:psWithin).push(it);});
    var psAccId='ps-acc-'+proj;
    h+='<div style="margin-top:12px;display:grid;grid-template-columns:1fr 1fr;gap:10px">';
    h+='<div style="border:1px solid rgba(16,185,129,.2);border-radius:8px;overflow:hidden">';
    h+='<div style="padding:10px 14px;background:rgba(16,185,129,.06);display:flex;align-items:center;justify-content:space-between;cursor:pointer" onclick="psCapAccToggle(\''+psAccId+'-ok\')">';
    h+='<div><span style="font-size:12.5px;font-weight:700;color:#047857">✓ Within capacity</span><span style="margin-left:8px;font-size:11px;color:var(--g500)">'+psWithin.length+' role'+(psWithin.length!==1?'s':'')+'</span></div>';
    h+='<span style="font-size:11px;color:var(--g400)">▾</span></div>';
    h+='<div id="'+psAccId+'-ok">';
    psWithin.forEach(function(it){
      h+='<div style="display:flex;justify-content:space-between;align-items:center;padding:7px 14px;border-top:1px solid rgba(16,185,129,.1);font-size:11.5px">';
      h+='<span style="color:var(--g700)">'+it.label+'</span><span style="color:var(--g500)">'+(cap.scopeLabel[it.scope]||it.scope)+' · '+it.fte+' FTE</span></div>';
    });
    if(!psWithin.length)h+='<div style="padding:10px 14px;font-size:11.5px;color:var(--g400)">No roles within capacity.</div>';
    h+='</div></div>';
    h+='<div style="border:1px solid '+(psRisk.length?'rgba(239,68,68,.25)':'var(--g200)')+';border-radius:8px;overflow:hidden">';
    h+='<div style="padding:10px 14px;background:'+(psRisk.length?'rgba(239,68,68,.05)':'var(--g50)')+';display:flex;align-items:center;justify-content:space-between;cursor:pointer" onclick="psCapAccToggle(\''+psAccId+'-risk\')">';
    h+='<div><span style="font-size:12.5px;font-weight:700;color:'+(psRisk.length?'var(--red)':'var(--g500)')+'">'+( psRisk.length?'⚠ At risk':'— No risks')+'</span><span style="margin-left:8px;font-size:11px;color:var(--g500)">'+psRisk.length+' role'+(psRisk.length!==1?'s':'')+'</span></div>';
    h+='<span style="font-size:11px;color:var(--g400)">▾</span></div>';
    h+='<div id="'+psAccId+'-risk">';
    psRisk.forEach(function(it){
      var intl=cap.internalFTE[it.scope]||0;
      h+='<div style="display:flex;justify-content:space-between;align-items:center;padding:7px 14px;border-top:1px solid rgba(239,68,68,.1);font-size:11.5px">';
      h+='<span style="color:var(--red)">'+it.label+'</span>';
      h+='<span style="color:var(--g500)">'+(cap.scopeLabel[it.scope]||it.scope)+' · '+it.fte+' / <b contenteditable="true" onblur="CC_PROFSERVICES_CAP.internalFTE[\''+it.scope+'\']=parseFloat(this.innerText)||'+intl+';renderCcDemand(\'profservices\')" style="border-bottom:1px dashed var(--g400);outline:none;cursor:text">'+intl+'</b> FTE cap</span>';
      h+='</div>';
    });
    if(!psRisk.length)h+='<div style="padding:10px 14px;font-size:11.5px;color:var(--g400)">All roles within FTE capacity.</div>';
    h+='</div></div>';
    h+='</div>';
    h+='</div>';
    return h;
  }

  // ─── RENDER: PROCUREMENT ─────────────────────────────────────────────────────
  function renderProcurementCapPlan(proj){
    var cap=CC_PROCUREMENT_CAP;
    var projRows=(CC_PROJ_DP.procurement&&CC_PROJ_DP.procurement[proj]&&CC_PROJ_DP.procurement[proj].rows)||[];
    var projName=_PROJ_LABELS[proj]||proj;
    var h='<div style="margin-top:24px">';
    h+='<div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">';
    h+='<span class="dp-sec-t">'+svg(IC.cart)+'Inventory Coverage Plan</span>';
    h+='<span style="font-size:10.5px;color:var(--g400);background:var(--g100);border-radius:4px;padding:2px 8px">V1 · Manual inputs</span>';
    h+='<span class="spacer"></span><span style="font-size:11.5px;color:var(--g500)">'+projName+'</span></div>';
    if(CURRENT!=='ns'){h+='<div style="background:rgba(99,102,241,.04);border:1px solid rgba(99,102,241,.15);border-radius:7px;padding:8px 12px;margin-bottom:12px;font-size:11.5px;color:var(--g600)"><b style="color:var(--charcoal)">V1 note:</b> Inventory status and need-by dates are manually flagged — no live IMS feed. <span style="color:var(--g400)">⭐ North Star: 02S connects to the T3 inventory system and contract repository to auto-populate these fields.</span></div>';}
    var ns=CURRENT==='ns';
    if(ns){
    h+='<div style="background:rgba(99,102,241,.05);border:1px solid rgba(99,102,241,.15);border-radius:7px;padding:7px 12px;margin-bottom:10px;font-size:11.5px;color:var(--g500)"><span style="font-size:9.5px;font-weight:700;color:var(--indigo);background:rgba(99,102,241,.12);border-radius:3px;padding:1px 5px;margin-right:8px;vertical-align:1px">NORTH STAR</span>02S connects to T3 inventory and contract data to auto-populate coverage status and flag order-by deadlines.</div>';
    h+='<div class="ins-strip"><span class="isi">'+CC_SPARK+'</span><div><div class="ist">T3 signal: 2 items past order-by</div><div class="isd">BESS containers 14d overdue &middot; MV switchgear exhausted &middot; Nov energization at risk</div></div></div>';
    h+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:14px">';
    h+='<div style="background:#fff;border:1px solid rgba(239,68,68,.25);border-radius:6px;padding:10px 12px">';
    h+='<div style="font-size:9.5px;font-weight:700;color:var(--g400);text-transform:uppercase;letter-spacing:.04em;margin-bottom:4px">T3 INVENTORY</div>';
    h+='<div style="font-size:12px;font-weight:600;color:var(--g900);margin-bottom:2px">MV Switchgear &mdash; 0 units</div>';
    h+='<div style="font-size:11px;color:var(--red)">Allocation exhausted &middot; reorder by Aug 20</div></div>';
    h+='<div style="background:#fff;border:1px solid var(--g200);border-radius:6px;padding:10px 12px">';
    h+='<div style="font-size:9.5px;font-weight:700;color:var(--g400);text-transform:uppercase;letter-spacing:.04em;margin-bottom:4px">P6 SCHEDULE</div>';
    h+='<div style="font-size:12px;font-weight:600;color:var(--g900);margin-bottom:2px">Energization &mdash; Nov 15</div>';
    h+='<div style="font-size:11px;color:var(--g600)">Cable pull closes Aug 30 &middot; order by Aug 2</div></div>';
    h+='<div style="background:#fff;border:1px solid var(--g200);border-radius:6px;padding:10px 12px">';
    h+='<div style="font-size:9.5px;font-weight:700;color:var(--g400);text-transform:uppercase;letter-spacing:.04em;margin-bottom:4px">CONSOLIDATION</div>';
    h+='<div style="font-size:12px;font-weight:600;color:var(--g900);margin-bottom:2px">ABB &mdash; 2 open POs</div>';
    h+='<div style="font-size:11px;color:#d97706">Bundle for ~$18K freight savings</div></div>';
    h+='</div>';
    }
    // Group rows by category
    var cats=[],catMap={};
    projRows.forEach(function(r,idx){
      var c=r.cat||'other';
      if(!catMap[c]){catMap[c]=[];cats.push(c);}
      catMap[c].push({r:r,idx:idx});
    });
    // Compute at-risk list
    var atRiskList=[];
    projRows.forEach(function(r,idx){
      var catSt=(cap.state[proj]&&cap.state[proj][r.cat])||{};
      var hasInv=typeof r.hasInventory==='boolean'?r.hasInventory:!!catSt.hasInventory;
      var isCovered=/delivered|po\.issued|ordered/i.test(r.state||'');
      if(!hasInv&&!isCovered)atRiskList.push({r:r,idx:idx});
    });
    // Category accordion groups
    if(!projRows.length){h+='<div class="fq-empty">No procurement items for '+projName+'.</div>';}
    else{
      h+='<div style="display:flex;flex-direction:column;gap:5px">';
      cats.forEach(function(cat){
        var items=catMap[cat];
        var catLabel=cap.catLabel[cat]||cat||'—';
        var covered=0;
        items.forEach(function(x){
          var catSt=(cap.state[proj]&&cap.state[proj][cat])||{};
          var hasInv=typeof x.r.hasInventory==='boolean'?x.r.hasInventory:!!catSt.hasInventory;
          if(hasInv||/delivered|po\.issued|ordered/i.test(x.r.state||''))covered++;
        });
        var allOk=covered===items.length;
        var catId='pcat-'+proj+'-'+cat;
        h+='<div style="border:1px solid '+(allOk?'var(--g200)':'rgba(239,68,68,.25)')+';border-radius:8px;overflow:hidden">';
        h+='<div style="display:flex;align-items:center;gap:10px;padding:9px 14px;background:'+(allOk?'var(--g50)':'rgba(239,68,68,.03)')+';cursor:pointer" onclick="dpExpandToggle(\''+catId+'\')">';
        h+='<span style="font-size:12px;font-weight:700;color:var(--g800)">'+catLabel+'</span>';
        h+='<span style="font-size:11px;color:var(--g500)">'+items.length+' item'+(items.length!==1?'s':'')+'</span>';
        h+='<span class="spacer"></span>';
        h+='<span style="font-size:11px;font-weight:600;color:'+(allOk?'#16a34a':'var(--red)')+'">'+covered+'/'+items.length+' covered</span>';
        h+='<span style="font-size:11px;color:var(--g400);margin-left:8px">▾</span>';
        h+='</div>';
        var gI='1.6fr 100px 90px 90px 28px';
        h+='<div id="'+catId+'" style="display:none">';
        h+='<div class="dp-head" style="grid-template-columns:'+gI+';background:var(--g50);border-top:1px solid var(--g150)"><span>Item</span><span>Need by</span><span>Status</span><span>Inventory</span><span></span></div>';
        items.forEach(function(x){
          var r=x.r; var idx=x.idx;
          var catSt=(cap.state[proj]&&cap.state[proj][cat])||{};
          var hasInv=typeof r.hasInventory==='boolean'?r.hasInventory:!!catSt.hasInventory;
          var isCovered=/delivered|po\.issued|ordered/i.test(r.state||'');
          var isAtRisk=!hasInv&&!isCovered;
          h+='<div class="dp-row" id="dprow-procurement-'+proj+'-'+idx+'" style="grid-template-columns:'+gI+';'+(isAtRisk?'background:rgba(239,68,68,.03)':'')+'">';
          h+='<div style="font-weight:500;font-size:11.5px">'+r.item+'</div>';
          h+='<div style="font-size:11.5px;'+(isAtRisk&&r.window?'color:var(--red);font-weight:600':'')+'">'+(r.window||'—')+'</div>';
          h+='<div>'+_sBadge(r.state)+'</div>';
          h+='<div><button class="btn btn-'+(isCovered?'ok':hasInv?'ok':'ghost')+' btn-sm" style="font-size:10px;padding:2px 8px" onclick="procItemInvToggle(\''+proj+'\','+idx+')">'+(isCovered?'✓ Covered':hasInv?'✓ Yes':'No')+'</button></div>';
          h+='<div><button style="background:none;border:none;padding:1px 4px;cursor:pointer;color:var(--g400);font-size:13px;line-height:1" onclick="procRowEdit(\''+proj+'\','+idx+')">&#9998;</button></div>';
          h+='</div>';
        });
        h+='</div></div>';
      });
      h+='</div>';
    }
    // Items requiring action (simplified)
    if(atRiskList.length){
      h+='<div style="margin-top:14px">';
      h+='<div style="font-size:11px;font-weight:700;color:var(--g700);text-transform:uppercase;letter-spacing:.04em;margin-bottom:8px">⚠ '+atRiskList.length+' item'+(atRiskList.length!==1?'s':'')+' requiring action</div>';
      h+='<div style="border:1px solid var(--g200);border-radius:8px;overflow:hidden">';
      var aHead='1.8fr 100px 130px 28px';
      h+='<div class="dp-head" style="grid-template-columns:'+aHead+'"><span>Item</span><span>Need by</span><span>PO status</span><span></span></div>';
      atRiskList.forEach(function(a){
        var poIssued=!!(a.r.ordId)||(a.r.state==='PO issued'||a.r.state==='Ordered'||a.r.state==='Delivered');
        var poLabel=poIssued?'✓ PO issued':'Not yet issued';
        var poColor=poIssued?'#16a34a':'var(--red)';
        var isHot=/at.risk/i.test(a.r.state||'');
        h+='<div class="dp-row" style="grid-template-columns:'+aHead+';'+(isHot?'background:rgba(239,68,68,.03)':'')+'">';
        h+='<div style="font-weight:600;font-size:12px;color:'+(isHot?'var(--red)':'var(--g900)')+'">'+a.r.item+'</div>';
        h+='<div style="font-size:11.5px;color:'+(isHot?'var(--red)':'var(--g700)')+';font-weight:'+(isHot?'600':'400')+'">'+(a.r.window||'—')+'</div>';
        h+='<div style="font-size:11.5px;font-weight:600;color:'+poColor+'">'+poLabel+'</div>';
        h+='<div><button style="background:none;border:none;padding:1px 4px;cursor:pointer;color:var(--g400);font-size:13px;line-height:1" onclick="procRowEdit(\''+proj+'\','+a.idx+')">&#9998;</button></div>';
        h+='</div>';
      });
      h+='</div></div>';
    } else {
      h+='<div style="margin-top:10px;font-size:11.5px;color:#16a34a">✓ All items have inventory coverage or confirmed orders.</div>';
    }
    h+='</div>';
    return h;
  }


  // ─── DELTA JUMP HELPER ────────────────────────────────────────────────────────
  function dpDeltaJump(p,proj,rowIdx){
    _dpCcProjMap[p]=proj;
    renderCcDemand(p);
    setTimeout(function(){
      var el=document.getElementById('dprow-'+p+'-'+proj+'-'+rowIdx);
      if(el){el.scrollIntoView({behavior:'smooth',block:'center'});var orig=el.style.background;el.style.background='rgba(59,130,246,.12)';el.style.transition='background 0.8s ease';setTimeout(function(){el.style.background=orig;el.style.transition='';},1800);}
    },80);
  }

  // ─── CAP AT-RISK AGGREGATE (all projects view) ────────────────────────────────
  function renderCapAtRiskSummary(p){
    var projs=['hercules','riverside','cimarron'];
    var risks=[];
    if(p==='logistics'){
      projs.forEach(function(proj){
        (CC_LOGISTICS_CAP.gaps[proj]||[]).forEach(function(g){
          risks.push({proj:proj,label:CC_LOGISTICS_CAP.typeLabel[g.cat]||g.cat,note:g.note,hot:false});
        });
        var items=CC_LOGISTICS_CAP.plan[proj]||[];
        var ct={};items.forEach(function(it){var n=parseInt(it.qty,10)||1;ct[it.cat]=(ct[it.cat]||0)+n;});
        Object.keys(ct).forEach(function(cat){
          var own=CC_LOGISTICS_CAP.fleetOwned[cat];
          if(typeof own==='number'&&ct[cat]>own&&!risks.some(function(r){return r.proj===proj&&r.label===(CC_LOGISTICS_CAP.typeLabel[cat]||cat);})){
            risks.push({proj:proj,label:CC_LOGISTICS_CAP.typeLabel[cat]||cat,note:'Fleet overload: '+ct[cat]+' needed / '+own+' owned',hot:true});
          }
        });
      });
    } else if(p==='profservices'){
      projs.forEach(function(proj){
        (CC_PROFSERVICES_CAP.gaps[proj]||[]).forEach(function(g){
          risks.push({proj:proj,label:CC_PROFSERVICES_CAP.scopeLabel[g.scope]||g.scope,note:g.note,hot:false});
        });
      });
    } else if(p==='procurement'){
      projs.forEach(function(proj){
        var prows=(CC_PROJ_DP.procurement&&CC_PROJ_DP.procurement[proj]&&CC_PROJ_DP.procurement[proj].rows)||[];
        prows.forEach(function(r){
          var catSt=(CC_PROCUREMENT_CAP.state[proj]&&CC_PROCUREMENT_CAP.state[proj][r.cat])||{};
          var hasInv=typeof r.hasInventory==='boolean'?r.hasInventory:!!catSt.hasInventory;
          var covered=/delivered|po\.issued|ordered/i.test(r.state||'');
          if(!hasInv&&!covered){
            var catL=CC_PROCUREMENT_CAP.catLabel[r.cat]||r.cat||'';
            risks.push({proj:proj,label:r.item,note:(r.window?'Need by '+r.window:'')+(r.window&&catL?' · ':'')+catL,hot:/at.risk/i.test(r.state||'')});
          }
        });
      });
    } else if(p==='prefab'){
      projs.forEach(function(proj){
        (CC_PREFAB_CAP.gaps[proj]||[]).forEach(function(g){
          risks.push({proj:proj,label:CC_PREFAB_CAP.typeLabel[g.t]||g.t||'Prefab',note:g.note,hot:false});
        });
      });
    }
    var h='<div style="margin-top:20px">';
    if(!risks.length){
      h+='</div>';
      return h;
    }
    h+='<div class="eq-toolbar"><span class="dp-sec-t">'+svg('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',0)+'Capacity risks — all projects</span><span class="spacer"></span><span style="font-size:11px;color:var(--g400)">'+risks.length+' flagged item'+(risks.length!==1?'s':'')+'</span></div>';
    h+='<div style="display:flex;flex-direction:column;gap:6px;margin-top:8px">';
    var _visRisks=_capRiskLimit[p]?risks:risks.slice(0,5);_visRisks.forEach(function(risk){
      var pLbl=_PROJ_LABELS[risk.proj]||risk.proj;
      var bg=risk.hot?'rgba(239,68,68,.04)':'rgba(245,158,11,.04)';
      var bd=risk.hot?'rgba(239,68,68,.18)':'rgba(245,158,11,.18)';
      var tc=risk.hot?'var(--red)':'#b45309';
      h+='<div style="display:grid;grid-template-columns:1fr auto;align-items:center;background:'+bg+';border:1px solid '+bd+';border-radius:6px;padding:8px 14px;gap:12px">';
      h+='<div><div style="font-size:12px;font-weight:700;color:'+tc+'">'+risk.label+'</div>';
      if(risk.note)h+='<div style="font-size:11px;color:var(--g600);margin-top:2px">'+risk.note+'</div>';
      h+='</div>';
      h+='<div style="font-size:11px;color:var(--g500);white-space:nowrap;background:var(--g100);padding:2px 8px;border-radius:4px">'+pLbl+'</div>';
      h+='</div>';
    });
    if(!_capRiskLimit[p]&&risks.length>5){h+='<div onclick="capRiskToggle(\''+p+'\')" style="padding:7px 0;text-align:center;cursor:pointer;font-size:12px;color:var(--g500);text-decoration:underline">Show all '+risks.length+' capacity risks \u2192</div>';}
    h+='</div></div>';
    return h;
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
      b+='<div class="modal-foot" style="display:flex;align-items:center"><div style="font-size:11px;color:var(--g500)">After confirming, find this in the <button class="btn btn-ghost btn-sm" style="font-size:11px;padding:1px 6px" onclick="closeModal();ccGo(\'fulfill\')">Fulfillment queue</button></div><div class="mfoot-btns" style="margin-left:auto;display:flex;gap:8px"><button class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-red" onclick="dpConfirmTax()">Confirm taxonomy</button></div></div>';
    } else {
      b+='<div class="eq-cap">'+svg('<path d="M20 6L9 17l-5-5"/>')+'<span>Taxonomy confirmed \u2014 this request is released to the Fulfillment queue for the owned vs re-rent decision.</span></div>';
      b+='<div class="modal-foot"><div class="mfoot-btns" style="margin-left:auto;display:flex;gap:8px"><button class="btn btn-ghost" onclick="closeModal()">Close</button><button class="btn btn-dark" onclick="dpOpenFulfill(\''+r.id+'\')">Open in Fulfillment queue</button></div></div>';
    }
    openModal((r.taxOk?'Request':'Confirm class')+' \u2014 '+r.id, b);
  }
  function dpConfirmTax(){ var r=dpRowById(dpCur.p,dpCur.id); if(!r)return; var sel=gel('dpLeafSel'); var chosen=(sel&&sel.value)?sel.value:(r.mapLeaf||''); r.taxOk=true; if(chosen)r.leaf=chosen; r.status='Ready'; var _fqI=null; for(var i=0;i<FQ.length;i++){if(FQ[i].ref===dpCur.id){_fqI=FQ[i];break;}} if(_fqI)_fqI.taxMapped=true; closeModal(); renderCcDemand(dpCur.p); var _fs=gel('ccscreen-fulfill'); if(_fs&&_fs.classList.contains('active'))renderFulfill(); toast(r.id+' confirmed as '+r.tax+(r.leaf?(' \u203a '+r.leaf):'')+' \u2014 released to the Fulfillment queue'); }
  function dpRelease(p){ var rs=CC_DP[p].rows; var n=0; for(var i=0;i<rs.length;i++){ if(rs[i].status==='Ready')n++; } if(!n){ toast('No ready requests \u2014 confirm taxonomy first'); return; } toast(n+' ready request'+(n===1?'':'s')+' released to the Fulfillment queue'); }
  function dpConsolidate(p){ var cs=CC_DP[p].consol; if(!cs)return; toast('Consolidation queued \u2014 '+cs.cta.toLowerCase()+' \u00b7 est. '+cs.save+' saved'); }
  function dpOpenFulfill(ref){ ccHighlight=ref; fqFP='all'; fqFPr='all'; fqFS='all'; closeModal(); ccGo('fulfill'); }
  function ccGoFulfill(ref){ fqView='orders'; fqFP='all'; fqFPr='all'; fqFS='all'; _fqShowAll=!!ref; if(ref)ccHighlight=ref; ccGo('fulfill'); }

  /* ═══════════ OTHER-PILLAR DEMAND PLANS (config-driven strawman) ═══════════ */
  var DP_TONE={'Active':'ok','Delivered':'ok','Complete':'ok','Installed':'ok','Approved':'ok','In transit':'info','In fabrication':'info','Submittal':'info','PO issued':'info','Scheduled':'info','Mobilized':'info','Projected':'info','Requested':'neu','Acknowledged':'neu','Draft':'neu','Demobilized':'neu','Pending pricing':'warn','At-risk':'bad'};
  var IC={dollar:'<path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>',check:'<path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/>',people:'<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/>',chart:'<path d="M3 3v18h18"/><path d="M7 13l3-3 4 4 5-5"/>',clock:'<circle cx="12" cy="12" r="10"/><path d="M12 7v5l3 2"/>',warn:'<path d="M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L14.7 3.9a2 2 0 00-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',cart:'<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 002 1.6h9.7a2 2 0 002-1.6L23 6H6"/>',box:'<path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><path d="M3.3 7L12 12l8.7-5"/>',layers:'<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>',truck:'<rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>',crane:'<path d="M10 3h4l7 7-4 4-7-7V3z"/><path d="M3 21h18M6 21v-6"/>'};
  var DP={
    profservices:{ title:'Professional services demand plan', chip:'Engineering, inspection &amp; commissioning', icon:IC.people, singular:'services',
      vitals:[{label:'Plan budget',value:'$3.2M',sub:'services \u00b7 15-mo horizon',tone:'ok',icon:IC.dollar},{label:'Committed to date',value:'$1.3M',sub:'41% \u00b7 5 roles active',tone:'ok',icon:IC.check},{label:'Active headcount',value:'14 FTE',sub:'across 6 firms',tone:'ok',icon:IC.people},{label:'Projected at complete',value:'$2.4M',sub:'+$0.8M under plan',tone:'ok',icon:IC.chart}],
      ns:'02S maps each role to the CPM schedule \u2014 the BESS commissioning agent mobilizes as the containers land, and the VDC role is flagged as unpriced before it\u2019s needed on site.',
      cap:'Roles are priced from the 02S rate card; specialty roles are quoted by 02S. The team sets headcount, mobilization window, and cost code.',
      cols:[{key:'role',label:'Role',sub:'firm',w:'1fr'},{key:'qty',label:'Headcount',cls:'c',w:'92px'},{key:'window',label:'Mobilize \u2192 demobilize',w:'176px'},{key:'code',label:'Cost code',w:'160px'},{key:'cost',label:'Monthly',cls:'r',w:'100px'},{key:'__docs',label:'Documents',w:'88px'},{key:'__state',label:'Status',w:'118px'}],
      add:{nameKey:'role',subKey:'firm',qtyKey:'qty',whenKey:'window',costKey:'cost'}, addName:{label:'Role',ph:'e.g. Commissioning agent'}, addQty:{label:'Headcount',ph:'e.g. 2 FTE'}, addWhen:{label:'Mobilize \u2192 demobilize',ph:'e.g. Nov 2026 \u2013 Mar 2027'},
      rows:[
        {role:'Owner\u2019s engineer / IE support',firm:'DNV',qty:'2 FTE',window:'Mar 2026 \u2013 Dec 2026',code:'0100-0100-0000-0001 \u00b7 General conditions',cost:'$28K/mo',state:'Active',scope:'Engineering & oversight',sa:0,ea:8,linkOrd:'ORD-3095'},
        {role:'Geotechnical inspection',firm:'Terracon',qty:'3 FTE',window:'Mar 2026 \u2013 Aug 2026',code:'0200-0320-0000-0001 \u00b7 Site earthwork',cost:'$18K/mo',state:'Active',scope:'Survey & site monitoring',sa:0,ea:4,linkOrd:'ORD-3096',attachments:[{type:'Engineering',name:'Geotechnical investigation report — Hercules phase 2',ref:'GIR-3096-001',status:'Approved'},{type:'Engineering',name:'Field inspection log — Jul 2026',ref:'FIL-3096-JUL',status:'Current'},{type:'Safety',name:'Scope of work — geotech inspection',ref:'SOW-3096-001',status:'Executed'}]},
        {role:'Structural special inspection',firm:'Terracon',qty:'2 FTE',window:'Jun 2026 \u2013 Feb 2027',code:'3100-6200-0000-0001 \u00b7 Solar pile',cost:'$16K/mo',state:'Active',scope:'Engineering & oversight',sa:2,ea:9,linkOrd:'ORD-3091',attachments:[{type:'Engineering',name:'Special inspection program — IBC §1705',ref:'SIP-3091-001',status:'Approved'},{type:'Engineering',name:'Monthly inspection report — Jul 2026',ref:'MIR-3091-JUL',status:'Current'}]},
        {role:'BESS commissioning agent',firm:'3rd-party',qty:'2 FTE',window:'Nov 2026 \u2013 Mar 2027',code:'2600-3300-0000-0001 \u00b7 BESS &amp; Substation',cost:'$34K/mo',state:'Projected',scope:'BESS & commissioning',sa:7,ea:9},
        {role:'Environmental / SWPPP monitoring',firm:'SWCA',qty:'1 FTE',window:'Mar 2026 \u2013 May 2026',code:'0100-0100-0000-0001 \u00b7 General conditions',cost:'$9K/mo',state:'Draft',scope:'Survey & site monitoring',sa:0,ea:1},
        {role:'VDC / BIM coordination',firm:'TBD \u2014 not in rate card',qty:'3 FTE',window:'Apr 2026 \u2013 Oct 2026',code:'0100-0100-0000-0001 \u00b7 General conditions',cost:'Pending',state:'Pending pricing',scope:'Engineering & oversight',sa:0,ea:6,quoteRef:'Q-63415'},
        {role:'Site survey crew',firm:'Bowman',qty:'2 FTE',window:'Apr 2026 \u2013 Jul 2026',code:'0100-0100-0000-0001 \u00b7 General conditions',cost:'$12K/mo',state:'Demobilized',scope:'Survey & site monitoring',sa:0,ea:3}
      ]},
    procurement:{ title:'Procurement demand plan', chip:'Small tools &amp; consumables', icon:IC.cart, singular:'procurement',
      vitals:[{label:'Committed',value:'$87K',sub:'small tools on plan',tone:'ok',icon:IC.dollar},{label:'Items on plan',value:'10',sub:'5 categories',tone:'ok',icon:IC.check},{label:'At-risk',value:'1',sub:'order-by passed',tone:'bad',icon:IC.warn},{label:'On-time to need-by',value:'90%',sub:'9 of 10 tracking',tone:'warn',icon:IC.chart}],
      ns:'02S auto-calculates reorder points from the tool deployment schedule \u2014 tone shear wrenches are overdue; release the PO now to protect August solar-pile completion.',
      cap:'Order-by dates are auto-computed from lead time and the tool deployment schedule. Small tools are sourced from the 02S rate card; specialty items are quoted directly.',
      cols:[{key:'item',label:'Item',sub:'itemSub',w:'1fr'},{key:'qty',label:'Qty',cls:'c',w:'86px'},{key:'needby',label:'Need-by',w:'96px'},{key:'orderby',label:'Order-by (lead)',w:'146px',flag:'risk'},{key:'code',label:'Cost code',w:'150px'},{key:'cost',label:'Ext.',cls:'r',w:'82px'},{key:'__docs',label:'Documents',w:'88px'},{key:'__state',label:'Status',w:'112px'}],
      add:{nameKey:'item',subKey:'itemSub',qtyKey:'qty',whenKey:'needby',costKey:'cost'}, addName:{label:'Item',ph:'e.g. Medium-voltage switchgear'}, addQty:{label:'Quantity',ph:'e.g. 2'}, addWhen:{label:'Need-by date',ph:'e.g. Oct 15'},
      rows:[
        {item:'Nut runners \u2014 3/8\'',itemSub:'cordless torque-controlled · solar racking',qty:'48',needby:'Jul 15',orderby:'Jun 1 \u00b7 6 wk',code:'3100-6200-0000-0001 \u00b7 Solar pile',cost:'$22K',state:'PO issued',linkOrd:'ORD-3100'},
        {item:'Battery packs \u2014 20v',itemSub:'Milwaukee M18 · site cordless fleet',qty:'100',needby:'Jul 1',orderby:'Jun 15 \u00b7 2 wk',code:'0100-0100-0000-0001 \u00b7 General conditions',cost:'$11K',state:'Delivered',linkOrd:'ORD-3101'},
        {item:'Quad charging banks',itemSub:'12-bay · site-wide tool charging',qty:'20',needby:'Jul 1',orderby:'Jun 10 \u00b7 3 wk',code:'0100-0100-0000-0001 \u00b7 General conditions',cost:'$14K',state:'Delivered',linkOrd:'ORD-3102'},
        {item:'Tone shear wrenches',itemSub:'TS60 + TS90 · structural bolt tensioning',qty:'12',needby:'Aug 15',orderby:'Jul 18 \u00b7 4 wk',risk:true,code:'3100-6200-0000-0001 \u00b7 Solar pile',cost:'$18K',state:'At-risk',linkOrd:'ORD-3103'},
        {item:'Angle grinders \u2014 4.5\'',itemSub:'cordless 20v · metalwork &amp; weld prep',qty:'16',needby:'Aug 1',orderby:'Jun 15 \u00b7 6 wk',code:'0100-0100-0000-0001 \u00b7 General conditions',cost:'$4K',state:'Delivered',linkOrd:'ORD-3104'},
        {item:'SDS Max rotary hammers',itemSub:'1-3/4\' · concrete anchoring · BESS pad',qty:'8',needby:'Sep 1',orderby:'Aug 10 \u00b7 3 wk',code:'2600-3300-0000-0001 \u00b7 BESS &amp; Substation',cost:'$6K',state:'Draft',quoteRef:'Q-63413'},
        {item:'HEPA vacuums \u2014 10 gal',itemSub:'cordless · silica dust control · OSHA Table 1',qty:'6',needby:'Aug 1',orderby:'Jul 15 \u00b7 2 wk',code:'0100-0100-0000-0001 \u00b7 General conditions',cost:'$4K',state:'PO issued',linkOrd:'ORD-3105'},
        {item:'Wire crimpers \u2014 hydraulic',itemSub:'11T / 12T · BESS &amp; electrical terminations',qty:'8',needby:'Oct 1',orderby:'Sep 5 \u00b7 4 wk',code:'2600-3300-0000-0001 \u00b7 BESS &amp; Substation',cost:'$8K',state:'Draft',quoteRef:'Q-63414'}
      ]},
    prefab:{ title:'Prefab demand plan', chip:'Shop-fabricated assemblies', icon:IC.layers, singular:'prefab',
      vitals:[{label:'Assemblies planned',value:'32',sub:'5 assembly types',tone:'ok',icon:IC.layers},{label:'In fabrication',value:'16',sub:'2 shops',tone:'info',icon:IC.box},{label:'Committed',value:'$0.9M',sub:'made-to-order',tone:'ok',icon:IC.dollar},{label:'On-track to need date',value:'4 of 5',sub:'1 awaiting submittal',tone:'warn',icon:IC.chart}],
      ns:'02S ties each assembly\u2019s submittal \u2192 fabrication \u2192 delivery back to its install date \u2014 the BESS e-houses need submittal approval this week to protect November energization.',
      cap:'Assemblies are made-to-order, so pricing is quoted by 02S after submittal. The team sets quantity, need-on-site date, and cost code.',
      cols:[{key:'asm',label:'Assembly',w:'1fr'},{key:'qty',label:'Qty',cls:'c',w:'80px'},{key:'need',label:'Need on-site',w:'114px'},{key:'stage',label:'Submittal \u2192 fab \u2192 deliver',w:'190px'},{key:'code',label:'Cost code',w:'150px'},{key:'cost',label:'Quote',cls:'r',w:'96px'},{key:'__docs',label:'Documents',w:'88px'},{key:'__state',label:'Status',w:'124px'}],
      add:{nameKey:'asm',qtyKey:'qty',whenKey:'need',costKey:'cost'}, addName:{label:'Assembly',ph:'e.g. Modular e-house'}, addQty:{label:'Quantity',ph:'e.g. 2'}, addWhen:{label:'Need on-site',ph:'e.g. Nov 1'},
      rows:[
        {asm:'Prefab pipe rack modules',qty:'12',need:'Aug 15',stage:'Submittal approved \u00b7 in fab',code:'2600-0540-0000-0001 \u00b7 Module install',cost:'$146K',state:'In fabrication',linkOrd:'ORD-3060'},
        {asm:'L2 headwall assemblies',qty:'8',need:'Jul 20',stage:'Delivered \u00b7 order PF-021',code:'2600-0540-0000-0001 \u00b7 Module install',cost:'$147K',state:'Delivered',linkOrd:'ORD-3106'},
        {asm:'Modular e-houses (BESS)',qty:'2',need:'Nov 1',stage:'Submittal in review',code:'2600-3300-0000-0001 \u00b7 BESS',cost:'Pending',state:'Draft'},
        {asm:'Skid-mounted pump assemblies',qty:'4',need:'Sep 1',stage:'In fabrication',code:'0200-0320-0000-0001 \u00b7 Site earthwork',cost:'$88K',state:'In fabrication',linkOrd:'ORD-3108',attachments:[{type:'Engineering',name:'Shop drawings — pipe rack modules rev C',ref:'SD-3108-RC',status:'Approved'},{type:'Engineering',name:'Material certification — A53 pipe',ref:'MC-3108-001',status:'Approved'},{type:'Submittals',name:'Fabrication schedule — Aug delivery',ref:'FS-3108-001',status:'Current'}]},
        {asm:'Prefab cable tray runs',qty:'lot',need:'Aug 1',stage:'Not started',code:'2600-0540-0000-0001 \u00b7 Module install',cost:'Pending',state:'Draft',quoteRef:'Q-63412'}
      ]},
    logistics:{ title:'Logistics demand plan', chip:'Deliveries, hauls &amp; site moves', icon:IC.truck, singular:'logistics',
      vitals:[{label:'Moves this week',value:'3',sub:'2 heavy hauls',tone:'info',icon:IC.truck},{label:'Heavy hauls (oversize)',value:'4',sub:'permit required',tone:'warn',icon:IC.warn},{label:'Crane picks',value:'2',sub:'scheduled this month',tone:'ok',icon:IC.crane},{label:'Laydown utilization',value:'78%',sub:'Yards A\u2013C',tone:'warn',icon:IC.chart}],
      ns:'02S auto-generates most logistics events from delivery dates across the equipment, procurement, and prefab plans \u2014 and flagged a north-gate conflict where the switchgear haul overlaps tower-crane mobilization.',
      cap:'Most moves are auto-created from delivery dates in the other plans. Add ad-hoc moves here; 02S schedules windows, gates, and permits.',
      cols:[{key:'move',label:'Move / event',sub:'moveSub',w:'1fr'},{key:'type',label:'Type',w:'126px'},{key:'when',label:'Date &amp; window',w:'150px'},{key:'gate',label:'Route / gate',w:'124px'},{key:'src',label:'Source',w:'118px'},{key:'__state',label:'Status',w:'114px'}],
      add:{nameKey:'move',subKey:'moveSub',qtyKey:'type',whenKey:'when'}, addName:{label:'Move / event',ph:'e.g. Crane pick \u2014 module racking'}, addQty:{label:'Type',ph:'Delivery / Heavy haul / Crane pick'}, addWhen:{label:'Date &amp; window',ph:'e.g. Aug 15 \u00b7 6 AM'},
      rows:[
        {move:'Excavator delivery',type:'Heavy haul',when:'May 20 \u00b7 6\u201310 AM',gate:'North gate',src:'ORD-3042',state:'Complete',linkOrd:'ORD-3070'},
        {move:'MV switchgear delivery',moveSub:'oversize load',type:'Heavy haul',linkOrd:'ORD-3116',when:'Oct 15 \u00b7 TBD',gate:'North gate',src:'Procurement',state:'Requested'},
        {move:'Tower crane mobilization',type:'Crane mobilization',when:'Aug 3 \u00b7 5 AM',gate:'Laydown A',src:'ORD-3054',state:'Scheduled',linkOrd:'ORD-3071',attachments:[{type:'Safety',name:'Lift plan — tower crane mobilization Aug 2026',ref:'LP-3071-001',status:'Approved'},{type:'Shipping',name:'Haul route map — oversize crane transport',ref:'HR-3071-001',status:'Approved'},{type:'Safety',name:'Traffic control plan',ref:'TCP-3071-001',status:'Approved'}]},
        {move:'PV module deliveries',moveSub:'recurring',type:'Delivery',linkOrd:'ORD-3117',when:'Sep \u00b7 daily',gate:'East gate',src:'Procurement',state:'Requested'},
        {move:'BESS container placement',type:'Haul + crane',linkOrd:'ORD-3118',when:'Dec 1',gate:'Pad 3',src:'Procurement',state:'Requested'},
        {move:'Prefab pipe rack delivery',type:'Delivery',linkOrd:'ORD-3119',when:'Aug 15',gate:'Laydown B',src:'Prefab',state:'Requested'},
        {move:'Site laydown reservation',type:'Laydown',when:'Ongoing',gate:'Yard C',src:'\u2014',state:'Active',linkOrd:'ORD-3072'}
      ]}
  };
  var dpActive=null, dpAddPk=null;

  var logPlanView='gcgr';
  var gcgrView='table';
  var deliveryFilter='active';
  var GCGR_SERVICES=[
    {svc:'Trash hauling & dumpster service',vendor:'Republic Services',start:'May 1',end:'Jan 31, 2027',cost:'0100-0100-0000-0001',monthly:'$3,200',status:'Active',sa:1,ea:9},
    {svc:'Portable restrooms',vendor:'United Site Services',start:'May 1',end:'Nov 30',cost:'0100-0100-0000-0001',monthly:'$1,800',status:'Active',sa:1,ea:7},
    {svc:'Site office trailers (4 units)',vendor:'WillScot',start:'Apr 15',end:'Dec 15',cost:'0100-0100-0000-0001',monthly:'$4,600',status:'Active',sa:0,ea:8},
    {svc:'Security services — 24/7',vendor:'Allied Universal',start:'May 1',end:'Jan 31, 2027',cost:'0100-0100-0000-0001',monthly:'$18,400',status:'Active',sa:1,ea:9},
    {svc:'Dewatering — sumps & pumping',vendor:'Rain Bird Industrial',start:'Jun 1',end:'Sep 30',cost:'0200-0320-0000-0001',monthly:'$5,100',status:'Scheduled',sa:2,ea:5},
    {svc:'Temporary fencing & barricade',vendor:'Sunbelt Rentals',start:'Apr 15',end:'Nov 30',cost:'0100-0100-0000-0001',monthly:'$1,400',status:'Active',sa:0,ea:7},
    {svc:'Lighting towers (8 units)',vendor:'Sunbelt Rentals',start:'May 1',end:'Jan 31, 2027',cost:'0100-0100-0000-0001',monthly:'$2,800',status:'Active',sa:1,ea:9},
    {svc:'Concrete washout service',vendor:'US LBM',start:'Jun 15',end:'Oct 31',cost:'0300-0100-0000-0001',monthly:'$900',status:'Scheduled',sa:2,ea:6}
  ];
  var MOBDEMOB_EVENTS=[
    {evt:'Tower crane mobilization',vendor:'Maxim Crane Works',needby:'Aug 3',type:'Mob',cost:'0100-5100-0000-0001',notes:'Self-erect · Laydown A · 5 AM window'},
    {evt:'Generator set — 500 kW',vendor:'AGGREKO',needby:'May 20',type:'Mob',cost:'0100-5100-0000-0001',notes:'Temporary power during grid interconnect'},
    {evt:'Site office trailer delivery (4 units)',vendor:'WillScot',needby:'Apr 15',type:'Mob',cost:'0100-0100-0000-0001',notes:'Completed · in service'},
    {evt:'MV switchgear haul — oversize',vendor:'Landstar',needby:'Oct 15',type:'Mob',cost:'0100-5100-0000-0001',notes:'Permit required · North gate · TBD window'},
    {evt:'BESS container placement',vendor:'Barnhart Crane',needby:'Dec 1',type:'Mob',cost:'0100-5100-0000-0001',notes:'Pad 3 · rigging crew required'},
    {evt:'Tower crane demobilization',vendor:'Maxim Crane Works',needby:'Oct 15',type:'Demob',cost:'0100-5100-0000-0001',notes:'After structure phase completion'},
    {evt:'Generator demob after grid tie-in',vendor:'AGGREKO',needby:'Sep 1',type:'Demob',cost:'0100-5100-0000-0001',notes:'Pending grid interconnect confirmation'},
    {evt:'Office trailer removal',vendor:'WillScot',needby:'Jan 15, 2027',type:'Demob',cost:'0100-0100-0000-0001',notes:'Post-substantial completion'}
  ];
  var DELIVERIES=[
    {item:'Excavator — 20T',pillar:'Equipment',needby:'May 20',vendor:'Sunbelt Rentals',order:'ORD-3042',status:'Scheduled'},
    {item:'PV module deliveries (recurring)',pillar:'Procurement',needby:'Sep · daily',vendor:'First Solar',order:'PO-4412',status:'Requested'},
    {item:'Prefab pipe rack modules',pillar:'Prefab',needby:'Aug 15',vendor:'Steel Fab Inc.',order:'PF-021',status:'In fabrication'},
    {item:'MV switchgear',pillar:'Procurement',needby:'Oct 15',vendor:'Eaton',order:'PO-4391',status:'Requested'},
    {item:'¾-Ton Crew Truck (2 units)',pillar:'Equipment',needby:'May 20',vendor:'Enterprise Fleet',order:'ORD-3051',status:'Delivered'},
    {item:'Structural steel — racking',pillar:'Procurement',needby:'Aug 1',vendor:'Nucor Steel',order:'PO-4398',status:'Requested'},
    {item:'Modular e-houses (BESS, 2)',pillar:'Prefab',needby:'Nov 1',vendor:'Eaton Power',order:'PF-022',status:'Submittal'},
    {item:'Cable &amp; conductors',pillar:'Procurement',needby:'Rolling',vendor:'Anixter',order:'PO-4421',status:'Draft'}
  ];
  function setLogPlanView(v){ logPlanView=v; gcgrView='table'; renderLogPlan(); }
  function setGcgrView(v){ gcgrView=v; renderLogPlan(); }
  function setDeliveryFilter(f){ deliveryFilter=f; renderLogPlan(); }
  function renderLogPlan(){
    var mount=document.getElementById('dp-logistics'); if(!mount)return;
    var ns=CURRENT==='ns';
    var LSPARK='<svg viewBox="0 0 24 24" fill="currentColor" style="width:13px;height:13px"><path d="M12 2l2.4 7.4H22l-6 4.5 2.3 7.1L12 16.9 5.3 21l2.3-7.1-6-4.5h7.6z"/></svg>';
    var tabs=[['gcgr','GC/GR Services']].concat(ns?[['trnwh','Transportation &amp; Warehousing']]:[]);
    if(logPlanView==='mobdemob') logPlanView='gcgr';
    if(!ns&&logPlanView==='trnwh') logPlanView='gcgr';
    if(logPlanView==='delivery') logPlanView='gcgr';
    var h='<div class="phead"><div><h1>Logistics plan <span style="font-size:12.5px;font-weight:400;color:var(--g400);margin-left:6px">DP-LOG-HRC-001</span></h1><div class="meta"><span class="chip">Deliveries, ongoing services &amp; mobilization</span><span class="chip ver">'+(ns?'North Star':'V1 — standard')+'</span></div></div></div>';
    if(ns){
      h+='<div class="eq-toolbar" style="margin-bottom:0"><span class="spacer"></span><button class="btn btn-dark btn-sm" onclick="openDPAdd(\'logistics\')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>Add demand line</button></div>';
      h+='<div class="log-tabs">';
      tabs.forEach(function(t){ h+='<button class="log-tab'+(logPlanView===t[0]?' active':'')+'" onclick="setLogPlanView(\''+t[0]+'\')">'+t[1]+'</button>'; });
      h+='</div>';
    } else {
      h+='<div class="eq-toolbar" style="margin-bottom:14px"><span style="font-size:12.5px;color:var(--g500)">V1 focused on GC/GR services — pending scoping conversations with pillar leads.</span><span class="spacer"></span><button class="btn btn-dark btn-sm" onclick="openDPAdd(\'logistics\')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>Add demand line</button></div>';
    }
    var LOG_ROWS=DP['logistics'].rows;
    if(LOG_ROWS&&LOG_ROWS.length){
      h+='<div style="margin-top:0;margin-bottom:8px;display:flex;align-items:center;gap:10px">';
      h+='<span style="font-size:12px;font-weight:700;color:#0f172a;text-transform:uppercase;letter-spacing:.05em">Demand plan</span>';
      h+='<span style="font-size:11.5px;color:var(--g400)">'+LOG_ROWS.length+' line'+(LOG_ROWS.length===1?'':'s')+'</span>';
      h+='</div>';
      var pmGt='1fr 126px 150px 124px 118px 88px 114px';
      h+='<div class="dp-tbl"><div class="dp-head" style="grid-template-columns:'+pmGt+'">';
      h+='<span>Move / event</span><span>Type</span><span>Date &amp; window</span><span>Gate / route</span><span>Source</span><span>Documents</span><span>Status</span></div>';
      LOG_ROWS.forEach(function(r,pmIdx){
        var tone=DP_TONE[r.state]||'neu';
        h+='<div class="dp-row" style="grid-template-columns:'+pmGt+';cursor:pointer" onclick="toggleDPDrill(\'logistics\','+pmIdx+')" title="View full details">';
        h+='<div>'+(r.move||'\u2014')+(r.moveSub?'<div class="sub">'+r.moveSub+'</div>':'')+'</div>';
        h+='<div>'+(r.type||'\u2014')+'</div>';
        h+='<div>'+(r.when||'\u2014')+'</div>';
        h+='<div>'+(r.gate||'\u2014')+'</div>';
        h+='<div>'+(r.src||'\u2014')+'</div>';
        var _lgDocs=r.attachments||[]; h+='<div>'+(_lgDocs.length?'<button class="btn btn-ghost btn-sm" style="font-size:11px;padding:2px 8px" onclick="event.stopPropagation();portalDpDocModal(\'logistics\','+pmIdx+')">'+_lgDocs.length+' doc'+(_lgDocs.length===1?'':'s')+'</button>':'<button class="btn btn-ghost btn-sm" style="font-size:10.5px;padding:2px 7px;color:var(--g400)" onclick="event.stopPropagation();portalDpDocModal(\'logistics\','+pmIdx+')">&#43; Add</button>')+'</div>';
        h+='<div><span class="tag '+tone+'">'+r.state+'</span></div>';
        h+='</div>';
        h+='<div id="dp-drill-logistics-'+pmIdx+'" class="otrack" style="display:none">'+buildDPTrack('logistics',r,pmIdx)+'</div>';
      });
      h+='</div>';
      h+='<div style="margin-top:24px"></div>';
    }
    mount.innerHTML=h;
  }
  function dpGv(id){ var e=document.getElementById(id); return e?(''+e.value):''; }
  function dpCodeOpts(){ var c=['0100-0100-0000-0001 \u00b7 General conditions','0200-0320-0000-0001 \u00b7 Site earthwork','3100-6200-0000-0001 \u00b7 Solar pile','26-540 \u00b7 Module Racking','2600-3300-0000-0001 \u00b7 BESS &amp; Substation','01-540 \u00b7 Temporary Power']; return c.map(function(x){return '<option>'+x+'</option>';}).join(''); }
  var _dp_pri={'Draft':0,'Pending pricing':0,'At-risk':1,'Requested':1,'Submittal':2,'In fabrication':3,'In transit':4,'PO issued':4,'Active':4,'Projected':5,'Delivered':6,'Demobilized':7};
  function renderDP(pk){
    if(pk==='profservices'&&CURRENT==='ns'){ renderProfServicesDP(); return; }
    var cfg=DP[pk], mount=document.getElementById('dp-'+pk); if(!cfg||!mount)return;
    var ns=CURRENT==='ns';
    var _dpId=(_DP_IDS[pk]&&_DP_IDS[pk].hercules)||'';
  var h='<div class="phead"><div><h1>'+cfg.title+(_dpId?' <span style="font-size:12.5px;font-weight:400;color:var(--g400);margin-left:6px">'+_dpId+'</span>':'')+'</h1><div class="meta"><span class="chip">'+svg(cfg.icon)+cfg.chip+'</span><span class="chip ver">'+(ns?'North Star':'V1 \u2014 standard')+'</span></div></div></div>';
    h+='<div class="vitals">';
    cfg.vitals.forEach(function(v){ h+='<div class="vital '+(v.tone||'ok')+'"><div class="vk">'+svg(v.icon||IC.check)+v.label+'</div><div class="vv">'+v.value+'</div><div class="vsub">'+(v.sub||'')+'</div></div>'; });
    h+='</div>';
    if(ns&&cfg.ns){ h+='<div class="ins-strip"><span class="isi"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6 4.5 2.3 7.1L12 16.9 5.3 21l2.3-7.1-6-4.5h7.6z"/></svg></span><div><div class="ist">02S</div><div class="isd">'+cfg.ns+'</div></div></div>'; }
    else if(!ns&&cfg.v1){ h+='<div class="ins-strip"><span class="isi">'+svg('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',0)+'</span><div><div class="ist">Plan summary</div><div class="isd">'+cfg.v1+'</div></div></div>'; }
    var _baselined=PLAN_BASELINES[pk];
    h+='<div class="eq-toolbar"><span class="spacer"></span><button class="btn btn-dark btn-sm" onclick="openDPAdd(\''+pk+'\')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>Add demand line</button><button class="btn btn-red btn-sm" onclick="dpSubmit(\''+pk+'\')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>Submit to 02S</button><button class="btn btn-ghost btn-sm" onclick="openBaselineModal(\''+pk+'\',\''+cfg.title+' demand plan\')" title="'+(_baselined?'Baselined: '+_baselined:'Approve as the version of record for forecasting')+'">'+svg('<path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/>',2)+(_baselined?'Baselined':'Approve baseline')+'</button><button class="btn btn-ghost btn-sm" onclick="go(\'billing\')" title="View orders, actuals, budget &amp; forecast">'+svg('<path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>',2)+' Financials</button></div>';
    h+='<div class="eq-cap">'+svg('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>')+'<span>'+cfg.cap+'</span></div>';
    var gt=cfg.cols.map(function(c){return c.w;}).join(' ');
    h+='<div class="dp-tbl"><div class="dp-head" style="grid-template-columns:'+gt+'">';
    cfg.cols.forEach(function(c){ h+='<span class="'+(c.cls||'')+'">'+c.label+'</span>'; });
    h+='</div>';
    var _srows=cfg.rows.slice().sort(function(a,b){var ap=(_dp_pri[a.state]!=null?_dp_pri[a.state]:3),bp=(_dp_pri[b.state]!=null?_dp_pri[b.state]:3);return ap-bp;});
    _srows.forEach(function(r){
      var origIdx=cfg.rows.indexOf(r);
      h+='<div class="dp-row" style="grid-template-columns:'+gt+';cursor:pointer" onclick="toggleDPDrill(\''+pk+'\','+origIdx+')" title="View full details">';
      cfg.cols.forEach(function(c){
        if(c.key==='__docs'){ var _docs=r.attachments||[]; h+='<div>'+(_docs.length?'<button class="btn btn-ghost btn-sm" style="font-size:11px;padding:2px 8px" onclick="event.stopPropagation();portalDpDocModal(\''+pk+'\','+origIdx+')">'+_docs.length+' doc'+(_docs.length===1?'':'s')+'</button>':'<button class="btn btn-ghost btn-sm" style="font-size:10.5px;padding:2px 7px;color:var(--g400)" onclick="event.stopPropagation();portalDpDocModal(\''+pk+'\','+origIdx+')">&#43; Add</button>')+'</div>'; }
        else if(c.key==='__state'){ var t=DP_TONE[r.state]||'neu'; h+='<div class="'+(c.cls||'')+'"><span class="tag '+t+'">'+r.state+'</span></div>'; }
        else { var main=(r[c.key]!=null&&r[c.key]!=='')?r[c.key]:'\u2014'; var sub=(c.sub&&r[c.sub])?'<div class="sub">'+r[c.sub]+'</div>':''; var cls=(c.cls||'')+((c.flag&&r[c.flag])?' dp-risk':''); h+='<div class="'+cls+'">'+main+sub+'</div>'; }
      });
      h+='</div>';
      h+='<div id="dp-drill-'+pk+'-'+origIdx+'" class="otrack" style="display:none">'+buildDPTrack(pk,r,origIdx)+'</div>';
    });
    h+='</div>';
    if(pk==='prefab'){var _pq=cfg.rows.filter(function(r){return r.cost==='Pending';}).length;if(_pq){h+='<div class="eqf-rate pending" style="margin-top:14px">'+svg('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',2)+'<span><b>'+_pq+' '+(    _pq===1?'assembly':'assemblies')+' being priced by 02S</b> — quotes confirmed before fabrication begins.</span></div>';}}
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
    cfg.rows.push(row); closeModal(); if(pk==='logistics'){renderLogPlan();}else{renderDP(pk);}
    toast('Demand line added \u2014 pricing request routed to 02S admin');
  }
  function dpSubmit(pk){ var cfg=DP[pk],n=0; cfg.rows.forEach(function(r){ if(r.state==='Draft'){ r.state='Requested'; n++; } }); if(!n){ var p=0; cfg.rows.forEach(function(r){if(r.state==='Pending pricing')p++;}); toast(p?(p+' line'+(p===1?'':'s')+' still awaiting 02S pricing \u2014 can\u2019t submit until priced'):'No draft lines to submit'); return; } renderDP(pk); toast(n+' line'+(n===1?'':'s')+' submitted to 02S'); }
function renderProfServicesDP(){
    var pk='profservices'; var cfg=DP[pk]; var mount=document.getElementById('dp-'+pk); if(!cfg||!mount)return;
    var ns=CURRENT==='ns';
    var LSPARK='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6 4.5 2.3 7.1L12 16.9 5.3 21l2.3-7.1-6-4.5h7.6z"/></svg>';
    var _dpId=(_DP_IDS[pk]&&_DP_IDS[pk].hercules)||'';
    var h='<div class="phead"><div><h1>'+cfg.title+(_dpId?' <span style="font-size:12.5px;font-weight:400;color:var(--g400);margin-left:6px">'+_dpId+'</span>':'')+'</h1><div class="meta"><span class="chip">'+svg(cfg.icon)+cfg.chip+'</span><span class="chip ver">'+(ns?'North Star':'V1 — standard')+'</span></div></div></div>';
    h+='<div class="vitals">'; cfg.vitals.forEach(function(v){ h+='<div class="vital '+(v.tone||'ok')+'"><div class="vk">'+svg(v.icon||IC.check)+v.label+'</div><div class="vv">'+v.value+'</div><div class="vsub">'+(v.sub||'')+'</div></div>'; }); h+='</div>';
    if(ns&&cfg.ns){ h+='<div class="ins-strip"><span class="isi">'+LSPARK+'</span><div><div class="ist">02S</div><div class="isd">'+cfg.ns+'</div></div></div>'; }
    else if(!ns&&cfg.v1){ h+='<div class="ins-strip"><span class="isi">'+svg('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',0)+'</span><div><div class="ist">Plan summary</div><div class="isd">'+cfg.v1+'</div></div></div>'; }
    var _baselined=PLAN_BASELINES[pk];
    h+='<div class="eq-toolbar"><span class="spacer"></span><button class="btn btn-dark btn-sm" onclick="openDPAdd(\''+pk+'\')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>Add demand line</button><button class="btn btn-red btn-sm" onclick="dpSubmit(\''+pk+'\')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>Submit to 02S</button><button class="btn btn-ghost btn-sm" onclick="openBaselineModal(\''+pk+'\',\''+cfg.title+' demand plan\')" title="'+(_baselined?'Baselined: '+_baselined:'Approve as the version of record for forecasting')+'">'+svg('<path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/>',2)+(_baselined?'Baselined':'Approve baseline')+'</button><button class="btn btn-ghost btn-sm" onclick="go(\'billing\')" title="View orders, actuals, budget &amp; forecast">'+svg('<path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>',2)+' Financials</button></div>';
    h+='<div class="eq-cap">'+svg('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>')+'<span>'+cfg.cap+'</span></div>';
    if(ns){
      var LGM=['Apr 26','May 26','Jun 26','Jul 26','Aug 26','Sep 26','Oct 26','Nov 26','Dec 26','Jan 27'];
      var N=LGM.length, todayIdx=3;
      var todayPct=((todayIdx+0.8)/N)*100;
      var mh=''; for(var mi=0;mi<N;mi++){ mh+='<div class="gh-m">'+LGM[mi]+'</div>'; }
      var gridBg='repeating-linear-gradient(to right, transparent 0, transparent calc('+(100/N)+'% - 1px), var(--g150) calc('+(100/N)+'% - 1px), var(--g150) calc('+(100/N)+'%))';
      var stateBar={Active:'onrent',Projected:'submitted','Pending pricing':'draft',Draft:'draft',Demobilized:'offrent'};
      h+='<div class="gantt log-gantt"><div class="g-head"><div class="gh-label">Role / firm</div><div class="gh-months">'+mh+'</div></div><div class="g-body">';
      h+='<div class="g-today" style="left:calc(220px + (100% - 220px) * '+(todayPct/100).toFixed(4)+')"><span class="gt-lbl">Today</span></div>';
      cfg.rows.forEach(function(r){
        if(typeof r.sa==='undefined') return;
        var a=r.sa, b=r.ea;
        var left=(a/N)*100, width=((b-a+1)/N)*100;
        var barCls=stateBar[r.state]||'draft';
        h+='<div class="grow" style="min-height:46px">'+'<div class="g-label" style="flex-direction:column;align-items:flex-start;gap:1px;white-space:normal;overflow:visible">'+'<span style="line-height:1.3">'+r.role+'</span>'+'<span style="font-size:10.5px;font-weight:400;color:var(--g400);line-height:1.2">'+r.firm+'</span></div>'
          +'<div class="g-track" style="background-image:'+gridBg+'">'
          +'<div class="g-bar '+barCls+' vw" style="left:'+left.toFixed(3)+'%;width:calc('+width.toFixed(3)+'% - 3px)" title="'+r.window+' · '+r.qty+'">'+r.qty+'</div>'
          +'</div></div>';
      });
      h+='</div>';
      h+='<div class="g-legend"><span class="lg"><span class="gl-sw onrent"></span>Active</span><span class="lg"><span class="gl-sw submitted"></span>Projected</span><span class="lg"><span class="gl-sw draft"></span>Draft / pending</span><span class="lg"><span class="gl-sw offrent"></span>Demobilized</span><span class="lg"><span class="gl-today"></span>Today · Jul 26</span></div>';
      h+='</div>';
    } else {
      var PS_SCOPE_DESCS={'Survey & site monitoring':'Field measurements, geotechnical data, and environmental compliance across active site phases.','Engineering & oversight':'Engineering support, construction management oversight, and VDC coordination.','BESS & commissioning':'Third-party commissioning and technical oversight for BESS, electrical, and MEP systems.'};
      var scopes=[],scopeMap={};
      cfg.rows.forEach(function(r){ var sc=r.scope||'Other'; if(!scopeMap[sc]){scopeMap[sc]=[];scopes.push(sc);} scopeMap[sc].push(r); });
      var gt='1fr 92px 176px 150px 100px 118px';
      h+='<div class="dp-tbl">';
      h+='<div class="dp-head" style="grid-template-columns:'+gt+'"><span>Role</span><span class="c">HC</span><span>Window</span><span>Cost code</span><span class="r">Monthly</span><span>Status</span></div>';
      scopes.forEach(function(sc){
        h+='<div class="dp-row" style="grid-template-columns:'+gt+';background:var(--g50);padding:5px 10px;border-top:1px solid var(--g200)"><div style="grid-column:1/-1"><span class="dp-sec-t" style="font-size:12px">'+sc+'</span>'+(PS_SCOPE_DESCS[sc]?'<div class="sub" style="font-weight:400;margin-top:1px;font-size:11px">'+PS_SCOPE_DESCS[sc]+'</div>':'')+'</div></div>';
        scopeMap[sc].forEach(function(r){
          var t=DP_TONE[r.state]||'neu';
          h+='<div class="dp-row" style="grid-template-columns:'+gt+'"><div>'+r.role+'<div class="sub">'+r.firm+'</div></div><div class="c">'+r.qty+'</div><div>'+r.window+'</div><div class="sub">'+r.code+'</div><div class="r">'+r.cost+'</div><div><span class="tag '+t+'">'+r.state+'</span></div></div>';
        });
      });
      h+='</div>';
    }
    mount.innerHTML=h;
  }
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
    if(screen.indexOf('dp-')===0){ dpActive=screen.slice(3); if(dpActive==='logistics'){renderLogPlan();}else{renderDP(dpActive);} } else dpActive=null;
    if(screen==='order'){ backToCatalog(); renderPills(); renderCatalog(); renderCart(); }
    if(screen==='orders'){ _ordersShowAll=false; renderOrders(); renderOrdInsights(); }
    if(screen==='billing'){ _billsShowAll=false; renderBudget(); renderBills(); renderPending(); renderBillInsights(); renderCostCodes(); }
    if(screen==='equip') eqRefresh();
    if(screen==='profile'){ renderTeam(); renderEscalation(); renderProfileInsights(); renderApprovers(); renderShipTo(); }
    if(screen==='dashboard'){ renderPlanRing(); syncRecert(); renderFleetDemand(); renderAllActivity(); renderGMDashKPI(); renderLookahead(); renderPortalQuotesWidget(); renderNSDashKPIs(); renderTasksDueWidget(); renderGlance(); }
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
  ['gauge','O2S revenue by region','Revenue share earned by each region based on O2S usage. More usage = more revenue share out.','Southern · SW · NorPac · SoPac · Central'],
  ['chart','National BU leverage','How National Business Units use O2S across project types.','Renewables · Water · Mission Critical'],
  ['team','Cost & resource allocation','How shared costs and resources are allocated across jobs.','$42M shared cost allocated across 61 jobs'],
  ['box','Project / opportunity','All costs and revenue land on the project (or opportunity) they belong to.','634 opportunities · 226 with margin plans']
];
function ctAllocPick(el,i){el.parentElement.querySelectorAll('.af-step').forEach(function(s){s.classList.remove('on');});el.classList.add('on');var d=AF_DATA[i],box=document.getElementById('afDetail');if(box)box.innerHTML='<div class="af-d-t">'+ctIc(d[0],14)+' '+d[1]+'</div><div class="af-d-b">'+d[2]+'</div><div class="af-d-m">'+d[3]+'</div>';}

/* Waterfall data */
var WF_DATA=[
  ['O2S Revenue','$1.31B','Total revenue generated through the O2S platform across all pillars and regions.','var(--charcoal)'],
  ['Less: cost of service','−$858M','Direct costs of delivering O2S services — labor, equipment, materials.','var(--g500)'],
  ['Gross margin','$472M','Revenue less cost of service. The gross value generated by O2S.','var(--info)'],
  ['Less: O2S G&A','−$302M','O2S overhead — platform operations, shared services, and enterprise allocation.','var(--g500)'],
  ['Operating profit','$170M','What reaches the bottom line after all costs. Operating margin 7.6%.','var(--success)']
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
    '<div class="opp-flag" style="margin:0 0 14px;font-size:12.5px"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px;flex-shrink:0"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>'
    +'<div><b>O2S serving the owner directly</b> — not routed through the project team or GC. Revenue from these opportunities is <b>not reflected</b> in the standard market split or share reporting.</div></div>'
    +'<table class="mini ct-opp-tbl" style="margin-bottom:14px"><tr><th>Opportunity</th><th>Value</th><th>Status</th></tr>'
    +'<tr><td>Fountain Valley WTP</td><td>$40.0M</td><td><span class="chip red" style="font-size:10px">Active</span></td></tr>'
    +'<tr><td>Mercy General Hospital</td><td>$210.0M</td><td><span class="chip warn" style="font-size:10px">Pending</span></td></tr>'
    +'<tr><td>Route 9 Widening</td><td>$28.5M</td><td><span class="chip warn" style="font-size:10px">Pending</span></td></tr>'
    +'</table>'
    +'<div style="font-size:11.5px;color:var(--g500);margin-bottom:14px">Combined direct revenue: <b style="color:var(--charcoal)">$278.5M</b> &nbsp;·&nbsp; Not in market split &nbsp;·&nbsp; Margin plan required per opportunity</div>'
    +'<div class="modal-foot"><button class="btn btn-ghost" onclick="closeModal()">Close</button><button class="btn btn-dark" onclick="closeModal();ctNav(\'ct-allocation\')">View allocation flow</button></div>'
  );
}

var OPP_DATA={
  joc:{title:'1GPA – 2026 Q1 JOC Sales',oppNum:'OPP-0001234',value:'$1,812,212',market:'Commercial / Building',region:'Southwest · Phoenix',stage:'Won',stageC:'ok',revOpp:'$214.9K',tamPct:'29.4%',salesOpp:'$63.2K',salesMgn:'$15.0K · 9.0%',planStatus:'Active plan',planC:'ok',risks:[],pillars:['Equipment','Logistics','Procurement'],lines:[['Fleet & Personnel Assets','$4.5K','$4.5K','100.0%','$4.5K','60.0%','$2.7K','100.0%'],['Equipment Management Program','$24.5K','$24.5K','100.0%','$24.5K','30.0%','$7.3K','100.0%']]},
  fountain:{title:'Fountain Valley WTP Pretreatment',oppNum:'OPP-0005678',value:'$40,000,000',market:'Public / Infrastructure',region:'Southwest · Colorado Springs',stage:'Bid',stageC:'warn',revOpp:'$4.0M',tamPct:'10.0%',salesOpp:'$3.8M',salesMgn:'$380K · 10.0%',planStatus:'No plan · TAM default 8.0%',planC:'warn',risks:['Project award delayed Q1→Q3 — construction start at risk','Equipment rate exposure on cranes if bid window extends'],pillars:['Equipment','Logistics'],lines:[['Tower Crane (3×)','$2.1M','$2.1M','100.0%','$2.1M','8.2%','$172K','100.0%'],['Telehandler Fleet','$780K','$780K','100.0%','$780K','7.8%','$61K','100.0%'],['Mobilization / Haul','$420K','$420K','100.0%','$420K','8.5%','$36K','80.0%']]},
  mercy:{title:'Mercy General Hospital Expansion',oppNum:'OPP-0003421',value:'$210,000,000',market:'Healthcare / Building',region:'Southwest',stage:'Pursuit',stageC:'',revOpp:'$21.4M',tamPct:'10.2%',salesOpp:'$19.8M',salesMgn:'$1.78M · 9.0% (TAM default)',planStatus:'No plan · TAM default 9.0%',planC:'warn',risks:['Margin plan missing — TAM default applied; custom plan could unlock −$420K savings','VDC/BIM scope undefined — Prof. Services estimate not yet locked','Special inspection scope pending final structural drawings'],pillars:['Prof. Services','Equipment','Prefabrication'],lines:[['VDC / BIM Services','$4.8M','—','—','—','—','—','—'],['Special Inspection','$1.2M','$1.2M','100.0%','$1.2M','9.0%','$108K','85.0%'],['Commissioning Support','$2.1M','$2.1M','100.0%','$2.1M','9.2%','$193K','90.0%']]},
  civic:{title:'City Civic Center — Phase 2',oppNum:'OPP-0009012',value:'$85,000,000',market:'Public / Infrastructure',region:'Mountain',stage:'Bid',stageC:'warn',revOpp:'$8.5M',tamPct:'10.0%',salesOpp:'$8.5M',salesMgn:'$680K · 8.0% (TAM default)',planStatus:'No plan · TAM default 8.0%',planC:'warn',risks:['Margin plan missing — TAM default applied','Subcontractor pricing volatile in Mountain region','Equipment mobilization altitude premium not modeled'],pillars:['Equipment','Logistics','Procurement'],lines:[['Tower Crane (2×)','$2.4M','$2.4M','100.0%','$2.4M','8.0%','$192K','100.0%'],['Telehandlers (4×)','$960K','$960K','100.0%','$960K','7.8%','$75K','100.0%'],['Haul Road & Mobilization','$480K','$480K','100.0%','$480K','8.5%','$41K','80.0%']]},
  baystate:{title:'Baystate Medical Center Modernization',oppNum:'OPP-0007845',value:'$62,000,000',market:'Healthcare / Building',region:'Northeast',stage:'Won',stageC:'ok',revOpp:'$6.2M',tamPct:'10.0%',salesOpp:'$6.2M',salesMgn:'$558K · 9.0%',planStatus:'Stale plan · last updated 6 months ago',planC:'warn',risks:['Margin plan stale — re-price required before execution start','Equipment rates have increased +8% since plan was set','Prefab scope added post-plan — margin not reflected'],pillars:['Equipment','Procurement','Prefabrication'],lines:[['Fleet & Personnel Assets','$3.1M','$3.1M','100.0%','$3.1M','9.0%','$279K','100.0%'],['Equipment Management Program','$2.2M','$2.2M','100.0%','$2.2M','9.1%','$200K','100.0%']]}
};
function ctOppDetail(id){
  var d=OPP_DATA[id]||OPP_DATA['joc'];
  var hd=document.getElementById('oppDetHead');
  if(hd)hd.innerHTML='<h1 style="font-size:22px">'+d.title+'</h1><div class="meta"><span class="chip">Margin plan · opportunity detail</span> &nbsp;<span style="color:var(--g400)">· '+d.oppNum+'</span></div>';
  var wIco='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:12px;height:12px;flex-shrink:0;color:var(--warning)"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>';
  var rHtml=d.risks.length?d.risks.map(function(r){return '<div style="font-size:12px;color:var(--g600);padding:5px 2px;display:flex;align-items:flex-start;gap:8px">'+wIco+r+'</div>';}).join(''):'<div style="font-size:12px;color:var(--g500);padding:6px 2px">No risks captured yet.</div>';
  var pTabs=d.pillars.map(function(p,i){return '<span class="opp-tab'+(i===0?' active':'')+'" onclick="ctPillarTab(this)">'+p+'</span>';}).join('');
  var lRows=d.lines.map(function(l){return '<div class="opp-lrow opp-lrow-cols"><div class="opp-lrow-pri" style="color:var(--info)">'+l[0]+'</div><div>'+l[1]+'</div><div>'+l[2]+'</div><div>'+l[3]+'</div><div>'+l[4]+'</div><div>'+l[5]+'</div><div><b>'+l[6]+'</b></div><div>'+l[7]+'</div></div>';}).join('');
  var sc=d.stageC?'<span class="chip '+d.stageC+'">'+d.stage+'</span>':'<span class="chip">'+d.stage+'</span>';
  var ct=document.getElementById('oppDetContent');
  if(!ct)return;
  ct.innerHTML=
    '<div class="opp-flag"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px;flex-shrink:0"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg><div><b>02S Opportunities — margin plan detail.</b> Opportunity-level margin plan, pillar breakdown, and execution handshake.</div></div>'
    +'<div class="card" style="margin-bottom:14px"><div class="opp-detail-top">'
    +'<div><div class="odt-k">Estimated value</div><div class="odt-v">'+d.value+'</div></div>'
    +'<div><div class="odt-k">Market</div><div class="odt-v">'+d.market+'</div></div>'
    +'<div><div class="odt-k">Region</div><div class="odt-v">'+d.region+'</div></div>'
    +'<div><div class="odt-k">Stage</div><div class="odt-v">'+sc+'</div></div>'
    +'</div></div>'
    +'<div class="opp-metric-row">'
    +'<div class="omr"><div class="omr-k">Revenue opportunity</div><div class="omr-v">'+d.revOpp+'</div></div>'
    +'<div class="omr"><div class="omr-k">TAM capture %</div><div class="omr-v">'+d.tamPct+'</div></div>'
    +'<div class="omr"><div class="omr-k">Sales opportunity</div><div class="omr-v">'+d.salesOpp+'</div></div>'
    +'<div class="omr"><div class="omr-k">Sales margin</div><div class="omr-v">'+d.salesMgn+'</div></div>'
    +'</div>'
    +'<div class="card" style="margin:14px 0"><div class="card-h"><span class="card-title">Margin plan</span><span class="chip '+d.planC+'" style="margin-left:8px;font-size:10.5px">'+d.planStatus+'</span><div class="hright"><button class="btn btn-ghost btn-sm" onclick="toast(\'Edit margin plan (demo)\')">Edit plan</button><button class="btn btn-dark btn-sm" onclick="toast(\'Draft with 02S (demo)\')">'+ctIc('sparkle',13)+' 02S draft</button></div></div>'
    +rHtml+'</div>'
    +'<div class="card"><div class="card-h"><span class="card-title">Pillar breakdown</span><span class="hcount">edit product-line detail in each pillar</span></div>'
    +'<div class="opp-tabs" id="ctPillarTabs">'+pTabs+'</div>'
    +'<div class="opp-pillar-sum"><span style="font-weight:700">'+d.pillars[0]+'</span><span>Revenue opp. <b>'+d.revOpp+'</b></span><span>Sales margin <b>'+d.salesMgn.split('·')[0].trim()+'</b></span><button class="btn btn-ghost btn-sm" style="margin-left:auto" onclick="toast(\'Add product line (demo)\')">'+ctIc('send',13)+' Product lines</button></div>'
    +'<div class="opp-llist"><div class="opp-lrow opp-lrow-head opp-lrow-cols"><div>Product line</div><div>Rev. opp.</div><div>Rev. est.</div><div>Capture %</div><div>Sales opp.</div><div>Profit %</div><div>Sales margin</div><div>Prob. %</div></div>'
    +lRows+'</div></div>';
  ctNav('ct-opp-detail');
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
function runFpaScenario(k,el){
  if(el){el.parentElement.querySelectorAll('button').forEach(function(b){b.classList.remove('on');});el.classList.add('on');}
  var g=document.getElementById('fpaScnGrid');if(g)g.innerHTML=scenarioCards(k);
}

/* Enterprise FP&A feature cards */
function ctFpaFeature(k){
  var M={
    consolidated:{title:'Consolidated plan',sub:'FY 2025 · by 02S pillar',body:'<div class="list"><div class="lrow lhead" style="grid-template-columns:1fr 1fr"><div>Pillar</div><div>Plan</div></div><div class="lrow" style="grid-template-columns:1fr 1fr"><div class="lrow-pri">Equipment</div><div>$524M</div></div><div class="lrow" style="grid-template-columns:1fr 1fr"><div class="lrow-pri">Procurement</div><div>$380M</div></div><div class="lrow" style="grid-template-columns:1fr 1fr"><div class="lrow-pri">Logistics</div><div>$223M</div></div><div class="lrow" style="grid-template-columns:1fr 1fr"><div class="lrow-pri">Prefabrication</div><div>$95M</div></div><div class="lrow" style="grid-template-columns:1fr 1fr"><div class="lrow-pri">Prof. Services</div><div>$88M</div></div></div>'},
    reporting:{title:'Financial reporting',sub:'02S_FY25_Plan_v3 · May 20, 2025',body:'<div class="ct-guardrails">'+
'<div class="grd"><div class="grd-ico ok">'+ctIc('check',16)+'</div><div class="grd-l"><b>Revenue</b> — on plan <span class="grd-val">$4.77B vs $4.71B</span></div><div class="grd-b"><div class="grd-fill ok" style="width:88%"></div></div></div>'+
'<div class="grd"><div class="grd-ico warn">'+ctIc('warning',16)+'</div><div class="grd-l"><b>EBITDA</b> — 40 bps under <span class="grd-val">12.1% vs 12.5%</span></div><div class="grd-b"><div class="grd-fill warn" style="width:62%"></div></div></div>'+
'<div class="grd"><div class="grd-ico warn">'+ctIc('warning',16)+'</div><div class="grd-l"><b>Gross margin</b> — 40 bps under plan <span class="grd-val">8.6% vs 9.0%</span></div><div class="grd-b"><div class="grd-fill warn" style="width:58%"></div></div></div>'+
'<div class="grd"><div class="grd-ico ok">'+ctIc('check',16)+'</div><div class="grd-l"><b>SG&A</b> — under budget <span class="grd-val">$91M vs $98M cap</span></div><div class="grd-b"><div class="grd-fill ok" style="width:75%"></div></div></div>'+
'<div class="grd"><div class="grd-ico warn">'+ctIc('warning',16)+'</div><div class="grd-l"><b>Working capital</b> — above target <span class="grd-val">$284M vs $240M target</span></div><div class="grd-b"><div class="grd-fill warn" style="width:55%"></div></div></div>'+
'<div class="grd"><div class="grd-ico ok">'+ctIc('check',16)+'</div><div class="grd-l"><b>Cash from operations</b> — on track <span class="grd-val">$388M YTD</span></div><div class="grd-b"><div class="grd-fill ok" style="width:82%"></div></div></div>'+
'<div class="grd"><div class="grd-ico ok">'+ctIc('check',16)+'</div><div class="grd-l"><b>CapEx</b> — within plan <span class="grd-val">$47M of $52M approved</span></div><div class="grd-b"><div class="grd-fill ok" style="width:79%"></div></div></div>'+
'<div class="grd"><div class="grd-ico warn">'+ctIc('warning',16)+'</div><div class="grd-l"><b>Equipment utilization impact</b> — re-rent cost overage <span class="grd-val">+$6.2M vs plan</span></div><div class="grd-b"><div class="grd-fill warn" style="width:48%"></div></div></div>'+
'<div class="grd"><div class="grd-ico ok">'+ctIc('check',16)+'</div><div class="grd-l"><b>Subcontractor spend</b> — on plan <span class="grd-val">$1.14B vs $1.18B budget</span></div><div class="grd-b"><div class="grd-fill ok" style="width:85%"></div></div></div>'+
'<div class="grd"><div class="grd-ico ok">'+ctIc('check',16)+'</div><div class="grd-l"><b>DSO</b> — improved vs prior year <span class="grd-val">38 days vs 44 days</span></div><div class="grd-b"><div class="grd-fill ok" style="width:91%"></div></div></div>'+
'<div style="margin-top:10px;padding:8px 10px;background:var(--cream);border-radius:6px;font-size:11px;color:var(--g500)">Model: O2S_FY25_Plan_v3 &nbsp;·&nbsp; Last sync: May 20, 2025 &nbsp;·&nbsp; 2 guardrails require attention</div>'+
'</div>'},
    scenario:{title:'Scenario modeling',sub:'FY 2025',body:
      '<div class="scn-toggle" style="margin-bottom:12px">'
      +'<button class="on" onclick="runFpaScenario(\'base\',this)">Base</button>'
      +'<button onclick="runFpaScenario(\'up\',this)">Upside</button>'
      +'<button onclick="runFpaScenario(\'down\',this)">Downside</button>'
      +'</div>'
      +'<div class="scn-grid" id="fpaScnGrid">'+scenarioCards('base')+'</div>'},
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
