<template>
  <div>
    <el-card>
      <!--     面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Notice' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>项资数据总览</el-breadcrumb-item>
        <el-breadcrumb-item>数据包交付</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row>
        <el-col :span="18" class="deli-top-des">
          {{ this.$route.query.name }}
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <el-row :gutter="40">
        <el-col :span="18" class="deli-data-des"> 项目 </el-col>
        <el-col :span="3">
          <el-input
            placeholder="项目名称"
            v-model="ids"
            @keyup.enter.native="search"
            size="mini"
            clearable
          >
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-button icon="el-icon-search" circle size="mini" @click="search">
          </el-button>
        </el-col>
      </el-row>
      <el-table :data="DeliveryList" stripe>
        <el-table-column
          label="表单id"
          prop="id"
          min-width="6%"
        ></el-table-column>
        <el-table-column
          label="项目名称"
          prop="project_name"
          min-width="20%"
        ></el-table-column>
        <el-table-column
          label="数据包id"
          prop="packet_id"
          min-width="7%"
        ></el-table-column>
        <el-table-column label="进度状态" prop="progress_status" min-width="7%">
          <template slot-scope="scope">
            <span v-if="scope.row.progress_status == 1">标注中</span>
            <span v-if="scope.row.progress_status == 2">已标完</span>
            <span v-if="scope.row.progress_status == 3">验收中</span>
            <span v-if="scope.row.progress_status == 4">返修中</span>
            <span v-if="scope.row.progress_status == 5">内检中</span>
            <span v-if="scope.row.progress_status == 6">待复核</span>
            <span v-if="scope.row.progress_status == 7">待交付</span>
            <span v-if="scope.row.progress_status == 8">已交付</span>
          </template>
        </el-table-column>
        <el-table-column
          label="需求量级"
          prop="packet_num"
          min-width="7%"
        ></el-table-column>
        <el-table-column
          label="实际交付时间"
          prop="mark_time"
          min-width="10%"
        ></el-table-column>
        <el-table-column
          label="最终准确率"
          prop="final_accuray"
          min-width="7%"
        ></el-table-column>
        <el-table-column label="结算月份" prop="setmonth" min-width="7%">
          <template slot-scope="scope">
            <span v-if="scope.row.setmonth == 0">不结算</span>
            <span v-if="scope.row.setmonth == 1">一月份</span>
            <span v-if="scope.row.setmonth == 2">二月份</span>
            <span v-if="scope.row.setmonth == 3">三月份</span>
            <span v-if="scope.row.setmonth == 4">四月份</span>
            <span v-if="scope.row.setmonth == 5">五月份</span>
            <span v-if="scope.row.setmonth == 6">六月份</span>
            <span v-if="scope.row.setmonth == 7">七月份</span>
            <span v-if="scope.row.setmonth == 8">八月份</span>
            <span v-if="scope.row.setmonth == 9">九月份</span>
            <span v-if="scope.row.setmonth == 10">十月份</span>
            <span v-if="scope.row.setmonth == 11">十一月份</span>
            <span v-if="scope.row.setmonth == 12">十二月份</span>
          </template>
        </el-table-column>
        <el-table-column
          label="单价"
          prop="uprice"
          min-width="7%"
        ></el-table-column>
        <el-table-column
          label="维护人"
          prop="first_name"
          min-width="7%"
        ></el-table-column>
      </el-table>
      <div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="pageSizes"
          :page-size="PageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getDeliveryO } from "../../../api/api.js";
import { getToken } from "../../../utils/setToken.js";
export default {
  data() {
    return {
      ids: "",
      DeliveryList: [],
      // 总条数
      totalCount: 0,
      //默认显示第几页
      currentPage: 1,
      // 个数选择器
      pageSizes: [5, 10],
      // 默认每页显示的条数
      PageSize: 5,
      //控制添加明细表单对话框的显示与隐藏
    };
  },
  created() {
    this.id = JSON.parse(getToken("work_num"));
    /*     this.token = JSON.parse(getToken("admin_token")); */

    this.getList();
  },
  methods: {
    getList() {
      getDeliveryO(this.id, this.PageSize, this.currentPage, this.ids).then(
        (res) => {
          if (res.data.ret == 0) {
            this.DeliveryList = res.data.data_list;
            this.totalCount = res.data.total;
          }
        }
      );
    },
    search() {
      this.currentPage = 1;
      this.getList();
    },

    handleSizeChange(val) {
      // 改变每页显示的条数
      this.PageSize = val;
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage = 1;
      // 点击每页显示的条数时，显示第一页
      this.getList();
    },
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage = val;
      // 切换页码时，要获取每页显示的条数
      this.getList();
    },
  },
};
</script>

<style lang="less" scoped>
.deli-top-des {
  font-size: 18px;
  font-weight: 600;
  padding-top: 10px;
}
.deli-data-des {
  font-size: 15px;
  font-weight: 600;
  padding-top: 8px;
}
</style>
