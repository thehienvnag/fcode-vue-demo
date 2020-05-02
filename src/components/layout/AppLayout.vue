
<template>
  <a-layout id="components-layout-demo-top" class="layout">
      <a-layout-header>
        <h3 style="color: white">
            {{ appName }}
        </h3>
      </a-layout-header>
      <a-layout-content class="bg-white">
          <student-list class="student-list"></student-list>
      </a-layout-content>
      <a-layout-footer class="bg-white" style="text-align: center">
          &copy; {{ currentYear }} {{ name }}
      </a-layout-footer>
  </a-layout>
</template>

<style>
    .bg-white{
        background-color: white;
    }
   .student-list{
       margin-top: 3em;
   }
</style>


<script>
    import Vue from 'vue';
    import { Layout } from "ant-design-vue";
    import StudentList from "../student-list/StudentList";
    import 'ant-design-vue/lib/layout/style/css';

    const {Header, Footer, Content} = Layout;
    Vue.use(Layout, Header, Content, Footer, StudentList);

    export default {
        name: 'app-layout',
        data: () => {
            return {
                appName: 'STUDENT MANAGEMENT',
                currentYear: new Date().getFullYear(),
                name: 'FCode - HienHT'
            }
        },
        components: {
            StudentList
        }
    }
</script>

