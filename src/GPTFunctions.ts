import { Configuration, OpenAIApi } from 'openai'
import { cleanCode, getContentString } from './utils'

/**
 * Options for getting a result from the OpenAI API
 * @template T The type of the function
 */
export type ResOptions<T> = {
    /**
     * Rough type of the function
     * @example (number, number) => number
     */
    func: string
    /**
     * The arguments for the function
     * @example ["4", "5"]
     */
    args: Array<string>
    /**
     * A description of the function being called
     */
    desc: string
    /**
     * The name of the OpenAI API model to use
     * @default 'gpt-3.5-turbo'
     */
    model?: string
    /**
     * A function to post-process the API response
     */
    postProcess?: (response: unknown) => T
}

/**
 * Options for creating a function using the OpenAI API
 * @template T The type of the function
 */
export type CreateFucntionOptions<T> = {
    /**
     * Rough type of the function
     */
    func: string
    /**
     * Description of the function being defined
     */
    description: string
    /**
     * The name of the OpenAI API model to use
     * @default 'gpt-3.5-turbo'
     */
    model?: string
    /**
     * A function to evaluate the function definition
     */
    evaluate?: (...args: string[]) => T
}

export class GPTFunctions {
    private openai: OpenAIApi

    public constructor(apiKey: string) {
        const config = new Configuration({
            apiKey
        })
        this.openai = new OpenAIApi(config)
    }

    /**
     *  Generate the result of calling a function using OpenAI's API.
     *  @param {ResOptions} options - The options for generating the result.
     *  @returns {Promise<T>} - A promise that resolves to the result of calling the function.
     *  @template T
     */
    public getResult = async <T = 'string'>({
        func,
        args,
        desc,
        model = 'gpt-3.5-turbo',
        postProcess = (res: unknown) => res as T
    }: ResOptions<T>): Promise<T> => {
        const response = await this.openai.createChatCompletion({
            model,
            messages: [
                {
                    role: 'system',
                    content: getContentString(func, desc)
                },
                {
                    role: 'user',
                    content: args.join(', ')
                }
            ]
        })
        return postProcess(response.data.choices[0].message)
    }

    /**
     *  Generate a function using OpenAI's API.
     *  @param {CreateFucntionOptions} options - The options for generating the function.
     *  @returns {Promise<T>} - A promise that resolves to the generated function.
     */
    public createFunction = async <T extends () => unknown>({
        func,
        description,
        model = 'gpt-3.5-turbo',
        evaluate = Function as unknown as Required<CreateFucntionOptions<T>>['evaluate']
    }: CreateFucntionOptions<T>): Promise<T> => {
        const response = await this.openai.createChatCompletion({
            model,
            messages: [
                {
                    role: 'system',
                    content: getContentString(func, description, 'create')
                },
                {
                    role: 'user',
                    content: description
                }
            ],
            temperature: 0
        })
        const split = response.data.choices[0].message?.content.split('|') ?? ['a', 'return undefined']
        const parameters = split.shift() as string
        const finalFunc = evaluate(parameters, cleanCode(split.join('|'))) as T
        return finalFunc
    }
}
