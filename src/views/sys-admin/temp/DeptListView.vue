<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px;">
            <el-breadcrumb-item :to="{ path: '/dept/list' }">
                <i class="el-icon-s-promotion"></i> 部門列表
            </el-breadcrumb-item>
            <el-breadcrumb-item>員工列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>
        <el-table :data="tableData" stripe border style="width: 100%">
            <el-table-column prop="id" align="center" label="ID" width="40"></el-table-column>
            <el-table-column prop="deptName" align="center" label="部門名稱" width="80"></el-table-column>
            <el-table-column prop="deptPresentation" align="center" label="部門簡介" ></el-table-column>
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
            openDeleteConfirm(dept) {
                let title = '提示';
                let message = '此操作將永久删除【' + dept.deptName + '】資料，是否繼續？';
                this.$confirm(message, title, {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.handleDelete(dept);
                }).catch(() => {
                });
            },
            loadAlbumList() {
                console.log('loadAlbumList ...')
                let url = 'http://'+this.baseUrl+':8090/depts'
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
            handleDelete(dept) {
                console.log('id=' + dept.id)
                let url = 'http://'+this.baseUrl+':8090/depts/' + dept.id + '/delete';
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