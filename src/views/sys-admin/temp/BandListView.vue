<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px;">
            <el-breadcrumb-item :to="{ path: '/bank/list' }">
                <i class="el-icon-s-promotion"></i> 帳戶列表
            </el-breadcrumb-item>
            <el-breadcrumb-item>帳戶列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>
        <el-table
                :data="tableData" stripe border style="width: 100%">
            <el-table-column prop="id" align="center" label="ID" width="40"></el-table-column>
            <el-table-column prop="employeeName" align="center" label="姓名" width="80"></el-table-column>
            <el-table-column prop="salary" align="center" label="薪資" width="70" ></el-table-column>
          <el-table-column prop="codeName" align="center" label="銀行代號" width="150" ></el-table-column>
          <el-table-column prop="bankNumber" align="center" label="銀行帳號" ></el-table-column>
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
            openDeleteConfirm(bank) {
                let title = '提示';
                let message = '此操作將永久删除【' + bank.employeeName + '】資料，是否繼續？';
                this.$confirm(message, title, {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.handleDelete(bank);
                }).catch(() => {
                });
            },
            loadAlbumList() {
                console.log('loadAlbumList ...')
                let url = 'http://'+this.baseUrl+':8090/banks'
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
            handleDelete(bank) {
                console.log('id=' + bank.id)
                let url = 'http://'+this.baseUrl+':8090/banks/' + bank.id + '/delete';
                this.axios.create({'headers':{'Authorization':localStorage.getItem('jwt') } })
                    .post(url).then((response) => {
                    let responseBody = response.data;
                    if (responseBody.state != 20000) {
                        this.$message.error(responseBody.message);
                    }
                    this.loadAlbumList();
                }).catch((error) => {

                    this.$message.error(error.response.data);
                });
            },
            handleEdit() {

            }
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