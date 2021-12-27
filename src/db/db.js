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
            (txObj, error) => console.log('SQLite INIT Error ', error)
        ) // end executeSQL
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS profiles (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, darkmode INTEGER DEFAULT 0, selected INTEGER DEFAULT 0)', null, // passing sql query and parameters:null
            // success callback which sends two things Transaction object and ResultSet Object
            (txObj, res) => console.log('SQLite INIT ', res),
            // failure callback which sends two things Transaction object and Error
            (txObj, error) => console.log('SQLite INIT Error ', error)
        ) // end executeSQL
        tx.executeSql(
            "INSERT OR IGNORE INTO profiles (id, name) VALUES(0, 'Zeus')", null, // passing sql query and parameters:null
            // success callback which sends two things Transaction object and ResultSet Object
            (txObj, res) => console.log('SQLite INIT ',res),
            // failure callback which sends two things Transaction object and Error
            (txObj, error) => console.log('SQLite INIT Error ', error)
        )
    });
    console.log('INIT DB PROFILES');
};

export const requestProfiles = (callback) => {
    db.transaction(tx => {
        // sending 4 arguments in executeSql
        tx.executeSql('SELECT * FROM profiles LIMIT 3', null, // passing sql query and parameters:null
            // success callback which sends two things Transaction object and ResultSet Object
            (txObj, { rows: { _array } }) => callback(_array.map(field => field.name)),
            // failure callback which sends two things Transaction object and Error
            (txObj, error) => console.log('SQLite SELECT Error ', error)
            ) // end executeSQL
    }); // end transaction
};

export const requestProfile = (callback) => {
    db.transaction(tx => {
        // sending 4 arguments in executeSql
        tx.executeSql('SELECT name FROM profiles WHERE selected==1', null, // passing sql query and parameters:null
            // success callback which sends two things Transaction object and ResultSet Object
            (txObj, { rows: { _array } }) => callback((_array ? _array[0].name : 'NaN')),
            // failure callback which sends two things Transaction object and Error
            (txObj, error) => console.log('SQLite SELECT Error ', error)
            ) // end executeSQL
    }); // end transaction
};

export const requestDarkmode = (callback) => {
    db.transaction(tx => {
        // sending 4 arguments in executeSql
        tx.executeSql('SELECT darkmode FROM profiles WHERE selected==1', null, // passing sql query and parameters:null
            // success callback which sends two things Transaction object and ResultSet Object
            (txObj, { rows: { _array } }) => callback((_array ? _array[0].darkmode : 0)),
            // failure callback which sends two things Transaction object and Error
            (txObj, error) => console.log('SQLite SELECT Error ', error)
            ) // end executeSQL
    }); // end transaction
};

export const selectProfile = (name) => {
    db.transaction(tx => {
        tx.executeSql(
            "UPDATE profiles SET selected=0", null, // passing sql query and parameters
            // success callback which sends two things Transaction object and ResultSet Object
            (txObj, res) => console.log('SQLite UPDATE ', res),
            // failure callback which sends two things Transaction object and Error
            (txObj, error) => console.log('SQLite UPDATE Error ', error)
        )
        tx.executeSql(
            "UPDATE profiles SET selected=1 WHERE name==?",  
            [name], // passing sql query and parameters
            // success callback which sends two things Transaction object and ResultSet Object
            (txObj, res) => console.log('SQLite UPDATE ', res),
            // failure callback which sends two things Transaction object and Error
            (txObj, error) => console.log('SQLite UPDATE Error ', error)
        )
    });
};

export const addProfile = (name) => {
    db.transaction(tx => {
        tx.executeSql(
            "INSERT OR IGNORE INTO profiles (name) VALUES(?)",  
            [name], // passing sql query and parameters
            // success callback which sends two things Transaction object and ResultSet Object
            (txObj, res) => console.log('SQLite INSERT ', res),
            // failure callback which sends two things Transaction object and Error
            (txObj, error) => console.log('SQLite INSERT Error ', error)
        )
    });
};


export const setDarkmodePref = (name, darkmode) => {
    db.transaction(tx => {
        tx.executeSql(
            "UPDATE profiles SET darkmode=? WHERE name==?",  
            [darkmode, name], // passing sql query and parameters
            // success callback which sends two things Transaction object and ResultSet Object
            (txObj, res) => console.log('SQLite UPDATE ', res),
            // failure callback which sends two things Transaction object and Error
            (txObj, error) => console.log('SQLite UPDATE Error ', error)
        )
    });
};