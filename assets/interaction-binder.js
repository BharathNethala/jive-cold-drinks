/* GLOBAL INTERACTION BINDER - added by assistant */
(function(){
  if (window.__VS_INTERACTION_BINDER_APPLIED__) return;
  window.__VS_INTERACTION_BINDER_APPLIED__ = true;
  function safeQueryAll(selector, ctx=document){
    try { return Array.from(ctx.querySelectorAll(selector)); }
    catch(e){ return []; }
  }
  function smoothScrollTo(el){
    if(!el) return;
    if (el.scrollIntoView) {
      el.scrollIntoView({behavior: 'smooth', block: 'center'});
      try { el.focus({preventScroll:true}); } catch(e){ el.focus(); }
    }
  }
  function handleAnchorClick(e, a){
    var href = a.getAttribute('href') || '';
    if (href.startsWith('#')) {
      var id = href.slice(1);
      var target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        smoothScrollTo(target);
      }
    }
  }
  function handleDataTarget(e, el){
    var selector = el.getAttribute('data-target') || el.getAttribute('data-to') || el.getAttribute('data-scroll-to');
    if (!selector) return;
    var target = null;
    try { target = document.querySelector(selector); } catch(err){}
    if (target) {
      e.preventDefault();
      smoothScrollTo(target);
      setTimeout(function(){
        if (typeof target.click === 'function') {
          try { target.click(); } catch(err){}
        }
      }, 450);
    }
  }
  function addListener(el){
    if (!el) return;
    if (el.__vs_bound) return;
    el.__vs_bound = true;
    el.addEventListener('click', function(e){
      if (el.getAttribute('data-no-bind') === 'true') return;
      if (el.tagName.toLowerCase() === 'a') {
        handleAnchorClick(e, el);
        return;
      }
      if (el.hasAttribute('data-target') || el.hasAttribute('data-to') || el.hasAttribute('data-scroll-to')) {
        handleDataTarget(e, el);
        return;
      }
      var action = el.getAttribute('data-action');
      if (action) {
        var parts = action.split(':');
        var cmd = parts[0];
        var arg = parts.slice(1).join(':');
        if (cmd === 'scroll' && arg) {
          var t=null; try{ t = document.querySelector(arg); }catch(e){}
          if (t) { e.preventDefault(); smoothScrollTo(t); return; }
        }
        if (cmd === 'click' && arg) {
          var t=null; try{ t = document.querySelector(arg); }catch(e){}
          if (t) { e.preventDefault(); try{ t.click(); }catch(err){}; return; }
        }
        if (cmd === 'focus' && arg) {
          var t=null; try{ t = document.querySelector(arg); }catch(e){}
          if (t) { e.preventDefault(); try{ t.focus(); }catch(err){}; return; }
        }
      }
      var dh = el.getAttribute('data-href') || '';
      if (dh && dh.startsWith('#')) {
        var tid = dh.slice(1);
        var target=document.getElementById(tid);
        if (target){ e.preventDefault(); smoothScrollTo(target); return;}
      }
    }, {passive:false});
  }
  function bindAll() {
    safeQueryAll('a[href^="#"]').forEach(addListener);
    safeQueryAll('[data-target], [data-to], [data-scroll-to], [data-action], [data-href]').forEach(addListener);
    safeQueryAll('button, [role="button"], .btn, .button, .cta, .clickable').forEach(addListener);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindAll);
  } else {
    bindAll();
  }
  try {
    var mo = new MutationObserver(function(muts){
      var added = muts.some(function(m){ return m.addedNodes && m.addedNodes.length; });
      if (added) {
        setTimeout(bindAll, 100);
      }
    });
    mo.observe(document.documentElement || document.body, { childList:true, subtree:true });
  } catch(e){}
})();
