export interface UserDatabaseModel {
    user_id: number,
    user_name: string,
    user_last_name: string,
    user_email: string,
    user_password: string,
    user_join_date: string
}

export interface UserRegisterModel {
    userName: string,
    userLastName: string,
    userEmail: string,
    userPassword: string
}