interface User {
	name: string;
	email: string;
	age: number;
}

const userSchema = yup.object().shape({
	name: yup.string().required(),
	email: yup.string(),
	age: yup.number()
})