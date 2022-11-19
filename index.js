"use strict";

let str = "";
const btn = document.querySelector("#submit");
btn.addEventListener("click", function (e) {
  e.preventDefault();
  const rows = Number(document.querySelector("#row").value);
  if (rows <= 0) {
    alert("Enter a positive row number");
  }
  for (let j = 1; j <= rows; j++) {
    const check_arr = [];
    for (let i = 0; i <= 31; i++) {
      const cb = document.querySelector(`#data${i}:checked`);
      if (cb != null) {
        const value = cb.value;
        const name = cb.name;
        check_arr.push(`faker.${name}.${value}()`);
      }
    }
    const evalArr = check_arr.map((mov) => String(eval(mov)));
    str = str.concat("\n", evalArr.join(","));
  }
  const sample = document.querySelector("#sample");
  sample.value = str;
});

const copy = document.querySelector("#copy");
copy.addEventListener("click", function (e) {
  /* Get the text field */
  const copyText = document.getElementById("sample");
  /* Select the text field */
  copyText.select();
  /* Copy the text inside the text field */
  navigator.clipboard.writeText(copyText.value);
});

const downloadToFile = (content, filename, contentType) => {
  const a = document.createElement("a");
  const file = new Blob([content], { type: contentType });

  a.href = URL.createObjectURL(file);
  a.download = filename;
  a.click();

  URL.revokeObjectURL(a.href);
};

document.querySelector("#btnSave").addEventListener("click", () => {
  downloadToFile(str, "fakeData.txt", "text/plain");
});

document.querySelector("#clear").addEventListener("click", () => {
  location.reload();
})
