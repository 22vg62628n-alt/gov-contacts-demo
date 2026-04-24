<template>
  <div class="dept-form-page">
    <el-card>
      <template #header>
        <span>{{ isEdit ? '编辑部门' : '添加部门' }}</span>
      </template>
      
      <el-form :model="form" label-width="120px">
        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item label="部门名称" required>
              <el-input v-model="form.name" placeholder="请输入部门名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门编码" required>
              <el-input v-model="form.code" placeholder="请输入部门编码" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item label="部门类型" required>
              <el-select v-model="form.deptType" placeholder="请选择部门类型" class="full-width">
                <el-option label="单位" value="unit" />
                <el-option label="部门" value="dept" />
                <el-option label="条线机构" value="line" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="行政区划">
              <el-select v-model="form.area" placeholder="请选择" class="full-width">
                <el-option label="湖北省" value="湖北省" />
                <el-option label="武汉市" value="武汉市" />
                <el-option label="武昌区" value="武昌区" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="条线归属">
              <el-select v-model="form.line" placeholder="请选择" class="full-width">
                <el-option label="综合" value="综合" />
                <el-option label="教育" value="教育" />
                <el-option label="公安" value="公安" />
                <el-option label="卫生" value="卫生" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="上级部门">
          <el-select v-model="form.parent" placeholder="请选择" class="full-width">
            <el-option label="无（顶级部门）" value="" />
            <el-option label="省政府办公厅" value="省政府办公厅" />
            <el-option label="省教育厅" value="省教育厅" />
          </el-select>
        </el-form-item>
        
        <el-form-item>
          <el-button @click="$router.back()">取消</el-button>
          <el-button type="primary" class="ml-8" @click="handleSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()

const isEdit = computed(() => route.name === 'DeptEdit')

const form = ref({
  name: '',
  code: '',
  deptType: '',
  area: '',
  line: '',
  parent: ''
})

const handleSubmit = () => {
  if (!form.value.name || !form.value.code || !form.value.deptType) {
    ElMessage.warning('请填写部门名称、部门编码和部门类型')
    return
  }
  const typeRequiredMap = {
    unit: ['area'],
    dept: ['area'],
    line: ['line', 'area']
  }
  const requiredKeys = typeRequiredMap[form.value.deptType] || []
  const missing = requiredKeys.filter((key) => !form.value[key])
  if (missing.length > 0) {
    ElMessage.warning(`当前部门类型下，字段 ${missing.join('、')} 为必填`)
    return
  }
  ElMessage.success('保存成功')
  router.push('/dept/org')
}
</script>

<style scoped>
.full-width { width: 100%; }
.ml-8 { margin-left: 8px; }
</style>
