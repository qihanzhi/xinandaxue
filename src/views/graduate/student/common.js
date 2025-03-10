/* 学籍信息公共数据和处理 */

/* 字典 */
const _dics = {
    transactionType: [
        { label: '学习需要', value: '学习需要' },
        { label: '科研工作', value: '科研工作' },
        { label: '实习机会', value: '实习机会' },
        { label: '家庭原因', value: '家庭原因' },
        { label: '其他特殊情况', value: '其他特殊情况' },
    ],
    status: [
        {label: '待提交', value: '待提交'},
        {label: '待审核', value: '待审核'},
        {label: '审核通过', value: '审核通过'},
        {label: '驳回', value: '驳回'},
        {label: '审核中', value: '审核中'},
        {label: '审核完成', value: '审核完成'},
    ],
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