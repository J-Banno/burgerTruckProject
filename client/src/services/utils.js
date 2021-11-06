export function formatDate(date) {
  if (date != null) {
    let myDate = new Date(date);

    let formatDate = `${
      myDate.getDate() < 10 ? "0" + myDate.getDate() : myDate.getDate()
    }/${
      myDate.getMonth() + 1 < 10
        ? "0" + (myDate.getMonth() + 1)
        : myDate.getMonth() + 1
    }/${myDate.getFullYear()}`;
    return formatDate;
  }
}

export function totalPrice(price) {
  let total = 0;
  if (price != null) {
    price.forEach((element) => {
      total += element.total;
    });
    return total;
  }
}

export function regex(string) {
  if (string != null) {
    let stringRegex = string.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
    let newString = stringRegex.toLowerCase().split(" ").join("-");
    return newString;
  }
  return "";
}
