<template>
   <!-- 面包屑 -->
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <!-- 这是第三步使用rights.vue父组件传来的数据 -->
    <el-breadcrumb-item>{{level1}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{level2}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  // 给组件起名，让使用者使用时按照自己设计的组件名字去使用
  name:'my-bread',
  //相当于子组件，第一步定义数据,第二步是使用该组件时，给该组件赋值（在rights.vue组件实现）
  props:['level1','level2'],
  methods:{
   
  }
}
</script>

<style>

</style>
