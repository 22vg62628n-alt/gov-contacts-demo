<template>
  <div class="not-found-page">
    <el-card class="not-found-card">
      <div class="code">404</div>
      <h2 class="title">页面不存在</h2>
      <p class="desc">你访问的页面可能已移动、下线或地址输入错误。</p>
      <div class="actions">
        <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
        <el-button @click="$router.push('/persons')">返回通讯录</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>
</script>

<style scoped>
.not-found-page {
  min-height: calc(100vh - 120px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.not-found-card {
  width: 100%;
  max-width: 520px;
  text-align: center;
}

.code {
  font-size: 64px;
  font-weight: 700;
  line-height: 1;
  color: #4080ff;
}

.title {
  margin: 12px 0 8px;
}

.desc {
  margin: 0;
  color: #86909c;
}

.actions {
  margin-top: 20px;
}
</style>
