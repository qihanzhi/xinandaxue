/* 学籍信息公共数据和处理 */

/* 字典 */
const _dics = {
    studentType: [
        { label: '专科生', value: '专科生' },
        { label: '本科生', value: '本科生' },
        { label: '硕士研究生', value: '硕士研究生' },
        { label: '博士研究生', value: '博士研究生' },
    ],
    hasReview: [
        {label: '有', value: '1'},
        {label: '无', value: '0'},
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