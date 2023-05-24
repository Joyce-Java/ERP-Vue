<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px;">
            <el-breadcrumb-item :to="{ path: '/sys-erp' }">
                <i class="el-icon-s-promotion"></i> 后台管理
            </el-breadcrumb-item>
            <el-breadcrumb-item>添加管理員</el-breadcrumb-item>
        </el-breadcrumb>

        <el-divider></el-divider>

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
            <el-form-item label="帳號" prop="username">
                <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密碼" prop="password">
                <el-input v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item label="使用者名稱" prop="nickname">
                <el-input v-model="ruleForm.nickname"></el-input>
            </el-form-item>
            <el-form-item label="簡介" prop="description">
                <el-input v-model="ruleForm.description"></el-input>
            </el-form-item>
            <el-form-item label="手機號碼" prop="phone">
                <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="電子郵箱" prop="email">
                <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
            <el-form-item label="上傳照片" prop="avatar">
                <el-upload
                        class="avatar-uploader"
                        action="http://localhost/"
                        :headers="headers"
                        :show-file-list="false"
                        :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="是否啟用" prop="enable">
                <el-switch
                        v-model="ruleForm.enable"
                        :active-value="1"
                        :inactive-value="0"
                        active-color="#13ce66"
                        inactive-color="#ccc">
                </el-switch>
            </el-form-item>
            <el-form-item label="角色" prop="roleIds">
                <el-select v-model="ruleForm.roleIds"  multiple placeholder="请选择">
                    <el-option
                            v-for="item in options"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                headers:{
                    Authorization:localStorage.getItem('jwt')
                },
                options: [],
                imageUrl: '',
                ruleForm: {
                    username: '',
                    description: '',
                    sort: '',
                    password:'',
                    nickname:'',
                    phone:'',
                    email:'',
                    avatar:'',
                    roleIds:''

                },
                rules: {
                    username: [
                        {required: true, message: '請輸入管理員名稱', trigger: 'blur'},
                        {min: 4, max: 25, message: '長度在 4 到 25 個字', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '請輸入管理員密碼', trigger: 'blur'},
                        {min: 4, max: 30, message: '長度在 4 到 30 個字', trigger: 'blur'}
                    ],
                    nickName: [
                        {required: true, message: '請輸入管理員暱稱', trigger: 'blur'},
                        {min: 2, max: 30, message: '長度在 4 到 30 個字', trigger: 'blur'}
                    ],
                    phone: [
                        {required: true, message: '請輸入管理員手機', trigger: 'blur'},
                        {min: 8, max: 30, message: '長度在 4 到 30 個字', trigger: 'blur'}
                    ],
                    email: [
                        {required: true, message: '請輸入管理員信箱', trigger: 'blur'},
                        {min: 8, max: 30, message: '長度在 4 到 30 個字', trigger: 'blur'}
                    ],
                    roleIds: [
                        {type:'array', required: true, message: '請選擇角色', trigger: 'blur'}
                    ],
                    sort: [
                        {required: true, message: '請選輸入排序序號', trigger: 'blur'},
                    ]
                }
            };
        },
        methods: {

            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    const base64Img = reader.result;
                        console.log('base64Img='+base64Img)
                    // 在这里将 base64Img 发送到服务器或存储在组件数据中以备提交表单时使用
                    this.imageUrl = base64Img;
                    this.ruleForm.avatar = base64Img;
                    // 执行上传前的验证操作
                    if (isJPG && isLt2M) {
                        // 返回 true 启动上传
                        return true;
                    } else {
                        // 返回 false 取消上传
                        return false;
                    }
                };
                return isJPG && isLt2M;
            },
            loadRoleList(){
                let url = 'http://'+this.baseUrl+':8092/roles';
                console.log(url);
                this.axios
                    .create({'headers':{'Authorization':localStorage.getItem('jwt') } })
                .get(url).then((response)=>{
                    console.log(response.data)
                    let responseBody= response.data;
                    this.options = responseBody.data;
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let url = 'http://'+this.baseUrl+':8092/admins/add-new';
                        console.log('url: ' + url);
                        //  console.log('ruleForm:');
                        // console.log(this.ruleForm);

                        let formData =this.qs.stringify(this.ruleForm)
                        console.log('formData:'+formData)

                        this.axios.create({'headers':{'Authorization':localStorage.getItem('jwt') } })
                            .post(url, formData).then((response)=> {
                            console.log('服务器端响应了结果：');
                             console.log(response);
                            console.log(response.data);
                            let responseBody = response.data;
                            if (responseBody.state == 20000) {
                                // console.log('添加相册成功！');
                                this.$message({
                                    message: '添加管理員成功！',
                                    type: 'success'
                                });
                                this.resetForm(formName);
                            } else {
                                // console.log(responseBody.message);
                                this.$message.error(responseBody.message);
                            }
                        }).catch((error) => {

                            this.$message.error(error.response.data);
                        });;
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        mounted() {
            this.loadRoleList();
        },
        created() {

        }
    }
</script>

<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>