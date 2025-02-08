function formKey(title: string) {
    return `${title.replace(/\s+/g, '-').toLowerCase()}-form-data`;
}


export function getLocalSave(formTitle: string) {
    const item = localStorage.getItem(formKey(formTitle));
    return item ? JSON.parse(item) : null;
}

export function setLocalSave(formTitle: string, value: unknown) {
    localStorage.setItem(formKey(formTitle), JSON.stringify(value));
}

export function deleteLocalSave(formTitle: string): void {
    localStorage.removeItem(formKey(formTitle));
}