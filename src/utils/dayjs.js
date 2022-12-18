import dayjs from 'dayjs';

// 引入使用中文语言包
import 'dayjs/locale/zh-cn';
// 相对时间
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

// 使用中文语言包
dayjs.locale('zh-cn');

export default dayjs