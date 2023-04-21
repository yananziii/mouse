<template>
  <div class="notFound">
      <el-row class="not-des">
        <el-col>
      同学，页面不见了
    </el-col>
      </el-row>
    <el-row class="not-des">
      <el-col>
      点击<router-link to="/">这里</router-link>进入首页
    </el-col>
      </el-row>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "NotFound",
  components: { router },
};
</script>

<style lang="less" scoped>
.notFound {
  height: 100%;
  background-image: url("../assets/404pic.jpeg");
  background-position: center center, center center;
  background-repeat: no-repeat;
}
.not-des{
  padding-left: 45%;
  display: flex;
  justify-content: center;
}

</style>
