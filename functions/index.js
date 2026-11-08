const {onSchedule} = require('firebase-functions/v2/scheduler');
const {initializeApp} = require('firebase-admin/app');
const {getFirestore,FieldValue} = require('firebase-admin/firestore');
initializeApp();
const db=getFirestore();

// Checagem diária de disponibilidade. HTTP 403/429 também pode significar bloqueio
// automatizado, portanto o resultado é indicativo, não uma certificação de saúde.
exports.checkToolLinks = onSchedule({schedule:'every day 04:20',timeZone:'America/Fortaleza',region:'southamerica-east1',timeoutSeconds:300},async()=>{
  const snap=await db.collection('tools').where('active','==',true).limit(150).get();
  const docs=snap.docs;
  for(let i=0;i<docs.length;i+=10){
    const batch=docs.slice(i,i+10);
    await Promise.all(batch.map(async doc=>{
      const data=doc.data(); let status='unknown',httpStatus=null;
      try{
        const controller=new AbortController(); const timer=setTimeout(()=>controller.abort(),9000);
        let response;
        try { response=await fetch(data.url,{method:'HEAD',redirect:'follow',signal:controller.signal,headers:{'User-Agent':'FreeTools2026-LinkMonitor/1.0'}}); }
        finally { clearTimeout(timer); }
        httpStatus=response.status; status=response.ok||[401,403,405].includes(response.status)?'reachable':'check';
      }catch(e){status='check';}
      await doc.ref.set({linkStatus:status,httpStatus,lastCheckedAt:FieldValue.serverTimestamp()},{merge:true});
    }));
  }
});
