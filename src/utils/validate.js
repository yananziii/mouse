//两次密码一致匹配
var validatePass2 = (rule, value1, value2,callback) => {
    if (value === '') {
      callback(new Error('请再次输入密码'))
    } else if (value1 !== value2) {
      callback(new Error('两次输入密码不一致!'))
    } else {
      callback()
    }
  }