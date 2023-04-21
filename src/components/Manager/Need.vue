<template>
  <div>
      <el-card>
    <!--     面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Notice' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>项资运营</el-breadcrumb-item>
      <el-breadcrumb-item>需求管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row :gutter="0" class="need-top">
      <el-col :span="22" class="need-top-des">
          按项资承接人分组  
          </el-col>
      <el-col :span="2" class="need-top-add">
    <el-button type="danger" @click="addDialogVisible = true"
    size="mini" >需求提报</el-button
          >
          </el-col>
          </el-row>
      </el-card>
    <!-- 卡片视图 -->
    <el-card >
      <el-row :gutter="40">
          <el-col :span="15" class="need-data-des">
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
      <!-- 需求管理列表 -->
      <el-table :data="needList"  stripe >
        <el-table-column label="项目id" prop="id" fixed></el-table-column>
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
          min-width="170%"
          fixed
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
        <el-table-column
          prop="project_manager"
          label="项目经理"
          width="100"

        >
      </el-table-column>
        <el-table-column
          label="质控专家"
          prop="project_expert"
        ></el-table-column>
        <el-table-column
          label="项资管理员工号"
          prop="work_num"
          min-width="110%"
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
                    scope.row.note,
                    scope.row.tprice,
                    scope.row.project_manager,
                    scope.row.project_expert,
                    scope.row.work_num
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
    <!-- 添加需求管理表单的对话框 -->
    <el-dialog
      title="需求提报"
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
        <el-form-item label="项目状态" prop="project_state">
          <el-select
            v-model="addForm.project_state"
            placeholder="请选择项目状态"
          >
            <el-option label="分发中" value="0"></el-option>
            <el-option label="待开启" value="1"></el-option>
            <el-option label="试标中" value="2"></el-option>
            <el-option label="进行中" value="3"></el-option>
            <el-option label="暂停中" value="4"></el-option>
            <el-option label="已交付" value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="需求方" prop="demand_role">
          <el-input v-model="addForm.demand_role"></el-input>
        </el-form-item>
        <el-form-item label="项目名称" prop="project_name">
          <el-input v-model="addForm.project_name"></el-input>
        </el-form-item>
        <el-form-item label="项目编号" prop="project_number">
          <el-input v-model="addForm.project_number"></el-input>
        </el-form-item>

        <el-form-item label="提报时间" prop="submit_time">
          <el-input
            type="date"
            placeholder="选择日期"
            v-model="addForm.submit_time"
            style="width: 100%"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            @change="getAddDateS"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="需求总量级"
          prop="data_amount"
          plachehold="请填写数字，不需要单位"
        >
          <el-input
            v-model="addForm.data_amount"
            type="number"
            step="100"
            min="0"
          ></el-input>
        </el-form-item>
        <el-form-item label="数据单位" prop="unit">
          <el-input v-model="addForm.unit"></el-input>
        </el-form-item>
        <el-form-item label="期望交付准确率" prop="accuracy">
          <el-input
            v-model="addForm.accuracy"
            v-only-number="{ max: 1, min: 0, precision: 2 }"
          ></el-input>
        </el-form-item>
        <el-form-item label="需求背景" prop="background">
          <el-input v-model="addForm.background"></el-input>
        </el-form-item>

        <el-form-item label="标注规则" prop="regulation">
          <el-input v-model="addForm.regulation"></el-input>
        </el-form-item>

        <el-form-item label="期望交付时间" prop="delivery_time">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="addForm.delivery_time"
            style="width: 100%"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            @change="getAddDateD"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="是否基于历史迭代需求" prop="is_repeat">
          <el-select
            v-model="addForm.is_repeat"
            placeholder="请选择是否基于历史需求"
          >
            <el-option label="是" value="0"></el-option>
            <el-option label="否" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="note">
          <el-input v-model="addForm.note"></el-input>
        </el-form-item>
        <el-form-item label="单价" prop="tprice">
          <el-input v-model="addForm.tprice"
          type="number"
          @blur="priceCheck(addForm.tprice)"
          oninput="
          if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1)
          "
          ></el-input>
        </el-form-item>
        <el-form-item label="项目经理" prop="project_manager">
          <el-input v-model="addForm.project_manager"></el-input>
        </el-form-item>
        <el-form-item label="质控专家" prop="project_expert">
          <el-input v-model="addForm.project_expert"></el-input>
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
        <el-button type="primary" @click="addList" v-preventReClick>确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改需求的对话框 -->
    <el-dialog
      title="修改表单明细"
      :visible.sync="editDialogVisible"
      width="50%"
      :close-on-click-modal="false"
    >
      <!-- 内容主体 -->

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
          <el-input
            type="date"
            placeholder="选择日期"
            v-model="editForm.submit_time"
            style="width: 100%"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            @change="getEditDateS"
          ></el-input>
        </el-form-item>
        <el-form-item label="需求总量级" prop="data_amount">
          <el-input
            v-model="editForm.data_amount"
            plachehold="请填写数字，不需要单位"
          ></el-input>
        </el-form-item>
        <el-form-item label="数据单位" prop="unit">
          <el-input v-model="editForm.unit"></el-input>
        </el-form-item>
        <el-form-item label="期望交付准确率" prop="accuracy">
          <el-input
            v-model="editForm.accuracy"
            v-only-number="{ max: 1, min: 0, precision: 2 }"
          ></el-input>
        </el-form-item>
        <el-form-item label="需求背景" prop="background">
          <el-input v-model="editForm.background"></el-input>
        </el-form-item>
        <el-form-item label="标注规则" prop="regulation">
          <el-input v-model="editForm.regulation"></el-input>
        </el-form-item>

        <el-form-item label="期望交付时间" prop="delivery_time">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="editForm.delivery_time"
            style="width: 100%"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            @change="getEditDateD"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="是否基于历史迭代需求" prop="is_repeat">
          <el-select v-model="editForm.is_repeat">
            <el-option
              v-for="item in repeatList"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="note">
          <el-input v-model="editForm.note"></el-input>
        </el-form-item>
        <el-form-item label="单价" prop="tprice">
          <el-input v-model="editForm.tprice"
          type="number"
          @blur="priceCheckE(editForm.tprice)"
          oninput="
          if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1)
          "
          ></el-input>
        </el-form-item>
        <el-form-item label="项目经理" prop="project_manager">
          <el-input v-model="editForm.project_manager"></el-input>
        </el-form-item>
        <el-form-item label="质控专家" prop="project_expert">
          <el-input v-model="editForm.project_expert"></el-input>
        </el-form-item>
        <el-form-item label="项资管理员工号" prop="work_num">
          <el-input v-model="editForm.work_num"></el-input>
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
import { getNeed, addNeed, editNeed, removeNeed, getNeedNoKey } from "../../api/api.js";
import { getToken } from "../../utils/setToken.js";
export default {
  data() {
    return {
      //获取项目信息的参数对象
      needList: [],
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

      //添加表单的对话框
      addDialogVisible: false,
      //添加表单
      addForm: {
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
        tprice:0.00001,
        project_manager: "待确认",
        project_expert: "待确认",
        work_num: "",
      },
      //添加表单规则
      addFormRules: {
        project_state: [
          { required: true, message: "项目状态为必填项！", trigger: "blur" },
        ],
        demand_role: [
          { required: true, message: "需求方为必填项！", trigger: "blur" },
        ],
        project_number: [
          {
            required: true,
            message: "项目编号为必填项！",
            trigger: "blur",
          },
          {
            pattern: /(^[_A-Z0-9]+$)/,
            message: "请输入正确格式（仅英文大写及数字及英文下划线）",
          },  
        ],
        project_name: [
          {
            required: true,
            message: "项目名称为必填项！",
            trigger: "blur",
          },  
              {
            pattern: /(^[\u4e00-\u9fa5_()A-Z0-9]+$)/,
            message: "请输入正确格式（仅允许汉字及英文大写及数字及英文括号及英文下划线）",
          },  
        ],
        submit_time: [
          {
            required: true,
            message: "提报时间为必填项！",
            trigger: "blur",
          },
        ],
        data_amount: [
          {
            required: true,
            message: "需求总量级为必填项！",
            trigger: "blur",
          },
        ],
        unit: [
          {
            required: true,
            message: "数据单位为必填项！",
            trigger: "blur",
          },
        ],
        regulation: [
          {
            required: true,
            message: "标注规则为必填项！",
            trigger: "blur",
          },
        ],
        accuracy: [
          {
            required: true,
            message: "期望交付准确率为必填项！",
            trigger: "blur",
          },
        ],
        delivery_time: [
          {
            required: true,
            message: "期望交付时间为必填项！",
            trigger: "blur",
          },
        ],
        is_repeat: [
          {
            required: true,
            message: "是否基于历史需求为必填项！",
            trigger: "blur",
          },
        ],
        work_num: [
          {
            required: true,
            message: "工号为必填项！",
            trigger: "blur",
          },
        ],
      },
      //控制修改明细表单对话框的显示隐藏
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
      //修改表单
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
        tprice:"",
        project_manager: "",
        project_expert: "",
        work_num: "",
      },
      //修改表单规则
      editFormRules: {
        project_state: [
          { required: true, message: "员工类型为必填项！", trigger: "blur" },
        ],
        demand_role: [
          { required: true, message: "员工类型为必填项！", trigger: "blur" },
        ],
        project_number: [
          {
            required: true,
            message: "项目编号为必填项！",
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
        submit_time: [
          {
            required: true,
            message: "提报时间为必填项！",
            trigger: "blur",
          },
        ],
        data_amount: [
          {
            required: true,
            message: "需求总量级为必填项！",
            trigger: "blur",
          },
        ],
        unit: [
          {
            required: true,
            message: "数据单位为必填项！",
            trigger: "blur",
          },
        ],
        regulation: [
          {
            required: true,
            message: "标注规则为必填项！",
            trigger: "blur",
          },
        ],
        accuracy: [
          {
            required: true,
            message: "期望交付准确率为必填项！",
            trigger: "blur",
          },
        ],
        delivery_time: [
          {
            required: true,
            message: "期望交付时间为必填项！",
            trigger: "blur",
          },
        ],
        is_repeat: [
          {
            required: true,
            message: "是否基于历史需求为必填项！",
            trigger: "blur",
          },
        ],
        project_manager: [
          {
            required: true,
            message: "项目经理为必填项！",
            trigger: "blur",
          },
        ],
        project_expert: [
          {
            required: true,
            message: "质控专家为必填项！",
            trigger: "blur",
          },
        ],
        work_num: [
          {
            required: true,
            message: "工号为必填项！",
            trigger: "blur",
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
     //单价校验-添加
     priceCheck(value){
			var value=Math.round(parseFloat(value)*100000)/100000;
			  var xsd=value.toString().split( "." );
			  if (xsd.length==1){
			  value=value.toString()+ ".00000" ;
			  this.addForm.tprice = value
			  }
			  if (xsd.length>1){
			  if (xsd[1].length == 1){
			  value=value.toString()+ "0000" ;
        this.addForm.tprice = value
			  }else{
				if (xsd[1].length == 2){
				value=value.toString()+ "000" ;
        this.addForm.tprice = value
				}else{
          if (xsd[1].length == 3){
				value=value.toString()+ "00" ;
        this.addForm.tprice = value
				}else{
          if (xsd[1].length == 4){
				value=value.toString()+ "0" ;
     
				}
        this.addForm.tprice = value
        }
        }
			  }
			  }      
			},
          //单价校验-修改
    priceCheckE(value){
     console.log(value)
			var value=Math.round(parseFloat(value)*100000)/100000;
			  var xsd=value.toString().split( "." );
			  if (xsd.length==1){
			  value=value.toString()+ ".00000" ;
			  this.editForm.tprice = value
			  }
			  if (xsd.length>1){
			  if (xsd[1].length == 1){
			  value=value.toString()+ "0000" ;
        this.editForm.tprice = value
			  }else{
				if (xsd[1].length == 2){
				value=value.toString()+ "000" ;
        this.editForm.tprice = value
				}else{
          if (xsd[1].length == 3){
				value=value.toString()+ "00" ;
        this.editForm.tprice = value
				}else{
          if (xsd[1].length == 4){
				value=value.toString()+ "0" ;

				}
        this.editForm.tprice = value
        }
        }
			  }
			  }      
			},
    getListNoKey(){
      getNeedNoKey(
        this.id,
        this.currentPage,
        this.PageSize
      ).then((res) => {
        if (res.data.ret == 0) {
          this.needList = res.data.data_list;
          this.totalCount = res.data.total;
        }
      });
    },
    getList() {
      getNeed(
        this.id,
        this.currentPage,
        this.PageSize,
        this.demands,
        this.names
      ).then((res) => {
        if (res.data.ret == 0) {
          this.needList = res.data.data_list;
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
    filterTagM(value, row) {
      return row.project_manager == value;
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

    /* 监听添加需求对话框关闭重置 */
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    /* 添加新需求 */
    addList() {
      this.$refs.addFormRef.validate((valid) => {
        if (!valid) return;
        addNeed(this.addForm).then((res) => {
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
    //展示编辑需求的对话框
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
      tprice,
      project_manager,
      project_expert,
      work_num
    ) {
      this.editDialogVisible = true;
      (this.editForm.id = id),
        (this.editForm.project_state = project_state),
        (this.editForm.demand_role = demand_role),
        (this.editForm.project_number = project_number),
        (this.editForm.project_name = project_name),
        (this.editForm.submit_time = submit_time),
        (this.editForm.data_amount = data_amount),
        (this.editForm.unit = unit),
        (this.editForm.background = background),
        (this.editForm.regulation = regulation),
        (this.editForm.accuracy = accuracy),
        (this.editForm.delivery_time = delivery_time),
        (this.editForm.is_repeat = is_repeat),
        (this.editForm.note = note),
        (this.editForm.tprice = tprice),
        (this.editForm.project_manager = project_manager),
        (this.editForm.project_expert = project_expert),
        (this.editForm.work_num = work_num);
    },
    /*  修改明细表单并提交 */
    editList() {
      //预校验
      this.$refs.editFormRef.validate((valid) => {
        if (!valid) return;
        this.editForm.project_name = this.editForm.project_name
          .replace(/（/g, "(")
          .replace(/）/g, ")");
          this.editForm.project_name = this.editForm.project_name.replace(
          /\s*/g,
          ""
        );
        editNeed(this.editForm).then((res) => {
          if (res.data.ret == 0) {
            this.editDialogVisible = false;
            //刷新数据列表
            this.getListNoKey();
            //提示
            this.$message.success("更新成功！");
          }
        });
      });
    },
    //根据id删除需求
    removeListById(id) {
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
          removeNeed(this.id, id).then((res) => {
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
    //添加表单更改日期格式
    getAddDateS(date) {
      this.addForm.submit_time = date;
    },
    getAddDateD(date) {
      this.addForm.delivery_time = date;
    },
    //修改表单更改日期格式
    getEditDateS(date) {
      this.editForm.submit_time = date;
    },
    getEditDateD(date) {
      this.editForm.delivery_time = date;
    },
  },
};
</script>

<style lang="less" scoped>
.need-top{
  display: flex;
  justify-content: space-around;
}
.need-top-des{
  font-size: 18px;
  font-weight: 600;
  padding-top: 10px;
}
.need-top-add{
  padding-bottom: 1px;
}
.need-data-des{
  font-size: 15px;
  font-weight: 600;
  padding-top: 8px;
}
</style>
