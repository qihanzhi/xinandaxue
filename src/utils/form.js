/**
 * 表单详情的一些处理
 */

/**
 * 通过id,获取对应的label
 * @param value id 或者 value
 * @param options 枚举项
 * @returns 返回对应的label值
 */
export const valueToLabel = (value, options) => {
    if ((!value && value !== 0) || !options) {
        return value;
    }
    const findItem = options.find(option => (option.id === value || option.value === value));
    if (findItem) {
        return findItem.label;
    }

    return value;
}

/**
 * 单选获取label
 * @param value id 或者 value
 * @param options 枚举项
 * @returns 返回对应的label值
 */
export const selectToLabel = (value, options) => {
    
    return valueToLabel(value, options);
}

/**
 * 多选获取label
 * @param ids 多个id
 * @param options 枚举项
 * @param symbol 拼接成字符串的符号
 * @returns 返回对应的labels值
 */
export const multiToLabel = (ids, options, symbol = ',') => {
    if (!ids || !options || !(ids instanceof Array)) {
        return ids;
    }
    
    const labels = [];
    options.forEach((item) => {
        if (ids.find(id => (item.id === id || item.value === id))) {
            labels.push(item.label);
        }
    });

    return labels.join(symbol);
}


/**
 * 多选转为字符串输出
 * @param labels 多个label
 * @param symbol 拼接成字符串的符号
 * @returns 返回对应的labels值
 */
export const multiToString = (labels,  symbol = ',') => {
    if (!labels) {
        return labels;
    }

    return labels.join(symbol);
}


/**
 * 文本域内容保持格式输出
 * @param text 文本
 * @returns 返回转换后的文本
 */
export const textAreaFormat = (text) => {
    if (!text) {
        return text;
    }
    return text.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;')
}


/**
 * 生成 GUID
 * @returns guid字符串
 */
export function guid(str = '') {
	let s = [];
	const hexDigits = '0123456789abcdef'

	for (let i = 0; i < 36; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
	}

	s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
	s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
	s[8] = s[13] = s[18] = s[23] = '-'

	return str + s.join('');
}

