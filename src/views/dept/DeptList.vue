<template>
  <div class="dept-list-page">
    <el-card>
      <template #header>
        <div class="header-row">
          <span>部门管理</span>
          <el-button type="primary" @click="showAddDialog = true">+ 添加部门</el-button>
        </div>
      </template>
      
      <el-table :data="departments" stripe>
        <el-table-column prop="name" label="部门名称" />
        <el-table-column prop="code" label="部门编码" />
        <el-table-column prop="area" label="行政区划" />
        <el-table-column label="条线归属">
          <template #default="{ row }">
            <el-tag size="small">{{ row.line }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="personCount" label="人员数量" />
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button size="small" @click="$router.push(`/departments/${row.id}`)">查看</el-button>
            <el-button size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    
    <!-- 添加弹窗 -->
    <el-dialog v-model="showAddDialog" title="添加部门" width="500px">
      <el-form :model="newDept" label-width="100px">
        <el-form-item label="部门名称" required>
          <el-input v-model="newDept.name" placeholder="请输入部门名称" />
        </el-form-item>
        <el-form-item label="部门编码" required>
          <el-input v-model="newDept.code" placeholder="请输入部门编码" />
        </el-form-item>
        <el-form-item label="行政区划">
          <el-select v-model="newDept.area" placeholder="请选择" class="full-width">
            <el-option label="湖北省" value="湖北省" />
            <el-option label="武汉市" value="武汉市" />
          </el-select>
        </el-form-item>
        <el-form-item label="条线归属">
          <el-select v-model="newDept.line" placeholder="请选择" class="full-width">
            <el-option label="综合" value="综合" />
            <el-option label="教育" value="教育" />
            <el-option label="公安" value="公安" />
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
const newDept = reactive({ name: '', code: '', area: '', line: '' })

const departments = ref([
  { id: 1, name: '省政府办公厅', code: 'HBS-ZFBGT', area: '湖北省', line: '综合', personCount: 156 },
  { id: 2, name: '省教育厅', code: 'HBS-JYT', area: '湖北省', line: '教育', personCount: 89 },
  { id: 3, name: '省公安厅', code: 'HBS-GAT', area: '湖北省', line: '公安', personCount: 234 },
  { id: 4, name: '省卫健委', code: 'HBS-WJK', area: '湖北省', line: '卫生', personCount: 67 }
])

const handleAdd = () => {
  departments.value.push({
    id: Date.now(),
    ...newDept,
    personCount: 0
  })
  showAddDialog.value = false
  Object.assign(newDept, { name: '', code: '', area: '', line: '' })
}

const handleEdit = (row) => {
  console.log('编辑:', row)
}

const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm(`确定要删除 ${row.name} 吗？`, '删除确认', { type: 'warning' })
    departments.value = departments.value.filter(d => d.id !== row.id)
  } catch {}
}
</script>

<style scoped>
.header-row { display: flex; justify-content: space-between; align-items: center; }
.full-width { width: 100%; }
</style>
