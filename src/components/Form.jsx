import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup';



const schema = yup.object().shape({
	title: yup.string().required().max(30).min(2),
	hours: yup.number().required().integer().min(0),
}).required();

const defaultValues = {
	title: 'Hello',
	hours: 1
};


function Form() {
  const { register, handleSubmit, reset, formState: { errors, isDirty, isValid, isSubmitting} } = useForm({
	resolver: yupResolver(schema),
	mode: 'onChange',
	reValidateMode: 'onChange',
	defaultValues: defaultValues,
  });

  const onSubmit = data => {
	console.log(data);
	reset();
}


//   console.log(watch("example")); // watch input value by passing the name of it

  console.log('errors:', errors);

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
		<input type='text' {...register("title")}/>
		{errors?.title && <p>{errors.title.message}</p>}
		<input type='number' {...register("hours")}/>
		{errors?.hours && <p>{errors.hours.message}</p>}

		<button type="reset" onClick={() => reset(defaultValues)}>Reset</button>
		<button type="submit" disabled={isSubmitting || (!isValid || !isDirty)} >Add Task</button>
    </form>
  );
}

export default Form
