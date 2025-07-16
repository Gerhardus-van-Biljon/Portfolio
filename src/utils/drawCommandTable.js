function drawCommandTable(commandDescriptions) {
  return function renderWithTheme(theme = {}) {
    const commands = Object.keys(commandDescriptions);
    const descriptions = Object.values(commandDescriptions);

    const cmdHeader = "Command";
    const descHeader = `Description ${theme.emoji || ""}`.trim();

    const maxCmdLength = Math.max(...commands.map(cmd => cmd.length), cmdHeader.length);
    const maxDescLength = Math.max(...descriptions.map(desc => desc.length), descHeader.length);

    const cmdColWidth = maxCmdLength;
    const descColWidth = maxDescLength;

    const border = {
      top: `╭─${"─".repeat(cmdColWidth)}─┬─${"─".repeat(descColWidth)}─╮`,
      header: `│ ${cmdHeader.padEnd(cmdColWidth)} │ ${descHeader.padEnd(descColWidth)} │`,
      divider: `├─${"─".repeat(cmdColWidth)}─┼─${"─".repeat(descColWidth)}─┤`,
      bottom: `╰─${"─".repeat(cmdColWidth)}─┴─${"─".repeat(descColWidth)}─╯`,
    };

    const rows = commands.map(cmd => {
      const desc = commandDescriptions[cmd];
      return `│ ${cmd.padEnd(cmdColWidth)} │ ${desc.padEnd(descColWidth)} │`;
    });

    const color = theme.outputColor || theme.fg || "#ccc";
    const font = "monospace";

    return [...Object.values(border), ...rows].map((line, i) => (
      <pre
        key={`cmd-line-${i}`}
        style={{
          fontFamily: font,
          margin: 0,
          color,
          backgroundColor: "transparent"
        }}
      >
        {line}
      </pre>
    ));
  };
}

export default drawCommandTable;
