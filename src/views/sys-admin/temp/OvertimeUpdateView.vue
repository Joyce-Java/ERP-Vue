<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px;">
            <el-breadcrumb-item :to="{ path: '/overtime/data-new' }">
                <i class="el-icon-s-promotion"></i> 后台管理
            </el-breadcrumb-item>
            <el-breadcrumb-item>修改加班時數</el-breadcrumb-item>
        </el-breadcrumb>

        <el-divider></el-divider>

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px " class="demo-ruleForm">
            <el-form-item label="員工姓名" prop="employeeName">
            <el-input
                    placeholder="请输入内容"
                    v-model="ruleForm.employeeName"
                    :disabled="true">
            </el-input>
            </el-form-item>

            <el-form-item label="加班別" prop="employeeName">
                <el-select v-model="options.id" placeholder="请选择">
                    <el-option
                            v-for="item in options"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="平日加班時數" prop="weekdayOvertime" v-if="options.id == 'weekdayOvertime' ">
                <el-input v-model="ruleForm.weekdayOvertime"></el-input>
            </el-form-item>
            <el-form-item label="休假加班時數" prop="holidayOvertime" v-if="options.id == 'holidayOvertime' ">
                <el-input v-model="ruleForm.holidayOvertime"></el-input>
            </el-form-item>
            <el-form-item label="例假加班時數" prop="legalHolidayOvertime"  v-if="options.id == 'legalHolidayOvertime' ">
                <el-input v-model="ruleForm.legalHolidayOvertime"></el-input>
            </el-form-item>
            <el-form-item label="國定加班時數" prop="statutoryOvertime"  v-if="options.id == 'statutoryOvertime' ">
                <el-input v-model="ruleForm.statutoryOvertime"></el-input>
            </el-form-item>
            <el-form-item label="加班時間" prop="hiredate">
                <el-date-picker
                        v-model="overtimeData"
                        type="datetimerange"
                        range-separator="至"
                        :start-placeholder=this.$route.params.startTime
                        :end-placeholder=this.$route.params.endTime
                        value-format="yyyy-MM-dd HH:mm:ss"
                >
                </el-date-picker>
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
                options: [],
                input:'',
                ruleForm: {
                    employeeName: '',
                    weekdayOvertime:'',
                    holidayOvertime:'',
                    legalHolidayOvertime:'',
                    statutoryOvertime:'',
                    startTime:'',
                    endTime:''


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
                        let url = 'http://'+this.baseUrl+':8090/overtimes/update'
                        console.log(this.ruleForm.overtimeData)
                        let formData = this.qs.stringify(this.ruleForm);
                        this.axios.create({'headers':{'Authorization':localStorage.getItem('jwt') } })
                            .post(url, formData).then((response) => {
                            console.log("服務端響應的數據:")
                            console.log(response.data)
                            let responseBody = response.data;
                            if (responseBody.state == 20000) {
                                console.log("修改成功!")
                                this.$message({
                                    message: '修改成功！',
                                    type: 'success'
                                });
                                this.$router.go(-1)
                            }else {
                                this.$message.error(responseBody.message);
                            }
                        })

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },

        },
        mounted() {
            this.ruleForm= this.$route.params
            this.overtimeData[0] = this.$route.params.startTime;
            this.overtimeData[1] = this.$route.params.endTime

            const paramsWithValues = Object.keys(this.$route.params).filter(key => {
                const value = this.$route.params[key];
                return value !== null && value !== undefined && value !== '';
            });


            console.log(paramsWithValues); // ["param1", "param5", "param6"]

            const selectedAbsenceTracker = this.overtimeNameArray.find(tracker => tracker.id === paramsWithValues[2]);
            console.log(selectedAbsenceTracker)

            if (selectedAbsenceTracker) {

                this.options = [
                    {
                        id: selectedAbsenceTracker.id,
                        name: selectedAbsenceTracker.name
                    }
                ];
            } else {
                // 如果沒有找到符合 id 的物件，則顯示所有選項
                this.options = this.overtimeNameArray.map(tracker => ({
                    id: tracker.id,
                    name: tracker.name
                }));
            }

        },
        created() {

        }

    };
</script>

<style scoped>

</style>