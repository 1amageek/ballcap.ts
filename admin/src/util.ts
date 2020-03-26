
export const isDocumentReference = (value: any): boolean => {
	if (!value) { return false }
	return (value.hasOwnProperty('_key') && value.hasOwnProperty('firestore')) ||
		(Object.keys(value).length === 2 && value.hasOwnProperty('projectId') && value.hasOwnProperty('path'))
}

export const isOption = (value: any): boolean => {
	return Object.keys(value).length === 1 && value.hasOwnProperty('convertDocumentReference')
}
