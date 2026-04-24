<template>
  <div class="line-list-page">
    <el-card>
      <template #header>
        <div class="header-row">
          <span>条线管理</span>
          <el-button type="primary" @click="showAddDialog = true">+ 添加条线</el-button>
        </div>
      </template>
      
      <el-table :data="lines" stripe>
        <el-table-column label="条线名称">
          <template #default="{ row }">
            <el-tag :type="row.tagType">{{ row.name }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="code" label="条线编码" />
        <el-table-column prop="parent" label="上级条线" />
        <el-table-column prop="deptCount" label="部门数量" />
        <el-table-column prop="personCount" label="人员数量" />
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button size="small" @click="handleView(row)">查看</el-button>
            <el-button size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    
    <!-- 添加弹窗 -->
    <el-dialog v-model="showAddDialog" title="添加条线" width="500px">
      <el-form :model="newLine" label-width="100px">
        <el-form-item label="条线名称" required>
          <el-input v-model="newLine.name" placeholder="请输入条线名称" />
        </el-form-item>
        <el-form-item label="条线编码" required>
          <el-input v-model="newLine.code" placeholder="请输入条线编码" />
        </el-form-item>
        <el-form-item label="上级条线">
          <el-select v-model="newLine.parent" placeholder="请选择" class="full-width">
            <el-option label="无（顶级条线）" value="" />
            <el-option label="综合" value="综合" />
            <el-option label="教育" value="教育" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showAddDialog = false">取消</el-button>
        <el-button type="primary" @click="handleAdd">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessageBox } from 'element-plus'

const showAddDialog = ref(false)
const newLine = reactive({ name: '', code: '', parent: '' })

const lines = ref([
  { id: 1, name: '综合', code: 'ZH', parent: '-', deptCount: 45, personCount: 1234, tagType: 'primary' },
  { id: 2, name: '教育', code: 'JY', parent: '-', deptCount: 23, personCount: 567, tagType: 'success' },
  { id: 3, name: '公安', code: 'GA', parent: '-', deptCount: 18, personCount: 890, tagType: 'warning' },
  { id: 4, name: '卫生', code: 'WS', parent: '-', deptCount: 15, personCount: 456, tagType: 'danger' },
  { id: 5, name: '高等教育', code: 'JY-GD', parent: '教育', deptCount: 8, personCount: 234, tagType: 'success' }
])

const handleAdd = () => {
  lines.value.push({
    id: Date.now(),
    ...newLine,
    deptCount: 0,
    personCount: 0,
    tagType: 'primary'
  })
  showAddDialog.value = false
  Object.assign(newLine, { name: '', code: '', parent: '' })
}

const handleView = (row) => {
  console.log('查看:', row)
}

const handleEdit = (row) => {
  console.log('编辑:', row)
}

const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm(`确定要删除 ${row.name} 吗？`, '删除确认', { type: 'warning' })
    lines.value = lines.value.filter(l => l.id !== row.id)
  } catch {}
}
</script>

<style scoped>
.header-row { display: flex; justify-content: space-between; align-items: center; }
.full-width { width: 100%; }
</style>
