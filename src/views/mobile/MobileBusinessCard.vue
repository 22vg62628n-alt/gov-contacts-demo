<template>
  <div class="mobile-demo-page">
    <div class="page-header">
      <h2 class="page-title">移动客户端效果展示</h2>
      <p class="page-desc">个人名片页（按参考图样式）</p>
    </div>

    <div class="compare-wrap">
      <div class="compare-col">
        <h3 class="status-title">现状</h3>
        <div class="phone-view">
          <div class="hero-cover">
            <div class="hero-word">小龙</div>
            <div class="hero-userline">
              <span class="user-name">吴小龙</span>
              <span class="user-icons">👤 ⊖</span>
            </div>
          </div>

          <div class="info-panel">
            <div class="row">
              <span class="label">部门</span>
              <span class="value blue">西宁市/西宁市数据局/数据科</span>
            </div>
            <div class="row">
              <span class="label">职务</span>
              <span class="value">科长</span>
            </div>
            <div class="row">
              <span class="label">职级</span>
              <span class="value">一级主任科员</span>
            </div>
            <div class="row">
              <span class="label">电话</span>
              <span class="value">0971-8228706</span>
            </div>
            <div class="row">
              <span class="label">手机</span>
              <span class="value">点击查看</span>
            </div>
            <div class="row">
              <span class="label">备注名</span>
              <span class="value muted">设置对方的备注名</span>
              <el-icon class="edit-icon"><EditPen /></el-icon>
            </div>
          </div>

          <div class="bottom-actions">
            <el-button class="icon-btn">
              <el-icon><Calendar /></el-icon>
            </el-button>
            <el-button class="call-btn">通话</el-button>
            <el-button type="primary" class="msg-btn">发消息</el-button>
          </div>
        </div>
      </div>

      <div class="compare-col">
        <h3 class="status-title">预期目标</h3>
        <div class="phone-view target">
          <div class="target-topbar">
            <span class="top-time">03:55</span>
            <span class="top-right">4G · 65%</span>
          </div>
          <div class="target-nav">
            <span class="nav-left">&lt; 返回</span>
            <span class="nav-more">···</span>
          </div>

          <div class="profile-block">
            <div class="profile-avatar"></div>
            <div class="profile-main">
              <div class="profile-name">丁文杰 <span class="tiny-icon">👤</span></div>
              <div class="profile-dept">富阳区-政府机构-富阳区数据资源管理局 <span class="badge">主职</span></div>
              <div class="profile-state">＋ 添加状态</div>
            </div>
          </div>

          <div class="group-card">
            <div class="group-title">基础信息</div>
            <div class="target-row"><span class="k">姓名</span><span class="v">丁文杰</span></div>
            <div class="target-row"><span class="k">手机号</span><span class="v">+86-137*****877 <span class="link">显示</span></span></div>
          </div>

          <div class="group-card">
            <div class="group-title">任职信息</div>
            <div class="target-row"><span class="k">单位</span><span class="v">富阳区-政府机构-富阳区数据资源管理局</span><span class="arrow">&gt;</span></div>
            <div class="target-row"><span class="k">部门</span><span class="v">局领导</span><span class="arrow">&gt;</span></div>
            <div class="target-row"><span class="k">职务</span><span class="v">党组成员、副局长</span></div>
            <div class="target-row"><span class="k">办公电话</span><span class="v">0571-89523389</span></div>
          </div>

          <div class="group-card">
            <div class="target-row clickable"><span class="k">🏢 其他3个组织信息</span><span class="arrow">&gt;</span></div>
          </div>

          <div class="bottom-actions target-bottom-actions">
            <el-button class="icon-btn">
              <el-icon><Calendar /></el-icon>
            </el-button>
            <el-button type="primary" class="msg-btn">发消息</el-button>
            <el-button class="call-btn">通话</el-button>
          </div>
        </div>
      </div>

      <div class="compare-col">
        <h3 class="status-title">建议实现</h3>
        <div class="phone-view suggest">
          <div class="suggest-top-card">
            <div class="suggest-user">
              <div class="suggest-avatar"></div>
              <div class="suggest-user-main">
                <div class="suggest-user-name">郝伟涛 <span class="tiny-icon">👤</span> <span class="tiny-icon">📱</span></div>
              </div>
            </div>
            <div class="suggest-user-status">✈ 出差中</div>
          </div>

          <div class="suggest-main-card">
            <div class="info-panel suggest-info-panel">
              <div class="row">
                <span class="label">部门</span>
                <span class="value blue">西宁市/西宁市数据局/数据科 <span class="inline-tag">主职</span></span>
              </div>
              <div class="row">
                <span class="label">职务</span>
                <span class="value">科长</span>
              </div>
              <div class="row">
                <span class="label">职级</span>
                <span class="value">一级主任科员</span>
              </div>
              <div class="row">
                <span class="label">电话</span>
                <span class="value">0971-8228706</span>
              </div>
              <div class="row">
                <span class="label">手机</span>
                <span class="value">点击查看</span>
              </div>
              <div class="row">
                <span class="label">备注名</span>
                <span class="value muted">设置对方的备注名</span>
                <el-icon class="edit-icon"><EditPen /></el-icon>
              </div>
            </div>
          </div>

          <div class="more-appointment-link">其他3个任职组织信息</div>

          <div class="bottom-actions target-bottom-actions">
            <el-button class="icon-btn">
              <el-icon><Calendar /></el-icon>
            </el-button>
            <el-button type="primary" class="msg-btn">发消息</el-button>
            <el-button class="call-btn">通话</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Calendar, EditPen } from '@element-plus/icons-vue'
</script>

<style scoped>
.mobile-demo-page { padding: 24px; }
.page-header { margin-bottom: 20px; }
.page-title { margin: 0; font-size: 20px; font-weight: 600; }
.page-desc { margin: 8px 0 0; color: #86909c; }
.status-title { margin: 0 0 12px; font-size: 16px; font-weight: 600; color: #1d2129; }
.compare-wrap { display: flex; gap: 20px; align-items: flex-start; flex-wrap: wrap; }
.compare-col { width: 420px; }

.phone-view {
  width: 420px;
  min-height: 780px;
  margin: 0 auto;
  background: #fff;
  border: 1px solid #e5e6eb;
}

.hero-cover {
  height: 240px;
  background: linear-gradient(180deg, #3f8b63 0%, #0f3f2f 100%);
  padding: 16px 16px 10px;
  position: relative;
}
.hero-word {
  color: rgba(255, 255, 255, 0.85);
  font-size: 84px;
  line-height: 1;
  font-weight: 300;
  letter-spacing: 4px;
}
.hero-userline {
  position: absolute;
  left: 16px;
  bottom: 12px;
  color: #fff;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.user-name { font-size: 16px; font-weight: 600; }
.user-icons { font-size: 14px; }

.info-panel { padding: 10px 20px 4px; }
.row {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 48px;
}
.label {
  width: 96px;
  color: #4e5969;
  font-size: 14px;
}
.value {
  flex: 1;
  color: #1d2129;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.35;
}
.value.blue { color: #738fcc; font-size: 15px; }
.value.muted { color: #9ea7b3; font-weight: 500; font-size: 14px; }
.edit-icon {
  color: #7f8792;
  font-size: 15px;
}
.inline-tag {
  display: inline-block;
  margin-left: 6px;
  padding: 1px 6px;
  border-radius: 999px;
  background: #e8f3ff;
  color: #165dff;
  font-size: 12px;
  font-weight: 500;
  vertical-align: middle;
}

.bottom-actions {
  padding: 10px 20px 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.icon-btn {
  width: 40px;
  height: 40px;
  padding: 0;
  border-radius: 8px;
}
.call-btn {
  flex: 1;
  height: 40px;
  border-radius: 8px;
  font-size: 15px;
}
.msg-btn {
  flex: 1;
  height: 40px;
  border-radius: 8px;
  font-size: 15px;
}

.phone-view.target { background: #f7f7f8; }
.target-topbar {
  height: 26px;
  padding: 4px 12px 0;
  display: flex;
  justify-content: space-between;
  color: #1f2937;
  font-size: 12px;
}
.target-nav {
  height: 40px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav-left { font-size: 16px; color: #111827; }
.nav-more { font-size: 20px; line-height: 1; color: #111827; }

.profile-block {
  display: flex;
  gap: 12px;
  background: #fff;
  padding: 10px 12px 12px;
  border-bottom: 1px solid #ececec;
}
.profile-avatar {
  width: 82px;
  height: 82px;
  border-radius: 10px;
  background: linear-gradient(145deg, #3164ff 0%, #0b47db 100%);
}
.profile-main { flex: 1; }
.profile-name { font-size: 36px; font-weight: 600; color: #111827; }
.tiny-icon { font-size: 15px; }
.profile-dept { margin-top: 8px; font-size: 14px; color: #1f2937; line-height: 1.4; }
.badge { margin-left: 6px; font-size: 12px; color: #a16207; }
.profile-state { margin-top: 10px; color: #6b7280; font-size: 14px; }

.group-card { background: #fff; margin-top: 10px; border-top: 1px solid #ececec; border-bottom: 1px solid #ececec; }
.group-title { padding: 12px; font-size: 16px; font-weight: 700; color: #111827; border-bottom: 1px solid #f0f0f0; }
.target-row { min-height: 46px; display: flex; align-items: center; gap: 10px; padding: 0 12px; border-bottom: 1px solid #f5f5f5; }
.target-row:last-child { border-bottom: none; }
.target-row .k { width: 110px; font-size: 14px; color: #111827; }
.target-row .v { flex: 1; font-size: 14px; color: #4b5563; line-height: 1.35; }
.target-row .arrow { color: #9ca3af; font-size: 14px; }
.target-row .link { color: #2563eb; }
.target-row.clickable .k { width: auto; font-weight: 600; }

.target-bottom-actions { margin-top: 12px; }

.phone-view.suggest { background: #ffffff; }
.suggest-top-card {
  margin: 0;
  min-height: 170px;
  padding: 30px 18px 16px;
  border-radius: 14px 14px 0 0;
  background: linear-gradient(150deg, #f1f5ff 0%, #eef3fb 55%, #e9f0fb 100%);
  border-bottom: 1px solid #e6ebf2;
}
.suggest-user { display: flex; align-items: center; gap: 12px; }
.suggest-avatar {
  width: 72px;
  height: 72px;
  border-radius: 12px;
  background: linear-gradient(145deg, #7cb3ff 0%, #2d6bff 100%);
  flex: 0 0 auto;
}
.suggest-user-main { min-width: 0; }
.suggest-user-name {
  font-size: 20px;
  line-height: 1.2;
  color: #1d2129;
  font-weight: 700;
}
.suggest-user-status {
  margin-top: 16px;
  font-size: 16px;
  color: #4e5969;
}
.suggest-main-card {
  margin: -8px 0 0;
  background: #fff;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
}
.suggest-info-panel { padding-top: 14px; padding-bottom: 6px; }
.suggest-info-panel .row { min-height: 54px; }
.more-appointment-link {
  margin: 6px 20px 0;
  font-size: 14px;
  color: #165dff;
  cursor: pointer;
}
</style>
