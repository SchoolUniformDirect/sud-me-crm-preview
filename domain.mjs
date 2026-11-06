// Pure business rules used by the fictional prototype. Production must enforce
// equivalent checks on every server/database request, with verified identity.
export function isDirector(actor) { return actor?.role === 'director'; }
export function canRead(actor,record) {
  if(!actor || !record) return false;
  if(isDirector(actor)) return true;
  if(record.audience==='directors') return false;
  if(record.audience==='shared') return true;
  if(record.audience==='selected') return record.members?.includes(actor.id) === true;
  return record.audience==='owner' && record.owner===actor.id;
}
export function visible(actor,records) { return records.filter(r=>canRead(actor,r)); }
export function canReadLinked(actor,record,{organisations=[],projects=[]}={}) {
  if(!canRead(actor,record)) return false;
  if(record.org && !canRead(actor,organisations.find(o=>o.id===record.org))) return false;
  if(record.project && !canRead(actor,projects.find(p=>p.id===record.project))) return false;
  return true;
}
export function canSeeUnitDetail(actor,unit,orgs) {
  if(isDirector(actor)) return true;
  if(unit.org) return canRead(actor,orgs.find(o=>o.id===unit.org));
  return !unit.owner || unit.owner===actor.id;
}
export function openTasks(tasks) { return tasks.filter(t=>!['Done','Cancelled'].includes(t.status)); }
export function overdue(task,today) { return Boolean(task.due && task.due<today && !['Done','Cancelled'].includes(task.status)); }
export function filterRegion(records,region) { return region==='All regions'?records:records.filter(r=>r.country===region); }
export function clientSafeNote({number,date,org,recipient,due,units,products}) {
  if(!org?.name || !recipient) throw new Error('Choose a client and recipient.');
  if(!units.length) throw new Error('Choose at least one sample.');
  return {number,date,client:org.name,recipient,expectedReturn:due,example:true,
    lines:units.map(unit=>{
      const p=products.find(p=>p.id===unit.product);
      if(!p) throw new Error('Product not found.');
      return {reference:p.ref,product:p.name,size:unit.size,colour:p.colour,quantity:1,rrp:unit.branded?p.rrpLogo:p.rrp,currency:p.currency,tax:p.tax};
    })};
}
export function moveSamples(state,actor,request) {
  const ids=[...new Set(request.ids)];
  if(!ids.length) throw new Error('Choose at least one sample.');
  const units=ids.map(id=>state.units.find(u=>u.id===id));
  if(units.some(u=>!u)) throw new Error('A selected sample no longer exists.');
  if(units.some(u=>!canSeeUnitDetail(actor,u,state.organisations))) throw new Error('You cannot change these sample holdings.');
  if(!['take','issue','return'].includes(request.kind)) throw new Error('Choose a valid movement.');
  if(request.kind==='take' && units.some(u=>u.status!=='Available')) throw new Error('A selected sample is no longer available. Refresh and choose another.');
  if(request.kind==='issue' && units.some(u=>u.status!=='Available' && !(u.status==='With colleague' && (isDirector(actor)||u.owner===actor.id)))) throw new Error('Choose available samples or samples in your custody.');
  if(request.kind==='return' && units.some(u=>!['With colleague','With client'].includes(u.status))) throw new Error('Only checked-out samples can be returned.');
  let org=null, note=null;
  if(request.kind==='issue') {
    org=state.organisations.find(o=>o.id===request.org);
    if(!canRead(actor,org)) throw new Error('Choose an accessible client.');
    note=clientSafeNote({number:`EX-DN-${String(state.documents.length+1).padStart(4,'0')}`,date:request.date,org,recipient:request.recipient,due:request.due,units,products:state.products});
  }
  if(request.kind!=='return' && !request.due) throw new Error('Set an expected return date.');
  if(request.kind!=='return' && request.due<request.date) throw new Error('Expected return cannot be before the handover date.');
  if(request.kind==='take' && !request.holder) throw new Error('Choose the colleague taking the samples.');
  if(request.kind==='return' && !['Sharjah base','Riyadh base'].includes(request.location)) throw new Error('Choose the return location.');
  // Validate the whole movement before modifying any unit.
  for(const unit of units) {
    const from=unit.holder;
    unit.status=request.kind==='return'?'Available':request.kind==='take'?'With colleague':'With client';
    unit.holder=request.kind==='return'?request.location:request.kind==='take'?request.holder.name:org.name;
    unit.owner=request.kind==='return'?null:request.kind==='take'?request.holder.id:org.owner;
    unit.org=request.kind==='issue'?org.id:null;
    unit.due=request.kind==='return'?null:request.due;
    state.movements.push({id:globalThis.crypto.randomUUID(),unit:unit.id,kind:request.kind,from,to:unit.holder,date:request.date,actor:actor.id});
  }
  if(note) state.documents.push(note);
  return note;
}
export function setTaskState(task,status,{date,reason,waitingOn}={}) {
  if(!['To do','In progress','Waiting','Blocked','Done','Cancelled'].includes(status)) throw new Error('Choose a valid task status.');
  if(['Waiting','Blocked'].includes(status) && (!date || !reason?.trim())) throw new Error('Enter a review date and a reason.');
  if(date && date!==task.due && !reason?.trim()) throw new Error('Explain why the date is changing.');
  if(date) { task.originalDue ||= task.due; task.due=date; task.rescheduleReason=reason; }
  if(waitingOn) task.waitingOn=waitingOn;
  if(reason) task.detail=reason;
  task.status=status;
}
export function exactContactMatch(message,orgs) {
  const address=message.address?.trim().toLowerCase();
  if(!address) return {status:'needs-review',candidates:[]};
  const candidates=orgs.filter(o=>o.email?.toLowerCase()===address).map(o=>o.id);
  return {status:candidates.length===1?'matched':'needs-review',candidates};
}
