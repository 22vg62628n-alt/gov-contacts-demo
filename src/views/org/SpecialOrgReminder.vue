<template>
  <div class="page-wrap">
    <el-card>
      <template #header>
        <div class="header-row">
          <span>临时组织（专班）提醒中心</span>
          <el-button v-if="canManage" type="primary" :loading="loading" @click="checkReminder">刷新提醒</el-button>
        </div>
      </template>
      <el-alert v-if="loadError" type="error" :closable="false" class="mb-16" :title="loadError">
        <template #default>
          <el-button size="small" @click="checkReminder">重试</el-button>
        </template>
      </el-alert>
      <el-table :data="rows" stripe v-loading="loading">
        <el-table-column prop="name" label="专班名称" min-width="220" />
        <el-table-column prop="ownerDept" label="牵头部门" min-width="180" />
        <el-table-column label="有效期" min-width="200">
          <template #default="{ row }">{{ row.startDate }} ~ {{ row.endDate }}</template>
        </el-table-column>
        <el-table-column prop="remindDays" label="提醒阈值(天)" width="110" />
        <el-table-column prop="remindText" label="提醒状态" min-width="180" />
        <el-table-column label="状态" width="120">
          <template #default="{ row }">
            <el-tag :type="row.needRemind ? 'warning' : 'success'">{{ row.needRemind ? '需提醒' : '正常' }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { specialOrgApi } from '../../api/governance'
import { hasAnyRole } from '../../utils/authStore'

const rows = ref([])
const canManage = computed(() => hasAnyRole(['platform_admin', 'org_admin']))
const loading = ref(false)
const loadError = ref('')

const checkReminder = async () => {
  if (!canManage.value) {
    ElMessage.warning('当前角色无刷新权限')
    return
  }
  loading.value = true
  loadError.value = ''
  try {
    rows.value = await specialOrgApi.checkReminder()
    ElMessage.success('提醒状态已刷新')
  } catch (error) {
    loadError.value = error?.message || '提醒数据加载失败'
  } finally {
    loading.value = false
  }
}

checkReminder()
</script>

<style scoped>
.page-wrap { padding: 24px; }
.header-row { display: flex; justify-content: space-between; align-items: center; }
.mb-16 { margin-bottom: 16px; }
</style>
