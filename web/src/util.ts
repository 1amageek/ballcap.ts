
export const isDocumentReference = (value: any): boolean => {
	if (!value) { return false}
	return value.hasOwnProperty('_key') && value.hasOwnProperty('firestore')
}
