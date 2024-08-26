import { toast } from "react-hot-toast";

export const CustomToast = () => {
	const showToast = () => {
		toast((t) => (
			<span>
				Custom and <b>bold</b> text here.
				<button
					style={{
						marginLeft: "10px",
						padding: "4px 8px",
						backgroundColor: "#ff5722",
						color: "white",
						border: "none",
						borderRadius: "4px",
						cursor: "pointer",
					}}
					onClick={() => toast.dismiss(t.id)}
				>
					Dismiss
				</button>
			</span>
		));
	};

	return (
		<div>
			<button onClick={showToast}>Show Toast</button>
		</div>
	);
}
