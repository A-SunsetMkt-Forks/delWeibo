// ==UserScript==
// @name         批量删除新浪微博博文
// @namespace    https://github.com/dxhuii/delWeibo
// @version      1.1.3
// @author       plain
// @description  批量删除新浪微博
// @license      MIT
// @icon         https://weibo.com/favicon.ico
// @match        *://weibo.com/*/profile?*
// @match        *://weibo.com/u/*
// @match        *://weibo.com/fav*
// @match        *://weibo.com/u/page/fav/*
// @require      https://cdn.jsdelivr.net/npm/vue@3.3.2/dist/vue.global.prod.js
// ==/UserScript==

(o=>{const e=document.createElement("style");e.dataset.source="vite-plugin-monkey",e.textContent=o,document.head.append(e)})(" .del-weibo[data-v-1534c272]{position:fixed;right:0;top:50%;transform:translateY(-50%);z-index:9999999;background-color:#ff8200;color:#fff;padding:6px 16px;border:none;border-radius:100px 0 0 100px;cursor:pointer}.del-weibo-end[data-v-1534c272]{background-color:#ff84007a} ");

(function (vue) {
  'use strict';

  const _sfc_main$1 = /* @__PURE__ */ vue.defineComponent({
    __name: "DelWeibo",
    setup(__props) {
      const start = vue.ref(0);
      const count = vue.ref(0);
      function $(elem) {
        return document.querySelector(elem);
      }
      function $All(elem) {
        return document.querySelectorAll(elem);
      }
      function $$(elem, el) {
        return $(elem).querySelectorAll(el)[1];
      }
      function del() {
        const url = window.location.href;
        for (let i = 0; i < 1e3; i++) {
          setTimeout(function() {
            if (url.indexOf("//weibo.com/u/page/fav/") !== -1) {
              if ($('i[title="更多"]')) {
                $('i[title="更多"]').click();
                $All(".woo-pop-item-main")[0].click();
                if ($(".woo-dialog-ctrl")) {
                  $$(".woo-dialog-ctrl", ".woo-button-main").click();
                }
                i > 5 && window.location.reload();
              }
            }
            if (url.indexOf("/profile") !== -1) {
              if ($('a[action-type="fl_menu"]')) {
                $('a[action-type="fl_menu"]').click();
                $('a[title="删除此条微博"]').click();
                $('a[action-type="ok"]').click();
                $('a[title="取消快转"]').click();
              }
            }
            if (url.indexOf("//weibo.com/fav") !== -1) {
              if ($('a[action-type="fl_favorite"]')) {
                $('a[action-type="fl_favorite"]').click();
                $('a[action-type="ok"]').click();
              }
            }
            if (url.indexOf("//weibo.com/u/") !== -1) {
              if ($(".vue-recycle-scroller__item-view .deletedToolbar_toolbarFull_1dOfW span")) {
                $(".deletedToolbar_toolbarFull_1dOfW span").click();
                $(".vue-recycle-scroller__item-view .deletedToolbar_toolbarFull_1dOfW").remove();
              } else {
                if ($('i[title="更多"]') || $('i[title="负反馈"]')) {
                  if ($('i[title="更多"]')) {
                    $('i[title="更多"]').click();
                  }
                  if ($('i[title="负反馈"]')) {
                    $('i[title="负反馈"]').click();
                  }
                  const item = $All(".woo-pop-item-main");
                  if (item.length) {
                    if (item.length > 3) {
                      item.forEach((item2) => item2.innerText === "删除" && item2.click());
                      count.value = 0;
                    } else {
                      item.forEach((item2) => item2.innerText === "取消快转" && item2.click());
                      setTimeout(() => {
                        count.value = 1;
                      }, 1e3);
                    }
                  }
                  $(".woo-dialog-ctrl") && $$(".woo-dialog-ctrl", ".woo-button-main").click();
                  if ($(".deletedToolbar_toolbarFull_1dOfW")) {
                    $(".deletedToolbar_toolbarFull_1dOfW").click();
                  }
                  if (count.value) {
                    count.value = 0;
                    setTimeout(() => {
                      window.location.reload();
                    }, 1e3);
                  }
                  i > 160 && window.location.reload();
                }
              }
            }
          }, 1e3 * i);
        }
      }
      const onStart = () => {
        console.log("开始");
        localStorage.delWeibo = "start";
        start.value = 1;
        del();
      };
      const onEnd = () => {
        console.log("结束");
        localStorage.delWeibo = "end";
        start.value = 0;
        window.location.reload();
      };
      vue.watchEffect(() => {
        if (localStorage.delWeibo === "start") {
          del();
          start.value = 1;
        }
      });
      return (_ctx, _cache) => {
        return start.value ? (vue.openBlock(), vue.createElementBlock("button", {
          key: 0,
          class: vue.normalizeClass(["del-weibo", { "del-weibo-end": start.value }]),
          onClick: onEnd
        }, "结束", 2)) : (vue.openBlock(), vue.createElementBlock("button", {
          key: 1,
          class: "del-weibo",
          onClick: onStart
        }, "开始删除"));
      };
    }
  });
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const DelWeibo = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-1534c272"]]);
  const _sfc_main = /* @__PURE__ */ vue.defineComponent({
    __name: "App",
    setup(__props) {
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createBlock(DelWeibo);
      };
    }
  });
  vue.createApp(_sfc_main).mount(
    (() => {
      const app = document.createElement("div");
      document.body.append(app);
      return app;
    })()
  );

})(Vue);
