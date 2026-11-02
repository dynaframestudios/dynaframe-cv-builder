const DB='dynaframe-cv-studio', STORE='profiles';
function openDB(){return new Promise((resolve,reject)=>{const r=indexedDB.open(DB,1);r.onupgradeneeded=()=>{if(!r.result.objectStoreNames.contains(STORE))r.result.createObjectStore(STORE,{keyPath:'id'});};r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});}
async function transaction(mode,action){const db=await openDB();return new Promise((resolve,reject)=>{const tx=db.transaction(STORE,mode);const req=action(tx.objectStore(STORE));req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);tx.oncomplete=()=>db.close();tx.onerror=()=>reject(tx.error);});}
export const listProfiles=()=>transaction('readonly',s=>s.getAll());
export const getProfile=id=>transaction('readonly',s=>s.get(id));
export const saveProfile=p=>transaction('readwrite',s=>s.put({...p,updatedAt:new Date().toISOString()}));
export const deleteProfile=id=>transaction('readwrite',s=>s.delete(id));
