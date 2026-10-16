export const KEY='submission-desk.v1';
export const uid=()=>crypto.randomUUID();
export function safeURL(s){if(!s)return true;try{return ['http:','https:'].includes(new URL(s).protocol);}catch{return false;}}
export function deadlineISO(local,zone){
 if(!/^\d{4}-\d\d-\d\dT\d\d:\d\d$/.test(local))throw Error('Enter a complete deadline.');
 let fmt;try{fmt=new Intl.DateTimeFormat('sv-SE',{timeZone:zone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'});}catch{throw Error('Use a valid IANA time zone, such as America/New_York.');}
 const target=Date.parse(local+'Z');if(!Number.isFinite(target))throw Error('Invalid deadline.');
 const show=t=>fmt.format(new Date(t)).replace(' ','T');
 const offsets=new Set([-36,0,36].map(h=>{const t=target+h*3600000;return Date.parse(show(t)+'Z')-t;}));
 const matches=[...offsets].map(o=>target-o).filter(t=>show(t)===local);
 if(matches.length!==1)throw Error(matches.length?'This time occurs twice during a clock change. Use UTC for an unambiguous deadline.':'This local time does not exist. Check the date and daylight saving time.');
 return new Date(matches[0]).toISOString();
}
export function emptyProject(){return {id:uid(),name:'Untitled entry',event:'New hackathon',summary:'',deadlineLocal:'2026-11-20T17:00',timeZone:'America/New_York',repo:'',video:'',copy:'',requirements:[],evidence:[],submission:null};}
export function demo(){const p=emptyProject();Object.assign(p,{name:'Gapwise',event:'Fintech for Good • Demo hackathon',summary:'Turn a financial goal into a weekly plan. Gapwise helps people build a $1,000 emergency fund by comparing savings milestones with their available cash flow.',repo:'https://example.com/gapwise/repository',copy:'Gapwise helps people work toward a financial goal: building a $1,000 emergency fund. Enter a target, current savings and a weekly contribution to explore a milestone plan alongside essential expenses. The synthetic example starts at $250 and saves $50 per week, reaching the goal in 15 weeks. Built for the fictional Fintech for Good hackathon. Demo only; no bank connection or financial advice.',requirements:[{id:uid(),title:'Public repository with setup instructions',source:'https://example.com/hackathon/rules#repository',done:true},{id:uid(),title:'Two-minute walkthrough video',source:'https://example.com/hackathon/rules#video',done:false},{id:uid(),title:'Explain the financial goal and savings milestones',source:'https://example.com/hackathon/rules#impact',done:true}],evidence:[{id:uid(),title:'Savings milestone scenario checked',note:'Synthetic example: $1,000 emergency-fund goal, $250 already saved, $50 weekly contribution. The remaining $750 takes 15 weeks. No real financial information.',requirementId:'',file:null}]});const q=emptyProject();Object.assign(q,{name:'Raincheck',event:'Civic Weekend • Demo hackathon',summary:'A second synthetic entry to demonstrate a multi-project desk.',deadlineLocal:'2026-12-05T12:00',timeZone:'Europe/London'});return {version:1,projects:[p,q]};}
export function unfinished(p){return [...p.requirements.filter(r=>!r.done).map(r=>r.title),...(!p.requirements.length?['Add and review event requirements']:[]),...(!p.repo?['Add repository link']:[]),...(!p.video?['Add video link']:[]),...(!p.copy.trim()?['Write submission copy']:[])];}
export function validate(data){
 const fail=()=>{throw Error('Invalid backup. Expected a version 1 Submission Desk export with valid project fields.');};
 const str=(s,n=100000)=>typeof s==='string'&&s.length<=n;
 if(!data||data.version!==1||!Array.isArray(data.projects)||!data.projects.length||data.projects.length>100)fail();
 const validId=s=>typeof s==='string'&&/^[A-Za-z0-9_-]{1,100}$/.test(s);
 const ids=new Set();
 for(const p of data.projects){if(!p||!validId(p.id)||ids.has(p.id))fail();ids.add(p.id);
 for(const k of ['name','event','summary','deadlineLocal','timeZone','repo','video','copy'])if(!str(p[k]))fail();
 if(!p.name.trim()||!safeURL(p.repo)||!safeURL(p.video))fail();deadlineISO(p.deadlineLocal,p.timeZone);
 if(!Array.isArray(p.requirements)||p.requirements.length>200||!Array.isArray(p.evidence)||p.evidence.length>200)fail();
 const rids=new Set();for(const r of p.requirements){if(!r||!validId(r.id)||rids.has(r.id)||!str(r.title)||!r.title.trim()||!str(r.source)||!safeURL(r.source)||typeof r.done!=='boolean')fail();rids.add(r.id);}
 const eids=new Set();for(const e of p.evidence){if(!e||!validId(e.id)||eids.has(e.id)||!str(e.title)||!str(e.note)||!str(e.requirementId)||e.requirementId&&!rids.has(e.requirementId))fail();eids.add(e.id);if(e.file!==null){if(!e.file||!str(e.file.name,255)||!str(e.file.data,1400000)||!/^data:application\/octet-stream;base64,[A-Za-z0-9+/]*={0,2}$/.test(e.file.data))fail();}}
 if(p.artifactReviews!==undefined){
  if(!p.artifactReviews||typeof p.artifactReviews!=='object'||Array.isArray(p.artifactReviews))fail();
  for(const [key,r] of Object.entries(p.artifactReviews))if(!['repo','video'].includes(key)||!r||!str(r.url)||!r.url||!safeURL(r.url)||placeholderURL(r.url)||!str(r.note,2000)||!r.note.trim()||!str(r.checkedAt)||!/^\d{4}-\d\d-\d\dT/.test(r.checkedAt)||!Number.isFinite(Date.parse(r.checkedAt)))fail();
 }
 if(p.submission!==null){const s=p.submission;if(!s||!str(s.receipt)||!str(s.link)||!safeURL(s.link)||!str(s.recordedAt)||!Number.isFinite(Date.parse(s.recordedAt))||!(s.receipt.trim()||s.link))fail();}
 }return data;
}
export function placeholderURL(value){
 if(!value)return false;
 try{const h=new URL(value).hostname.toLowerCase();return /(^|\.)(example\.(com|net|org)|localhost)$/.test(h)||/\.(test|invalid|example)$/.test(h)||h==='127.0.0.1'||h==='[::1]';}catch{return false;}
}
export function artifactReviewStatus(p,key){const r=p.artifactReviews?.[key];return !r?'unreviewed':r.url===p[key]?'current':'stale';}
export function reviewArtifact(p,key,note,checkedAt=new Date().toISOString()){
 if(!['repo','video'].includes(key))throw Error('Unknown artifact.');
 if(!p[key]||!safeURL(p[key])||placeholderURL(p[key]))throw Error('Save a real public artifact URL before recording a review.');
 if(typeof note!=='string'||!note.trim()||note.length>2000)throw Error('Add a review note (up to 2,000 characters).');
 if(!/^\d{4}-\d\d-\d\dT/.test(checkedAt)||!Number.isFinite(Date.parse(checkedAt)))throw Error('Invalid review time.');
 p.artifactReviews??={};p.artifactReviews[key]={url:p[key],note:note.trim(),checkedAt};return p;
}
export function packetAudit(p){
 const findings=[];
 const add=(level,title,detail,target)=>findings.push({level,title,detail,target});
 for(const [key,name] of [['repo','Repository'],['video','Video']]){
  if(!p[key])add('blocker',name+' link is missing','Add the actual artifact URL before preparing a real entry.','Overview');
  else if(placeholderURL(p[key]))add('blocker',name+' uses a placeholder or local URL','This address cannot serve as a public submission artifact.','Overview');
  else if(artifactReviewStatus(p,key)!=='current')add('review',name+' access review is '+artifactReviewStatus(p,key),artifactReviewStatus(p,key)==='stale'?'The saved review covers a different URL. Inspect the current link and record a new note.':'Open the saved link, inspect access and content, then record what you checked.','Packet audit');
 }
 if(!p.copy.trim())add('blocker','Submission copy is missing','Write a description of the product that actually works.','Submission copy');
 if(!p.requirements.length)add('blocker','No event requirements recorded','Read the official rules and record their requirements.','Requirements');
 for(const r of p.requirements){
  if(!r.done)add('blocker','Unfinished: '+r.title,'Review the requirement before marking it complete.','Requirements');
  if(!r.source||placeholderURL(r.source))add('blocker','Rule source needs review: '+r.title,'Add the actual official source URL; a demo address is not rule evidence.','Requirements');
  if(!p.evidence.some(e=>e.requirementId===r.id&&(e.note.trim()||e.file)))add('review','No linked evidence: '+r.title,'Attach a note or file showing what was checked. Evidence content still needs human review.','Evidence');
 }
 if(p.submission&&/\b(synthetic|demo)\b/i.test(p.submission.receipt+' '+p.submission.link))add('review','The receipt appears to be demo data','This text matches a demo marker. Only a real organizer confirmation can document an actual entry.','Submit & record');
 return findings;
}
export function markdown(p){return `# ${p.name}\n\n${p.event}\n\n${p.summary}\n\n## Deadline\n${p.deadlineLocal} [${p.timeZone}] / ${deadlineISO(p.deadlineLocal,p.timeZone)}\n\n## Preparation\n${unfinished(p).length?'Work remains':'Checklist complete; inspect the packet audit before submission'}\n\n## Requirements\n${p.requirements.map(r=>`- [${r.done?'x':' '}] ${r.title}${r.source?' — '+r.source:''}`).join('\n')}\n\n## Unfinished work\n${unfinished(p).map(x=>'- '+x).join('\n')||'None'}\n\n## Links\nRepository: ${p.repo||'Missing'}\nVideo: ${p.video||'Missing'}\n\n## Submission copy\n${p.copy}\n\n## Evidence\n${p.evidence.map(e=>`### ${e.title}\n${e.note}\nRequirement: ${p.requirements.find(r=>r.id===e.requirementId)?.title||'General'}\n${e.file?'Attachment: '+e.file.name+' (included in JSON backup, not embedded here)':''}`).join('\n\n')}\n\n## Packet audit\n${packetAudit(p).map(f=>`- [${f.level.toUpperCase()}] ${f.title}: ${f.detail}`).join('\n')||'No local completeness gaps detected.'}\n\nThese are local checks only. URLs are not fetched, evidence is not authenticated, and event eligibility is not certified.\n\n## Artifact access reviews\n${['repo','video'].map(key=>{const r=p.artifactReviews?.[key];return `### ${key}: ${artifactReviewStatus(p,key)}\n${r?`Reviewed URL: ${r.url}\nChecked at: ${r.checkedAt}\nNote: ${r.note}`:'No manual review recorded.'}`;}).join('\n\n')}\n\nManual records are self-reported, not automated verification.\n\n## Actual submission\n${p.submission?`Manually recorded: ${p.submission.recordedAt}\nConfirmation: ${p.submission.link}\nReceipt: ${p.submission.receipt}`:'Not recorded. Preparation does not mean submitted.'}\n`;}
