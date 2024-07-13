import { withHook } from "../../utils/withHook";

import ManualInputFieldView from "./ManualInputFieldView";
import useManualInputField from "./useManualInputField";

const ManualInputField = withHook(useManualInputField, ManualInputFieldView)

export default ManualInputField