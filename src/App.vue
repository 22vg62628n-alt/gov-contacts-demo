<template>
  <el-container class="app-container">
    <!-- 侧边栏 - 首页不显示 -->
    <el-aside v-if="!isHome" width="220px">
      <el-menu
        :default-active="activeMenu"
        :unique-opened="true"
        :collapse="false"
        background-color="#fff"
        text-color="#1d2129"
        active-text-color="#4080ff"
        router
      >
        <el-menu-item index="/">
          <el-icon><House /></el-icon>
          <span>单位概况</span>
        </el-menu-item>
        
        <el-sub-menu index="contacts">
          <template #title>
            <el-icon><User /></el-icon>
            <span>通讯录</span>
          </template>
          <el-menu-item index="/persons">组织架构</el-menu-item>
          <el-menu-item v-if="canManage" index="/approval-center">审批中心</el-menu-item>
          <el-menu-item v-if="canManage" index="/external-people">外部人员管理</el-menu-item>
          <el-menu-item v-if="canManage" index="/special-org-reminder">临时组织提醒</el-menu-item>
          <el-menu-item index="/line-contacts-manage">条线通讯录管理</el-menu-item>
          <el-menu-item index="/line-contacts">行政区划/条线管理</el-menu-item>
          <el-menu-item index="/visibility">可见性配置</el-menu-item>
          <el-menu-item index="/display-settings">展示配置</el-menu-item>
          <el-menu-item index="/custom-fields">自定义字段</el-menu-item>
        </el-sub-menu>
        
        <el-sub-menu index="security">
          <template #title>
            <el-icon><Lock /></el-icon>
            <span>安全管控</span>
          </template>
        </el-sub-menu>
        
        <el-sub-menu index="report">
          <template #title>
            <el-icon><DataAnalysis /></el-icon>
            <span>数据报表</span>
          </template>
        </el-sub-menu>
        
        <el-sub-menu index="space">
          <template #title>
            <el-icon><Folder /></el-icon>
            <span>空间管理</span>
          </template>
        </el-sub-menu>
        
        <el-sub-menu index="code">
          <template #title>
            <el-icon><List /></el-icon>
            <span>编码管理</span>
          </template>
          <el-menu-item index="/area-codes">行政区划编码</el-menu-item>
          <el-menu-item index="/line-codes">条线编码</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    
    <!-- 主内容区 -->
    <el-container v-bind:class="isHome ? 'home-container' : ''">
      <el-main class="main-content">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { User, House, List, Lock, DataAnalysis, Folder } from '@element-plus/icons-vue'
import { getCurrentRole } from './utils/authStore'

const route = useRoute()

const activeMenu = computed(() => route.path)
const isHome = computed(() => route.path === '/')
const canManage = computed(() => ['platform_admin', 'org_admin'].includes(getCurrentRole()))
</script>

<style scoped>
:deep(.el-menu-item.is-active) {
  background: #e8f1ff !important;
  color: #4080ff !important;
}

:deep(.el-sub-menu__title:hover) {
  background: #f2f3f5 !important;
}

:deep(.el-menu-item:hover) {
  background: #f2f3f5 !important;
  color: #1d2129 !important;
}

.home-container {
  width: 100%;
}
</style>
