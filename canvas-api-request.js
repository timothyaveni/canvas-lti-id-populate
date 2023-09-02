import request from 'request-promise-native';

import dotenv from 'dotenv';
dotenv.config();

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const repeatUntilSuccess = async promise => {
	let tries = 0;

  while (true) {
		try {
			return await promise;
		} catch (e) {
			tries++;
			if (tries > 5) {
				throw e;
			}
			await sleep(Math.random() * 100);
		}
	}
};

const canvasApiRequest = async (endpoint, arrayMap) => {
	if (!process.env.BASE_URL) {
		throw new Error('BASE_URL not defined');
	}

	if (!process.env.API_KEY || process.env.API_KEY.length < 10) {
		throw new Error('API_KEY not defined');
	}

	if (!process.env.COURSE_ID) {
		throw new Error('COURSE_ID not defined');
	}

	let url = `${process.env.BASE_URL}/api/v1/courses/${process.env.COURSE_ID}` + endpoint;
	const options = { auth: { bearer: process.env.API_KEY }, json: true, resolveWithFullResponse: true };
	if (!arrayMap) {
		const response = await repeatUntilSuccess(request.get(url, options));
		return response.body;
	} else {
		let returnArray = [];
		while (url) {
			const { body, headers } = await repeatUntilSuccess(request.get(url, options));
			returnArray = returnArray.concat(arrayMap(body));

			if (headers['link']) {
				const match = headers['link'].match(/<([^>]+)>; rel="next"/);
				if (match && match[1]) {
					url = match[1];
				} else {
					url = null;
				}
			} else {
				url = null;
			}
		}
		return returnArray;
	}
};

export default canvasApiRequest;