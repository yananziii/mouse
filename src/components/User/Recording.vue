<template>
  <div>
      <el-card>
    <!--     面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Notice' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>员工填写</el-breadcrumb-item>
      <el-breadcrumb-item>质量数据</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="0" class="rec-top">
      <el-col :span="16" class="rec-top-des">
          质量数据  
          </el-col>
          <el-col :span="6">              <input
              type="file"
              accept=".xls,.xlsx"
              class="upload-file"
              @change="Excel($event)"
            /></el-col>
      <el-col :span="2" class="rec-top-add">
    <el-button type="danger" @click="addDialogVisible = true"
    size="mini" >新增</el-button
          >
          </el-col>

          </el-row>
    </el-card >
    <!-- 卡片视图 -->
    <el-card >
      <el-row :gutter="40">
          <el-col :span="15" class="rec-data-des">
              表单
          </el-col>
        <el-col :span="3">
          <el-input placeholder="项目名称" v-model="names" 
          @keyup.enter.native="search"
          size="mini"
          clearable>
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-input placeholder="数据包" v-model="packets" 
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
      <el-table :data="recordingList"  stripe >
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
            <el-tooltip
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
                @click="removeRecordingListById(scope.row.id)"
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
    <!--   添加数据记录的对话框 -->
    <el-dialog
      title="表单填写"
      :visible.sync="addDialogVisible"
      width="50%"
      :close-on-click-modal="false"
    >
      <!--   内容主体 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="100px"
      >
        <el-form-item label="薯标系统项目id" prop="project_id">
          <el-input v-model="addForm.project_id"></el-input>
        </el-form-item>
        <el-form-item label="项目名称" prop="project_name">
          <el-input v-model="addForm.project_name"></el-input>
        </el-form-item>
        <el-form-item label="数据包id" prop="packet_id">
          <el-input v-model="addForm.packet_id"></el-input>
        </el-form-item>
        <el-form-item label="子任务id" prop="subtask_id">
          <el-input v-model="addForm.subtask_id"></el-input>
        </el-form-item>
        <el-form-item label="验收日期" prop="accept_time">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="addForm.accept_time"
            style="width: 100%"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            @change="getAddDate"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="供应商" prop="supplier">
          <el-input v-model="addForm.supplier"></el-input>
        </el-form-item>
        <el-form-item label="第几次验收" prop="return_times">
          <el-input v-model="addForm.return_times"
          type="number"
          oninput=" if(value>7)value=7;
                if(value<0)value=null;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);"></el-input>
        </el-form-item>
        <el-form-item label="作业类型" prop="type_job">
          <el-select v-model="addForm.type_job">
            <el-option label="质检" value="质检"></el-option>
            <el-option label="反质检" value="反质检"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="被抽检人邮箱" prop="besampl_email">
          <el-input v-model="addForm.besampl_email"></el-input>
        </el-form-item>
        <el-form-item label="被抽检人" prop="besampl_man">
          <el-input v-model="addForm.besampl_man"></el-input>
        </el-form-item>
        <el-form-item label="被抽检数" prop="besampl_num">
          <el-input v-model="addForm.besampl_num"></el-input>
        </el-form-item>
        <el-form-item label="被抽检错误数" prop="besamp_err">
          <el-input v-model="addForm.besamp_err"></el-input>
        </el-form-item>
        <el-form-item label="申诉量" prop="appeal_num">
          <el-input v-model="addForm.appeal_num"></el-input>
        </el-form-item>
        <el-form-item label="申诉通过量" prop="appeal_pass">
          <el-input v-model="addForm.appeal_pass"></el-input>
        </el-form-item>
        <el-form-item label="抽检人邮箱" prop="sampl_email">
          <el-input v-model="addForm.sampl_email"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="note">
          <el-input v-model="addForm.note"></el-input>
        </el-form-item>
      </el-form>
      <!--   底部区域-->
      <span slot="footer" class="dialog-footer">
        <el-button
          @click="
            addDialogVisible = false;
            addDialogClosed();
          "
          >取 消</el-button
        >
        <el-button id= "btn_sub" type="primary" @click="addList()" v-preventReClick>确 定</el-button>
      </span>
    </el-dialog>
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
          <el-input v-model="editForm.return_times"
          type="number"
          oninput=" if(value>7)value=7;
                if(value<0)value=null;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);"></el-input>
        </el-form-item>
        <el-form-item label="作业类型" prop="type_job">
          <el-select v-model="editForm.type_job">
            <el-option label="质检" value="质检"></el-option>
            <el-option label="反质检" value="反质检"></el-option>
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
        <el-button type="primary" @click="editList" >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import XLSX from "xlsx";
import {
  getRecording,
  addRecording,
  editRecording,
  removeRecording,
  submitExcel,
  getRecordingNoKey
} from "../../api/api.js";
import { getToken } from "../../utils/setToken.js";
export default {
  data() {
    return {
      // 是否禁用上传
      recordingList: [],
      totalCount: 0,
      //默认显示第几页
      currentPage: 1,
      // 个数选择器
      pageSizes: [5, 10],
      // 默认每页显示的条数
      PageSize: 5,
      //项目名称搜索框
      names: "",
      //项目包搜索框
      packets: "",
      //控制添加明细表单对话框的显示与隐藏
      addDialogVisible: false,
      addForm: {
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
      addFormRules: {
        project_id: [
          {
            required: true,
            message: "薯标系统项目id为必填项！",
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
        return_times: [
          {
            required: true,
            message: "第几次验收为必填项！",
            trigger: "blur",
          },
        ],
        type_job: [
          {
            required: true,
            message: "作业类型为必填项！",
            trigger: "blur",
          },
        ],
        besampl_num: [
          {
            required: true,
            message: "被抽检数为必填项！",
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
            message: "薯标系统项目id为必填项！",
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
        return_times: [
          {
            required: true,
            message: "第几次验收为必填项！",
            trigger: "blur",
          },
        ],
        type_job: [
          {
            required: true,
            message: "作业类型为必填项！",
            trigger: "blur",
          },
        ],
        besampl_num: [
          {
            required: true,
            message: "被抽检数为必填项！",
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
    this.addForm.work_num = JSON.parse(getToken("work_num"));
/*     this.token = JSON.parse(getToken("admin_token")); */
    this.getListNoKey();
  },
  methods: {
    //excel日期格式转json日期格式
    formatDate(timeValue) {
      let time = new Date((timeValue - 1) * 24 * 3600000 + 1);
      time.setYear(time.getFullYear() - 70);
      let year = time.getFullYear() + "";
      let month = time.getMonth() + 1 + "";
      let date = time.getDate() + "";
      if (this.leapyear(year)) {
        //如果是闰年
        date = time.getDate() - 1 + "";
      }
      return (
        year +
        "-" +
        (month < 10 ? "0" + month : month) +
        "-" +
        (date < 10 ? "0" + date : date)
      );
    },
    leapyear(year) {
      var flag = false;
      if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        flag = true;
      }
      return flag;
    },

    Excel(e) {
      let that = this;
      // 错误情况判断
      const files = e.target.files;
      if (files.length <= 0) {
        return false;
      } else if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
        this.$message({
          message: "上传格式不正确，请上传xls或者xlsx格式",
          type: "warning",
        });
        return false;
      } else {
        that.upload_file = files[0].name;
      }
      // 读取表格
      const fileReader = new FileReader();
      fileReader.onload = (ev) => {
        try {
          const data = ev.target.result;
          const workbook = XLSX.read(data, {
            type: "binary",
          });
          // 读取第一张表
          const wsname = workbook.SheetNames[0];
          const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]);

          // 定义一个新数组，存放处理后的表格数据
          that.lists = [];
          ws.forEach((item) => {
            const week = Object.keys(item); //获取参数名
            console.log(item[week[4]])
            item[week[4]] = item[week[4]].replace(/\./g, "-")
            //item[week[4]] = this.formatDate(item[week[4]]);
          });
          // 打印 ws 就可以看到读取出的表格数据
          console.log(ws);
          // 调用方法将lists数组发送给后端
          submitExcel(ws, this.id).then((res) => {
            if (res.data.ret == 0) {
              this.$message.success("添加表单成功");
              //刷新列表
              this.getList();
            }
          });
        } catch (e) {
          return false;
        }
      };
      fileReader.readAsBinaryString(files[0]);
    },

       //查询所有表单
       getListNoKey() {
      getRecordingNoKey(
        this.id,
        this.currentPage,
        this.PageSize
      ).then((res) => {
        if (res.data.ret == 0) {
          this.recordingList = res.data.datalist;
          this.totalCount = res.data.total;
        }
      });
    },
    //查询所有表单
    getList() {
      getRecording(
        this.id,
        this.currentPage,
        this.PageSize,
        this.names,
        this.packets,
      ).then((res) => {
        if (res.data.ret == 0) {
          this.recordingList = res.data.datalist;
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
    //添加表单更改日期格式
    getAddDate(date) {
      this.addForm.accept_time = date;
    },
    /* 监听添加表单对话框关闭重置 */
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
        //防止重复添加
/*         addButtonF(){
        document.getElementById("btn_sub").disabled="disabled";
      },
      addButtonT(){
        document.getElementById("btn_sub").disabled="";
      }, */
    //添加数据记录
    addList() {
      this.$refs.addFormRef.validate((valid) => {
        if (!valid) return;
        addRecording(this.addForm).then((res) => {
          if (res.data.ret == 0) {
            this.$message.success("添加表单成功");
            //隐藏添加用户对话框
            this.addDialogVisible = false;
            this.addDialogClosed();
            //刷新列表
            this.getListNoKey();
          }
        });
      });
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
        editRecording(this.editForm).then((res) => {
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
    //删除
     removeRecordingListById(id) {
      //弹框是否删除
      const confirmResult =  this.$confirm(
        "此操作将永久删除该明细表单, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          removeRecording(this.id, id).then((res) => {
            if (res.data.ret == 0) {
              this.$message.success("删除成功！");
              this.getListNoKey();
            }
          });
        })
        .catch(() => {
          this.message.error("删除取消");
        });
    },
  },
};
</script>

<style lang="less" scoped>
.rec-top{
  display: flex;
  justify-content: space-around;
}
.rec-top-des{
  font-size: 18px;
  font-weight: 600;
  padding-top: 10px;
}
.rec-top-add{
  padding-bottom: 1px;
}

.rec-data-des{
  font-size: 15px;
  font-weight: 600;
  padding-top: 8px;
}</style>
