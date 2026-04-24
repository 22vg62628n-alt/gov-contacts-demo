<template>
  <div class="global-visibility-page">
    <el-card>
      <template #header>
        <span>全局可见性配置</span>
      </template>
      
      <el-tabs v-model="activeTab" type="border-card" class="tabs-wrap">
        <el-tab-pane label="隐藏人员" name="person">
          <div class="action-row">
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
        
        <el-tab-pane label="隐藏部门" name="dept">
          <div class="action-row">
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
          <div class="action-row">
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
          <div class="action-row">
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
          <div class="action-row">
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
          <div class="action-row">
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
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

const activeTab = ref('person')
const showAddHiddenPersonDialog = ref(false)
const showAddHiddenDeptDialog = ref(false)
const showAddLimitPersonDialog = ref(false)
const showAddSelfBranchDialog = ref(false)
const showAddSelfAreaDialog = ref(false)
const showAddSelfUnitDialog = ref(false)

const addForm = reactive({
  person: []
})

const hiddenPersons = ref([])
const hiddenDepts = ref([])
const limitPersons = ref([])
const selfBranchPersons = ref([])
const selfAreaPersons = ref([])
const selfUnitPersons = ref([])

const handleAddHiddenPerson = () => {
  if (addForm.person.length === 0) {
    ElMessage.warning('请选择人员')
    return
  }
  ElMessage.success('添加成功')
  showAddHiddenPersonDialog.value = false
  addForm.person = []
}
</script>

<style scoped>
.tabs-wrap { margin-bottom: 24px; }
.action-row { margin-bottom: 16px; }
.muted { color: #86909c; }
.ml-12 { margin-left: 12px; }
.empty-block { margin: 80px 0; }
.table-action-btn.danger { color: #f53f3f; }
.full-width { width: 100%; }
</style>
