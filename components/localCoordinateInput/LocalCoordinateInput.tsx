import { withHook } from "../../utils/withHook";

import LocalCoordinateInputView from "./LocalCoordinatesInputView";
import useLocalCoordinateInput from "./useLocalCoordinateInput";

const LocalCoordinateInput = withHook(useLocalCoordinateInput, LocalCoordinateInputView)

export default LocalCoordinateInput