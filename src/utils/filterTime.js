// 外部js
const moment = require("moment");

// 获取今天零点和现在的时间戳
const today = () => {
  return [+moment().startOf("days").format("X"), +moment().format("X")];
};

// 获取昨天零点和昨天十一点五十九分五十九秒的时间戳
const yesterday = () => {
  return [
    +moment().subtract(1, "days").startOf("days").format("X"),
    +moment().subtract(1, "days").endOf("days").format("X"),
  ];
};

// 获取本周开始和现在的时间戳
const week = () => {
  return [+moment().startOf("week").format("X"), +moment().format("X")];
};

// 获取上周开始和上周结束的时间戳
const lastWeek = () => {
  return [
    +moment()
      .week(moment().week() - 1)
      .startOf("week")
      .format("X"),
    +moment()
      .week(moment().week() - 1)
      .endOf("week")
      .format("X"),
  ];
};

// 获取本月开始和现在的时间戳
const month = () => {
  return [+moment().startOf("month").format("X"), +moment().format("X")];
};

// 获取上个月开始和上个月结束的时间戳
const lastMonth = () => {
  return [
    +moment()
      .month(moment().month() - 1)
      .startOf("month")
      .format("X"),
    +moment()
      .month(moment().month() - 1)
      .endOf("month")
      .format("X"),
  ];
};

// 获取最近七天开始和结束的时间戳
const lastSevenDays = () => {
  return [+moment().subtract(6, "days").format("X"), +moment().format("X")];
};

// 获取最近三个月开始和结束的时间戳
const lastThreeMonths = () => {
  return [
    +moment(new Date()).subtract(2, "months").endOf("days").format("X"),
    +moment().format("X"),
  ];
};

const customDate = (date) => {
  return +moment(date).format("X");
};

export default {
  today,
  yesterday,
  week,
  lastWeek,
  month,
  lastMonth,
  lastSevenDays,
  lastThreeMonths,
  customDate,
};
