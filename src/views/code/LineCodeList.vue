<template>
  <div class="line-code-page">
    <el-card>
      <template #header>
        <div class="header-row">
          <span>条线编码管理</span>
          <div>
            <el-button @click="showImportDialog = true">📥 导入</el-button>
            <el-button type="primary" @click="showAddDialog = true">+ 添加编码</el-button>
          </div>
        </div>
      </template>
      
      <el-table :data="lineCodes" stripe>
        <el-table-column prop="name" label="条线名称" />
        <el-table-column prop="code" label="条线编码" />
        <el-table-column label="层级">
          <template #default="{ row }">
            <el-tag :type="row.level === '一级' ? 'primary' : 'warning'">{{ row.level }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="parent" label="上级条线" />
        <el-table-column label="状态">
          <template #default="{ row }">
            <el-tag :type="row.status === '启用' ? 'success' : 'info'">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    
    <!-- 添加弹窗 -->
    <el-dialog v-model="showAddDialog" title="添加条线编码" width="500px">
      <el-form :model="newLine" label-width="100px">
        <el-form-item label="条线名称" required>
          <el-input v-model="newLine.name" placeholder="请输入条线名称" />
        </el-form-item>
        <el-form-item label="条线编码" required>
          <el-input v-model="newLine.code" placeholder="请输入条线编码" />
        </el-form-item>
        <el-form-item label="上级条线">
          <el-select v-model="newLine.parent" placeholder="请选择" class="full-width">
            <el-option label="无（一级条线）" value="" />
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
    
    <!-- 导入弹窗 -->
    <el-dialog v-model="showImportDialog" title="导入条线编码" width="500px">
      <el-form-item label="选择文件">
        <el-upload action="#" :auto-upload="false">
          <el-button>选择文件</el-button>
        </el-upload>
      </el-form-item>
      <el-alert title="支持 .xlsx、.xls 格式" type="info" :closable="false" />
      <template #footer>
        <el-button @click="showImportDialog = false">取消</el-button>
        <el-button type="primary">开始导入</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessageBox } from 'element-plus'

const showAddDialog = ref(false)
const showImportDialog = ref(false)
const newLine = reactive({ name: '', code: '', parent: '' })

const lineCodes = ref([
  { id: 1, name: '综合', code: 'ZH', level: '一级', parent: '-', status: '启用' },
  { id: 2, name: '教育', code: 'JY', level: '一级', parent: '-', status: '启用' },
  { id: 3, name: '公安', code: 'GA', level: '一级', parent: '-', status: '启用' },
  { id: 4, name: '卫生', code: 'WS', level: '一级', parent: '-', status: '启用' },
  { id: 5, name: '高等教育', code: 'JY-GD', level: '二级', parent: '教育', status: '启用' }
])

const handleAdd = () => {
  lineCodes.value.push({
    id: Date.now(),
    ...newLine,
    level: newLine.parent ? '二级' : '一级',
    status: '启用'
  })
  showAddDialog.value = false
  Object.assign(newLine, { name: '', code: '', parent: '' })
}

const handleEdit = (row) => {
  console.log('编辑:', row)
}

const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm(`确定要删除 ${row.name} 吗？`, '删除确认', { type: 'warning' })
    lineCodes.value = lineCodes.value.filter(l => l.id !== row.id)
  } catch {}
}
</script>

<style scoped>
.header-row { display: flex; justify-content: space-between; align-items: center; }
.full-width { width: 100%; }
</style>
