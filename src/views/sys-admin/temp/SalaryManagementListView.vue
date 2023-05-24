<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px;">
            <el-breadcrumb-item :to="{ path: '/salaryManagement/list' }">
                <i class="el-icon-s-promotion"></i> 薪資查詢
            </el-breadcrumb-item>
            <el-breadcrumb-item>薪資查詢</el-breadcrumb-item>
        </el-breadcrumb>

        <el-divider></el-divider>
        <div class="flex">
            <el-button type="primary" @click="handleCalculate()" round>確認計算</el-button>
            <div class="block">
                <span class="demonstration"></span>
                <el-date-picker
                        v-model="month" type="month"
                        value-format="yyyy-MM"
                        placeholder="選擇月份"></el-date-picker>
            </div>
        </div>
        <el-divider content-position="right">薪資列表</el-divider>
        <el-table :data="tableData" stripe border style="width: 100%" class="custom-table">
            <el-table-column prop="employeeName" align="center" label="員工姓名" width="100"></el-table-column>
            <el-table-column prop="laborInsurance" v-if="!isColumnEmpty('laborInsurance')" align="center" label="勞保金額"
                             width="100"></el-table-column>
            <el-table-column prop="nationalHealthInsurance" v-if="!isColumnEmpty('nationalHealthInsurance')"
                             align="center" label="健保金額" width="100"></el-table-column>
            <el-table-column prop="overtimePay" v-if="!isColumnEmpty('overtimePay')" align="center" label="加班費"
                             width="100"></el-table-column>
            <el-table-column prop="leaveDeductionAmount" v-if="!isColumnEmpty('leaveDeductionAmount')" align="center" label="請假扣款金額"
                             width="120"></el-table-column>
            <el-table-column prop="payroll" v-if="!isColumnEmpty('payroll')" align="center" label="實領薪資"
                             width="100"></el-table-column>

            <el-table-column prop="actualMonth" align="center" label="實際薪資月份"></el-table-column>

        </el-table>


    </div>
</template>

<style>
    .custom-table .el-table__body-wrapper tbody td:nth-child(2) { /* 4表示第4列，从1开始计数 */
        color: red;
    }
    .custom-table .el-table__body-wrapper tbody td:nth-child(3) { /* 4表示第4列，从1开始计数 */
        color: red;
    }
    .custom-table .el-table__body-wrapper tbody td:nth-child(5) { /* 4表示第4列，从1开始计数 */
        color: red;
    }
</style>

<script>
    export default {

        data() {
            return {
                month: null,
                tableData: [],

            }
        }, watch: {
            month(newValue) {
                this.getByMonthSelectList();

            }
        }
            , methods: {


                isColumnEmpty(columnName) {
                    return this.tableData.every(row => row[columnName] === null || row[columnName] === undefined);
                },
                handleCalculate() {
                    let url = 'http://'+this.baseUrl+':8090/salaryManagement/'
                    this.axios.create({'headers':{'Authorization':localStorage.getItem('jwt') } })
                        .get(url).then((response) => {
                        let responseBody = response.data
                        if (responseBody.state == 20000) {
                            this.$notify({
                                title: '計算薪資完成',
                                message: '計算薪資完成',
                                type: 'success'
                            });

                        } else {
                            this.$message.error(responseBody.message);


                        }
                    }).catch((error) => {
                        this.$message.error(error.response.data);
                    });
                },
                list() {
                    let url = 'http://'+this.baseUrl+':8090/salaryManagement/list'
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

                },
            getByMonthSelectList(){
                let url = 'http://'+this.baseUrl+':8090/salaryManagement/getByMonthSelectList/'+this.month
                this.axios.create({'headers':{'Authorization':localStorage.getItem('jwt') } })
                    .post(url).then((response) => {
                    let responseBody = response.data
                    if (responseBody.state == 20000) {
                        this.tableData = responseBody.data
                    } else {
                        this.$message.error(responseBody.message);
                    }

                }).catch((error) => {
                    this.$message.error(error.response.data);
                });
            }
            }, mounted() {

                this.list();

            }, created() {


            }


    }
</script>

<style scoped>

</style>