<template>
    <div class="components-header">
        <div class="header-space"></div>
        <div class="header">
            <div class="header-left">
                <div class="logo">{{title}}</div>
            </div>

            <div class="header-right">
                <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                title: '年会抽奖',
                collapse: false,
                fullscreen: false,
                name: 'linxin',
                message: 2
            }
        },
        computed:{
            username(){
                let userinfo = localStorage.getItem('userinfo');
                userinfo = JSON.parse(userinfo);
                return userinfo ? userinfo.username : this.name;
            }
        },
        methods:{
            // 用户名下拉菜单选择事件
            handleCommand(command) {
                if(command == 'loginout'){
                    let userinfo = localStorage.getItem('userinfo');

                    userinfo = JSON.parse(userinfo);

                    let url = '/pubLogin';

                    if(userinfo && userinfo.usertype == 1){
                        url = '/login'
                    }
                    localStorage.removeItem('userinfo')
                    this.$router.push(url);
                }
            },
            // 全屏事件
            handleFullScreen(){
                let element = document.documentElement;
                if (this.fullscreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullScreen) {
                        element.webkitRequestFullScreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.msRequestFullscreen) {
                        // IE11
                        element.msRequestFullscreen();
                    }
                }
                this.fullscreen = !this.fullscreen;
            }
        },
        mounted(){
            if(document.body.clientWidth < 980){
                this.collapseChage();
            }
        }
    }
</script>
<style lang="scss" scoped>
    .header-space {
        display: block;
        width: 100%;
        height: 70px;
    }
    .header {
        position: fixed;
        top: 0;
        left: 0;
        background-color: #fff;
        box-shadow: 0 0 12px 0 rgba(0,0,0,.1);
        z-index: 999;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 16px;

        .header-left {
            width: 60%;
            display: flex;
            align-items: center;

            .el-dropdown-link{
                color: #409EFF;
                font-size: 20px;
                margin-left: 20px;
                cursor: pointer;
            }

            
            .logo {
                margin-left: 10px;
            }
        }
    }

    .header-right{
        .btn-fullscreen{
            transform: rotate(45deg);
            font-size: 24px;
            cursor: pointer;
            position: relative;
            width: 30px;
            height: 30px;
            text-align: center;
            border-radius: 15px;
        }
    }
    .header-user-con{
        display: flex;
        align-items: center;
    }
    .btn-bell-badge{
        position: absolute;
        right: 0;
        top: -2px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: #f56c6c;
    }
    .user-name{
        margin-left: 10px;
    }
    .user-avator{
        margin-left: 20px;
    }
    .user-avator img{
        display: block;
        width:30px;
        height:30px;
        border-radius: 50%;
    }
</style>
