<template>
  <div class="visibility-config">
    <el-card>
      <!-- 头部 -->
      <div class="page-header">
        <h2 class="page-title">通讯录可见性管理</h2>
        <el-button type="text" class="table-action-btn" @click="openVerifyDialog">
          <el-icon class="mr-4"><Check /></el-icon>
          验证可见性规则
        </el-button>
      </div>

      <!-- 提示文字 -->
      <div class="tips-row">
        <el-icon class="tips-icon"><InfoFilled /></el-icon>
        <span>设置成员在通讯录页面可以看到的组织架构范围，设置成功后将延迟约5分钟生效</span>
      </div>

      <!-- 默认设置 -->
      <div class="section-block">
        <h3 class="section-title">默认设置</h3>
        <div class="panel-card">
          <div class="row-between">
            <div>
              <div class="item-title">按部门层级限制</div>
              <div class="item-desc">最大可见范围为按照成员所属单位<br>向上1层 向下不限制</div>
            </div>
            <el-button @click="showEditDefaultDialog = true">修改</el-button>
          </div>
        </div>
      </div>

      <!-- 自定义规则 -->
      <div class="section-block">
        <h3 class="section-title">自定义规则</h3>
        <div class="section-desc-sm">
          成员添加自定义规则后，默认规则与自定义规则叠加生效。不可见规则优先可见规则生效。
        </div>
        <div class="action-row">
          <el-button type="primary" @click="showRuleDrawer = true">+ 添加</el-button>
          <el-button class="btn-muted">删除</el-button>
        </div>
        <el-table :data="ruleList" stripe class="full-width">
          <el-table-column type="selection" width="55" />
          <el-table-column prop="subject" label="主体" min-width="200">
            <template #default="{ row }">
              <el-tag v-for="item in row.subject" :key="item" size="small" class="mr-4">{{ item }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="类型" width="80">
            <template #default="{ row }">
              <span :class="row.type === '可见' ? 'text-green' : 'text-red'">{{ row.type }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="object" label="客体" min-width="200">
            <template #default="{ row }">
              <el-tag v-for="item in row.object" :key="item" size="small" class="mr-4">{{ item }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="updateTime" label="更新时间" width="180" />
          <el-table-column label="操作" width="120">
            <template #default="{ row }">
              <el-button type="text" class="table-action-btn" @click="editRule(row)">编辑</el-button>
              <el-button type="text" class="table-action-btn danger ml-8" @click="deleteRule(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="section-block-sm">
        <h3 class="section-title mb-8">高级规则</h3>
        <div class="section-desc-sm mb-0">
          用于设置全局范围的可见性控制策略，作为默认设置与自定义规则之外的高级补充。
        </div>
      </div>

      <!-- 其他规则保持 tab 切换样式 -->
      <el-tabs v-model="activeTab" class="mb-24">
        <el-tab-pane label="隐藏人员" name="hidden-person">
          <div class="mb-16">
            <el-button type="primary" @click="showAddHiddenPersonDialog = true">+ 添加</el-button>
            <span class="muted ml-12">被隐藏的人员，在通讯录中不显示，不可被搜索。</span>
          </div>
          <el-table :data="hiddenPersons" stripe v-if="hiddenPersons.length > 0">
            <el-table-column prop="name" label="被隐藏人员" />
            <el-table-column prop="createTime" label="添加时间" />
            <el-table-column label="操作" width="120">
              <template #default>
                <el-button size="small" type="text" class="table-action-btn danger">移除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-empty description="尚未添加任何规则" v-else class="empty-block" />
        </el-tab-pane>

        <el-tab-pane label="隐藏部门" name="hidden-dept">
          <div class="mb-16">
            <el-button type="primary" @click="showAddHiddenDeptDialog = true">+ 添加</el-button>
            <span class="muted ml-12">被隐藏的部门，在通讯录中不显示。</span>
          </div>
          <el-table :data="hiddenDepts" stripe v-if="hiddenDepts.length > 0">
            <el-table-column prop="name" label="被隐藏部门" />
            <el-table-column prop="createTime" label="添加时间" />
            <el-table-column label="操作" width="120">
              <template #default>
                <el-button size="small" type="text" class="table-action-btn danger">移除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-empty description="尚未添加任何规则" v-else class="empty-block" />
        </el-tab-pane>

        <el-tab-pane label="限制查看通讯录" name="limit">
          <div class="mb-16">
            <el-button type="primary" @click="showAddLimitPersonDialog = true">+ 添加</el-button>
            <span class="muted ml-12">受限制的人员无法查看组织通讯录。</span>
          </div>
          <el-table :data="limitPersons" stripe v-if="limitPersons.length > 0">
            <el-table-column prop="name" label="受限制人员" />
            <el-table-column prop="searchBranch" label="受限制人员搜索部门" />
            <el-table-column prop="status" label="当前状态">
              <template #default>
                <el-tag type="success">已生效</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="120">
              <template #default>
                <el-button size="small" type="text" class="table-action-btn danger">移除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-empty description="尚未添加任何规则" v-else class="empty-block" />
        </el-tab-pane>

        <el-tab-pane label="仅可查看本部门" name="self-branch">
          <div class="mb-16">
            <el-button type="primary" @click="showAddSelfBranchDialog = true">+ 添加</el-button>
            <span class="muted ml-12">受限制的人员仅能查看和搜索自己所在部门和其下的成员（包含子孙部门）。</span>
          </div>
          <el-table :data="selfBranchPersons" stripe v-if="selfBranchPersons.length > 0">
            <el-table-column prop="name" label="受限制人员" />
            <el-table-column prop="searchBranch" label="受限制人员搜索自己所在部门外的部门" />
            <el-table-column prop="status" label="当前状态">
              <template #default>
                <el-tag type="success">已生效</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="120">
              <template #default>
                <el-button size="small" type="text" class="table-action-btn danger">移除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-empty description="尚未添加任何规则" v-else class="empty-block" />
        </el-tab-pane>

        <el-tab-pane label="仅可查看本行政区划" name="self-area">
          <div class="mb-16">
            <el-button type="primary" @click="showAddSelfAreaDialog = true">+ 添加</el-button>
            <span class="muted ml-12">受限制的人员仅能查看自己所在行政区划节点下的部门及其部门成员（包含子孙部门）</span>
          </div>
          <el-table :data="selfAreaPersons" stripe v-if="selfAreaPersons.length > 0">
            <el-table-column prop="name" label="受限制人员" />
            <el-table-column prop="searchBranch" label="受限制人员搜索自己所在部门外的部门" />
            <el-table-column prop="status" label="当前状态">
              <template #default>
                <el-tag type="success">已生效</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="120">
              <template #default>
                <el-button size="small" type="text" class="table-action-btn danger">移除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-empty description="尚未添加任何规则" v-else class="empty-block" />
        </el-tab-pane>

        <el-tab-pane label="仅可查看本单位" name="self-unit">
          <div class="mb-16">
            <el-button type="primary" @click="showAddSelfUnitDialog = true">+ 添加</el-button>
            <span class="muted ml-12">受限制的人员仅能查看自己所在单位节点下的部门及其部门成员（包含子孙部门）</span>
          </div>
          <el-table :data="selfUnitPersons" stripe v-if="selfUnitPersons.length > 0">
            <el-table-column prop="name" label="受限制人员" />
            <el-table-column prop="searchBranch" label="受限制人员搜索自己所在部门外的部门" />
            <el-table-column prop="status" label="当前状态">
              <template #default>
                <el-tag type="success">已生效</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="120">
              <template #default>
                <el-button size="small" type="text" class="table-action-btn danger">移除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-empty description="尚未添加任何规则" v-else class="empty-block" />
        </el-tab-pane>
      </el-tabs>

    </el-card>

    <!-- 规则配置抽屉 -->
    <el-drawer v-model="showRuleDrawer" title="配置可见性规则" direction="rtl" size="1200px">
      <el-row :gutter="16">
        <!-- 选择访问者 -->
        <el-col :span="8">
          <el-card shadow="hover" class="drawer-card">
            <template #header>
              <div class="row-between">
                <span class="fw-500">选择访问者</span>
                <el-button type="text" size="small">清空</el-button>
              </div>
            </template>
            <div class="drawer-center-block">
              <el-button type="default" class="w-180 mb-16">指定人员</el-button>
              <br />
              <el-select class="w-180" placeholder="指定范围">
                <el-option label="全单位人员" value="all" />
                <el-option label="本单位人员" value="unit" />
                <el-option label="本部门人员" value="dept" />
                <el-option label="指定角色" value="role" />
              </el-select>
            </div>
          </el-card>
        </el-col>
        
        <!-- 选择被访问者 -->
        <el-col :span="8">
          <el-card shadow="hover" class="drawer-card">
            <template #header>
              <div class="row-between">
                <span class="fw-500">选择被访问者(人员)</span>
                <el-button type="text" size="small">清空</el-button>
              </div>
            </template>
            <div class="drawer-center-block">
              <el-button type="default" class="w-180 mb-16">指定人员</el-button>
              <br />
              <el-select class="w-180" placeholder="指定范围">
                <el-option label="全部人员" value="all" />
                <el-option label="指定部门人员" value="dept" />
                <el-option label="指定角色人员" value="role" />
                <el-option label="指定条线人员" value="line" />
              </el-select>
            </div>
          </el-card>
        </el-col>
        
        <!-- 设置可见性规则 -->
        <el-col :span="8">
          <el-card shadow="hover" class="drawer-card drawer-card-scroll">
            <template #header>
              <span class="fw-500">设置可见性规则</span>
            </template>
            <p class="helper-text">请先勾选需要设置规则的项，再选择允许/禁止</p>
            
            <div class="rule-line">
              <div class="mb-8">
                <el-checkbox v-model="rule.selectAll">全选</el-checkbox>
              </div>
              
              <div class="mb-16">
                <div class="section-subtitle">查看人员</div>
                <div class="pl-20">
                  <el-checkbox v-model="rule.viewPerson">查看人员</el-checkbox>
                  <el-radio-group v-model="rule.viewPersonPermission" class="ml-20">
                    <el-radio label="allow">允许</el-radio>
                    <el-radio label="forbid">禁止</el-radio>
                  </el-radio-group>
                </div>
              </div>
              
              <div class="mb-16">
                <div class="section-subtitle">人员信息</div>
                <div class="pl-20 line-32">
                  <div>
                    <el-checkbox v-model="rule.mobile">手机</el-checkbox>
                    <el-radio-group v-model="rule.mobilePermission" class="ml-20">
                      <el-radio label="allow">允许</el-radio>
                      <el-radio label="forbid">禁止</el-radio>
                    </el-radio-group>
                  </div>
                  <div>
                    <el-checkbox v-model="rule.empId">工号</el-checkbox>
                    <el-radio-group v-model="rule.empIdPermission" class="ml-20">
                      <el-radio label="allow">允许</el-radio>
                      <el-radio label="forbid">禁止</el-radio>
                    </el-radio-group>
                  </div>
                  <div>
                    <el-checkbox v-model="rule.email">邮箱</el-checkbox>
                    <el-radio-group v-model="rule.emailPermission" class="ml-20">
                      <el-radio label="allow">允许</el-radio>
                      <el-radio label="forbid">禁止</el-radio>
                    </el-radio-group>
                  </div>
                  <div>
                    <el-checkbox v-model="rule.username">用户名</el-checkbox>
                    <el-radio-group v-model="rule.usernamePermission" class="ml-20">
                      <el-radio label="allow">允许</el-radio>
                      <el-radio label="forbid">禁止</el-radio>
                    </el-radio-group>
                  </div>
                  <div>
                    <el-checkbox v-model="rule.contact">联系方式</el-checkbox>
                    <el-radio-group v-model="rule.contactPermission" class="ml-20">
                      <el-radio label="allow">允许</el-radio>
                      <el-radio label="forbid">禁止</el-radio>
                    </el-radio-group>
                  </div>
                </div>
              </div>
              
              <div class="mb-16">
                <div class="section-subtitle">搜索人员</div>
                <div class="pl-20">
                  <el-checkbox v-model="rule.searchPerson">搜索人员</el-checkbox>
                  <el-radio-group v-model="rule.searchPersonPermission" class="ml-20">
                    <el-radio label="allow">允许</el-radio>
                    <el-radio label="forbid">禁止</el-radio>
                  </el-radio-group>
                </div>
              </div>
              
              <div class="mb-16">
                <div class="section-subtitle">发送消息</div>
                <div class="pl-20">
                  <el-checkbox v-model="rule.sendMessage">私信</el-checkbox>
                  <el-radio-group v-model="rule.sendMessagePermission" class="ml-20">
                    <el-radio label="allow">允许</el-radio>
                    <el-radio label="forbid">禁止</el-radio>
                  </el-radio-group>
                </div>
              </div>
            </div>
            
            <div class="drawer-footer">
              <el-button @click="showRuleDrawer = false">取消</el-button>
              <el-button type="primary" @click="saveRule">保存配置</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-drawer>

    <!-- 修改默认设置弹窗 -->
    <el-dialog v-model="showEditDefaultDialog" title="修改默认可见性设置" width="500px">
      <el-form label-width="120px">
        <el-form-item label="层级限制规则">
          <el-radio-group v-model="defaultConfig.ruleType">
            <el-radio label="up1">向上1层 向下不限制</el-radio>
            <el-radio label="up2">向上2层 向下不限制</el-radio>
            <el-radio label="all">全单位可见</el-radio>
            <el-radio label="self">仅本部门可见</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showEditDefaultDialog = false">取消</el-button>
        <el-button type="primary" @click="saveDefaultConfig">保存</el-button>
      </template>
    </el-dialog>

    <!-- 添加隐藏人员弹窗 -->
    <el-dialog v-model="showAddHiddenPersonDialog" title="添加隐藏人员" width="600px">
      <el-form label-width="100px">
        <el-form-item label="选择人员" required>
          <el-select v-model="addForm.person" multiple placeholder="请选择要隐藏的人员" class="full-width">
            <el-option label="段江" value="1" />
            <el-option label="闫石" value="2" />
            <el-option label="张生杰" value="3" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showAddHiddenPersonDialog = false">取消</el-button>
        <el-button type="primary" @click="handleAddHiddenPerson">确认添加</el-button>
      </template>
    </el-dialog>

    <!-- 添加隐藏部门弹窗 -->
    <el-dialog v-model="showAddHiddenDeptDialog" title="添加隐藏部门" width="600px">
      <el-form label-width="100px">
        <el-form-item label="选择部门" required>
          <el-tree-select v-model="addForm.dept" :data="orgTree" :props="defaultProps" placeholder="请选择要隐藏的部门" class="full-width" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showAddHiddenDeptDialog = false">取消</el-button>
        <el-button type="primary" @click="handleAddHiddenDept">确认添加</el-button>
      </template>
    </el-dialog>

    <!-- 添加限制人员弹窗 -->
    <el-dialog v-model="showAddLimitPersonDialog" title="添加限制人员" width="600px">
      <el-form label-width="100px">
        <el-form-item label="选择人员" required>
          <el-select v-model="addForm.person" multiple placeholder="请选择要限制的人员" class="full-width">
            <el-option label="段江" value="1" />
            <el-option label="闫石" value="2" />
            <el-option label="张生杰" value="3" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showAddLimitPersonDialog = false">取消</el-button>
        <el-button type="primary" @click="handleAddLimitPerson">确认添加</el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="showVerifyDialog" title="验证可见性规则" width="760px">
      <el-form :model="verifyForm" label-width="110px">
        <el-row :gutter="16">
          <el-col :span="8">
            <el-form-item label="查看者" required>
              <el-select v-model="verifyForm.viewer" filterable placeholder="请选择查看者">
                <el-option v-for="item in personOptions" :key="item" :label="item" :value="item" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="目标人员" required>
              <el-select v-model="verifyForm.target" filterable placeholder="请选择目标人员">
                <el-option v-for="item in personOptions" :key="item" :label="item" :value="item" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="验证场景" required>
              <el-select v-model="verifyForm.scene">
                <el-option label="通讯录查看" value="contacts" />
                <el-option label="搜索" value="search" />
                <el-option label="私聊" value="chat" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-alert v-if="verifyResult" :type="verifyResult.result === '可见' ? 'success' : 'warning'" :closable="false" class="mb-16">
        <template #title>
          验证结果：{{ verifyResult.result }} ｜ 命中规则：{{ verifyResult.hitRule }} ｜ {{ verifyResult.explain }}
        </template>
      </el-alert>

      <el-table :data="verifyLogs" size="small" max-height="260">
        <el-table-column prop="time" label="验证时间" width="170" />
        <el-table-column prop="viewer" label="查看者" width="120" />
        <el-table-column prop="target" label="目标人员" width="120" />
        <el-table-column prop="scene" label="场景" width="90" />
        <el-table-column prop="result" label="结果" width="70" />
        <el-table-column prop="hitRule" label="命中规则" min-width="160" />
      </el-table>

      <template #footer>
        <el-button @click="showVerifyDialog = false">关闭</el-button>
        <el-button type="primary" @click="runVerify">立即验证</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { InfoFilled, Check } from '@element-plus/icons-vue'
import { getPersons } from '../../utils/personStore'
import { visibilityVerifyApi } from '../../api/governance'

const activeTab = ref('hidden-person')
const showEditDefaultDialog = ref(false)
const showRuleDrawer = ref(false)
const showAddHiddenPersonDialog = ref(false)
const showAddHiddenDeptDialog = ref(false)
const showAddLimitPersonDialog = ref(false)
const showAddSelfBranchDialog = ref(false)
const showAddSelfAreaDialog = ref(false)
const showAddSelfUnitDialog = ref(false)
const showVerifyDialog = ref(false)
const verifyResult = ref<any>(null)
const verifyLogs = ref<any[]>([])
const personOptions = getPersons().map((item) => item.name)
const verifyForm = reactive({
  viewer: '',
  target: '',
  scene: 'contacts'
})

const defaultProps = {
  children: 'children',
  label: 'label'
}

// 组织树数据
const orgTree = ref([
  {
    id: 1,
    label: '青海省',
    children: [
      { id: 11, label: '省委机构' },
      { id: 12, label: '省人大机构' },
      { id: 13, label: '省政府机构' }
    ]
  }
])

// 默认配置
const defaultConfig = reactive({
  ruleType: 'up1'
})

// 规则表单
const rule = reactive({
  selectAll: false,
  viewPerson: true,
  viewPersonPermission: 'allow',
  mobile: true,
  mobilePermission: 'allow',
  empId: true,
  empIdPermission: 'allow',
  email: true,
  emailPermission: 'allow',
  username: true,
  usernamePermission: 'allow',
  contact: true,
  contactPermission: 'allow',
  searchPerson: true,
  searchPersonPermission: 'allow',
  sendMessage: true,
  sendMessagePermission: 'allow'
})

// 表单数据
const addForm = reactive({
  person: [],
  dept: ''
})

// 规则列表数据
const ruleList = ref([
  {
    id: 1,
    subject: ['各市州领导用...'],
    type: '可见',
    object: ['各市州领导用...'],
    updateTime: '2026/04/17 11:21:47'
  },
  {
    id: 2,
    subject: ['青海省'],
    type: '不可见',
    object: ['省政府领导', '各市州领导用...'],
    updateTime: '2026/04/17 11:18:16'
  },
  {
    id: 3,
    subject: ['青海省数据局'],
    type: '可见',
    object: ['技术服务'],
    updateTime: '2026/04/15 12:26:54'
  },
  {
    id: 4,
    subject: ['青海省'],
    type: '不可见',
    object: ['技术服务'],
    updateTime: '2026/04/16 19:01:38'
  },
  {
    id: 5,
    subject: ['青海省'],
    type: '不可见',
    object: ['一表通专项体系'],
    updateTime: '2026/04/14 22:58:30'
  },
  {
    id: 6,
    subject: ['青海省发展和...', '青海省教育厅', '青海省工业和...'],
    type: '可见',
    object: ['青海省发展和...', '青海省教育厅', '青海省工业和...'],
    updateTime: '2026/04/17 11:21:31'
  },
  {
    id: 7,
    subject: ['一表通专项体系'],
    type: '可见',
    object: ['一表通专项体系'],
    updateTime: '2026/03/16 14:29:49'
  }
])

// 全局可见性数据
const hiddenPersons = ref([])
const hiddenDepts = ref([])
const limitPersons = ref([])
const selfBranchPersons = ref([])
const selfAreaPersons = ref([])
const selfUnitPersons = ref([])

// 编辑规则
const editRule = (row: any) => {
  showRuleDrawer.value = true
}

// 删除规则
const deleteRule = (row: any) => {
  ElMessageBox.confirm('确定要删除该规则吗？', '删除确认', { type: 'warning' })
    .then(() => {
      ruleList.value = ruleList.value.filter(item => item.id !== row.id)
      ElMessage.success('删除成功')
    })
    .catch(() => {})
}

// 保存规则
const saveRule = () => {
  ElMessage.success('规则保存成功')
  showRuleDrawer.value = false
  // 添加规则到列表
  ruleList.value.unshift({
    id: Date.now(),
    subject: ['自定义规则'],
    type: '可见',
    object: ['指定人员'],
    updateTime: new Date().toLocaleString('zh-CN').replace(/\//g, '/')
  })
}

// 保存默认配置
const saveDefaultConfig = () => {
  ElMessage.success('默认配置保存成功')
  showEditDefaultDialog.value = false
}

// 添加隐藏人员
const handleAddHiddenPerson = () => {
  if (addForm.person.length === 0) {
    ElMessage.warning('请选择人员')
    return
  }
  ElMessage.success('添加成功')
  showAddHiddenPersonDialog.value = false
  addForm.person = []
}

// 添加隐藏部门
const handleAddHiddenDept = () => {
  if (!addForm.dept) {
    ElMessage.warning('请选择部门')
    return
  }
  ElMessage.success('添加成功')
  showAddHiddenDeptDialog.value = false
  addForm.dept = ''
}

// 添加限制人员
const handleAddLimitPerson = () => {
  if (addForm.person.length === 0) {
    ElMessage.warning('请选择人员')
    return
  }
  ElMessage.success('添加成功')
  showAddLimitPersonDialog.value = false
  addForm.person = []
}

const openVerifyDialog = async () => {
  showVerifyDialog.value = true
  verifyLogs.value = await visibilityVerifyApi.logs()
}

const runVerify = async () => {
  if (!verifyForm.viewer || !verifyForm.target) {
    ElMessage.warning('请选择查看者与目标人员')
    return
  }
  verifyResult.value = await visibilityVerifyApi.verify({ ...verifyForm })
  verifyLogs.value = await visibilityVerifyApi.logs()
}
</script>

<style scoped>
.visibility-config {
  padding: 24px;
  background-color: #f5f7fa;
  min-height: calc(100vh - 60px);
}
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.page-title { font-size: 18px; font-weight: 600; margin: 0; }
.tips-row { display: flex; align-items: flex-start; margin-bottom: 24px; color: #4e5969; font-size: 14px; }
.tips-icon { margin-right: 8px; margin-top: 2px; color: #86909c; }
.section-block { margin-bottom: 32px; }
.section-block-sm { margin-bottom: 16px; }
.section-title { font-size: 16px; font-weight: 600; margin: 0 0 16px 0; }
.section-desc-sm { font-size: 13px; color: #4e5969; margin-bottom: 16px; }
.panel-card { border: 1px solid #e5e6eb; border-radius: 8px; padding: 20px; }
.row-between { display: flex; justify-content: space-between; align-items: flex-start; }
.item-title { font-weight: 500; font-size: 14px; margin-bottom: 4px; }
.item-desc { font-size: 13px; color: #86909c; }
.action-row { margin-bottom: 16px; }
.btn-muted { margin-left: 8px; background: #f2f3f5; border-color: #f2f3f5; color: #86909c; }
.table-action-btn.danger { color: #f53f3f; }
.mr-4 { margin-right: 4px; }
.ml-8 { margin-left: 8px; }
.mb-8 { margin-bottom: 8px; }
.mb-0 { margin-bottom: 0; }
.mb-24 { margin-bottom: 24px; }
.mb-16 { margin-bottom: 16px; }
.empty-block { margin: 80px 0; }
.w-180 { width: 180px; }
.fw-500 { font-weight: 500; }
.row-between { display: flex; justify-content: space-between; align-items: center; }
.drawer-card { height: 700px; }
.drawer-card-scroll { overflow-y: auto; }
.drawer-center-block { text-align: center; padding: 60px 20px; }
.helper-text { color: #666; font-size: 12px; margin-bottom: 16px; }
.drawer-footer { text-align: right; margin-top: 24px; padding-top: 16px; border-top: 1px solid #e5e6eb; }
.rule-line { line-height: 36px; }
.section-subtitle { font-weight: 500; margin-bottom: 8px; }
.pl-20 { padding-left: 20px; }
.line-32 { line-height: 32px; }
.text-green { color: #00b42a; }
.text-red { color: #f53f3f; }
</style>