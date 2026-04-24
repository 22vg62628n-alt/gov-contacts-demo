<template>
  <div class="custom-fields-page">
    <el-card>
      <template #header>
        <div class="header-row">
          <span>自定义字段管理</span>
          <el-button type="primary" @click="showAddDialog = true">+ 添加字段</el-button>
        </div>
      </template>
      
      <el-table :data="fields" stripe>
        <el-table-column prop="name" label="字段名" />
        <el-table-column prop="type" label="字段类型">
          <template #default="{ row }">
            {{ typeMap[row.type] }}
          </template>
        </el-table-column>
        <el-table-column prop="required" label="是否必填">
          <template #default="{ row }">
            <el-tag :type="row.required ? 'success' : 'info'">{{ row.required ? '是' : '否' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="clientEdit" label="客户端修改">
          <template #default="{ row }">
            <el-tag :type="row.clientEdit ? 'warning' : 'info'">{{ row.clientEdit ? '允许' : '禁止' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="contentType" label="内容格式" />
        <el-table-column label="操作" width="150">
          <template #default>
            <el-button size="small">编辑</el-button>
            <el-button size="small" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    
    <!-- 添加字段弹窗 -->
    <el-dialog v-model="showAddDialog" title="添加字段" width="600px">
      <el-form :model="newField" label-width="120px">
        <el-form-item label="字段名" required>
          <el-input v-model="newField.name" placeholder="请输入" maxlength="15" show-word-limit>
            <template #append>
              <el-button type="text" icon="global" />
            </template>
          </el-input>
        </el-form-item>
        
        <el-form-item label="字段类型">
          <el-radio-group v-model="newField.type">
            <el-radio label="person">人员属性</el-radio>
            <el-radio label="dept_member">部门成员属性</el-radio>
            <el-radio label="dept">部门属性</el-radio>
          </el-radio-group>
        </el-form-item>
        
        <el-form-item label="是否必填">
          <el-radio-group v-model="newField.required">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        
        <el-form-item label="客户端修改">
          <el-radio-group v-model="newField.clientEdit">
            <el-radio :label="false">禁止</el-radio>
            <el-radio :label="true">允许</el-radio>
          </el-radio-group>
        </el-form-item>
        
        <el-form-item label="内容格式">
          <el-select v-model="newField.contentType" placeholder="请选择" class="full-width">
            <el-option label="文本" value="text" />
            <el-option label="联系方式" value="contact" />
            <el-option label="短号" value="shortNumber" />
            <el-option label="网址" value="url" />
            <el-option label="邮箱" value="email" />
            <el-option label="日期" value="date" />
            <el-option label="人员" value="person" />
            <el-option label="自定义选项" value="custom" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showAddDialog = false">取消</el-button>
        <el-button type="primary" @click="handleAdd">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

const showAddDialog = ref(false)
const typeMap = {
  'person': '人员属性',
  'dept_member': '部门成员属性',
  'dept': '部门属性'
}

const fields = ref([
  { id: 1, name: '职级', type: 'person', required: false, clientEdit: false, contentType: '文本' },
  { id: 2, name: '政治面貌', type: 'person', required: false, clientEdit: false, contentType: '自定义选项' },
  { id: 3, name: '编制类型', type: 'person', required: false, clientEdit: false, contentType: '自定义选项' },
  { id: 4, name: '办公电话', type: 'person', required: false, clientEdit: true, contentType: '联系方式' },
  { id: 5, name: '邮箱', type: 'person', required: false, clientEdit: true, contentType: '邮箱' }
])

const newField = reactive({
  name: '',
  type: 'dept_member',
  required: false,
  clientEdit: false,
  contentType: 'text'
})

const handleAdd = () => {
  if (!newField.name) {
    ElMessage.warning('请输入字段名')
    return
  }
  fields.value.unshift({
    id: Date.now(),
    ...newField
  })
  ElMessage.success('添加成功')
  showAddDialog.value = false
  Object.assign(newField, { name: '', type: 'dept_member', required: false, clientEdit: false, contentType: 'text' })
}
</script>

<style scoped>
.header-row { display: flex; justify-content: space-between; align-items: center; }
.full-width { width: 100%; }
</style>
