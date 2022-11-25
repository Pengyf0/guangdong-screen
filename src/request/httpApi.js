import request from './request';


// 分行日活用户数  /jkdp/data/regionUserActvDailyCnt
export const getRregionUserActvDailyCnt = () => request.get('/jkdp/data/regionUserActvDailyCnt')

// 主要指标 /jkdp/data/mainIndex
export const getMainIndex = () => request.get('/jkdp/data/mainIndex')


// 累计注册用户  /jkdp/data/userAllCnt
export const getUserAllCnt = () => request.get('/jkdp/data/userAllCnt')

// 日活用户 /jkdp/data/userActvCnt
export const getUserActvCnt = () => request.get('/jkdp/data/userActvCnt')

// 分行累计用户数  /jkdp/data/regionUserAllCnt
export const getRegionUserAllCnt = () => request.get('/jkdp/data/regionUserAllCnt')


// 分行日活用户数   /jkdp/data/regionUserActvDailyCnt
export const getRegionUserActvDailyCnt = () => request.get('/jkdp/data/regionUserActvDailyCnt')

// 分行新增用户数  /jkdp/data/regionUserNewCnt
export const getRegionUserNewCnt = () => request.get('/jkdp/data/regionUserNewCnt')


// 分行指标排行表   /jkdp/data/regionIndex
export const getRegionIndex = () => request.get('/jkdp/data/regionIndex')

// 省份指标 /jkdp/data/mainIndex
export const getProvinceIndex = () => request.get('/jkdp/data/provinceIndex')

// 当日新增注册  /jkdp/data/realTimeIndex
export const getRealTimeIndex = () => request.get('/jkdp/data/realTimeIndex')



// 二、积分大屏
// /jkdp/apnt/regApntCustNumList 积分用户累计数折线
export const getRegApntCustNumList = () => request.get('/jkdp/apnt/regApntCustNumList')

// /jkdp/apnt/apntDealUserNumList 积分交易用户数折线
export const getApntDealUserNumList = () => request.get('/jkdp/apnt/apntDealUserNumList')

// /jkdp/apnt/apntPayAmtList 积分支付订单额折线
export const getApntPayAmtList = () => request.get('/jkdp/apnt/apntPayAmtList')

// /jkdp/apnt/apntCashoutAmtList 积分支付抵扣折线
export const getApntCashoutAmtList = () => request.get('/jkdp/apnt/apntCashoutAmtList')



// /jkdp/apnt/regApntCustNum 建行生活积分用户累计数
export const getRegApntCustNum = () => request.get('/jkdp/apnt/regApntCustNum')

// /jkdp/apnt/apntDealUserNum 积分支付交易用户数
export const getApntDealUserNum = () => request.get('/jkdp/apnt/apntDealUserNum')

// /jkdp/apnt/apntCashoutAmt 积分支付抵扣金额累计
export const getApntCashoutAmt = () => request.get('/jkdp/apnt/apntCashoutAmt')

// /jkdp/apnt/apntNewUserNum 一周新增积分用户数
export const getApntNewUserNum = () => request.get('/jkdp/apnt/apntNewUserNum')




// /jkdp/apnt/signMctNumRank  一级行本周签约商户数
export const getSignMctNumRank = () => request.get('/jkdp/apnt/signMctNumRank')

// /jkdp/apnt/signMctNumRank  一级行本周订单数
export const getOrgCashoutOrderNumRank = () => request.get('/jkdp/apnt/orgCashoutOrderNumRank')

// /jkdp/apnt/mctCashoutOrderNumRank 商户本周订单笔数
export const getMctCashoutOrderNumRank = () => request.get('/jkdp/apnt/mctCashoutOrderNumRank')


// /jkdp/apnt/apntRatioStat  积分支付占比指标
export const getApntRatioStat = () => request.get('/jkdp/apnt/apntRatioStat')




// /jkdp/apnt/cashoutOrderRank  城市生活积分支付最新数据(列表)
export const getCashoutOrderRank = (params) => request.get('/jkdp/apnt/cashoutOrderRank', {
    params
})


// /jkdp/apnt/signMctNumDetail  分行积分商户签约情况
export const getSignMctNumDetail = () => request.get('/jkdp/apnt/signMctNumDetail')


// /jkdp/apnt/orgCashoutOrderNumDetail 分行积分支付交易情况
export const getOrgCashoutOrderNumDetail = () => request.get('/jkdp/apnt/orgCashoutOrderNumDetail')



// /jkdp/apnt/mctCashoutOrderNumDetail 商户积分支付交易TOP10
export const getMctCashoutOrderNumDetail = () => request.get('/jkdp/apnt/mctCashoutOrderNumDetail')

// 广州大屏商户积分支付交易TOP10
export const gangzhouScreen = () => request.get('/api/jkdp/gzscreen')