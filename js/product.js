console.clear();
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';
// 產品資料格式

const app = {
  data() { // 資料集
    return {
      products:[],
      tempProduct:{},
      api_path:'ldddl',
      url:'https://vue3-course-api.hexschool.io/v2',
      testData:{},
    };
  },
  methods:{ // 方法集
    checkLogin(){
      axios.post(`${this.url}/api/user/check`)
        .then((result) => {
          // console.log(result)
          // 成功顯示產品
          this.getProducts();
        }).catch((err) => {
          console.log(err)
          // 失敗導回登入頁面
          window.location.href = 'index.html';
        });
    },
    getProducts(){
      axios.get(`${this.url}/api/${this.api_path}/admin/products/all`)
        .then((result) => {
          console.log(result);
          this.products = result.data.products;
        }).catch((err) => {
          console.log(err);
        });
    }
  },
  mounted(){ // 生命週期
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common['Authorization'] = token;
    this.checkLogin();
  }
}
createApp(app).mount("#app");
