"""
主選單 — 進入後可選擇要執行的遊戲
"""
import tkinter as tk
from tkinter import ttk

import game


def main():
    root = tk.Tk()
    root.title("遊戲選單")
    root.geometry("320x200")
    root.resizable(True, True)

    frame = ttk.Frame(root, padding=24)
    frame.pack(fill=tk.BOTH, expand=True)

    ttk.Label(frame, text="選擇遊戲", font=("Segoe UI", 12)).pack(pady=(0, 16))

    def open_guess_game():
        top = tk.Toplevel(root)
        top.transient(root)
        game.run(top)

    def placeholder():
        pass

    btn1 = ttk.Button(frame, text="猜數字", command=open_guess_game)
    btn1.pack(pady=6, fill=tk.X)

    btn2 = ttk.Button(frame, text="遊戲 2（待定）", command=placeholder)
    btn2.pack(pady=6, fill=tk.X)

    btn3 = ttk.Button(frame, text="遊戲 3（待定）", command=placeholder)
    btn3.pack(pady=6, fill=tk.X)

    root.mainloop()


if __name__ == "__main__":
    main()
