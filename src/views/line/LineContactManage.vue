<template>
  <div class="line-contact-manage-page">
    <el-card>
      <template #header>
        <div class="header-row">
          <span>条线通讯录管理</span>
          <el-button type="primary" @click="showAddRootDialog = true">+ 添加条线通讯录</el-button>
        </div>
      </template>
      
      <el-row :gutter="0">
        <!-- 左侧条线树 -->
        <el-col :span="6" class="left-pane">
          <div class="left-content">
            <el-input v-model="treeKeyword" placeholder="搜索条线" class="mb-12">
              <template #prefix>
                <el-icon><Search /></el-icon>
              </template>
            </el-input>
            <el-tree
              :data="filteredTree"
              :props="defaultProps"
              default-expand-all
              node-key="id"
              highlight-current
              @node-click="handleNodeClick"
              class="tree-panel"
            />
          </div>
        </el-col>
        
        <!-- 右侧内容区 -->
        <el-col :span="18" class="right-pane">
          <div v-if="currentNode">
            <div class="node-header">
              <div>
                <h3 class="node-title">{{ currentNode.label }}</h3>
                <p class="muted">条线编码: {{ currentNode.code }}</p>
              </div>
              <div>
                <el-button @click="openEditNodeDialog">编辑节点</el-button>
                <el-button @click="showAddNodeDialog = true">+ 添加子节点</el-button>
                <el-button type="danger" class="ml-8" @click="removeNode(currentNode)">删除</el-button>
              </div>
            </div>
            
            <div class="section-block">
              <el-tabs v-model="activeTab">
                <el-tab-pane label="成员列表" name="member" />
                <el-tab-pane label="节点配置" name="config" />
              </el-tabs>
            </div>
            
            <el-table :data="tableData" stripe v-if="activeTab === 'member'">
              <el-table-column type="selection" width="55" />
              <el-table-column prop="name" label="姓名" />
              <el-table-column prop="account" label="账号" />
              <el-table-column prop="dept" label="所属部门" />
              <el-table-column prop="linePosition" label="条线职务" />
              <el-table-column label="排序策略" width="130">
                <template #default="{ row }">{{ row.sortMode === 'manual' ? `手动#${row.manualSort}` : `自动(${row.sortWeight})` }}</template>
              </el-table-column>
              <el-table-column label="操作" width="150">
                <template #default="{ row }">
                  <el-button size="small" @click="moveMember(row, 'up')">上移</el-button>
                  <el-button size="small" type="danger" @click="removeMember(row)">移除</el-button>
                </template>
              </el-table-column>
            </el-table>
            
            <div v-if="activeTab === 'config'">
              <el-descriptions :column="2" border class="mb-24">
                <el-descriptions-item label="节点名称">
                  {{ currentNode.label }}
                </el-descriptions-item>
                <el-descriptions-item label="节点类型">
                  {{ nodeTypeMap[currentNode.type] }}
                </el-descriptions-item>
                <el-descriptions-item label="绑定部门" v-if="currentNode.type === 'branch'">
                  {{ currentNode.bindBranch || '未绑定' }}
                </el-descriptions-item>
                <el-descriptions-item label="节点排序">
                  {{ currentNode.sort }}
                </el-descriptions-item>
                <el-descriptions-item label="成员排序模式">
                  {{ currentNode.sortMode === 'manual' ? '手动优先' : '自动排序优先（可覆盖）' }}
                </el-descriptions-item>
              </el-descriptions>
              <el-button type="primary" plain @click="toggleNodeSortMode">
                切换为{{ currentNode.sortMode === 'manual' ? '自动排序优先' : '手动优先' }}
              </el-button>
            </div>
          </div>
          <el-empty description="请选择左侧节点" v-else class="empty-top" />
        </el-col>
      </el-row>
    </el-card>
    
    <!-- 添加子节点弹窗 -->
    <el-dialog v-model="showAddNodeDialog" title="添加子节点" width="600px">
      <p class="mb-16">当前条线通讯录：{{ currentNode?.label || '司法条线' }}</p>
      <el-form :model="newNode" label-width="100px">
        <el-form-item label="节点名称" required>
          <el-input v-model="newNode.name" placeholder="请输入节点名称" maxlength="100" show-word-limit />
        </el-form-item>
        <el-form-item label="节点类型">
          <el-radio-group v-model="newNode.type">
            <el-radio label="dir">目录节点</el-radio>
            <el-radio label="branch">部门节点</el-radio>
            <el-radio label="person">人员节点</el-radio>
          </el-radio-group>
        </el-form-item>
        
        <el-form-item label="绑定部门" v-if="newNode.type === 'branch'">
          <el-select v-model="newNode.bindBranch" placeholder="请选择部门" class="full-width">
            <el-option label="省政府办公厅" value="1" />
            <el-option label="省教育厅" value="2" />
            <el-option label="省公安厅" value="3" />
          </el-select>
          <p class="helper-text">绑定部门后默认关联当前部门的子孙部门。</p>
        </el-form-item>
        
        <el-form-item label="添加人员方式" v-if="newNode.type === 'person'">
          <el-radio-group v-model="newNode.addPersonType">
            <el-radio label="add">添加人员</el-radio>
            <el-radio label="branchAdd">按部门添加人员</el-radio>
          </el-radio-group>
          <p class="helper-text">可选择节点管理员管理范围内的人员，可在人员列表页调整人员排序</p>
        </el-form-item>
        
        <el-form-item label="节点排序" required>
          <el-input-number v-model="newNode.sort" :min="1" class="sort-input" />
        </el-form-item>
        <el-form-item label="管理员">
          <el-select v-model="newNode.manager" multiple placeholder="请选择管理员">
            <el-option label="邓文佳A" value="dwj" />
            <el-option label="李晗" value="lh" />
            <el-option label="张三" value="zs" />
            <el-option label="李四" value="ls" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showAddNodeDialog = false">取消</el-button>
        <el-button type="primary" @click="handleAddNode">保存</el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="showEditNodeDialog" title="编辑节点" width="600px">
      <el-form :model="editNodeForm" label-width="100px">
        <el-form-item label="节点名称" required>
          <el-input v-model="editNodeForm.label" />
        </el-form-item>
        <el-form-item label="节点编码">
          <el-input v-model="editNodeForm.code" />
        </el-form-item>
        <el-form-item label="节点排序">
          <el-input-number v-model="editNodeForm.sort" :min="1" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showEditNodeDialog = false">取消</el-button>
        <el-button type="primary" @click="saveEditNode">保存</el-button>
      </template>
    </el-dialog>

    <!-- 添加条线通讯录弹窗 -->
    <el-dialog v-model="showAddRootDialog" title="添加条线通讯录" width="500px">
      <el-form :model="newRootNode" label-width="100px">
        <el-form-item label="条线名称" required>
          <el-input v-model="newRootNode.name" placeholder="请输入条线名称" maxlength="50" show-word-limit />
        </el-form-item>
        <el-form-item label="管理员" required>
          <el-select v-model="newRootNode.manager" multiple placeholder="请选择管理员">
            <el-option label="邓文佳A" value="dwj" />
            <el-option label="李晗" value="lh" />
            <el-option label="张三" value="zs" />
            <el-option label="李四" value="ls" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showAddRootDialog = false">取消</el-button>
        <el-button type="primary" @click="handleAddRootNode">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed, ref, reactive, watch } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { lineApi } from '../../api/governance'

const showAddNodeDialog = ref(false)
const showAddRootDialog = ref(false)
const showEditNodeDialog = ref(false)
const currentNode = ref(null)
const treeKeyword = ref('')

const newRootNode = reactive({
  name: '',
  manager: []
})
const activeTab = ref('member')
const defaultProps = {
  children: 'children',
  label: 'label'
}

const nodeTypeMap = {
  'dir': '目录节点',
  'branch': '部门节点',
  'person': '人员节点'
}

const lineTree = ref([])
const tableData = ref([])

const newNode = reactive({
  name: '',
  type: 'dir',
  bindBranch: '',
  addPersonType: 'add',
  sort: 1,
  manager: []
})
const editNodeForm = reactive({
  label: '',
  code: '',
  sort: 1
})

const filteredTree = computed(() => {
  if (!treeKeyword.value) return lineTree.value
  const walk = (nodes) => {
    return nodes.map((node) => ({ ...node, children: walk(node.children || []) }))
      .filter((node) => node.label.includes(treeKeyword.value) || (node.children && node.children.length > 0))
  }
  return walk(lineTree.value)
})

const saveTree = () => lineApi.saveTree(lineTree.value)

const reloadMembers = async () => {
  if (!currentNode.value) {
    tableData.value = []
    return
  }
  const members = await lineApi.members(currentNode.value.id)
  tableData.value = members
}

const load = async () => {
  lineTree.value = await lineApi.tree()
}

const handleNodeClick = (data) => {
  currentNode.value = data
  reloadMembers()
}

const handleAddNode = () => {
  if (!newNode.name) {
    ElMessage.warning('请输入节点名称')
    return
  }
  if (!currentNode.value.children) {
    currentNode.value.children = []
  }
  currentNode.value.children.push({
    id: Date.now(),
    label: newNode.name,
    code: '',
    type: newNode.type,
    sort: newNode.sort,
    bindBranch: newNode.bindBranch,
    manager: newNode.manager,
    children: []
  })
  saveTree()
  ElMessage.success('添加成功')
  showAddNodeDialog.value = false
  Object.assign(newNode, { name: '', type: 'dir', bindBranch: '', addPersonType: 'add', sort: 1, manager: [] })
}

const openEditNodeDialog = () => {
  if (!currentNode.value) return
  Object.assign(editNodeForm, {
    label: currentNode.value.label,
    code: currentNode.value.code,
    sort: currentNode.value.sort || 1
  })
  showEditNodeDialog.value = true
}

const saveEditNode = () => {
  if (!currentNode.value) return
  currentNode.value.label = editNodeForm.label
  currentNode.value.code = editNodeForm.code
  currentNode.value.sort = editNodeForm.sort
  saveTree()
  showEditNodeDialog.value = false
  ElMessage.success('节点已更新')
}

const findParentAndRemove = (nodes, id) => {
  for (let i = 0; i < nodes.length; i += 1) {
    if (nodes[i].id === id) {
      nodes.splice(i, 1)
      return true
    }
    if (nodes[i].children && findParentAndRemove(nodes[i].children, id)) return true
  }
  return false
}

const removeNode = (node) => {
  findParentAndRemove(lineTree.value, node.id)
  if (currentNode.value?.id === node.id) currentNode.value = null
  saveTree()
  ElMessage.success('节点已删除')
}

const handleAddRootNode = () => {
  if (!newRootNode.name) {
    ElMessage.warning('请输入条线名称')
    return
  }
  if (newRootNode.manager.length === 0) {
    ElMessage.warning('请选择至少一个管理员')
    return
  }
  lineTree.value.push({
    id: Date.now(),
    label: newRootNode.name,
    code: '',
    type: 'dir',
    sort: lineTree.value.length + 1,
    manager: newRootNode.manager,
    children: []
  })
  saveTree()
  ElMessage.success('条线通讯录添加成功')
  showAddRootDialog.value = false
  Object.assign(newRootNode, { name: '', manager: [] })
}

const moveMember = async (row, direction) => {
  const idx = tableData.value.findIndex((item) => item.id === row.id)
  if (idx < 0) return
  const target = direction === 'up' ? idx - 1 : idx + 1
  if (target < 0 || target >= tableData.value.length) return
  const temp = tableData.value[idx]
  tableData.value[idx] = tableData.value[target]
  tableData.value[target] = temp
  tableData.value = tableData.value.map((item, index) => ({ ...item, sortMode: 'manual', manualSort: index + 1 }))
  await lineApi.saveMembers(currentNode.value.id, tableData.value)
  ElMessage.success('成员顺序已调整')
}

const removeMember = async (row) => {
  tableData.value = tableData.value.filter((item) => item.id !== row.id)
  await lineApi.saveMembers(currentNode.value.id, tableData.value)
  ElMessage.success('成员已移除')
}

const toggleNodeSortMode = async () => {
  if (!currentNode.value) return
  currentNode.value.sortMode = currentNode.value.sortMode === 'manual' ? 'auto' : 'manual'
  await saveTree()
  ElMessage.success('排序模式已切换')
}

watch(currentNode, reloadMembers)

load()
</script>

<style scoped>
.header-row { display: flex; justify-content: space-between; align-items: center; }
.left-pane { border-right: 1px solid #e5e6eb; min-height: calc(100vh - 100px); }
.left-content { padding: 16px; }
.tree-panel { height: calc(100vh - 200px); overflow-y: auto; }
.right-pane { padding: 20px; }
.node-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.node-title { margin: 0 0 4px 0; font-size: 20px; font-weight: 500; }
.muted { color: #86909c; margin: 0; }
.ml-8 { margin-left: 8px; }
.mb-12 { margin-bottom: 12px; }
.mb-16 { margin-bottom: 16px; }
.mb-24 { margin-bottom: 24px; }
.section-block { margin-bottom: 16px; }
.empty-top { margin-top: 100px; }
.full-width { width: 100%; }
.helper-text { color: #86909c; font-size: 12px; margin-top: 4px; }
.sort-input { width: 120px; }
</style>
