/**
 * Created by Ferryman on 2017/11/7.
 * @method: 乘机人名单校验方法JS汇总
 */

/** --- 乘机人名单是否相同校验 --- **/
export function passengerIsTheSame (passengerList) {
  var sameMark = false;
  var ary = [];
  for (var i = 0; i < passengerList.length; i++) {
    ary.push(passengerList[i].name + passengerList[i].certificate_type + passengerList[i].certificate_num);
  }
  for (var j = 0; j < ary.length; j++) {
    for (var k = 0; k < ary.length; k++) {
      if (ary[j] === ary[k] && j !== k) {
        sameMark = true;
        break;
      }
    }
    if (sameMark) {
      break;
    }
  }
  if (sameMark) {
    return '0';
  } else {
    return '1';
  }
}

/** --- 乘机人身份证是否相同校验 --- **/
export function idIsTheSame (passengerList) {
  var sameId = false;
  var ary = [];
  for (var i = 0; i < passengerList.length; i++) {
    ary.push(passengerList[i].certificate_num);
  }
  for (var j = 0; j < ary.length; j++) {
    for (var k = 0; k < ary.length; k++) {
      if (ary[j] === ary[k] && j !== k) {
        sameId = true;
        break;
      }
    }
    if (sameId) {
      break;
    }
  }
  if (sameId) {
    return '0';
  } else {
    return '1';
  }
}
