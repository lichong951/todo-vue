<template>
  <div id="app">
     <van-sidebar v-model="activeKey" @change="onChange">
        <van-sidebar-item title="任务列表" badge="5" />
        <van-sidebar-item title="统计"  />
      </van-sidebar>
        <router-view></router-view>
 <!-- <van-tabbar route>
          <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
          <van-tabbar-item replace to="/add" icon="plus">发布</van-tabbar-item>
        </van-tabbar> -->
  
  </div>
</template>

<script>
import { Button, Tabbar, TabbarItem, Sidebar, SidebarItem, Notify } from "vant";
export default {
  name: "App",
  components: {
    [Button.name]: Button,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Sidebar.name]: Sidebar,
    [SidebarItem.name]: SidebarItem,
    [Notify.name]: Notify
  },
  data() {
    return {
      activeKey: 0
    };
  },
  methods: {
    onChange(index) {
      Notify({ type: "primary", message: index });
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  
}

.frame {
  display: flex;
  width: 100%;
}

.content{
  display: flex;
  flex:row;
}
</style>
