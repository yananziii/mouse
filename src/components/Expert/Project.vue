<template>
  <div>
      <el-card>
    <!--     面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Notice' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>团队管理</el-breadcrumb-item>
      <el-breadcrumb-item>我的项目</el-breadcrumb-item>
    </el-breadcrumb>
    </el-card>
    <el-card   >
      <el-row :gutter="40">
          <el-col :span="15" class="pro-data-des">
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
      <!-- 项目详情列表 -->
      <el-table :data="ProjectList"  stripe >
        <el-table-column label="项目id" prop="id" fixed>
          <template slot-scope="scope">
            <span
              class="idtoDelivery"
              @click="toDelicery(scope.row.id, scope.row.project_name, scope.row.tprice)"
            >
              {{ scope.row.id }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          fixed
          prop="project_state"
          label="项目状态"
          width="100"
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
          label="提报时间"
          prop="submit_time"
          min-width="100%"
        ></el-table-column>
        <el-table-column
          label="需求总量级"
          prop="data_amount"
          min-width="90%"
        ></el-table-column>
        <el-table-column label="数据单位" prop="unit"></el-table-column>
        <el-table-column
          label="期望交付标准率"
          prop="accuracy"
          min-width="110%"
        ></el-table-column>
        <el-table-column
          label="需求背景"
          prop="background"
          min-width="100%"
          :show-overflow-tooltip="true"
        >
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
        <el-table-column label="标注规则" width="100%" show-overflow-tooltip>
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
        <el-table-column
          label="期望交付时间"
          prop="delivery_time"
          min-width="100%"
        ></el-table-column>
        <el-table-column label="是否基于历史迭代需求" prop="is_repeat">
          <template slot-scope="scope">
            <span v-if="scope.row.is_repeat == 0">是</span>
            <span v-if="scope.row.is_repeat == 1">否</span>
          </template>
        </el-table-column>
        <el-table-column
          label="备注"
          prop="note"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          label="单价"
          prop="tprice"
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
                    scope.row.project_state,
                    scope.row.demand_role,
                    scope.row.project_number,
                    scope.row.project_name,
                    scope.row.submit_time,
                    scope.row.data_amount,
                    scope.row.unit,
                    scope.row.background,
                    scope.row.regulation,
                    scope.row.accuracy,
                    scope.row.delivery_time,
                    scope.row.is_repeat,
                    scope.row.note
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
      title="我的项目修改"
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
        <el-form-item label="项目id" prop="id">
          <el-input v-model="editForm.id" readonly></el-input>
        </el-form-item>
        <el-form-item label="项目状态" prop="project_state">
          <el-select v-model="editForm.project_state">
            <el-option
              v-for="item in stateList"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="需求方" prop="demand_role">
          <el-input v-model="editForm.demand_role"></el-input>
        </el-form-item>
        <el-form-item label="项目名称" prop="project_name">
          <el-input v-model="editForm.project_name" readonly></el-input>
        </el-form-item>
        <el-form-item label="项目编号" prop="project_number">
          <el-input v-model="editForm.project_number" readonly></el-input>
        </el-form-item>

        <el-form-item label="提报时间" prop="submit_time">
          <el-input v-model="editForm.submit_time" readonly></el-input>
        </el-form-item>
        <el-form-item label="需求总量级" prop="data_amount">
          <el-input
            v-model="editForm.data_amount"
            plachehold="请填写数字，不需要单位"
            readonly
          ></el-input>
        </el-form-item>
        <el-form-item label="数据单位" prop="unit">
          <el-input v-model="editForm.unit" readonly></el-input>
        </el-form-item>
        <el-form-item label="期望交付准确率" prop="accuracy">
          <el-input v-model="editForm.accuracy" readonly></el-input>
        </el-form-item>
        <el-form-item label="需求背景" prop="background">
          <el-input v-model="editForm.background" readonly></el-input>
        </el-form-item>
        <el-form-item label="标注规则" prop="regulation">
          <el-input v-model="editForm.regulation" readonly></el-input>
        </el-form-item>

        <el-form-item label="期望交付时间" prop="delivery_time">
          <el-input v-model="editForm.delivery_time" readonly></el-input>
        </el-form-item>
        <el-form-item label="是否基于历史需求迭代" prop="is_repeat">
          <el-select v-model="editForm.is_repeat" disabled>
            <el-option
              v-for="item in repeatList"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="note">
          <el-input v-model="editForm.note" readonly></el-input>
        </el-form-item>
        <el-form-item label="单价" prop="tprice">
          <el-input v-model="editForm.tprice" readonly></el-input>
        </el-form-item>
      </el-form>
      <!--     底部 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editList">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getProject, editProject, getProjectNoKey } from "../../api/api.js";
import { getToken } from "../../utils/setToken.js";
export default {
  data() {
    return {
      //获取项目信息的参数对象
      ProjectList: [],
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
      //控制修改表单对话框的显示隐藏
      editDialogVisible: false,
      //状态前后端对照
      stateList: [
        {
          label: "分发中",
          value: 0,
        },
        {
          label: "待开启",
          value: 1,
        },
        {
          label: "试标中",
          value: 2,
        },
        {
          label: "进行中",
          value: 3,
        },
        {
          label: "暂停中",
          value: 4,
        },
        {
          label: "已交付",
          value: 5,
        },
        {
          label: "终止需求",
          value: 6,
        },
      ],
      //是否历史需求前后端对照
      repeatList: [
        {
          label: "是",
          value: 0,
        },
        {
          label: "否",
          value: 1,
        },
      ],
      editForm: {
        id: "",
        project_state: "",
        demand_role: "",
        project_number: "",
        project_name: "",
        submit_time: "",
        data_amount: "",
        unit: "",
        background: "",
        regulation: "",
        accuracy: "",
        delivery_time: "",
        is_repeat: "",
        note: "",
      },
      //修改表单的验证规则
      editFormRules: {
        project_state: [
          { required: true, message: "项目状态为必填项！", trigger: "blur" },
        ],
        data_amount: [
          { required: true, message: "数据总量级必填项！", trigger: "blur" },
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
    getListNoKey(){
      getProjectNoKey(
        this.id,
        this.currentPage,
        this.PageSize
      ).then((res) => {
        if (res.data.ret == 0) {
          this.ProjectList = res.data.data_list;
          this.totalCount = res.data.total;
        }
      });
    },
    getList() {
      getProject(
        this.id,
        this.currentPage,
        this.PageSize,
        this.demands,
        this.names
      ).then((res) => {
        if (res.data.ret == 0) {
          this.ProjectList = res.data.data_list;
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
    showEditDialogList(
      id,
      project_state,
      demand_role,
      project_number,
      project_name,
      submit_time,
      data_amount,
      unit,
      background,
      regulation,
      accuracy,
      delivery_time,
      is_repeat,
      note,
      tprice
    ) {
      this.editDialogVisible = true;
      this.editForm.id = id;
      this.editForm.project_state = project_state;
      this.editForm.demand_role = demand_role;
      this.editForm.project_number = project_number;
      this.editForm.project_name = project_name;
      this.editForm.submit_time = submit_time;
      this.editForm.data_amount = data_amount;
      this.editForm.unit = unit;
      this.editForm.background = background;
      this.editForm.regulation = regulation;
      this.editForm.accuracy = accuracy;
      this.editForm.delivery_time = delivery_time;
      this.editForm.is_repeat = is_repeat;
      this.editForm.note = note;
      this.editForm.tprice = tprice;
    },
    /*  修改明细表单并提交 */
    editList() {
      //预校验
      this.$refs.editFormRef.validate((valid) => {
        if (!valid) return;
        editProject(this.editForm).then((res) => {
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
    //点击项目id转到相对应的数据包交付记录
    toDelicery(id, project_name,tprice) {
      this.$router.push({
        path: `Delivery`,
        query: {
          id: id,
          name: project_name,
          tprice: tprice
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.pro-data-des{
  font-size: 15px;
  font-weight: 600;
  padding-top: 8px;
}
.idtoDelivery {
  color: #f4a6ba;
}
</style>
