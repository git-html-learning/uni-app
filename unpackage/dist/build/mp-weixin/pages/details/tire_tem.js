(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/details/tire_tem"],{"0519":function(e,t,a){"use strict";a.r(t);var i=a("31e6"),n=a.n(i);for(var r in i)"default"!==r&&function(e){a.d(t,e,(function(){return i[e]}))}(r);t["default"]=n.a},"31e6":function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=n(a("a34a"));function n(e){return e&&e.__esModule?e:{default:e}}function r(e,t,a,i,n,r,s){try{var u=e[r](s),c=u.value}catch(o){return void a(o)}u.done?t(c):Promise.resolve(c).then(i,n)}function s(e){return function(){var t=this,a=arguments;return new Promise((function(i,n){var s=e.apply(t,a);function u(e){r(s,i,n,u,c,"next",e)}function c(e){r(s,i,n,u,c,"throw",e)}u(void 0)}))}}var u=function(){a.e("components/t-table/t-table").then(function(){return resolve(a("00dc"))}.bind(null,a)).catch(a.oe)},c=function(){a.e("components/t-table/t-th").then(function(){return resolve(a("dd7c"))}.bind(null,a)).catch(a.oe)},o=function(){a.e("components/t-table/t-tr").then(function(){return resolve(a("5067"))}.bind(null,a)).catch(a.oe)},d=function(){a.e("components/t-table/t-td").then(function(){return resolve(a("fb06"))}.bind(null,a)).catch(a.oe)},l={components:{tTable:u,tTh:c,tTr:o,tTd:d},data:function(){return{list:[{name:"胎1"},{name:"胎2"},{name:"胎3"},{name:"胎4"},{name:"胎5"},{name:"胎6"},{name:"胎7"},{name:"胎8"},{name:"胎9"},{name:"胎10"},{name:"胎11"},{name:"胎12"}],current:0,tableList:[{name:"胎1",temp:"20.0",pressure:"30",time:"2021-09-11 10:00:00"},{name:"胎2",temp:"21.0",pressure:"30",time:"2021-09-11 10:00:00"},{name:"胎3",temp:"20.0",pressure:"30",time:"2021-09-11 10:00:00"},{name:"胎4",temp:"20.0",pressure:"30",time:"2021-09-11 10:00:00"},{name:"胎5",temp:"20.0",pressure:"30",time:"2021-09-11 10:00:00"},{name:"胎6",temp:"20.0",pressure:"30",time:"2021-09-11 10:00:00"},{name:"胎7",temp:"20.0",pressure:"30",time:"2021-09-11 10:00:00"},{name:"胎8",temp:"20.0",pressure:"30",time:"2021-09-11 10:00:00"},{name:"胎9",temp:"20.0",pressure:"30",time:"2021-09-11 10:00:00"},{name:"胎10",temp:"20.0",pressure:"30",time:"2021-09-11 10:00:00"},{name:"胎11",temp:"20.0",pressure:"30",time:"2021-09-11 10:00:00"},{name:"胎12",temp:"20.0",pressure:"30",time:"2021-09-11 10:00:00"}],value:1,tire:"胎1",options:[{label:"胎1",value:1},{label:"胎2",value:2},{label:"胎3",value:3},{label:"胎4",value:4},{label:"胎5",value:5},{label:"胎6",value:6},{label:"胎7",value:7},{label:"胎8",value:8},{label:"胎9",value:9},{label:"胎10",value:10},{label:"胎11",value:11},{label:"胎12",value:12}],productKey:"",tireDkList:[],tireOriData:[],tireHandleData:[],hisDate:[],hisTemp:[],hisHumi:[],chartData:{categories:[],series:[{index:0,name:"",data:[]},{index:1,name:"",data:[]}]},chartOptions:{type:"line",dataLabel:!1,padding:[15,10,0,15],xAxis:{disableGrid:!0,labelCount:2},yAxis:{gridType:"dash",dashLength:2,showTitle:!0,data:[{position:"left",title:"胎温/℃"},{position:"right",title:"胎压/bar"}]},legend:{},extra:{line:{type:"straight",width:2}}}}},onShow:function(){this.productKey=e.getStorageSync("truck_productKey"),this.start()},methods:{start:function(){var e=this;return s(i.default.mark((function t(){var a,n;return i.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$api.getDeviceList(e.productKey);case 2:if(a=t.sent,200==a.code){for(n=0;n<a.data.deviceInfo.length;n++)"TireTempPress"==a.data.deviceInfo[n].deviceType&&e.tireDkList.push(a.data.deviceInfo[n].deviceKey);e.getTire()}case 4:case"end":return t.stop()}}),t)})))()},getTire:function(){var e=this;return s(i.default.mark((function t(){var a,n,r;return i.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$api.getDeviceData({productKey:e.productKey,deviceKeyList:e.tireDkList});case 2:if(a=t.sent,200==a.code){for(n=0;n<a.data.deviceData.length;n++)r={tire:a.data.deviceData[n].deviceName,tirePress:a.data.deviceData[n].tirePress,tireTemp:a.data.deviceData[n].tireTemp,time:a.data.deviceData[n].date,dk:a.data.deviceData[n].deviceKey},e.tireOriData.push(r);for(e.tireHandleData=JSON.parse(JSON.stringify(e.tireOriData)),e.tireHandleData.sort((function(e,t){var a=e.tire.toUpperCase(),i=t.tire.toUpperCase();return a<i?-1:a>i?1:0})),n=0;n<e.tireHandleData.length;n++)e.tireHandleData[n].tire="胎"+(n+1)}e.getHisData();case 5:case"end":return t.stop()}}),t)})))()},getHisData:function(){var e=this;return s(i.default.mark((function t(){var a,n;return i.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.hisDate=[],e.hisTireTemp=[],e.hisTirePress=[],t.next=5,e.$api.getDeviceHisData({productKey:e.productKey,deviceKey:e.tireHandleData[0].dk,num:10});case 5:if(a=t.sent,console.log(a),200==a.code)for(n=0;n<a.data.deviceData.length;n++)e.hisDate.push(a.data.deviceData[n].date),e.hisTireTemp.push(a.data.deviceData[n].tireTemp),e.hisTirePress.push(a.data.deviceData[n].tirePress);console.log(e.hisDate),console.log(e.hisTireTemp),console.log(e.hisTirePress),e.chartData.categories=e.hisDate,e.chartData.series[0].name="胎温",e.chartData.series[0].data=e.hisTireTemp,e.chartData.series[1].name="胎压",e.chartData.series[1].data=e.hisTirePress;case 16:case"end":return t.stop()}}),t)})))()},change:function(e){var t=this;this.current=e,this.hisDate=[],this.hisTireTemp=[],this.hisTirePress=[],console.log(this.tireHandleData[e]),this.tire="胎"+(e+1),this.$api.getDeviceHisData({productKey:this.productKey,deviceKey:this.tireHandleData[e].dk,num:10}).then((function(e){if(console.log(e),200==e.code){for(var a=0;a<e.data.deviceData.length;a++)t.hisDate.push(e.data.deviceData[a].date),t.hisTireTemp.push(e.data.deviceData[a].tireTemp),t.hisTirePress.push(e.data.deviceData[a].tirePress);t.chartData.categories=t.hisDate,t.chartData.series[0].name="胎温",t.chartData.series[0].data=t.hisTireTemp,t.chartData.series[1].name="胎压",t.chartData.series[1].data=t.hisTirePress}}))},edit:function(t){e.showToast({title:t.name,icon:"none"})}}};t.default=l}).call(this,a("543d")["default"])},"66e8":function(e,t,a){},8007:function(e,t,a){"use strict";(function(e){a("fae7");i(a("66fd"));var t=i(a("fd74"));function i(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,a("543d")["createPage"])},"9b68":function(e,t,a){"use strict";var i=a("66e8"),n=a.n(i);n.a},f398:function(e,t,a){"use strict";a.d(t,"b",(function(){return n})),a.d(t,"c",(function(){return r})),a.d(t,"a",(function(){return i}));var i={uTabs:function(){return a.e("uview-ui/components/u-tabs/u-tabs").then(a.bind(null,"db50"))},qiunDataCharts:function(){return Promise.all([a.e("common/vendor"),a.e("uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts")]).then(a.bind(null,"a084c"))}},n=function(){var e=this,t=e.$createElement,i=(e._self._c,a("5654"));e.$mp.data=Object.assign({},{$root:{m0:i}})},r=[]},fd74:function(e,t,a){"use strict";a.r(t);var i=a("f398"),n=a("0519");for(var r in n)"default"!==r&&function(e){a.d(t,e,(function(){return n[e]}))}(r);a("9b68");var s,u=a("f0c5"),c=Object(u["a"])(n["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],s);t["default"]=c.exports}},[["8007","common/runtime","common/vendor"]]]);