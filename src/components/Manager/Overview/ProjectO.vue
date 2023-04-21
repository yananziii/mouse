<template>
  <div>
      <el-card>
    <!--     面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Notice' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>项资数据总览</el-breadcrumb-item>
      <el-breadcrumb-item>项目概括</el-breadcrumb-item>
    </el-breadcrumb>
    </el-card>
    <el-card>
      <el-row :gutter="40">
          <el-col :span="15" class="over-data-des">
              项目
          </el-col>
        <el-col :span="3">
          <el-input placeholder="需求方" v-model="demands" 
          @keyup.enter.native="search"
          size="mini"
          clearable>
          </el-input>
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
      <el-table :data="OverallList"  stripe >
        <el-table-column
          label="项目id"
          prop="project_id"
          fixed
        ></el-table-column>
        <el-table-column
          fixed
          prop="project_state"
          label="项目状态"
          width="100"
          :filters="[
            { text: '分发中', value: '0' },
            { text: '待开启', value: '1' },
            { text: '试标中', value: '2' },
            { text: '进行中', value: '3' },
            { text: '暂停中', value: '4' },
            { text: '已交付', value: '5' },
            { text: '终止需求', value: '6' },
          ]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag
              effect="dark"
              :color="
                scope.row.project_state == '0'
                  ? 'red'
                  : scope.row.project_state == '1'
                  ? 'brown'
                  : scope.row.project_state == '2'
                  ? ''
                  : scope.row.project_state == '3'
                  ? 'green'
                  : scope.row.project_state == '4'
                  ? 'grey'
                  : scope.row.project_state == '5'
                  ? 'orange'
                  : 'pink'
              "
            >
              <span v-if="scope.row.project_state == 0">分发中</span>
              <span v-if="scope.row.project_state == 1">待开启</span>
              <span v-if="scope.row.project_state == 2">试标中</span>
              <span v-if="scope.row.project_state == 3">进行中</span>
              <span v-if="scope.row.project_state == 4">暂停中</span>
              <span v-if="scope.row.project_state == 5">已交付</span>
              <span v-if="scope.row.project_state == 6">终止需求</span>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="需求方"
          prop="demand_role"
          fixed
        ></el-table-column>
        <el-table-column
          label="项目名称"
          prop="project_name"
          fixed
          width="170%"
        ></el-table-column>
        <el-table-column
          label="供应商"
          prop="provider"
          min-width="170%"
          :formatter="formatter"
        ></el-table-column>
        <el-table-column label="标注cpd" prop="mark_cpd"></el-table-column>
        <el-table-column label="质检cpd" prop="quality_cpd"></el-table-column>
        <el-table-column
          label="准确率"
          prop="ac_requ"
          width="100%"
        ></el-table-column>
        <el-table-column label="验收模式" prop="accept_model">
          <template slot-scope="scope">
            <span v-if="scope.row.accept_model == 1">单盲</span>
            <span v-if="scope.row.accept_model == 2">双盲</span>
            <span v-if="scope.row.accept_model == 3">抽检</span>
            <span v-if="scope.row.accept_model == 4">其他</span>
            <span v-if="scope.row.accept_model == 5">多盲</span>
          </template>
        </el-table-column>
        <el-table-column
          label="任务书链接"
          min-width="100%"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span v-if="fifterUrl(scope.row.book_con)">
              <a
                :href="scope.row.book_con"
                target="_blank"
                class="buttonText"
                >{{ scope.row.book_con }}</a
              >
            </span>
            <span v-else>{{ scope.row.book_con }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="项目管理表链接"
          min-width="110%"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span v-if="fifterUrl(scope.row.project_con)">
              <a
                :href="scope.row.project_con"
                target="_blank"
                class="buttonText"
                >{{ scope.row.project_con }}</a
              >
            </span>
            <span v-else>{{ scope.row.project_con }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="实际交付日期"
          prop="actual_time"
          min-width="100%"
        ></el-table-column>
        <el-table-column
          label="交付备注"
          prop="deli_note"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column label="是否按时交付" prop="is_submit" min-width="100%">
          <template slot-scope="scope">
            <span v-if="scope.row.is_submit == 0">是</span>
            <span v-if="scope.row.is_submit == 1">否</span>
          </template>
        </el-table-column>
        <el-table-column label="是否一次性交付" prop="is_one" min-width="110%">
          <template slot-scope="scope">
            <span v-if="scope.row.is_one == 0">是</span>
            <span v-if="scope.row.is_one == 1">否</span>
          </template>
        </el-table-column>
        <el-table-column label="返修次数" prop="return_num"></el-table-column>
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
import { getOverall, getOverallNoKey } from "../../../api/api.js";
import { getToken } from "../../../utils/setToken.js";

export default {
  data() {
    return {
      //获取项目信息的参数对象
      OverallList: [],
      //需求方搜索框
      demands: "",
      //项目名称搜索框
      names: "",
      // 总条数
      totalCount: 0,
      // 默认显示第几页
      currentPage: 1,
      // 个数选择器
      pageSizes: [10, 30, 50, 100],
      // 默认每页显示的条数
      PageSize: 10,
    };
  },
  created() {
    this.id = JSON.parse(getToken("work_num"));
/*     this.token = JSON.parse(getToken("admin_token")); */
    this.getListNoKey();
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
    getListNoKey(){
      getOverallNoKey(
        this.id,
        this.currentPage,
        this.PageSize
      ).then((res) => {
        if (res.data.ret == 0) {
          this.OverallList = res.data.data_list;
          this.totalCount = res.data.total;
        }
      });
    },
    getList() {
      getOverall(
        this.id,
        this.currentPage,
        this.PageSize,
        this.demands,
        this.names
      ).then((res) => {
        if (res.data.ret == 0) {
          this.OverallList = res.data.data_list;
          this.totalCount = res.data.total;
        }
      });
    },
    fifterUrl(url) {
      var match =
        /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/;
      return match.test(url);
    },
    filterTag(value, row) {
      return row.project_state == value;
    },
    handleSizeChange(val) {
      // 改变每页显示的条数
      this.PageSize = val;
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage = 1;
      // 点击每页显示的条数时，显示第一页
      if(this.demands == '' && this.names == '') return this.getListNoKey()
         this.getList()
    },
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage = val;
      // 切换页码时，要获取每页显示的条数
      if(this.demands == '' && this.names == '') return this.getListNoKey()
         this.getList()
    },
    search() {
      this.currentPage = 1;
      if(this.demands == '' && this.names == '') return this.getListNoKey()
         this.getList()
    },
  },
};
</script>

<style lang="less" scoped>
.over-data-des{
  font-size: 15px;
  font-weight: 600;
  padding-top: 8px;
}
</style>
