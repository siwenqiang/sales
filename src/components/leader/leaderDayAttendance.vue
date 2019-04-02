<template>
    <el-card>
        <my-bread level1="工作" level2="日考勤"></my-bread>
            <div style="padding-left:40px;">
                <el-progress type="circle" :percentage="25" style="margin-right:200px;margin-top:40px"></el-progress>
                <div class="AM">
                    <span>上班考勤打卡</span>
                    <span>25/100</span>
                </div>
                <el-progress type="circle" :percentage="50" style="margin-top:40px"></el-progress>
                <div class="PM">
                    <span>下班考勤打卡</span>
                    <span>50/100</span>
                </div>
            </div>
            <div class="line">

            </div>
            <div class="contentTable">
                <!-- 对于迟到和早退的详情，在上下班打卡可以看到，外出和请假详情也均可以看到，所以此页面无需显示详情，只做统计和收集 -->
                <table border=1>
                <caption style="margin-bottom:20px">迟到人员列表</caption>
                   <tr>张三</tr>
                   <tr>李四</tr>
                   <tr>王五</tr>
                </table>

                <table border=1>
                <caption>早退人员列表</caption>
                 
                </table>

                <table border=1>
                <caption>外出人员列表</caption>
                   <tr>张三</tr>
                 
                </table>

                <table border=1>
                <caption>请假人员列表</caption>
                   <tr>张三</tr>
                   <tr>李四</tr>
                   
                </table>
            </div>
    </el-card>
</template>

<script>
export default {

}
</script>

<style>
.contentTable table{
    border: 1px solid #ccc;
    width:20%;
    text-align:center;
    border-collapse: collapse;
    float:left;
    margin-right:20px;
}
.contentTable table tr {
border:1px solid #ccc;
}
.contentTable table tr:nth-child(2n){

background-color: #fbc9a7

}
.line{
    height:1px;
    background-color: #ccc;
    margin-top:100px;
}
.AM{
    display: inline;
    position: relative;
    left:-320px;
    top:40px
}
.AM span:last-child{
    position: relative;
    left:-75px;
    top:40px
}
.PM{
    display: inline;
    position: relative;
    left:-120px;
    top:40px
}
.PM span:last-child{
    position: relative;
    left:-75px;
    top:40px
}
</style>
