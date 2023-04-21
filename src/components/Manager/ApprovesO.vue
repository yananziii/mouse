<template>
    <div>
      <el-card>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/Notice' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>项资运营</el-breadcrumb-item>
          <el-breadcrumb-item>流程审批</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row :gutter="0" class="apps-top">
          <el-col :span="24" class="apps-top-des"> 流程审批 </el-col>
        </el-row>
      </el-card>
      <el-card>
        <el-row :gutter="40">
          <el-col :span="18" class="apps-data-des"> 表单 </el-col>
          <el-col :span="3">
            <el-select v-model="state" size="mini" placeholder="请选择状态">
              <el-option
                label="待审批"
                :value="2"
                @click.native="search"
              ></el-option>
              <el-option
                label="未通过"
                :value="1"
                @click.native="search"
              ></el-option>
              <el-option
                label="已通过"
                :value="0"
                @click.native="search"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-select v-model="category" size="mini" placeholder="请选择类型">
              <el-option
                label="项目信息"
                value="project"
                @click.native="search"
              ></el-option>
              <el-option
                label="个人信息"
                value="person"
                @click.native="search"
              ></el-option>
              <el-option
                label="员工信息"
                value="allow"
                @click.native="search"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-table :data="approvaslList" stripe>
          <el-table-column
            label="工单id"
            prop="order_id"
            min-width="15%"
          ></el-table-column>
          <el-table-column
          label="姓名"
          prop="first_name"
          min-width="15%"
        ></el-table-column>
        <el-table-column label="身份" prop="usertype" min-width="15%">
          <template slot-scope="scope">
            <span v-if="scope.row.usertype == 'prm'">项目经理</span>
            <span v-if="scope.row.usertype == 'exp'">质控专家</span>
            <span v-if="scope.row.usertype == 'usr'">一线员工</span>
          </template></el-table-column
        >
        <el-table-column label="审批类型" prop="category" min-width="15%">
          <template slot-scope="scope">
            <span v-if="scope.row.category == 'work'">员工信息</span>
            <span v-if="scope.row.category == 'project'">项目信息</span>
            <span v-if="scope.row.category == 'person'">个人信息</span>
            <span v-if="scope.row.category == 'allow'">权限开通</span>
          </template></el-table-column
        >
          <el-table-column
            label="项目名称/修改人姓名"
            prop="modify_name"
            min-width="15%"
          ></el-table-column>
          <el-table-column label="修改字段" prop="field_name" min-width="15%">
            <template slot-scope="scope">
              <span v-if="scope.row.field_name == 'team_group'">团队组别</span>
              <span v-if="scope.row.field_name == 'work_role'">员工类型</span>
              <span v-if="scope.row.field_name == 'power'">系统权限</span>
              <span v-if="scope.row.field_name == 'delivery_time'"
                >期望交付时间</span
              >
              <span v-if="scope.row.field_name == 'submit_time'">提报时间</span>
              <span v-if="scope.row.field_name == 'data_amount'">需求总量级</span>
              <span v-if="scope.row.field_name == 'unit'">数据单位</span>
              <span v-if="scope.row.field_name == 'background'">需求背景</span>
              <span v-if="scope.row.field_name == 'regulation'">标注规则</span>
              <span v-if="scope.row.field_name == 'accuracy'"
                >期望交付准确率</span
              >
              <span v-if="scope.row.field_name == 'is_repeat'"
                >是否给予基于历史迭代需求</span
              >
              <span v-if="scope.row.field_name == 'tprice'">单价</span>
              <span v-if="scope.row.field_name == 'note'">备注</span>
              <span v-if="scope.row.field_name == 'project_manager'"
                >项目经理</span
              >
              <span v-if="scope.row.field_name == 'project_expert'"
                >质控专家</span
              >
            </template></el-table-column
          >
          <el-table-column
            label="修改后结果"
            prop="field_result"
            min-width="15%"
          ></el-table-column>
          <el-table-column
            label="第一审批人审批状态"
            prop="state1"
            min-width="15%"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.state1 == 0">已通过</span>
              <span v-if="scope.row.state1 == 1">未通过</span>
              <span v-if="scope.row.state1 == 2">待审批</span>
            </template></el-table-column
          >
          <el-table-column
            label="第二审批人审批状态"
            prop="state1"
            min-width="15%"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.state2 == 0">已通过</span>
              <span v-if="scope.row.state2 == 1">未通过</span>
              <span v-if="scope.row.state2 == 2">待审批</span>
            </template></el-table-column
          >
          <el-table-column label="审批" min-width="10%">
            <template slot-scope="scope">
              <span>
                <el-button
                  size="mini"
                  @click="
                    allowList(
                      id,
                      scope.row.order_id,
                      scope.row.state1,
                      scope.row.state2
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
                      id,
                      scope.row.order_id,
                      scope.row.state1,
                      scope.row.state2
                    )
                  "
                >
                  驳回</el-button
                >
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
            @click="disAllowList()"
            v-preventReClick
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </template>
  
  <script>
  import { getApprovesO, editApprovesO } from "../../api/api.js";
  import { getToken } from "../../utils/setToken.js";
  export default {
    data() {
      return {
        approvaslList: [],
        state: 2,
        category:"project",
        // 总条数
        totalCount: 0,
        // 默认显示第几页
        currentPage: 1,
        // 个数选择器
        pageSizes: [5, 10],
        // 默认每页显示的条数
        PageSize: 5,
        //控制驳回对话框的显示与隐藏
        disallowVisible: false,
        //驳回框表单
        rejectForm: [],
        //驳回原因
        reject: "",
        //审批状态筛选
        StateList: [
          {
            value: 3,
            label: "全部",
          },
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
        editForm: {
          approver2: "",
          state2: 0,
          cause2: "",
          appro_date2: "",
        },
      };
    },
    created() {
      this.id = JSON.parse(getToken("work_num"));
      this.editForm.approver2 = this.id;
      this.getList();
    },
    methods: {
      getList() {
        getApprovesO(this.id, this.currentPage, this.PageSize, this.state, this.category).then(
          (res) => {
            if (res.data.ret == 0) {
              this.approvaslList = res.data.data_list;
            
              this.totalCount = res.data.total;
            }
          }
        );
      },
      allowList(id, order_id, state1, state2) {
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
        this.editForm.appro_date2 = strDate;
        if (state1 == 0 && state2 == 2) {
          editApprovesO(id, order_id, this.editForm).then((res) => {
            if (res.data.ret == 0) {
              this.$message.success("操作成功");
              this.getList();
            }
          });
        } else {
          this.$message.error("无法操作！");
        }
      },
      //展示驳回表单
      showRejectList(work_num, order_id, state1, state2) {
        this.disallowVisible = true;
        this.rejectForm.work_num = work_num;
        this.rejectForm.order_id = order_id;
        this.rejectForm.state1 = state1;
        this.rejectForm.state2 = state2;
      },
      disAllowList() {
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
        this.editForm.appro_date2 = strDate;
        this.editForm.state2 = 1;
        this.editForm.cause2 = this.reject;
        if (this.rejectForm.state1 == 0 && this.rejectForm.state2 == 2 && this.reject != "") {
          editApprovesO(
            this.rejectForm.work_num,
            this.rejectForm.order_id,
            this.editForm
          ).then((res) => {
            if (res.data.ret == 0) {
              this.$message.success("操作成功");
              //关闭对话框
              this.disallowVisible = false;
              this.getList();
            } 
          });
        }else {
              this.$message.error("无法操作！");
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
    },
  };
  </script>
  
  <style lang="less" scoped>
  .apps-top {
    display: flex;
    justify-content: space-around;
  }
  .apps-top-des {
    font-size: 18px;
    font-weight: 600;
    padding-top: 10px;
  }
  .apps-top-add {
    padding-bottom: 1px;
  }
  .apps-data-des {
    font-size: 15px;
    font-weight: 600;
    padding-top: 8px;
  }
  </style>
  