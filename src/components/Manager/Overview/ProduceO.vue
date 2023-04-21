<template>
    <div>
        <el-card>
      <!--     面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Notice' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>项资数据总览</el-breadcrumb-item>
        <el-breadcrumb-item>项目详情</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
      <!-- 卡片视图 -->
      <el-card>
        <el-row :gutter="40">
            <el-col :span="15" class="situ-data-des">
                项目
            </el-col>
          <el-col :span="3">
            <el-input placeholder="项目名称" v-model="names" 
            @keyup.enter.native="search"
            size="mini"
            clearable>
            </el-input>
          </el-col>
          <el-col :span="3">
          <el-button icon="el-icon-search" circle
          size="mini" @click="search"> </el-button>
          </el-col>
        </el-row>
  
        <!-- 项目详情列表 -->
        <el-table :data="EmployeeList"  stripe >
          <el-table-column
           
            prop="id"
            label="表单id"
            min-width="10%"
          >
          </el-table-column>
          <el-table-column
            label="姓名"
            prop="first_name"
            min-width="10%"
          ></el-table-column>
          <el-table-column
            label="工作日期"
            prop="data_time"
            min-width="10%"
          ></el-table-column>
          <el-table-column
            label="项目名称"
            prop="project_name"
            min-width="25%"
          ></el-table-column>
          <el-table-column
            label="是否加班"
            prop="work_overtime"
            min-width="10%"
          >
          <template slot-scope="scope">
            <span v-if="scope.row.work_overtime == 0">是</span>
            <span v-if="scope.row.work_overtime == 1">否</span>
          </template></el-table-column>
          <el-table-column
            label="是否核算绩效"
            prop="account"
            min-width="10%"
          >
          <template slot-scope="scope">
            <span v-if="scope.row.account == 0">是</span>
            <span v-if="scope.row.account == 1">否</span>
          </template></el-table-column>
          <el-table-column
            label="总工时"
            prop="sum_time"
            min-width="10%"
          ></el-table-column>
          <el-table-column             
          label="总工作量"
            prop="sum_number"
            min-width="10%">
          </el-table-column>
          <el-table-column
            label="第一审批人状态"
            prop="state1"
            min-width="12%"
          >
          <template slot-scope="scope">
            <span v-if="scope.row.state1 == 0">已通过</span>
            <span v-if="scope.row.state1 == 1">未通过</span>
            <span v-if="scope.row.state1 == 2">待审批</span>
          </template></el-table-column>
          <el-table-column
            label="第二审批人状态"
            prop="state2"
            min-width="12%"
          >
          <template slot-scope="scope">
            <span v-if="scope.row.state2 == 0">已通过</span>
            <span v-if="scope.row.state2 == 1">未通过</span>
            <span v-if="scope.row.state2 == 2">待审批</span>
          </template></el-table-column>
          <el-table-column
            label="详情"
            min-width="8%"
          >
          <template slot-scope="scope">
            <span class="toDetailE" @click="toDetailO(scope.row.id)">
              进入
            </span>
          </template></el-table-column>
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
  import { getAllProdeceO } from "../../../api/api.js";
  import { getToken } from "../../../utils/setToken.js";
  export default {
    data() {
      return {
        //获取项目信息的参数对象
        EmployeeList: [],
        //需求方搜索框
        demands: "",
        //项目名称搜索框
        names: "",
        // 总条数
        totalCount: 0,
        // 默认显示第几页
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
      formatter(row, column) {
        var data = row[column.property];
        if (data == null) {
          return data;
        }
        data = data.toString();
        data = data.replace(/\'/g, "");
        data = data.replace(/\[/g, "");
        data = data.replace(/\]/g, "");
        data = data.replace(/\s*/g, "");
        data = data.replace(/\s*/g, "");
        data = data.replace(/GX/g, "保定国信");
        data = data.replace(/YD/g, "成都亿达");
        data = data.replace(/JH/g, "大连金慧");
        data = data.replace(/YT/g, "盐城云腾");
        data = data.replace(/WD/g, "永川文德");
        data = data.replace(/RR/g, "热热");
        data = data.replace(/WH/g, "HRO");
        return data;
      },
      getList() {
        getAllProdeceO(
          this.id,
          this.PageSize,
          this.currentPage,
          this.names
        ).then((res) => {
          if (res.data.ret == 0) {
            this.EmployeeList = res.data.data_list;
            this.totalCount = res.data.total;
          }
        });
      },
      fifterUrl(url) {
        var match =
          /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/;
        return match.test(url);
      },
  
      handleSizeChange(val) {
        // 改变每页显示的条数
        this.PageSize = val;
        // 注意：在改变每页显示的条数时，要将页码显示到第一页
        this.currentPage = 1;
        // 点击每页显示的条数时，显示第一页

           this.getList()
      },
      handleCurrentChange(val) {
        // 改变默认的页数
        this.currentPage = val;
        // 切换页码时，要获取每页显示的条数

           this.getList()
      },
      search() {
        this.currentPage = 1;
           this.getList()
      },
      toDetailO(id) {
      this.$router.push({
        path: "DetailO",
        query: {
          id: id,
        },
      });
    },
    },
  };
  </script>
  
  <style lang="less" scoped>
  .situ-data-des{
    font-size: 15px;
    font-weight: 600;
    padding-top: 8px;
  }</style>
  