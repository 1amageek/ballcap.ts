
export const isDocumentReference = (value: any): boolean => {
	if (!value) { return false }
	return value.hasOwnProperty('firestore') ||
		(value.hasOwnProperty('_firestore') && value.hasOwnProperty('_path')) ||
		(Object.keys(value).length === 2 && value.hasOwnProperty('projectId') && value.hasOwnProperty('path'))
}

export const isOption = (value: any): boolean => {
	return Object.keys(value).length === 1 && value.hasOwnProperty('convertDocumentReference')
}
