/** 2017-07-27 郭燕子**/
/** 判空校验**/
export function isEmpty (str) {
  if (str === '') {
    return true;
  } else {
    return false;
  }
}
/** 校验手机号**/
export function isTelephone (str) {
  const reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
  if (str === '') {
    return '手机号不可以为空';
  } else if (reg.test(str.trim())) {
   return;
  } else {
    return '手机号不正确';
  }
};
/** 验证身份证**/
export function IdCardCheck (cardNum) {
  if (cardNum === '') {
    return '身份证不合法';
  }
  if (cardNum.length !== 15 && cardNum.length !== 18) {
    return '身份证不合法';
  }
  var area = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外'
  };
  if (area[parseInt(cardNum.substr(0, 2))] === null) {
    return '身份证不合法';
  }
  if (cardNum.length === 15) {
    var pattern = /^\d{15}$/;
    if (pattern.exec(cardNum) === null) {
      return '身份证不合法';
    }
    var birth = parseInt('19' + cardNum.substr(6, 2));
    var month = cardNum.substr(8, 2);
    var day = parseInt(cardNum.substr(10, 2));
    switch (month) {
      case '01':
      case '03':
      case '05':
      case '07':
      case '08':
      case '10':
      case '12':
        if (day > 31) {
          return '身份证不合法';
        }
        break;
      case '04':
      case '06':
      case '09':
      case '11':
        if (day > 30) {
          return '身份证不合法';
        }
        break;
      case '02':
        if ((birth % 4 === 0 && birth % 100 !== 0) || birth % 400 === 0) {
          if (day > 29) {
            return '身份证不合法';
          }
        } else {
          if (day > 28) {
            return '身份证不合法';
          }
        }
        break;
      default:
        return '身份证不合法';
    }
    var nowYear = new Date().getYear();
    if (nowYear - parseInt(birth) < 15 || nowYear - parseInt(birth) > 100) {
      return '身份证不合法';
    }
  }
  var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];
  var lSum = 0;
  var nNum = 0;
  for (var i = 0; i < 17; ++i) {
    if (cardNum.charAt(i) < '0' || cardNum.charAt(i) > '9') {
      return '身份证不合法';
    } else {
      nNum = cardNum.charAt(i) - '0';
    }
    lSum += nNum * Wi[i];
  }
  if (cardNum.charAt(17) === 'X' || cardNum.charAt(17) === 'x') {
    lSum += 10 * Wi[17];
  } else if (cardNum.charAt(17) < '0' || cardNum.charAt(17) > '9') {
    return '身份证不合法';
  } else {
    lSum += (cardNum.charAt(17) - '0') * Wi[17];
  }
  if ((lSum % 11) === 1) {
//  return true; 正确的身份证
  } else {
    return '身份证不合法';
  }
//  ============================================以上为验证身份证合法性===============================================
  if (cardNum.trim().length === 15) {
    var sexNum = cardNum.trim().substring(14, 15);
    if (sexNum % 2 === 0) {
      return '0';
    } else {
      return '1';
    }
  } else if (cardNum.trim().length === 18) {
    var sexNum2 = cardNum.trim().substring(16, 17);
    if (sexNum2 % 2 === 0) {
      return '0';
    } else {
      return '1';
    }
  } else {
    return '身份证不合法';
  }
}
/** 验证身份证是否为成人**/
export function IdCardCheckAge (cardNum, airDate) {
  var birthYear = cardNum.substring(6, 10);
  var nowYear = airDate.substring(0, 4);
  if (nowYear - birthYear >= 12) {
    var birthMonth = cardNum.substring(10, 12);
    var nowMonth = airDate.substring(5, 7);
    if (nowYear - birthYear === 12 && nowMonth - birthMonth > 0) {
      return 'ADT';
    } else if (nowYear - birthYear === 12 && nowMonth - birthMonth < 0) {
      return 'CNN';
    } else if (nowYear - birthYear > 12) {
      return 'ADT';
    } else if (nowYear - birthYear === 12 && nowMonth - birthMonth === 0) {
      var birthDay = cardNum.substring(12, 14);
      var nowDay = airDate.substring(9, 11);
      if (nowDay - birthDay > 0) {
        return 'ADT';
      } else {
        return 'CNN';
      }
    }
  } else {
    return 'CNN';
  }
}

/** 验证身份证性别**/
export function IdCardCheckSex (cardNum) {
  var sexno;
  if (cardNum.length === 18) {
    sexno = cardNum.substring(16, 17);
  } else if (cardNum.length === 15) {
    sexno = cardNum.substring(14, 15);
  } else {
    return false;
  }
  var tempid = sexno % 2;
  if (tempid === 0) {
    return '2';
  } else {
    return '1';
  }
}

/** 验证身份证生日**/
export function IdCardCheckBir (cardNum) {
  var birthdayNew = '';
  if (cardNum !== null && cardNum !== '') {
    if (cardNum.length === 15) {
      var birthday = '19' + cardNum.substring(6, 12);
      birthdayNew = birthday.replace(/(.{4})(.{2})/, '$1-$2-');
    } else if (cardNum.length === 18) {
      birthday = cardNum.substring(6, 14);
      birthdayNew = birthday.replace(/(.{4})(.{2})/, '$1-$2-');
    }
    return birthdayNew;
  }
}

/** 邮箱校验**/
export function isWscnEmail (str) {
  const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  if (str === '') {
    return '邮箱不可以为空';
  } else if (reg.test(str.trim())) {
    return;
  } else {
    return '邮箱不正确';
  }
}
