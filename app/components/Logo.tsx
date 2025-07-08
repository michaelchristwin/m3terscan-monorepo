import { useRouter } from "next/navigation";
import { useBlockStore } from "../stores/blockStore";


const Logo = () => {
	const clearSelectedMeterId = useBlockStore(
		(state) => state.clearSelectedMeterId
	);
	const navigate = useRouter();

	const handleBack = () => {
		clearSelectedMeterId();
		navigate.push("/");
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
