/* 学籍信息公共数据和处理 */

/* 字典 */
const _dics = {
    // 方案类型
    programType: [        
        {label: '本科生任务', value: '本科生任务'},
        {label: '研究生任务', value: '研究生任务'},
        {label: '本研共修任务', value: '本研共修任务'},
    ],
    // 学院
    college: [
        {label: '数理学院', value: '数理学院'},
        {label: '计算机科学与技术学院', value: '计算机科学与技术学院'}
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
        {label: '大一', value: '大一'},
        {label: '大二', value: '大二'},
        {label: '大三', value: '大三'},
        {label: '大四', value: '大四'},
        {label: '大五', value: '大五'},
    ],
    // 学期
    term: [
        {label: '2023上学期', value: '2023上学期'},
        {label: '2023下学期', value: '2023下学期'},
        {label: '2024上学期', value: '2024上学期'},
        {label: '2023下学期', value: '2023下学期'},
        {label: '2025上学期', value: '2025上学期'},
        {label: '2025下学期', value: '2025下学期'},
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