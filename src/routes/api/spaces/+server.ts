import { json } from '@sveltejs/kit';

export function POST(data) {
    console.log(data);
    console.log("inside the api spaces routes")
	const number = Math.floor(Math.random() * 6) + 1;
	
	return json(number);
}