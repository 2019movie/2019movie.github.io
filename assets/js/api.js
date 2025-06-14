/* jshint esversion: 6 */
document.addEventListener("DOMContentLoaded", function () {
  // JS for: Api app

  const commodityCheckbox = document.getElementById("commodity");
  const interestRateCheckbox = document.getElementById("interest_rate");
  const queryDropdown = document.getElementById("query");
  const getResponseBtn = document.getElementById("getResponse");
  const responseContainer = document.getElementById("response");

  function resetForm() {
    // clear relevant Html elements

    commodityCheckbox.checked = false;
    interestRateCheckbox.checked = false;
    queryDropdown.innerHTML = '<option value="">Select an option</option>';
    responseContainer.innerHTML = "";
  }
  function updateQueryOptions(options) {
    // when 1 of api checkboxes selected
    // clear dropdown
    // dropdown will populate with relevant options (loop through value stored in relevant array)
    queryDropdown.innerHTML = "";
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Select an option";
    queryDropdown.append(defaultOption);

    for (let i = 0; i < options.length; i++) {
      let newOption = document.createElement("option");
      newOption.value = options[i];
      newOption.textContent = options[i];
      queryDropdown.append(newOption);
    }
  }
  function handleCheckboxSelection(selectedCheckbox, otherCheckbox, options) {
    // logic ensure only 1 of 2 checkbox checked once user clicked any checkbox.
    if (selectedCheckbox.checked) {
      otherCheckbox.checked = false;
      // update related option for selected API
      updateQueryOptions(options);
    } else {
      resetForm();
    }
  }
  function parseCommodityPrice(jsonObj) {
    // helper function convert json object to array
    // sample json:
    // {"exchange":"CME","name":"Oat Futures","price":344.75,"updated":1746814795}
    //{"error":"Commodity not found. Please check your parameters and try again."}
    return [jsonObj.exchange, jsonObj.name, jsonObj.price, jsonObj.updated];
  }

  function parseInterestRate(jsonObj) {
    // helper function convert json object to array
    //Sample json:
    //{"central_bank_rates":[{"central_bank":"British Central Bank","country":"United Kingdom","rate_pct":4.25,"last_updated":"05-08-2025"}]}
    //{"central_bank_rates":[]}
    return jsonObj.central_bank_rates.map((rate) => [
      rate.central_bank,
      rate.country,
      rate.rate_pct,
      rate.last_updated,
    ]);
  }

  commodityCheckbox.addEventListener("change", () => {
    // action when commodity checkbox checked
    responseContainer.innerHTML = "__awaiting response...";
    // dropdown fills with commodity related items
    handleCheckboxSelection(commodityCheckbox, interestRateCheckbox, [
      "gold",
      "platinum",
      "lean_hogs",
      "oat",
      "aluminum",
      "soybean_meal",
      "lumber",
      "micro_gold",
      "feeder_cattle",
      "rough_rice",
      "palladium",
    ]);
  });

  interestRateCheckbox.addEventListener("change", () => {
    // action when interest rate checkbox checked
    responseContainer.innerHTML = "__awaiting response...";
    // dropdown fills with interest rate related items
    handleCheckboxSelection(interestRateCheckbox, commodityCheckbox, [
      "Australia",
      "China",
      "Czech Republic",
      "Denmark",
      "Mexico",
      "New Zealand",
      "Norway",
      "Poland",
      "Russia",
      "Sweden",
      "Switzerland",
      "Türkiye",
      "United Kingdom",
    ]);
  });

  getResponseBtn.addEventListener("click", async () => {
    // action when 'Get response' button clicked
    // message when 'Get response button clicked with no checkbox selected.
    if (
      !queryDropdown.value ||
      (!commodityCheckbox.checked && !interestRateCheckbox.checked)
    ) {
      responseContainer.innerHTML =
        "<p>Error: Please try Step 1 and 2 again.</p>";
      return;
    }

    // construct the url, use asyn to call API
    let selectedAPI = "interestrate?country";
    if (commodityCheckbox.checked) {
      selectedAPI = "commodityprice?name";
    }
    let selectedQuery = queryDropdown.value;
    const apiUrl = `https://api.api-ninjas.com/v1/${selectedAPI}=${selectedQuery}`;
    const apiError = `<p>Error: Failed to fetch API call: ${apiUrl}</p>`;
    try {
      responseContainer.innerHTML = "__awaiting response...";
      const response = await fetch(apiUrl, {
        headers: { "X-Api-Key": "XKMbhtfmfWEIiqrCkjvo2Q==esRKmWFy3Cx9Gyzs" },
      });
      const data = await response.json();
      // let displayText = `<p>${parseApiJson(data)}</p><p>${JSON.stringify(
      //   data
      // )}</p>`;
      let displayText = `<p>${JSON.stringify(data)}</p>`;

      if (commodityCheckbox.checked) {
        if (data.error) {
          displayText = `<p>Error: ${data.error}</p>`;
        } else {
          let dataArray = parseCommodityPrice(data);
          displayText = `<p>${dataArray[1]} $${dataArray[2]}</p>`;
        }
      } else if (interestRateCheckbox.checked) {
        if (data.central_bank_rates) {
          let dataArray = parseInterestRate(data);
          displayText = `<p>${dataArray[0][1]} ${dataArray[0][2]}%</p>`;
        }
        if (data.error) {
          displayText = `<p>Error: ${data.error}</p>`;
        }
      }

      responseContainer.innerHTML = displayText;
    } catch (error) {
      responseContainer.innerHTML = apiError;
    }
  });
});
