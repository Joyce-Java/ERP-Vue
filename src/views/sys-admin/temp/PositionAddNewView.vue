<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px;">
            <el-breadcrumb-item :to="{ path: '/staff/Position-new' }">
                <i class="el-icon-s-promotion"></i> 后台管理
            </el-breadcrumb-item>
            <el-breadcrumb-item>職務管理</el-breadcrumb-item>
        </el-breadcrumb>

        <el-divider></el-divider>

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
            <el-form-item label="職位名稱" prop="name">
                <el-input v-model="ruleForm.name" placeholder="請輸入職位名稱"></el-input>
            </el-form-item>
            <el-form-item label="職務簡介" prop="dept">
                <el-input v-model="ruleForm.deptName" placeholder="請輸入職務簡介"></el-input>
            </el-form-item>
            <el-form-item label="所屬部門" prop="principal">
                    <el-select v-model="ruleForm.roleIds"  placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.id"
                                :label="item.deptName"
                                :value="item.id">
                        </el-option>
                    </el-select>
            </el-form-item>
            <el-form-item label="備註" prop="remarks">
                <el-input v-model="ruleForm.remarks" placeholder="請輸入相關備註"></el-input>
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
                options:[],
                ruleForm: {
                    name: '',
                    deptName: '',
                    principal: '',
                    remarks: '',
                    roleIds:''
                },
                rules: {
                    name: [
                        {required: true, message: '请输入部門名称', trigger: 'blur'},
                        {min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur'}
                    ],
                    dept: [
                        {required: true, message: '请输入部門簡介', trigger: 'blur'},
                        {min: 4, max: 25, message: '长度在 4 到 25 个字符', trigger: 'blur'}
                    ],
                    principal: [
                        {required: true, message: '请输入負責人名稱', trigger: 'blur'},
                        {min: 2, max: 30, message: '长度在 2 到 5 个字符', trigger: 'blur'}
                    ],
                    remarks: [
                        {required: true, message: '请输入部門相關備註', trigger: 'blur'},
                        {min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {

                    } else {
                        alert('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            loadDeptList(){
                let url = 'http://'+this.baseUrl+':8090/depts';
                console.log(url);
                this.axios.create({'headers':{'Authorization':localStorage.getItem('jwt') } })
                    .get(url).then((response)=>{
                    console.log(response.data)
                    let responseBody= response.data;
                    this.options = responseBody.data;
                })
            }
        },
        mounted() {
            this.loadDeptList();
        },
        created() {

        }

    }
</script>

<style scoped>

</style>