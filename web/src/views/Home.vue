<template>
  <div>
    <van-button round type="primary" @click="showAddPopup">新增</van-button>
    <van-popup class="popup-right" v-model="show" position="right">
      <div>{{title}}</div>
      <van-divider />
      <van-form @submit="onSubmit">
        <!-- Field 是基于 Cell 实现的，可以使用 CellGroup 作为容器来提供外边框。 -->
        <van-field v-model="todo.todoNameValue" label="任务名称：" placeholder="请输入任务名称" />
        <van-field
          v-model="todo.todoDeadline"
          label="任务截止日期："
          placeholder="请输入任务截止日期"
          @click="showCalendar = true"
        />
        <van-calendar v-model="showCalendar" :show-confirm="false" @confirm="onConfirm" />
        <van-field
          v-model="todo.todoContent"
          rows="3"
          autosize
          label="任务内容:"
          type="textarea"
          maxlength="100"
          placeholder="请输入任务内容"
          show-word-limit
        />
        <div class="submit-btn">
          <van-button type="primary" native-type="submit">保存</van-button>
          <van-button type="default">重置</van-button>
          <van-button type="warning">取消</van-button>
        </div>
      </van-form>
    </van-popup>
    <van-row>
      <van-col span="4">ID</van-col>
      <van-col span="4">标题</van-col>
      <van-col span="4">内容</van-col>
      <van-col span="4">截止日期</van-col>
      <van-col span="2">状态</van-col>
      <van-col span="4">操作</van-col>
    </van-row>
    <van-row gutter="20" v-for="item in list" :key="item.id" :title="item">
      <van-col span="4">{{item.id}}</van-col>
      <van-col span="4">{{item.name}}</van-col>
      <van-col span="4">{{item.content}}</van-col>
      <van-col span="4">{{item.deadline}}</van-col>
      <van-col span="2">{{getStatus(item.status)}}</van-col>
      <van-col span="4">
        <van-button round type="default" size="small" @click="updateTodo(item)">编辑</van-button>
        <van-button
          round
          type="primary"
          size="small"
          @click="finishOrNeedTodo(item)"
        >{{item.status=='1'?'完成':'待办'}}</van-button>
        <van-button round type="danger" size="small" @click="deleteTodo(item)">删除</van-button>
      </van-col>
    </van-row>
    <van-pagination
      class="pagination"
      v-model="currentPage"
      :total-items="totalItems"
      :items-per-page="itemsPerPage"
      :show-page-size="showPageSize"
      force-ellipses
      @change="changePage"
    />
  </div>
</template>

<script>
import {
  List,
  Cell,
  Toast,
  Col,
  Row,
  Button,
  Popup,
  Pagination,
  Divider,
  Field,
  Form,
  Calendar
} from "vant";
import moment from "moment";
export default {
  components: {
    [List.name]: List,
    [Cell.name]: Cell,
    [Col.name]: Col,
    [Row.name]: Row,
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Pagination.name]: Pagination,
    [Divider.name]: Divider,
    [Field.name]: Field,
    [Form.name]: Form,
    [Calendar.name]: Calendar
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      show: false,
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: 0,
      showPageSize: 3,
      showCalendar: false,
      todo: {
        id: 0,
        todoNameValue: "",
        todoContent: "",
        todoDeadline: "",
        status: 1,
        todoStatus: "待办"
      },
      title: "新增任务"
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    deleteTodo(item) {
      const data = {
        id: item.id,
        status: 3
      };
      this.updateStatus(data);
    },
    finishOrNeedTodo(item) {
      var status = 2;
      if (item.status == "2") {
        status = 1;
      }
      const data = {
        id: item.id,
        status
      };
      this.updateStatus(data);
    },
    updateStatus(data) {
      fetch("/todo/update_status", {
        method: "post",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(res => {
          if (res.status == 200) {
            Toast.success("操作成功！");
            this.show = false;
            this.loadData();
          } else {
            Toast.fail(res.errMsg);
          }
        });
    },
    getStatus(status) {
      switch (status) {
        case "1":
          return "待办";
        case "2":
          return "完成";
        case "3":
          return "删除";
        default:
          return "--";
      }
    },
    updateTodo(item) {
      console.log(item);
      this.title = "任务编辑";
      this.show = true;
      this.todo.id = item.id;
      this.todo.todoDeadline = item.deadline;
      this.todo.todoNameValue = item.name;
      this.todo.todoContent = item.content;
    },
    loadData() {
      this.todoNameValue = "";
      this.todoContent = "";
      this.todoDeadline = "";
      // 异步更新数据
      fetch("/todo")
        .then(res => res.json())
        .then(res => {
          if (res.status == 200) {
            this.loading = false;
            this.finished = true;
            this.list = res.data.map(item => {
              if (item.deadline) {
                item.deadline = moment(item.deadline).format(
                  "YYYY-MM-DD HH:mm:ss"
                );
              }
              return item;
            });
            this.totalItems = this.list.length;
          } else {
            Toast.fail(res.errMsg);
          }
        });
    },
    formatDate(date) {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
    onConfirm(date) {
      this.showCalendar = false;
      this.todoDeadline = this.formatDate(date);
    },
    onSubmit(values) {
      console.log("submit", values);
      console.log(this.todoNameValue + this.todoContent + this.todoDeadline);
      const data = {
        id: this.todo.id,
        name: this.todo.todoNameValue,
        deadline: this.todo.todoDeadline,
        content: this.todo.todoContent,
        status: this.todo.status
      };
      console.log(data);
      if (this.todo.id > 0) {
        this.updateTodo2Serve(data);
        return;
      }
      fetch("/todo/create", {
        method: "post",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(res => {
          if (res.status == 200) {
            Toast.success("任务创建成功");
            this.show = false;
            this.loadData();
          } else {
            Toast.fail(res.errMsg);
          }
        });
    },
    updateTodo2Serve(data) {
      fetch("/todo/update", {
        method: "post",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(res => {
          if (res.status == 200) {
            Toast.success("任务更新成功");
            this.show = false;
            this.loadData();
          } else {
            Toast.fail(res.errMsg);
          }
        });
    },
    showAddPopup() {
      this.show = true;
    },
    handelClick(id) {
      this.$router.push({
        path: "/detail",
        query: {
          id
        }
      });
    },

    changePage() {
      console.log("currentPage:" + this.currentPage);
      fetch("/todo/" + this.currentPage)
        .then(res => res.json())
        .then(res => {
          if (res.status == 200) {
            this.loading = false;
            this.finished = true;
            this.list = res.data.map(item => {
              if (item.deadline) {
                item.deadline = moment(item.deadline).format(
                  "YYYY-MM-DD HH:mm:ss"
                );
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
.popup-right {
  width: 30%;
  height: 100%;
}
.pagination {
  width: 40%;
}
</style>