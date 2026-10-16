// Real local-app screen recording. Caption overlay exists only in this recording context.
import {createRequire} from 'node:module';
import {mkdir,writeFile,rename} from 'node:fs/promises';
const {chromium}=createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE||'playwright');
await mkdir('artifacts/recording',{recursive:true});await mkdir('demo',{recursive:true});
const browser=await chromium.launch({headless:true,channel:'chrome'});
const context=await browser.newContext({viewport:{width:1440,height:960},recordVideo:{dir:'artifacts/recording',size:{width:1440,height:960}},acceptDownloads:true});
const page=await context.newPage(),video=page.video(),chapters=[],began=Date.now();
page.on('dialog',d=>d.accept());
const tab=name=>page.getByRole('tab',{name,exact:true}).click();
async function caption(title,body,seconds=8){chapters.push({seconds:(Date.now()-began)/1000,title,body});await page.evaluate(({title,body})=>{let box=document.querySelector('#recording-caption');if(!box){box=document.createElement('div');box.id='recording-caption';Object.assign(box.style,{position:'fixed',left:'0',right:'0',bottom:'0',zIndex:99999,background:'#143f35',color:'white',padding:'18px 36px',font:'20px/1.4 -apple-system,sans-serif',pointerEvents:'none'});document.body.append(box);}box.replaceChildren();const h=document.createElement('strong');h.textContent=title+' — ';box.append(h,document.createTextNode(body));},{title,body});await page.waitForTimeout(seconds*1000);}
try{
 await page.goto(process.env.APP_URL||'http://127.0.0.1:4177');
 await caption('Submission Desk','A local workspace for hackathon entries. The examples are synthetic; the desk does not submit anything.',9);
 await page.getByLabel('Walkthrough video URL',{exact:true}).fill('https://example.com/gapwise/demo');await page.getByRole('button',{name:'Save entry',exact:true}).click();await tab('Requirements 3');const req=page.locator('[data-req]').nth(1);await req.getByRole('checkbox').check();await req.getByRole('button',{name:'Save',exact:true}).click();
 await caption('1 · A complete checklist','Every requirement is checked. That still does not mean the packet is ready—or that an entry was submitted.',9);
 await tab('Packet audit');await caption('2 · Inspect the gaps','Five blockers remain: filled-in placeholder links are not public artifacts. Missing evidence also stays visible.',10);
 await tab('Overview');await page.getByLabel('Repository URL',{exact:true}).fill('https://github.com/synthetic-owner/demo-project');await page.getByRole('button',{name:'Save entry',exact:true}).click();await tab('Packet audit');await page.locator('[data-artifact="repo"]').scrollIntoViewIfNeeded();
 await page.getByLabel('Repository access review note',{exact:true}).fill('SYNTHETIC DEMO: an example inspection note, not a real access verification.');await page.getByRole('button',{name:'Record repository check',exact:true}).click();await page.locator('[data-artifact="repo"]').scrollIntoViewIfNeeded();
 await caption('3 · Record what was inspected','Manual review notes remember an exact URL and time. This demo note is synthetic; the app does not fetch or authenticate links.',10);
 await tab('Overview');await page.getByLabel('Repository URL',{exact:true}).fill('https://github.com/synthetic-owner/replacement');await page.getByRole('button',{name:'Save entry',exact:true}).click();await tab('Packet audit');
 await caption('4 · Catch stale evidence','The repository URL changed. The earlier review is now stale and cannot cover the new link.',10);
 await tab('Evidence');await page.getByLabel('Title',{exact:true}).fill('Walkthrough review — synthetic');await page.getByLabel('Notes / what this proves',{exact:true}).fill('SYNTHETIC: example duration and content review. No real video was inspected.');await page.getByLabel('Related requirement',{exact:true}).selectOption({label:'Two-minute walkthrough video'});await page.getByRole('button',{name:'Save evidence',exact:true}).click();
 await caption('5 · Link evidence to requirements','Notes and optional files belong beside the rule they support. JSON backups preserve attachments; Markdown creates a portable handoff.',10);
 const md=page.waitForEvent('download');await page.getByRole('button',{name:'↓ Handoff .md',exact:true}).click();await(await md).saveAs('artifacts/recorded-handoff.md');
 await tab('Submit & record');await caption('6 · Prepared and submitted stay separate','Actual submission is still not recorded. The user submits on the organizer’s website and can then save a receipt.',9);
 await page.getByLabel('Receipt / confirmation notes',{exact:true}).fill('SYNTHETIC DEMO RECEIPT. No actual entry was sent.');await page.getByRole('button',{name:'Record submission',exact:true}).click();await caption('7 · A manual record','The receipt is a separate, self-reported fact. It does not certify acceptance or erase packet gaps.',9);
 await page.getByRole('button',{name:/Raincheck/}).click();await caption('One desk, several entries','Independent deadlines and unfinished work. Local storage, no account connection, explicit limits and honest status.',9);
 await writeFile('demo/chapters.json',JSON.stringify(chapters,null,2)+'\n');
}finally{await context.close();await browser.close();}
await rename(await video.path(),'demo/submission-desk-demo.webm');
console.log('Recorded demo/submission-desk-demo.webm');
