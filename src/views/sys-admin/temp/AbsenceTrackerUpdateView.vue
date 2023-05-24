<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px;">
            <el-breadcrumb-item :to="{ path: '/absenceTracker/update' }">
                <i class="el-icon-s-promotion"></i> 后台管理
            </el-breadcrumb-item>
            <el-breadcrumb-item>修改請假時數</el-breadcrumb-item>
        </el-breadcrumb>

        <el-divider></el-divider>

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px " class="demo-ruleForm">
            <el-form-item label="員工姓名" prop="employeeName">
                <el-input
                        placeholder="請輸入內容"
                        v-model="ruleForm.employeeName"
                        :disabled="true">
                </el-input>
            </el-form-item>

            <el-form-item label="請假別" prop="absenceType">
                <el-select v-model="ruleForm.absenceType" placeholder="請選擇">
                    <el-option
                            v-for="item in options"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="事假時數" prop="personalLeave" v-if="ruleForm.absenceType == 'personalLeave' ">
                <el-input v-model="ruleForm.personalLeave"></el-input>
            </el-form-item>
            <el-form-item label="病假時數" prop="sickLeave" v-if="ruleForm.absenceType == 'sickLeave' ">
                <el-input v-model="ruleForm.sickLeave"></el-input>
            </el-form-item>
            <el-form-item label="生理假時數" prop="menstrualLeave" v-if="ruleForm.absenceType == 'menstrualLeave' ">
                <el-input v-model="ruleForm.menstrualLeave"></el-input>
            </el-form-item>
            <el-form-item label="產假時數" prop="maternityLeave" v-if="ruleForm.absenceType == 'maternityLeave' ">
                <el-input v-model="ruleForm.maternityLeave"></el-input>
            </el-form-item>
            <el-form-item label="陪產假時數" prop="paternityLeave" v-if="ruleForm.absenceType == 'paternityLeave' ">
                <el-input v-model="ruleForm.paternityLeave"></el-input>
            </el-form-item>
            <el-form-item label="婚假時數" prop="marriageLeave" v-if="ruleForm.absenceType == 'marriageLeave' ">
                <el-input v-model="ruleForm.marriageLeave"></el-input>
            </el-form-item>
            <el-form-item label="喪假時數" prop="bereavementLeave" v-if="ruleForm.absenceType == 'bereavementLeave' ">
                <el-input v-model="ruleForm.bereavementLeave"></el-input>
            </el-form-item>
            <el-form-item label="侍產假時數" prop="familyCareLeave" v-if="ruleForm.absenceType == 'familyCareLeave' ">
                <el-input v-model="ruleForm.familyCareLeave"></el-input>
            </el-form-item>
            <el-form-item label="父親陪產假時數" prop="paternityLeaveForChildcare"
                          v-if="ruleForm.absenceType == 'paternityLeaveForChildcare' ">
                <el-input v-model="ruleForm.paternityLeaveForChildcare"></el-input>
            </el-form-item>
            <el-form-item label="住院看護假時數" prop="hospitalCareLeave" v-if="ruleForm.absenceType == 'hospitalCareLeave' ">
                <el-input v-model="ruleForm.hospitalCareLeave"></el-input>
            </el-form-item>

            <el-form-item label="加班時間" prop="startTime">
                <el-date-picker
                        v-model="absenceTrackerData"
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
                input: '',
                ruleForm: {
                    employeeName: '',
                    startTime: '',
                    endTime: '',
                    absenceType:'',


                },
                absenceTrackerData: [],
                rules: {
                    personalLeave: [
                        {required: true, message: '不可為空', trigger: 'blur'},
                        {pattern: /^(\d+|\d+\.\d+)$/, message: '只能输入数字或小数点', trigger: 'change'}
                    ],
                    sickLeave: [
                        {required: true, message: '不可為空', trigger: 'blur'},
                        {pattern: /^(\d+|\d+\.\d+)$/, message: '只能输入数字或小数点', trigger: 'change'}
                    ],
                    menstrualLeave: [
                        {required: true, message: '不可為空', trigger: 'blur'},
                        {pattern: /^(\d+|\d+\.\d+)$/, message: '只能输入数字或小数点', trigger: 'change'}
                    ],
                    maternityLeave: [
                        {required: true, message: '不可為空', trigger: 'blur'},
                        {pattern: /^(\d+|\d+\.\d+)$/, message: '只能输入数字或小数点', trigger: 'change'}
                    ],
                    paternityLeave: [
                        {required: true, message: '不可為空', trigger: 'blur'},
                        {pattern: /^(\d+|\d+\.\d+)$/, message: '只能输入数字或小数点', trigger: 'change'}
                    ],
                    marriageLeave: [
                        {required: true, message: '不可為空', trigger: 'blur'},
                        {pattern: /^(\d+|\d+\.\d+)$/, message: '只能输入数字或小数点', trigger: 'change'}
                    ],
                    bereavementLeave: [
                        {required: true, message: '不可為空', trigger: 'blur'},
                        {pattern: /^(\d+|\d+\.\d+)$/, message: '只能输入数字或小数点', trigger: 'change'}
                    ],
                    familyCareLeave: [
                        {required: true, message: '不可為空', trigger: 'blur'},
                        {pattern: /^(\d+|\d+\.\d+)$/, message: '只能输入数字或小数点', trigger: 'change'}
                    ],
                    generalParentalLeave: [
                        {required: true, message: '不可為空', trigger: 'blur'},
                        {pattern: /^(\d+|\d+\.\d+)$/, message: '只能输入数字或小数点', trigger: 'change'}
                    ],
                    paternityLeaveForChildcare: [
                        {required: true, message: '不可為空', trigger: 'blur'},
                        {pattern: /^(\d+|\d+\.\d+)$/, message: '只能输入数字或小数点', trigger: 'change'}
                    ],
                    hospitalCareLeave: [
                        {required: true, message: '不可為空', trigger: 'blur'},
                        {pattern: /^(\d+|\d+\.\d+)$/, message: '只能输入数字或小数点', trigger: 'change'}
                    ],
                    consolationLeave: [
                        {required: true, message: '不可為空', trigger: 'blur'},
                        {pattern: /^(\d+|\d+\.\d+)$/, message: '只能输入数字或小数点', trigger: 'change'}
                    ],
                    employeeId: [
                        {required: true, message: '不可為空', trigger: 'blur'},
                        {pattern: /^(\d+|\d+\.\d+)$/, message: '只能输入数字或小数点', trigger: 'change'}
                    ],
                    startTime: [
                        {required: true, message: '請假別不得為空', trigger: 'blur'},
                        { message: '請假別不得為空', trigger: 'change'}
                    ],
                    absenceType: [
                        {required: true, message: '請假別不得為空', trigger: 'blur'},
                        { message: '請假別不得為空', trigger: 'change'}
                    ]

                },

                absenceTrackerNameArray: [
                    {id: 'personalLeave', name: '事假'},
                    {id: 'sickLeave', name: '病假'},
                    {id: 'menstrualLeave', name: '生理假'},
                    {id: 'maternityLeave', name: '產假'},
                    {id: 'paternityLeave', name: '陪產假'},
                    {id: 'marriageLeave', name: '婚假'},
                    {id: 'bereavementLeave', name: '喪假'},
                    {id: 'familyCareLeave', name: '產檢假'},
                    {id: 'generalParentalLeave', name: '普通育嬰假'},
                    {id: 'paternityLeaveForChildcare', name: '父親陪產假'},
                    {id: 'hospitalCareLeave', name: '住院看護假'},

                ],
                absenceTrackerName:''
            }
        }, methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.ruleForm.startTime = this.absenceTrackerData[0];
                        this.ruleForm.endTime = this.absenceTrackerData[1];
                        let url = 'http://'+this.baseUrl+':8090/absenceTracker/update'

                        let formData = this.qs.stringify(this.ruleForm);
                        this.axios.create({'headers':{'Authorization':localStorage.getItem('jwt') } })
                            .post(url, formData).then((response) => {
                            let responseBody = response.data;
                            if (responseBody.state == 20000) {
                                console.log("修改成功!")
                                this.$message({
                                    message: '修改成功！',
                                    type: 'success'
                                });
                                this.$router.go(-1)
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

        },
        mounted() {
            this.ruleForm = this.$route.params
            console.log('this.$route.params=' + this.$route.params)



            console.log(  'test'+this.ruleForm.absenceTrackerData)
            const paramsWithValues = Object.keys(this.$route.params).filter(key => {
                const value = this.$route.params[key];
                return value !== null && value !== undefined && value !== '';
            });


            console.log(paramsWithValues); // ["param1", "param5", "param6"]

            const selectedAbsenceTracker = this.absenceTrackerNameArray.find(tracker => tracker.id === paramsWithValues[2]);
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
                this.options = this.absenceTrackerNameArray.map(tracker => ({
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