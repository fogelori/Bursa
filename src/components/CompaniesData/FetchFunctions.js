import i18next from "i18next";

export const getFetchTase = async (url, method, headers, bodyObject) => {
  try {
    const response = await fetch(url, {
      method: method,
      body: bodyObject,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": i18next.language,
        // "Accept-Language": "en-US",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:87.0) Gecko/20100101 Firefox/87.0",
        ...headers,
      },
    });
    if (response.ok) {
      let jsonResponse;
      const contentType = response.headers.get("content-type");
      if (contentType.includes("application/json")) {
        jsonResponse = await response.json();
      } else if (contentType.includes("application/xml")) {
        jsonResponse = await response.text();
        // jsonResponse = xmljs.xml2js(jsonResponse, {
        //   compact: true,
        //   ignoreDeclaration: true,
        //   // alwaysChildren: true,
        // });

        // console.log(jsonResponse.xbrl["ifrs-full:Revenue"]._text);
        // console.log("trtttt");
      }
      // if (format == "text") {
      //   jsonResponse = await response.text();
      // } else {
      //   jsonResponse = await response.json();
      // }
      return jsonResponse;
    }
    throw new Error("Request failed!");
  } catch (error) {
    console.log(error);
  }
};

export const getCompaniesList = async () => {
  const lang = i18next.language === "he-IL" ? 0 : 1;
  const url = `https://api.tase.co.il/api/content/searchentities?lang=${lang}`;
  const method = "GET";
  const data = await getFetchTase(url, method);
  const filteredList = data.filter(
    (company) =>
      company.Type === 5 && (company.SubType === "0" || company.SubType === "1")
  );
  return filteredList;
};

export const fetchCompanyOverview = async (companyId) => {
  const url = `https://mayaapi.tase.co.il/api/company/alldetails?companyId=${companyId}`;
  const method = "GET";
  const headers = {
    "X-Maya-With": "allow",
  };
  const data = await getFetchTase(url, method, headers);
  return data;
};
