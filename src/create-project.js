export function createProject({
    title = '',
    description = '',
    todos = []
} = {}) {
    return {
        title,
        description,
        todos
    };
};