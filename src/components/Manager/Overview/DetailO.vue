<template>
    <div>
      <el-card>
        <!--     面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/Notice' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>项资数据总览</el-breadcrumb-item>
          <el-breadcrumb-item>生产明细</el-breadcrumb-item>
        </el-breadcrumb>
      </el-card>
      <el-card>
        <el-row class="detail-title">审批流程</el-row>
        <!--    <el-row class="detail-silderR">
          <el-col :span="16" class="detail-silderC1">
            <el-tooltip
              effect="light"
              placement="top"
              :content="detailList.cause1"
            >
              <el-button type="text">{{ getState(detailList.state1) }}</el-button>
            </el-tooltip>
          </el-col>
          <el-col :span="3" class="detail-silderC2">
            <el-tooltip
              effect="light"
              placement="top"
              :content="detailList.cause2"
            >
              <el-button type="text">{{ getState(detailList.state2) }}</el-button>
            </el-tooltip>
          </el-col>
        </el-row>
        <el-slider
          v-model="valueSlider"
          range
          :show-tooltip="false"
          :max="12"
          :marks="marks"
        ></el-slider> -->
        <el-row>
          <el-steps
            space="100%"
            :active="getSteps(detailList.state1, detailList.state2)"
          >
            <el-step title="已提报"></el-step>
            <el-step
              :title="getState(detailList.state1)"
              :description="detailList.cause1"
            ></el-step>
            <el-step
              :title="getState(detailList.state2)"
              :description="detailList.cause2"
            ></el-step>
          </el-steps>
        </el-row>
        <!--         <el-row class="detail-silderR">
                <el-col :span="16"  class="detail-silderC1">{{ detailList.cause1 }}</el-col>
                <el-col  :span="3" class="detail-silderC2">{{ detailList.cause2 }}</el-col>
            </el-row> -->
        <el-row class="detail-title1">基本信息</el-row>
        <el-row class="detail-row">
          <el-col :span="2" class="detail-label1">表单id</el-col>
          <el-col :span="2" class="detail-info">
            <el-input v-model="detailList.id" size="mini" readonly></el-input>
          </el-col>
          <el-col :span="2" class="detail-label2"> 是否核算绩效 </el-col>
          <el-col :span="2" class="detail-info">
            <el-select v-model="detailList.account" size="mini" disabled>
              <el-option
                v-for="item in this.flagList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="2" class="detail-label2"> 工作日期 </el-col>
          <el-col :span="2" class="detail-info">
            <el-input
              v-model="detailList.data_time"
              size="mini"
              style="width: 120px;"
              readonly
              :title="detailList.data_time"
            ></el-input>
          </el-col>
         
        </el-row>
        <el-row class="detail-row">
          <el-col :span="2" class="detail-label1">项目角色</el-col>
          <el-col :span="2" class="detail-info">
            <el-select v-model="detailList.project_role" size="mini" disabled>
              <el-option
                v-for="item in this.roleList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
  
          <el-col :span="2" class="detail-label2"> 是否加班 </el-col>
          <el-col :span="2" class="detail-info">
            <el-select v-model="detailList.work_overtime" size="mini" disabled>
              <el-option
                v-for="item in this.flagList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="2" class="detail-label2"> 项目名称 </el-col>
          <el-col :span="2" class="detail-info">
            <el-input v-model="detailList.project_name" size="mini" readonly style="width: 120px;"
            :title="detailList.project_name"></el-input>
          </el-col>
        </el-row>
        <!-- <el-row class="detail-row"> 
                <el-col :span="2" class="detail-label1">项目id</el-col>
                <el-col :span="2" class="detail-info">
                    <el-input v-model="detailList.project_id" size="mini" readonly></el-input>
                </el-col>
     
            <el-col :span="2" class="detail-label2">
                创建时间 
            </el-col> 
            <el-col :span="2" class="detail-info">
                    <el-input v-model="detailList.create_date" size="mini" readonly></el-input>
                </el-col>
                <el-col :span="2" class="detail-label2">
              更新时间 
            </el-col> 
            <el-col :span="3" class="detail-info">
                    <el-input v-model="detailList.update_date" size="mini" readonly></el-input>
                </el-col>
                </el-row> -->
        <el-row class="detail-title1">常班明细</el-row>
        <el-row class="detail-row">
          <el-col :span="2" class="detail-label1">标注工时</el-col>
          <el-col :span="1" class="detail-info">
            <el-input
              v-model="detailList.mark_time"
              size="mini"
              readonly
            ></el-input>
          </el-col>
          <el-col :span="2" class="detail-label3">标注工作量</el-col>
          <el-col :span="1" class="detail-info">
            <el-input
              v-model="detailList.mark_number"
              size="mini"
              readonly
            ></el-input>
          </el-col>
          <el-col :span="2" class="detail-label3">质检工时</el-col>
          <el-col :span="1" class="detail-info">
            <el-input
              v-model="detailList.quality_time"
              size="mini"
              readonly
            ></el-input>
          </el-col>
          <el-col :span="2" class="detail-label3">质检工作量</el-col>
          <el-col :span="1" class="detail-info">
            <el-input
              v-model="detailList.quality_number"
              size="mini"
              readonly
            ></el-input>
          </el-col>
          <el-col :span="2" class="detail-label3">试标工时</el-col>
          <el-col :span="1" class="detail-info">
            <el-input
              v-model="detailList.test_mark_time"
              size="mini"
              readonly
            ></el-input>
          </el-col>
          <el-col :span="2" class="detail-label3">培训工时</el-col>
          <el-col :span="1" class="detail-info">
            <el-input
              v-model="detailList.traing_time"
              size="mini"
              readonly
            ></el-input>
          </el-col>
        </el-row>
        <el-row class="detail-row">
          <el-col :span="2" class="detail-label1">答疑工时</el-col>
          <el-col :span="1" class="detail-info">
            <el-input
              v-model="detailList.question_time"
              size="mini"
              readonly
            ></el-input>
          </el-col>
          <el-col :span="2" class="detail-label3">数据处理工时</el-col>
          <el-col :span="1" class="detail-info">
            <el-input
              v-model="detailList.data_process_time"
              size="mini"
              readonly
            ></el-input>
          </el-col>
          <el-col :span="2" class="detail-label3">复盘工时</el-col>
          <el-col :span="1" class="detail-info">
            <el-input
              v-model="detailList.analyse_time"
              size="mini"
              readonly
            ></el-input>
          </el-col>
          <el-col :span="2" class="detail-label3">其他工时</el-col>
          <el-col :span="1" class="detail-info">
            <el-input
              v-model="detailList.other_time"
              size="mini"
              readonly
            ></el-input>
          </el-col>
          <el-col :span="2" class="detail-label3">工损工时</el-col>
          <el-col :span="1" class="detail-info">
            <el-input
              v-model="detailList.loss_time"
              size="mini"
              readonly
            ></el-input>
          </el-col>
          <el-col :span="2" class="detail-label3">备注</el-col>
          <el-col :span="1" class="detail-info">
            <el-input v-model="detailList.note" size="mini"
            :title="detailList.note"
            readonly></el-input>
          </el-col>
        </el-row>
  
        <el-row class="detail-title1">加班明细</el-row>
        <el-row class="detail-row">
          <el-col :span="2" class="detail-label1">标注工时</el-col>
          <el-col :span="1" class="detail-info">
            <el-input
              v-model="detailList.over_mark_time"
              size="mini"
              readonly
            ></el-input>
          </el-col>
          <el-col :span="2" class="detail-label3">标注工作量</el-col>
          <el-col :span="1" class="detail-info">
            <el-input
              v-model="detailList.over_mark_number"
              size="mini"
              readonly
            ></el-input>
          </el-col>
          <el-col :span="2" class="detail-label3">质检工时</el-col>
          <el-col :span="1" class="detail-info">
            <el-input
              v-model="detailList.over_quality_time"
              size="mini"
              readonly
            ></el-input>
          </el-col>
          <el-col :span="2" class="detail-label3">质检工作量</el-col>
          <el-col :span="1" class="detail-info">
            <el-input
              v-model="detailList.over_quality_number"
              size="mini"
              readonly
            ></el-input>
          </el-col>
          <el-col :span="2" class="detail-label3">试标工时</el-col>
          <el-col :span="1" class="detail-info">
            <el-input
              v-model="detailList.over_test_mark_time"
              size="mini"
              readonly
            ></el-input>
          </el-col>
          <el-col :span="2" class="detail-label3">培训工时</el-col>
          <el-col :span="1" class="detail-info">
            <el-input
              v-model="detailList.over_traing_time"
              size="mini"
              readonly
            ></el-input>
          </el-col>
        </el-row>
        <el-row class="detail-row">
          <el-col :span="2" class="detail-label1">答疑工时</el-col>
          <el-col :span="1" class="detail-info">
            <el-input
              v-model="detailList.over_question_time"
              size="mini"
              readonly
            ></el-input>
          </el-col>
          <el-col :span="2" class="detail-label3">数据处理工时</el-col>
          <el-col :span="1" class="detail-info">
            <el-input
              v-model="detailList.over_data_process_time"
              size="mini"
              readonly
            ></el-input>
          </el-col>
          <el-col :span="2" class="detail-label3">复盘工时</el-col>
          <el-col :span="1" class="detail-info">
            <el-input
              v-model="detailList.over_analyse_time"
              size="mini"
              readonly
            ></el-input>
          </el-col>
          <el-col :span="2" class="detail-label3">其他工时</el-col>
          <el-col :span="1" class="detail-info">
            <el-input
              v-model="detailList.over_other_time"
              size="mini"
              readonly
            ></el-input>
          </el-col>
          <el-col :span="2" class="detail-label3">工损工时</el-col>
          <el-col :span="1" class="detail-info">
            <el-input
              v-model="detailList.over_loss_time"
              size="mini"
              readonly
            ></el-input>
          </el-col>
          <el-col :span="2" class="detail-label3">备注</el-col>
          <el-col :span="1" class="detail-info">
            <el-input
              v-model="detailList.over_note"
              size="mini"
              :title="detailList.over_note"
              readonly
            ></el-input>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </template>
  
  <script>
  import {
    getDetailO
  } from "../../../api/api.js";
  import { getToken } from "../../../utils/setToken.js";
  export default {
    data() {
      return {
        //审批进度条
        valueSlider: [2, 10],
        marks: {
          2: {
            style: {
              color: "#1989FA",
            },
            label: this.$createElement("strong", "第一审批人"),
          },
          10: {
            style: {
              color: "#1989FA",
            },
            label: this.$createElement("strong", "第二审批人"),
          },
        },
        //明细表单
        detailList: [],
        power:"",
        //项目角色列表
        roleList: [
          {
            value: "标注专员",
            label: "标注专员",
          },
          {
            value: "质量专员",
            label: "质量专员",
          },
          {
            value: "质控专家",
            label: "质控专家",
          },
        ],
        //是否列表
        flagList: [
          {
            value: 0,
            label: "是",
          },
          {
            value: 1,
            label: "否",
          },
        ],
        //审批状态列表
        stateList: [
          {
            value: 0,
            label: "已通过",
          },
          {
            value: 1,
            label: "未通过",
          },
          {
            value: 2,
            label: "待审批",
          },
        ],
        //驳回原因
        casue: "",
      };
    },
    created() {
      this.id = JSON.parse(getToken("work_num"));
      this.getList();
    },
    methods: {
      getSteps(state1, state2) {
        if (state1 == 0) {
          if (state2 == 0) {
            return 3;
          } else {
            return 2;
          }
        } else {
          return 1;
        }
      },
      getState(state) {
        if (state == 0) {
          return "已通过";
        } else if (state == 1) {
          return "未通过";
        } else {
          return "待审批";
        }
      },
      getList() {
        getDetailO(this.id, this.$route.query.id).then((res) => {
          if (res.data.ret == 0) {
            this.detailList = res.data.data_list[0];
          }
        });
      }
    },
  };
  </script>
  
  <style lang="less" scoped>
  .detail-title {
    font-size: 24px;
    margin-bottom: 20px;
  }
  .detail-title1 {
    font-size: 24px;
    margin-bottom: 20px;
    margin-top: 20px;
  }
  .detail-label1 {
    font-size: 14px;
  }
  .detail-label2 {
    margin-left: 300px;
    font-size: 14px;
  }
  .detail-label3 {
    margin-left: 60px;
    font-size: 14px;
  }
  .detail-info {
    margin-top: -5px;
  }
  .detail-row {
    margin-top: 20px;
    display: flex;
  flex-wrap: nowrap;
  }
  .detail-button {
    margin-top: 20px;
  }
  .detail-silderR {
    margin-top: -5px;
  }
  .detail-silderC1 {
    font-size: 14px;
    margin-left: 15.2%;
  }
  .detail-silderC2 {
    font-size: 14px;
  }
  </style>
  