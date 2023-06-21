const num1 = document.getElementById('num1')
const num2 = document.getElementById('num2')
const result = document.getElementById('result')

const contractAddress = "0x5162989dE32Be43db6f012c6B257cF751b434409";
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "a",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "b",
				"type": "uint256"
			}
		],
		"name": "add",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "a",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "b",
				"type": "uint256"
			}
		],
		"name": "div",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "a",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "b",
				"type": "uint256"
			}
		],
		"name": "multi",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "a",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "b",
				"type": "uint256"
			}
		],
		"name": "sub",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	}
]
async function getContract(a,b,operation){
	const provider = new ethers.providers.Web3Provider(window.ethereum,'sepolia')
	await provider.send("eth_requestAccounts", [])
	const accounts = await provider.listAccounts();
	const signer = provider.getSigner(accounts[0]);
	const contract = new ethers.Contract(contractAddress, contractABI, signer);
	if(operation == "sum"){
		return contract.add(a,b);
	}
	if(operation == "sub"){
		return contract.sub(a,b);
	}
	if(operation == "multi"){
		return contract.multi(a,b);
	}
	if(operation == "div"){
		return contract.div(a,b);
	}

}
async function add(){
	const val1 = parseInt(num1.value);
	const val2 = parseInt(num2.value);
	const sum = await getContract(val1,val2,"sum")
	result.innerHTML = sum.toString();
}
async function subtract(){
	const val1 = parseInt(num1.value);
	const val2 = parseInt(num2.value);
	const diff = await getContract(val1,val2,"sub")
	result.innerHTML = diff.toString();
}
async function multiply(){
	const val1 = parseInt(num1.value);
	const val2 = parseInt(num2.value);
	const prod = await getContract(val1,val2,"multi");
	result.innerHTML = prod.toString()
}
async function divide(){
	const val1 = parseInt(num1.value);
	const val2 = parseInt(num2.value);
	const sum = await getContract(val1,val2,"div");
	result.innerHTML = sum.toString()
}
