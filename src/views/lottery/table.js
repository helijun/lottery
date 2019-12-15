
import { BASE_CONST } from '../../const';
import tableConf from '../../conf/table';
import { throttle } from '../../util';

let localStorageTableUserName = 'helijun-2020-lottery-table-userlist';
export default {
  computed: {
    computedPrizeItemClass(data) {
      return (data) => {
        return 'm-prize-man' + data.length
      }
    }
  },
  mixins: [require("./mixins").default],
  data() {
    return {
      choujiangId: null,
      zhongjiangId: null,
      fullscreen: false,
      dialogTableVisible: false,
      eachLimit: 1,
      //所有签到用户
      users: tableConf.tableArray,
      //奖池用户
      moveUsers: [],
      //本次抽奖中奖人数id，每次抽奖前会清空
      currentPrize: [],
      //本次抽奖中奖人信息
      currentPrizeUsers: [],
      //抽奖状态0未开始，1正在抽奖，2完成抽奖，3暂停
      movePrizeStatus: 0,
      //第几次抽奖
      movePrizeNum: 0,
      //当前选择奖项
      currentPrizeInfo: {},
      //奖品信息
      prizeInfo: tableConf.tablePrizeInfo,
      form: {
        //默认奖项
        prizeType: '福星高照', 
      }
    }
  },
  methods: {
    //中奖
    doPrize(userids) {
      if(!userids) {
        return;
      }
      let useridArr = userids.split(',');
      this.moveUsers = this.moveUsers.filter(item => !useridArr.includes(String(item.userid)));
      localStorage.setItem(localStorageTableUserName, JSON.stringify(this.moveUsers));
    },
    
    //启动摇奖
    startMoveMan: throttle(function() {
      this.choujiangId = document.getElementById("choujiangId");
      this.zhongjiangId = document.getElementById("zhongjiangId");
      if(this.moveUsers.length < this.currentPrizeInfo.everytime * this.currentPrizeInfo.count) {
        this.$message('奖池桌数不够！'); 
        clearInterval(this.setIntervalFun);
        return 
      }

      this.choujiangId.play();
      this.dialogTableVisible = true;
      // 生成总共个数的问号
      let currentPrizeUsers = [];
      for(let i = 0; i < this.currentPrizeInfo.count * this.currentPrizeInfo.everytime; i ++) {
        currentPrizeUsers.push({
          name: '',
          avatar: ''
        })
      }

      this.currentPrizeUsers = currentPrizeUsers;

      // 启动第一次抽奖
      this.movePrizeStatus = 1;
      this.movePrizeNum = 1;
      this.doMove(0, this.currentPrizeInfo.everytime);
    }, 1000),

    //作废
    handleDelPrizeClick: throttle(function() {
      let cacheMoveUser = localStorage.getItem(localStorageTableUserName);
      if(cacheMoveUser) {
        let moveUsers = JSON.parse(cacheMoveUser);
        let useridArr = [this.currentPrizeUsers[0].userid]; //暂时不支持多个
        this.moveUsers.push(this.currentPrizeUsers[0]);
        localStorage.setItem(localStorageTableUserName, JSON.stringify(this.moveUsers));
        let resetCurrentPrizeUsers = this.currentPrizeUsers[0];
        this.movePrizeStatus = 3;
        this.dialogTableVisible = false;
        this.movePrizeStatus = 0;
        this.$message(resetCurrentPrizeUsers.name + '已放回奖池');
      }
    }, 500),
    handleAppendTable() {
      this.$prompt('请输入桌号', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        if(/[^\d]/g.test(value)) {
          this.$message({
            type: 'error',
            message: '输入错误，只能是数字！'
          });
          return;
        }
        if(value > tableConf.tableNum) {
          this.$message({
            type: 'error',
            message: '桌号不能大于' + tableConf.tableNum
          });
          return;
        }
        if(this.moveUsers.filter(item => item.userid == value).length > 0) {
          this.$message({
            type: 'error',
            message: '桌号重复！'
          });
          return;
        }
        
        if(tableConf.tableIgnore.includes(Number(value))){
          this.$message({
            type: 'error',
            message: '不能添加第' + value + '桌'
          });
          return;
        }
        console.log('添加了桌号', this.users.find(item => value == item.userid))
        this.moveUsers.push(this.users.find(item => value == item.userid));
        localStorage.setItem(localStorageTableUserName, JSON.stringify(this.moveUsers));
      })
    },
    handleRmoveTable(item) {
      this.$confirm('确认删除' + item.name + '吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.doPrize(String(item.userid));
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      })
    }
  },
  created() {
    this.currentPrizeInfo = this.prizeInfo[0];
    let cacheMoveUser = localStorage.getItem(localStorageTableUserName);
    if(cacheMoveUser) {
      this.moveUsers = JSON.parse(cacheMoveUser);
    }else {
      this.moveUsers = this.users.filter(item => item.status == 1);
    }
  },
  watch: {
    "form.prizeType"() {
      this.currentPrizeInfo = this.prizeInfo.filter(item => item.typename == this.form.prizeType)[0];
      console.log('currentPrizeInfo', this.currentPrizeInfo);
    }
  }
}