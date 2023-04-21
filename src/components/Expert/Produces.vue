<template>
  <div>
    <el-card>
      <!--     面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Notice' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>团队管理</el-breadcrumb-item>
        <el-breadcrumb-item>组内生产</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row :gutter="0" class="emp-top">
        <el-col :span="22" class="emp-top-des"> 生产数据 </el-col>
        <el-col :span="2" class="emp-top-add">
          <el-button
            type="danger"
            @click="allowListAll(id, power)"
            size="mini"
            v-if="mulShow"
            >批量同意</el-button
          >
        </el-col>
      </el-row>
    </el-card>
    <!-- 卡片视图 -->
    <el-card>
      <el-row :gutter="40">
        <el-col :span="10" class="emp-data-des"> 表单 </el-col>
        <el-col :span="3" class="emp-data-des"> </el-col>
        <el-col :span="5">
          <el-date-picker
            v-model="searchTime"
            type="date"
            placeholder="选择日期时间"
            size="mini"
            :clearable="true"
            :picker-options="pickerOptions"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            @change="search"
          >
          </el-date-picker>
        </el-col>
        <el-col :span="3">
          <el-select v-model="state" size="mini" placeholder="请选择状态">
            <el-option
              label="待审批"
              :value="2"
              @click.native="mulToT"
            ></el-option>
            <el-option
              label="未通过"
              :value="1"
              @click.native="mulToF"
            ></el-option>
            <el-option
              label="已通过"
              :value="0"
              @click.native="mulToF"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-input
            placeholder="员工姓名"
            v-model="names"
            @keyup.enter.native="search"
            size="mini"
          >
          </el-input>
        </el-col>
      </el-row>
      <!-- 个人明细列表区域 -->
      <el-table
        :data="userList"
        stripe
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" min-width="10%"> </el-table-column>
        <el-table-column
          label="工单id"
          prop="order_id"
          min-width="10%"
        ></el-table-column>
        <el-table-column
          label="员工姓名"
          prop="first_name"
          min-width="10%"
        ></el-table-column>
        <el-table-column label="工作日期" prop="data_time" min-width="15%">
        </el-table-column>

        <el-table-column
          label="项目名称"
          prop="project_name"
          min-width="25%"
        ></el-table-column>
        <el-table-column
          label="项目角色"
          prop="project_role"
          min-width="10%"
        ></el-table-column>
        <el-table-column prop="work_overtime" label="是否加班" min-width="10%">
          <template slot-scope="scope">
            <span v-if="scope.row.work_overtime == 0">是</span>
            <span v-if="scope.row.work_overtime == 1">否</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="account"
          label="是否需要核算绩效"
          min-width="18%"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.account == 0">是</span>
            <span v-if="scope.row.account == 1">否</span>
          </template>
        </el-table-column>

        <el-table-column
          label="总工时"
          prop="sum_time"
          min-width="10%"
        ></el-table-column>
        <el-table-column
          label="总工作量"
          prop="sum_number"
          min-width="10%"
        ></el-table-column>
        <el-table-column prop="state1" label="第一审批人状态" min-width="15%">
          <template slot-scope="scope">
            <span v-if="scope.row.state1 == 0">已通过</span>
            <span v-if="scope.row.state1 == 1">未通过</span>
            <span v-if="scope.row.state1 == 2">待审批</span>
          </template>
        </el-table-column>
        <el-table-column prop="state2" label="第二审批人状态" min-width="15%">
          <template slot-scope="scope">
            <span v-if="scope.row.state2 == 0">已通过</span>
            <span v-if="scope.row.state2 == 1">未通过</span>
            <span v-if="scope.row.state2 == 2">待审批</span>
          </template>
        </el-table-column>
        <el-table-column label="审批" min-width="10%" v-if="examineShow">
          <template slot-scope="scope">
            <span>
              <el-button
                size="mini"
                @click="
                  allowList(
                    id,
                    power,
                    scope.row.order_id,
                    scope.row.state1,
                    scope.row.state2
                    /* scope.row.data_time */
                  )
                "
              >
                通过</el-button
              >
            </span>
            <span>
              <el-button
                size="mini"
                @click="
                  showRejectList(
                    scope.row.order_id,
                    scope.row.state1,
                    scope.row.state2,
                    scope.row.data_time
                  )
                "
              >
                驳回</el-button
              >
            </span>
          </template>
        </el-table-column>
        <el-table-column label="详情" width="50px">
          <template slot-scope="scope">
            <span class="toDetailE" @click="toDetailE(scope.row.order_id)">
              进入
            </span>
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
    <!--   驳回审批对话框 -->
    <el-dialog
      title="驳回原因"
      :visible.sync="disallowVisible"
      width="50%"
      :close-on-click-modal="false"
    >
      <!--   内容主体 -->
      <el-input v-model="reject"> </el-input>
      <!--   底部区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="disallowVisible = false">取 消</el-button>
        <!--         <el-button  id= "btn_sub" type="primary" @click="addList(); addButtonF()" >确 定</el-button> -->
        <el-button
          id="btn_sub"
          type="primary"
          @click="disallowList()"
          v-preventReClick
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getAllProduces,
  getAllProducesNoDate,
  allowMDetailE,
  allowQDetailE,
  disallowQDetailE,
  disalloMDetailE,
  allowQDetailEAll,
  allowMDetailEAll,
} from "../../api/api.js";
import { getToken } from "../../utils/setToken.js";
import moment from "moment";

export default {
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          /*  const date = new Date()
                const year = date.getFullYear()
                let month = date.getMonth()+1
                if(month >= 1 && month <=9){
                  month = '0' + month
                }
                const currentdate = year.toString() + month.toString()
               
                const timeyear = time.getFullYear()
                let timemonth = time.getMonth()+1
                if(timemonth >=1 && timemonth <=9){
                  timemonth = '0'+ timemonth
                }
                const timedate = timeyear.toString() + timemonth.toString()
                
                return  timedate > currentdate || currentdate > timedate */
          return time.getTime() > Date.now();
        },
      },
      userList: [],
      projectList: [],
      //通过的参数
      allowData: {
        work_num: 22222222,
        power: "e",
      },
      //多选框
      multipleSelection: [],
      mulShow: true,
      examineShow: true,
      //项目名称搜索框
      searchTime: "",
      state: 2,
      names: "",
      //驳回框表单
      rejectForm: [],
      //驳回原因
      reject: "",
      // 总条数
      totalCount: 0,
      // 默认显示第几页
      currentPage: 1,
      // 个数选择器
      pageSizes: [10, 20],
      // 默认每页显示的条数
      PageSize: 10,
      //控制驳回对话框的显示与隐藏
      disallowVisible: false,
      //控制添加表单加班输入框的显示与隐藏
      overFlag: 0,
      //控制添加表非标输入框的显示与隐藏
      noMarkFlag: 0,
      //控制修改表单加班输入框的显示与隐藏
      overFlagE: 0,
      //审批状态筛选
      StateList: [
        {
          value: 2,
          label: "待审批",
        },
        {
          value: 0,
          label: "已通过",
        },
        {
          value: 1,
          label: "未通过",
        },
      ],

      overListF: [
        {
          value: 0,
          label: "是",
        },
      ],
      overListT: [
        {
          value: 1,
          label: "否",
        },
      ],
      accList: [
        {
          value: 1,
          label: "否",
        },
        {
          value: 0,
          label: "是",
        },
      ],

      //添加明细表单的表单数据
      addForm: {
        work_num: "",
        data_time: "",
        project_name: "",
        project_role: "",
        work_overtime: "",
        account: "",
        mark_time: 0,
        mark_number: 0,
        quality_time: 0,
        quality_number: 0,
        test_mark_time: 0,
        traing_time: 0,
        question_time: 0,
        data_process_time: 0,
        analyse_time: 0,
        other_time: 0,
        loss_time: 0,
        note: "",
        over_mark_time: 0,
        over_mark_number: 0,
        over_quality_time: 0,
        over_quality_number: 0,
        over_test_mark_time: 0,
        over_traing_time: 0,
        over_question_time: 0,
        over_data_process_time: 0,
        over_analyse_time: 0,
        over_other_time: 0,
        over_loss_time: 0,
        over_note: "",
        noMark: "",
      },
      //添加表单的验证规则对象
      addFormRules: {
        data_time: [
          { required: true, message: "工作日期为必填项！", trigger: "blur" },
        ],
        project_name: [
          { required: true, message: "项目名称为必填项！", trigger: "blur" },
        ],
        project_role: [
          { required: true, message: "项目角色为必填项！", trigger: "blur" },
        ],
        work_overtime: [
          { required: true, message: "是否加班为必填项！", trigger: "blur" },
        ],
        noMark: [
          {
            required: true,
            message: "是否有常班非标为必填项！",
            trigger: "blur",
          },
        ],
        account: [
          {
            required: true,
            message: "是否需要核算绩效为必填项！",
            trigger: "blur",
          },
        ],
        mark_time: [
          { required: true, message: "标注工时为必填项！", trigger: "blur" },
        ],
        mark_number: [
          { required: true, message: "标注工作量为必填项！", trigger: "blur" },
        ],
        quality_time: [
          { required: true, message: "质检工时为必填项！", trigger: "blur" },
        ],
        quality_number: [
          { required: true, message: "质检工作量为必填项！", trigger: "blur" },
        ],
        test_mark_time: [
          { required: true, message: "试标工时为必填项！", trigger: "blur" },
        ],
        traing_time: [
          {
            required: true,
            message: "非标-培训工时为必填项！",
            trigger: "blur",
          },
        ],
        question_time: [
          {
            required: true,
            message: "非标-答疑工时为必填项！",
            trigger: "blur",
          },
        ],
        data_process_time: [
          {
            required: true,
            message: "非标-数据处理工时为必填项！",
            trigger: "blur",
          },
        ],
        analyse_time: [
          {
            required: true,
            message: "非标-复盘工时为必填项！",
            trigger: "blur",
          },
        ],
        other_time: [
          {
            required: true,
            message: "非标-其他工时为必填项！",
            trigger: "blur",
          },
        ],
        loss_time: [
          { required: true, message: "工损工时为必填项！", trigger: "blur" },
        ],
        over_mark_time: [
          {
            required: true,
            message: "加班-标注工时为必填项！",
            trigger: "blur",
          },
        ],
        over_mark_number: [
          {
            required: true,
            message: "加班-标注工作量为必填项！",
            trigger: "blur",
          },
        ],
        over_quality_time: [
          {
            required: true,
            message: "加班-质检工时为必填项！",
            trigger: "blur",
          },
        ],
        over_quality_number: [
          {
            required: true,
            message: "加班-质检工作量为必填项！",
            trigger: "blur",
          },
        ],
        over_test_mark_time: [
          {
            required: true,
            message: "加班-试标工时为必填项！",
            trigger: "blur",
          },
        ],
        over_traing_time: [
          {
            required: true,
            message: "加班-非标-培训工时为必填项！",
            trigger: "blur",
          },
        ],
        over_question_time: [
          {
            required: true,
            message: "加班-非标-答疑工时为必填项！",
            trigger: "blur",
          },
        ],
        over_data_process_time: [
          {
            required: true,
            message: "加班-非标-数据处理工时为必填项！",
            trigger: "blur",
          },
        ],
        over_analyse_time: [
          {
            required: true,
            message: "加班-非标-复盘工时为必填项！",
            trigger: "blur",
          },
        ],
        over_other_time: [
          {
            required: true,
            message: "加班-非标-其他工时为必填项！",
            trigger: "blur",
          },
        ],
        over_loss_time: [
          {
            required: true,
            message: "加班-工损工时为必填项！",
            trigger: "blur",
          },
        ],
      },
      //控制修改明细表单对话框的显示隐藏
      editDialogVisible: false,
      //查询的明细表单信息对象
      editId: 0,
      editForm: {
        id: "",
        data_time: "",
        project_name: "",
        project_role: "",
        work_overtime: "",
        account: "",
        mark_time: 0,
        mark_number: 0,
        quality_time: 0,
        quality_number: 0,
        test_mark_time: 0,
        traing_time: 0,
        question_time: 0,
        data_process_time: 0,
        analyse_time: 0,
        other_time: 0,
        loss_time: 0,
        note: 0,
        over_mark_time: 0,
        over_mark_number: 0,
        over_quality_time: 0,
        over_quality_number: 0,
        over_test_mark_time: 0,
        over_traing_time: 0,
        over_question_time: 0,
        over_data_process_time: 0,
        over_analyse_time: 0,
        over_other_time: 0,
        over_loss_time: 0,
        over_note: "",
      },
      //添加修改的验证规则对象
      eidtFormRules: {
        project_role: [
          { required: true, message: "项目角色为必填项！", trigger: "blur" },
        ],
        project_name: [
          { required: true, message: "项目名称为必填项！", trigger: "blur" },
        ],
        mark_time: [
          { required: true, message: "标注工时为必填项！", trigger: "blur" },
        ],
        mark_number: [
          { required: true, message: "标注工作量为必填项！", trigger: "blur" },
        ],
        quality_time: [
          { required: true, message: "质检工时为必填项！", trigger: "blur" },
        ],
        quality_number: [
          { required: true, message: "质检工作量为必填项！", trigger: "blur" },
        ],
        test_mark_time: [
          { required: true, message: "试标工时为必填项！", trigger: "blur" },
        ],
        traing_time: [
          { required: true, message: "培训工时为必填项！", trigger: "blur" },
        ],
        question_time: [
          { required: true, message: "答疑工时为必填项！", trigger: "blur" },
        ],
        data_process_time: [
          {
            required: true,
            message: "数据处理工时为必填项！",
            trigger: "blur",
          },
        ],
        analyse_time: [
          { required: true, message: "复盘工时为必填项！", trigger: "blur" },
        ],
        other_time: [
          {
            required: true,
            message: "非标其他工时为必填项！",
            trigger: "blur",
          },
        ],
        loss_time: [
          { required: true, message: "工损工时为必填项！", trigger: "blur" },
        ],
        work_category: [
          { required: true, message: "班次类别为必填项！", trigger: "blur" },
        ],
        data_time: [
          { required: true, message: "工作日期为必填项！", trigger: "blur" },
        ],
      },
    };
  },

  created() {
    this.id = JSON.parse(getToken("work_num"));
    this.addForm.work_num = JSON.parse(getToken("work_num"));
    /*     this.token = JSON.parse(getToken("admin_token")); */
    this.getList();
  },
  methods: {
    timedate() {
      console.log(this.searchTime);
    },
    //获取多选框的值
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //控制多选框列及审批列的显示隐藏
    mulToT() {
      this.mulShow = true;
      this.examineShow = true;
      this.search();
    },
    mulToF() {
      this.mulShow = false;
      this.examineShow = false;
      this.search();
    },
    //查询所有表单
    getList() {
      if (this.searchTime === null) {
        getAllProducesNoDate(
          this.id,
          this.currentPage,
          this.PageSize,
          this.state,
          this.names
        ).then((res) => {
          if (res.data.ret == 0) {
            this.userList = res.data.data_list;
            this.totalCount = res.data.total;
            this.work_num = res.data.work_num;
            this.power = res.data.permission;
          }
        });
      } else {
        getAllProduces(
          this.id,
          this.currentPage,
          this.PageSize,
          this.state,
          this.names,
          this.searchTime
        ).then((res) => {
          if (res.data.ret == 0) {
            this.userList = res.data.data_list;
            this.totalCount = res.data.total;
            this.work_num = res.data.work_num;
            this.power = res.data.permission;
          }
        });
      }
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
    filterO(value, row) {
      return row.work_overtime == value;
    },
    filterA(value, row) {
      return row.account == value;
    },
    toDetailE(id) {
      this.$router.push({
        path: "DetailE",
        query: {
          id: id,
        },
      });
    },
    //数字类型获取当前日期(数字类型)
    getNowDate() {
      let nowTime = moment()
        .format("YYYY-MM-DD")
        .replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, "");
      let nowTimeN = Number(nowTime);
      /*  console.log(nowTimeN);   */
      return nowTimeN;
    },
    //获取当天是几月份
    getNowMonth() {
      let date = new Date();
      let month = date.getMonth() + 1;
      /*   console.log(month); */
      return month;
    },
    //获取当天是周几
    getNowWeek() {
      let now = new Date();
      let day = now.getDay();
      /*  console.log(day); */
      return day;
    },

    //工作日期字符串转换成数字类型
    dateToNumber(date) {
      let dateFilter = date.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, "");
      let dateNumber = Number(dateFilter);
      /*       console.log(dateNumber); */
      return dateNumber;
    },
    //获取工作日期是几月
    getWorkDateMonth(workDate) {
      let month = workDate.split("-")[1];
      let monthNum = Number(month);
      /*      console.log(monthNum); */
      return monthNum;
    },
    //获取工作日期的日
    getWorkDateDay(workDate) {
      let Day = workDate.split("-")[2];
      let DayNum = Number(Day);
      /*       console.log(DayNum); */
      return DayNum;
    },
    //同月-通过是周几判断最多修改几天前的数据
    dataSub(week, nowDate, workDate) {
      if (week == 1 && nowDate - workDate > 3) {
        return false;
      } else if (week == 2 && nowDate - workDate > 4) {
        return false;
      } else if (week == 3 && nowDate - workDate > 5) {
        return false;
      } else if (week == 4 && nowDate - workDate > 6) {
        return false;
      } else if (week == 5 && nowDate - workDate > 7) {
        return false;
      } else if (week == 6 && nowDate - workDate > 1) {
        return false;
      } else if (week == 7 && nowDate - workDate > 2) {
        return false;
      } else {
        return true;
      }
    },
    //跨月判断
    //获取上个月最后一个周五
    getLastFriday() {
      var date = new Date();
      /*    console.log(date.getTime()); */
      var weekday = date.getDay();
      let lastFriday = new Date(
        date.getTime() - 1000 * 60 * 60 * 24 * (weekday + 2)
      );
      /*       console.log(lastFriday); */
      return lastFriday;
    },
    //不同月
    dataArray(workDate) {
      let now = new Date();
      let nowMonth = now.getMonth() + 1;
      let nowDate = now.getDate();
      console.log(nowDate);
      if (Number(nowDate) != 1) {
        return false;
      } else {
        let nowNum = Number(nowMonth + "" + nowDate);
        var arr = new Array();
        arr.push(nowNum);
        let lastFriday = this.getLastFriday();
        let lastFridayMonth = lastFriday.getMonth() + 1;
        let lastFridayDate = lastFriday.getDate();
        let lastFridayNum = Number(lastFridayMonth + "" + lastFridayDate);
        /*       console.log(lastFridayNum); */

        let date = now.getDate();
        let lastDay = new Date(now.setDate(date - 1)); //获取前一天
        /*     console.log(lastDay); */
        let lastDayMonth = lastDay.getMonth() + 1;
        let lastDayDate = lastDay.getDate();
        let lastDayNum = Number(lastDayMonth + "" + lastDayDate);
        /*       console.log(lastDayNum); */
        for (var i = lastFridayNum; i <= lastDayNum; i++) {
          arr.push(i);
        }
        console.log(arr);
        if (arr.indexOf(workDate) == -1) {
          return false;
        } else {
          return true;
        }
      }
    },

    //同意审批
    allowList(work_num, power, order_id, state1, state2) {
      var date = new Date();
      var year = date.getFullYear();
      var dateArr = [
        date.getMonth() + 1,
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
      ];
      var strDate =
        year +
        "/" +
        dateArr[0] +
        "/" +
        dateArr[1] +
        " " +
        dateArr[2] +
        ":" +
        dateArr[3] +
        ":" +
        dateArr[4];
      //质控专家
      if (power == "e") {
        if (state1 == 2) {
          allowQDetailE(work_num, order_id, strDate).then((res) => {
            if (res.data.ret == 0) {
              this.getList();
            }
          });
        } else {
          this.$message.error("不可操作!");
        }
        //项目经理
      } else {
        if (state1 == 0 && state2 == 2) {
          allowMDetailE(work_num, order_id, strDate).then((res) => {
            if (res.data.ret == 0) {
              this.getList();
            }
          });
        } else {
          this.$message.error("不可操作!");
        }
      }
    },
    /*   allowList1(work_num, power, order_id, state1, state2, data_time) {
      var nowDate = this.getNowDate();
      var nowMonth = this.getNowMonth();
      var nowWeek = this.getNowWeek();
      var workDate = this.dateToNumber(data_time);
      var workMonth = this.getWorkDateMonth(data_time);
      var workDay = this.getWorkDateDay(data_time);
      var workNum = Number(workMonth + "" + workDay);
      console.log(workNum);
      console.log(nowMonth);
      if (nowMonth != workMonth) {
        if (this.dataArray(workNum)) {
          var date = new Date();
          var year = date.getFullYear();
          var dateArr = [
            date.getMonth() + 1,
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds(),
          ];
          var strDate =
            year +
            "/" +
            dateArr[0] +
            "/" +
            dateArr[1] +
            " " +
            dateArr[2] +
            ":" +
            dateArr[3] +
            ":" +
            dateArr[4];
          //如果是质控专家
          if (power == "e") {
            if (state1 == 2) {
              allowQDetailE(work_num, order_id, strDate).then((res) => {
                if (res.data.ret == 0) {
                  this.getList();
                }
              });
            } else {
              this.$message.error("不可操作！");
            }
            //如果是项目经理
          } else {
            if (state1 == 0 && state2 == 2) {
              allowMDetailE(work_num, order_id, strDate).then((res) => {
                if (res.data.ret == 0) {
                  this.getList();
                }
              });
            } else {
              this.$message.error("不可操作！");
            }
          }
        } else {
          this.$message("已超过审批DDL！");
        }
      } else if (this.dataSub(nowWeek, nowDate, workDate)) {
        var date = new Date();
        var year = date.getFullYear();
        var dateArr = [
          date.getMonth() + 1,
          date.getDate(),
          date.getHours(),
          date.getMinutes(),
          date.getSeconds(),
        ];
        var strDate =
          year +
          "/" +
          dateArr[0] +
          "/" +
          dateArr[1] +
          " " +
          dateArr[2] +
          ":" +
          dateArr[3] +
          ":" +
          dateArr[4];
        //如果是质控专家
        if (power == "e") {
          if (state1 == 2) {
            allowQDetailE(work_num, order_id, strDate).then((res) => {
              if (res.data.ret == 0) {
                this.getList();
              }
            });
          } else {
            this.$message.error("不可操作！");
          }
          //如果是项目经理
        } else {
          if (state1 == 0 && state2 == 2) {
            allowMDetailE(work_num, order_id, strDate).then((res) => {
              if (res.data.ret == 0) {
                this.getList();
              }
            });
          } else {
            this.$message.error("不可操作！");
          }
        }
      } else {
        this.$message("已超过审批DDL！");
      }
    }, */
    //展示驳回表单
    showRejectList(order_id, state1, state2, data_time) {
      var nowDate = this.getNowDate();
      var nowMonth = this.getNowMonth();
      var nowWeek = this.getNowWeek();
      var workDate = this.dateToNumber(data_time);
      var workMonth = this.getWorkDateMonth(data_time);
      var workDay = this.getWorkDateDay(data_time);
      var workNum = Number(workMonth + "" + workDay);
      if (nowMonth != workMonth) {
        if (this.dataArray(workNum)) {
          this.disallowVisible = true;
          this.rejectForm.order_id = order_id;
          this.rejectForm.state1 = state1;
          this.rejectForm.state2 = state2;
        } else {
          this.$message("已超过审批DDL！");
        }
      } else if (this.dataSub(nowWeek, nowDate, workDate)) {
        this.disallowVisible = true;
        this.rejectForm.order_id = order_id;
        this.rejectForm.state1 = state1;
        this.rejectForm.state2 = state2;
      } else {
        this.$message("已超过审批DDL！");
      }
    },
    //驳回审批
    disallowList() {
      var date = new Date();
      var year = date.getFullYear();
      var dateArr = [
        date.getMonth() + 1,
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
      ];
      var strDate =
        year +
        "/" +
        dateArr[0] +
        "/" +
        dateArr[1] +
        " " +
        dateArr[2] +
        ":" +
        dateArr[3] +
        ":" +
        dateArr[4];
      if (this.power == "e") {
        if (this.rejectForm.state1 == 2 && this.reject != "") {
          disallowQDetailE(
            this.id,
            this.rejectForm.order_id,
            strDate,
            this.reject
          ).then((res) => {
            if (res.data.ret == 0) {
              //关闭对话框
              this.disallowVisible = false;
              this.getList();
              this.$message.success("操作成功！");
            }
          });
        } else {
          this.$message.error("无法操作！");
        }
      } else {
        if (
          this.rejectForm.state1 == 0 &&
          this.rejectForm.state2 == 2 &&
          this.reject != ""
        ) {
          disalloMDetailE(
            this.id,
            this.rejectForm.order_id,
            strDate,
            this.reject
          ).then((res) => {
            if (res.data.ret == 0) {
              //关闭对话框
              this.disallowVisible = false;
              this.getList();
              this.$message.success("操作成功！");
            } else {
              this.$message.error("无法操作！");
            }
          });
        }
      }
    },
    //同意审批批量
    allowListAll(workNum, power) {
  const date = new Date();
  const year = date.getFullYear();
  const [month, day, hours, minutes, seconds] = [
    date.getMonth() + 1,
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds()
  ];
  const strDate = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;

  let allList = [];
  let total = this.multipleSelection.length;

  if (power === "e") {
    allList = this.multipleSelection
      .filter((item) => item.state1 === 2)
      .map((item) => ({
        order_id: item.order_id,
        approver1: this.id,
        state1: 0,
        cause1: "",
        appro_date1: strDate
      }));
  } else {
    allList = this.multipleSelection
      .filter((item) => item.state1 === 0 && item.state2 === 2)
      .map((item) => ({
        order_id: item.order_id,
        approver2: this.id,
        state2: 0,
        cause2: "",
        appro_date2: strDate
      }));
  }

  allowMDetailEAll(workNum, allList, total).then((res) => {
    if (res.data.ret === 0) {
      this.getList();
      this.$message.success("已更新");
    }
  });
}
/*     allowListAll(work_num, power) {
      var date = new Date();
      var year = date.getFullYear();
      var dateArr = [
        date.getMonth() + 1,
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
      ];
      var strDate =
        year +
        "/" +
        dateArr[0] +
        "/" +
        dateArr[1] +
        " " +
        dateArr[2] +
        ":" +
        dateArr[3] +
        ":" +
        dateArr[4];
      //质控专家
      if (power == "e") {
        let total = this.multipleSelection.length;
        var allList = new Array();
        for (let i = 0; i < total; i++) {
          if (this.multipleSelection[i].state1 == 2) {
            allList.push({
              order_id: this.multipleSelection[i].order_id,
              approver1: this.id,
              state1: 0,
              cause1: "",
              appro_date1: strDate,
            });
          }
        }
        allowMDetailEAll(work_num, allList, total).then((res) => {
          if (res.data.ret == 0) {
            this.getList();
            this.$message.success("已更新");
          }
        });
      } else {
        let total = this.multipleSelection.length;
        var allList = new Array();
        for (let i = 0; i < total; i++) {
          if (
            this.multipleSelection[i].state1 == 0 &&
            this.multipleSelection[i].state2 == 2
          ) {
            allList.push({
              order_id: this.multipleSelection[i].order_id,
              approver2: this.id,
              state2: 0,
              cause2: "",
              appro_date2: strDate,
            });
          }
        }
        allowMDetailEAll(work_num, allList, total).then((res) => {
          if (res.data.ret == 0) {
            this.getList();
            this.$message.success("已更新");
          }
        });
      }
    }, */
    /*     allowListAll1(work_num, power) {
      var date = new Date();
      var year = date.getFullYear();
      var dateArr = [
        date.getMonth() + 1,
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
      ];
      var strDate =
        year +
        "/" +
        dateArr[0] +
        "/" +
        dateArr[1] +
        " " +
        dateArr[2] +
        ":" +
        dateArr[3] +
        ":" +
        dateArr[4];
      if (power == "e") {
        let total = this.multipleSelection.length;
        //console.log(total）
        var allList = new Array();
        for (let i = 0; i < this.multipleSelection.length; i++) {
          if (this.multipleSelection[i].state1 == 2) {
            var nowDate = this.getNowDate();
            var nowMonth = this.getNowMonth();
            var nowWeek = this.getNowWeek();
            var workDate = this.dateToNumber(
              this.multipleSelection[i].data_time
            );
            var workMonth = this.getWorkDateMonth(
              this.multipleSelection[i].data_time
            );
            var workDay = this.getWorkDateDay(
              this.multipleSelection[i].data_time
            );
            var workNum = Number(workMonth + "" + workDay);
            if (nowMonth != workMonth) {
              if (this.dataArray(workNum)) {
                allList.push({
                  order_id: this.multipleSelection[i].order_id,
                  approver1: this.id,
                  state1: 0,
                  cause1: "",
                  appro_date1: strDate,
                });
              }
            } else if (this.dataSub(nowWeek, nowDate, workDate)) {
              allList.push({
                order_id: this.multipleSelection[i].order_id,
                approver1: this.id,
                state1: 0,
                cause1: "",
                appro_date1: strDate,
              });
            }
          }
        }
        allowQDetailEAll(work_num, allList, total).then((res) => {
          if (res.data.ret == 0) {
            this.getList();
            this.$message.success("已更新");
          }
        });
      } else {
        let total = this.multipleSelection.length;
        //console.log(total）
        var allList = new Array();
        for (let i = 0; i < this.multipleSelection.length; i++) {
          if (
            this.multipleSelection[i].state1 == 0 &&
            this.multipleSelection[i].state2 == 2
          ) {
            var nowDate = this.getNowDate();
            var nowMonth = this.getNowMonth();
            var nowWeek = this.getNowWeek();
            var workDate = this.dateToNumber(
              this.multipleSelection[i].data_time
            );
            var workMonth = this.getWorkDateMonth(
              this.multipleSelection[i].data_time
            );
            var workDay = this.getWorkDateDay(
              this.multipleSelection[i].data_time
            );
            var workNum = Number(workMonth + "" + workDay);
            if (nowMonth != workMonth) {
              if (this.dataArray(workNum)) {
                allList.push({
                  order_id: this.multipleSelection[i].order_id,
                  approver1: this.id,
                  state2: 0,
                  cause2: "",
                  appro_date1: strDate,
                });
              }
            } else if (this.dataSub(nowWeek, nowDate, workDate)) {
              allList.push({
                order_id: this.multipleSelection[i].order_id,
                approver1: this.id,
                state2: 0,
                cause2: "",
                appro_date1: strDate,
              });
            }
          }
        }
        allowMDetailEAll(work_num, allList, total).then((res) => {
          if (res.data.ret == 0) {
            this.getList();
            this.$message.success("已更新");
          }
        });
      }
    }, */
  },
};
</script>

<style lang="less" scoped>
.emp-top {
  display: flex;
  justify-content: space-around;
}
.emp-top-des {
  font-size: 18px;
  font-weight: 600;
  padding-top: 10px;
}
.emp-top-add {
  padding-bottom: 1px;
}

.emp-data-des {
  font-size: 15px;
  font-weight: 600;
  padding-top: 8px;
}
</style>
