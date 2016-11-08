import * as axios from "axios";
import { Everything } from "../interfaces";
import { t } from "i18next";
import { Thunk } from "../redux/interfaces";
import { success, error } from "../logger";
import { User } from "./interfaces";
import { API } from "../api";
import { ReduxAction } from "../redux/interfaces";

function updateUserSuccess(payload: User): ReduxAction<User> {
    return {
        type: "UPDATE_USER_SUCCESS",
        payload
    };
}

export function updateUser(user: User): Thunk {
    return (dispatch, getState) => {

        axios.patch<User>(API.current.usersPath)
            .then(() => {
                success(t("User successfully updated."));
                dispatch(updateUserSuccess("Success"));
            }, (e: Error) => {
                error(t("User could not be updated."));
            });
    };
}
