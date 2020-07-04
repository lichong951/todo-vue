<template>
  <div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="item in list" :key="item.id" :title="item" @click="handelClick(item.id)">
        <div class="list">
          <img :src="item.img" alt />
        </div>
        <div class="right">
          <div class="title">{{item.title}}</div>
          <div class="create-time">{{item.createTime}}</div>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { List, Cell, Toast } from "vant";
import moment from 'moment';
export default {
  components: {
    [List.name]: List,
    [Cell.name]: Cell
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false
    };
  },
  methods: {
    handelClick(id) {
      this.$router.push({
        path: "/detail",
        query: {
          id
        }
      });
    },
    onLoad() {
      // 异步更新数据
      fetch("/article/lists")
        .then(res => res.json())
        .then(res => {
          if (res.status == 200) {
            this.loading = false;
            this.finished = true;
            this.list = res.data.map(item=>{
              if(item.createTime){
                item.createTime=moment(item.createTime)
                .format('YYYY-MM-DD HH:mm:ss');
              }
              return item;
            });
          } else {
            Toast.fail(res.errMsg);
          }
        });
    }
  }
};
</script>

<style scoped>
.list {
  display: flex;
  flex-direction: row;
}
.list .left .img {
  width: 150px;
  height: 100px;
  border-radius: 10px;
}
.left .right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 15px;
}
.left .right .title {
  font-size: 18px;
}
.left .right .create-time {
  font-size: 12px;
  columns: #9e9e9e;
}
</style>