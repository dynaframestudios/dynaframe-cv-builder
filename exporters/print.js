// Browser native print-to-PDF keeps text selectable and printable without rasterizing.
export function printCV(){window.print();}
export function exportJSON(profile){const blob=new Blob([JSON.stringify(profile,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`${(profile.name||'applicant').trim().replace(/[^a-z0-9_-]+/gi,'-')}-cv-profile.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1500);}
