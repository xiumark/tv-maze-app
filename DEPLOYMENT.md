# 🚀 Vercel 部署指南

## 方式一：通过 Vercel CLI（推荐 - 最快）

### 1. 安装 Vercel CLI
```bash
npm install -g vercel
```

### 2. 登录 Vercel
```bash
vercel login
```

### 3. 部署项目
```bash
# 开发环境预览
vercel

# 生产环境部署
vercel --prod
```

部署完成后，Vercel 会自动提供一个 URL，例如：
- `https://tv-maze-app.vercel.app`

---

## 方式二：通过 Vercel 网站（最简单）

### 1. 推送代码到 GitHub

```bash
# 初始化 Git（如果还没有）
git init

# 添加所有文件
git add .

# 提交
git commit -m "Ready for Vercel deployment"

# 创建 GitHub 仓库并推送
git remote add origin https://github.com/your-username/tv-maze-app.git
git branch -M main
git push -u origin main
```

### 2. 在 Vercel 导入项目

1. 访问 [vercel.com](https://vercel.com)
2. 点击 **"Add New Project"**
3. 选择 **"Import Git Repository"**
4. 选择您的 GitHub 仓库 `tv-maze-app`
5. 配置项目（通常自动检测，无需修改）：
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. 点击 **"Deploy"**

### 3. 等待部署完成

部署通常需要 1-2 分钟，完成后您会获得：
- 生产环境 URL：`https://tv-maze-app.vercel.app`
- 自动 HTTPS
- 全球 CDN 加速

---

## 自动部署

配置完成后，每次推送到 GitHub 主分支，Vercel 会自动：
- ✅ 拉取最新代码
- ✅ 运行测试
- ✅ 构建项目
- ✅ 部署到生产环境

---

## 自定义域名（可选）

### 1. 在 Vercel 项目设置中
1. 进入项目 Dashboard
2. 点击 **"Settings"** → **"Domains"**
3. 添加您的域名（如 `tv-maze.example.com`）

### 2. 配置 DNS
在您的域名提供商处添加 CNAME 记录：
```
Type: CNAME
Name: tv-maze (或 @)
Value: cname.vercel-dns.com
```

### 3. 等待 DNS 生效
通常需要几分钟到几小时，Vercel 会自动配置 SSL 证书。

---

## 环境变量（如果需要）

如果项目需要环境变量：

1. 在 Vercel Dashboard 中
2. 进入 **"Settings"** → **"Environment Variables"**
3. 添加变量：
   ```
   VITE_API_BASE_URL=https://api.tvmaze.com
   ```
4. 重新部署

---

## 部署状态检查

### 查看部署日志
```bash
vercel logs
```

### 查看所有部署
```bash
vercel ls
```

### 回滚到之前的版本
在 Vercel Dashboard 中可以一键回滚到任何历史版本。

---

## 性能优化

Vercel 自动提供：
- ✅ 全球 CDN
- ✅ 自动 Gzip/Brotli 压缩
- ✅ HTTP/2 支持
- ✅ 自动图片优化
- ✅ 边缘缓存

---

## 监控和分析

Vercel 提供免费的：
- 📊 访问统计
- ⚡ 性能分析
- 🐛 错误追踪
- 📈 Web Vitals 监控

访问项目 Dashboard 查看详细数据。

---

## 常见问题

### Q: 部署失败怎么办？
A: 检查构建日志，通常是依赖问题：
```bash
# 本地测试构建
npm run build

# 清除缓存重试
vercel --force
```

### Q: 路由 404 错误？
A: 确保 `vercel.json` 配置了 SPA 路由重写（已配置）

### Q: 如何删除部署？
```bash
vercel rm tv-maze-app
```

---

## 成本

- ✅ **个人项目**: 完全免费
- ✅ **商业项目**: 免费额度通常足够
- 📊 **付费计划**: $20/月起（大流量时）

---

## 下一步

部署完成后：
1. ✅ 测试所有功能
2. ✅ 配置自定义域名
3. ✅ 设置监控告警
4. ✅ 分享您的应用！