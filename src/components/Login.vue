<template>
  <div class="login_container">
    <div class="login_box">
      <!--  头像区域 -->
      <div class="avatar_box">
        <img src="../assets/mouse.jpg" />
      </div>
      <!-- 登陆表单区域 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFromRules"
        label-width="0px"
        class="login_form"
      >
        <!--  工号 -->
        <el-form-item prop="work_num">
          <el-input
            v-model="loginForm.work_num"
            prefix-icon="el-icon-user"
            @keyup.enter.native="login"
            plachehold="工号"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
            type="password"
            @keyup.enter.native="login"
            plachehold="密码"
            show-password
          ></el-input>
        </el-form-item>
        <span class="forgot_passwd">
          <a href="passwd" target="_blank">忘记密码？</a>
        </span>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="info" @click="resetLoginForm">重置</el-button>
          <el-button type="success" @click="addDialogVisible = true"
            >注册</el-button
          >
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!--     注册用户填写表单 -->
    <el-dialog
      title="用户注册"
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
        <el-form-item label="姓名" prop="first_name">
          <el-input v-model="addForm.first_name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="addForm.sex"></el-input>
        </el-form-item>
        <el-form-item label="工号" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="办公邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="组别" prop="team_group">
          <el-select v-model="addForm.team_group">
            <el-option label="项目交付1小组" value="x1"></el-option>
            <el-option label="项目交付2小组" value="x2"></el-option>
            <el-option label="项目交付3小组" value="x3"></el-option>
            <el-option label="项目交付4小组" value="x4"></el-option>
            <el-option label="项目交付5小组" value="x5"></el-option>
            <el-option label="项目交付6小组" value="x6"></el-option>
            <el-option label="项目交付7小组" value="x7"></el-option>
            <el-option label="综合标注1小组" value="z1"></el-option>
            <el-option label="综合标注2小组" value="z2"></el-option>
            <el-option label="综合标注3小组" value="z3"></el-option>
            <el-option label="综合标注4小组" value="z4"></el-option>
            <el-option label="项资运营组" value="y"></el-option>
            <el-option label="流量推荐评测1小组" value="m1"></el-option>
            <el-option label="模型策略运营1小组" value="m2"></el-option>
            <el-option label="搜索策略评估1小组" value="m3"></el-option>
            <el-option label="搜索策略评估2小组" value="m4"></el-option>
            <el-option label="其他" value="other"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="员工类别" prop="work_role">
          <el-select v-model="addForm.work_role">
            <el-option label="标注专员" value="标注专员"></el-option>
            <el-option label="质量专员" value="质量专员"></el-option>
            <el-option label="质控专家" value="质控专家"></el-option>
            <el-option label="项资运营岗" value="项资运营岗"></el-option>
            <el-option label="管理岗" value="管理岗"></el-option>
            <el-option label="模型运维专家" value="模型运维专家"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入职时间" prop="work_time">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="addForm.work_time"
            style="width: 100%"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            @change="getAddDate"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="学院专业" prop="university">
          <el-input v-model="addForm.university"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="addForm.password"
            type="password"
            placeholder="由字母和数字组成的8-20位字符串！"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password1">
          <el-input
            v-model="addForm.password1"
            type="password"
            show-password
          ></el-input>
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
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
 import { setToken ,getCookie } from "../utils/setToken.js"; 
import { login, register,} from "../api/api.js";

export default {
  name: "Login",
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.addForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      //登陆表单的数据绑定对象
      loginForm: {
        work_num: "", //工号
        password: "", //密码
      },
      //这是表单验证规则对象
      loginFromRules: {
        //验证工号是否合法
        work_num: [
          { required: true, message: "请输入工号", trigger: "blur" },
          {
            min: 8,
            max: 10,
            message: "工号长度在 8 到 10 个字符",
            trigger: "blur",
          },
        ],
        //验证密码是否合法,必须由数字和字母组成，且字符长度为8-20位
        password: [
          { required: true, message: "请输入登陆密码", trigger: "blur" },
          {
            pattern: /(^(?![0-9]+$)(?![a-zA-Z]+$)[0-9a-zA-Z]{8,20}$)/,
            message: "请输入正确密码格式",
          },
        ],
      },
      //注册用户表单
      addForm: {
        first_name: "",
        sex: "",
        username: "",
        email: "",
        team_group: "",
        work_role: "",
        work_time: "",
        university: "",
        password: "",
        password1: "",
      },
      addDialogVisible: false,
      //注册用户表单规则
      addFormRules: {
        first_name: [
          { required: true, message: "姓名为必填项！", trigger: "blur" },
        ],
        username: [
          { required: true, message: "工号为必填项！", trigger: "blur" },
          {
            min: 8,
            max: 10,
            message: "工号长度在 8 到 10 个字符",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "邮箱为必填项！", trigger: "blur" },
          {
            pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            message: "请输入正确邮箱格式",
          },
        ],
        sex: [{ required: true, message: "性别为必填项！", trigger: "blur" }],
        team_group: [
          { required: true, message: "团队组别为必填项！", trigger: "blur" },
        ],
        work_role: [
          { required: true, message: "工作角色为必填项！", trigger: "blur" },
        ],
        work_time: [
          { required: true, message: "入职时间为必填项！", trigger: "blur" },
        ],
        university: [
          { required: true, message: "学院专业为必填项！", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码为必填项！", trigger: "blur" },
          {
            pattern: /(^(?![0-9]+$)(?![a-zA-Z]+$)[0-9a-zA-Z]{8,20}$)/,
            message: "请输入正确密码格式",
          },
        ],
        password1: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    /* 重置登陆表单 */
    resetLoginForm() {
      //console.log(this)
      this.$refs.loginFormRef.resetFields();
    },
    //登陆
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return;
        login(this.loginForm).then((res) => {
          if (res.data.ret == 0) {
            setToken("work_num", this.loginForm.work_num);
            //setToken("admin_token", JSON.stringify(res.data.ALG));
            this.$router.push(
            "/Notice"
            );
          }
        });
        /*                 const{ data: res } = await this.$http.post('common/login?work_num='+this.loginForm.work_num,
                {   "action":"signin",
                    "data":this.loginForm
                });
                if(res.ret !== 0) return this.$message.error('登陆失败');
                this.$message.success('登陆成功');
     /*            登陆成功后的work_num保存到客户端的localStorage中  */
        //window.localStorage.setItem("work_num", this.loginForm.work_num);
        //setToken("work_num", this.loginForm.work_num)
        //window.localStorage.setItem("admin_token", JSON.stringify(res.ALG))
        //setToken("admin_token", JSON.stringify(res.ALG))
        //this.$router.push('/Information'); */
      });
    },
    //新增用户
    addUser() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return;
        register(this.addForm).then((res) => {
          if (res.data.ret == 0) {
            this.addDialogVisible = false;
            this.addDialogClosed();
            this.$message.success("注册成功");
          }
        });
        /*                 const{data :res } = await this.$http.post('common/register',
                    {
	"action":"add_user",
	"data":this.addForm}
                )
                if(res.ret !== 0) return this.$message.error('注册失败');
                this.$message.success('注册成功');
                this.addDialogVisible=false */
      });
    },
    /* 监听注册用户对话框关闭重置 */
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    //添加表单更改日期格式
    getAddDate(date) {
      this.addForm.work_time = date;
    },
  },
};
</script>

<style lang="less" scoped>
.login_container {
  background-color: #f4a6ba;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ff0000;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}

.el-button--primary {
  background: #a5d3e8 !important;
  border-color: #a5d3e8 !important;
}
.el-button--info {
  background: #f4e888 !important;
  border-color: #f4e888 !important;
}
.el-button--success {
  background: #9fd4b1 !important;
  border-color: #9fd4b1 !important;
}
.el-button--danger {
  background: #d98a62 !important;
  border-color: #d98a62 !important;
}

.forgot_passwd {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
