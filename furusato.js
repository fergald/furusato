{
  let ui = document.getElementById("f_ui");
  let prevCsv;
  if (ui) {
    prevCsv = f_csv.value;
    ui.remove();
  }

  const parseDate = function(d) {
    const parts = d.split("-");
    return parts;
  }

  let e = function(e, id) {
    const r = document.createElement(e);
    r.id = id;
    return r;
  }

  let t = function(text) {
    const r = e("span");
    r.textContent = text;
    return r;
  }

  setSelect = function(select, value) {
    let opts = select.options;
    for (let opt, j = 0; opt = opts[j]; j++) {
      if (opt.text == value) {
        select.selectedIndex = j;
        return;
      }
    }
    throw "Couldn't find " + value;
  }

  const addUi = function(main) {
    const uiDiv = e("div", "f_ui");
    main.insertBefore(uiDiv, main.firstChild);

    const csvDiv = e("div");
    uiDiv.appendChild(csvDiv);
    csvDiv.appendChild(t("CSV"));
    const csvInput = e("input", "f_csv");
    csvInput.size = 40;
    csvDiv.appendChild(csvInput);

    uiDiv.appendChild(t("Date"));
    const dateInput = e("input", "f_date");
    dateInput.placeholder = "2019-12-01";
    uiDiv.appendChild(dateInput);

    uiDiv.appendChild(t(" Ken"));
    const kenInput = e("input", "f_ken");
    uiDiv.appendChild(kenInput);
    uiDiv.appendChild(t(" Machi"));

    const machiInput = e("input", "f_machi");
    uiDiv.appendChild(machiInput);
    uiDiv.appendChild(t(" JPY"));
    const amountInput = e("input", "f_amount");
    uiDiv.appendChild(amountInput);

    const submitInput = e("input", "f_submit");
    submitInput.type = "button";
    submitInput.value = "go";
    uiDiv.appendChild(submitInput);

    csvInput.onchange = function() {
      const [date, ken, machi, amount] = csvInput.value.split(",");
      dateInput.value = date || "";
      kenInput.value = ken || "";
      machiInput.value = machi || "";
      amountInput.value = amount || "";
    }

    const onClick = function() {
      console.log("here")
      const [year, month, day] = parseDate(f_date.value);
      console.log([year, month, day]);
      if (year != "2019") {
        throw "only 2019! - " + year;
      }

      if (month <= 4) {
        setSelect(s761_date_ERA, "平成");
        // setSelect(s761_date_NEN, year - 2019 + 31);
      } else {
        setSelect(s761_date_ERA, "令和");
        // setSelect(s761_date_NEN, year - 2018);
      }
      s761_date_ERA.onchange();
      setSelect(s761_date_MON, parseInt(month));
      s761_date_MON.onchange();
      setSelect(s761_date_DAY, parseInt(day));

      if (!kenInput.value) {
        throw "Need a ken";
      }
      if (machiInput.value) {
        s16_kifusakiKbn_2.click();
      } else {
        s16_kifusakiKbn_1.click();
      }

      setSelect(tPrefecture, kenInput.value);
      tPrefecture.onchange();
      if (machiInput.value) {
        setSelect(tMunicipal, machiInput.value);
        tMunicipal.onchange();
      }
      if (!amountInput.value) {
        throw "Need an amount";
      }
      t761230t.value = amountInput.value;
    }
    submitInput.onclick = onClick;
  }


  addUi(kifuModal);

  if (prevCsv) {
    f_csv.value = prevCsv;
    f_csv.onchange();
  }
}
