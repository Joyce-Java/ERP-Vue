<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px;">
            <el-breadcrumb-item :to="{ path: '/overtime/data-new' }">
                <i class="el-icon-s-promotion"></i> 加班時數
            </el-breadcrumb-item>
            <el-breadcrumb-item>添加加班時數</el-breadcrumb-item>
        </el-breadcrumb>

        <el-divider></el-divider>

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px " class="demo-ruleForm">
            <el-form-item label="員工姓名" prop="employeeName">
                <el-select v-model="ruleForm.employeeId" placeholder="请选择">
                    <el-option
                            v-for="item in options"
                            :key="item.id"
                            :label="item.employeeName"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="加班別" prop="employeeName">
                <el-select v-model="overtimeNameArray.name" placeholder="请选择">
                    <el-option
                            v-for="item in overtimeNameArray"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="平日加班時數" prop="weekdayOvertime" v-if="overtimeNameArray.name == 'weekdayOvertime' ">
                <el-input v-model="ruleForm.weekdayOvertime"></el-input>
            </el-form-item>
            <el-form-item label="休假加班時數" prop="holidayOvertime" v-if="overtimeNameArray.name == 'holidayOvertime' ">
                <el-input v-model="ruleForm.holidayOvertime"></el-input>
            </el-form-item>
            <el-form-item label="例假加班時數" prop="legalHolidayOvertime"  v-if="overtimeNameArray.name == 'legalHolidayOvertime' ">
                <el-input v-model="ruleForm.legalHolidayOvertime"></el-input>
            </el-form-item>
            <el-form-item label="國定加班時數" prop="statutoryOvertime"  v-if="overtimeNameArray.name == 'statutoryOvertime' ">
                <el-input v-model="ruleForm.statutoryOvertime"></el-input>
            </el-form-item>
            <el-form-item label="加班時間" prop="hiredate">
                <el-date-picker
                        v-model="overtimeData"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd HH:mm:ss"
                >
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">新增時數</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                options: [],
                ruleForm: {
                    weekdayOvertime: '',
                    holidayOvertime: '',
                    legalHolidayOvertime: '',
                    statutoryOvertime: '',
                    employeeId: '',
                    startTime: '',
                    endTime: ''

                },
                overtimeData: [],
                rules: {},
                overtimeNameArray: [
                    { id: 'weekdayOvertime', name: '平日加班' },
                    { id: 'holidayOvertime', name: '休假加班' },
                    { id: 'legalHolidayOvertime', name: '例假加班' },
                    { id: 'statutoryOvertime', name: '國定加班' },
                ],
            }
        }, methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.ruleForm.startTime = this.overtimeData[0];
                        this.ruleForm.endTime =  this.overtimeData[1] ;
                        let url = 'http://'+this.baseUrl+':8090/overtimes/add-new'
                        console.log(this.ruleForm.overtimeData)
                        let formData = this.qs.stringify(this.ruleForm);
                        this.axios.create({'headers':{'Authorization':localStorage.getItem('jwt') } })
                            .post(url, formData).then((response) => {
                            console.log("服務端響應的數據:")
                            console.log(response.data)
                            let responseBody = response.data;
                            if (responseBody.state == 20000) {
                                console.log("添加成功!")
                                this.$message({
                                    message: '添加成功！',
                                    type: 'success'
                                });
                                this.resetForm(formName);
                            }else {
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
            employeeList() {
                let url = 'http://'+this.baseUrl+':8090/employees'
                this.axios.create({'headers':{'Authorization':localStorage.getItem('jwt') } })
                    .get(url).then((response) => {
                    console.log(response.data)
                    let responseBody = response.data;
                    this.options = responseBody.data;
                }).catch((error) => {
                    this.$message.error(error.response.data);
                });
            }


        },
        mounted() {
            this.employeeList();
        },
        created() {

        }

    };
</script>

<style scoped>

</style>