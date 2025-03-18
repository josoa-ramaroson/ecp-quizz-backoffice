"use client"

export enum EErrorMessage {
    SET_ITEM_LOCAL_STORAGE_ERROR = "Error setting item in local storage",
    GET_ITEM_LOCAL_STORAGE_ERROR = "Error getting item from local storage",
    REMOVE_ITEM_LOCAL_STORAGE_ERROR = "Error removing item from local storage",
    CLEAR_LOCAL_STORAGE_ERROR = "Error clearing local storage",
    PARSE_JSON_ERROR = "Error parsing JSON",

    NO_RESPONSE_FROM_SERVER_ERROR = "No response received from server",
    BAD_REQUEST_ERROR = "Bad request",
    UNAUTHORIZED_ERROR = "Unauthorized - Please verify your informations",
    FORBIDDEN_ERROR = "Forbidden - You do not have permission",
    NOT_FOUND_ERROR = "Resource not found",
    INTERNAL_SERVER_ERROR = "Internal server error - Try again later",  

    UNKNOWN_ERROR = "An unknown error occurred",
}