# ClassTrack - Fitness Memo App

ClassTrack 是一個健身備忘錄應用程式，幫助用戶記錄健身房或健身中心的團體課程，不再錯過任何課程。應用提供了用戶與管理者的登入功能，並包含一個備忘錄（To-Do List）功能頁面，用於管理和追蹤課程紀錄。它的設計採用響應式布局，適應各種裝置，包括桌面和行動設備。

## 功能特點

- **用戶管理：** 用戶可註冊並登入應用，並可以快速管理課程備忘錄。
- **備忘錄功能：** 使用者可新增、刪除以及查看預定的健身團課。
- **地圖功能：** 用戶可以瀏覽健身中心的地理位置。
- **管理者功能：** 管理者帳號擁有進一步的功能權限，包括團課管理。
- **響應式設計：** 應用在桌面和手機版本上都有優化的顯示，提供一致的使用體驗。
- **一鍵登錄：** 支持管理者一鍵快速登錄。

## 頁面結構

1. **首頁：** 應用介紹、標題、登錄按鈕、註冊引導按鈕。
2. **備忘錄頁面 (ToDoList)：** 記錄用戶的課程備忘，管理團課資訊。
3. **地圖頁面：** 查看健身中心地點和位置。
4. **登入頁面：** 用戶可以通過此頁面登入，已登入用戶會顯示登出按鈕。
5. **註冊頁面：** 新用戶可以進行註冊，並登入應用程式。

## 安裝與啟動

### 1. Clone 專案

```bash
git clone <https://github.com/yourusername/classtrack.git>
cd classtrack

```

### 2. 安裝相依套件

確保您已經安裝 [Node.js](https://nodejs.org/)，然後運行以下命令：

```bash
npm install

```

### 3. 啟動應用

運行應用程式：

```bash
npm start

```

應用程式會在 [http://localhost:3000](http://localhost:3000/) 開啟。

### 4. 編譯建構 (可選)

要編譯為生產環境的版本：

```bash
npm run build

```

這將創建一個壓縮的、適合部署的 `build` 資料夾。

## 主要技術堆疊

- **React.js:** 應用的主要前端框架。
- **React Router:** 用於頁面間的導航。
- **Material UI (MUI):** 用於應用程式的 UI 元件庫，提供視覺一致性和響應式設計。
- **Context API:** 用於管理應用中的用戶狀態和認證信息。

## 檔案結構

```bash
src/
├── components/
│   ├── Header.js         # 應用的導航列
│   ├── Sidebar.js        # 側邊欄（如果有）
├── context/
│   └── AuthContext.js    # 管理用戶認證狀態
├── pages/
│   ├── Home.js           # 首頁
│   ├── ToDoList.js       # 備忘錄頁面
│   ├── MapPage.js        # 地圖頁面
│   ├── LoginPage.js      # 登錄頁面
│   ├── RegisterPage.js   # 註冊頁面
├── App.js                # 應用的主要路由
└── index.js              # 應用的入口

```

## 認證機制

應用使用 `AuthContext` 提供者來處理用戶的登入狀態。當用戶登入時，其資訊會儲存在 `localStorage`，使得用戶刷新頁面後仍然保持登入狀態。

```
const login = (username) => {
  setUser(username);
  localStorage.setItem("user", username);
};

```

登出則會清除 `localStorage` 中的用戶資訊，並將用戶狀態設為 `null`。

```
const logout = () => {
  setUser(null);
  localStorage.removeItem("user");
};

```

## 改進與優化

- **未來功能**：增加課程提醒功能，讓用戶在課程開始前收到提醒通知。
- **UI 優化**：更進一步美化行動裝置版的 UI，提供更直覺的操作體驗。
- **後端支援**：未來可以整合後端 API 來支持課程的同步與管理。

## 貢獻指南

歡迎任何形式的貢獻。如果您有任何問題或建議，請提交 [Issue](https://github.com/yourusername/classtrack/issues) 或發送 Pull Request。

1. Fork 本專案
2. 建立您的分支 (`git checkout -b feature/my-feature`)
3. Commit 您的變更 (`git commit -am 'Add some feature'`)
4. Push 到您的分支 (`git push origin feature/my-feature`)
5. 提交 Pull Request

## License

這個專案使用 [MIT License](https://www.notion.so/LICENSE)。