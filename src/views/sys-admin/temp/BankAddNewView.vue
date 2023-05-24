<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px;">
            <el-breadcrumb-item :to="{ path: '/bank/data-new' }">
                <i class="el-icon-s-promotion"></i> 后台管理
            </el-breadcrumb-item>
            <el-breadcrumb-item>添加銀行帳號</el-breadcrumb-item>
        </el-breadcrumb>

        <el-divider></el-divider>

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px " class="demo-ruleForm">
            <el-form-item label="員工姓名" prop="employeeName">
              <el-select v-model="ruleForm.employeeId" filterable placeholder="请选择">
                <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.employeeName"
                    :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>

          <template>
            <el-form-item label="銀行代號" prop="employeeName">
            <el-select v-model="ruleForm.codeName" filterable placeholder="请选择">
              <el-option
                  v-for="item in codeNumber"
                  :key="item.id"
                  :label="item.label"
                  :value="item.codeName">
              </el-option>
            </el-select>
            </el-form-item>
          </template>


            <el-form-item label="銀行帳號" prop="address">
                <el-input v-model="ruleForm.bankNumber"></el-input>
            </el-form-item>


            <el-form-item label="薪資" prop="phoneNumber">
                <el-input v-model="ruleForm.salary"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">新增員工</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        data() {
            return {
              options: [],
              codeNumber:[],
              ruleForm:{
                  codeName:'',
                  bankNumber:'',
                  employeeId:'',
                salary:''
              },
              rules:{

              }
            }
        }, methods: {
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        loadCodeNumber(){
          let url='http://'+this.baseUrl+':8090/codeNumbers'
          this.axios.create({'headers':{'Authorization':localStorage.getItem('jwt') } })
              .get(url).then((response)=>{

            let responseBody = response.data;
            this.codeNumber=responseBody.data;
          }).catch((error) => {

              this.$message.error(error.response.data);
          });
        }, loadEmployeeName(){

          let url = 'http://'+this.baseUrl+':8090/employees'

          this.axios.create({'headers':{'Authorization':localStorage.getItem('jwt') } })
              .get(url).then((response) => {
            let responseBody = response.data;

            this.options = responseBody.data;
          }).catch((error) => {

              this.$message.error(error.response.data);
          });
        },


        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              let url = 'http://'+this.baseUrl+':8090/banks/add-new'

              let formData = this.qs.stringify(this.ruleForm);

              this.axios.create({'headers':{'Authorization':localStorage.getItem('jwt') } })
                  .post(url, formData).then((response) => {

                let responseBody = response.data;
                if (responseBody.state == 20000) {
                  this.$message({
                    message: '添加員工帳戶成功！',
                    type: 'success'

                  });

                  this.resetForm(formName);
                } else {
                  this.$message.error(responseBody.message);
                }
              }).catch((error) => {

                  this.$message.error(error.response.data);
              });
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },


        },
        mounted() {
          this.loadCodeNumber();
          this.loadEmployeeName();
        },
        created() {

        }

    };
</script>

<style scoped>

</style>