<template>
  <div class="page-wrap">
    <el-card class="mb-16">
      <template #header>
        <div class="header-row">
          <span>审批中心</span>
          <div>
            <el-button v-if="canManage" class="mr-8" @click="runTimedSchedule">执行到点生效</el-button>
            <el-button v-if="canManage" type="primary" plain @click="showConfigDialog = true">流程配置</el-button>
          </div>
        </div>
      </template>
      <el-alert v-if="loadError" type="error" :closable="false" class="mb-16" :title="loadError">
        <template #default>
          <el-button size="small" @click="load">重试</el-button>
        </template>
      </el-alert>
      <el-table v-if="requests.length > 0" v-loading="loading" :data="requests" stripe>
        <el-table-column prop="personName" label="人员" width="120" />
        <el-table-column label="转调信息" min-width="280">
          <template #default="{ row }">{{ row.fromDept }} -> {{ row.toDept }} ｜ {{ row.fromLine }} -> {{ row.toLine }}</template>
        </el-table-column>
        <el-table-column label="生效方式" width="160">
          <template #default="{ row }">{{ row.effectiveMode === 'immediate' ? '审批后立即生效' : `定时生效(${row.effectiveDate})` }}</template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="120" />
        <el-table-column prop="currentNode" label="当前节点" width="120" />
        <el-table-column label="操作" width="180">
          <template #default="{ row }">
            <el-button
              size="small"
              :loading="isApproving(row.id)"
              @click="approve(row, 'pass')"
              :disabled="!canManage || row.status !== '待审批' || isApproving(row.id)"
            >
              通过
            </el-button>
            <el-button
              size="small"
              type="danger"
              :loading="isApproving(row.id)"
              @click="approve(row, 'reject')"
              :disabled="!canManage || row.status !== '待审批' || isApproving(row.id)"
            >
              驳回
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-empty v-else description="暂无审批单">
        <el-button type="primary" @click="$router.push('/persons')">去发起转调</el-button>
      </el-empty>
    </el-card>

    <el-card class="mt-16">
      <template #header>待生效队列</template>
      <el-table :data="scheduleTasks" size="small" max-height="240">
        <el-table-column prop="personName" label="人员" width="120" />
        <el-table-column prop="effectiveDate" label="生效日期" width="120" />
        <el-table-column prop="status" label="任务状态" width="100" />
        <el-table-column prop="updatedAt" label="更新时间" min-width="160" />
      </el-table>
    </el-card>

    <el-card>
      <template #header>审批日志</template>
      <el-timeline>
        <el-timeline-item v-for="log in logs" :key="log.id" :timestamp="log.time">
          {{ log.text }}
        </el-timeline-item>
      </el-timeline>
    </el-card>

    <el-card v-if="canManage" class="mt-16">
      <template #header>流程配置版本记录</template>
      <el-table :data="flowHistory" size="small" max-height="260">
        <el-table-column prop="time" label="时间" width="170" />
        <el-table-column prop="operator" label="操作人" width="120" />
        <el-table-column prop="version" label="版本" width="80" />
        <el-table-column label="节点" min-width="220">
          <template #default="{ row }">{{ (row.nodes || []).join(' -> ') }}</template>
        </el-table-column>
        <el-table-column prop="effectNote" label="生效说明" min-width="140" />
      </el-table>
    </el-card>

    <el-dialog v-model="showConfigDialog" title="转调流程配置" width="620px">
      <el-form label-width="100px">
        <el-form-item label="场景">
          <el-input v-model="flowConfig.scene" disabled />
        </el-form-item>
        <el-form-item label="流程节点">
          <div class="node-wrap">
            <el-tag v-for="(node, index) in flowConfig.nodes" :key="`${node}-${index}`" closable class="mr-8 mb-8" @close="removeNode(index)">
              {{ node }}
            </el-tag>
          </div>
        </el-form-item>
        <el-form-item label="新增节点">
          <el-input v-model="newNodeName" placeholder="输入节点名称（如：条线负责人）">
            <template #append>
              <el-button @click="addNode">添加</el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="节点排序">
          <el-select v-model="selectedMoveIndex" placeholder="选择节点" class="w-240">
            <el-option v-for="(node, index) in flowConfig.nodes" :key="`${node}-${index}`" :label="`${index + 1}. ${node}`" :value="index" />
          </el-select>
          <el-button class="ml-8" @click="moveNode('up')">上移</el-button>
          <el-button class="ml-8" @click="moveNode('down')">下移</el-button>
        </el-form-item>
        <el-form-item label="生效说明">
          <el-input v-model="flowConfig.effectNote" placeholder="例如：保存后立即生效，仅影响新建审批单" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showConfigDialog = false">取消</el-button>
        <el-button type="primary" @click="saveFlowConfig">保存配置</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { transferApi } from '../../api/governance'
import { hasAnyRole } from '../../utils/authStore'

const requests = ref([])
const logs = ref([])
const flowConfig = ref({ id: 1, scene: '人员转调', nodes: [] })
const flowHistory = ref([])
const newNodeName = ref('')
const selectedMoveIndex = ref(null)
const showConfigDialog = ref(false)
const loading = ref(false)
const loadError = ref('')
const scheduleTasks = ref([])
const approvingMap = ref({})
const canManage = computed(() => hasAnyRole(['platform_admin', 'org_admin']))

const load = async () => {
  loading.value = true
  loadError.value = ''
  try {
    requests.value = await transferApi.list()
    const cfg = await transferApi.config()
    flowConfig.value = cfg?.[0] || { id: 1, scene: '人员转调', nodes: [], version: 1, effectNote: '立即生效' }
    flowHistory.value = await transferApi.configHistory()
    scheduleTasks.value = await transferApi.scheduleList()
    logs.value = requests.value.flatMap((item) =>
      (item.logs || []).map((log, idx) => ({ id: `${item.id}-${idx}`, time: log.time, text: `${item.personName}：${log.text}` }))
    ).sort((a, b) => (a.time > b.time ? -1 : 1))
  } catch (error) {
    loadError.value = error?.message || '审批中心加载失败'
  } finally {
    loading.value = false
  }
}

const approve = async (row, action) => {
  if (!canManage.value) {
    ElMessage.warning('当前角色无审批权限')
    return
  }
  if (approvingMap.value[row.id]) return
  approvingMap.value = { ...approvingMap.value, [row.id]: true }
  const title = action === 'pass' ? '审批通过' : '审批驳回'
  try {
    const { value } = await ElMessageBox.prompt(`请输入${title}意见`, title, { inputPlaceholder: '可选填写' })
    await transferApi.approve(row.id, action === 'pass' ? 'pass' : 'reject', value)
    await load()
    ElMessage.success(`${title}成功`)
  } catch {
    ElMessage.info('已取消审批操作')
  } finally {
    approvingMap.value = { ...approvingMap.value, [row.id]: false }
  }
}

const isApproving = (id) => !!approvingMap.value[id]

const addNode = () => {
  const name = newNodeName.value.trim()
  if (!name) return
  if (flowConfig.value.nodes.includes(name)) {
    ElMessage.warning('流程节点名称不能重复')
    return
  }
  flowConfig.value.nodes.push(name)
  newNodeName.value = ''
}

const removeNode = (index) => {
  flowConfig.value.nodes.splice(index, 1)
}

const moveNode = (direction) => {
  const idx = selectedMoveIndex.value
  if (idx === null || idx === undefined) return
  const target = direction === 'up' ? idx - 1 : idx + 1
  if (target < 0 || target >= flowConfig.value.nodes.length) return
  const list = flowConfig.value.nodes
  const temp = list[idx]
  list[idx] = list[target]
  list[target] = temp
  selectedMoveIndex.value = target
}

const saveFlowConfig = async () => {
  if (!canManage.value) {
    ElMessage.warning('当前角色无配置权限')
    return
  }
  if (!flowConfig.value.nodes || flowConfig.value.nodes.length === 0) {
    ElMessage.warning('流程节点至少保留一个')
    return
  }
  await transferApi.saveConfig([{ ...flowConfig.value, configurable: true }], '当前管理员')
  showConfigDialog.value = false
  await load()
  ElMessage.success('流程配置已保存')
}

const runTimedSchedule = async () => {
  if (!canManage.value) {
    ElMessage.warning('当前角色无执行权限')
    return
  }
  const res = await transferApi.runSchedule()
  await load()
  ElMessage.success(`到点生效任务执行完成，处理 ${res?.processed || 0} 条`)
}

load()
</script>

<style scoped>
.page-wrap { padding: 24px; }
.header-row { display: flex; justify-content: space-between; align-items: center; }
.mb-16 { margin-bottom: 16px; }
.mr-8 { margin-right: 8px; }
.mb-8 { margin-bottom: 8px; }
.ml-8 { margin-left: 8px; }
.w-240 { width: 240px; }
.node-wrap { width: 100%; }
.mt-16 { margin-top: 16px; }
</style>
