<template>
  <table class="calendar-two table table-bordered calendar-table">
    <thead>
      <tr class="text-center">
        <th scope="col">月份</th>
        <th scope="col">周数</th>
        <th scope="col">一</th>
        <th scope="col">二</th>
        <th scope="col">三</th>
        <th scope="col">四</th>
        <th scope="col">五</th>
        <th scope="col">六</th>
        <th scope="col">日</th>
      </tr>
    </thead>
    <tbody class="text-center"></tbody>
  </table>
</template>

<script setup>
import $ from "jquery";

import { ElMessageBox } from "element-plus";

$(function () {
  var startTime = "2025-2-24 0:0:0";
  var time = Date.parse(startTime);
  time = new Date(time);

  var week = new Array(
    "第1周",
    "第2周",
    "第3周",
    "第4周",
    "第5周",
    "第6周",
    "第7周",
    "第8周",
    "第9周",
    "第10周",
    "第11周",
    "第12周",
    "第13周",
    "第14周",
    "第15周",
    "第16周",
    "第17周",
    "第18周",
    "第19周",
    "第20周",
    "第21周",
    "第22周",
    "第23周"
  );
  var note = [{}];

  // console.log(note[0][9][10]);

  var weekNum = 0;

  //生成表格
  for (var j = 0; j < 27; j++) {
    var m = time.getMonth() + 1;
    
    var b = $(".calendar-two tbody");
    b.append("<tr><th scope='row'>" + m + "月" + "</th></tr>");
    $(".calendar-two tbody tr")
      .last()
      .append("<td><div>" + week[weekNum] + "</div></td>");

    for (var i = 0; i < 7; i++) {
      var flag = true;
      //留空
      if (time.getDate() == 1) {
        //判断日期是否为1，为1表示月份开始，，得到周几空出前方的格
        var d = time.getDay();
        d = (d + 6) % 7; //getDay()得到的周几加6对7取余得到月开始日期的位置
        for (var k = 0; k < d; k++) {
          $(".calendar-two tbody tr")
            .last()
            .append("<td><div>" + " " + "</div></td>");
          i++;
        }
      }

      var a = Date.parse(time);
      a = new Date(a);
      a.setDate(a.getDate() + 1);
      // console.log("a="+a);
      var date = time.getDate();
      // 标红
      let isRed = time.getDay() === 0 || time.getDay() === 6;
      if (isRed) {
        $(".calendar-two tbody tr")
          .last()
          .append(
            "<td class='day-box'><div class='isRed'>" + date + "</div></td>"
          );
      } else {
        $(".calendar-two tbody tr")
          .last()
          .append("<td class='day-box'><div>" + date + "</div></td>");
      }

      if (note[0][m]) {
        if (note[0][m][time.getDate()]) {
          // console.log(time.getDate());
          $(".calendar-two tbody tr td")
            .last()
            .append("<div>" + note[0][m][time.getDate()] + "</div>");
        }
      }

      time.setDate(time.getDate() + 1);
      if (a.getDate() == 1) {
        flag = false;
        break;
      }

      // console.log();
    }
    if (flag) {
      weekNum++;
    }
  }

  find();

  //找到相同月份的区间
  function find() {
    var startRow, endRow;
    var rows = $(".calendar-two tbody tr th").length;
    // console.log(rows);
    // console.log($(".calendar-two tbody tr th").eq(1).html());

    for (var i = 0; i < rows; i++) {
      // console.log($(".calendar-two tbody tr th").eq(1).html());
      // console.log(i);
      if (
        $(".calendar-two tbody tr th").eq(i).html() ==
        $(".calendar-two tbody tr th")
          .eq(i + 1)
          .html()
      ) {
        startRow = i; //开始节点

        //循环找到最后一个相同的节点
        for (var j = i; j < rows; j++) {
          if (
            $(".calendar-two tbody tr th").eq(j).html() !=
            $(".calendar-two tbody tr th")
              .eq(j + 1)
              .html()
          ) {
            endRow = j;
            // 执行合并方法
            hebing(startRow, endRow);
            break;
          }
        }
      } else {
        continue;
      }
    }
  }
  //合并单元格
  function hebing(startRow, endRow) {
    var rows = endRow - startRow;

    // console.log("startRow"+startRow);
    // console.log("end:"+endRow);
    // console.log(rows);

    //先给除第一个外其他的节点加属性id
    for (var i = startRow + 1; i <= endRow; i++) {
      $(".calendar-two tbody tr th").eq(i).attr("id", i);
    }
    $(".calendar-two tbody tr th")
      .eq(startRow)
      .attr("rowspan", rows + 1); //合并单元格
    for (var i = startRow + 1; i <= endRow; i++) {
      $("#" + i).remove(); //按照上面的id属性删除节点
    }
  }

  /* ----------------------------------------------------------- */

  // 单元格点击
  $(".calendar-two tbody tr .day-box").on("click", (e) => {
    let isRed = e.target.className === "isRed";
    let msg = isRed ? "是否将节假日改为工作日？" : "是否将工作日改为节假日？";
    ElMessageBox.confirm(msg, "修改校历", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then((res) => {
      if (isRed) {
        e.target.setAttribute("class", "");
      } else {
        e.target.setAttribute("class", "isRed");
      }
    });
  });
});

</script>

<style lang="scss" scoped>
@import "./bootstrap.min.css";
</style>
<style lang="scss">
.calendar-table {
  .text-center {
    th,
    td {
      text-align: center;
      border: 1px solid #ccc;
    }
  }
  td > div {
    line-height: 22px;
    padding: 5px;
    min-height: 40px;
  }
  .day-box {
    cursor: pointer;
    .isRed {
      color: rgb(210, 16, 16);
    }
  }
}
</style>
