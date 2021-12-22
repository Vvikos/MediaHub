import * as SQLite from 'expo-sqlite'
const db = SQLite.openDatabase('db.profiles') // returns Database object

export const initProfiles = () => {
    // Check if the profiles table exists if not create it
    db.transaction(tx => {
        tx.executeSql(
            'DROP TABLE IF EXISTS profiles', null, // passing sql query and parameters:null
            // success callback which sends two things Transaction object and ResultSet Object
            (txObj, res) => console.log('SQLite INIT ', res),
            // failure callback which sends two things Transaction object and Error
            (txObj, error) => console.log('SQLite Error ', error)
        ) // end executeSQL
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS profiles (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)', null, // passing sql query and parameters:null
            // success callback which sends two things Transaction object and ResultSet Object
            (txObj, res) => console.log('SQLite INIT ', res),
            // failure callback which sends two things Transaction object and Error
            (txObj, error) => console.log('SQLite Error ', error)
        ) // end executeSQL
        tx.executeSql(
            "INSERT OR IGNORE INTO profiles (id, name) VALUES(0, 'Zeus')", null, // passing sql query and parameters:null
            // success callback which sends two things Transaction object and ResultSet Object
            (txObj, res) => console.log('SQLite INIT ',res),
            // failure callback which sends two things Transaction object and Error
            (txObj, error) => console.log('SQLite Error ', error)
        )
    });
    console.log('INIT DB PROFILES');
};

export const requestProfiles = (callback) => {
    db.transaction(tx => {
        // sending 4 arguments in executeSql
        tx.executeSql('SELECT * FROM profiles', null, // passing sql query and parameters:null
            // success callback which sends two things Transaction object and ResultSet Object
            (txObj, { rows: { _array } }) => callback(_array.map(field => field.name)),
            // failure callback which sends two things Transaction object and Error
            (txObj, error) => console.log('SQLite Error ', error)
            ) // end executeSQL
    }); // end transaction
};

export const addProfile = (name) => {
    db.transaction(tx => {
        tx.executeSql(
            "INSERT OR IGNORE INTO profiles (name) VALUES(?)",  
            [name], // passing sql query and parameters
            // success callback which sends two things Transaction object and ResultSet Object
            (txObj, res) => console.log('SQLite INSERT ', res),
            // failure callback which sends two things Transaction object and Error
            (txObj, error) => console.log('SQLite Error ', error)
        )
    });
};