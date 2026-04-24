<template>
  <div class="page-wrap">
    <el-card class="mb-16">
      <template #header>
        <div class="header-row">
          <span>外部人员管理</span>
          <div>
            <el-button v-if="canManage" class="mr-8" :loading="actionLoading" @click="runExpiryCheck">执行到期检查</el-button>
            <el-button v-if="canManage" type="primary" @click="openCreate">新增外部人员申请</el-button>
          </div>
        </div>
      </template>
      <el-alert v-if="loadError" type="error" :closable="false" class="mb-16" :title="loadError">
        <template #default>
          <el-button size="small" @click="load">重试</el-button>
        </template>
      </el-alert>
      <el-table :data="rows" stripe v-loading="loading">
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column prop="orgName" label="外部组织" min-width="180" />
        <el-table-column prop="role" label="角色" width="120" />
        <el-table-column label="数据范围" min-width="200">
          <template #default="{ row }">{{ (row.dataScope || []).join('、') || '-' }}</template>
        </el-table-column>
        <el-table-column prop="expiryDate" label="到期日期" width="120" />
        <el-table-column prop="status" label="状态" width="120" />
        <el-table-column label="操作" width="190">
          <template #default="{ row }">
            <el-button size="small" @click="doApprove(row, 'pass')" :disabled="!canManage || row.status !== '审批中'">通过</el-button>
            <el-button size="small" type="danger" @click="doApprove(row, 'reject')" :disabled="!canManage || row.status !== '审批中'">驳回</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="showDialog" title="外部人员申请" width="680px">
      <el-form :model="form" label-width="110px">
        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item label="姓名" required>
              <el-input v-model="form.name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="外部组织" required>
              <el-select v-model="form.orgId" @change="onOrgChange">
                <el-option v-for="org in orgs" :key="org.id" :label="org.name" :value="org.id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="角色">
              <el-input v-model="form.role" placeholder="外部协作员" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="到期日期" required>
              <el-date-picker v-model="form.expiryDate" type="date" value-format="YYYY-MM-DD" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="数据范围">
              <el-select v-model="form.dataScope" multiple placeholder="选择可见部门范围">
                <el-option label="省政府办公厅" value="省政府办公厅" />
                <el-option label="省教育厅" value="省教育厅" />
                <el-option label="省公安厅" value="省公安厅" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <el-button @click="showDialog = false">取消</el-button>
        <el-button type="primary" @click="submit">提交审批</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { externalApi } from '../../api/governance'
import { hasAnyRole } from '../../utils/authStore'

const rows = ref([])
const orgs = ref([])
const showDialog = ref(false)
const loading = ref(false)
const loadError = ref('')
const actionLoading = ref(false)
const form = reactive({
  name: '',
  orgId: '',
  orgName: '',
  role: '外部协作员',
  dataScope: [],
  expiryDate: ''
})
const canManage = computed(() => hasAnyRole(['platform_admin', 'org_admin']))

const load = async () => {
  loading.value = true
  loadError.value = ''
  try {
    orgs.value = await externalApi.orgs()
    rows.value = await externalApi.persons()
  } catch (error) {
    loadError.value = error?.message || '外部人员数据加载失败'
  } finally {
    loading.value = false
  }
}

const openCreate = () => {
  if (!canManage.value) {
    ElMessage.warning('当前角色无新增权限')
    return
  }
  Object.assign(form, { name: '', orgId: '', orgName: '', role: '外部协作员', dataScope: [], expiryDate: '' })
  showDialog.value = true
}

const onOrgChange = (id) => {
  const org = orgs.value.find((item) => Number(item.id) === Number(id))
  form.orgName = org?.name || ''
}

const submit = async () => {
  if (!canManage.value) {
    ElMessage.warning('当前角色无提交权限')
    return
  }
  if (!form.name || !form.orgId || !form.expiryDate) {
    ElMessage.warning('请填写必填信息')
    return
  }
  actionLoading.value = true
  try {
    await externalApi.savePerson({ ...form, status: '审批中' })
    showDialog.value = false
    await load()
    ElMessage.success('申请已提交')
  } catch (error) {
    ElMessage.error(error?.message || '提交失败，请稍后重试')
  } finally {
    actionLoading.value = false
  }
}

const doApprove = async (row, action) => {
  if (!canManage.value) {
    ElMessage.warning('当前角色无审批权限')
    return
  }
  actionLoading.value = true
  try {
    await externalApi.approve(row.id, action)
    await load()
    ElMessage.success(action === 'pass' ? '已审批通过' : '已驳回')
  } catch (error) {
    ElMessage.error(error?.message || '审批失败，请稍后重试')
  } finally {
    actionLoading.value = false
  }
}

const runExpiryCheck = async () => {
  if (!canManage.value) {
    ElMessage.warning('当前角色无执行权限')
    return
  }
  actionLoading.value = true
  try {
    await externalApi.checkExpiry()
    await load()
    ElMessage.success('到期检查完成')
  } catch (error) {
    ElMessage.error(error?.message || '到期检查失败，请稍后重试')
  } finally {
    actionLoading.value = false
  }
}

load()
</script>

<style scoped>
.page-wrap { padding: 24px; }
.header-row { display: flex; justify-content: space-between; align-items: center; }
.mb-16 { margin-bottom: 16px; }
.mr-8 { margin-right: 8px; }
</style>
