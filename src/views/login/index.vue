<template>
  <div class="login">
    <!-- 顶部导航栏 -->
    <van-nav-bar title="登录" />
    <!-- 手机号 -->
    <van-cell-group>
      <van-field v-model="user.mobile" placeholder="请输入手机号" left-icon="newspaper-o" />

      <!-- 验证码 -->
      <van-cell-group class="identifyingCode">
        <van-field class="yanzheng"
        v-model="user.code"
        left-icon="coupon-o"
        placeholder="请输入短信验证码">
          <!-- 倒计时 -->
          <van-count-down
          v-if="isCountDownShow"
          slot="button"
           :time=" 60 * 1000"
           format="ss s"

           />

          <van-button
          slot="button"
          size="small"
          type="primary"
           class="anniu"
          v-else
          @click="onSendSmsCode"
           >获取验证码</van-button>
        </van-field>
      </van-cell-group>
      <van-button type="primary" size="large" @click="onLogin">登录</van-button>
    </van-cell-group>
  </div>
</template>

<script>
import { login, getSmsCode } from '../../api/user' //
export default {
  name: 'LoginPage',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      isCountDownShow: false
    }
  },
  methods: {
    // 用户登录
    async onLogin () {
      const user = this.user
      // loading 转圈圈提示
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '加载中...',
        forbidClick: true // 是否禁止背景点击
      })

      try {
        const res = await login(user)
        console.log(res)
        this.$toast.success('登录成功', res)
      } catch (err) {
        console.log('登录失败', err)
        this.$toast.fail('登录失败，手机号或验证码错误')
      }
    },
    // 获取验证码
    async onSendSmsCode () {
      try {
        this.isCountDownShow = true // 显示倒计时
        // this.$toast('发送成功')
        await getSmsCode(this.user.mobile)
      } catch (err) {
        // 发送失败把倒计时取消
        this.isCountDownShow = false

        // 用户重复请求提示用户的 （列如刷新重新输入请求）
        if (err.response.status === 429) {
          this.$toast('请勿频繁发送')
          return
        }
        this.$toast('发送失败')
      }
    }

  }
}
</script>

<style lang="less" scoped>
@import url("../../styles/base.less");
.login {
  .van-cell {
    padding-left: 20px;
    // 手机号图标字体
    .van-field__left-icon {
      font-size: 20px;
      margin-left: 19px;
    }
  }
  .identifyingCode {
    // 验证码按钮
    .van-field__button {
      border-left: 1px solid #000;
    }
    .van-button--small {
      background-color: #ededed;
      color: #666666;
      border: none;
      border-radius: 12px;
    }
  }
}

.van-field__button {
  border-left: 1px solid #000;
}
</style>
