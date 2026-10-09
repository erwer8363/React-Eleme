# React-Eleme 升级计划

> 目标栈：React 19 + TypeScript + SCSS(sass) + Vite + react-router 6 + jotai
> 性质：练手项目。老项目在 Node 24 下已跑不起来（`node-sass@4`），**不降级 Node，不修老环境**，直接重建。
> 约定：代码由本人改，本文档只做路线图和检查清单。

---

## 1. 现状盘点

| 项 | 现状 |
|---|---|
| 规模 | 约 2500 行 JS，无 TS，页面基本是 class 组件 |
| 构建 | 弹出的 CRA 2.x（webpack 4、babel 7.4），`config/` + `scripts/` |
| 样式 | `node-sass@4` + 每个组件一个 `index.scss`，公共样式在 `src/stylesheets/`（`_base/_commons/_mixin/_reset/main`） |
| 路由 | react-router v5：`Switch`、`Route component=`、`withRouter`、`NavLink`、`Redirect`；入口用 `HashRouter` |
| 状态 | redux + redux-thunk + redux-immutable，6 个 store（见第 5 节） |
| 封装 | `modules/group` 的 `GroupState` 包 `connect`，用 `state.getIn([reducer, key])` 取值 |
| 副作用 | `modules/axios-utils/index.js` 往 `Component.prototype` 挂了 `$get`、`$post` |
| UI 库 | antd-mobile 2.x（`NavBar/Icon/Toast/NoticeBar`），`babel-plugin-import` 按需加载 |
| 其他库 | swiper 4、video-react 0.14、axios 0.19、`modules/rem.js`（rem 适配，基准 375） |
| 数据 | `/react-ele/api/*.json` 在 `public/api/`（banners/goods/menu）；`/ele/*` 依赖独立后端 Eleme-API，**目前没有** |

### 已知的 React 19 阻塞点

- `ReactDOM.render`（`src/main.tsx`）→ 已移除，改 `createRoot`
- `componentWillReceiveProps` × 5：`App.js`、`Home/dinner`、`Home/dinnerResList`、`Find/NavBar`、`Mine`
- 字符串 ref：`Find/findList` 里 `<Player ref="player">`
- `defaultProps`：`App`、`AppFooter`、`NavBar`。class 组件还能用，函数组件已移除，改成默认参数
- `Component.prototype.$get/$post`：全局污染，必须去掉
- `home` store 的 `getNavs` 引用了未导入的 `Comment`（老 bug，迁移时顺手修）

---

## 2. 目标栈与版本策略

| 依赖 | 目标 | 说明 |
|---|---|---|
| Node | 保持 24 | 不降级 |
| Vite | 最新稳定版 + `@vitejs/plugin-react` | |
| React / ReactDOM | 19.x | 先 18 后 19，分两步 |
| TypeScript | 5.x，先非严格再逐步 `strict` | 最终 `strict: true` |
| sass | `sass`（Dart Sass） | 替换 `node-sass` |
| react-router | 6.x（`react-router-dom`） | 目标就是 6，不上 7 |
| jotai | 最新 2.x | 替换 redux 全家桶 |
| axios | 1.x | 0.19 太旧 |

版本以安装时 `npm view <pkg> version` 为准，落地后把实际版本回填到本表。

---

## 3. 分阶段计划

每阶段结束都要：`npm run dev` 能起、`npm run build` 能过、对应页面手动过一遍。每阶段一个 commit（或一个分支）。

### 阶段 0：新建骨架

- [ ] 新分支 `feat/vite-react19`
- [ ] 补 `.gitignore`（`node_modules`、`dist`、`.idea`、`.env*`）
- [ ] 用 `npm create vite@latest` 生成 react-ts 模板到临时目录，对照着搬配置
- [ ] 删除：`config/`、`scripts/`、`yarn.lock`、`docs/`（在线手册，旧构建产物，可留可删，先留）
- [ ] 新 `package.json`：只放最小依赖（react、react-dom、react-router-dom、jotai、axios、sass、swiper、antd-mobile、vite 系列）
- [ ] `public/index.html` → 根目录 `index.html`，加 `<script type="module" src="/src/main.tsx">`
- [ ] `src/main.tsx` → `src/main.tsx`（`createRoot`）

验收：空白页能起，控制台无报错。

### 阶段 1：搬代码 + Vite + sass

- [ ] `src/` 整体搬入，先不改逻辑
- [ ] 含 JSX 的 `.js` 一律改名 `.jsx`（Vite 要求），阶段 2 再统一到 `.tsx`
- [ ] 路径别名 `@/` → `src/`（`vite.config.ts` + `tsconfig`）
- [ ] 删除 `babel-plugin-import` 相关配置，antd-mobile 先按全量/ESM 引入
- [ ] SCSS：检查 `@import` 弃用警告、`/` 除法（改 `math.div`），`_mixin.scss` 重点看
- [ ] 静态资源：`public/font-awesome-4.7.0` 的引用路径、`swiper/dist/css/swiper.min.css` 的 import
- [ ] `src/modules/rem.js`：保留，注意 `window.onresize` 直接覆盖，后面改 `addEventListener`
- [ ] dev 代理：`vite.config.ts` 的 `server.proxy` 把 `/ele` 指向 mock（见第 6 节）

验收：React 仍是 16/18 兼容写法下，页面能渲染（允许先注释掉 video-react / 个别报错页）。

### 阶段 2：TypeScript 脚手架

- [ ] `tsconfig.json`：`allowJs: true`、`checkJs: false`、`strict: false`、`jsx: react-jsx`
- [ ] ESLint 9 flat config + `typescript-eslint` + `eslint-plugin-react-hooks`
- [ ] 为 axios 返回、store state 先写 `types/` 目录下的接口类型（`Restaurant`、`Good`、`Banner`、`Nav` 等）
- [ ] 按目录逐个 `.jsx` → `.tsx`，顺序：`modules` → `commons` → `pages`（叶子组件先）
- [ ] 每个组件补 Props `interface`，避免 `any`
- [ ] 全部转完后开 `strict`

验收：`npm run typecheck` 通过。

### 阶段 3：React 19

建议先升 18.3 看控制台 warning，再升 19。

- [ ] `createRoot`（阶段 0 已做）
- [ ] 5 处 `componentWillReceiveProps` 重写（逻辑见第 4 节）
- [ ] 字符串 ref → `createRef` / `useRef`
- [ ] `defaultProps` → 默认参数
- [ ] 去掉 `Component.prototype.$get/$post`，改成直接 import `Get/Post`
- [ ] 评估 class → 函数组件 + hooks。**不要求一次全转**，但碰到的就转
- [ ] 检查第三方库兼容：antd-mobile、video-react、swiper（见第 7 节）

验收：控制台无 deprecation warning，严格模式下无重复请求副作用问题。

### 阶段 4：react-router 6

- [ ] `Switch` → `Routes`；`component={X}` → `element={<X />}`；去掉 `exact`
- [ ] `Redirect` → `<Navigate replace />`
- [ ] `withRouter` → `useNavigate/useLocation/useParams`（涉及约 10 个文件，`grep withRouter` 即可）
- [ ] `NavLink`：`activeClassName` → `className={({isActive}) => ...}`；`exact` → `end`
- [ ] `App` 中靠 `componentWillReceiveProps` 做的重定向（`/` → `/home`，`/find` → `/find/coin`）改成路由表里的 `<Route index element={<Navigate .../>} />`
- [ ] 路由表集中到 `src/router.tsx`，替代 `App.defaultProps.navs`
- [ ] 嵌套路由用 `<Outlet />`（Find、Home/HomeDetail 都有子路由）
- [ ] 注意路径大小写：`/Find` 与 `/find` 并存，统一成小写
- [ ] 决定 `HashRouter` 去留（见第 7 节）

验收：所有一级/二级路由可达，浏览器前进后退正常，带参路由 `/findlist/:id` 正常。

### 阶段 5：redux → jotai

策略：**逐个 store 迁移**，迁完一个删一个，不要两套并存太久。

- [ ] `npm i jotai`，根节点按需加 `<Provider>`（不加用默认 store 也行）
- [ ] 新建 `src/atoms/<domain>.ts`，每个域一个文件
- [ ] 异步请求：两种写法任选并统一
  - 写 atom（`atom(null, async (get, set) => {...})`）+ 组件里 `useSetAtom`
  - 或 `atomWithQuery`（需要 `jotai-tanstack-query`，练手更重，可选）
- [ ] 分页类（`specials`、`dinnerRes`）用 `atom` 存列表 + 一个 write atom 追加
- [ ] 滚动类布尔值（`scrollFlag`、`backTop`、`scrollBackTop`）本质是 UI 局部状态，**优先改成组件内 `useState` + 自定义 hook**（`useScrollTop`），不要硬塞全局
- [ ] 删除：`GroupState`、`modules/group/`、`redux`、`react-redux`、`redux-thunk`、`redux-immutable`、`immutable`
- [ ] 回调风格 `callback && callback()` 全部改成 `await`/`then`

迁移顺序：`mine`（最简单，纯本地 mock 登录）→ `order` → `commons` → `find` → `dinner` → `home`

### 阶段 6：UI 库与周边

- [ ] antd-mobile：2.x → 5.x（`NavBar`、`Toast`、`NoticeBar` 的 API 都变了，`Icon` 已移除，改用 `antd-mobile-icons` 或 font-awesome）
- [ ] swiper 4 → 11（用 `swiper/react` 的 `<Swiper><SwiperSlide>`）
- [ ] video-react：确认 19 下是否可用，不行换 `react-player` 或原生 `<video>`
- [ ] axios 0.19 → 1.x：`qs.stringify` 保留；`Get/Post` 封装改成带类型的泛型函数

### 阶段 7：收尾

- [ ] 删除所有无用依赖、`console.log`、注释掉的旧代码
- [ ] README 更新技术栈与运行方式
- [ ] `npm run build` 产物体积对比（升级前后）
- [ ] 全页面回归一遍（见第 8 节）
- [ ] 合并到 `master`

---

## 4. `componentWillReceiveProps` 重写清单

| 文件 | 原意 | 新写法 |
|---|---|---|
| `App.js` | 路径是 `/` 或 `/find` 时重定向 | 路由表 `Navigate`，不再监听 props |
| `Find/NavBar` | 路由变化时同步选中项 | 用 `useLocation` 派生，不存 state |
| `Mine/index` | 登录态变化时跳转 | `useEffect` 依赖 `userInfo` |
| `Home/dinner` | props 变化时处理 | 先读代码确认意图，多半是 `useEffect` |
| `Home/dinnerResList` | 同上 | 同上 |

迁移时先读清楚每处**到底想响应哪个 prop 的变化**，再决定是 `useEffect`、派生值还是路由层处理。

---

## 5. Store → Atom 映射

| store | 字段 | 异步 / 动作 | atom 方案 |
|---|---|---|---|
| `commons` | `cities`, `scrollFlag` | `getCities` 拉 `/ele/index/cities` | `citiesAtom` + 加载 atom；`scrollFlag` 改 hook |
| `dinner` | `navs`, `dinnerRes`, `ResPageAdd`, `hasMore`, `scrollBackTop` | 拉导航、拉列表、加载更多 | `dinnerNavsAtom`、`dinnerListAtom`、`dinnerPageAtom`、`dinnerHasMoreAtom`；加载更多为 write atom |
| `find` | `navs`, `activeItem`, `specials`, `specialPage`, `hasMore`, `goodDetail`, `banners` | 拉列表/详情/加载更多/banner | `activeItem` 可由路由派生；其余同上 |
| `home` | `HomeNavs`, `HomeDetailBanner`, `SaleDetail`, `btnBanners`, `restaurants`, `backTop` | 5 个拉取 | 每个字段一个 atom；`HomeNavs` 是常量，直接写常量，不进 atom |
| `mine` | `userInfo` | `loginByText`、`loginByUser`、`exit`（`setTimeout` 模拟） | `userInfoAtom`（可 `atomWithStorage` 持久化）+ login write atom 返回 Promise |
| `order` | `foods` | `getFoodsInfo` 拉 `/ele/order/order` | `foodsAtom` + 加载 atom |

通用规则：

- 接口层统一放 `src/api/`，atom 只管状态和调用，不写 URL 字符串
- `res.data.data.object_list` 这种深层取值放在 api 层解包，组件拿到的是干净数据
- 初始值 `null` 的字段，类型写成 `T | null`，组件内处理 loading

---

## 6. 数据与 mock 方案

老后端 Eleme-API（express + MongoDB）不在本仓库，且没人维护。三选一，建议 **B**：

- **A. 起老后端**：成本高，依赖 MongoDB，不推荐
- **B. MSW**（Mock Service Worker）：在 `src/mocks/handlers.ts` 里为 `/ele/*` 写假数据，浏览器端拦截。字段结构按现有取值路径（`res.data.data.object_list`）造，类型文件同时给 atom 用
- **C. Vite `server.proxy` + 本地 json**：简单，但分页接口（`page/limit/total`）要自己模拟

需要 mock 的接口：

```
/ele/index/cities     /ele/index/banners   /ele/index/home    /ele/index/recom
/ele/dinner/bar       /ele/dinner/reslist  /ele/order/order   /ele/menu
```

`/react-ele/api/{goods,banners,menu}.json` 已在 `public/api/`，直接可用（注意 `goods.json` 的分页参数目前是前端假装的）。

---

## 7. 决策点（动手前定）

| 决策 | 选项 | 建议 |
|---|---|---|
| antd-mobile | 升 5.x / 去掉改手写 | 升 5.x，练手价值高 |
| video-react | 保留 / 换 `react-player` / 原生 | 先试保留，不行换原生 |
| 路由模式 | `HashRouter` / `BrowserRouter` | 练手无所谓，保留 Hash 零成本；要部署再换 |
| TS 严格度 | 一开始就 strict / 渐进 | 渐进，阶段 2 末尾开 strict |
| class → hooks | 全转 / 碰到才转 | 阶段 3 起碰到就转，阶段 7 前扫尾 |
| 数据请求 | atom 手写 / `jotai-tanstack-query` | 先手写，熟悉后再考虑 |

---

## 8. 回归清单

手动过一遍（每阶段至少过受影响的页）：

- [ ] 首页：定位/城市列表 `/cities`、banner、商家列表、滚动回顶
- [ ] 首页详情 `/homedetail`：点餐/评价/商家三个 tab、`SaleDetail`
- [ ] 点餐 `/eleme/all`、`/eleme/rice`、`dinner` 列表加载更多
- [ ] 订单 `/order`
- [ ] 发现 `/find` → `/find/coin`、tab 切换、`/findlist/:id`（含 video）、加载更多
- [ ] 我的 `/mine`：手机号登录（`110` / `456`）、账号登录（`123` / `456`）、退出
- [ ] 底部 `AppFooter` 在 `findlist`、`homedetail`、`cities` 页隐藏，其他页显示
- [ ] 不同屏宽下 rem 适配正常
- [ ] `npm run build` 无 error / warning，产物能 `vite preview`

---

## 9. 风险

| 风险 | 影响 | 对策 |
|---|---|---|
| antd-mobile 2→5 API 全变 | 页面样式/交互大面积改动 | 阶段 6 单独做，其他阶段前先用 2.x 兼容层顶着 |
| video-react 不兼容 19 | `findlist` 页白屏 | 提前验证，不行换 |
| 后端缺失 | 部分页面空白 | MSW 先行（第 6 节） |
| class 内隐式依赖 `this.$get` | 去掉后运行时报错 | 阶段 3 一次性 grep `\$get\|\$post` 清掉 |
| redux 与 jotai 并存期的状态不一致 | 页面数据错乱 | 一个 store 一次迁完，不跨页面混用 |
| SCSS 在 Dart Sass 下行为变化 | 样式细节差异 | 阶段 1 对照截图 |

---

## 10. 工期估算（业余时间）

| 阶段 | 估时 |
|---|---|
| 0 骨架 | 0.5 天 |
| 1 搬代码 + Vite + sass | 1 天 |
| 2 TS 迁移 | 2 天 |
| 3 React 19 | 1–2 天 |
| 4 router 6 | 1 天 |
| 5 jotai | 2 天 |
| 6 UI 库 | 2–3 天 |
| 7 收尾 | 0.5 天 |
| 合计 | 约 10–12 天 |
