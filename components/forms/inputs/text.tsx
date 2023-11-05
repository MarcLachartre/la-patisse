import style from '@/styles/components/forms/Inputs.module.scss';

// Input type text area has to be included in a container defining its width and height
const Input = ({
	placeholder,
	maxlength,
}: {
	placeholder: string;
	maxlength: number;
}) => {
	return (
		<div className={style.textareaContainer}>
			<textarea
				className={style.textInput}
				placeholder={placeholder}
				maxLength={maxlength}
			/>
			<div className={style.textareaUnderline} />
		</div>
	);
};

export default Input;
