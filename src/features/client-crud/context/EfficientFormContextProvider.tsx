import React, {
    createContext,
    memo,
    useCallback,
    useContext,
    useEffect,
    useState
} from "react";



export type EfficientFormState = {
    validators: { [x: string]: validatorType[] };
    data: { [x: string]: string };
    errors: { [x: string]: string[] };
    haveErrors: boolean
};

type EfficientFormContextValue = {
    value: EfficientFormState;
    setValue: React.Dispatch<any>;
    onSubmit: (event:any) => void;
    executeAllValidators: (satisfy?: string[]) => boolean;
};
export type validatorType = (formData: EfficientFormState) => string[];

// To execute all the inputs validator functions then return a single array of strings with the errors if any.
const executeValidators = (
    validators: validatorType[],
    formData: EfficientFormState
) => {
    let errors: string[] = [];
    for (let validator of validators) {
        errors = [...errors, ...validator(formData)];
    }
    return errors;
};


export const EfficientFormContext = createContext<EfficientFormContextValue>(
    {} as EfficientFormContextValue
);

// Form context.
export function EfficientFormContextProvider(props: {
    submitForm?: (value: EfficientFormState) => {failed:boolean,data:boolean};
    children:any
}) {
    // collection of form values
    const [value, setValue] = useState<EfficientFormState>({
        data: {},
        errors: {},
        validators: {},
        haveErrors: false
    });

    // const debouncedValue = useDebounce(value, 500);
    // Execute all validators and check for errors.
    const executeAllValidators = useCallback((satisfy?: string[]) => {
        let haveErrors = false;

        setValue((value) => {

            const validators = Object.entries(value.validators);

            // Reduce to make a new errors state.
            const errors = validators.reduce((acc: any, [name, validators]) => {
                acc[name] = [];
                // Check only desired fields

                if (satisfy && satisfy.indexOf(name) > -1) {
                // Store all errors related to the current input.
                let errors = [...executeValidators(validators, value)];

                // Assing on the first hit only.
                if (!haveErrors && errors.length > 0) haveErrors = true;
                // console.log("Inside:", { haveErrors });
                // Assign errors to corrresponding input.
                // console.log(name, errors)
                    acc[name] = errors;
                }


                return acc;
            }, {});

            // console.log(errors);
            // const haveErrors = errors.length > 0 ? true : false;
            return { ...value, errors, haveErrors };
        });


        // Execute all validators and store their values.

        return haveErrors;
    }, []);


    // basic onSubmit handler.
    const onSubmit = (event:any) => {
        event.preventDefault();
        // const haveErrors = executeAllValidators();
        if(props.submitForm){
            const {failed,data} = props.submitForm(value);
        }
        
    };

    // Creates the context value.
    const contextValue = { value, setValue, onSubmit, executeAllValidators };

    // Returns the context provider.
    return (
        <EfficientFormContext.Provider value={contextValue}>
            {props.children}
        </EfficientFormContext.Provider>
    );
};

// Wrapper for the form element.
export const withContextEfficientForm = <T extends object>(
    Wrapped: React.ComponentType<T>
) => {
    const PureWrapped = memo(Wrapped);
    return (props: any) => {
        const { onSubmit } = useContext(EfficientFormContext);
        return <PureWrapped {...props} onSubmit={onSubmit} />;
    };
};

// Wrapper for Input .
export const withContextEfficientFormInput = <T extends object>(
    Wrapped: React.ComponentType<T>
) => {
    const PureWrapped: any = memo(Wrapped);
    return (props: {
        options?: { value: string; desc: string; }[]
        name: string;
        label: string;
        validators?: validatorType[];
        validateAsTyping?: boolean;
        defaultValue?: string;
        startAdornment?: JSX.Element;
    }) => {
        const { value, setValue } = useContext(EfficientFormContext);

        // Make name from label.
        const inputName = props.name;

        // To register the input info to the state.
        const registerInput = useCallback(
            (name: string) => {
                // Register input to state.
                setValue((formState: EfficientFormState) => {
                    // Bind label names to validators.
                    const tobeBound = { inputName, inputLabel: props.label };
                    const validators = props.validators?.map((func) =>
                        func.bind(tobeBound)
                    );

                    // Below code is a little bit verbose but efficient bacause it only mutates
                    // needed values instead of recreating the entire formState.
                    const defaultValue = props.defaultValue || "";
                    return {
                        ...formState,
                        // Set input values.
                        data: {
                            ...formState.data,
                            [name]: formState.data[name] || defaultValue,
                        },
                        // Set errors
                        errors: {
                            ...formState.errors,
                            [name]: formState.errors[name] || [],
                        },
                        // Store validators refrences to the state.
                        validators: {
                            ...formState.validators,
                            [name]: validators || [],
                        },
                    };
                });


            },
            []
        );
        // Unregister input from the state.
        const unregisterInput = useCallback((name: string) => {
            setValue((formState: EfficientFormState) => {
                // Make a new container to hold values.
                const { data, errors, validators } = { ...formState };
                // Delete values for current input.
                delete data[name]
                delete errors[name]
                delete validators[name]

                return {
                    data,
                    errors,
                    validators,
                };
            });
        },
            []
        );

        // Register Input to state
        useEffect(() => {
            // console.log("Inputs registered to state.");
            registerInput(inputName);
            return () => {
                // console.log("Unregistered: " + inputName)
                unregisterInput(inputName);
            }
        }, []);

        // Handle onBlur error.
        const handleError = useCallback(({ target }: any) => {
            // if input has validators then.
            if (props.validators) {
                // gets the name of the input to handle the error for.
                const currentInputName: string = target["name"];
                setValue((formState: EfficientFormState) => {
                    // Execute all validators.
                    const errors = executeValidators(
                        formState.validators[currentInputName] || [],
                        formState
                    );
                    // Assign errors if any.
                    if (errors.length > 0) {
                        return {
                            ...formState,
                            errors: {
                                ...formState.errors,
                                [currentInputName]: errors,
                            },
                        };
                    }
                    // If it doesn't have any errors assing empty array.
                    return {
                        ...formState,
                        errors: {
                            ...formState.errors,
                            [currentInputName]: [],
                        },
                    };
                });
            }
        }, []);

        // Handle the input change.
        const handleChange = useCallback(
            (event: any) => {
                const { target } = event;
                setValue((formState: EfficientFormState) => ({
                    ...formState,
                    data: {
                        ...formState.data,
                        [inputName]: target["value"],
                    },
                }));
                // This function calls set state again
                // This does not result in 2 rerenders because
                // React bashes the changes then execute the render method.
                if (props.validateAsTyping) handleError(event);
            },
            [inputName]
        );

        // console.log(inputName,value.errors[inputName])

        return (
            <PureWrapped
                // To rmove react warning about uncontrol becoming controlled.
                startAdornment={props.startAdornment || null}
                options={props.options}
                name={inputName}
                label={props.label}
                value={value.data[inputName] || ""}
                onChange={handleChange}
                onBlur={handleError}
                errors={value.errors[inputName]}
            />
        );
    };
};
