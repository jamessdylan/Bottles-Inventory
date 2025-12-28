console.log("[datePicker] loaded");

function initDatePicker() {
  console.log("[datePicker] init");

  const pageTitleEl = document.getElementById("pageTitle");
  const picker = document.getElementById("datePicker");
  const pickerOverlay = document.getElementById("datePickerOverlay");
  const monthPicker = document.getElementById("monthPicker");
  const yearPicker = document.getElementById("yearPicker");
  const cancelDate = document.getElementById("cancelDate");
  const confirmDate = document.getElementById("confirmDate");

  if (!pageTitleEl || !picker) {
    console.warn("[datePicker] required DOM not found");
    return;
  }

  function defaultTitle() {
    const d = new Date();
    if (d.getDate() < 15) d.setMonth(d.getMonth() - 1);
    return (
      d.toLocaleString("default", { month: "long", year: "numeric" }) +
      " Wine Inventory"
    );
  }

  let pageTitle = defaultTitle();
  pageTitleEl.textContent = pageTitle;

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  monthPicker.innerHTML = "";
  months.forEach(m => {
    const o = document.createElement("option");
    o.value = m;
    o.textContent = m;
    monthPicker.appendChild(o);
  });

  const currentYear = new Date().getFullYear();
  yearPicker.innerHTML = "";
  for (let y = currentYear; y >= currentYear - 2; y--) {
    const o = document.createElement("option");
    o.value = y;
    o.textContent = y;
    yearPicker.appendChild(o);
  }

  pageTitleEl.onclick = () => {
    const [m, y] = pageTitle.split(" ");
    monthPicker.value = m;
    yearPicker.value = y;
    picker.style.transform = "translateY(0)";
    pickerOverlay.classList.add("show");
  };

  cancelDate.onclick = () => {
    picker.style.transform = "translateY(100%)";
    pickerOverlay.classList.remove("show");
  };

  confirmDate.onclick = () => {
    pageTitle = `${monthPicker.value} ${yearPicker.value} Wine Inventory`;
    pageTitleEl.textContent = pageTitle;
    cancelDate.onclick();
  };
}
