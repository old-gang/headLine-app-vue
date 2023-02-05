import { createApp } from 'vue';
import App from './App.vue';

// 引入路由
import router from './router';

// 引入仓库
import pinia from './store';

// 全局引入vant组件库
import Vant from 'vant';
// 引入组件库样式
import 'vant/lib/index.css';
// 自动设置rem基准值
import 'amfe-flexible';

// 引入字体样式
import '@/assets/css/icon.less';
// 引入全局样式
import '@/assets/css/index.less';

const app = createApp(App);
// 全局注册vant
app.use(Vant);
// 注册路由
app.use(router);
// 注册仓库
app.use(pinia);

app.mount('#app');
