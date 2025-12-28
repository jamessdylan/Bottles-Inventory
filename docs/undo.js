let undoStack = [];
const UNDO_LIMIT = 5;


function logUndo(item, key, prevValue, nextValue) {
  const last = undoStack[undoStack.length - 1];

  // 🚫 Skip if same item + same source
  if (last && last.item === item && last.key === key) return;

  undoStack.push({
    item,
    key,
    prevValue,
    nextValue,
    text: `${smartItemTitle(item)}: ${prevValue} → ${nextValue}`
  });

  if (undoStack.length > UNDO_LIMIT) {
    undoStack.shift();
  }
}

function undoLastAction() {
  const action = undoStack.pop();
  if (!action) return;

  const { item, key, prevValue } = action;

  item[key] = prevValue;

  renderItems();
}

function showUndoHistory() {
  if (!undoStack.length) {
    alert("No undo history");
    return;
  }

  const text = undoStack
    .slice()
    .reverse()
    .map((u, i) => `${i + 1}. ${u.text}`)
    .join("\n");

  alert(`Undo History (most recent first):\n\n${text}`);
}
