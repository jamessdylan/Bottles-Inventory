console.log("[baseFile.js] loaded");

function generateBaseFile() {
  console.log("[baseFile] generateBaseFile called");

  if (!Array.isArray(items)) {
    console.warn("[baseFile] items not ready");
    return;
  }

  // Deep clone so we never mutate live items
  const baseItems = items.map(item => {
    const clean = JSON.parse(JSON.stringify(item));

    // Reset totals
    clean.Total = 0;
    clean.TotalPrev = 0;

    // Reset all sources and remove SourcePrev keys
    if (Array.isArray(SOURCES)) {
      SOURCES.forEach(src => {
        clean[src] = 0;
        delete clean[`${src}Prev`];
      });
    }

    return clean;
  });

  const json = JSON.stringify(baseItems, null, 2);
  openJSONInNewWindow(json, "items.json");
}

function openJSONInNewWindow(json, filename) {
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const win = window.open("", "_blank");
  if (!win) {
    alert("Popup blocked. Please allow popups.");
    return;
  }

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
          }
          .top {
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
        <a class="download top" href="${url}" download="${filename}">
          ⬇ Download ${filename}
        </a>

        <pre>${json.replace(/</g, "&lt;")}</pre>

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
