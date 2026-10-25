/* 灵机妙算变现模块：半遮挡付费墙 + 分享裂变 + 五行商品卡（结果页居中强推） + 分享海报 */
(function(){var s=document.createElement('style');s.textContent='.result-text{white-space:pre-wrap;word-break:break-word;font-size:15px;line-height:1.8;color:#efe9f7;margin:0 0 12px}.paywall-wrap{position:relative}.paywall-blur{filter:blur(6px);opacity:.55;max-height:120px;overflow:hidden;user-select:none;-webkit-user-select:none}.paywall-mask{position:absolute;left:0;right:0;bottom:0;padding:14px 12px 18px;text-align:center;background:linear-gradient(180deg,rgba(26,16,46,0),rgba(26,16,46,.95) 40%);border-radius:0 0 14px 14px}.paywall-tip{font-size:13px;color:#c9bce0;margin:6px 0 12px}.cta-share{background:linear-gradient(135deg,#8f7bd8,#6a4fd0)!important;color:#fff!important}.wx-card{margin:18px 0 6px;padding:16px;border-radius:14px;background:linear-gradient(135deg,rgba(245,215,142,.14),rgba(138,120,200,.14));border:1px solid rgba(245,215,142,.35);box-shadow:0 6px 24px rgba(245,215,142,.12)}.wx-title{font-size:17px;font-weight:800;color:#f5d78e;margin-bottom:8px}.wx-item{font-size:14px;color:#efe9f7;line-height:1.7;margin-bottom:6px}.wx-use{color:#c9bce0;font-size:13px}.wx-desc{font-size:12px;color:#a89db8;line-height:1.7;margin-bottom:10px}.poster-overlay{position:fixed;left:0;top:0;right:0;bottom:0;background:rgba(10,5,24,.92);z-index:9999;display:flex;align-items:center;justify-content:center;flex-direction:column;padding:16px}.poster-box{text-align:center;max-width:92vw;margin:0 auto}.poster-img{max-width:86vw;max-height:66vh;border-radius:14px;box-shadow:0 12px 40px rgba(0,0,0,.6)}.poster-tip{color:#c9bce0;font-size:13px;margin:12px 0}';document.head.appendChild(s);})();

var FULL_RESULT='',RESULT_UNLOCKED=false;
var WUXING_GOODS={'金':{name:'黄水晶貔貅手链',use:'补金聚财，稳固财库',price:'¥168'},'木':{name:'沉香手串',use:'补木生发，旺事业人缘',price:'¥268'},'水':{name:'黑曜石吊坠',use:'补水旺运，化煞挡灾',price:'¥128'},'火':{name:'南红玛瑙手串',use:'补火旺运，添贵人缘',price:'¥198'},'土':{name:'蜜蜡平安扣',use:'补土稳运，安神定心',price:'¥238'}};
var POSTER_QR='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARgAAAEYAQMAAAC9QHvPAAAABlBMVEX///8AAABVwtN+AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABgUlEQVRoge2ZPW7DMAyFGXjI2CP4KD5afTQdxUfI2MEwI/7aSJsOiawsj0CASPi0kOYjRRHB+tjEboUu9VdtXInLNbZXMG2Ym/lbt8sX80wDE1032x7BtGIG9bjGwlyvBzaN0gzmI4zGa6Vv5cCcxvhi1miA+QhDh1TQRT1UnukYmFeZrLnKDOr+p3UZzKvMgw3+mf9nYE5iJo+KRUfFSOznYoVhAdOKkTLLrHBx52dzD6YnQ7XN52WIEHm4FM5mCEwDhiwV6h/v50fnWArwCKYNM+nS700Wi1V2t+wuwXRjtOUR/al5wd7P+4GsBWAaMKLmmhtbHlAxYg79AdOLyWurzRNEo0ywdo0C04Ah9bjVXIqFWJ4G8z6zm15bveYKPPHvSxaYM5mJ3WJuI/Kfw4VjXQbzFpPzsViMMZTcYwGmE3OYz+s8YYmZwkHHwLRlpJ3JRoc58wJMU6b4hdZnBX+/SYE5jwn9Ob6DcMQKTCsmNuyJycusXmj3vADThYH1sDs1/u0aIO5K9gAAAABJRU5ErkJggg==';

function escH(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}

function detectWuxing(t){var m=t.match(/(?:缺|所缺|不足)([金木水火土])/);if(m)return m[1];m=t.match(/(?:喜用神|喜神|用神)[为：:]?\s*([金木水火土])/);if(m)return m[1];var best='金',n=1e9;'金木水火土'.split('').forEach(function(c){var k=t.split(c).length-1;if(k<n){n=k;best=c}});return best;}

function buildWuxingCard(t){var wx=detectWuxing(t);var g=WUXING_GOODS[wx];return '<div class="wx-card"><div class="wx-title">🎯 您命里缺「'+wx+'」· 宜戴'+g.name+'补运</div><div class="wx-item"><strong>'+g.name+'</strong>　<span style="color:#f5d78e">'+g.price+'</span><br><span class="wx-use">'+g.use+'</span></div><div class="wx-desc">综合测算结果，您命理所缺五行为「'+wx+'」，建议佩戴对应开运物补益运势，好物铺子已备好同款。</div><a href="javascript:void(0)" class="cta-btn" onclick="copyWechatPay()">🛍 去好物铺子下单 · 微信 ljmiaosuan</a></div>';}

function renderPaywall(text){FULL_RESULT=text;var el=document.getElementById('result-body');var t=escH(text);var card=buildWuxingCard(text);if(RESULT_UNLOCKED){el.innerHTML='<pre class="result-text">'+t+'</pre>'+card;return;}var cut=Math.max(Math.floor(t.length*0.6),60);el.innerHTML='<pre class="result-text">'+t.slice(0,cut)+'</pre><div class="paywall-wrap"><pre class="result-text paywall-blur">'+t.slice(cut)+'</pre><div class="paywall-mask"><div style="font-size:26px">🔒</div><div class="paywall-tip">后半段为完整解读（含【总结】与开运建议）</div><a href="javascript:void(0)" class="cta-btn cta-share" onclick="shareUnlock()">📤 分享给 TA 免费解锁</a></div></div>'+card;}

function unlockFull(){if(typeof copyWechatPay==='function')copyWechatPay();if(confirm('已复制师傅微信 ljmiaosuan\n\n① 微信转账 ¥9.9\n② 发送"已付款"获取完整报告\n\n（演示模式：点【确定】立即解锁）')){RESULT_UNLOCKED=true;renderPaywall(FULL_RESULT);}}

function fallbackCopy(t){var a=document.createElement('textarea');a.value=t;a.style.cssText='position:fixed;opacity:0';document.body.appendChild(a);a.select();try{document.execCommand('copy')}catch(e){}document.body.removeChild(a);}

function shareUnlock(){var txt='🔮 我在【灵机妙算】测了八字运势，AI命理超准！合婚/姓名/手相都能免费测 👉 https://lingjims.pages.dev';var done=function(){RESULT_UNLOCKED=true;renderPaywall(FULL_RESULT);alert('📤 分享文案已复制，发给好友或朋友圈即可\n完整版已解锁！')};if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(txt).then(done).catch(function(){fallbackCopy(txt);done()})}else{fallbackCopy(txt);done()}}

/* ===== 结果海报：带二维码的结果海报，长按保存转发引流 ===== */
function wrapText(x,t,a,b,maxW,lh){var line='',y=b;for(var i=0;i<t.length;i++){var ch=t[i];if(x.measureText(line+ch).width>maxW){x.fillText(line,a,y);y+=lh;line=ch;}else{line+=ch;}}if(line)x.fillText(line,a,y);}

function closePoster(){var d=document.getElementById('poster-overlay');if(d&&d.parentNode)d.parentNode.removeChild(d);}

function showPosterImg(url){closePoster();var d=document.createElement('div');d.id='poster-overlay';d.className='poster-overlay';d.innerHTML='<div class="poster-box"><img class="poster-img" src="'+url+'" alt="结果海报"/><div class="poster-tip">长按图片保存 · 分享到朋友圈或好友</div><button class="submit-btn" style="background:linear-gradient(135deg,#6a5f7a,#3a2a5e);font-size:14px;padding:10px 26px;" onclick="closePoster()">关闭</button></div>';document.body.appendChild(d);}

function showPoster(){
 try{
  var raw=String(FULL_RESULT||(document.getElementById('result-body')||{}).textContent||'').replace(/\s+/g,' ').trim();
  if(!raw)raw='快来灵机妙算，测一测你的运势走向';
  var W=750,H=1000,cv=document.createElement('canvas');cv.width=W;cv.height=H;
  var x=cv.getContext('2d');
  var g=x.createLinearGradient(0,0,W,H);g.addColorStop(0,'#2b1a52');g.addColorStop(.55,'#1a102e');g.addColorStop(1,'#3a2a5e');
  x.fillStyle=g;x.fillRect(0,0,W,H);
  x.strokeStyle='#f5d78e';x.lineWidth=5;x.strokeRect(22,22,W-44,H-44);
  x.textAlign='center';
  x.fillStyle='#f5d78e';x.font='bold 54px sans-serif';x.fillText('灵机妙算',W/2,125);
  x.fillStyle='#c9bce0';x.font='26px sans-serif';x.fillText('知命 · 改运 · 乐活',W/2,175);
  x.strokeStyle='rgba(245,215,142,.45)';x.lineWidth=2;x.beginPath();x.moveTo(120,212);x.lineTo(W-120,212);x.stroke();
  x.fillStyle='#efe9f7';x.font='30px sans-serif';x.fillText('测了运势 · 结果超准',W/2,272);
  x.fillStyle='rgba(255,255,255,.08)';x.fillRect(60,305,W-120,215);
  x.fillStyle='#efe9f7';x.font='27px sans-serif';x.textAlign='left';
  wrapText(x,raw.slice(0,92)+(raw.length>92?'……':''),95,360,W-190,42);
  var wx=detectWuxing(raw),gd=WUXING_GOODS[wx];
  x.textAlign='center';x.fillStyle='#f5d78e';x.font='bold 28px sans-serif';
  x.fillText('命理所缺五行为「'+wx+'」· 宜戴'+gd.name,W/2,590);
  x.fillStyle='#ffffff';x.fillRect(W/2-108,628,216,216);
  var img=new Image();
  img.onload=function(){
   x.drawImage(img,W/2-95,641,190,190);
   x.fillStyle='#c9bce0';x.font='24px sans-serif';x.textAlign='center';
   x.fillText('扫码免费测算八字 · 合婚 · 姓名 · 手相',W/2,905);
   x.fillStyle='#f5d78e';x.font='22px sans-serif';x.fillText('lingjims.pages.dev',W/2,950);
   showPosterImg(cv.toDataURL('image/png'));
  };
  img.onerror=function(){
   x.fillStyle='#c9bce0';x.font='26px sans-serif';x.textAlign='center';
   x.fillText('访问 lingjims.pages.dev 免费测算',W/2,755);
   showPosterImg(cv.toDataURL('image/png'));
  };
  img.src=POSTER_QR;
 }catch(e){alert('海报生成失败：'+e.message);}
}
