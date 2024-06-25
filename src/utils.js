export function sanitizeEmailForPath(userEmail) {
    return userEmail.replace(/\./g, '_dot_')
                //.replace(/@/g, '_at_')
                .replace(/#/g, '_hash_')
                .replace(/\$/g, '_dollar_')
                .replace(/\[/g, '_lbracket_')
                .replace(/\]/g, '_rbracket_');
}