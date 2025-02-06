function t(t,e){return Math.random()*(e-t)+t}function e(){let e=document.querySelector(".gradient-shapes");if(!e)return;let r=["rgb(178, 255, 178)","rgb(144, 238, 144)","rgb(152, 251, 152)","rgb(255, 255, 255)"],a=document.createDocumentFragment();for(let e=0;e<50;e++){let o=document.createElement("div"),n=r[e%r.length],s=t(100,200),l=t(300,1e3),c=t(-50,150),i=t(-50,150),d=t(20,40),u=t(0,20),m=Math.random()>.5?1:-1;o.style.setProperty("--wave-x",`${t(100,200)*m}px`),o.style.setProperty("--wave-y",`${t(100,200)*m}px`),o.style.setProperty("--wave-rotate",`${t(-180,180)}deg`),o.style.setProperty("--wave-scale",t(.8,1.2).toString()),o.style.setProperty("--duration",`${d}s`),o.style.cssText+=`
            position: absolute;
            width: ${l}px;
            height: ${s}px;
            left: ${c}%;
            top: ${i}%;
            background: ${n};
            border-radius: 50% 50% 50% 50% / 20% 20% 80% 80%;
            filter: blur(${s/3}px);
            animation: waveFloat var(--duration) ease-in-out infinite;
            animation-delay: -${u}s;
            will-change: transform;
            transform: translateZ(0);
        `,a.appendChild(o)}e.appendChild(a)}document.addEventListener("DOMContentLoaded",function(){e()}),document.addEventListener("DOMContentLoaded",()=>{e(),function(){let t=document.querySelector(".navbar"),e=document.querySelector(".hero"),r=0,a=!1;function o(){let o=window.pageYOffset,n=e.offsetHeight;o>r&&o>n?t.classList.add("navbar-hidden"):(t.classList.remove("navbar-hidden"),o>50?t.classList.add("navbar-scrolled"):t.classList.remove("navbar-scrolled")),r=o,a=!1}window.addEventListener("scroll",()=>{a||(requestAnimationFrame(o),a=!0)}),o()}(),function(){let t=document.querySelectorAll(".parallax"),e=!1;window.addEventListener("scroll",()=>{e||(window.requestAnimationFrame(()=>{t.forEach(t=>{let e=t.dataset.speed||.5,r=t.getBoundingClientRect(),a=window.pageYOffset;r.top<=window.innerHeight&&r.bottom>=0&&(t.style.transform=`translateY(${a*e}px)`)}),e=!1}),e=!0)})}(),document.querySelectorAll(".feature-card, .value-card").forEach(t=>{t.addEventListener("mousemove",e=>{let r=t.getBoundingClientRect(),a=e.clientX-r.left,o=e.clientY-r.top;t.style.setProperty("--mouse-x",`${a}px`),t.style.setProperty("--mouse-y",`${o}px`)}),t.addEventListener("mouseleave",()=>{t.style.setProperty("--mouse-x","0px"),t.style.setProperty("--mouse-y","0px")})}),document.querySelectorAll('a[href^="#"]').forEach(t=>{t.addEventListener("click",e=>{e.preventDefault();let r=document.querySelector(t.getAttribute("href"));r&&r.scrollIntoView({behavior:"smooth",block:"start"})})}),function(){let t=new IntersectionObserver(t=>{t.forEach(t=>{t.isIntersecting&&(t.target.classList.add("in-view"),t.target.dataset.delay&&(t.target.style.transitionDelay=t.target.dataset.delay))})},{root:null,rootMargin:"0px",threshold:.1});document.querySelectorAll(".animate-on-scroll").forEach(e=>t.observe(e))}(),function(){function t(t,e,r){t.innerHTML="";let{valueKey:a,color:o,id:n}=r,s=document.createElementNS("http://www.w3.org/2000/svg","svg");s.setAttribute("width","100%"),s.setAttribute("height","100%"),s.style.minHeight="250px",t.appendChild(s);let l=document.createElementNS("http://www.w3.org/2000/svg","defs"),c=document.createElementNS("http://www.w3.org/2000/svg","linearGradient"),i=`gradient-${n}`;c.setAttribute("id",i),c.setAttribute("x1","0"),c.setAttribute("y1","0"),c.setAttribute("x2","0"),c.setAttribute("y2","1");let d=document.createElementNS("http://www.w3.org/2000/svg","stop");d.setAttribute("offset","0%"),d.setAttribute("stop-color",o),d.setAttribute("stop-opacity","0.2");let u=document.createElementNS("http://www.w3.org/2000/svg","stop");u.setAttribute("offset","100%"),u.setAttribute("stop-color",o),u.setAttribute("stop-opacity","0"),c.appendChild(d),c.appendChild(u),l.appendChild(c),s.appendChild(l);let m=t.clientWidth-50-30,p=d3.scalePoint().domain(e.map(t=>t.month)).range([0,m]).padding(.5),h=d3.scaleLinear().domain([40,100]).range([190,0]).nice(),v=d3.line().x(t=>p(t.month)).y(t=>h(t[a])).curve(d3.curveMonotoneX),g=d3.area().x(t=>p(t.month)).y0(190).y1(t=>h(t[a])).curve(d3.curveMonotoneX),y=document.createElementNS("http://www.w3.org/2000/svg","g");y.setAttribute("transform","translate(50,20)"),s.appendChild(y);let w=y.appendChild(document.createElementNS("http://www.w3.org/2000/svg","g"));w.setAttribute("class","chart-grid"),h.ticks(5).forEach(t=>{let e=document.createElementNS("http://www.w3.org/2000/svg","line");e.setAttribute("x1",0),e.setAttribute("x2",m),e.setAttribute("y1",h(t)),e.setAttribute("y2",h(t)),w.appendChild(e)});let b=document.createElementNS("http://www.w3.org/2000/svg","path");b.setAttribute("class","chart-area"),b.setAttribute("d",g(e)),b.style.fill=`url(#${i})`,y.appendChild(b);let f=document.createElementNS("http://www.w3.org/2000/svg","path");f.setAttribute("class","chart-line"),f.setAttribute("d",v(e)),f.style.stroke=o,y.appendChild(f),e.forEach(t=>{let e=document.createElementNS("http://www.w3.org/2000/svg","circle");e.setAttribute("class","chart-point"),e.setAttribute("cx",p(t.month)),e.setAttribute("cy",h(t[a])),e.setAttribute("r",6),e.style.stroke=o,y.appendChild(e)});let L=y.appendChild(document.createElementNS("http://www.w3.org/2000/svg","g"));L.setAttribute("class","chart-axis"),L.setAttribute("transform","translate(0,190)"),e.forEach(t=>{let e=document.createElementNS("http://www.w3.org/2000/svg","text");e.setAttribute("class","chart-axis-label"),e.setAttribute("x",p(t.month)),e.setAttribute("y",25),e.setAttribute("text-anchor","middle"),e.textContent=t.month,L.appendChild(e)});let A=y.appendChild(document.createElementNS("http://www.w3.org/2000/svg","g"));A.setAttribute("class","chart-axis"),h.ticks(5).forEach(t=>{let e=document.createElementNS("http://www.w3.org/2000/svg","text");e.setAttribute("class","chart-axis-label"),e.setAttribute("x",-10),e.setAttribute("y",h(t)),e.setAttribute("text-anchor","end"),e.setAttribute("dominant-baseline","middle"),e.textContent=`${t}%`,A.appendChild(e)})}let e=document.querySelector(".compliance-chart"),r=document.querySelector(".billing-chart");e&&t(e,[{month:"Jan",score:45},{month:"Feb",score:52},{month:"Mar",score:63},{month:"Apr",score:71},{month:"May",score:78},{month:"Jun",score:86}],{valueKey:"score",color:"#34D399",id:"compliance"}),r&&t(r,[{month:"Jan",accuracy:55},{month:"Feb",accuracy:65},{month:"Mar",accuracy:72},{month:"Apr",accuracy:80},{month:"May",accuracy:88},{month:"Jun",accuracy:95}],{valueKey:"accuracy",color:"#0B4B3F",id:"billing"})}(),function(){let t=document.querySelectorAll(".step-nav-button"),e=document.querySelectorAll(".step-panel"),r=document.querySelectorAll(".before-after-toggle .toggle-btn");t.length>0&&e.length>0&&(t[0].classList.add("active"),e[0].classList.add("active")),t.forEach((r,a)=>{r.addEventListener("click",()=>{t.forEach(t=>t.classList.remove("active")),e.forEach(t=>t.classList.remove("active")),r.classList.add("active"),e[a].classList.add("active")})}),r.forEach(t=>{t.addEventListener("click",()=>{t.closest(".before-after-toggle").querySelectorAll(".toggle-btn").forEach(t=>t.classList.remove("active")),t.classList.add("active");let e=t.closest(".step-visual").querySelector(".visual-container");"before"===t.dataset.state?(e.style.opacity="0.7",setTimeout(()=>{e.style.opacity="1"},300)):(e.style.opacity="0.7",setTimeout(()=>{e.style.opacity="1"},300))})});let a=new IntersectionObserver(t=>{t.forEach(t=>{t.isIntersecting&&(t.target.style.opacity="1",t.target.style.transform="translateY(0)")})},{threshold:.1});e.forEach(t=>{t.style.opacity="0",t.style.transform="translateY(20px)",a.observe(t)})}(),function(){let t=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){var r;let a=e.target,o=a.querySelector(".metric-number"),n=parseFloat(a.dataset.count),s=(null===(r=o.textContent.match(/[+%]/))||void 0===r?void 0:r[0])||"";o.dataset.suffix=s,function(t,e,r=2e3){let a=e/(r/16),o=0;!function r(){o=Math.min(o+a,e),e%1==0?t.textContent=Math.floor(o)+(t.dataset.suffix||""):t.textContent=o.toFixed(1)+(t.dataset.suffix||""),o<e&&requestAnimationFrame(r)}()}(o,n),t.unobserve(a)}})},{threshold:.2});document.querySelectorAll(".metric-card").forEach(e=>{t.observe(e)})}()}),document.addEventListener("DOMContentLoaded",function(){let t=document.querySelector(".navbar"),e=0,r=!1;window.addEventListener("scroll",()=>{r||(window.requestAnimationFrame(()=>{let a=window.pageYOffset;Math.abs(a-e)>50&&(a>e&&a>80?t.classList.add("scrolled"):t.classList.remove("scrolled"),e=a),r=!1}),r=!0)},{passive:!0});let a=document.querySelector(".mobile-toggle"),o=document.querySelector(".nav-links");null==a||a.addEventListener("click",function(){this.classList.toggle("active"),o.classList.toggle("active"),document.body.classList.toggle("menu-open")}),document.addEventListener("click",t=>{o.contains(t.target)||a.contains(t.target)||(a.classList.remove("active"),o.classList.remove("active"),document.body.classList.remove("menu-open"))})}),document.addEventListener("DOMContentLoaded",()=>{let t=document.querySelectorAll(".toggle-button"),e=document.querySelectorAll(".content-panel");t.forEach(r=>{r.addEventListener("click",()=>{let a=r.getAttribute("data-target");t.forEach(t=>t.classList.remove("active")),r.classList.add("active"),e.forEach(t=>{t.id===`${a}-content`?(t.classList.add("active"),t.style.opacity="0",t.style.transform="translateY(20px)",setTimeout(()=>{t.style.opacity="1",t.style.transform="translateY(0)"},50)):t.classList.remove("active")})})});let r=document.querySelector(".content-panel");r&&(r.style.opacity="1",r.style.transform="translateY(0)")}),document.addEventListener("DOMContentLoaded",()=>{let t=(t,e)=>{let r=document.querySelector(t);r&&e(r)};t(".navbar",t=>{window.addEventListener("scroll",()=>{window.scrollY>50?t.classList.add("scrolled"):t.classList.remove("scrolled")})}),t(".mobile-menu-toggle",t=>{let e=document.querySelector(".mobile-menu"),r=document.querySelector(".mobile-menu-overlay");e&&r&&(t.addEventListener("click",()=>{e.classList.toggle("active"),r.classList.toggle("active"),document.body.classList.toggle("menu-open")}),r.addEventListener("click",()=>{e.classList.remove("active"),r.classList.remove("active"),document.body.classList.remove("menu-open")}))})});
//# sourceMappingURL=404.1c9f2a78.js.map
