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
    quarter: [
        {label: 'Q1', value: 'Q1'},
        {label: 'Q2', value: 'Q2'},
        {label: 'Q3', value: 'Q3'},
        {label: 'Q4', value: 'Q4'},
    ],
    dimension: [ // 统计维度
        {label: '是否正常上课', value: 'normalClasses'},
        {label: '是否正常参加班集体活动', value: 'normalActivity'},
        {label: '是否已交学费', value: 'payTuition'},
        {label: '是否已交住宿费', value: 'payAccommodationFee'},
        {label: '未交费原因', value: 'unPayReason'},
        {label: '备注', value: 'remarks'},
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