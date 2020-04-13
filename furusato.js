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

  let setSelect = function(select, value) {
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

    const onClick = function() {
      const [year, month, day] = parseDate(f_date.value);
      if (year != "2019") {
        throw "only 2019! - " + year;
      }

      if (month <= 4) {
        setSelect(s761_date_ERA, "平成");
      } else {
        setSelect(s761_date_ERA, "令和");
      }
      s761_date_ERA.onchange();

      setSelect(s761_date_MON, parseInt(month));
      s761_date_MON.onchange();
      setSelect(s761_date_DAY, parseInt(day));

      t761180s.selectedIndex = 2;
      t761180s.onchange();
      if (t761180s.selectedOptions[0].text.indexOf("ふるさと納税") == -1) {
        throw "No furusato";
      }

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

    csvInput.onchange = function() {
      const [date, ken, machi, amount] = csvInput.value.split(",");
      dateInput.value = date || "";
      kenInput.value = ken || "";
      machiInput.value = machi || "";
      amountInput.value = amount || "";
      submitInput.onclick();
    }
  }

  addUi(kifuModal);

  window.onkeypress = function (e) {
    var code = e.which || e.keyCode;
    if (code == 99) {
      f_csv.focus();
      f_csv.select();
      e.stopPropagation();
      e.preventDefault();
    }
  }

  if (prevCsv) {
    f_csv.value = prevCsv;
    f_csv.onchange();
  }
}
