module.exports={uuid:function(){const t=Math.round(1e10*Math.random()%parseInt("0xffffffff",16)).toString(16),f=Math.round(1e5*Math.random()%parseInt("0xffff",16)).toString(16),a=Math.round(1e5*Math.random()%parseInt("0xffff",16)).toString(16),r=Math.round(1e5*Math.random()%parseInt("0xffff",16)).toString(16),n=Math.round(1e13*Math.random()%parseInt("0xffffffffffff",16)).toString(16);return`${t.padStart(8,"0")}-${f.padStart(4,"0")}-${a.padStart(4,"0")}-${r.padStart(4,"0")}-${n.padStart(12,"0")}`}};