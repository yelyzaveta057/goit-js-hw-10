import"./assets/reset-Czl9-mzm.js";import{f as p,i}from"./assets/vendor-BbbuE1sJ.js";const c=document.querySelector("#datetime-picker"),o=document.querySelector("[data-start]"),S=document.querySelector("[data-days]"),D=document.querySelector("[data-hours]"),b=document.querySelector("[data-minutes]"),g=document.querySelector("[data-seconds]");let u=null,a=null;const q={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){const e=t[0],n=new Date;e.getTime()<=n.getTime()?(o.disabled=!0,i.error({title:"Error",message:"Please choose a date in the future",position:"topRight"})):(u=e,i.success({title:"OK!",message:"You can press Start!",position:"center"}),o.disabled=!1)}};p(c,q);o.addEventListener("click",C);function C(){u&&(o.disabled=!0,c.disabled=!0,a=setInterval(E,1e3))}function E(){const t=u-new Date;if(t<=0){clearInterval(a),a=null,l(0,0,0,0),c.disabled=!1,o.disabled=!1;return}const{days:e,hours:n,minutes:s,seconds:d}=T(t);l(e,n,s,d)}function T(t){const m=Math.floor(t/864e5),f=Math.floor(t%864e5/36e5),h=Math.floor(t%864e5%36e5/6e4),y=Math.floor(t%864e5%36e5%6e4/1e3);return{days:m,hours:f,minutes:h,seconds:y}}function l(t,e,n,s){S.textContent=r(t),D.textContent=r(e),b.textContent=r(n),g.textContent=r(s)}function r(t){return String(t).padStart(2,"0")}
//# sourceMappingURL=1-timer.js.map
