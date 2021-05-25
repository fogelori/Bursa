import * as xmljs from "xml-js";

const getOrganizedFinStmtsJSON = (data) => {
  const FinStmtsObj = {};
  data["context"].forEach((item) => {
    FinStmtsObj["context"] = {
      ...FinStmtsObj["context"],
      [item["_attributes"]["id"]]: item["period"],
      entity: item["entity"]["identifier"]["_text"],
    };
  });
  data["unit"].forEach((item) => {
    FinStmtsObj["unit"] = {
      ...FinStmtsObj["unit"],
      [item["_attributes"]["id"]]: item[Object.keys(item)[1]],
    };
  });
  Object.keys(data).forEach((key) => {
    if (key.startsWith("ifrs")) {
      if (!Array.isArray(data[key])) {
        data[key] = [data[key]];
      }
      const splitedKeyArray = key.split(":");
      FinStmtsObj[splitedKeyArray[0]] = {
        ...FinStmtsObj[splitedKeyArray[0]],
        [splitedKeyArray[1]]: data[key].map((item) => {
          return {
            value: item["_text"],
            date: {
              name: item["_attributes"]["contextRef"],
              value: FinStmtsObj["context"][item["_attributes"]["contextRef"]],
            },
            ...(item["_attributes"]["decimals"] && {
              decimals: item["_attributes"]["decimals"],
            }),
            ...(item["_attributes"]["unitRef"] && {
              unit: {
                name: item["_attributes"]["unitRef"],
                value: FinStmtsObj["unit"][item["_attributes"]["unitRef"]],
              },
            }),
          };
        }),
      };
      if (key.startsWith("ifrs-full")) {
        FinStmtsObj[splitedKeyArray[0]][splitedKeyArray[1]] =
          FinStmtsObj[splitedKeyArray[0]][splitedKeyArray[1]][0];
      }
    }
  });
  return FinStmtsObj;
};

export const iXbrl2Json = (xmlData) => {
  const jsonedData = xmljs.xml2js(xmlData, {
    compact: true,
    ignoreDeclaration: true,
  }).xbrl;
  const FinStmtsJsonObj = getOrganizedFinStmtsJSON(jsonedData);
  console.log(FinStmtsJsonObj);
  return FinStmtsJsonObj;
  // const newJson = {
  //   ifrs-full:
  //   ifrs-il:
  // };
};
