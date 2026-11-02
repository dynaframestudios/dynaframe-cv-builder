const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function lines(value){return String(value||'').split(/\n+/).map(v=>v.trim()).filter(Boolean);}
function block(title, value, kind='body') {
 const entries=lines(value); if(!entries.length)return '';
 const contents=kind==='chips'?`<div class="cv-tags">${entries.flatMap(x=>x.split(/[,;]+/)).map(x=>x.trim()).filter(Boolean).map(x=>`<span>${esc(x)}</span>`).join('')}</div>`:
 kind==='list'?`<ul>${entries.map(x=>`<li>${esc(x.replace(/^[•*\-]\s*/,''))}</li>`).join('')}</ul>`:
 `<div class="cv-copy">${entries.map(x=>`<p>${esc(x)}</p>`).join('')}</div>`;
 return `<section class="cv-section"><h2>${esc(title)}</h2>${contents}</section>`;
}
export function renderCV(p){
 const template=['essential','executive','modern','creative','classic','ats'].includes(p.template)?p.template:'essential';
 const name=esc(p.name||'YOUR NAME');
 const role=esc(p.mode==='targeted' && p.role ? p.role : p.role || 'Professional Curriculum Vitae');
 const contact=[['⌖',p.location],['✆',p.phone],['@',p.email],['↗',p.linkedin]].filter(([,v])=>String(v||'').trim());
 const contacts=contact.length?contact.map(([icon,v])=>`<span class="cv-contact-item"><i aria-hidden="true">${icon}</i>${esc(v)}</span>`).join(''):'<span class="cv-contact-item">City · Phone · Email</span>';
 const primary=block('Profile',p.summary)+block('Experience & Volunteering',p.experience,'list')+block('Education',p.education);
 const secondary=block('Key Skills',p.skills,template==='ats'?'list':'chips')+block('Languages',p.languages,'list')+block('References',p.references);
 const header=`<header class="cv-header"><div class="cv-brandline">CURRICULUM VITAE <span> / PERSONAL PROFILE</span></div><h1>${name}</h1><div class="cv-role">${role}</div><div class="cv-contact">${contacts}</div></header>`;
 if(template==='modern'||template==='creative')return `<article class="cv-page cv-${template}" aria-label="CV document preview">${header}<div class="cv-columns"><main class="cv-main">${primary}</main><aside class="cv-side">${secondary}</aside></div></article>`;
 return `<article class="cv-page cv-${template}" aria-label="CV document preview">${header}<div class="cv-content">${primary}${secondary}</div></article>`;
}
