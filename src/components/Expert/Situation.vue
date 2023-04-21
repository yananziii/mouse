<template>
  <div>
    <el-card>
      <!--     面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Notice' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>团队管理</el-breadcrumb-item>
        <el-breadcrumb-item>项目详情</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
    <!-- 卡片视图 -->
    <el-card>
      <el-row :gutter="40">
        <el-col :span="15" class="situ-data-des"> 项目 </el-col>
<!--         <el-col :span="3">
          <el-select
            v-model="state"
            size="mini"
            placeholder="请选择状态"
          >
          <el-option
              label="终止需求"
              :value="6"
              @click.native="search"
            ></el-option>
            <el-option
              label="已交付"
              :value="5"
              @click.native="search"
            ></el-option>
            <el-option
              label="暂停中"
              :value="4"
              @click.native="search"
            ></el-option>
            <el-option
              label="进行中"
              :value="3"
              @click.native="search"
            ></el-option>
            <el-option
              label="试标中"
              :value="2"
              @click.native="search"
            ></el-option>
            <el-option
              label="待开启"
              :value="1"
              @click.native="search"
            ></el-option>
            <el-option
              label="分发中"
              :value="0"
              @click.native="search"
            ></el-option>
          </el-select>
        </el-col> -->
        <el-col :span="3">
          <el-input
            placeholder="需求方"
            v-model="demands"
            @keyup.enter.native="search"
            size="mini"
            
          >
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-input
            placeholder="项目名称"
            v-model="names"
            @keyup.enter.native="search"
            size="mini"
           
          >
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-button icon="el-icon-search" circle size="mini" @click="search">
          </el-button>
        </el-col>
      </el-row>

      <!-- 项目详情列表 -->
      <el-table :data="SituationList" stripe
      @filter-change="filterChange">
         <el-table-column
          fixed
          prop="project_state"
          label="项目状态"
          width="100"
          :filters="[
            { text: '分发中', value: 0 },
            { text: '待开启', value: 1 },
            { text: '试标中', value: 2 },
            { text: '进行中', value: 3 },
            { text: '暂停中', value: 4 },
            { text: '已交付', value: 5 },
            { text: '终止需求', value: 6 }, 
          ]"
          column-key="filterTag"
          :filter-multiple=false
        > 
        <!-- <el-table-column
          fixed
          prop="project_state"
          label="项目状态"
          width="100"
        > -->
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
          fixed
        ></el-table-column>
        <el-table-column
          label="项目名称"
          prop="project_name"
          fixed
          min-width="170%"
        ></el-table-column>
        <el-table-column
          label="项目编号"
          prop="project_number"
          min-width="170%"
        ></el-table-column>
        <el-table-column
          label="供应商"
          prop="provider"
          min-width="170%"
          :formatter="formatter"
        >
        </el-table-column>
        <el-table-column
          label="质控专家"
          prop="project_expert"
        ></el-table-column>
        <el-table-column
          label="期望交付时间"
          prop="delivery_time"
          min-width="120%"
        ></el-table-column>
        <el-table-column label="标注CPD" prop="mark_cpd"></el-table-column>
        <el-table-column label="质检CPD" prop="quality_cpd"></el-table-column>
        <el-table-column
          label="准确率要求"
          prop="ac_requ"
          min-width="100%"
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
        <el-table-column label="任务书链接" width="90%" show-overflow-tooltip>
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
          width="120%"
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
        <el-table-column label="是否按时交付" prop="is_submit" min-width="100%">
          <template slot-scope="scope">
            <span v-if="scope.row.is_submit == 0">是</span>
            <span v-if="scope.row.is_submit == 1">否</span>
            <span v-if="scope.row.is_submit == 2">进行中</span>
          </template>
        </el-table-column>
        <el-table-column label="是否一次性交付" prop="is_one" min-width="120%">
          <template slot-scope="scope">
            <span v-if="scope.row.is_one == 0">是</span>
            <span v-if="scope.row.is_one == 1">否</span>
            <span v-if="scope.row.is_one == 2">进行中</span>
          </template>
        </el-table-column>
        <el-table-column
          label="交付备注"
          prop="deli_note"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column label="返修次数" prop="return_num"></el-table-column>
        <el-table-column
          label="项目经理/质控专家工号"
          prop="work_num"
          min-width="120%"
        ></el-table-column>
        <el-table-column label="操作" min-width="120%">
          <template slot-scope="scope">
            <el-tooltip
              effect="dark"
              content="修改表单"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="
                  showEditDialogList(
                    scope.row.id,
                    scope.row.project_number,
                    scope.row.project_state,
                    scope.row.demand_role,
                    scope.row.project_name,
                    scope.row.provider,
                    scope.row.project_expert,
                    scope.row.delivery_time,
                    scope.row.mark_cpd,
                    scope.row.quality_cpd,
                    scope.row.ac_requ,
                    scope.row.book_con,
                    scope.row.project_con,
                    scope.row.accept_model,
                    scope.row.actual_time,
                    scope.row.deli_note,
                    scope.row.is_submit,
                    scope.row.is_one,
                    scope.row.return_num,
                    scope.row.work_num
                  )
                "
              ></el-button>
            </el-tooltip>
          </template>
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
    <!-- 修改项目详情表单的对话框 -->
    <el-dialog
      title="我的项目情况表单修改"
      :visible.sync="editDialogVisible"
      width="50%"
      :close-on-click-modal="false"
    >
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="100px"
      >
        <el-form-item label="需求方" prop="demand_role">
          <el-input v-model="editForm.demand_role" readonly></el-input>
        </el-form-item>
        <el-form-item label="项目名称" prop="project_name">
          <el-input v-model="editForm.project_name" readonly></el-input>
        </el-form-item>
        <el-form-item label="项目编号" prop="project_number">
          <el-input v-model="editForm.project_number" readonly></el-input>
        </el-form-item>
        <el-form-item label="供应商" prop="provider">
          <el-select v-model="editForm.provider" multiple>
            <el-option
              v-for="item in providers"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="质控专家" prop="project_expert">
          <el-input v-model="editForm.project_expert" readonly></el-input>
        </el-form-item>
        <el-form-item label="期望交付日期" prop="delivery_time">
          <el-input
            v-model="editForm.delivery_time"
            type="date"
            placeholder="选择日期"
            style="width: 100%"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            @change="getEditDateD"
            readonly
          ></el-input>
        </el-form-item>
        <el-form-item label="标注CPD" prop="mark_cpd">
          <el-input v-model="editForm.mark_cpd" type="number"></el-input>
        </el-form-item>
        <el-form-item label="质检CPD" prop="quality_cpd">
          <el-input v-model="editForm.quality_cpd" type="number"></el-input>
        </el-form-item>
        <el-form-item label="准确率要求" prop="ac_requ">
          <el-input
            v-model="editForm.ac_requ"
            v-only-number="{ max: 1, min: 0, precision: 2 }"
            plachehold="请填写0-1以内的两位小数"
          ></el-input>
        </el-form-item>
        <el-form-item label="验收模式" prop="accept_model">
          <el-select v-model="editForm.accept_model">
            <el-option
              v-for="item in modelList"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务书链接" prop="book_con">
          <el-input v-model="editForm.book_con"></el-input>
        </el-form-item>
        <el-form-item label="项目管理表链接" prop="project_con">
          <el-input v-model="editForm.project_con"></el-input>
        </el-form-item>

        <el-form-item label="实际交付日期" prop="actual_time">
          <!--           <el-input
            v-model="editForm.actual_time"
            type="date"
            placeholder="选择日期"
            style="width: 100%"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            @change="getEditDateA"
          ></el-input> -->
          <el-date-picker
            v-model="editForm.actual_time"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="请选择日"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="是否按时标注" prop="is_submit">
          <el-select v-model="editForm.is_submit">
            <el-option
              v-for="item in submitList"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否一次性交付" prop="is_one">
          <el-select v-model="editForm.is_one">
            <el-option
              v-for="item in oneList"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交付备注" prop="deli_note">
          <el-input v-model="editForm.deli_note"></el-input>
        </el-form-item>
        <el-form-item label="返修次数" prop="return_num">
          <el-input v-model="editForm.return_num"></el-input>
        </el-form-item>
      </el-form>
      <!--     底部 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editList" v-preventReClick
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getSituation,
  editSituation,
  getSituationNoKey,
} from "../../api/api.js";
import { getToken } from "../../utils/setToken.js";
export default {
  data() {
    return {
      //实际交付日期必须早于今天
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      //获取项目信息的参数对象
      SituationList: [],
      //状态搜索框
      state:"",
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
      //控制交付填写表单的隐藏与显示
      //添加表单
      //控制修改表单对话框的显示隐藏
      editDialogVisible: false,

      //验收模式前后端对照
      modelList: [
        {
          label: "单盲",
          value: 1,
        },
        {
          label: "双盲",
          value: 2,
        },
        {
          label: "抽检",
          value: 3,
        },
        {
          label: "其他",
          value: 4,
        },
        {
          label: "多盲",
          value: 5,
        },
      ],
      //是否一次性交付前后端对照
      oneList: [
        {
          label: "是",
          value: 0,
        },
        {
          label: "否",
          value: 1,
        },
      ],
      //是否按时标注前后端对照
      submitList: [
        {
          label: "是",
          value: 0,
        },
        {
          label: "否",
          value: 1,
        },
      ],
      //供应商多选
      providers: [
        {
          value: "GX",
          label: "保定国信",
        },
        {
          value: "YD",
          label: "成都亿达",
        },
        {
          value: "JH",
          label: "大连金慧",
        },
        {
          value: "YT",
          label: "盐城云腾",
        },
        {
          value: "WD",
          label: "永川文德",
        },
        {
          value: "RR",
          label: "热热",
        },
        {
          value: "WH",
          label: "HRO",
        },
        {
          value: "WL",
          label: "乌兰察布中研",
        },
        {
          value: "CB",
          label: "长春标贝",
        },
        {
          value: "CA",
          label: "重庆安捷",
        },
        {
          value: "XT",
          label: "新乡淘金",
        },
        {
          value: "SY",
          label: "宿州云腾",
        },
        {
          value: "HY",
          label: "呼和浩特中研",
        },
        {
          value: "JY",
          label: "济南中研",
        },
        {
          value: "SZ",
          label: "审核支援",
        },
      ],

      editForm: {
        id: "",
        project_state: "",
        demand_role: "",
        project_name: "",
        project_number: "",
        provider: "",
        project_expert: "",
        delivery_time: "",
        mark_cpd: "",
        quality_cpd: "",
        ac_requ: "",
        book_con: "",
        project_con: "",
        accept_model: 0,
        actual_time: "",
        deli_note: "",
        is_submit: "",
        is_one: "",
        return_num: "",
        work_num: "",
      },
      //修改表单的验证规则
      editFormRules: {
        ac_requ: [
          { required: true, message: "准确率要求为必填项！", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.id = JSON.parse(getToken("work_num"));
    this.editForm.work_num = JSON.parse(getToken("work_num"));
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
      data = data.replace(/WL/g, "乌兰察布中研");
      data = data.replace(/CB/g, "长春标贝");
      data = data.replace(/CA/g, "重庆安捷");
      data = data.replace(/XT/g, "新乡淘金");
      data = data.replace(/SY/g, "宿州云腾");
      data = data.replace(/HY/g, "呼和浩特中研");
      data = data.replace(/JY/g, "济南中研");
      data = data.replace(/SZ/g, "审核支援");
      return data;
    },
    getList() {
      getSituation(
        this.id,
        this.currentPage,
        this.PageSize,
        this.demands,
        this.names,
        this.state,
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

    //修改表单更改日期格式
    getEditDateD(date) {
      this.editForm.delivery_time = date;
    },
    //修改表单更改日期格式
    getEditDateA(date) {
      this.editForm.actual_time = date;
    },
    /* 监听添加需求对话框关闭重置 */
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },

    //展示编辑需求的对话框
    showEditDialogList(
      id,
      project_number,
      project_state,
      demand_role,
      project_name,
      provider,
      project_expert,
      delivery_time,
      mark_cpd,
      quality_cpd,
      ac_requ,
      book_con,
      project_con,
      accept_model,
      actual_time,
      deli_note,
      is_submit,
      is_one,
      return_num
    ) {
      this.editDialogVisible = true;
      this.editForm.id = id;
      this.editForm.project_number = project_number;
      this.editForm.project_state = project_state;
      this.editForm.demand_role = demand_role;
      this.editForm.project_name = project_name;
      this.editForm.provider = provider;
      this.editForm.project_expert = project_expert;
      this.editForm.delivery_time = delivery_time;
      this.editForm.mark_cpd = mark_cpd;
      this.editForm.quality_cpd = quality_cpd;
      this.editForm.ac_requ = ac_requ;
      this.editForm.book_con = book_con;
      this.editForm.project_con = project_con;
      this.editForm.accept_model = accept_model;
      this.editForm.actual_time = actual_time;
      this.editForm.deli_note = deli_note;
      this.editForm.is_submit = is_submit;
      this.editForm.is_one = is_one;
      this.editForm.return_num = return_num;
      if (this.editForm.provider) {
        this.editForm.provider = this.editForm.provider.toString();
        this.editForm.provider = this.editForm.provider.replace(/\'/g, "");
        this.editForm.provider = this.editForm.provider.replace(/\[/g, "");
        this.editForm.provider = this.editForm.provider.replace(/\]/g, "");
        this.editForm.provider = this.editForm.provider.replace(/\s*/g, "");
        this.editForm.provider = this.editForm.provider.split(",");
      }
      console.log(this.editForm.provider);
    },
    checkEdit(
      state,
      provider,
      mark_cpd,
      quality_cpd,
      ac_requ,
      actual_time,
      is_submit,
      is_one
    ) {
      if (state == 3 && provider == "") {
        return false;
      } else if (state == 3 && mark_cpd === null) {
        return false;
      } else if (state == 3 && quality_cpd === null) {
        return false;
      } else if (state == 3 && ac_requ === null) {
        return false;
      } else if (state == 5 && provider === null) {
        return false;
      } else if (state == 5 && mark_cpd === null) {
        return false;
      } else if (state == 5 && quality_cpd === null) {
        return false;
      } else if (state == 5 && ac_requ === null) {
        return false;
      } else if (state == 5 && actual_time === null) {
        return false;
      } else if (state == 5 && is_submit === null) {
        return false;
      } else if (state == 5 && is_one === null) {
        return false;
      } else {
        return true;
      }
    },
    /*     checkEdit(
      state,
      provider,
      mark_cpd,
      quality_cpd,
      ac_requ,
      actual_time,
      is_submit,
      is_one
    ) {
      const conditions = {
        3: [provider, mark_cpd, quality_cpd, ac_requ],
        5: [
          provider,
          mark_cpd,
          quality_cpd,
          ac_requ,
          actual_time,
          is_submit,
          is_one,
        ],
      };
      const requiredFields = conditions[state];
      for (const field of requiredFields) {
        if (field === null) {
          return false;
        }
      }
      return true;
    }, */
    /*  修改明细表单并提交 */
    editList() {
      //预校验
      this.$refs.editFormRef.validate((valid) => {
        if (!valid) return;
        if (
          this.checkEdit(
            this.editForm.project_state,
            this.editForm.provider,
            this.editForm.mark_cpd,
            this.editForm.quality_cpd,
            this.editForm.ac_requ,
            this.editForm.actual_time,
            this.editForm.is_submit,
            this.editForm.is_one
          )
        ) {
          editSituation(this.editForm).then((res) => {
            if (res.data.ret == 0) {
              //关闭对话框
              this.editDialogVisible = false;
              //刷新数据列表
              this.getList();
              //提示
              this.$message.success("更新成功");
            }
          });
        } else {
          this.$message.error("填写不规范，请重新填写");
        }
      });
    },

    filterChange(filterObj) {
     /*  console.log(filterObj); */
      let stringState = JSON.stringify(filterObj)
      /* console.log(stringState) */
      let state = stringState.replace(/[^0-9]/g,"")
    /*   console.log(state) */
    this.state = state
      getSituation(
        this.id,
        this.currentPage,
        this.PageSize,
        this.demands,
        this.names,
        state,
      ).then((res) => {
        if (res.data.ret == 0) {
          this.SituationList = res.data.data_list;
          this.totalCount = res.data.total;
        }
      });
    }
    /* editList(){
  this.$refs.editFormRef.validate((valid) => {
    if (!valid) return;
    if(this.editForm.project_state == 3 && this.editForm.provider === null){
      this.$message.error("进行中的项目供应商必填！！！");
    }
  })
}, */
  },
};
</script>

<style lang="less" scoped>
.situ-data-des {
  font-size: 15px;
  font-weight: 600;
  padding-top: 8px;
}
</style>
