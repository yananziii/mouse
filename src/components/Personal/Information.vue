<template>
  <div>
    <el-card>
      <!--     面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Notice' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>个人</el-breadcrumb-item>
        <el-breadcrumb-item>个人信息</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
    <!-- 卡片视图 -->
    <el-card>
      <el-row class="info-show-imp">
        {{ this.userInfo.first_name }}
      </el-row>
      <el-row class="info-show-imp">{{ this.userInfo.email }}</el-row>
      <el-row class="info-des">基本信息</el-row>
      <el-row class="info-show-bas">
        <el-col :span="2">工号:</el-col>
        <el-col>
          {{ this.userInfo.username }}
        </el-col>
      </el-row>
      <el-row class="info-show-bas">
        <el-col :span="2">组别:</el-col>
        <el-col>
          <span v-if="this.userInfo.team_group == 'x1'">项目交付1小组</span>
          <span v-if="this.userInfo.team_group == 'x2'">项目交付2小组</span>
          <span v-if="this.userInfo.team_group == 'x3'">项目交付3小组</span>
          <span v-if="this.userInfo.team_group == 'x4'">项目交付4小组</span>
          <span v-if="this.userInfo.team_group == 'x5'">项目交付5小组</span>
          <span v-if="this.userInfo.team_group == 'x6'">项目交付6小组</span>
          <span v-if="this.userInfo.team_group == 'x7'">项目交付7小组</span>
          <span v-if="this.userInfo.team_group == 'z1'">综合标注1小组</span>
          <span v-if="this.userInfo.team_group == 'z2'">综合标注2小组</span>
          <span v-if="this.userInfo.team_group == 'z3'">综合标注3小组</span>
          <span v-if="this.userInfo.team_group == 'z4'">综合标注4小组</span>
          <span v-if="this.userInfo.team_group == 'y'">项资运营组</span>
          <span v-if="this.userInfo.team_group == 'other'">其他</span>
          <span v-if="this.userInfo.team_group == 'm1'">流量推荐评测1小组</span>
          <span v-if="this.userInfo.team_group == 'm2'">模型策略运营1小组</span>
          <span v-if="this.userInfo.team_group == 'm3'">搜索策略评估1小组</span>
          <span v-if="this.userInfo.team_group == 'm4'">搜索策略评估2小组</span>
        </el-col>
      </el-row>
      <el-row class="info-show-bas">
        <el-col :span="2">入职时间:</el-col>
        <el-col>
          {{ this.userInfo.work_time }}
        </el-col>
      </el-row>
      <el-row class="info-show-bas">
        <el-col :span="2">员工类别:</el-col>
        <el-col>
          {{ this.userInfo.work_role }}
        </el-col>
      </el-row>
      <el-row class="info-des">拓展信息</el-row>
      <el-row class="info-show-bas">
        <el-col :span="2">汉语能力:</el-col>
        <el-col>
      <el-select v-model="userInfo.language">
        <el-option
              v-for="item in this.languageList"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            >
          </el-option></el-select>
        </el-col>
      </el-row>
      <el-row class="info-show-bas">
        <el-col :span="2">英语能力:</el-col>
        <el-col>
      <el-select v-model="userInfo.english">
        <el-option
              v-for="item in this.englishiList"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            >
          </el-option></el-select>
        </el-col>
      </el-row>
      <el-row class="info-show-bas">
        <el-col :span="2">方言能力:</el-col>
        <el-col>
      <el-select v-model="userInfo.dialect" multiple>

                <el-option
                  v-for="item in this.dialects"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
        </el-col>
      </el-row>
      <el-row class="info-show-bas">
        <el-col :span="2">小语种:</el-col>
        <el-col>
      <el-select v-model="userInfo.small_language" multiple>

                <el-option
                  v-for="item in this.small_languages"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
        </el-col>
      </el-row>
      <el-row class="info-show-bas">
        <el-col :span="2">平台工具:</el-col>
        <el-col>
      <el-select v-model="userInfo.platform_tool" multiple>

                <el-option
                  v-for="item in this.platform_tools"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
        </el-col>
      </el-row>
      <el-row class="info-show-bas">
        <el-col :span="2">垂类标签:</el-col>
        <el-col>
      <el-select v-model="userInfo.label" multiple>

                <el-option
                  v-for="item in this.labels"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
        </el-col>
      </el-row>
      <el-row class="info-show-bas">
        <el-col :span="2">兴趣爱好:</el-col>
        <el-col :span="5">
        <el-input v-model="userInfo.hobby"></el-input></el-col>
      </el-row>
      <el-row class="info-show-bas">
        <el-col :span="2">学院专业:</el-col>
        <el-col :span="5">
        <el-input v-model="userInfo.university"></el-input></el-col>
      </el-row>
      <el-row class="info-show-button">
        <el-tooltip   
             effect="dark"
              content="修改个人信息"
              placement="top">
        <el-button type="primary" icon="el-icon-edit" 
        @click="editInfo"> </el-button>
    </el-tooltip>
     </el-row>
    </el-card>
  </div>
</template>

<script>
import { getToken } from "../../utils/setToken.js";
import { getUserInformation, editUserInformation } from "../../api/api.js";

export default {
  data() {
    return {
      userInfo: {

      },
      //添加表单的对话框
      addDialogVisible: false,
      //添加表单
      addForm: {
        language: "",
        english: "",
        dialect: "",
        small_language: "",
        platform_tool: "",
        label: "",
        hobby: "",
      },
      //表单规则
      userInfoRules: {},
      //汉语能力
      languageList:[
      {
              value:"一级甲等",
              label:"一级甲等",
          },
          {
              value:"一级乙等",
              label:"一级乙等",
          },
          {
              value:"二级甲等",
              label:"二级甲等",
          },
          {
              value:"二级乙等",
              label:"二级乙等",
          },
          {
              value:"三级甲等",
              label:"三级甲等",
          },
          {
              value:"三级乙等",
              label:"三级乙等",
          },
          {
              value:"其他",
              label:"其他",
          }
      ],
      englishiList:[
      {
              value:"英语四级",
              label:"英语四级",
          },
          {
              value:"英语六级",
              label:"英语六级",
          },
          {
              value:"专业四级",
              label:"专业四级",
          },
          {
              value:"专业八级",
              label:"专业八级",
          },
          {
              value:"雅思(分数区间)",
              label:"雅思(分数区间)",
          },
          {
              value:"托福(分数区间)",
              label:"托福(分数区间)",
          },
          {
              value:"高级口译、笔译",
              label:"高级口译、笔译",
          }
          ,
          {
              value:"其他",
              label:"其他",
          }
      ],
      //方言能力
      dialects: [
        {
          value: "东北官话",
          label: "东北官话",
        },
        {
          value: "冀鲁官话",
          label: "冀鲁官话",
        },
        {
          value: "胶辽官话",
          label: "胶辽官话",
        },
        {
          value: "北京官话",
          label: "北京官话",
        },
        {
          value: "中原官话",
          label: "中原官话",
        },
        {
          value: "兰银官话",
          label: "兰银官话",
        },
        {
          value: "江淮官话",
          label: "江淮官话",
        },
        {
          value: "西南官话",
          label: "西南官话",
        },
        {
          value: "晋方言",
          label: "晋方言",
        },
        {
          value: "吴方言",
          label: "吴方言",
        },
        {
          value: "闽方言",
          label: "闽方言",
        },
        {
          value: "客家方言",
          label: "客家方言",
        },
        {
          value: "赣方言",
          label: "赣方言",
        },
        {
          value: "湘方言",
          label: "湘方言",
        },
        {
          value: "平话",
          label: "平话",
        },
        {
          value: "侗台语族",
          label: "侗台语族",
        },
        {
          value: "苗瑶语族",
          label: "苗瑶语族",
        },
        {
          value: "藏缅语族",
          label: "藏缅语族",
        },
        {
          value: "其他",
          label: "其他",
        },
      ],
      //小语种
      small_languages: [
        {
          value: "西班牙语",
          label: "西班牙语",
        },
        {
          value: "葡萄牙语",
          label: "葡萄牙语",
        },
        {
          value: "捷克语",
          label: "捷克语",
        },
        {
          value: "荷兰语",
          label: "荷兰语",
        },
        {
          value: "瑞典语",
          label: "瑞典语",
        },
        {
          value: "波兰语",
          label: "波兰语",
        },
        {
          value: "匈牙利语",
          label: "匈牙利语",
        },
        {
          value: "意大利语",
          label: "意大利语",
        },
        {
          value: "罗马尼亚语",
          label: "罗马尼亚语",
        },
        {
          value: "保加利亚语",
          label: "保加利亚语",
        },
        {
          value: "阿尔巴尼亚语",
          label: "阿尔巴尼亚语",
        },
        {
          value: "塞尔维亚语等",
          label: "塞尔维亚语等",
        },
        {
          value: "朝鲜语(韩语)",
          label: "朝鲜语(韩语)",
        },
        {
          value: "蒙古语",
          label: "蒙古语",
        },
        {
          value: "越南语",
          label: "越南语",
        },
        {
          value: "缅甸语",
          label: "缅甸语",
        },
        {
          value: "泰国语",
          label: "泰国语",
        },
        {
          value: "老挝语",
          label: "老挝语",
        },
        {
          value: "马来语",
          label: "马来语",
        },
        {
          value: "菲律宾语",
          label: "菲律宾语",
        },
        {
          value: "柬埔寨语",
          label: "柬埔寨语",
        },
        {
          value: "阿拉伯语",
          label: "阿拉伯语",
        },
        {
          value: "印度尼西亚语",
          label: "印度尼西亚语",
        },
        {
          value: "乌尔都语",
          label: "乌尔都语",
        },
        {
          value: "豪萨语",
          label: "豪萨语",
        },
        {
          value: "波斯语",
          label: "波斯语",
        },
        {
          value: "普什图语",
          label: "普什图语",
        },
        {
          value: "斯瓦希里语",
          label: "斯瓦希里语",
        },
        {
          value: "僧迦罗语",
          label: "僧迦罗语",
        },
        {
          value: "梵语巴利语",
          label: "梵语巴利语",
        },
        {
          value: "芬兰语",
          label: "芬兰语",
        },
        {
          value: "德语",
          label: "德语",
        },
        {
          value: "法语",
          label: "法语",
        },
        {
          value: "俄语",
          label: "俄语",
        },
        {
          value: "日语",
          label: "日语",
        },
        {
          value: "其他",
          label: "其他",
        },
      ],
      //平台技能
      platform_tools: [
        {
          value: "AdobeDreamweaver",
          label: "Adobe Dreamweaver",
        },
        {
          value: "AdobeIllustrator",
          label: "Adobe Illustrator",
        },
        {
          value: "AdobeInDesign",
          label: "Adobe InDesign",
        },
        {
          value: "AdobePhotoshop",
          label: "Adobe Photoshop",
        },
        {
          value: "AdobeAfterEffects",
          label: "Adobe After Effects",
        },
        {
          value: "AdobePremierePro",
          label: "Adobe PremierePro",
        },
        {
          value: "MicrosoftExcel",
          label: "Microsoft Excel",
        },
        {
          value: "MicrosoftWord",
          label: "Microsoft Word",
        },
        {
          value: "MicrosoftPowerPoint",
          label: "Microsoft PowerPoint",
        },
        {
          value: "CorelDRAW",
          label: "Corel DRAW",
        },
        {
          value: "3dmax",
          label: "3dmax",
        },
        {
          value: "AutoCAD",
          label: "AutoCAD",
        },
        {
          value: "LogicProX",
          label: "LogicProX",
        },
        {
          value: "Cubase",
          label: "Cubase",
        },
        {
          value: "其他",
          label: "其他",
        },
      ],
      //垂类
      labels: [
        {
          value: "色情",
          label: "色情",
        },
        {
          value: "恶心",
          label: "恶心",
        },
        {
          value: "血腥",
          label: "血腥",
        },
        {
          value: "阴郁自伤",
          label: "阴郁自伤",
        },
        {
          value: "涉政",
          label: "涉政",
        },
        {
          value: "商业化",
          label: "商业化",
        },
        {
          value: "搜索",
          label: "搜索",
        },
        {
          value: "3C",
          label: "3C",
        },
        {
          value: "母婴",
          label: "母婴",
        },
        {
          value: "旅游",
          label: "旅游",
        },
        {
          value: "教育",
          label: "教育",
        },
        {
          value: "营养保健",
          label: "营养保健",
        },
        {
          value: "影视",
          label: "影视",
        },
        {
          value: "动漫",
          label: "动漫",
        },
        {
          value: "金融",
          label: "金融",
        },
        {
          value: "法律",
          label: "法律",
        },
        {
          value: "房产",
          label: "房产",
        },
        {
          value: "医疗",
          label: "医疗",
        },
        {
          value: "音乐",
          label: "音乐",
        },
        {
          value: "游戏",
          label: "游戏",
        },
        {
          value: "历史",
          label: "历史",
        },
        {
          value: "其他",
          label: "其他",
        },
      ],
      addFormRules: {},
    };
  },

  created() {
    this.id = JSON.parse(getToken("work_num"));
    this.token = JSON.parse(getToken("admin_token"));
    this.getUserInfo();
  },

  methods: {
    //获取个人信息
    getUserInfo() {
      getUserInformation(this.id).then((res) => {
        if (res.data.ret == 0) {
          this.userInfo = res.data.data;
          this.userInfo.work_num = this.id;
          //element下拉框需要数组类型，字符串类型需要转换
          if (this.userInfo.dialect) {
            this.userInfo.dialect = this.userInfo.dialect.toString();
            this.userInfo.dialect = this.userInfo.dialect.replace(/\'/g, "");
            this.userInfo.dialect = this.userInfo.dialect.replace(/\[/g, "");
            this.userInfo.dialect = this.userInfo.dialect.replace(/\]/g, "");
            this.userInfo.dialect = this.userInfo.dialect.replace(/\s*/g, "");
            this.userInfo.dialect = this.userInfo.dialect.split(",");
          }
          if (this.userInfo.small_language) {
            this.userInfo.small_language =
              this.userInfo.small_language.toString();
            this.userInfo.small_language = this.userInfo.small_language.replace(
              /\'/g,
              ""
            );
            this.userInfo.small_language = this.userInfo.small_language.replace(
              /\"/g,
              ""
            );
            this.userInfo.small_language = this.userInfo.small_language.replace(
              /\[/g,
              ""
            );
            this.userInfo.small_language = this.userInfo.small_language.replace(
              /\]/g,
              ""
            );
            this.userInfo.small_language = this.userInfo.small_language.replace(
              /\s*/g,
              ""
            );
            this.userInfo.small_language =
              this.userInfo.small_language.split(",");
          }
          if (this.userInfo.platform_tool) {
            this.userInfo.platform_tool =
              this.userInfo.platform_tool.toString();
            this.userInfo.platform_tool = this.userInfo.platform_tool.replace(
              /\'/g,
              ""
            );
            this.userInfo.platform_tool = this.userInfo.platform_tool.replace(
              /\[/g,
              ""
            );
            this.userInfo.platform_tool = this.userInfo.platform_tool.replace(
              /\]/g,
              ""
            );
            this.userInfo.platform_tool = this.userInfo.platform_tool.replace(
              /\s*/g,
              ""
            );
            this.userInfo.platform_tool =
              this.userInfo.platform_tool.split(",");
          }
          if (this.userInfo.label) {
            this.userInfo.label = this.userInfo.label.toString();
            this.userInfo.label = this.userInfo.label.replace(/\'/g, "");
            this.userInfo.label = this.userInfo.label.replace(/\[/g, "");
            this.userInfo.label = this.userInfo.label.replace(/\]/g, "");
            this.userInfo.label = this.userInfo.label.replace(/\s*/g, "");
            this.userInfo.label = this.userInfo.label.split(",");
          }
          console.log(this.userInfo.label);
        }
      });
    },

    //修改个人信息
    editInfo() {
      //弹框
      const confirmResult = this.$confirm(
        "此操作将修改个人信息，是否继续？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          editUserInformation(this.userInfo).then((res) => {
            if (res.data.ret == 0) {
              this.$message.success("修改成功");
              this.getUserInfo();
            }
          });
        })
        .catch(() => {
          this.$message.error("修改取消");
        });
      //如果用户确认删除，返回值为字符串 confirm
      //如果用户取消认删除，返回值为字符串 cancel

      /*         const {data: res} = this.$http.put('common/person?action=modify_person&work_num='+this.id, 
          {
              "action":"modify_person",
              "work_num":this.id,
            "id":this.userInfo.id,
       "team_group":this.userInfo.team_group,
       "work_role":this.userInfo.work_role,
              "newdata":{
              "language": this.userInfo.language,
              "english": this.userInfo.english,
              "dialect": this.userInfo.dialect,
              "small_language": this.userInfo.small_language,
              "platform_tool": this.userInfo.platform_tool,
              "label": this.userInfo.label,
              "hobby": this.userInfo.hobby,
              "work_num":this.id,
            }
          })
          if(res.ret !== 0){
           return  this.$http.error('修改失败')
          }
          this.$message.success('修改成功')
          this.getUserInfo() */
    },
  },
};
</script>

<style lang="less" scoped>
.el-form {
  margin-top: 15px;
  font-size: 12px;
}


.info-show-imp {
  display: flex;
  justify-content: flex-start;
  margin-left: 30%;
  margin-top: 0.5%;
}
.info-des {
  margin-top: 2%;
}
.info-show-bas {
  display: flex;
  justify-content: flex-start;
  margin-left: 24%;
  margin-top: 0.5%;
}
.info-show-button{
    display: flex;
    justify-content: flex-end;
}
</style>
