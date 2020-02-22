// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 函数后面不需要加空格
    'space-before-function-paren': 'off',
    // 用于选项卡式缩进
    'indent': ['error', 'tab'],
    // 关闭tab的检测
    'no-tabs': 'off',
    // 允许但不要求在属性后面加逗号
    "comma-dangle": ["error", "only-multiline"],
    'no-multi-spaces': 'off',
    // 关闭构造函数不存储和使用： 防止 new My() 报错
    'no-new': "off",
    // 防止 eval 报错
    'no-eval': 'off',
    // 防止 在原型上操作的错误Array.prototype.remove = fn
    'no-extend-native': 'off',
    'no-proto': 'off'
  }
}
