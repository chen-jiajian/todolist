"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = require("vue");
require("./style.css");
var App_vue_1 = require("./App.vue");
var element_plus_1 = require("element-plus");
require("element-plus/dist/index.css");
var ElementPlusIconsVue = require("@element-plus/icons-vue");
var app = (0, vue_1.createApp)(App_vue_1.default);
app.use(element_plus_1.default);
for (var _i = 0, _a = Object.entries(ElementPlusIconsVue); _i < _a.length; _i++) {
    var _b = _a[_i], key = _b[0], component = _b[1];
    app.component(key, component);
}
app.config.globalProperties.$http = 'request';
app.mount("#app");
