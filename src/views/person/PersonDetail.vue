<template>
  <div class="person-detail-page">
    <el-card>
      <template #header>
        <div class="header-row">
          <span>人员详情</span>
          <el-button type="primary" @click="$router.push(`/persons/${person.id}/edit`)">编辑</el-button>
        </div>
      </template>
      
      <el-row :gutter="24">
        <!-- 头像区域 -->
        <el-col :span="4" class="avatar-col">
          <el-avatar :size="120" class="avatar">
            {{ person.name[0] }}
          </el-avatar>
          <el-button type="text" size="small">更改头像</el-button>
          <p class="avatar-tip">仅支持小于5M，格式为JPG/JPEG/PNG/BMP的图片</p>
        </el-col>
        
        <!-- 表单区域 -->
        <el-col :span="20">
          <el-descriptions :column="2" border :model="person">
            <el-descriptions-item label="姓名" required>
              {{ person.name }}
            </el-descriptions-item>
            <el-descriptions-item label="手机">
              <div class="contact-inline">
                <el-select v-model="person.phonePrefix" disabled class="prefix-select">
                  <el-option label="+86" value="+86" />
                </el-select>
                <el-input v-model="person.mobile" disabled class="grow-input" />
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="别名">
              {{ person.alias || '请输入别名' }}
            </el-descriptions-item>
            <el-descriptions-item label="邮箱">
              {{ person.email || '请输入邮箱' }}
            </el-descriptions-item>
            <el-descriptions-item label="部门" required>
              {{ person.dept }}
            </el-descriptions-item>
            <el-descriptions-item label="用户名" required>
              {{ person.username }}
            </el-descriptions-item>
            <el-descriptions-item label="登录方式">
              <el-checkbox v-model="person.loginType.mobile" disabled>手机号码</el-checkbox>
              <el-checkbox v-model="person.loginType.email" disabled class="ml-20">邮箱</el-checkbox>
              <el-checkbox v-model="person.loginType.username" disabled class="ml-20">用户名</el-checkbox>
            </el-descriptions-item>
            <el-descriptions-item label="民族">
              {{ person.nation || '请选择民族' }}
            </el-descriptions-item>
            <el-descriptions-item label="联系方式1">
              <div class="contact-inline">
                <el-select v-model="person.contact1Prefix" disabled class="prefix-select">
                  <el-option label="+86" value="+86" />
                </el-select>
                <el-input v-model="person.contact1" disabled class="grow-input" placeholder="请填写联系方式" />
                <el-button type="text" icon="Plus" disabled class="ml-8"></el-button>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="籍贯">
              {{ person.native || '请输入籍贯' }}
            </el-descriptions-item>
            <el-descriptions-item label="工号">
              {{ person.empId || '选填' }}
            </el-descriptions-item>
            <el-descriptions-item label="办公地址">
              {{ person.officeAddress || '请输入办公地址' }}
            </el-descriptions-item>
            <el-descriptions-item label="党派">
              {{ person.party || '请输入党派' }}
            </el-descriptions-item>
            <el-descriptions-item label="出生日期">
              {{ person.birthday || '请选择出生日期' }}
            </el-descriptions-item>
            <el-descriptions-item label="职务/人员">
              {{ person.position || '请输入职务/人员' }}
            </el-descriptions-item>
            <el-descriptions-item label="身份证号码">
              {{ person.idCard || '请输入身份证号码' }}
            </el-descriptions-item>
            <el-descriptions-item label="性别">
              {{ person.gender || '保密' }}
            </el-descriptions-item>
            <el-descriptions-item label="领导">
              {{ person.leader || '请选择' }}
            </el-descriptions-item>
            <el-descriptions-item label="入职日期">
              {{ person.entryDate || '请选择入职日期' }}
            </el-descriptions-item>
            <el-descriptions-item label="职级">
              {{ person.rank || '请选择职级' }}
            </el-descriptions-item>
            <el-descriptions-item label="人员编制">
              {{ person.establishment || '请选择人员编制' }}
            </el-descriptions-item>
            <el-descriptions-item label="家庭住址">
              {{ person.homeAddress || '请输入家庭住址' }}
            </el-descriptions-item>
            <el-descriptions-item label="传真">
              {{ person.fax || '请输入传真' }}
            </el-descriptions-item>
            <el-descriptions-item label="政治面貌">
              {{ person.politicalStatus || '请选择政治面貌' }}
            </el-descriptions-item>
            <el-descriptions-item label="扩展属性1">
              {{ person.ext1 || '0-0' }}
            </el-descriptions-item>
          </el-descriptions>

          <el-divider content-position="left">任职信息</el-divider>
          <el-table :data="person.appointments" border class="full-width">
            <el-table-column prop="dept" label="任职部门" min-width="180" />
            <el-table-column prop="appointmentType" label="任职类型" width="100" />
            <el-table-column prop="role" label="人员角色" min-width="140" />
            <el-table-column prop="position" label="职务" min-width="120" />
            <el-table-column prop="directManager" label="直属主管" min-width="120" />
            <el-table-column prop="positionFax" label="职位传真" min-width="120" />
            <el-table-column prop="officePhone" label="办公电话" min-width="120" />
            <el-table-column prop="officeAddress" label="办公地址" min-width="180" />
            <el-table-column prop="positionLevel" label="职务层次" min-width="120" />
          </el-table>

          <el-divider content-position="left">秘书关系</el-divider>
          <el-table :data="secretaryRows" border class="full-width">
            <el-table-column prop="secretaryName" label="秘书姓名" min-width="160" />
            <el-table-column prop="type" label="关系类型" width="120" />
            <el-table-column label="生效周期" min-width="220">
              <template #default="{ row }">{{ row.startDate }} ~ {{ row.endDate || '长期' }}</template>
            </el-table-column>
            <el-table-column prop="updatedAt" label="更新时间" min-width="180" />
          </el-table>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getPersonById } from '../../utils/personStore'
import { secretaryApi } from '../../api/governance'

const route = useRoute()
const router = useRouter()

const person = reactive({
  id: 1,
  name: '古丽拜合提亚尔',
  alias: '',
  mobile: '13812345678',
  phonePrefix: '+86',
  email: 'guli@gov.cn',
  dept: '元宇宙回归测试/交付开发',
  username: '55555',
  loginType: {
    mobile: false,
    email: false,
    username: true
  },
  nation: '',
  contact1: '',
  contact1Prefix: '+86',
  native: '',
  empId: '',
  officeAddress: '',
  party: '',
  birthday: '',
  position: '',
  idCard: '',
  gender: '保密',
  leader: '',
  entryDate: '',
  rank: '',
  establishment: '',
  homeAddress: '',
  fax: '',
  politicalStatus: '',
  ext1: '0-0',
  appointments: [
    {
      dept: '元宇宙回归测试/交付开发',
      appointmentType: '主职',
      role: '部门管理员',
      position: '技术负责人',
      directManager: '张明远',
      positionFax: '0971-1234567',
      officePhone: '0971-7654321',
      officeAddress: '青海省西宁市政务服务中心A座8楼',
      positionLevel: '正科级'
    },
    {
      dept: '省政府办公厅',
      appointmentType: '挂职',
      role: '协同专员',
      position: '项目联络员',
      directManager: '李建国',
      positionFax: '0971-2345678',
      officePhone: '0971-8765432',
      officeAddress: '青海省西宁市省政府办公厅3楼',
      positionLevel: '副科级'
    }
  ]
})
const secretaryRows = reactive([])

const syncPerson = (data) => {
  Object.keys(person).forEach((key) => {
    if (key === 'appointments') {
      person.appointments.splice(0, person.appointments.length, ...(data.appointments || []))
    } else if (key === 'loginType') {
      person.loginType = { ...person.loginType, ...(data.loginType || {}) }
    } else {
      person[key] = data[key] ?? person[key]
    }
  })
}

onMounted(() => {
  const data = getPersonById(route.params.id)
  if (!data) {
    ElMessage.error('未找到该人员信息')
    router.push('/persons')
    return
  }
  syncPerson(data)
  secretaryApi.list().then((rows) => {
    secretaryRows.splice(0, secretaryRows.length, ...rows.filter((item) => Number(item.leaderId) === Number(data.id)))
  })
})
</script>

<style scoped>
.header-row { display: flex; justify-content: space-between; align-items: center; }
.avatar-col { text-align: center; }
.avatar { background: linear-gradient(180deg, #5c87ff 0%, #4080ff 100%); margin-bottom: 12px; }
.avatar-tip { color: #86909c; font-size: 12px; margin-top: 4px; }
.prefix-select { width: 80px; }
.grow-input { flex: 1; min-width: 0; }
.contact-inline { display: flex; align-items: center; width: 100%; }
.ml-8 { margin-left: 8px; }
.ml-20 { margin-left: 20px; }
.full-width { width: 100%; }
</style>
