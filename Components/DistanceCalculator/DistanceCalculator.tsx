import { withHook } from "../../utils/withHook";

import DistanceCalculatorView from "./DistanceCalculatorView";
import useDistanceCalculator from "./useDistanceCalculator";

const DistanceCalculator = withHook(useDistanceCalculator, DistanceCalculatorView)

export default DistanceCalculator