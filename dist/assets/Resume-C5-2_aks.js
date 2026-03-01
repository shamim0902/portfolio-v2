import{c as i,j as e,L as l,p as a,M as n,P as c,a as x,G as d,b as m,d as o}from"./index-D04u3QPR.js";/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=[["path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",key:"143wyd"}],["path",{d:"M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6",key:"1itne7"}],["rect",{x:"6",y:"14",width:"12",height:"8",rx:"1",key:"1ue0tg"}]],p=i("printer",h);function g(){const r=()=>{window.print()};return e.jsxs("div",{className:"min-h-screen bg-white text-black print:bg-white",children:[e.jsxs("div",{className:"no-print fixed top-4 right-4 z-50 flex gap-4",children:[e.jsx(l,{to:"/",className:"px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors",children:"Back to Portfolio"}),e.jsxs("button",{onClick:r,className:"flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors",children:[e.jsx(p,{size:18}),"Print / Save PDF"]})]}),e.jsxs("div",{className:"max-w-[210mm] mx-auto bg-white shadow-2xl print:shadow-none my-8 print:my-0 p-12 print:p-8",children:[e.jsxs("header",{className:"mb-8 pb-6 border-b-2 border-gray-200",children:[e.jsx("h1",{className:"text-4xl font-bold mb-2",children:a.name}),e.jsx("h2",{className:"text-xl text-gray-600 mb-4",children:a.title}),e.jsxs("div",{className:"grid grid-cols-2 gap-x-8 gap-y-2 text-sm",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(n,{size:16,className:"text-gray-500"}),e.jsx("a",{href:`mailto:${a.email}`,className:"text-gray-700 hover:text-cyan-600",children:a.email})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(c,{size:16,className:"text-gray-500"}),e.jsx("span",{className:"text-gray-700",children:a.phone})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(x,{size:16,className:"text-gray-500"}),e.jsx("span",{className:"text-gray-700",children:a.location})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(d,{size:16,className:"text-gray-500"}),e.jsx("a",{href:a.links.website,target:"_blank",rel:"noopener noreferrer",className:"text-gray-700 hover:text-cyan-600",children:a.links.website.replace("https://","")})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(m,{size:16,className:"text-gray-500"}),e.jsx("a",{href:a.links.github,target:"_blank",rel:"noopener noreferrer",className:"text-gray-700 hover:text-cyan-600",children:"GitHub Profile"})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(o,{size:16,className:"text-gray-500"}),e.jsx("a",{href:a.links.linkedin,target:"_blank",rel:"noopener noreferrer",className:"text-gray-700 hover:text-cyan-600",children:"LinkedIn Profile"})]})]})]}),e.jsxs("section",{className:"mb-8",children:[e.jsx("h3",{className:"text-xl font-bold mb-3 text-gray-900 border-b border-gray-300 pb-2",children:"Professional Summary"}),e.jsx("p",{className:"text-gray-700 leading-relaxed",children:a.about})]}),e.jsxs("section",{className:"mb-8",children:[e.jsx("h3",{className:"text-xl font-bold mb-3 text-gray-900 border-b border-gray-300 pb-2",children:"Experience"}),e.jsx("div",{className:"space-y-4",children:a.experience.map((s,t)=>e.jsxs("div",{children:[e.jsxs("div",{className:"flex justify-between items-start mb-1",children:[e.jsx("h4",{className:"font-bold text-gray-900",children:s.role}),e.jsx("span",{className:"text-sm text-gray-600",children:s.period})]}),e.jsx("p",{className:"text-gray-700 font-medium mb-2",children:s.company}),e.jsx("p",{className:"text-gray-600 text-sm leading-relaxed",children:s.description})]},t))})]}),e.jsxs("section",{className:"mb-8",children:[e.jsx("h3",{className:"text-xl font-bold mb-3 text-gray-900 border-b border-gray-300 pb-2",children:"Key Projects"}),e.jsx("div",{className:"space-y-4",children:a.projects.filter(s=>s.featured).map(s=>e.jsxs("div",{children:[e.jsxs("div",{className:"flex justify-between items-start mb-1",children:[e.jsx("h4",{className:"font-bold text-gray-900",children:s.title}),e.jsx("span",{className:"text-sm text-gray-600",children:s.year})]}),e.jsx("p",{className:"text-gray-700 text-sm mb-2",children:s.type}),e.jsx("p",{className:"text-gray-600 text-sm mb-2 leading-relaxed",children:s.description}),e.jsx("div",{className:"flex flex-wrap gap-2",children:s.tags.map(t=>e.jsx("span",{className:"px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded",children:t},t))})]},s.id))})]}),e.jsxs("section",{className:"mb-8",children:[e.jsx("h3",{className:"text-xl font-bold mb-3 text-gray-900 border-b border-gray-300 pb-2",children:"Technical Skills"}),e.jsx("div",{className:"flex flex-wrap gap-2",children:a.skills.map(s=>e.jsx("span",{className:"px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium",children:s},s))})]}),e.jsxs("section",{className:"mb-8 print:break-inside-avoid",children:[e.jsx("h3",{className:"text-xl font-bold mb-3 text-gray-900 border-b border-gray-300 pb-2",children:"Countries Visited"}),e.jsxs("p",{className:"text-gray-700 mb-2",children:["Experienced traveler with visits to ",a.countriesVisited.length," countries across multiple continents."]}),e.jsx("div",{className:"text-sm text-gray-600",children:a.countriesVisited.join(", ")})]})]}),e.jsx("style",{children:`
        @media print {
          .no-print {
            display: none !important;
          }
          
          body {
            background: white;
          }
          
          @page {
            size: A4;
            margin: 1cm;
          }
          
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .print\\:break-inside-avoid {
            break-inside: avoid;
          }
        }
      `})]})}export{g as default};
