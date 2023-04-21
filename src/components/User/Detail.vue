<template>
  <div>
    <el-card>
      <!--     面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Notice' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>员工填写</el-breadcrumb-item>
        <el-breadcrumb-item>生产数据详情</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
    <el-card>
      <el-row class="detail-title">审批流程</el-row>
      <!--        <el-row class="detail-silderR">
            <el-col :span="16"  class="detail-silderC1">
                <el-tooltip effect="light"  placement="top" :content=detailList.cause1>              
                      <el-button  type="text">{{ getState(detailList.state1) }}</el-button>
                    </el-tooltip>

            </el-col>
            <el-col  :span="3" class="detail-silderC2">
                <el-tooltip effect="light"  placement="top" :content=detailList.cause2>              
                      <el-button  type="text">{{ getState(detailList.state2) }}</el-button>
                    </el-tooltip>    
            </el-col>
        </el-row>
        <el-slider v-model="valueSlider" range :show-tooltip="false"  :max="12" :marks="marks"></el-slider> -->
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
      <el-row class="detail-title1">基本信息</el-row>
      <el-row class="detail-row">
        <el-col :span="2" class="detail-label1">表单id</el-col>
        <el-col :span="2" class="detail-info">
          <el-input v-model="detailList.id" size="mini" readonly></el-input>
        </el-col>
        <el-col :span="2" class="detail-label2"> 是否核算绩效 </el-col>
        <el-col :span="2" class="detail-info">
          <el-select v-model="detailList.account" size="mini">
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
  <!--         <el-input
            v-model="detailList.data_time"
            size="mini"
            readonly
          ></el-input> -->
          <el-select v-model="detailList.data_time"
          size="mini" :title="detailList.data_time"
          style="width: 120px;">
            <el-option
      v-for="option in this.getDayS()"
      :key="option"
      :label="option"
      :value="option"
      
    ></el-option>
          </el-select>
        </el-col>
       
      </el-row>
      <el-row class="detail-row">
        <el-col :span="2" class="detail-label1">项目角色</el-col>
        <el-col :span="2" class="detail-info">
          <el-select v-model="detailList.project_role" size="mini">
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
          <el-select v-model="detailList.work_overtime" size="mini">
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
          <el-input v-model="detailList.project_name" size="mini"
          :title="detailList.project_name" style="width: 120px;"></el-input>
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
            type="number"
            oninput="
                if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\d+)\.(\d\d).*$/,'$1.$2');
                if(value>8)value=8;
                if(value<0)value=null;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
          ></el-input>
        </el-col>
        <el-col :span="2" class="detail-label3">标注工作量</el-col>
        <el-col :span="1" class="detail-info">
          <el-input
            v-model="detailList.mark_number"
            size="mini"
            type="number"
            oninput="
                if(value>99999)value=99999;
                if(value<0)value=null;
                "
          ></el-input>
        </el-col>
        <el-col :span="2" class="detail-label3">质检工时</el-col>
        <el-col :span="1" class="detail-info">
          <el-input
            v-model="detailList.quality_time"
            size="mini"
            type="number"
            oninput="
                if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\d+)\.(\d\d).*$/,'$1.$2');
                if(value>8)value=8;
                if(value<0)value=null;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
          ></el-input>
        </el-col>
        <el-col :span="2" class="detail-label3">质检工作量</el-col>
        <el-col :span="1" class="detail-info">
          <el-input
            v-model="detailList.quality_number"
            size="mini"
            type="number"
            oninput="
                if(value>99999)value=99999;
                if(value<0)value=null;
                "
          ></el-input>
        </el-col>
        <el-col :span="2" class="detail-label3">试标工时</el-col>
        <el-col :span="1" class="detail-info">
          <el-input
            v-model="detailList.test_mark_time"
            size="mini"
            type="number"
            oninput="
                if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\d+)\.(\d\d).*$/,'$1.$2');
                if(value>8)value=8;
                if(value<0)value=null;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
          ></el-input>
        </el-col>
        <el-col :span="2" class="detail-label3">培训工时</el-col>
        <el-col :span="1" class="detail-info">
          <el-input
            v-model="detailList.traing_time"
            size="mini"
            type="number"
            oninput="
                if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\d+)\.(\d\d).*$/,'$1.$2');
                if(value>8)value=8;
                if(value<0)value=null;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
          ></el-input>
        </el-col>
      </el-row>
      <el-row class="detail-row">
        <el-col :span="2" class="detail-label1">答疑工时</el-col>
        <el-col :span="1" class="detail-info">
          <el-input
            v-model="detailList.question_time"
            size="mini"
            type="number"
            oninput="
                if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\d+)\.(\d\d).*$/,'$1.$2');
                if(value>8)value=8;
                if(value<0)value=null;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
          ></el-input>
        </el-col>
        <el-col :span="2" class="detail-label3">数据处理工时</el-col>
        <el-col :span="1" class="detail-info">
          <el-input
            v-model="detailList.data_process_time"
            size="mini"
            type="number"
            oninput="
                if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\d+)\.(\d\d).*$/,'$1.$2');
                if(value>8)value=8;
                if(value<0)value=null;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
          ></el-input>
        </el-col>
        <el-col :span="2" class="detail-label3">复盘工时</el-col>
        <el-col :span="1" class="detail-info">
          <el-input
            v-model="detailList.analyse_time"
            size="mini"
            type="number"
            oninput="
                if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\d+)\.(\d\d).*$/,'$1.$2');
                if(value>8)value=8;
                if(value<0)value=null;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
          ></el-input>
        </el-col>
        <el-col :span="2" class="detail-label3">其他工时</el-col>
        <el-col :span="1" class="detail-info">
          <el-input
            v-model="detailList.other_time"
            size="mini"
            type="number"
            oninput="
                if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\d+)\.(\d\d).*$/,'$1.$2');
                if(value>8)value=8;
                if(value<0)value=null;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
          ></el-input>
        </el-col>
        <el-col :span="2" class="detail-label3">工损工时</el-col>
        <el-col :span="1" class="detail-info">
          <el-input
            v-model="detailList.loss_time"
            size="mini"
            type="number"
            oninput="
                if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\d+)\.(\d\d).*$/,'$1.$2');
                if(value>8)value=8;
                if(value<0)value=null;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
          ></el-input>
        </el-col>
        <el-col :span="2" class="detail-label3">备注</el-col>
        <el-col :span="1" class="detail-info">
          <el-input v-model="detailList.note" size="mini" :title="detailList.note"
></el-input>
        </el-col>
      </el-row>

      <el-row class="detail-title1">加班明细</el-row>
      <el-row class="detail-row">
        <el-col :span="2" class="detail-label1">标注工时</el-col>
        <el-col :span="1" class="detail-info">
          <el-input
            v-model="detailList.over_mark_time"
            size="mini"
            type="number"
            oninput="
                if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\d+)\.(\d\d).*$/,'$1.$2');
                if(value>24)value=24;
                if(value<0)value=null;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
          ></el-input>
        </el-col>
        <el-col :span="2" class="detail-label3">标注工作量</el-col>
        <el-col :span="1" class="detail-info">
          <el-input
            v-model="detailList.over_mark_number"
            size="mini"
            type="number"
            oninput="
                if(value>99999)value=99999;
                if(value<0)value=null;
                "
          ></el-input>
        </el-col>
        <el-col :span="2" class="detail-label3">质检工时</el-col>
        <el-col :span="1" class="detail-info">
          <el-input
            v-model="detailList.over_quality_time"
            size="mini"
            type="number"
            oninput="
                if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\d+)\.(\d\d).*$/,'$1.$2');
                if(value>24)value=24;
                if(value<0)value=null;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
          ></el-input>
        </el-col>
        <el-col :span="2" class="detail-label3">质检工作量</el-col>
        <el-col :span="1" class="detail-info">
          <el-input
            v-model="detailList.over_quality_number"
            size="mini"
            type="number"
            oninput="
                if(value>99999)value=99999;
                if(value<0)value=null;
                "
          ></el-input>
        </el-col>
        <el-col :span="2" class="detail-label3">试标工时</el-col>
        <el-col :span="1" class="detail-info">
          <el-input
            v-model="detailList.over_test_mark_time"
            size="mini"
            type="number"
            oninput="
                if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\d+)\.(\d\d).*$/,'$1.$2');
                if(value>24)value=24;
                if(value<0)value=null;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
          ></el-input>
        </el-col>
        <el-col :span="2" class="detail-label3">培训工时</el-col>
        <el-col :span="1" class="detail-info">
          <el-input
            v-model="detailList.over_traing_time"
            size="mini"
            type="number"
            oninput="
                if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\d+)\.(\d\d).*$/,'$1.$2');
                if(value>24)value=24;
                if(value<0)value=null;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
          ></el-input>
        </el-col>
      </el-row>
      <el-row class="detail-row">
        <el-col :span="2" class="detail-label1">答疑工时</el-col>
        <el-col :span="1" class="detail-info">
          <el-input
            v-model="detailList.over_question_time"
            size="mini"
            type="number"
            oninput="
                if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\d+)\.(\d\d).*$/,'$1.$2');
                if(value>24)value=24;
                if(value<0)value=null;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
          ></el-input>
        </el-col>
        <el-col :span="2" class="detail-label3">数据处理工时</el-col>
        <el-col :span="1" class="detail-info">
          <el-input
            v-model="detailList.over_data_process_time"
            size="mini"
            type="number"
            oninput="
                if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\d+)\.(\d\d).*$/,'$1.$2');
                if(value>24)value=24;
                if(value<0)value=null;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
          ></el-input>
        </el-col>
        <el-col :span="2" class="detail-label3">复盘工时</el-col>
        <el-col :span="1" class="detail-info">
          <el-input
            v-model="detailList.over_analyse_time"
            size="mini"
            type="number"
            oninput="
                if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\d+)\.(\d\d).*$/,'$1.$2');
                if(value>24)value=24;
                if(value<0)value=null;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
          ></el-input>
        </el-col>
        <el-col :span="2" class="detail-label3">其他工时</el-col>
        <el-col :span="1" class="detail-info">
          <el-input
            v-model="detailList.over_other_time"
            size="mini"
            type="number"
            oninput="
                if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\d+)\.(\d\d).*$/,'$1.$2');
                if(value>24)value=24;
                if(value<0)value=null;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
          ></el-input>
        </el-col>
        <el-col :span="2" class="detail-label3">工损工时</el-col>
        <el-col :span="1" class="detail-info">
          <el-input
            v-model="detailList.over_loss_time"
            size="mini"
            type="number"
            oninput="
                if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\d+)\.(\d\d).*$/,'$1.$2');
                if(value>24)value=24;
                if(value<0)value=null;
                if(value<0)value=null;
                if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);
                "
          ></el-input>
        </el-col>
        <el-col :span="2" class="detail-label3">备注</el-col>
        <el-col :span="1" class="detail-info">
          <el-input v-model="detailList.over_note" size="mini"
          :title="detailList.over_note"></el-input>
        </el-col>
      </el-row>

      <el-row class="detail-button">
        <el-col>
          <el-button type="info" @click="editList()">修改</el-button></el-col
        >

        <el-col
          ><el-button type="info" @click="recallList(dataTime)"
            >撤回</el-button
          ></el-col
        >
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { getDetail, editDetail, recallDetail } from "../../api/api.js";
import { getToken } from "../../utils/setToken.js";
import moment from "moment";
export default {
  data() {
    return {
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
      detailList: [],
      dataTime: "",
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
    };
  },
  created() {
    this.id = JSON.parse(getToken("work_num"));
    this.getList();
  },
  methods: {
getDayS(){
// 获取今天的日期对象
const today = new Date();

// 获取上周五的日期对象
const lastFriday = new Date();
//今天的日期减去当前日期距离上周五的天数就是上周五的日期
lastFriday.setDate(lastFriday.getDate() - (lastFriday.getDay() + 2) % 7);

// 生成日期数组
const dateArray = [];
let currentDate = lastFriday;
while (currentDate <= today) {
  //padStart为填充函数，自动填充为两位数，前面补0
  const year = currentDate.getFullYear().toString().padStart(2, '0');
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const date = currentDate.getDate().toString().padStart(2, '0');
  dateArray.push(`${year}-${month}-${date}`);
  currentDate.setDate(currentDate.getDate() + 1);
}

// 打印日期数组
console.log(dateArray);
return dateArray
},



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
      getDetail(this.id, this.$route.query.id).then((res) => {
        if (res.data.ret == 0) {
          this.detailList = res.data.data[0];
          this.dataTime = res.data.data[0].data_time;
        }
      });
    },
    //修改员工生产校验
    checkEdit(
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
    editList() {
      if (this.detailList.state1 == 1 || this.detailList.state2 == 1) {
        if (
          this.checkEdit(
            this.detailList.mark_time,
            this.detailList.mark_number,
            this.detailList.quality_time,
            this.detailList.quality_number,
            this.detailList.over_mark_time,
            this.detailList.over_mark_number,
            this.detailList.over_quality_time,
            this.detailList.over_quality_number
          )
        ) {
          editDetail(this.detailList).then((res) => {
            console.log(this.detailList.work_overtime)
            if (res.data.ret == 0) {
              this.getList();
              this.$message.success("更新成功!");
            }
          });
        } else {
          this.$message.error("填写不规范，请重新填写!");
        }
      } else {
        this.$message.error("无法操作！");
      }
    },
    recallList(dataTime) {
      if (this.detailList.state1 == 2 && this.detailList.state2 == 2) {
        let nowTime = moment().format("YYYY-MM-DD");
        let strBefor = moment().subtract(1, "day").format("YYYY-MM-DD");
        if (dataTime == nowTime || dataTime == strBefor) {
          recallDetail(
            this.id,
            this.detailList.id,
            this.detailList.order_id
          ).then((res) => {
            if (res.data.ret == 0) {
              this.$router.push({
                path: "Produce",
              });
            }
          });
        } else {
          this.$message.error("已过撤回DDL!");
        }
      } else {
        this.$message.error("无法操作！");
      }
    },
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
  display: flex;
  justify-content: space-around;
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
/*添加css样式*/
/deep/input[type="number"]::-webkit-inner-spin-button,
/deep/input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none !important;
  margin: 0 !important;
}


</style>
