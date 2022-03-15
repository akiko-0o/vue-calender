<template>
  <div :class="$style.calendarWrapper">
    <div :class="$style.calendarHeader">
      <button :class="$style.calendarHeader__today">今日</button>
      <div :class="$style.calendarHeader__pagination">
        <button :class="$style.calendarHeader__paginationLeft" @click="prev">&lt;</button>
        <button :class="$style.calendarHeader__paginationRight" @click="next">&gt;</button>
      </div>
      <p ref="header" :class="$style.calendarHeader__thisMonth"></p>
    </div>
    <div :class="$style.calendar">
      <div v-for="n in maxCellNumber" :key="n" :class="$style.calendar__box">
        <div v-if="n <= weekDays" :class="$style.calendar__week">
          {{ weekDay(n) }}
        </div>
        <div v-if="isLastMonth(n)" :class="$style.calendar__lastMonth">
          {{ lastMonthLastDay + positionDiffNumber(n) }}
        </div>
        <div
          v-if="positionDiffNumber(n) > 0 && positionDiffNumber(n) <= thisMonthLastDay"
          :class="$style.calendar__day"
        >
          {{ positionDiffNumber(n) }}
        </div>
        <div v-if="positionDiffNumber(n) > thisMonthLastDay" :class="$style.calendar__nextMonth">
          {{ positionDiffNumber(n) - thisMonthLastDay }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const WEEKDAYS = 7;
const MAXCELLNUMBER = 42;
const WEEK = ['日', '月', '火', '水', '木', '金', '土'];
export default {
  data() {
    return {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
    };
  },
  computed: {
    dayOfWeek() {
      return new Date(this.year, this.month, 1).getDay();
    },
    thisMonthLastDay() {
      return new Date(this.year, this.month + 1, 0).getDate();
    },
    lastMonthLastDay() {
      return new Date(this.year, this.month, 0).getDate();
    },
    weekDays() {
      return WEEKDAYS;
    },
    maxCellNumber() {
      return MAXCELLNUMBER;
    },
  },
  mounted() {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    this.$refs.header.innerHTML = `${year}年 ${month + 1}月`;
    const firstDay = new Date(year, month, 1); // 1日を取得
    const startDayOfWeek = new Date(year, month, 1).getDay(); // 1日が何曜始まりか
    const lastMonth = new Date(firstDay);
    lastMonth.setDate(lastMonth.getDate() - startDayOfWeek); // 余ったセルの先月分
  },
  methods: {
    prev() {
      const today = new Date();
      const showDate = new Date(today.getFullYear(), today.getMonth(), 1);
      showDate.setMonth(showDate.getMonth() - 1);
    },
    next() {
      const today = new Date();
      const showDate = new Date(today.getFullYear(), today.getMonth(), 1);
      showDate.setMonth(showDate.getMonth() + 1);
    },
    createProcess(year, month) {
      const startDayOfWeek = new Date(year, month, 1).getDay(); // 表示する月の1日の曜日
      const endDate = new Date(year, month + 1, 0).getDate(); // 表示する月の末日
      const lastMonthEndDate = new Date(year, month, 0).getDate(); // 表示する先月の末尾
    },
    positionDiffNumber(n) {
      return n - this.dayOfWeek;
    },
    isLastMonth(n) {
      return this.positionDiffNumber(n) <= 0;
    },
    weekDay(n) {
      return WEEK[n - 1];
    },
  },
};
</script>

<style module lang="scss">
.calendarHeader {
  align-items: center;
  border-bottom: solid 1px #e6e8ea;
  display: flex;
  padding: 20px;
}
.calendarHeader__paginationLeft {
  font-size: 20px;
  padding: 10px;
}
.calendarHeader__paginationRight {
  font-size: 20px;
  padding: 10px;
}
.calendarHeader__today {
  border: solid 1px #e6e8ea;
  border-radius: 9px;
  padding: 10px;
}
.calendarHeader__thisMonth {
  font-size: 15px;
}

.calendar {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 130px);
  text-align: center;
}
.calendar__box {
  border: 1px solid #e6e8ea;
}
.calendar__week {
  font-size: 10px;
  margin-top: 5px;
}
.calendar__day {
  margin-top: 10px;
}
.calendar__nextMonth {
  margin-top: 10px;
}
</style>
