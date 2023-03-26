const storage = {
    get: (key: string) => {
        const value = localStorage.getItem(key);
        if(value === null || String(value) === 'undefined')
            return null
        return JSON.parse( value ?? "")
    },
    set: (key: string, value: any) => localStorage.setItem(key, JSON.stringify(value)),
    remove: (key: string) => localStorage.removeItem(key)
}

export default storage;