import list from './list.json'  // 配置项里面写上："resolveJsonModule": true。Ts 不支持 json 的模块

export class DataStore {
    static list = list
}