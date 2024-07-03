import { withHook } from "../../utils/withHook";

import SearchInputScreenView from "./SearchInputScreenView";
import useSearchInputScreen from "./useSearchInputScreen";

const SearchInputScreen = withHook(useSearchInputScreen, SearchInputScreenView)

export default SearchInputScreen