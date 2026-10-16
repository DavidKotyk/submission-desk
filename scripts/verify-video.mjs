import {createRequire} from 'node:module';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {stat,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const {chromium}=createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE||'playwright');
const browser=await chromium.launch({headless:true,channel:'chrome'});
try{
 const page=await browser.newPage({viewport:{width:1440,height:1100}});
 await page.goto(pathToFileURL(resolve('demo/preview.html')).href);
 await page.locator('video').evaluate(async v=>{if(v.readyState<1)await new Promise((ok,fail)=>{v.addEventListener('loadedmetadata',ok,{once:true});v.addEventListener('error',()=>fail(Error('Video metadata failed')),{once:true});});});
 const metadata=await page.locator('video').evaluate(v=>({duration:v.duration,width:v.videoWidth,height:v.videoHeight,error:v.error?.message||null}));
 assert.ok(metadata.duration>60&&metadata.duration<180);assert.equal(metadata.width,1440);assert.equal(metadata.height,960);assert.equal(metadata.error,null);
 for(const t of [25,48,72]){await page.locator('video').evaluate(async(v,t)=>{v.currentTime=t;await new Promise(ok=>v.addEventListener('seeked',ok,{once:true}));},t);await page.locator('video').screenshot({path:`artifacts/video-${t}.png`});}
 await page.locator('video').evaluate(async v=>{v.currentTime=0;v.muted=true;v.playbackRate=4;await v.play();});
 await page.waitForFunction(()=>document.querySelector('video').ended,{},{timeout:60000});
 const report={...metadata,bytes:(await stat('demo/submission-desk-demo.webm')).size,fullPlaybackVerified:true,playbackRate:4,frames:[25,48,72],checkedAt:new Date().toISOString()};await writeFile('docs/video-check.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report));
}finally{await browser.close();}
