<template>
  <div class="display-settings">

    <!-- 通讯录信息展示配置 -->
    <el-card class="setting-card">
      <template #header>
        <div class="card-header">
          <span class="title">通讯录信息展示</span>
          <el-button type="primary" size="small" @click="saveContactSettings" :loading="saving">保存</el-button>
        </div>
      </template>
      <el-form label-width="180px">
        <el-form-item label="展示人员范围">
          <el-checkbox v-model="contactConfig.showScope.all">全选</el-checkbox>
          <el-checkbox v-model="contactConfig.showScope.inactive" class="ml-16">未激活</el-checkbox>
          <el-checkbox v-model="contactConfig.showScope.active" class="ml-16">已激活</el-checkbox>
          <el-checkbox v-model="contactConfig.showScope.frozen" class="ml-16">已冻结</el-checkbox>
        </el-form-item>
        <el-form-item label="搜索人员范围">
          <el-checkbox v-model="contactConfig.searchScope.all">全选</el-checkbox>
          <el-checkbox v-model="contactConfig.searchScope.inactive" class="ml-16">未激活</el-checkbox>
          <el-checkbox v-model="contactConfig.searchScope.active" class="ml-16">已激活</el-checkbox>
          <el-checkbox v-model="contactConfig.searchScope.frozen" class="ml-16">已冻结</el-checkbox>
        </el-form-item>
        <el-form-item label="展示状态标签">
          <el-checkbox v-model="contactConfig.showTag.all">全选</el-checkbox>
          <el-checkbox v-model="contactConfig.showTag.inactive" class="ml-16">未激活</el-checkbox>
          <el-checkbox v-model="contactConfig.showTag.active" class="ml-16">已激活</el-checkbox>
          <el-checkbox v-model="contactConfig.showTag.frozen" class="ml-16">已冻结</el-checkbox>
        </el-form-item>
        <el-form-item label="展示部门路径">
          <el-radio v-model="contactConfig.branchPathType" label="full">完整路径</el-radio>
          <el-radio v-model="contactConfig.branchPathType" label="current" class="ml-24">当前部门</el-radio>
          <el-radio v-model="contactConfig.branchPathType" label="custom" class="ml-24">自定义</el-radio>
          <div class="ml-40 mt-8" v-if="contactConfig.branchPathType === 'custom'">
            从第
            <el-input-number v-model="contactConfig.customBranchStart" :min="1" :max="10" size="small" class="w-80 mx-8" />
            级部门展示到当前部门
          </div>
        </el-form-item>
        <el-form-item label="部门路径超出显示规则">
          <el-radio v-model="contactConfig.branchOverflowRule" label="head">头部缩进</el-radio>
          <el-radio v-model="contactConfig.branchOverflowRule" label="tail" class="ml-24">尾部缩进</el-radio>
          <el-icon class="help-icon"><QuestionFilled /></el-icon>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 用户信息展示配置 -->
    <el-card class="setting-card">
      <template #header>
        <div class="card-header">
          <span class="title">用户信息展示</span>
          <el-button type="primary" size="small" @click="saveUserSettings" :loading="saving">保存</el-button>
        </div>
      </template>
      <el-form label-width="240px">
        <el-form-item label="不同单位/行政区划部门路径显示规则">
          <el-radio v-model="userConfig.branchShowRule" label="unit">仅展示单位节点部门名称</el-radio>
          <el-radio v-model="userConfig.branchShowRule" label="region" class="ml-24">仅展示行政区划节点部门名称</el-radio>
          <el-radio v-model="userConfig.branchShowRule" label="full" class="ml-24">展示部门路径</el-radio>
          <el-icon class="help-icon"><QuestionFilled /></el-icon>
          <div class="ml-24 mt-8">
            <el-checkbox v-model="userConfig.showRegionName">同时展示行政区划名称</el-checkbox>
          </div>
        </el-form-item>
        <el-form-item label="私聊会话是否展示部门信息">
          <el-radio v-model="userConfig.privateShowBranch" label="no">不显示</el-radio>
          <el-radio v-model="userConfig.privateShowBranch" label="yes" class="ml-24">显示</el-radio>
          <el-icon class="help-icon"><QuestionFilled /></el-icon>
        </el-form-item>
        <el-form-item label="私聊会话部门信息显示规则" v-if="userConfig.privateShowBranch === 'yes'">
          <el-radio v-model="userConfig.privateBranchRule" label="unit">仅展示单位节点部门名称</el-radio>
          <el-radio v-model="userConfig.privateBranchRule" label="region" class="ml-24">仅展示行政区划节点部门名称</el-radio>
          <el-radio v-model="userConfig.privateBranchRule" label="full" class="ml-24">展示部门路径</el-radio>
          <el-icon class="help-icon"><QuestionFilled /></el-icon>
        </el-form-item>
        <el-form-item label="群聊会话部门信息显示规则">
          <el-radio v-model="userConfig.groupBranchRule" label="none">默认不展示部门信息</el-radio>
          <el-radio v-model="userConfig.groupBranchRule" label="unit" class="ml-24">仅展示单位节点部门名称</el-radio>
          <el-radio v-model="userConfig.groupBranchRule" label="region" class="ml-24">仅展示行政区划节点部门名称</el-radio>
          <el-icon class="help-icon"><QuestionFilled /></el-icon>
          <div class="ml-24 mt-8">
            <el-checkbox v-model="userConfig.groupShowRegionName">同时展示行政区划名称</el-checkbox>
          </div>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 个人卡片字段配置 -->
    <el-card class="setting-card">
      <template #header>
        <div class="card-header">
          <span class="title">个人卡片展示配置</span>
          <el-button type="primary" size="small" @click="saveCardSettings" :loading="saving">保存</el-button>
        </div>
      </template>
      <div class="card-config">
        <div class="preview-area">
          <div class="phone-preview">
            <div class="phone-header">
              <el-icon class="mr-8"><ArrowLeft /></el-icon>
              <span>返回</span>
            </div>
            <div class="user-info">
              <div class="avatar"></div>
              <div class="name">张思婧</div>
              <div class="dept">示例公司组织 产品中心 高级工程师</div>
            </div>
            <div class="field-list">
              <div class="field-item" v-for="(group, groupIndex) in cardConfig.groups" :key="group.id">
                <div class="group-title" v-if="group.name">{{ group.name }}</div>
                <div class="field-row" v-for="field in group.fields" :key="field.key">
                  <span>{{ field.label }}</span>
                  <span>...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="config-area">
          <div class="group-list">
            <div class="group-item" v-for="(group, groupIndex) in cardConfig.groups" :key="group.id">
              <div class="group-header">
                <span>{{ group.name || `分组${groupIndex + 1}` }}</span>
                <div class="group-actions">
                  <el-button type="text" size="small" @click="moveGroup(groupIndex, 'up')" :disabled="groupIndex === 0">
                    <el-icon><Top /></el-icon>
                  </el-button>
                  <el-button type="text" size="small" @click="moveGroup(groupIndex, 'down')" :disabled="groupIndex === cardConfig.groups.length - 1">
                    <el-icon><Bottom /></el-icon>
                  </el-button>
                  <el-button type="text" size="small" @click="editGroup(groupIndex)">
                    <el-icon><Setting /></el-icon>
                  </el-button>
                  <el-button type="text" size="small" @click="deleteGroup(groupIndex)" :disabled="cardConfig.groups.length <= 1">
                    <el-icon><Delete /></el-icon>
                  </el-button>
                </div>
              </div>
              <div class="group-fields">
                <div class="field-item" v-for="field in group.fields" :key="field.key">
                  {{ field.label }}
                </div>
              </div>
            </div>
          </div>
          <el-button type="primary" plain class="full-width mt-16" @click="addGroup">
            <el-icon><Plus /></el-icon> 添加分组
          </el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { ArrowLeft, QuestionFilled, Top, Bottom, Setting, Delete, Plus } from '@element-plus/icons-vue'

const saving = ref(false)

// 通讯录配置
const contactConfig = reactive({
  showScope: {
    all: true,
    inactive: true,
    active: false,
    frozen: true
  },
  searchScope: {
    all: true,
    inactive: true,
    active: false,
    frozen: true
  },
  showTag: {
    all: true,
    inactive: true,
    active: false,
    frozen: true
  },
  branchPathType: 'full' as 'full' | 'current' | 'custom',
  customBranchStart: 2,
  branchOverflowRule: 'head' as 'head' | 'tail'
})

// 用户信息配置
const userConfig = reactive({
  branchShowRule: 'unit' as 'unit' | 'region' | 'full',
  showRegionName: true,
  privateShowBranch: 'yes' as 'yes' | 'no',
  privateBranchRule: 'full' as 'unit' | 'region' | 'full',
  groupBranchRule: 'unit' as 'none' | 'unit' | 'region',
  groupShowRegionName: true
})

// 卡片配置
const cardConfig = reactive({
  groups: [
    {
      id: 1,
      name: '基础信息',
      fields: [
        { key: 'phone', label: '手机' },
        { key: 'sign', label: '签名' },
        { key: 'intro', label: '简介' },
        { key: 'workNo', label: '工号' },
        { key: 'email', label: '邮箱' },
        { key: 'post', label: '岗位' },
        { key: 'address', label: '办公地址' },
        { key: 'contact', label: '联系方式' }
      ]
    },
    {
      id: 2,
      name: '自定义字段',
      fields: [
        { key: 'custom1', label: '职务/部门' },
        { key: 'custom2', label: '任职类型' },
        { key: 'custom3', label: '职务层次' },
        { key: 'custom4', label: '人员角色' },
        { key: 'custom5', label: '办公电话' }
      ]
    }
  ]
})

// 保存通讯录配置
const saveContactSettings = async () => {
  saving.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    ElMessage.success('通讯录信息配置保存成功')
  } finally {
    saving.value = false
  }
}

// 保存用户信息配置
const saveUserSettings = async () => {
  saving.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    ElMessage.success('用户信息配置保存成功')
  } finally {
    saving.value = false
  }
}

// 保存卡片配置
const saveCardSettings = async () => {
  saving.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    ElMessage.success('卡片配置保存成功')
  } finally {
    saving.value = false
  }
}

// 分组操作
const moveGroup = (index: number, direction: 'up' | 'down') => {
  const targetIndex = direction === 'up' ? index - 1 : index + 1
  const temp = cardConfig.groups[index]
  cardConfig.groups[index] = cardConfig.groups[targetIndex]
  cardConfig.groups[targetIndex] = temp
}

const editGroup = (index: number) => {
  ElMessage.info('编辑分组功能开发中')
}

const deleteGroup = (index: number) => {
  cardConfig.groups.splice(index, 1)
  ElMessage.success('分组已删除')
}

const addGroup = () => {
  cardConfig.groups.push({
    id: Date.now(),
    name: `新分组${cardConfig.groups.length + 1}`,
    fields: []
  })
}
</script>

<style scoped>
.display-settings {
  padding: 24px;
  background-color: #f5f7fa;
  min-height: calc(100vh - 60px);
}
.setting-card {
  margin-bottom: 24px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card-header .title {
  font-size: 16px;
  font-weight: 600;
  color: #1d2129;
  border-left: 3px solid #4080ff;
  padding-left: 12px;
}
.tips-text { margin-top: 8px; color: #666; font-size: 13px; }
.head-title { font-size: 16px; font-weight: 600; }
.icon-row { display: flex; gap: 12px; }
.ml-16 { margin-left: 16px; }
.ml-24 { margin-left: 24px; }
.ml-40 { margin-left: 40px; }
.ml-48 { margin-left: 48px; }
.mt-8 { margin-top: 8px; }
.mt-16 { margin-top: 16px; }
.mr-8 { margin-right: 8px; }
.mx-8 { margin: 0 8px; }
.w-80 { width: 80px; }
.full-width { width: 100%; }
.help-icon { margin-left: 8px; color: #999; cursor: help; }
.template-preview {
  display: flex;
  margin-top: 24px;
}
.preview-item .preview-title {
  font-size: 14px;
  color: #4e5969;
  margin-bottom: 12px;
  text-align: center;
}
.preview-mock {
  width: 300px;
  border: 1px solid #e5e6eb;
  border-radius: 24px;
  background-color: #fff;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}
.mock-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  margin-bottom: 12px;
}
.mock-tabs {
  display: flex;
  border-bottom: 1px solid #f2f3f5;
  margin-bottom: 16px;
}
.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 0;
  font-size: 12px;
  color: #86909c;
  gap: 4px;
}
.tab-item.active {
  color: #4080ff;
  border-bottom: 2px solid #4080ff;
}
.mock-dept {
  margin-bottom: 16px;
}
.dept-name {
  font-size: 14px;
  font-weight: 600;
  color: #1d2129;
  margin-bottom: 4px;
}
.dept-count {
  font-size: 12px;
  color: #86909c;
}
.mock-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
.grid-item {
  text-align: center;
}
.grid-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #f2f3f5;
  margin: 0 auto 6px;
}
.grid-name {
  font-size: 12px;
  font-weight: 500;
  color: #1d2129;
  margin-bottom: 2px;
}
.grid-post {
  font-size: 11px;
  color: #86909c;
}
.mock-breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #4080ff;
  margin-bottom: 12px;
}
.mock-list .list-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px solid #f7f8fa;
}
.list-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #f2f3f5;
}
.list-info .list-name {
  font-size: 14px;
  font-weight: 500;
  color: #1d2129;
  margin-bottom: 2px;
}
.list-info .list-dept {
  font-size: 12px;
  color: #86909c;
}
.card-config {
  display: flex;
  gap: 48px;
}
.preview-area {
  flex: 0 0 320px;
}
.phone-preview {
  width: 300px;
  border: 1px solid #e5e6eb;
  border-radius: 24px;
  background-color: #fff;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}
.phone-header {
  display: flex;
  align-items: center;
  height: 40px;
  font-size: 14px;
  color: #1d2129;
  margin-bottom: 16px;
}
.user-info {
  text-align: center;
  margin-bottom: 24px;
}
.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #f2f3f5;
  margin: 0 auto 12px;
}
.name {
  font-size: 18px;
  font-weight: 600;
  color: #1d2129;
  margin-bottom: 8px;
}
.dept {
  font-size: 13px;
  color: #86909c;
}
.field-list .group-title {
  font-size: 13px;
  color: #86909c;
  padding: 8px 12px;
  background-color: #f2f3f5;
  margin: 16px 0 8px;
  border-radius: 4px;
}
.field-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #f2f3f5;
  font-size: 14px;
  color: #1d2129;
}
.config-area {
  flex: 1;
}
.group-list .group-item {
  border: 1px solid #e5e6eb;
  border-radius: 8px;
  margin-bottom: 16px;
  background-color: #fff;
}
.group-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #f2f3f5;
  font-size: 14px;
  font-weight: 500;
  color: #1d2129;
}
.group-actions {
  display: flex;
  gap: 4px;
}
.group-fields .field-item {
  padding: 10px 16px;
  font-size: 14px;
  color: #4e5969;
  border-bottom: 1px solid #f7f8fa;
}
.group-fields .field-item:last-child {
  border-bottom: none;
}
</style>
