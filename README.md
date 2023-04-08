# GPTFunctions

Essentially Magic

## Installation

```shell
npm install gpt-functions
```

## Usage

### **GPTFunctions.prototype.getResult()**

```js
import { GPTFunctions } from 'gpt-functions'

const API_KEY = 'your-openai-api-key-here'
const gpt = new GPTFunctions(API_KEY)

const result = await gpt.getResult({
    func: '(array, array) => array',
    args: [['a', 'b', 'c'], ['x', 'y', 'z']],
    desc: 'Creates an array of arrays, grouping the elements of each input array based on their index.',
    model: 'gpt-3.5-turbo'
})

console.log(result)
```

**Output**
```js
[ [ 'a', 'x' ], [ 'b', 'y' ], [ 'c', 'z' ] ]
```

GPTFunctions.prototype.getResult() is a function that takes an object with the following properties as its parameter:

    func: a string that represents the code you want to execute
    args: an array of arrays containing the arguments to pass to the func.
    desc: a string that describes what the code does.
    model: the name of the OpenAI model you want to use to execute the code.
    postProcess: a function that processes the response from the OpenAI API.

The getResult() method returns a Promise that resolves to the result of executing the code.

In the example provided, the getResult() function is used to execute the code provided in the func property using the OpenAI gpt-3.5-turbo model. The args property contains two arrays, which are used as arguments for the function. The postProcess function is used to parse the JSON response returned by the OpenAI API.

The result of executing the code is an array of arrays, where each sub-array contains pairs of elements from the input arrays based on their index. The output is logged to the console using console.log()

### **GPTFunctions.prototype.createFunction()**

```js
import { GPTFunctions } from 'openai'

const API_KEY = 'your-openai-api-key-here'
const gpt = new GPTFunctions(API_KEY)

const permutations = await gpt.createFunction({
    func: '(array) => array',
    desc: 'Return all permutations of the passed array',
    model: 'gpt-3.5-trubo'
}

console.log(permutations([1,2,3]))
```

**Output**
```js
[
  [ 1, 2, 3 ],
  [ 1, 3, 2 ],
  [ 2, 1, 3 ],
  [ 2, 3, 1 ],
  [ 3, 1, 2 ],
  [ 3, 2, 1 ]
]
```

GPTFunctions.prototype.createFunction() is a function that takes an object with the following properties as its parameter:

    func: a string that represents the code you want to execute
    desc: a string that describes what the code does.
    model: the name of the OpenAI model you want to use to execute the code.
    evaulate: a function evaluates the string to a an actual function `Default: Function()`

The createFunction() method returns a function that can be called with arguments to execute the code provided in the func property.

In the example provided, the createFunction() function is used to create a function that returns all permutations of a given array using the OpenAI gpt-3.5-turbo model. The output is logged to the console using console.log().

Note that the createFunction() function does not execute the code immediately, but instead returns a function that can be used to execute the code later. This can be useful if you need to execute the same code multiple times with different arguments.

## Contribution and Acknowledgments

Thank you for your interest in contributing to this project. If you find any issues or have any suggestions for improvement, please feel free to open an issue or a pull request on our GitHub repository.

This project was made possible thanks to the [Open AI Api](openai.com)
