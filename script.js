window.onload = () => {
  function calcAge(fromDate, today) {
    let years = today.getFullYear() - fromDate.getFullYear();
    let months = today.getMonth() - fromDate.getMonth();
    let days = today.getDate() - fromDate.getDate();

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    return { years: years, months: months, days: days };
  }

  function valDay(date) {
    let val = false;

    if (day.value === "") {
      day.parentNode.querySelector(".error-msg").textContent = `This field is required`;
      document.querySelectorAll("input").forEach((inError) => {
        inError.parentNode.querySelector("label").classList.add("error-color");
        inError.classList.add("error-border");
      });
      val = false;
    } else if (day.value < 1 || day.value > 31) {
      day.parentNode.querySelector(".error-msg").textContent = `Must be a valid day`;
      document.querySelectorAll("input").forEach((inError) => {
        inError.parentNode.querySelector("label").classList.add("error-color");
        inError.classList.add("error-border");
      });
      val = false;
    } else if (
      date.getFullYear() !== parseInt(year.value) ||
      date.getMonth() + 1 !== parseInt(month.value) ||
      date.getDate() !== parseInt(day.value)
    ) {
      day.parentNode.querySelector(".error-msg").textContent = `Must be a valid date`;
      document.querySelectorAll("input").forEach((inError) => {
        inError.parentNode.querySelector("label").classList.add("error-color");
        inError.classList.add("error-border");
      });
      val = false;
    } else {
      day.parentNode.querySelector(".error-msg").textContent = ``;
      val = true;
    }

    return val;
  }

  function valMonth() {
    let val = false;

    if (month.value === "") {
      month.parentNode.querySelector(".error-msg").textContent = `This field is required`;
      document.querySelectorAll("input").forEach((inError) => {
        inError.parentNode.querySelector("label").classList.add("error-color");
        inError.classList.add("error-border");
      });
      val = false;
    } else if (month.value < 1 || month.value > 12) {
      month.parentNode.querySelector(".error-msg").textContent = `Must be a valid month`;
      document.querySelectorAll("input").forEach((inError) => {
        inError.parentNode.querySelector("label").classList.add("error-color");
        inError.classList.add("error-border");
      });
      val = false;
    } else {
      month.parentNode.querySelector(".error-msg").textContent = ``;
      val = true;
    }

    return val;
  }

  function valYear(date, today) {
    let val = false;

    if (year.value === "") {
      year.parentNode.querySelector(".error-msg").textContent = `This field is required`;
      document.querySelectorAll("input").forEach((inError) => {
        inError.parentNode.querySelector("label").classList.add("error-color");
        inError.classList.add("error-border");
      });
      val = false;
    } else if (year.value < 0 || year.value > today.getFullYear() || date > today) {
      if (year.value < 0) year.parentNode.querySelector(".error-msg").textContent = `Must be a valid year`;
      else if (year.value > today.getFullYear() || date > today)
        year.parentNode.querySelector(".error-msg").textContent = `Must be in past`;

      document.querySelectorAll("input").forEach((inError) => {
        inError.parentNode.querySelector("label").classList.add("error-color");
        inError.classList.add("error-border");
      });
      val = false;
    } else {
      year.parentNode.querySelector(".error-msg").textContent = ``;
      val = true;
    }

    return val;
  }

  function valDate(date, today) {
    let val = false;

    years.textContent = `- -`;
    months.textContent = `- -`;
    days.textContent = `- -`;

    valDay(date);
    valMonth();
    valYear(date, today);

    if (valDay(date) && valMonth() && valYear(date, today)) {
      document.querySelectorAll("input").forEach((inError) => {
        inError.parentNode.querySelector("label").classList.remove("error-color");
        inError.classList.remove("error-border");
      });
      val = true;
    } else val = false;

    return val;
  }

  show.onclick = () => {
    let today = new Date();
    let date = new Date(`${year.value.padStart(4, "0")}-${month.value.padStart(2, "0")}-${day.value.padStart(2, "0")}`);

    if (valDate(date, today)) {
      let diff = calcAge(date, today);

      years.innerHTML = diff.years;
      months.innerHTML = diff.months;
      days.innerHTML = diff.days;
    }
  };
};
