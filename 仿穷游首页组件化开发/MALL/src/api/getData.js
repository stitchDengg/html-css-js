import { getJSON } from './ajax';
import { SUCC_CODE,TIME_OUT } from './config';
// 获取数据

const getData = (url, options) => {
    return getJSON(url, {
        // 设置超时时间
        timeoutTime: TIME_OUT,
        ...options
    }).then(res => {
        // {
        //     code:200,
        //     data:[]
        // }
        if(res.code != SUCC_CODE){
            throw new Error(`出错了：${res.code}`)
        }
        // 在外面调用getData时就可以直接拿到数据
        return res.data;
    }).catch(err => {
        console.log(err);
    });
}

export {getData};