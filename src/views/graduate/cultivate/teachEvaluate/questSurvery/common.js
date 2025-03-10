/* 学籍信息公共数据和处理 */

/* 字典 */
const _dics = {
    field2: [
        {value: '分类1', label: '分类1'},
        {value: '分类2', label: '分类2'},
        {value: '分类3', label: '分类3'},
        {value: '分类4', label: '分类4'},
    ],
    field5: [
        {value: '启用', label: '启用'},
        {value: '未启用', label: '未启用'},
    ]
};

import { reactive } from "vue";

export default function useStudentInfoCommon() {
    // 字典
    const dics = reactive(_dics);

    // 根据属性获取序号
    const getIndexByAttr = (data, attr, value) => {
        let res = -1;
        data.some((d, dIndex) => {
            if (d[attr] === value) {
                res = dIndex;
                return true;
            }
        });
        return res;
    }

    return {
        dics,
        getIndexByAttr,
    }
}