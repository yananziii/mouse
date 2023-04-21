<template>
  <div>
    <el-card>
      <!--     面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Notice' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>项资数据总览</el-breadcrumb-item>
        <el-breadcrumb-item>员工质量</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
    <el-card>
      <el-row :gutter="40">
        <el-col :span="15" class="resc-data-des"> 表单 </el-col>
        <el-col :span="3">
          <el-input
            placeholder="项目名称"
            v-model="names"
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
      <!-- 个人明细列表区域 -->
      <el-table :data="recordingsList" stripe>
        <el-table-column
          label="项目名称"
          prop="project_name"
          min-width="10%"
        ></el-table-column>
        <el-table-column
          label="数据包id"
          prop="packet_id"
          min-width="8%"
        ></el-table-column>
        <el-table-column
          label="验收日期"
          prop="accept_time"
          min-width="10%"
        ></el-table-column>
        <el-table-column
          label="供应商"
          prop="supplier"
          min-width="8%"
        ></el-table-column>
        <el-table-column
          label="第几次验收"
          prop="return_times"
          min-width="10%"
        ></el-table-column>
        <el-table-column
          label="作业类型"
          prop="type_job"
          min-width="10%"
        ></el-table-column>
        <el-table-column
          label="被抽检人邮箱"
          prop="besampl_email"
          min-width="11%"
        ></el-table-column>
        <el-table-column
          label="被抽检人"
          prop="besampl_man"
          min-width="8%"
        ></el-table-column>
        <el-table-column
          label="被抽检数"
          prop="besampl_num"
          min-width="10%"
        ></el-table-column>
        <el-table-column
          label="被抽检错误数"
          prop="besamp_err"
          min-width="11%"
        ></el-table-column>
        <el-table-column
          label="申诉量"
          prop="appeal_num"
          min-width="8%"
        ></el-table-column>
        <el-table-column
          label="申诉通过量"
          prop="appeal_pass"
          min-width="10%"
        ></el-table-column>
        <el-table-column
          label="抽检人邮箱"
          prop="sampl_email"
          min-width="10%"
        ></el-table-column>
        <el-table-column
          label="备注"
          prop="note"
          min-width="6%"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          label="实际准确率"
          prop="actual_accuray"
          min-width="10%"
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
import { getRecordingO } from "../../../api/api.js";
import { getToken } from "../../../utils/setToken.js";
export default {
  data() {
    return {
      //项目名称搜索框
      names: "",
      recordingsList: [],
      totalCount: 0,
      //默认显示第几页
      currentPage: 1,
      // 个数选择器
      pageSizes: [5, 10],
      // 默认每页显示的条数
      PageSize: 5,
    };
  },
  created() {
    this.id = JSON.parse(getToken("work_num"));
    /*     this.token = JSON.parse(getToken("admin_token")); */
    this.getList();
  },
  methods: {
    //查询所有表单
    getList() {
      getRecordingO(this.id, this.currentPage, this.PageSize, this.names).then(
        (res) => {
          if (res.data.ret == 0) {
            this.recordingsList = res.data.data_list;
            this.totalCount = res.data.total;
          }
        }
      );
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
    search() {
      this.currentPage = 1;

      this.getList();
    },
  },
};
</script>

<style lang="less" scoped>
.resc-data-des {
  font-size: 15px;
  font-weight: 600;
  padding-top: 8px;
}
</style>
