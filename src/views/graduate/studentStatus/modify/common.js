/* 学籍信息公共数据和处理 */

/* 字典 */
const _dics = {
    transactionType: [
        { label: '退学', value: '退学' },
        { label: '复学', value: '复学' },
        { label: '保留学籍（休学）', value: '保留学籍（休学）' },
        { label: '转学', value: '转学' },
        { label: '信息修改', value: '信息修改' },
    ],
    status: [
        {label: '待提交', value: '待提交'},
        {label: '待审核', value: '待审核'},
        {label: '审核通过', value: '审核通过'},
        {label: '驳回', value: '驳回'},
        {label: '审核中', value: '审核中'},
        {label: '审核完成', value: '审核完成'},
    ]
};

import { reactive } from "vue";

export default function useStudentModifyCommon() {
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