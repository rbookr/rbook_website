(window["wc_jsonp"] = window["wc_jsonp"] || []).push([[2],{

/***/ "13eb":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_loading_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("c3b1");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_loading_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_loading_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_loading_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_loading_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "292a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"41010616-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/pcsListByTags.vue?vue&type=template&id=506a2e9d&lang=pug&shadow
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"pcsListByTags"},[_c('loading',{attrs:{"show":_vm.loading}}),_c('button',{directives:[{name:"show",rawName:"v-show",value:(_vm.refresh),expression:"refresh"}],on:{"click":_vm.get_list}},[_vm._v("刷新")]),_c('table',[_vm._m(0),_c('tbody',_vm._l((_vm.list),function(item,idx){return _c('tr',[_c('td',[_vm._v(_vm._s(idx+1))]),_c('td',[_c('a',{attrs:{"href":(_vm.base + "article/" + (item._id)),"target":_vm.newTab=='true' ? '_blank' :'_self'}},[_vm._v(" "+_vm._s(item.title))])]),_c('td',_vm._l((item.head.source),function(source){return _c('a',{attrs:{"href":source.url,"target":"_blank"}},[_vm._v(_vm._s(source.oj))])}),0),_c('td',_vm._l((item.head.tags || []),function(tag){return _c('span',{style:({background:_vm.strToRGB(tag)})},[_vm._v(_vm._s(tag))])}),0),_c('td',[(item.head.video)?_c('a',{attrs:{"href":item.head.video}},[_vm._v("📺")]):_vm._e()]),_c('td',[_vm._v(_vm._s(item.head.comment || ""))])])}),0)])],1)}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('thead',[_c('tr',[_c('th',{staticStyle:{"width":"18px"}},[_vm._v("#")]),_c('th',[_vm._v("地址")]),_c('th',[_vm._v("题目")]),_c('th',[_vm._v("标签")]),_c('th',[_vm._v("视频")]),_c('th',[_vm._v("说明")])])])}]


// CONCATENATED MODULE: ./src/components/pcsListByTags.vue?vue&type=template&id=506a2e9d&lang=pug&shadow

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__("ddb0");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"41010616-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/pug-plain-loader!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/loading.vue?vue&type=template&id=779f53a2&lang=pug&
var loadingvue_type_template_id_779f53a2_lang_pug_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.show),expression:"show"}],staticClass:"load-wrap"},[_vm._m(0)])}
var loadingvue_type_template_id_779f53a2_lang_pug_staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"loading"},[_c('div',{staticClass:"ring-2"},[_c('div',{staticClass:"ball-holder"},[_c('div',{staticClass:"ball"})])])])}]


// CONCATENATED MODULE: ./src/components/loading.vue?vue&type=template&id=779f53a2&lang=pug&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--11-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/loading.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
/* harmony default export */ var loadingvue_type_script_lang_js_ = ({
  name: 'loading',
  props: {
    show: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {};
  },

  mounted() {},

  methods: {}
});
// CONCATENATED MODULE: ./src/components/loading.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_loadingvue_type_script_lang_js_ = (loadingvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/loading.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__("13eb")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_loadingvue_type_script_lang_js_,
  loadingvue_type_template_id_779f53a2_lang_pug_render,
  loadingvue_type_template_id_779f53a2_lang_pug_staticRenderFns,
  false,
  injectStyles,
  null,
  null
  ,true
)

/* harmony default export */ var loading = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--11-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/pcsListByTags.vue?vue&type=script&lang=js&shadow

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var pcsListByTagsvue_type_script_lang_js_shadow = ({
  name: 'pcsListByTags',
  components: {
    loading: loading
  },
  props: {
    "base": {
      type: String
    },
    "tags": {
      type: String
    },
    "match": {
      type: String,
      default: "tags"
    },
    "prefix": {
      type: String
    },
    "newTab": {
      type: String,
      default: 'true'
    },
    "excludeId": {
      type: String,
      default: '[]'
    }
  },

  data() {
    return {
      list: [],
      loading: true,
      refresh: false
    };
  },

  mounted() {
    this.get_list();
  },

  methods: {
    get_list(match_urls) {
      this.loading = true; //list_match_by_tags?tags

      let queryUrl = `${this.base}utils/list_match_by_${this.match}?${this.match}=${this.tags}`; //filter

      let excludeId = this.excludeId.split(",");
      return fetch(queryUrl).then(res => res.json()).then(data => {
        /*console.log(data)*/

        /*console.log(excludeId)*/
        this.list = data.articles.filter(({
          _id,
          extra_id = []
        }) => {
          if (excludeId.includes(_id)) return false;

          for (let eid of extra_id) {
            if (excludeId.includes(eid)) return false;
          }

          return true;
        });
        this.loading = false;
        this.refresh = false;
      }).catch(e => {
        this.refresh = true;
      });
    },

    strToRGB(i) {
      function hashCode(str) {
        // java String#hashCode
        var hash = 0;

        for (var i = 0; i < str.length; i++) {
          hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }

        return hash;
      }

      i = hashCode(i);
      var c = (i & 0x00FFFFFF).toString(16).toUpperCase();
      return '#' + "00000".substring(0, 6 - c.length) + c;
    }

  }
});
// CONCATENATED MODULE: ./src/components/pcsListByTags.vue?vue&type=script&lang=js&shadow
 /* harmony default export */ var components_pcsListByTagsvue_type_script_lang_js_shadow = (pcsListByTagsvue_type_script_lang_js_shadow); 
// CONCATENATED MODULE: ./src/components/pcsListByTags.vue?shadow



function pcsListByTagsshadow_injectStyles (context) {
  
  var style0 = __webpack_require__("9f46")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var pcsListByTagsshadow_component = Object(componentNormalizer["a" /* default */])(
  components_pcsListByTagsvue_type_script_lang_js_shadow,
  render,
  staticRenderFns,
  false,
  pcsListByTagsshadow_injectStyles,
  null,
  null
  ,true
)

/* harmony default export */ var pcsListByTagsshadow = __webpack_exports__["default"] = (pcsListByTagsshadow_component.exports);

/***/ }),

/***/ "6feb":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".pcsListByTags table{border-collapse:collapse;border-spacing:0;empty-cells:show;border:1px solid #cbcbcb}.pcsListByTags table thead{background-color:#e0e0e0;color:#000;text-align:left;vertical-align:bottom}.pcsListByTags table td,.pcsListByTags table th{border:1px solid #cbcbcb;border-width:0 0 1px 1px;margin:0;overflow:visible;padding:.4em 1em}.pcsListByTags span{display:inline-block;background:grey;padding:2px 3px;margin:0 3px;border-radius:3px;height:20px;line-height:20px;font-size:16px;color:#fff;font-weight:800}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "8ac6":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "@-webkit-keyframes loadingE{0{transform:rotate(0deg)}to{transform:rotate(1turn)}}@keyframes loadingE{0{transform:rotate(0deg)}to{transform:rotate(1turn)}}.load-wrap{text-align:center}.load-wrap .ring-2{position:relative;width:45px;height:45px;margin:0 auto;border:4px solid #4b9cdb;border-radius:100%}.load-wrap .ball-holder{position:absolute;width:12px;height:45px;left:17px;top:0}.load-wrap .ball{position:absolute;top:-11px;left:0;width:16px;height:16px;border-radius:100%;background:#4282b3}.load-wrap .ball-holder{-webkit-animation:loadingE 1.3s linear infinite;animation:loadingE 1.3s linear infinite}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "9f46":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_pcsListByTags_vue_vue_type_style_index_0_lang_scss_shadow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("fe4b");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_pcsListByTags_vue_vue_type_style_index_0_lang_scss_shadow__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_pcsListByTags_vue_vue_type_style_index_0_lang_scss_shadow__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_pcsListByTags_vue_vue_type_style_index_0_lang_scss_shadow__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_pcsListByTags_vue_vue_type_style_index_0_lang_scss_shadow__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "c3b1":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("8ac6");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("d7abfc48", content, shadowRoot)
};

/***/ }),

/***/ "fe4b":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("6feb");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to Shadow Root
var add = __webpack_require__("35d6").default
module.exports.__inject__ = function (shadowRoot) {
  add("4dac8ebc", content, shadowRoot)
};

/***/ })

}]);
//# sourceMappingURL=wc.2.js.map