export interface GQLErrorObject {
	response: {
		errors: {
			extensions: {
				code: string;
			};
			message: string;
		}[];
		status: number;
	};
}

export const getGQLErrorObjecct = (error:unknown) =>{
    const finalError = error as GQLErrorObject;
    return finalError
}

export const getGQLErrorMessages = (error:unknown) =>{
    try {
        const finalError = error as GQLErrorObject;
        const errorMessages = finalError.response.errors.map(
            (e) => e.message
        );
        return errorMessages ?? []
    } catch (error) {
        return []
    }
}