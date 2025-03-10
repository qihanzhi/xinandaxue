/* 学籍信息公共数据和处理 */

/* 字典 */
const _dics = {
    // 方案类型
    programType: [
        {label: '全日制', value: '全日制'},
        {label: '非全日制', value: '非全日制'},
        {label: '专业型', value: '专业型'},
        {label: '学术型', value: '学术型'},
    ],
    // 学院
    college: [
        {label: '机械工程学院', value: '机械工程学院'},
        {label: '车辆工程学院', value: '车辆工程学院'},
        {label: '信息科技学院', value: '信息科技学院'},
        {label: '土木工程学院', value: '土木工程学院'},
    ],
    // 专业
    major: [
        {label: '自动化', value: '自动化', parent: '机械工程学院'},
        {label: '机械自动化', value: '机械自动化', parent: '机械工程学院'},
        {label: '机械工程', value: '机械工程', parent: '机械工程学院'},
        {label: '车辆工程', value: '车辆工程', parent: '车辆工程学院'},
        {label: '电子信息技术', value: '电子信息技术', parent: '信息科技学院'},
        {label: '计算机科学与技术', value: '计算机科学与技术', parent: '信息科技学院'},
        {label: '市政工程', value: '市政工程', parent: '土木工程学院'},
        {label: '岩土工程', value: '岩土工程', parent: '土木工程学院'},
        {label: '桥梁与隧道工程', value: '桥梁与隧道工程', parent: '土木工程学院'},
    ],
    // 年级
    schoolYear: [
        {label: '研究生一年级', value: '研究生一年级'},
        {label: '研究生二年级', value: '研究生二年级'},
        {label: '研究生三年级', value: '研究生三年级'},
        {label: '研究生四年级', value: '研究生四年级'},
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

    
    /**
     * @method 联动获取下拉项
     * @param parentVal 父级的选中值
     * @param options 所有下拉项 ({label, value, parent})
     */
    const getCascadeOptions = (parentVal, options) => {
        let filterOptions = [];
        if ((!parentVal && parentVal !== 0) || !options) {
            return filterOptions;
        }

        filterOptions = options.filter(item => {
            if (item.parent === parentVal) {
                return item;
            }
        });
        return filterOptions;
    }

    return {
        dics,
        getIndexByAttr,
        getCascadeOptions,
    }
}