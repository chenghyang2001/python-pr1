"""
猜數字遊戲 — 純邏輯模組（無 GUI）
可獨立以命令列或 print 測試。
"""
import random

# 結果常數，方便 GUI 判斷
RESULT_TOO_LARGE = "too_large"
RESULT_TOO_SMALL = "too_small"
RESULT_CORRECT = "correct"


class GuessGame:
    """猜數字遊戲：1～100 的整數。"""

    def __init__(self, low: int = 1, high: int = 100):
        self.low = low
        self.high = high
        self.answer: int = 0
        self.guess_count: int = 0
        self._new_round()

    def _new_round(self) -> None:
        self.answer = random.randint(self.low, self.high)
        self.guess_count = 0

    def check_guess(self, value: int) -> tuple[str, int]:
        """
        檢查猜測值。
        回傳 (結果, 目前猜測次數)。
        結果為 RESULT_TOO_LARGE | RESULT_TOO_SMALL | RESULT_CORRECT。
        """
        self.guess_count += 1
        if value < self.answer:
            return (RESULT_TOO_SMALL, self.guess_count)
        if value > self.answer:
            return (RESULT_TOO_LARGE, self.guess_count)
        return (RESULT_CORRECT, self.guess_count)

    def restart(self) -> None:
        """重新開始一局（新數字、次數歸零）。"""
        self._new_round()


def main():
    """命令列自測：輸入數字，顯示太大/太小/答對。"""
    game = GuessGame(1, 100)
    print(f"已產生 1～100 的數字，請猜測（輸入 q 結束）。")

    while True:
        raw = input("你的猜測：").strip()
        if raw.lower() == "q":
            break
        try:
            value = int(raw)
        except ValueError:
            print("請輸入整數。")
            continue
        if value < 1 or value > 100:
            print("請輸入 1～100 的整數。")
            continue
        result, count = game.check_guess(value)
        if result == RESULT_TOO_SMALL:
            print("太小了！")
        elif result == RESULT_TOO_LARGE:
            print("太大了！")
        else:
            print(f"答對了！共猜了 {count} 次。")
            break


if __name__ == "__main__":
    main()
