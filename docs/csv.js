console.log("[csv.js] loaded");

function generateCSVFile() {
  const pageTitle = document.title || "Inventory";
  const rows = [];

  // 1) TITLE ROW (only the title in the first cell)
  rows.push([pageTitle]);

  // 2) COLUMN HEADERS (your requested categories)
  rows.push(["Bottle", "Color", "Quantity", "Price", "Total"]);

  // Helpers
  const csvEscape = v => `"${String(v ?? "").replace(/"/g, '""')}"`;

  function itemRow(item) {
    const quantity = totalQuantity(item);
    const price = Number(item.price) || 0;
    const total = quantity * price;

    return [
      smartItemTitle(item),
      item.color || "",
      quantity,
      price.toFixed(2),
      total.toFixed(2)
    ];
  }

  function groupTotalRow(label, sum) {
    // Put the label in Bottle column, leave others blank except Total
    return [label, "", "", "", sum.toFixed(2)];
  }

  // 3) GROUP items by tier
  const houseItems = items.filter(i => (i.tier || "") === "House");
  const reserveItems = items.filter(i => (i.tier || "") === "Reserve");

  // OPTIONAL: sort within groups (keeps export stable/readable)
  // Comment these out if you want raw order.
  const sortedHouse = standardSort(houseItems);
  const sortedReserve = standardSort(reserveItems);

  let houseSum = 0;
  let reserveSum = 0;

  // 4) HOUSE GROUP
  if (sortedHouse.length) {
    rows.push(["House"]); // group label row (single cell)
    sortedHouse.forEach(item => {
      const quantity = totalQuantity(item);
      const price = Number(item.price) || 0;
      const total = quantity * price;

      houseSum += total;
      rows.push(itemRow(item));
    });
    rows.push(groupTotalRow("House Total", houseSum));
    rows.push([""]); // spacer row (optional, remove if you don’t want blank lines)
  }

  // 5) RESERVE GROUP
  if (sortedReserve.length) {
    rows.push(["Reserve"]); // group label row (single cell)
    sortedReserve.forEach(item => {
      const quantity = totalQuantity(item);
      const price = Number(item.price) || 0;
      const total = quantity * price;

      reserveSum += total;
      rows.push(itemRow(item));
    });
    rows.push(groupTotalRow("Reserve Total", reserveSum));
    rows.push([""]); // spacer row (optional)
  }

  // 6) GRAND TOTAL
  const grandTotal = houseSum + reserveSum;
  rows.push(groupTotalRow("Grand Total", grandTotal));

  // Build CSV
  const csv = rows
    .map(row => row.map(csvEscape).join(","))
    .join("\n");

  openCSVInNewWindow(csv, "items.csv");
}


function openCSVInNewWindow(csv, filename) {
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const win = window.open("", "_blank");
  win.document.write(`
    <html>
      <head>
        <title>${filename}</title>
        <style>
          body {
            font-family: monospace;
            padding: 16px;
            margin: 0;
          }
          .download {
            display: inline-block;
            padding: 8px 12px;
            background: #eee;
            border-radius: 6px;
            text-decoration: none;
            color: #000;
            font-weight: 600;
            margin-bottom: 12px;
          }
          pre {
            white-space: pre-wrap;
            padding-bottom: 80px;
          }
          .bottom-bar {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: #fff;
            border-top: 1px solid #ccc;
            padding: 10px;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <a class="download" href="${url}" download="${filename}">
          ⬇ Download ${filename}
        </a>

        <pre>${csv.replace(/</g, "&lt;")}</pre>

        <div class="bottom-bar">
          <a class="download" href="${url}" download="${filename}">
            ⬇ Download ${filename}
          </a>
        </div>
      </body>
    </html>
  `);

  win.document.close();
}
