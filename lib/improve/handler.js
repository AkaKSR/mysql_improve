var err_result = {
    msg: null,
    err: null
}

function error(err) {
    switch (err.code) {
        case "PROTOCOL_CONNECTION_LOST":
            err_result = {
                msg: "!!! 연결이 끊겼습니다. !!!",
                err: err
            }
            return err_result;

        case "ER_NO_SUCH_TABLE":
            err_result = {
                msg: "!!! 테이블 정보를 찾을 수 없습니다. !!!",
                err: err
            }
            return err_result;

        case "ER_PARSE_ERROR":
            err_result = {
                msg: "!!! SQL 구문이 잘못되었습니다. !!!",
                err: err
            }
            return err_result;

        case "ER_NO_DB_ERROR":
            err_result = {
                msg: "!!! DataBase가 선택되지 않았습니다. !!!",
                err: err
            }
            return err_result;

        case "ER_DBACCESS_DENIED_ERROR":
            err_result = {
                msg: "!!! 해당 DB에 접근할 권한이 없습니다. !!!",
                err: err
            }
            return err_result;

        default:
            err_result = {
                msg: "!!! 알 수 없는 오류가 발생했습니다. !!!",
                err: err
            }
            return err_result;
    }
}

module.exports = {
    Error: error,
}