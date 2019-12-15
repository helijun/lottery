<template>
  <div class="page-lottery-table animated fadeIn">
      <audio id="choujiangId" loop :src="require('@/assets/audio/choujiang.mp3')"></audio>
      <audio id="zhongjiangId" :src="require('@/assets/audio/zhongjiang.mp3')"></audio>
      <div class="btn-fullscreen" @click="handleFullScreen">
        <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
            <i class="el-icon-rank"></i>
        </el-tooltip>
      </div>
      <i class="m-add-table el-icon-plus" @click="handleAppendTable"></i>
      <div class="m-signin-man">
        <h2>年会抽奖</h2>
        <div class="el-man-avatar " v-for="(item, i) in moveUsers" :key="i">
          <img :src="item.avatar" :alt="item.name" :title="item.name">
          <i class="m-remove-table el-icon-delete" @click="handleRmoveTable(item)"></i>
        </div>
      </div>
      <div class="m-right-config">
        <div class="el-title">{{currentPrizeInfo.typename}}</div>
        <div class="el-desc">{{currentPrizeInfo.name}}  <span v-if="currentPrizeInfo.id != 4">({{currentPrizeInfo.count * currentPrizeInfo.everytime}})名</span> {{currentPrizeInfo.remark || ''}}</div>
        <div class="el-img">
          <img :src="currentPrizeInfo.imgname" alt="">
        </div>
        <el-form v-if="movePrizeStatus == 0" ref="form" :model="form" label-width="60px">
          <el-form-item label="奖项">
            <el-select v-model="form.prizeType" placeholder="请选择">
              <el-option v-for="(item, i) in prizeInfo" :key="i" :label="item.typename" :value="item.typename"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="el-prize-btn">
          <el-button class="el-prize-btn infinite animated heartBeat delay-4s" v-if="movePrizeStatus == 0"  @click="startMoveMan">开始抽奖</el-button>  
        </div>
        <i class="m-random-user el-icon-refresh" @click="randomUser"  v-if="movePrizeStatus == 0">重新洗牌</i>
      </div>

      <div
        v-show="dialogTableVisible" 
        class="m-dialog"
      >
        <div class="m-prize-man" :class="computedPrizeItemClass(currentPrizeUsers)" >
          <div class="el-prize-item " v-for="(item, i) in currentPrizeUsers" :key="i">
            <div class="el-img-question">
              <img class="animated delay-1s" :class="{'flash': movePrizeStatus == 2}" v-if="item.avatar" :src="item.avatar" alt="">
              <span v-else>?</span>
              <p>{{item.name ? item.name : '未揭晓'}}</p>
            </div>
          </div>
          <div class="el-prize-btn animated heartBeat delay-2s" :class="{'infinite': movePrizeStatus != 1 && movePrizeStatus != 2}">
            <el-button @click="handlePrizeClick">{{['继续', '停', '完成抽奖', '继续'][movePrizeStatus]}}</el-button>
          </div>
          <div v-if="movePrizeStatus == 2">
            <i class="el-icon-delete" @click="handleDelPrizeClick">再来一次</i>
          </div>
        </div>
      </div>
  </div>
  
</template>

<script src="./table.js"></script>

<style lang="scss">
@import "@/assets/sass/view/lottery1920";
@import "@/assets/sass/view/table";
.page-lottery-table {
  position: relative;
  margin: 0 auto;
  background: url('../../assets/images/icon-wall.jpg');
  background-repeat: no-repeat;
  width: 1920px;
  height: 1080px;
  background-size: 100% 100%;

  .btn-fullscreen{
    transform: rotate(45deg);
    font-size: 24px;
    cursor: pointer;
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    color: #890900;
  }
  .el-prize-btn {
    text-align: center;
    margin: 0 auto;
    margin-top: 10px;

    button {
      height: 90px;
      width: 282px;
      background: url('../../assets/images/btn.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      color: red;
      font-size: 28px;
      font-family: Source Han Sans CN;
      font-weight: bold;
      outline: none;
      border: none;

      span {
        position: relative;
        top: -10px;
        display: inline-block;
      }

    }
  }
  .m-dialog {
    position: absolute;
    top: 120px;
    left: 1.88%;
    width: 70%;    
    height: 808px;
    background-repeat: no-repeat;
    background-size: 100%;
    background-color: #051f3f;
    .el-icon-delete {
      color: white;
      cursor: pointer;
    }
    .m-prize-man {
      position: relative;
      margin: 0 auto;
      margin-top: 18%;
      text-align: center;
      
      .el-prize-item {
        display: inline-block;
        .el-img-question {
          width: 90px;
          height: 90px;
          margin: 11px 9px 0 9px;
          display: inline-block;

          span {
            display: inline-block;
            height: 100%;
            line-height: 90px;
            width: 100%;
            border: 3px dashed rgba(255,217,54,1);
            border-radius: 50%;
            font-size: 60px;
            color: rgba(255,217,54,1);
            text-align: center;
          }
          img {
            border-radius: 50%;
            height: 100%;
            width: 100%;
          }
          p {
            text-align: center;
            margin: 0 0 20px 0;
            font-size: 25px;
            width: 100%;
            color: white;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
    /* 阳光普照 */
    .m-prize-man1 {
      margin-top: 15%;
      padding: 0;
      box-sizing: border-box;
      text-align: center;
      background: url('../../assets/images/hua.png');
      background-repeat: no-repeat;
      background-size: 100%;
      
      .el-prize-item {
        position: relative;
        background: url('../../assets/images/guan.png');
        background-repeat: no-repeat;
        background-size: 100%;
        padding: 40px 80px 0 80px;

        &:before {
          content: '';
          display: inline-block;
          position: absolute;
          background: url('../../assets/images/hg.png');
          background-repeat: no-repeat;
          background-size: 100% 100%;
          width: 55px;
          height: 48px;
          top: 44px;
          left: 83px;
          transform: scale(1.5) rotate(-25deg);
          z-index: 22;
        }
        .el-img-question {
          position: relative;
          width: 280px;
          height: 280px;
          margin: 0;
          background: url('../../assets/images/yuan.png');
          background-repeat: no-repeat;
          background-size: 100% 100%;

          img {
            border-radius: 50%;
            height: 220px;
            width: 220px;
            padding: 0;
            margin-top: 16px;
            margin-left: 4px;
          }
          span {
            height: 85%;
            font-size: 100px;
            border: none;
          }
          p {
            margin: 20px 0;
            font-size: 45px;
          }
        }
      }
    }
  }
  .m-signin-mancount {
    position: absolute;
    right: 90px;
    top: 50px;
    font-size: 25px;
    color: white;
  }
  .m-signin-movemancount {
    position: absolute;
    right: 90px;
    top: 80px;
    font-size: 25px;
    color: white;
  }
  .m-signin-man {
    position: absolute;
    display: inline-block;
    padding: 0;
    left: 5%;
    top: 12%;
    height: 69%;
    width: 65.5%;
    overflow: auto;
    text-align: left;
    h2 {
      text-align: center;
      font-size: 60px;
      margin-bottom: 40px;
      color: white;
    }
    .el-man-avatar {
      display: inline-block;
      width: 135px;
      height: 135px;
      margin: 5px 10px;
      img {
        border-radius: 50%;
        border: 3px solid #fed730;
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>