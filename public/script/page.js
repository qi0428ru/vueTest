var Vue = require('vue');

new Vue({
   el: '#pageCount',
   data: {
      pageCount: 10,
      activeNumber: 1
   },
   methods: {
      changeActive(n) {
         this.activeNumber = n+1;
      }
   }
})