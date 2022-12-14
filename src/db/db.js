import * as SQLite from 'expo-sqlite'
const db = SQLite.openDatabase('db.mediahub') // returns Database object

export const initBase = () => {
    // Check if the profiles table exists if not create it
    db.transaction(tx => {
        /*tx.executeSql(
            'DROP TABLE IF EXISTS favoris', null, // passing sql query and parameters:null
            // success callback which sends two things Transaction object and ResultSet Object
            (txObj, res) => console.log('SQLite INIT DELETE ', res),
            // failure callback which sends two things Transaction object and Error
            (txObj, error) => console.log('SQLite INIT Error ', error)
        ) // end executeSQL
        tx.executeSql(
            'DROP TABLE IF EXISTS profiles', null, // passing sql query and parameters:null
            // success callback which sends two things Transaction object and ResultSet Object
            (txObj, res) => console.log('SQLite INIT DELETE', res),
            // failure callback which sends two things Transaction object and Error
            (txObj, error) => console.log('SQLite INIT Error ', error)
        ) // end executeSQL*/

        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS profiles (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, selected INTEGER DEFAULT 0)', null, // passing sql query and parameters:null
            // success callback which sends two things Transaction object and ResultSet Object
            (txObj, res) => {
                console.log(JSON.stringify(res))},
            // failure callback which sends two things Transaction object and Error
            (txObj, error) => console.log(JSON.stringify(res))
        ) // end executeSQL
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS favoris (id_profile INTEGER, id_media INTEGER, media_type TEXT, FOREIGN KEY(id_profile) REFERENCES profiles(id), UNIQUE(id_profile, id_media))', null, // passing sql query and parameters:null
            // success callback which sends two things Transaction object and ResultSet Object
            (txObj, res) => console.log(JSON.stringify(res)),
            // failure callback which sends two things Transaction object and Error
            (txObj, error) => console.log(JSON.stringify(res))
        ) // end executeSQL


    });
};

export const requestProfiles = (callback) => {
    initBase();
    db.transaction(tx => {
        // sending 4 arguments in executeSql
        tx.executeSql('SELECT * FROM profiles LIMIT 3', null, // passing sql query and parameters:null
            // success callback which sends two things Transaction object and ResultSet Object
            (txObj, { rows: { _array } }) => callback(_array.map(field => field.name)),
            (txObj, error) => console.log('SQLite SELECT Error ', error)
           ) // end executeSQL
    }); // end transaction
};

export const requestProfile = (callback) => {
    initBase();
    db.transaction(tx => {
        // sending 4 arguments in executeSql
        tx.executeSql('SELECT name FROM profiles WHERE selected = 1', null, // passing sql query and parameters:null
            // success callback which sends two things Transaction object and ResultSet Object
            (txObj, { rows: { _array } }) => {
                // alert( _array ?  _array[0].name : "NaN", _array);
                // alert(JSON.stringify(_array));
                callback((_array ? _array[0].name : 'NaN'))
            },
             // failure callback which sends two things Transaction object and Error
            (txObj, error) => console.log('SQLite SELECT Error ', error)
            ) // end executeSQL
    }); // end transaction
};

export const selectProfile = (name) => {
    initBase();
    db.transaction(tx => {
        tx.executeSql('SELECT name FROM profiles', null, // passing sql query and parameters:null
            // success callback which sends two things Transaction object and ResultSet Object
            (txObj, { rows: { _array } }) => {
                console.log(JSON.stringify(_array));
            },
             // failure callback which sends two things Transaction object and Error
            (txObj, error) =>  console.log(JSON,stringify(error))
            ) // end executeSQL
        tx.executeSql(
            "UPDATE profiles SET selected=0", null, // passing sql query and parameters
            // success callback which sends two things Transaction object and ResultSet Object
            (txObj, res) => console.log(JSON.stringify(res)),
            // failure callback which sends two things Transaction object and Error
            (txObj, error) =>console.log(JSON.stringify(error))
        )
        tx.executeSql(
            "UPDATE profiles SET selected=1 WHERE name=?",  
            [name], // passing sql query and parameters
            // success callback which sends two things Transaction object and ResultSet Object
            (txObj, res) => console.log(JSON.stringify(res)),
            // failure callback which sends two things Transaction object and Error
            (txObj, error) => console.log(JSON.stringify(error))
        )
        tx.executeSql('SELECT name FROM profiles WHERE selected =1', null, // passing sql query and parameters:null
            // success callback which sends two things Transaction object and ResultSet Object
            (txObj, { rows: { _array } }) => {
                console.log(JSON.stringify(_array));
            },
             // failure callback which sends two things Transaction object and Error
            (txObj, error) => console.log(JSON,stringify(error))
            ) // end executeSQL
    });
};

export const addProfile = (name, successCallback) => {
    initBase();
    db.transaction(tx => {
        tx.executeSql(
            "INSERT OR IGNORE INTO profiles (name) VALUES(?)",  
            [name], // passing sql query and parameters
            // success callback which sends two things Transaction object and ResultSet Object
            (txObj, res) => console.log('SQLite INSERT ', res),
            // failure callback which sends two things Transaction object and Error
            (txObj, error) => console.log('SQLite INSERT Error ', error)
        )
    },
    null,
    successCallback
    );
};

export const removeCurrentProfile = (successCallback) => {
    initBase();
    db.transaction(tx => {
        tx.executeSql('DELETE FROM favoris WHERE id_profile==(SELECT id FROM profiles WHERE selected=1)', null, // passing sql query and parameters:null
            // success callback which sends two things Transaction object and ResultSet Object
            (txObj, res) => console.log('SQLite DELETE', res.rows),
            // failure callback which sends two things Transaction object and Error
            (txObj, error) => console.log('SQLite DELETE Error ', error)
            ) // end executeSQL
        // sending 4 arguments in executeSql
        tx.executeSql('DELETE FROM profiles WHERE selected=1', null, // passing sql query and parameters:null
            // success callback which sends two things Transaction object and ResultSet Object
            (txObj, res) => console.log('SQLite DELETE', res.rows),
            // failure callback which sends two things Transaction object and Error
            (txObj, error) => console.log('SQLite DELETE Error ', error)
            ) // end executeSQL
    },
    null,
    successCallback
    ); // end transaction
};

export const requestFavoriForCurrentProfile = (callback) => {
    initBase();
    db.transaction(tx => {
        // sending 4 arguments in executeSql
        tx.executeSql('SELECT id_media, media_type FROM favoris WHERE id_profile=(SELECT id FROM profiles WHERE selected=1)', null, // passing sql query and parameters:null
            // success callback which sends two things Transaction object and ResultSet Object
            (txObj,{ rows: { _array } }) => callback(_array),
            // failure callback which sends two things Transaction object and Error
            (txObj, error) => console.log('SQLite SELECT Error ', error)
            ) // end executeSQL
    }); // end transaction
};

export const removeFavoriForCurrentProfile = (id_media, media_type) => {
    initBase();
    db.transaction(tx => {
        tx.executeSql(
            "DELETE FROM favoris WHERE id_profile=(SELECT id FROM profiles WHERE selected=1) AND id_media=? AND media_type=?",  
            [id_media, media_type], // passing sql query and parameters
            // success callback which sends two things Transaction object and ResultSet Object
            (txObj, res) => console.log('SQLite DELETE ', res),
            // failure callback which sends two things Transaction object and Error
            (txObj, error) => console.log('SQLite DELETE Error ', error)
        )
    });
};


export const addFavoriForCurrentProfile = (id_media, media_type) => {
    initBase();
    db.transaction(tx => {
        tx.executeSql(
            "INSERT OR REPLACE INTO favoris (id_profile, id_media, media_type) VALUES((SELECT id FROM profiles WHERE selected=1), ?, ?)",  
            [id_media, media_type], // passing sql query and parameters
            // success callback which sends two things Transaction object and ResultSet Object
            (txObj, res) => console.log('SQLite INSERT ', res),
            // failure callback which sends two things Transaction object and Error
            (txObj, error) => console.log('SQLite INSERT Error ', error)
        )
    });
};