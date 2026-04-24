<template>
  <div class="person-list-page">
    <!-- 顶部栏 -->
    <div class="page-header">
      <div class="header-left">
        <h2 class="page-title">组织架构</h2>
        <el-button type="primary" @click="showImportDialog = true">批量导入/更新</el-button>
      </div>
      <el-button @click="showDimissionDialog = true">离职员工</el-button>
    </div>
    
    <el-row :gutter="0">
      <!-- 左侧组织架构树 -->
      <el-col :span="6" class="left-pane">
        <div class="left-content">
          <div class="search-row">
            <el-input 
              placeholder="搜索" 
              v-model="treeSearch"
              class="search-input"
            >
              <template #suffix />
            </el-input>
            <el-button 
              type="primary" 
              class="search-btn"
            >
              <el-icon><Search /></el-icon>
            </el-button>
          </div>
          
          <el-tree
            :data="orgTree"
            :props="defaultProps"
            default-expand-all
            node-key="id"
            highlight-current
            draggable
            allow-drop="allowDrop"
            @node-click="handleNodeClick"
            @node-drop="handleNodeDrop"
            :filter-node-method="filterNode"
            class="tree-panel"
          >
            <template #default="{ node, data }">
              <div class="tree-node-content">
                <span>{{ node.label }}</span>
                <div class="tree-actions">
                  <el-button type="text" size="small" @click.stop="addSubDept(data)" class="node-action-btn">
                    <el-icon><Plus /></el-icon>
                  </el-button>
                  <el-button type="text" size="small" @click.stop="editDept(data)" class="node-action-btn">
                    <el-icon><Edit /></el-icon>
                  </el-button>
                  <el-button type="text" size="small" @click.stop="deleteDept(data, node)" class="node-action-btn danger" :disabled="node.level === 1">
                    <el-icon><Delete /></el-icon>
                  </el-button>
                </div>
              </div>
            </template>
          </el-tree>
        </div>
      </el-col>
      
      <!-- 右侧内容区 -->
      <el-col :span="18">
        <div class="right-content">
          <!-- 部门信息 -->
          <div class="dept-bar">
            <div class="dept-meta">
              <h3 class="dept-title">{{ currentDept.name }}</h3>
              <el-icon class="muted"><UserFilled /></el-icon>
              <span class="muted">{{ filteredPersons.length }}</span>
            </div>
            <div>
              <el-button type="text" class="table-action-btn" @click="showEditDeptDialog = true">编辑部门</el-button>
              <el-button type="text" class="table-action-btn ml-12" @click="showAddSubDeptDialog = true">添加子部门</el-button>
            </div>
          </div>
          
          <!-- 筛选栏 -->
          <el-row :gutter="16" class="filter-row">
            <el-col :span="6">
              <div class="filter-inline">
                <span class="filter-label">成员范围:</span>
                <el-select v-model="filter.memberRange" placeholder="当前部门成员" class="w-180">
                  <el-option label="当前部门成员" value="current" />
                  <el-option label="包含下级部门成员" value="all" />
                </el-select>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="filter-inline">
                <span class="filter-label">成员状态:</span>
                <el-select v-model="filter.status" placeholder="全部" class="w-120">
                  <el-option label="全部" value="all" />
                  <el-option label="已激活" value="active" />
                  <el-option label="未激活" value="inactive" />
                  <el-option label="已禁用" value="disabled" />
                </el-select>
              </div>
            </el-col>
          </el-row>
          
          <!-- 操作按钮栏 -->
          <div class="btn-group page-section">
            <el-button type="primary" @click="$router.push('/persons/add')">添加</el-button>
            <el-button class="btn-muted" :disabled="!canManage" @click="openTransferDialog">发起转调</el-button>
            <el-button class="btn-muted" @click="showExportDialog = true">导出</el-button>
            <el-button class="btn-muted" :disabled="!canManage" @click="showAdjustDeptDialog = true">调整部门</el-button>
            <el-button class="btn-muted" :disabled="!canManage" @click="showSortDialog = true">成员排序</el-button>
            <el-button class="btn-muted" :disabled="!canManage" @click="showResetPwdDialog = true">重置密码</el-button>
            <el-button class="btn-muted" :disabled="!canManage" @click="showDisableDialog = true">禁用</el-button>
            <el-button class="btn-muted" :disabled="!canManage" @click="showDeleteDialog = true">删除</el-button>
          </div>
          
          <!-- 人员表格 -->
          <el-table 
            :data="pagedPersons" 
            stripe 
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55" />
            <el-table-column prop="name" label="姓名" min-width="120">
              <template #default="{ row }">
                <el-button type="text" class="table-action-btn" @click="viewPerson(row)">{{ row.name }}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="account" label="账号" min-width="180" />
            <el-table-column prop="dept" label="部门" min-width="180" />
            <el-table-column prop="mainDept" label="主职部门" min-width="160" />
            <el-table-column prop="mainAppointmentType" label="任职类型" width="100" />
            <el-table-column prop="accountType" label="账号类型" width="100">
              <template #default>
                <span class="muted">自建</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="120">
              <template #default="{ row }">
                <el-button type="text" class="table-action-btn" @click="editPerson(row)">编辑</el-button>
                <el-button type="text" class="table-action-btn danger ml-8" @click="deletePerson(row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          
          <!-- 分页 -->
          <div class="pager-wrap">
            <el-pagination
              layout="prev, pager, next, jumper, sizes"
              :total="filteredPersons.length"
              :page-size="pageSize"
              :current-page="pageNo"
              :page-sizes="[10, 20, 50, 100]"
              @current-change="handlePageChange"
              @size-change="handlePageSizeChange"
              class="pager-right"
            />
          </div>
        </div>
      </el-col>
    </el-row>
    
    <!-- 导入弹窗 -->
    <el-dialog v-model="showImportDialog" title="批量导入人员" width="500px">
      <el-form>
        <el-form-item label="导入策略">
          <el-radio-group v-model="importStrategy">
            <el-radio label="add">新增</el-radio>
            <el-radio label="update">更新</el-radio>
            <el-radio label="all">全量覆盖</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="选择文件">
          <el-upload action="#" :auto-upload="false">
            <el-button>选择文件</el-button>
          </el-upload>
        </el-form-item>
        <el-alert type="info" title="支持 .xlsx、.xls 格式，单次最多导入1000条" :closable="false" />
        <el-alert v-if="importResult" :type="importResult.failed > 0 ? 'warning' : 'success'" :closable="false" class="mt-8"
          :title="`预检完成：成功${importResult.success}条，失败${importResult.failed}条`" />
        <el-table v-if="importErrors.length" :data="importErrors" size="small" class="mt-8">
          <el-table-column prop="rowNo" label="行号" width="70" />
          <el-table-column prop="field" label="字段" width="100" />
          <el-table-column prop="message" label="错误原因" />
        </el-table>
      </el-form>
      <template #footer>
        <el-button @click="showImportDialog = false">取消</el-button>
        <el-button v-if="importErrors.length" @click="downloadImportErrors">下载错误明细</el-button>
        <el-button type="primary" @click="handleImport">开始导入</el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="showExportDialog" title="导出人员" width="620px">
      <el-form label-width="100px">
        <el-form-item label="导出范围">
          <el-radio-group v-model="exportRange">
            <el-radio label="all">全部人员</el-radio>
            <el-radio label="selected">当前选中</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="导出字段">
          <el-checkbox-group v-model="exportFields">
            <el-checkbox label="姓名" />
            <el-checkbox label="账号" />
            <el-checkbox label="部门" />
            <el-checkbox label="职级" />
            <el-checkbox label="联系方式" />
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <el-table :data="exportTasks" size="small" max-height="180" class="mt-8">
        <el-table-column prop="createdAt" label="创建时间" width="170" />
        <el-table-column prop="rangeText" label="导出范围" width="100" />
        <el-table-column prop="fieldCount" label="字段数" width="80" />
        <el-table-column prop="statusText" label="状态" width="80" />
        <el-table-column label="操作" min-width="100">
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

    <el-dialog v-model="showTransferDialog" title="发起人员转调" width="740px" :before-close="closeTransferDialog">
      <el-form :model="transferForm" label-width="120px">
        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item label="转调人员" required>
              <el-select v-model="transferForm.personId" filterable @change="onTransferPersonChange">
                <el-option v-for="p in persons" :key="p.id" :label="p.name" :value="p.id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="原部门">
              <el-input v-model="transferForm.fromDept" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="目标部门" required>
              <el-input v-model="transferForm.toDept" placeholder="请输入目标部门" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="目标条线" required>
              <el-input v-model="transferForm.toLine" placeholder="请输入目标条线" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="生效方式">
              <el-radio-group v-model="transferForm.effectiveMode">
                <el-radio label="immediate">立即生效</el-radio>
                <el-radio label="timed">定时生效</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="transferForm.effectiveMode === 'timed'">
            <el-form-item label="生效日期" required>
              <el-date-picker v-model="transferForm.effectiveDate" type="date" value-format="YYYY-MM-DD" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <el-button @click="closeTransferDialog">取消</el-button>
        <el-button type="primary" @click="submitTransfer">提交审批</el-button>
      </template>
    </el-dialog>

    <!-- 编辑部门抽屉 -->
    <el-drawer v-model="showEditDeptDialog" title="编辑部门信息" direction="rtl" size="900px">
      <div class="section-block">
        <h4 class="drawer-section-title">部门信息</h4>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="部门名称" required>
              <el-input v-model="deptForm.name" maxlength="32" show-word-limit />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上级部门" required>
              <el-input v-model="deptForm.parentName" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门类型" required>
              <el-select v-model="deptForm.type">
                <el-option label="单位" value="unit" />
                <el-option label="部门" value="dept" />
                <el-option label="组" value="group" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门标签">
              <el-select v-model="deptForm.tags" multiple placeholder="请选择标签">
                <el-option label="测试部门标签" value="test" />
                <el-option label="麻辣香锅" value="food" />
                <el-option label="部门等级 / 一级（L1）" value="level1" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <div>
        <h4 class="drawer-section-title">部门详情</h4>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="行政区划">
              <el-input v-model="deptForm.areaName" disabled placeholder="请选择行政区划">
                <template #append>
                  <el-button @click="showAreaSelect = true">选择</el-button>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="组织机构代码">
              <el-input v-model="deptForm.orgCode" maxlength="200" show-word-limit />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="条线">
              <el-input v-model="deptForm.lineName" disabled placeholder="请选择条线">
                <template #append>
                  <el-button @click="showLineSelect = true">选择</el-button>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="统一信用代码">
              <el-input v-model="deptForm.creditCode" maxlength="200" show-word-limit />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="机构职级">
              <el-select v-model="deptForm.level">
                <el-option label="厅级" value="level1" />
                <el-option label="处级" value="level2" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮政编码">
              <el-input v-model="deptForm.postCode" maxlength="200" show-word-limit />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位全称">
              <el-input v-model="deptForm.fullName" maxlength="200" show-word-limit />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="其他名称">
              <el-input v-model="deptForm.aliasName" maxlength="200" show-word-limit />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人员">
              <el-select v-model="deptForm.contactPerson">
                <el-option label="邓文佳A" value="dwj" />
                <el-option label="李晗" value="lh" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="负责人">
              <el-select v-model="deptForm.manager" multiple>
                <el-option label="邓文佳A" value="dwj" />
                <el-option label="李晗" value="lh" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱">
              <el-input v-model="deptForm.email" maxlength="254" show-word-limit />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电话">
              <div class="contact-inline">
                <el-select v-model="deptForm.phonePrefix" class="w-100">
                  <el-option label="+86" value="+86" />
                </el-select>
                <el-input v-model="deptForm.phone" class="grow-input" />
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="通讯地址">
              <el-input v-model="deptForm.address" maxlength="200" show-word-limit />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="简介">
              <el-input v-model="deptForm.desc" maxlength="200" show-word-limit />
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      
      <template #footer>
        <div class="footer-actions">
          <el-button @click="showEditDeptDialog = false" class="mr-16">取消</el-button>
          <el-button type="primary" @click="handleEditDept">保存</el-button>
        </div>
      </template>
    </el-drawer>

    <!-- 行政区划选择弹窗 -->
    <el-dialog v-model="showAreaSelect" title="选择行政区划" width="800px" :close-on-click-modal="false">
      <el-row :gutter="0">
        <el-col :span="14" class="selector-left">
          <div class="selector-search-wrap">
            <el-input v-model="areaSearch" placeholder="输入关键字进行过滤" class="full-width">
              <template #suffix>
                <el-icon><Search /></el-icon>
              </template>
            </el-input>
          </div>
          <el-tree
            :data="areaTree"
            :props="defaultProps"
            show-checkbox
            check-strictly
            :default-checked-keys="selectedArea ? [selectedArea.id] : []"
            @check="handleAreaCheck"
            :filter-node-method="filterAreaNode"
            class="selector-tree"
          />
        </el-col>
        <el-col :span="10" class="selector-right">
          <div class="selector-title">
            已选行政区划 {{ selectedArea ? 1 : 0 }}个(最多1个)
          </div>
          <div v-if="selectedArea" class="selected-box">
            {{ selectedArea.label }}
          </div>
          <el-empty v-else description="未选择行政区划" class="empty-top" />
        </el-col>
      </el-row>
      <template #footer>
        <div class="footer-actions">
          <el-button @click="showAreaSelect = false" class="mr-16">取消</el-button>
          <el-button type="primary" @click="confirmAreaSelect">确定</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 条线选择弹窗 -->
    <el-dialog v-model="showLineSelect" title="选择条线" width="800px" :close-on-click-modal="false">
      <el-row :gutter="0">
        <el-col :span="14" class="selector-left">
          <div class="selector-search-wrap">
            <el-input v-model="lineSearch" placeholder="输入关键字进行过滤" class="full-width">
              <template #suffix>
                <el-icon><Search /></el-icon>
              </template>
            </el-input>
          </div>
          <el-tree
            :data="lineTreeSelect"
            :props="defaultProps"
            show-checkbox
            check-strictly
            :default-checked-keys="selectedLine ? [selectedLine.id] : []"
            @check="handleLineCheck"
            :filter-node-method="filterLineNode"
            class="selector-tree"
          />
        </el-col>
        <el-col :span="10" class="selector-right">
          <div class="selector-title">
            已选条线 {{ selectedLine ? 1 : 0 }}个(最多1个)
          </div>
          <div v-if="selectedLine" class="selected-box">
            {{ selectedLine.label }}
          </div>
          <el-empty v-else description="未选择条线" class="empty-top" />
        </el-col>
      </el-row>
      <template #footer>
        <div class="footer-actions">
          <el-button @click="showLineSelect = false" class="mr-16">取消</el-button>
          <el-button type="primary" @click="confirmLineSelect">确定</el-button>
        </div>
      </template>
    </el-dialog>

  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, watch } from 'vue'
import { Search, UserFilled, Plus, Edit, Delete, InfoFilled } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
import { getPersons, deletePersonById } from '../../utils/personStore'
import { transferApi } from '../../api/governance'
import { hasAnyRole } from '../../utils/authStore'

const router = useRouter()
const showImportDialog = ref(false)
const showDimissionDialog = ref(false)
const showEditDeptDialog = ref(false)
const showAddSubDeptDialog = ref(false)
const showAdjustDeptDialog = ref(false)
const showSortDialog = ref(false)
const showResetPwdDialog = ref(false)
const showDisableDialog = ref(false)
const showDeleteDialog = ref(false)
const showSingleDeleteDialog = ref(false)
const showExportDialog = ref(false)
const showTransferDialog = ref(false)
const currentEditPerson = ref(null)
const targetDept = ref(null)
const importStrategy = ref('add')
const importResult = ref(null)
const exportRange = ref('all')
const exportFields = ref(['姓名', '账号', '部门'])
const exportTasks = ref([])
const pageNo = ref(1)
const pageSize = ref(10)
const transferForm = reactive({
  personId: '',
  fromDept: '',
  toDept: '',
  fromLine: '',
  toLine: '',
  effectiveMode: 'immediate',
  effectiveDate: ''
})
const transferDraftKey = 'person_transfer_draft'
const importErrors = ref([])
const canManage = hasAnyRole(['platform_admin', 'org_admin'])

// 部门表单
const deptForm = reactive({
  name: '',
  parentName: '',
  type: 'unit',
  tags: [],
  area: '',
  areaName: '',
  orgCode: '',
  line: '',
  lineName: '',
  creditCode: '',
  level: '',
  postCode: '',
  fullName: '',
  aliasName: '',
  contactPerson: '',
  manager: [],
  email: '',
  phonePrefix: '+86',
  phone: '',
  address: '',
  desc: ''
})

// 选择器相关
const showAreaSelect = ref(false)
const showLineSelect = ref(false)
const areaSearch = ref('')
const lineSearch = ref('')
const selectedArea = ref(null)
const selectedLine = ref(null)

// 行政区划树数据
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
            { id: 1122, label: '新街口街道', code: '110102003' },
            { id: 1123, label: '月坛街道', code: '110102007' },
            { id: 1124, label: '展览路街道', code: '110102009' },
            { id: 1125, label: '德胜街道', code: '110102010' },
            { id: 1126, label: '金融街街道', code: '110102011' },
            { id: 1127, label: '什刹海街道', code: '110102012' },
            { id: 1128, label: '大栅栏街道', code: '110102013' },
            { id: 1129, label: '天桥街道', code: '110102014' },
            { id: 1130, label: '椿树街道', code: '110102015' },
            { id: 1131, label: '陶然亭街道', code: '110102016' },
            { id: 1132, label: '广安门内街道', code: '110102017' },
            { id: 1133, label: '牛街街道', code: '110102018' }
          ]},
          { id: 113, label: '朝阳区', code: '110105' }
        ]
      }
    ]
  }
])

// 条线树数据
const lineTreeSelect = ref([
  { id: 1, label: '其他', code: 'QT' },
  { id: 2, label: '群众团体', code: 'QZ' },
  { id: 3, label: '军委', code: 'JW' },
  { id: 4, label: '法院', code: 'FY' },
  { id: 5, label: '政协', code: 'ZX', children: [
    { id: 51, label: '提案', code: 'ZX-TA' },
    { id: 52, label: '经济', code: 'ZX-JJ' },
    { id: 53, label: '农业和农村', code: 'ZX-NY' },
    { id: 54, label: '委员工作', code: 'ZX-WY' },
    { id: 55, label: '人口资源环境', code: 'ZX-RK' },
    { id: 56, label: '教科卫体', code: 'ZX-KJ' },
    { id: 57, label: '社会和法制', code: 'ZX-SH' },
    { id: 58, label: '民族和宗教', code: 'ZX-MZ' },
    { id: 59, label: '港澳台侨', code: 'ZX-GAT' },
    { id: 510, label: '外事', code: 'ZX-WS' },
    { id: 511, label: '文化文史和学习', code: 'ZX-WH' }
  ]}
])

// 行政区划选择相关
const handleAreaCheck = (data, checked) => {
  if (checked.checkedKeys.length > 0) {
    selectedArea.value = data
  } else {
    selectedArea.value = null
  }
}

const filterAreaNode = (value, data) => {
  if (!value) return true
  return data.label.includes(value)
}

const confirmAreaSelect = () => {
  if (selectedArea.value) {
    deptForm.area = selectedArea.value.code
    deptForm.areaName = selectedArea.value.label
  }
  showAreaSelect.value = false
}

// 条线选择相关
const handleLineCheck = (data, checked) => {
  if (checked.checkedKeys.length > 0) {
    selectedLine.value = data
  } else {
    selectedLine.value = null
  }
}

const filterLineNode = (value, data) => {
  if (!value) return true
  return data.label.includes(value)
}

const confirmLineSelect = () => {
  if (selectedLine.value) {
    deptForm.line = selectedLine.value.code
    deptForm.lineName = selectedLine.value.label
  }
  showLineSelect.value = false
}

// 树形节点拖动
const allowDrop = (draggingNode, dropNode, type) => {
  return true
}

const handleNodeDrop = (draggingNode, dropNode, dropType, ev) => {
  ElMessage.success('部门排序已更新')
}

// 树形操作按钮
const addSubDept = (data) => {
  ElMessage.info(`添加${data.label}的子部门功能开发中`)
}

const editDept = (data) => {
  deptForm.name = data.label
  deptForm.parentName = data.parent?.label || '无'
  deptForm.areaName = ''
  deptForm.lineName = ''
  selectedArea.value = null
  selectedLine.value = null
  showEditDeptDialog.value = true
}

const deleteDept = (data, node) => {
  ElMessageBox.confirm(`确定要删除部门【${data.label}】吗？`, '删除确认', { type: 'warning' })
    .then(() => {
      ElMessage.success('部门删除成功')
    })
    .catch(() => {})
}

const treeSearch = ref('')
const currentDept = reactive({
  name: '青海钉技术支撑',
  line: 'ZH'
})
const newDept = reactive({
  name: '',
  line: 'ZH'
})
const resetForm = reactive({
  password: '',
  confirmPassword: ''
})
const disableForm = reactive({
  reason: ''
})
const selected = ref([])
const sortPersons = ref([])

const defaultProps = {
  children: 'children',
  label: 'label'
}

const orgTree = ref([
  {
    id: 1,
    label: '青海省',
    children: [
      { id: 11, label: '省委机构' },
      { id: 12, label: '省人大机构' },
      { id: 13, label: '省政府机构' },
      { id: 14, label: '省政协机构' },
      { id: 15, label: '省法院' },
      { id: 16, label: '省检察院' },
      { id: 17, label: '省民主党派、工商联' },
      { id: 18, label: '省群众团体' },
      { id: 19, label: '中央驻青单位' },
      { id: 20, label: '金融机构' },
      { id: 21, label: '市 (州)' },
      { id: 22, label: '技术服务', children: [
        { id: 221, label: '青海钉技术支撑' },
        { id: 222, label: 'OA办公模块技术支持' },
        { id: 223, label: '数字浙江技术运营有限公司' },
        { id: 224, label: '国泰新点软件股份有限公司' },
        { id: 225, label: '一表通专项体系' },
        { id: 226, label: '专属通讯录' }
      ]}
    ]
  }
])

const filter = reactive({
  memberRange: 'current',
  status: 'all'
})

const persons = ref([])

const dimissionList = ref([])

const getPrimaryAppointment = (person) => {
  if (!Array.isArray(person.appointments) || person.appointments.length === 0) return null
  return person.appointments.find((item) => item.appointmentType === '主职') || person.appointments[0]
}

const loadPersons = () => {
  persons.value = getPersons().map((person) => {
    const primary = getPrimaryAppointment(person)
    return {
      ...person,
      account: person.username || person.account || '',
      mainDept: primary?.dept || person.dept || '-',
      mainAppointmentType: primary?.appointmentType || '-',
      status: person.status || 'active'
    }
  })
}

const filteredPersons = computed(() => {
  return persons.value.filter((item) => {
    const deptMatched = filter.memberRange === 'all' || item.dept === currentDept.name
    const statusMatched = filter.status === 'all' || item.status === filter.status
    return deptMatched && statusMatched
  })
})

const pagedPersons = computed(() => {
  const start = (pageNo.value - 1) * pageSize.value
  return filteredPersons.value.slice(start, start + pageSize.value)
})

const handleNodeClick = (data) => {
  currentDept.name = data.label
}

const handlePageChange = (value) => {
  pageNo.value = value
}

const handlePageSizeChange = (value) => {
  pageSize.value = value
  pageNo.value = 1
}

const handleSelectionChange = (val) => {
  selected.value = val
}

const filterNode = (value, data) => {
  if (!value) return true
  return data.label.includes(value)
}

const handleImport = () => {
  importResult.value = { success: 8, failed: 2 }
  importErrors.value = [
    { rowNo: 3, field: '部门', message: '部门不存在' },
    { rowNo: 7, field: '任职类型', message: '主职重复' }
  ]
  ElMessage.success(`导入预检完成，策略：${importStrategy.value}`)
}

const downloadImportErrors = () => {
  const content = ['rowNo,field,message', ...importErrors.value.map((item) => `${item.rowNo},${item.field},${item.message}`)].join('\n')
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', 'import-errors.csv')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

const handleExport = () => {
  const count = exportRange.value === 'all' ? persons.value.length : selected.value.length
  exportTasks.value.unshift({
    id: Date.now(),
    createdAt: new Date().toLocaleString('zh-CN'),
    rangeText: exportRange.value === 'all' ? '全部人员' : '当前选中',
    fieldCount: exportFields.value.length,
    count,
    status: 'success',
    statusText: '已完成'
  })
  ElMessage.success(`导出任务已创建：${count}人，${exportFields.value.length}个字段`)
}

const downloadExportFile = (task) => {
  const rows = [
    `导出范围,${task.rangeText}`,
    `导出人数,${task.count}`,
    `导出字段数,${task.fieldCount}`
  ]
  const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', `person-export-${task.id}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
  ElMessage.success('导出文件下载已开始')
}

const openTransferDialog = () => {
  if (!canManage) {
    ElMessage.warning('当前角色无转调权限')
    return
  }
  const draft = localStorage.getItem(transferDraftKey)
  if (draft) {
    try {
      Object.assign(transferForm, JSON.parse(draft))
    } catch {
      resetTransferForm()
    }
  } else {
    resetTransferForm()
  }
  showTransferDialog.value = true
}

const closeTransferDialog = () => {
  if (transferForm.personId || transferForm.toDept || transferForm.toLine) {
    const shouldClose = window.confirm('当前转调表单未提交，是否关闭并保留草稿？')
    if (!shouldClose) return
    localStorage.setItem(transferDraftKey, JSON.stringify(transferForm))
  }
  showTransferDialog.value = false
}

const clearTransferDraft = () => {
  localStorage.removeItem(transferDraftKey)
}

const resetTransferForm = () => {
  Object.assign(transferForm, {
    personId: '',
    fromDept: '',
    toDept: '',
    fromLine: '',
    toLine: '',
    effectiveMode: 'immediate',
    effectiveDate: ''
  })
}

const onTransferPersonChange = (id) => {
  const person = persons.value.find((item) => Number(item.id) === Number(id))
  transferForm.fromDept = person?.dept || ''
  transferForm.fromLine = '当前条线'
}

const submitTransfer = async () => {
  if (!canManage) {
    ElMessage.warning('当前角色无转调权限')
    return
  }
  const person = persons.value.find((item) => Number(item.id) === Number(transferForm.personId))
  if (!person || !transferForm.toDept || !transferForm.toLine) {
    ElMessage.warning('请完整填写转调信息')
    return
  }
  if (transferForm.effectiveMode === 'timed' && !transferForm.effectiveDate) {
    ElMessage.warning('请选择定时生效日期')
    return
  }
  await transferApi.submit({
    personId: person.id,
    personName: person.name,
    fromDept: transferForm.fromDept,
    toDept: transferForm.toDept,
    fromLine: transferForm.fromLine,
    toLine: transferForm.toLine,
    effectiveMode: transferForm.effectiveMode,
    effectiveDate: transferForm.effectiveMode === 'timed' ? transferForm.effectiveDate : new Date().toISOString().slice(0, 10)
  })
  clearTransferDraft()
  resetTransferForm()
  showTransferDialog.value = false
  ElMessage.success('转调申请已提交至审批中心')
}

const editPerson = (row) => {
  router.push(`/persons/${row.id}/edit`)
}

const viewPerson = (row) => {
  router.push(`/persons/${row.id}`)
}

const deletePerson = (row) => {
  currentEditPerson.value = row
  showSingleDeleteDialog.value = true
}

const selectTargetDept = (data) => {
  targetDept.value = data
}

const handleAdjustDept = () => {
  if (!canManage) {
    ElMessage.warning('当前角色无调整权限')
    return
  }
  if (!targetDept.value) {
    ElMessage.warning('请选择目标部门')
    return
  }
  ElMessage.success(`已将${selected.value.length}名成员调整到${targetDept.value.label}`)
  showAdjustDeptDialog.value = false
}

const handleSortSave = () => {
  if (!canManage) {
    ElMessage.warning('当前角色无排序权限')
    return
  }
  ElMessage.success('排序保存成功')
  showSortDialog.value = false
}

const handleResetPwd = () => {
  if (!canManage) {
    ElMessage.warning('当前角色无重置权限')
    return
  }
  if (!resetForm.password || !resetForm.confirmPassword) {
    ElMessage.warning('请输入密码和确认密码')
    return
  }
  if (resetForm.password !== resetForm.confirmPassword) {
    ElMessage.warning('两次输入的密码不一致')
    return
  }
  ElMessage.success('密码重置成功')
  showResetPwdDialog.value = false
}

const handleDisable = () => {
  if (!canManage) {
    ElMessage.warning('当前角色无禁用权限')
    return
  }
  ElMessage.success(`已禁用${selected.value.length}名成员`)
  showDisableDialog.value = false
}

const handleBatchDelete = () => {
  if (!canManage) {
    ElMessage.warning('当前角色无删除权限')
    return
  }
  ElMessage.success(`已删除${selected.value.length}名成员`)
  showDeleteDialog.value = false
}

const handleSingleDelete = () => {
  deletePersonById(currentEditPerson.value.id)
  loadPersons()
  ElMessage.success('删除成功')
  showSingleDeleteDialog.value = false
}

const handleEditDept = () => {
  ElMessage.success('部门信息更新成功')
  showEditDeptDialog.value = false
}

const handleAddSubDept = () => {
  if (!newDept.name) {
    ElMessage.warning('请输入部门名称')
    return
  }
  ElMessage.success(`子部门${newDept.name}添加成功`)
  showAddSubDeptDialog.value = false
  newDept.name = ''
  newDept.line = 'ZH'
}

const onSortChange = (val) => {
  sortPersons.value = val
}

watch(
  () => [filter.memberRange, filter.status, currentDept.name],
  () => {
    pageNo.value = 1
  }
)

onMounted(() => {
  loadPersons()
})
</script>

<style scoped>
.page-header { border-bottom: 1px solid #e5e6eb; padding: 12px 20px; display: flex; justify-content: space-between; align-items: center; }
.header-left { display: flex; align-items: center; gap: 16px; }
.page-title { font-size: 16px; font-weight: 500; margin: 0; }
.left-pane { border-right: 1px solid #e5e6eb; min-height: calc(100vh - 65px); }
.left-content { padding: 12px 20px; }
.search-row { display: flex; margin-bottom: 12px; }
.search-input { flex: 1; }
.search-btn { border-radius: 0 4px 4px 0; padding: 0 12px; }
.tree-panel { height: calc(100vh - 150px); overflow-y: auto; }
.tree-node-content { display: flex; justify-content: space-between; align-items: center; width: 100%; padding-right: 8px; }
.node-action-btn { padding: 0 4px; color: #4080ff; }
.node-action-btn.danger { color: #f53f3f; }
.right-content { padding: 20px; }
.dept-bar { margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center; }
.dept-meta { display: flex; align-items: center; gap: 8px; }
.dept-title { margin: 0; font-size: 16px; font-weight: 500; }
.muted { color: #86909c; }
.filter-row { margin-bottom: 16px; }
.filter-inline { display: flex; align-items: center; gap: 8px; flex-wrap: nowrap; }
.filter-label { color: #4e5969; white-space: nowrap; }
.btn-muted { background: #f2f3f5; border-color: #f2f3f5; color: #86909c; }
.ml-8 { margin-left: 8px; }
.mt-8 { margin-top: 8px; }
.ml-12 { margin-left: 12px; }
.table-action-btn.danger { color: #f53f3f; }
.w-180 { width: 180px; }
.w-120 { width: 120px; }
.w-100 { width: 100px; }
.section-block { margin-bottom: 24px; }
.drawer-section-title { font-size: 16px; font-weight: 600; border-left: 3px solid #4080ff; padding-left: 12px; margin-bottom: 20px; }
.footer-actions { text-align: right; }
.selector-left { border-right: 1px solid #e5e6eb; }
.selector-right { padding: 0 24px; }
.selector-search-wrap { padding: 0 16px 16px; }
.full-width { width: 100%; }
.selector-tree { height: 400px; overflow-y: auto; padding: 0 16px; }
.selector-title { margin-bottom: 16px; font-size: 16px; }
.selected-box { padding: 12px; background-color: #f7f8fa; border-radius: 4px; }
.empty-top { margin-top: 100px; }
.pager-wrap { text-align: right; margin-top: 24px; }
.pager-right { justify-content: right; }
.contact-inline { display: flex; align-items: center; width: 100%; }
.grow-input { flex: 1; min-width: 0; }
.tree-actions {
  opacity: 0;
  transition: opacity 0.2s;
}
:deep(.el-tree-node__content:hover) .tree-actions {
  opacity: 1;
}
</style>
