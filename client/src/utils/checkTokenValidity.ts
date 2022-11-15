import reqServer from "./reqServer";
import { LOG_IN_FUNCTION, LOG_OUT_FUNCTION } from "../redux/actions/isLogged";
import getToken from "./getToken";

const checkTokenValidity = async (setIsLoading, dispatch) => {
    if (!getToken()) {
        setIsLoading(false);
        return;
    }

    const { status } = await reqServer(
        "POST",
        null,
        "/auth/access_token",
        true
    );
    if (status === 200) {
        dispatch(LOG_IN_FUNCTION());
    } else {
        dispatch(LOG_OUT_FUNCTION());
    }
    setIsLoading(false);
};

export default checkTokenValidity;
