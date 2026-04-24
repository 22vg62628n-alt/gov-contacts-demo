<template>
  <div class="dept-detail-page">
    <el-card>
      <template #header>
        <div class="header-row">
          <span>部门详情</span>
          <div>
            <el-button @click="editMode = !editMode">{{ editMode ? '取消编辑' : '编辑' }}</el-button>
            <el-button type="primary" v-if="editMode" @click="saveDept">保存</el-button>
          </div>
        </div>
      </template>
      
      <div v-if="!editMode">
        <div class="summary-block">
          <h3 class="summary-title">{{ dept.name }}</h3>
          <p class="summary-sub">部门编码: {{ dept.code }}</p>
        </div>
      </div>
      
      <el-form :model="dept" label-width="120px" v-if="editMode">
        <el-form-item label="部门名称" required>
          <el-input v-model="dept.name" />
          <div class="count-tip">{{ dept.name.length }}/32</div>
        </el-form-item>
        <el-form-item label="上级部门">
          <el-input disabled :value="dept.parentName" />
        </el-form-item>
      </el-form>
      
      <!-- 部门信息 -->
      <h4 class="section-title-sm">部门信息</h4>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form :model="dept" label-width="120px" :disabled="!editMode">
            <el-form-item label="部门类型" required>
              <el-select v-model="dept.type">
                <el-option label="单位" value="unit" />
                <el-option label="部门" value="dept" />
                <el-option label="小组" value="group" />
              </el-select>
            </el-form-item>
            <el-form-item label="行政区划">
              <el-select v-model="dept.area" placeholder="请选择">
                <el-option label="湖北省" value="420000" />
                <el-option label="武汉市" value="420100" />
                <el-option label="武昌区" value="420106" />
              </el-select>
            </el-form-item>
            <el-form-item label="条线">
              <el-select v-model="dept.line" placeholder="请选择">
                <el-option label="综合" value="ZH" />
                <el-option label="教育" value="JY" />
                <el-option label="公安" value="GA" />
              </el-select>
            </el-form-item>
            <el-form-item label="机构职级">
              <el-select v-model="dept.level" placeholder="请选择">
                <el-option label="部级" value="1" />
                <el-option label="厅级" value="2" />
                <el-option label="处级" value="3" />
                <el-option label="科级" value="4" />
              </el-select>
            </el-form-item>
            <el-form-item label="单位全称">
              <el-input v-model="dept.fullName" maxlength="200" show-word-limit />
            </el-form-item>
            <el-form-item label="联系人员">
              <el-select v-model="dept.contact" placeholder="请选择">
                <el-option label="张明远" value="1" />
                <el-option label="李建国" value="2" />
              </el-select>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="dept.email" maxlength="254" show-word-limit />
            </el-form-item>
            <el-form-item label="通讯地址">
              <el-input v-model="dept.address" maxlength="200" show-word-limit />
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-form :model="dept" label-width="120px" :disabled="!editMode">
            <el-form-item label="部门标签">
              <el-select v-model="dept.tags" multiple placeholder="请选择">
                <el-option label="测试部门标签" value="tag1" />
                <el-option label="麻辣香锅" value="tag2" />
                <el-option label="部门等级/一级(L1)" value="tag3" />
              </el-select>
            </el-form-item>
            <el-form-item label="组织机构代码">
              <el-input v-model="dept.orgCode" maxlength="200" show-word-limit />
            </el-form-item>
            <el-form-item label="统一信用代码">
              <el-input v-model="dept.creditCode" maxlength="200" show-word-limit />
            </el-form-item>
            <el-form-item label="邮政编码">
              <el-input v-model="dept.zipCode" maxlength="200" show-word-limit />
            </el-form-item>
            <el-form-item label="其他名称">
              <el-input v-model="dept.otherName" maxlength="200" show-word-limit />
            </el-form-item>
            <el-form-item label="负责人">
              <el-select v-model="dept.manager" placeholder="请选择">
                <el-option label="邓文佳A" value="1" />
                <el-option label="李晗" value="2" />
              </el-select>
            </el-form-item>
            <el-form-item label="电话">
              <div class="contact-inline">
                <el-select v-model="dept.phonePrefix" class="prefix-select">
                  <el-option label="+86" value="+86" />
                </el-select>
                <el-input v-model="dept.phone" class="grow-input" />
              </div>
            </el-form-item>
            <el-form-item label="简介">
              <el-input v-model="dept.desc" type="textarea" maxlength="200" show-word-limit />
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      
      <!-- 人员列表 -->
      <div class="member-section">
        <div class="member-header">
          <h4 class="member-title">部门成员</h4>
          <el-button type="primary" size="small" v-if="editMode">+ 添加成员</el-button>
        </div>
        <el-table :data="persons" stripe>
          <el-table-column prop="name" label="姓名" />
          <el-table-column prop="position" label="职务" />
          <el-table-column prop="rank" label="职级" />
          <el-table-column prop="mobile" label="手机号" />
          <el-table-column label="操作" width="120" v-if="editMode">
            <template #default>
              <el-button size="small" type="danger">移除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const editMode = ref(false)
const dept = reactive({
  id: 1,
  name: '服务端开发',
  code: 'FWKF001',
  parentName: '元宇宙回归测试',
  type: 'unit',
  area: '420100',
  line: 'JY',
  level: '3',
  fullName: '湖北省政府办公厅服务开发部',
  contact: '1',
  email: 'fuwu@gov.cn',
  address: '湖北省武汉市武昌区',
  tags: ['tag1', 'tag3'],
  orgCode: '12345678-9',
  creditCode: '91420000XXXXXXXXX',
  zipCode: '430000',
  otherName: '省府办开发部',
  manager: '1',
  phonePrefix: '+86',
  phone: '18611145947',
  desc: '负责政务系统服务端开发工作'
})

const persons = ref([
  { id: 1, name: '段江', position: '处长', rank: '一级调研员', mobile: '138****1234' },
  { id: 2, name: '闫石', position: '副处长', rank: '二级调研员', mobile: '139****5678' },
  { id: 3, name: '张生杰', position: '主任科员', rank: '一级主任科员', mobile: '137****9012' }
])

const saveDept = () => {
  editMode.value = false
  ElMessage.success('保存成功')
}
</script>

<style scoped>
.header-row { display: flex; justify-content: space-between; align-items: center; }
.summary-block { border-left: 3px solid #4080ff; padding-left: 12px; margin-bottom: 24px; }
.summary-title { margin: 0 0 4px 0; font-size: 16px; }
.summary-sub { color: #86909c; margin: 0; }
.count-tip { text-align: right; font-size: 12px; color: #86909c; }
.section-title-sm { font-size: 14px; font-weight: 500; margin: 32px 0 16px 0; border-left: 3px solid #4080ff; padding-left: 12px; }
.prefix-select { width: 80px; }
.grow-input { flex: 1; min-width: 0; }
.contact-inline { display: flex; align-items: center; width: 100%; }
.member-section { margin-top: 32px; }
.member-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.member-title { font-size: 14px; font-weight: 500; margin: 0; }
</style>
