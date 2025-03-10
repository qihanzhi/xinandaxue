/* 学籍信息公共数据和处理 */

/* 字典 */
const _dics = {
    gender: [
        { label: '男', value: '男' },
        { label: '女', value: '女' },
    ],
    degreeCategory: [
        { label: '专业学位', value: '专业学位' },
        { label: '学士学位', value: '学士学位' },
    ],
    // 学位类型
    degreeType: [
        { label: '硕士', value: '硕士' },
        { label: '博士', value: '博士' },
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