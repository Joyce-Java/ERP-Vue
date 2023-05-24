<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px;">
            <el-breadcrumb-item :to="{ path: '/absenceTracker/list' }">
                <i class="el-icon-s-promotion"></i> 出缺勤查詢
            </el-breadcrumb-item>
            <el-breadcrumb-item>出缺勤查詢</el-breadcrumb-item>
        </el-breadcrumb>

        <el-divider></el-divider>
        <div class="flex">
            <el-select id="employee-select" v-model="ruleForm.employeeId" placeholder="員工名稱">
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
        <el-table :data="tableData" stripe border style="width: 100%" :show-summary=true>
            <el-table-column prop="employeeName" align="center" label="員工姓名" width="80"></el-table-column>
            <el-table-column prop="personalLeave" align="center" label="事假" v-if="!isColumnEmpty('personalLeave')"
                             width="65"></el-table-column>
            <el-table-column prop="sickLeave" align="center" label="病假" v-if="!isColumnEmpty('sickLeave')"
                             width="65"></el-table-column>
            <el-table-column prop="menstrualLeave" align="center" label="生理假" v-if="!isColumnEmpty('menstrualLeave')"
                             width="65"></el-table-column>
            <el-table-column prop="maternityLeave" align="center" label="產假" v-if="!isColumnEmpty('maternityLeave')"
                             width="65"></el-table-column>
            <el-table-column prop="paternityLeave" align="center" label="陪產假" v-if="!isColumnEmpty('paternityLeave')"
                             width="65">  </el-table-column>
            <el-table-column prop="marriageLeave" align="center" label="婚假" v-if="!isColumnEmpty('marriageLeave')"
                             width="65"></el-table-column>
            <el-table-column prop="bereavementLeave" align="center" label="喪假" v-if="!isColumnEmpty('bereavementLeave')"
                             width="65"></el-table-column>
            <el-table-column prop="familyCareLeave" align="center" label="產檢假" v-if="!isColumnEmpty('familyCareLeave')"
                             width="65"></el-table-column>
            <el-table-column prop="paternityLeaveForChildcare" align="center" label="父親陪產假"
                             v-if="!isColumnEmpty('paternityLeaveForChildcare')" width="65"></el-table-column>
            <el-table-column prop="hospitalCareLeave" align="center" label="住院看護假"
                             v-if="!isColumnEmpty('hospitalCareLeave')" width="65"></el-table-column>
            <el-table-column prop="startTime" align="center" label="開始時間"></el-table-column>
            <el-table-column prop="endTime" align="center" label="結束時間"></el-table-column>


            <el-table-column width="110" align="center" label="操作">

                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)" size="mini"
                               circle></el-button>
                    <el-button type="danger" icon="el-icon-delete" @click="openDeleteConfirm(scope.row)" size="mini"
                               circle></el-button>
                </template>
            </el-table-column>


        </el-table>
    </div>
</template>

<script>
    export default {

        data() {
            return {
                totalPaternityLeave:'',
                month: null,
                options: [],
                tableData: [],
                ruleForm: {
                    employeeId: null,
                },
                columnTotal: {},


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
            openDeleteConfirm(absenceTracker) {
                let title = '提示';
                let message = '此操作將永久删除該筆資料，是否繼續？';
                this.$confirm(message, title, {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.handleDelete(absenceTracker);
                }).catch(() => {
                });
            },
            isColumnEmpty(columnName) {
                return this.tableData.every(row => row[columnName] === null || row[columnName] === undefined);
            },
            selectById(id) {
                console.log(this.month)
                let url = 'http://'+this.baseUrl+':8090/absenceTracker/getAllByIdAndMonth/' + this.ruleForm.employeeId + '/month?month=' + this.month
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

            loadList() {
                let url = 'http://'+this.baseUrl+':8090/absenceTracker/'
                console.log('url=' + url);

                this.axios.create({'headers':{'Authorization':localStorage.getItem('jwt') } })
                    .get(url).then((response) => {
                    let responseBody = response.data



                    if (responseBody.state == 20000) {
                        this.tableData = responseBody.data

                    } else {
                        this.$message.error(responseBody.message);
                    }
                }).catch((error) => {

                    this.$message.error(error.response.data);
                });



            }, getByMonthSelectList() {
                console.log(this.month)
                let url = 'http://'+this.baseUrl+':8090/absenceTracker/getAllById/month?month=' + this.month
                console.log('url=' + url);
                this.axios.create({'headers':{'Authorization':localStorage.getItem('jwt') } })
                    .get(url).then((response) => {
                    let responseBody = response.data
                    if (responseBody.state == 20000) {
                        this.tableData = responseBody.data
                    } else {
                        this.$message.error(responseBody.message);
                    }
                })
            },
            handleDelete(absenceTracker) {
                console.log('id=' + absenceTracker.id)
                let url = 'http://'+this.baseUrl+':8090/absenceTracker/' + absenceTracker.id + '/delete';
                this.axios.create({'headers':{'Authorization':localStorage.getItem('jwt') } })
                    .post(url).then((response) => {
                    let responseBody = response.data;
                    if (responseBody.state != 20000) {
                        this.$message.error(responseBody.message);
                    }
                    if (this.ruleForm.employeeId == null && this.month == null) {
                        this.loadList();
                    } else {
                        this.selectById(absenceTracker.employeeId);
                    }
                }).catch((error) => {
                    this.$message.error(error.response.data);
                });
            },
            handleEdit(absenceTracker) {
                console.log('overtime.id=' + absenceTracker.id)

                this.axios.create({'headers':{'Authorization':localStorage.getItem('jwt') } })
                    .get("http://"+this.baseUrl+":8090/absenceTracker/selectById/" + absenceTracker.id)
                    .then((response) => {

                        let responseBody = response.data;

                        console.log(responseBody)
                        this.$router.push({
                            name: "absenceTrackerUpdate",
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
                let url = 'http://'+this.baseUrl+':8090/absenceTracker/employees'
                console.log('url=' + url);
                this.axios.create({'headers':{'Authorization':localStorage.getItem('jwt') } })
                    .get(url).then((response) => {

                    let responseBody = response.data;
                    console.log(responseBody)
                    if (responseBody.state == 20000) {
                        this.options = responseBody.data;
                        console.log(responseBody.data)
                    }else {
                        this.$message.error(responseBody.message);
                    }




                    console.log(responseBody)

                })
            }

        }, mounted() {
            console.log('mounted ...')
            this.selectDataName()

        }, created() {

            console.log('created ...')
            // if (this.ruleForm.employeeId == null && this.month == null) {
            this.loadList();



        }
    }
</script>

<style scoped>

</style>