<template>
  <div class="line-contacts-page">
    <el-card class="no-padding-card">
      <el-tabs v-model="activeTab" class="mb-0-tabs">
        <el-tab-pane label="行政区划管理" name="area" />
        <el-tab-pane label="条线管理" name="line" />
      </el-tabs>
      
      <el-row :gutter="0" class="layout-row">
        <!-- 左侧树形 -->
        <el-col :span="6" class="left-pane">
          <div class="left-search">
            <el-input placeholder="输入关键字进行过滤" class="full-width">
              <template #prefix>
                <el-icon><Search /></el-icon>
              </template>
            </el-input>
          </div>
          <el-tree
            :data="treeData"
            :props="defaultProps"
            default-expand-all
            node-key="id"
            highlight-current
            @node-click="handleNodeClick"
            :filter-node-method="filterNode"
            class="left-tree"
          />
        </el-col>
        
        <!-- 右侧详情 -->
        <el-col :span="18" class="right-pane">
          <div v-if="currentNode">
            <div class="node-header">
              <div>
                <h3 class="node-title">{{ currentNode.label }}</h3>
                <p class="muted">
                  {{ activeTab === 'area' ? '行政区划编码' : '条线编码' }}: {{ currentNode.code }}
                </p>
              </div>
              <div>
                <el-button>编辑</el-button>
                <el-button type="danger" class="ml-8">删除</el-button>
              </div>
            </div>
            
            <div class="action-row">
              <el-button type="primary" @click="showAddDialog = true">
                + 添加子{{ activeTab === 'area' ? '区划' : '条线' }}
              </el-button>
              <el-button class="btn-muted" >批量删除</el-button>
              <el-button class="ml-8" v-if="activeTab === 'area'" @click="showImportDialog = true">导入行政区划</el-button>
              <el-button class="ml-8" @click="showExportDialog = true">导出{{ activeTab === 'area' ? '区划' : '条线' }}</el-button>
            </div>
            
            <el-table :data="tableData" stripe class="mt-24">
              <el-table-column type="selection" width="55" />
              <el-table-column :label="activeTab === 'area' ? '行政区划名称' : '条线名称'" prop="name" />
              <el-table-column :label="activeTab === 'area' ? '行政区划编码' : '条线编码'" prop="code" />
              <el-table-column label="操作" width="150">
                <template #default="{ row }">
                  <el-button size="small">编辑</el-button>
                  <el-button size="small" type="danger">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            
            <el-empty description="暂无数据" v-if="tableData.length === 0" class="empty-block" />
            
            <div class="pager-wrap">
              <el-pagination
                layout="prev, pager, next, jumper"
                :total="tableData.length"
                :page-size="10"
              />
            </div>
          </div>
          <el-empty description="请选择左侧节点" v-else class="empty-top" />
        </el-col>
      </el-row>
    </el-card>
    
    <!-- 添加弹窗 -->
    <el-dialog v-model="showAddDialog" :title="`添加子${activeTab === 'area' ? '区划' : '条线'}`" width="500px">
      <el-form :model="newNode" label-width="100px">
        <el-form-item :label="activeTab === 'area' ? '区划名称' : '条线名称'" required>
          <el-input v-model="newNode.name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item :label="activeTab === 'area' ? '区划编码' : '条线编码'" required>
          <el-input v-model="newNode.code" placeholder="请输入编码" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showAddDialog = false">取消</el-button>
        <el-button type="primary" @click="addNode">保存</el-button>
      </template>
    </el-dialog>

    <!-- 导入行政区划弹窗 -->
    <el-dialog v-model="showImportDialog" title="导入行政区划" width="500px">
      <el-form>
        <el-form-item label="导入策略">
          <el-radio-group v-model="importStrategy">
            <el-radio label="add">新增</el-radio>
            <el-radio label="update">更新</el-radio>
            <el-radio label="all">全量覆盖</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="选择文件">
          <el-upload action="#" :auto-upload="false" :limit="1">
            <el-button>选择文件</el-button>
            <template #tip>
              <div class="el-upload__tip upload-tip">
                支持 .xlsx、.xls 格式，请按照模板格式上传
              </div>
            </template>
          </el-upload>
        </el-form-item>
        <el-alert v-if="importResult" :type="importResult.failed > 0 ? 'warning' : 'success'" :closable="false"
          :title="`预检完成：成功${importResult.success}条，失败${importResult.failed}条`" />
        <el-table v-if="importErrors.length" :data="importErrors" size="small" class="mt-24">
          <el-table-column prop="rowNo" label="行号" width="70" />
          <el-table-column prop="field" label="字段" width="100" />
          <el-table-column prop="message" label="错误原因" />
        </el-table>
      </el-form>
      <div class="import-footer">
        <el-button type="text" class="table-action-btn">下载导入模板</el-button>
        <div>
          <el-button @click="showImportDialog = false" class="mr-16">取消</el-button>
          <el-button v-if="importErrors.length" @click="downloadImportErrors">下载错误明细</el-button>
          <el-button type="primary" @click="handleImport">开始导入</el-button>
        </div>
      </div>
    </el-dialog>

    <el-dialog v-model="showExportDialog" :title="`导出${activeTab === 'area' ? '行政区划' : '条线'}`" width="460px">
      <el-form label-width="90px">
        <el-form-item label="导出范围">
          <el-radio-group v-model="exportRange">
            <el-radio label="current">当前节点子集</el-radio>
            <el-radio label="all">全量</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <el-table :data="exportTasks" size="small" max-height="180" class="mt-24">
        <el-table-column prop="createdAt" label="创建时间" width="170" />
        <el-table-column prop="targetType" :label="activeTab === 'area' ? '区划导出' : '条线导出'" width="100" />
        <el-table-column prop="total" label="条数" width="80" />
        <el-table-column prop="statusText" label="状态" width="80" />
        <el-table-column label="操作" min-width="90">
          <template #default="{ row }">
            <el-button type="text" class="table-action-btn" :disabled="row.status !== 'success'" @click="downloadExportFile(row)">下载</el-button>
          </template>
        </el-table-column>
      </el-table>
      <template #footer>
        <el-button @click="showExportDialog = false">取消</el-button>
        <el-button type="primary" @click="handleExport">提交导出</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const activeTab = ref('area')
const showAddDialog = ref(false)
const showImportDialog = ref(false)
const showExportDialog = ref(false)
const currentNode = ref(null)
const importStrategy = ref('add')
const exportRange = ref('current')
const importResult = ref(null)
const importErrors = ref([])
const exportTasks = ref([])
const defaultProps = {
  children: 'children',
  label: 'label'
}

const areaTree = ref([
  {
    id: 1,
    label: '北京市',
    code: '110000',
    children: [
      {
        id: 11,
        label: '市辖区',
        code: '110100',
        children: [
          { id: 111, label: '东城区', code: '110101' },
          { id: 112, label: '西城区', code: '110102', children: [
            { id: 1121, label: '西长安街街道', code: '110102001' },
            { id: 1122, label: '新街口街道', code: '110102003', children: [] }
          ]},
          { id: 113, label: '朝阳区', code: '110105' }
        ]
      }
    ]
  }
])

const lineTree = ref([
  { id: 1, label: '其他', code: 'QT' },
  { id: 2, label: '群众团体', code: 'QZ' },
  { id: 3, label: '军委', code: 'JW' },
  { id: 4, label: '法院', code: 'FY' },
  { id: 5, label: '政协', code: 'ZX', children: [
    { id: 51, label: '提案', code: 'ZX-TA' },
    { id: 52, label: '经济', code: 'ZX-JJ' },
    { id: 53, label: '农业和农村', code: 'ZX-NY', children: [] }
  ]}
])

const treeData = computed(() => activeTab.value === 'area' ? areaTree.value : lineTree.value)
const tableData = ref([])
const newNode = reactive({ name: '', code: '' })

const handleNodeClick = (data) => {
  currentNode.value = data
  tableData.value = data.children || []
}

const addNode = () => {
  if (!newNode.name || !newNode.code) {
    ElMessage.warning('请填写完整信息')
    return
  }
  if (!currentNode.value.children) {
    currentNode.value.children = []
  }
  currentNode.value.children.push({
    id: Date.now(),
    label: newNode.name,
    code: newNode.code,
    children: []
  })
  tableData.value = currentNode.value.children
  showAddDialog.value = false
  Object.assign(newNode, { name: '', code: '' })
  ElMessage.success('添加成功')
}

const filterNode = (value, data) => {
  if (!value) return true
  return data.label.includes(value)
}

const handleImport = () => {
  importResult.value = { success: 6, failed: 1 }
  importErrors.value = [{ rowNo: 2, field: '编码', message: '编码重复' }]
  ElMessage.success(`导入预检完成，策略：${importStrategy.value}`)
}

const handleExport = () => {
  const total = exportRange.value === 'all' ? treeData.value.length : tableData.value.length
  exportTasks.value.unshift({
    id: Date.now(),
    createdAt: new Date().toLocaleString('zh-CN'),
    targetType: activeTab.value === 'area' ? '行政区划' : '条线',
    total,
    status: 'success',
    statusText: '已完成'
  })
  ElMessage.success(`导出任务已创建，共${total}条`)
}

const downloadExportFile = (task) => {
  const content = [
    `导出类型,${task.targetType}`,
    `导出条数,${task.total}`
  ].join('\n')
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', `line-export-${task.id}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
  ElMessage.success('导出文件下载已开始')
}

const downloadImportErrors = () => {
  const content = ['rowNo,field,message', ...importErrors.value.map((item) => `${item.rowNo},${item.field},${item.message}`)].join('\n')
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', 'line-import-errors.csv')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
.no-padding-card { padding: 0; }
.mb-0-tabs { margin-bottom: 0; }
.layout-row { border-top: 1px solid #e5e6eb; }
.left-pane { border-right: 1px solid #e5e6eb; min-height: calc(100vh - 150px); }
.left-search { padding: 16px; }
.full-width { width: 100%; }
.left-tree { height: calc(100vh - 230px); overflow-y: auto; padding: 0 16px; }
.right-pane { padding: 20px; }
.node-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.node-title { margin: 0 0 4px 0; font-size: 20px; font-weight: 500; }
.muted { color: #86909c; margin: 0; }
.action-row { margin-bottom: 16px; }
.btn-muted { margin-left: 8px; background: #f2f3f5; border-color: #f2f3f5; color: #86909c; }
.ml-8 { margin-left: 8px; }
.mt-24 { margin-top: 24px; }
.empty-block { margin: 80px 0; }
.empty-top { margin-top: 100px; }
.pager-wrap { text-align: right; margin-top: 24px; }
.upload-tip { color: #666; font-size: 12px; margin-top: 8px; }
.import-footer { display: flex; justify-content: space-between; }
.mr-16 { margin-right: 16px; }
</style>
