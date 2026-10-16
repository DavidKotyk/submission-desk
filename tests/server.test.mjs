import test from 'node:test';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
test('loopback server serves app modules and denies non-app paths',async()=>{
 const child=spawn(process.execPath,['server.mjs'],{cwd:new URL('..',import.meta.url),env:{...process.env,PORT:'0'},stdio:['ignore','pipe','pipe']});
 try{
  const output=await Promise.race([once(child.stdout,'data').then(([b])=>b.toString()),new Promise((_,reject)=>{const t=setTimeout(()=>reject(Error('Server did not start')),5000);t.unref();})]);
  const base=output.match(/http:\/\/127\.0\.0\.1:\d+/)?.[0];assert.ok(base);
  for(const [path,type] of [['/','text/html'],['/app.js','text/javascript'],['/domain.js','text/javascript'],['/style.css','text/css']]){const response=await fetch(base+path);assert.equal(response.status,200);assert.match(response.headers.get('content-type'),new RegExp(type));assert.ok((await response.text()).length>100);}
  assert.equal((await fetch(base+'/docs/completed-demo.json')).status,404);
  assert.equal((await fetch(base+'/package.json')).status,404);
 }finally{child.kill();await once(child,'exit');}
});
