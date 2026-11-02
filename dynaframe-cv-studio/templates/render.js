const esc = s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const multiline=s=>esc(s).replace(/\n/g,'<br>');
function section(title,content){return content.trim()?`<section class="cv-section"><h2>${title}</h2><div>${multiline(content)}</div></section>`:'';}
export function renderCV(p){
 const contact=[p.location,p.phone,p.email,p.linkedin].filter(Boolean).map(esc).join(' <span class="cv-dot">·</span> ');
 const purpose=p.mode==='targeted' && p.role ? esc(p.role) : '';
 return `<article class="cv-page cv-${esc(p.template)}" aria-label="CV document preview"><div class="cv-header"><h1>${esc(p.name||'YOUR NAME')}</h1>${purpose?`<div class="cv-role">${purpose}</div>`:''}<div class="cv-contact">${contact||'City · Phone · Email'}</div></div>${section('Professional Profile',p.summary)}${section('Experience & Volunteering',p.experience)}${section('Education',p.education)}${section('Key Skills',p.skills)}${section('Languages',p.languages)}${section('References',p.references)}</article>`;
}
