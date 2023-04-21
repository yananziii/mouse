<template>
  <div>
      <el-card>
    <!--     面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Notice' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>团队管理</el-breadcrumb-item>
      <el-breadcrumb-item>组内生产</el-breadcrumb-item>
    </el-breadcrumb>
    </el-card>
    <el-card>
      <el-row :gutter="40">
          <el-col :span="15" class="emps-data-des">
              
          </el-col>
        <el-col :span="3">
          <el-input placeholder="项目名称" v-model="proNames" 
          @keyup.enter.native="search2"
          size="mini"
          clearable>
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-select v-model="times"  size="mini" placeholder="起始日期">
              <el-option
              v-for="item in this.TimeList"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            >
          </el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
        <el-button icon="el-icon-search" circle
        size="mini" @click="search2"> </el-button>
        </el-col>
      </el-row>
      <el-row :gutter="40">
          <el-col :span="18" class="emps-data-des">
              表单
          </el-col>
        <el-col :span="3">
          <el-input placeholder="员工名称" v-model="names" 
          @keyup.enter.native="search1"
          size="mini"
          clearable>
          </el-input>
        </el-col>
        <el-col :span="3">
        <el-button icon="el-icon-search" circle
        size="mini" @click="search1"> </el-button>
        </el-col>
      </el-row>
      <!-- 组内明细列表区域 -->
      <el-table :data="exportList"  stripe >
        <el-table-column label="表单id" prop="id" fixed></el-table-column>
        <el-table-column
          label="工作日期"
          prop="data_time"
          fixed
          min-width="100%"
        ></el-table-column>
        <el-table-column
          label="员工姓名"
          prop="first_name"
          fixed
          min-width="90%"
        ></el-table-column>
        <el-table-column
          label="项目名称"
          prop="project_name"
          fixed
          min-width="170%"
        ></el-table-column>
        <el-table-column
          label="项目角色"
          prop="project_role"
          fixed
        ></el-table-column>
        <el-table-column prop="work_overtime" label="是否加班" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.work_overtime == 0">是</span>
            <span v-if="scope.row.work_overtime == 1">否</span>
          </template>
        </el-table-column>
        <el-table-column prop="account" label="是否需要核算绩效" width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.account == 0">是</span>
            <span v-if="scope.row.account == 1">否</span>
          </template>
        </el-table-column>
        <el-table-column label="标注工时" prop="mark_time"></el-table-column>
        <el-table-column
          label="标注工作量"
          prop="mark_number"
          min-width="90%"
        ></el-table-column>
        <el-table-column label="质检工时" prop="quality_time"></el-table-column>
        <el-table-column
          label="质检工作量"
          prop="quality_number"
          min-width="90%"
        ></el-table-column>
        <el-table-column
          label="试标工时"
          prop="test_mark_time"
        ></el-table-column>
        <el-table-column
          label="非标-培训工时"
          prop="traing_time"
        ></el-table-column>
        <el-table-column
          label="非标-答疑工时"
          prop="question_time"
        ></el-table-column>
        <el-table-column
          label="非标-数据处理工时"
          prop="data_process_time"
          min-width="100%"
        ></el-table-column>
        <el-table-column
          label="非标-复盘工时"
          prop="analyse_time"
        ></el-table-column>
        <el-table-column
          label="非标-其他工时"
          prop="other_time"
          min-width="90%"
        ></el-table-column>
        <el-table-column label="工损工时" prop="loss_time"></el-table-column>
        <el-table-column
          label="备注"
          prop="note"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          label="加班-标注工时"
          prop="over_mark_time"
        ></el-table-column>
        <el-table-column
          label="加班-标注工作量"
          prop="over_mark_number"
          min-width="90%"
        ></el-table-column>
        <el-table-column
          label="加班-质检工时"
          prop="over_quality_time"
        ></el-table-column>
        <el-table-column
          label="加班-质检工作量"
          prop="over_quality_number"
          min-width="90%"
        ></el-table-column>
        <el-table-column
          label="加班-试标工时"
          prop="over_test_mark_time"
        ></el-table-column>
        <el-table-column
          label="加班-非标-培训工时"
          prop="over_traing_time"
        ></el-table-column>
        <el-table-column
          label="加班-非标-答疑工时"
          prop="over_question_time"
        ></el-table-column>
        <el-table-column
          label="加班-非标-数据处理工时"
          prop="over_data_process_time"
          min-width="100%"
        ></el-table-column>
        <el-table-column
          label="加班-非标-复盘工时"
          prop="over_analyse_time"
        ></el-table-column>
        <el-table-column
          label="加班-非标-其他工时"
          prop="over_other_time"
          min-width="90%"
        ></el-table-column>
        <el-table-column
          label="加班-工损工时"
          prop="over_loss_time"
        ></el-table-column>
        <el-table-column
          label="加班情况说明"
          prop="over_note"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column label="首次创建时间">
          <template slot-scope="scope">{{
            scope.row.create_date | dateFormat
          }}</template>
        </el-table-column>
        <el-table-column label="更新时间">
          <template slot-scope="scope">{{
            scope.row.update_date | dateFormat
          }}</template>
        </el-table-column>
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
import { getEmployees } from "../../api/api.js";
import { getToken } from "../../utils/setToken.js";
import moment from 'moment'


export default {
  data() {
    return {
      exportList: [],
      //员工名称搜索框
      names: "",
      //项目id搜索框
      proNames: "",
      //日期搜索框
      times: "",
      // 总条数
      totalCount: 0,
      // 默认显示第几页
      currentPage: 1,
      // 个数选择器
      pageSizes: [5, 10],
      // 默认每页显示的条数
      PageSize: 5,
      serachFlag:0,
    };
  },
  created() {
    this.id = JSON.parse(getToken("work_num"));
/*     this.token = JSON.parse(getToken("admin_token")); */
  this.TimeList = this.getAllTime();
  //this.times = this.getNowTime();
  this.getListFirst();
  },
  methods: {
      getAllTime(){
      let strNow =  moment().format('YYYY-MM-DD')
      let strBefor1 =  moment().subtract(1, 'day').format('YYYY-MM-DD')
      let strBefor2 =  moment().subtract(2, 'day').format('YYYY-MM-DD')
      let strBefor3 =  moment().subtract(3, 'day').format('YYYY-MM-DD')
      let strBefor4 =  moment().subtract(4, 'day').format('YYYY-MM-DD')
      let strBefor5 =  moment().subtract(5, 'day').format('YYYY-MM-DD')
      let strBefor6 =  moment().subtract(6, 'day').format('YYYY-MM-DD')
      let strBefor7 =  moment().subtract(7, 'day').format('YYYY-MM-DD')
      let strBefor8 =  moment().subtract(8, 'day').format('YYYY-MM-DD')
      let strBefor9 =  moment().subtract(9, 'day').format('YYYY-MM-DD')
      return [
          {
              value:strNow,
              label:strNow,
          },
          {
              value:strBefor1,
              label:strBefor1,
          },
          {
              value:strBefor2,
              label:strBefor2,
          },
          {
              value:strBefor3,
              label:strBefor3,
          },
          {
              value:strBefor4,
              label:strBefor4,
          },
          {
              value:strBefor5,
              label:strBefor5,
          },
          {
              value:strBefor6,
              label:strBefor6,
          },
          {
              value:strBefor7,
              label:strBefor7,
          },
          {
              value:strBefor8,
              label:strBefor8,
          },
          {
              value:strBefor9,
              label:strBefor9,
          }
      ]
    },
    getNowTime(){
      let strNow =  moment().format('YYYY-MM-DD')
      return strNow
    },
    getListFirst() {
      getEmployees(
        this.id,
        this.currentPage,
        this.PageSize,
        "",
        "",
        ""
,       ).then((res) => {
        if (res.data.ret == 0) {
          this.exportList = res.data.data_list;
          this.totalCount = res.data.total;
        }
      });
    },
    getListSearch1(){
      getEmployees(
        this.id,
        this.currentPage,
        this.PageSize,
        this.names,
        "",
        ""
,       ).then((res) => {
        if (res.data.ret == 0) {
          this.exportList = res.data.data_list;
          this.totalCount = res.data.total;
        }
      });
      this.serachFlag = 1
    },
    getListSearch2(){
      getEmployees(
        this.id,
        this.currentPage,
        this.PageSize,
        "",
        this.times,
        this.proNames,
    ).then((res) => {
        if (res.data.ret == 0) {
          this.exportList = res.data.data_list;
          this.totalCount = res.data.total;
        }
      });
      this.serachFlag = 2
    },
    handleSizeChange(val) {
      // 改变每页显示的条数
      this.PageSize = val;
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage = 1;
      // 点击每页显示的条数时，显示第一页
      if(this.serachFlag == 0 ){
          this.getListFirst()
      }else if(this.serachFlag == 1 ){
          this.getListSearch1()
      }else{
          this.getListSearch2()
      }
    },
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage = val;
      // 切换页码时，要获取每页显示的条数
      if(this.serachFlag == 0 ){
          this.getListFirst()
      }else if(this.serachFlag == 1 ){
          this.getListSearch1()
      }else{
          this.getListSearch2()
      }
    },
    search1() {
      this.currentPage = 1;
      this.getListSearch1();
    },
    search2() {
      this.currentPage = 1;
      this.getListSearch2();
    },
    filterO(value, row) {
      return row.work_overtime == value;
    },
    filterA(value, row) {
      return row.account == value;
    },
  },
};
</script>

<style less="lang" scoped>
.emps-data-des{
  font-size: 15px;
  font-weight: 600;
  padding-top: 8px;
}
</style>
