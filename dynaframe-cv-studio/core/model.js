export const uid = () => globalThis.crypto?.randomUUID?.() || `cv-${Date.now()}-${Math.random().toString(36).slice(2)}`;
export function blankProfile() {
  return {id:uid(), name:'', email:'', phone:'', location:'', linkedin:'', role:'', mode:'versatile', summary:'',
    experience:'', education:'', skills:'', languages:'', references:'Available upon request', template:'essential',
    updatedAt: new Date().toISOString()};
}
export const fields = [
 {key:'name',label:'Full name',required:true,placeholder:'e.g. Lerato Mokoena'},
 {key:'email',label:'Email address',type:'email',placeholder:'name@example.com'},
 {key:'phone',label:'Phone number',placeholder:'+27 00 000 0000'},
 {key:'location',label:'City / region',placeholder:'Johannesburg, South Africa'},
 {key:'role',label:'Target role (optional)',placeholder:'General Worker / Administrator'},
 {key:'linkedin',label:'LinkedIn or portfolio (optional)',placeholder:'https://...'}
];
export const templates = [
 {id:'essential',name:'Essential',description:'Straightforward and versatile'},
 {id:'executive',name:'Executive',description:'Refined business presentation'},
 {id:'modern',name:'Modern',description:'Contemporary accent and spacing'},
 {id:'creative',name:'Creative',description:'Expressive typographic hierarchy'},
 {id:'classic',name:'Classic',description:'Traditional and understated'},
 {id:'ats',name:'ATS Focus',description:'Simple single-column reading order'}
];
export function recommendTemplate(p) {
 if(p.mode==='student') return 'essential';
 if(p.mode==='targeted' && /design|art|creative|marketing/i.test(p.role)) return 'creative';
 if(/developer|software|data|tech|engineer/i.test(p.role)) return 'modern';
 if(/manager|executive|director|administrator|accountant/i.test(p.role)) return 'executive';
 return 'essential';
}
export function suggestedSummary(p) {
 const skills=p.skills.split(/[,\n]/).map(s=>s.trim()).filter(Boolean).slice(0,3);
 const focus=skills.length ? `Brings strengths in ${skills.join(', ')}. ` : '';
 if(p.mode==='student') return `Motivated and dependable applicant eager to develop practical experience. ${focus}Willing to learn, follow instructions and contribute positively to a team.`;
 if(p.mode==='targeted' && p.role.trim()) return `Reliable and adaptable applicant seeking an opportunity as ${p.role.trim()}. ${focus}Committed to learning quickly and supporting team goals.`;
 return `Dependable and adaptable individual with a practical approach to work. ${focus}Ready to learn new responsibilities, work collaboratively and contribute positively in a professional environment.`;
}
