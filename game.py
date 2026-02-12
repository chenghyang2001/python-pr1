"""
猜數字遊戲 — GUI 主程式
"""
import tkinter as tk
from tkinter import ttk

from game_logic import GuessGame, RESULT_CORRECT, RESULT_TOO_LARGE, RESULT_TOO_SMALL


def run(parent: tk.Tk | tk.Toplevel) -> None:
    """在給定的 parent 視窗中建立猜數字遊戲 UI，不呼叫 mainloop。"""
    parent.title("猜數字遊戲")
    parent.geometry("400x240")
    parent.resizable(True, True)

    # 遊戲邏輯（視窗開啟時產生新答案）
    game = GuessGame(1, 100)

    # 各區塊文字顏色樣式
    style = ttk.Style()
    style.configure("Intro.TLabel", foreground="#1a5276")   # 深藍：說明
    style.configure("Hint.TLabel", foreground="#555555")   # 深灰：提示
    style.configure("Count.TLabel", foreground="#1e8449")   # 綠：猜測次數
    style.configure("Secret.TLabel", foreground="red")      # 紅：答案
    style.configure("Accent.TButton", foreground="#1a5276")

    # 說明文字（深藍）
    label_intro = ttk.Label(parent, text="請輸入 1–100 的整數：", font=("Segoe UI", 11), style="Intro.TLabel")
    label_intro.pack(pady=(16, 8))

    # 輸入框
    frame_input = ttk.Frame(parent)
    frame_input.pack(pady=4)
    entry_guess = ttk.Entry(frame_input, width=12, font=("Segoe UI", 12))
    entry_guess.pack(side=tk.LEFT, padx=4)

    # 「猜」按鈕（深藍文字）
    btn_guess = ttk.Button(frame_input, text="猜", style="Accent.TButton")
    btn_guess.pack(side=tk.LEFT, padx=4)

    # 「再玩一次」按鈕（答對後顯示，先不 pack）
    btn_restart = ttk.Button(frame_input, text="再玩一次", style="Accent.TButton")

    # 提示標籤（深灰）
    label_hint = ttk.Label(parent, text="輸入數字後按「猜」", font=("Segoe UI", 10), style="Hint.TLabel")
    label_hint.pack(pady=12)

    # 猜測次數標籤（綠）
    label_count = ttk.Label(parent, text="猜測次數：0", font=("Segoe UI", 9), style="Count.TLabel")
    label_count.pack(pady=4)

    # 顯示本局答案（秘密數字），紅色文字
    label_secret = ttk.Label(parent, text=f"答案：{game.answer}", font=("Segoe UI", 9), style="Secret.TLabel")
    label_secret.pack(pady=4)

    def update_count_display():
        label_count.config(text=f"猜測次數：{game.guess_count}")

    def on_guess():
        raw = entry_guess.get().strip()
        if not raw:
            label_hint.config(text="請輸入數字。")
            return
        try:
            value = int(raw)
        except ValueError:
            label_hint.config(text="請輸入有效的整數。")
            return
        if value < 1 or value > 100:
            label_hint.config(text="請輸入 1～100 的整數。")
            return
        result, count = game.check_guess(value)
        update_count_display()
        if result == RESULT_TOO_SMALL:
            label_hint.config(text="太小了！")
        elif result == RESULT_TOO_LARGE:
            label_hint.config(text="太大了！")
        else:
            label_hint.config(text=f"答對了！共猜了 {count} 次。")
            btn_guess.pack_forget()
            btn_restart.pack(side=tk.LEFT, padx=4)

    def on_restart():
        game.restart()
        entry_guess.delete(0, tk.END)
        label_hint.config(text="輸入數字後按「猜」")
        label_count.config(text="猜測次數：0")
        label_secret.config(text=f"答案：{game.answer}")
        btn_restart.pack_forget()
        btn_guess.pack(side=tk.LEFT, padx=4)
        entry_guess.focus_set()

    btn_guess.config(command=on_guess)
    btn_restart.config(command=on_restart)
    entry_guess.focus_set()


def main():
    root = tk.Tk()
    run(root)
    root.mainloop()


if __name__ == "__main__":
    main()
