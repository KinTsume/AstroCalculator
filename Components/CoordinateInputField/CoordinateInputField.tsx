import { withHook } from "../../utils/withHook";

import CoordinateInputFieldView from "./CoordinateInputFieldView";
import useCoordinateInputField from "./useCoordinateInputField";

const DistanceCalculator = withHook(useCoordinateInputField, CoordinateInputFieldView)

export default DistanceCalculator