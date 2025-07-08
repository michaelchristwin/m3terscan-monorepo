import { useBlockStore } from "../stores/blockStore";
import { useNavigate } from "react-router";

const Logo = () => {
	const clearSelectedMeterId = useBlockStore(
		(state) => state.clearSelectedMeterId
	);
	const navigate = useNavigate();

	const handleBack = () => {
		clearSelectedMeterId();
		navigate("/");
	};
	return (
		<small
			className=" shadow-md uppercase whitespace-nowrap cursor-pointer"
			onClick={handleBack}
		>
			switch
		</small>
	);
};
export default Logo;
