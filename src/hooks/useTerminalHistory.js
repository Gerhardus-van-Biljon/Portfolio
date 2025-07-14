import { useState } from "react";

/**
 * Custom hook to manage command history and navigation index.
 */
export default function useTerminalHistory() {
    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(0);

    return { history, setHistory, historyIndex, setHistoryIndex };
}
