<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px;">
            <el-breadcrumb-item :to="{ path: '/employees/data-new' }">
                <i class="el-icon-s-promotion"></i> 后台管理
            </el-breadcrumb-item>
            <el-breadcrumb-item>添加員工</el-breadcrumb-item>
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
            <el-form-item label="聯繫電話" prop="phoneNumber">
                <el-input v-model="ruleForm.phoneNumber"></el-input>
            </el-form-item>
            <el-form-item label="學歷" prop="educationBackground">
                <el-input v-model="ruleForm.educationBackground"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">新增員工</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return { options: [],
                Dept: '',
                value1: '',
                boy: '男',
                girl: '女',
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                ruleForm: {
                    employeeName: '',
                    dept: '',
                    gender: '預設',
                    address: '火星球火星路火星街50弄25號',
                    salary: '35000',
                    idNumber: 'A123456789',
                    birthday: '',
                    phoneNumber: '09123456789',
                    educationBackground: '大學畢',
                    bankNumber: '987654321',
                    hiredate:'',
                    heaDeptId:''

                },
                rules: {
                    employeeName: [
                        {required: true, mesrusage: '请输入員工姓名', trigger: 'blur'},
                        {min: 2, max: 5, message: '長度在 2 到 5 個字', trigger: 'blur'}
                    ],
                    address: [
                        {required: true, message: '請輸入戶籍地址', trigger: 'blur'},
                        {min: 5, max: 30, message: '長度在 5 到 30 個字', trigger: 'blur'}
                    ],
                    salary: [
                        {required: true, message: '請輸入員工薪資', trigger: 'blur'},
                        {min: 2, max: 6, message: '長度在 5 到 6 個字', trigger: 'blur'}
                    ],
                    idNumber: [
                        {required: true, message: '請輸入身份證字號', trigger: 'blur'},
                        {min: 8, max: 10, message: '不符合身分證規範', trigger: 'blur'}
                    ],
                    dept: [
                        {required: false, message: '請輸入部門', trigger: 'blur'},
                        {min: 1, max: 2, message: '最多 2 個字', trigger: 'blur'}
                    ],
                    birthday: [
                        {required: true, message: '不可為空', trigger: 'blur'},
                        {min: 5, max: 30, message: '不可為空', trigger: 'blur'}
                    ],
                    phoneNumber: [
                        {required: true, message: '請輸入聯繫電話', trigger: 'blur'},
                        {min: 5, max: 30, message: '長度在 5 到 10 個字', trigger: 'blur'}
                    ],
                    bankNumber: [
                        {required: true, message: '請輸入銀行帳號', trigger: 'blur'},
                        {min: 5, max: 35, message: '不可為空', trigger: 'blur'}
                    ],
                    educationBackground: [
                        {required: true, message: '請輸入最高學歷', trigger: 'blur'},
                        {min: 1, max: 35, message: '不可為空', trigger: 'blur'}
                    ],
                    gender: [
                        {required: true, message: '請輸入最高學歷', trigger: 'blur'},
                        {min: 1, max: 35, message: '不可為空', trigger: 'blur'}
                    ],
                },
            }
        }, methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let url = 'http://'+this.baseUrl+':8090/employees/add-new'

                        console.log(this.ruleForm.birthday)
                        let formData = this.qs.stringify(this.ruleForm);

                        console.log("ruleForm:" + formData);
                        this.axios.create({'headers':{'Authorization':localStorage.getItem('jwt') } })
                            .post(url, formData).then((response) => {
                            console.log("服務端響應的數據:")
                            console.log(response.data)
                            let responseBody = response.data;
                            if (responseBody.state == 20000) {
                                console.log("添加員工資料成功!")
                                this.$message({
                                    message: '添加員工資料成功！',
                                    type: 'success'
                                });
                                    console.log(responseBody.heaDeptId)
                                this.resetForm(formName);
                            } else if (this.ruleForm.gender == '默認') {
                                this.$message.error("請選擇性別");
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
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            handleCommand(command) {

                if (command == 'b') {
                    this.ruleForm.gender = '男'
                    console.log(this.ruleForm.gender)
                } else if (command == 'g') {
                    this.ruleForm.gender = '女'
                }
            }
            ,
            DeptList(){
                let url = 'http://'+this.baseUrl+':8090/employees/dept'
                console.log(url)
                this.axios.create({'headers':{'Authorization':localStorage.getItem('jwt') } })
                    .get(url).then((response)=>{
                    console.log("部門列表:" + response.data);
                    let responseBody = response.data;
                    if (responseBody.state == 20000){
                        console.log("處理部門列表")
                        this.options = responseBody.data;
                    }

                }).catch((error) => {

                    this.$message.error(error.response.data);
                });


            }
        },
        mounted() {
            this.DeptList();
        },
        created() {

        }

    };
</script>

<style scoped>

</style>