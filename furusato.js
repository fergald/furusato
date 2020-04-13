// Try do everything in a scope to avoid polluting the JS environment.
// All my HTML elements have IDs that begin with f_.
{
  // Remove any old version of the UI but preserved the CSV field's
  // value.
  let ui = document.getElementById("f_ui");
  let prevCsv;
  if (ui) {
    prevCsv = f_csv.value;
    ui.remove();
  }

  // Dumb date parsing.
  const parseDate = function(d) {
    const parts = d.split("-");
    return parts;
  }

  // Shortcut for creating elements with an id.
  let e = function(e, id) {
    const r = document.createElement(e);
    r.id = id;
    return r;
  }

  // Shortcut for creating spans of text.
  let t = function(text) {
    const r = e("span");
    r.textContent = text;
    return r;
  }

  // Put the error message in the error area and throw an exception.
  const reportError = function (e) {
    f_error.textContent = e;
    throw e;
  }

  // Given a select element, set it to the option that has this text
  // value.
  let setSelect = function(select, value) {
    let opts = select.options;
    for (let opt, j = 0; opt = opts[j]; j++) {
      if (opt.text == value) {
        select.selectedIndex = j;
        return;
      }
    }
    reportError("Couldn't find " + value);
  }

  // Adds all of the UI before the first child of the passed-in
  // element, main.
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

    const error = e("div", "f_error");
    error.style = "color: red";
    uiDiv.appendChild(error);

    // The main action, takes the values of my fields and tweaks the
    // form.
    const onClick = function() {
      // Clear any previous error.
      f_error.textContent = "";

      const [year, month, day] = parseDate(f_date.value);
      if (year != "2019") {
        reportError("only 2019! - " + year);
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

      // We're doing furusato.
      t761180s.selectedIndex = 2;
      t761180s.onchange();
      if (t761180s.selectedOptions[0].text.indexOf("ふるさと納税") == -1) {
        reportError("No furusato");
      }

      if (!kenInput.value) {
        reportError("Need a ken");
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
        reportError("Need an amount");
      }
      t761230t.value = amountInput.value;
    }
    submitInput.onclick = onClick;

    csvInput.onchange = function() {
      const [date, ken, machi, amount] = csvInput.value.split(",");
      // Get rid of undefineds.
      dateInput.value = date || "";
      kenInput.value = ken || "";
      machiInput.value = machi || "";
      amountInput.value = amount || "";
      submitInput.onclick();
    }
  }

  addUi(kifuModal);

  // Install "c" shortcut.
  window.onkeypress = function (e) {
    var code = e.which || e.keyCode;
    if (code == 99) {
      f_csv.focus();
      f_csv.select();
      e.stopPropagation();
      e.preventDefault();
    }
  }

  // Restore previous CSV value if there was one.
  if (prevCsv) {
    f_csv.value = prevCsv;
    f_csv.onchange();
  }
}
