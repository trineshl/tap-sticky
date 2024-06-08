import DBConnection from "./DBConnection.js";

class DBBase {
  static getAllRecords(tableName) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM ${tableName}`;
      DBConnection.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  static getRecordById(tableName, p_intId, p_strIdPropertyName) {

    return new Promise((resolve, reject) => {

      const LSql = `SELECT * FROM ${tableName} WHERE ${p_strIdPropertyName} = ?`;

      DBConnection.get(LSql, [p_intId], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  static createRecord(tableName, record, p_strIdPropertyName) {
    return new Promise((resolve, reject) => {

      const keys = Object.keys(record).join(', ');
      const values = Object.values(record).map(() => '?').join(', ');
      const sql = `INSERT INTO ${tableName} (${keys}, updated_on) VALUES (${values}, CURRENT_TIMESTAMP)`;

      DBConnection.run(sql, Object.values(record), function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ [p_strIdPropertyName]: this.lastID });
        }
      });
    });
  }

  static generateUpdateQuery(tableName, p_intId, record, p_strIdPropertyName) {
    // Validate input
    if (!tableName || !p_intId || !record || !p_strIdPropertyName) {
      throw new Error("Missing required parameters");
    }

    // Generate the list of updates dynamically
    const updates = Object.keys(record)
      .map(key => `${key} = ${typeof record[key] === 'string' ? `'${record[key].replace(/'/g, "''")}'` : record[key]}`)
      .join(', ');

    // Construct the complete SQL query string
    const sql = `UPDATE ${tableName} SET ${updates}, updated_on = CURRENT_TIMESTAMP WHERE ${p_strIdPropertyName} = ${typeof p_intId === 'string' ? `'${p_intId.replace(/'/g, "''")}'` : p_intId}`;

    // Return the generated SQL query
    return sql;
  }

  static editRecord(tableName, p_intId, record, p_strIdPropertyName) {
    const LMe = this;

    return new Promise((resolve, reject) => {

      // Construct the SQL query string
      const sql = LMe.generateUpdateQuery(tableName, p_intId, record, p_strIdPropertyName);

      // Run the SQL query with the provided parameters
      DBConnection.run(sql, function (err) {
        if (err) {
          reject(err); // Reject the promise if there is an error
        } else {
          resolve({ changes: this.changes }); // Resolve the promise with the number of changes
        }
      });
    });
  }

  static deleteRecord(tableName, p_intId, p_strIdPropertyName) {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM ${tableName} WHERE ${p_strIdPropertyName} = ${p_intId}`;
      DBConnection.run(sql, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ changes: this.changes });
        }
      });
    });
  }
}

export default DBBase;