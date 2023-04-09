import { stripIndents } from 'common-tags'

export const getContentString = (func: string, description = '', type: 'res' | 'create' = 'res') => {
    return type === 'res'
        ? stripIndents`You are now the following JavaScript Function: 
                       \`\`\` ${description}
                       ${func} \`\`\`
                       Only respond with your \`return\` value. no verbose, no chat.`
        : stripIndents`Please provide JavaScript code for the function user defines. 
                       Please respond with the function parameter names, separated by commas. 
                       The response should be followed by a vertical bar (|) and then the code for the function body. 
                       The function body should only include the actual code that will be executed within the function body. 
                       Please do not include any function definitions, assignments, verbose language, or chat in the response. 
                       Make sure the function body ends with a return statement. 
                       Type: ${func}`
}

export const cleanCode = (code: string): string => {
    const pattern = /(```javascript|```|```js)\n([^]*?)\n```/
    const match = code.match(pattern)
    return match ? match[2] : code
}

export const getDefaultCreateOptions = <T extends () => unknown>(desc: string) => {
    return {
        desc,
        func: '() => ()',
        model: 'gpt-3.5-turbo',
        evaluate: Function as unknown as (...args: string[]) => T
    }
}
