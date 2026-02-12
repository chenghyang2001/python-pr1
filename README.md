# python-pr1 — 猜數字遊戲

使用 Python 與 tkinter 的 Windows GUI 猜數字遊戲：程式隨機產生 1～100 的數字，玩家輸入猜測，會顯示「太大」、「太小」或「答對了」。

## 遊戲玩法

1. 執行遊戲後，程式會隨機產生一個 1～100 的整數。
2. 在輸入框輸入你的猜測數字，按「猜」。
3. 根據提示「太大了」或「太小了」調整猜測，直到「答對了」。
4. 答對後會顯示共猜了幾次，按「再玩一次」可重新開始。

## 執行環境

- Python 3（需含 tkinter，Windows 內建 Python 通常已包含）
- 建議使用虛擬環境

## 啟動虛擬環境（Windows）

在專案根目錄開啟終端機後執行：

```powershell
venv\Scripts\activate
```

## 執行遊戲

**建議**：從主選單進入，可選擇要玩的遊戲。

啟動虛擬環境後執行：

```powershell
python main.py
```

會開啟「遊戲選單」視窗，內有 3 個按鈕：按「猜數字」可開啟猜數字遊戲；其餘兩個按鈕目前為預留。

亦可直接只玩猜數字（不經主選單）：

```powershell
python game.py
```

或直接雙擊 `main.py` / `game.py`。在 Windows 上從終端機或檔案總管執行皆可。

若只想測試猜數字邏輯（命令列），可執行：`python game_logic.py`（輸入 `q` 結束）。

## 專案結構

```
python-pr1/
├── README.md       # 本說明
├── main.py         # 主選單（3 個遊戲按鈕入口）
├── game.py         # 猜數字遊戲 GUI（可由 main 或單獨執行）
├── game_logic.py   # 猜數字核心邏輯（可獨立測試）
└── venv/           # 虛擬環境（勿提交至版控可加 .gitignore）
```
