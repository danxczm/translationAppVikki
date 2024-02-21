"use strict";(self.webpackChunkvikkiapp=self.webpackChunkvikkiapp||[]).push([[352],{7271:(e,a,t)=>{t.d(a,{r:()=>n});var r=t(4702),i=t(2481),o=t(276);const s=(0,r.ZF)({apiKey:"AIzaSyBokfEKThRRoikn0hd38SAjRlQSGIEZ6nU",authDomain:"vikkiapp-e25a8.firebaseapp.com",projectId:"vikkiapp-e25a8",storageBucket:"vikkiapp-e25a8.appspot.com",messagingSenderId:"514557526949",appId:"1:514557526949:web:fe891132e8517b27109e4c",measurementId:"G-0YX54ER1NZ"}),n=(0,i.ad)(s);(0,o.cF)(s)},1352:(e,a,t)=>{t.r(a),t.d(a,{default:()=>p});var r=t(2791),i=t(5502),o=t(3034),s=t(3342),n=t(4488),l=t(8820),d=t(1087),c=t(9129),u=t(1545),h=t(184);const p=()=>{const e=(0,r.useRef)(),{data:a,isSuccess:t,isError:p,error:v}=(0,i.zj)(),[m,{isLoading:g,isSuccess:f}]=(0,i.Ek)();let y;return t?y=null===a||void 0===a?void 0:a.map((e=>(0,h.jsxs)("li",{className:"relative flex items-center w-full h-64 p-2 overflow-hidden border-4 rounded-lg bg-blue-300/10 group",children:[(0,h.jsx)("img",{loading:"lazy",className:"w-48 h-48 rounded-lg m-2 border-[0.35rem] border-gray-500/10 object-cover shadow-xl",src:null===e||void 0===e?void 0:e.picture,alt:null===e||void 0===e?void 0:e.word}),(0,h.jsxs)("div",{className:"flex flex-col h-48 gap-1",children:[(0,h.jsxs)("div",{className:"flex items-center gap-4",children:[(0,h.jsx)("div",{children:(0,h.jsx)(o.o_,{title:"Click to copy.",onClick:()=>(0,s.T)(null===e||void 0===e?void 0:e.word),minFontSizePx:"20",maxFontSizePx:"30",className:"font-semibold text-gray-700 cursor-pointer",mode:"multiple",children:null===e||void 0===e?void 0:e.word})}),(0,h.jsx)("div",{children:(0,h.jsx)(o.o_,{minFontSizePx:"12",maxFontSizePx:"16",className:"text-gray-700 ",children:null===e||void 0===e?void 0:e.phonetic})})]}),(0,h.jsx)("div",{className:"h-1 -mt-1 rounded-md bg-gradient-to-r from-gray-700 to-white w-96"}),(null===e||void 0===e?void 0:e.audio)&&(0,h.jsx)("audio",{controls:!0,className:"h-6",children:(0,h.jsx)("source",{src:null===e||void 0===e?void 0:e.audio})}),(0,h.jsx)("p",{className:"italic font-semibold underline",children:null===e||void 0===e?void 0:e.partOfSpeech}),(0,h.jsx)("div",{children:(0,h.jsx)(o.o_,{className:"text-gray-700",mode:"multiple",children:null===e||void 0===e?void 0:e.definition})})]}),(0,h.jsx)("button",{type:"button",onClick:()=>{(async e=>{try{await m(e).unwrap()}catch(v){console.log("Failed to delete the card: ",v)}})(null===e||void 0===e?void 0:e.id)},className:"absolute flex items-center justify-center w-8 h-8 transition bg-blue-200 rounded-full opacity-0 top-2 right-2 group-hover:opacity-100 hover:scale-125 active:scale-95",children:(0,h.jsx)(l.VPh,{color:"white"})}),(0,h.jsx)(d.rU,{className:"absolute flex items-center justify-center w-8 h-8 transition bg-blue-200 rounded-full opacity-0 top-2 right-12 group-hover:opacity-100 hover:scale-125 active:scale-95",to:"/flashCards/edit/".concat(null===e||void 0===e?void 0:e.id),children:(0,h.jsx)(l.$iz,{color:"white"})}),(0,h.jsx)("a",{rel:"noreferrer",target:"_blank",href:"https://dictionary.cambridge.org/dictionary/english/".concat(e.word),className:"absolute flex items-center justify-center w-8 h-8 transition bg-blue-200 rounded-full opacity-0 cursor-pointer top-2 right-24 group-hover:opacity-100 hover:scale-125 active:scale-95",children:(0,h.jsx)(c.Qa$,{color:"white"})}),(0,h.jsx)("a",{rel:"noreferrer",target:"_blank",href:"https://www.google.com.ua/search?q=".concat(e.word),className:"absolute flex items-center justify-center w-8 h-8 transition bg-blue-200 rounded-full opacity-0 cursor-pointer top-2 right-[135px] group-hover:opacity-100 hover:scale-125 active:scale-95",children:(0,h.jsx)(u.iQh,{size:"20px",color:"white"})})]},null===e||void 0===e?void 0:e.id))):p&&(y=(0,h.jsx)("p",{children:v})),(0,h.jsxs)("div",{children:[(0,h.jsx)("ul",{ref:e,className:"grid gap-4 xl:grid-cols-2 place-items-center",children:y}),(0,h.jsx)(n.Z,{flashCardsData:a,componentRef:e})]})}},4488:(e,a,t)=>{t.d(a,{Z:()=>n});var r=t(7692),i=t(1146),o=t.n(i),s=t(184);const n=e=>{let{flashCardsData:a,componentRef:t}=e;return(0,s.jsx)(o(),{trigger:()=>0!==(null===a||void 0===a?void 0:a.length)&&void 0!==a?(0,s.jsx)("div",{className:"sticky flex items-center justify-center w-40 mx-auto mt-10 bottom-5",children:(0,s.jsxs)("button",{className:"flex px-4 py-2 text-sm font-medium text-gray-800 bg-gray-200 rounded-md hover:bg-gray-300",children:[(0,s.jsx)(r.jC8,{size:"20px",className:"mr-2"}),(0,s.jsx)("p",{className:"font-semibold",children:"Save as PDF"})]})}):(0,s.jsx)(s.Fragment,{}),content:()=>t.current})}},5502:(e,a,t)=>{t.d(a,{bA:()=>v,Rf:()=>p,Ek:()=>m,zj:()=>u,vy:()=>h,NB:()=>g});var r=t(5745),i=t(2481),o=t(5294),s=t(9085);const n=async function(e){const a={method:"POST",url:"https://microsoft-translator-text.p.rapidapi.com/translate",params:{"to[0]":arguments.length>1&&void 0!==arguments[1]?arguments[1]:"en","api-version":"3.0"},headers:{"X-RapidAPI-Key":"32da4efdc7msh1edfa7d58e939cbp16f30fjsn436e11bb4d76"},data:[{Text:e}]};try{var t,r;const e=await(0,o.Z)(a);return null===e||void 0===e||null===(t=e.data[0])||void 0===t||null===(r=t.translations[0])||void 0===r?void 0:r.text.toLowerCase()}catch(i){return console.error("translateText",i),null}},l=async(e,a)=>{try{const t=await n(e,a);if(t===e)return s.Am.info("There is something wrong  in your text, it may be a typo or native and target languages are the same! \ud83c\udff3"),null;const r=await n(e),i=await(async e=>{try{var a,t,r;const i=await(0,o.Z)("".concat("https://api.unsplash.com","/search/photos?page=1&per_page=1&orientation=landscape&query=").concat(e,"&client_id=").concat("6EyRoATBcpWmJkTS4khOZ1RTxrmnbYFGBNdpq9ikI3I"));return(null===i||void 0===i||null===(a=i.data)||void 0===a||null===(t=a.results[0])||void 0===t||null===(r=t.urls)||void 0===r?void 0:r.regular)||"https://i.ibb.co/2NVKDq2/1.png"}catch(i){return console.error("fetchUnsplashPhoto",i),"https://i.ibb.co/2NVKDq2/1.png"}})(r),{phonetic:l,audio:d,partOfSpeech:c,definition:u}=await(async e=>{let a={phonetic:"",audio:"",partOfSpeech:"",definition:""};if(/\s/g.test(e))return a;try{var t,r,i,s,n,l,d,c;const u=await(0,o.Z)("https://api.dictionaryapi.dev/api/v2/entries/en/".concat(e));return a={phonetic:null!==(t=null===u||void 0===u||null===(r=u.data.find((e=>void 0!==e.phonetic)))||void 0===r?void 0:r.phonetic)&&void 0!==t?t:"/".concat(e,"/"),audio:null!==(i=null===u||void 0===u||null===(s=u.data[0].phonetics.find((e=>""!==e.audio)))||void 0===s?void 0:s.audio)&&void 0!==i?i:"",partOfSpeech:null!==(n=null===u||void 0===u||null===(l=u.data[0].meanings[0])||void 0===l?void 0:l.partOfSpeech)&&void 0!==n?n:"",definition:null!==(d=null===u||void 0===u||null===(c=u.data[0].meanings[0])||void 0===c?void 0:c.definitions[0].definition)&&void 0!==d?d:""},a}catch(u){return console.log("getDetails",u),a}})(r);return{word:e,translation:t,phonetic:l,audio:d,partOfSpeech:c,definition:u,picture:i}}catch(t){console.error("fetchMultipleData",t)}};var d=t(7271);const c=r.g.injectEndpoints({endpoints:e=>({getFlashCards:e.query({queryFn:async()=>{try{const e=await(0,i.PL)((0,i.hJ)(d.r,"flashCards"));return{data:e.docs.map((e=>({id:e.id,...e.data()})))}}catch(e){return{error:e}}},providesTags:["FlashCards"]}),getSingleFlashCard:e.query({queryFn:async e=>{try{const a=(0,i.JU)(d.r,"flashCards",e);return{data:(await(0,i.QT)(a)).data()}}catch(a){return{error:a}}},providesTags:["FlashCards"]}),clearFlashCards:e.mutation({queryFn:async()=>{try{const e=(await(0,i.PL)((0,i.hJ)(d.r,"flashCards"))).docs.map((e=>(0,i.oe)(e.ref)));return await Promise.all(e),{data:"ok"}}catch(e){return{error:e}}},invalidatesTags:["FlashCards"]}),addFlashCard:e.mutation({queryFn:async e=>{let{trimmedWord:a,language:t}=e;try{const e=await l(a,t);if(!e)return{data:"ok"};const r=(0,i.JU)((0,i.hJ)(d.r,"flashCards"),Date.now().toString());return await(0,i.pl)(r,{...e}),{data:"ok"}}catch(r){return{error:r}}},invalidatesTags:["FlashCards"]}),deleteFlashCard:e.mutation({queryFn:async e=>{try{return await(0,i.oe)((0,i.JU)(d.r,"flashCards",e)),{data:"ok"}}catch(a){return{error:a}}},invalidatesTags:["FlashCards"]}),updateFlashCard:e.mutation({queryFn:async e=>{let{flashCardId:a,newData:t}=e;try{return await(0,i.r7)((0,i.JU)(d.r,"flashCards",a),{...t}),{data:"ok"}}catch(r){return{error:r}}},invalidatesTags:["FlashCards"]})})}),{useGetFlashCardsQuery:u,useGetSingleFlashCardQuery:h,useClearFlashCardsMutation:p,useAddFlashCardMutation:v,useDeleteFlashCardMutation:m,useUpdateFlashCardMutation:g}=c},3342:(e,a,t)=>{t.d(a,{T:()=>o});var r=t(9085);const i={position:"top-right",autoClose:2e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!1,draggable:!0,progress:void 0,theme:"light"},o=async e=>(r.Am.success("The word is copied!",i),"clipboard"in navigator?await navigator.clipboard.writeText(e):document.execCommand("copy",!0,e))}}]);
//# sourceMappingURL=352.d53aa739.chunk.js.map