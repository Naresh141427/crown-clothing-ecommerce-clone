import { Group, FormInputField, FormInputLabel } from './form-input.styles';

const FormInput = ({ label, id, ...otherProps }) => {
    return (
        <Group>
            <FormInputField {...otherProps} />
            {label && (
                <FormInputLabel
                    htmlFor={id}
                    $shrink={Boolean(otherProps.value && otherProps.value.length)}
                >
                    {label}
                </FormInputLabel>
            )}
        </Group>
    );
};

export default FormInput;
