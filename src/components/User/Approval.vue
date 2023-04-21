<template>
  <div>
    <el-card>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Notice' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>员工填写</el-breadcrumb-item>
        <el-breadcrumb-item>员工审批</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row :gutter="0" class="app-top">
        <el-col :span="22" class="app-top-des"> 流程审批 </el-col>
        <el-col :span="2" class="app-top-add">
          <!--   <el-button type="danger" @click="addDialogVisible = true ;addButtonT()"
    size="mini" >新增</el-button
          > -->
          <el-button type="danger" @click="addDialogVisible = true" size="mini"
            >新增</el-button
          >
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <el-row :gutter="40">
        <el-col :span="18" class="app-data-des"> 表单 </el-col>
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
          <el-button icon="el-icon-search" circle size="mini" @click="search">
          </el-button>
        </el-col>
      </el-row>
      <el-table :data="approvalList" stripe>
        <el-table-column
          label="工单id"
          prop="order_id"
          min-width="15%"
        ></el-table-column>
        <el-table-column prop="category" label="审批类型" min-width="15%">
          <template slot-scope="scope">
            <span v-if="scope.row.category == 'work'">员工信息</span>
            <span v-if="scope.row.category == 'project'">项目信息</span>
            <span v-if="scope.row.category == 'person'">个人信息</span>
            <span v-if="scope.row.category == 'allow'">权限开通</span>
          </template>
        </el-table-column>
        <el-table-column
          label="项目名称/修改人姓名"
          prop="modify_name"
          min-width="15%"
        ></el-table-column>
        <el-table-column label="修改字段" prop="field_name" min-width="15%">
          <template slot-scope="scope">
           <!--  <span v-if="scope.row.field_name == 'team_group'">团队组别</span>
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
            > -->
           {{getfiledName(scope.row.field_name)}}
          </template></el-table-column
        >
        <el-table-column
          label="修改后结果"
          prop="field_result"
          min-width="15%"
        ></el-table-column>
        <el-table-column label="第一审批人结果" prop="state1" min-width="15%">
          <template slot-scope="scope">
            <span v-if="scope.row.state1 == 0">已通过</span>
            <span v-if="scope.row.state1 == 1">未通过</span>
            <span v-if="scope.row.state1 == 2">待审批</span>
          </template></el-table-column
        >
        <el-table-column label="第二审批人结果" prop="state2" min-width="15%">
          <template slot-scope="scope">
            <span v-if="scope.row.state2 == 0">已通过</span>
            <span v-if="scope.row.state2 == 1">未通过</span>
            <span v-if="scope.row.state2 == 2">待审批</span>
          </template></el-table-column
        >
        <el-table-column label="操作" min-width="15%">
          <template slot-scope="scope">
            <el-tooltip
              effect="dark"
              content="修改审批"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="
                  showEditDialogList(
                    scope.row.order_id,
                    scope.row.form_id,
                    scope.row.category,
                    scope.row.modify_name,
                    scope.row.field_name,
                    scope.row.field_result,
                    scope.row.state1,
                    scope.row.state2,
                    scope.row.proposer_num
                  )
                "
              >
              </el-button>
            </el-tooltip>
            <el-tooltip
              effect="dark"
              content="撤回审批"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="
                  recallList(
                    scope.row.order_id,
                    scope.row.state1,
                    scope.row.state2
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
    <el-dialog
      title="审批"
      :visible.sync="editDialogVisible"
      width="50%"
      :close-on-click-modal="false"
    >
      <!--   修改审批 -->
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="135px"
        label-position="right"
      >
        <el-form-item label="审批类型" prop="category">
          <el-select v-model="editForm.category" class="timeS">
            <el-option
              label="项目信息"
              value="project"
              @click.native="nameToProject"
            ></el-option>
            <el-option
              label="个人信息"
              value="person"
              @click.native="nameToPeopleI"
            ></el-option>
            <el-option
              label="权限开通"
              value="allow"
              @click.native="nameToPeopleA"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="修改人姓名/项目名称" prop="modify_name">
          <el-input
            v-model="editForm.modify_name"
            class="inline-input"
          ></el-input>
        </el-form-item>
        <el-form-item label="修改字段" prop="field_name">
          <el-input v-model="editForm.field_name"></el-input>
        </el-form-item>
        <el-form-item label="修改后结果" prop="field_result">
          <el-input
            v-model="editForm.field_result"
            class="inline-input"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          @click="
            editDialogVisible = false;
            editDialogClosed();
          "
          >取 消</el-button
        >
        <!--         <el-button  id= "btn_sub" type="primary" @click="addList(); addButtonF()" >确 定</el-button> -->
        <el-button
          id="btn_sub"
          type="primary"
          @click="editList()"
          v-preventReClick
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="审批申请"
      :visible.sync="addDialogVisible"
      width="50%"
      :close-on-click-modal="false"
    >
      <!--   提报审批 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="135px"
        label-position="right"
      >
        <el-form-item label="审批类型" prop="category">
          <el-select v-model="addForm.category" class="timeS">
            <el-option
              label="项目信息"
              value="project"
              @click.native="nameToProject"
            ></el-option>
            <el-option
              label="个人信息"
              value="person"
              @click.native="nameToPeopleI"
            ></el-option>
            <el-option
              label="权限开通"
              value="allow"
              @click.native="nameToPeopleA"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="abc" prop="modify_name">
          <el-input
            v-model="addForm.modify_name"
            class="inline-input"
          ></el-input>
        </el-form-item>
        <el-form-item label="修改字段" prop="field_name">
          <el-select id="se1" v-model="addForm.field_name">
            <el-option
              v-for="item in this.FieldList"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="修改后结果" prop="field_result">
          <el-input
            v-model="addForm.field_result"
            class="inline-input"
          ></el-input>
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
        <!--         <el-button  id= "btn_sub" type="primary" @click="addList(); addButtonF()" >确 定</el-button> -->
        <el-button
          id="btn_sub"
          type="primary"
          @click="addList()"
          v-preventReClick
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getApproval,
  addApproval,
  editApproval,
  recallApproval,
} from "../../api/api.js";
import { getToken } from "../../utils/setToken.js";
export default {
  data() {
    return {
      approvalList: [],
      //控制项目名称/修改人姓名显示
      abc: "",
      state: 2,
      validatePrice: {},
      //控制添加明细表单对话框的显示与隐藏
      addDialogVisible: false,
      //控制修改明细表单对话框的显示与隐藏
      editDialogVisible: false,
      addForm: {
        category: "",
        modify_name: "",
        field_name: "",
        field_result: "",
        work_num: "",
      },
      postFormPro: {
        form_id: "pr",
        category: "project",
        modify_name: "",
        field_name: "",
        field_result: "",
        approver1: "220711001",
        state1: 0,
        cause1: " ",
        appro_date1: "",
        state2: 2,
        proposer_num: "",
      },
      postFormProElse: {
        form_id: "",
        category: "",
        modify_name: "",
        field_name: "",
        field_result: "",
        approver1: "220711001",
        state1: 2,
        state2: 2,
        proposer_num: "",
      },

      editForm: {
        order_id: "",
        form_id: "",
        category: "",
        modify_name: "",
        field_name: "",
        field_result: "",
        state1: "",
        state2: "",
        proposer_num: "",
      },
      putFormPro: {
        form_id: "pr",
        category: "project",
        modify_name: "",
        field_name: "",
        field_result: "",
        approver1: "220711001",
        state1: 0,
        cause1: " ",
        appro_date1: "",
        approver2: "",
        state2: 2,
        proposer_num: "",
        cause2: " ",
        appro_date2: "",
        proposer_num: "",
      },
      putFormProElse:{
        form_id: "",
        category: "",
        modify_name: "",
        field_name: "",
        field_result: "",
        approver1: "220711001",
        state1: 2,
        cause1: " ",
        appro_date1: "",
        state2: 2,
        cause2: " ",
        appro_date2: "",
        proposer_num: "",
      },
      // 总条数
      totalCount: 0,
      // 默认显示第几页
      currentPage: 1,
      // 个数选择器
      pageSizes: [5, 10],
      // 默认每页显示的条数
      PageSize: 5,

      addFormRules: {
        category: [{ required: true, trigger: "blur" }],
        modify_name: [{ required: true, trigger: "blur" }],
        field_name: [{ required: true, trigger: "blur" }],
        field_result: [{ required: true, trigger: "blur" }],
      },

      editFormRules: {
        category: [{ required: true, trigger: "blur" }],
        modify_name: [{ required: true, trigger: "blur" }],
        field_name: [{ required: true, trigger: "blur" }],
        field_result: [{ required: true, trigger: "blur" }],
      },

      FieldList: [],
    };
  },
  created() {
    this.id = JSON.parse(getToken("work_num"));
    this.postFormPro.proposer_num = this.id;
    this.postFormProElse.proposer_num = this.id;
    this.putFormPro.proposer_num = this.id;
    this.putFormProElse.proposer_num = this.id;
    this.addForm.work_num = JSON.parse(getToken("work_num"));
    this.getList();
  },
  methods: {
    getList() {
      getApproval(this.id, this.currentPage, this.PageSize, this.state).then(
        (res) => {
          if (res.data.ret == 0) {
            this.approvalList = res.data.data_list;
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
    /* 监听添加表单对话框关闭重置 */
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    /* 监听添加表单对话框关闭重置 */
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },
    nameToPeopleI() {
      this.abc = "修改人姓名";
      this.FieldList = [
        {
          value: "team_group",
          label: "团队组别",
        },
        {
          value: "work_role",
          label: "员工类型",
        },
      ];
    },
    nameToPeopleA() {
      this.abc = "修改人姓名";
      this.FieldList = [
        {
          value: "power",
          label: "系统权限",
        },
      ];
    },
    nameToProject() {
      this.abc = "项目名称";
      this.FieldList = [
        {
          value: "delivery_time",
          label: "期望交付时间",
        },
        {
          value: "submit_time",
          label: "提报时间",
        },
        {
          value: "data_amount",
          label: "需求总量级",
        },
        {
          value: "unit",
          label: "数据单位",
        },
        {
          value: "background",
          label: "需求背景",
        },
        {
          value: "regulation",
          label: "标注规则",
        },
        {
          value: "accuracy",
          label: "期望交付准确率",
        },
        {
          value: "is_repeat",
          label: "是否给予基于历史迭代需求",
        },
        {
          value: "tprice",
          label: "单价",
        },
        {
          value: "note",
          label: "备注",
        },
        {
          value: "project_manager",
          label: "项目经理",
        },
        {
          value: "project_expert",
          label: "质控专家",
        },
      ];
    },
    addList() {
      this.$refs.addFormRef.validate((valid) => {
        if (!valid) return;
        if (this.addForm.category == "project") {
          var postForm = {
            form_id: "pr",
            category: "project",
            modify_name: "",
            field_name: "",
            field_result: "",
            approver1: "220711001",
            state1: 0,
            cause1: " ",
            appro_date1: "",
            state2: 2,
            proposer_num: this.id,
          };
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
          postForm.modify_name = this.addForm.modify_name;
          postForm.field_name = this.addForm.field_name;
          postForm.field_result = this.addForm.field_result;
          postForm.appro_date1 = strDate;
          addApproval(postForm).then((res) => {
            if (res.data.ret == 0) {
              this.addDialogVisible = false;
              this.$message.success("提交成功!");
              this.getList();
            }
          });
        } else {
          var postForm = {
            form_id: "",
            category: "",
            modify_name: "",
            field_name: "",
            field_result: "",
            approver1: "220711001",
            state1: 2,
            state2: 2,
            proposer_num: this.id,
          };
          postForm.form_id = this.addForm.form_id;
          postForm.category = this.addForm.category;
          postForm.modify_name = this.addForm.modify_name;
          postForm.field_name = this.addForm.field_name;
          postForm.field_result = this.addForm.field_result;
          addApproval(postForm).then((res) => {
            if (res.data.ret == 0) {
              this.$message.success("提交成功!");
              //隐藏添加用户对话框
              this.addDialogVisible = false;
              this.addDialogClosed();
              this.getList();
            }
          });
        }
      });
    },
    //展示编辑明细表单的对话框
    showEditDialogList(
      order_id,
      form_id,
      category,
      modify_name,
      field_name,
      field_result,
      state1,
      state2,
      proposer_num
    ) {
      if (state1 == 1 || state2 == 1) {
        this.editForm.order_id = order_id;
        this.editForm.form_id = form_id;
        this.editForm.category = category;
        this.editForm.modify_name = modify_name;
        this.editForm.field_name = this.getfiledName(field_name);
        this.editForm.field_result = field_result;
        this.editForm.state1 = state1;
        this.editForm.state2 = state2;
        this.editForm.proposer_num = proposer_num;
        this.editDialogVisible = true;
      } else {
        this.$message.error("不可操作!");
      }
    },
    getfiledName(name){
       if(name == "team_group"){
        return "团队组别";
       }else if(name == "work_role"){
        return "员工类型";
       }else if(name == "power"){
        return "系统权限";
       }else if(name == "delivery_time"){
        return "期望交付时间";
       }else if(name == "submit_time"){
        return "提报时间";
       }else if(name == "data_amount"){
        return "需求总量级";
       }else if(name == "unit"){
        return "数据单位";
       }else if(name == "background"){
        return "需求背景";
       }else if(name == "regulation"){
        return "标注规则";
       }else if(name == "accuracy"){
        return "期望交付准确率";
       }else if(name == "is_repeat"){
        return "是否给予基于历史迭代需求";
       }else if(name == "tprice"){
        return "单价";
       }else if(name == "note"){
        return "备注";
       }else if(name == "project_manager"){
        return "项目经理";
       }else if(name == "project_expert"){
        return "质控专家";
       }else{
        return name
       }
    },
    editList() {
      this.$refs.editFormRef.validate((valid) => {
        if (!valid) return;
        if (this.editForm.category == "project") {
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
          this.putFormPro.modify_name = this.editForm.modify_name;
          this.putFormPro.field_name = this.editForm.field_name;
          this.putFormPro.field_result = this.editForm.field_result;
          this.putFormPro.appro_date1 = strDate;

          editApproval(this.editForm.order_id, this.putFormPro).then((res) => {
            if (res.data.ret == 0) {
              this.$message.success("修改成功!");
              this.editDialogVisible = false;
              this.editDialogClosed();
              this.getList();
            }
          });
        } else {
          this.putFormProElse.form_id = this.editForm.form_id;
          this.putFormProElse.category = this.editForm.category;
          this.putFormProElse.modify_name = this.editForm.modify_name;
          this.putFormProElse.field_name = this.editForm.field_name;
          this.putFormProElse.field_result = this.editForm.field_result;
          console.log(this.putFormProElse.field_name)
          console.log(this.editForm.field_name)
          editApproval(this.editForm.order_id, this.putFormProElse).then(
            (res) => {
              if (res.data.ret == 0) {
                this.$message.success("修改成功!");
                this.editDialogVisible = false;
                this.editDialogClosed();
                this.getList();
              }
            }
          );
        }
      });
    },
    recallList(id, state1, state2) {
      if (state1 == 2 && state2 == 2) {
        recallApproval(this.id, id).then((res) => {
          if (res.data.ret == 0) {
            this.$message.success("删除成功！");
            this.getList();
          }
        });
        console.log(2);
      } else {
        this.$message.error("无法操作!");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.app-top {
  display: flex;
  justify-content: space-around;
}
.app-top-des {
  font-size: 18px;
  font-weight: 600;
  padding-top: 10px;
}
.app-top-add {
  padding-bottom: 1px;
}
.app-data-des {
  font-size: 15px;
  font-weight: 600;
  padding-top: 8px;
}
</style>
