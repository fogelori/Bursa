//file 'webpack.config.js' is in location \node_modules\react-scripts\config
// add to line 440, inside section: 'loader: require.resolve('babel-loader'),'
//                plugins: [
//  ['@babel/plugin-proposal-private-methods', { "loose": true }],
//

import * as xmljs from "xml-js";

export class IXBRL2JSON {
  constructor(xmlStr) {
    this._originalJsonXbrl = {};
    this.clauses = {};
    this.generalInfo = {};
    this._loadXBRL(xmlStr);
    this._getOrganizedFinStmtsJSON();
  }

  _loadXBRL(xmlStr) {
    this._originalJsonXbrl = xmljs.xml2js(xmlStr, {
      compact: true,
      ignoreDeclaration: true,
    }).xbrl;
    // console.log(this._originalJsonXbrl);
    // const FinStmtsJsonObj = getOrganizedFinStmtsJSON(jsonedData);
    // return FinStmtsJsonObj;
  }

  _getOrganizedFinStmtsJSON() {
    const FinStmtsObj = {};
    this._originalJsonXbrl["context"].forEach((item) => {
      FinStmtsObj["context"] = {
        ...FinStmtsObj["context"],
        [item["_attributes"]["id"]]: item["period"],
        entity: item["entity"]["identifier"]["_text"],
      };
    });
    this._originalJsonXbrl["unit"].forEach((item) => {
      FinStmtsObj["unit"] = {
        ...FinStmtsObj["unit"],
        [item["_attributes"]["id"]]: item[Object.keys(item)[1]],
      };
    });
    Object.keys(this._originalJsonXbrl).forEach((key) => {
      if (key.startsWith("ifrs")) {
        if (!Array.isArray(this._originalJsonXbrl[key])) {
          this._originalJsonXbrl[key] = [this._originalJsonXbrl[key]];
        }
        const splitedKeyArray = key.split(":");
        FinStmtsObj[splitedKeyArray[0]] = {
          ...FinStmtsObj[splitedKeyArray[0]],
          [splitedKeyArray[1]]: this._originalJsonXbrl[key].map((item) => {
            return {
              value: item["_text"],
              date: {
                name: item["_attributes"]["contextRef"],
                value:
                  FinStmtsObj["context"][item["_attributes"]["contextRef"]],
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
    const currentAsOf = FinStmtsObj["context"]["Current_AsOf"].instant._text;
    const currency = FinStmtsObj["unit"]["U-Monetary"]._text;
    const year = new Date(currentAsOf).getFullYear();
    const quarter = (new Date(currentAsOf).getMonth() + 1) / 3;
    this.period = {
      currentAsOf: currentAsOf,
      year: year,
      quarter: quarter,
      periodText: `Q${quarter}/${year}`,
    };
    this.currency = currency.slice(-3);
    this.clauses = FinStmtsObj["ifrs-full"];
    this.generalInfo = FinStmtsObj["ifrs-il"];
  }

  getClausesList() {
    return Object.keys(this.clauses);
  }

  getGeneralInfoList() {
    return Object.keys(this.generalInfo);
  }

  getSpecificClauseObject(clause) {
    return this.clauses[clause];
  }

  getSpecificGeneralInfoObject(clause) {
    return this.generalInfo[clause];
  }
}
