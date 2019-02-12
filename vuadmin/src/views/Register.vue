<template>
    <div class="registers">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">VuAdmin开源后台管理系统</span>
            </div>
            <div class="elForm">
                <el-form :model="registerUser" :rules="rules" ref="registerForm" label-width="80px" class="registerForm">
                    <el-form-item label="用户名" prop="name">
                        <el-input v-model="registerUser.name" aria-placeholder="请输入用户名"></el-input>
                    </el-form-item>

                    <el-form-item label="邮箱" prop="email">
                        <el-input type='email' v-model="registerUser.email" aria-placeholder="请输入邮箱"></el-input>
                    </el-form-item>

                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="registerUser.password" aria-placeholder="请输入密码"></el-input>
                    </el-form-item>

                    <el-form-item label="确认密码" prop="password2">
                        <el-input type="password" v-model="registerUser.password2" aria-placeholder="请确认密码"></el-input>
                    </el-form-item>

                    <el-form-item label="选择身份">
                        <el-select v-model="registerUser.identity" placeholder="请选择身份">
                            <el-option label="管理员" value="manager"></el-option>
                            <el-option label="员工" value="employee"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" class="submit_btn" @click="submitForm('registerForm')">注册</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </section>
        <footer><a href="https://github.com/dollarkillerx/VUAdmin">VuAdmin开源后台管理系统@2019 By:DollarKiller</a></footer>
    </div>
</template>

<script>
export default {
    name: "register",
    data () {
        let validatePass = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请再次输入密码'));
            } else if (value !== this.registerUser.password) {
            callback(new Error('两次输入密码不一致!'));
            } else {
            callback();
            }
        };
        return {
            registerUser:{
                name:'',
                email:'',
                password:'',
                password2:'',
                identity:''
            },
            rules:{
                name:[{
                    required:true,
                    message:'用户名不能为空',
                    trigger:"blur"
                },{
                    min:2,
                    max:30,
                    message:"长度在2-30字符之间",
                    trigger:"blur"
                }
                ],
                email:[{
                    type:"email",
                    required:true,
                    message:'邮件格式不正确',
                    trigger:"blur"
                }],
                password:[{
                    required:true,
                    message:"密码不能为空",
                    trigger:"blur"
                },{
                    min:6,
                    max:30,
                    message:"长度在6-30之间",
                    trigger:"blur"
                }],
                password2:[{
                    required:true,
                    message:"确认密码不能为空",
                    trigger:"blur"
                },{
                    validator:validatePass,
                    trigger:"blur"
                }]
            }
        }
    },
    methods:{
        submitForm(formName){
             this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
};
</script>

<style scoped>
.registers {
   /* position: relative; */
   /* width: 100%;
   height: 100%; 
   background: url(../assets/bg.jpg) no-repeat center center;
   background-size:100% 100%; 
   background-attachment: fixed;
   background-size: cover; */
   background:url(../assets/bg.jpg)  no-repeat center center;
   background-size:cover;
   background-attachment:fixed;
   background-color:#CCCCCC;
   width: 100%;
   height: 100%;
   position:absolute;
   }
.form_container {
    width: 370px;
    height: 210px;
    position: absolute;
    top: 10%;
    padding: 25px;
    border-radius: 5px;
    left: 50%;
    margin-left: -185px;

}
.form_container .manage_tip .title {
    font-family: "Microsoft YaHei";
    font-weight: bold;
    font-size: 26px;
    color: #fff;
}
footer{
    position: absolute; 
    bottom: 35px;
    left: 50%;
    margin-left: -179px;
}
footer a{
    text-decoration: none;
    color: #000000;
}
.manage_tip{
    margin-bottom: 25px;
    margin-left:45px; 
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.registerForm{
    background-color: #fff;
    padding: 20px 40px 20px 20px;
    border-radius: 5px;
    box-shadow: 0px 5px 10px #ccc;
}
.submit_btn{
    width: 100%;
}
</style>
