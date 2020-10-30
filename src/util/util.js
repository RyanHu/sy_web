import crypto from 'crypto-js'

export default {

    valueDisplayObj(_txt, _value) {
        let obj = {
            txt: _txt,
            value: _value,
            setText(newTxt) {
                this.txt = newTxt;
            },
            setValue(newValue) {
                this.value = newValue;
            },
            setTextAndValue(newTxt, newValue) {
                this.txt = newTxt;
                this.value = newValue;
            },
            toString(showTxt = false) {
                return showTxt ? this.txt : this.value;
            }
        }
        return obj;
    },
    /**
     * 把src对象的字段和值copy给target
     */
    packBeans(src, target) {
        let that = this
        Object.keys(src).forEach(key => {
            switch (typeof src[key]) {
                case 'string':
                case 'number':
                case 'boolean':
                    if (!that.isEmpty(src[key])) {
                        target[key] = src[key];
                    }
                    break;
                case 'object':
                    if (!that.isEmpty(src[key])) {
                        target[key] = src[key].toString();
                    }
                    break;
                case 'undefined':
                case 'function':
                case 'symbol':
                default:
                    break
            }

        });
        return target;
    }
    ,

    aopFunConstructor(originFun, before, after) {
        function _class() {
            let argment = arguments
            let promise = new Promise(function (thenFun) {
                if (before instanceof Function) {
                    before.apply(this, argment);
                }
                let fun = originFun.apply(this, argment);
                if (fun instanceof Promise) {
                    fun.then(res => {
                        thenFun(res)
                    })
                }
                if (after instanceof Function) {
                    after.apply(this, argment);
                }
            })
            return promise
        }

        return _class;
    }
    ,
    objKeySort(obj) {
        let newKey = Object.keys(obj).sort();
        let newObj = {}
        for (let i = 0; i < newKey.length; i++) {
            newObj[newKey[i]] = obj[newKey[i]]
        }
        return newObj
    },

    getMd5(obj) {
        let keys = Object.keys(obj);
        let sourceString = ''
        keys.forEach(key => {
            sourceString += key + "=" + obj[key]
        })
        let md5ret = crypto.MD5(sourceString)
        let md5tostring = md5ret.toString()
        return md5tostring
    },

    formatDate(date, fmt) {
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        let o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds()
        }
        for (let k in o) {
            if (new RegExp(`(${k})`).test(fmt)) {
                let str = o[k] + ''
                fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : function (str) {
                    return ('00' + str).substr(str.length)
                })
            }
        }
        return fmt
    },
    getyyyyMMdd(d) {
        let curr_date = d.getDate();
        let curr_month = d.getMonth() + 1;
        let curr_year = d.getFullYear();
        String(curr_month).length < 2 ? (curr_month = "0" + curr_month) : curr_month;
        String(curr_date).length < 2 ? (curr_date = "0" + curr_date) : curr_date;
        let yyyyMMdd = curr_year + "" + curr_month + "" + curr_date;
        return yyyyMMdd;
    },
    getyyyyMMddHHmmss(d) {
        let curr_date = d.getDate();
        let curr_month = d.getMonth() + 1;
        let curr_year = d.getFullYear();
        let curr_Hour = d.getHours();
        let curr_Minutes = d.getMinutes();
        let curr_Seconds = d.getSeconds();

        String(curr_month).length < 2 ? (curr_month = "0" + curr_month) : curr_month;
        String(curr_date).length < 2 ? (curr_date = "0" + curr_date) : curr_date;
        let yyyyMMdd = curr_year + "-" + curr_month + "-" + curr_date + " "+curr_Hour+":"+curr_Minutes+":"+curr_Seconds;
        return yyyyMMdd;
    }

    ,
    isLegalId(id) {
        let year = id.substr(6, 4);
        let currentYear = new Date().getFullYear()
        console.log('当前年份: ' + currentYear + ',身份证年份:' + year)
        return currentYear - year > 16 && currentYear - year < 70
    },
    /**
     * 检测是否为有限公司
     */
    isCoLtd(name) {
        return name.indexOf("有限公司") !== -1;
    },
    isEmpty(obj) {
        if (typeof obj == "undefined" || obj == null || obj == "") {
            return true;
        } else {
            return false;
        }
    },
    getIntBit32(src, bit = 32) {
        let int32 = parseInt(src)
        if (isNaN(int32)) {
            throw new Error('数据源错误，请传入一个int')
        }
        if (bit > 36) {
            throw new Error('只能获取36进制以下的数据')
        }
        return (int32).toString(bit);
    }
    ,
    luhnCheck(bankno) {
        bankno = bankno || ''
        if (!bankno) {
            return false;
        }
        var lastNum = bankno.substr(bankno.length - 1, 1); //取出最后一位（与luhn进行比较）
        var first15Num = bankno.substr(0, bankno.length - 1); //前15或18位
        var newArr = new Array();
        for (var i = first15Num.length - 1; i > -1; i--) { //前15或18位倒序存进数组
            newArr.push(first15Num.substr(i, 1));
        }
        var arrJiShu = new Array(); //奇数位*2的积 <9
        var arrJiShu2 = new Array(); //奇数位*2的积 >9
        var arrOuShu = new Array(); //偶数位数组
        for (var j = 0; j < newArr.length; j++) {
            if ((j + 1) % 2 == 1) { //奇数位
                if (parseInt(newArr[j]) * 2 < 9) arrJiShu.push(parseInt(newArr[j]) * 2);
                else arrJiShu2.push(parseInt(newArr[j]) * 2);
            } else //偶数位
                arrOuShu.push(newArr[j]);
        }

        var jishu_child1 = new Array(); //奇数位*2 >9 的分割之后的数组个位数
        var jishu_child2 = new Array(); //奇数位*2 >9 的分割之后的数组十位数
        for (var h = 0; h < arrJiShu2.length; h++) {
            jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
            jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
        }

        var sumJiShu = 0; //奇数位*2 < 9 的数组之和
        var sumOuShu = 0; //偶数位数组之和
        var sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
        var sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
        var sumTotal = 0;
        for (var m = 0; m < arrJiShu.length; m++) {
            sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
        }

        for (var n = 0; n < arrOuShu.length; n++) {
            sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
        }

        for (var p = 0; p < jishu_child1.length; p++) {
            sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
            sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
        }
        //计算总和
        sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);

        //计算luhn值
        var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
        var luhn = 10 - k;

        if (lastNum == luhn) {
            return true;
        } else {
            return false;
        }
    }

    ,

    toHHmm (time) {
        time =time + 8*60*60*1000
        let s;
        let hours = parseInt((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = parseInt((time % (1000 * 60 * 60)) / (1000 * 60));
        s = (hours < 10 ? ('0' + hours) : hours) + ':' + (minutes < 10 ? ('0' + minutes) : minutes) ;
        return s;
    },
     formatTime(time, fmt) {
        if (!time) return '';
        else {
            const date = new Date(time);
            const o = {
                'M+': date.getMonth() + 1,
                'd+': date.getDate(),
                'H+': date.getHours(),
                'm+': date.getMinutes(),
                's+': date.getSeconds(),
                'q+': Math.floor((date.getMonth() + 3) / 3),
                S: date.getMilliseconds(),
            };
            if (/(y+)/.test(fmt))
                fmt = fmt.replace(
                    RegExp.$1,
                    (date.getFullYear() + '').substr(4 - RegExp.$1.length)
                );
            for (const k in o) {
                if (new RegExp('(' + k + ')').test(fmt)) {
                    fmt = fmt.replace(
                        RegExp.$1,
                        RegExp.$1.length === 1
                            ? o[k]
                            : ('00' + o[k]).substr(('' + o[k]).length)
                    );
                }
            }
            return fmt;
        }
    }

}
