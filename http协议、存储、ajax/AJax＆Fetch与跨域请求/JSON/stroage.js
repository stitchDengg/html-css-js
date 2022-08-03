
const stroage = window.localStorage;
// 设置
const set = (key,value) => {
    stroage.setItem(key,JSON.stringify(value))
}

// 获取
const get = key => {
    return JSON.parse(stroage.getItem(key));
}

// 移除
const remove = key => {
    stroage.removeItem(key);
}

// 清空
const clear = () => {
    stroage.clear();
}

export {set,get,remove,clear};