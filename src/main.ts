import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';

const vm = createApp(App);

// Plugins:

vm.use(router);

// Mount:

vm.mount('#app');

export default vm;
