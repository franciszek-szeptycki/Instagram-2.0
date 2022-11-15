import reqServer from "./reqServer";
import { LOG_IN_FUNCTION, LOG_OUT_FUNCTION } from "../redux/actions/isLogged";

const checkTokenValidity = async (setIsLoading, dispatch) => {
    const { status } = await reqServer(
        "POST",
        null,
        "/auth/access_token",
        true
    );
    if (status === 200) {
        dispatch(LOG_IN_FUNCTION());
        setIsLoading(false);
    } else {
        dispatch(LOG_OUT_FUNCTION());
        setIsLoading(false);
    }
};

export default checkTokenValidity;
