
/* ========== useTerminalHistory Hook ========== */
import { useState } from "react";

/**
 * Custom hook to manage command history and navigation index.
 */
export default function useTerminalHistory() {
    // ========== State ========== //
    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(0);

    // ========== History Navigation ========== //
    const goPrev = () => {
        setHistoryIndex((i) => Math.max(0, i - 1));
        return history[historyIndex - 1] || "";
    };

    const goNext = () => {
        setHistoryIndex((i) => Math.min(history.length, i + 1));
        return history[historyIndex + 1] || "";
    };

    // ========== Return API ========== //
    return {
        history,
        setHistory,
        historyIndex,
        setHistoryIndex,
        goPrev,
        goNext,
    };
}
