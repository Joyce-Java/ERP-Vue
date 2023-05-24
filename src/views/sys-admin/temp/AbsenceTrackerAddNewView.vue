<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px;">
            <el-breadcrumb-item :to="{ path: '/absenceTracker/data-new' }">
                <i class="el-icon-s-promotion"></i> 后台管理
            </el-breadcrumb-item>
            <el-breadcrumb-item>添加請假時數</el-breadcrumb-item>
        </el-breadcrumb>

        <el-divider></el-divider>

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px " class="demo-ruleForm">
            <el-form-item label="員工姓名" prop="employeeId"  >
                <el-select v-model="ruleForm.employeeId" placeholder="請選擇" >
                    <el-option
                            v-for="item in options"
                            :key="item.id"
                            :label="item.employeeName"
                            :value="item.id"
                    >
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="請假別" prop="absenceType">
                <el-select v-model="ruleForm.absenceType" placeholder="請選擇">
                    <el-option
                            v-for="item in absenceTrackerNameArray"
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
                <el-input ref="marriageLeaveInput" v-model="ruleForm.marriageLeave"></el-input>
            </el-form-item>
            <el-form-item label="喪假時數" prop="bereavementLeave"
                          v-if="ruleForm.absenceType == 'bereavementLeave' ">
                <el-input v-model="ruleForm.bereavementLeave"></el-input>
            </el-form-item>
            <el-form-item label="侍產假時數" prop="familyCareLeave"
                          v-if="ruleForm.absenceType == 'familyCareLeave' ">
                <el-input v-model="ruleForm.familyCareLeave"></el-input>
            </el-form-item>
            <el-form-item label="父親陪產假時數" prop="paternityLeaveForChildcare"
                          v-if="ruleForm.absenceType == 'paternityLeaveForChildcare' ">
                <el-input
                        v-model="ruleForm.paternityLeaveForChildcare"></el-input>
            </el-form-item>
            <el-form-item label="住院看護假時數" prop="hospitalCareLeave"
                          v-if="ruleForm.absenceType == 'hospitalCareLeave' ">
                <el-input v-model="ruleForm.hospitalCareLeave"></el-input>
            </el-form-item>

            <el-form-item label="請假時間" prop="absenceTrackerData">
                <el-date-picker
                        v-model="ruleForm.absenceTrackerData"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd HH:mm:ss"
                >
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('absenceType')">新增時數</el-button>
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
                    personalLeave: '',
                    sickLeave: '',
                    menstrualLeave: '',
                    maternityLeave: '',
                    paternityLeave: '',
                    marriageLeave: '',
                    bereavementLeave: '',
                    familyCareLeave: '',
                    generalParentalLeave: '',
                    paternityLeaveForChildcare: '',
                    hospitalCareLeave: '',
                    consolationLeave: '',
                    employeeId: null,
                    startTime: '',
                    endTime: '',
                    absenceType: '',
                    absenceTrackerData: [],
                },

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
                    absenceTrackerData: [
                        {
                            type: 'array',
                            required: true,
                            message: '請選擇請假時間',
                            trigger: 'change'
                        },
                        {
                            validator: (rule, value, callback) => {

                                    if (this.ruleForm.absenceTrackerData[0] === null || this.ruleForm.absenceTrackerData[1] === null) {
                                        callback(new Error('請選擇開始時間和結束時間'));
                                    } else {
                                        callback();
                                    }

                            },
                        }
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
                    {id: 'paternityLeaveForChildcare', name: '父親陪產假'},
                    {id: 'hospitalCareLeave', name: '住院看護假'},
                ],

            }
        },
        methods: {
            submitForm(formName) {
                this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    this.ruleForm.startTime = this.ruleForm.absenceTrackerData[0];
                    this.ruleForm.endTime = this.ruleForm.absenceTrackerData[1];
                    let url = 'http://'+this.baseUrl+':8090/absenceTracker/add-new'

                    let formData = this.qs.stringify(this.ruleForm);
                    this.axios.create({'headers': {'Authorization': localStorage.getItem('jwt')}})
                        .post(url, formData).then((response) => {
                        let responseBody = response.data;
                        if (responseBody.state == 20000) {
                            console.log("添加成功!")
                            this.$message({
                                message: '添加成功！',
                                type: 'success'
                            });

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
            }
            ,
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            employeeList() {
                let url = 'http://'+this.baseUrl+':8090/absenceTracker/employees'
                this.axios.create({'headers': {'Authorization': localStorage.getItem('jwt')}})
                    .get(url).then((response) => {
                    let responseBody = response.data;
                    this.options = responseBody.data;
                    console.log(this.options)
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