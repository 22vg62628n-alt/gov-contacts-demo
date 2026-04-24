<template>
  <div class="project-home">
    <section class="hero">
      <div class="hero-content">
        <h1>政务协作四专项统一立项</h1>
        <p class="hero-subtitle">补齐政务市场核心能力，打造行业领先的政务协作平台</p>
        <div class="hero-stats">
          <div class="stat-card"><span class="stat-number">4</span><div class="stat-label">核心专项</div></div>
          <div class="stat-card"><span class="stat-number">166</span><div class="stat-label">需求总数</div></div>
          <div class="stat-card"><span class="stat-number">31</span><div class="stat-label">核心指标</div></div>
          <div class="stat-card"><span class="stat-number">11</span><div class="stat-label">专属模板</div></div>
        </div>
      </div>
    </section>

    <div class="container">
      <section class="section">
        <h2 class="section-title">战略价值：为什么必须做？</h2>
        <p class="section-desc">政务市场是公司未来3年最重要的增长引擎，四专项是进入这个千亿市场的“入场券”</p>
        <div class="cards-grid">
          <div class="card">
            <div class="card-header"><div class="card-icon blue">📊</div><div><div class="card-title">千亿市场机遇</div><div class="card-subtitle">年增长率15%+</div></div></div>
            <div class="card-content"><ul><li>政务市场年采购规模超千亿</li><li>蓝信、专有钉钉已深耕多年</li><li>不补齐基础能力将逐渐边缘化</li></ul></div>
          </div>
          <div class="card">
            <div class="card-header"><div class="card-icon gold">🎫</div><div><div class="card-title">市场入场券</div><div class="card-subtitle">四大核心能力</div></div></div>
            <div class="card-content"><ul><li>行政区划/条线管理：组织架构底层能力</li><li>政务待办：公文流转核心场景</li><li>工作台样板间：用户统一入口</li><li>可视化看板：领导决策依据</li></ul></div>
          </div>
          <div class="card">
            <div class="card-header"><div class="card-icon green">🏆</div><div><div class="card-title">差异化竞争力</div><div class="card-subtitle">行业壁垒建立</div></div></div>
            <div class="card-content"><ul><li>“行政区划+条线”双维度管理</li><li>政务专属模板、指标体系</li><li>“协作+文档”独特差异点</li></ul></div>
          </div>
          <div class="card">
            <div class="card-header"><div class="card-icon red">🚀</div><div><div class="card-title">长期愿景</div><div class="card-subtitle">三阶段规划</div></div></div>
            <div class="card-content"><ul><li>第一阶段：基础能力补齐</li><li>第二阶段：差异化能力建设</li><li>第三阶段：行业化产品输出</li></ul></div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">竞品分析：我们与谁竞争？</h2>
        <p class="section-desc">蓝信、专有钉钉、浙政钉、企业微信政务版已在政务市场建立优势，我们必须快速追赶</p>
        <div class="competitor-section">
          <div class="competitor-grid">
            <div class="competitor-card"><div class="competitor-name">蓝信</div><div class="competitor-vendor">中国电子 | 央企/政务安全通讯平台</div><div class="competitor-features">• 条线通讯录：职能聚合+行政区划协同<br>• 等保三级认证、国密算法<br>• 工作秘密全生命周期管理<br>• 国产化适配（国产OS/芯片/数据库）</div></div>
            <div class="competitor-card"><div class="competitor-name">专有钉钉</div><div class="competitor-vendor">阿里 | 政务数字化协同平台</div><div class="competitor-features">• 省市县乡村五级行政区划覆盖<br>• 条线通讯录+条线工作台<br>• 专有云部署+国密算法<br>• 数据本地化+操作留痕</div></div>
            <div class="competitor-card"><div class="competitor-name">浙政钉</div><div class="competitor-vendor">阿里（浙江定制）| 省级政务掌上办公平台</div><div class="competitor-features">• 六级行政区划覆盖（省→村→网格）<br>• 条线分类管理（教育/医疗/市场监管等）<br>• 国密算法端到端加密<br>• 激活用户141万+，接入32万组织</div></div>
            <div class="competitor-card"><div class="competitor-name">企业微信政务版</div><div class="competitor-vendor">腾讯 | 政务协同连接器</div><div class="competitor-features">• 多级行政区划架构<br>• 私有化部署（政府指定机房）<br>• 等保2.0三级<br>• 全链路审计留痕</div></div>
          </div>
        </div>
        <div class="chart-container">
          <div class="chart-title">竞品能力对比雷达图</div>
          <div ref="radarChartRef" class="chart-wrapper"></div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">四专项详情：我们要做什么？</h2>
        <p class="section-desc">覆盖组织架构管理、统一待办入口、工作台个性化、数据可视化四大方向</p>
        <div class="tab-nav">
          <button class="tab-btn" :class="{ active: activeTab === 'contact' }" @click="activeTab = 'contact'">政务通讯录</button>
          <button class="tab-btn" :class="{ active: activeTab === 'todo' }" @click="activeTab = 'todo'">政务待办</button>
          <button class="tab-btn" :class="{ active: activeTab === 'workspace' }" @click="activeTab = 'workspace'">工作台样板间</button>
          <button class="tab-btn" :class="{ active: activeTab === 'dashboard' }" @click="activeTab = 'dashboard'">可视化看板</button>
        </div>
        <div class="tab-content" v-show="activeTab === 'contact'">
          <div class="cards-grid">
            <div class="card" @click="goToRoute('/line-contacts')"><div class="card-header"><div class="card-icon blue">🏛️</div><div><div class="card-title">行政区划与条线基础能力</div><div class="card-subtitle">P0 | 政务市场入场券</div></div></div><div class="card-content"><ul><li>预置国标行政区划编码</li><li>支持行政区划编码新增、删除、编辑</li><li>部门绑定具体行政区划</li><li>预置基础条线编码</li><li>支持条线编码新增、删除、编辑</li><li>部门绑定具体条线</li></ul></div></div>
            <div class="card" @click="goToRoute('/persons')"><div class="card-header"><div class="card-icon green">🏢</div><div><div class="card-title">组织架构与部门信息管理</div><div class="card-subtitle">P0 | 三维管理差异化</div></div></div><div class="card-content"><ul><li>支持政务属性部门信息字段</li><li>部门类型支持行政区划、条线等设置</li><li>支持部门与机构级别、区划、条线绑定</li><li>分级分区划管理组织架构管控</li></ul></div></div>
            <div class="card" @click="goToRoute('/visibility')"><div class="card-header"><div class="card-icon purple">👁️</div><div><div class="card-title">可见性统一配置</div><div class="card-subtitle">P0 | 配置效率提升70%</div></div></div><div class="card-content"><ul><li>可见性各项功能配置合并</li><li>支持封装高级特殊规则</li></ul></div></div>
            <div class="card" @click="goToRoute('/persons')"><div class="card-header"><div class="card-icon orange">👤</div><div><div class="card-title">任职管理</div><div class="card-subtitle">P0 | 一人多岗场景</div></div></div><div class="card-content"><ul><li>支持主职、兼职、挂职、借调配置</li><li>主职单位管理权限的管理员可操作人员信息</li><li>通讯录展示主职+兼职标签，支持切换查看</li></ul></div></div>
          </div>
        </div>
        <div class="tab-content" v-show="activeTab === 'todo'">
          <div class="cards-grid">
            <div class="card"><div class="card-header"><div class="card-icon blue">📋</div><div><div class="card-title">待办自定义字段展示</div><div class="card-subtitle">P0 | 公文关键信息展示</div></div></div></div>
            <div class="card"><div class="card-header"><div class="card-icon green">🔍</div><div><div class="card-title">待办全文检索</div><div class="card-subtitle">P0 | 已办数据快速查找</div></div></div></div>
            <div class="card"><div class="card-header"><div class="card-icon purple">⚙️</div><div><div class="card-title">待办后台管理平台</div><div class="card-subtitle">P0 | 管理员自主运维</div></div></div></div>
            <div class="card"><div class="card-header"><div class="card-icon orange">🔄</div><div><div class="card-title">状态同步回调机制</div><div class="card-subtitle">P2 | 数据一致性保障</div></div></div></div>
          </div>
        </div>
        <div class="tab-content" v-show="activeTab === 'workspace'">
          <div class="cards-grid">
            <div class="card"><div class="card-header"><div class="card-icon blue">🖼️</div><div><div class="card-title">宣传栏改造</div><div class="card-subtitle">P0 | 自定义比例支持</div></div></div></div>
            <div class="card"><div class="card-header"><div class="card-icon green">👋</div><div><div class="card-title">欢迎组件</div><div class="card-subtitle">P1 | 个性化问候</div></div></div></div>
            <div class="card"><div class="card-header"><div class="card-icon purple">📊</div><div><div class="card-title">数据指标卡</div><div class="card-subtitle">P1 | 关键数据展示</div></div></div></div>
            <div class="card"><div class="card-header"><div class="card-icon orange">📢</div><div><div class="card-title">轮播公告</div><div class="card-subtitle">P1 | 重要信息发布</div></div></div></div>
          </div>
          <div class="chart-container chart-gap-top">
            <div class="chart-title">11套政务专属模板规划</div>
            <div ref="templateChartRef" class="chart-wrapper"></div>
          </div>
        </div>
        <div class="tab-content" v-show="activeTab === 'dashboard'">
          <div class="cards-grid">
            <div class="card"><div class="card-header"><div class="card-icon blue">📈</div><div><div class="card-title">31个核心指标体系</div><div class="card-subtitle">五大维度全覆盖</div></div></div></div>
            <div class="card"><div class="card-header"><div class="card-icon green">⏰</div><div><div class="card-title">T+1数据时效</div><div class="card-subtitle">稳定性与一致性保障</div></div></div></div>
            <div class="card"><div class="card-header"><div class="card-icon purple">🔍</div><div><div class="card-title">5个分析维度</div><div class="card-subtitle">多维数据分析</div></div></div></div>
            <div class="card"><div class="card-header"><div class="card-icon orange">🔧</div><div><div class="card-title">8个数据开发模块</div><div class="card-subtitle">标准化数据开发能力</div></div></div></div>
          </div>
          <div class="chart-container chart-gap-top">
            <div class="chart-title">31个核心指标分布</div>
            <div ref="indicatorChartRef" class="chart-wrapper"></div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">商业收益：能带来什么？</h2>
        <p class="section-desc">直接收益、间接收益、长期收益三重回报</p>
        <div class="benefits-grid">
          <div class="benefit-card"><div class="benefit-icon direct">💰</div><div class="benefit-title">直接收益</div><div class="benefit-amount">150万+</div><div class="benefit-desc">青海项目验收与回款<br>汉智办待办验收与回款</div></div>
          <div class="benefit-card"><div class="benefit-icon indirect">📈</div><div class="benefit-title">间接收益</div><div class="benefit-amount">300万+/年</div><div class="benefit-desc">政务客户转化率提升30%+<br>标准化产品溢价提升20%毛利率</div></div>
          <div class="benefit-card"><div class="benefit-icon longterm">🏰</div><div class="benefit-title">长期收益</div><div class="benefit-amount">行业壁垒</div><div class="benefit-desc">政务市场行业壁垒建立<br>“协作+文档”差异化竞争优势</div></div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">里程碑：怎么做？</h2>
        <p class="section-desc">三阶段交付计划，2026年Q2-Q4逐步完善</p>
        <div class="timeline">
          <div class="timeline-item"><div class="timeline-phase">V1.0（一期）| 2026年Q2</div><div class="timeline-title">基础能力补齐</div><div class="timeline-content">政务通讯录、政务待办、工作台样板间、可视化看板完成基础能力建设。</div></div>
          <div class="timeline-item"><div class="timeline-phase">V2.0（二期）| 2026年Q3</div><div class="timeline-title">差异化能力建设</div><div class="timeline-content">强化任职管理、多字段检索、欢迎组件和完整指标覆盖，形成阶段竞争优势。</div></div>
          <div class="timeline-item"><div class="timeline-phase">V3.0（三期）| 2026年Q4</div><div class="timeline-title">行业化产品输出</div><div class="timeline-content">完成行业化模板、三方数据对接与能力产品化，支撑规模复制落地。</div></div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">风险与应对</h2>
        <p class="section-desc">识别关键风险，提前制定应对措施</p>
        <div class="risk-grid">
          <div class="risk-card"><div class="risk-title">行政区划与条线关联关系复杂</div><div class="risk-impact">影响：开发周期延长</div><div class="risk-solution">应对：先做MVP版本，迭代完善</div></div>
          <div class="risk-card"><div class="risk-title">全文检索性能</div><div class="risk-impact">影响：大规模已办数据查询慢</div><div class="risk-solution">应对：建立专用索引，分库分表</div></div>
          <div class="risk-card"><div class="risk-title">OA厂商接口差异大</div><div class="risk-impact">影响：对接成本高</div><div class="risk-solution">应对：统一标准文档+示例代码</div></div>
          <div class="risk-card"><div class="risk-title">数据源API不稳定</div><div class="risk-impact">影响：看板数据不准</div><div class="risk-solution">应对：定时任务重试+监控报警</div></div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <div class="footer-content">
        <div class="footer-title">政务协作四专项统一立项文档</div>
        <div class="footer-desc">补齐政务市场核心能力，打造行业领先的政务协作平台</div>
        <div class="footer-meta">生成时间：2026-04-16 10:45 | 版本：V1.3 | 数据来源：政务协作四专项统一立项文档</div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { useRouter } from 'vue-router'
import * as echarts from 'echarts'

const router = useRouter()
const activeTab = ref('contact')
const goToRoute = (path) => router.push(path)

const radarChartRef = ref(null)
const templateChartRef = ref(null)
const indicatorChartRef = ref(null)
let radarChart = null
let templateChart = null
let indicatorChart = null

const initRadarChart = () => {
  if (!radarChartRef.value) return
  radarChart = echarts.init(radarChartRef.value)
  radarChart.setOption({
    backgroundColor: 'transparent',
    legend: {
      data: ['蓝信', '专有钉钉', '浙政钉', '企业微信政务版', '我方（当前）', '我方（目标）'],
      bottom: 0
    },
    radar: {
      indicator: [
        { name: '行政区划管理', max: 100 },
        { name: '条线通讯录', max: 100 },
        { name: '安全合规', max: 100 },
        { name: '待办能力', max: 100 },
        { name: '工作台定制', max: 100 },
        { name: '数据可视化', max: 100 }
      ]
    },
    series: [{
      type: 'radar',
      data: [
        { value: [90, 95, 95, 70, 60, 65], name: '蓝信' },
        { value: [95, 90, 90, 75, 70, 70], name: '专有钉钉' },
        { value: [95, 85, 85, 80, 65, 85], name: '浙政钉' },
        { value: [80, 70, 90, 65, 60, 60], name: '企业微信政务版' },
        { value: [30, 20, 60, 50, 40, 30], name: '我方（当前）' },
        { value: [90, 85, 85, 90, 85, 80], name: '我方（目标）' }
      ]
    }]
  })
}

const initTemplateChart = () => {
  if (!templateChartRef.value) return
  templateChart = echarts.init(templateChartRef.value)
  templateChart.setOption({
    tooltip: { trigger: 'item', formatter: '{b}: {c}套' },
    series: [{
      type: 'pie',
      radius: ['40%', '70%'],
      label: { formatter: '{b}\n{c}套' },
      data: [
        { value: 4, name: '领导驾驶舱类' },
        { value: 3, name: '通用工作台类' },
        { value: 4, name: '专项任务台类' }
      ]
    }]
  })
}

const initIndicatorChart = () => {
  if (!indicatorChartRef.value) return
  indicatorChart = echarts.init(indicatorChartRef.value)
  indicatorChart.setOption({
    tooltip: { trigger: 'axis' },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: { type: 'value' },
    yAxis: {
      type: 'category',
      data: ['待办与工单分析', '全局概览', '用户分析', '消息分析', '工作台与应用分析']
    },
    series: [{
      type: 'bar',
      data: [3, 6, 6, 7, 9],
      label: { show: true, position: 'right', formatter: '{c}个' }
    }]
  })
}

const handleResize = () => {
  radarChart?.resize()
  templateChart?.resize()
  indicatorChart?.resize()
}

onMounted(async () => {
  await nextTick()
  initRadarChart()
  if (activeTab.value === 'workspace') initTemplateChart()
  if (activeTab.value === 'dashboard') initIndicatorChart()
  window.addEventListener('resize', handleResize)
})

watch(activeTab, async (tab) => {
  await nextTick()
  if (tab === 'workspace' && !templateChart) initTemplateChart()
  if (tab === 'dashboard' && !indicatorChart) initIndicatorChart()
  handleResize()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  radarChart?.dispose()
  templateChart?.dispose()
  indicatorChart?.dispose()
})
</script>

<style scoped>
* { margin: 0; padding: 0; box-sizing: border-box; }
.project-home {
  --primary-blue: #4080ff;
  --primary-blue-light: #4096ff;
  --accent-gold: #faad14;
  --accent-red: #ff4d4f;
  --accent-green: #52c41a;
  --bg-secondary: #f5f8ff;
  --bg-card: #ffffff;
  --text-primary: #1d2129;
  --text-secondary: #4e5969;
  --text-muted: #86909c;
  --border-color: #e5e6eb;
  --shadow-sm: 0 2px 8px rgba(0,0,0,.06);
  --shadow-md: 0 4px 16px rgba(0,0,0,.08);
  --shadow-lg: 0 8px 24px rgba(0,0,0,.1);
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif;
  background: var(--bg-secondary);
  color: var(--text-primary);
  line-height: 1.6;
  margin: -24px;
  min-height: 100vh;
}
.hero { background: linear-gradient(135deg, #e6f4ff 0%, #bae0ff 50%, #91caff 100%); padding: 60px 20px; text-align: center; }
.hero-content { max-width: 1200px; margin: 0 auto; }
.hero h1 { font-size: 42px; margin-bottom: 16px; }
.hero-subtitle { font-size: 18px; color: var(--text-secondary); margin-bottom: 40px; }
.hero-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; max-width: 900px; margin: 0 auto; }
.stat-card { background: rgba(255,255,255,.8); border-radius: 12px; padding: 24px 16px; border: 1px solid rgba(255,255,255,.9); }
.stat-number { font-size: 48px; font-weight: 700; color: var(--primary-blue); display: block; }
.stat-label { font-size: 14px; color: var(--text-secondary); margin-top: 8px; }
.container { max-width: 1440px; margin: 0 auto; padding: 0 20px; }
.section { padding: 56px 0; }
.section-title { font-size: 28px; margin-bottom: 12px; display: flex; align-items: center; gap: 12px; }
.section-title::before { content: ""; width: 4px; height: 28px; background: linear-gradient(180deg, var(--primary-blue), var(--accent-gold)); border-radius: 2px; }
.section-desc { color: var(--text-secondary); margin-bottom: 32px; padding-left: 16px; }
.cards-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
.card { background: var(--bg-card); border-radius: 16px; padding: 28px; box-shadow: var(--shadow-sm); border: 1px solid var(--border-color); }
.card-header { display: flex; gap: 12px; margin-bottom: 20px; }
.card-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px; }
.card-icon.blue { background: linear-gradient(135deg, #e6f4ff, #bae0ff); }
.card-icon.green { background: linear-gradient(135deg, #f6ffed, #b7eb8f); }
.card-icon.purple { background: linear-gradient(135deg, #f9f0ff, #d3adf7); }
.card-icon.orange { background: linear-gradient(135deg, #fff7e6, #ffd591); }
.card-icon.gold { background: linear-gradient(135deg, #fffbe6, #fff1b8); }
.card-icon.red { background: linear-gradient(135deg, #fff2f0, #ffccc7); }
.card-title { font-size: 20px; font-weight: 600; }
.card-subtitle { font-size: 13px; color: var(--primary-blue); }
.card-content { color: var(--text-secondary); font-size: 14px; line-height: 1.8; }
.card-content ul { list-style: none; }
.card-content li { padding: 6px 0 6px 18px; position: relative; }
.card-content li::before { content: "•"; position: absolute; left: 0; color: var(--primary-blue); }
.competitor-section { background: var(--bg-card); border-radius: 16px; padding: 32px; box-shadow: var(--shadow-sm); }
.competitor-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
.competitor-card { background: linear-gradient(135deg, #f8fafc, #f0f5ff); border-radius: 12px; padding: 20px; border-left: 4px solid var(--primary-blue); }
.competitor-name { font-size: 18px; font-weight: 600; margin-bottom: 4px; }
.competitor-vendor { font-size: 12px; color: var(--text-muted); margin-bottom: 12px; }
.competitor-features { font-size: 13px; color: var(--text-secondary); line-height: 1.6; }
.chart-container { background: var(--bg-card); border-radius: 16px; padding: 32px; box-shadow: var(--shadow-sm); margin-top: 24px; }
.chart-gap-top { margin-top: 24px; }
.chart-title { font-size: 18px; font-weight: 600; margin-bottom: 20px; }
.chart-wrapper { height: 400px; }
.tab-nav { display: flex; gap: 8px; margin-bottom: 24px; flex-wrap: wrap; }
.tab-btn { padding: 10px 20px; border: none; background: var(--bg-card); border-radius: 8px; cursor: pointer; box-shadow: var(--shadow-sm); }
.tab-btn { font-size: 14px; color: #4e5969; }
.tab-btn.active { background: var(--primary-blue); color: #fff; }
.benefits-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.benefit-card { background: var(--bg-card); border-radius: 16px; padding: 28px; text-align: center; box-shadow: var(--shadow-sm); border: 1px solid var(--border-color); }
.benefit-icon { width: 64px; height: 64px; margin: 0 auto 16px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 28px; }
.benefit-icon.direct { background: linear-gradient(135deg, #f6ffed, #b7eb8f); }
.benefit-icon.indirect { background: linear-gradient(135deg, #e6f4ff, #91caff); }
.benefit-icon.longterm { background: linear-gradient(135deg, #fffbe6, #ffd666); }
.benefit-title { font-size: 18px; font-weight: 600; margin-bottom: 12px; }
.benefit-amount { font-size: 32px; font-weight: 700; color: var(--primary-blue); margin-bottom: 8px; }
.benefit-desc { font-size: 14px; color: var(--text-secondary); }
.timeline { position: relative; padding-left: 40px; }
.timeline::before { content: ""; position: absolute; left: 14px; top: 0; bottom: 0; width: 3px; background: linear-gradient(180deg, var(--primary-blue), var(--accent-gold)); }
.timeline-item { position: relative; margin-bottom: 20px; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; box-shadow: var(--shadow-sm); padding: 20px; }
.timeline-item::before { content: ""; position: absolute; left: -32px; top: 26px; width: 16px; height: 16px; border-radius: 50%; background: var(--primary-blue); }
.timeline-phase { color: var(--primary-blue); font-weight: 600; margin-bottom: 6px; }
.timeline-title { font-size: 18px; font-weight: 600; margin-bottom: 10px; }
.timeline-content { color: var(--text-secondary); }
.risk-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
.risk-card { background: var(--bg-card); border-left: 4px solid var(--accent-red); border-radius: 12px; padding: 20px; box-shadow: var(--shadow-sm); }
.risk-title { font-size: 16px; font-weight: 600; margin-bottom: 8px; }
.risk-impact { font-size: 13px; color: var(--text-muted); margin-bottom: 10px; }
.risk-solution { font-size: 14px; color: var(--accent-green); background: rgba(82,196,26,.06); border-left: 3px solid var(--accent-green); border-radius: 8px; padding: 10px; }
.footer { background: var(--bg-card); color: var(--text-secondary); padding: 40px 20px; text-align: center; border-top: 1px solid var(--border-color); margin-top: 24px; }
.footer-title { font-size: 20px; font-weight: 600; color: var(--text-primary); margin-bottom: 12px; }
.footer-desc { margin-bottom: 20px; }
.footer-meta { font-size: 12px; color: var(--text-muted); }
@media (max-width: 1024px) {
  .hero-stats, .competitor-grid, .benefits-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .hero h1 { font-size: 28px; }
  .hero-stats, .cards-grid, .competitor-grid, .benefits-grid, .risk-grid { grid-template-columns: 1fr; }
}
</style>
