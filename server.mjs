import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('.',import.meta.url));
const allowed={'/':'index.html','/index.html':'index.html','/app.js':'app.js','/domain.js':'domain.js','/style.css':'style.css'};
const server=http.createServer(async(req,res)=>{const file=allowed[req.url?.split('?')[0]];if(!file){res.writeHead(404);return res.end('Not found');}try{const body=await readFile(root+file);res.writeHead(200,{'Content-Type':file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':'text/html','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(body);}catch{res.writeHead(500);res.end('Unable to read app');}});
server.listen(Number(process.env.PORT||4173),'127.0.0.1',()=>console.log('Submission Desk: http://127.0.0.1:'+server.address().port));
