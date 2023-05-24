<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px;">
            <el-breadcrumb-item :to="{ path: '/sys-admin' }">
                <i class="el-icon-s-promotion"></i> 后台管理
            </el-breadcrumb-item>
            <el-breadcrumb-item>管理員列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>
        <el-table
                :data="tableData"
                stripe
                style="width: 100%">
            <el-table-column prop="id" label="ID" width="40" align="center"></el-table-column>
            <el-table-column prop="username" label="帳號" width="120"></el-table-column>
            <el-table-column prop="nickname" width="100" label="使用者名稱" align="center"></el-table-column>
            <el-table-column prop="phone" width="110" label="手機號碼" align="center"></el-table-column>
            <el-table-column prop="email" width="180" label="電子郵箱" header-align="center"></el-table-column>
            <el-table-column prop="description" header-align="center" label="簡介"></el-table-column>
            <el-table-column prop="enable" label="是否啟用" align="center" width="80">
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.enable"
                            @change="changeEnable(scope.row)"
                            :active-value="1"
                            :inactive-value="0"
                            active-color="#13ce66"
                            inactive-color="#ccc">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleEdit(scope.row)"
                               circle></el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="openDeleteConfirm(scope.row)"
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
        },
        methods: {
            changeEnable(admin) {
                console.log('changeEnable ....')
                console.log(admin);
                let enableText = ['禁用','啟用']
                let url = 'http://'+this.baseUrl+':8092/admins/' + admin.id;
                if (admin.enable == 1){
                    url += '/enable'
                }else {
                    url += '/disable'
                }
                console.log(url)
                    this.axios
                        .create({'headers':{'Authorization':localStorage.getItem('jwt') } })
                            .post(url).then((response) => {
                        let responseBody = response.data;
                        if (responseBody.state == 20000){
                            this.$message({
                                message: '將【'+admin.username+'】的啟用狀態設置為【'+enableText[admin.enable]+'】成功',
                                type: 'success'
                            });
                        } else {
                            // this.$message.error(responseBody.message);
                            let title = '操作失败';
                            this.$alert(responseBody.message, title, {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.loadAdminList();
                                }
                            });
                        }

                    }).catch((error) => {

                        this.$message.error(error.response.data);
                    });

            },
            loadAdminList() {
                let url = 'http://'+this.baseUrl+':8092/admins'
                console.log('url='+url)
                console.log('jwt='+localStorage.getItem('jwt'))
                this.axios
                    .create({'headers':{'Authorization':localStorage.getItem('jwt') } })
                    .get(url).then((response) => {
                    console.log(response.data);
                    let responseBody = response.data;
                    console.log(responseBody)
                    this.tableData = responseBody.data;
                })
            },
            handleDelete(admin) {
                console.log('handleDelete ..id=' + admin.id);
                let url = 'http://'+this.baseUrl+':8092/admins/' + admin.id + '/delete';
                this.axios
                    .create({'headers':{'Authorization':localStorage.getItem('jwt') } })
                .post(url).then((response) => {
                    console.log(response.data);
                    let responseBody = response.data;
                    if (responseBody.state != 20000) {
                        this.$message.error(responseBody.message);
                    }
                    this.loadAdminList();
                })

            },
            openDeleteConfirm(admin) {
                let title = '提示';
                let message = '此操作將永久删除【' + admin.username + '】管理員，是否繼續？';
                this.$confirm(message, title, {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.handleDelete(admin);
                }).catch(() => {
                });
            },
        },
        mounted() {
            console.log('mounted ...');
            this.loadAdminList();
        },
        created() {
            console.log('created ...')
        }
    }
</script>

<style scoped>

</style>