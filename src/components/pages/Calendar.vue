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
        <div v-if="isLastMonth(n)" ref="lastMonthColor" :class="$style.calendar__lastMonth">
          {{ lastMonthLastDay + positionDiffNumber(n) }}
        </div>
        <div v-if="isThisMonth(n)" :class="$style.calendar__day">
          {{ positionDiffNumber(n) }}
        </div>
        <div v-if="isNextMonth(n)" :class="$style.calendar__nextMonth">
          {{ positionDiffNumber(n) - thisMonthLastDay }}
        </div>
        <div v-if="isHoliday">休日</div>
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
      today: new Date(),
      standardValue: 0,
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
    this.$refs.header.innerHTML = `${this.year}年 ${this.month + 1}月`;
    fetch('https://holidays-jp.github.io/api/v1/date.json')
      .then((response) => response.text())
      .then((data) => console.log(data));
  },
  methods: {
    prev() {
      const showDate = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
      showDate.setMonth(showDate.getMonth() + (this.standardValue -= 1));
      this.year = showDate.getFullYear();
      this.month = showDate.getMonth();
      this.$refs.header.innerHTML = `${this.year}年 ${this.month + 1}月`;
    },
    next() {
      const showDate = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
      showDate.setMonth(showDate.getMonth() + (this.standardValue += 1));
      this.year = showDate.getFullYear();
      this.month = showDate.getMonth();
      this.$refs.header.innerHTML = `${this.year}年 ${this.month + 1}月`;
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
    isNextMonth(n) {
      return this.positionDiffNumber(n) > this.thisMonthLastDay;
    },
    isThisMonth(n) {
      return this.positionDiffNumber(n) > 0 && this.positionDiffNumber(n) <= this.thisMonthLastDay;
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
  padding-top: 5px;
}
.calendar__day {
  padding-top: 10px;
}
.calendar__nextMonth {
  background-color: #f3f3f3;
  height: 100%;
  padding-top: 10px;
}
.calendar__lastMonth {
  background-color: #f3f3f3;
  height: 100%;
  margin-top: -15px;
  padding-top: 25px;
}
</style>
