import { createApp } from 'vue'
import App from './App.vue'
import router from './router' //路由
import store from './store' //状态管理器
import '@/styles/index.scss' //初始化样式
import 'element-plus/dist/index.css' //element-plus组件样式
import SvgIcon from '@/icons' //SvgIcon
import '@/router/permission' //路由守卫
import * as ElIcons from '@element-plus/icons-vue' //图标
import i18n from '@/i18n' //中英文切换
import filters from './utils/filters' //时间格式化

const app = createApp(App)

for( const iconName in ElIcons) {
    app.component(iconName, ElIcons[iconName])
}

SvgIcon(app)
filters(app)

app.use(store).use(router).use(i18n).mount('#app')
