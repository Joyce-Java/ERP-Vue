<template>
   <div>
       <div class="block2">
       <div class="block1"><el-avatar shape="square" :size="150" :src="options.avatar"></el-avatar></div>
       <el-descriptions class="margin-top"  :column="4" direction="vertical"    >
           <el-descriptions-item label="用户名">{{options.nickname}}</el-descriptions-item>
           <el-descriptions-item label="手機號碼">{{options.phone}}</el-descriptions-item>
           <el-descriptions-item label="信箱" :span="2">{{options.email}}</el-descriptions-item>
           <el-descriptions-item label="狀態">
               <el-tag size="medium">啟用</el-tag>
           </el-descriptions-item>
           <el-descriptions-item label="簡介">{{options.description}}</el-descriptions-item>
       </el-descriptions>
       </div>
       <el-divider><i class="el-icon-star-on"></i></el-divider>
    </div>
</template>
<style>
    .block1 {
        margin-left: 0px;
        margin-bottom: 0px;
        margin-top: 0px;
    }
    .block2 {
        display: flex;
        flex-direction: row;
    }

    .margin-top {
        margin-top: 20px;
        margin-left: 35px;
        margin-bottom: 20px;

    }
</style>
<script>
    export default {
        data() {
            return {
                squareUrl: "https://s.yimg.com/ny/api/res/1.2/8WQ.FoWXUsTUIDUB.YYR7g--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTQ0OQ--/https://media.zenfs.com/no/dailyview.tw/b59e7b6bdb541b316c129465ac717823",
                adminName:"",
                options:[],
                ruleForm: {



                },


            }
        }, methods: {
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
        },
        created() {
            this.loadAdminList();
        }

    };
</script>

<style scoped>

</style>