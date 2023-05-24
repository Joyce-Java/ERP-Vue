<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px;">
            <el-breadcrumb-item :to="{ path: '/overtime/list' }">
                <i class="el-icon-s-promotion"></i> 加班查詢
            </el-breadcrumb-item>
            <el-breadcrumb-item>加班查詢</el-breadcrumb-item>
        </el-breadcrumb>

        <el-divider></el-divider>
        <div class="flex">
            <el-select id="employee-select" v-model="ruleForm.employeeId"  placeholder="員工名稱">
                <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item.employeeName"
                        :value="item.id">
                </el-option>
            </el-select>
            <div class="block">
                <span class="demonstration"></span>
                <el-date-picker
                        v-model="month" type="month"
                        value-format="yyyy-MM"
                        placeholder="選擇月份"></el-date-picker>
            </div>
        </div>
        <el-divider content-position="right">加班列表</el-divider>
        <el-table :data="tableData" stripe border style="width: 100%" :show-summary=true >
            <el-table-column prop="employeeName" align="center" label="員工姓名" width="100"></el-table-column>
            <el-table-column prop="weekdayOvertime"  v-if="!isColumnEmpty('weekdayOvertime')"  align="center" label="平日加班" width="100"></el-table-column>
            <el-table-column prop="holidayOvertime" v-if="!isColumnEmpty('holidayOvertime')" align="center" label="休假加班" width="100"></el-table-column>
            <el-table-column prop="legalHolidayOvertime" v-if="!isColumnEmpty('legalHolidayOvertime')"  align="center" label="例假加班" width="100"></el-table-column>
            <el-table-column prop="statutoryOvertime"  v-if="!isColumnEmpty('statutoryOvertime')"  align="center" label="國定加班" width="100"></el-table-column>
            <el-table-column prop="compTime"  v-if="!isColumnEmpty('compTime')"   align="center" label="補休時數" width="100"></el-table-column>
            <el-table-column prop="startTime" align="center" label="開始時間"></el-table-column>
            <el-table-column prop="endTime" align="center" label="結束時間"></el-table-column>
            <el-table-column width="100" align="center" label="補休操作">
                <template  slot-scope="scope">
                <el-button type="text" @click="handleAddCompensation(scope.row)">補休</el-button>
                </template>
            </el-table-column>

            <el-table-column width="100" align="center" label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)" size="mini"
                               circle></el-button>
                    <el-button type="danger" icon="el-icon-delete" @click="openDeleteConfirm(scope.row)" size="mini"
                               circle></el-button>
                </template>
            </el-table-column>

        </el-table>

        <el-drawer
                title="﹝補休時數登記﹞"

                :visible.sync="dialog"
                direction="ltr"
                custom-class="demo-drawer"
                ref="drawer"
        >
            <div class="demo-drawer__content">
                <el-form :model="form">
                    <el-form-item label="員工名稱" :label-width="formLabelWidth">
                        <el-input :disabled="true"  v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="加班類型" :label-width="formLabelWidth">
                        <el-input :disabled="true"  v-model="form.overTimeType" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="加班時數" :label-width="formLabelWidth">
                        <el-input :disabled="true"  v-model="form.overTime" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="補休時數" :label-width="formLabelWidth">
                        <el-input v-model="form.compTime" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div class="demo-drawer__footer">
                    <el-button @click="cancelForm">取 消</el-button>
                    <el-button type="primary" @click="handleClick()" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
                </div>
            </div>
        </el-drawer>

    </div>
</template>

<script>
    export default {

        data() {
            return {
                month: null,
                options: [],
                tableData: [],
                ruleForm: {
                    employeeId: null,
                },
                dialogFormVisible: false,
                form: {
                    id:'',
                    name: '',
                    weekdayOvertime:'',
                    holidayOvertime:'',
                    legalHolidayOvertime:'',
                    statutoryOvertime:'',

                    overTimeType:'',
                    overTime:'',
                    compTime:''
                },
                formLabelWidth: '70px',
                timer: null,
                loading: false,
                dialog: false,

            }
        }, watch: {
            'ruleForm.employeeId': function (newValue) {

                this.selectById(newValue)

            },
            month(newValue) {
                // TODO: 处理 month 变化后的逻辑
                if (this.ruleForm.employeeId != null) {
                    //如果選了員工名稱在選月份則調用底下功能
                    this.selectById()
                } else {
                    //否則調用根據月份查出所有員工的加班明細
                    this.getByMonthSelectList();
                }
            }
        }
        , methods: {
            handleClick() {
                // 調用 $refs.drawer.closeDrawer() 方法
                this.$refs.drawer.closeDrawer();

                // 調用您想要觸發的其他方法
                this.handleEditCompTime();
            },
            handleAddCompensation(row) {
                console.log(row)
                if (typeof row.weekdayOvertime !== 'undefined' && row.weekdayOvertime !== null && row.weekdayOvertime !== '') {
                    this.form.overTimeType = '平日加班'
                    this.form.overTime = row.weekdayOvertime;
                    this.form.weekdayOvertime = row.weekdayOvertime;
                } else if (typeof row.holidayOvertime !== 'undefined' && row.holidayOvertime !== null && row.holidayOvertime !== '') {
                    this.form.overTimeType = '休假加班'
                    this.form.overTime = row.holidayOvertime;
                    this.form.holidayOvertime = row.holidayOvertime;
                } else if (typeof row.legalHolidayOvertime !== 'undefined' && row.legalHolidayOvertime !== null && row.legalHolidayOvertime !== '') {
                    this.form.overTimeType = '例假加班'
                    this.form.overTime = row.legalHolidayOvertime;
                    this.form.legalHolidayOvertime = row.legalHolidayOvertime;
                } else if (typeof row.statutoryOvertime !== 'undefined' && row.statutoryOvertime !== null && row.statutoryOvertime !== '') {
                    this.form.overTimeType = '國定加班'
                    this.form.overTime = row.statutoryOvertime;
                    this.form.statutoryOvertime = row.statutoryOvertime;
                }

                // 将所点击行的数据赋值给表单对象form
                this.form.name = row.employeeName;
                this.form.id = row.id;
                console.log(this.form.id )
                this.form.compensationHours = '';


                // 打开drawer
                this.dialog = true;
            },
            handleEditCompTime(overtime) {

                if (typeof this.form.weekdayOvertime !== 'undefined' && this.form.weekdayOvertime !== null && this.form.weekdayOvertime !== '' && this.form.compTime > this.form.weekdayOvertime) {
                    this.$message.error("補休時數不可超過加班時數");
                } else if (typeof this.form.holidayOvertime !== 'undefined' && this.form.holidayOvertime !== null && this.form.holidayOvertime !== ''  && this.form.compTime > this.form.holidayOvertime) {
                    this.$message.error("補休時數不可超過加班時數");
                } else if (typeof this.form.legalHolidayOvertime !== 'undefined' && this.form.legalHolidayOvertime !== null && this.form.legalHolidayOvertime !== ''  && this.form.compTime > this.form.legalHolidayOvertime) {
                    this.$message.error("補休時數不可超過加班時數");
                } else if (typeof this.form.statutoryOvertime !== 'undefined' && this.form.statutoryOvertime !== null && this.form.statutoryOvertime !== ''  && this.form.compTime > this.form.statutoryOvertime) {
                    this.$message.error("補休時數不可超過加班時數");
                }else {
                    let url = 'http://'+this.baseUrl+':8090/overtimes/update'

                    let formData = this.qs.stringify(this.form);
                    this.axios.create({'headers': {'Authorization': localStorage.getItem('jwt')}})
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
                            this.form.compTime='';
                            this.loadList();
                        } else {
                            this.$message.error(responseBody.message);
                        }
                    })
                }





            },
            cancelForm() {
                this.loading = false;
                this.dialog = false;
                clearTimeout(this.timer);
            },
            isColumnEmpty(columnName) {
                return this.tableData.every(row => row[columnName] === null || row[columnName] === undefined);
            },
            selectById(id) {
                console.log(this.month)
                let url = 'http://'+this.baseUrl+':8090/overtimes/getAllByIdAndMonth/' + this.ruleForm.employeeId + '/month?month=' + this.month
                console.log('url=' + url);
                this.axios.create({'headers':{'Authorization':localStorage.getItem('jwt') } })
                    .get(url).then((response) => {
                    let responseBody = response.data
                    if (responseBody.state == 20000) {
                        this.tableData = responseBody.data
                        console.log(responseBody.data)
                    } else {
                        this.$message.error(responseBody.message);


                    }
                })

            },
            openDeleteConfirm(overtime) {
                let title = '提示';
                let message = '此操作將永久删除該筆資料，是否繼續？';
                this.$confirm(message, title, {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.handleDelete(overtime);
                }).catch(() => {
                });
            },

            loadList() {
                let url = 'http://'+this.baseUrl+':8090/overtimes/'
                console.log('url=' + url);
                this.axios.create({'headers':{'Authorization':localStorage.getItem('jwt') } })
                    .get(url).then((response) => {
                    let responseBody = response.data
                    if (responseBody.state == 20000) {
                        this.tableData = responseBody.data
                        console.log(responseBody.data)
                    } else {
                        this.$message.error(responseBody.message);


                    }
                })
            }, getByMonthSelectList() {
                console.log(this.month)
                let url = 'http://'+this.baseUrl+':8090/overtimes/getAllById/month?month=' + this.month
                console.log('url=' + url);
                this.axios.create({'headers':{'Authorization':localStorage.getItem('jwt') } })
                    .get(url).then((response) => {
                    let responseBody = response.data
                    if (responseBody.state == 20000) {
                        this.tableData = responseBody.data
                        console.log(responseBody.data)
                    } else {
                        this.$message.error(responseBody.message);


                    }
                })
            },
            handleDelete(overtime) {
                console.log('id=' + overtime.id)
                let url = 'http://'+this.baseUrl+':8090/overtimes/' + overtime.id + '/delete';
                this.axios.create({'headers':{'Authorization':localStorage.getItem('jwt') } })
                    .post(url).then((response) => {
                    let responseBody = response.data;
                    if (responseBody.state != 20000) {
                        this.$message.error(responseBody.message);
                    }
                    if (this.ruleForm.employeeId == null && this.month == null){
                        this.loadList();
                    }else {
                    this.selectById(overtime.employeeId);
                    }
                })
            },
            handleEdit(overtime) {
                console.log('overtime.id=' + overtime.id)

                this.axios.create({'headers':{'Authorization':localStorage.getItem('jwt') } })
                    .get("http://"+this.baseUrl+":8090/overtimes/selectById/" + overtime.id)
                    .then((response) => {

                        let responseBody = response.data;

                        console.log(responseBody)
                        this.$router.push({
                            name: "overtimeUpdate",
                            params: {
                                ...responseBody.data
                            },
                        });
                    }).catch((error) => {
                    this.$message.error(error.response.data);
                });
            },

            selectDataName() {

                console.log('loadAlbumList ...')
                let url = 'http://'+this.baseUrl+':8090/overtimes/employees'
                console.log('url=' + url);
                this.axios.create({'headers':{'Authorization':localStorage.getItem('jwt') } })
                    .get(url).then((response) => {
                    let responseBody = response.data;
                    console.log(responseBody)
                    this.options = responseBody.data;
                }).catch((error) => {
                    this.$message.error(error.response.data);
                });
            }
        }, mounted() {
            console.log('mounted ...')
            this.selectDataName()

        }, created() {
            console.log('created ...')
            if (this.ruleForm.employeeId == null && this.month == null) {
                this.loadList();
            }
        }
    }
</script>

<style scoped>

</style>