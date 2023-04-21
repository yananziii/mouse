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
          <!--   <el-button type="danger" @click="addDialogVisible = true ;addButtonT()"
    size="mini" >新增</el-button
          > -->
          <el-button type="danger" @click="addDialogVisible = true" size="mini"
            >新增</el-button
          >
        </el-col>
      </el-row>
    </el-card>
    <!-- 卡片视图 -->
    <el-card>
      <el-row :gutter="40">
        <el-col :span="18" class="emp-data-des"> 表单 </el-col>
        <el-col :span="3">
          <el-input
            placeholder="项目名称"
            v-model="names"
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
      <!-- 个人明细列表区域 -->
      <el-table :data="userList" stripe>
        <el-table-column label="表单id" prop="id" fixed></el-table-column>
        <el-table-column
          label="工作日期"
          prop="data_time"
          fixed
          min-width="100%"
        >
        </el-table-column>
        <el-table-column
          label="项目名称"
          prop="project_name"
          fixed
          min-width="200%"
        ></el-table-column>
        <el-table-column
          label="项目角色"
          prop="project_role"
          fixed
        ></el-table-column>
        <el-table-column prop="work_overtime" label="是否加班" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.work_overtime == 0">是</span>
            <span v-if="scope.row.work_overtime == 1">否</span>
          </template>
        </el-table-column>
        <el-table-column prop="account" label="是否需要核算绩效" width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.account == 0">是</span>
            <span v-if="scope.row.account == 1">否</span>
          </template>
        </el-table-column>
        <el-table-column label="标注工时" prop="mark_time"></el-table-column>
        <el-table-column
          label="标注工作量"
          prop="mark_number"
          min-width="90%"
        ></el-table-column>
        <el-table-column label="质检工时" prop="quality_time"></el-table-column>
        <el-table-column
          label="质检工作量"
          prop="quality_number"
          min-width="90%"
        ></el-table-column>
        <el-table-column
          label="试标工时"
          prop="test_mark_time"
        ></el-table-column>
        <el-table-column
          label="非标-培训工时"
          prop="traing_time"
        ></el-table-column>
        <el-table-column
          label="非标-答疑工时"
          prop="question_time"
        ></el-table-column>
        <el-table-column
          label="非标-数据处理工时"
          prop="data_process_time"
          min-width="100%"
        ></el-table-column>
        <el-table-column
          label="非标-复盘工时"
          prop="analyse_time"
        ></el-table-column>
        <el-table-column
          label="非标-其他工时"
          prop="other_time"
          min-width="100%"
        ></el-table-column>
        <el-table-column label="工损工时" prop="loss_time"></el-table-column>
        <el-table-column
          label="备注"
          prop="note"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          label="加班-标注工时"
          prop="over_mark_time"
        ></el-table-column>
        <el-table-column
          label="加班-标注工作量"
          prop="over_mark_number"
          min-width="90%"
        ></el-table-column>
        <el-table-column
          label="加班-质检工时"
          prop="over_quality_time"
        ></el-table-column>
        <el-table-column
          label="加班-质检工作量"
          prop="over_quality_number"
          min-width="90%"
        ></el-table-column>
        <el-table-column
          label="加班-试标工时"
          prop="over_test_mark_time"
        ></el-table-column>
        <el-table-column
          label="加班-非标-培训工时"
          prop="over_traing_time"
        ></el-table-column>
        <el-table-column
          label="加班-非标-答疑工时"
          prop="over_question_time"
        ></el-table-column>
        <el-table-column
          label="加班-标-数据处理工时"
          prop="over_data_process_time"
          min-width="100%"
        ></el-table-column>
        <el-table-column
          label="加班-非标-复盘工时"
          prop="over_analyse_time"
        ></el-table-column>
        <el-table-column
          label="加班-非标-其他工时"
          prop="over_other_time"
          min-width="100%"
        ></el-table-column>
        <el-table-column
          label="加班-工损工时"
          prop="over_loss_time"
        ></el-table-column>
        <el-table-column
          label="加班情况说明"
          prop="over_note"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column label="项目id" prop="project_id"></el-table-column>
        <el-table-column label="首次创建时间">
          <template slot-scope="scope">{{
            scope.row.create_date | dateFormat
          }}</template>
        </el-table-column>
        <el-table-column label="更新时间">
          <template slot-scope="scope">{{
            scope.row.update_date | dateFormat
          }}</template>
        </el-table-column>
        <el-table-column label="操作" min-width="120%">
          <template slot-scope="scope">
            <!--          通过作用域插槽接收到了scope对象，scope.row可以拿到对应行的信息 -->
            <el-tooltip
              effect="dark"
              content="修改表单"
              placement="top"
              :enterable="false"
            >
              <!--             修改按钮 -->
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="
                  showEditDialogList(
                    scope.row.id,
                    scope.row.data_time,
                    scope.row.project_name,
                    scope.row.project_role,
                    scope.row.work_overtime,
                    scope.row.account,
                    scope.row.mark_time,
                    scope.row.mark_number,
                    scope.row.quality_time,
                    scope.row.quality_number,
                    scope.row.test_mark_time,
                    scope.row.traing_time,
                    scope.row.question_time,
                    scope.row.data_process_time,
                    scope.row.analyse_time,
                    scope.row.other_time,
                    scope.row.loss_time,
                    scope.row.note,
                    scope.row.over_mark_time,
                    scope.row.over_mark_number,
                    scope.row.over_quality_time,
                    scope.row.over_quality_number,
                    scope.row.over_test_mark_time,
                    scope.row.over_traing_time,
                    scope.row.over_question_time,
                    scope.row.over_data_process_time,
                    scope.row.over_analyse_time,
                    scope.row.over_other_time,
                    scope.row.over_loss_time,
                    scope.row.over_note
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
                @click="removeListById(scope.row.id, scope.row.data_time)"
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
    <!--   添加明细表单的对话框 -->
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

    <!-- 修改明细表单的对话框 -->
    <el-dialog
      title="修改表单明细"
      :visible.sync="editDialogVisible"
      width="50%"
      :close-on-click-modal="false"
    >
      <!--   内容主体 -->
      <el-form
        :model="editForm"
        :rules="eidtFormRules"
        ref="editFormRef"
        label-width="135px"
        label-position="right"
      >
        <el-form-item label="工作日期" prop="data_time">
          <el-input v-model="editForm.data_time" readonly></el-input>
        </el-form-item>

        <el-form-item label="项目名称" prop="project_name">
          <el-input v-model="editForm.project_name"></el-input>
        </el-form-item>
        <el-form-item label="项目角色" prop="project_role">
          <el-select
            v-model="editForm.project_role"
            placeholder="请选择项目角色"
          >
            <el-option label="标注专员" value="标注专员"></el-option>
            <el-option label="质量专员" value="质量专员"></el-option>
            <el-option label="质控专家" value="质控专家"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否加班" prop="work_overtime">
          <el-select
            v-model="editForm.work_overtime"
            placeholder="请选择是否加班"
          >
            <el-option
              v-for="item in overListF"
              :key="item.id"
              :label="item.label"
              :value="item.value"
              @click.native="addOverE"
            ></el-option>
            <el-option
              v-for="item in overListT"
              :key="item.id"
              :label="item.label"
              :value="item.value"
              @click.native="removeOverE"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否需要核算绩效" prop="account">
          <el-select
            v-model="editForm.account"
            placeholder="请选择是否需要核算绩效"
          >
            <el-option
              v-for="item in accList"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="常班-标注工时" prop="mark_time">
              <el-input
                v-model="editForm.mark_time"
                v-only-number="{ max: 8, min: 0, precision: 2 }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="常班-质检工时" prop="quality_time">
              <el-input
                v-model="editForm.quality_time"
                v-only-number="{ max: 8, min: 0, precision: 2 }"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="常班-标注工作量" prop="mark_number">
              <el-input
                v-model="editForm.mark_number"
                v-only-number="{ max: 99999, min: 0, precision: 0 }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="常班-质检工作量" prop="quality_number">
              <el-input
                v-model="editForm.quality_number"
                v-only-number="{ max: 99999, min: 0, precision: 0 }"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="常班-试标工时" prop="test_mark_time">
          <el-input
            v-model="editForm.test_mark_time"
            v-only-number="{ max: 8, min: 0, precision: 2 }"
          ></el-input>
        </el-form-item>
        <el-form-item label="常班-非标-培训工时" prop="traing_time">
          <el-input
            v-model="editForm.traing_time"
            v-only-number="{ max: 8, min: 0, precision: 2 }"
          ></el-input>
        </el-form-item>
        <el-form-item label="常班-非标-答疑工时" prop="question_time">
          <el-input
            v-model="editForm.question_time"
            v-only-number="{ max: 8, min: 0, precision: 2 }"
          ></el-input>
        </el-form-item>
        <el-form-item label="常班-非标-数据处理工时" prop="data_process_time">
          <el-input
            v-model="editForm.data_process_time"
            v-only-number="{ max: 8, min: 0, precision: 2 }"
          ></el-input>
        </el-form-item>
        <el-form-item label="常班-非标-复盘工时" prop="analyse_time">
          <el-input
            v-model="editForm.analyse_time"
            v-only-number="{ max: 8, min: 0, precision: 2 }"
          ></el-input>
        </el-form-item>
        <el-form-item label="常班-非标-其他工时" prop="other_time">
          <el-input
            v-model="editForm.other_time"
            v-only-number="{ max: 8, min: 0, precision: 2 }"
          ></el-input>
        </el-form-item>
        <el-form-item label="常班-工损工时" prop="loss_time">
          <el-input
            v-model="editForm.loss_time"
            v-only-number="{ max: 8, min: 0, precision: 2 }"
          ></el-input>
        </el-form-item>
        <el-form-item label="常班-备注" prop="note">
          <el-input v-model="editForm.note"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="加班-标注工时"
              prop="over_mark_time"
              v-show="overFlagE == 1"
            >
              <el-input
                v-model="editForm.over_mark_time"
                v-only-number="{ max: 24, min: 0, precision: 2 }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="加班-质检工时"
              prop="over_quality_time"
              v-show="overFlagE == 1"
            >
              <el-input
                v-model="editForm.over_quality_time"
                v-only-number="{ max: 24, min: 0, precision: 2 }"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="加班-标注工作量"
              prop="over_mark_number"
              v-show="overFlagE == 1"
            >
              <el-input
                v-model="editForm.over_mark_number"
                v-only-number="{ max: 99999, min: 0, precision: 0 }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="加班-质检工作量"
              prop="over_quality_number"
              v-show="overFlagE == 1"
            >
              <el-input
                v-model="editForm.over_quality_number"
                v-only-number="{ max: 99999, min: 0, precision: 0 }"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item
          label="加班-试标工时"
          prop="over_test_mark_time"
          v-show="overFlagE == 1"
        >
          <el-input
            v-model="editForm.over_test_mark_time"
            v-only-number="{ max: 24, min: 0, precision: 2 }"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="加班-非标-培训工时"
          prop="over_traing_time"
          v-show="overFlagE == 1"
        >
          <el-input
            v-model="editForm.over_traing_time"
            v-only-number="{ max: 24, min: 0, precision: 2 }"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="加班-非标-答疑工时"
          prop="over_question_time"
          v-show="overFlagE == 1"
        >
          <el-input
            v-model="editForm.over_question_time"
            v-only-number="{ max: 24, min: 0, precision: 2 }"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="加班-非标-数据处理工时"
          prop="over_data_process_time"
          v-show="overFlagE == 1"
        >
          <el-input
            v-model="editForm.over_data_process_time"
            v-only-number="{ max: 24, min: 0, precision: 2 }"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="加班-非标-复盘工时"
          prop="over_analyse_time"
          v-show="overFlagE == 1"
        >
          <el-input
            v-model="editForm.over_analyse_time"
            v-only-number="{ max: 24, min: 0, precision: 2 }"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="加班-非标-其他工时"
          prop="over_other_time"
          v-show="overFlagE == 1"
        >
          <el-input
            v-model="editForm.over_other_time"
            v-only-number="{ max: 24, min: 0, precision: 2 }"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="加班-工损工时"
          prop="over_loss_time"
          v-show="overFlagE == 1"
        >
          <el-input
            v-model="editForm.over_loss_time"
            v-only-number="{ max: 24, min: 0, precision: 2 }"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="加班情况说明"
          prop="over_note"
          v-show="overFlagE == 1"
        >
          <el-input v-model="editForm.over_note"></el-input>
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
import {
  getEmployee,
  addEmployee,
  editEmployee,
  removeEmployee,
} from "../../api/api.js";
import { getToken } from "../../utils/setToken.js";
import moment from "moment";

export default {
  data() {
    return {
      userList: [],
      projectList: [],
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
      //控制添加明细表单对话框的显示与隐藏
      addDialogVisible: false,
      //控制添加表单加班输入框的显示与隐藏
      overFlag: 0,
      //控制添加表非标输入框的显示与隐藏
      noMarkFlag: 0,
      //控制修改表单加班输入框的显示与隐藏
      overFlagE: 0,

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
    //查询所有表单
    getList() {
      getEmployee(this.id, this.currentPage, this.PageSize, this.names).then(
        (res) => {
          if (res.data.ret == 0) {
            this.userList = res.data.data_list;
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
    //添加明细表单
    addList() {
      this.$refs.addFormRef.validate((valid) => {
        if (!valid) return;
        addEmployee(this.addForm).then((res) => {
          if (res.data.ret == 0) {
            this.$message.success("添加表单成功");
            //隐藏添加用户对话框
            this.addDialogVisible = false;
            this.addDialogClosed();
            //刷新列表
            this.getList();
          }
        });
      });
    },
    //展示编辑明细表单的对话框
    showEditDialogList(
      id,
      data_time,
      project_name,
      project_role,
      work_overtime,
      account,
      mark_time,
      mark_number,
      quality_time,
      quality_number,
      test_mark_time,
      traing_time,
      question_time,
      data_process_time,
      analyse_time,
      other_time,
      loss_time,
      note,
      over_mark_time,
      over_mark_number,
      over_quality_time,
      over_quality_number,
      over_test_mark_time,
      over_traing_time,
      over_question_time,
      over_data_process_time,
      over_analyse_time,
      over_other_time,
      over_loss_time,
      over_note
    ) {
      //console.log(id)

      let nowTime = moment()
        .format("YYYY-MM-DD")
        .replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, "");
      let nowTimeN = Number(nowTime);
      let workTime = data_time.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, "");
      let workTimeN = Number(workTime);
      let timeSub = nowTimeN - workTimeN;
      if (timeSub < 2) {
        this.editDialogVisible = true;
        this.editForm.id = id;
        this.editForm.data_time = data_time;
        (this.editForm.project_name = project_name),
          (this.editForm.project_role = project_role),
          (this.editForm.work_overtime = work_overtime),
          (this.editForm.account = account),
          (this.editForm.mark_time = mark_time),
          (this.editForm.mark_number = mark_number),
          (this.editForm.quality_time = quality_time),
          (this.editForm.quality_number = quality_number),
          (this.editForm.test_mark_time = test_mark_time),
          (this.editForm.traing_time = traing_time),
          (this.editForm.question_time = question_time);
        (this.editForm.data_process_time = data_process_time),
          (this.editForm.analyse_time = analyse_time),
          (this.editForm.other_time = other_time),
          (this.editForm.loss_time = loss_time),
          (this.editForm.note = note),
          (this.editForm.over_mark_time = over_mark_time),
          (this.editForm.over_mark_number = over_mark_number),
          (this.editForm.over_quality_time = over_quality_time),
          (this.editForm.over_quality_number = over_quality_number),
          (this.editForm.over_test_mark_time = over_test_mark_time),
          (this.editForm.over_traing_time = over_traing_time),
          (this.editForm.over_question_time = over_question_time);
        (this.editForm.over_data_process_time = over_data_process_time),
          (this.editForm.over_analyse_time = over_analyse_time),
          (this.editForm.over_other_time = over_other_time),
          (this.editForm.over_loss_time = over_loss_time),
          (this.editForm.over_note = over_note);
        if (this.editForm.work_overtime == 0) return this.addOverE();
      } else {
        this.$message.error("已过修改DDL,如有需求请填写纠偏表！");
      }
    },

    /*  修改明细表单并提交 */
    editList() {
      //预校验
      this.$refs.editFormRef.validate((valid) => {
        if (!valid) return;
        editEmployee(this.editForm).then((res) => {
          if (res.data.ret == 0) {
            //关闭对话框
            this.editDialogVisible = false;
            //刷新数据列表
            this.getList();
            //提示
            this.$message.success("更新成功！");
          }
        });
      });
    },
    //根据id删除对应的用户信息
    removeListById(id, data_time) {
      let nowTime = moment()
        .format("YYYY-MM-DD")
        .replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, "");
      let nowTimeN = Number(nowTime);
      let workTime = data_time.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, "");
      let workTimeN = Number(workTime);
      let timeSub = nowTimeN - workTimeN;
      if (timeSub < 2) {
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
            removeEmployee(this.id, id).then((res) => {
              if (res.data.ret == 0) {
                this.$message.success("删除成功！");
                this.getList();
              }
            });
          })
          .catch(() => {
            this.message.error("删除取消");
          });
      } else {
        this.$message.error("已过删除DDL,如有需求请填写纠偏表！");
      }
    },
    /* 监听添加表单对话框关闭重置 */
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
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

    //控制修改加班表单展示
    addOverE() {
      this.overFlagE = 1;
    },
    removeOverE() {
      (this.overFlagE = 0),
        (this.editForm.over_mark_time = 0),
        (this.editForm.over_mark_number = 0),
        (this.editForm.over_quality_time = 0),
        (this.editForm.over_quality_number = 0),
        (this.editForm.over_test_mark_time = 0),
        (this.editForm.over_traing_time = 0),
        (this.editForm.over_question_time = 0),
        (this.editForm.over_data_process_time = 0),
        (this.editForm.over_analyse_time = 0),
        (this.editForm.over_other_time = 0),
        (this.editForm.over_loss_time = 0),
        (this.editForm.over_note = 0);
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
</style>
