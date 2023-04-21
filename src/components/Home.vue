<template>
  <el-container class="home-container">
    <!--     头部组件 -->
    <el-header height="50px">
      <div>
        <span class="system-name-chinese"> 薯标 </span>
      </div>
      <div>
        <span class="person-set">
          <el-dropdown placement="bottom">
            <span class="true-name">
              {{ this.userInfo.first_name }}
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="signOut"
                >退出登陆</el-dropdown-item
              >
              <el-dropdown-item @click.native="toModify"
                >修改密码</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </span>
      </div>
    </el-header>
    <el-container>
      <!--         侧边栏组件 -->
      <el-aside :width="isCollapse ? '64px' : '150px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!--         侧边栏菜单区 -->
        <el-menu
          background-color="#ffffff"
          text-color="#000000"
          active-text-color="#6560be"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
        >
          <el-menu-item
            :index="item.path"
            v-for="item in noChildren(this.menulist.data)"
            :key="item.id"
          >
            <i :class="'el-icon-' + item.icon"></i>
            <span slot="title">{{ item.authName }}</span>
          </el-menu-item>
          <el-submenu
            :index="item.id + ''"
            v-for="(item, index) in hasChildren(this.menulist.data)"
            :key="index"
          >
            <template slot="title">
              <i :class="'el-icon-' + item.icon"></i>
              <span>{{ item.authName }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                :index="subItem.path"
                v-for="(subItem, subIndex) in noChildren(item.children)"
                :key="subIndex"
              >
                {{ subItem.authName }}
              </el-menu-item>
            </el-menu-item-group>
            <el-submenu
              :index="subItem.path"
              v-for="(subItem, subIndex) in hasChildren(item.children)"
              :key="subIndex"
            >
              <template slot="title">
               
                <span>{{ subItem.authName }}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  :index="abcItem.path"
                  v-for="(abcItem, abcIndex) in noChildren(subItem.children)"
                  :key="abcIndex"
                >
                  {{ abcItem.authName }}
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <!--             <el-menu-item-group>
              <el-menu-item
                :index="subItem.path"
                v-for="(subItem, subIndex) in item.children"
                :key="subIndex"
              >
                {{ subItem.authName }}
              </el-menu-item>
            </el-menu-item-group> -->
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--       右侧主体组件 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getToken, clearToken } from "@/utils/setToken.js";
import { logOut, getUserInformation } from "@/api/api.js";
export default {
  data() {
    return {
      timeInterval: null,
      userInfo: {},
      menulist: {
        logoName: "",
        data: [
          {
            id: 901,
            authName: "首页",
            path: "/Notice",
            icon: "s-home",
          },
          {
            id: 101,
            authName: "个人中心",
            path: "/Presonal",
            icon: "user",
            children: [
              {
                id: 102,
                authName: "个人信息",
                path: "/Information",
              },
            ],
          },
          {
            id: 201,
            authName: "项资运营",
            path: "/Manager",
            icon: "service",
            children: [
              {
                id: 202,
                authName: "需求管理",
                path: "/Need",
              },
              {
                id: 203,
                authName: "流程审批",
                path: "/ApprovesO",
              },
              {
                id: 204,
                authName: "数据总览",
                path: "/Ovewview",
                children: [
                  {
                    id: 205,
                    authName: "员工产出",
                    path: "/ProduceO",
                  },
                  {
                    id: 206,
                    authName: "员工质量",
                    path: "/RecordingO",
                  },
                  {
                    id: 207,
                    authName: "项目明细",
                    path: "/ProjectO",
                  },
                  {
                    id: 208,
                    authName: "项目分发",
                    path: "/SituationO",
                  },
                  {
                    id: 209,
                    authName: "数据交付",
                    path: "/DeliveryO",
                  },
                ],
              },
            ],
          },
          {
            id: 401,
            authName: "团队管理",
            path: "/Expert",
            icon: "connection",
            children: [
              {
                id: 402,
                authName: "我的项目",
                path: "/Project",
              },
              {
                id: 403,
                authName: "项目详情",
                path: "/Situation",
              },
              {
                id: 404,
                authName: "项目生产",
                path: "/Produces",
              },
              {
                id: 405,
                authName: "项目质量",
                path: "/Recordings",
              },
              {
                id: 406,
                authName: "流程审批",
                path: "/Approves",
              },
            ],
          },
          {
            id: 501,
            authName: "员工填写",
            path: "/User",
            icon: "monitor",
            children: [
              {
                id: 502,
                authName: "生产数据",
                path: "/Produce",
              },
              {
                id: 503,
                authName: "质量数据",
                path: "/Recording",
              },
              {
                id: 504,
                authName: "员工审批",
                path: "/Approval",
              },
            ],
          },
        ],
        meta: {
          msg: "获取成功",
          status: 200,
        },
      },
      //默认不折叠
      isCollapse: false,
    };
  },
  created() {
    var ip = window.location.host;
console.log("ip",ip.split(":")[0])
    this.id = JSON.parse(getToken("work_num"));
    this.getName();
/*     clearInterval(this.timeInterval);
    this.show_runtime(); */

  },
  methods: {
    noChildren(data) {
      return data.filter((item) => !item.children);
    },
    hasChildren(data) {
      return data.filter((item) => item.children);
    },
    //获取个人姓名
    getName() {
      getUserInformation(this.id).then((res) => {
        if (res.data.ret == 0) {
          this.userInfo = res.data.data;
        }
      });
    },

    signOut() {
      logOut().then((res) => {
        if (res.data.ret == 0) {
          this.$message.success("退出成功");
          clearToken();
          this.$router.push("./login");
        }
      });
    },
    //去修改密码
    toModify() {
      this.$router.replace("/passwd");
    },
    toggleCollapse() {
      //菜单折叠展开
      this.isCollapse = !this.isCollapse;
    },
    //每日定时提醒
  /*   noticeShow() {
      this.$notify({
        title: "提醒",
        message: "今日数据请及时更新！！！",
        type: "warning",
        duration: 0,
      });
    },

    show_runtime() {
      this.timeInterval = setInterval(() => {
        // 获取当前时间
        const nowDate = new Date();
        // 获取时
        const hour = nowDate.getHours();
        // 获取分
        const min = nowDate.getMinutes();
        // 获取秒
        const sec = nowDate.getSeconds();
        if (hour == 17 && min == 44 && sec == 55) {
          this.noticeShow();
        }
      }, 1000);
    }, */
    //异步请求获取菜单数据
    //  async getMenuList(){
    //       const{ data : res} = await this.$http.get('menus')
    //       if(res.meta.status !== 200) return this.$message.error(res.meta.msg)
    //       this.menulist = res.data
    //       console.log(res)

    //   }
  },
  //定时器
/*   destroyed() {
    clearInterval(this.timeInterval);
  }, */
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
//顶部
.el-header {
  background-color: #353d50;
  display: flex;
  justify-content: space-between;
  padding-left: 35px;
  align-items: center;
  color: #878687;
  font-size: 20px;
  border-bottom: 1px solid #e3e7eb;
}
//侧边栏
.el-aside {
  background-color: #ffffff;
  border-top: 1px solid #e3e7eb;
  border-right: 1px solid #e3e7eb;
}
//主界面
.el-main {
  background-color: #f0f2f5;
}
.el-submenu-item {
  font-size: 10px;
}
//侧边栏打开关闭按钮
.toggle-button {
  background-color: #f0f2f5;
  font-size: 5px;
  line-height: 24px;
  color: #156787;
  text-align: center;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
  font-size: 24px;
}

.true-name {
  color: #8c9fb3;
  font-size: 24px;
  font-family: cursive;
}

.system-name-chinese {
  color: #8c9fb3;
  font-size: 20px;
  font-family: cursive;
}
</style>
