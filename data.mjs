export const TODAY = '2026-11-06';
export const people = {
  alex: { id:'alex', name:'Alex', fullName:'Alex Gani', role:'director', initials:'AG', country:'All regions' },
  bilal: { id:'bilal', name:'Bilal', fullName:'Bilal', role:'director', initials:'BG', country:'All regions' },
  sameh: { id:'sameh', name:'Sameh', fullName:'Sameh', role:'executive', initials:'SA', country:'UAE' },
  latif: { id:'latif', name:'Latif', fullName:'Latif', role:'executive', initials:'LA', country:'Saudi Arabia' }
};
export const stages = ['Identified','Contacted','Discussion','Proposal / samples','Decision','Won','Lost'];
export function seed() { return {
  schema:1,
  organisations:[
    {id:'cedar',name:'Cedar International School',short:'CI',type:'School',country:'UAE',city:'Sharjah',owner:'sameh',audience:'owner',status:'Client',lastContact:'2026-11-05',next:'Confirm the sample handover',due:'2026-11-06',colour:'rose',contact:'Nadia Ahmed',email:'nadia@cedar.example',position:'Head of Operations',phone:'+971 • example contact',notes:'Uniform launch for the next academic year. Two sample sizes requested.',contract:'31 July 2027',review:'12 January 2027'},
    {id:'oasis',name:'Oasis Academy',short:'OA',type:'School',country:'Saudi Arabia',city:'Riyadh',owner:'latif',audience:'owner',status:'Client',lastContact:'2026-11-04',next:'Send the revised launch dates',due:'2026-11-05',colour:'blue',contact:'Faisal Rahman',email:'faisal@oasis.example',position:'Procurement Manager',phone:'+966 • example contact',notes:'Launch dates need to reflect the latest production estimate.',contract:'30 June 2028',review:'11 January 2027'},
    {id:'horizon',name:'Horizon Education Group',short:'HE',type:'School group',country:'UAE',city:'Dubai',owner:'sameh',audience:'shared',status:'Prospect',lastContact:'2026-11-05',next:'Prepare the proposal for three campuses',due:'2026-11-09',colour:'violet',contact:'Maya Collins',email:'maya@horizon.example',position:'Group Purchasing',phone:'+971 • example contact',notes:'One group opportunity covering three campuses. Value is counted once.',contract:'',review:''},
    {id:'crescent',name:'Crescent British School',short:'CB',type:'School',country:'Saudi Arabia',city:'Jeddah',owner:'latif',audience:'owner',status:'Prospect',lastContact:'2026-11-03',next:'Book a uniform discovery meeting',due:'2026-11-08',colour:'mint',contact:'Sara Noor',email:'sara@crescent.example',position:'School Administrator',phone:'+966 • example contact',notes:'Initial discussion about a new uniform range.',contract:'',review:''},
    {id:'atlas',name:'Atlas Hospitality',short:'AH',type:'Business',country:'UAE',city:'Abu Dhabi',owner:'sameh',audience:'owner',status:'Prospect',lastContact:'2026-11-02',next:'Follow up on branded staff polos',due:'2026-11-10',colour:'sand',contact:'Omar Malik',email:'omar@atlas.example',position:'Operations Director',phone:'+971 • example contact',notes:'Staffwear for a new hospitality venue.',contract:'',review:''},
    {id:'elm',name:'Elm Preparatory School',short:'EP',type:'School',country:'UAE',city:'Dubai',owner:'sameh',audience:'owner',status:'Research',lastContact:null,next:'Not yet approached',due:null,colour:'rose',contact:'',email:'',position:'',phone:'',notes:'Research record. No active opportunity or task.',contract:'',review:''}
  ],
  opportunities:[
    {id:'opp-horizon',org:'horizon',title:'Uniform contract · three campuses',owner:'sameh',audience:'shared',country:'UAE',stage:'Proposal / samples',value:280000,currency:'AED',next:'Prepare group proposal',due:'2026-11-09'},
    {id:'opp-crescent',org:'crescent',title:'New school uniform range',owner:'latif',audience:'owner',country:'Saudi Arabia',stage:'Discussion',value:190000,currency:'SAR',next:'Book discovery meeting',due:'2026-11-08'},
    {id:'opp-atlas',org:'atlas',title:'Branded staffwear',owner:'sameh',audience:'owner',country:'UAE',stage:'Contacted',value:45000,currency:'AED',next:'Follow up on polo selection',due:'2026-11-10'},
    {id:'opp-cedar',org:'cedar',title:'Sportswear expansion',owner:'sameh',audience:'owner',country:'UAE',stage:'Decision',value:60000,currency:'AED',next:'Confirm sample feedback',due:'2026-11-12'}
  ],
  projects:[
    {id:'refit',name:'Riyadh shop refit',owner:'latif',audience:'shared',country:'Saudi Arabia',org:null,status:'Active',target:'2026-12-01',next:'Approve the signage artwork',description:'Prepare the new retail space for opening. Sameh is helping with the branding.',milestones:[['Lease and measurements','2026-11-02','Done'],['Signage approval','2026-11-06','Decision needed'],['Fit-out handover','2026-11-22','Upcoming'],['Opening readiness','2026-12-01','Upcoming']]},
    {id:'cedar-launch',name:'Cedar uniform launch',owner:'sameh',audience:'owner',country:'UAE',org:'cedar',status:'Waiting',target:'2027-01-04',next:'Confirm factory production slot',description:'Coordinate samples, artwork and launch preparation for Cedar School.',milestones:[['Sample review','2026-11-06','Upcoming'],['Approved artwork','2026-11-12','Upcoming'],['Launch readiness','2027-01-04','Upcoming']]},
    {id:'warehouse',name:'Saudi warehouse setup',owner:'latif',audience:'owner',country:'Saudi Arabia',org:null,status:'Blocked',target:'2026-11-26',next:'Resolve access arrangements',description:'Confirm racking, access and the first receiving date.',milestones:[['Confirm access','2026-11-09','Blocked'],['Install racking','2026-11-18','Upcoming'],['Ready to receive','2026-11-26','Upcoming']]}
  ],
  tasks:[
    {id:'t-prices',title:'Send revised launch dates',org:'oasis',project:null,owner:'latif',audience:'owner',due:'2026-11-05',originalDue:'2026-11-05',status:'To do',priority:'High',source:'e-oasis',detail:'School has asked for confirmed dates. The acknowledgement did not resolve the request.'},
    {id:'t-signage',title:'Approve the signage artwork',org:null,project:'refit',owner:'bilal',audience:'shared',due:'2026-11-06',originalDue:'2026-11-06',status:'To do',priority:'High',source:null,detail:'Choose the final exterior signage design so production can start.'},
    {id:'t-samples',title:'Confirm the sample handover',org:'cedar',project:'cedar-launch',owner:'sameh',audience:'owner',due:'2026-11-06',originalDue:'2026-11-06',status:'To do',priority:'Normal',source:'e-cedar',detail:'Arrange the two navy polo samples requested by Nadia.'},
    {id:'t-factory',title:'Review the factory production slot',org:'cedar',project:'cedar-launch',owner:'sameh',audience:'owner',due:'2026-11-06',originalDue:'2026-11-06',status:'Waiting',waitingOn:'Factory',priority:'Normal',source:null,detail:'Waiting for the factory to confirm capacity. Review today.'},
    {id:'t-proposal',title:'Prepare the three-campus proposal',org:'horizon',project:null,owner:'sameh',audience:'shared',due:'2026-11-09',originalDue:'2026-11-09',status:'In progress',priority:'Normal',source:'e-horizon',detail:'Keep the group contract value separate from campus breakdowns.'},
    {id:'t-access',title:'Resolve warehouse access arrangements',org:null,project:'warehouse',owner:'latif',audience:'owner',due:'2026-11-09',originalDue:'2026-11-09',status:'Blocked',priority:'High',source:null,detail:'Landlord confirmation is still required.'},
    {id:'t-margin',title:'Review the proposed logo setup cost',org:'cedar',project:null,owner:'alex',audience:'directors',due:'2026-11-06',originalDue:'2026-11-06',status:'To do',priority:'Normal',source:'e-private',detail:'Private commercial decision. This task is absent from executive views.'}
  ],
  messages:[
    {id:'e-cedar',org:'cedar',owner:'sameh',audience:'owner',direction:'Incoming',from:'Nadia Ahmed',mailbox:'sameh@sud.ae',date:'2026-11-05T09:20:00',subject:'Samples for our uniform review',body:'Hello Sameh,\n\nCould you bring the navy polos in sizes 9–10 and 11–12 for our review? We would also like confirmation of the logo placement.\n\nMany thanks,\nNadia',state:'Follow-up scheduled',meaningful:true},
    {id:'e-cedar-reply',org:'cedar',owner:'sameh',audience:'owner',direction:'Outgoing',from:'Sameh',mailbox:'sameh@sud.ae',date:'2026-11-05T11:10:00',subject:'Re: Samples for our uniform review',body:'Hello Nadia,\n\nI will arrange the two samples and confirm our visit. I will include the proposed logo placement for review.\n\nKind regards,\nSameh',state:'Follow-up scheduled',meaningful:true},
    {id:'e-private',org:'cedar',owner:'alex',audience:'directors',direction:'Internal',from:'Alex',mailbox:'a.gani@sud.co.uk',date:'2026-11-05T12:30:00',subject:'Private: logo setup decision',body:'Bilal, please review the proposed logo setup allowance before we confirm the commercial position. This discussion is restricted to the directors.',state:'Needs our response',meaningful:true},
    {id:'e-oasis',org:'oasis',owner:'latif',audience:'owner',direction:'Incoming',from:'Faisal Rahman',mailbox:'info@sud.me',date:'2026-11-04T10:00:00',subject:'Please confirm the revised launch dates',body:'Hello,\n\nPlease can you confirm the revised dates for our launch? We need to send the parent communication after the dates are agreed.\n\nThank you,\nFaisal',state:'Needs our response',meaningful:true},
    {id:'e-oasis-reply',org:'oasis',owner:'latif',audience:'owner',direction:'Outgoing',from:'info@sud.me',mailbox:'info@sud.me',date:'2026-11-04T10:35:00',subject:'Re: Please confirm the revised launch dates',body:'Thank you. We have received your request and will come back with the dates.',state:'Needs our response',meaningful:false},
    {id:'e-horizon',org:'horizon',owner:'sameh',audience:'shared',direction:'Incoming',from:'Maya Collins',mailbox:'sameh@sud.ae',date:'2026-11-05T14:00:00',subject:'Proposal for our three campuses',body:'Hello Sameh,\n\nPlease prepare one group proposal covering our three campuses. Could we review this early next week?\n\nBest wishes,\nMaya',state:'Follow-up scheduled',meaningful:true},
    {id:'e-unmatched',org:null,owner:'sameh',audience:'owner',direction:'Incoming',from:'Group procurement',mailbox:'info@sud.ae',date:'2026-11-06T08:40:00',subject:'Re: Next term uniform proposal',body:'Please include the additional campus in the group proposal. We can confirm the pupil numbers at the meeting.',state:'Needs filing',meaningful:true}
  ],
  products:[
    {id:'polo',ref:'SUD-S001',name:'Classic school polo',colour:'Navy',hex:'#263c59',kind:'polo',sizes:['9–10','11–12'],tags:['Uniform','Cotton','Core range'],supplier:'Example Textile Co',supplierCountry:'Portugal',manufacturerCode:'ET-P104',cost:22,costLogo:28,rrp:65,rrpLogo:75,currency:'AED',lead:'3–4 weeks',supply:'Stock',tax:'excluding VAT'},
    {id:'blazer',ref:'SUD-S002',name:'School blazer',colour:'Burgundy',hex:'#733e51',kind:'blazer',sizes:['32','34'],tags:['Formal','Schoolwear'],supplier:'Example Garments',supplierCountry:'Pakistan',manufacturerCode:'EG-B22',cost:90,costLogo:102,rrp:220,rrpLogo:245,currency:'AED',lead:'6–8 weeks',supply:'Custom',tax:'excluding VAT'},
    {id:'sports',ref:'SUD-S003',name:'Performance sports tee',colour:'Teal',hex:'#2c7777',kind:'tee',sizes:['M','L'],tags:['Sportswear','Lightweight'],supplier:'Example Activewear',supplierCountry:'China',manufacturerCode:'EA-T09',cost:19,costLogo:24,rrp:55,rrpLogo:65,currency:'AED',lead:'4–5 weeks',supply:'Custom',tax:'excluding VAT'},
    {id:'hoodie',ref:'SUD-S004',name:'Everyday school hoodie',colour:'Grey',hex:'#9399a1',kind:'hoodie',sizes:['11–12'],tags:['Outerwear','Fleece'],supplier:'Example Textile Co',supplierCountry:'Portugal',manufacturerCode:'ET-H28',cost:45,costLogo:51,rrp:110,rrpLogo:125,currency:'AED',lead:'3–4 weeks',supply:'Stock',tax:'excluding VAT'}
  ],
  units:[
    {id:'SP-001',product:'polo',size:'9–10',holder:'Sharjah base',status:'Available',org:null,owner:null,due:null,branded:false},
    {id:'SP-002',product:'polo',size:'11–12',holder:'Sharjah base',status:'Available',org:null,owner:null,due:null,branded:true},
    {id:'SP-003',product:'polo',size:'9–10',holder:'Latif',status:'With colleague',org:null,owner:'latif',due:'2026-11-10',branded:false},
    {id:'SP-004',product:'blazer',size:'32',holder:'Cedar International School',status:'With client',org:'cedar',owner:'sameh',due:'2026-11-05',branded:true},
    {id:'SP-005',product:'blazer',size:'34',holder:'Sharjah base',status:'Available',org:null,owner:null,due:null,branded:false},
    {id:'SP-006',product:'sports',size:'M',holder:'Riyadh base',status:'Available',org:null,owner:null,due:null,branded:false},
    {id:'SP-007',product:'sports',size:'L',holder:'Sameh',status:'With colleague',org:null,owner:'sameh',due:'2026-11-09',branded:true},
    {id:'SP-008',product:'hoodie',size:'11–12',holder:'Sharjah base',status:'Available',org:null,owner:null,due:null,branded:false}
  ],
  notes:[], movements:[], activity:[], documents:[]
}; }
