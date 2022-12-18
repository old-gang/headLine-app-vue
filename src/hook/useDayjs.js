import dayjs from '@/utils/dayjs';

export default function (time) {
  return dayjs(time).from(dayjs());
}
