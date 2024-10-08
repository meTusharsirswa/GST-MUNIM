export function formatIndianCurrency(price) {
    if (price == null) {
      return "0";
    }
  
    const formattedPrice = price.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
  
    return formattedPrice.replace(/\.00$/, "");
  }
  
  export function formateDate(date) {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear().toString().slice(-2); // Extract last two digits of the year
  
    return `${day}-${month}-${year}`;
  }
  
  // inputFunctions.js
  export function validateNumericInput(enteredValue) {
    // Check if the entered value is numeric
    if (!/^\d*$/.test(enteredValue)) {
      // If not numeric, return false
      return false;
    } else {
      // If numeric, return true
      return true;
    }
  }
  
  // Formate Number value
  export function formateNumber(value) {
    const parsedValue = parseFloat(value);
    if (!isNaN(parsedValue)) {
      return parsedValue.toFixed(2);
    } else {
      return value;
    }
  }
  
  export function formatNumberWithCommas(amount) {
    if (isNaN(amount)) return "0";
  
    const parts = amount.toString().split(".");
    let integerPart = parts[0];
    const decimalPart = parts.length > 1 ? "." + parts[1] : "";
  
    let formattedIntegerPart = "";
    let count = 0;
  
    // Insert commas after every three digits from the right
    for (let i = integerPart.length - 1; i >= 0; i--) {
      if (count !== 0 && count % 3 === 0) {
        formattedIntegerPart = "," + formattedIntegerPart;
      }
      formattedIntegerPart = integerPart[i] + formattedIntegerPart;
      count++;
    }
  
    // Return the formatted amount
    return formattedIntegerPart + decimalPart;
  }
  
  // utils.js
  
  // const numberToWords = (number) => {
  // utils.js
  
  export function numberToWords(number) {
    const units = [
      "",
      "ONE",
      "TWO",
      "THREE",
      "FOUR",
      "FIVE",
      "SIX",
      "SEVEN",
      "EIGHT",
      "NINE",
    ];
    const teens = [
      "TEN",
      "ELEVEN",
      "TWELVE",
      "THIRTEEN",
      "FOURTEEN",
      "FIFTEEN",
      "SIXTEEN",
      "SEVENTEEN",
      "EIGHTEEN",
      "NINETEEN",
    ];
    const tens = [
      "",
      "",
      "TWENTY",
      "THIRTY",
      "FORTY",
      "FIFTY",
      "SIXTY",
      "SEVENTY",
      "EIGHTY",
      "NINETY",
    ];
    const thousands = ["", "THOUSAND", "LAKH", "CRORE"];
  
    const convertLessThanThousand = (num) => {
      let words = "";
      if (num >= 100) {
        words += units[Math.floor(num / 100)] + " HUNDRED ";
        num %= 100;
      }
      if (num >= 10 && num <= 19) {
        words += teens[num - 10];
        return words;
      }
      if (num >= 20) {
        words += tens[Math.floor(num / 10)] + " ";
        num %= 10;
      }
      if (num > 0) {
        words += units[num];
      }
      return words.trim();
    };
  
    if (number === 0) {
      return "ZERO";
    }
  
    let words = "";
    let i = 0;
  
    while (number > 0) {
      if (number % 1000 !== 0) {
        if (i === 1 && number % 1000 < 100) {
          words = convertLessThanThousand(number % 1000) + " AND " + words;
        } else {
          words =
            convertLessThanThousand(number % 1000) +
            " " +
            thousands[i] +
            " " +
            words;
        }
      }
      number = Math.floor(number / 1000);
      i++;
    }
  
    return words.trim() + " RUPEES ONLY";
  }
  
  
  
  
  