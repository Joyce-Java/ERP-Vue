<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px;">
            <el-breadcrumb-item :to="{ path: '/staff/dept-new' }">
                <i class="el-icon-s-promotion"></i> 后台管理
            </el-breadcrumb-item>
            <el-breadcrumb-item>部門管理</el-breadcrumb-item>
        </el-breadcrumb>

        <el-divider></el-divider>

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
            <el-form-item label="部門名稱" prop="name">
                <el-input v-model="ruleForm.deptName" placeholder="請輸入部門名稱"></el-input>
            </el-form-item>
            <el-form-item label="部門簡介" prop="briefIntroduction">
                <el-input v-model="ruleForm.deptPresentation" placeholder="請輸入部門簡介"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                ruleForm: {
                    deptName: '',
                    deptPresentation: ''
                 ,
                },
                rules: {
                    deptName: [
                        {required: true, message: '请输入部門名称', trigger: 'blur'},
                        {min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur'}
                    ],
                    deptPresentation: [
                        {required: true, message: '请输入部門簡介', trigger: 'blur'},
                        {min: 4, max: 25, message: '长度在 4 到 25 个字符', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {

                        this.$refs[formName].validate((valid) => {
                            if (valid) {
                                let url = 'http://'+this.baseUrl+':8090/depts/add-new'
                                let formData = this.qs.stringify(this.ruleForm);
                                console.log("ruleForm:" + formData);
                                this.axios.create({'headers':{'Authorization':localStorage.getItem('jwt') } })
                                    .post(url, formData).then((response) => {
                                    console.log("服務端響應的數據:")
                                    console.log(response.data)
                                    let responseBody = response.data;
                                    if (responseBody.state == 20000) {
                                        console.log("添加部門資料成功!")
                                        this.$message({
                                            message: '添加部門資料成功！',
                                            type: 'success'
                                        });
                                        this.resetForm(formName);
                                    }
                                }).catch((error) => {
                                    this.$message.error(error.response.data);
                                });
                                    }
                                })


                            } else {
                        alert('error submit!!');
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

<style scoped>

</style>