<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px;">
            <el-breadcrumb-item :to="{ path: '/employees/list' }">
                <i class="el-icon-s-promotion"></i> 后台管理
            </el-breadcrumb-item>
            <el-breadcrumb-item>員工列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>
        <el-table
                :data="tableData" stripe border style="width: 100%">
            <el-table-column prop="deptName" align="center" label="部門" width="70"></el-table-column>
            <el-table-column prop="employeeName" align="center" label="姓名" width="80"></el-table-column>
            <el-table-column prop="gender" label="性別" width="50"></el-table-column>
            <el-table-column prop="idNumber" align="center" label="身分證字號" width="105"></el-table-column>
            <el-table-column prop="birthday" align="center" label="生日" width="105"></el-table-column>
            <el-table-column prop="hiredate" align="center" label="入職時間" width="105"></el-table-column>
            <el-table-column prop="phoneNumber" align="center" label="聯絡電話" width="110"></el-table-column>
            <el-table-column prop="educationBackground" align="center" header-align="center" label="學歷"
                             width="110"></el-table-column>
            <el-table-column prop="address" header-align="center" label="地址"></el-table-column>
            <el-table-column width="100" align="center" label="操作">
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
                tableData: []
            }
        }, methods: {
            openDeleteConfirm(employees) {
                let title = '提示';
                let message = '此操作將永久删除【' + employees.employeeName + '】資料，是否繼續？';
                this.$confirm(message, title, {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.handleDelete(employees);
                }).catch(() => {
                });
            },
            loadAlbumList() {
                console.log('loadAlbumList ...')
                let url = 'http://'+this.baseUrl+':8090/employees'
                console.log('url=' + url);
                this.axios.create({'headers':{'Authorization':localStorage.getItem('jwt') } })
                    .get(url).then((response) => {
                    let responseBody = response.data;
                    console.log(responseBody)
                    this.tableData = responseBody.data;
                }).catch((error) => {
                    this.$message.error(error.response.data);
                });
            },
            handleDelete(employees) {
                console.log('id=' + employees.id)
                let url = 'http://'+this.baseUrl+':8090/employees/' + employees.id + '/delete';
                this.axios.create({'headers':{'Authorization':localStorage.getItem('jwt') } })
                    .post(url).then((response) => {
                    let responseBody = response.data;
                    if (responseBody.state == 20000) {
                        this.$message({
                            message: '刪除成功！',
                            type: 'success'
                        });

                    }else {
                        this.$message.error(responseBody.message);
                    }
                    this.loadAlbumList();
                }).catch((error) => {
                    this.$message.error(error.response.data);
                });
            },
            handleEdit(employees) {
                console.log('employees.id=' + employees.id)

                this.axios.create({'headers':{'Authorization':localStorage.getItem('jwt') } })
                    .get("http://"+this.baseUrl+":8090/employees/selectById/" + employees.id )
                    .then((response) => {

                    let responseBody = response.data;

                        console.log(responseBody)
                        this.$router.push({
                            name: "dataUpdate",
                            params: {
                                ...responseBody.data
                            },
                        });
                    }).catch((error) => {

                    this.$message.error(error.response.data);
                });


                    // this.$router.push({path:"/sys-erp/enterprise/data/update"})
            },
        }, mounted() {
            console.log('mounted ...')
            this.loadAlbumList();
        }, created() {
            console.log('created ...')

        }
    }
</script>

<style scoped>

</style>