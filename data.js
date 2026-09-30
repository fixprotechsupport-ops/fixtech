window.FIXTECH_DATA = {
  site: {
    brand: 'FixTech',
    tagline: 'iPhone Repair Knowledge',
    footerText: '© 2026 FixTech',
    headerStyle: {brandSize:23, taglineSize:10, navSize:13, searchSize:13},
    footerStyle: {brandSize:16, taglineSize:12, navSize:11, textSize:12},
    theme: {
      fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      bodySize: 15,
      h1Size: 46,
      h2Size: 24,
      buttonSize: 13,
      smallSize: 12,
      primary: '#0b6cff',
      text: '#0f1830',
      pageBackground: '#ffffff',
      cardRadius: 14,
      contentWidth: 1180
    }
  },
  nav: [
    {id:'home', label:'Home', visible:true},
    {id:'panic', label:'Panic Log', visible:true},
    {id:'knowledge', label:'General Knowledge', visible:true},
    {id:'qa', label:'Q&A', visible:true},
    {id:'pos', label:'FixPro POS', visible:true},
    {id:'about', label:'About', visible:true},
    {id:'contact', label:'Contact', visible:true}
  ],
  pages: {
    home: {
      label:'Home',
      sections:[
        {id:'home-hero', zone:'top', type:'hero', title:'iPhone Repair Knowledge, Made Clear.', text:'Practical information for technicians — Panic Logs, General Knowledge, Q&A, and FixPro POS.', buttonText:'Panic Log', buttonRoute:'panic', slideSeconds:5, slides:[
          {id:'hero-slide-panic',title:'Panic Log',text:'Choose an iPhone model, find the panic code, and see what to check first.',buttonText:'Open',buttonRoute:'panic',image:'assets/slide-panic.svg',visible:true},
          {id:'hero-slide-knowledge',title:'General Knowledge',text:'Learn IC, capacitor, resistor, diode, motherboard, short circuit and more.',buttonText:'Start Learning',buttonRoute:'knowledge',image:'assets/slide-knowledge.svg',visible:true},
          {id:'hero-slide-qa',title:'Q&A',text:'Practice real repair questions and build technician knowledge.',buttonText:'Open Q&A',buttonRoute:'qa',image:'assets/slide-qa.svg',visible:true}
        ], visible:true, style:{}},
        {id:'home-section-heading', zone:'main', type:'sectionHeading', title:'Learn • Diagnose • Practice', text:'', visible:true, style:{}},
        {id:'home-card-panic', zone:'main', type:'featureCard', title:'Panic Log', text:'Choose a phone model and see codes directly below.', buttonText:'Explore →', buttonRoute:'panic', visible:true, style:{}},
        {id:'home-card-knowledge', zone:'main', type:'featureCard', title:'General Knowledge', text:'IC, capacitor, resistor, diode, motherboard, short circuit and more.', buttonText:'Explore →', buttonRoute:'knowledge', visible:true, style:{}},
        {id:'home-card-qa', zone:'main', type:'featureCard', title:'Q&A', text:'Practice with simple technician questions.', buttonText:'Explore →', buttonRoute:'qa', visible:true, style:{}},
        {id:'home-pos', zone:'bottom', type:'pos', title:'FixPro POS', text:'Simple repair-shop management for repairs, deposits, accessories, reports and invoices.', buttonText:'Explore FixPro POS', buttonRoute:'pos', visible:true, style:{}}
      ]
    },
    panic: {
      label:'Panic Log',
      sections:[
        {id:'panic-heading', zone:'top', type:'pageHeading', title:'Panic Log', text:'Find iPhone panic codes, likely causes, and what to check first.', visible:true, style:{}},
        {id:'panic-filters', zone:'main', type:'panicFilters', title:'Find a Panic Code', text:'Select a series and model, then search by code.', visible:true, style:{}},
        {id:'panic-results', zone:'main', type:'panicResults', title:'Panic Codes', text:'Choose a code to show its information directly below on this same page.', visible:true, style:{}}
      ]
    },
    knowledge: {
      label:'General Knowledge',
      sections:[
        {id:'knowledge-heading', zone:'top', type:'pageHeading', title:'General Knowledge', text:'Learn basic electronics, components, and important iPhone repair knowledge.', visible:true, style:{}},
        {id:'knowledge-topics', zone:'left', type:'knowledgeTopics', title:'Topics', text:'Choose a topic to learn more.', visible:true, style:{}},
        {id:'knowledge-detail', zone:'main', type:'knowledgeDetail', title:'Topic Information', text:'Simple, easy-to-read repair knowledge.', visible:true, style:{}}
      ]
    },
    qa: {
      label:'Q&A',
      sections:[
        {id:'qa-heading', zone:'top', type:'pageHeading', title:'Q&A', text:'Questions and answers for iPhone repair knowledge.', visible:true, style:{}},
        {id:'qa-quiz', zone:'main', type:'quiz', title:'Q&A Questions', text:'Choose 10, 20, or all questions to practice.', visible:true, style:{}}
      ]
    },
    pos: {
      label:'FixPro POS',
      sections:[
        {id:'pos-heading', zone:'top', type:'pageHeading', title:'FixPro POS', text:'Repair management, deposits, accessories, reports and invoices — in one clean Windows app.', visible:true, style:{}},
        {id:'pos-intro', zone:'main', type:'text', title:'Run Your Repair Shop with FixPro', text:'Keep the whole repair workflow organized — from customer check-in and deposits to accessories, final payment, reports and professional invoices.', promoLabel:'SPECIAL PROMOTION', promoPrice:'$10', promoPeriod:'/ YEAR', promoTitle:'FixPro POS', promoText:'Simple annual access for phone repair shops.', promoFoot:'Windows • Version 0.26.0', promoImage:'', visible:true, style:{}},
        {id:'pos-download', zone:'bottom', type:'posDownload', title:'Get FixPro for Windows', text:'Version 0.26.0 • Windows installer', buttonText:'Download FixPro 0.26.0', buttonUrl:'https://www.mediafire.com/file/qwiiip7p3hryb48/FixPro-Setup-0.26.0.exe/file', visible:true, style:{}},
        {id:'pos-workflow', zone:'main', type:'text', title:'From Check-In to Complete', text:'Check In • Add Repair • Take Deposit • Complete Repair • Print Invoice', visible:true, style:{}},
        {id:'pos-features', zone:'main', type:'text', title:'Everything Your Shop Needs', text:'Repairs • Deposits • Accessories • Reports • Printing • Users & Permissions', visible:true, style:{}},
        {id:'pos-bottom-highlight', zone:'bottom', type:'posHighlight', title:'Built for the Way Repair Shops Work', text:'Keep repairs, payments, accessories and invoices organized in one clean workflow.', items:[
          {title:'Repair Management', text:'Track each job from received to completed.', kind:'repair'},
          {title:'Flexible Payments', text:'Take a deposit or collect the remaining balance later.', kind:'payment'},
          {title:'Professional Invoices', text:'Finish the job with a clear customer-ready invoice.', kind:'invoice'}
        ], visible:true, style:{}}
      ]
    },
    about: {
      label:'About',
      sections:[
        {id:'about-heading', zone:'top', type:'pageHeading', title:'About', text:'About FixTech and the purpose of this repair knowledge website.', visible:true, style:{}},
        {id:'about-main', zone:'main', type:'text', title:'Built for Repair Technicians', text:'FixTech keeps practical repair information clear, organized and easy to find.', visible:true, style:{}}
      ]
    },
    contact: {
      label:'Contact',
      sections:[
        {id:'contact-heading', zone:'top', type:'pageHeading', title:'Contact', text:'Contact information and support.', visible:true, style:{}},
        {id:'contact-main', zone:'main', type:'text', title:'Get in Touch', text:'Add your email, phone number, social links or support information here.', visible:true, style:{}}
      ]
    }
  },
  panicEntries: [
    {
      id:'16pro-prs0', series:'iPhone 16 Series', model:'iPhone 16 Pro', code:'Prs0', problem:'Charging Port / USB',
      symptoms:['Not charging','Intermittent charging','Accessory not recognized','Random restart may occur'],
      panicFull:'Look for “Prs0” or related charging-port / sensor references in panic-full.',
      diagnosis:['Inspect the charging port and flex','Check connector seating and damage','Check for liquid damage','Test with a known-good part','Measure related lines for shorts'],
      solution:['Clean or replace the charging-port flex','Repair damaged connector or related circuit','Retest charging and restart behavior'], visible:true
    },
    {
      id:'16pro-tg0b', series:'iPhone 16 Series', model:'iPhone 16 Pro', code:'TG0B', problem:'Battery / Power Management',
      symptoms:['Unexpected restart','Battery communication issue'],
      panicFull:'Look for “TG0B” and compare with battery / thermal sensor references in panic-full.',
      diagnosis:['Check battery health','Inspect battery connector','Check related flex and sensor line'],
      solution:['Reconnect or test with a known-good battery','Repair connector or related board line if needed'], visible:true
    },
    {
      id:'16pro-tg0v', series:'iPhone 16 Series', model:'iPhone 16 Pro', code:'TG0V', problem:'Battery Voltage',
      symptoms:['Unexpected restart','Power instability'],
      panicFull:'Look for “TG0V” and battery-voltage related messages in panic-full.',
      diagnosis:['Check battery voltage','Inspect connector and BMS communication','Measure for abnormal readings'],
      solution:['Test with a known-good battery','Repair battery connector or related line if required'], visible:true
    },
    {
      id:'16pro-mic1', series:'iPhone 16 Series', model:'iPhone 16 Pro', code:'Mic1', problem:'Charging Port / Mic1',
      symptoms:['Restart issue','Microphone or charging-flex related behavior'],
      panicFull:'Look for “Mic1” and related sensor references in panic-full.',
      diagnosis:['Inspect related flex','Inspect connector','Check liquid or physical damage'],
      solution:['Reseat or replace related flex','Repair related connector or line if needed'], visible:true
    },
    {
      id:'15pro-prs0', series:'iPhone 15 Series', model:'iPhone 15 Pro', code:'Prs0', problem:'Charging Port / USB',
      symptoms:['Not charging','Intermittent charging'],
      panicFull:'Look for “Prs0” or related charging-port sensor references in panic-full.',
      diagnosis:['Inspect charging port','Check flex and connector','Test known-good part'],
      solution:['Clean or replace charging-port flex','Repair related circuit if needed'], visible:true
    }
  ],
  knowledgeTopics: [
    {id:'ic', title:'IC', summary:'Integrated circuits and what they control', sections:[
      {title:'What is an IC?', text:'An integrated circuit combines many electronic components into one small chip.'},
      {title:'What does it do?', text:'Different ICs control power, charging, audio, display, communications and other functions.'},
      {title:'Common problems', text:'Heat, liquid damage, broken solder joints, shorts or internal failure can cause an IC-related fault.'},
      {title:'How to check', text:'Use visual inspection, measurements, known-good parts and board-level diagnosis before replacing an IC.'},
      {title:'iPhone repair examples', text:'Charging IC, audio IC, touch/display related ICs and power-management circuits.'}
    ], visible:true},
    {id:'capacitor', title:'Capacitor', summary:'What capacitors do and how faults appear', sections:[
      {title:'What is a capacitor?', text:'A capacitor stores and releases electrical energy.'},
      {title:'What does it do?', text:'It helps smooth power, filter noise and stabilize circuits.'},
      {title:'Common problems', text:'A shorted or damaged capacitor can pull a power line low or prevent a circuit from working.'},
      {title:'How to check', text:'Check resistance or diode-mode behavior and compare with a known-good board when appropriate.'}
    ], visible:true},
    {id:'resistor', title:'Resistor', summary:'Resistance, current limiting and testing', sections:[{title:'What is a resistor?',text:'A resistor limits current or creates voltage relationships in a circuit.'},{title:'How to check',text:'Measure resistance with power removed and compare with the expected value or schematic.'}], visible:true},
    {id:'diode', title:'Diode', summary:'One-way current flow and diode-mode basics', sections:[{title:'What is a diode?',text:'A diode normally allows current to flow more easily in one direction than the other.'},{title:'How to test',text:'Use diode mode and compare readings in the correct direction.'}], visible:true},
    {id:'coil', title:'Coil / Inductor', summary:'Energy storage and filter circuits', sections:[{title:'What is a coil?',text:'An inductor stores energy in a magnetic field and is common in power-conversion circuits.'}], visible:true},
    {id:'connector', title:'Connector', summary:'Board and flex connectors', sections:[{title:'Connector basics',text:'Connectors join flex cables, subassemblies and boards.'},{title:'What to inspect',text:'Look for bent pins, corrosion, broken plastic, lifted pads and poor seating.'}], visible:true},
    {id:'battery', title:'Battery / BMS', summary:'Battery communication and protection', sections:[{title:'Battery basics',text:'The battery supplies power while the BMS monitors and protects the pack.'}], visible:true},
    {id:'motherboard', title:'Motherboard', summary:'Board layout and main functional areas', sections:[{title:'Board basics',text:'The motherboard contains the main logic, power and communication circuits.'}], visible:true},
    {id:'short', title:'Short Circuit', summary:'How shorts happen and basic diagnosis', sections:[{title:'What is a short?',text:'A short is an unintended low-resistance path that can pull down a power rail.'}], visible:true},
    {id:'voltage', title:'Voltage & Current', summary:'Core electrical measurements', sections:[{title:'Voltage',text:'Voltage is electrical potential difference.'},{title:'Current',text:'Current is the flow of electric charge.'}], visible:true}
  ],
  questions: [
    {"id":"basic1","questionType":"truefalse","question":"រូបភាពខាងលើនេះគឺជា DFU Mode","image":"assets/basic-q1.png","imageSize":"medium","imageCaption":"","options":["True","False"],"answer":1,"explanation":"","visible":true,"source":"QA-Basic-Test-Correction.pdf"},
    {"id":"basic2","questionType":"truefalse","question":"DFU Mode និង Recovery Mode គឺដូចគ្នា","options":["True","False"],"answer":1,"explanation":"","visible":true,"source":"QA-Basic-Test-Correction.pdf"},
    {"id":"basic3","questionType":"truefalse","question":"យើងអាច Restore iOS គ្រប់ Version ដែលយើងចង់ធ្វើការ Restore","options":["True","False"],"answer":1,"explanation":"","visible":true,"source":"QA-Basic-Test-Correction.pdf"},
    {"id":"basic4","questionType":"multiple","shuffleAnswers":false,"question":"នៅពេលដែលខ្ញុំនិយាយថា Flash iPhone iOS គឺមានន័យថា","options":["Restore the iPhone data","Restore the iPhone firmware","Update the iPhone","NAND Programming"],"answer":1,"explanation":"","visible":true,"source":"QA-Basic-Test-Correction.pdf"},
    {"id":"basic5","questionType":"truefalse","question":"ប្រសិនបើយើងធ្វើការ Restore ជាមួយនឹង iTunes ហើយបរាជ័យ យើងមិនត្រូវការប្រើកម្មវិធីផ្សេងទៀតដូចជា 3Utools ឬ i4 ក្នុងការ Restore ម្តងទៀតទេ។","options":["True","False"],"answer":1,"explanation":"","visible":true,"source":"QA-Basic-Test-Correction.pdf"},
    {"id":"basic6","questionType":"truefalse","question":"Power Button flex ឬ proximity sensor និង ear speaker flex អាចបង្កឲ្យមានបញ្ហា Restore បរាជ័យបាន។","options":["True","False"],"answer":0,"explanation":"","visible":true,"source":"QA-Basic-Test-Correction.pdf"},
    {"id":"basic7","questionType":"truefalse","question":"ម៉ាស៊ីនមាន CPU ប៉ុន្តែមិនមាន RAM ទេ វានៅតែអាចចូល DFU Mode បាន។","options":["True","False"],"answer":0,"explanation":"","visible":true,"source":"QA-Basic-Test-Correction.pdf"},
    {"id":"basic8","questionType":"truefalse","question":"ការ Restore អាចនឹងបរាជ័យ ប្រសិនបើយើង Restore តែម៉ាស៊ីនទទេ ដោយមិនមានថ្ម ឬ DC Power Supply។","options":["True","False"],"answer":0,"explanation":"","visible":true,"source":"QA-Basic-Test-Correction.pdf"},
    {"id":"basic9","questionType":"multiselect","shuffleAnswers":false,"question":"នៅពេលដែលយើងប្រើកម្មវិធី 3Utools ដើម្បី Restore iOS ប៉ុន្តែវាគាំងត្រឹម 11% តើអ្នកគួរធ្វើអ្វីមុនគេ? (ចម្លើយមានច្រើន)","options":["ពិនិត្យមើលជើងថ្ម (Voltage)","ដូរ NAND ហើយធ្វើការ Restore ម្តងទៀត","Reball the CPU និង RAM","Restore ម្តងទៀតជាមួយនឹង iTunes","ពិនិត្យមើលខ្សែ USB និងសាកល្បងលើទូរស័ព្ទផ្សេង","Reball the NAND","បើកតែម៉ាស៊ីន ដោយមិនភ្ជាប់ជាមួយខ្សែផ្សេងៗ លើកលែងតែខ្សែ Charging","ប្តូរ Computer ឬ Restart"],"answers":[0,3,4,6,7],"explanation":"","visible":true,"source":"QA-Basic-Test-Correction.pdf"},
    {"id":"basic10","questionType":"truefalse","question":"Smartphone គឺប្រើប្រាស់ភ្លើង (Voltage) ប្រភេទ AC។","options":["True","False"],"answer":0,"explanation":"","visible":true,"source":"QA-Basic-Test-Correction.pdf"},
    {"id":"basic11","questionType":"multiple","shuffleAnswers":false,"question":"តើទូរស័ព្ទត្រូវការភ្លើងប៉ុន្មានវ៉ុល (V) ទើបអាចបើកបាន នៅពេលភ្ជាប់ជាមួយ Power Supply?","options":["5V","2.5V","3.5V – 4.3V"],"answer":2,"explanation":"","visible":true,"source":"QA-Basic-Test-Correction.pdf"},
    {"id":"basic12","questionType":"truefalse","question":"កង់ដង់ (C) មានតួនាទីសម្រាប់ស្តុក និងផ្ទេរចរន្ត។","options":["True","False"],"answer":0,"explanation":"","visible":true,"source":"QA-Basic-Test-Correction.pdf"},
    {"id":"basic13","questionType":"multiple","shuffleAnswers":false,"question":"តើមួយណាជានិមិត្តសញ្ញាកង់ដង់ (C) នៅលើ Schematic?","image":"assets/basic-q13.png","imageSize":"large","imageCaption":"","options":["FL4305","C4305","R4308"],"answer":1,"explanation":"","visible":true,"source":"QA-Basic-Test-Correction.pdf"},
    {"id":"basic14","questionType":"truefalse","question":"រេស៊ីស្តង់ (R) មានតួនាទីសម្រាប់ទប់ និងចម្លងចរន្ត។","options":["True","False"],"answer":0,"explanation":"","visible":true,"source":"QA-Basic-Test-Correction.pdf"},
    {"id":"basic15","questionType":"multiple","shuffleAnswers":false,"question":"តើ Filter (FL) មានតួនាទីធ្វើអ្វីខ្លះ?","options":["ទប់ចរន្ត","ស្តុកចរន្ត","បំលែងចរន្ត","ចម្លងចរន្ត"],"answer":3,"explanation":"","visible":true,"source":"QA-Basic-Test-Correction.pdf"},
    {"id":"basic16","questionType":"truefalse","question":"ម៉ូប៊ីន L (Coil) មានតួនាទីសម្រាប់ចម្លង និងពង្រីកបង្រួមចរន្ត។","options":["True","False"],"answer":0,"explanation":"","visible":true,"source":"QA-Basic-Test-Correction.pdf"},
    {"id":"basic17","questionType":"truefalse","question":"ឌីយ៉ូត D (Diode) មានតួនាទីសម្រាប់ទប់ និងបំលែងចរន្ត។","options":["True","False"],"answer":0,"explanation":"","visible":true,"source":"QA-Basic-Test-Correction.pdf"},
    {"id":"basic18","questionType":"truefalse","question":"FL ពេលខូច ឬដាច់ យើងអាចធ្វើការតភ្ជាប់ជើងគ្នាបាន។","options":["True","False"],"answer":0,"explanation":"","visible":true,"source":"QA-Basic-Test-Correction.pdf"},
    {"id":"basic19","questionType":"multiple","shuffleAnswers":false,"question":"តើមួយណាជានិមិត្តសញ្ញារបស់ Filter (FL) នៅលើ Schematic?","image":"assets/basic-q19.png","imageSize":"large","imageCaption":"","options":["Coil / FL symbol","Capacitor symbol","Resistor symbol"],"answer":0,"explanation":"","visible":true,"source":"QA-Basic-Test-Correction.pdf"},
    {"id":"basic20","questionType":"multiselect","shuffleAnswers":false,"question":"ម៉ាស៊ីន iPhone មួយគ្រឿងរំរើ? តើអ្នកគួរធ្វើអ្វីមុនគេ? (ចម្លើយមានច្រើន)","options":["ពិនិត្យមើលគូទសាក (Charging port)","ពិនិត្យមើលថ្ម","ពិនិត្យមើលអេក្រង់","ពិនិត្យមើលប្រព័ន្ធភ្លើង","លើក ICs","ដូរ NAND","ដូរ IC សាក"],"answers":[0,1,2,3],"explanation":"","visible":true,"source":"QA-Basic-Test-Correction.pdf"},
    {"id":"basic21","questionType":"truefalse","question":"គ្រប់កង់ដង់ (C) ទាំងអស់ត្រូវតែមានជើងម៉ាស (GND)។","options":["True","False"],"answer":1,"explanation":"","visible":true,"source":"QA-Basic-Test-Correction.pdf"},
    {"id":"basic22","questionType":"multiple","shuffleAnswers":false,"question":"កង់ដង់ (C) ដែលមានភ្លើងទាំងសងខាងហៅថា","options":["កង់ដង់ (C)","រេស៊ីស្តង់ (R)","កង់ដង់ Coupling"],"answer":2,"explanation":"","visible":true,"source":"QA-Basic-Test-Correction.pdf"},
    {"id":"basic23","questionType":"multiple","shuffleAnswers":false,"question":"កង់ដង់ Coupling ដែលខូច អាចឆក់រំលងបានដែរឬទេ?","options":["បាន","មិនបាន"],"answer":1,"explanation":"","visible":true,"source":"QA-Basic-Test-Correction.pdf"},
    {"id":"basic24","questionType":"truefalse","question":"គ្រប់ IC ទាំងអស់ត្រូវតែមានជើងម៉ាស (GND)។","options":["True","False"],"answer":0,"explanation":"","visible":true,"source":"QA-Basic-Test-Correction.pdf"},
    {"id":"basic25","questionType":"multiple","shuffleAnswers":false,"question":"មាន IC មួយគ្រាប់មានជើងម៉ាស (GND) ពីរ ប៉ុន្តែត្រូវបានដាច់ តើគួរត្រូវតឡើងវិញដែរឬទេ?","options":["មិនចាំបាច់","ត្រូវតែតឡើងវិញ"],"answer":1,"explanation":"","visible":true,"source":"QA-Basic-Test-Correction.pdf"},
    {"id":"basic26","questionType":"multiple","shuffleAnswers":false,"question":"តើជើងម៉ាស (GND) សំខាន់ដែរឬទេ?","options":["មិនសំខាន់","សំខាន់"],"answer":1,"explanation":"","visible":true,"source":"QA-Basic-Test-Correction.pdf"},
    {"id":"basic27","questionType":"multiselect","shuffleAnswers":false,"question":"ម៉ាស៊ីនភ្ជាប់ជាមួយ Power Supply ធម្មតា ប៉ុន្តែពេលចុចបើក AMP ឡើងខុសប្រក្រតី ឬគាំង តើមូលហេតុអ្វីខ្លះ?","options":["ខូចថ្ម","ឆ្លងភ្លើងថ្ម","ឆ្លង PP_VCC_MAIN","ឆ្លង NAND","ឆ្លង Bucks","ឆ្លង LDOs","ឆ្លង PP_VDD_BOOST"],"answers":[3,4,5],"explanation":"","visible":true,"source":"QA-Basic-Test-Correction.pdf"},
    {"id":"basic28","questionType":"multiple","shuffleAnswers":false,"question":"ម៉ាស៊ីនដែលឆ្លងភ្លើង PP_VCC_MAIN បើកចេញដែរឬទេ?","options":["បើកចេញ","បើកមិនចេញ"],"answer":1,"explanation":"","visible":true,"source":"QA-Basic-Test-Correction.pdf"},
    {"id":"basic29","questionType":"multiple","shuffleAnswers":false,"question":"ម៉ាស៊ីនដែលឆ្លងភ្លើង NAND អាចបើកចេញដែរឬទេ?","options":["បើកចេញ","បើកមិនចេញ"],"answer":1,"explanation":"","visible":true,"source":"QA-Basic-Test-Correction.pdf"},
    {"id":"basic30","questionType":"multiple","shuffleAnswers":false,"question":"បើភ្លើង Bucks នៅ line ណាមួយឆ្លង តើម៉ាស៊ីនបើកចេញដែរឬទេ?","options":["បើកចេញ","បើកមិនចេញ"],"answer":1,"explanation":"","visible":true,"source":"QA-Basic-Test-Correction.pdf"},
    {"id":"basic31","questionType":"multiple","shuffleAnswers":false,"question":"ម៉ាស៊ីនឆ្លងភ្លើង PP_VDD_BOOST បើកចេញដែរឬទេ?","options":["បើកចេញ","បើកមិនចេញ"],"answer":1,"explanation":"","visible":true,"source":"QA-Basic-Test-Correction.pdf"},
    {"id":"basic32","questionType":"multiselect","shuffleAnswers":false,"question":"តើទូរស័ព្ទ Model ណាខ្លះ ពេលដូរថ្មថ្មី (ថ្មអន) ហើយចេញ Message (Notification)?","options":["iPhone 6 – 7 Plus","iPhone X","iPhone XR","iPhone 8/8 Plus","iPhone Xs/Xs Max","iPhone 11 and up"],"answers":[2,4,5],"explanation":"","visible":true,"source":"QA-Basic-Test-Correction.pdf"},
    {"id":"basic33","questionType":"multiple","shuffleAnswers":false,"question":"iPhone មួយគ្រឿងពេលដោះថ្មចេញ ហើយសាកថ្មពេលនោះទូរស័ព្ទបើកចេញតែ Apple Logo។ ពេលដែលយើងសាកទុកយូរ អាចមានបញ្ហាដល់ម៉ាស៊ីនដែរឬទេ?","options":["មានបញ្ហា","មិនមានបញ្ហា"],"answer":0,"explanation":"","visible":true,"source":"QA-Basic-Test-Correction.pdf"},
    {"id":"basic34","questionType":"truefalse","question":"ម៉ាស៊ីន iPhone ត្រូវតែមានភ្លើង 1.8V នៅលើ Power Button បើទោះបីជាម៉ាស៊ីនមិនបានបើកក៏ដោយ។","options":["True","False"],"answer":0,"explanation":"","visible":true,"source":"QA-Basic-Test-Correction.pdf"},
    {"id":"basic35","questionType":"truefalse","question":"Power button នៅតែដំណើរការធម្មតា បើទោះបីជាភ្លើង 1.4V ពេលយើងវាស់។","options":["True","False"],"answer":0,"explanation":"","visible":true,"source":"QA-Basic-Test-Correction.pdf"},
    {"id":"basic36","questionType":"multiple","shuffleAnswers":false,"question":"ទូរស័ព្ទអត់មានភ្លើង 1.8V នៅលើ Power button តើម៉ាស៊ីននៅតែអាចបើកចេញដែរឬទេ?","options":["បើកអត់ចេញ","បើកចេញ"],"answer":0,"explanation":"","visible":true,"source":"QA-Basic-Test-Correction.pdf"},
    {"id":"basic37","questionType":"multiselect","shuffleAnswers":false,"question":"ម៉ាស៊ីនឆ្លងបើកអត់ចេញ បណ្ដាលមកពីអ្វីខ្លះ? (ចម្លើយមានច្រើន)","options":["ឆ្លងភ្លើងថ្ម (PP_BATT_VCC)","ឆ្លងភ្លើងដើមស្លូវ (PP_VDD_MAIN)","ឆ្លងភ្លើងចុងស្លូវ (LDOs)","ឆ្លងភ្លើង Bucks","ឆ្លងភ្លើង NAND"],"answers":[0,1,3,4],"explanation":"","visible":true,"source":"QA-Basic-Test-Correction.pdf"},
    {"id":"basic38","questionType":"multiselect","shuffleAnswers":false,"question":"តើអាការៈយ៉ាងម៉េចខ្លះ ដែលគិតថាម៉ាស៊ីនឆ្លង បើកអត់ចេញ?","options":["បើកអត់ចេញ","អត់សាកថ្ម","ម៉ាស៊ីនស៊ីថ្មខុសប្រក្រតី","ខូចថ្ម","កឹបខ្សែ Power Supply ភ្លើងឡើងកប់","ចុចបើកម៉ាស៊ីន Amp ឡើងខ្ពស់ ឬគាំង"],"answers":[4,5],"explanation":"","visible":true,"source":"QA-Basic-Test-Correction.pdf"},
    {"id":"basic39","questionType":"multiselect","shuffleAnswers":false,"question":"ម៉ាស៊ីន iPhone ស៊ីថ្មខុសប្រក្រតី អាចបណ្ដាលមកពីអ្វីខ្លះ? (ចម្លើយមានច្រើន)","options":["ឆ្លងភ្លើង (LDOs)","បញ្ហាថ្មខ្សោយគុណភាព","ឆ្លង NAND","ឆ្លង IC WIFI","ឆ្លងក្រោមបាត IC","ឆ្លងភ្លើង 1.8V","ឆ្លងលើគ្រឿងបន្លាស់"],"answers":[0,1,3,4,6],"explanation":"","visible":true,"source":"QA-Basic-Test-Correction.pdf"},
    {"id":"basic40","questionType":"truefalse","question":"iPhone 6s/6sP/7/7P NAND តើអាចដាក់ត្រូវគ្នាដែរឬទេ?","options":["True","False"],"answer":0,"explanation":"","visible":true,"source":"QA-Basic-Test-Correction.pdf"},
    {"id":"basic41","questionType":"truefalse","question":"iPhone 8/8P/X/XS/XS Max NAND តើដាក់ត្រូវគ្នាដែរឬទេ?","options":["True","False"],"answer":0,"explanation":"","visible":true,"source":"QA-Basic-Test-Correction.pdf"},
    {"id":"basic42","questionType":"truefalse","question":"iPhone 8/8P/X/XR/XS/XS MAX/11/11Pro/11ProMax — Hydra USB IC តើដាក់ត្រូវគ្នាដែរឬទេ?","options":["True","False"],"answer":0,"explanation":"","visible":true,"source":"QA-Basic-Test-Correction.pdf"},
    {"id":"basic43","questionType":"multiple","shuffleAnswers":false,"question":"តើ IC ភាគច្រើនមានភ្លើង Line ចូលដែរឬអត់?","options":["មាន","មិនមាន"],"answer":0,"explanation":"","visible":true,"source":"QA-Basic-Test-Correction.pdf"},
    {"id":"basic44","questionType":"multiple","shuffleAnswers":false,"question":"ម៉ាស៊ីនដែលឆ្លង Line PP_BATT_VCC (ជើងថ្ម) និងឆ្លង Line PP_VDD_BOOST តើម៉ាស៊ីនអាចដំណើរការបានទៀតដែរឬទេ?","options":["មិនបាន","បាន"],"answer":0,"explanation":"","visible":true,"source":"QA-Basic-Test-Correction.pdf"},
    {id:'q1', questionType:'multiple', shuffleAnswers:true, question:'What is the main job of a capacitor in a circuit?', image:'assets/qa-capacitor.svg', imageSize:'medium', imageCaption:'Capacitor example', options:['Store and release electrical charge','Create software data','Increase screen brightness only','Identify the phone model'], answer:0, explanation:'A capacitor stores electrical energy and can help smooth or filter a circuit.', visible:true},
    {id:'q2', questionType:'multiple', shuffleAnswers:true, question:'Which tool is commonly used to check voltage and resistance?', options:['Heat gun','Multimeter','Screwdriver','Ultrasonic cleaner'], answer:1, explanation:'A multimeter is commonly used to measure voltage and resistance.', visible:true},
    {id:'q3', questionType:'multiple', shuffleAnswers:true, question:'What is a common purpose of a resistor in a circuit?', options:['Limit current','Store photos','Increase storage capacity','Create Wi-Fi signals'], answer:0, explanation:'A resistor is commonly used to limit current or create a controlled voltage relationship.', visible:true},
    {id:'q4', questionType:'multiple', shuffleAnswers:true, question:'What does a diode normally do?', options:['Allows current more easily in one direction','Stores battery health data','Changes the phone model','Creates mechanical movement'], answer:0, explanation:'A diode normally conducts more easily in one direction than the other.', visible:true},
    {id:'q5', questionType:'truefalse', question:'A short circuit is an unintended low-resistance path in a circuit.', options:['True','False'], answer:0, explanation:'True. A short circuit creates an unintended low-resistance path and can cause excessive current.', visible:true},
    {id:'q6', questionType:'multiple', shuffleAnswers:true, question:'What does an inductor or coil store energy in?', options:['A magnetic field','A photo library','A speaker mesh','A SIM card'], answer:0, explanation:'An inductor stores energy in a magnetic field.', visible:true},
    {id:'q7', questionType:'multiple', shuffleAnswers:true, question:'What should you inspect first on a damaged connector?', options:['Bent pins, corrosion, or poor seating','Wallpaper settings','App icons','Screen brightness'], answer:0, explanation:'Physical damage, corrosion, and poor seating are common connector problems.', visible:true},
    {id:'q8', questionType:'multiple', shuffleAnswers:true, question:'What is the main role of a battery management system (BMS)?', options:['Monitor and protect battery operation','Control the rear camera focus','Store customer contacts','Manage speaker volume only'], answer:0, explanation:'The BMS monitors and protects important battery functions such as voltage, current, and safety conditions.', visible:true},
    {id:'q9', questionType:'multiple', shuffleAnswers:true, question:'What is board view commonly used for during repair?', options:['Locate components and connections on the board','Install iOS updates','Clean the display glass','Measure screw length'], answer:0, explanation:'Board view helps technicians locate components, connectors, and circuit relationships.', visible:true},
    {id:'q10', questionType:'multiple', shuffleAnswers:true, question:'Why is diode mode useful in board diagnosis?', options:['It helps compare junction or line readings','It installs drivers','It charges the battery faster','It identifies the customer'], answer:0, explanation:'Diode mode is commonly used to compare electrical readings on lines and semiconductor junctions.', visible:true},
    {id:'q11', questionType:'multiple', shuffleAnswers:true, question:'What can a shorted capacitor do to a power line?', options:['Pull the line low and cause high current','Increase storage space','Improve camera quality','Change the serial number'], answer:0, explanation:'A shorted capacitor can pull a power rail low and may cause excessive current draw.', visible:true},
    {id:'q12', questionType:'multiple', shuffleAnswers:true, question:'When liquid damage is suspected, what is an important first action?', options:['Disconnect power and inspect for corrosion','Increase screen brightness','Update every app','Keep charging the phone'], answer:0, explanation:'Removing power and inspecting for corrosion helps reduce the risk of further electrical damage.', visible:true},
    {id:'q13', questionType:'multiple', shuffleAnswers:true, question:'Why do technicians test with a known-good part?', options:['To help isolate whether the original part is faulty','To increase phone storage','To unlock the device','To change the IMEI'], answer:0, explanation:'A known-good part can help confirm whether a suspected component or assembly is causing the fault.', visible:true},
    {id:'q14', questionType:'multiple', shuffleAnswers:true, question:'For a charging problem, what is a sensible first hardware check?', options:['Inspect the charging port, flex, and connector','Replace the rear camera immediately','Erase all data first','Change the wallpaper'], answer:0, explanation:'The charging port, flex cable, and connector are practical first checks for many charging faults.', visible:true},
    {id:'q15', questionType:'multiple', shuffleAnswers:true, question:'What can unusually high current draw suggest?', options:['A short or overloaded circuit','A larger storage capacity','A stronger Wi-Fi password','A new iOS version'], answer:0, explanation:'Unexpectedly high current draw can indicate a short circuit or another overloaded power condition.', visible:true},
    {id:'q16', questionType:'truefalse', question:'Resistance measurements should always be taken with power applied to the board.', options:['True','False'], answer:1, explanation:'False. Resistance measurements are generally made with power removed unless a specific diagnostic procedure says otherwise.', visible:true},
    {id:'q17', questionType:'multiple', shuffleAnswers:true, question:'What can a damaged flex cable cause?', options:['Intermittent or missing hardware functions','More cloud storage','Faster software updates','A different phone color'], answer:0, explanation:'A damaged flex cable can interrupt signals or power and cause intermittent or failed functions.', visible:true},
    {id:'q18', questionType:'multiple', shuffleAnswers:true, question:'What is one purpose of a connector on an iPhone board?', options:['Join a flex cable or assembly to another circuit','Generate an Apple ID','Store photos permanently','Increase speaker size'], answer:0, explanation:'Connectors provide electrical and mechanical connections between boards, flexes, and assemblies.', visible:true},
    {id:'q19', questionType:'multiple', shuffleAnswers:true, question:'What can a panic-full log help a technician identify?', options:['A likely subsystem or sensor involved in a restart','The customer password','The phone case color','The retail price'], answer:0, explanation:'Panic logs can provide clues about the subsystem, sensor, or communication path related to a restart.', visible:true},
    {id:'q20', questionType:'truefalse', question:'A panic code always guarantees that one specific part has failed.', options:['True','False'], answer:1, explanation:'False. A panic code is a diagnostic clue. The exact failed part still needs inspection and testing.', visible:true}
  ]
};
