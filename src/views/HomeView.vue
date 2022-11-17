<template>
  <div class="home">
    <!--    
      <router-link class="btn" to="/OperateView"
        >点击查看平台运营数据</router-link
      >
 
    <router-link class="btn" to="/IntegralView"
      >点击查看平台积分数据</router-link
    > -->

    <!-- <OperateView /> -->
    <!-- 路由匹配到的组件将渲染在这里 -->

    <el-button type="text" @click="dialogVisible = true" class="btn"
      >点击查看平台运营数据</el-button
    >
    <el-button type="text" @click="jfdialogVisible = true" class="btn"
      >点击查看平台积分数据</el-button
    >

    <el-dialog
      title="请输入密码"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        :model="numberValidateForm"
        ref="numberValidateForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="密码"
          prop="pass"
          :rules="[
            { required: true, message: '密码不能为空' },
            { type: 'string', message: '密码必须为字母加数字' },
          ]"
        >
          <el-input
            type="pass"
            v-model.number="numberValidateForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('numberValidateForm'), (dialogVisible = false)"
            >提交</el-button
          >
          <el-button @click="resetForm('numberValidateForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      title="请输入密码"
      :visible.sync="jfdialogVisible"
      width="30%"
      :before-close="jfhandleClose"
    >
      <el-form
        :model="jfnumberValidateForm"
        ref="jfnumberValidateForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="密码"
          prop="pass"
          :rules="[
            { required: true, message: '密码不能为空' },
            { type: 'string', message: '密码必须为字母加数字' },
          ]"
        >
          <el-input
            type="pass"
            v-model.number="jfnumberValidateForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="
              jfsubmitForm('jfnumberValidateForm'), (jfdialogVisible = false)
            "
            >提交</el-button
          >
          <el-button @click="jfresetForm('jfnumberValidateForm')"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import OperateView from "@/views/OperateView.vue";
import IntegralView from "@/views/IntegralView.vue";

export default {
  name: "HomeView",
  components: {
    OperateView,
    IntegralView,
  },
  data() {
    return {
      dialogVisible: false,
      jfdialogVisible: false,
      input: "",
      numberValidateForm: {
        pass: "",
      },
      jfnumberValidateForm: {
        pass: "",
      },
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    jfhandleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        console.log(this.numberValidateForm.pass, valid);
        if (valid && this.numberValidateForm.pass == "yunying2347") {
          // this.$router.push("/OperateView");
          this.$router.push({name:"OperateView",params:{pid:'227'}});
          // alert("submit!");
        } else if (this.numberValidateForm.pass != "yunying2347") {
          alert("error submit!!");
          return false;
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    jfsubmitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid && this.jfnumberValidateForm.pass == "jifen2347") {
       
           this.$router.push({name:"IntegralView",params:{pid:'236'}});
          // alert("submit!");
        } else if (this.jfnumberValidateForm.pass != "jifen2347") {
          alert("error submit!!");
          return false;
        } else {
          return false;
        }
      });
    },
    jfresetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style scoped>
.home {
  margin-top: 20px;
}
.btn {
  width: 220px;
  height: 40px;
  border: 1px solid rgb(54, 102, 215);
  font-size: 20px;
  color: #fff;
  text-decoration: none;
  padding: 5px 5px;
  margin: 20px;
}
</style>
