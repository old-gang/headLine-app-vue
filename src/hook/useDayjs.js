import dayjs from '@/utils/dayjs';

// 相对日期
export function realtiveTime(time) {
  return dayjs(time).from(dayjs());
}

// 格式化日期
export function dateTime(time, format = 'YYYY:MM:DD HH:mm:ss') {
  return dayjs(time).format(format);
}
