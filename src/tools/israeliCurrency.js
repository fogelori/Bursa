import * as xmljs from "xml-js";

export default class IsraeliCurrency {
  constructor(date, currency) {
    this.date = date; //20210331
    this.currency = currency;
    this.data = "";
    this._getCurrency();
    // this._originalXML = {};
    // this._loadXML(xmlStr);
  }

  _loadXML(xmlStr) {
    this._originalXML = xmljs.xml2js(xmlStr, {
      compact: true,
      ignoreDeclaration: true,
    });
    console.log(this._originalXML);
  }

  _transformDateToString(date) {
    return date.toJSON().slice(0, 10);
  }

  _getOneDayBefore(date) {
    let localFuncDate = new Date(date);
    localFuncDate.setDate(localFuncDate.getDate() - 1);
    localFuncDate = this._transformDateToString(localFuncDate);
    return localFuncDate;
  }

  _removeDashesFromString(date) {
    return date.replaceAll("-", "");
  }

  async _getCurrency() {
    let localFuncDate = this.date;
    let i = 0;
    do {
      await this._fetchCurrencyData(localFuncDate);
      i++;
      localFuncDate = this._getOneDayBefore(localFuncDate);
    } while (!this._currencyExistInDate() && i < 5);
  }

  _currencyExistInDate() {
    return !this.data.includes("No exchange rate published for this date");
  }

  async _fetchCurrencyData(date) {
    let localFuncDate = this._removeDashesFromString(date);
    try {
      const url = `https://www.boi.org.il/currency.xml?rdate=${localFuncDate}&curr=${this.currency}`;
      //   const response = await axios.get(url);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "he,he-IL;q=0.8,en-US;q=0.5,en;q=0.3",
          // "Accept-Language": "en-US",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
          //   DNT: 1,
          //   "Upgrade-Insecure-Requests": 1,
        },
      });
      if (response.ok) {
        let jsonResponse;
        const contentType = response.headers.get("content-type");
        if (contentType.includes("application/json")) {
          jsonResponse = await response.json();
        } else if (contentType.includes("application/xml")) {
          jsonResponse = await response.text();
        }
        this.data = jsonResponse;
      }
      throw new Error("Request failed!");
    } catch (error) {
      console.log(error);
    }
  }
}
