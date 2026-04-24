<template>
  <div class="import-export-page">
    <el-card class="page-section">
      <template #header>
        <span>数据导入</span>
      </template>
      
      <el-row :gutter="24">
        <el-col :span="12">
          <el-card shadow="hover">
            <h4 class="section-heading">人员数据导入</h4>
            <el-form label-width="100px">
              <el-form-item label="导入类型">
                <el-radio-group v-model="importData.personType">
                  <el-radio label="all">全部覆盖</el-radio>
                  <el-radio label="add">增量新增</el-radio>
                  <el-radio label="update">仅更新</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="选择文件">
                <el-upload action="#" :auto-upload="false">
                  <el-button>选择文件</el-button>
                </el-upload>
                <p class="helper-text">支持 .xlsx、.xls 格式，单次最多导入1000条</p>
              </el-form-item>
              <el-alert
                v-if="personImportResult"
                :type="personImportResult.failed > 0 ? 'warning' : 'success'"
                :closable="false"
                :title="`预检完成：成功${personImportResult.success}条，失败${personImportResult.failed}条`"
                class="mb-8"
              />
              <el-table v-if="personImportErrors.length" :data="personImportErrors" size="small" class="mb-8">
                <el-table-column prop="rowNo" label="行号" width="70" />
                <el-table-column prop="field" label="字段" width="100" />
                <el-table-column prop="message" label="错误原因" />
              </el-table>
              <el-form-item>
                <el-button type="primary" @click="handleImport('person')">开始导入</el-button>
                <el-button v-if="personImportErrors.length" class="ml-8" @click="downloadImportErrors('person')">下载错误明细</el-button>
                <el-button class="ml-8">下载模板</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card shadow="hover">
            <h4 class="section-heading">组织架构导入</h4>
            <el-form label-width="100px">
              <el-form-item label="导入类型">
                <el-radio-group v-model="importData.orgType">
                  <el-radio label="all">全部覆盖</el-radio>
                  <el-radio label="add">增量新增</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="选择文件">
                <el-upload action="#" :auto-upload="false">
                  <el-button>选择文件</el-button>
                </el-upload>
                <p class="helper-text">支持 .xlsx、.xls 格式，单次最多导入500条</p>
              </el-form-item>
              <el-alert
                v-if="orgImportResult"
                :type="orgImportResult.failed > 0 ? 'warning' : 'success'"
                :closable="false"
                :title="`预检完成：成功${orgImportResult.success}条，失败${orgImportResult.failed}条`"
                class="mb-8"
              />
              <el-table v-if="orgImportErrors.length" :data="orgImportErrors" size="small" class="mb-8">
                <el-table-column prop="rowNo" label="行号" width="70" />
                <el-table-column prop="field" label="字段" width="100" />
                <el-table-column prop="message" label="错误原因" />
              </el-table>
              <el-form-item>
                <el-button type="primary" @click="handleImport('org')">开始导入</el-button>
                <el-button v-if="orgImportErrors.length" class="ml-8" @click="downloadImportErrors('org')">下载错误明细</el-button>
                <el-button class="ml-8">下载模板</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
    
    <el-card>
      <template #header>
        <span>数据导出</span>
      </template>
      
      <el-button type="primary" @click="showExportDialog = true" class="page-section">导出人员</el-button>
      
      <el-table :data="exportRecords" stripe>
        <el-table-column prop="type" label="导出类型" />
        <el-table-column prop="range" label="导出范围" />
        <el-table-column prop="fields" label="导出字段" />
        <el-table-column prop="createTime" label="导出时间" />
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            <el-tag :type="row.status === 'success' ? 'success' : 'info'">{{ row.status === 'success' ? '已完成' : '处理中' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template #default="{ row }">
            <el-button size="small" v-if="row.status === 'success'">下载</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    
    <!-- 导出人员弹窗 -->
    <el-dialog v-model="showExportDialog" title="导出人员" width="900px">
      <el-form :model="exportForm" label-width="100px">
        <el-form-item label="导出人员">
          <el-radio-group v-model="exportForm.exportType">
            <el-radio label="select">选择人员</el-radio>
            <el-radio label="branch" class="ml-40">按部门选择</el-radio>
            <el-radio label="tag" class="ml-40">按人员标签选择</el-radio>
          </el-radio-group>
          <el-select placeholder="请选择人员" class="full-width mt-16">
            <el-option label="全部人员" value="all" />
          </el-select>
        </el-form-item>
        
        <el-form-item label="选择字段">
          <div class="field-box">
            <el-tag v-for="field in exportFields" :key="field" closable effect="plain" class="field-tag">{{ field }}</el-tag>
          </div>
        </el-form-item>
        
        <el-form-item label="文件密码">
          <el-radio-group v-model="exportForm.hasPassword">
            <el-radio :label="false">无</el-radio>
            <el-radio :label="true" class="ml-40">有</el-radio>
          </el-radio-group>
          <el-input placeholder="请输入4-12位数字、字母或符号" class="password-input" v-if="exportForm.hasPassword" />
        </el-form-item>
        
        <div class="info-row">
          <el-icon class="info-icon"><InfoFilled /></el-icon>
          <span>人员基本信息中包含很多涉密信息，建议使用有密码的方式进行导出；为了您的信息安全，您设置的密码系统不会进行保存，请您务必牢记您的文件密码</span>
        </div>
      </el-form>
      
      <template #footer>
        <div class="footer-actions">
          <el-button @click="showExportDialog = false" class="mr-16">取消</el-button>
          <el-button type="primary" @click="doExport">提交</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { InfoFilled } from '@element-plus/icons-vue'

const showExportDialog = ref(false)

const importData = reactive({
  personType: 'add',
  orgType: 'add'
})
const personImportResult = ref(null)
const orgImportResult = ref(null)
const personImportErrors = ref([])
const orgImportErrors = ref([])

const exportForm = reactive({
  exportType: 'select',
  hasPassword: true
})

const exportFields = [
  '工号', '身份证号码', '手机', '邮箱', '办公地址', '联系方式', '性别', '姓名',
  '用户名', '籍贯', '部门', '党派', '出生日期', '登录方式', '状态', '别名',
  '入职日期', '首次工作时间', '家庭住址', '传真', '职务/人员', '民族', '政治面貌',
  '职级', '人员编制'
]

const exportRecords = ref([
  { id: 1, type: '人员导出', range: '全部人员', fields: '25个字段', createTime: '2026-04-19 15:30:00', status: 'success' },
  { id: 2, type: '组织架构导出', range: '湖北省', fields: '8个字段', createTime: '2026-04-18 10:15:00', status: 'success' }
])

const handleImport = (type) => {
  if (type === 'person') {
    personImportResult.value = { success: 8, failed: 2 }
    personImportErrors.value = [
      { rowNo: 3, field: '部门', message: '部门不存在' },
      { rowNo: 7, field: '任职类型', message: '主职重复' }
    ]
    ElMessage.success(`人员导入预检完成，策略：${importData.personType}`)
    return
  }
  orgImportResult.value = { success: 6, failed: 1 }
  orgImportErrors.value = [{ rowNo: 2, field: '组织编码', message: '编码重复' }]
  ElMessage.success(`组织导入预检完成，策略：${importData.orgType}`)
}

const downloadImportErrors = (type) => {
  const rows = type === 'person' ? personImportErrors.value : orgImportErrors.value
  if (!rows.length) {
    ElMessage.warning('暂无错误明细可下载')
    return
  }
  const content = ['rowNo,field,message', ...rows.map((item) => `${item.rowNo},${item.field},${item.message}`)].join('\n')
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', type === 'person' ? 'person-import-errors.csv' : 'org-import-errors.csv')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

const doExport = () => {
  exportRecords.value.unshift({
    id: Date.now(),
    type: '人员导出',
    range: '全部人员',
    fields: exportFields.length + '个字段',
    createTime: new Date().toLocaleString('zh-CN'),
    status: 'success'
  })
  showExportDialog.value = false
  ElMessage.success('导出成功')
}
</script>

<style scoped>
.helper-text { color: #666; font-size: 12px; margin-top: 8px; }
.mb-8 { margin-bottom: 8px; }
.ml-8 { margin-left: 8px; }
.ml-40 { margin-left: 40px; }
.mr-16 { margin-right: 16px; }
.mt-16 { margin-top: 16px; }
.full-width { width: 100%; }
.field-box { border: 1px solid #e4e7ed; border-radius: 4px; padding: 16px; min-height: 180px; }
.field-tag { margin-right: 8px; margin-bottom: 12px; background-color: #e8f3ff; border-color: #b3d8ff; color: #4080ff; height: 32px; line-height: 30px; padding: 0 12px; }
.password-input { width: 400px; margin-left: 24px; }
.info-row { margin-top: 16px; display: flex; align-items: flex-start; color: #4e5969; font-size: 14px; line-height: 22px; }
.info-icon { margin-right: 8px; margin-top: 2px; color: #4080ff; }
.footer-actions { text-align: right; }
</style>
