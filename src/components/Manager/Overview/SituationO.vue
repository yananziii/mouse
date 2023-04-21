<template>
    <div>
        <el-card>
      <!--     面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Notice' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>项资数据总览</el-breadcrumb-item>
        <el-breadcrumb-item>项目分发</el-breadcrumb-item>
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
        <el-table :data="SituationList"  stripe >
          <el-table-column
            label="项目id"
            prop="id"
            min-width="7%"
          ></el-table-column>
          <el-table-column
           
            prop="project_state"
            label="项目状态"
            min-width="8%"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.project_state == 0">分发中</span>
              <span v-if="scope.row.project_state == 1">待开启</span>
              <span v-if="scope.row.project_state == 2">试标中</span>
              <span v-if="scope.row.project_state == 3">进行中</span>
              <span v-if="scope.row.project_state == 4">暂停中</span>
              <span v-if="scope.row.project_state == 5">已交付</span>
              <span v-if="scope.row.project_state == 6">终止需求</span>
            </template>
          </el-table-column>
          <el-table-column
            label="需求方"
            prop="demand_role"
            min-width="8%"
          ></el-table-column>
          <el-table-column
            label="项目名称"
            prop="project_name"
            min-width="10%"
          ></el-table-column>
          <el-table-column
            label="总量级"
            prop="data_amount"
            min-width="10%"
          ></el-table-column>
          <el-table-column
            label="数据单位"
            prop="unit"
            min-width="9%"
          ></el-table-column>
          <el-table-column
            label="提报时间"
            prop="submit_time"
            min-width="10%"
          ></el-table-column>
          <el-table-column
            label="期望交付时间"
            prop="delivery_time"
            min-width="12%"
          ></el-table-column>
          <el-table-column
            label="准确率"
            prop="accuracy"
            min-width="7%"
          ></el-table-column>
          <el-table-column label="项目背景" min-width="10%" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="fifterUrl(scope.row.background)">
                <a
                  :href="scope.row.background"
                  target="_blank"
                  class="buttonText"
                  >{{ scope.row.background }}</a
                >
              </span>
              <span v-else>{{ scope.row.background }}</span>
            </template>
          </el-table-column>
          <el-table-column label="项目规则" min-width="10%" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="fifterUrl(scope.row.regulation)">
                <a
                  :href="scope.row.regulation"
                  target="_blank"
                  class="buttonText"
                  >{{ scope.row.regulation }}</a
                >
              </span>
              <span v-else>{{ scope.row.regulation }}</span>
            </template>
          </el-table-column>


          <el-table-column label="是否基于历史" prop="is_repeat" min-width="11%">
            <template slot-scope="scope">
              <span v-if="scope.row.is_repeat == 0">是</span>
              <span v-if="scope.row.is_repeat == 1">否</span>
            </template>
          </el-table-column>

        
          <el-table-column
            label="项目经理"
            prop="project_manager"
            min-width="8%"
          ></el-table-column>
          <el-table-column
            label="质控专家"
            prop="project_expert"
            min-width="8%"
          ></el-table-column>
          <el-table-column
            label="交付备注"
            prop="note"
            :show-overflow-tooltip="true"
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
  import { getAllSituationO } from "../../../api/api.js";
  import { getToken } from "../../../utils/setToken.js";
  export default {
    data() {
      return {
        //获取项目信息的参数对象
        SituationList: [],
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
        getAllSituationO(
          this.id,
          this.PageSize,
          this.currentPage,
          this.names
        ).then((res) => {
          if (res.data.ret == 0) {
            this.SituationList = res.data.data_list;
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
    },
  };
  </script>
  
  <style lang="less" scoped>
  .situ-data-des{
    font-size: 15px;
    font-weight: 600;
    padding-top: 8px;
  }</style>
  