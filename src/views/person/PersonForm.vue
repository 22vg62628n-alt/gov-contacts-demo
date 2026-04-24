<template>
  <div class="person-form-page">
    <el-card>
      <template #header>
        <span>{{ isEdit ? '编辑人员' : '添加人员' }}</span>
      </template>
      
      <el-row :gutter="24">
        <!-- 头像区域 -->
        <el-col :span="4" class="avatar-col">
          <div class="avatar-wrapper">
            <el-avatar :size="120" class="avatar-bg">
              {{ form.name ? form.name[0] : '亚' }}
            </el-avatar>
            <div class="avatar-mask">
              更改头像
            </div>
          </div>
          <p class="avatar-tip">仅支持小于5M，格式为JPG/JPEG/PNG/BMP的图片</p>
        </el-col>
        
        <!-- 表单区域 -->
        <el-col :span="20">
          <el-form :model="form" label-width="100px">
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="姓名" required>
                  <el-input v-model="form.name" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="手机">
                  <div class="contact-inline">
                    <el-select v-model="form.phonePrefix" class="prefix-select">
                      <el-option label="+86" value="+86" />
                    </el-select>
                    <el-input v-model="form.mobile" class="grow-input" />
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="别名">
                  <el-input v-model="form.alias" placeholder="请输入别名" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="邮箱">
                  <el-input v-model="form.email" placeholder="请输入邮箱" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="部门" required>
                  <el-select v-model="form.dept" class="full-width">
                    <el-option label="元宇宙回归测试/交付开发" value="交付开发" />
                    <el-option label="省政府办公厅" value="省政府办公厅" />
                    <el-option label="省教育厅" value="省教育厅" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="用户名" required>
                  <el-input v-model="form.username" disabled placeholder="系统自动生成" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="登录方式">
              <el-checkbox v-model="form.loginType.mobile">手机号码</el-checkbox>
              <el-checkbox v-model="form.loginType.email" class="ml-20">邮箱</el-checkbox>
              <el-checkbox v-model="form.loginType.username" class="ml-20">用户名</el-checkbox>
            </el-form-item>
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="联系方式1">
                  <div class="contact-inline">
                    <el-select v-model="form.contact1Prefix" class="prefix-select">
                      <el-option label="+86" value="+86" />
                    </el-select>
                    <el-input v-model="form.contact1" class="grow-input" placeholder="请填写联系方式" />
                    <el-button type="text" icon="Plus" class="ml-8 add-contact-btn"></el-button>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="民族">
                  <el-select v-model="form.nation" class="full-width" placeholder="请选择民族">
                    <el-option label="汉族" value="汉族" />
                    <el-option label="维吾尔族" value="维吾尔族" />
                    <el-option label="回族" value="回族" />
                    <el-option label="蒙古族" value="蒙古族" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="工号">
                  <el-input v-model="form.empId" placeholder="选填" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="籍贯">
                  <el-input v-model="form.native" placeholder="请输入籍贯" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="党派">
                  <el-input v-model="form.party" placeholder="请输入党派" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="办公地址">
                  <el-input v-model="form.officeAddress" placeholder="请输入办公地址" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="职务/人员">
                  <el-input v-model="form.position" placeholder="请输入职务/人员" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="出生日期">
                  <el-date-picker v-model="form.birthday" type="date" class="full-width" placeholder="请选择出生日期" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="性别">
                  <el-select v-model="form.gender" class="full-width">
                    <el-option label="保密" value="保密" />
                    <el-option label="男" value="男" />
                    <el-option label="女" value="女" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="身份证号码">
                  <el-input v-model="form.idCard" placeholder="请输入身份证号码" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="入职日期">
                  <el-date-picker v-model="form.entryDate" type="date" class="full-width" placeholder="请选择入职日期" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="领导">
                  <el-select v-model="form.leader" class="full-width" placeholder="请选择">
                    <el-option label="张明远" value="1" />
                    <el-option label="李建国" value="2" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="人员编制">
                  <el-select v-model="form.establishment" class="full-width" placeholder="请选择人员编制">
                    <el-option label="行政编制" value="行政编制" />
                    <el-option label="事业编制" value="事业编制" />
                    <el-option label="工勤编制" value="工勤编制" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="职级">
                  <el-select v-model="form.rank" class="full-width" placeholder="请选择职级">
                    <el-option label="一级巡视员" value="一级巡视员" />
                    <el-option label="二级巡视员" value="二级巡视员" />
                    <el-option label="一级调研员" value="一级调研员" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="传真">
                  <el-input v-model="form.fax" placeholder="请输入传真" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="家庭住址">
                  <el-input v-model="form.homeAddress" placeholder="请输入家庭住址" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="政治面貌">
                  <el-select v-model="form.politicalStatus" class="full-width" placeholder="请选择政治面貌">
                    <el-option label="中共党员" value="中共党员" />
                    <el-option label="群众" value="群众" />
                    <el-option label="共青团员" value="共青团员" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="扩展属性1">
                  <el-input v-model="form.ext1" placeholder="0-0" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-divider content-position="left">人员任职管理</el-divider>
            <div class="section-desc-sm">
              支持一人多岗：请通过弹窗新增任职信息，列表展示后可编辑或删除。
            </div>
            <div class="action-row">
              <el-button type="primary" plain @click="openAppointmentDialog()">+ 添加任职</el-button>
            </div>
            <el-table :data="form.appointments" border class="appointment-table">
              <el-table-column prop="dept" label="任职部门" min-width="160" />
              <el-table-column prop="appointmentType" label="任职类型" width="100" />
              <el-table-column prop="role" label="人员角色" min-width="120" />
              <el-table-column prop="position" label="职务" min-width="120" />
              <el-table-column prop="directManager" label="直属主管" min-width="120" />
              <el-table-column prop="officePhone" label="办公电话" min-width="120" />
              <el-table-column prop="positionLevel" label="职务层次" min-width="120" />
              <el-table-column label="操作" width="130">
                <template #default="{ $index }">
                  <el-button type="text" @click="openAppointmentDialog($index)">编辑</el-button>
                  <el-button type="text" class="table-action-btn danger" @click="removeAppointment($index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>

            <el-divider content-position="left">秘书关系配置（并入任职管理）</el-divider>
            <div class="section-desc-sm">以当前人员作为领导维护秘书关系，支持专职/兼职/临时代办。</div>
            <div class="action-row">
              <el-button type="primary" plain @click="openSecretaryDialog()">+ 添加秘书关系</el-button>
            </div>
            <el-table :data="secretaryRows" border class="appointment-table">
              <el-table-column prop="secretaryName" label="秘书姓名" min-width="160" />
              <el-table-column prop="type" label="关系类型" width="120" />
              <el-table-column label="生效周期" min-width="200">
                <template #default="{ row }">{{ row.startDate }} ~ {{ row.endDate || '长期' }}</template>
              </el-table-column>
              <el-table-column label="操作" width="130">
                <template #default="{ row }">
                  <el-button type="text" @click="openSecretaryDialog(row)">编辑</el-button>
                  <el-button type="text" class="table-action-btn danger" @click="removeSecretary(row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            
            <el-form-item>
              <el-button @click="$router.back()">取消</el-button>
              <el-button type="primary" class="ml-8" @click="handleSubmit">保存</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </div>

  <el-dialog
    v-model="showAppointmentDialog"
    :title="editingAppointmentIndex === -1 ? '添加任职信息' : '编辑任职信息'"
    width="720px"
  >
    <el-form :model="appointmentForm" label-width="100px">
      <el-row :gutter="16">
        <el-col :span="12">
          <el-form-item label="任职部门" required>
            <el-select v-model="appointmentForm.dept" class="full-width" placeholder="请选择任职部门">
              <el-option label="元宇宙回归测试/交付开发" value="元宇宙回归测试/交付开发" />
              <el-option label="省政府办公厅" value="省政府办公厅" />
              <el-option label="省教育厅" value="省教育厅" />
              <el-option label="省数据局" value="省数据局" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="任职类型" required>
            <el-select v-model="appointmentForm.appointmentType" class="full-width" placeholder="请选择任职类型">
              <el-option label="主职" value="主职" />
              <el-option label="挂职" value="挂职" />
              <el-option label="借调" value="借调" />
              <el-option label="兼职" value="兼职" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :span="12"><el-form-item label="人员角色"><el-input v-model="appointmentForm.role" /></el-form-item></el-col>
        <el-col :span="12"><el-form-item label="职务"><el-input v-model="appointmentForm.position" /></el-form-item></el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :span="12"><el-form-item label="直属主管"><el-input v-model="appointmentForm.directManager" /></el-form-item></el-col>
        <el-col :span="12"><el-form-item label="职务层次"><el-input v-model="appointmentForm.positionLevel" /></el-form-item></el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :span="12"><el-form-item label="职位传真"><el-input v-model="appointmentForm.positionFax" /></el-form-item></el-col>
        <el-col :span="12"><el-form-item label="办公电话"><el-input v-model="appointmentForm.officePhone" /></el-form-item></el-col>
      </el-row>
      <el-form-item label="办公地址"><el-input v-model="appointmentForm.officeAddress" /></el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="showAppointmentDialog = false">取消</el-button>
      <el-button type="primary" @click="confirmAppointment">确定</el-button>
    </template>
  </el-dialog>

  <el-dialog v-model="showSecretaryDialog" :title="secretaryForm.id ? '编辑秘书关系' : '添加秘书关系'" width="640px">
    <el-form :model="secretaryForm" label-width="100px">
      <el-row :gutter="16">
        <el-col :span="12">
          <el-form-item label="秘书姓名" required>
            <el-select v-model="secretaryForm.secretaryName" filterable allow-create default-first-option>
              <el-option v-for="item in personNameOptions" :key="item" :label="item" :value="item" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="关系类型" required>
            <el-select v-model="secretaryForm.type">
              <el-option label="专职秘书" value="专职秘书" />
              <el-option label="兼职秘书" value="兼职秘书" />
              <el-option label="临时代办" value="临时代办" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="开始日期" required>
            <el-date-picker v-model="secretaryForm.startDate" type="date" value-format="YYYY-MM-DD" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结束日期">
            <el-date-picker v-model="secretaryForm.endDate" type="date" value-format="YYYY-MM-DD" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-button @click="showSecretaryDialog = false">取消</el-button>
      <el-button type="primary" @click="confirmSecretary">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getPersonById, getPersons, upsertPerson } from '../../utils/personStore'
import { secretaryApi } from '../../api/governance'

const route = useRoute()
const router = useRouter()
const isEdit = computed(() => route.name === 'PersonEdit')
const FORM_DRAFT_KEY = computed(() => isEdit.value ? `person_form_draft_${route.params.id}` : 'person_form_draft_new')

const createDefaultForm = () => ({
  id: null,
  name: '古丽拜合提亚尔',
  alias: '',
  mobile: '',
  phonePrefix: '+86',
  email: '',
  dept: '元宇宙回归测试/交付开发',
  username: `user${Date.now().toString().slice(-6)}`,
  loginType: {
    mobile: false,
    email: false,
    username: true
  },
  contact1: '',
  contact1Prefix: '+86',
  nation: '',
  empId: '',
  native: '',
  party: '',
  officeAddress: '',
  position: '',
  birthday: '',
  gender: '保密',
  idCard: '',
  entryDate: '',
  leader: '',
  establishment: '',
  rank: '',
  fax: '',
  homeAddress: '',
  politicalStatus: '',
  ext1: '0-0',
  appointments: [
    {
      dept: '元宇宙回归测试/交付开发',
      appointmentType: '主职',
      role: '部门管理员',
      position: '',
      directManager: '',
      positionFax: '',
      officePhone: '',
      officeAddress: '',
      positionLevel: ''
    }
  ]
})

const form = reactive({
  ...createDefaultForm()
})
const isDirty = ref(false)

const createEmptyAppointment = () => ({
  dept: '',
  appointmentType: '兼职',
  role: '',
  position: '',
  directManager: '',
  positionFax: '',
  officePhone: '',
  officeAddress: '',
  positionLevel: ''
})

const showAppointmentDialog = ref(false)
const editingAppointmentIndex = ref(-1)
const appointmentForm = reactive(createEmptyAppointment())
const showSecretaryDialog = ref(false)
const secretaryRows = ref([])
const personNameOptions = computed(() => getPersons().map((item) => item.name))
const secretaryForm = reactive({
  id: undefined,
  secretaryName: '',
  type: '专职秘书',
  startDate: '',
  endDate: ''
})

const openAppointmentDialog = (index = -1) => {
  editingAppointmentIndex.value = index
  const source = index >= 0 ? form.appointments[index] : createEmptyAppointment()
  Object.assign(appointmentForm, source)
  showAppointmentDialog.value = true
}

const confirmAppointment = () => {
  if (!appointmentForm.dept || !appointmentForm.appointmentType) {
    ElMessage.warning('请补充任职部门和任职类型')
    return
  }
  if (editingAppointmentIndex.value >= 0) {
    form.appointments.splice(editingAppointmentIndex.value, 1, { ...appointmentForm })
  } else {
    form.appointments.push({ ...appointmentForm })
  }
  showAppointmentDialog.value = false
}

const removeAppointment = (index) => {
  if (form.appointments.length === 1) {
    ElMessage.warning('至少保留一条任职信息')
    return
  }
  form.appointments.splice(index, 1)
}

const loadSecretaryRows = async () => {
  const all = await secretaryApi.list()
  const leaderId = isEdit.value ? Number(route.params.id) : null
  secretaryRows.value = all.filter((item) => (leaderId ? Number(item.leaderId) === leaderId : item.leaderName === form.name))
}

const openSecretaryDialog = (row) => {
  Object.assign(secretaryForm, row || {
    id: undefined,
    secretaryName: '',
    type: '专职秘书',
    startDate: '',
    endDate: ''
  })
  showSecretaryDialog.value = true
}

const confirmSecretary = async () => {
  if (!secretaryForm.secretaryName || !secretaryForm.startDate) {
    ElMessage.warning('请填写秘书姓名与开始日期')
    return
  }
  await secretaryApi.save({
    ...secretaryForm,
    leaderId: isEdit.value ? Number(route.params.id) : 0,
    leaderName: form.name
  })
  showSecretaryDialog.value = false
  await loadSecretaryRows()
  ElMessage.success('秘书关系已保存')
}

const removeSecretary = async (id) => {
  await secretaryApi.remove(id)
  await loadSecretaryRows()
  ElMessage.success('秘书关系已删除')
}

const syncForm = (source) => {
  Object.keys(form).forEach((key) => {
    if (key === 'appointments') {
      form.appointments.splice(0, form.appointments.length, ...(source.appointments || []))
    } else if (key === 'loginType') {
      form.loginType = { ...form.loginType, ...(source.loginType || {}) }
    } else {
      form[key] = source[key] ?? form[key]
    }
  })
}

onMounted(() => {
  const draft = typeof window !== 'undefined' ? localStorage.getItem(FORM_DRAFT_KEY.value) : null
  if (draft) {
    try {
      syncForm(JSON.parse(draft))
      ElMessage.info('已恢复未提交草稿')
    } catch {}
  }
  if (isEdit.value) {
    const person = getPersonById(route.params.id)
    if (!person) {
      ElMessage.error('未找到该人员信息')
      router.push('/persons')
      return
    }
    syncForm(person)
  }
  loadSecretaryRows()
})

watch(form, () => {
  isDirty.value = true
  if (typeof window !== 'undefined') {
    localStorage.setItem(FORM_DRAFT_KEY.value, JSON.stringify(form))
  }
}, { deep: true })

const handleBeforeUnload = (event) => {
  if (!isDirty.value) return
  event.preventDefault()
  event.returnValue = ''
}

if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', handleBeforeUnload)
}
onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('beforeunload', handleBeforeUnload)
  }
})

onBeforeRouteLeave((to, from, next) => {
  if (!isDirty.value) {
    next()
    return
  }
  const confirmed = window.confirm('当前有未保存内容，确定离开吗？')
  if (confirmed) next()
  else next(false)
})

const handleSubmit = () => {
  if (!form.name) {
    ElMessage.warning('请输入姓名')
    return
  }
  const primaryAppointment = form.appointments.find((item) => item.appointmentType === '主职') || form.appointments[0]
  form.dept = primaryAppointment?.dept || form.dept
  form.officeAddress = primaryAppointment?.officeAddress || form.officeAddress
  form.position = primaryAppointment?.position || form.position
  form.fax = primaryAppointment?.positionFax || form.fax

  upsertPerson({
    ...form,
    id: isEdit.value ? Number(route.params.id) : undefined,
    username: form.username || `user${Date.now().toString().slice(-6)}`
  })
  ElMessage.success('保存成功')
  isDirty.value = false
  if (typeof window !== 'undefined') {
    localStorage.removeItem(FORM_DRAFT_KEY.value)
  }
  router.push('/persons')
}
</script>

<style scoped>
.avatar-col { text-align: center; }
.avatar-wrapper { position: relative; display: inline-block; }
.avatar-bg { background: linear-gradient(180deg, #5c87ff 0%, #4080ff 100%); }
.avatar-mask {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,0.6);
  color: #fff;
  font-size: 12px;
  padding: 4px 0;
  border-radius: 0 0 4px 4px;
}
.avatar-tip { color: #86909c; font-size: 12px; margin-top: 8px; }
.section-desc-sm { margin-bottom: 16px; color: #4e5969; font-size: 13px; }
.action-row { margin-bottom: 12px; }
.appointment-table { width: 100%; margin-bottom: 12px; }
.table-action-btn.danger { color: #f53f3f; }
.ml-8 { margin-left: 8px; }
.ml-20 { margin-left: 20px; }
.full-width { width: 100%; }
.prefix-select { width: 80px; }
.grow-input { flex: 1; min-width: 0; }
.contact-inline { display: flex; align-items: center; width: 100%; }
.add-contact-btn { flex: 0 0 auto; }
</style>
