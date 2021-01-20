import { UserDatabaseModel, UserRegisterModel } from "../models/user.model";

const userConverter = (row: UserDatabaseModel) => ({
    id: row.user_id,
    name: row.user_name,
    email: row.user_email
});

export class UserDao {

    _db;

    constructor(db) {
        this._db = db;
    }

    findByNameAndPassword(userEmail: string, password: string) {
        return new Promise((resolve, reject) => this._db.get(
            `SELECT * FROM user WHERE user_email = ? AND user_password = ?`,
            [userEmail, password],
            (err, row) => {
                if (err) {
                    console.log(err);
                    return reject('Can`t find user');
                }
                console.log('teste',row)

                if (row) resolve(userConverter(row));
                resolve(null);
            }
        ));
    }

    findByEmail(userEmail) {
        console.log(userEmail)

        return new Promise((resolve, reject) => this._db.get(
            `SELECT * FROM user WHERE user_email = ?`,
            [userEmail],
            (err, row) => {
                if (err) {
                    console.log(err);
                    return reject('Can`t find email');
                }

                if (row) resolve(userConverter(row));
                resolve(null);
            }
        ));

    }

    add(user: UserRegisterModel) {
        return new Promise((resolve, reject) => {

            this._db.run(`
                INSERT INTO user (
                    user_name,
                    user_last_name,
                    user_email, 
                    user_password, 
                    user_join_date
                ) values (?,?,?,?,?)
            `,
                [
                    user.userName,
                    user.userLastName,
                    user.userEmail,
                    user.userPassword,
                    new Date()
                ],
                function (err) {
                    if (err) {
                        console.log(err);
                        return reject('Can`t register new email');
                    }
                    console.log(`User ${user.userEmail} registered!`);
                    resolve(null);
                });
        });
    }

}
