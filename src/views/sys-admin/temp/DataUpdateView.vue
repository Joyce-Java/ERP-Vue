<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px;">
            <el-breadcrumb-item :to="{ path: '/employees/update' }">
                <i class="el-icon-s-promotion"></i> 后台管理
            </el-breadcrumb-item>
            <el-breadcrumb-item>修改內容</el-breadcrumb-item>
        </el-breadcrumb>

        <el-divider></el-divider>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px " class="demo-ruleForm">

            <el-form-item label="員工姓名" prop="employeeName">
                <el-input v-model="ruleForm.employeeName"></el-input>
            </el-form-item>

            <el-form-item label="部門" prop="dept">
                <el-select v-model="ruleForm.heaDeptId" placeholder="請選擇">
                    <el-option
                            v-for="item in options"
                            :key="item.id"
                            :label="item.deptName"
                            :value="item.id"
                    >
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="性別" prop="gender">
                <el-dropdown size="small" split-button v-model="ruleForm.gender" type="primary"
                             @command="handleCommand">
                    {{ruleForm.gender}}
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="b">{{boy}}</el-dropdown-item>
                        <el-dropdown-item command="g">{{girl}}</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-form-item>

            <el-form-item label="地址" prop="address">
                <el-input v-model="ruleForm.address"></el-input>
            </el-form-item>
            <el-form-item label="身分證字號" prop="idNumber">
                <el-input v-model="ruleForm.idNumber"></el-input>
            </el-form-item>
            <el-form-item label="生日" prop="birthday">
                <div class="block">
                    <el-date-picker
                            v-model="ruleForm.birthday"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="選擇日期">
                    </el-date-picker>
                </div>
            </el-form-item>

            <el-form-item label="入職時間" prop="hiredate">
                <div class="block">
                    <el-date-picker
                            v-model="ruleForm.hiredate"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="選擇日期">
                    </el-date-picker>
                </div>
            </el-form-item>
            <el-form-item label="離職時間" prop="quitdate">
                <div class="block">
                    <el-date-picker
                            v-model="ruleForm.quitdate"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="選擇日期">
                    </el-date-picker>
                </div>
            </el-form-item>
            <el-form-item label="聯繫電話" prop="phoneNumber">
                <el-input v-model="ruleForm.phoneNumber"></el-input>
            </el-form-item>
            <el-form-item label="學歷" prop="educationBackground">
                <el-input v-model="ruleForm.educationBackground"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">確認修改</el-button>
            </el-form-item>

        </el-form>
    </div>
</template>

<script>
    export default {

        data() {
            return {
                boy: '男',
                girl: '女',
                options: [],
                ruleForm: {
                    employeeName: '',
                    deptName: '',
                    gender: '預設',
                    address: '',
                    salary: '',
                    idNumber: '',
                    birthday: '',
                    phoneNumber: '',
                    educationBackground: '',
                    bankNumber: '',
                    hiredate:'',
                    quitdate:'',
                    heaDeptId:''

                },
                rules: {},

            }

        },methods: {
            submitForm(ruleForm){

                console.log(this.ruleForm.heaDeptId)
                let url = 'http://'+this.baseUrl+':8090/employees/update'
                let formData = this.qs.stringify(this.ruleForm);
                console.log("ruleForm:" + formData);
                this.axios.create({'headers':{'Authorization':localStorage.getItem('jwt') } })
                    .post(url,formData).then((response) => {
                    console.log("服務端響應的數據:")
                    console.log(response.data)
                    let responseBody = response.data;
                    if (responseBody.state == 20000) {
                        console.log("修改員工資料成功!")
                        this.$message({
                            message: '修改員工資料成功！',
                            type: 'success'
                        });
                        // console.log(responseBody.heaDeptId)
                        // this.resetForm(formName);
                    }

                })

            },
            DeptList() {
                let url = 'http://'+this.baseUrl+':8090/depts'
                console.log(url)
                this.axios.create({'headers':{'Authorization':localStorage.getItem('jwt') } })
                    .get(url).then((response) => {
                    console.log("部門列表:" + response.data);
                    let responseBody = response.data;
                    if (responseBody.state == 20000) {
                        console.log("處理部門列表")
                        this.options = responseBody.data;

                        this.ruleForm= this.$route.params
                    }
                })
            },
            handleCommand(command) {
                if (command == 'b') {
                    this.ruleForm.gender = '男'
                } else if (command == 'g') {
                    this.ruleForm.gender = '女'
                }
            }


        }, mounted() {
            console.log('mounted ...')
            this.DeptList();

        }, created() {
            console.log('created ...')

        }
    }
</script>

<style scoped>

</style>