let tableArray = [];
for (let i = 2; i <= 29; i++) {
  tableArray.push({
    avatar: require('@/assets/images/table/'+ i +'.png'),
    id: i,
    name: "第"+ i +"桌",
    prize_type: 4,
    status: 1,
    userid: i
  })
}

let tableConf = {
  //桌数信息
  tableNum: 29,
  //忽略的桌数
  tableIgnore: [1],
  //奖品信息
  tablePrizeInfo: [
    {
      id: 4,
      typename: '阳光普照',
      count: 1,
      everytime: 1,
      name: '阳光普照',
      imgname: require('@/assets/images/imgquestion.png'),
      remark: '——抽10桌'
    }
  ],
  tableArray: tableArray
}
export default tableConf;