<template>
    <div class="login-page">
            <div style="width: 600px; background: #fff; margin: 50px auto; padding: 30px 60px;">
                <h1 style="text-align: center; margin: 20px 0;">管理员登录</h1>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="ruleForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密碼" prop="password">
                        <el-input v-model="ruleForm.password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">登入</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                ruleForm: {
                    username: 'root',
                    password: '123456'
                },
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 4, max: 15, message: '长度在 4 到 15 个字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 4, max: 15, message: '长度在 4 到 15 个字符', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {

                        let url = 'http://'+this.baseUrl+':8092/admins/login';
                        // console.log('url = ' + url);
                        // console.log('请求参数：' + this.ruleForm);
                        // console.log(this.ruleForm);
                        let formData = this.qs.stringify(this.ruleForm);

                        this.axios.post(url, formData).then((response) => {
                            let responseBody = response.data;
                            if (responseBody.state == 20000) {
                                // console.log('登录成功！');
                                this.$message({
                                    message: '登入成功！',
                                    type: 'success'
                                });

                                //獲取服務器端響應的JWT，並存儲到LocalStorage
                                let jwt = responseBody.data;

                                //本地存儲
                                localStorage.setItem('jwt', jwt);
                                this.$router.push('/AccountInfo')

                            } else {
                                console.log(response)
                                // console.log('登录失败，密码错误！');
                                this.$message.error('登入失敗,帳號或密碼錯誤');
                            }
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style>
    /*body {*/
    /*    background: #12487d;*/
    /*}*/
    .login-page {

        background-color: #12487d;
        height: 100vh;
        width: 100vw;
        position: fixed;
        top: 0;
        left: 0;
        z-index: -1;
    }


</style>