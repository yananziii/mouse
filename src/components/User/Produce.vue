<template>
  <div>
    <el-card>
      <!--     面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Notice' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>员工填写</el-breadcrumb-item>
        <el-breadcrumb-item>生产数据</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row :gutter="0" class="emp-top">
        <el-col :span="22" class="emp-top-des"> 生产数据 </el-col>
        <el-col :span="2" class="emp-top-add">
          <el-dropdown placement="bottom">
            <el-button type="danger" size="mini">新增</el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="addNewDialogVisible = true"
                >空白表单</el-dropdown-item
              >
              <el-dropdown-item @click.native="addOldDialogVisible = true"
                >导入上次结果</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>

        <!--  <el-col :span="2" class="emp-top-add">
          <el-button type="danger" @click="addNewDialogVisible = true" size="mini"
            >新增</el-button
          >
        </el-col>
        <el-col :span="2" class="emp-top-add">
          <el-button type="danger" @click="addOldDialogVisible = true" size="mini"
            >新增</el-button
          >
        </el-col> -->
      </el-row>
    </el-card>
    <!-- 卡片视图 -->
    <el-card>
      <el-row :gutter="40">
        <el-col :span="15" class="emp-data-des"> 表单 </el-col>
        <el-col :span="3">
          <el-select
            v-model="state"
            size="mini"
            placeholder="请选择状态"
            @change="namesShow"
          >
            <el-option
              label="全部"
              :value="3"
              @click.native="search"
            ></el-option>
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
          <el-input
            placeholder="项目名称"
            v-model="names"
            @keyup.enter.native="search"
            size="mini"
            clearable
            v-show="nameShow == 0"
          >
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-button icon="el-icon-search" circle size="mini" @click="search">
          </el-button>
        </el-col>
      </el-row>
      <!-- 个人明细列表区域 -->
      <el-table :data="prodecuList" stripe>
        <el-table-column
          label="表单id"
          prop="id"
          min-width="10%"
        ></el-table-column>
        <el-table-column label="工作日期" prop="data_time" min-width="15%">
        </el-table-column>
        <el-table-column
          label="项目id"
          prop="project_id"
          min-width="10%"
        ></el-table-column>
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
          min-width="17%"
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
        <el-table-column label="操作" min-width="10%">
          <template slot-scope="scope">
            <span class="toDetail" @click="toDetail(scope.row.id)"> 详情 </span>
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
    <!--   添加空白明细表单的对话框 -->
    <el-dialog
      title="表单填写"
      :visible.sync="addNewDialogVisible"
      width="50%"
      :close-on-click-modal="false"
    >
      <!--   内容主体 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="135px"
        label-position="right"
      >
        <el-form-item label="工作日期" prop="data_time">
          <!--             <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="addForm.data_time"
              style="width: 100%"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              @change="getAddDate"
            >
            </el-date-picker> -->
          <el-select v-model="addForm.data_time" class="timeS">
            <el-option
              v-for="item in this.TimeList"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目名称" prop="project_name">
          <el-input
            v-model="addForm.project_name"
            class="inline-input"
          ></el-input>
        </el-form-item>
        <el-form-item label="项目角色" prop="project_role">
          <el-select v-model="addForm.project_role" class="roleS">
            <el-option label="标注专员" value="标注专员"></el-option>
            <el-option label="质量专员" value="质量专员"></el-option>
            <el-option label="质控专家" value="质控专家"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否加班" prop="work_overtime">
          <el-select v-model="addForm.work_overtime" class="overS">
            <el-option
              label="否"
              value="1"
              @click.native="removeOver"
            ></el-option>
            <el-option label="是" value="0" @click.native="addOver"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否有常班非标" prop="noMark">
          <el-select v-model="addForm.noMark">
            <el-option
              label="否"
              value="1"
              @click.native="removeNoMark"
            ></el-option>
            <el-option
              label="是"
              value="0"
              @click.native="addNoMark"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否需要核算绩效" prop="account">
          <el-select v-model="addForm.account" class="accountS">
            <el-option label="否" value="1"></el-option>
            <el-option label="是" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="常班-标注工时" prop="mark_time">
              <el-input
                v-model="addForm.mark_time"
                type="number"
                oninput="
                if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\d+)\.(\d\d).*$/,'$1.$2');
                if(value>8)value=8;
                if(value<0)value=null;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="常班-质检工时" prop="quality_time">
              <el-input
                v-model="addForm.quality_time"
                type="number"
                oninput="
                if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\d+)\.(\d\d).*$/,'$1.$2');
                if(value>8)value=8;
                if(value<0)value=null;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="常班-标注工作量" prop="mark_number">
              <el-input
                v-model="addForm.mark_number"
                type="number"
                oninput="
                if(value>99999)value=99999;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="常班-质检工作量" prop="quality_number">
              <el-input
                v-model="addForm.quality_number"
                type="number"
                oninput="
                if(value>99999)value=99999;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item
          label="常班-非标-培训工时"
          prop="traing_time"
          v-show="noMarkFlag == 1"
        >
          <el-input
            v-model="addForm.traing_time"
            type="number"
            oninput="
                if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\d+)\.(\d\d).*$/,'$1.$2');
                if(value>8)value=8;
                if(value<0)value=null;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
          ></el-input>
        </el-form-item>
        <el-form-item
          label="常班-非标-答疑工时"
          prop="question_time"
          v-show="noMarkFlag == 1"
        >
          <el-input
            v-model="addForm.question_time"
            type="number"
            oninput="
                if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\d+)\.(\d\d).*$/,'$1.$2');
                if(value>8)value=8;
                if(value<0)value=null;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
          ></el-input>
        </el-form-item>
        <el-form-item
          label="常班-非标-数据处理工时"
          prop="data_process_time"
          v-show="noMarkFlag == 1"
        >
          <el-input
            v-model="addForm.data_process_time"
            type="number"
            oninput="
                if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\d+)\.(\d\d).*$/,'$1.$2');
                if(value>8)value=8;
                if(value<0)value=null;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
          ></el-input>
        </el-form-item>
        <el-form-item
          label="常班-非标-复盘工时"
          prop="analyse_time"
          v-show="noMarkFlag == 1"
        >
          <el-input
            v-model="addForm.analyse_time"
            type="number"
            oninput="
                if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\d+)\.(\d\d).*$/,'$1.$2');
                if(value>8)value=8;
                if(value<0)value=null;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
          ></el-input>
        </el-form-item>
        <el-form-item
          label="常班-非标-其他工时"
          prop="other_time"
          v-show="noMarkFlag == 1"
        >
          <el-input
            v-model="addForm.other_time"
            type="number"
            oninput="
                if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\d+)\.(\d\d).*$/,'$1.$2');
                if(value>8)value=8;
                if(value<0)value=null;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
          ></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="常班-试标工时" prop="test_mark_time">
              <el-input
                v-model="addForm.test_mark_time"
                type="number"
                oninput="
                if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\d+)\.(\d\d).*$/,'$1.$2');
                if(value>8)value=8;
                if(value<0)value=null;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="常班-工损工时" prop="loss_time">
              <el-input
                v-model="addForm.loss_time"
                type="number"
                oninput="
                if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\d+)\.(\d\d).*$/,'$1.$2');
                if(value>8)value=8;
                if(value<0)value=null;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="常班-备注" prop="note">
          <el-input v-model="addForm.note"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="加班-标注工时"
              prop="over_mark_time"
              v-show="overFlag == 1"
            >
              <el-input
                v-model="addForm.over_mark_time"
                type="number"
                oninput="
                if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\d+)\.(\d\d).*$/,'$1.$2');
                if(value>24)value=24;
                if(value<0)value=null;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="加班-质检工时"
              prop="over_quality_time"
              v-show="overFlag == 1"
            >
              <el-input
                v-model="addForm.over_quality_time"
                type="number"
                oninput="
                if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\d+)\.(\d\d).*$/,'$1.$2');
                if(value>24)value=24;
                if(value<0)value=null;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="加班-标注工作量"
              prop="over_mark_number"
              v-show="overFlag == 1"
            >
              <el-input
                v-model="addForm.over_mark_number"
                type="number"
                oninput="
                if(value>99999)value=99999;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="加班-质检工作量"
              prop="over_quality_number"
              v-show="overFlag == 1"
            >
              <el-input
                v-model="addForm.over_quality_number"
                type="number"
                oninput="
                if(value>99999)value=99999;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item
          label="加班-试标工时"
          prop="over_test_mark_time"
          v-show="overFlag == 1"
        >
          <el-input
            v-model="addForm.over_test_mark_time"
            type="number"
            oninput="
                if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\d+)\.(\d\d).*$/,'$1.$2');
                if(value>24)value=24;
                if(value<0)value=null;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
          ></el-input>
        </el-form-item>
        <el-form-item
          label="加班-非标-培训工时"
          prop="over_traing_time"
          v-show="overFlag == 1"
        >
          <el-input
            v-model="addForm.over_traing_time"
            type="number"
            oninput="
                if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\d+)\.(\d\d).*$/,'$1.$2');
                if(value>24)value=24;
                if(value<0)value=null;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
          ></el-input>
        </el-form-item>
        <el-form-item
          label="加班-非标-答疑工时"
          prop="over_question_time"
          v-show="overFlag == 1"
        >
          <el-input
            v-model="addForm.over_question_time"
            type="number"
            oninput="
                if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\d+)\.(\d\d).*$/,'$1.$2');
                if(value>24)value=24;
                if(value<0)value=null;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
          ></el-input>
        </el-form-item>
        <el-form-item
          label="加班-非标-数据处理工时"
          prop="over_data_process_time"
          v-show="overFlag == 1"
        >
          <el-input
            v-model="addForm.over_data_process_time"
            type="number"
            oninput="
                if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\d+)\.(\d\d).*$/,'$1.$2');
                if(value>24)value=24;
                if(value<0)value=null;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
          ></el-input>
        </el-form-item>
        <el-form-item
          label="加班-非标-复盘工时"
          prop="over_analyse_time"
          v-show="overFlag == 1"
        >
          <el-input
            v-model="addForm.over_analyse_time"
            type="number"
            oninput="
                if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\d+)\.(\d\d).*$/,'$1.$2');
                if(value>24)value=24;
                if(value<0)value=null;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
          ></el-input>
        </el-form-item>
        <el-form-item
          label="加班-非标-其他工时"
          prop="over_other_time"
          v-show="overFlag == 1"
        >
          <el-input
            v-model="addForm.over_other_time"
            type="number"
            oninput="
                if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\d+)\.(\d\d).*$/,'$1.$2');
                if(value>24)value=24;
                if(value<0)value=null;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
          ></el-input>
        </el-form-item>
        <el-form-item
          label="加班-工损工时"
          prop="over_loss_time"
          v-show="overFlag == 1"
        >
          <el-input
            v-model="addForm.over_loss_time"
            type="number"
            oninput="
                if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\d+)\.(\d\d).*$/,'$1.$2');
                if(value>24)value=24;
                if(value<0)value=null;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
          ></el-input>
        </el-form-item>
        <el-form-item
          label="加班情况说明"
          prop="over_note"
          v-show="overFlag == 1"
        >
          <el-input v-model="addForm.over_note"></el-input>
        </el-form-item>
      </el-form>
      <!--   底部区域-->
      <span slot="footer" class="dialog-footer">
        <el-button
          @click="
            addNewDialogVisible = false;
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
    <!--   添加历史明细表单的对话框 -->
    <el-dialog
      title="表单填写"
      :visible.sync="addOldDialogVisible"
      width="50%"
      :close-on-click-modal="false"
    >
      <!--   内容主体 -->
      <el-form
        :model="addOldForm"
        :rules="addOldFormRules"
        ref="addOldFormRef"
        label-width="135px"
        label-position="right"
      >
        <el-form-item label="工作日期" prop="data_time">
          <!--             <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="addForm.data_time"
              style="width: 100%"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              @change="getAddDate"
            >
            </el-date-picker> -->
          <el-select v-model="addOldForm.data_time" class="timeS">
            <el-option
              v-for="item in this.TimeList"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目名称" prop="project_name">
          <el-input
            v-model="addOldForm.project_name"
            class="inline-input"
          ></el-input>
        </el-form-item>
        <el-form-item label="项目角色" prop="project_role">
          <el-select v-model="addOldForm.project_role" class="roleS">
            <el-option label="标注专员" value="标注专员"></el-option>
            <el-option label="质量专员" value="质量专员"></el-option>
            <el-option label="质控专家" value="质控专家"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否加班" prop="work_overtime">
          <el-select v-model="addOldForm.work_overtime" class="overS">
            <el-option
              label="否"
              :value="1"
              @click.native="removeOverOld"
            ></el-option>
            <el-option
              label="是"
              :value="0"
              @click.native="addOverOld"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否有常班非标" prop="noMark">
          <el-select v-model="addOldForm.noMark">
            <el-option
              label="否"
              :value="1"
              @click.native="removeNoMarkOld"
            ></el-option>
            <el-option
              label="是"
              :value="0"
              @click.native="addNoMarkOld"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否需要核算绩效" prop="account">
          <el-select v-model="addOldForm.account" class="accountS">
            <el-option label="否" :value="1"></el-option>
            <el-option label="是" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="常班-标注工时" prop="mark_time">
              <el-input
                v-model="addOldForm.mark_time"
                type="number"
                oninput="
                if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\d+)\.(\d\d).*$/,'$1.$2');
                if(value>8)value=8;
                if(value<0)value=null;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="常班-质检工时" prop="quality_time">
              <el-input
                v-model="addOldForm.quality_time"
                type="number"
                oninput="
                if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\d+)\.(\d\d).*$/,'$1.$2');
                if(value>8)value=8;
                if(value<0)value=null;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="常班-标注工作量" prop="mark_number">
              <el-input
                v-model="addOldForm.mark_number"
                type="number"
                oninput="
                if(value>99999)value=99999;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="常班-质检工作量" prop="quality_number">
              <el-input
                v-model="addOldForm.quality_number"
                type="number"
                oninput="
                if(value>99999)value=99999;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item
          label="常班-非标-培训工时"
          prop="traing_time"
          v-show="noMarkFlagOld == 1"
        >
          <el-input
            v-model="addOldForm.traing_time"
            type="number"
            oninput="
                if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\d+)\.(\d\d).*$/,'$1.$2');
                if(value>8)value=8;
                if(value<0)value=null;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
          ></el-input>
        </el-form-item>
        <el-form-item
          label="常班-非标-答疑工时"
          prop="question_time"
          v-show="noMarkFlagOld == 1"
        >
          <el-input
            v-model="addOldForm.question_time"
            type="number"
            oninput="
                if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\d+)\.(\d\d).*$/,'$1.$2');
                if(value>8)value=8;
                if(value<0)value=null;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
          ></el-input>
        </el-form-item>
        <el-form-item
          label="常班-非标-数据处理工时"
          prop="data_process_time"
          v-show="noMarkFlagOld == 1"
        >
          <el-input
            v-model="addOldForm.data_process_time"
            type="number"
            oninput="
                if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\d+)\.(\d\d).*$/,'$1.$2');
                if(value>8)value=8;
                if(value<0)value=null;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
          ></el-input>
        </el-form-item>
        <el-form-item
          label="常班-非标-复盘工时"
          prop="analyse_time"
          v-show="noMarkFlagOld == 1"
        >
          <el-input
            v-model="addOldForm.analyse_time"
            type="number"
            oninput="
                if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\d+)\.(\d\d).*$/,'$1.$2');
                if(value>8)value=8;
                if(value<0)value=null;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
          ></el-input>
        </el-form-item>
        <el-form-item
          label="常班-非标-其他工时"
          prop="other_time"
          v-show="noMarkFlagOld == 1"
        >
          <el-input
            v-model="addOldForm.other_time"
            type="number"
            oninput="
                if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\d+)\.(\d\d).*$/,'$1.$2');
                if(value>8)value=8;
                if(value<0)value=null;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
          ></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="常班-试标工时" prop="test_mark_time">
              <el-input
                v-model="addOldForm.test_mark_time"
                type="number"
                oninput="
                if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\d+)\.(\d\d).*$/,'$1.$2');
                if(value>8)value=8;
                if(value<0)value=null;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="常班-工损工时" prop="loss_time">
              <el-input
                v-model="addOldForm.loss_time"
                type="number"
                oninput="
                if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\d+)\.(\d\d).*$/,'$1.$2');
                if(value>8)value=8;
                if(value<0)value=null;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="常班-备注" prop="note">
          <el-input v-model="addOldForm.note"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="加班-标注工时"
              prop="over_mark_time"
              v-show="overFlagOld == 1"
            >
              <el-input
                v-model="addOldForm.over_mark_time"
                type="number"
                oninput="
                if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\d+)\.(\d\d).*$/,'$1.$2');
                if(value>24)value=24;
                if(value<0)value=null;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="加班-质检工时"
              prop="over_quality_time"
              v-show="overFlagOld == 1"
            >
              <el-input
                v-model="addOldForm.over_quality_time"
                type="number"
                oninput="
                if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\d+)\.(\d\d).*$/,'$1.$2');
                if(value>24)value=24;
                if(value<0)value=null;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="加班-标注工作量"
              prop="over_mark_number"
              v-show="overFlagOld == 1"
            >
              <el-input
                v-model="addOldForm.over_mark_number"
                type="number"
                oninput="
                if(value>99999)value=99999;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="加班-质检工作量"
              prop="over_quality_number"
              v-show="overFlagOld == 1"
            >
              <el-input
                v-model="addOldForm.over_quality_number"
                type="number"
                oninput="
                if(value>99999)value=99999;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item
          label="加班-试标工时"
          prop="over_test_mark_time"
          v-show="overFlagOld == 1"
        >
          <el-input
            v-model="addOldForm.over_test_mark_time"
            type="number"
            oninput="
                if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\d+)\.(\d\d).*$/,'$1.$2');
                if(value>24)value=24;
                if(value<0)value=null;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
          ></el-input>
        </el-form-item>
        <el-form-item
          label="加班-非标-培训工时"
          prop="over_traing_time"
          v-show="overFlagOld == 1"
        >
          <el-input
            v-model="addOldForm.over_traing_time"
            type="number"
            oninput="
                if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\d+)\.(\d\d).*$/,'$1.$2');
                if(value>24)value=24;
                if(value<0)value=null;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
          ></el-input>
        </el-form-item>
        <el-form-item
          label="加班-非标-答疑工时"
          prop="over_question_time"
          v-show="overFlagOld == 1"
        >
          <el-input
            v-model="addOldForm.over_question_time"
            type="number"
            oninput="
                if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\d+)\.(\d\d).*$/,'$1.$2');
                if(value>24)value=24;
                if(value<0)value=null;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
          ></el-input>
        </el-form-item>
        <el-form-item
          label="加班-非标-数据处理工时"
          prop="over_data_process_time"
          v-show="overFlagOld == 1"
        >
          <el-input
            v-model="addOldForm.over_data_process_time"
            type="number"
            oninput="
                if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\d+)\.(\d\d).*$/,'$1.$2');
                if(value>24)value=24;
                if(value<0)value=null;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
          ></el-input>
        </el-form-item>
        <el-form-item
          label="加班-非标-复盘工时"
          prop="over_analyse_time"
          v-show="overFlagOld == 1"
        >
          <el-input
            v-model="addOldForm.over_analyse_time"
            type="number"
            oninput="
                if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\d+)\.(\d\d).*$/,'$1.$2');
                if(value>24)value=24;
                if(value<0)value=null;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
          ></el-input>
        </el-form-item>
        <el-form-item
          label="加班-非标-其他工时"
          prop="over_other_time"
          v-show="overFlagOld == 1"
        >
          <el-input
            v-model="addOldForm.over_other_time"
            type="number"
            oninput="
                if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\d+)\.(\d\d).*$/,'$1.$2');
                if(value>24)value=24;
                if(value<0)value=null;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
          ></el-input>
        </el-form-item>
        <el-form-item
          label="加班-工损工时"
          prop="over_loss_time"
          v-show="overFlagOld == 1"
        >
          <el-input
            v-model="addOldForm.over_loss_time"
            type="number"
            oninput="
                if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\d+)\.(\d\d).*$/,'$1.$2');
                if(value>24)value=24;
                if(value<0)value=null;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
          ></el-input>
        </el-form-item>
        <el-form-item
          label="加班情况说明"
          prop="over_note"
          v-show="overFlagOld == 1"
        >
          <el-input v-model="addOldForm.over_note"></el-input>
        </el-form-item>
      </el-form>
      <!--   底部区域-->
      <span slot="footer" class="dialog-footer">
        <el-button
          @click="
            addOldDialogVisible = false;
            addOldDialogClosed();
          "
          >取 消</el-button
        >
        <!--         <el-button  id= "btn_sub" type="primary" @click="addList(); addButtonF()" >确 定</el-button> -->
        <el-button
          id="btn_sub"
          type="primary"
          @click="addListOld()"
          v-preventReClick
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getAllProduce,
  addProduce,
  getAllProduceState,
} from "../../api/api.js";
import { getToken } from "../../utils/setToken.js";
import moment from "moment";

export default {
  data() {
    return {
      prodecuList: [],
      projectList: [],
      //审批状态
      state: 3,
      //项目名称搜索框
      names: "",
      //项目名称搜索框是否显示
      nameShow: 0,
      // 总条数
      totalCount: 0,
      // 默认显示第几页
      currentPage: 1,
      // 个数选择器
      pageSizes: [5, 10],
      // 默认每页显示的条数
      PageSize: 5,
      //控制添加明细表单对话框的显示与隐藏
      addNewDialogVisible: false,
      addOldDialogVisible: false,
      //控制添加表单加班输入框的显示与隐藏
      overFlag: 0,
      overFlagOld: 0,
      //控制添加表非标输入框的显示与隐藏
      noMarkFlag: 0,
      noMarkFlagOld: 0,
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

      //添加空白明细表单的表单数据
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
      //添加历史明细表单的表单数据
      addOldForm: {
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
      addOldFormRules: {
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
    this.addOldForm.work_num = JSON.parse(getToken("work_num"));
    /*     this.token = JSON.parse(getToken("admin_token")); */
    this.TimeList = this.getNowTime();
    this.getList();
  },
  methods: {
    getNowTime() {
      let strNow = moment().format("YYYY-MM-DD");
      let strBefor = moment().subtract(1, "day").format("YYYY-MM-DD");
      return [
        {
          value: strNow,
          label: strNow,
        },
        {
          value: strBefor,
          label: strBefor,
        },
      ];
    },
    //控制项目名称查询框的展示
    namesShow(state) {
      console.log(state);
      if (state != 3) {
        this.nameShow = 1;
      } else {
        this.nameShow = 0;
      }
    },
    /*     namesShow2(state){
        console.log(state);
    }, */
    //查询所有表单

    getLast() {
      getAllProduce(this.id, this.currentPage, this.PageSize, 3, "").then(
        (res) => {
          this.addOldForm.project_name = res.data.data_list[0].project_name;
          this.addOldForm.project_role = res.data.data_list[0].project_role;
          this.addOldForm.work_overtime = res.data.data_list[0].work_overtime;
          this.addOldForm.account = res.data.data_list[0].account;
          this.addOldForm.noMark = 1;
        }
      );
    },
    getList() {
      if (this.state == 3) {
        getAllProduce(
          this.id,
          this.currentPage,
          this.PageSize,
          this.state,
          this.names
        ).then((res) => {
          if (res.data.ret == 0) {
            this.getLast();
            this.prodecuList = res.data.data_list;
            this.totalCount = res.data.total;
          }
        });
      } else {
        getAllProduceState(
          this.id,
          this.currentPage,
          this.PageSize,
          this.state
        ).then((res) => {
          if (res.data.ret == 0) {
            this.getLast();
            this.prodecuList = res.data.data_list;
            this.totalCount = res.data.total;
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

    //添加表单更改日期格式
    getAddDate(date) {
      this.addForm.data_time = date;
    },
    //修改表单更改日期格式
    getEditDate(date) {
      this.editForm.data_time = date;
    },
    //防止重复添加
    /*     addButtonF(){
          document.getElementById("btn_sub").disabled="disabled";
        },
        addButtonT(){
          document.getElementById("btn_sub").disabled="";
        }, */
    //添加员工生产校验
    checkAdd(
      mark_time,
      mark_number,
      quality_time,
      quality_number,
      over_mark_time,
      over_mark_number,
      over_quality_time,
      over_quality_number
    ) {
      let sum = Number(mark_time) + Number(quality_time);
      console.log(sum);
      if (mark_time != 0 && mark_number == 0) {
        return false;
      } else if (quality_time != 0 && quality_number == 0) {
        return false;
      } else if (over_mark_time != 0 && over_mark_number == 0) {
        return false;
      } else if (over_quality_time != 0 && over_quality_number == 0) {
        return false;
      } else if (mark_number != 0 && mark_time == 0) {
        return false;
      } else if (quality_number != 0 && quality_time == 0) {
        return false;
      } else if (over_mark_number != 0 && over_mark_time == 0) {
        return false;
      } else if (over_quality_number != 0 && over_quality_time == 0) {
        return false;
      } else if (sum > 8) {
        return false;
      } else {
        return true;
      }
    },
    //添加明细表单
    addList() {
      this.$refs.addFormRef.validate((valid) => {
        if (!valid) return;
        if (
          this.checkAdd(
            this.addForm.mark_time,
            this.addForm.mark_number,
            this.addForm.quality_time,
            this.addForm.quality_number,
            this.addForm.over_mark_time,
            this.addForm.over_mark_number,
            this.addForm.over_quality_time,
            this.addForm.over_quality_number
          )
        ) {
          addProduce(this.addForm).then((res) => {
            if (res.data.ret == 0) {
              this.$message.success("添加表单成功");
              //隐藏添加用户对话框
              this.addNewDialogVisible = false;
              this.addDialogClosed();
              //刷新列表
              this.getList();
            }
          });
        } else {
          this.$message.error("填写不规范，请重新填写!");
        }
      });
    },
    //添加明细表单-映射历史
    addListOld() {
      this.$refs.addOldFormRef.validate((valid) => {
        if (!valid) return;
        if (
          this.checkAdd(
            this.addOldForm.mark_time,
            this.addOldForm.mark_number,
            this.addOldForm.quality_time,
            this.addOldForm.quality_number,
            this.addOldForm.over_mark_time,
            this.addOldForm.over_mark_number,
            this.addOldForm.over_quality_time,
            this.addOldForm.over_quality_number
          )
        ) {
          addProduce(this.addOldForm).then((res) => {
            if (res.data.ret == 0) {
              this.$message.success("添加表单成功");
              //隐藏添加用户对话框
              this.addOldDialogVisible = false;
              this.addOldDialogClosed();
              //刷新列表
              this.getList();
            }
          });
        } else {
          this.$message.error("填写不规范，请重新填写!");
        }
      });
    },

    /* 监听添加表单对话框关闭重置 */
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    addOldDialogClosed() {
      this.$refs.addOldFormRef.resetFields();
    },

    //控制添加加班表单展示
    addOver() {
      this.overFlag = 1;
    },
    addNoMark() {
      this.noMarkFlag = 1;
    },
    removeOver() {
      (this.overFlag = 0),
        (this.addForm.over_mark_time = 0),
        (this.addForm.over_mark_number = 0),
        (this.addForm.over_quality_time = 0),
        (this.addForm.over_quality_number = 0),
        (this.addForm.over_test_mark_time = 0),
        (this.addForm.over_traing_time = 0),
        (this.addForm.over_question_time = 0),
        (this.addForm.over_data_process_time = 0),
        (this.addForm.over_analyse_time = 0),
        (this.addForm.over_other_time = 0),
        (this.addForm.over_loss_time = 0),
        (this.addForm.over_note = "");
    },
    removeNoMark() {
      this.noMarkFlag = 0;
      this.addForm.traing_time = 0;
      this.addForm.question_time = 0;
      this.addForm.data_process_time = 0;
      this.addForm.analyse_time = 0;
      this.addForm.other_time = 0;
    },

    //控制添加加班表单展示-映射历史表单
    addOverOld() {
      this.overFlagOld = 1;
    },
    addNoMarkOld() {
      this.noMarkFlagOld = 1;
    },
    removeOverOld() {
      (this.overFlagOld = 0),
        (this.addOldForm.over_mark_time = 0),
        (this.addOldForm.over_mark_number = 0),
        (this.addOldForm.over_quality_time = 0),
        (this.addOldForm.over_quality_number = 0),
        (this.addOldForm.over_test_mark_time = 0),
        (this.addOldForm.over_traing_time = 0),
        (this.addOldForm.over_question_time = 0),
        (this.addOldForm.over_data_process_time = 0),
        (this.addOldForm.over_analyse_time = 0),
        (this.addOldForm.over_other_time = 0),
        (this.addOldForm.over_loss_time = 0),
        (this.addOldForm.over_note = "");
    },
    removeNoMarkOld() {
      this.noMarkFlagOld = 0;
      this.addOldForm.traing_time = 0;
      this.addOldForm.question_time = 0;
      this.addOldForm.data_process_time = 0;
      this.addOldForm.analyse_time = 0;
      this.addOldForm.other_time = 0;
    },

    toDetail(id) {
      this.$router.push({
        path: "Detail",
        query: {
          id: id,
        },
      });
    },
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
.toDetail {
  color: #a5d3e8;
}

/deep/input[type="number"]::-webkit-inner-spin-button,
/deep/input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none !important;
  margin: 0 !important;
}
</style>
