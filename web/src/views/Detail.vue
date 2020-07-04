<template>
  <div class="detail">
    <div class="title">{{detail.title}}</div>
    <div class="summary">{{detail.summary}}</div>
    <div class="content">{{detail.content}}</div>
    <div class="create-time">{{detail.createTime}}</div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import moment from 'moment';
export default {
    data(){
        return{
           detail:{
               id:undefined,
               title:undefined,
               img:undefined,
               summary:undefined,
               content:undefined,
               createTime:undefined
           }
        }
    },
    created(){
        fetch('article/detail/'+this.$route.query.id)
        .then(res=>res.json())
        .then(res=>{
            if(res.status==200){
                this.detail=res.data;
                this.detail.createTime=res.data
                .createTime?moment(res.data
                .createTime).format('YYYY-MM-DD HH:mm:ss'):undefined;
            }else{
                Toast.fail(res.errMsg);
            }
        })
    }
}
</script>

<style scoped>
.detail {
  padding: 20px;
  text-align: left;
}
.detail .title {
  font-size: 25px;
  padding-bottom: 20px;
}
.detail .summary {
  padding: 20px;
  background: #dededc;
  margin-bottom: 20px;
}
.detail .content {
  padding: 20px;
  text-indent: 2em;
  line-height: 200%;
}
.detail .create-time {
  columns: #9c9c9c;
  text-align: right;
}
</style>