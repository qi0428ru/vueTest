var Vue = require('vue');

//双向绑定
new Vue({
   el: '#demo',
   data: {
       message: 'Hello Vue.js!!!'
   }
})
//渲染列表
new Vue({
   el: '#list',
   data: {
      todos: [
         { text: 'Learn JavaScript' },
         { text: 'Learn Vue.js' },
         { text: 'Build Something Awesome' }
      ]
   }
})
//点击事件
new Vue({
   el: '#clickMethod',
   data: {
      message: 'Hello Vue.js!'
   },
   methods: {
      reverseMessage: function(){
         this.message = this.message.split('').reverse().join('');
      }
   }
});
//综合事件
new Vue({
   el: '#test',
   data: {
      newTodo: '',
      todos: [
         {text: 'hahahahah'}
      ]
   },
   methods: {
      addTodo: function(){
         var text = this.newTodo.trim();
         if(text){
            this.todos.push({text: text});
            this.newTodo = '';
         }
      },
      removeTodo: function(index){
         this.todos.splice(index,1);
      },
      removeTodoNew: function(item){
         this.todos.$remove(item);
      }
   }
});

/**********************************Vue实例****************************************************/

//测试响应属性
//只有被代理的属性是响应的，实例创建后添加新的属性到实例上，不会触发视图更新
var data = {a: 1};
var vm = new Vue({
   el: '#testResponse',
   data: data
});
console.log(vm.a === data.a);//true
vm.b= 2;
console.log(data.b);//undefined
console.log(vm.b);//2
console.log(data);//object
console.log(vm);//Vue
console.log(data.b === vm.b);//false

/**********************************数据绑定*****************************************/
new Vue({
   el: '#data_html',
   data:{
      show_html: '<script>alert(ssss)</script>',
      id: 'showInput',
      url: 'http://baidu.com'
   },
   methods: {
      doSomething: function(){
         alert('sss')
      }
   }
});

/**********************************计算属性*********************************************/

var computedExam = new Vue({
   el: '#computeExample',
   data: {
      a: 1
   },
   computed: {
      b: function(){
         return this.a+1;
      }
   }
});

/***********************************条件渲染****************************************/

new Vue({
   el: '#conditionRender',
   data: {
      ok: true,
      ok1: false
   }
});

/***********************************列表渲染***********************************/

new Vue({
   el: '#listRender',
   data: {
      items: [
         {message: 'Foo'},
         {message: 'Bar'}
      ],
      object: {
         FirstName: 'John',
         LastName: 'Doe',
         Age: 30
      }
   }
});

/************************************方法和事件处理器*****************************/

new Vue({
   el: '#methodEvent',
   data: {
      name: 'Vue.js'
   },
   methods: {
      greet: function(evt){
         alert('Hello ' + this.name + '!');
         alert(event.target.tagName);
      },
      say: function(msg){
         alert(msg);
      },
      doThis: function(){
         alert('阻止冒泡');
      },
      onSubmit: function(){
         alert('阻止默认事件');
      },
      doThat: function(){
         alert('自己事件');
      },
      submit: function(){
         alert('按键值');
      }
   }
});

/**************************************表单控件*******************************/

new Vue({
   el: '#formComponent',
   data: {
      message: 'init value',
      checked: false,
      checkedNames: [],
      selectedMulti: [],
      selectedAnimation: 'A',
      toggle:'a',
      a: 'a',
      b: 'b',
      options:[
         {text:'One',value: 'A'},
         {text:'Two',value: 'B'},
         {text:'Three',value: 'C'}
      ]
   }
});

/***************************************过渡***************************************/

new Vue({
   el: '#cssTransition',
   data: {
      show: true,
      jquery: '',
      list: [
         {text:"Bruce Lee"},
         {text:"Jackie Chan"},
         {text:"Chuck Norris"},
         {text:"Jet Li"},
         {text:"Kung Fury"}
      ]
   },
   methods: {
      changeShow: function(){
         if(this.show){
            this.show = false;
         }else{
            this.show = true;
         }
         //alert(this.show)
      }
   }
});

/*************************************组件************************************/

//注册方式1
var myComponent = Vue.extend({
   template: '<div>A custom component!</div>'
});
Vue.component('my-component', myComponent);
//注册方式2
Vue.component('my-component', {
   template: '<div>A custom componentddd!</div>'
});
//数据传递
Vue.component('child', {
   props: ['msg'],
   template: '<span>{{msg}}</span>'
});
//数据传递
Vue.component('my-child', {
   props: ['myMessage'],//使用组件时，不区分大小写，需要添加连词符
   template: '<span>{{myMessage}}</span>'
});
new Vue({
   el: '#component'
});
//父子组件通信
Vue.component('child-component', {
   template: '#child-template',
   data: function() {
      return {msg: 'hello'}
   },
   methods: {
      notify: function(){
         if (this.msg.trim()) {
           this.$dispatch('child-msg', this.msg);
           this.msg = '';
         }
      }
   }
})
new Vue({
   el: '#events-example',
   data: {
      messages: [],
      msg: 'qqq'
   },
   /*events: {
      'child-msg': function(msg){
         this.messages.push(msg);
      }
   }*/
   methods: {
      handleIt: function(msg){
         this.messages.push(msg);
      }
      
   }
});
//动态组件
var animateComponent = Vue.extend({
   props: ['animateValue'],
   template: '<span >{{animateValue}}</span>'
});
new Vue({
   el: '#animation-component',
   data: {
      view2: 'view2',
      animateValue: 'ComponentA'
   },
   components: {
      'view2': animateComponent,
      'view1': {
         template: '#animate-child1',
         data: function(){
            return {animateValue:'Component1'}
         }
      }
   }
});

new Vue({
   el: '#trueExample',
   data: {
      view: 'v-a'
   },
   components: {
      'v-a': {
         template: '<div>ComponentA</div>'
      },
      'v-b': {
         template: '<div>ComponentB</div>'
      }
   }
});

/***************************************other content***************************************/
new Vue({
   el: '#otherCotent',
   data: {
      items: [
         {text: 'AAAA'},
         {text: 'BBBB'},
         {text: 'CCCC'},
         {text: 'DDDD'}
      ],
      myComponent:'my-component'
   },
   components: {
      'my-component': {
         props: ['item'],
         template: '<li>{{item.text}}</li>'
      }
   }
});
