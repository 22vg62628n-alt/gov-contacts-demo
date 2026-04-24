<template>
  <div class="area-code-page">
    <el-card>
      <template #header>
        <div class="header-row">
          <span>行政区划编码管理</span>
          <div>
            <el-button @click="showImportDialog = true">📥 导入</el-button>
            <el-button type="primary" @click="showAddDialog = true">+ 添加编码</el-button>
          </div>
        </div>
      </template>
      
      <el-table :data="areaCodes" stripe>
        <el-table-column prop="name" label="区划名称" />
        <el-table-column prop="code" label="区划编码" />
        <el-table-column label="层级">
          <template #default="{ row }">
            <el-tag :type="levelTagType(row.level)">{{ row.level }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="parent" label="上级区划" />
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
    <el-dialog v-model="showAddDialog" title="添加行政区划编码" width="500px">
      <el-form :model="newArea" label-width="100px">
        <el-form-item label="区划名称" required>
          <el-input v-model="newArea.name" placeholder="请输入行政区划名称" />
        </el-form-item>
        <el-form-item label="区划编码" required>
          <el-input v-model="newArea.code" placeholder="请输入行政区划编码" />
        </el-form-item>
        <el-form-item label="上级区划">
          <el-select v-model="newArea.parent" placeholder="请选择" class="full-width">
            <el-option label="无（省级）" value="" />
            <el-option label="湖北省" value="湖北省" />
            <el-option label="武汉市" value="武汉市" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showAddDialog = false">取消</el-button>
        <el-button type="primary" @click="handleAdd">保存</el-button>
      </template>
    </el-dialog>
    
    <!-- 导入弹窗 -->
    <el-dialog v-model="showImportDialog" title="导入行政区划编码" width="500px">
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
const newArea = reactive({ name: '', code: '', parent: '' })

const areaCodes = ref([
  { id: 1, name: '湖北省', code: '420000', level: '省级', parent: '-', status: '启用' },
  { id: 2, name: '武汉市', code: '420100', level: '市级', parent: '湖北省', status: '启用' },
  { id: 3, name: '武昌区', code: '420106', level: '区级', parent: '武汉市', status: '启用' },
  { id: 4, name: '宜昌市', code: '420500', level: '市级', parent: '湖北省', status: '启用' }
])

const levelTagType = (level) => {
  const types = { '省级': 'primary', '市级': 'warning', '区级': 'danger' }
  return types[level] || 'info'
}

const handleAdd = () => {
  areaCodes.value.push({
    id: Date.now(),
    ...newArea,
    level: newArea.parent ? '市级' : '省级',
    status: '启用'
  })
  showAddDialog.value = false
  Object.assign(newArea, { name: '', code: '', parent: '' })
}

const handleEdit = (row) => {
  console.log('编辑:', row)
}

const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm(`确定要删除 ${row.name} 吗？`, '删除确认', { type: 'warning' })
    areaCodes.value = areaCodes.value.filter(a => a.id !== row.id)
  } catch {}
}
</script>

<style scoped>
.header-row { display: flex; justify-content: space-between; align-items: center; }
.full-width { width: 100%; }
</style>
