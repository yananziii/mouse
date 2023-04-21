<template>
  <div>
    <el-card>
      <!--     面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Notice' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>团队管理</el-breadcrumb-item>
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
            placeholder="数据包id"
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
        <el-table-column label="项目id" prop="project_id" fixed>{{
          this.$route.query.id
        }}</el-table-column>
        <el-table-column label="数据包id" prop="pack" fixed></el-table-column>
        <el-table-column
          label="子任务id"
          prop="subtask"
          fixed
        ></el-table-column>
        <el-table-column label="进度状态" prop="progress_status" fixed>
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
        <el-table-column label="供应商" prop="supp" fixed></el-table-column>
        <el-table-column
          label="数据包需求量级"
          prop="packet_num"
          min-width="110%"
          fixed
        ></el-table-column>
        <el-table-column label="单价" prop="uprice">
          <!--   <template slot-scope="scope"> -->
          <!--           <span v-if="typeof (scope.row.uprice) == null">2</span>
          <span v-if="scope.row.uprice == 0">{{ this.$route.query.tprice }}</span>
          <span v-else>{{ uprice }}</span> -->
          <!--           <span v-if="scope.row.uprice == 0">{{this.$route.query.tprice}}</span> -->
          <!--   <span v-if="scope.row.uprice > 0">{{uprice}}</span>
           <span v-else>{{this.$route.query.tprice}}</span>  -->
          <!--  <span v-if="  typeof scope.row.uprice == undefined ">{{this.$route.query.tprice}}</span>   -->
          <!--  </template> -->
        </el-table-column>
        <el-table-column label="结算月份" prop="setmonth">
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
          label="计划完成时间"
          prop="plan_time"
          min-width="120%"
        ></el-table-column>
        <el-table-column
          label="实际交付时间(标注完成时间)"
          prop="mark_time"
          min-width="180%"
        ></el-table-column>
        <el-table-column
          label="最终交付准确率"
          prop="final_accuray"
          min-width="120%"
          fixed
        >
          <template slot-scope="scope">
            <span v-if="scope.row.accept7_rate != '-'">{{
              scope.row.accept7_rate
            }}</span>
            <span v-else-if="scope.row.accept6_rate != '-'">{{
              scope.row.accept6_rate
            }}</span>
            <span v-else-if="scope.row.accept5_rate != '-'">{{
              scope.row.accept5_rate
            }}</span>
            <span v-else-if="scope.row.accept4_rate != '-'">{{
              scope.row.accept4_rate
            }}</span>
            <span v-else-if="scope.row.accept3_rate != '-'">{{
              scope.row.accept3_rate
            }}</span>
            <span v-else-if="scope.row.accept2_rate != '-'">{{
              scope.row.accept2_rate
            }}</span>
            <span v-else>{{ scope.row.accept1_rate }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="标注作业平台"
          prop="mark_platform"
          min-width="100%"
        ></el-table-column>
        <el-table-column label="优先级" prop="priority_level"></el-table-column>
        <el-table-column
          label="质检Owner"
          prop="quality_person"
          min-width="90%"
        ></el-table-column>
        <el-table-column
          label="需求方提供元数据批次编号"
          prop="serial_number"
        ></el-table-column>
        <el-table-column label="备注" prop="note"></el-table-column>
        <el-table-column label="返修次数" prop="return_times"></el-table-column>
        <el-table-column label="申诉率" prop="appeal_rate"></el-table-column>
        <el-table-column
          label="申诉通过率"
          prop="appeal_via"
          min-width="100%"
        ></el-table-column>
        <el-table-column
          label="第1次实际准确率"
          prop="accept1_rate"
        ></el-table-column>
        <el-table-column
          label="第2次实际准确率	"
          prop="accept2_rate"
        ></el-table-column>
        <el-table-column
          label="第3次实际准确率"
          prop="accept3_rate"
        ></el-table-column>
        <el-table-column
          label="第4次实际准确率"
          prop="accept4_rate"
        ></el-table-column>
        <el-table-column
          label="第5次实际准确率"
          prop="accept5_rate"
        ></el-table-column>
        <el-table-column
          label="第6次实际准确率"
          prop="accept6_rate"
        ></el-table-column>
        <el-table-column
          label="第7次实际准确率	"
          prop="accept7_rate"
        ></el-table-column>
        <el-table-column label="操作" min-width="120%">
          <template slot-scope="scope">
            <!--           通过作用域插槽接收到了scope对象，scope.row可以拿到对应行的信息 -->
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
                    scope.row.project_id,
                    scope.row.pack,
                    scope.row.subtask,
                    scope.row.progress_status,
                    scope.row.packet_num,
                    scope.row.uprice,
                    scope.row.setmonth,
                    scope.row.plan_time,
                    scope.row.mark_time,
                    scope.row.final_accuray,
                    scope.row.mark_platform,
                    scope.row.priority_level,
                    scope.row.quality_person,
                    scope.row.serial_number,
                    scope.row.note,
                    scope.row.accept1_rate,
                    scope.row.accept2_rate,
                    scope.row.accept3_rate,
                    scope.row.accept4_rate,
                    scope.row.accept5_rate,
                    scope.row.accept6_rate,
                    scope.row.accept7_rate
                  )
                "
              ></el-button>
            </el-tooltip>
            <!--             <el-tooltip
              effect="dark"
              content="删除表单"
              placement="top"
              :enterable="false"
            >
              删除按钮
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="removeListById(scope.row.id)"
              ></el-button>
            </el-tooltip> -->
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
    <!--   添加数据记录的对话框 -->
    <!--   <el-dialog
      title="表单填写"
      :visible.sync="addDialogVisible"
      width="50%"
      :close-on-click-modal="false"
    >
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="100px"
      >
        <el-form-item label="数据包id" prop="packet_id">
          <el-input v-model="addForm.packet_id"></el-input>
        </el-form-item>
        <el-form-item label="子任务id" prop="subtask_id">
          <el-input v-model="addForm.subtask_id"></el-input>
        </el-form-item>
        <el-form-item label="进度状态" prop="progress_status">
          <el-select
            v-model="addForm.progress_status"
            placeholder="请选择进度状态"
          >
            <el-option label="标注中" value="1"></el-option>
            <el-option label="已标完" value="2"></el-option>
            <el-option label="验收中" value="3"></el-option>
            <el-option label="返修中" value="4"></el-option>
            <el-option label="内检中" value="5"></el-option>
            <el-option label="待复核" value="6"></el-option>
            <el-option label="待交付" value="7"></el-option>
            <el-option label="已交付" value="8"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数据包需求量级" prop="packet_num">
          <el-input v-model="addForm.packet_num"></el-input>
        </el-form-item>
        <el-form-item label="计划完成时间" prop="plan_time">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="addForm.plan_time"
            style="width: 100%"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            @change="getAddDateP"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="标注完成时间" prop="mark_time">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="addForm.mark_time"
            style="width: 100%"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            @change="getAddDateM"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="最终交付准确率" prop="final_accuray">
          <el-input
            v-model="addForm.final_accuray"
            v-only-number="{ max: 1, min: 0, precision: 2 }"
          ></el-input>
        </el-form-item>
        <el-form-item label="供应商" prop="supplier">
          <el-input v-model="addForm.supplier"></el-input>
        </el-form-item>
        <el-form-item label="标注作业平台" prop="mark_platform">
          <el-input v-model="addForm.mark_platform"></el-input>
        </el-form-item>
        <el-form-item label="优先级" prop="priority_level">
          <el-input v-model="addForm.priority_level"></el-input>
        </el-form-item>
        <el-form-item label="质检Owner" prop="quality_person">
          <el-input v-model="addForm.quality_person"></el-input>
        </el-form-item>
        <el-form-item label="需求方提供元数据批次编号" prop="serial_number">
          <el-input v-model="addForm.serial_number"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="note">
          <el-input v-model="addForm.note"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          @click="
            addDialogVisible = false;
            addDialogClosed();
          "
          >取 消</el-button
        >
        <el-button type="primary" @click="addList">确 定</el-button>
      </span>
    </el-dialog> -->
    <!--   修改数据记录的对话框 -->
    <el-dialog
      title="修改数据包交付记录"
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
        <el-form-item label="数据包id" prop="packet_id">
          <el-input v-model="editForm.packet_id"></el-input>
        </el-form-item>
        <el-form-item label="子任务id" prop="subtask_id">
          <el-input v-model="editForm.subtask_id"></el-input>
        </el-form-item>
        <el-form-item label="进度状态" prop="progress_status">
          <el-select v-model="editForm.progress_status">
            <el-option
              v-for="item in stateList"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数据包需求量级" prop="packet_num">
          <el-input v-model="editForm.packet_num"></el-input>
        </el-form-item>
        <el-form-item label="最终交付准确率" prop="final_accuray">
          <el-input v-model="editForm.final_accuray" readonly></el-input>
        </el-form-item>
        <el-form-item label="单价" prop="uprice">
          <el-input
            v-model="editForm.uprice"
            type="number"
            @blur="priceCheck(editForm.uprice)"
            oninput="
          if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1)
          "
          ></el-input>
        </el-form-item>
        <el-form-item label="结算月份" prop="setmonth">
          <el-select v-model="editForm.setmonth">
            <el-option
              v-for="item in mouthList"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="计划完成时间" prop="plan_time">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="editForm.plan_time"
            style="width: 100%"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            @change="getEditDateP"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="标注完成时间（实际交付日期）" prop="mark_time">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="editForm.mark_time"
            style="width: 100%"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            @change="getEditDateM"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="标注作业平台" prop="mark_platform">
          <el-input v-model="editForm.mark_platform"></el-input>
        </el-form-item>
        <el-form-item label="优先级" prop="priority_level">
          <el-input v-model="editForm.priority_level"></el-input>
        </el-form-item>
        <el-form-item label="质检Owner" prop="quality_person">
          <el-input v-model="editForm.quality_person"></el-input>
        </el-form-item>
        <el-form-item label="需求方提供元数据批次编号" prop="serial_number">
          <el-input v-model="editForm.serial_number"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="note">
          <el-input v-model="editForm.note"></el-input>
        </el-form-item>
      </el-form>
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
  getDeliveryNoKey,
  editDelivery,
  getDelivery,
  removeDelivery,
} from "../../api/api.js";
import { getToken } from "../../utils/setToken.js";
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
      /*       addDialogVisible: false, */
      addForm: {
        packet_id: "",
        subtask_id: "",
        progress_status: "",
        packet_num: "",
        setmonth: "",
        plan_time: "",
        mark_time: "",
        final_accuray: "",
        supplier: "",
        mark_platform: "",
        priority_level: "",
        quality_person: "",
        serial_number: "",
        note: "",
      },
      addFormRules: {
        project_id: [
          {
            required: true,
            message: "项目id为必填项！",
            trigger: "blur",
          },
        ],
        packet_id: [
          {
            required: true,
            message: "数据包id为必填项！",
            trigger: "blur",
          },
        ],
        subtask_id: [
          {
            required: true,
            message: "子任务id为必填项！",
            trigger: "blur",
          },
        ],
        progress_status: [
          {
            required: true,
            message: "进度状态为必填项！",
            trigger: "blur",
          },
        ],
        packet_num: [
          {
            required: true,
            message: "数据包需求量级为必填项！",
            trigger: "blur",
          },
        ],
        plan_time: [
          {
            required: true,
            message: "计划完成时间为必填项！",
            trigger: "blur",
          },
        ],
      },
      //控制修改明细表单对话框的显示与隐藏
      editDialogVisible: false,
      //状态前后端对照
      stateList: [
        {
          label: "标注中",
          value: 1,
        },
        {
          label: "已标完",
          value: 2,
        },
        {
          label: "验收中",
          value: 3,
        },
        {
          label: "返修中",
          value: 4,
        },
        {
          label: "内检中",
          value: 5,
        },
        {
          label: "待复核",
          value: 6,
        },
        {
          label: "待交付",
          value: 7,
        },
        {
          label: "已交付",
          value: 8,
        },
      ],
      mouthList: [
        {
          label: "不结算",
          value: 0,
        },
        {
          label: "一月",
          value: 1,
        },
        {
          label: "二月",
          value: 2,
        },
        {
          label: "三月",
          value: 3,
        },
        {
          label: "四月",
          value: 4,
        },
        {
          label: "五月",
          value: 5,
        },
        {
          label: "六月",
          value: 6,
        },
        {
          label: "七月",
          value: 7,
        },
        {
          label: "八月",
          value: 8,
        },
        {
          label: "九月",
          value: 9,
        },
        {
          label: "十月",
          value: 10,
        },
        {
          label: "十一月",
          value: 11,
        },
        {
          label: "十二月",
          value: 12,
        },
      ],
      editForm: {
        id: "",
        project_id: "",
        packet_id: "",
        subtask_id: "",
        progress_status: "",
        packet_num: "",
        uprice: "",
        setmonth: "",
        plan_time: "",
        mark_time: "",
        final_accuray: "",
        mark_platform: "",
        priority_level: "",
        quality_person: "",
        serial_number: "",
        note: "",
        accept1_rate: "",
        accept2_rate: "",
        accept3_rate: "",
        accept4_rate: "",
        accept5_rate: "",
        accept6_rate: "",
        accept7_rate: "",
        work_num: "",
      },
      editFormRules: {
        progress_status: [
          {
            required: true,
            message: "必填项！",
            trigger: "blur",
          },
        ],
        packet_num: [
          {
            required: true,
            message: "必填项！",
            trigger: "blur",
          },
        ],
        plan_time: [
          {
            required: true,
            message: "必填项！",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.id = JSON.parse(getToken("work_num"));
    this.editForm.work_num = JSON.parse(getToken("work_num"));
    console.log(this.editForm.work_num);
    let jg = this.$route.query.tprice;
    /*     this.token = JSON.parse(getToken("admin_token")); */
    this.jumpCheck();
    this.getListNoKey();
  },
  methods: {
    priceCheck(value) {
      var value = Math.round(parseFloat(value) * 100000) / 100000;
      var xsd = value.toString().split(".");
      if (xsd.length == 1) {
        value = value.toString() + ".00000";
        this.editForm.uprice = value;
      }
      if (xsd.length > 1) {
        if (xsd[1].length == 1) {
          value = value.toString() + "0000";
          this.editForm.uprice = value;
        } else {
          if (xsd[1].length == 2) {
            value = value.toString() + "000";
            this.editForm.uprice = value;
          } else {
            if (xsd[1].length == 3) {
              value = value.toString() + "00";
              this.editForm.uprice = value;
            } else {
              if (xsd[1].length == 4) {
                value = value.toString() + "0";
              }
              this.editForm.uprice = value;
            }
          }
        }
      }
    },
    jumpCheck() {
      if (
        this.$route.query == null ||
        this.$route.query == "" ||
        this.$route.query == undefined
      ) {
        this.$message.error("不允许跳转");
      }
      console.log(1);
    },
    getListNoKey() {
      getDeliveryNoKey(
        this.$route.query.id,
        this.id,
        this.currentPage,
        this.PageSize
      ).then((res) => {
        if (res.data.ret == 0) {
          this.DeliveryList = res.data.datalist;
          for (var i = 0; i < this.DeliveryList.length; i++) {
            if (this.DeliveryList[i].uprice > 0) {
              this.DeliveryList[i].uprice = this.DeliveryList[i].uprice;
            } else {
              this.DeliveryList[i].uprice = this.$route.query.tprice;
            }
          }
          this.totalCount = res.data.total;
        }
      });
    },
    getList() {
      getDelivery(
        this.$route.query.id,
        this.id,
        this.currentPage,
        this.PageSize,
        this.ids
      ).then((res) => {
        if (res.data.ret == 0) {
          this.DeliveryList = res.data.datalist;
          for (var i = 0; i < this.DeliveryList.length; i++) {
            if (this.DeliveryList[i].uprice > 0) {
              this.DeliveryList[i].uprice = this.DeliveryList[i].uprice;
            } else {
              this.DeliveryList[i].uprice = this.$route.query.tprice;
            }
          }
          this.totalCount = res.data.total;
        }
      });
    },
    search() {
      this.currentPage = 1;
      if (this.ids == "") return this.getListNoKey();
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
    //添加表单更改日期格式
    /*     getAddDateP(date) {
      this.addForm.plan_time = date;
    },
    getAddDateM(date) {
      this.addForm.mark_time = date;
    }, */
    /* 监听添加需求对话框关闭重置 */
    /*  addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    addList() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return;
        addDelivery(this.$route.query.id, this.addForm, this.token).then(
          (res) => {
            if (res.data.ret == 0) {
              this.$message.success("添加表单成功");
              //隐藏添加用户对话框
              this.addDialogVisible = false;
              this.addDialogClosed();
              //刷新列表
              this.getList();
            }
          }
        );
      });
    }, */
    //修改表单更改日期格式
    getEditDateP(date) {
      this.editForm.plan_time = date;
    },
    getEditDateM(date) {
      this.editForm.mark_time = date;
    },
    showEditDialogList(
      id,
      project_id,
      pack,
      subtask,
      progress_status,
      packet_num,
      uprice,
      setmonth,
      plan_time,
      mark_time,
      final_accuray,
      mark_platform,
      priority_level,
      quality_person,
      serial_number,
      note,
      accept1_rate,
      accept2_rate,
      accept3_rate,
      accept4_rate,
      accept5_rate,
      accept6_rate,
      accept7_rate
    ) {
      this.editDialogVisible = true;
      (this.editForm.id = id),
        (this.editForm.project_id = project_id),
        (this.editForm.subtask_id = subtask),
        (this.editForm.progress_status = progress_status),
        (this.editForm.packet_id = pack),
        (this.editForm.packet_num = packet_num),
        (this.editForm.uprice = uprice),
        (this.editForm.setmonth = setmonth),
        (this.editForm.plan_time = plan_time),
        (this.editForm.mark_time = mark_time),
        (this.editForm.mark_platform = mark_platform),
        (this.editForm.priority_level = priority_level),
        (this.editForm.quality_person = quality_person),
        (this.editForm.serial_number = serial_number),
        (this.editForm.note = note);
      if (accept7_rate != "-") {
        this.editForm.final_accuray = accept7_rate;
      } else if (accept6_rate != "-") {
        this.editForm.final_accuray = accept6_rate;
      } else if (accept5_rate != "-") {
        this.editForm.final_accuray = accept5_rate;
      } else if (accept4_rate != "-") {
        this.editForm.final_accuray = accept4_rate;
      } else if (accept3_rate != "-") {
        this.editForm.final_accuray = accept3_rate;
      } else if (accept2_rate != "-") {
        this.editForm.final_accuray = accept2_rate;
      } else if (accept1_rate != "-") {
        this.editForm.final_accuray = accept1_rate;
      }
      /*  if( accept1_rate != '_'){
          this.editForm.final_accuray = 1
        }
        else if( accept2_rate != '_'){
          this.editForm.final_accuray = 2
        }
        else if( accept3_rate != '_'){
          this.editForm.final_accuray = 3
        }
        else if( accept4_rate != '_'){
          this.editForm.final_accuray = 4
        }
        else if( accept5_rate != '_'){
          this.editForm.final_accuray = 5
        }
        else  if( accept6_rate != '_'){
          this.editForm.final_accuray = 6
        }
        else if( accept7_rate != '_'){
          this.editForm.final_accuray = 7
        } */

      /*        if(uprice == 0){
        this.editForm.uprice = tprice
       }else{
        this.editForm.uprice = uprice
       } */
    },
    checkEdit(state, time) {
  if (state == 8 && time === null) {
    return false;
  } else if (time != null && state != 8) {
    return false;
  } else {
    return true;
  }
},
editList() {
  // 预校验
  this.$refs.editFormRef.validate((valid) => {
    if (!valid) return;
    if (this.checkEdit(this.editForm.progress_status, this.editForm.mark_time)) {
      editDelivery(this.$route.query.id, this.editForm).then((res) => {
        if (res.data.ret == 0) {
          // 关闭对话框
          this.editDialogVisible = false;
          // 刷新数据列表
          this.getList();
          // 提示
          this.$message.success("更新成功！");
        }
      });
    } else if (this.editForm.progress_status == 8) {
      this.$message.error("数据包状态已交付时实际交付时间不能为空！");
    } else {
      this.$message.error("实际交付时间有值时项目状态必须为已交付！");
    }
  });
},
    //删除
    /*     removeListById(id) {
      //弹框是否删除
      const confirmResult = this.$confirm(
        "此操作将永久删除该明细表单, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          removeDelivery(this.$route.query.id, this.id, id).then(
            (res) => {
              if (res.data.ret == 0) {
                this.$message.success("删除成功！");
                this.getList();
              }
            }
          );
        })
        .catch(() => {
          this.$message.error("删除取消");
        });
    }, */
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
