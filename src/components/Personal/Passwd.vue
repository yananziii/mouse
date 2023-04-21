<template>
  <div>
    <h1>密码重置</h1>

    <el-card>
      <el-form
        :model="modifyForm"
        :rules="modifyFormRules"
        ref="modifyFormRef"
        label-width="100px"
      >
        <el-form-item label="姓名" prop="first_name">
          <el-input v-model="modifyForm.first_name"></el-input>
        </el-form-item>
        <el-form-item label="工号" prop="work_num">
          <el-input v-model="modifyForm.work_num"></el-input>
        </el-form-item>
        <el-form-item label="工作邮箱" prop="email">
          <el-input v-model="modifyForm.email"></el-input>
        </el-form-item>
        <el-form-item label="入职时间" prop="work_time">
          <el-input
            v-model="modifyForm.work_time"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            @change="getDate"
          ></el-input>
        </el-form-item>
        <el-form-item label="学院专业" prop="university">
          <el-input v-model="modifyForm.university"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input
            v-model="modifyForm.password"
            placeholder="由字母和数字组成的8-20位字符串！"
            type="password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password1">
          <el-input
            v-model="modifyForm.password1"
            type="password"
            show-password
            @keyup.enter.native="modify"
          ></el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 底部 -->
    <span slot="footer" class="dialog-footer">
      <div>
        <el-button type="primary" @click="modify">修改密码</el-button>
      </div>
    </span>
  </div>
</template>

<script>
import { passWd } from "@/api/api.js";
export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.modifyForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      modifyForm: {
        first_name: "",
        work_num: "",
        email: "",
        work_time: "",
        university: "",
        password: "",
        password1: "",
      },
      modifyFormRules: {
        work_num: [
          { required: true, message: "工号为必填项！", trigger: "blur" },
        ],
        first_name: [
          { required: true, message: "姓名为必填项！", trigger: "blur" },
        ],
        email: [
          { required: true, message: "邮箱为必填项！", trigger: "blur" },
          {
            pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            message: "请输入正确邮箱格式",
          },
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
  created() {},
  methods: {
    //添加表单更改日期格式
    getDate(date) {
      this.modifyForm.data_time = date;
    },
    modify() {
      //弹框是否重置密码
      const confirmResult = this.$confirm(
        "此操作将永久修改密码, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          passWd(this.modifyForm).then((res) => {
            if (res.data.ret == 0) {
              this.$message.success("密码重置成功！");
              window.localStorage.clear();
              this.$router.push("/Login");
            }
          });
        })
        .catch(() => {
          this.$message.error("修改取消");
        });
    },
  },
};
</script>

<style lang="less" scoped>
.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
</style>
