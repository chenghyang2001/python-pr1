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

啟動虛擬環境後執行：

```powershell
python game.py
```

或直接雙擊 `game.py`，或在未啟用虛擬環境時以 `python game.py` 執行（使用系統 Python）。在 Windows 上從檔案總管雙擊 `game.py` 或從終端機執行皆可正常開啟視窗。

若只想測試猜數字邏輯（命令列），可執行：`python game_logic.py`（輸入 `q` 結束）。

## 專案結構

```
python-pr1/
├── README.md       # 本說明
├── game.py         # 遊戲主程式（GUI + 邏輯）
├── game_logic.py   # 猜數字核心邏輯（可獨立測試）
└── venv/           # 虛擬環境（勿提交至版控可加 .gitignore）
```
