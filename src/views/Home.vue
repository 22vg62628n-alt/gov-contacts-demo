<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1>政务协作四专项统一立项</h1>
        <p class="hero-subtitle">补齐政务市场核心能力，打造行业领先的政务协作平台</p>
        
        <div class="hero-stats">
          <div class="stat-card">
            <span class="stat-number">4</span>
            <div class="stat-label">核心专项</div>
          </div>
          <div class="stat-card">
            <span class="stat-number">166</span>
            <div class="stat-label">需求总数</div>
          </div>
          <div class="stat-card">
            <span class="stat-number">31</span>
            <div class="stat-label">核心指标</div>
          </div>
          <div class="stat-card">
            <span class="stat-number">11</span>
            <div class="stat-label">专属模板</div>
          </div>
        </div>
      </div>
    </section>

    <div class="container">
      <!-- 四专项详情 Section -->
      <section class="section">
        <h2 class="section-title">四专项详情：我们要做什么？</h2>
        <p class="section-desc">覆盖组织架构管理、统一待办入口、工作台个性化、数据可视化四大方向</p>
        
        <div class="tab-nav">
          <button class="tab-btn" :class="{ active: activeTab === 'contact' }" @click="switchTab('contact')">政务通讯录</button>
          <button class="tab-btn" :class="{ active: activeTab === 'todo' }" @click="switchTab('todo')">政务待办</button>
          <button class="tab-btn" :class="{ active: activeTab === 'workspace' }" @click="switchTab('workspace')">工作台样板间</button>
          <button class="tab-btn" :class="{ active: activeTab === 'dashboard' }" @click="switchTab('dashboard')">可视化看板</button>
        </div>
        
        <!-- 政务通讯录 -->
        <div class="tab-content" :class="{ active: activeTab === 'contact' }">
          <div class="cards-grid">
            <div class="card" @click="$router.push('/code/line-address')">
              <div class="card-header">
                <div class="card-icon blue">🏛️</div>
                <div>
                  <div class="card-title">行政区划与条线基础能力</div>
                  <div class="card-subtitle">P0 | 政务市场入场券</div>
                </div>
              </div>
              <div class="card-content">
                <p><strong>战略价值：</strong>这是政务市场的"入场券"。蓝信、专有钉钉已具备成熟的行政区划和条线通讯录能力，我们如果不补齐这个基础能力，将在政务市场失去竞争力。</p>
                <p class="mt-12"><strong>目标：</strong>达到蓝信、专有钉钉同等水平，具备完整的行政区划和条线管理能力，支撑政务市场规模化复制。</p>
                <ul class="mt-12">
                  <li>预置国标行政区划编码</li>
                  <li>支持行政区划编码新增、删除、编辑</li>
                  <li>部门绑定具体行政区划</li>
                  <li>预置基础条线编码</li>
                  <li>支持条线编码新增、删除、编辑</li>
                  <li>部门绑定具体条线</li>
                </ul>
              </div>
            </div>
            
            <div class="card" @click="$router.push('/dept/org')">
              <div class="card-header">
                <div class="card-icon green">🏢</div>
                <div>
                  <div class="card-title">组织架构与部门信息管理</div>
                  <div class="card-subtitle">P0 | 三维管理差异化</div>
                </div>
              </div>
              <div class="card-content">
                <p><strong>战略价值：</strong>我们将成为市面上少有的支持"行政区划+条线+机构级别"三维管理的产品，相比蓝信、专有钉钉的二维管理更灵活。</p>
                <p class="mt-12"><strong>目标：</strong>实现行业首个支持"行政区划+条线+机构级别"三维管理能力的政务协作产品。</p>
                <ul class="mt-12">
                  <li>支持政务属性部门信息字段</li>
                  <li>部门类型支持行政区划、条线等设置</li>
                  <li>支持部门与机构级别、区划、条线绑定</li>
                  <li>分级分区划管理组织架构管控</li>
                </ul>
              </div>
            </div>
            
            <div class="card" @click="$router.push('/settings/visibility')">
              <div class="card-header">
                <div class="card-icon purple">👁️</div>
                <div>
                  <div class="card-title">可见性统一配置</div>
                  <div class="card-subtitle">P0 | 配置效率提升70%</div>
                </div>
              </div>
              <div class="card-content">
                <p><strong>战略价值：</strong>当前可见性配置入口分散，管理员需重复操作3次。统一配置后，管理员只需配置1次即可完成所有可见性设置。</p>
                <p class="mt-12"><strong>目标：</strong>实现行业最简洁的可见性配置体验（3步→1步），支持政务复杂权限场景的"开箱即用"。</p>
                <ul class="mt-12">
                  <li>可见性各项功能配置合并</li>
                  <li>支持封装高级特殊规则</li>
                </ul>
              </div>
            </div>
            
            <div class="card" @click="$router.push('/person/manage')">
              <div class="card-header">
                <div class="card-icon orange">👤</div>
                <div>
                  <div class="card-title">任职管理</div>
                  <div class="card-subtitle">P0 | 一人多岗场景</div>
                </div>
              </div>
              <div class="card-content">
                <p><strong>战略价值：</strong>政务场景中大量存在"一人多岗"的情况——挂职、借调、兼职非常普遍。支持任职管理后，通讯录将展示主职+兼职标签。</p>
                <p class="mt-12"><strong>目标：</strong>实现行业最完善的任职管理能力（主职+兼职+挂职+借调），达到蓝信同等水平。</p>
                <ul class="mt-12">
                  <li>支持主职、兼职、挂职、借调配置</li>
                  <li>主职单位管理权限的管理员可操作人员信息</li>
                  <li>通讯录展示主职+兼职标签，支持切换查看</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 政务待办 -->
        <div class="tab-content" :class="{ active: activeTab === 'todo' }">
          <div class="cards-grid">
            <div class="card">
              <div class="card-header">
                <div class="card-icon blue">📋</div>
                <div>
                  <div class="card-title">待办自定义字段展示</div>
                  <div class="card-subtitle">P0 | 公文关键信息展示</div>
                </div>
              </div>
              <div class="card-content">
                <p><strong>战略价值：</strong>当前待办卡片样式固化，无法展示公文类型、文号、密级等关键信息，导致领导无法快速判断待办优先级。</p>
              </div>
            </div>
            
            <div class="card">
              <div class="card-header">
                <div class="card-icon green">🔍</div>
                <div>
                  <div class="card-title">待办全文检索</div>
                  <div class="card-subtitle">P0 | 已办数据快速查找</div>
                </div>
              </div>
              <div class="card-content">
                <p><strong>战略价值：</strong>解决已办数据查询慢的问题，用户可以全文检索找已办，免去翻页烦恼。</p>
              </div>
            </div>
            
            <div class="card">
              <div class="card-header">
                <div class="card-icon purple">⚙️</div>
                <div>
                  <div class="card-title">待办后台管理平台</div>
                  <div class="card-subtitle">P0 | 管理员自主运维</div>
                </div>
              </div>
              <div class="card-content">
                <p><strong>战略价值：</strong>提供后台管理平台，管理员可以自主运维，无需工单介入，运维效率提升50%。</p>
              </div>
            </div>
            
            <div class="card">
              <div class="card-header">
                <div class="card-icon orange">🔄</div>
                <div>
                  <div class="card-title">状态同步回调机制</div>
                  <div class="card-subtitle">P2 | 数据一致性保障</div>
                </div>
              </div>
              <div class="card-content">
                <p><strong>战略价值：</strong>Webhook回调机制保障状态同步，数据一致性达标99.9%。</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 工作台样板间 -->
        <div class="tab-content" :class="{ active: activeTab === 'workspace' }">
          <div class="cards-grid">
            <div class="card">
              <div class="card-header">
                <div class="card-icon blue">🖼️</div>
                <div>
                  <div class="card-title">宣传栏改造</div>
                  <div class="card-subtitle">P0 | 自定义比例支持</div>
                </div>
              </div>
              <div class="card-content">
                <p><strong>战略价值：</strong>当前宣传栏只支持固定比例，无法适配政务宣传海报（如青海11:7）。改造后支持多种比例/自定义比例图片。</p>
              </div>
            </div>
            
            <div class="card">
              <div class="card-header">
                <div class="card-icon green">👋</div>
                <div>
                  <div class="card-title">欢迎组件</div>
                  <div class="card-subtitle">P1 | 个性化问候</div>
                </div>
              </div>
              <div class="card-content">
                <p><strong>战略价值：</strong>提升用户第一印象，展示欢迎/问候/日期信息，让工作台更有温度。</p>
              </div>
            </div>
            
            <div class="card">
              <div class="card-header">
                <div class="card-icon purple">📊</div>
                <div>
                  <div class="card-title">数据指标卡</div>
                  <div class="card-subtitle">P1 | 关键数据展示</div>
                </div>
              </div>
              <div class="card-content">
                <p><strong>战略价值：</strong>数值展示（待办数、会议数），让领导一屏掌握关键数据。</p>
              </div>
            </div>
            
            <div class="card">
              <div class="card-header">
                <div class="card-icon orange">📢</div>
                <div>
                  <div class="card-title">轮播公告</div>
                  <div class="card-subtitle">P1 | 重要信息发布</div>
                </div>
              </div>
              <div class="card-content">
                <p><strong>战略价值：</strong>公告轮播展示，确保重要信息触达所有用户。</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 可视化看板 -->
        <div class="tab-content" :class="{ active: activeTab === 'dashboard' }">
          <div class="cards-grid">
            <div class="card">
              <div class="card-header">
                <div class="card-icon blue">📈</div>
                <div>
                  <div class="card-title">31个核心指标体系</div>
                  <div class="card-subtitle">五大维度全覆盖</div>
                </div>
              </div>
              <div class="card-content">
                <p><strong>战略价值：</strong>浙政钉"晾晒台"已成为其核心卖点，我们必须建立自己的指标体系才能在竞争中不落下风。</p>
              </div>
            </div>
            
            <div class="card">
              <div class="card-header">
                <div class="card-icon green">⏰</div>
                <div>
                  <div class="card-title">T+1数据时效</div>
                  <div class="card-subtitle">稳定性与一致性保障</div>
                </div>
              </div>
              <div class="card-content">
                <p><strong>战略价值：</strong>参考赣政通方案，采用T+1数据时效，每日跑批前一日数据，确保大屏展示稳定可靠。</p>
              </div>
            </div>
            
            <div class="card">
              <div class="card-header">
                <div class="card-icon purple">🔍</div>
                <div>
                  <div class="card-title">5个分析维度</div>
                  <div class="card-subtitle">多维数据分析</div>
                </div>
              </div>
              <div class="card-content">
                <p><strong>战略价值：</strong>领导需要从不同维度查看数据——按时间看趋势、按组织机构看整体、按行政区划看分布。</p>
              </div>
            </div>
            
            <div class="card">
              <div class="card-header">
                <div class="card-icon orange">🔧</div>
                <div>
                  <div class="card-title">8个数据开发模块</div>
                  <div class="card-subtitle">标准化数据开发能力</div>
                </div>
              </div>
              <div class="card-content">
                <p><strong>战略价值：</strong>建立标准化的数据开发能力，支持快速对接不同客户的不同数据源，对接效率提升60%。</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('contact')

const switchTab = (tabName) => {
  activeTab.value = tabName
}
</script>

<style scoped>
:root {
    --primary-blue: #4080ff;
    --primary-blue-light: #4096ff;
    --primary-blue-dark: #0958d9;
    --accent-gold: #faad14;
    --accent-red: #ff4d4f;
    --accent-green: #52c41a;
    --accent-purple: #722ed1;
    --bg-primary: #ffffff;
    --bg-secondary: #f5f8ff;
    --bg-card: #ffffff;
    --text-primary: #1d2129;
    --text-secondary: #4e5969;
    --text-muted: #86909c;
    --border-color: #e5e6eb;
    --shadow-sm: 0 2px 8px rgba(0,0,0,0.06);
    --shadow-md: 0 4px 16px rgba(0,0,0,0.08);
    --shadow-lg: 0 8px 24px rgba(0,0,0,0.1);
}

.home-page {
    font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif;
    background: var(--bg-secondary);
    color: var(--text-primary);
    line-height: 1.6;
    margin: -24px;
    min-height: calc(100vh - 64px);
}

/* Hero Section */
.hero {
    background: linear-gradient(135deg, #e6f4ff 0%, #bae0ff 50%, #91caff 100%);
    color: var(--text-primary);
    padding: 60px 20px;
    text-align: center;
    position: relative;
    overflow: hidden;
}

.hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231677ff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.3;
}

.hero-content {
    position: relative;
    z-index: 1;
    max-width: 1200px;
    margin: 0 auto;
}

.hero h1 {
    font-size: 42px;
    font-weight: 700;
    margin-bottom: 16px;
    color: var(--text-primary);
}

.hero-subtitle {
    font-size: 18px;
    color: var(--text-secondary);
    margin-bottom: 40px;
}

.hero-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    max-width: 900px;
    margin: 0 auto;
}

.stat-card {
    background: rgba(255,255,255,0.8);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    padding: 24px 16px;
    border: 1px solid rgba(255,255,255,0.9);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stat-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(22,119,255,0.15);
}

.stat-number {
    font-size: 48px;
    font-weight: 700;
    color: var(--primary-blue);
    display: block;
}

.stat-label {
    font-size: 14px;
    color: var(--text-secondary);
    margin-top: 8px;
}

/* Container */
.container {
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Section */
.section {
    padding: 60px 0;
}

.section-title {
    font-size: 28px;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 12px;
}

.section-title::before {
    content: '';
    width: 4px;
    height: 28px;
    background: linear-gradient(180deg, var(--primary-blue), var(--accent-gold));
    border-radius: 2px;
}

.section-desc {
    color: var(--text-secondary);
    font-size: 16px;
    margin-bottom: 32px;
    padding-left: 16px;
}

/* Cards Grid */
.cards-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
}

.card {
    background: var(--bg-card);
    border-radius: 16px;
    padding: 28px;
    box-shadow: var(--shadow-sm);
    border: 1px solid var(--border-color);
    transition: all 0.3s ease;
    cursor: pointer;
}

.card:hover {
    box-shadow: var(--shadow-lg);
    transform: translateY(-2px);
    border-color: var(--primary-blue-light);
}

.card-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
}

.card-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
}

.card-icon.blue { background: linear-gradient(135deg, #e6f4ff, #bae0ff); }
.card-icon.green { background: linear-gradient(135deg, #f6ffed, #b7eb8f); }
.card-icon.purple { background: linear-gradient(135deg, #f9f0ff, #d3adf7); }
.card-icon.orange { background: linear-gradient(135deg, #fff7e6, #ffd591); }
.card-icon.gold { background: linear-gradient(135deg, #fffbe6, #fff1b8); }
.card-icon.red { background: linear-gradient(135deg, #fff2f0, #ffccc7); }

.card-title {
    font-size: 20px;
    font-weight: 600;
    color: var(--text-primary);
}

.card-subtitle {
    font-size: 13px;
    color: var(--primary-blue);
}

.card-content {
    color: var(--text-secondary);
    font-size: 14px;
    line-height: 1.8;
}

.card-content ul {
    list-style: none;
    padding-left: 0;
}

.card-content li {
    padding: 8px 0;
    padding-left: 20px;
    position: relative;
}

.card-content li::before {
    content: '•';
    position: absolute;
    left: 0;
    color: var(--primary-blue);
    font-weight: bold;
}

/* Tab Navigation */
.tab-nav {
    display: flex;
    gap: 8px;
    margin-bottom: 24px;
    flex-wrap: wrap;
}

.tab-btn {
    padding: 10px 20px;
    border: none;
    background: var(--bg-card);
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    color: var(--text-secondary);
    transition: all 0.2s ease;
    box-shadow: var(--shadow-sm);
}

.tab-btn:hover {
    background: #e6f4ff;
    color: var(--primary-blue);
}

.tab-btn.active {
    background: var(--primary-blue);
    color: white;
}

.tab-content {
    display: none;
}

.tab-content.active {
    display: block;
}

.mt-12 {
    margin-top: 12px;
}
</style>
