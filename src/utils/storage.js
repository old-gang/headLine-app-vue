// 本地存储封装模块
export const getItem = (name) => {
  const data = window.localStorage.getItem(name);
  // 处理一下返回的data，如果是对象，我们希望直接拿到对象，如果不是，则原样返回
  try {
    // 如果data不是json格式字符串，就会进入catch
    return JSON.parse(data);
  } catch (error) {
    return data;
  }
};

export const setItem = (name, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value);
  }
  window.localStorage.setItem(name, value);
};

export const removeItem = (name) => {
  window.localStorage.removeItem(name);
};
