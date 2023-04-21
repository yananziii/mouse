import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import 'font-awesome/css/font-awesome.min.css'
import service from './service'
import router from './router' 
import "lib-flexible/flexible.js"

/* 导入全局样式表 */
import './assets/css/global.css'

/* 限制输入框数字值的大小 */
import onlyNumber from '@/directive/el-input'; //添加此行=>自定义全局指令

Vue.prototype.service = service //挂载到原型，全局使用
Vue.config.productionTip = false

Vue.use(onlyNumber); //添加此行=>使用该全局指令

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
 
Vue.filter('dateFormat', function(originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})
//5秒能不能重复提交
Vue.directive('preventReClick',{
  inserted(el,binding){
    el.addEventListener('click',() => {
      if(!el.disabled){
        el.disabled = true
        setTimeout(() => {
          el.disabled = false
        }, binding.value || 5000)
      }
    })
  }
})