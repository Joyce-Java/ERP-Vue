<template>
    <div>
        <el-container>
            <!-- 顶栏 -->
            <el-header class="layout-header">
                <div class="header-content">
                    <h1 class="title">企業管理系统</h1>
                    <div class="avatar-container">
                        <div class="admin-name">目前使用者: {{adminName}}</div>
                        <div class="demo-basic--circle">
                            <div class="block"><el-avatar :size="50" :src="options.avatar"></el-avatar></div>
                        </div>
                    </div>
                </div>
            </el-header>
            <!-- 下半部分区域 -->
            <el-container class="layout-body">
                <!-- 左侧边栏 -->
                <el-aside class="layout-aside">
                    <el-menu
                            router
                            :default-active="$router.currentRoute.path"
                            class="el-menu-vertical-demo"
                            background-color="#222c32"
                            text-color="#fff"
                            active-text-color="#fff">
                        <!--首页-->
                        <el-menu-item index="/AccountInfo">
                            <i class="el-icon-sunny"></i>
                            <span>首页</span>
                        </el-menu-item>
                        <!--员工管理-->
                        <el-submenu index="2">
                            <template slot="title">
                                <i class="el-icon-place"></i>
                                <span>員工管理</span>
                            </template>
                            <!--員工資料子標籤-->
                            <el-submenu index="2-1">
                                <template slot="title"><i class="el-icon-user"/>員工資料</template>
                                <el-menu-item index="/sys-erp/enterprise/data/add-new">
                                    <i class="el-icon-plus"></i>
                                    <span>添加资料</span>
                                </el-menu-item>
                                <el-menu-item index="/sys-erp/enterprise/data/list">
                                    <i class="el-icon-s-fold"></i>
                                    <span>員工列表</span>
                                </el-menu-item>
                                <el-menu-item index="/sys-erp/enterprise/data/quitdateList">
                                    <i class="el-icon-s-fold"></i>
                                    <span>離職員工列表</span>
                                </el-menu-item>
                            </el-submenu>


                            <!--部門管理子標籤-->
                            <el-submenu index="2-2">
                                <template slot="title"><i class="el-icon-s-grid"/>部門管理</template>
                                <el-menu-item index="/sys-erp/enterprise/dept/add-new">
                                    <i class="el-icon-plus"></i>
                                    <span>添加部門</span>
                                </el-menu-item>
                                <el-menu-item index="/sys-erp/enterprise/dept/list">
                                    <i class="el-icon-s-fold"></i>
                                    <span>部門列表</span>
                                </el-menu-item>
                            </el-submenu>

                            <!--職務管理子標籤-->
                            <el-submenu index="2-3">
                                <template slot="title"><i class="el-icon-edit"/>職務管理</template>
                                <el-menu-item index="/sys-erp/enterprise/position/add-new">
                                    <i class="el-icon-plus"></i>
                                    <span>添加職務</span>
                                </el-menu-item>
                            </el-submenu>
                        </el-submenu>


                        <!--考勤管理-->
                        <el-submenu index="5">
                            <template slot="title">
                                <i class="el-icon-mobile"></i>
                                <span>考勤管理</span>
                            </template>
                            <el-menu-item index="/sys-erp/enterprise/absenceTracker/data-new">
                                <i class="el-icon-plus"></i>
                                <span>請假登記</span>
                            </el-menu-item>
                            <el-menu-item index="/sys-erp/enterprise/absenceTracker/list">
                                <i class="el-icon-s-fold"></i>
                                <span>請假明細</span>
                            </el-menu-item>
                            <el-menu-item index="/temporaryPage">
                                <i class="el-icon-location"></i>
                                <span>特休登記</span>
                            </el-menu-item>
                        </el-submenu>

                        <!--加班管理-->
                        <el-submenu index="3">
                            <template slot="title">
                                <i class="el-icon-s-platform"></i>
                                <span>加班管理</span>
                            </template>

                            <el-menu-item index="/sys-erp/enterprise/overtime/add-New">
                                <i class="el-icon-plus"></i>
                                <span>加班登記</span>
                            </el-menu-item>
                            <el-menu-item index="/sys-erp/enterprise/overtime/list">
                                <i class="el-icon-s-fold"></i>
                                <span>加班列表</span>
                            </el-menu-item>
                        </el-submenu>

                        <!--薪资管理-->
                        <el-submenu index="4">
                            <template slot="title">
                                <i class="el-icon-bank-card"></i>
                                <span>薪資管理</span>
                            </template>

                            <el-submenu index="4-1">
                                <template slot="title"><i class="el-icon-coin"/>帳戶管理</template>
                                <el-menu-item index="/sys-erp/enterprise/bank/add-New">
                                    <i class="el-icon-plus"></i>
                                    <span>添加帳戶</span>
                                </el-menu-item>
                                <el-menu-item index="/sys-erp/enterprise/bank/list">
                                    <i class="el-icon-s-fold"></i>
                                    <span>帳戶列表</span>
                                </el-menu-item>
                            </el-submenu>

                            <el-menu-item index="/sys-erp/enterprise/salaryManagement/add-new">
                                <i class="el-icon-wallet"></i>
                                <span>員工薪资</span>
                            </el-menu-item>
                            <el-menu-item index="/temporaryPage">
                                <i class="el-icon-money"></i>
                                <span>薪資明细</span>
                            </el-menu-item>

                            <el-menu-item index="/temporaryPage">
                                <i class="el-icon-notebook-2"></i>
                                <span>津贴/獎金</span>
                            </el-menu-item>

                        </el-submenu>


                        <!--公告管理-->
                        <el-menu-item index="/temporaryPage">
                            <template slot="title">
                                <i class="el-icon-date"></i>
                                <span>公告管理</span>
                            </template>
                        </el-menu-item>
                        <!--工作计划-->
                        <el-menu-item index="/temporaryPage">
                            <template slot="title">
                                <i class="el-icon-edit"></i>
                                <span>工作計畫</span>
                            </template>
                        </el-menu-item>
                        <!--设置-->
                        <el-submenu index="/temporaryPage">
                            <template slot="title">
                                <i class="el-icon-setting"></i>
                                <span>設置</span>
                            </template>

                            <el-submenu index="9">
                                <template slot="title"><i class="el-icon-location"/>權限管理</template>
                                <el-menu-item index="/sys-erp/enterprise/admin/add-new">
                                    <i class="el-icon-location"></i>
                                    <span>添加管理員</span>
                                </el-menu-item>
                                <el-menu-item index="/sys-erp/enterprise/admin/list">
                                    <i class="el-icon-location"></i>
                                    <span>管理員列表</span>
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item index="/login">
                                <i class="el-icon-location"></i>
                                <span>登入</span>
                            </el-menu-item>
                            <el-menu-item index="/logOut">
                                <i class="el-icon-location"></i>
                                <span>退出登入</span>
                            </el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <!-- 主体 -->
                <el-main class="layout-main">
                    <router-view/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<style >
    .demo-basic--circle .el-avatar {
        border: 2px solid  #00c853;
        border-radius: 50%;
    }
    .admin-name {
        margin-right: 8px;
        margin-left: -8px;
        margin-bottom: -18px;
        font-size: 16px;
    }
    .layout-header {
        background: #1684b0 ;
        color: #fff;
    }
    .layout-header .header-content {
        display: flex;
        justify-content: space-between;
        align-items: center;

    }

    .title {
        flex-grow: 1;
    }

    .avatar-container {
        flex-shrink: 0;
        display: flex;
        align-items: center;

    }
    .layout-header h1 {
        line-height: 60px;

    }

    .layout-body {
        position: absolute;
        top: 60px;
        bottom: 0;
        left: 0;
        right: 0;
    }

    .layout-aside {
        background: #222c32 ;
    }

    .layout-aside i {
        color: #fff ;
    }

    .layout-main {

    }

    .el-menu-item.is-active {
        background: #2d3c4d !important;
    }

</style>
<script>

    export default {
        data() {
            return {
                options:[],
                circleUrl: "https://s.yimg.com/ny/api/res/1.2/8WQ.FoWXUsTUIDUB.YYR7g--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTQ0OQ--/https://media.zenfs.com/no/dailyview.tw/b59e7b6bdb541b316c129465ac717823",
                squareUrl: "https://s.yimg.com/ny/api/res/1.2/8WQ.FoWXUsTUIDUB.YYR7g--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTQ0OQ--/https://media.zenfs.com/no/dailyview.tw/b59e7b6bdb541b316c129465ac717823",
                adminName: ""
            }
        },
        methods: {
            loadAdminList() {
                const jwtToken = localStorage.getItem('jwt');
                const decodedToken = this.jwt_decode(jwtToken);
                const userId = decodedToken.username;
                this.adminName = userId

                let url = 'http://'+this.baseUrl+':8092/admins/'+decodedToken.id+'/selectById'
                this.axios.create({'headers':{'Authorization':localStorage.getItem('jwt') } })
                    .post(url).then((response) => {
                    let responseBody = response.data;
                    console.log(responseBody)
                    this.options = responseBody.data;
                }).catch((error) => {
                    this.$message.error(error.response.data);
                });
            }

        }, mounted() {



        }, created() {
            this.loadAdminList();

        }
    }
</script>
