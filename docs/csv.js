console.log("[csv.js] loaded");

function generateCSVFile() {
  const pageTitle = document.title || "Inventory";

  const rows = [];

  // 🔹 HEADER ROW
  rows.push([
    pageTitle,
    "tier",
    "color",
    "brand",
    "varietal",
    "identifier",
    "quantity",
    "previous quantity",
    "price",
    "total"
  ]);

  // 🔹 ITEM ROWS
  items.forEach(item => {
    const quantity = totalQuantity(item);
    const price = Number(item.price) || 0;
    const total = quantity * price;

    rows.push([
      smartItemTitle(item),     // ← item title here (not page title)
      item.tier || "",
      item.color || "",
      item.brand || "",
      item.varietal || "",
      item.identifier || "",
      quantity,
      item.TotalPrev || 0,
      price,
      total.toFixed(2)
    ]);
  });

  const csv = rows
    .map(row =>
      row.map(v => `"${String(v).replace(/"/g, '""')}"`).join(",")
    )
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
