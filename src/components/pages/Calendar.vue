<template>
  <div :class="$style.calendarWrapper">
    <div :class="$style.calendarHeader">
      <button :class="$style.calendarHeader__today">今日</button>
      <div :class="$style.calendarHeader__pagination">
        <button :class="$style.calendarHeader__paginationLeft" @click="pre">&lt;</button>
        <button :class="$style.calendarHeader__paginationRight" @click="next">&gt;</button>
      </div>
      <p :class="$style.calendarHeader__thisMonth">{{ year }}年{{ month }}月</p>
    </div>
    <div :class="$style.calendar">
      <div v-for="n in 42" :key="n" :class="$style.calendar__box">
        <div v-if="n < 8" :class="$style.calendar__week">
          {{ week[n - 1] }}
        </div>
        <div :class="$style.calendar__day">
          {{ n }}
        </div>
      </div>
    </div>
  </div>
</template>
s
<script>
export default {
  data() {
    return {
      year: '',
      month: '',
      week: ['日', '月', '火', '水', '木', '金', '土'],
    };
  },
  mounted() {
    const today = new Date(); // 今日の日付
    const first = new Date(today.getFullYear(), today.getMonth(), 1); // 今月の1日のデータ
    this.year = first.getFullYear(); // 今年
    this.month = first.getMonth() + 1; // 今月
    const dayOfWeek = first.getDay();
    const dayOfWeekStr = this.week[dayOfWeek]; // 今月の1日の曜日
    console.log(dayOfWeekStr);
    const getLastDay = (year, month) => {
      return new Date(year, month, 0).getDate();
    };
    const lastDay = getLastDay(this.year, this.month);
  },
};
</script>

<style module lang="scss">
.calendarHeader {
  border-bottom: solid 1px #e6e8ea;
  display: flex;
  align-items: center;
  padding: 20px;
  &__paginationLeft {
    font-size: 20px;
    padding: 10px;
  }
  &__paginationRight {
    font-size: 20px;
    padding: 10px;
  }
  &__today {
    border: solid 1px #e6e8ea;
    border-radius: 9px;
    padding: 10px;
  }
  &__thisMonth {
    font-size: 15px;
  }
}
.calendar {
  text-align: center;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 130px);
  &__box {
    border: 1px solid #e6e8ea;
  }
  &__week {
    margin-top: 5px;
    font-size: 10px;
  }
  &__day {
    margin-top: 10px;
  }
}
</style>
