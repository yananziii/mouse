<template>
  <div>
      <el-card>
    <!--     面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Notice' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>团队管理</el-breadcrumb-item>
      <el-breadcrumb-item>组内质量</el-breadcrumb-item>
    </el-breadcrumb>
    </el-card>
    <el-card >
      <el-row :gutter="40">
          <el-col :span="15" class="resc-data-des">
              表单
          </el-col>
        <el-col :span="3">
          <el-input placeholder="数据包" v-model="packets" 
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
      <!-- 个人明细列表区域 -->
      <el-table :data="recordingsList"  stripe >
        <el-table-column label="表单id" prop="id" fixed></el-table-column>
        <el-table-column
          label="薯标系统项目id"
          prop="project_id"
          min-width="110%"
          fixed
        ></el-table-column>
        <el-table-column
          label="项目名称"
          prop="project_name"
          min-width="200%"
          fixed
        ></el-table-column>
        <el-table-column
          label="数据包id"
          prop="packet_id"
          fixed
        ></el-table-column>
        <el-table-column
          label="子任务id"
          prop="subtask_id"
          fixed
        ></el-table-column>
        <el-table-column
          label="验收日期"
          prop="accept_time"
          min-width="120%"
        ></el-table-column>
        <el-table-column label="供应商" prop="supplier"></el-table-column>
        <el-table-column
          label="第几次验收"
          prop="return_times"
          min-width="100%"
        ></el-table-column>
        <el-table-column label="作业类型" prop="type_job"></el-table-column>
        <el-table-column
          label="被抽检人邮箱"
          prop="besampl_email"
          min-width="200%"
        ></el-table-column>
        <el-table-column label="被抽检人" prop="besampl_man"></el-table-column>
        <el-table-column label="被抽检数" prop="besampl_num"></el-table-column>
        <el-table-column
          label="被抽检错误数"
          prop="besamp_err"
          min-width="100%"
        ></el-table-column>
        <el-table-column label="申诉量" prop="appeal_num"></el-table-column>
        <el-table-column
          label="申诉通过量"
          prop="appeal_pass"
          min-width="100%"
        ></el-table-column>
        <el-table-column
          label="抽检人邮箱"
          prop="sampl_email"
          min-width="200%"
        ></el-table-column>
        <el-table-column label="备注" prop="note"></el-table-column>
        <el-table-column
          label="员工工号"
          prop="work_num"
          min-width="100%"
        ></el-table-column>
        <el-table-column
          label="实际准确率"
          prop="actual_accuray"
          min-width="100%"
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
                    scope.row.project_name,
                    scope.row.packet_id,
                    scope.row.subtask_id,
                    scope.row.accept_time,
                    scope.row.supplier,
                    scope.row.return_times,
                    scope.row.type_job,
                    scope.row.besampl_email,
                    scope.row.besampl_man,
                    scope.row.besampl_num,
                    scope.row.besamp_err,
                    scope.row.appeal_num,
                    scope.row.appeal_pass,
                    scope.row.sampl_email,
                    scope.row.note,
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
    <!-- 修改明细表单的对话框 -->
    <el-dialog
      title="修改数据记录"
      :visible.sync="editDialogVisible"
      width="50%"
      :close-on-click-modal="false"
    >
      <el-form
        :model="editForm"
        :rules="eidtFormRules"
        ref="editFormRef"
        label-width="100px"
      >
        <el-form-item label="表单id" prop="id">
          <el-input v-model="editForm.id" readonly></el-input>
        </el-form-item>
        <el-form-item label="薯标系统项目id" prop="project_id">
          <el-input v-model="editForm.project_id" readonly></el-input>
        </el-form-item>
        <el-form-item label="项目名称" prop="project_name">
          <el-input v-model="editForm.project_name"></el-input>
        </el-form-item>
        <el-form-item label="数据包id" prop="packet_id">
          <el-input v-model="editForm.packet_id"></el-input>
        </el-form-item>
        <el-form-item label="子任务id" prop="subtask_id">
          <el-input v-model="editForm.subtask_id"></el-input>
        </el-form-item>
        <el-form-item label="验收日期" prop="accept_time">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="editForm.accept_time"
            style="width: 100%"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            @change="geteditDate"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="供应商" prop="supplier">
          <el-input v-model="editForm.supplier"></el-input>
        </el-form-item>
        <el-form-item label="第几次验收" prop="return_times">
          <el-input v-model="editForm.return_times"></el-input>
        </el-form-item>
        <el-form-item label="作业类型" prop="type_job">
          <el-select v-model="editForm.type_job">
            <el-option label="质检" value="质检"></el-option>
            <el-option label="标注" value="标注"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="被抽检人邮箱" prop="besampl_email">
          <el-input v-model="editForm.besampl_email"></el-input>
        </el-form-item>
        <el-form-item label="被抽检人" prop="besampl_man">
          <el-input v-model="editForm.besampl_man"></el-input>
        </el-form-item>
        <el-form-item label="被抽检数" prop="besampl_num">
          <el-input v-model="editForm.besampl_num"></el-input>
        </el-form-item>
        <el-form-item label="被抽检错误数" prop="besamp_err">
          <el-input v-model="editForm.besamp_err"></el-input>
        </el-form-item>
        <el-form-item label="申诉量" prop="appeal_num">
          <el-input v-model="editForm.appeal_num"></el-input>
        </el-form-item>
        <el-form-item label="申诉通过量" prop="appeal_pass">
          <el-input v-model="editForm.appeal_pass"></el-input>
        </el-form-item>
        <el-form-item label="抽检人邮箱" prop="sampl_email">
          <el-input v-model="editForm.sampl_email"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="note">
          <el-input v-model="editForm.note"></el-input>
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
        <el-button type="primary" @click="editList">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRecordings, editRecordings, getRecordingsNoKey } from "../../api/api.js";
import { getToken } from "../../utils/setToken.js";
export default {
  data() {
    return {
      //项目名称搜索框
      names: "",
      //项目包搜索框
      packets: "",
      recordingsList: [],
      totalCount: 0,
      //默认显示第几页
      currentPage: 1,
      // 个数选择器
      pageSizes: [5, 10],
      // 默认每页显示的条数
      PageSize: 5,
      editDialogVisible: false,
      editForm: {
        id: "",
        project_id: "",
        project_name: "",
        packet_id: "",
        subtask_id: "",
        accept_time: "",
        supplier: "",
        return_times: "",
        type_job: "",
        besampl_email: "",
        besampl_man: "",
        besampl_num: "",
        besamp_err: "",
        appeal_num: "",
        appeal_pass: "",
        sampl_email: "",
        note: "",
        work_num: "",
      },
      eidtFormRules: {
        project_id: [
          {
            required: true,
            message: "项目id为必填项！",
            trigger: "blur",
          },
        ],
        project_name: [
          {
            required: true,
            message: "项目名称为必填项！",
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
        besampl_email: [
          {
            pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            message: "请输入正确邮箱格式",
          },
        ],
        sampl_email: [
          {
            pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            message: "请输入正确邮箱格式",
          },
        ],
      },
    };
  },
  created() {
    this.id = JSON.parse(getToken("work_num"));
/*     this.token = JSON.parse(getToken("admin_token")); */
    this.getListNoKey();
  },
  methods: {
    getListNoKey() {
      getRecordingsNoKey(
        this.id,
        this.currentPage,
        this.PageSize
      ).then((res) => {
        if (res.data.ret == 0) {
          this.recordingsList = res.data.datalist;
          this.totalCount = res.data.total;
        }
      });
    },
    //查询所有表单
    getList() {
      getRecordings(
        this.id,
        this.currentPage,
        this.PageSize,
        this.names,
        this.packets
      ).then((res) => {
        if (res.data.ret == 0) {
          this.recordingsList = res.data.datalist;
          this.totalCount = res.data.total;
        }
      });
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
    //修改表单更改日期格式
    geteditDate(date) {
      this.editForm.accept_time = date;
    },
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },
    //展示编辑明细表单的对话框
    showEditDialogList(
      id,
      project_id,
      project_name,
      packet_id,
      subtask_id,
      accept_time,
      supplier,
      return_times,
      type_job,
      besampl_email,
      besampl_man,
      besampl_num,
      besamp_err,
      appeal_num,
      appeal_pass,
      sampl_email,
      note,
      work_num
    ) {
      this.editDialogVisible = true;
      (this.editForm.id = id),
        (this.editForm.project_id = project_id),
        (this.editForm.project_name = project_name),
        (this.editForm.packet_id = packet_id),
        (this.editForm.subtask_id = subtask_id),
        (this.editForm.accept_time = accept_time),
        (this.editForm.supplier = supplier),
        (this.editForm.return_times = return_times),
        (this.editForm.type_job = type_job),
        (this.editForm.besampl_email = besampl_email),
        (this.editForm.besampl_man = besampl_man),
        (this.editForm.besampl_num = besampl_num),
        (this.editForm.besamp_err = besamp_err),
        (this.editForm.appeal_num = appeal_num),
        (this.editForm.appeal_pass = appeal_pass),
        (this.editForm.sampl_email = sampl_email),
        (this.editForm.note = note),
        (this.editForm.work_num = work_num);
    },
    editList() {
      //预校验
      this.$refs.editFormRef.validate((valid) => {
        if (!valid) return;
        editRecordings(this.editForm).then((res) => {
          if (res.data.ret == 0) {
            //关闭对话框
            this.editDialogVisible = false;
            //刷新数据列表
            this.getListNoKey();
            //提示
            this.$message.success("更新成功！");
          }
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.resc-data-des{
  font-size: 15px;
  font-weight: 600;
  padding-top: 8px;
}</style>
